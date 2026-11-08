-- 001: 初期スキーマ（教科書と共有するデータモデル）
CREATE TABLE pages (
  id         TEXT PRIMARY KEY,
  parent_id  TEXT NULL REFERENCES pages(id),
  title      TEXT NOT NULL,
  content    TEXT NOT NULL DEFAULT '[]',  -- BlockNote の Block[] JSON
  icon       TEXT NULL,
  position   INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX pages_parent_idx ON pages(parent_id, position);

-- 全文検索。外部コンテンツ無し（content=''）なので本文は保持せず索引だけを持つ。
-- contentless_delete=1 で DELETE 文が使えるようにする（SQLite 3.43+）。
-- rowid は pages の rowid をそのまま使い、検索結果から pages を引く。
CREATE VIRTUAL TABLE pages_fts USING fts5(
  title, body, content='', contentless_delete=1, tokenize='trigram'
);

CREATE TABLE databases (
  id         TEXT PRIMARY KEY,
  page_id    TEXT NOT NULL REFERENCES pages(id),
  name       TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE db_properties (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  name        TEXT NOT NULL,
  kind        TEXT NOT NULL CHECK(kind IN ('text','number','select','checkbox','date')),
  options     TEXT NULL,   -- select の選択肢 JSON
  position    INTEGER NOT NULL
);

CREATE TABLE db_rows (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  "values"    TEXT NOT NULL,  -- {propertyId: value} JSON
  position    INTEGER NOT NULL,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE db_views (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  name        TEXT NOT NULL,
  sort        TEXT NULL,   -- JSON
  filter      TEXT NULL    -- JSON
);
