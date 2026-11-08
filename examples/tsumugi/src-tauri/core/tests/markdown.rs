use serde_json::Value;
use tsumugi_core::markdown;

const BLOCKS: &str = r#"[
  {"type":"heading","props":{"level":2},"content":[{"type":"text","text":"見出し","styles":{}}],"children":[]},
  {"type":"paragraph","props":{},"content":[
    {"type":"text","text":"本文 ","styles":{}},
    {"type":"text","text":"太字","styles":{"bold":true}},
    {"type":"text","text":" と ","styles":{}},
    {"type":"text","text":"code","styles":{"code":true}},
    {"type":"text","text":" と ","styles":{}},
    {"type":"link","href":"https://example.com","content":[{"type":"text","text":"リンク","styles":{}}]}
  ],"children":[]},
  {"type":"bulletListItem","props":{},"content":[{"type":"text","text":"項目1","styles":{}}],"children":[]},
  {"type":"bulletListItem","props":{},"content":[{"type":"text","text":"項目2","styles":{}}],"children":[]},
  {"type":"numberedListItem","props":{},"content":[{"type":"text","text":"番号1","styles":{}}],"children":[]},
  {"type":"checkListItem","props":{"checked":false},"content":[{"type":"text","text":"未完了","styles":{}}],"children":[]},
  {"type":"checkListItem","props":{"checked":true},"content":[{"type":"text","text":"完了","styles":{}}],"children":[]},
  {"type":"codeBlock","props":{"language":"rust"},"content":[{"type":"text","text":"fn main() {\n    println!(\"hi\");\n}","styles":{}}],"children":[]},
  {"type":"quote","props":{},"content":[{"type":"text","text":"引用","styles":{}}],"children":[]},
  {"type":"image","props":{"url":"asset://localhost/a.png","caption":"図"},"children":[]}
]"#;

const MD: &str = "## 見出し

本文 **太字** と `code` と [リンク](https://example.com)

- 項目1
- 項目2

1. 番号1

- [ ] 未完了
- [x] 完了

```rust
fn main() {
    println!(\"hi\");
}
```

> 引用

![図](asset://localhost/a.png)
";

#[test]
fn blocks_to_markdown_matches_expected() {
    assert_eq!(markdown::blocks_to_markdown(BLOCKS).unwrap(), MD);
}

/// 型・props・テキスト・styles だけを比べる（id などは無視）
fn normalize(json: &str) -> Vec<Value> {
    let blocks: Vec<Value> = serde_json::from_str(json).unwrap();
    blocks
        .into_iter()
        .map(|b| {
            let content = b["content"].as_array().cloned().unwrap_or_default();
            let content: Vec<Value> = content
                .into_iter()
                .map(|c| {
                    if c["type"] == "link" {
                        serde_json::json!({"type":"link","href":c["href"],"text":c["content"][0]["text"]})
                    } else {
                        serde_json::json!({"text":c["text"],"styles":c["styles"]})
                    }
                })
                .collect();
            serde_json::json!({"type": b["type"], "props": b["props"], "content": content})
        })
        .collect()
}

#[test]
fn markdown_round_trip() {
    let json = markdown::markdown_to_blocks(MD).unwrap();
    let mut expected = normalize(BLOCKS);
    // 画像は読み込み側が name:"" を補うので揃える
    for b in expected.iter_mut() {
        if b["type"] == "image" {
            b["props"]["name"] = Value::String(String::new());
        }
    }
    assert_eq!(normalize(&json), expected);
    // 再度書き出すと同じ Markdown
    assert_eq!(markdown::blocks_to_markdown(&json).unwrap(), MD);
}

#[test]
fn page_title_round_trip() {
    let md = markdown::page_to_markdown("タイトル", BLOCKS).unwrap();
    assert!(md.starts_with("# タイトル\n\n## 見出し"));
    let (title, body) = markdown::markdown_to_page(&md, "fallback").unwrap();
    assert_eq!(title, "タイトル");
    assert_eq!(markdown::blocks_to_markdown(&body).unwrap(), MD);

    let (title, body) = markdown::markdown_to_page("ただの文\n", "fallback").unwrap();
    assert_eq!(title, "fallback");
    assert_eq!(normalize(&body).len(), 1);
}

#[test]
fn inline_edge_cases() {
    let json = markdown::markdown_to_blocks("*斜体* ~~取消~~ `未閉じ [not link").unwrap();
    let blocks = normalize(&json);
    let content = blocks[0]["content"].as_array().unwrap();
    assert_eq!(content[0]["styles"]["italic"], true);
    assert_eq!(content[2]["styles"]["strike"], true);
    let last = content.last().unwrap();
    assert_eq!(last["text"], " `未閉じ [not link");
}
