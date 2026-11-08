import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 54-1 モバイルアプリの構成 ---------- */
function MobileStackFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="モバイル版 Tauri アプリの構成。上に OS が起動するアプリ殻（iOS は Xcode プロジェクト、Android は Gradle プロジェクト）、その中に WebView とフロントエンド、下に Rust コードをライブラリとしてビルドしたものが組み込まれ、アプリ殻から run() が呼ばれる">
      <defs>
        <marker id="arrow54a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* iOS 側 */}
      <text x="165" y="26" fontSize="15" fontWeight="600" textAnchor="middle">iOS</text>
      <rect x="20" y="40" width="290" height="270" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="165" y="62" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">アプリ殻：Xcode プロジェクト（gen/apple）</text>
      <rect x="40" y="76" width="250" height="90" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="165" y="98" fontSize="13" fontWeight="600" textAnchor="middle">WKWebView</text>
      <rect x="60" y="110" width="210" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="165" y="130" fontSize="12" textAnchor="middle">フロントエンド（React）</text>
      <text x="165" y="146" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">frontendDist を同梱</text>
      <path d="M165,166 L165,196" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54a)" markerStart="url(#arrow54a)" />
      <text x="200" y="186" fontSize="11" fill="var(--fig-muted)">IPC</text>
      <rect x="40" y="200" width="250" height="96" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="165" y="222" fontSize="13" fontWeight="600" textAnchor="middle">Rust 側（静的ライブラリ）</text>
      <text x="165" y="242" fontSize="12" textAnchor="middle">libapp_lib.a</text>
      <text x="165" y="262" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Swift の殻が run() を呼ぶ</text>
      <text x="165" y="280" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">tauri::mobile_entry_point</text>
      {/* Android 側 */}
      <text x="475" y="26" fontSize="15" fontWeight="600" textAnchor="middle">Android</text>
      <rect x="330" y="40" width="290" height="270" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="475" y="62" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">アプリ殻：Gradle プロジェクト（gen/android）</text>
      <rect x="350" y="76" width="250" height="90" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="475" y="98" fontSize="13" fontWeight="600" textAnchor="middle">Android System WebView</text>
      <rect x="370" y="110" width="210" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="475" y="130" fontSize="12" textAnchor="middle">フロントエンド（React）</text>
      <text x="475" y="146" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">frontendDist を同梱</text>
      <path d="M475,166 L475,196" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54a)" markerStart="url(#arrow54a)" />
      <text x="510" y="186" fontSize="11" fill="var(--fig-muted)">IPC</text>
      <rect x="350" y="200" width="250" height="96" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="475" y="222" fontSize="13" fontWeight="600" textAnchor="middle">Rust 側（共有ライブラリ）</text>
      <text x="475" y="242" fontSize="12" textAnchor="middle">libapp_lib.so</text>
      <text x="475" y="262" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Kotlin の殻が JNI 経由で呼ぶ</text>
      <text x="475" y="280" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">tauri::mobile_entry_point</text>
      <text x="320" y="330" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：灰＝OS が起動するアプリ殻、青＝WebView、橙＝Rust のライブラリ</text>
    </svg>
  )
}

/* ---------- 図 54-2 開発フロー ---------- */
function DevFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="モバイル開発の流れ。環境構築の後、tauri ios init または tauri android init で gen 配下にプロジェクトを生成し、tauri ios dev または tauri android dev でシミュレーター・エミュレーター・実機のいずれかで動かす。配布用には tauri ios build または tauri android build を使う">
      <defs>
        <marker id="arrow54b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="130" height="70" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="85" y="68" textAnchor="middle" fontWeight="600">環境構築</text>
        <text x="85" y="90" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">Xcode / Android Studio</text>
        <path d="M150,75 L195,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54b)" />

        <rect x="200" y="40" width="130" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="265" y="62" textAnchor="middle" fontWeight="600">init（1回）</text>
        <text x="265" y="82" textAnchor="middle" fontSize="11">tauri ios init</text>
        <text x="265" y="98" textAnchor="middle" fontSize="11">tauri android init</text>
        <path d="M330,75 L375,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54b)" />

        <rect x="380" y="40" width="130" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="445" y="62" textAnchor="middle" fontWeight="600">dev（毎回）</text>
        <text x="445" y="82" textAnchor="middle" fontSize="11">tauri ios dev</text>
        <text x="445" y="98" textAnchor="middle" fontSize="11">tauri android dev</text>

        <path d="M445,110 L445,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54b)" />
        <rect x="300" y="145" width="90" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="345" y="168" textAnchor="middle" fontSize="12">シミュレーター</text>
        <text x="345" y="186" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">iOS</text>
        <rect x="400" y="145" width="90" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="445" y="168" textAnchor="middle" fontSize="12">エミュレーター</text>
        <text x="445" y="186" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">Android</text>
        <rect x="500" y="145" width="90" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="545" y="168" textAnchor="middle" fontSize="12">実機</text>
        <text x="545" y="186" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">LAN の IP で接続</text>
        <path d="M400,173 L390,173" stroke="var(--fig-line)" strokeWidth="1" />
        <path d="M500,173 L490,173" stroke="var(--fig-line)" strokeWidth="1" />

        <path d="M510,75 L560,75 L560,220 L300,220 L300,250" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" fill="none" markerEnd="url(#arrow54b)" />
        <rect x="200" y="250" width="200" height="40" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="300" y="275" textAnchor="middle" fontSize="12">build（配布用。第57章）</text>
      </g>
      <text x="20" y="245" fontSize="12" fill="var(--fig-muted)" textAnchor="start">実線：日々の開発　点線：配布時</text>
    </svg>
  )
}

