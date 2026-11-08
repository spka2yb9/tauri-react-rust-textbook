use tauri::State;
use tsumugi_core::search::{self, SearchHit};

use super::with_db;
use crate::{Db, error::AppResult};

#[tauri::command]
pub fn search_pages(
    db: State<'_, Db>,
    query: String,
    limit: Option<usize>,
) -> AppResult<Vec<SearchHit>> {
    with_db(&db, |c| search::search(c, &query, limit.unwrap_or(20)))
}
