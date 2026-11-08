use tsumugi_core::{Error, db, pages};

#[test]
fn migrations_apply_once() {
    let conn = db::open_in_memory().unwrap();
    assert_eq!(db::user_version(&conn).unwrap(), 1);
    // 2 回目は何も適用しない
    assert_eq!(db::migrate(&conn).unwrap(), 0);
    let tables: Vec<String> = conn
        .prepare("SELECT name FROM sqlite_master WHERE type IN ('table') ORDER BY name")
        .unwrap()
        .query_map([], |r| r.get(0))
        .unwrap()
        .collect::<Result<_, _>>()
        .unwrap();
    for t in [
        "pages",
        "pages_fts",
        "databases",
        "db_properties",
        "db_rows",
        "db_views",
    ] {
        assert!(
            tables.contains(&t.to_string()),
            "missing table {t}: {tables:?}"
        );
    }
}

#[test]
fn crud_and_sibling_order() {
    let conn = db::open_in_memory().unwrap();
    let a = pages::create(&conn, None, "A").unwrap();
    let b = pages::create(&conn, None, "B").unwrap();
    let a1 = pages::create(&conn, Some(&a.id), "A-1").unwrap();
    assert_eq!((a.position, b.position, a1.position), (0, 1, 0));

    pages::rename(&conn, &a.id, "A!").unwrap();
    pages::save_content(
        &conn,
        &a.id,
        r#"[{"type":"paragraph","content":[{"type":"text","text":"hi","styles":{}}]}]"#,
    )
    .unwrap();
    pages::set_icon(&conn, &a.id, Some("📘")).unwrap();
    let got = pages::get(&conn, &a.id).unwrap();
    assert_eq!(got.title, "A!");
    assert!(got.content.contains("hi"));
    assert_eq!(got.icon.as_deref(), Some("📘"));
    assert!(got.updated_at >= got.created_at);

    // 壊れた JSON は保存しない
    assert!(matches!(
        pages::save_content(&conn, &a.id, "{oops"),
        Err(Error::Json(_))
    ));
    assert!(matches!(pages::get(&conn, "nope"), Err(Error::NotFound(_))));

    let list = pages::list(&conn).unwrap();
    assert_eq!(list.len(), 3);
    let roots: Vec<_> = list
        .iter()
        .filter(|p| p.parent_id.is_none())
        .map(|p| p.title.as_str())
        .collect();
    assert_eq!(roots, ["A!", "B"]);
}

#[test]
fn move_reorders_and_prevents_cycles() {
    let conn = db::open_in_memory().unwrap();
    let a = pages::create(&conn, None, "A").unwrap();
    let b = pages::create(&conn, None, "B").unwrap();
    let c = pages::create(&conn, None, "C").unwrap();
    let a1 = pages::create(&conn, Some(&a.id), "A-1").unwrap();

    // C を先頭へ
    pages::move_page(&conn, &c.id, None, 0).unwrap();
    let order = |conn: &rusqlite::Connection, parent: Option<&str>| -> Vec<String> {
        pages::list(conn)
            .unwrap()
            .into_iter()
            .filter(|p| p.parent_id.as_deref() == parent)
            .map(|p| p.title)
            .collect()
    };
    assert_eq!(order(&conn, None), ["C", "A", "B"]);
    let positions: Vec<i64> = pages::list(&conn)
        .unwrap()
        .into_iter()
        .filter(|p| p.parent_id.is_none())
        .map(|p| p.position)
        .collect();
    assert_eq!(positions, [0, 1, 2]);

    // B を A の下、A-1 の前へ
    pages::move_page(&conn, &b.id, Some(&a.id), 0).unwrap();
    assert_eq!(order(&conn, Some(&a.id)), ["B", "A-1"]);
    assert_eq!(order(&conn, None), ["C", "A"]);

    // A を自分の孫 (A-1) の下へは移動できない
    assert!(matches!(
        pages::move_page(&conn, &a.id, Some(&a1.id), 0),
        Err(Error::Invalid(_))
    ));
    assert!(matches!(
        pages::move_page(&conn, &a.id, Some(&a.id), 0),
        Err(Error::Invalid(_))
    ));
}

#[test]
fn delete_removes_descendants() {
    let conn = db::open_in_memory().unwrap();
    let a = pages::create(&conn, None, "A").unwrap();
    let a1 = pages::create(&conn, Some(&a.id), "A-1").unwrap();
    let _a11 = pages::create(&conn, Some(&a1.id), "A-1-1").unwrap();
    let _b = pages::create(&conn, None, "B").unwrap();
    assert_eq!(pages::descendants(&conn, &a.id).unwrap().len(), 3);

    pages::delete(&conn, &a.id).unwrap();
    let list = pages::list(&conn).unwrap();
    assert_eq!(list.len(), 1);
    assert_eq!(list[0].title, "B");
    let fts: i64 = conn
        .query_row("SELECT count(*) FROM pages_fts", [], |r| r.get(0))
        .unwrap();
    assert_eq!(fts, 1);
}
