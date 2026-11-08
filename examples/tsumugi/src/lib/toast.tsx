// 画面右下に出す簡易トースト。状態管理ライブラリを入れずに、
// モジュール内の購読者リストで React の外からも呼べるようにしている。
import { useEffect, useState } from "react";

type Toast = { id: number; message: string; kind: "info" | "error" };
type Listener = (t: Toast) => void;

const listeners = new Set<Listener>();
let seq = 0;

export function toast(message: string, kind: Toast["kind"] = "info") {
  const t = { id: ++seq, message, kind };
  listeners.forEach((l) => l(t));
}

/** コマンドのエラーは文字列（AppError の Serialize）で届く */
export function errorMessage(e: unknown): string {
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  return String(e);
}

export function toastError(e: unknown) {
  toast(errorMessage(e), "error");
}

export function Toasts() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const add: Listener = (t) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 4000);
    };
    listeners.add(add);
    return () => void listeners.delete(add);
  }, []);
  return (
    <div className="toasts" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast toast-${t.kind}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
