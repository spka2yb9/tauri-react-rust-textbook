# Tauri 2・React・Rust 教科書

JavaScript の基礎だけを知っている人が、TypeScript・React・Rust を入門から学び、Tauri 2 でデスクトップとモバイルの両方に対応したアプリを設計・実装・配布できるようになるための、日本語の Web 教科書です。本全体を通して Notion 風のノートアプリ「Tsumugi」を作ります。

- 教科書本体: このディレクトリ（Vite + React + TypeScript の静的サイト）
- 題材アプリの完成版: `examples/tsumugi/`（Tauri 2 + React + Rust。起動方法は `examples/tsumugi/README.md`）

## 必要なもの

- Node.js 24 以上（npm 同梱）

## 起動

```bash
npm install
npm run dev
```

ブラウザで表示された URL（既定では http://localhost:5173/ ）を開きます。

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力されます。ビルドは次の順で動きます。

1. `npm run build:index` — 各章を描画して全文検索の索引 `src/content/search-index.json` を生成
2. `tsc -b` — 型チェック
3. `vite build` — `dist/` へ出力

ビルド結果の確認は `npm run preview` です。

## 章の検査

```bash
node --experimental-strip-types scripts/check-chapter.ts        # 全章
node --experimental-strip-types scripts/check-chapter.ts 19 20  # 指定した章
```

節 ID の重複、出典番号と参考資料の対応、図のアクセシブル名、本文の分量などを機械的に検査します。

## 静的ホスティングでの公開手順

ハッシュルーティング（`#/33/ipc` の形式）を使っているため、サーバー側のリライト設定は不要です。`dist/` をそのまま配置すれば動きます。

### GitHub Pages

`main` ブランチへ push すると `.github/workflows/deploy.yml` がビルドして公開します。手動で実行する場合は、Actions の「Deploy to GitHub Pages」から `Run workflow` を選びます。

- 初回だけ、リポジトリの Settings → Pages → Source で「GitHub Actions」を選んでください。
- 公開 URL はプロジェクトサイトなら `https://<user>.github.io/<repo>/` です。`BASE_PATH` は `actions/configure-pages` の出力から自動で設定されるため、指定は不要です。
- ユーザーサイト（`https://<user>.github.io/`）でも同じワークフローが使えます。

手動でビルドする場合:

```bash
BASE_PATH=/<repo>/ npm run build
```

`dist/` の中身を `gh-pages` ブランチ、または Pages の公開ディレクトリに配置します。ユーザーサイトやカスタムドメインでルート配信する場合は `BASE_PATH` を付けずにビルドします。

### Cloudflare Pages

- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- リライト設定: 不要

## 構成

```
src/
  chapters/        各章（ch1.tsx … ch59.tsx）。本文・図解・出典を含む
  components/      レイアウト、検索、章の表示、図・コード・出典の共通部品
  content/         章の登録、部の定義、対象バージョン、検索索引
  utils/           ルーティング、読書位置の保存、検索
scripts/           検索索引の生成、章の検査
examples/tsumugi/  題材アプリの完成版
```

## 閲覧機能

- 目次（部・章・節）、ページ内見出し、前後の章への移動
- 全文検索（`/` または Ctrl/Cmd+K。本文も検索対象。空白区切りで AND 検索）
- 読書位置の保存（ブラウザの localStorage のみ。サーバーへは送信しない）
- ライト／ダーク表示（OS の設定に追従）、スマートフォン対応
