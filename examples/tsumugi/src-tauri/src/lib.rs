//! Tauri アプリ本体。Builder にプラグインと State を登録し、コマンドを公開する。
//! ドメインロジックは tsumugi-core にあり、ここは薄い層に留める。

mod commands;
mod error;

use std::sync::Mutex;

use rusqlite::Connection;
use tauri::Manager;

/// 管理 State。SQLite の Connection は Sync ではないので Mutex で包む。
/// ponytail: 単一接続 + グローバルロック。ローカル 1 ユーザーのノートには十分。
pub struct Db(pub Mutex<Connection>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // ウィンドウ位置・サイズの保存はデスクトップのみ
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_window_state::Builder::default().build())?;

            // app_data_dir: macOS なら ~/Library/Application Support/jp.tsumugi.app
            let data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(data_dir.join("attachments"))?;
            let conn = tsumugi_core::db::open(&data_dir.join("tsumugi.db"))?;
            app.manage(Db(Mutex::new(conn)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::pages::list_pages,
            commands::pages::get_page,
            commands::pages::create_page,
            commands::pages::rename_page,
            commands::pages::save_page_content,
            commands::pages::set_page_icon,
            commands::pages::move_page,
            commands::pages::delete_page,
            commands::search::search_pages,
            commands::database::get_database,
            commands::database::create_database,
            commands::database::add_property,
            commands::database::update_property,
            commands::database::delete_property,
            commands::database::add_row,
            commands::database::update_row,
            commands::database::delete_row,
            commands::database::save_view,
            commands::database::query_rows,
            commands::files::export_page_markdown,
            commands::files::import_markdown,
            commands::settings::data_dir,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
