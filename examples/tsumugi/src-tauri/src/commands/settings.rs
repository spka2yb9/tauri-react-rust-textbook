use tauri::{AppHandle, Manager};

use crate::error::AppResult;

/// データ保存先（設定画面で表示・Finder で開くために使う）。
/// 設定値そのものは tauri-plugin-store がフロントエンドから直接読み書きする。
#[tauri::command]
pub fn data_dir(app: AppHandle) -> AppResult<String> {
    Ok(app.path().app_data_dir()?.to_string_lossy().into_owned())
}
