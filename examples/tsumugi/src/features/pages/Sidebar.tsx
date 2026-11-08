import type { PageSummary } from "../../lib/types";
import { PageTree, RootDropZone } from "./PageTree";
import type { PagesApi } from "./usePages";

type Props = {
  pages: PageSummary[];
  api: PagesApi;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
};

export function Sidebar({ pages, api, selectedId, onSelect, onCreate, onOpenSearch, onOpenSettings }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <span className="brand">Tsumugi</span>
        <button onClick={onOpenSearch} title="検索 (⌘K / Ctrl+K)">
          🔍
        </button>
        <button onClick={onOpenSettings} title="設定">
          ⚙
        </button>
      </div>
      <button className="new-page" onClick={onCreate}>
        ＋ 新しいページ <kbd>⌘N</kbd>
      </button>
      <nav className="sidebar-body">
        <PageTree pages={pages} api={api} parentId={null} selectedId={selectedId} onSelect={onSelect} />
        <RootDropZone pages={pages} api={api} />
      </nav>
    </aside>
  );
}
