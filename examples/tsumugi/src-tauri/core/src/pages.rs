use rusqlite::{Connection, OptionalExtension, params};
use serde::{Deserialize, Serialize};

use crate::{Error, Result, new_id, now, search};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Page {
    pub id: String,
    pub parent_id: Option<String>,
    pub title: String,
    /// BlockNote の Block[] JSON 文字列
    pub content: String,
    pub icon: Option<String>,
    pub position: i64,
    pub created_at: String,
    pub updated_at: String,
}

/// サイドバー用。本文を含まない。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PageSummary {
    pub id: String,
    pub parent_id: Option<String>,
    pub title: String,
    pub icon: Option<String>,
    pub position: i64,
}

const COLS: &str = "id, parent_id, title, content, icon, position, created_at, updated_at";

fn row_to_page(r: &rusqlite::Row) -> rusqlite::Result<Page> {
    Ok(Page {
        id: r.get(0)?,
        parent_id: r.get(1)?,
        title: r.get(2)?,
        content: r.get(3)?,
        icon: r.get(4)?,
        position: r.get(5)?,
        created_at: r.get(6)?,
        updated_at: r.get(7)?,
    })
}

/// 全ページを (parent_id, position) 順で返す。ツリー化はフロントエンドで行う。
pub fn list(conn: &Connection) -> Result<Vec<PageSummary>> {
    let mut stmt = conn.prepare(
        "SELECT id, parent_id, title, icon, position FROM pages ORDER BY parent_id, position",
    )?;
    let rows = stmt.query_map([], |r| {
        Ok(PageSummary {
            id: r.get(0)?,
            parent_id: r.get(1)?,
            title: r.get(2)?,
            icon: r.get(3)?,
            position: r.get(4)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

pub fn get(conn: &Connection, id: &str) -> Result<Page> {
    conn.query_row(
        &format!("SELECT {COLS} FROM pages WHERE id = ?1"),
        [id],
        row_to_page,
    )
    .optional()?
    .ok_or_else(|| Error::NotFound(format!("page {id}")))
}

pub fn create(conn: &Connection, parent_id: Option<&str>, title: &str) -> Result<Page> {
    create_with_content(conn, parent_id, title, "[]")
}

pub fn create_with_content(
    conn: &Connection,
    parent_id: Option<&str>,
    title: &str,
    content: &str,
) -> Result<Page> {
    if let Some(p) = parent_id {
        get(conn, p)?; // 親の存在確認
    }
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM pages WHERE parent_id IS ?1",
        [parent_id],
        |r| r.get(0),
    )?;
    let page = Page {
        id: new_id(),
        parent_id: parent_id.map(str::to_owned),
        title: title.to_owned(),
        content: content.to_owned(),
        icon: None,
        position,
        created_at: now(),
        updated_at: now(),
    };
    conn.execute(
        &format!("INSERT INTO pages ({COLS}) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)"),
        params![
            page.id,
            page.parent_id,
            page.title,
            page.content,
            page.icon,
            page.position,
            page.created_at,
            page.updated_at
        ],
    )?;
    search::reindex(conn, &page.id)?;
    Ok(page)
}

pub fn rename(conn: &Connection, id: &str, title: &str) -> Result<()> {
    touch(conn, id, "title", title)?;
    search::reindex(conn, id)
}

pub fn save_content(conn: &Connection, id: &str, content: &str) -> Result<()> {
    // 保存前に JSON として妥当か確認し、壊れたデータを書かない
    serde_json::from_str::<serde_json::Value>(content)?;
    touch(conn, id, "content", content)?;
    search::reindex(conn, id)
}

pub fn set_icon(conn: &Connection, id: &str, icon: Option<&str>) -> Result<()> {
    touch(conn, id, "icon", icon)
}

fn touch(conn: &Connection, id: &str, col: &str, value: impl rusqlite::ToSql) -> Result<()> {
    // col は呼び出し側の固定文字列のみ（ユーザー入力は通さない）
    let n = conn.execute(
        &format!("UPDATE pages SET {col} = ?1, updated_at = ?2 WHERE id = ?3"),
        params![value, now(), id],
    )?;
    if n == 0 {
        return Err(Error::NotFound(format!("page {id}")));
    }
    Ok(())
}

/// 自分自身と全ての子孫の id を返す。浅い順に並び、先頭は自分。
pub fn descendants(conn: &Connection, id: &str) -> Result<Vec<String>> {
    // 再帰 CTE の取り出し順は未定義なので、深さを持たせて ORDER BY で順序を保証する
    let mut stmt = conn.prepare(
        "WITH RECURSIVE tree(id, depth) AS (
           SELECT id, 0 FROM pages WHERE id = ?1
           UNION ALL
           SELECT p.id, tree.depth + 1 FROM pages p JOIN tree ON p.parent_id = tree.id
         ) SELECT id FROM tree ORDER BY depth",
    )?;
    let ids = stmt.query_map([id], |r| r.get(0))?;
    Ok(ids.collect::<rusqlite::Result<_>>()?)
}

/// ページを別の親の下の position 番目へ移動する。自分の子孫の下には移動できない。
pub fn move_page(
    conn: &Connection,
    id: &str,
    new_parent: Option<&str>,
    position: usize,
) -> Result<()> {
    get(conn, id)?;
    if let Some(p) = new_parent
        && descendants(conn, id)?.iter().any(|d| d == p)
    {
        return Err(Error::Invalid(
            "自分自身や子孫の下には移動できません".into(),
        ));
    }
    let tx = conn.unchecked_transaction()?;
    // 移動先の兄弟（自分を除く）を取り出し、指定位置に差し込んで 0.. で振り直す
    let mut siblings: Vec<String> = {
        let mut stmt = tx
            .prepare("SELECT id FROM pages WHERE parent_id IS ?1 AND id <> ?2 ORDER BY position")?;
        let ids = stmt.query_map(params![new_parent, id], |r| r.get(0))?;
        ids.collect::<rusqlite::Result<_>>()?
    };
    siblings.insert(position.min(siblings.len()), id.to_owned());
    for (i, sid) in siblings.iter().enumerate() {
        tx.execute(
            "UPDATE pages SET parent_id = ?1, position = ?2 WHERE id = ?3",
            params![new_parent, i as i64, sid],
        )?;
    }
    tx.execute(
        "UPDATE pages SET updated_at = ?1 WHERE id = ?2",
        params![now(), id],
    )?;
    tx.commit()?;
    Ok(())
}

/// ページと子孫、付随するデータベースをまとめて削除する。
pub fn delete(conn: &Connection, id: &str) -> Result<()> {
    let ids = descendants(conn, id)?;
    if ids.is_empty() {
        return Err(Error::NotFound(format!("page {id}")));
    }
    let tx = conn.unchecked_transaction()?;
    // 葉から順に消す（parent_id の外部キーがあるため逆順）
    for pid in ids.iter().rev() {
        tx.execute(
            "DELETE FROM db_rows WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute(
            "DELETE FROM db_properties WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute(
            "DELETE FROM db_views WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute("DELETE FROM databases WHERE page_id = ?1", [pid])?;
        tx.execute(
            "DELETE FROM pages_fts WHERE rowid = (SELECT rowid FROM pages WHERE id = ?1)",
            [pid],
        )?;
        tx.execute("DELETE FROM pages WHERE id = ?1", [pid])?;
    }
    tx.commit()?;
    Ok(())
}
