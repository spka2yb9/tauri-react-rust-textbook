import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 50-1 テーマが決まる流れ ---------- */
function ThemeFlowFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="テーマが決まる流れの図。settings.json に保存された theme（system / light / dark）と、OS の設定を反映する prefers-color-scheme の2つの入力から、useTheme が resolved（light か dark）を決め、html 要素の data-theme 属性に書く。CSS 変数がその属性で切り替わり、画面全体の色が変わる">
      <defs>
        <marker id="arrow50a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="20" y="30" width="200" height="70" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="52" textAnchor="middle" fontWeight="600">settings.json（store）</text>
        <text x="120" y="72" textAnchor="middle" fontFamily="monospace">theme: system|light|dark</text>
        <text x="120" y="90" textAnchor="middle" fill="var(--fig-muted)">ユーザーの選択</text>

        <rect x="20" y="130" width="200" height="70" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="120" y="152" textAnchor="middle" fontWeight="600">OS の外観設定</text>
        <text x="120" y="172" textAnchor="middle" fontFamily="monospace">(prefers-color-scheme: dark)</text>
        <text x="120" y="190" textAnchor="middle" fill="var(--fig-muted)">matchMedia で監視</text>

        <path d="M222,65 L298,105" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow50a)" />
        <path d="M222,165 L298,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow50a)" />

        <rect x="300" y="80" width="150" height="70" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="375" y="102" textAnchor="middle" fontWeight="600">useTheme</text>
        <text x="375" y="122" textAnchor="middle">system なら OS に従う</text>
        <text x="375" y="140" textAnchor="middle">それ以外は選択どおり</text>

        <path d="M452,115 L498,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow50a)" />
        <text x="475" y="105" textAnchor="middle" fill="var(--fig-muted)">resolved</text>

        <rect x="500" y="80" width="120" height="70" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="560" y="102" textAnchor="middle" fontWeight="600">&lt;html&gt;</text>
        <text x="560" y="122" textAnchor="middle" fontFamily="monospace">data-theme=</text>
        <text x="560" y="140" textAnchor="middle" fontFamily="monospace">"light"|"dark"</text>

        <path d="M560,152 L560,198" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow50a)" />

        <rect x="300" y="200" width="320" height="90" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="460" y="222" textAnchor="middle" fontWeight="600">global.css</text>
        <text x="460" y="244" textAnchor="middle" fontFamily="monospace">:root {'{'} --bg: #fff; --fg: #1f2328; … {'}'}</text>
        <text x="460" y="262" textAnchor="middle" fontFamily="monospace">:root[data-theme="dark"] {'{'} --bg: #1b1d21; … {'}'}</text>
        <text x="460" y="280" textAnchor="middle" fill="var(--fig-muted)">部品は var(--bg) を使うだけ。色の分岐は CSS 変数に集約</text>
      </g>
      <text x="320" y="318" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">2 つの入力 → 1 つの属性 → CSS 変数、という一方向の流れ。模式図</text>
    </svg>
  )
}

/* ---------- 図 50-2 エラーの伝播 ---------- */
function ErrorFlowFigure() {
  const lanes = [
    { x: 80, label: 'tsumugi-core' },
    { x: 240, label: 'コマンド層' },
    { x: 400, label: 'Tauri（IPC）' },
    { x: 560, label: 'React 部品' },
  ]
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="エラーが伝わる経路のシーケンス図。core の関数が Error::Invalid を返すと、コマンド層の with_db が ? で AppError に変換し、Tauri が Serialize でメッセージ文字列にして invoke の Promise を拒否する。React 部品は catch で toastError を呼び、Toasts 部品が画面右下に表示する">
      <defs>
        <marker id="arrow50b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 65} y="16" width="130" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="13" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="300" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <rect x="15" y="70" width="130" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="80" y="84" textAnchor="middle">Err(Error::Invalid(</text>
        <text x="80" y="98" textAnchor="middle">"unknown kind"))</text>
        <path d="M80,120 L238,120" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow50b)" />
        <text x="160" y="112" textAnchor="middle">tsumugi_core::Error</text>
        <rect x="165" y="130" width="150" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="240" y="144" textAnchor="middle">with_db の ? が From で</text>
        <text x="240" y="158" textAnchor="middle">AppError::Core に変換</text>
        <path d="M240,180 L398,180" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow50b)" />
        <text x="320" y="172" textAnchor="middle">Err(AppError)</text>
        <rect x="335" y="190" width="130" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="400" y="204" textAnchor="middle">Serialize → 文字列</text>
        <text x="400" y="218" textAnchor="middle">"不正な入力: …"</text>
        <path d="M400,240 L558,240" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow50b)" />
        <text x="480" y="232" textAnchor="middle">Promise を reject</text>
        <rect x="495" y="250" width="130" height="34" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="560" y="264" textAnchor="middle">.catch(toastError)</text>
        <text x="560" y="278" textAnchor="middle">→ Toasts に表示</text>
      </g>
      <text x="320" y="318" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">赤い矢印：エラーの伝播。各段で型は変わるが、メッセージは Display の文字列として保たれる。模式図</text>
    </svg>
  )
}

