use rusqlite::types::Value as SqlValue;
use serde_json::json;
use tsumugi_core::database::{self, Filter, Property, Sort, View};
use tsumugi_core::{Error, db, pages};

fn setup() -> (rusqlite::Connection, database::DatabaseBundle) {
    let conn = db::open_in_memory().unwrap();
    let page = pages::create(&conn, None, "タスク").unwrap();
    let bundle = database::create(&conn, &page.id, "タスク一覧").unwrap();
    (conn, bundle)
}

#[test]
fn create_has_default_property_and_view() {
    let (conn, bundle) = setup();
    assert_eq!(bundle.properties.len(), 1);
    assert_eq!(bundle.properties[0].kind, "text");
    assert_eq!(bundle.views.len(), 1);
    let again = database::get_by_page(&conn, &bundle.database.page_id)
        .unwrap()
        .unwrap();
    assert_eq!(again, bundle);
    assert!(database::get_by_page(&conn, "nope").unwrap().is_none());
}

#[test]
fn property_kind_is_validated() {
    let (conn, bundle) = setup();
    let err = database::add_property(&conn, &bundle.database.id, "x", "blob", None);
    assert!(matches!(err, Err(Error::Invalid(_))));
    let p = database::add_property(
        &conn,
        &bundle.database.id,
        "状態",
        "select",
        Some(vec!["todo".into(), "done".into()]),
    )
    .unwrap();
    assert_eq!(p.position, 1);
    database::update_property(&conn, &p.id, "状態2", "select", Some(vec!["a".into()])).unwrap();
    let props = database::properties(&conn, &bundle.database.id).unwrap();
    assert_eq!(props[1].name, "状態2");
    assert_eq!(props[1].options.as_deref(), Some(&["a".to_string()][..]));
    database::delete_property(&conn, &p.id).unwrap();
    assert_eq!(
        database::properties(&conn, &bundle.database.id)
            .unwrap()
            .len(),
        1
    );
}

#[test]
fn build_query_is_parameterized_and_whitelisted() {
    let props = vec![
        Property {
            id: "p1".into(),
            database_id: "d".into(),
            name: "名前".into(),
            kind: "text".into(),
            options: None,
            position: 0,
        },
        Property {
            id: "p2".into(),
            database_id: "d".into(),
            name: "点数".into(),
            kind: "number".into(),
            options: None,
            position: 1,
        },
    ];
    let sort = Sort {
        property_id: "p2".into(),
        direction: "desc".into(),
    };
    let filters = vec![
        Filter {
            property_id: "p1".into(),
            op: "contains".into(),
            value: json!("50%"),
        },
        Filter {
            property_id: "p2".into(),
            op: "gt".into(),
            value: json!(10),
        },
        Filter {
            property_id: "p1".into(),
            op: "not_empty".into(),
            value: json!(null),
        },
    ];
    let (sql, args) = database::build_query("d", &props, Some(&sort), &filters).unwrap();
    assert_eq!(
        sql,
        "SELECT id, database_id, \"values\", position, created_at, updated_at FROM db_rows WHERE database_id = ? \
         AND json_extract(\"values\", ?) LIKE ? ESCAPE '\\' \
         AND CAST(json_extract(\"values\", ?) AS REAL) > ? \
         AND (json_extract(\"values\", ?) IS NOT NULL AND json_extract(\"values\", ?) <> '') \
         ORDER BY CAST(json_extract(\"values\", ?) AS REAL) DESC, position ASC"
    );
    assert_eq!(
        args,
        vec![
            SqlValue::Text("d".into()),
            SqlValue::Text("$.\"p1\"".into()),
            SqlValue::Text("%50\\%%".into()),
            SqlValue::Text("$.\"p2\"".into()),
            SqlValue::Integer(10),
            SqlValue::Text("$.\"p1\"".into()),
            SqlValue::Text("$.\"p1\"".into()),
            SqlValue::Text("$.\"p2\"".into()),
        ]
    );

    // 存在しない列・不正な演算子・不正な方向は拒否
    let bad = Filter {
        property_id: "x\"; DROP TABLE pages; --".into(),
        op: "eq".into(),
        value: json!(1),
    };
    assert!(matches!(
        database::build_query("d", &props, None, &[bad]),
        Err(Error::Invalid(_))
    ));
    let bad = Filter {
        property_id: "p1".into(),
        op: "regexp".into(),
        value: json!(1),
    };
    assert!(matches!(
        database::build_query("d", &props, None, &[bad]),
        Err(Error::Invalid(_))
    ));
    let bad = Sort {
        property_id: "p1".into(),
        direction: "DESC; --".into(),
    };
    assert!(matches!(
        database::build_query("d", &props, Some(&bad), &[]),
        Err(Error::Invalid(_))
    ));
}

