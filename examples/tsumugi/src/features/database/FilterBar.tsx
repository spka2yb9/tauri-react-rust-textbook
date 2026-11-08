import { useState } from "react";

import { FILTER_OPS, type Filter, type FilterOp, type Property } from "../../lib/types";

const OP_LABEL: Record<FilterOp, string> = {
  eq: "と等しい",
  neq: "と等しくない",
  contains: "を含む",
  gt: "より大きい",
  lt: "より小さい",
  empty: "が空",
  not_empty: "が空でない",
};

type Props = { properties: Property[]; filter: Filter[]; onChange: (filter: Filter[]) => void };

/** 絞り込み条件。ponytail: 条件は 1 つだけ（AND で複数にするなら配列を伸ばすだけ）。 */
export function FilterBar({ properties, filter, onChange }: Props) {
  const current = filter[0];
  const [propertyId, setPropertyId] = useState(current?.property_id ?? properties[0]?.id ?? "");
  const [op, setOp] = useState<FilterOp>(current?.op ?? "contains");
  const [value, setValue] = useState(current ? String(current.value ?? "") : "");
  const property = properties.find((p) => p.id === propertyId);
  const needsValue = op !== "empty" && op !== "not_empty";

  const apply = () => {
    if (!property) return;
    // 型に合わせて値を変換（Rust 側でも kind に応じた比較をする）
    let v: unknown = value;
    if (property.kind === "number") v = Number(value);
    if (property.kind === "checkbox") v = value === "true";
    onChange([{ property_id: propertyId, op, value: needsValue ? v : null }]);
  };

  return (
    <div className="filter-bar">
      <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <select value={op} onChange={(e) => setOp(e.target.value as FilterOp)}>
        {FILTER_OPS.map((o) => (
          <option key={o} value={o}>
            {OP_LABEL[o]}
          </option>
        ))}
      </select>
      {needsValue &&
        (property?.kind === "checkbox" ? (
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="true">オン</option>
            <option value="false">オフ</option>
          </select>
        ) : (
          <input
            type={property?.kind === "number" ? "number" : property?.kind === "date" ? "date" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ))}
      <button onClick={apply}>絞り込む</button>
      {current && <button onClick={() => onChange([])}>解除</button>}
    </div>
  );
}
