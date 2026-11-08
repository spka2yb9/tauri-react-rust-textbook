//! 簡易データベース（Notion のテーブルビュー相当）。
//! 行の値は `db_rows."values"` に `{propertyId: value}` の JSON で持ち、
//! 並べ替え・絞り込みは SQLite の json_extract で行う。

use rusqlite::{Connection, OptionalExtension, params, types::Value as SqlValue};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{Error, Result, new_id, now};

pub const KINDS: &[&str] = &["text", "number", "select", "checkbox", "date"];

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Database {
    pub id: String,
    pub page_id: String,
    pub name: String,
    pub created_at: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Property {
    pub id: String,
    pub database_id: String,
    pub name: String,
    pub kind: String,
    /// select の選択肢
    pub options: Option<Vec<String>>,
    pub position: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Row {
    pub id: String,
    pub database_id: String,
    pub values: Value,
    pub position: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Sort {
    pub property_id: String,
    /// "asc" | "desc"
    pub direction: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Filter {
    pub property_id: String,
    /// "eq" | "neq" | "contains" | "gt" | "lt" | "empty" | "not_empty"
    pub op: String,
    #[serde(default)]
    pub value: Value,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct View {
    pub id: String,
    pub database_id: String,
    pub name: String,
    pub sort: Option<Sort>,
    pub filter: Vec<Filter>,
}

/// フロントエンドへ一括で返す形
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct DatabaseBundle {
    pub database: Database,
    pub properties: Vec<Property>,
    pub views: Vec<View>,
}

pub fn create(conn: &Connection, page_id: &str, name: &str) -> Result<DatabaseBundle> {
    let db = Database {
        id: new_id(),
        page_id: page_id.to_owned(),
        name: name.to_owned(),
        created_at: now(),
    };
    conn.execute(
        "INSERT INTO databases (id, page_id, name, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![db.id, db.page_id, db.name, db.created_at],
    )?;
    // 最初のプロパティと既定ビューを用意しておく
    let name_prop = add_property(conn, &db.id, "名前", "text", None)?;
    let view = save_view(
        conn,
        View {
            id: new_id(),
            database_id: db.id.clone(),
            name: "既定".into(),
            sort: None,
            filter: vec![],
        },
    )?;
    Ok(DatabaseBundle {
        database: db,
        properties: vec![name_prop],
        views: vec![view],
    })
}

pub fn get_by_page(conn: &Connection, page_id: &str) -> Result<Option<DatabaseBundle>> {
    let db = conn
        .query_row(
            "SELECT id, page_id, name, created_at FROM databases WHERE page_id = ?1",
            [page_id],
            |r| {
                Ok(Database {
                    id: r.get(0)?,
                    page_id: r.get(1)?,
                    name: r.get(2)?,
                    created_at: r.get(3)?,
                })
            },
        )
        .optional()?;
    let Some(db) = db else { return Ok(None) };
    Ok(Some(DatabaseBundle {
        properties: properties(conn, &db.id)?,
        views: views(conn, &db.id)?,
        database: db,
    }))
}

pub fn properties(conn: &Connection, database_id: &str) -> Result<Vec<Property>> {
    let mut stmt = conn.prepare(
        "SELECT id, database_id, name, kind, options, position FROM db_properties
         WHERE database_id = ?1 ORDER BY position",
    )?;
    let rows = stmt.query_map([database_id], |r| {
        let options: Option<String> = r.get(4)?;
        Ok(Property {
            id: r.get(0)?,
            database_id: r.get(1)?,
            name: r.get(2)?,
            kind: r.get(3)?,
            options: options.and_then(|s| serde_json::from_str(&s).ok()),
            position: r.get(5)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

pub fn add_property(
    conn: &Connection,
    database_id: &str,
    name: &str,
    kind: &str,
    options: Option<Vec<String>>,
) -> Result<Property> {
    check_kind(kind)?;
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM db_properties WHERE database_id = ?1",
        [database_id],
        |r| r.get(0),
    )?;
    let prop = Property {
        id: new_id(),
        database_id: database_id.to_owned(),
        name: name.to_owned(),
        kind: kind.to_owned(),
        options,
        position,
    };
    conn.execute(
        "INSERT INTO db_properties (id, database_id, name, kind, options, position)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            prop.id,
            prop.database_id,
            prop.name,
            prop.kind,
            options_json(&prop.options)?,
            prop.position
        ],
    )?;
    Ok(prop)
}

pub fn update_property(
    conn: &Connection,
    id: &str,
    name: &str,
    kind: &str,
    options: Option<Vec<String>>,
) -> Result<()> {
    check_kind(kind)?;
    let n = conn.execute(
        "UPDATE db_properties SET name = ?1, kind = ?2, options = ?3 WHERE id = ?4",
        params![name, kind, options_json(&options)?, id],
    )?;
    if n == 0 {
        return Err(Error::NotFound(format!("property {id}")));
    }
    Ok(())
}

pub fn delete_property(conn: &Connection, id: &str) -> Result<()> {
    // 行の値側に残る孤児キーはそのまま（表示時に無視される）
    conn.execute("DELETE FROM db_properties WHERE id = ?1", [id])?;
    Ok(())
}

fn check_kind(kind: &str) -> Result<()> {
    if KINDS.contains(&kind) {
        Ok(())
    } else {
        Err(Error::Invalid(format!("unknown property kind: {kind}")))
    }
}

fn options_json(options: &Option<Vec<String>>) -> Result<Option<String>> {
    Ok(match options {
        Some(o) => Some(serde_json::to_string(o)?),
        None => None,
    })
}

pub fn add_row(conn: &Connection, database_id: &str) -> Result<Row> {
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM db_rows WHERE database_id = ?1",
        [database_id],
        |r| r.get(0),
    )?;
    let row = Row {
        id: new_id(),
        database_id: database_id.to_owned(),
        values: Value::Object(Default::default()),
        position,
        created_at: now(),
        updated_at: now(),
    };
    conn.execute(
        "INSERT INTO db_rows (id, database_id, \"values\", position, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            row.id,
            row.database_id,
            row.values.to_string(),
            row.position,
            row.created_at,
            row.updated_at
        ],
    )?;
    Ok(row)
}

pub fn update_row(conn: &Connection, id: &str, values: &Value) -> Result<()> {
    if !values.is_object() {
        return Err(Error::Invalid("values must be a JSON object".into()));
    }
    let n = conn.execute(
        "UPDATE db_rows SET \"values\" = ?1, updated_at = ?2 WHERE id = ?3",
        params![values.to_string(), now(), id],
    )?;
    if n == 0 {
        return Err(Error::NotFound(format!("row {id}")));
    }
    Ok(())
}

pub fn delete_row(conn: &Connection, id: &str) -> Result<()> {
    conn.execute("DELETE FROM db_rows WHERE id = ?1", [id])?;
    Ok(())
}

pub fn views(conn: &Connection, database_id: &str) -> Result<Vec<View>> {
    let mut stmt = conn.prepare(
        "SELECT id, database_id, name, sort, filter FROM db_views WHERE database_id = ?1 ORDER BY name",
    )?;
    let rows = stmt.query_map([database_id], |r| {
        let sort: Option<String> = r.get(3)?;
        let filter: Option<String> = r.get(4)?;
        Ok(View {
            id: r.get(0)?,
            database_id: r.get(1)?,
            name: r.get(2)?,
            sort: sort.and_then(|s| serde_json::from_str(&s).ok()),
            filter: filter
                .and_then(|s| serde_json::from_str(&s).ok())
                .unwrap_or_default(),
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

/// ビューを upsert する。
pub fn save_view(conn: &Connection, view: View) -> Result<View> {
    let sort = match &view.sort {
        Some(s) => Some(serde_json::to_string(s)?),
        None => None,
    };
    let filter = if view.filter.is_empty() {
        None
    } else {
        Some(serde_json::to_string(&view.filter)?)
    };
    conn.execute(
        "INSERT INTO db_views (id, database_id, name, sort, filter) VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT(id) DO UPDATE SET name = excluded.name, sort = excluded.sort, filter = excluded.filter",
        params![view.id, view.database_id, view.name, sort, filter],
    )?;
    Ok(view)
}

/// 並べ替え・絞り込みを適用して行を返す。
pub fn query_rows(
    conn: &Connection,
    database_id: &str,
    sort: Option<&Sort>,
    filter: &[Filter],
) -> Result<Vec<Row>> {
    let props = properties(conn, database_id)?;
    let (sql, args) = build_query(database_id, &props, sort, filter)?;
    let mut stmt = conn.prepare(&sql)?;
    let rows = stmt.query_map(rusqlite::params_from_iter(args), |r| {
        let values: String = r.get(2)?;
        Ok(Row {
            id: r.get(0)?,
            database_id: r.get(1)?,
            values: serde_json::from_str(&values).unwrap_or(Value::Null),
            position: r.get(3)?,
            created_at: r.get(4)?,
            updated_at: r.get(5)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

/// SQL とバインド値を組み立てる（純粋関数。テストしやすいよう分離）。
///
/// 安全のための約束:
/// - プロパティはこのデータベースに実在するもの（ホワイトリスト）だけ使う
/// - JSON パス・比較値はすべてプレースホルダで渡し、SQL 文字列に埋め込まない
pub fn build_query(
    database_id: &str,
    props: &[Property],
    sort: Option<&Sort>,
    filter: &[Filter],
) -> Result<(String, Vec<SqlValue>)> {
    let find = |id: &str| {
        props
            .iter()
            .find(|p| p.id == id)
            .ok_or_else(|| Error::Invalid(format!("unknown property: {id}")))
    };
    let mut sql = String::from(
        "SELECT id, database_id, \"values\", position, created_at, updated_at FROM db_rows WHERE database_id = ?",
    );
    let mut args: Vec<SqlValue> = vec![SqlValue::Text(database_id.to_owned())];

    for f in filter {
        let prop = find(&f.property_id)?;
        let col = column_expr(prop);
        args.push(SqlValue::Text(json_path(&prop.id)));
        let clause = match f.op.as_str() {
            "eq" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} = ?")
            }
            "neq" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} IS NOT ?")
            }
            "contains" => {
                let s = f.value.as_str().unwrap_or_default();
                args.push(SqlValue::Text(format!(
                    "%{}%",
                    s.replace('\\', "\\\\")
                        .replace('%', "\\%")
                        .replace('_', "\\_")
                )));
                format!("{col} LIKE ? ESCAPE '\\'")
            }
            "gt" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} > ?")
            }
            "lt" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} < ?")
            }
            "empty" => format!("({col} IS NULL OR {col} = '')"),
            "not_empty" => format!("({col} IS NOT NULL AND {col} <> '')"),
            other => return Err(Error::Invalid(format!("unknown filter op: {other}"))),
        };
        // empty / not_empty は col を 2 回使うのでパスも 2 回バインドする
        if f.op == "empty" || f.op == "not_empty" {
            args.push(SqlValue::Text(json_path(&prop.id)));
        }
        sql.push_str(" AND ");
        sql.push_str(&clause);
    }

    sql.push_str(" ORDER BY ");
    if let Some(s) = sort {
        let prop = find(&s.property_id)?;
        let dir = match s.direction.as_str() {
            "asc" => "ASC",
            "desc" => "DESC",
            other => return Err(Error::Invalid(format!("unknown direction: {other}"))),
        };
        args.push(SqlValue::Text(json_path(&prop.id)));
        sql.push_str(&format!("{} {dir}, ", column_expr(prop)));
    }
    sql.push_str("position ASC");
    Ok((sql, args))
}

/// JSON パス `$."<id>"` を作る。id はバインド値として渡すので SQL には混ざらない。
fn json_path(property_id: &str) -> String {
    format!("$.\"{}\"", property_id.replace('"', ""))
}

fn column_expr(prop: &Property) -> &'static str {
    match prop.kind.as_str() {
        "number" => "CAST(json_extract(\"values\", ?) AS REAL)",
        _ => "json_extract(\"values\", ?)",
    }
}

fn to_sql(v: &Value, kind: &str) -> SqlValue {
    match v {
        Value::Null => SqlValue::Null,
        Value::Bool(b) => SqlValue::Integer(*b as i64),
        Value::Number(n) => n
            .as_i64()
            .map(SqlValue::Integer)
            .or_else(|| n.as_f64().map(SqlValue::Real))
            .unwrap_or(SqlValue::Null),
        Value::String(s) if kind == "number" => s
            .parse::<f64>()
            .map(SqlValue::Real)
            .unwrap_or(SqlValue::Null),
        Value::String(s) if kind == "checkbox" => {
            SqlValue::Integer((s == "true" || s == "1") as i64)
        }
        Value::String(s) => SqlValue::Text(s.clone()),
        other => SqlValue::Text(other.to_string()),
    }
}
