use serde_json::Value;
use tauri::State;
use tsumugi_core::database::{self, DatabaseBundle, Filter, Property, Row, Sort, View};

use super::with_db;
use crate::{Db, error::AppResult};

#[tauri::command]
pub fn get_database(db: State<'_, Db>, page_id: String) -> AppResult<Option<DatabaseBundle>> {
    with_db(&db, |c| database::get_by_page(c, &page_id))
}

#[tauri::command]
pub fn create_database(
    db: State<'_, Db>,
    page_id: String,
    name: String,
) -> AppResult<DatabaseBundle> {
    with_db(&db, |c| database::create(c, &page_id, &name))
}

#[tauri::command]
pub fn add_property(
    db: State<'_, Db>,
    database_id: String,
    name: String,
    kind: String,
    options: Option<Vec<String>>,
) -> AppResult<Property> {
    with_db(&db, |c| {
        database::add_property(c, &database_id, &name, &kind, options)
    })
}

#[tauri::command]
pub fn update_property(
    db: State<'_, Db>,
    id: String,
    name: String,
    kind: String,
    options: Option<Vec<String>>,
) -> AppResult<()> {
    with_db(&db, |c| {
        database::update_property(c, &id, &name, &kind, options)
    })
}

#[tauri::command]
pub fn delete_property(db: State<'_, Db>, id: String) -> AppResult<()> {
    with_db(&db, |c| database::delete_property(c, &id))
}

#[tauri::command]
pub fn add_row(db: State<'_, Db>, database_id: String) -> AppResult<Row> {
    with_db(&db, |c| database::add_row(c, &database_id))
}

#[tauri::command]
pub fn update_row(db: State<'_, Db>, id: String, values: Value) -> AppResult<()> {
    with_db(&db, |c| database::update_row(c, &id, &values))
}

#[tauri::command]
pub fn delete_row(db: State<'_, Db>, id: String) -> AppResult<()> {
    with_db(&db, |c| database::delete_row(c, &id))
}

#[tauri::command]
pub fn save_view(db: State<'_, Db>, view: View) -> AppResult<View> {
    with_db(&db, |c| database::save_view(c, view))
}

#[tauri::command]
pub fn query_rows(
    db: State<'_, Db>,
    database_id: String,
    sort: Option<Sort>,
    filter: Vec<Filter>,
) -> AppResult<Vec<Row>> {
    with_db(&db, |c| {
        database::query_rows(c, &database_id, sort.as_ref(), &filter)
    })
}
