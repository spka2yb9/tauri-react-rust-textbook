//! BlockNote の Block[] JSON ⇄ Markdown。
//!
//! 対応ブロック: heading / paragraph / bulletListItem / numberedListItem /
//! checkListItem / codeBlock / quote / image。
//! インライン装飾: bold(**) / italic(*) / code(`) / strike(~~)。
//!
//! ponytail: 入れ子（children）は書き出し時に平坦化し、読み込みでもネストしない。
//! 階層付きリストが必要になったらインデント幅で親子を復元する。

use serde_json::{Value, json};

use crate::Result;

// ---------- 書き出し ----------

/// ページ全体を Markdown にする。先頭行が `# タイトル`。
pub fn page_to_markdown(title: &str, content_json: &str) -> Result<String> {
    let body = blocks_to_markdown(content_json)?;
    Ok(format!("# {title}\n\n{body}"))
}

pub fn blocks_to_markdown(content_json: &str) -> Result<String> {
    let blocks: Value = serde_json::from_str(content_json)?;
    let mut lines = Vec::new();
    write_blocks(&blocks, &mut lines);
    let mut out = lines.join("\n");
    if !out.is_empty() {
        out.push('\n');
    }
    Ok(out)
}

fn write_blocks(blocks: &Value, lines: &mut Vec<String>) {
    let Some(arr) = blocks.as_array() else { return };
    let mut prev_type = "";
    for block in arr {
        let ty = block["type"].as_str().unwrap_or("paragraph");
        let text = inline_to_markdown(&block["content"]);
        // リスト項目同士以外は空行で区切る
        let is_list = matches!(ty, "bulletListItem" | "numberedListItem" | "checkListItem");
        if !lines.is_empty() && !(is_list && prev_type == ty) {
            lines.push(String::new());
        }
        match ty {
            "heading" => {
                let level = block["props"]["level"].as_u64().unwrap_or(1).clamp(1, 6) as usize;
                lines.push(format!("{} {text}", "#".repeat(level)));
            }
            "bulletListItem" => lines.push(format!("- {text}")),
            "numberedListItem" => lines.push(format!("1. {text}")),
            "checkListItem" => {
                let mark = if block["props"]["checked"].as_bool().unwrap_or(false) {
                    "x"
                } else {
                    " "
                };
                lines.push(format!("- [{mark}] {text}"));
            }
            "codeBlock" => {
                let lang = block["props"]["language"].as_str().unwrap_or("");
                let raw = plain_text(&block["content"]);
                lines.push(format!("```{lang}"));
                lines.extend(raw.lines().map(str::to_owned));
                lines.push("```".into());
            }
            "quote" => lines.push(format!("> {text}")),
            "image" => {
                let url = block["props"]["url"].as_str().unwrap_or("");
                let caption = block["props"]["caption"].as_str().unwrap_or("");
                lines.push(format!("![{caption}]({url})"));
            }
            _ => lines.push(text),
        }
        prev_type = ty;
        write_blocks(&block["children"], lines);
    }
}

fn plain_text(content: &Value) -> String {
    let mut s = String::new();
    if let Some(items) = content.as_array() {
        for item in items {
            if let Some(t) = item["text"].as_str() {
                s.push_str(t);
            } else if let Some(inner) = item["content"].as_array() {
                s.push_str(&plain_text(&Value::Array(inner.clone())));
            }
        }
    }
    s
}

fn inline_to_markdown(content: &Value) -> String {
    let mut s = String::new();
    let Some(items) = content.as_array() else {
        return s;
    };
    for item in items {
        match item["type"].as_str() {
            Some("text") => {
                let text = item["text"].as_str().unwrap_or("");
                let styles = &item["styles"];
                let mut t = text.to_owned();
                if styles["code"].as_bool() == Some(true) {
                    t = format!("`{t}`");
                }
                if styles["bold"].as_bool() == Some(true) {
                    t = format!("**{t}**");
                }
                if styles["italic"].as_bool() == Some(true) {
                    t = format!("*{t}*");
                }
                if styles["strike"].as_bool() == Some(true) {
                    t = format!("~~{t}~~");
                }
                s.push_str(&t);
            }
            Some("link") => {
                let inner = inline_to_markdown(&item["content"]);
                let href = item["href"].as_str().unwrap_or("");
                s.push_str(&format!("[{inner}]({href})"));
            }
            _ => {}
        }
    }
    s
}

// ---------- 読み込み ----------

/// `# タイトル` で始まる Markdown を (タイトル, Block[] JSON) に分ける。
/// 見出しが無ければタイトルは `fallback_title`。
pub fn markdown_to_page(md: &str, fallback_title: &str) -> Result<(String, String)> {
    let mut lines = md.lines().peekable();
    while lines.peek().is_some_and(|l| l.trim().is_empty()) {
        lines.next();
    }
    let (title, rest): (String, String) = match lines.peek().and_then(|l| l.strip_prefix("# ")) {
        Some(t) => {
            let t = t.trim().to_owned();
            lines.next();
            (t, lines.collect::<Vec<_>>().join("\n"))
        }
        None => (
            fallback_title.to_owned(),
            lines.collect::<Vec<_>>().join("\n"),
        ),
    };
    Ok((title, markdown_to_blocks(&rest)?))
}

