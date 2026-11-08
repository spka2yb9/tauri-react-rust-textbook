//! tsumugi-core: Tauri に依存しないドメイン層。
//!
//! - `db`       … 接続とマイグレーション
//! - `pages`    … ページの CRUD とツリー操作
//! - `search`   … BlockNote JSON からのテキスト抽出と FTS5 検索
//! - `database` … 簡易データベース（表）とクエリ組み立て
//! - `markdown` … BlockNote JSON ⇄ Markdown
//!
//! Tauri 側（src-tauri/src）はここの関数を薄く包んでコマンドにするだけ。

pub mod database;
pub mod db;
pub mod error;
pub mod markdown;
pub mod pages;
pub mod search;

pub use error::{Error, Result};

pub(crate) fn new_id() -> String {
    uuid::Uuid::new_v4().to_string()
}

pub(crate) fn now() -> String {
    chrono::Utc::now().to_rfc3339_opts(chrono::SecondsFormat::Millis, true)
}
