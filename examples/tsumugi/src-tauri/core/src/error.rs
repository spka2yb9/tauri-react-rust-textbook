#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("データベースエラー: {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("JSON エラー: {0}")]
    Json(#[from] serde_json::Error),
    #[error("見つかりません: {0}")]
    NotFound(String),
    #[error("不正な入力: {0}")]
    Invalid(String),
}

pub type Result<T> = std::result::Result<T, Error>;
