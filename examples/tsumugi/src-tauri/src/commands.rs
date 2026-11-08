pub mod database;
pub mod files;
pub mod pages;
pub mod search;
pub mod settings;

use rusqlite::Connection;
use tauri::State;

use crate::{
    Db,
    error::{AppError, AppResult},
};

/// ロックを取って core の関数を呼ぶ共通ヘルパー。
pub fn with_db<T>(
    db: &State<'_, Db>,
    f: impl FnOnce(&Connection) -> tsumugi_core::Result<T>,
) -> AppResult<T> {
    let conn =
        db.0.lock()
            .map_err(|e| AppError::Internal(format!("lock poisoned: {e}")))?;
    Ok(f(&conn)?)
}
