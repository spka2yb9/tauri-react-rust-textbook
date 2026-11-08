import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 39-1 Window・Webview・WebviewWindow ---------- */
function WindowWebviewFigure() {
  return (
    <svg viewBox="0 0 640 335" role="img" aria-label="Window・Webview・WebviewWindow の関係。左は OS のウィンドウ（Window）の中に1つの WebView が入った WebviewWindow で、通常はこれを使う。右は unstable 機能で1つの Window の中に複数の Webview を並べた形。下段に Rust と JS の対応する型名を示す">
      <g fontSize="13">
        {/* 左: WebviewWindow */}
        <text x="160" y="28" textAnchor="middle" fontWeight="600">WebviewWindow（通常はこちら）</text>
        <rect x="30" y="40" width="260" height="190" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <rect x="30" y="40" width="260" height="28" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="59" textAnchor="middle" fontSize="12">Window：label "main"、タイトルバー、枠</text>
        <rect x="45" y="80" width="230" height="135" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="140" textAnchor="middle">Webview</text>
        <text x="160" y="160" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">OS の WebView に index.html</text>
        <text x="160" y="178" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">（React アプリ）</text>
        {/* 右: multi-webview */}
        <text x="480" y="28" textAnchor="middle" fontWeight="600">複数 Webview（unstable 機能）</text>
        <rect x="350" y="40" width="260" height="190" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <rect x="350" y="40" width="260" height="28" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="480" y="59" textAnchor="middle" fontSize="12">Window：label "main"</text>
        <rect x="365" y="80" width="110" height="135" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="420" y="140" textAnchor="middle" fontSize="12">Webview A</text>
        <text x="420" y="158" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">位置と大きさを</text>
        <text x="420" y="174" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">開発者が指定</text>
        <rect x="485" y="80" width="110" height="135" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="540" y="140" textAnchor="middle" fontSize="12">Webview B</text>
        {/* 下段 */}
        <rect x="30" y="245" width="580" height="78" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="262" textAnchor="middle" fontSize="12">Rust：tauri::window::Window ／ tauri::webview::Webview</text>
        <text x="320" y="278" textAnchor="middle" fontSize="12">tauri::webview::WebviewWindow（Window と Webview を包む）</text>
        <text x="320" y="298" textAnchor="middle" fontSize="12">JS：@tauri-apps/api/window ／ @tauri-apps/api/webview</text>
        <text x="320" y="314" textAnchor="middle" fontSize="12">@tauri-apps/api/webviewWindow（両方の API を持つ）</text>
      </g>
    </svg>
  )
}

/* ---------- 図 39-2 メニューとトレイの構成 ---------- */
function MenuTrayFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="メニューとトレイの構成図。上段はアプリメニュー（Menu）が複数のサブメニュー（Submenu）を持ち、各サブメニューがメニュー項目（MenuItem、PredefinedMenuItem、CheckMenuItem）を持つ木構造。下段はトレイアイコン（TrayIcon）がメニューを持ち、クリックなどのイベントとメニュー項目のクリックが on_tray_icon_event と on_menu_event に届く">
      <defs>
        <marker id="arrow39b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {/* Menu tree */}
        <rect x="20" y="20" width="110" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="75" y="43" textAnchor="middle" fontWeight="600">Menu</text>
        <line x1="130" y1="38" x2="170" y2="38" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="170" y1="38" x2="170" y2="150" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M170,38 L198,38" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <path d="M170,94 L198,94" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <path d="M170,150 L198,150" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <rect x="200" y="20" width="120" height="36" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="260" y="43" textAnchor="middle">Submenu "App"</text>
        <rect x="200" y="76" width="120" height="36" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="260" y="99" textAnchor="middle">Submenu "File"</text>
        <rect x="200" y="132" width="120" height="36" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="260" y="155" textAnchor="middle">Submenu "Edit"</text>
        {/* items of File */}
        <line x1="320" y1="94" x2="360" y2="94" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="360" y1="60" x2="360" y2="150" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M360,60 L388,60" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <path d="M360,94 L388,94" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <path d="M360,122 L388,122" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <path d="M360,150 L388,150" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <rect x="390" y="46" width="230" height="26" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="505" y="63" textAnchor="middle">MenuItem id "new-page"（自作）</text>
        <rect x="390" y="81" width="230" height="26" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="505" y="98" textAnchor="middle">MenuItem id "export"（自作）</text>
        <rect x="390" y="109" width="230" height="26" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="505" y="126" textAnchor="middle">PredefinedMenuItem::separator</text>
        <rect x="390" y="137" width="230" height="26" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="505" y="154" textAnchor="middle">PredefinedMenuItem::quit（OS 標準）</text>
        <text x="320" y="190" textAnchor="middle" fill="var(--fig-muted)">macOS：メニューバーに表示（最初の Submenu がアプリ名の位置）　Windows／Linux：ウィンドウ内に表示</text>
        {/* Tray */}
        <rect x="20" y="220" width="120" height="50" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="80" y="241" textAnchor="middle" fontWeight="600">TrayIcon</text>
        <text x="80" y="259" textAnchor="middle" fill="var(--fig-muted)">icon、tooltip</text>
        <path d="M140,235 L198,235" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <text x="169" y="226" textAnchor="middle" fill="var(--fig-muted)">.menu</text>
        <rect x="200" y="220" width="120" height="50" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="260" y="241" textAnchor="middle">Menu</text>
        <text x="260" y="259" textAnchor="middle" fill="var(--fig-muted)">"show"、"quit"</text>
        <path d="M320,245 L388,245" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39b)" />
        <text x="354" y="236" textAnchor="middle" fill="var(--fig-muted)">項目クリック</text>
        <rect x="390" y="220" width="230" height="26" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="505" y="237" textAnchor="middle">on_menu_event(|app, event| …)</text>
        <path d="M140,260 L388,290" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow39b)" />
        <text x="250" y="300" textAnchor="middle" fill="var(--fig-muted)">アイコンのクリック・ダブルクリック・</text>
        <text x="250" y="315" textAnchor="middle" fill="var(--fig-muted)">Enter・Move・Leave</text>
        <rect x="390" y="278" width="230" height="26" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="505" y="295" textAnchor="middle">on_tray_icon_event(|tray, event| …)</text>
      </g>
      <text x="320" y="330" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図。実線：所有関係とメニューイベント　破線：トレイアイコン自体のイベント（Linux では発生しない）</text>
    </svg>
  )
}

