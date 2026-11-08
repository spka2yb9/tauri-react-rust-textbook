import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 40-1 デバッグの経路 ---------- */
function DebugRoutesFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="Tauri アプリのデバッグの経路。左の WebView（フロントエンド）には WebView の DevTools が、右の Core（Rust）には Rust コンソールと LLDB などのデバッガが対応し、log プラグインが両方のログをファイルにまとめる">
      <defs>
        <marker id="arrow40a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* app */}
        <rect x="140" y="30" width="360" height="110" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="52" textAnchor="middle" fontWeight="600">Tauri アプリ（tauri dev）</text>
        <rect x="155" y="65" width="160" height="60" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="235" y="90" textAnchor="middle">WebView</text>
        <text x="235" y="110" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">React・TypeScript</text>
        <rect x="325" y="65" width="160" height="60" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="405" y="90" textAnchor="middle">Core</text>
        <text x="405" y="110" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">Rust・コマンド</text>
        {/* tools */}
        <path d="M235,125 L235,183" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40a)" />
        <rect x="20" y="185" width="270" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="155" y="207" textAnchor="middle" fontWeight="600">WebView の DevTools</text>
        <text x="155" y="221" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">右クリック → Inspect／Cmd+Option+I</text>
        <text x="155" y="235" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">console.log で確認</text>
        <path d="M380,125 L380,183" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40a)" />
        <rect x="320" y="185" width="300" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="470" y="207" textAnchor="middle" fontWeight="600">Rust コンソールとデバッガ</text>
        <text x="470" y="227" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">println!、RUST_BACKTRACE=1、LLDB（VS Code）</text>
        {/* log */}
        <path d="M155,241 L270,278" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow40a)" />
        <path d="M470,241 L370,278" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow40a)" />
        <rect x="200" y="260" width="240" height="50" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="281" textAnchor="middle" fontWeight="600">log プラグイン</text>
        <text x="320" y="300" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">両方のログをファイルと端末に集約</text>
      </g>
    </svg>
  )
}

/* ---------- 図 40-2 テストの層 ---------- */
function TestLayersFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="テストの3つの層を下から積み上げた図。最下層は単体テスト（Rust の cargo test と Vitest）、中間は IPC をモックしたフロントエンドのテスト（mockIPC）、最上層は WebDriver による E2E テスト。上に行くほど本物に近く、遅く、環境の制約が多い">
      <g fontSize="13">
        <rect x="60" y="30" width="520" height="80" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="56" textAnchor="middle" fontWeight="600">E2E：WebDriver（tauri-driver／@wdio/tauri-service）</text>
        <text x="320" y="78" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">ビルド済みのアプリを本物の WebView ごと操作する。OS ごとの制約が大きい</text>
        <text x="320" y="98" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">確かめること：画面の流れ、ウィンドウ、プラグインを含めた通しの動作</text>

        <rect x="60" y="125" width="520" height="80" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="151" textAnchor="middle" fontWeight="600">IPC モック：Vitest ＋ @tauri-apps/api/mocks</text>
        <text x="320" y="173" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">invoke を偽の実装に差し替え、React のコンポーネントを jsdom で動かす</text>
        <text x="320" y="193" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">確かめること：コマンド名と引数、戻り値の扱い、エラー時の表示</text>

        <rect x="60" y="220" width="255" height="80" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="187" y="246" textAnchor="middle" fontWeight="600">単体：cargo test</text>
        <text x="187" y="268" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">Tauri に依存しない Rust のロジック</text>
        <text x="187" y="288" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">（SQL、変換、検証）</text>
        <rect x="325" y="220" width="255" height="80" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="452" y="246" textAnchor="middle" fontWeight="600">単体：Vitest</text>
        <text x="452" y="268" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">純粋な TS の関数と React の部品</text>
        <text x="452" y="288" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">（Testing Library）</text>
      </g>
      <text x="30" y="70" fontSize="12" fill="var(--fig-muted)" textAnchor="middle" transform="rotate(-90 30 70)">遅い・本物</text>
      <text x="30" y="260" fontSize="12" fill="var(--fig-muted)" textAnchor="middle" transform="rotate(-90 30 260)">速い・多数</text>
    </svg>
  )
}

