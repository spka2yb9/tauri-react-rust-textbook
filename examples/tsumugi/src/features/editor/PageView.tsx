import { useEffect, useState } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import type { Page } from "../../lib/types";
import { DatabaseView } from "../database/DatabaseView";
import type { PagesApi } from "../pages/usePages";
import { exportPage } from "../settings/markdownIO";
import { Editor } from "./Editor";

const ICONS = ["📄", "📘", "📝", "💡", "🗂", "🎯", "🧪", "🍀"];

type Props = { pageId: string; api: PagesApi; theme: "light" | "dark" };

/** 1 ページの表示: タイトル・アイコン・エディタ・（あれば）データベース */
export function PageView({ pageId, api, theme }: Props) {
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [pickingIcon, setPickingIcon] = useState(false);

  useEffect(() => {
    setPage(null);
    ipc
      .getPage(pageId)
      .then((p) => {
        setPage(p);
        setTitle(p.title);
      })
      .catch(toastError);
  }, [pageId]);

  if (!page) return <div className="page-empty">読み込み中…</div>;

  const commitTitle = () => {
    const t = title.trim() || "無題";
    setTitle(t);
    if (t !== page.title) void api.rename(page.id, t);
  };
  const pickIcon = (icon: string | null) => {
    setPickingIcon(false);
    void api.setIcon(page.id, icon);
    setPage({ ...page, icon });
  };

  return (
    <article className="page">
      <header className="page-head">
        <button className="page-icon" onClick={() => setPickingIcon(!pickingIcon)} title="アイコンを変更">
          {page.icon ?? "📄"}
        </button>
        <input
          className="page-title"
          value={title}
          placeholder="無題"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={commitTitle}
          onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        />
        <button onClick={() => void exportPage(page.id, title)} title="Markdown で書き出し">
          ⬇ MD
        </button>
      </header>
      {pickingIcon && (
        <div className="icon-picker">
          {ICONS.map((i) => (
            <button key={i} onClick={() => pickIcon(i)}>
              {i}
            </button>
          ))}
          <button onClick={() => pickIcon(null)}>なし</button>
        </div>
      )}
      {/* key でページごとにエディタを作り直す（initialContent を差し替えるため） */}
      <Editor key={page.id} pageId={page.id} content={page.content} theme={theme} />
      <DatabaseView pageId={page.id} />
    </article>
  );
}
