import { useEffect, useState } from "react";

import { PageView } from "./features/editor/PageView";
import { Sidebar } from "./features/pages/Sidebar";
import { usePages } from "./features/pages/usePages";
import { SearchDialog } from "./features/search/SearchDialog";
import { SettingsDialog } from "./features/settings/SettingsDialog";
import { useTheme } from "./lib/theme";
import { Toasts } from "./lib/toast";

export default function App() {
  const api = usePages();
  const { theme, resolved, setTheme } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<"search" | "settings" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // モバイル用ドロワー

  // 選択中のページが消えたら選択を外す
  useEffect(() => {
    if (selectedId && !api.pages.some((p) => p.id === selectedId)) setSelectedId(null);
  }, [api.pages, selectedId]);

  const select = (id: string) => {
    setSelectedId(id);
    setDialog(null);
    setSidebarOpen(false);
  };
  const createPage = async () => {
    const page = await api.create(null);
    if (page) select(page.id);
  };

  // キーボードショートカット（macOS は ⌘、それ以外は Ctrl）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "k") {
        e.preventDefault();
        setDialog((d) => (d === "search" ? null : "search"));
      } else if (e.key === "n") {
        e.preventDefault();
        void createPage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`app ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar
        pages={api.pages}
        api={api}
        selectedId={selectedId}
        onSelect={select}
        onCreate={() => void createPage()}
        onOpenSearch={() => setDialog("search")}
        onOpenSettings={() => setDialog("settings")}
      />
      <div className="backdrop" onClick={() => setSidebarOpen(false)} />
      <main className="main">
        <div className="mobile-bar">
          <button onClick={() => setSidebarOpen(true)} aria-label="メニュー">
            ☰
          </button>
          <span>Tsumugi</span>
        </div>
        {selectedId ? (
          <PageView pageId={selectedId} api={api} theme={resolved} />
        ) : (
          <div className="page-empty">
            <p>左のツリーからページを選ぶか、新しいページを作ってください。</p>
            <button onClick={() => void createPage()}>＋ 新しいページ</button>
          </div>
        )}
      </main>
      <SearchDialog open={dialog === "search"} onClose={() => setDialog(null)} onSelect={select} />
      <SettingsDialog
        open={dialog === "settings"}
        onClose={() => setDialog(null)}
        theme={theme}
        setTheme={setTheme}
        onImported={() => void api.reload()}
      />
      <Toasts />
    </div>
  );
}
