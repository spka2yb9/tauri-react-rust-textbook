import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 2-1 ツール同士の関係 ---------- */
function ToolRelationFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="macOS 上の開発ツールの関係図。Xcode Command Line Tools が土台で、その上に rustup が管理する Rust ツールチェーン（rustc と cargo）と Node.js（npm）が並ぶ。cargo は src-tauri の Rust をビルドし、npm は Vite でフロントエンドを動かす。両者を Tauri CLI がまとめて起動し、エディタの VS Code と rust-analyzer が横から支える">
      <defs>
        <marker id="arrow2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 土台 */}
        <rect x="40" y="270" width="560" height="50" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="291" textAnchor="middle" fontWeight="600">Xcode Command Line Tools</text>
        <text x="320" y="309" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">C コンパイラ、リンカ、git など（Rust のビルドに必要）</text>

        {/* Rust 側 */}
        <rect x="40" y="150" width="250" height="100" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="165" y="175" textAnchor="middle" fontWeight="600">rustup（Rust の installer）</text>
        <rect x="55" y="190" width="105" height="44" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="107" y="209" textAnchor="middle">rustc</text>
        <text x="107" y="226" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">コンパイラ</text>
        <rect x="170" y="190" width="105" height="44" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="222" y="209" textAnchor="middle">cargo</text>
        <text x="222" y="226" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">ビルド・依存管理</text>

        {/* Node 側 */}
        <rect x="350" y="150" width="250" height="100" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="475" y="175" textAnchor="middle" fontWeight="600">Node.js（LTS）</text>
        <rect x="365" y="190" width="105" height="44" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="417" y="209" textAnchor="middle">npm</text>
        <text x="417" y="226" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">パッケージ管理</text>
        <rect x="480" y="190" width="105" height="44" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="532" y="209" textAnchor="middle">Vite</text>
        <text x="532" y="226" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">開発サーバー</text>

        {/* Tauri CLI */}
        <rect x="200" y="40" width="240" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="320" y="64" textAnchor="middle" fontWeight="600">Tauri CLI（@tauri-apps/cli）</text>
        <text x="320" y="86" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">npm run tauri dev で両方を起動する</text>
        <path d="M260,100 L200,146" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow2a)" />
        <text x="230" y="112" fontSize="12" fill="var(--fig-muted)" textAnchor="end">cargo を呼ぶ</text>
        <path d="M380,100 L440,146" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow2a)" />
        <text x="440" y="118" fontSize="12" fill="var(--fig-muted)">Vite を起動</text>

        {/* エディタ */}
        <rect x="470" y="40" width="150" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="545" y="64" textAnchor="middle" fontWeight="600">VS Code</text>
        <text x="545" y="86" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">＋ rust-analyzer</text>
        <path d="M545,100 L545,146" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow2a)" />

        <path d="M165,250 L165,266" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow2a)" />
      </g>
      <text x="320" y="335" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線：起動・依存の関係　破線：エディタからの補完・解析</text>
    </svg>
  )
}