#[test]
fn rows_sort_and_filter() {
    let (conn, bundle) = setup();
    let name = bundle.properties[0].id.clone();
    let score = database::add_property(&conn, &bundle.database.id, "点数", "number", None)
        .unwrap()
        .id;
    let done = database::add_property(&conn, &bundle.database.id, "完了", "checkbox", None)
        .unwrap()
        .id;
    let due = database::add_property(&conn, &bundle.database.id, "期限", "date", None)
        .unwrap()
        .id;

    let data = [
        ("りんご", 30, true, "2026-01-03"),
        ("みかん", 10, false, "2026-01-01"),
        ("ぶどう", 20, false, "2026-01-02"),
    ];
    for (n, s, d, dt) in data {
        let row = database::add_row(&conn, &bundle.database.id).unwrap();
        database::update_row(
            &conn,
            &row.id,
            &json!({ name.clone(): n, score.clone(): s, done.clone(): d, due.clone(): dt }),
        )
        .unwrap();
    }
    let names = |rows: &[database::Row]| {
        rows.iter()
            .map(|r| r.values[&name].as_str().unwrap().to_string())
            .collect::<Vec<_>>()
    };

    let all = database::query_rows(&conn, &bundle.database.id, None, &[]).unwrap();
    assert_eq!(names(&all), ["りんご", "みかん", "ぶどう"]); // position 順

    let sorted = database::query_rows(
        &conn,
        &bundle.database.id,
        Some(&Sort {
            property_id: score.clone(),
            direction: "asc".into(),
        }),
        &[],
    )
    .unwrap();
    assert_eq!(names(&sorted), ["みかん", "ぶどう", "りんご"]);

    let by_date = database::query_rows(
        &conn,
        &bundle.database.id,
        Some(&Sort {
            property_id: due.clone(),
            direction: "desc".into(),
        }),
        &[],
    )
    .unwrap();
    assert_eq!(names(&by_date), ["りんご", "ぶどう", "みかん"]);

    let f = Filter {
        property_id: score.clone(),
        op: "gt".into(),
        value: json!(15),
    };
    let gt = database::query_rows(&conn, &bundle.database.id, None, &[f]).unwrap();
    assert_eq!(names(&gt), ["りんご", "ぶどう"]);

    let f = Filter {
        property_id: done.clone(),
        op: "eq".into(),
        value: json!(true),
    };
    let checked = database::query_rows(&conn, &bundle.database.id, None, &[f]).unwrap();
    assert_eq!(names(&checked), ["りんご"]);

    let f = Filter {
        property_id: name.clone(),
        op: "contains".into(),
        value: json!("ど"),
    };
    let contains = database::query_rows(&conn, &bundle.database.id, None, &[f]).unwrap();
    assert_eq!(names(&contains), ["ぶどう"]);

    // 値の無い行は empty にヒットする
    let empty_row = database::add_row(&conn, &bundle.database.id).unwrap();
    let f = Filter {
        property_id: name.clone(),
        op: "empty".into(),
        value: json!(null),
    };
    let empty = database::query_rows(&conn, &bundle.database.id, None, &[f]).unwrap();
    assert_eq!(empty.len(), 1);
    assert_eq!(empty[0].id, empty_row.id);

    database::delete_row(&conn, &empty_row.id).unwrap();
    assert_eq!(
        database::query_rows(&conn, &bundle.database.id, None, &[])
            .unwrap()
            .len(),
        3
    );

    // ビューの保存と読み出し
    let mut view = bundle.views[0].clone();
    view.sort = Some(Sort {
        property_id: score.clone(),
        direction: "desc".into(),
    });
    view.filter = vec![Filter {
        property_id: done.clone(),
        op: "eq".into(),
        value: json!(false),
    }];
    database::save_view(&conn, view.clone()).unwrap();
    let views = database::views(&conn, &bundle.database.id).unwrap();
    assert_eq!(views, vec![view.clone()]);
    let rows =
        database::query_rows(&conn, &bundle.database.id, view.sort.as_ref(), &view.filter).unwrap();
    assert_eq!(names(&rows), ["ぶどう", "みかん"]);

    // 新しいビューも追加できる
    let v2 = View {
        id: "v2".into(),
        database_id: bundle.database.id.clone(),
        name: "完了のみ".into(),
        sort: None,
        filter: vec![],
    };
    database::save_view(&conn, v2).unwrap();
    assert_eq!(
        database::views(&conn, &bundle.database.id).unwrap().len(),
        2
    );

    // ページ削除でデータベースも消える
    pages::delete(&conn, &bundle.database.page_id).unwrap();
    assert!(
        database::get_by_page(&conn, &bundle.database.page_id)
            .unwrap()
            .is_none()
    );
    let n: i64 = conn
        .query_row("SELECT count(*) FROM db_rows", [], |r| r.get(0))
        .unwrap();
    assert_eq!(n, 0);
}
