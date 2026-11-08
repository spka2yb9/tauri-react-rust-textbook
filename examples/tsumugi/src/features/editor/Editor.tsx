// BlockNote エディタ本体。
// - 独自スキーマ（標準ブロック + callout）
// - スラッシュメニュー（標準項目 + callout）
// - 画像アップロード（attachments.ts）
// - 自動保存（800ms デバウンス、アンマウント時にフラッシュ）
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems, insertOrUpdateBlockForSlashMenu } from "@blocknote/core";
import { ja } from "@blocknote/core/locales";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useEffect, useMemo, useRef } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import { resolveAttachmentUrl, saveAttachment } from "./attachments";
import { Callout } from "./CalloutBlock";

const schema = BlockNoteSchema.create({
  blockSpecs: { ...defaultBlockSpecs, callout: Callout() },
});
type Editor = typeof schema.BlockNoteEditor;
type Blocks = (typeof schema.PartialBlock)[];

const SAVE_DELAY_MS = 800;

type Props = {
  pageId: string;
  /** Block[] JSON 文字列 */
  content: string;
  theme: "light" | "dark";
};

function parseContent(json: string): Blocks | undefined {
  try {
    const blocks = JSON.parse(json) as Blocks;
    // BlockNote は空配列を initialContent に受け付けないので undefined にする
    return Array.isArray(blocks) && blocks.length > 0 ? blocks : undefined;
  } catch {
    return undefined;
  }
}

export function Editor({ pageId, content, theme }: Props) {
  // ページが変わるたびに親が key={pageId} で作り直すので、初期値は一度だけ読めばよい
  const initialContent = useMemo(() => parseContent(content), [content]);

  const editor = useCreateBlockNote({
    schema,
    dictionary: ja,
    initialContent,
    uploadFile: saveAttachment,
    resolveFileUrl: resolveAttachmentUrl,
  });

  // ---- 自動保存 ----
  const timer = useRef<number | undefined>(undefined);
  const dirty = useRef(false);
  const save = async () => {
    if (!dirty.current) return;
    dirty.current = false;
    try {
      await ipc.savePageContent(pageId, JSON.stringify(editor.document));
    } catch (e) {
      toastError(e);
    }
  };
  const onChange = () => {
    dirty.current = true;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void save(), SAVE_DELAY_MS);
  };
  useEffect(() => {
    // 別ページへ移るときに未保存分を書き出す
    return () => {
      window.clearTimeout(timer.current);
      void save();
    };
  }, []);

  // ---- スラッシュメニュー ----
  const getItems = async (query: string) =>
    filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), calloutItem(editor)], query);

  return (
    <BlockNoteView editor={editor} theme={theme} onChange={onChange} slashMenu={false}>
      <SuggestionMenuController triggerCharacter="/" getItems={getItems} />
    </BlockNoteView>
  );
}

const calloutItem = (editor: Editor) => ({
  title: "コールアウト",
  subtext: "絵文字付きの強調枠",
  aliases: ["callout", "memo"],
  group: "その他",
  icon: <span>💡</span>,
  onItemClick: () => insertOrUpdateBlockForSlashMenu(editor, { type: "callout" }),
});