pub fn markdown_to_blocks(md: &str) -> Result<String> {
    let mut blocks: Vec<Value> = Vec::new();
    let mut lines = md.lines().peekable();
    while let Some(line) = lines.next() {
        let trimmed = line.trim_end();
        if trimmed.trim().is_empty() {
            continue;
        }
        if let Some(lang) = trimmed.strip_prefix("```") {
            let mut code = Vec::new();
            for l in lines.by_ref() {
                if l.trim_end() == "```" {
                    break;
                }
                code.push(l);
            }
            blocks.push(block(
                "codeBlock",
                json!({ "language": lang.trim() }),
                vec![text_node(&code.join("\n"), json!({}))],
            ));
        } else if let Some((level, rest)) = heading(trimmed) {
            blocks.push(block(
                "heading",
                json!({ "level": level }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed
            .strip_prefix("- [ ] ")
            .or(trimmed.strip_prefix("* [ ] "))
        {
            blocks.push(block(
                "checkListItem",
                json!({ "checked": false }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed
            .strip_prefix("- [x] ")
            .or(trimmed.strip_prefix("* [x] "))
        {
            blocks.push(block(
                "checkListItem",
                json!({ "checked": true }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed.strip_prefix("- ").or(trimmed.strip_prefix("* ")) {
            blocks.push(block("bulletListItem", json!({}), parse_inline(rest)));
        } else if let Some(rest) = numbered(trimmed) {
            blocks.push(block("numberedListItem", json!({}), parse_inline(rest)));
        } else if let Some(rest) = trimmed.strip_prefix("> ") {
            blocks.push(block("quote", json!({}), parse_inline(rest)));
        } else if let Some((caption, url)) = image(trimmed) {
            blocks.push(json!({
                "type": "image",
                "props": { "url": url, "caption": caption, "name": "" },
                "children": []
            }));
        } else {
            blocks.push(block("paragraph", json!({}), parse_inline(trimmed)));
        }
    }
    Ok(serde_json::to_string(&blocks)?)
}

fn block(ty: &str, props: Value, content: Vec<Value>) -> Value {
    json!({ "type": ty, "props": props, "content": content, "children": [] })
}

fn text_node(text: &str, styles: Value) -> Value {
    json!({ "type": "text", "text": text, "styles": styles })
}

fn heading(line: &str) -> Option<(usize, &str)> {
    let level = line.chars().take_while(|&c| c == '#').count();
    if (1..=6).contains(&level) {
        line[level..].strip_prefix(' ').map(|rest| (level, rest))
    } else {
        None
    }
}

fn numbered(line: &str) -> Option<&str> {
    let digits = line.chars().take_while(char::is_ascii_digit).count();
    if digits == 0 {
        return None;
    }
    line[digits..].strip_prefix(". ")
}

fn image(line: &str) -> Option<(&str, &str)> {
    let rest = line.strip_prefix("![")?;
    let (caption, rest) = rest.split_once("](")?;
    let url = rest.strip_suffix(')')?;
    Some((caption, url))
}

/// `**bold**` `*italic*` `` `code` `` `~~strike~~` `[text](url)` を InlineContent[] にする。
fn parse_inline(s: &str) -> Vec<Value> {
    let mut out = Vec::new();
    let mut buf = String::new();
    let mut bold = false;
    let mut italic = false;
    let mut strike = false;
    let chars: Vec<char> = s.chars().collect();
    let mut i = 0;

    let flush = |buf: &mut String, out: &mut Vec<Value>, bold: bool, italic: bool, strike: bool| {
        if buf.is_empty() {
            return;
        }
        let mut styles = serde_json::Map::new();
        if bold {
            styles.insert("bold".into(), json!(true));
        }
        if italic {
            styles.insert("italic".into(), json!(true));
        }
        if strike {
            styles.insert("strike".into(), json!(true));
        }
        out.push(text_node(&std::mem::take(buf), Value::Object(styles)));
    };

    while i < chars.len() {
        let two: String = chars[i..(i + 2).min(chars.len())].iter().collect();
        if two == "**" || two == "~~" {
            flush(&mut buf, &mut out, bold, italic, strike);
            if two == "**" {
                bold = !bold
            } else {
                strike = !strike
            }
            i += 2;
        } else if chars[i] == '*' {
            flush(&mut buf, &mut out, bold, italic, strike);
            italic = !italic;
            i += 1;
        } else if chars[i] == '`' {
            // 閉じバッククォートまでをコード
            if let Some(end) = chars[i + 1..].iter().position(|&c| c == '`') {
                flush(&mut buf, &mut out, bold, italic, strike);
                let code: String = chars[i + 1..i + 1 + end].iter().collect();
                out.push(text_node(&code, json!({ "code": true })));
                i += end + 2;
            } else {
                buf.push('`');
                i += 1;
            }
        } else if chars[i] == '[' {
            // [text](url)
            let rest: String = chars[i..].iter().collect();
            match rest.split_once("](").and_then(|(t, r)| {
                r.split_once(')')
                    .map(|(u, _)| (t[1..].to_owned(), u.to_owned()))
            }) {
                Some((text, href)) if !text.contains('[') => {
                    flush(&mut buf, &mut out, bold, italic, strike);
                    out.push(json!({
                        "type": "link",
                        "href": href,
                        "content": [text_node(&text, json!({}))]
                    }));
                    i += text.chars().count() + href.chars().count() + 4;
                }
                _ => {
                    buf.push('[');
                    i += 1;
                }
            }
        } else {
            buf.push(chars[i]);
            i += 1;
        }
    }
    flush(&mut buf, &mut out, bold, italic, strike);
    out
}
