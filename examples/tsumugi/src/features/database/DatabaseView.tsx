// ページに紐づく簡易データベース（表ビュー）。
// 並べ替え・絞り込みの条件は db_views に保存し、行の取得は Rust の query_rows に任せる。
import { useCallback, useEffect, useState } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import type { DatabaseBundle, Filter, Property, PropertyKind, Row, View } from "../../lib/types";
import { CellEditor } from "./CellEditor";
import { FilterBar } from "./FilterBar";
import { PropertyForm } from "./PropertyForm";

export function DatabaseView({ pageId }: { pageId: string }) {
  const [bundle, setBundle] = useState<DatabaseBundle | null | undefined>(undefined);
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<"new" | Property | null>(null);

  const view: View | undefined = bundle?.views[0];

  useEffect(() => {
    ipc.getDatabase(pageId).then(setBundle).catch(toastError);
  }, [pageId]);

  const loadRows = useCallback(async () => {
    if (!bundle || !view) return;
    try {
      setRows(await ipc.queryRows(bundle.database.id, view.sort, view.filter));
    } catch (e) {
      toastError(e);
    }
  }, [bundle, view]);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const reloadBundle = () => ipc.getDatabase(pageId).then(setBundle).catch(toastError);

  if (bundle === undefined) return null;
  if (bundle === null) {
    return (
      <div className="db-empty">
        <button onClick={() => ipc.createDatabase(pageId, "データベース").then(setBundle).catch(toastError)}>
          ▦ データベースを追加
        </button>
      </div>
    );
  }
  if (!view) return null;
  const { database, properties } = bundle;

  // ビュー（並べ替え・絞り込み）を保存して行を取り直す
  const updateView = async (patch: Partial<View>) => {
    try {
      const saved = await ipc.saveView({ ...view, ...patch });
      setBundle({ ...bundle, views: [saved, ...bundle.views.slice(1)] });
    } catch (e) {
      toastError(e);
    }
  };
  const toggleSort = (propertyId: string) => {
    const s = view.sort;
    const next =
      s?.property_id !== propertyId
        ? { property_id: propertyId, direction: "asc" as const }
        : s.direction === "asc"
          ? { property_id: propertyId, direction: "desc" as const }
          : null;
    void updateView({ sort: next });
  };
  const setFilter = (filter: Filter[]) => void updateView({ filter });

  const submitProperty = async (name: string, kind: PropertyKind, options: string[] | null) => {
    try {
      if (editing === "new") await ipc.addProperty(database.id, name, kind, options);
      else if (editing) await ipc.updateProperty(editing.id, name, kind, options);
      setEditing(null);
      await reloadBundle();
    } catch (e) {
      toastError(e);
    }
  };
  const removeProperty = async () => {
    if (!editing || editing === "new") return;
    await ipc.deleteProperty(editing.id).catch(toastError);
    setEditing(null);
    await reloadBundle();
  };

  const setCell = (row: Row, propertyId: string, value: unknown) => {
    const values = { ...row.values, [propertyId]: value };
    setRows(rows.map((r) => (r.id === row.id ? { ...r, values } : r)));
    ipc.updateRow(row.id, values).catch(toastError);
  };
  const addRow = () => ipc.addRow(database.id).then(loadRows).catch(toastError);
  const removeRow = (id: string) => ipc.deleteRow(id).then(loadRows).catch(toastError);

  const sortMark = (p: Property) =>
    view.sort?.property_id === p.id ? (view.sort.direction === "asc" ? " ▲" : " ▼") : "";

  return (
    <section className="db">
      <h3 className="db-name">▦ {database.name}</h3>
      <FilterBar properties={properties} filter={view.filter} onChange={setFilter} />
      <div className="db-scroll">
        <table className="db-table">
          <thead>
            <tr>
              {properties.map((p) => (
                <th key={p.id}>
                  <button className="th-sort" onClick={() => toggleSort(p.id)} title="クリックで並べ替え">
                    {p.name}
                    {sortMark(p)}
                  </button>
                  <button className="th-edit" onClick={() => setEditing(p)} title="プロパティを編集">
                    ✎
                  </button>
                </th>
              ))}
              <th>
                <button onClick={() => setEditing("new")} title="プロパティを追加">
                  ＋
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {properties.map((p) => (
                  <td key={p.id}>
                    <CellEditor property={p} value={row.values[p.id]} onChange={(v) => setCell(row, p.id, v)} />
                  </td>
                ))}
                <td>
                  <button className="row-delete" onClick={() => void removeRow(row.id)} title="行を削除">
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="db-add-row" onClick={() => void addRow()}>
        ＋ 行を追加
      </button>
      {editing && (
        <PropertyForm
          key={editing === "new" ? "new" : editing.id}
          initial={editing === "new" ? undefined : editing}
          onSubmit={submitProperty}
          onDelete={editing === "new" ? undefined : removeProperty}
          onCancel={() => setEditing(null)}
        />
      )}
    </section>
  );
}
