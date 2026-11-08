# Tsumugi

教科書 第6部（第41〜50章）で参照する題材アプリ。Notion 風のローカルノートを
Tauri 2 + React + Rust（SQLite）で作っています。

機能: ページの入れ子ツリー、ブロック編集（BlockNote）、スラッシュメニュー、ドラッグ＆ドロップ、
全文検索（FTS5 trigram）、画像添付、Markdown 書き出し・読み込み、ダークモード、
モバイル向けレイアウト、簡易データベース（表ビュー）、設定画面、ショートカット、ウィンドウ状態の保存。

## 動かし方（macOS、Linux）

前提: Node.js 24 以上、Rust（rustup）、macOS は Xcode Command Line Tools。
Linux（Debian/Ubuntu）は `libwebkit2gtk-4.1-dev`、`build-essential`、`libxdo-dev`、`libssl-dev`、
`libayatana-appindicator3-dev`、`librsvg2-dev` が必要です。
Tauri の環境構築は https://v2.tauri.app/start/prerequisites/ を参照してください。

```sh
cd examples/tsumugi
npm install
npm run tauri dev
```

初回は Rust の依存をコンパイルするため数分かかります。
データは macOS なら `~/Library/Application Support/jp.tsumugi.app/`、Linux なら `~/.local/share/jp.tsumugi.app/`
（`tsumugi.db`、`attachments/`、`settings.json`）に保存されます。

配布用にビルドする場合、macOS の dmg にはアイコン一式（icns など）が要るので、先に生成してください
（`icons/` には PNG しか置いていません。Linux の deb は PNG だけで通ることを確認しています）。

```sh
npx tauri icon src-tauri/icons/icon.png
npm run tauri build
```

Rust 側のテストだけを走らせるには:

```sh
cd src-tauri/core
cargo test
```

## 構成

```
examples/tsumugi/
  package.json, index.html, vite.config.ts, tsconfig.json
  src/                         # React（TypeScript strict）
    main.tsx, App.tsx          # 画面全体、ショートカット、ダイアログの開閉
    lib/ipc.ts                 # invoke の型付きラッパー（全コマンドをここに集約）
    lib/types.ts               # Rust の struct と手でそろえた型
    lib/theme.ts               # テーマ（tauri-plugin-store に保存、data-theme 属性に反映）
    lib/toast.tsx              # エラー表示用トースト
    features/pages/            # サイドバー、ページツリー（D&D で移動）、ページ操作
    features/editor/           # BlockNote 組み込み、自動保存、callout ブロック、画像添付
    features/search/           # 検索ダイアログ（⌘K）
    features/database/         # 表ビュー、プロパティ編集、並べ替え・絞り込み
    features/settings/         # 設定ダイアログ、Markdown 書き出し・読み込み
    styles/global.css          # CSS 変数によるテーマ、モバイル用メディアクエリ、safe-area
  src-tauri/
    Cargo.toml                 # workspace（members = ["core"]）+ Tauri アプリ本体
    tauri.conf.json            # identifier、ウィンドウ、CSP、assetProtocol のスコープ
    capabilities/default.json  # メインウィンドウに与える permission
    core/                      # クレート tsumugi-core（Tauri 非依存。cargo test で検証）
      migrations/001_init.sql  # スキーマ（include_str! で埋め込み、user_version で管理）
      src/db.rs                # 接続とマイグレーション
      src/pages.rs             # ページ CRUD、ツリー移動（循環防止）、子孫ごと削除
      src/search.rs            # BlockNote JSON → テキスト抽出、FTS5 検索
      src/database.rs          # 簡易データベース、並べ替え・絞り込みの SQL 組み立て
      src/markdown.rs          # BlockNote JSON ⇄ Markdown
      src/error.rs
      tests/                   # 結合テスト（インメモリ SQLite）
    src/
      main.rs, lib.rs          # Builder、プラグイン登録、State（Mutex<Connection>）
      error.rs                 # AppError（serde::Serialize でフロントエンドへ）
      commands.rs              # 共通ヘルパー（with_db）とサブモジュールの宣言
      commands/                # pages / search / database / files / settings
```

### 処理の流れ（ざっくり）

1. フロントエンドは `lib/ipc.ts` 経由で `invoke("コマンド名", { 引数 })` を呼ぶ。
2. `src-tauri/src/commands/*.rs` の `#[tauri::command]` が `State<Db>` のロックを取り、
   `tsumugi-core` の関数を呼ぶ。失敗は `AppError`（文字列にシリアライズ）として返り、
   フロントエンドではトーストに出す。
3. ファイル選択（dialog プラグイン）とファイル読み書き（fs プラグイン）、設定（store プラグイン）は
   フロントエンドから直接プラグインを呼ぶ。許可は `capabilities/default.json` で与える。
4. 画像は fs プラグインで `$APPDATA/attachments/` に書き、`convertFileSrc` で asset: URL にして表示する
   （`tauri.conf.json` の `assetProtocol.scope` と CSP の `img-src` が必要）。

## この環境で検証したこと・していないこと

制作環境は Ubuntu 24.04（WSL2、WebKitGTK 2.52、仮想ディスプレイ上）です。

検証済み:

- `src-tauri` 全体で `cargo clippy --workspace --all-targets` が警告なしで通り、`cargo test --workspace`
  で core の 14 件（マイグレーション、ページ CRUD と並び順・移動・循環防止、日本語の FTS 検索、
  テキスト抽出、Markdown 往復、クエリ組み立て）が通る
- `npx tsc --noEmit`（strict）と `npx vite build` が通る
- `npx tauri dev` で起動し、実際の WebView から次を確認（WebView 内で合成したクリックと入力で操作）:
  ページの作成・改名・アイコン変更・切り替え、BlockNote への入力と約 1 秒後の自動保存、
  スラッシュメニューからのコールアウト挿入、`Ctrl+K` の全文検索、`Ctrl+N`、データベースの追加・行追加・
  セル編集・並べ替え、サイドバーのドラッグ＆ドロップ（下方向・上方向・子への移動・循環の拒否）、テーマ変更、fs プラグインの許可と拒否、画像の保存と asset プロトコルでの表示
  （スコープ外は不可）、アプリ再起動後のデータ・テーマ・検索の保持
- 主要な Tauri コマンド（`update_property` と `delete_property` を除く）を WebView から呼び、
  エラーが文字列で届くことも確認
- `npx tauri build`（Linux）で本番ビルドと deb の生成が通り、本番ビルドでも上の操作が同じ結果になる
  （深い URL でのリロードも `index.html` にフォールバックする）

未検証:

- macOS、Windows での実行
- ネイティブのダイアログ（ページ削除の確認、Markdown の書き出し・読み込みのファイル選択）
- 実際のマウスによるドラッグ＆ドロップ、エディタへの画像のドロップ・貼り付け
- window-state プラグインによるウィンドウ位置・サイズの復元
- 絞り込みバーの画面操作、日付選択 UI、`Esc` での検索ダイアログの閉じ方
- 生成した deb のインストール、AppImage と rpm の生成
- モバイル（iOS / Android）でのレイアウト
