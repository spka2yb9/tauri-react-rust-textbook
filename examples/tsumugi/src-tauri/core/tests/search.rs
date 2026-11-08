use tsumugi_core::{db, pages, search};

const DOC: &str = r#"[
  {"id":"1","type":"heading","props":{"level":2},"content":[{"type":"text","text":"設計メモ","styles":{}}],"children":[]},
  {"id":"2","type":"paragraph","props":{},"content":[
      {"type":"text","text":"SQLite の","styles":{}},
      {"type":"link","href":"https://sqlite.org","content":[{"type":"text","text":"データベース設計","styles":{"bold":true}}]},
      {"type":"text","text":"について。","styles":{}}
    ],"children":[
      {"id":"3","type":"bulletListItem","props":{},"content":[{"type":"text","text":"子ブロック","styles":{}}],"children":[]}
    ]},
  {"id":"4","type":"image","props":{"url":"asset://x.png","caption":"図1"},"children":[]},
  {"id":"5","type":"table","props":{},"content":{"type":"tableContent","rows":[{"cells":[[{"type":"text","text":"セルA","styles":{}}],[{"type":"text","text":"セルB","styles":{}}]]}]},"children":[]}
]"#;

#[test]
fn extracts_plain_text() {
    let text = search::extract_text(DOC);
    assert_eq!(
        text,
        "設計メモ\nSQLite のデータベース設計について。\n子ブロック\n図1\nセルA セルB"
    );
    assert_eq!(search::extract_text("not json"), "");
}

#[test]
fn fts_finds_japanese_substring() {
    let conn = db::open_in_memory().unwrap();
    let p = pages::create(&conn, None, "DB の話").unwrap();
    pages::save_content(&conn, &p.id, DOC).unwrap();
    let other = pages::create(&conn, None, "無関係").unwrap();
    pages::save_content(
        &conn,
        &other.id,
        r#"[{"type":"paragraph","content":[{"type":"text","text":"りんごとみかん","styles":{}}]}]"#,
    )
    .unwrap();

    let hits = search::search(&conn, "データベース", 10).unwrap();
    assert_eq!(hits.len(), 1);
    assert_eq!(hits[0].id, p.id);
    assert!(
        hits[0].snippet.contains("データベース設計"),
        "{}",
        hits[0].snippet
    );

    // タイトルも検索対象
    let hits = search::search(&conn, "の話", 10).unwrap(); // 2 文字 → LIKE
    assert_eq!(hits.len(), 1);
    let hits = search::search(&conn, "DB の話", 10).unwrap();
    assert_eq!(hits.len(), 1);

    // 更新後は古い語でヒットしない
    pages::save_content(
        &conn,
        &p.id,
        r#"[{"type":"paragraph","content":[{"type":"text","text":"書き換えました","styles":{}}]}]"#,
    )
    .unwrap();
    assert!(
        search::search(&conn, "データベース", 10)
            .unwrap()
            .is_empty()
    );
    assert_eq!(search::search(&conn, "書き換え", 10).unwrap().len(), 1);

    // 空・引用符・演算子っぽい入力でもエラーにならない
    assert!(search::search(&conn, "   ", 10).unwrap().is_empty());
    assert!(
        search::search(&conn, "\"AND OR\" NOT", 10)
            .unwrap()
            .is_empty()
    );

    // 削除で索引も消える
    pages::delete(&conn, &p.id).unwrap();
    assert!(search::search(&conn, "書き換え", 10).unwrap().is_empty());
}
