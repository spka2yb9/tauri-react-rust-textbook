// Tauri コマンドの型付きラッパー。invoke を直接呼ぶのはこのファイルだけにする。
// 引数のキーは Rust の snake_case 引数が camelCase に変換されたもの（parent_id → parentId）。
import { invoke } from "@tauri-apps/api/core";

import type {
  DatabaseBundle,
  Filter,
  Page,
  PageSummary,
  Property,
  PropertyKind,
  Row,
  SearchHit,
  Sort,
  View,
} from "./types";

// ---- pages ----
export const listPages = () => invoke<PageSummary[]>("list_pages");
export const getPage = (id: string) => invoke<Page>("get_page", { id });
export const createPage = (parentId: string | null, title: string) =>
  invoke<Page>("create_page", { parentId, title });
export const renamePage = (id: string, title: string) => invoke<void>("rename_page", { id, title });
export const savePageContent = (id: string, content: string) =>
  invoke<void>("save_page_content", { id, content });
export const setPageIcon = (id: string, icon: string | null) =>
  invoke<void>("set_page_icon", { id, icon });
export const movePage = (id: string, parentId: string | null, position: number) =>
  invoke<void>("move_page", { id, parentId, position });
export const deletePage = (id: string) => invoke<void>("delete_page", { id });

// ---- search ----
export const searchPages = (query: string, limit = 20) =>
  invoke<SearchHit[]>("search_pages", { query, limit });

// ---- database ----
export const getDatabase = (pageId: string) =>
  invoke<DatabaseBundle | null>("get_database", { pageId });
export const createDatabase = (pageId: string, name: string) =>
  invoke<DatabaseBundle>("create_database", { pageId, name });
export const addProperty = (
  databaseId: string,
  name: string,
  kind: PropertyKind,
  options: string[] | null,
) => invoke<Property>("add_property", { databaseId, name, kind, options });
export const updateProperty = (
  id: string,
  name: string,
  kind: PropertyKind,
  options: string[] | null,
) => invoke<void>("update_property", { id, name, kind, options });
export const deleteProperty = (id: string) => invoke<void>("delete_property", { id });
export const addRow = (databaseId: string) => invoke<Row>("add_row", { databaseId });
export const updateRow = (id: string, values: Record<string, unknown>) =>
  invoke<void>("update_row", { id, values });
export const deleteRow = (id: string) => invoke<void>("delete_row", { id });
export const saveView = (view: View) => invoke<View>("save_view", { view });
export const queryRows = (databaseId: string, sort: Sort | null, filter: Filter[]) =>
  invoke<Row[]>("query_rows", { databaseId, sort, filter });

// ---- files / settings ----
export const exportPageMarkdown = (id: string) => invoke<string>("export_page_markdown", { id });
export const importMarkdown = (markdown: string, parentId: string | null, fallbackTitle: string) =>
  invoke<Page>("import_markdown", { markdown, parentId, fallbackTitle });
export const dataDir = () => invoke<string>("data_dir");
