import { useState } from "react";

import { PROPERTY_KINDS, type Property, type PropertyKind } from "../../lib/types";

const KIND_LABEL: Record<PropertyKind, string> = {
  text: "テキスト",
  number: "数値",
  select: "選択",
  checkbox: "チェック",
  date: "日付",
};

type Props = {
  initial?: Property;
  onSubmit: (name: string, kind: PropertyKind, options: string[] | null) => void;
  onDelete?: () => void;
  onCancel: () => void;
};

/** プロパティの追加・編集フォーム。select のときだけ選択肢（カンマ区切り）を入力する。 */
export function PropertyForm({ initial, onSubmit, onDelete, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [kind, setKind] = useState<PropertyKind>(initial?.kind ?? "text");
  const [options, setOptions] = useState(initial?.options?.join(", ") ?? "");

  return (
    <form
      className="property-form"
      onSubmit={(e) => {
        e.preventDefault();
        const opts = kind === "select" ? options.split(",").map((s) => s.trim()).filter(Boolean) : null;
        onSubmit(name.trim() || "無題", kind, opts);
      }}
    >
      <input autoFocus placeholder="プロパティ名" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={kind} onChange={(e) => setKind(e.target.value as PropertyKind)}>
        {PROPERTY_KINDS.map((k) => (
          <option key={k} value={k}>
            {KIND_LABEL[k]}
          </option>
        ))}
      </select>
      {kind === "select" && (
        <input placeholder="選択肢（カンマ区切り）" value={options} onChange={(e) => setOptions(e.target.value)} />
      )}
      <button type="submit">{initial ? "更新" : "追加"}</button>
      {onDelete && (
        <button type="button" onClick={onDelete}>
          削除
        </button>
      )}
      <button type="button" onClick={onCancel}>
        キャンセル
      </button>
    </form>
  );
}