/* ---------- 図 50-3 デスクトップとモバイルのレイアウト ---------- */
function LayoutFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="デスクトップとモバイルのレイアウトの比較。左は幅 720px 以上で、サイドバーと本文が2列のグリッドに並ぶ。右は幅 720px 未満で、サイドバーは画面外に隠れたドロワーになり、上部のバーのボタンで開く。上下左右に safe-area-inset の余白が足される">
      <g fontSize="12">
        <text x="160" y="24" fontSize="14" fontWeight="600" textAnchor="middle">幅 720px 以上（grid 2 列）</text>
        <rect x="30" y="40" width="260" height="180" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <rect x="30" y="40" width="80" height="180" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="70" y="130" textAnchor="middle">sidebar</text>
        <text x="200" y="130" textAnchor="middle">main</text>
        <text x="160" y="240" textAnchor="middle" fill="var(--fig-muted)">grid-template-columns: 260px 1fr</text>

        <text x="480" y="24" fontSize="14" fontWeight="600" textAnchor="middle">幅 720px 未満（ドロワー）</text>
        <rect x="400" y="40" width="160" height="180" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <rect x="400" y="40" width="160" height="26" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="412" y="58" fontFamily="monospace">☰</text>
        <text x="480" y="58" textAnchor="middle">mobile-bar</text>
        <text x="480" y="150" textAnchor="middle">main</text>
        <rect x="330" y="40" width="60" height="180" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="360" y="125" textAnchor="middle">sidebar</text>
        <text x="360" y="143" textAnchor="middle" fill="var(--fig-muted)">（隠）</text>
        <text x="365" y="236" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">translateX(-100%)</text>
        <path d="M392,130 L398,130" stroke="var(--fig-accent)" strokeWidth="2" />
        <rect x="570" y="40" width="50" height="180" rx="6" fill="none" stroke="var(--fig-line)" strokeDasharray="3 3" />
        <text x="595" y="120" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">safe-</text>
        <text x="595" y="134" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">area</text>
        <text x="595" y="148" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">inset</text>
      </g>
      <text x="320" y="256" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線のサイドバーは .sidebar-open で translateX(0) になり画面内へ。模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 50,
  part: 6,
  title: '仕上げ：テーマ・設定・ショートカット・ウィンドウ状態・エラー表示',
  summary:
    'Tsumugi を日常的に使えるアプリに仕上げます。OS のダークモードに追従しつつ手動でも切り替えられるテーマ、store プラグインに保存する設定、設定ダイアログ、キーボードショートカット、window-state プラグインによるウィンドウ位置の復元、モバイル向けのドロワーとセーフエリア、そして Rust のエラーがトーストとして表示されるまでの流れを実装します。',
  goals: [
    'prefers-color-scheme と data-theme 属性、CSS 変数を組み合わせてテーマを切り替える仕組みを説明できる',
    'store プラグインで設定を app_data_dir の JSON ファイルに保存し、起動時に読み戻せる',
    'window-state プラグインをデスクトップだけに登録し、ウィンドウの位置と大きさを復元できる',
    'メディアクエリと env(safe-area-inset-*) でモバイル向けのレイアウトに切り替えられる',
    'AppError が Serialize で文字列になり、invoke の Promise の拒否を経てトーストに表示されるまでの流れを説明できる',
  ],
  prerequisites: [12, 16, 24, 34, 36, 38, 39],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            <ChapterLink n={41} /> から <ChapterLink n={49} /> までで、Tsumugi の主要な機能はそろいました。残っているのは、機能とは呼びにくいけれど、無いと毎日使う気になれない要素です。この章では、次の 6 つをまとめて仕上げます。
          </p>
          <ul>
            <li>テーマ：OS のダークモードに追従し、設定で手動にも切り替えられる。</li>
            <li>設定の保存：テーマの選択を store プラグインで保存し、次回起動時に復元する。設定ダイアログにデータの保存先を表示し、Finder で開けるようにする。</li>
            <li>キーボードショートカット：<code>⌘K</code> / <code>Ctrl+K</code> で検索、<code>⌘N</code> / <code>Ctrl+N</code> で新規ページ。</li>
            <li>ウィンドウ状態：終了時の位置と大きさを window-state プラグインで保存し、次回に復元する。</li>
            <li>モバイル向けレイアウト：幅が狭いときはサイドバーをドロワーにし、セーフエリアの余白を足す。</li>
            <li>エラー表示：Rust 側で起きた失敗を、画面右下のトーストで知らせる。</li>
          </ul>
          <p>
            どれも小さな実装ですが、「どこに状態を置くか」「誰が責任を持つか」という設計の判断は、これまでの章と同じ基準で下します。設定は Rust ではなくフロントエンドが store プラグインで直接扱い、ウィンドウ状態はプラグインに丸ごと任せ、エラーは 1 つの型に集めて 1 か所で表示します。
          </p>
        </>
      ),
    },
    {
      id: 'theme',
      title: 'テーマ：OS に追従し、手動でも切り替える',
      body: (
        <>
          <p>
            ダークモードの実装は、<ChapterLink n={16} /> で学んだ CSS 変数の応用です。入力は 2 つあります。1 つは OS の外観設定で、CSS の <code>prefers-color-scheme</code> メディア特性として読めます。MDN によると、これは「ユーザーがライトかダークのカラーテーマを要求しているかを検出する」ためのもので、ユーザーは OS の設定（ライトモードやダークモード）やブラウザの設定で意思表示をします。<Ref n={1} /> 値は <code>light</code> と <code>dark</code> で、<code>light</code> は「明示的な希望が無い場合」も含みます。<Ref n={1} /> もう 1 つはアプリ内の設定で、「OS に合わせる」「ライト」「ダーク」の 3 択です。
          </p>
          <p>
            この 2 つから最終的な見た目を決める流れを、図 50-1 に示します。入力が 2 つ、出力は <code>&lt;html&gt;</code> の <code>data-theme</code> 属性 1 つ、という一方向の流れにするのがポイントです。
          </p>
          <Figure n="50-1" title="テーマが決まる流れ" caption="上の入力は store に保存されたユーザーの選択、下の入力は OS の設定。useTheme が両者から light か dark を決めて html 要素の data-theme 属性に書く。CSS 変数の定義がこの属性で切り替わるので、各部品は var(--bg) のように変数を使うだけでよい。模式図。">
            <ThemeFlowFigure />
          </Figure>
          <p>CSS 側は、変数の定義を 2 組持つだけです。</p>
          <Code
            lang="css"
            title="src/styles/global.css（抜粋）"
            code={`
/* ---------- テーマ変数。<html data-theme="light|dark"> で切り替える ---------- */
:root {
  --bg: #ffffff;
  --fg: #1f2328;
  --muted: #6b7280;
  --border: #e5e7eb;
  --hover: #f3f4f6;
  --sidebar-bg: #f9fafb;
  --accent: #2f4b7c;
  --accent-fg: #ffffff;
  --danger: #b91c1c;
  --callout-bg: #fff8e1;
  --sidebar-width: 260px;
}
:root[data-theme="dark"] {
  --bg: #1b1d21;
  --fg: #e6e6e6;
  --muted: #9aa0a6;
  --border: #33363c;
  --hover: #272a30;
  --sidebar-bg: #202327;
  --accent: #7ea2d6;
  --accent-fg: #0f172a;
  --danger: #f87171;
  --callout-bg: #3a3320;
}

body {
  color: var(--fg);
  background: var(--bg);
  color-scheme: light;
}
:root[data-theme="dark"] body {
  color-scheme: dark;
}
`}
          />
          <p>
            CSS だけで済ませるなら <code>@media (prefers-color-scheme: dark)</code> で変数を上書きすればよいのですが、それでは「OS はダークだがアプリはライトにしたい」という手動切替ができません。そこで、判断を JavaScript に寄せ、CSS は属性セレクタだけを見るようにしています。<code>color-scheme</code> プロパティも合わせて切り替えています。MDN によると、このプロパティは要素がどの配色で描画できるかを示し、フォーム部品やスクロールバー、システムカラーの既定色に影響します。<Ref n={3} /> これを書かないと、ダークテーマなのに <code>&lt;select&gt;</code> や <code>&lt;input type="date"&gt;</code> だけが白いまま、ということが起きます。
          </p>
          <p>JavaScript 側は、カスタムフック <code>useTheme</code> です。</p>
          <Code
            lang="ts"
            title="src/lib/theme.ts"
            code={`
// テーマ設定: tauri-plugin-store に保存し、<html data-theme="light|dark"> に反映する。
// "system" のときは OS 設定（prefers-color-scheme）に追従する。
import { LazyStore } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";

import type { Theme } from "./types";

// app_data_dir/settings.json に書かれる（autoSave 既定 100ms）
const store = new LazyStore("settings.json");
const KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [systemDark, setSystemDark] = useState(media.matches);

  useEffect(() => {
    store.get<Theme>(KEY).then((v) => v && setThemeState(v));
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const resolved: "light" | "dark" = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    void store.set(KEY, t);
  };

  return { theme, resolved, setTheme };
}
`}
          />
          <p>
            <code>window.matchMedia()</code> は、メディアクエリの文字列を受け取って <code>MediaQueryList</code> を返します。MDN によると、このオブジェクトでドキュメントが今そのクエリに一致するかを調べられ、一致の変化を監視することもできます。<Ref n={2} /> <code>media.matches</code> が「今ダークか」、<code>change</code> イベントが「OS の設定が切り替わった」です。OS でダークモードに切り替えた瞬間にアプリの色も変わるのは、この監視のおかげです。
          </p>
          <p>
            <code>resolved</code> は state ではなく、<code>theme</code> と <code>systemDark</code> から毎回計算する派生値です（<ChapterLink n={10} />）。state を 3 つ持つと矛盾した組み合わせが生まれ得ますが、派生値なら常に整合します。2 つ目の <code>useEffect</code> が、<code>resolved</code> が変わるたびに DOM の属性へ書き込みます。これが <ChapterLink n={12} /> で学んだ「React の外にあるもの（ここでは <code>&lt;html&gt;</code> 要素）との同期」です。
          </p>
          <p>
            <code>App.tsx</code> は <code>useTheme()</code> を 1 回だけ呼び、<code>theme</code> と <code>setTheme</code> を設定ダイアログに、<code>resolved</code> を <code>PageView</code> 経由で BlockNote のエディタに渡します。BlockNote は自分のテーマを props で受け取るので、アプリの CSS 変数とは別に <code>resolved</code> を伝える必要があるからです（<ChapterLink n={44} />）。
          </p>
        </>
      ),
    },
    {
      id: 'settings',
      title: '設定の保存：store プラグインと設定ダイアログ',
      body: (
        <>
          <p>
            テーマの選択は、<ChapterLink n={38} /> で紹介した store プラグインに保存します。<code>theme.ts</code> の冒頭にある <code>new LazyStore("settings.json")</code> がその入口です。公式文書によると、<code>LazyStore</code> はメソッドが最初に呼ばれたときに初めてストアを作成または読み込む高水準の API で、<code>path</code> は <code>app_data_dir</code> の中に保存する際のパスです。<Ref n={4} /> つまり macOS なら <code>~/Library/Application Support/jp.tsumugi.app/settings.json</code> に、<code>{'{ "theme": "dark" }'}</code> のような JSON が書かれます。<code>get</code> で読み、<code>set</code> で書きます。
          </p>
          <p>
            書き込みのたびに <code>save()</code> を呼んでいないことに注意してください。公式文書によると、<code>autoSave</code> オプションは既定で有効で、変更から 100 ミリ秒の遅延の後に自動で保存されます。<Ref n={4} /> <code>false</code> にすると <code>save()</code> を呼ぶまで（または正常終了時まで）書かれません。<Ref n={4} /> 設定のような小さなデータなら、既定の自動保存で十分です。
          </p>
          <p>
            設定を Rust のコマンドではなくフロントエンドから直接 store に読み書きしているのは、Rust 側に「設定」という概念を持ち込まないためです。設定を使うのはフロントエンドだけなので、Rust を経由させる理由がありません。capability の <code>store:default</code> が、この直接アクセスを許可しています。
          </p>
          <p>
            例外は、データの保存先の表示です。<code>app_data_dir</code> の実際のパスは Rust 側で解決するので、<code>data_dir</code> という小さなコマンドを用意しています。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/settings.rs"
            code={`
/// データ保存先（設定画面で表示・Finder で開くために使う）。
/// 設定値そのものは tauri-plugin-store がフロントエンドから直接読み書きする。
#[tauri::command]
pub fn data_dir(app: AppHandle) -> AppResult<String> {
    Ok(app.path().app_data_dir()?.to_string_lossy().into_owned())
}
`}
          />
          <p>
            <code>AppHandle</code> は <ChapterLink n={36} /> で見た、Tauri が注入する引数です。<code>app.path().app_data_dir()</code> が返す <code>PathBuf</code> を文字列にして返します。<code>to_string_lossy</code> は、パスに UTF-8 でない部分があっても置換文字で埋めて文字列にするメソッドで、表示用途には十分です。
          </p>
          <p>設定ダイアログは、<ChapterLink n={46} /> の検索ダイアログと同じ <code>&lt;dialog&gt;</code> の作りです。</p>
          <Code
            lang="tsx"
            title="src/features/settings/SettingsDialog.tsx（抜粋）"
            code={`
      <section>
        <h3>テーマ</h3>
        <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="system">OS に合わせる</option>
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
        </select>
      </section>

      <section>
        <h3>Markdown</h3>
        <button onClick={() => void exportAll()}>全ページを書き出す…</button>
        <button
          onClick={async () => {
            if ((await importFiles(null)) > 0) onImported();
          }}
        >
          Markdown を取り込む…
        </button>
      </section>

      <section>
        <h3>データの保存先</h3>
        <code className="data-dir">{dir}</code>
        <button onClick={() => revealItemInDir(dir).catch(toastError)}>フォルダを表示</button>
      </section>
`}
          />
          <p>
            「フォルダを表示」は、opener プラグインの <code>revealItemInDir</code> を呼びます。公式文書によると、opener プラグインの既定の permission（<code>opener:default</code>）には、ファイルを既定のファイルエクスプローラーで表示する許可が含まれています。<Ref n={5} /> 一方、任意のパスを既定のアプリで開く <code>openPath</code> は既定では許可されず、<code>opener:allow-open-path</code> を明示的に与える必要があります。<Ref n={5} /> Tsumugi は「表示」だけでよいので、<code>opener:default</code> のままです。
          </p>
        </>
      ),
    },
    {
      id: 'shortcuts-window',
      title: 'ショートカットとウィンドウ状態',
      body: (
        <>
          <p>
            キーボードショートカットは、<ChapterLink n={46} /> で見た <code>App.tsx</code> の <code>keydown</code> 監視です。<code>e.metaKey || e.ctrlKey</code> で、macOS の <code>⌘</code> と他 OS の <code>Ctrl</code> を同じ扱いにしています。MDN によると、<code>KeyboardEvent.metaKey</code> は Meta キーが押されていたかを示し、Macintosh のキーボードでは <code>⌘ Command</code> キーがこれに当たります。<Ref n={6} /> 判定を OS 名ではなくキーの状態で行うことで、プラットフォーム分岐のコードを書かずに済んでいます。
          </p>
          <p>
            ここで実装したのは、ウィンドウにフォーカスがあるときだけ効く、Web の普通のショートカットです。アプリが背面にあっても効く「グローバルショートカット」は別物で、<ChapterLink n={39} /> で扱った global-shortcut プラグインが必要です。ノートアプリの検索と新規作成は、ウィンドウを見ているときにしか使わないので、Web 標準の仕組みで十分です。
          </p>
          <h3>ウィンドウの位置と大きさを復元する</h3>
          <p>
            デスクトップアプリでは、前回閉じたときの位置と大きさで開き直すのが当たり前の振る舞いです。これは window-state プラグインに丸ごと任せます。公式文書によると、このプラグインは「ウィンドウの位置と大きさを保存し、アプリを再び開いたときに復元する」ものです。<Ref n={7} /> 保存される項目は、docs.rs の <code>StateFlags</code> によると、<code>SIZE</code>、<code>POSITION</code>、<code>MAXIMIZED</code>、<code>VISIBLE</code>、<code>DECORATIONS</code>、<code>FULLSCREEN</code> で、既定はすべてです。<Ref n={8} />
          </p>
          <p>
            モバイルにはウィンドウの概念が無いので、このプラグインはデスクトップ専用です。登録の仕方も、公式文書の手順どおり <code>#[cfg(desktop)]</code> で囲みます。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（抜粋）"
            code={`
        .setup(|app| {
            // ウィンドウ位置・サイズの保存はデスクトップのみ
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_window_state::Builder::default().build())?;

            // app_data_dir: macOS なら ~/Library/Application Support/jp.tsumugi.app
            let data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(data_dir.join("attachments"))?;
            let conn = tsumugi_core::db::open(&data_dir.join("tsumugi.db"))?;
            app.manage(Db(Mutex::new(conn)));
            Ok(())
        })
`}
          />
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml（抜粋）"
            code={`
[target.'cfg(any(target_os = "macos", windows, target_os = "linux"))'.dependencies]
tauri-plugin-window-state = "2"
`}
          />
          <p>
            他のプラグインは <code>Builder::default().plugin(...)</code> の連鎖で登録しているのに、window-state だけ <code>setup</code> の中で <code>app.handle().plugin(...)</code> としているのは、<code>#[cfg(desktop)]</code> という属性を文に付けるためです。メソッドチェーンの途中には属性を書けません。<code>Cargo.toml</code> でも、依存そのものをデスクトップ 3 OS に限定しているので、モバイルのビルドではこのクレートがコンパイルされません（<ChapterLink n={54} />）。capability には <code>window-state:default</code> を加えてあります。公式文書によると、この既定セットには状態の保存と復元のコマンドが含まれます。<Ref n={7} />
          </p>
          <Callout kind="unverified">
            <p>
              テーマの設定が store プラグインを通じて再起動後も保たれること、<code>Ctrl+K</code> と <code>Ctrl+N</code> のショートカットの反応は、Linux 上の <code>tauri dev</code> で確認しています。window-state プラグインによるウィンドウの位置とサイズの実際の復元、macOS の <code>⌘K</code> と <code>⌘N</code> は未検証で、macOS で <code>npm run tauri dev</code> を実行して確かめる想定です。公式文書と docs.rs の API に合わせて書いています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'mobile-layout',
      title: 'モバイル向けレイアウト：ドロワーとセーフエリア',
      body: (
        <>
          <p>
            Tsumugi は <ChapterLink n={54} /> 以降で iOS と Android にも載せます。その準備として、幅が狭い画面でも使えるレイアウトを CSS だけで用意しておきます。デスクトップではサイドバーと本文を 2 列のグリッドに並べ、幅 720px 未満ではサイドバーを画面外に隠した<Term en="drawer">ドロワー</Term>にして、上部のバーのボタンで開きます。図 50-3 に両者を並べます。
          </p>
          <Figure n="50-3" title="デスクトップの 2 列レイアウトと、モバイルのドロワー" caption="左は幅 720px 以上で、grid の 2 列にサイドバーと本文が並ぶ。右は 720px 未満で、サイドバーは translateX(-100%) で画面外に出され、mobile-bar のボタンで .sidebar-open が付くと画面内に戻る。右端の破線は env(safe-area-inset-*) で確保する余白。模式図。">
            <LayoutFigure />
          </Figure>
          <Code
            lang="css"
            title="src/styles/global.css（抜粋）"
            code={`
.sidebar {
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* ---------- モバイル（幅 720px 未満）: サイドバーをドロワーにする ---------- */
@media (max-width: 719px) {
  .app {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(var(--sidebar-width), 80vw);
    z-index: 20;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
  .app.sidebar-open .sidebar {
    transform: none;
  }
  .app.sidebar-open .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 30%);
    z-index: 10;
  }
  .mobile-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-bottom: 1px solid var(--border);
    font-weight: 600;
  }
  /* タッチでは hover が無いので操作ボタンを常に見せる */
  .tree-nest,
  .tree-action {
    visibility: visible;
  }
}
`}
          />
          <p>
            開閉の状態は <code>App.tsx</code> の <code>sidebarOpen</code> という state で、<code>.app</code> に <code>sidebar-open</code> クラスを付け外しするだけです。ページを選ぶと閉じ、背景（<code>.backdrop</code>）をタップしても閉じます。React 側はクラスを切り替えるだけで、アニメーションや配置は CSS に任せています。
          </p>
          <p>
            <code>env(safe-area-inset-*)</code> は、ノッチや角丸のある画面で「ここまでは安全に置ける」という余白を得る CSS の関数です。MDN によると、<code>env()</code> はユーザーエージェントが定義する環境変数の値を CSS に挿入する関数で、<code>safe-area-inset-top</code> などは「非長方形のディスプレイの形で切り取られる危険なく内容を置ける、ビューポートの端からの安全な距離」を表し、ビューポートが長方形で、ツールバーや動的なキーボードがビューポートの領域を占めていなければ 0 になります。<Ref n={9} /> デスクトップでは通常 0 なので無害で、モバイルで初めて効きます。トーストの位置（<code>.toasts</code>）にも <code>calc(16px + env(safe-area-inset-bottom))</code> として足してあります。詳しい話は <ChapterLink n={55} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'errors',
      title: 'エラー表示：AppError からトーストまで',
      body: (
        <>
          <p>
            最後に、エラーの扱いを 1 本の線にします。Tsumugi では、Rust 側で起きたすべての失敗が、同じ経路でフロントエンドのトーストに届きます。図 50-2 がその経路です。<ChapterLink n={47} /> で見た「不正な <code>kind</code> でプロパティを追加しようとした」場合を例にしています。
          </p>
          <Figure n="50-2" title="エラーが core からトーストに届くまで" caption="core の Error は、コマンド層の with_db で ? によって AppError に変換され、Tauri が Serialize でメッセージ文字列にして invoke の Promise を拒否する。React 部品は catch で toastError を呼び、Toasts 部品が表示する。各段で型は変わるが、メッセージの文字列は保たれる。模式図。">
            <ErrorFlowFigure />
          </Figure>
          <p>出発点は、コマンド層の <code>AppError</code> です。</p>
          <Code
            lang="rust"
            title="src-tauri/src/error.rs"
            code={`
//! コマンドが返すエラー。Tauri は \`Err\` を serde でシリアライズして
//! フロントエンドの Promise を reject するので、Serialize が必須。

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error(transparent)]
    Core(#[from] tsumugi_core::Error),
    #[error("ファイル操作に失敗しました: {0}")]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
    #[error("内部エラー: {0}")]
    Internal(String),
}

impl serde::Serialize for AppError {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        // フロントエンドには文字列として届く（catch (e) { String(e) }）
        serializer.serialize_str(&self.to_string())
    }
}

pub type AppResult<T> = Result<T, AppError>;
`}
          />
          <p>
            これは <ChapterLink n={34} /> で学んだ形そのものです。公式文書によると、コマンドが返すものはエラーも含めてすべて <code>serde::Serialize</code> を実装している必要があり、<code>Err</code> を返すとフロントエンドの Promise が拒否されます。<Ref n={10} /> <code>thiserror</code>（<ChapterLink n={24} />）の <code>#[from]</code> により、core の <code>Error</code>、<code>std::io::Error</code>、<code>tauri::Error</code> は <code>?</code> で自動的に <code>AppError</code> に変換されます。<code>#[error(transparent)]</code> は、包んだエラーのメッセージをそのまま使う指定なので、core の「不正な入力: unknown property kind: blob」というメッセージが、そのまま外側のメッセージになります。
          </p>
          <p>
            <code>Serialize</code> の実装は、<code>to_string()</code> で得たメッセージを 1 つの文字列として直列化します。<ChapterLink n={34} /> では種類付きのエラーを JSON オブジェクトで送る方法も紹介しましたが、Tsumugi のフロントエンドはエラーの種類で処理を分けないので、文字列で十分です。種類が必要になったら、この <code>serialize</code> だけを差し替えれば、コマンド側は変わりません。
          </p>
          <p>
            コマンド層では、<code>with_db</code> が core の <code>Result</code> を <code>Ok(f(&amp;conn)?)</code> で <code>AppResult</code> に変換しています。<code>Mutex</code> のロックに失敗した場合（他のスレッドがロック中にパニックした場合）は、<code>AppError::Internal</code> にしています。
          </p>
          <p>フロントエンド側は、<code>toast.tsx</code> がすべてを引き受けます。</p>
          <Code
            lang="tsx"
            title="src/lib/toast.tsx"
            code={`
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
        <div key={t.id} className={\`toast toast-\${t.kind}\`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
`}
          />
          <p>
            設計の肝は、<code>toast()</code> が React のフックではなく普通の関数だということです。<code>markdownIO.ts</code> のような部品の外のコードからも、<code>ipc.searchPages(query).then(setHits).catch(toastError)</code> のような <code>catch</code> からも呼べます。仕組みは、モジュールの中に購読者の <code>Set</code> を持ち、<code>Toasts</code> 部品がマウント時に自分を登録し、アンマウント時に外す、というものです。<ChapterLink n={11} /> の Context や外部の状態管理ライブラリを使わずに、「どこからでも呼べて、表示は 1 か所」を実現しています。
          </p>
          <p>
            <code>errorMessage</code> は、<code>catch</code> で受け取った <code>unknown</code> を文字列にします。Tauri のコマンドのエラーは <code>Serialize</code> の実装どおり文字列で届くので 1 行目で済みますが、プラグインの API やフロントエンド自身の例外は <code>Error</code> オブジェクトのことがあるので、<code>instanceof</code> で分けています。<code>unknown</code> を安全に扱うこの書き方は、<ChapterLink n={6} /> の内容です。
          </p>
          <p>
            <code>Toasts</code> の <code>&lt;div role="status" aria-live="polite"&gt;</code> は、<ChapterLink n={16} /> のアクセシビリティの配慮です。トーストが追加されると、スクリーンリーダーが現在の読み上げを妨げずに内容を伝えます。表示は 4 秒で自動的に消えます。
          </p>
        </>
      ),
    },
    {
      id: 'simplifications',
      title: '本書での簡略化と、Tsumugi のこれから',
      body: (
        <>
          <p>この章と、第6部全体で意図的に簡略化した点をまとめます。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>簡略化した点</th>
                  <th>拡張するなら</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SQLite の接続は 1 本で、<code>Mutex</code> のグローバルロック（<code>lib.rs</code> の <code>ponytail:</code> コメント）</td>
                  <td>ローカルの 1 ユーザーなら十分。検索と保存が競合して待ちが気になるなら、読み取り専用の接続を別に持つか、r2d2 のような接続プールを使う</td>
                </tr>
                <tr>
                  <td>エラーは文字列 1 本で、種類による分岐が無い</td>
                  <td><ChapterLink n={34} /> の種類付きエラーに <code>serialize</code> を差し替え、<code>NotFound</code> のときだけ一覧を取り直す、といった処理を足す</td>
                </tr>
                <tr>
                  <td>設定はテーマだけ</td>
                  <td>store のキーを増やすだけ。フォントサイズや既定の書き出し先などを <code>SettingsDialog</code> に足す</td>
                </tr>
                <tr>
                  <td>ショートカットは 2 つで、変更できない</td>
                  <td>キーと動作の対応表を store に持ち、<code>onKey</code> で表を引く</td>
                </tr>
                <tr>
                  <td>トーストは最大数の制限が無く、同じエラーが連続すると積み重なる</td>
                  <td>同じメッセージが表示中なら追加しない、件数を 3 つまでにする、などを <code>add</code> に足す</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            これで、<ChapterLink n={41} /> で設計した Tsumugi の機能はすべて形になりました。振り返ると、第6部を通して守ってきた原則は 3 つです。Tauri に依存しないロジックは core クレートに置いてテストで守ること、コマンド層は薄く保ち、エラーは 1 つの型に集めること、そして公式プラグインで済むことは Rust に書かず、capability で許可を明示することです。この 3 つは、Tsumugi 以外のアプリを作るときにもそのまま使えます。
          </p>
          <p>
            本制作環境では、core のテスト 14 件と、フロントエンドの <code>tsc</code>・<code>vite build</code> に加え、Linux（Ubuntu 24.04）で <code>tauri dev</code> と <code>tauri build</code> が通り、主要な操作が動くことを確認しています。macOS と Windows での <code>npm run tauri dev</code> は読者の環境で確かめてください。手順は <code>examples/tsumugi/README.md</code> にまとめてあります。
          </p>
        </>
      ),
    },
    {
      id: 'summary',
      title: 'まとめ',
      body: (
        <>
          <ul>
            <li>テーマは、store の設定と prefers-color-scheme の 2 入力から useTheme が light / dark を決め、html の data-theme 属性に書く。CSS は属性セレクタで変数を切り替え、color-scheme でフォーム部品の既定色も合わせる。</li>
            <li>設定は store プラグインの LazyStore で app_data_dir の settings.json に保存し、autoSave（既定 100 ミリ秒）に任せる。Rust は保存先のパスを返すだけ。</li>
            <li>ショートカットは metaKey か ctrlKey で判定するウィンドウ内のもの。ウィンドウ状態は window-state プラグインに任せ、#[cfg(desktop)] と Cargo の target 指定でデスクトップに限定する。</li>
            <li>モバイルでは 720px 未満でサイドバーをドロワーにし、env(safe-area-inset-*) で余白を確保する。開閉は React の state でクラスを切り替えるだけ。</li>
            <li>エラーは AppError に集め、Serialize で文字列にして Promise の拒否として届け、toastError から Toasts に表示する。toast() は普通の関数なので部品の外からも呼べる。</li>
          </ul>
          <p>次の第7部では、完成した Tsumugi をデスクトップ向けにビルドし、署名と公証を経て配布する手順に進みます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'prefers-color-scheme',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme',
      accessed: '2026-11-08',
      note: 'prefers-color-scheme の定義と light / dark の意味の根拠。',
    },
    {
      title: 'Window: matchMedia() method',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia',
      accessed: '2026-11-08',
      note: 'matchMedia が MediaQueryList を返し、一致の判定と変化の監視に使えることの根拠。',
    },
    {
      title: 'color-scheme',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme',
      accessed: '2026-11-08',
      note: 'color-scheme がフォーム部品やスクロールバー、システムカラーの既定色に影響することの根拠。',
    },
    {
      title: '@tauri-apps/plugin-store',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/store/',
      accessed: '2026-11-08',
      version: '@tauri-apps/plugin-store 2.x',
      note: 'LazyStore が最初のメソッド呼び出しで読み込むこと、path が app_data_dir 内のパスであること、autoSave の既定が 100ms であることの根拠。',
    },
    {
      title: 'Opener',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/plugin/opener/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'opener:default にファイルエクスプローラーでの表示が含まれ、openPath は明示的な許可が必要なことの根拠。',
    },
    {
      title: 'KeyboardEvent: metaKey property',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey',
      accessed: '2026-11-08',
      note: 'metaKey が Macintosh では ⌘ Command キーに対応することの根拠。',
    },
    {
      title: 'Window State',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/plugin/window-state/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'ウィンドウの位置と大きさの保存と復元、#[cfg(desktop)] での登録手順、target を限定した依存の追加、window-state:default の内容の根拠。',
    },
    {
      title: 'tauri_plugin_window_state::StateFlags',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri-plugin-window-state/latest/tauri_plugin_window_state/struct.StateFlags.html',
      accessed: '2026-11-08',
      version: 'tauri-plugin-window-state 2.5.0',
      note: 'SIZE / POSITION / MAXIMIZED / VISIBLE / DECORATIONS / FULLSCREEN と、既定が all() であることの根拠。',
    },
    {
      title: 'env()',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env',
      accessed: '2026-11-08',
      note: 'env() の定義と、safe-area-inset-* が非長方形のディスプレイで安全に内容を置ける距離を表し、長方形でツールバー等が領域を占めていなければ 0 になることの根拠。',
    },
    {
      title: 'Calling Rust from the Frontend（Error Handling）',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'コマンドの戻り値はエラーも含めて Serialize が必要で、Err で Promise が拒否されることの根拠。',
    },
  ],
}

export default chapter
