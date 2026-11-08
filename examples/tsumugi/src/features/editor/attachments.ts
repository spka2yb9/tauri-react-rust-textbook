// 画像の添付。app_data_dir/attachments/ に保存し、asset: プロトコルの URL に変換して表示する。
//
// - 書き込み: fs プラグインの writeFile（capability で $APPDATA/attachments/** を許可）
// - 表示:     convertFileSrc で asset://localhost/... (macOS) の URL にする。
//             tauri.conf.json の assetProtocol.scope と CSP の img-src が必要。
//
// エディタの JSON には "attachments/<name>" という相対パスだけを保存し、
// 表示するたびに resolveFileUrl で絶対パスへ解決する（データフォルダが移動しても壊れない）。
import { convertFileSrc } from "@tauri-apps/api/core";
import { appDataDir, join } from "@tauri-apps/api/path";
import { BaseDirectory, writeFile } from "@tauri-apps/plugin-fs";

const PREFIX = "attachments/";

export async function saveAttachment(file: File): Promise<string> {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const name = `${crypto.randomUUID()}${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  await writeFile(PREFIX + name, bytes, { baseDir: BaseDirectory.AppData });
  return PREFIX + name;
}

export async function resolveAttachmentUrl(url: string): Promise<string> {
  if (!url.startsWith(PREFIX)) return url; // 外部 URL などはそのまま
  const abs = await join(await appDataDir(), url);
  return convertFileSrc(abs);
}
