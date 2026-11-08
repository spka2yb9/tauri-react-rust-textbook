import { ask } from "@tauri-apps/plugin-dialog";
import { useState, type DragEvent } from "react";

import type { PageSummary } from "../../lib/types";
import { childrenOf, type PagesApi } from "./usePages";

type Props = {
  pages: PageSummary[];
  api: PagesApi;
  parentId: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  depth?: number;
};

const DRAG_TYPE = "application/x-tsumugi-page";

/** 再帰でツリーを描く。1 階層 = 1 つの <ul>。 */
export function PageTree({ pages, api, parentId, selectedId, onSelect, depth = 0 }: Props) {
  const items = childrenOf(pages, parentId);
  return (
    <ul className="tree" style={{ paddingLeft: depth === 0 ? 0 : 12 }}>
      {items.map((page) => (
        <TreeItem
          key={page.id}
          page={page}
          pages={pages}
          api={api}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth}
        />
      ))}
    </ul>
  );
}

function TreeItem({
  page,
  pages,
  api,
  selectedId,
  onSelect,
  depth,
}: Omit<Props, "parentId"> & { page: PageSummary; depth: number }) {
  const [open, setOpen] = useState(true);
  const [over, setOver] = useState<"before" | "inside" | null>(null);
  const hasChildren = childrenOf(pages, page.id).length > 0;

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData(DRAG_TYPE, page.id);
    e.dataTransfer.effectAllowed = "move";
  };
  const allowDrop = (e: DragEvent, zone: "before" | "inside") => {
    if (!e.dataTransfer.types.includes(DRAG_TYPE)) return;
    e.preventDefault();
    e.stopPropagation();
    setOver(zone);
  };
  const onDrop = (e: DragEvent, zone: "before" | "inside") => {
    e.preventDefault();
    e.stopPropagation();
    setOver(null);
    const id = e.dataTransfer.getData(DRAG_TYPE);
    if (!id || id === page.id) return;
    // 「前に置く」= 同じ親の、この行の前へ。「中に入れる」= 自分の子の末尾へ
    // 循環（自分の子孫の下へ移動）は Rust 側が拒否してトーストに出る
    if (zone === "before") {
      // move の position は「動かすページを除いた兄弟」の中の番号。page.position は
      // 動かすページを含む番号なので、同じ親の中で下へ動かすとずれる。除いてから探し直す
      const siblings = childrenOf(pages, page.parent_id).filter((p) => p.id !== id);
      void api.move(
        id,
        page.parent_id,
        siblings.findIndex((p) => p.id === page.id),
      );
    } else void api.move(id, page.id, childrenOf(pages, page.id).length);
  };

  const remove = async () => {
    if (await ask(`「${page.title}」と配下のページを削除しますか？`, { title: "削除", kind: "warning" })) {
      await api.remove(page.id);
    }
  };

  return (
    <li>
      <div
        className={`tree-row ${selectedId === page.id ? "selected" : ""} ${over ? `drop-${over}` : ""}`}
        draggable
        onDragStart={onDragStart}
        onDragOver={(e) => allowDrop(e, "before")}
        onDragLeave={() => setOver(null)}
        onDrop={(e) => onDrop(e, "before")}
      >
        <button
          className="tree-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "折りたたむ" : "展開する"}
          style={{ visibility: hasChildren ? "visible" : "hidden" }}
        >
          {open ? "▾" : "▸"}
        </button>
        <button className="tree-title" onClick={() => onSelect(page.id)}>
          <span className="tree-icon">{page.icon ?? "📄"}</span>
          {page.title || "無題"}
        </button>
        <span
          className="tree-nest"
          title="ここへドロップで子ページにする"
          onDragOver={(e) => allowDrop(e, "inside")}
          onDragLeave={() => setOver(null)}
          onDrop={(e) => onDrop(e, "inside")}
        >
          ⤵
        </span>
        <button className="tree-action" title="子ページを追加" onClick={() => void api.create(page.id)}>
          +
        </button>
        <button className="tree-action" title="削除" onClick={() => void remove()}>
          ×
        </button>
      </div>
      {open && hasChildren && (
        <PageTree
          pages={pages}
          api={api}
          parentId={page.id}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth + 1}
        />
      )}
    </li>
  );
}

/** ルート末尾へのドロップ先 */
export function RootDropZone({ pages, api }: { pages: PageSummary[]; api: PagesApi }) {
  const [over, setOver] = useState(false);
  return (
    <div
      className={`root-drop ${over ? "drop-inside" : ""}`}
      onDragOver={(e) => {
        if (!e.dataTransfer.types.includes(DRAG_TYPE)) return;
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData(DRAG_TYPE);
        if (id) void api.move(id, null, childrenOf(pages, null).length);
      }}
    >
      ここへドロップでトップレベルへ
    </div>
  );
}
