// 独自ブロックの例: コールアウト（絵文字付きの強調枠）。
// createReactBlockSpec に「設定（type / props / content）」と「描画」を渡す。
import { createReactBlockSpec } from "@blocknote/react";

const EMOJIS = ["💡", "⚠️", "📌", "✅"];

export const Callout = createReactBlockSpec(
  {
    type: "callout",
    propSchema: {
      emoji: { default: "💡", values: EMOJIS },
    },
    content: "inline", // 中にリッチテキストを持てる
  },
  {
    render: (props) => {
      const { emoji } = props.block.props;
      const next = EMOJIS[(EMOJIS.indexOf(emoji) + 1) % EMOJIS.length];
      return (
        <div className="callout">
          {/* contentEditable=false にして、クリックで絵文字を切り替える */}
          <button
            className="callout-emoji"
            contentEditable={false}
            onClick={() => props.editor.updateBlock(props.block, { props: { emoji: next } })}
            title="絵文字を切り替え"
          >
            {emoji}
          </button>
          {/* ここに本文（inline content）が差し込まれる */}
          <div className="callout-body" ref={props.contentRef} />
        </div>
      );
    },
  },
);
