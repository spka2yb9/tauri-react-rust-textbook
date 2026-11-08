use tauri::State;
use tsumugi_core::pages::{self, Page, PageSummary};

use super::with_db;
use crate::{Db, error::AppResult};

// 引数名は JS 側で camelCase になる（parent_id → parentId）

#[tauri::command]
pub fn list_pages(db: State<'_, Db>) -> AppResult<Vec<PageSummary>> {
    with_db(&db, pages::list)
}

#[tauri::command]
pub fn get_page(db: State<'_, Db>, id: String) -> AppResult<Page> {
    with_db(&db, |c| pages::get(c, &id))
}

#[tauri::command]
pub fn create_page(db: State<'_, Db>, parent_id: Option<String>, title: String) -> AppResult<Page> {
    with_db(&db, |c| pages::create(c, parent_id.as_deref(), &title))
}

#[tauri::command]
pub fn rename_page(db: State<'_, Db>, id: String, title: String) -> AppResult<()> {
    with_db(&db, |c| pages::rename(c, &id, &title))
}

#[tauri::command]
pub fn save_page_content(db: State<'_, Db>, id: String, content: String) -> AppResult<()> {
    with_db(&db, |c| pages::save_content(c, &id, &content))
}

#[tauri::command]
pub fn set_page_icon(db: State<'_, Db>, id: String, icon: Option<String>) -> AppResult<()> {
    with_db(&db, |c| pages::set_icon(c, &id, icon.as_deref()))
}

#[tauri::command]
pub fn move_page(
    db: State<'_, Db>,
    id: String,
    parent_id: Option<String>,
    position: usize,
) -> AppResult<()> {
    with_db(&db, |c| {
        pages::move_page(c, &id, parent_id.as_deref(), position)
    })
}

#[tauri::command]
pub fn delete_page(db: State<'_, Db>, id: String) -> AppResult<()> {
    with_db(&db, |c| pages::delete(c, &id))
}