/* ---------- 図 54-3 開発サーバーと端末の関係 ---------- */
function DevServerFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="開発時のネットワーク構成。Mac 上で Vite の開発サーバーと Tauri CLI が動き、シミュレーターは localhost で、実機は Wi-Fi 経由で Mac の IP アドレス（TAURI_DEV_HOST）に接続して画面を読み込む">
      <defs>
        <marker id="arrow54c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="30" width="280" height="200" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="160" y="54" fontSize="14" fontWeight="600" textAnchor="middle">開発用 Mac</text>
      <rect x="40" y="70" width="240" height="60" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="160" y="94" fontSize="13" textAnchor="middle">Vite 開発サーバー</text>
      <text x="160" y="114" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">host: TAURI_DEV_HOST、port 1420</text>
      <rect x="40" y="145" width="240" height="60" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="160" y="169" fontSize="13" textAnchor="middle">Tauri CLI（tauri ios dev）</text>
      <text x="160" y="189" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Rust をビルドし、Xcode に渡す</text>

      <rect x="400" y="40" width="200" height="70" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="500" y="66" fontSize="13" fontWeight="600" textAnchor="middle">シミュレーター</text>
      <text x="500" y="88" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">同じ Mac の中で動く</text>
      <path d="M280,100 L395,70" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow54c)" />
      <text x="340" y="72" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">localhost</text>

      <rect x="400" y="150" width="200" height="70" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="500" y="176" fontSize="13" fontWeight="600" textAnchor="middle">実機</text>
      <text x="500" y="198" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">同じ Wi-Fi 上の別の機器</text>
      <path d="M280,110 L395,180" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow54c)" />
      <text x="330" y="175" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Mac の IP アドレス</text>
      <text x="320" y="250" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：localhost で届く　点線：LAN に公開した IP アドレスが必要</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 54,
  part: 8,
  title: 'モバイル版の仕組みと開発環境',
  summary:
    'Tauri 2 は同じコードベースから iOS と Android のアプリも作れます。Rust 側がライブラリとしてビルドされ、Swift と Kotlin のアプリ殻に組み込まれる仕組みを理解したうえで、Xcode と Android Studio の準備、init と dev コマンド、シミュレーター・エミュレーター・実機での動かし方を学びます。',
  goals: [
    'モバイル版では Rust がライブラリとしてビルドされ、Xcode / Gradle プロジェクトから呼ばれることを説明できる',
    'iOS と Android の開発に必要なツール、環境変数、rustup のターゲットを列挙できる',
    'tauri ios init / tauri android init が何を生成するかを説明できる',
    'tauri ios dev / tauri android dev で、シミュレーター・エミュレーター・実機のどれで動かすかを選べる',
    '実機で開発サーバーに接続するときに --host と TAURI_DEV_HOST が必要な理由を説明できる',
  ],
  prerequisites: [2, 33, 51],
  sections: [
    {
      id: 'intro',
      title: 'デスクトップアプリが、そのままモバイルアプリになる',
      body: (
        <>
          <p>
            第5部から第7部までで、Tsumugi はデスクトップで動き、署名され、配布できるアプリになりました。第8部では、同じコードベースを iOS と Android でも動かします。Tauri 2 の大きな特徴は、フロントエンドのコードも Rust のコードも書き直さずに、モバイル向けのビルドができることです。<Ref n={1} />
          </p>
          <p>
            ただし「書き直さなくてよい」と「何も変わらない」は違います。モバイルでは、アプリを起動するのは OS が用意したアプリの殻であり、Rust のコードはその殻に組み込まれるライブラリになります。開発に使うツールも、Xcode と Android Studio という 2 つの巨大な環境が加わります。画面の大きさや操作方法、使えるプラグインも変わります。
          </p>
          <p>
            この章では、その土台となる「仕組み」と「環境」を押さえます。UI とプラットフォームごとの違いへの対応は <ChapterLink n={55} />、Swift と Kotlin を直接書くプラグインの自作は <ChapterLink n={56} />、ストアへの配布は <ChapterLink n={57} /> で扱います。
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境は Linux で、iOS と Android のビルド・実行は一切試せていません。第8部の手順は Tauri 公式ドキュメント（2.12 時点）と Apple・Google の公式資料に基づく記述で、本書の制作環境では未検証です。読者の macOS で実際に動かすときは、公式ドキュメントの最新版も併せて確認してください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'architecture',
      title: 'Rust はライブラリになり、アプリ殻から呼ばれる',
      body: (
        <>
          <p>
            <ChapterLink n={33} /> で見たデスクトップ版では、<code>src-tauri/src/main.rs</code> の <code>main</code> 関数が実行ファイルの入口でした。モバイルでは事情が異なります。iOS のアプリは Swift（または Objective-C）で書かれたアプリとして、Android のアプリは Kotlin（または Java）で書かれたアプリとして OS から起動されます。Rust で書いた <code>main</code> を OS が直接呼ぶことはできません。
          </p>
          <p>
            そこで Tauri は、Rust のコードを<Term en="library">ライブラリ</Term>としてビルドし、各 OS のアプリ殻に組み込む方式をとります。<code>create-tauri-app</code> が生成する <code>Cargo.toml</code> には最初から次の設定があります。<Ref n={6} />
          </p>
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml（抜粋）"
            code={`
[lib]
name = "app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]
`}
          />
          <p>
            3 つの <code>crate-type</code> は、それぞれ使われる場面が違います。
          </p>
          <ul>
            <li><code>staticlib</code>：静的ライブラリ（<code>.a</code>）。iOS の Xcode プロジェクトにリンクされます。</li>
            <li><code>cdylib</code>：C 互換の共有ライブラリ（<code>.so</code>）。Android では <code>libapp_lib.so</code> として APK に同梱され、Kotlin 側が <code>System.loadLibrary("app_lib")</code> で読み込みます。<Ref n={5} /></li>
            <li><code>rlib</code>：Rust 用のライブラリ。デスクトップの <code>main.rs</code> が <code>app_lib::run()</code> を呼ぶために使います。</li>
          </ul>
          <p>
            入口の関数は <code>src/lib.rs</code> の <code>run</code> です。<code>#[cfg_attr(mobile, tauri::mobile_entry_point)]</code> という属性が付いており、モバイル向けにビルドするときだけ、この関数が Swift / Kotlin から呼び出せる入口として公開されます。<Ref n={6} /><Ref n={7} />
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（テンプレート）"
            code={`
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}

// src-tauri/src/main.rs はデスクトップ専用の入口で、中身は app_lib::run() を呼ぶだけ
`}
          />
          <p>
            ここで使われている <code>mobile</code> という条件は、Rust 標準の <code>target_os</code> ではなく、<code>tauri-build</code> が <code>build.rs</code> の実行時に定義する別名です。ターゲット OS が iOS または Android なら <code>mobile</code>、それ以外なら <code>desktop</code> が有効になります。<Ref n={8} /> <ChapterLink n={55} /> で、この条件を使って Rust 側の処理を分岐させます。
          </p>
          <p>
            図 54-1 は、この構成を iOS と Android で並べたものです。灰色の枠が OS に起動されるアプリ殻、その中の青が WebView、橙が Rust のライブラリです。
          </p>
          <Figure n="54-1" title="モバイル版 Tauri アプリの構成" caption="模式図。OS が起動するのは Swift / Kotlin のアプリ殻で、その中で WebView がフロントエンドを表示し、Rust のライブラリが run() から起動される。iOS は静的ライブラリ、Android は共有ライブラリとしてリンクされる。IPC の仕組み自体はデスクトップと同じ。">
            <MobileStackFigure />
          </Figure>
          <p>
            図から読み取れることは 2 つあります。第一に、フロントエンドと Rust 側の間の IPC（コマンド、イベント、チャネル）はデスクトップと同じ仕組みで動くため、<ChapterLink n={34} /> から <ChapterLink n={36} /> で書いたコードはそのまま使えます。第二に、WebView のエンジンは OS 付属のものです。iOS では WebKit の <code>WKWebView</code>、Android では Android System WebView（Chromium 系）が使われ、<Term en="WRY">WRY</Term> がその差を吸収します。<Ref n={9} /><Ref n={12} /> macOS の WebKit で動いていた CSS や JavaScript は iOS でもほぼ同じように動きますが、Android ではエンジンが Chromium 系に変わる点に注意が必要です。
          </p>
          <p>
            アプリ殻のプロジェクトは、次節以降で説明する <code>init</code> コマンドが <code>src-tauri/gen/apple</code>（Xcode プロジェクト）と <code>src-tauri/gen/android</code>（Gradle プロジェクト）に生成します。<Ref n={3} /><Ref n={10} /> Info.plist は <code>init</code> 時に CLI が設定から生成し、AndroidManifest.xml の一部（ファイル関連付け）と Gradle のファイルは <code>tauri-build</code> がビルドのたびに更新するため、普段はこれらの生成物を直接編集しません。<Ref n={3} /><Ref n={8} />
          </p>
        </>
      ),
    },
    {
      id: 'environment',
      title: '開発環境を整える（macOS）',
      body: (
        <>
          <p>
            <ChapterLink n={2} /> で整えた環境に、モバイル向けのツールを追加します。iOS の開発は macOS と Xcode が必須で、Windows や Linux ではできません。<Ref n={2} /> Android の開発はどの OS でもできますが、本書は macOS を前提に書きます。
          </p>
          <h3>iOS：Xcode と rustup のターゲット</h3>
          <p>
            第2章で入れた Xcode Command Line Tools だけでは足りず、App Store から Xcode 本体をインストールする必要があります。公式ドキュメントは「Xcode Command Line Tools ではなく Xcode を」と明記しています。<Ref n={2} /> インストール後は一度 Xcode を起動して、追加コンポーネントの導入を済ませておきます。
          </p>
          <p>
            次に、Rust のクロスコンパイル用ターゲットを追加します。iOS 実機用（<code>aarch64-apple-ios</code>）、Intel Mac 上のシミュレーター用（<code>x86_64-apple-ios</code>）、Apple Silicon Mac 上のシミュレーター用（<code>aarch64-apple-ios-sim</code>）の 3 つです。<Ref n={2} />
          </p>
          <Code
            lang="bash"
            code={`
rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
`}
          />
          <p>
            さらに、Homebrew 経由で CocoaPods を入れます。CocoaPods は iOS 向けのパッケージマネージャで、生成される Xcode プロジェクトが依存関係の解決に使います。<Ref n={2} />
          </p>
          <Code
            lang="bash"
            code={`
brew install cocoapods
`}
          />
          <h3>Android：Android Studio と SDK / NDK</h3>
          <p>
            Android Studio を公式サイトからインストールし、SDK Manager で次の 5 つを入れます。<Ref n={2} />
          </p>
          <ul>
            <li>Android SDK Platform</li>
            <li>Android SDK Platform-Tools</li>
            <li>NDK (Side by side)</li>
            <li>Android SDK Build-Tools</li>
            <li>Android SDK Command-line Tools</li>
          </ul>
          <p>
            <Term en="NDK">NDK</Term>（Native Development Kit）は、C や Rust のようなネイティブコードを Android 向けにコンパイルするためのツールチェーンです。Rust の <code>cdylib</code> をビルドするリンカも、ここに含まれています。
          </p>
          <p>
            続いて、3 つの環境変数をシェルの設定ファイル（<code>~/.zshrc</code> など）に書きます。<code>JAVA_HOME</code> は Android Studio に同梱された JDK、<code>ANDROID_HOME</code> は SDK の置き場所、<code>NDK_HOME</code> は NDK のバージョン付きディレクトリを指します。<Ref n={2} />
          </p>
          <Code
            lang="bash"
            title="~/.zshrc（macOS）"
            code={`
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/$(ls -1 $ANDROID_HOME/ndk)"
`}
          />
          <p>
            <code>NDK_HOME</code> の行は、<code>ndk</code> ディレクトリの中にあるバージョン名のフォルダを <code>ls</code> で取り出して連結しています。NDK を複数入れていると複数行が返って壊れるため、その場合は具体的なバージョン名を書きます。環境変数を変えた後は、ターミナルとエディタを再起動しないと反映されません。<Ref n={2} />
          </p>
          <p>最後に Android 用の rustup ターゲットを 4 つ追加します。<Ref n={2} /></p>
          <Code
            lang="bash"
            code={`
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
`}
          />
          <p>4 つの対応関係を表にまとめます。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ターゲット</th>
                  <th>対象</th>
                  <th><code>tauri android build --target</code> での名前</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>aarch64-linux-android</code></td>
                  <td>64 ビット ARM。現行の実機のほとんど</td>
                  <td><code>aarch64</code></td>
                </tr>
                <tr>
                  <td><code>armv7-linux-androideabi</code></td>
                  <td>32 ビット ARM。古い実機</td>
                  <td><code>armv7</code></td>
                </tr>
                <tr>
                  <td><code>i686-linux-android</code></td>
                  <td>32 ビット x86。古いエミュレーター</td>
                  <td><code>i686</code></td>
                </tr>
                <tr>
                  <td><code>x86_64-linux-android</code></td>
                  <td>64 ビット x86。Intel Mac 上のエミュレーター</td>
                  <td><code>x86_64</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>tauri android build</code> は既定で 4 つすべてをビルドします。<Ref n={3} /> 開発中は時間がかかるので、後述の <code>--target</code> で絞ることもできます。
          </p>
        </>
      ),
    },
    {
      id: 'init',
      title: 'init：アプリ殻のプロジェクトを生成する',
      body: (
        <>
          <p>
            環境が整ったら、プロジェクトごとに一度だけ <code>init</code> を実行します。<Ref n={3} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios init       # macOS のみ。src-tauri/gen/apple を生成
npm run tauri android init   # src-tauri/gen/android を生成
`}
          />
          <p>
            どちらも対話的に質問をしてきます。CI など対話できない環境では <code>--ci</code> を付けると既定値で進みます。<code>--skip-targets-install</code> を付けない限り、不足している rustup ターゲットも自動で入れようとします。<Ref n={3} />
          </p>
          <p>
            iOS では、コード署名が開発時から強制されるため、Apple Developer アカウントの<Term en="development team">開発チーム</Term> ID が必要です。<code>tauri.conf.json</code> の <code>bundle.iOS.developmentTeam</code> に書くか、環境変数 <code>APPLE_DEVELOPMENT_TEAM</code> で渡します。<Ref n={4} /> Apple の案内によれば、無料の Apple ID でもシミュレーターと手元の実機での実行までは可能ですが、配布には有料の Apple Developer Program が必要です。<Ref n={13} />（<ChapterLink n={57} />）
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（モバイル関連の抜粋）"
            code={`
{
  "identifier": "dev.example.tsumugi",
  "bundle": {
    "iOS": {
      "developmentTeam": "XXXXXXXXXX",
      "minimumSystemVersion": "15.0"
    },
    "android": {
      "minSdkVersion": 24
    }
  }
}
`}
          />
          <p>
            <code>identifier</code> は iOS の Bundle ID と Android のパッケージ名の両方の元になります。Android のパッケージ名にはハイフンが使えないため、<code>tauri-build</code> が自動でアンダースコアに置き換えます。<Ref n={8} /> <code>minimumSystemVersion</code>（iOS、既定 15.0）と <code>minSdkVersion</code>（Android、既定 24 = Android 7.0）は、対応する最低 OS バージョンです。<Ref n={4} /><Ref n={10} />
          </p>
          <p>
            生成される <code>src-tauri/gen/</code> 配下は、通常のネイティブアプリのプロジェクトそのものです。Xcode や Android Studio で開いて、アイコンや権限の宣言（Info.plist、AndroidManifest.xml）を編集することもできます。ただし、<code>tauri.conf.json</code> から生成される部分（Gradle のファイル、ファイル関連付けのための intent filter など）はビルドのたびに上書きされます。<Ref n={8} /> 「設定で済むことは設定に書き、ネイティブ固有のことだけ <code>gen/</code> を触る」が原則です。
          </p>
          <p>図 54-2 に、この後の <code>dev</code> と <code>build</code> まで含めた全体の流れを示します。</p>
          <Figure n="54-2" title="モバイル開発の流れ" caption="環境構築と init はプロジェクトごとに一度。日々の開発は dev コマンドで、シミュレーター・エミュレーター・実機のいずれかで動かす。実機は開発サーバーを LAN に公開する必要がある（CLI 直接実行なら自動、Xcode 経由なら --host）。配布用の build は第57章。">
            <DevFlowFigure />
          </Figure>
        </>
      ),
    },
    {
      id: 'dev',
      title: 'dev：シミュレーター・エミュレーター・実機で動かす',
      body: (
        <>
          <p>
            日々の開発は <code>dev</code> コマンドで行います。デスクトップの <code>tauri dev</code> と同じく、フロントエンドの開発サーバーを起動し、Rust をビルドし、アプリを立ち上げてファイルの変更を監視します。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios dev
npm run tauri android dev
`}
          />
          <p>
            初回は Rust の依存クレートをモバイル向けに丸ごとビルドするため、数分かかります。2 回目以降は自分のコードだけが再ビルドされるので速くなります。<Ref n={1} />
          </p>
          <h3>動かす先を選ぶ</h3>
          <p>
            接続中の実機があればそれが使われ、なければシミュレーター（iOS）またはエミュレーター（Android）の一覧から選ぶよう求められます。名前を引数で渡せば、質問を省略できます。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios dev 'iPhone 15'
`}
          />
          <p>
            <Term en="simulator">シミュレーター</Term>（iOS）と<Term en="emulator">エミュレーター</Term>（Android）は、どちらも Mac 上で動く仮想端末です。iOS シミュレーター向けには専用の rustup ターゲット（<code>aarch64-apple-ios-sim</code> など）が使われ、<code>tauri ios build --target</code> でも <code>aarch64-sim</code> として区別されます。<Ref n={3} />
          </p>
          <h3>Xcode / Android Studio から動かす：--open</h3>
          <p>
            <code>--open</code> を付けると、端末で実行する代わりに Xcode または Android Studio でプロジェクトを開きます。<Ref n={3} /> ネイティブ側のデバッガを使いたいときや、署名の設定を GUI で確認したいときに便利です。このとき Tauri CLI のプロセスは開発サーバーを提供し続けているので、IDE を使っている間は止めてはいけません。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios dev -- --open
npm run tauri android dev -- --open
`}
          />
          <h3>実機で動かす：--host と TAURI_DEV_HOST</h3>
          <p>
            実機で <code>dev</code> を使うと、ひとつ問題が起きます。開発サーバーは Mac の <code>localhost</code> で動いていますが、実機から見た <code>localhost</code> は実機自身です。そこで Tauri CLI は、Mac の LAN 上の IP アドレスを環境変数 <code>TAURI_DEV_HOST</code> に入れて開発サーバーに渡し、<code>devUrl</code> のホストもその IP に差し替えます。<Ref n={1} /><Ref n={3} /> 開発サーバー側は、この値をホストとして待ち受ける必要があります。
          </p>
          <Figure n="54-3" title="開発サーバーと端末の関係" caption="シミュレーターは Mac の中にあるので localhost で開発サーバーに届く。実機は別の機器なので、Mac の IP アドレスで公開した開発サーバーに Wi-Fi 経由で接続する。その IP を伝えるのが TAURI_DEV_HOST。">
            <DevServerFigure />
          </Figure>
          <p>
            <code>create-tauri-app</code> が生成する <code>vite.config.ts</code> は、最初からこの変数に対応しています（ポート番号 1420 は公式の開発ガイドの例に合わせたものです）。<Ref n={1} /><Ref n={11} />
          </p>
          <Code
            lang="ts"
            title="vite.config.ts（抜粋）"
            code={`
const host = process.env.TAURI_DEV_HOST

export default defineConfig({
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,                 // 実機開発のときだけ LAN に公開する
    hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,
  },
})
`}
          />
          <p>
            シミュレーターとエミュレーターは <code>localhost</code> のままです。CLI から直接実機で実行する場合は、Android でも iOS でも CLI が自動で LAN の IP アドレスを <code>TAURI_DEV_HOST</code> に入れます。<code>--open</code> で Xcode から iOS 実機に流す場合だけ <code>--host</code> を明示します。<Ref n={1} /><Ref n={3} /><Ref n={14} /> また <code>--force-ip-prompt</code> を付けると、使う IP アドレスを対話的に選べます。公式ドキュメントは、Xcode の「Devices and Simulators」で実機をネットワーク接続してから <code>::2</code> で終わるアドレスを選ぶ方法を、より安全な接続として紹介しています。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios dev                     # iOS 実機（接続中なら自動で LAN の IP を使う）
npm run tauri ios dev -- --open --host    # Xcode から実機で動かす（--host が必要）
`}
          />
          <p>
            iOS の実機で初回起動すると、ローカルネットワークへのアクセス許可を求めるダイアログが出ます。許可した後にアプリを再起動すると、開発サーバーに接続できます。<Ref n={1} />
          </p>
          <h3>Web インスペクタでデバッグする</h3>
          <p>
            <ChapterLink n={40} /> で使った DevTools は、モバイルではブラウザ側から接続します。<Ref n={1} />
          </p>
          <ul>
            <li>iOS：Mac の Safari で「設定 &gt; 詳細 &gt; Web 開発者向けの機能を表示」を有効にし、実機では「設定 &gt; Safari &gt; 詳細 &gt; Web インスペクタ」も有効にします。Safari の「開発」メニューから端末と <code>localhost</code> を選ぶと、WebView の中身を検査できます。</li>
            <li>Android：Chrome で <code>chrome://inspect</code> を開き、端末の項目の「inspect」を押します。エミュレーターは最初から検査可能で、実機は開発者向けオプションで USB デバッグを有効にします。</li>
          </ul>
          <Callout kind="warn">
            <p>
              Xcode のビルドスクリプトは、シェルの設定ファイルで追加した <code>PATH</code> を読まないことがあります。Node.js のバージョン管理ツール（nvm など）を使っていて Xcode からのビルドだけ失敗する場合は、この問題を疑ってください。<Ref n={1} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tsumugi',
      title: 'Tsumugi をモバイルで動かすために',
      body: (
        <>
          <Callout kind="tsumugi">
            <p>
              Tsumugi の Rust 側は、<ChapterLink n={41} /> の設計どおり、Tauri に依存しない <code>tsumugi-core</code> クレートと、Tauri コマンドの薄い層に分かれています。モバイル向けビルドで変わるのは後者の入口だけで、<code>src-tauri/src/lib.rs</code> の <code>run</code> に <code>#[cfg_attr(mobile, tauri::mobile_entry_point)]</code> が付いていれば、<code>tauri ios init</code> と <code>tauri android init</code> を実行するだけでアプリ殻が生成されます。
            </p>
            <p>
              注意点は 2 つあります。第一に、<code>rusqlite</code> の <code>bundled</code> 機能は SQLite の C ソースを同梱してコンパイルするため、Android では NDK のコンパイラが、iOS では Xcode のコンパイラが使われます。環境変数 <code>NDK_HOME</code> が正しく設定されていないと、この段階で失敗します。第二に、データベースや画像の保存先である <code>app_data_dir</code>（<ChapterLink n={36} />）は、モバイルではアプリ専用のサンドボックス内のディレクトリになります。パスを決め打ちせず、Tauri の path API から取得している限り、コードの変更は不要です。
            </p>
            <p>
              本書の制作環境では、この手順を実機でもシミュレーターでも試せていません。Tsumugi のモバイル対応で確実に必要になる変更（レイアウト、セーフエリア、プラグインの対応状況）は、次章で扱います。
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
            <li>モバイルでは OS が Swift / Kotlin のアプリ殻を起動し、Rust は <code>staticlib</code>（iOS）または <code>cdylib</code>（Android）としてリンクされる。入口は <code>lib.rs</code> の <code>run</code> で、<code>mobile_entry_point</code> 属性が公開する。</li>
            <li><code>mobile</code> / <code>desktop</code> という cfg は <code>tauri-build</code> が定義する別名で、ターゲット OS が iOS か Android なら <code>mobile</code> になる。</li>
            <li>iOS には Xcode 本体、3 つの rustup ターゲット、CocoaPods が要る。Android には Android Studio、5 つの SDK コンポーネント、<code>JAVA_HOME</code> / <code>ANDROID_HOME</code> / <code>NDK_HOME</code>、4 つの rustup ターゲットが要る。</li>
            <li><code>tauri ios init</code> / <code>tauri android init</code> は一度だけ実行し、<code>src-tauri/gen/apple</code> と <code>src-tauri/gen/android</code> にネイティブのプロジェクトを生成する。iOS は <code>developmentTeam</code> が必須。</li>
            <li><code>dev</code> は接続中の実機かシミュレーター・エミュレーターで動かす。<code>--open</code> で IDE から、実機では <code>TAURI_DEV_HOST</code>（Xcode 経由なら <code>--host</code> を明示）で開発サーバーを LAN に公開する。</li>
          </ul>
          <p>次章では、画面の大きさ、タッチ操作、セーフエリア、ライフサイクル、プラグインの対応状況といった、モバイルならではの違いに Tsumugi の UI を対応させます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Develop — Developing Your Mobile Application',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/#developing-your-mobile-application',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'dev コマンド、端末の選択、--open、TAURI_DEV_HOST と実機、Web インスペクタ、Xcode の PATH 問題、ローカルネットワーク許可の根拠。',
    },
    {
      title: 'Prerequisites — Configure for Mobile Targets',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/prerequisites/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Xcode 本体が必要なこと、Android Studio と SDK コンポーネント、JAVA_HOME / ANDROID_HOME / NDK_HOME、rustup target の一覧、CocoaPods の根拠。',
    },
    {
      title: 'Command Line Interface — tauri ios / android init, dev, build',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: 'init の --ci / --skip-targets-install、dev の --open / --host / --force-ip-prompt、build の --target の名前と既定値の根拠。',
    },
    {
      title: 'Configuration — bundle > iOS, bundle > android',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'developmentTeam が iOS で必須なこと、APPLE_DEVELOPMENT_TEAM、minimumSystemVersion、minSdkVersion の根拠。',
    },
    {
      title: 'Mobile Plugin Development — Calling Rust From Mobile Plugins',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/plugins/develop-mobile/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Android で Rust が libapp_lib.so（cdylib）として読み込まれることの根拠。',
    },
    {
      title: 'tauri-cli templates/app/src-tauri（Cargo.crate-manifest, src/lib.rs, src/main.rs）',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli/templates/app/src-tauri',
      accessed: '2026-11-08',
      note: 'crate-type = ["staticlib", "cdylib", "rlib"]、lib 名 app_lib、mobile_entry_point 属性付きの run、main.rs が app_lib::run() を呼ぶことの根拠。',
    },
    {
      title: 'Project Structure',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/project-structure/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'lib.rs がモバイルの入口で、モバイルではアプリがライブラリとしてコンパイルされること、main.rs がデスクトップの入口であることの根拠。',
    },
    {
      title: 'tauri-build crate — src/lib.rs',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-build/src/lib.rs',
      accessed: '2026-11-08',
      note: 'desktop / mobile / dev の cfg 別名の定義、Android パッケージ名の変換、Gradle ファイルと AndroidManifest の生成の根拠。',
    },
    {
      title: 'WRY — README',
      publisher: 'tauri-apps/wry（GitHub）',
      url: 'https://github.com/tauri-apps/wry/blob/dev/README.md',
      accessed: '2026-11-08',
      note: 'WRY が各 OS の WebView を抽象化すること、macOS では WebKit、Android では Kotlin の WryActivity 経由で WebView を使うことの根拠。',
    },
    {
      title: 'Distribute — Google Play',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/google-play/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'gen/android 配下に Gradle プロジェクトが生成されること、最低 SDK が 24（Android 7.0）であることの根拠。',
    },
    {
      title: 'Frontend Configuration — Vite',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/frontend/vite/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'vite.config の TAURI_DEV_HOST、strictPort、hmr、watch の設定の根拠。',
    },
    {
      title: 'Webview Versions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/webview-versions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'iOS では WKWebView、Android では Android System WebView（Chromium ベース）が使われることの根拠。',
    },
    {
      title: 'Choosing a Membership — Apple Developer Program',
      publisher: 'Apple',
      url: 'https://developer.apple.com/support/compare-memberships/',
      accessed: '2026-11-08',
      note: '無料の Apple ID でも実機でのテストは可能で、配布には有料の Apple Developer Program が必要なことの根拠。',
    },
    {
      title: 'tauri-cli — src/mobile/ios/dev.rs, src/mobile/android/dev.rs',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli/src/mobile',
      accessed: '2026-11-08',
      version: 'tauri-cli 2.12.4',
      note: '--host 指定時・実機接続時・devUrl が 0.0.0.0 のときに LAN の IP を TAURI_DEV_HOST に入れること、シミュレーターでは localhost のままであることの根拠。',
    },
  ],
}

export default chapter
