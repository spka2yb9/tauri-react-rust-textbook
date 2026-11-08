import { useEffect, useRef, useState } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import type { SearchHit } from "../../lib/types";

type Props = { open: boolean; onClose: () => void; onSelect: (id: string) => void };

/** 全文検索。ネイティブの <dialog> を使う（Esc で閉じる・フォーカス管理が無料）。 */
export function SearchDialog({ open, onClose, onSelect }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setHits([]);
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);

  // 入力のたびに 200ms 待ってから検索（連打を抑える）
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      ipc.searchPages(query).then(setHits).catch(toastError);
    }, 200);
    return () => window.clearTimeout(t);
  }, [query, open]);

  return (
    <dialog ref={ref} className="dialog search-dialog" onClose={onClose}>
      <input
        autoFocus
        className="search-input"
        placeholder="ページを検索（3 文字以上で全文検索）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="search-results">
        {hits.map((h) => (
          <li key={h.id}>
            <button onClick={() => onSelect(h.id)}>
              <strong>{h.title || "無題"}</strong>
              <span className="snippet">{h.snippet}</span>
            </button>
          </li>
        ))}
        {query && hits.length === 0 && <li className="muted">見つかりません</li>}
      </ul>
    </dialog>
  );
}
