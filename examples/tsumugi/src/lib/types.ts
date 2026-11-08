// Rust 側（src-tauri/core）の struct と手でそろえる型。
// serde はフィールド名をそのまま使うので snake_case のまま。

export type Page = {
  id: string;
  parent_id: string | null;
  title: string;
  /** BlockNote の Block[] JSON 文字列 */
  content: string;
  icon: string | null;
  position: number;
  created_at: string;
  updated_at: string;
};

export type PageSummary = Pick<Page, "id" | "parent_id" | "title" | "icon" | "position">;

export type SearchHit = { id: string; title: string; snippet: string };

export const PROPERTY_KINDS = ["text", "number", "select", "checkbox", "date"] as const;
export type PropertyKind = (typeof PROPERTY_KINDS)[number];

export type Database = { id: string; page_id: string; name: string; created_at: string };

export type Property = {
  id: string;
  database_id: string;
  name: string;
  kind: PropertyKind;
  options: string[] | null;
  position: number;
};

export type Row = {
  id: string;
  database_id: string;
  values: Record<string, unknown>;
  position: number;
  created_at: string;
  updated_at: string;
};

export type Sort = { property_id: string; direction: "asc" | "desc" };

export const FILTER_OPS = ["eq", "neq", "contains", "gt", "lt", "empty", "not_empty"] as const;
export type FilterOp = (typeof FILTER_OPS)[number];
export type Filter = { property_id: string; op: FilterOp; value: unknown };

export type View = {
  id: string;
  database_id: string;
  name: string;
  sort: Sort | null;
  filter: Filter[];
};

export type DatabaseBundle = { database: Database; properties: Property[]; views: View[] };

export type Theme = "system" | "light" | "dark";