/* ---------- 図 39-3 グローバルショートカットとアプリ内ショートカット ---------- */
function ShortcutFigure() {
  return (
    <svg viewBox="0 0 640 275" role="img" aria-label="2種類のショートカットの経路。上段のグローバルショートカットは OS がキー入力を受けて、アプリがフォーカスを持っていなくても Rust 側のハンドラに届く。下段のアプリ内ショートカットは WebView がフォーカスを持つときだけ keydown イベントとして React に届く">
      <defs>
        <marker id="arrow39c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="30" width="110" height="180" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="75" y="60" textAnchor="middle" fontWeight="600">キーボード</text>
        <text x="75" y="110" textAnchor="middle" fontSize="12">Cmd+Shift+K</text>
        <text x="75" y="170" textAnchor="middle" fontSize="12">Cmd+K</text>
        {/* global */}
        <path d="M130,100 L188,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39c)" />
        <rect x="190" y="70" width="150" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="265" y="96" textAnchor="middle" fontWeight="600">OS</text>
        <text x="265" y="116" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">登録済みの組合せを横取り</text>
        <path d="M340,100 L378,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39c)" />
        <rect x="380" y="70" width="240" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="500" y="92" textAnchor="middle" fontWeight="600">global-shortcut プラグイン</text>
        <text x="500" y="112" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">フォーカスが無くても Rust のハンドラへ</text>
        {/* in-app */}
        <path d="M130,160 L188,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39c)" />
        <rect x="190" y="130" width="150" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="265" y="156" textAnchor="middle" fontWeight="600">OS → ウィンドウ</text>
        <text x="265" y="176" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">フォーカス中のみ</text>
        <path d="M340,160 L378,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow39c)" />
        <rect x="380" y="130" width="240" height="60" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="500" y="152" textAnchor="middle" fontWeight="600">WebView の keydown</text>
        <text x="500" y="172" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">React のイベントハンドラで処理</text>
      </g>
      <text x="320" y="232" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">上：グローバルショートカット（デスクトップのみ、OS 全体に効く）</text>
      <text x="320" y="249" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">下：アプリ内ショートカット（普通の Web の方法）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 39,
  part: 5,
  title: 'ウィンドウ・メニュー・システムトレイ',
  summary:
    'デスクトップアプリらしさは、ウィンドウの扱い、ネイティブメニュー、システムトレイ、ショートカットから生まれます。Window・Webview・WebviewWindow の関係を整理したうえで、設定ファイルとコードの両方でウィンドウを作る方法、メニューとトレイの組み立て方、グローバルショートカットとアプリ内ショートカットの使い分けを学びます。',
  goals: [
    'Window・Webview・WebviewWindow の関係と、Rust と JS でそれぞれどの型を使うかを説明できる',
    'tauri.conf.json とコードの両方でウィンドウを作り、ラベルで取得・操作できる',
    'タイトルバーを自作するときに必要な設定と permission を挙げられる',
    'Rust と JS でネイティブメニューを組み立て、クリックを処理できる',
    'システムトレイのアイコン・メニュー・イベントを設定し、OS ごとの制約を知っている',
    'グローバルショートカットとアプリ内ショートカットの違いを理解し、適切に選べる',
  ],
  prerequisites: [33, 35, 36, 37],
  sections: [
    {
      id: 'intro',
      title: 'ウィンドウ1つのアプリから先へ',
      body: (
        <>
          <p>
            ここまでの章では、<code>create-tauri-app</code> が作った <code>main</code> ウィンドウ1つの上で、コマンド（<ChapterLink n={34} />）、イベント（<ChapterLink n={35} />）、状態（<ChapterLink n={36} />）を扱ってきました。この章は、Tauri 本体が持つ「デスクトップアプリの外側」の機能、つまりウィンドウそのもの、メニュー、システムトレイ、ショートカットを扱います。
          </p>
          <p>
            これらは Web の技術では作れない部分です。ブラウザの中で動く Web アプリはウィンドウの枠やメニューバーを持てませんが、Tauri アプリは OS のネイティブな部品として持てます。その代わり、OS ごとの流儀の違いが表に出てきます。macOS のメニューは画面上部のメニューバーに、Windows と Linux のメニューはウィンドウの中に出る、といった違いです。<Ref n={2} /> この章では公式資料の記述に沿って、違いも含めて整理します。
          </p>
          <p>
            メニュー、トレイ、ウィンドウのカスタマイズはデスクトップ専用の機能で、Android と iOS では使えません。<Ref n={1} /> モバイルでの画面構成は <ChapterLink n={55} /> で別に扱います。
          </p>
        </>
      ),
    },
    {
      id: 'window-webview',
      title: 'Window・Webview・WebviewWindow',
      body: (
        <>
          <p>
            Tauri の API には、ウィンドウに関する型が3つ出てきます。名前が似ているので、最初に関係をはっきりさせます。
          </p>
          <ul>
            <li>
              <Term en="Window">Window</Term>：docs.rs の説明では「Tauri が管理するウィンドウ」です。<Ref n={5} /> OS のウィンドウそのもので、タイトルバー、枠、位置、大きさ、フォーカスを持ちます。
            </li>
            <li>
              <Term en="Webview">Webview</Term>：ウィンドウの中に置かれる、Web コンテンツを表示する領域です。<ChapterLink n={33} /> で見た OS の WebView（WKWebView、WebView2、WebKitGTK）を包んでいます。
            </li>
            <li>
              <Term en="WebviewWindow">WebviewWindow</Term>：docs.rs の説明では「Window と Webview を一緒に包む型」です。<Ref n={6} /> ウィンドウ1つに WebView 1つという、ほとんどのアプリの形をそのまま表します。
            </li>
          </ul>
          <Figure n="39-1" title="Window・Webview・WebviewWindow の関係" caption="左は通常の形で、Window の中に Webview が1つ入った WebviewWindow。右は unstable 機能で1つの Window に複数の Webview を並べる形。下段は Rust と JS で対応するモジュール。模式図。">
            <WindowWebviewFigure />
          </Figure>
          <p>
            通常は左の形だけを使います。Rust では <code>tauri::WebviewWindow</code>、JS では <code>@tauri-apps/api/webviewWindow</code> の <code>WebviewWindow</code> クラスです。JS 側のリファレンスは、このクラスが「Window と Webview の API を組み合わせたもの」で、それぞれ1つの WebView を持つウィンドウを作成・操作すると説明しています。<Ref n={8} /> 右の形、つまり1つの Window に複数の Webview を置く使い方は、Rust の <code>Window::add_child</code> などで実現できますが、<code>unstable</code> という Cargo 機能を有効にする必要があり、デスクトップ限定です。<Ref n={5} /> 本書では扱いません。
          </p>
          <p>
            ウィンドウとウィンドウに属する WebView は、それぞれ<Term en="label">ラベル</Term>という文字列で識別されます。設定ファイルの既定は <code>"main"</code> で、英数字でなければなりません。<Ref n={9} /> JS 側のリファレンスでは <code>a-zA-Z-/:_</code> の文字が使えると書かれています。<Ref n={8} /> <ChapterLink n={37} /> で見たとおり、capability はこのラベルで対象を決めるので、ラベルは「どのウィンドウがどの権限を持つか」の鍵でもあります。
          </p>
        </>
      ),
    },
    {
      id: 'create-windows',
      title: 'ウィンドウを作る3つの方法',
      body: (
        <>
          <h3>設定ファイルで作る</h3>
          <p>
            最も簡単なのは <code>tauri.conf.json</code> の <code>app.windows</code> に書く方法です。起動時に Tauri が作ります。主なフィールドと既定値は設定リファレンスに定義されています。<Ref n={9} />
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（app.windows の例）"
            code={`
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "Tsumugi",
        "url": "index.html",
        "width": 1100,
        "height": 760,
        "minWidth": 720,
        "minHeight": 480,
        "center": true,
        "visible": false
      },
      {
        "label": "settings",
        "title": "設定",
        "url": "index.html#/settings",
        "width": 520,
        "height": 600,
        "create": false
      }
    ]
  }
}
`}
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>フィールド</th>
                  <th>既定値</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>label</code></td>
                  <td><code>"main"</code></td>
                  <td>ウィンドウの識別子。英数字</td>
                </tr>
                <tr>
                  <td><code>create</code></td>
                  <td><code>true</code></td>
                  <td>起動時に Tauri がこのウィンドウを作るかどうか</td>
                </tr>
                <tr>
                  <td><code>url</code></td>
                  <td><code>"index.html"</code></td>
                  <td>WebView に読み込む URL</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>"Tauri App"</code></td>
                  <td>ウィンドウのタイトル</td>
                </tr>
                <tr>
                  <td><code>width</code>、<code>height</code></td>
                  <td><code>800</code>、<code>600</code></td>
                  <td>論理ピクセルでの大きさ</td>
                </tr>
                <tr>
                  <td><code>resizable</code></td>
                  <td><code>true</code></td>
                  <td>サイズ変更の可否。false にすると最大化ボタンも無効になる</td>
                </tr>
                <tr>
                  <td><code>visible</code></td>
                  <td><code>true</code></td>
                  <td>作成直後に表示するか</td>
                </tr>
                <tr>
                  <td><code>decorations</code></td>
                  <td><code>true</code></td>
                  <td>枠とタイトルバーを持つか</td>
                </tr>
                <tr>
                  <td><code>titleBarStyle</code></td>
                  <td><code>"Visible"</code></td>
                  <td>macOS のタイトルバーの様式。<code>Transparent</code>、<code>Overlay</code> も選べる</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td>システムのテーマ</td>
                  <td>初期テーマ。Windows と macOS 10.14 以降のみ</td>
                </tr>
                <tr>
                  <td><code>devtools</code></td>
                  <td>有効</td>
                  <td>Web インスペクタの有効・無効</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            2つ目の <code>settings</code> ウィンドウは <code>create: false</code> にしてあります。設定は書いておくが起動時には作らず、あとでコードから開く、という使い方です。<code>visible: false</code> は、<ChapterLink n={38} /> の window-state プラグインが前回の位置と大きさを復元したあとで表示するための設定で、復元前の一瞬のちらつきを避けられます。<Ref n={12} />
          </p>
          <h3>Rust から作る</h3>
          <p>
            コードで作るときは <code>WebviewWindowBuilder</code> を使います。docs.rs の説明は「WebviewWindow、つまり1つの WebView を持つウィンドウのビルダー」です。<Ref n={4} /> <code>setup</code> フックの中で作る例が公式に載っています。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（setup でウィンドウを作る）"
            code={`
use tauri::{WebviewUrl, WebviewWindowBuilder};

tauri::Builder::default()
    .setup(|app| {
        WebviewWindowBuilder::new(app, "main", WebviewUrl::App("index.html".into()))
            .title("Tsumugi")
            .inner_size(1100.0, 760.0)
            .min_inner_size(720.0, 480.0)
            .center()
            .build()?;
        Ok(())
    })
`}
          />
          <p>
            <code>new</code> の第1引数は <code>Manager</code> を実装した値（<code>App</code>、<code>AppHandle</code> など）、第2引数がラベル、第3引数が URL です。<Ref n={4} /> 設定ファイルの <code>app.windows</code> に書いた内容から作る <code>from_config</code> もあります。<Ref n={4} /> 主なビルダーメソッドは設定ファイルのフィールドと対応していて、<code>title</code>、<code>inner_size</code>、<code>position</code>、<code>resizable</code>、<code>decorations</code>、<code>transparent</code>、<code>always_on_top</code>、<code>visible</code>、<code>parent</code> などがあります。<Ref n={4} /> <code>initialization_script</code> で HTML の解析前に実行する JavaScript を注入したり、<code>on_navigation</code> で <code>false</code> を返して遷移を取り消したりもできます。<Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              docs.rs は、Windows ではこの関数を同期コマンドやイベントハンドラの中で呼ぶとデッドロックすると注意し、ウィンドウを作るときは <code>async</code> コマンドと別スレッドを使うよう勧めています。<Ref n={4} /> コマンドからウィンドウを開くときは <code>async fn</code> にします。
            </p>
          </Callout>
          <h3>JS から作る</h3>
          <Code
            lang="ts"
            title="src/features/settings/openSettings.ts（JS でウィンドウを開く）"
            code={`
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export async function openSettingsWindow(): Promise<void> {
  // getByLabel は Promise を返す。無ければ null
  const existing = await WebviewWindow.getByLabel('settings');
  if (existing) {
    void existing.setFocus();
    return;
  }
  const win = new WebviewWindow('settings', {
    url: 'index.html#/settings',
    title: '設定',
    width: 520,
    height: 600,
  });
  void win.once('tauri://created', () => console.log('設定ウィンドウを作成'));
  void win.once('tauri://error', (e) => console.error('作成に失敗', e));
}
`}
          />
          <p>
            コンストラクタは「新しいウィンドウを作る」操作で、作成の成功と失敗は <code>tauri://created</code> と <code>tauri://error</code> のイベントで知らされます。<Ref n={8} /> この操作には <code>core:webview:allow-create-webview-window</code> の permission が必要で、<code>core:webview:default</code> には含まれていません。<Ref n={8} /> <ChapterLink n={37} /> で「ウィンドウ作成の権限は特権の高いウィンドウだけに」と公式が勧めていたのはこのためです。
          </p>
          <h3>取得と操作</h3>
          <p>
            作ったウィンドウは、Rust では <code>app.get_webview_window("main")</code>（<code>Manager</code> トレイト）で、JS では <code>getCurrentWebviewWindow()</code> や <code>WebviewWindow.getByLabel('settings')</code> で取得します。<Ref n={8} /> 取得した <code>WebviewWindow</code> には <code>setTitle</code>、<code>close</code>、<code>hide</code>、<code>show</code>、<code>minimize</code>、<code>maximize</code>、<code>setSize</code>、<code>center</code>、<code>setAlwaysOnTop</code> などの操作と、<code>listen</code>、<code>emit</code>、<code>emitTo</code>、<code>onCloseRequested</code> などのイベント関連のメソッドがあります。<Ref n={8} /> ウィンドウ間でデータをやり取りするには <ChapterLink n={35} /> の <code>emitTo</code> を使います。
          </p>
          <p>
            Rust 側の <code>close</code> は、まず「閉じる要求」のイベントを出して横取りできるようにし、<code>destroy</code> はそれを飛ばして強制的に閉じます。<Ref n={6} /> 未保存の内容があるときに確認を出すには、JS の <code>onCloseRequested</code> で <code>event.preventDefault()</code> を呼んでから dialog プラグインで尋ねる、という形になります。
          </p>
        </>
      ),
    },
    {
      id: 'customize',
      title: 'タイトルバーのカスタマイズ',
      body: (
        <>
          <p>
            OS 標準のタイトルバーを消して自分で描きたい、という要望はよくあります。公式の「Window Customization」はその手順を示しています。<Ref n={1} />
          </p>
          <ol className="steps">
            <li><code>tauri.conf.json</code> の該当ウィンドウで <code>"decorations": false</code> にして、OS の枠とタイトルバーを消す。</li>
            <li>
              capability に <code>core:window:default</code>、<code>core:window:allow-close</code>、<code>core:window:allow-minimize</code>、<code>core:window:allow-toggle-maximize</code>、<code>core:window:allow-start-dragging</code> を加える。
            </li>
            <li>HTML でタイトルバーの要素を作り、ドラッグで動かしたい部分に <code>data-tauri-drag-region</code> 属性を付ける。</li>
            <li>最小化・最大化・閉じるボタンに、<code>getCurrentWindow()</code> の <code>minimize()</code>、<code>toggleMaximize()</code>、<code>close()</code> を結び付ける。</li>
          </ol>
          <Code
            lang="tsx"
            title="src/components/TitleBar.tsx（自作タイトルバーの React 版）"
            code={`
import { getCurrentWindow } from '@tauri-apps/api/window';

export function TitleBar() {
  const win = getCurrentWindow();
  return (
    <div className="titlebar" data-tauri-drag-region>
      <span data-tauri-drag-region>Tsumugi</span>
      <div className="controls">
        <button type="button" onClick={() => void win.minimize()} aria-label="最小化">－</button>
        <button type="button" onClick={() => void win.toggleMaximize()} aria-label="最大化">□</button>
        <button type="button" onClick={() => void win.close()} aria-label="閉じる">×</button>
      </div>
    </div>
  );
}
`}
          />
          <p>
            <code>data-tauri-drag-region</code> は付けた要素自身にだけ効き、子要素には効きません。子にも付ける必要がありますが、ボタンのような操作可能な要素はそのまま動きます。<Ref n={1} /> Windows では、ボタンを持たない単純なドラッグバーなら CSS の <code>app-region: drag</code> でも代用でき、こちらはタッチとペンにも対応します。<Ref n={1} />
          </p>
          <p>
            macOS には、OS の機能（信号機ボタンなど）を残したままタイトルバーの見た目だけを変える道があります。<code>titleBarStyle</code> を <code>Transparent</code> や <code>Overlay</code> にし、<code>hiddenTitle: true</code> でタイトル文字を隠す方法です。<Ref n={9} /> 公式は Rust の <code>objc2-app-kit</code> で <code>NSWindow</code> の背景色を変える例まで示していますが、<Ref n={1} /> 本書では設定だけで済む範囲にとどめます。
          </p>
          <Callout kind="unverified">
            <p>
              <code>decorations: false</code> のときの各 OS の見え方、<code>titleBarStyle</code> の macOS での描画、<code>app-region: drag</code> の Windows での動作は、公式資料に基づく記述で、本書の制作環境では未検証です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'menu',
      title: 'ネイティブメニュー',
      body: (
        <>
          <p>
            公式の「Window Menu」は、ネイティブのアプリケーションメニューはウィンドウにもシステムトレイにも付けられ、デスクトップで利用できる、と説明しています。<Ref n={2} /> 構造は木です。<code>Menu</code> が複数の <code>Submenu</code> を持ち、<code>Submenu</code> が項目を持ちます。項目には、自作の <code>MenuItem</code>、チェック付きの <code>CheckMenuItem</code>、OS が用意する「コピー」「終了」などの <code>PredefinedMenuItem</code> があります。<Ref n={2} />
          </p>
          <Figure n="39-2" title="メニューとトレイの構成" caption="上段はアプリメニューの木構造。Menu → Submenu → 項目の順で、項目には自作の MenuItem と OS 標準の PredefinedMenuItem がある。下段はトレイアイコンで、メニュー項目のクリックは on_menu_event に、アイコン自体のクリックなどは on_tray_icon_event に届く。模式図。">
            <MenuTrayFigure />
          </Figure>
          <Code
            lang="rust"
            title="src-tauri/src/menu.rs（Rust でメニューを組み立てる）"
            code={`
use tauri::menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder};
use tauri::{App, Emitter};

pub fn build(app: &App) -> tauri::Result<()> {
    let new_page = MenuItemBuilder::with_id("new-page", "新規ページ")
        .accelerator("CmdOrCtrl+N")
        .build(app)?;
    let export = MenuItemBuilder::with_id("export", "Markdown で書き出す…").build(app)?;

    let app_menu = SubmenuBuilder::new(app, "Tsumugi")
        .about(None)
        .separator()
        .quit()
        .build()?;
    let file = SubmenuBuilder::new(app, "ファイル")
        .item(&new_page)
        .item(&export)
        .build()?;
    let edit = SubmenuBuilder::new(app, "編集")
        .undo().redo().separator().cut().copy().paste().select_all()
        .build()?;

    let menu = MenuBuilder::new(app).items(&[&app_menu, &file, &edit]).build()?;
    app.set_menu(menu)?;

    app.on_menu_event(|app, event| match event.id().0.as_str() {
        "new-page" => { let _ = app.emit("menu:new-page", ()); }
        "export" => { let _ = app.emit("menu:export", ()); }
        _ => {}
    });
    Ok(())
}
`}
          />
          <p>
            読み方のポイントは3つです。第一に、メニュー項目には ID を付け、<code>on_menu_event</code> で <code>event.id()</code> を見て分岐します。<Ref n={2} /> 第二に、<code>SubmenuBuilder</code> には <code>.copy()</code>、<code>.undo()</code>、<code>.quit()</code>、<code>.about(None)</code> のような、OS 標準の項目を1行で足す省略形があります。<Ref n={13} /><Ref n={2} /> 第三に、メニューの選択をフロントエンドに伝えるには、この例のように <ChapterLink n={35} /> の <code>emit</code> でイベントにするのが自然です。React 側は <code>listen('menu:new-page', …)</code> で受けます。
          </p>
          <p>
            JS からも同じ木を作れます。<code>Menu.new</code> に項目の配列を渡し、各項目の <code>action</code> にクリック時の処理を書き、<code>setAsAppMenu()</code> で適用します。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            title="src/menu.ts（JS でメニューを作る）"
            code={`
import { Menu, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';

export async function installMenu(onNewPage: () => void): Promise<void> {
  const file = await Submenu.new({
    text: 'ファイル',
    items: [
      { id: 'new-page', text: '新規ページ', accelerator: 'CmdOrCtrl+N', action: onNewPage },
      await PredefinedMenuItem.new({ item: 'Separator' }),
      await PredefinedMenuItem.new({ item: 'Quit', text: '終了' }),
    ],
  });
  const menu = await Menu.new({ items: [file] });
  await menu.setAsAppMenu();
}
`}
          />
          <p>
            JS 側では、Tauri 2.12 から <code>await using</code> でメニューのリソースをスコープ終了時に自動で閉じられます。<Ref n={2} /> OS ごとの違いにも注意が必要です。macOS ではメニューはメニューバーに表示され、すべての項目はサブメニューの中に置く必要があります（トップレベルの項目は無視されます）。最初のサブメニューはアプリ名の位置に置かれるので、ふつうは「About」などアプリ自身のメニューにします。<Ref n={2} /> Windows と Linux ではメニューはウィンドウの中に表示されます。<Ref n={2} /> また、Rust の <code>WebviewWindow::set_menu</code> は macOS では効かず（メニューはアプリ全体のものなので）、<code>AppHandle::set_menu</code> を使います。<Ref n={6} />
          </p>
        </>
      ),
    },
    {
      id: 'tray',
      title: 'システムトレイ',
      body: (
        <>
          <p>
            システムトレイ（macOS のメニューバー右側、Windows のタスクトレイ、Linux の通知領域）にアイコンを置く機能です。<code>Cargo.toml</code> の <code>tauri</code> に <code>tray-icon</code> 機能を追加して有効にします。<Ref n={3} />
          </p>
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml"
            code={`
[dependencies]
tauri = { version = "2", features = ["tray-icon"] }
`}
          />
          <Code
            lang="rust"
            title="src-tauri/src/tray.rs（トレイアイコンとメニュー）"
            code={`
use tauri::menu::{Menu, MenuItem};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
use tauri::{App, Manager};

pub fn build(app: &App) -> tauri::Result<()> {
    let show = MenuItem::with_id(app, "show", "Tsumugi を表示", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "終了", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show, &quit])?;

    TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .tooltip("Tsumugi")
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "show" => {
                if let Some(w) = app.get_webview_window("main") {
                    let _ = w.unminimize();
                    let _ = w.show();
                    let _ = w.set_focus();
                }
            }
            "quit" => app.exit(0),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click { button: MouseButton::Left, button_state: MouseButtonState::Up, .. } = event {
                if let Some(w) = tray.app_handle().get_webview_window("main") {
                    let _ = w.show();
                    let _ = w.set_focus();
                }
            }
        })
        .build(app)?;
    Ok(())
}
`}
          />
          <p>
            公式の例に沿って読みます。<Ref n={3} /> アイコンは <code>app.default_window_icon()</code> でアプリのアイコンを流用できます。メニューは既定で左クリックと右クリックの両方で開き、左クリックで開かないようにするには <code>show_menu_on_left_click(false)</code> を呼びます。メニュー項目のクリックは <code>on_menu_event</code> に、アイコン自体のクリックは <code>on_tray_icon_event</code> に届きます。後者の <code>TrayIconEvent</code> には <code>Click</code>、<code>DoubleClick</code>（Windows のみ）、<code>Enter</code>、<code>Move</code>、<code>Leave</code> があり、<code>Click</code> はボタンと押下状態を持ちます。この列挙型は <code>#[non_exhaustive]</code> なので、<code>match</code> には必ず <code>_</code> の腕を書きます。<Ref n={3} /><Ref n={14} /> この例は「左ボタンを離したとき」にウィンドウを表示します。
          </p>
          <p>
            JS からも <code>@tauri-apps/api/tray</code> の <code>TrayIcon.new(options)</code> で同じことができ、アイコンには <code>@tauri-apps/api/app</code> の <code>defaultWindowIcon()</code> を使います。<Ref n={3} /> 設定ファイルの <code>app.trayIcon</code> でアイコンのパス（<code>iconPath</code>、必須）や <code>tooltip</code>（Windows と macOS のみ）、<code>showMenuOnLeftClick</code> を指定する方法もあります。<Ref n={9} /> 以前の <code>menuOnLeftClick</code> は v2.2 から動作せず非推奨です。<Ref n={9} />
          </p>
          <Callout kind="warn" title="Linux の制約">
            <p>
              Linux ではトレイアイコンのイベントがサポートされていません。アイコンは表示されますがイベントは発生せず、右クリックのコンテキストメニューだけが動きます。<Ref n={3} /> 「アイコンをクリックしたらウィンドウを出す」という動作に頼らず、メニューに「表示」項目を置いておくのが安全です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'shortcut',
      title: 'グローバルショートカットとアプリ内ショートカット',
      body: (
        <>
          <p>
            「ショートカットキー」には2種類あります。アプリがフォーカスを持っていないときにも効く<Term en="global shortcut">グローバルショートカット</Term>と、アプリの画面にフォーカスがあるときだけ効くアプリ内ショートカットです。経路が異なるので、実装も異なります。
          </p>
          <Figure n="39-3" title="2種類のショートカットの経路" caption="グローバルショートカット（上）は OS が登録済みのキー組み合わせを横取りし、フォーカスに関係なく global-shortcut プラグインのハンドラに渡す。アプリ内ショートカット（下）はフォーカス中のウィンドウの WebView に keydown として届き、React で処理する。模式図。">
            <ShortcutFigure />
          </Figure>
          <p>
            グローバルショートカットは global-shortcut プラグインが提供します。デスクトップ専用で、Android と iOS は非対応です。<Ref n={7} /> 導入はデスクトップ限定のターゲットで依存を加え、<code>setup</code> の中で <code>#[cfg(desktop)]</code> 付きで登録します。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（Rust でグローバルショートカットを登録）"
            code={`
.setup(|app| {
    #[cfg(desktop)]
    {
        use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};
        let quick_note = Shortcut::new(Some(Modifiers::SUPER | Modifiers::SHIFT), Code::KeyK);
        app.handle().plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(move |app, shortcut, event| {
                    if shortcut == &quick_note && event.state() == ShortcutState::Pressed {
                        if let Some(w) = app.get_webview_window("main") {
                            let _ = w.show();
                            let _ = w.set_focus();
                        }
                    }
                })
                .build(),
        )?;
        app.global_shortcut().register(quick_note)?;
    }
    Ok(())
})
`}
          />
          <p>
            公式の例では <code>Shortcut::new(Some(Modifiers::CONTROL), Code::KeyN)</code> でショートカットを定義し、プラグインの <code>with_handler</code> で押下・解放（<code>ShortcutState::Pressed</code>／<code>Released</code>）を受け取り、<code>app.global_shortcut().register(…)</code> で登録します。<Ref n={7} /> JS からは <code>@tauri-apps/plugin-global-shortcut</code> の <code>register('CommandOrControl+Shift+C', handler)</code> で登録でき、<code>unregister</code> と <code>isRegistered</code> もあります。<Ref n={7} />
          </p>
          <p>
            permission に注意してください。このプラグインの既定セットは空で、公式は「ショートカットは危険になりうるため、アプリごとに決めるべき」として何も有効にしていません。<Ref n={7} /> JS から登録するには <code>global-shortcut:allow-register</code>、<code>allow-unregister</code>、<code>allow-is-registered</code> を capability に明示します。<Ref n={7} /> permission は IPC 経由の呼び出しを制御する仕組みなので、Rust 側から登録するだけなら capability への記述は要りません。<Ref n={10} />
          </p>
          <h3>アプリ内ショートカットは Web の方法で</h3>
          <p>
            一方、「Cmd+K で検索を開く」のようにアプリの画面内で使うショートカットは、Web の <code>keydown</code> イベントで実装します。グローバルショートカットにすると、他のアプリを使っているときにも横取りしてしまうからです。React では <ChapterLink n={12} /> の <code>useEffect</code> で <code>window</code> にリスナーを登録し、クリーンアップで外します。
          </p>
          <Code
            lang="tsx"
            title="src/hooks/useShortcut.ts（アプリ内ショートカットのカスタムフック）"
            code={`
import { useEffect } from 'react';

// mod は macOS では Cmd、それ以外では Ctrl
export function useShortcut(key: string, handler: () => void): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = navigator.platform.startsWith('Mac') ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === key) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler]);
}
`}
          />
          <p>
            メニュー項目に <code>accelerator</code> を付けた場合も、OS がそのキーを受けてメニューのイベントを発行するので、アプリ内ショートカットの一種として働きます。メニューに載せる操作は <code>accelerator</code> で、載せない画面内の操作は <code>keydown</code> で、と分けると重複せずに済みます。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi',
      title: 'Tsumugi での使いどころ',
      body: (
        <>
          <Callout kind="tsumugi">
            <p>
              Tsumugi はウィンドウ1つ（<code>main</code>）で構成し、設定画面は別ウィンドウではなくアプリ内の画面として作ります（<ChapterLink n={50} />）。そのため <code>core:webview:allow-create-webview-window</code> は capability に加えません。<code>tauri.conf.json</code> の <code>app.windows</code> には <code>main</code> だけを書き、<code>visible: false</code> にして window-state プラグインに復元後の表示を任せます。
            </p>
            <p>
              メニューは Rust 側の <code>menu.rs</code> で組み立て、「新規ページ」「Markdown で書き出す」「検索」の項目に <code>accelerator</code> を付けます。選択は <code>emit</code> でフロントエンドに伝え、React 側が <code>listen</code> で受けてページ作成や書き出しの処理を呼びます（<ChapterLink n={43} />、<ChapterLink n={49} />）。Cmd/Ctrl+K の検索と Cmd/Ctrl+N の新規ページは、メニューの <code>accelerator</code> とアプリ内の <code>useShortcut</code> の両方で受けられるようにし、グローバルショートカットは使いません。システムトレイも、常駐型のアプリではないので採用しません。
            </p>
          </Callout>
          <Callout kind="unverified">
            <p>
              メニューの表示位置や accelerator の表記、トレイの挙動は OS ごとに異なり、公式資料に基づく記述です。本書の制作環境では macOS と Windows での動作を確認できていません。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'summary',
      title: 'まとめ',
      body: (
        <>
          <ul>
            <li>Window は OS のウィンドウ、Webview はその中の Web コンテンツ、WebviewWindow は両方を包んだ通常の形。1ウィンドウに複数 Webview は unstable 機能。</li>
            <li>ウィンドウは <code>tauri.conf.json</code> の <code>app.windows</code>、Rust の <code>WebviewWindowBuilder</code>、JS の <code>new WebviewWindow()</code> で作る。JS からの作成には <code>core:webview:allow-create-webview-window</code> が必要で、ラベルが capability の鍵になる。</li>
            <li>タイトルバーの自作は <code>decorations: false</code>、<code>data-tauri-drag-region</code>、window 系の permission の組み合わせ。</li>
            <li>メニューは Menu → Submenu → 項目の木。ID で分岐し、macOS はメニューバー、Windows／Linux はウィンドウ内に表示される。</li>
            <li>トレイは <code>tray-icon</code> 機能で有効にし、メニューとアイコンのイベントを別々に受ける。Linux ではアイコンのイベントが発生しない。</li>
            <li>グローバルショートカットはデスクトップ専用のプラグインで既定の permission は空。画面内のショートカットは <code>keydown</code> で実装する。</li>
          </ul>
          <p>次章では、ここまでに作った機能を確かめるためのデバッグとテストの方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Window Customization',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/window-customization/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'decorations: false、必要な permission、data-tauri-drag-region の挙動、app-region: drag、macOS の透明タイトルバーの例。',
    },
    {
      title: 'Window Menu',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/window-menu/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'MenuBuilder・SubmenuBuilder・PredefinedMenuItem、on_menu_event、JS の Menu.new と setAsAppMenu、await using、macOS と Windows／Linux の表示の違い。',
    },
    {
      title: 'System Tray',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/system-tray/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'tray-icon 機能、TrayIconBuilder、default_window_icon、show_menu_on_left_click、on_menu_event と on_tray_icon_event、イベントの種類、Linux でイベントが発生しないこと。',
    },
    {
      title: 'WebviewWindowBuilder (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/webview/struct.WebviewWindowBuilder.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'new と from_config、setup での作成例、ビルダーメソッド、Windows で同期コマンド内の呼び出しがデッドロックする注意。',
    },
    {
      title: 'Window (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/window/struct.Window.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'Window の定義、add_child と複数 Webview、unstable 機能が必要なこと。',
    },
    {
      title: 'WebviewWindow (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/webview/struct.WebviewWindow.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'Window と Webview を包む型であること、close と destroy の違い、macOS では set_menu がアプリ全体のため AppHandle::set_menu を使うこと。',
    },
    {
      title: 'Global Shortcut (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/global-shortcut/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-global-shortcut 2.x',
      note: 'デスクトップ専用、導入手順、Shortcut::new と with_handler、register、JS の register、既定 permission が空であること。',
    },
    {
      title: 'webviewWindow (JavaScript API reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacewebviewwindow/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.12',
      note: 'WebviewWindow クラスの説明、コンストラクタと tauri://created・tauri://error、ラベルの文字種、必要な permission、getByLabel などのメソッド。',
    },
    {
      title: 'Configuration (tauri.conf.json reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'WindowConfig の各フィールドと既定値、titleBarStyle と hiddenTitle、TrayIconConfig、menuOnLeftClick の非推奨。',
    },
    {
      title: 'Core Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/acl/core-permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'core:window と core:webview の既定セットの内容。',
    },
    {
      title: 'Plugins (overview and platform support table)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'system-tray と window-customization がデスクトップのみであること、global-shortcut の対応表。',
    },
    {
      title: 'Window State (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/window-state/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-window-state 2.x',
      note: '作成時に visible: false にして復元後に表示するとちらつきを避けられること。',
    },
    {
      title: 'SubmenuBuilder (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/menu/struct.SubmenuBuilder.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'item・items・separator・undo・redo・cut・copy・paste・select_all・quit・about などのメソッドの定義。',
    },
    {
      title: 'tauri::tray::TrayIconEvent',
      publisher: 'docs.rs（tauri）',
      url: 'https://docs.rs/tauri/latest/tauri/tray/enum.TrayIconEvent.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'DoubleClick が Windows のみであること、列挙型が #[non_exhaustive] であることの根拠。',
    },
  ],
}

export default chapter
