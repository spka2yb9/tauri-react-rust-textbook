// Markdown の書き出し・読み込み。
// ファイル選択は dialog プラグイン、読み書きは fs プラグイン、変換は Rust コマンド。
// dialog で選んだパスは自動的に fs のスコープへ追加されるので、capability に
// ユーザーのフォルダを列挙しておく必要はない。
import { join } from "@tauri-apps/api/path";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

import * as ipc from "../../lib/ipc";
import { toast, toastError } from "../../lib/toast";

const MD_FILTER = [{ name: "Markdown", extensions: ["md"] }];

// ファイル名に使えない文字を落とす
const safeName = (title: string) => (title.replace(/[\\/:*?"<>|]/g, "_").trim() || "無題") + ".md";

export async function exportPage(id: string, title: string) {
  try {
    const path = await save({ defaultPath: safeName(title), filters: MD_FILTER });
    if (!path) return;
    await writeTextFile(path, await ipc.exportPageMarkdown(id));
    toast("書き出しました");
  } catch (e) {
    toastError(e);
  }
}

/** 全ページを選んだフォルダに 1 ファイルずつ書き出す */
export async function exportAll() {
  try {
    const dir = await open({ directory: true, title: "書き出し先のフォルダ" });
    if (!dir) return;
    const pages = await ipc.listPages();
    const used = new Set<string>();
    for (const p of pages) {
      let name = safeName(p.title);
      if (used.has(name)) name = `${p.id.slice(0, 8)}-${name}`;
      used.add(name);
      await writeTextFile(await join(dir, name), await ipc.exportPageMarkdown(p.id));
    }
    toast(`${pages.length} ページを書き出しました`);
  } catch (e) {
    toastError(e);
  }
}

/** Markdown ファイルを選んでページとして取り込む。取り込んだ件数を返す。 */
export async function importFiles(parentId: string | null): Promise<number> {
  try {
    const files = await open({ multiple: true, filters: MD_FILTER, title: "取り込む Markdown" });
    if (!files) return 0;
    for (const path of files) {
      const fallback = path.split(/[\\/]/).pop()?.replace(/\.md$/i, "") ?? "無題";
      await ipc.importMarkdown(await readTextFile(path), parentId, fallback);
    }
    toast(`${files.length} ファイルを取り込みました`);
    return files.length;
  } catch (e) {
    toastError(e);
    return 0;
  }
}