/* ---------- 図 40-3 WebDriver の構成 ---------- */
function WebDriverStackFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="WebDriver による E2E テストの構成。左は Windows と Linux の構成で、テストランナーが WebDriver プロトコルで tauri-driver に接続し、tauri-driver が OS ネイティブのドライバ（msedgedriver または WebKitWebDriver）を介してアプリの WebView を操作する。右は macOS の構成で、ネイティブのドライバが無いため、アプリに組み込んだ WebDriver サーバーのプラグインに直接接続する">
      <defs>
        <marker id="arrow40c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <text x="165" y="24" textAnchor="middle" fontSize="13" fontWeight="600">Windows／Linux</text>
        <rect x="40" y="36" width="250" height="34" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="165" y="58" textAnchor="middle">テスト（WebdriverIO、Selenium）</text>
        <path d="M165,70 L165,88" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40c)" />
        <text x="235" y="84" fill="var(--fig-muted)">WebDriver プロトコル</text>
        <rect x="40" y="90" width="250" height="34" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="165" y="112" textAnchor="middle">tauri-driver（cargo install）</text>
        <path d="M165,124 L165,142" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40c)" />
        <rect x="40" y="144" width="250" height="48" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="165" y="163" textAnchor="middle">OS ネイティブのドライバ</text>
        <text x="165" y="181" textAnchor="middle" fill="var(--fig-muted)">msedgedriver.exe ／ WebKitWebDriver</text>
        <path d="M165,192 L165,210" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40c)" />
        <rect x="40" y="212" width="250" height="48" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="165" y="231" textAnchor="middle">Tauri アプリ（debug ビルド）</text>
        <text x="165" y="249" textAnchor="middle" fill="var(--fig-muted)">WebView2 ／ WebKitGTK</text>

        <line x1="320" y1="20" x2="320" y2="270" stroke="var(--fig-line)" strokeDasharray="6 4" />

        <text x="475" y="24" textAnchor="middle" fontSize="13" fontWeight="600">macOS</text>
        <rect x="350" y="36" width="250" height="34" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="475" y="58" textAnchor="middle">テスト（@wdio/tauri-service）</text>
        <path d="M475,70 L475,142" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow40c)" />
        <text x="482" y="84" fill="var(--fig-muted)">直接接続</text>
        <rect x="350" y="90" width="250" height="34" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="475" y="112" textAnchor="middle" fill="var(--fig-muted)">WKWebView 用のドライバは存在しない</text>
        <rect x="350" y="144" width="250" height="116" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="475" y="166" textAnchor="middle">Tauri アプリ（debug ビルド）</text>
        <rect x="365" y="180" width="220" height="66" rx="4" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="475" y="200" textAnchor="middle">組み込み WebDriver サーバー</text>
        <text x="475" y="218" textAnchor="middle" fill="var(--fig-muted)">tauri-plugin-wdio-webdriver</text>
        <text x="475" y="236" textAnchor="middle" fill="var(--fig-muted)">または CrabNebula のフォーク</text>
      </g>
      <text x="320" y="290" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：公式の tauri-driver は Windows と Linux のみ。macOS はアプリ内のサーバーで代替する</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 40,
  part: 5,
  title: 'デバッグとテスト',
  summary:
    'Tauri アプリの不具合は、WebView と Rust のどちらにも潜みます。DevTools、Rust コンソール、LLDB、log プラグインという4つのデバッグの経路を整理し、単体テスト・IPC のモック・WebDriver による E2E という3層のテストを、OS ごとの制約（tauri-driver は Windows と Linux のみ）とあわせて学びます。',
  goals: [
    '不具合の場所に応じて、DevTools・Rust コンソール・デバッガ・ログのどれを使うか選べる',
    'WebView の DevTools を開く方法と、リリースビルドで有効にする条件を説明できる',
    'VS Code と CodeLLDB で Rust 側にブレークポイントを置いて止められる',
    '@tauri-apps/api/mocks の mockIPC で invoke を差し替え、Vitest でフロントエンドをテストできる',
    'WebDriver による E2E テストの構成と、tauri-driver が macOS で使えない理由と代替手段を説明できる',
  ],
  prerequisites: [17, 31, 34, 38],
  sections: [
    {
      id: 'two-worlds',
      title: '2つの世界をまたぐデバッグ',
      body: (
        <>
          <p>
            <ChapterLink n={17} /> で React のテストを、<ChapterLink n={31} /> で Rust のテストとツールを学びました。Tauri アプリでは、この2つの世界が IPC でつながっているので、「どちら側で何が起きているか」を切り分けることがデバッグの出発点になります。画面が更新されないのはフロントエンドの state の問題かもしれませんし、コマンドが permission で拒否されているのかもしれませんし、Rust 側で <code>Err</code> を返しているのかもしれません。
          </p>
          <p>
            幸い、それぞれの世界には慣れた道具がそのまま使えます。フロントエンドにはブラウザと同じ DevTools、Rust にはターミナルへの出力とデバッガです。Tauri はこれらを邪魔せず、むしろ両方をつなぐ仕組み（log プラグイン、DevTools の制御 API）を足しています。この章の前半は4つのデバッグの経路、後半は3層のテストを扱います。
          </p>
          <Figure n="40-1" title="Tauri アプリのデバッグの経路" caption="WebView 側は DevTools、Core 側は Rust コンソールとデバッガで見る。log プラグインは両方のログを1か所に集める。模式図。">
            <DebugRoutesFigure />
          </Figure>
        </>
      ),
    },
    {
      id: 'rust-console',
      title: 'Rust コンソールと開発時だけのコード',
      body: (
        <>
          <p>
            公式のデバッグガイドは「エラーを探す最初の場所は Rust コンソールである」と述べています。<Ref n={1} /> <code>tauri dev</code> を実行したターミナルのことで、Rust 側の <code>println!</code> や <code>log::info!</code>（<ChapterLink n={38} /> の log プラグイン）の出力、パニックのメッセージがここに出ます。
          </p>
          <p>
            パニックの完全なスタックトレースが欲しいときは、環境変数 <code>RUST_BACKTRACE=1</code> を付けて起動します。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            title="スタックトレース付きで起動する（macOS／Linux）"
            code={`
RUST_BACKTRACE=1 npm run tauri dev
`}
          />
          <p>
            Windows の PowerShell では <code>$env:RUST_BACKTRACE=1</code> を先に実行します。<Ref n={1} />
          </p>
          <h3>開発時だけ動くコード</h3>
          <p>
            デバッグ用の出力や DevTools の自動オープンは、配布版には入れたくありません。Rust には条件付きコンパイルがあり、Tauri はそのための条件を用意しています。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>書き方</th>
                  <th>有効になる場面</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>#[cfg(dev)]</code>、<code>cfg!(dev)</code>、<code>tauri::is_dev()</code></td>
                  <td><code>tauri dev</code> で動かしているときだけ</td>
                </tr>
                <tr>
                  <td><code>#[cfg(debug_assertions)]</code></td>
                  <td><code>tauri dev</code> と <code>tauri build --debug</code> の両方（デバッグビルド）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（デバッグビルドのときだけ DevTools を開く）"
            code={`
use tauri::Manager;

tauri::Builder::default()
    .setup(|app| {
        #[cfg(debug_assertions)]
        {
            if let Some(window) = app.get_webview_window("main") {
                window.open_devtools();
            }
        }
        Ok(())
    })
`}
          />
          <p>
            <code>WebviewWindow::open_devtools</code> と <code>close_devtools</code> は、デバッグアサーションが有効なとき、または <code>devtools</code> 機能を有効にしたときにだけ存在します。<code>close_devtools</code> は Windows では対応していません。<Ref n={7} /> 公式の例もこの関数を <code>#[cfg(debug_assertions)]</code> で囲んでいます。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'devtools',
      title: 'WebView の DevTools',
      body: (
        <>
          <p>
            フロントエンドのデバッグは、ブラウザと同じ Web インスペクタ（DevTools）で行います。開き方は、WebView 上で右クリックして「Inspect Element」を選ぶか、Linux と Windows では <code>Ctrl+Shift+I</code>、macOS では <code>Command+Option+I</code> を押します。<Ref n={1} /> 中身は OS の WebView に付属するもので、Linux は WebKit2GTK の Web Inspector、macOS は Safari のインスペクタ、Windows は Microsoft Edge DevTools です。<Ref n={1} /> <ChapterLink n={33} /> で見た「WebView は OS のもの」という事実が、ここにも表れています。
          </p>
          <p>
            <code>console.log</code> の出力、ネットワーク（asset プロトコルの読み込みなど）、要素の検査、React DevTools 拡張を除く通常のブラウザの機能がそのまま使えます。IPC の呼び出しを追いたいときは、<ChapterLink n={34} /> の <code>invoke</code> を包んだラッパー関数に <code>console.debug</code> を置くのが手軽です。
          </p>
          <h3>リリースビルドでの扱い</h3>
          <p>
            公式は「既定では、インスペクタは開発ビルドとデバッグビルドでのみ有効で、Cargo の機能で有効にしない限りリリースでは使えない」と述べています。<Ref n={1} /> デバッグビルドは次のコマンドで作れ、成果物は <code>src-tauri/target/debug/bundle</code> に置かれます。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            title="デバッグビルドを作る"
            code={`
npm run tauri build -- --debug
`}
          />
          <p>
            配布版でも DevTools を使いたい場合は、<code>src-tauri/Cargo.toml</code> の <code>tauri</code> に <code>devtools</code> 機能を加えます。<Ref n={1} /> ただし公式は「DevTools の API は macOS ではプライベート API であり、プライベート API を使うと App Store に受け入れられない」と警告しています。<Ref n={1} /> App Store での配布を考えるなら、この機能は入れません。設定ファイル側にも <code>app.windows[].devtools</code> というフィールドがあり、既定で有効です。<Ref n={8} />
          </p>
          <Callout kind="unverified">
            <p>
              macOS の Safari インスペクタと Windows の Edge DevTools の起動と表示、および <code>devtools</code> 機能付きビルドの挙動は公式資料に基づく記述で、本書の制作環境では未検証です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'lldb',
      title: 'Rust 側をデバッガで止める：VS Code と CodeLLDB',
      body: (
        <>
          <p>
            Core は通常の Rust プログラムなので、GDB や LLDB で止めて変数を見られます。<Ref n={1} /> VS Code なら <code>vscode-lldb</code>（CodeLLDB）拡張を入れ、<code>.vscode/launch.json</code> に起動構成を書きます。<Ref n={2} />
          </p>
          <Code
            lang="json"
            title=".vscode/launch.json（公式の例に基づく）"
            code={`
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Development Debug",
      "cargo": {
        "args": [
          "build",
          "--manifest-path=./src-tauri/Cargo.toml",
          "--no-default-features"
        ]
      },
      "preLaunchTask": "ui:dev"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Tauri Production Debug",
      "cargo": {
        "args": ["build", "--release", "--manifest-path=./src-tauri/Cargo.toml"]
      },
      "preLaunchTask": "ui:build"
    }
  ]
}
`}
          />
          <p>
            仕組みはこうです。<Ref n={2} /> この構成は Tauri CLI ではなく <code>cargo</code> を直接呼ぶので、CLI だけが行う処理（<code>beforeDevCommand</code> によるフロントエンドの開発サーバー起動など）は動きません。その代わりに <code>preLaunchTask</code> で <code>ui:dev</code> というタスクを先に走らせます。<code>--no-default-features</code> は公式の設定例にそのまま含まれている指定で、ページ自体は理由を説明していません。<code>tauri</code> クレートの <code>custom-protocol</code> 機能（埋め込んだフロントエンドを読む設定）を有効にしないことで、開発サーバーの URL を読みに行かせる意図だと考えられます。
          </p>
          <Code
            lang="json"
            title=".vscode/tasks.json（開発サーバーを先に起動する）"
            code={`
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ui:dev",
      "type": "shell",
      "isBackground": true,
      "command": "npm",
      "args": ["run", "dev"]
    },
    {
      "label": "ui:build",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"]
    }
  ]
}
`}
          />
          <p>
            公式の例は <code>yarn dev</code> を使っていますが、本書では <code>npm run dev</code> に置き換えています。<code>isBackground: true</code> のタスクには本来 problemMatcher を設定して「起動完了」を VS Code に知らせるべきで、公式もその点をコメントで触れています。<Ref n={2} /> 設定ができたら、コマンドの関数にブレークポイントを置き、「Tauri Development Debug」を開始すれば、フロントエンドから <code>invoke</code> した瞬間に Rust 側で止まります。
          </p>
          <p>
            JetBrains の RustRover や Neovim 向けの手順も公式にあり、<Ref n={1} /> 考え方は同じです。CrabNebula DevTools という、IPC の呼び出しやイベントを一覧で観察できる外部ツールも紹介されています。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'test-layers',
      title: 'テストの3つの層',
      body: (
        <>
          <p>
            公式のテストガイドは「Tauri はモックランタイムを使った単体テストと結合テストをサポートし、さらに WebDriver プロトコルによる E2E テストもサポートする」と述べています。<Ref n={3} /> これを本書では3つの層に整理します。
          </p>
          <Figure n="40-2" title="テストの3つの層" caption="下から、Tauri に依存しない単体テスト（cargo test と Vitest）、invoke をモックした React のテスト、ビルド済みアプリを操作する E2E。上に行くほど本物に近いが、遅く、OS の制約が増える。模式図。">
            <TestLayersFigure />
          </Figure>
          <p>
            下の層ほど数を多く書き、上の層は要所だけに絞るのが基本の配分です。Tauri 固有の難しさは、中間と最上層にあります。中間の層では「<code>invoke</code> の先に Rust がいない」環境で React を動かさなければならず、最上層では「本物の WebView を外から操作する」ために OS ごとの道具が要ります。
          </p>
          <h3>単体テストは Tauri から切り離す</h3>
          <p>
            Rust 側で最も効くのは、ロジックを Tauri に依存しないクレートや関数に分け、<ChapterLink n={31} /> の <code>cargo test</code> で普通にテストすることです。<code>#[tauri::command]</code> の関数は薄く保ち、引数を受け取って core の関数を呼ぶだけにします。公式のモックランタイムは「ネイティブの WebView ライブラリを実行せずに」Tauri のアプリを組み立てられる仕組みですが、<Ref n={3} /> 本書ではまず「切り離す」設計で対応し、モックランタイムは使いません。
          </p>
          <p>
            フロントエンドの純粋な関数と React 部品は、<ChapterLink n={17} /> の Vitest と Testing Library でそのままテストできます。問題は <code>invoke</code> を呼ぶ部品で、これが次の節です。
          </p>
        </>
      ),
    },
    {
      id: 'mocking',
      title: 'IPC のモック：@tauri-apps/api/mocks',
      body: (
        <>
          <p>
            <code>@tauri-apps/api</code> には <code>mocks</code> モジュールがあり、テスト中に <code>invoke</code> やウィンドウの API を偽物に差し替えられます。<Ref n={4} /> 中心は <code>mockIPC</code> です。コマンド名と引数を受け取るコールバックを渡すと、以後の <code>invoke</code> はすべてそのコールバックに届きます。<Ref n={5} />
          </p>
          <Code
            lang="ts"
            title="src/lib/ipc.test.ts（mockIPC で invoke を差し替える）"
            code={`
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { randomFillSync } from 'node:crypto';
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks';
import { invoke } from '@tauri-apps/api/core';

beforeAll(() => {
  // jsdom には WebCrypto が無いので、Node の実装で補う（公式の例）
  Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: (buffer: Uint8Array) => randomFillSync(buffer) },
  });
});

afterEach(() => {
  clearMocks(); // モックの状態を次のテストに持ち越さない
});

describe('invoke', () => {
  it('コマンド名と引数がコールバックに届く', async () => {
    mockIPC((cmd, args) => {
      if (cmd === 'add') {
        const { a, b } = args as { a: number; b: number };
        return a + b;
      }
      throw new Error(\`unknown command: \${cmd}\`);
    });
    await expect(invoke('add', { a: 12, b: 15 })).resolves.toBe(27);
  });

  it('呼び出し回数をスパイで確かめる', async () => {
    mockIPC(() => 'ok');
    const spy = vi.spyOn(window.__TAURI_INTERNALS__, 'invoke');
    await invoke('ping');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
`}
          />
          <p>
            読み方です。<Ref n={5} /> 公式の例は <code>cmd === "add"</code> のときに <code>args.a + args.b</code> を返しています。本書では <code>args</code> を型アサーションで絞っています。呼び出しの回数や引数を確かめたいときは、公式の例どおり <code>window.__TAURI_INTERNALS__.invoke</code> を <code>vi.spyOn</code> で監視します。<code>mockIPC</code> と <code>mockWindows</code> が注入した状態は <code>clearMocks()</code> で消えるので、<code>afterEach</code> で必ず呼びます。<Ref n={4} /> jsdom には WebCrypto の実装が無いため、<code>beforeAll</code> で Node の <code>randomFillSync</code> を <code>window.crypto.getRandomValues</code> として与えるのも公式の手順です。<Ref n={5} />
          </p>
          <h3>イベントとウィンドウのモック</h3>
          <p>
            2.7.0 以降、<code>mockIPC</code> に <code>{'{ shouldMockEvents: true }'}</code> を渡すと <code>listen</code> と <code>emit</code> もモックされ、テスト内で <code>emit</code> したイベントが <code>listen</code> のハンドラに届きます。<code>emitTo</code> と <code>emit_filter</code> は未対応です。<Ref n={5} /> <ChapterLink n={35} /> のイベント駆動の部品はこれでテストできます。
          </p>
          <Code
            lang="ts"
            title="イベントとウィンドウのモック（公式の例に基づく）"
            code={`
import { emit, listen } from '@tauri-apps/api/event';
import { mockIPC, mockWindows } from '@tauri-apps/api/mocks';

mockIPC(() => {}, { shouldMockEvents: true });
const handler = vi.fn();
await listen('page:saved', handler);
await emit('page:saved', { id: 'p1' });
expect(handler).toHaveBeenCalledWith({ event: 'page:saved', payload: { id: 'p1' } });

mockWindows('main', 'second');
const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
expect(getCurrentWebviewWindow().label).toBe('main');
`}
          />
          <p>
            <code>mockWindows</code> の第1引数はコードが動いている「現在の」ウィンドウ、以降は追加のウィンドウです。ウィンドウの存在だけを偽装し、大きさなどの属性は偽装しません。属性が必要なら <code>mockIPC</code> で対応するコマンドに答えます。<Ref n={5} /> <code>mockConvertFileSrc(osName)</code> は <code>convertFileSrc</code> が返す URL を指定した OS（linux、macos、windows）の形式にします。<Ref n={4} /> asset プロトコルの URL を組み立てる部品（<ChapterLink n={45} />）のテストで使います。
          </p>
          <Callout>
            <p>
              テストで <code>window.__TAURI_INTERNALS__</code> を参照するには、TypeScript にその型を教える必要があります。公式の例は型注釈なしで参照していますが、strict な設定で型エラーになる場合は、テスト用の <code>declare global</code> で <code>Window</code> に <code>__TAURI_INTERNALS__</code> を追加するか、<code>window as unknown as {'{ __TAURI_INTERNALS__: { invoke: (...args: unknown[]) => unknown } }'}</code> のように絞ってから <code>vi.spyOn</code> に渡します。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'webdriver',
      title: 'WebDriver による E2E テストと OS ごとの制約',
      body: (
        <>
          <p>
            最上層の E2E テストは、ビルド済みのアプリを起動し、本物の WebView をプログラムから操作して確かめます。使う規格は W3C の <Term en="WebDriver">WebDriver</Term> で、ブラウザの自動操作に使われているものと同じです。Tauri はこのために <code>tauri-driver</code> というプログラムを提供しています。<Ref n={6} />
          </p>
          <Figure n="40-3" title="WebDriver による E2E テストの構成" caption="Windows と Linux ではテストが tauri-driver に接続し、tauri-driver が OS ネイティブのドライバ（msedgedriver、WebKitWebDriver）を通してアプリを操作する。macOS には WKWebView 用のドライバが無いので、アプリに組み込んだ WebDriver サーバーに直接接続する。模式図。">
            <WebDriverStackFigure />
          </Figure>
          <h3>tauri-driver：Windows と Linux</h3>
          <p>
            <code>tauri-driver</code> は、各プラットフォームのネイティブな WebDriver サーバーを利用します。<Ref n={9} /> インストールは <code>cargo install tauri-driver --locked</code> です。<Ref n={9} /> ネイティブのドライバは OS ごとに用意します。<Ref n={9} />
          </p>
          <ul>
            <li>Linux：<code>WebKitWebDriver</code>。<code>which WebKitWebDriver</code> で確認し、無ければ Debian 系では <code>webkit2gtk-driver</code> のような別パッケージを入れる。</li>
            <li>Windows：Edge のバージョンに合った Microsoft Edge Driver（<code>msedgedriver.exe</code>）。PATH に置くか、<code>--native-driver</code> オプションで場所を指定する。</li>
          </ul>
          <p>
            そして最も重要な制約です。公式は「デスクトップでは Windows と Linux だけがサポートされる。macOS には WKWebView のドライバツールが存在しないため」と明記しています。<Ref n={6} /> つまり、本書の開発 PC である macOS では、公式の <code>tauri-driver</code> は動きません。
          </p>
          <h3>macOS での代替</h3>
          <p>
            公式は現在、WebdriverIO と <code>@wdio/tauri-service</code> を使う方法を推奨しています。<Ref n={6} /> このサービスは Windows、Linux、macOS の3 OS でアプリの検出・起動・操作を自動化し、WebDriver 層として <code>tauri-driver</code>、CrabNebula のドライバ、またはアプリに組み込むプラグインのいずれかを使えます。<Ref n={10} /> macOS はこの「組み込み」の方式で対応されます。Tauri 公式のページは「外部のドライバがどのプラットフォームでも不要になり、これが macOS をサポートする方法である」と書いています。<Ref n={6} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>WebDriver の実体</th>
                  <th>選べる provider</th>
                  <th>準備</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Windows</td>
                  <td>Microsoft Edge WebDriver（WebView2 と通信）</td>
                  <td>official、crabnebula、embedded</td>
                  <td>自動管理</td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td>WebKitWebDriver（WebKitGTK）</td>
                  <td>official、crabnebula、embedded</td>
                  <td>手動インストール（official の場合 <code>webkit2gtk-driver</code>）</td>
                </tr>
                <tr>
                  <td>macOS</td>
                  <td>組み込み（Built-in）</td>
                  <td>embedded、crabnebula</td>
                  <td>外部ドライバ不要</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            WebdriverIO の資料によれば、macOS の <code>embedded</code> provider は <code>tauri-plugin-wdio-webdriver</code> というプラグインをアプリに組み込む方式で、サービスが自動検出します。CrabNebula の方式は「公式 tauri-driver のフォークに macOS 対応を加えたもの」で、<code>@crabnebula/tauri-driver</code>、<code>tauri-plugin-automation</code>、環境変数 <code>CN_API_KEY</code> が必要です。<Ref n={11} />
          </p>
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml（embedded provider 用のプラグインを足す）"
            code={`
[dependencies]
tauri-plugin-wdio-webdriver = "1"
`}
          />
          <Code
            lang="ts"
            title="wdio.conf.ts（@wdio/tauri-service の設定の骨子）"
            code={`
export const config = {
  services: [
    [
      'tauri',
      {
        appBinaryPath: './src-tauri/target/debug/tsumugi',
        driverProvider: 'embedded',
      },
    ],
  ],
  specs: ['./e2e/**/*.e2e.ts'],
  framework: 'mocha',
};
`}
          />
          <p>
            サービスは <code>npm install --save-dev @wdio/tauri-service</code> で入れ、プラグインは <code>lib.rs</code> で <code>.plugin(tauri_plugin_wdio_webdriver::init())</code> と登録します。<Ref n={10} /> テスト側では <code>browser.tauri.execute()</code> で WebView 内のコードを実行でき、コマンド（IPC）のモックや、Rust とフロントエンドのログ収集も提供されます。<Ref n={6} />
          </p>
          <Callout kind="note" title="名前の食い違いについて">
            <p>
              Tauri 公式ページは macOS の方式を「サービスの組み込み WebDriver サーバー」と呼び、WebdriverIO の資料は provider 名 <code>embedded</code> と、組み込むクレート名 <code>tauri-plugin-wdio-webdriver</code> を挙げています。<Ref n={6} /> <Ref n={11} /> 同じものを指していますが、資料によって呼び方が異なるため両方を記します。
            </p>
          </Callout>
          <Callout kind="unverified">
            <p>
              WebDriver による E2E テストは、Linux でも WebKitGTK と WebKitWebDriver が入っていれば実行できる構成ですが、本書では実行していません。macOS の embedded provider も未検証です。手順は Tauri 公式と WebdriverIO 公式の記述に基づいています。
            </p>
          </Callout>
          <h3>tauri-driver を直接使う例</h3>
          <p>
            Windows か Linux で <code>tauri-driver</code> を直接使う場合の WebdriverIO 設定も、公式に例があります。<Ref n={12} /> 要点は3つです。<code>onPrepare</code> で <code>tauri build --debug --no-bundle</code> を実行してデバッグビルドを作ること、<code>beforeSession</code> で <code>~/.cargo/bin/tauri-driver</code> を子プロセスとして起動し <code>afterSession</code> で終了すること、capabilities の <code>tauri:options.application</code> にビルドしたバイナリのパス（例では <code>../src-tauri/target/debug/tauri-app</code>）を書くことです。テスト本体は <code>{"$('body > h1')"}</code> のような WebdriverIO の API で要素を取り、テキストや CSS を検証します。<Ref n={12} />
          </p>
          <p>
            CI では、各ターゲット OS でアプリをビルドできるランナーなら何でも使えます。公式は GitHub Actions 向けに <code>tauri-action</code> を勧めており、<Ref n={3} /> WebDriver を GitHub Actions で動かすガイドもあります。<Ref n={6} /> CI の構成は <ChapterLink n={53} /> で扱います。
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
              Tsumugi の Rust 側は、Tauri に依存しない <code>tsumugi-core</code> クレートと、コマンドの薄い層に分かれています（<ChapterLink n={41} />）。SQLite の CRUD、FTS の索引、Markdown の往復、簡易データベースの SQL 組み立ては、すべて core の <code>tests/</code> でインメモリの SQLite を使って <code>cargo test</code> で確かめます（<ChapterLink n={42} />）。これが最下層です。
            </p>
            <p>
              フロントエンドは <code>src/lib/ipc.ts</code> に <code>invoke</code> の型付きラッパーを集約しているので、<code>mockIPC</code> でこのラッパーの先を差し替えれば、サイドバーのページツリーや検索ダイアログを jsdom でテストできます。<code>afterEach</code> の <code>clearMocks()</code> と、<code>beforeAll</code> の WebCrypto の補いは Vitest の setup ファイルにまとめます。自動保存（<ChapterLink n={44} />）のテストでは、<code>mockIPC</code> のコールバックで <code>save_page</code> が呼ばれた回数と引数を記録し、デバウンス後に1回だけ呼ばれることを確かめます。
            </p>
            <p>
              E2E は本書の範囲では導入せず、<ChapterLink n={50} /> の仕上げで、macOS 上で <code>@wdio/tauri-service</code> の embedded provider を使う構成を「次の一歩」として示すにとどめます。デバッグでは、log プラグインの <code>LogDir</code> に出るファイルと、デバッグビルドで自動的に開く DevTools を主に使います。
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
            <li>デバッグの入口は Rust コンソール。<code>RUST_BACKTRACE=1</code> でスタックトレースを出し、<code>#[cfg(dev)]</code> や <code>#[cfg(debug_assertions)]</code> で開発時だけのコードを書く。</li>
            <li>WebView の DevTools は右クリックかショートカットで開く。既定ではデバッグビルドのみ有効で、リリースで使うには <code>devtools</code> 機能が要るが、macOS ではプライベート API のため App Store には出せない。</li>
            <li>Rust 側は CodeLLDB と <code>launch.json</code> で止められる。<code>cargo</code> を直接呼ぶので、開発サーバーは <code>preLaunchTask</code> で先に起動する。</li>
            <li>テストは、Tauri から切り離した単体テスト、<code>mockIPC</code> による IPC のモック、WebDriver の E2E の3層。下の層を厚くする。</li>
            <li><code>tauri-driver</code> は Windows と Linux のみ。macOS は <code>@wdio/tauri-service</code> の組み込み WebDriver サーバー（<code>tauri-plugin-wdio-webdriver</code>）か CrabNebula のフォークを使う。</li>
          </ul>
          <p>第5部はここまでです。次の第6部では、学んだ内容をすべて使って、ノートアプリ Tsumugi を設計から実装していきます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Debug',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/debug/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Rust コンソール、RUST_BACKTRACE、開発時だけのコードの条件、DevTools の開き方と OS ごとの実体、open_devtools の例、デバッグビルド、devtools 機能と macOS の警告、関連ツール。',
    },
    {
      title: 'Debug in VS Code',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/debug/vscode/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'CodeLLDB、launch.json と tasks.json の例、cargo を直接呼ぶことと preLaunchTask の必要性。',
    },
    {
      title: 'Tests',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/tests/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'モックランタイムによる単体・結合テストと WebDriver による E2E のサポート、CI と tauri-action。',
    },
    {
      title: 'mocks (JavaScript API reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacemocks/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.12',
      note: 'clearMocks、mockConvertFileSrc、mockIPC、mockWindows の定義と shouldMockEvents。',
    },
    {
      title: 'Mock Tauri APIs',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/tests/mocking/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'mockIPC の例、vi.spyOn による監視、WebCrypto の補い、shouldMockEvents、mockWindows の意味。',
    },
    {
      title: 'WebDriver',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/tests/webdriver/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'tauri-driver の位置づけ、Windows と Linux のみの対応と macOS の理由、@wdio/tauri-service の推奨と提供機能、組み込み WebDriver サーバーで macOS に対応すること、CI ガイド。',
    },
    {
      title: 'WebviewWindow (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/webview/struct.WebviewWindow.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'open_devtools と close_devtools の有効条件、close_devtools が Windows 非対応であること。',
    },
    {
      title: 'Configuration (tauri.conf.json reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'WindowConfig の devtools フィールドが既定で有効であること。',
    },
    {
      title: 'Manual WebDriver setup',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/tests/webdriver/manual-setup/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'cargo install tauri-driver --locked、Linux の WebKitWebDriver と webkit2gtk-driver、Windows の msedgedriver と --native-driver、macOS 非対応の理由。',
    },
    {
      title: 'Tauri Testing (WebdriverIO)',
      publisher: 'WebdriverIO',
      url: 'https://webdriver.io/docs/desktop-testing/tauri',
      accessed: '2026-11-08',
      note: '@wdio/tauri-service の概要、インストール、tauri-plugin-wdio-webdriver の追加と登録、wdio.conf.ts の services 設定、browser.tauri.execute。',
    },
    {
      title: 'Platform Support (WebdriverIO Tauri)',
      publisher: 'WebdriverIO',
      url: 'https://webdriver.io/docs/desktop-testing/tauri/platform-support',
      accessed: '2026-11-08',
      note: 'OS ごとの WebDriver の実体と provider、macOS の embedded と CrabNebula のフォーク、各 OS の要件。',
    },
    {
      title: 'WebdriverIO example',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/tests/webdriver/example/webdriverio/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'tauri-driver を直接使う wdio.conf.js の構成（デバッグビルド、beforeSession での起動、tauri:options.application）と spec の例。',
    },
  ],
}

export default chapter
