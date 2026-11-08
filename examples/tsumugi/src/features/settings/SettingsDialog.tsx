import { revealItemInDir } from "@tauri-apps/plugin-opener";
import { useEffect, useRef, useState } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import type { Theme } from "../../lib/types";
import { exportAll, importFiles } from "./markdownIO";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onImported: () => void;
};

export function SettingsDialog({ open, onClose, theme, setTheme, onImported }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [dir, setDir] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      ipc.dataDir().then(setDir).catch(toastError);
    } else if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} className="dialog settings-dialog" onClose={onClose}>
      <h2>設定</h2>

      <section>
        <h3>テーマ</h3>
        <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="system">OS に合わせる</option>
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
        </select>
      </section>

      <section>
        <h3>Markdown</h3>
        <button onClick={() => void exportAll()}>全ページを書き出す…</button>
        <button
          onClick={async () => {
            if ((await importFiles(null)) > 0) onImported();
          }}
        >
          Markdown を取り込む…
        </button>
      </section>

      <section>
        <h3>データの保存先</h3>
        <code className="data-dir">{dir}</code>
        <button onClick={() => revealItemInDir(dir).catch(toastError)}>フォルダを表示</button>
      </section>

      <section>
        <h3>キーボードショートカット</h3>
        <ul className="muted">
          <li>⌘K / Ctrl+K: 検索</li>
          <li>⌘N / Ctrl+N: 新しいページ</li>
        </ul>
      </section>

      <form method="dialog" className="dialog-actions">
        <button>閉じる</button>
      </form>
    </dialog>
  );
}
