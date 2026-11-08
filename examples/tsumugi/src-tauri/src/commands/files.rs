//! Markdown の書き出し・読み込み。
//! ファイルの選択と読み書きそのものはフロントエンド（dialog / fs プラグイン）が行い、
//! ここは「ページ ⇄ Markdown 文字列」の変換だけを担当する。

use tauri::State;
use tsumugi_core::{
    markdown,
    pages::{self, Page},
};

use super::with_db;
use crate::{Db, error::AppResult};

#[tauri::command]
pub fn export_page_markdown(db: State<'_, Db>, id: String) -> AppResult<String> {
    with_db(&db, |c| {
        let page = pages::get(c, &id)?;
        markdown::page_to_markdown(&page.title, &page.content)
    })
}

/// Markdown 文字列から新しいページを作る。先頭の `# 見出し` がタイトルになる。
#[tauri::command]
pub fn import_markdown(
    db: State<'_, Db>,
    markdown: String,
    parent_id: Option<String>,
    fallback_title: String,
) -> AppResult<Page> {
    with_db(&db, |c| {
        let (title, content) = markdown::markdown_to_page(&markdown, &fallback_title)?;
        pages::create_with_content(c, parent_id.as_deref(), &title, &content)
    })
}