/* ---------- 図 2-2 tauri dev の流れ ---------- */
function DevFlowFigure() {
  const steps = [
    { x: 5, title: 'npm run tauri dev', sub: 'Tauri CLI が起動' },
    { x: 165, title: 'beforeDevCommand', sub: 'Vite の開発サーバー' },
    { x: 325, title: 'cargo build', sub: 'src-tauri をコンパイル' },
    { x: 485, title: 'ウィンドウ表示', sub: 'devUrl を WebView で開く' },
  ]
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="npm run tauri dev を実行してからウィンドウが表示されるまでの4段階。Tauri CLI が beforeDevCommand で Vite の開発サーバーを起動し、cargo で src-tauri をビルドし、できた実行ファイルが devUrl を WebView で開く">
      <defs>
        <marker id="arrow2b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {steps.map((s, i) => (
          <g key={s.title}>
            <rect x={s.x} y="60" width="145" height="70" rx="8" fill={i === 3 ? 'var(--fig-box4)' : 'var(--fig-box3)'} stroke="var(--fig-line)" />
            <text x={s.x + 72} y="88" textAnchor="middle" fontWeight="600">{s.title}</text>
            <text x={s.x + 72} y="110" textAnchor="middle" fill="var(--fig-muted)">{s.sub}</text>
            {i < 3 && <path d={`M${s.x + 147},95 L${s.x + 163},95`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow2b)" />}
          </g>
        ))}
        <text x="240" y="160" textAnchor="middle" fill="var(--fig-muted)">フロントエンドを変更 → Vite が即時反映</text>
        <text x="400" y="180" textAnchor="middle" fill="var(--fig-muted)">Rust を変更 → 再コンパイルして再起動</text>
      </g>
      <text x="320" y="210" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">初回の cargo build は依存クレートのコンパイルを含むため数分かかることがある</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 2,
  part: 1,
  title: '開発環境を整える（macOS）',
  summary:
    'macOS に Tauri の開発環境を整えます。Xcode Command Line Tools、rustup による Rust、Node.js とパッケージマネージャ、VS Code と rust-analyzer をそろえ、create-tauri-app で最初のアプリを起動するところまでを、公式の手順に基づいて進めます。',
  goals: [
    'Tauri の開発に必要なツールと、それぞれの役割を説明できる',
    'Xcode Command Line Tools、rustup、Node.js を公式の手順でインストールできる',
    'VS Code に rust-analyzer を入れ、Rust の補完とエラー表示を使える',
    'create-tauri-app でプロジェクトを作り、npm run tauri dev で起動できる',
    'tauri dev を実行したときに何が起きているかを説明できる',
  ],
  prerequisites: [1],
  sections: [
    {
      id: 'intro',
      title: '何をそろえるのか',
      body: (
        <>
          <p>
            <ChapterLink n={1} /> で見たように、Tauri のアプリは「WebView で動くフロントエンド」と「Rust で動く Core」の2つの世界からできています。そのため開発環境も2系統必要です。フロントエンドのために Node.js とパッケージマネージャ、Rust のために rustup と、Rust のコンパイルに必要な OS のビルドツールです。Tauri の公式資料は、macOS では Xcode と関連する開発用の依存関係を使うと書いています。<Ref n={1} />
          </p>
          <p>
            次の図は、この章でそろえるツールの関係を示したものです。どれが土台で、どれが何を呼ぶのかを押さえてから、順にインストールしていきます。
          </p>
          <Figure n="2-1" title="開発ツール同士の関係" caption="Xcode Command Line Tools が土台。rustup が rustc と cargo を管理し、Node.js が npm と Vite を動かす。Tauri CLI は cargo と Vite の両方を呼び出す。VS Code と rust-analyzer は編集を支える。">
            <ToolRelationFigure />
          </Figure>
          <p>
            図の見方として、下にあるものほど先に入れる必要があります。Xcode Command Line Tools がないと Rust のビルドが通らず、rustup と Node.js がそろって初めて Tauri CLI が動きます。エディタは最後で構いません。
          </p>
          <Callout kind="unverified">
            <p>
              この章の手順は Tauri、Rust、Node.js、Visual Studio Code の公式資料に基づく記述で、本書の制作環境（Linux）では macOS 上での動作を実機で検証していません。画面の文言やバージョン番号は、実行時点のものに読み替えてください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'xcode-clt',
      title: 'Xcode Command Line Tools',
      body: (
        <>
          <p>
            <Term en="Xcode Command Line Tools">Xcode Command Line Tools</Term> は、Apple が提供するコマンドライン用の開発ツール一式です。C 言語のコンパイラ（clang）やリンカ、<code>git</code> などが含まれ、Rust のコンパイラが実行ファイルを作るときに使います。
          </p>
          <p>
            Tauri の公式資料は、デスクトップだけを対象にするなら Xcode 本体ではなく Command Line Tools だけで足りると書いています。ターミナルで次のコマンドを実行すると、インストール用のダイアログが表示されます。<Ref n={1} />
          </p>
          <Code lang="bash" code={`
xcode-select --install
`} />
          <p>
            iOS 向けのアプリも作る場合は Xcode 本体が必要です。Mac App Store か Apple Developer のサイトから入れ、一度起動して初期設定を済ませます。<Ref n={1} /> 本書では第8部のモバイル編に入るまでは Command Line Tools だけで進められるので、ここでは Xcode 本体は入れなくて構いません。モバイルの環境構築は <ChapterLink n={54} /> で改めて扱います。
          </p>
          <h3>Homebrew について</h3>
          <p>
            <Term en="Homebrew">Homebrew</Term> は macOS 向けのパッケージマネージャで、コマンドラインツールやアプリをコマンド1つで入れられます。公式サイトの説明では、各パッケージは専用のディレクトリにインストールされ、Apple Silicon の Mac では <code>/opt/homebrew</code>、Intel の Mac では <code>/usr/local</code> の下にまとめられます。<Ref n={6} /> Tauri の公式資料で Homebrew が必要になるのは iOS 向けに CocoaPods を入れる場面だけで、デスクトップ開発では必須ではありません。<Ref n={1} /> ただし Node.js などを Homebrew で管理したい場合は、公式のインストールコマンドで入れておくと便利です。
          </p>
          <Code lang="bash" code={`
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
`} />
        </>
      ),
    },
    {
      id: 'rust',
      title: 'rustup で Rust を入れる',
      body: (
        <>
          <p>
            Rust は <Term en="rustup">rustup</Term> というインストーラで入れます。公式サイトは rustup を「システムプログラミング言語 Rust のインストーラ」で「Rust 公式のプロジェクト」と説明しています。<Ref n={2} /> Tauri の公式資料でも、Rust のインストール方法として rustup を使う次のコマンドが示されています。<Ref n={1} />
          </p>
          <Code lang="bash" code={`
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
`} />
          <p>
            このコマンドは、インストール用のスクリプトをダウンロードしてシェルで実行します。Tauri の公式資料は「このスクリプトは監査済みだが、実行する前に読むことを勧める」と注意しています。<Ref n={1} /> 実行すると対話形式で選択肢が出るので、既定のインストールを選べば十分です。終わったらターミナルを開き直し、次の2つのコマンドでバージョンが表示されることを確認します。
          </p>
          <Code lang="bash" code={`
rustc --version   # コンパイラ
cargo --version   # ビルドツール兼パッケージマネージャ
`} />
          <p>
            <code>rustc</code> が Rust のコンパイラ、<code>cargo</code> がビルドと依存関係の管理を行うツールです。日常の開発ではほとんど <code>cargo</code> しか直接使いません。rustup は複数のバージョンの Rust（ツールチェーン）を切り替える役目もあり、Tauri のモバイル対応では rustup でクロスコンパイル用のターゲットを追加します。<Ref n={1} /> Rust の言語そのものは <ChapterLink n={18} /> から学びます。
          </p>
          <Callout>
            <p>
              本書の基準は Rust 1.99（2024 edition）です。rustup で入れた直後は最新の安定版が入ります。後からバージョンを上げるときは <code>rustup update</code> を実行します。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'node',
      title: 'Node.js とパッケージマネージャ',
      body: (
        <>
          <p>
            <Term en="Node.js">Node.js</Term> は、ブラウザの外で JavaScript を動かす実行環境です。Tauri のアプリ自体に Node.js は含まれませんが、フロントエンドのビルドツール（Vite）や TypeScript のコンパイラ、Tauri CLI の npm 版は Node.js 上で動きます。Tauri の公式資料も、Node.js は「JavaScript のフロントエンドフレームワークを使うときにだけ必要」で、「LTS 版をダウンロードする」よう案内しています。<Ref n={1} />
          </p>
          <p>
            <Term en="LTS">LTS</Term>（Long Term Support）は長期サポート版という意味で、安定して長く使える系列を指します。Node.js 公式のダウンロードページには、LTS の系列が複数並んでいます。確認日（2026-11-08）時点では v26 系が最新の LTS で、v24 系と v22 系も LTS として掲載されていました。<Ref n={3} /> 本書は Node.js 24 系を基準にしていますが、LTS であれば新しい系列でも問題ありません。
          </p>
          <p>
            インストール後、次のコマンドでバージョンが表示されれば準備完了です。<Ref n={1} />
          </p>
          <Code lang="bash" code={`
node -v
npm -v
`} />
          <p>
            <Term en="npm">npm</Term> は Node.js に同梱されるパッケージマネージャで、ライブラリの取得と、<code>package.json</code> に書いたスクリプトの実行を担います。pnpm や yarn といった別のパッケージマネージャを使いたい場合、Tauri の公式資料は <code>corepack enable</code> で有効にできると案内しています（任意です）。<Ref n={1} /> 本書のコマンド例はすべて npm で書きます。
          </p>
        </>
      ),
    },
    {
      id: 'editor',
      title: 'エディタと rust-analyzer',
      body: (
        <>
          <p>
            エディタは好みのもので構いませんが、本書は <Term en="Visual Studio Code">Visual Studio Code</Term>（VS Code）を前提にします。macOS では、公式サイトから配布されているディスクイメージ（<code>.dmg</code>）を開き、<code>Visual Studio Code.app</code> を Applications フォルダにドラッグして入れます。Intel と Apple Silicon の両方に対応しています。<Ref n={4} />
          </p>
          <p>
            ターミナルから <code>code .</code> と打ってフォルダを開けるようにしておくと便利です。VS Code でコマンドパレット（Cmd+Shift+P）を開き、「Shell Command: Install 'code' command in PATH」を実行し、ターミナルを開き直します。<Ref n={4} />
          </p>
          <h3>rust-analyzer</h3>
          <p>
            <Term en="rust-analyzer">rust-analyzer</Term> は、Rust 向けの Language Server Protocol の実装です。公式サイトは「補完や定義へのジャンプといった機能を VS Code、Emacs、Vim などのエディタに提供する」と説明しており、VS Code では拡張機能マーケットプレイスから rust-analyzer 拡張を入れるだけで使えます。<Ref n={5} />
          </p>
          <p>
            Rust はコンパイラの指摘が学習の助けになる言語なので、エディタ上でエラーがその場に表示される環境は特に重要です。所有権や借用のエラー（<ChapterLink n={19} />、<ChapterLink n={20} />）も、rust-analyzer が波線で示してくれます。
          </p>
          <h3>TypeScript のサポート</h3>
          <p>
            TypeScript のサポートは VS Code に組み込まれています。本書の基準である TypeScript 7.0 は、公式ブログによると専用の TypeScript 7 拡張を入れると既定で使われ、VS Code 本体にも数週間のうちに組み込まれる予定とされています。<Ref n={7} /> 拡張を入れなくても TypeScript の補完とエラー表示は動くので、本書を読み進めるうえで必須ではありません。
          </p>
        </>
      ),
    },
    {
      id: 'create-app',
      title: 'create-tauri-app で最初のアプリを起動する',
      body: (
        <>
          <p>
            ツールがそろったら、公式のひな形生成ツール <Term en="create-tauri-app">create-tauri-app</Term> でプロジェクトを作ります。npm では次のコマンドです。<Ref n={8} />
          </p>
          <Code lang="bash" code={`
npm create tauri-app@latest
`} />
          <p>
            実行すると、いくつかの質問に順に答えます。公式資料に載っている質問と、本書で選ぶ答えは次のとおりです。<Ref n={8} />
          </p>
          <ol className="steps">
            <li>Project name：プロジェクト名。既定は <code>tauri-app</code>。ここでは <code>hello-tauri</code> とします。</li>
            <li>Identifier：アプリを一意に示す逆ドメイン形式の ID。公式資料の例では既定は <code>com.tauri-app.app</code> ですが、npm 版の create-tauri-app を実際に実行すると、既定は <code>com.ユーザー名.プロジェクト名</code> の形でした。<Ref n={11} /> 配布時に使うので、自分のドメインに合わせて <code>com.example.hello-tauri</code> のように付けます。</li>
            <li>Choose which language to use for your frontend：<code>TypeScript / JavaScript</code> を選びます。</li>
            <li>Choose your package manager：<code>npm</code>。</li>
            <li>Choose your UI template：<code>React</code>。公式資料は最初は Vanilla を勧めていますが、本書は第3部で React を学ぶので React を選びます。</li>
            <li>Choose your UI flavor：<code>TypeScript</code>。</li>
          </ol>
          <p>
            生成が終わったら、表示される案内どおりにフォルダへ移動し、依存パッケージを入れ、開発モードで起動します。<Ref n={8} />
          </p>
          <Code lang="bash" code={`
cd hello-tauri
npm install
npm run tauri dev
`} />
          <p>
            初回は Rust の依存クレートをすべてコンパイルするため、数分かかることがあります。コンパイルが終わるとウィンドウが開き、ひな形のアプリが表示されます。入力欄に名前を入れてボタンを押すと、Rust 側の関数が呼ばれて挨拶文が返ってきます。これが <ChapterLink n={34} /> で学ぶコマンド（IPC）の最小の例です。
          </p>
          <h3>tauri dev で何が起きているか</h3>
          <Figure n="2-2" title="npm run tauri dev の流れ" caption="Tauri CLI が beforeDevCommand で Vite の開発サーバーを起動し、cargo で src-tauri をビルドする。できた実行ファイルが devUrl を WebView で開く。">
            <DevFlowFigure />
          </Figure>
          <p>
            図のとおり、<code>tauri dev</code> は2つのことを同時に行います。1つは <code>tauri.conf.json</code> の <code>beforeDevCommand</code> に書かれたコマンド（Vite の開発サーバー）の起動、もう1つは <code>cargo</code> による Rust 側のビルドです。ビルドされたアプリは、設定の <code>devUrl</code> に書かれた開発サーバーの URL を WebView で開きます。公式の Vite ガイド（手動でプロジェクトを組む場合）では、<code>devUrl</code> は <code>http://localhost:5173</code> で、<code>vite.config</code> 側でも同じポートを <code>strictPort: true</code> で固定します。Tauri は固定のポートを期待するので、空いていなければ失敗させる設定です。<Ref n={9} /> 一方、<code>create-tauri-app</code> が生成する React テンプレートの <code>vite.config.ts</code> はポート <code>1420</code>（HMR 用は <code>1421</code>）を使います。<Ref n={10} /> どちらでも構いませんが、<code>devUrl</code> と Vite のポートが一致していることが条件です。
          </p>
          <p>
            この仕組みのおかげで、フロントエンドのファイルを保存すると Vite が画面を即座に更新し、Rust のファイルを保存すると再コンパイルして再起動します。生成されたプロジェクトの構成（<code>src</code> と <code>src-tauri</code>、設定ファイルの意味）は <ChapterLink n={33} /> で詳しく読み解きます。
          </p>
          <Callout kind="warn">
            <p>
              公式の Vite 向け設定には、Vite が <code>src-tauri</code> フォルダを監視しないようにする設定（<code>server.watch.ignored</code> に <code>src-tauri</code> 以下を指定）も含まれています。<Ref n={9} /> これがないと、Rust のビルド成果物が書き込まれるたびに Vite が反応してしまいます。create-tauri-app で作ったプロジェクトには最初から入っています。
            </p>
          </Callout>
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
              Tsumugi も、この章と同じ手順で作った Tauri プロジェクトが出発点です。第6部では <code>npm run tauri dev</code> で起動しながら、<code>src</code> に React の画面を、<code>src-tauri</code> に Rust のデータ層を足していきます（<ChapterLink n={41} />）。
            </p>
            <p>
              rust-analyzer は、Tsumugi の Rust 側で SQLite のクレートや serde を使うときに、型とメソッドの候補を示してくれます。エディタ環境を整えておくことが、第4部以降の学習効率を大きく左右します。
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
            <li>Tauri の開発にはフロントエンド用（Node.js）と Rust 用（rustup と OS のビルドツール）の2系統の環境が必要。</li>
            <li>macOS ではデスクトップ向けなら <code>xcode-select --install</code> の Command Line Tools で足り、iOS 向けには Xcode 本体が要る。</li>
            <li>Rust は rustup で入れ、<code>rustc</code> と <code>cargo</code> が使えることを確認する。Node.js は LTS 版を入れる。</li>
            <li>VS Code に rust-analyzer を入れると、Rust の補完とエラー表示がエディタ上で得られる。</li>
            <li><code>npm create tauri-app@latest</code> でひな形を作り、<code>npm run tauri dev</code> で起動する。Tauri CLI が Vite と cargo の両方を動かす。</li>
          </ul>
          <p>次章からは第2部に入り、React と TypeScript の前提となるモダン JavaScript のモジュールと非同期処理を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Prerequisites',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/prerequisites/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'macOS の Xcode / Command Line Tools、rustup のコマンド、Node.js LTS、corepack、iOS 向けの Homebrew と CocoaPods の根拠。',
    },
    {
      title: 'rustup.rs - The Rust toolchain installer',
      publisher: 'The Rust Project',
      url: 'https://rustup.rs',
      accessed: '2026-11-08',
      note: 'rustup の定義とインストールコマンドの根拠。',
    },
    {
      title: 'Download Node.js',
      publisher: 'OpenJS Foundation',
      url: 'https://nodejs.org/en/download',
      accessed: '2026-11-08',
      note: '確認日時点の LTS 系列（v26、v24、v22）の根拠。',
    },
    {
      title: 'Visual Studio Code on macOS',
      publisher: 'Microsoft',
      url: 'https://code.visualstudio.com/docs/setup/mac',
      accessed: '2026-11-08',
      note: 'macOS へのインストール手順と code コマンドの設定の根拠。',
    },
    {
      title: 'rust-analyzer',
      publisher: 'rust-analyzer',
      url: 'https://rust-analyzer.github.io/',
      accessed: '2026-11-08',
      note: 'rust-analyzer の定義、提供する機能、VS Code 拡張の根拠。',
    },
    {
      title: 'Homebrew — The Missing Package Manager for macOS (or Linux)',
      publisher: 'Homebrew',
      url: 'https://brew.sh/',
      accessed: '2026-11-08',
      note: 'インストールコマンドとインストール先ディレクトリの根拠。',
    },
    {
      title: 'Announcing TypeScript 7.0',
      publisher: 'Microsoft',
      url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
      accessed: '2026-11-08',
      version: 'TypeScript 7.0',
      note: 'VS Code でのエディタ対応の根拠。',
    },
    {
      title: 'Create a Project',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/create-project/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'create-tauri-app のコマンド、質問項目、起動コマンドの根拠。',
    },
    {
      title: 'Vite',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/frontend/vite/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'devUrl、ポート 5173 と strictPort、src-tauri の監視除外の根拠。',
    },
    {
      title: 'create-tauri-app: templates/template-react-ts/vite.config.ts.lte',
      publisher: 'Tauri（GitHub）',
      url: 'https://github.com/tauri-apps/create-tauri-app/blob/dev/templates/template-react-ts/vite.config.ts.lte',
      accessed: '2026-11-08',
      version: 'dev ブランチ',
      note: '生成されるテンプレートがポート 1420（HMR は 1421）と strictPort を使う根拠。',
    },
    {
      title: 'create-tauri-app: src/lib.rs',
      publisher: 'Tauri（GitHub）',
      url: 'https://github.com/tauri-apps/create-tauri-app/blob/dev/src/lib.rs',
      accessed: '2026-11-08',
      version: 'dev ブランチ（npm 版の実行でも確認）',
      note: 'Identifier の既定値が com.ユーザー名.プロジェクト名 の形になること、質問の文言と順序の根拠。',
    },
  ],
}

export default chapter
