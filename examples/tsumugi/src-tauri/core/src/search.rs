use rusqlite::{Connection, params};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::Result;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct SearchHit {
    pub id: String,
    pub title: String,
    /// 本文中のヒット箇所の前後を切り出したもの
    pub snippet: String,
}

/// BlockNote の Block[] JSON からプレーンテキストを取り出す（ブロックごとに改行）。
pub fn extract_text(content_json: &str) -> String {
    let blocks: Value = serde_json::from_str(content_json).unwrap_or(Value::Null);
    let mut out = Vec::new();
    collect_blocks(&blocks, &mut out);
    out.join("\n")
}

fn collect_blocks(blocks: &Value, out: &mut Vec<String>) {
    let Some(arr) = blocks.as_array() else { return };
    for block in arr {
        let mut text = String::new();
        match &block["content"] {
            // 通常ブロック: InlineContent[]
            Value::Array(inline) => collect_inline(inline, &mut text),
            // テーブル: { rows: [{ cells: [InlineContent[] | {content: InlineContent[]}] }] }
            Value::Object(table) => {
                if let Some(rows) = table["rows"].as_array() {
                    for row in rows {
                        if let Some(cells) = row["cells"].as_array() {
                            for cell in cells {
                                let inline = cell.as_array().or_else(|| cell["content"].as_array());
                                if let Some(inline) = inline {
                                    collect_inline(inline, &mut text);
                                    text.push(' ');
                                }
                            }
                        }
                    }
                }
            }
            _ => {}
        }
        // 画像などは caption をテキスト扱いにする
        if let Some(caption) = block["props"]["caption"].as_str() {
            text.push_str(caption);
        }
        let text = text.trim().to_owned();
        if !text.is_empty() {
            out.push(text);
        }
        collect_blocks(&block["children"], out);
    }
}

fn collect_inline(inline: &[Value], text: &mut String) {
    for item in inline {
        match item["type"].as_str() {
            Some("text") => text.push_str(item["text"].as_str().unwrap_or("")),
            // link は中に text を持つ
            Some("link") => {
                if let Some(inner) = item["content"].as_array() {
                    collect_inline(inner, text);
                }
            }
            _ => {}
        }
    }
}

/// ページの索引を作り直す（delete + insert）。
pub fn reindex(conn: &Connection, page_id: &str) -> Result<()> {
    let (rowid, title, content): (i64, String, String) = conn.query_row(
        "SELECT rowid, title, content FROM pages WHERE id = ?1",
        [page_id],
        |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)),
    )?;
    conn.execute("DELETE FROM pages_fts WHERE rowid = ?1", [rowid])?;
    conn.execute(
        "INSERT INTO pages_fts(rowid, title, body) VALUES (?1, ?2, ?3)",
        params![rowid, title, extract_text(&content)],
    )?;
    Ok(())
}

pub fn search(conn: &Connection, query: &str, limit: usize) -> Result<Vec<SearchHit>> {
    let query = query.trim();
    if query.is_empty() {
        return Ok(vec![]);
    }
    // trigram は 3 文字未満をヒットさせないので、短い語は LIKE で代用する
    let sql = if query.chars().count() < 3 {
        "SELECT id, title, content FROM pages
         WHERE title LIKE ?1 ESCAPE '\\' OR content LIKE ?1 ESCAPE '\\'
         ORDER BY updated_at DESC LIMIT ?2"
    } else {
        "SELECT p.id, p.title, p.content FROM pages_fts f
         JOIN pages p ON p.rowid = f.rowid
         WHERE pages_fts MATCH ?1 ORDER BY rank LIMIT ?2"
    };
    let arg = if query.chars().count() < 3 {
        format!("%{}%", like_escape(query))
    } else {
        // MATCH の文字列リテラル。" を "" に倍化して演算子として解釈されないようにする
        format!("\"{}\"", query.replace('"', "\"\""))
    };
    let mut stmt = conn.prepare(sql)?;
    let rows = stmt.query_map(params![arg, limit as i64], |r| {
        let content: String = r.get(2)?;
        Ok(SearchHit {
            id: r.get(0)?,
            title: r.get(1)?,
            snippet: make_snippet(&extract_text(&content), query),
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

fn like_escape(s: &str) -> String {
    s.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
}

/// ヒット語の前後 20 文字程度を切り出す。見つからなければ先頭 60 文字。
fn make_snippet(body: &str, query: &str) -> String {
    let chars: Vec<char> = body.chars().collect();
    let lower: Vec<char> = body.to_lowercase().chars().collect();
    let q: Vec<char> = query.to_lowercase().chars().collect();
    let hit = (0..lower.len().saturating_sub(q.len()) + 1).find(|&i| lower[i..].starts_with(&q));
    let (start, end) = match hit {
        Some(i) => (i.saturating_sub(20), (i + q.len() + 20).min(chars.len())),
        None => (0, 60.min(chars.len())),
    };
    let mut s: String = chars[start..end]
        .iter()
        .collect::<String>()
        .replace('\n', " ");
    if start > 0 {
        s.insert(0, '…');
    }
    if end < chars.len() {
        s.push('…');
    }
    s
}
