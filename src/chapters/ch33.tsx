import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 33-1 Core プロセスと WebView プロセス ---------- */
function ProcessModelFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Tauri アプリの構成。左に Rust で書かれた Core プロセスがあり、OS の API とウィンドウを扱う。右に WebView プロセスがあり、React で書いた画面を描く。両者は IPC のメッセージで結ばれ、すべてのメッセージは Core を経由する">
      <defs>
        <marker id="arrow33a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* OS */}
      <rect x="20" y="20" width="600" height="260" rx="10" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="40" y="44" fontSize="13" fill="var(--fig-muted)">OS（macOS / Windows / Linux / iOS / Android）</text>
      {/* Core */}
      <rect x="40" y="60" width="250" height="200" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="165" y="86" fontSize="15" fontWeight="600" textAnchor="middle">Core プロセス（Rust）</text>
      <g fontSize="13">
        <rect x="55" y="100" width="220" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="120" textAnchor="middle">ウィンドウ・メニュー・トレイ</text>
        <rect x="55" y="138" width="220" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="158" textAnchor="middle">コマンドの実行（アプリの処理）</text>
        <rect x="55" y="176" width="220" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="196" textAnchor="middle">状態・DB 接続・ファイル</text>
        <rect x="55" y="214" width="220" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="234" textAnchor="middle">IPC の仲介と権限の検査</text>
      </g>
      {/* WebView */}
      <rect x="370" y="60" width="230" height="200" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="485" y="86" fontSize="15" fontWeight="600" textAnchor="middle">WebView プロセス</text>
      <g fontSize="13">
        <rect x="385" y="100" width="200" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="485" y="120" textAnchor="middle">HTML / CSS / JavaScript</text>
        <rect x="385" y="138" width="200" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="485" y="158" textAnchor="middle">React で書いた画面</text>
        <rect x="385" y="176" width="200" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="485" y="196" textAnchor="middle">@tauri-apps/api</text>
        <text x="485" y="238" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">OS 付属のエンジンが描画する</text>
      </g>
      {/* IPC arrows */}
      <path d="M290,140 L368,140" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow33a)" markerStart="url(#arrow33a)" />
      <text x="330" y="132" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">IPC</text>
      <text x="330" y="162" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">メッセージ</text>
    </svg>
  )
}

/* ---------- 図 33-2 クレートの層構造 ---------- */
function LayerFigure() {
  const rows = [
    { y: 30, label: 'アプリのコード（lib.rs、コマンド、プラグイン）', fill: 'var(--fig-box4)' },
    { y: 80, label: 'tauri クレート（設定の読み込み、API、更新、IPC）', fill: 'var(--fig-box2)' },
    { y: 130, label: 'tauri-runtime ／ tauri-runtime-wry（接着層）', fill: 'var(--fig-box)' },
    { y: 180, label: 'WRY（WebView の描画）　＋　TAO（ウィンドウと イベントループ）', fill: 'var(--fig-box3)' },
    { y: 230, label: 'OS の WebView と ウィンドウシステム', fill: 'var(--fig-box5)' },
  ]
  return (
    <svg viewBox="0 0 640 290" role="img" aria-label="Tauri を構成する層を上から下に積んだ図。上からアプリのコード、tauri クレート、tauri-runtime と tauri-runtime-wry、WRY と TAO、最下層に OS の WebView とウィンドウシステムが並ぶ">
      {rows.map((r) => (
        <g key={r.y}>
          <rect x="40" y={r.y} width="560" height="40" rx="6" fill={r.fill} stroke="var(--fig-line)" />
          <text x="320" y={r.y + 25} fontSize="13" textAnchor="middle">{r.label}</text>
        </g>
      ))}
      <text x="20" y="55" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">上</text>
      <text x="20" y="255" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">下</text>
      <text x="320" y="283" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">上の層が下の層を使う。アプリのコードは通常 tauri クレートだけを直接使う</text>
    </svg>
  )
}

/* ---------- 図 33-3 dev と build の流れ ---------- */
function DevBuildFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="tauri dev と tauri build の流れを上下2段で比べた図。dev では beforeDevCommand で Vite の開発サーバーを起動し、Rust をデバッグビルドして devUrl を WebView に読み込む。build では beforeBuildCommand で静的ファイルを出力し、frontendDist をバイナリに埋め込んでリリースビルドし、バンドルを作る">
      <defs>
        <marker id="arrow33c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* dev */}
      <text x="40" y="30" fontSize="15" fontWeight="600">tauri dev</text>
      <g fontSize="12">
        <rect x="40" y="45" width="160" height="60" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="70" textAnchor="middle">beforeDevCommand</text>
        <text x="120" y="90" textAnchor="middle" fill="var(--fig-muted)">npm run dev（Vite）</text>
        <path d="M200,75 L238,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow33c)" />
        <rect x="240" y="45" width="160" height="60" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="70" textAnchor="middle">cargo build（debug）</text>
        <text x="320" y="90" textAnchor="middle" fill="var(--fig-muted)">Rust の変更で再ビルド</text>
        <path d="M400,75 L438,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow33c)" />
        <rect x="440" y="45" width="160" height="60" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="520" y="70" textAnchor="middle">WebView が devUrl を開く</text>
        <text x="520" y="90" textAnchor="middle" fill="var(--fig-muted)">http://localhost:1420 など</text>
      </g>
      <text x="320" y="130" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">画面の変更は Vite の HMR で即時反映。Rust の変更はアプリの再起動を伴う</text>
      <line x1="40" y1="150" x2="600" y2="150" stroke="var(--fig-line)" strokeDasharray="6 4" />
      {/* build */}
      <text x="40" y="180" fontSize="15" fontWeight="600">tauri build</text>
      <g fontSize="12">
        <rect x="40" y="195" width="160" height="60" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="220" textAnchor="middle">beforeBuildCommand</text>
        <text x="120" y="240" textAnchor="middle" fill="var(--fig-muted)">npm run build → dist/</text>
        <path d="M200,225 L238,225" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow33c)" />
        <rect x="240" y="195" width="160" height="60" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="220" textAnchor="middle">cargo build（release）</text>
        <text x="320" y="240" textAnchor="middle" fill="var(--fig-muted)">frontendDist を埋め込む</text>
        <path d="M400,225 L438,225" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow33c)" />
        <rect x="440" y="195" width="160" height="60" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="520" y="220" textAnchor="middle">バンドル</text>
        <text x="520" y="240" textAnchor="middle" fill="var(--fig-muted)">.app / .dmg / .msi など</text>
      </g>
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">静的ファイルは実行ファイルの中に入るので、配布物は1つのバイナリとそのインストーラになる</text>
      <text x="320" y="310" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：中間ファイルやアイコン生成などの細部は省略している</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 33,
  part: 5,
  title: 'Tauri のアーキテクチャとプロジェクト構造',
  summary:
    'Tauri アプリは Rust の Core プロセスと OS 付属の WebView プロセスの2つで動きます。この章では、その構成と OS ごとの WebView の違い、土台となる TAO と WRY、src-tauri ディレクトリと tauri.conf.json の役割、dev と build の流れを押さえます。',
  goals: [
    'Core プロセスと WebView プロセスの役割分担と、IPC がすべて Core を経由する理由を説明できる',
    'OS ごとにどの WebView が使われ、何がバージョンを決めるかを言える',
    'TAO と WRY、tauri クレート群がどの層を担当しているかを図で示せる',
    'src-tauri 配下の各ファイルと tauri.conf.json の主要な項目の役割を読める',
    'tauri dev と tauri build で何が起きるかを順に追える',
  ],
  prerequisites: [1, 2, 4, 7, 18, 22],
  sections: [
    {
      id: 'why-architecture',
      title: 'なぜ仕組みから学ぶか',
      body: (
        <>
          <p>
            <ChapterLink n={2} /> で <code>create-tauri-app</code> を使い、最初のアプリを起動しました。画面は React で書き、処理は Rust で書く、という大まかな分担はそこで体験済みです。ところが実際にアプリを作り始めると、「このコードはどちらの側で動いているのか」「画面と Rust はどうやって会話しているのか」「配布物の中には何が入っているのか」という疑問が次々に出てきます。
          </p>
          <p>
            これらの疑問は、Tauri が内部でどういう部品をどう組み合わせているかを知ると、ほとんど自然に解けます。第5部の残りの章で扱うコマンド（<ChapterLink n={34} />）、イベント（<ChapterLink n={35} />）、状態管理（<ChapterLink n={36} />）、セキュリティ（<ChapterLink n={37} />）は、すべてこの章で描く構成図の上に乗っています。
          </p>
          <p>
            この章は、<ChapterLink n={4} /> で学んだ WebView の概念と、<ChapterLink n={22} /> で学んだクレートの考え方を前提にします。公式ドキュメントの Architecture、Process Model、Inter-Process Communication の3つのページと、TAO・WRY のリポジトリを一次資料として読み進めます。<Ref n={1} /><Ref n={2} /><Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'process-model',
      title: 'Core プロセスと WebView プロセス',
      body: (
        <>
          <p>
            Tauri の公式ドキュメントは、Tauri を「Rust のツールと WebView に描画される HTML を組み合わせてデスクトップアプリを作る、柔軟なツールキット」と説明しています。<Ref n={1} /> その実体は、2種類のプロセスの組み合わせです。
          </p>
          <ul>
            <li>
              <Term en="Core process">Core プロセス</Term>：アプリの入口であり、OS に対する完全なアクセス権を持つ唯一の構成要素です。Rust で書かれ、ウィンドウやメニュー、トレイ、通知の管理を担当します。<Ref n={2} />
            </li>
            <li>
              <Term en="WebView process">WebView プロセス</Term>：Core が起動する、画面を描くためのプロセスです。HTML・CSS・JavaScript を実行します。Core 自身は画面を描かず、描画はすべてこちらに任せます。<Ref n={2} />
            </li>
          </ul>
          <p>
            公式ドキュメントは、この<Term en="multi-process architecture">マルチプロセス構成</Term>を採用する理由として、応答性（重い計算で画面が固まらない）、障害の分離（1つの構成要素のクラッシュが全体に波及しない）、最小権限の原則（各プロセスに必要な権限だけを与える）の3つを挙げています。<Ref n={2} /> ここで最も重要なのは3つ目です。画面を描く WebView は、Web ページと同じように外部の入力を扱う場所であり、OS への直接のアクセス権を持たせないほうが安全です。
          </p>
          <Figure n="33-1" title="Core プロセスと WebView プロセスの構成" caption="左の Core プロセスだけが OS の API を直接扱う。右の WebView プロセスは画面を描き、必要な処理は IPC のメッセージで Core に依頼する。模式図。">
            <ProcessModelFigure />
          </Figure>
          <p>
            図 33-1 の中央の矢印が <Term en="IPC (Inter-Process Communication)">IPC</Term>、つまりプロセス間通信です。公式ドキュメントは「すべての IPC は Core プロセスを経由する」ので、メッセージを1か所で検査・フィルタ・加工できる、と述べています。<Ref n={2} /> WebView から来た要求を Core が「悪意がある」と判断すれば、Core は単にその要求を捨て、対応する関数を実行しません。<Ref n={3} />
          </p>
          <p>
            公式ドキュメントは、設定やデータベース接続などの<Term en="global state">グローバルな状態</Term>も Core プロセスに置くよう勧めています。複数のウィンドウで状態がそろい、機密性の高いデータをフロントエンドから遠ざけられるからです。<Ref n={2} /> また、Web 開発で身につけた習慣（ユーザー入力の検証、フロントエンドに秘密情報を置かない）はそのまま有効で、攻撃対象を小さく保つために「できるだけ多くの業務ロジックを Core プロセス側に寄せる」ことを推奨しています。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'webviews',
      title: 'OS ごとの WebView',
      body: (
        <>
          <p>
            Electron との最大の違いは、Tauri が描画エンジンを同梱しない点です。公式の Process Model のページは、WebView のライブラリは最終的な実行ファイルに含まれず、実行時に動的にリンクされると明記しています。<Ref n={2} /> だから配布物が小さくなる反面、描画エンジンは OS ごとに異なるものになります。Tauri 2.12 時点で各 OS が使う WebView は次のとおりです。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>WebView</th>
                  <th>エンジンの系統</th>
                  <th>バージョンを決めるもの</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>macOS</td>
                  <td>WKWebView</td>
                  <td>WebKit（Safari と同系統）</td>
                  <td>OS のバージョン。OS の更新で WebKit も更新される</td>
                </tr>
                <tr>
                  <td>iOS</td>
                  <td>WebKit（WKWebView）</td>
                  <td>WebKit</td>
                  <td>OS のバージョン</td>
                </tr>
                <tr>
                  <td>Windows</td>
                  <td>WebView2</td>
                  <td>Chromium（Microsoft Edge）</td>
                  <td>WebView2 ランタイムが自動更新される。Windows 11 には同梱</td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td>WebKitGTK（webkit2gtk）</td>
                  <td>WebKit</td>
                  <td>ディストリビューションのパッケージ</td>
                </tr>
                <tr>
                  <td>Android</td>
                  <td>Android System WebView</td>
                  <td>Chromium</td>
                  <td>端末が選んでいる WebView プロバイダ。多くの端末で更新可能なシステム部品</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            表から読み取れることは2つあります。1つ目は、系統が WebKit と Chromium の2つに分かれることです。macOS・iOS・Linux は WebKit、Windows・Android は Chromium です。CSS の新機能や Web API の対応状況は系統ごとに違うので、Tsumugi でも両方で動くかを意識して書く必要があります。2つ目は、更新のされ方です。Windows の WebView2 は自身を更新できるため、公式ドキュメントは「すべての Windows 環境で比較的新しい Chromium が保証される」と述べています。<Ref n={4} /> 一方 macOS は OS の更新に依存し、サポートが終わった macOS は WebKit の更新を受けません。<Ref n={4} /> Linux はディストリビューションが配布する webkit2gtk のバージョンに縛られ、公式ドキュメントも「常にディストリビューションのリポジトリで最新情報を確認する」よう促しています。<Ref n={4} />
          </p>
          <p>
            macOS では、ターミナルで WebKit のバージョンを確認できます。公式ドキュメントは <code>/System/Library/Frameworks/WebKit.framework/Resources/Info.plist</code> を <code>awk</code> で読む方法を示しています。<Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              iOS について、公式の WebView バージョン一覧のページは iOS を WebKit の節にまとめていますが、エンジンの名前を個別には書いていません。<Ref n={4} /> 本書では macOS と同じ WebKit 系統（WKWebView）として扱います。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tao-wry',
      title: 'TAO と WRY、tauri クレート群',
      body: (
        <>
          <p>
            WebView を OS から借りてくるといっても、OS ごとに API はまったく違います。その違いを吸収するのが、Tauri チームが保守する2つの上流クレートです。
          </p>
          <ul>
            <li>
              <Term en="TAO">TAO</Term>：クロスプラットフォームのウィンドウ作成ライブラリです。Windows、macOS、Linux、iOS、Android に対応し、Rust のウィンドウライブラリ <code>winit</code> のフォークとして始まりました。Linux の実装を GTK に置き換えている点が winit との大きな違いです。<Ref n={1} /><Ref n={5} />
            </li>
            <li>
              <Term en="WRY">WRY</Term>：クロスプラットフォームの WebView 描画ライブラリです。どの WebView を使い、どうやりとりするかを決める抽象層で、Linux では WebKitGTK、Windows では WebView2、macOS では WebKit を使います。WRY は自分ではウィンドウを作らず、TAO などのウィンドウライブラリからウィンドウとイベントループを受け取ります。<Ref n={1} /><Ref n={6} />
            </li>
          </ul>
          <p>
            公式ドキュメントは「Tauri は軽量なカーネルラッパーではなく、OS のシステムコールのために WRY と TAO に依存している」と説明しています。<Ref n={1} /> この2つの上に、<code>tauri</code> という名前の付いたクレート群が積まれます。
          </p>
          <Figure n="33-2" title="Tauri を構成する層" caption="アプリのコードは tauri クレートの API を呼び、tauri クレートは接着層を介して WRY と TAO を使い、WRY と TAO が OS の WebView とウィンドウシステムを扱う。模式図。">
            <LayerFigure />
          </Figure>
          <p>図 33-2 の各層に当たるクレートの役割は、公式の Architecture ページの説明では次のとおりです。<Ref n={1} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>クレート</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>tauri</code></td>
                  <td>ランタイム・マクロ・ユーティリティ・API をまとめる中心のクレート。コンパイル時に設定ファイルを読み、実行時にスクリプトを注入し、更新機能も持つ</td>
                </tr>
                <tr>
                  <td><code>tauri-runtime</code></td>
                  <td>Tauri 本体と下位の WebView ライブラリの間の接着層</td>
                </tr>
                <tr>
                  <td><code>tauri-runtime-wry</code></td>
                  <td>WRY に対する直接のシステム操作（印刷、モニタ検出、ウィンドウ操作など）</td>
                </tr>
                <tr>
                  <td><code>tauri-macros</code></td>
                  <td><code>tauri-codegen</code> を使って、コンテキスト・ハンドラ・コマンドのマクロを作る</td>
                </tr>
                <tr>
                  <td><code>tauri-codegen</code></td>
                  <td>アセットやアイコンの埋め込み・ハッシュ・圧縮。<code>tauri.conf.json</code> をコンパイル時に解析して <code>Config</code> 構造体を生成する</td>
                </tr>
                <tr>
                  <td><code>tauri-utils</code></td>
                  <td>設定の解析、プラットフォームの判定、CSP の注入、アセット管理などの共通コード</td>
                </tr>
                <tr>
                  <td><code>tauri-build</code></td>
                  <td>ビルド時にマクロを適用し、Cargo が必要とする機能を準備する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            この表を暗記する必要はありません。覚えておきたいのは、<code>#[tauri::command]</code> や <code>tauri::generate_handler!</code> といった第34章で使うマクロが <code>tauri-macros</code> の産物であること、そして <code>tauri.conf.json</code> が実行時ではなくコンパイル時に読まれる（<code>tauri-codegen</code>）ことです。後者は、設定を変えたら再ビルドが要る理由です。
          </p>
          <p>
            Rust 側以外の道具もあります。フロントエンドから使う TypeScript ライブラリ <code>@tauri-apps/api</code>、コマンドラインの <code>cli.rs</code> とその npm ラッパー <code>cli.js</code>（<code>@tauri-apps/cli</code>）、プロジェクトを生成する <code>create-tauri-app</code>、配布物を作る bundler です。<Ref n={1} /> プラグインは「Rust の機能」「接着のコード」「JavaScript の API」の3つを組にして配られ、<code>tauri-plugin-fs</code> などの公式プラグインを <ChapterLink n={38} /> で使います。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'ipc-overview',
      title: 'IPC の2つの形：コマンドとイベント',
      body: (
        <>
          <p>
            Core と WebView の会話の仕組みを、もう一段だけ詳しく見ます。公式ドキュメントによれば、Tauri の IPC は<Term en="asynchronous message passing">非同期メッセージパッシング</Term>という方式です。プロセス同士が、単純なデータ形式に直列化した要求と応答をやりとりします。<Ref n={3} /> Web 開発者にとっては、ブラウザとサーバーの通信に似た形です。共有メモリや関数の直接呼び出しと違い、受け取る側が要求を拒否したり捨てたりできるため、安全性が高いと説明されています。<Ref n={3} />
          </p>
          <p>この方式の上に、2種類のやりとりが用意されています。<Ref n={3} /></p>
          <div className="compare">
            <div>
              <h4>コマンド（Command）</h4>
              <p>IPC メッセージの上に作られた、関数呼び出しのような抽象です。フロントエンドが <code>invoke</code> で Rust の関数を呼び、引数を渡し、戻り値を受け取ります。JSON-RPC に似たプロトコルなので、引数と戻り値は JSON に直列化できる必要があります。向きはフロントエンドから Rust へ、応答はその逆です。</p>
            </div>
            <div>
              <h4>イベント（Event）</h4>
              <p>一方向の「送りっぱなし」のメッセージです。ライフサイクルの出来事や状態の変化を伝えるのに向きます。コマンドと違い、フロントエンドと Core のどちらからでも発行できます。内部ではイベントもコマンドの仕組みを使っています。</p>
            </div>
          </div>
          <p>
            公式ドキュメントの脚注は、コマンドが本物の FFI（他言語の関数の直接呼び出し）ではなくメッセージパッシングに基づいているため、FFI に付きもののセキュリティ上の落とし穴を避けられる、と述べています。<Ref n={3} /> コマンドの書き方は <ChapterLink n={34} />、イベントと、大量のデータを順序付きで流すチャネルは <ChapterLink n={35} /> で詳しく扱います。
          </p>
        </>
      ),
    },
    {
      id: 'project-structure',
      title: 'src-tauri と設定ファイル',
      body: (
        <>
          <p>
            Tauri プロジェクトは、最上位に JavaScript のプロジェクトがあり、その中の <code>src-tauri/</code> に Rust のプロジェクトがある、という二重構造です。公式ドキュメントは Rust 側を「普通の Cargo プロジェクトに、いくつかファイルが加わったもの」と説明しています。<Ref n={7} /> <code>create-tauri-app</code> で React と TypeScript を選んだときの構成を示します。
          </p>
          <Code
            lang="text"
            title="プロジェクトの構成（主要なファイルのみ）"
            code={`
tsumugi/
├── package.json          # フロントエンドの依存関係とスクリプト
├── index.html            # Vite の入口
├── vite.config.ts
├── src/                  # React のコード（第3部）
│   ├── main.tsx
│   └── App.tsx
└── src-tauri/            # Rust のプロジェクト
    ├── Cargo.toml        # [lib] name = "app_lib" など
    ├── build.rs          # tauri_build::build() を呼ぶ
    ├── tauri.conf.json   # Tauri の設定
    ├── capabilities/     # 権限の設定（第37章）
    ├── icons/            # tauri icon の出力先
    └── src/
        ├── main.rs       # デスクトップの入口。app_lib::run() を呼ぶだけ
        └── lib.rs        # 本体。モバイルの入口でもある
`}
          />
          <p>それぞれの役割は次のとおりです。<Ref n={7} /></p>
          <ul>
            <li>
              <code>src/main.rs</code>：デスクトップ向けの入口で、<code>app_lib::run()</code> を呼ぶだけです。公式ドキュメントは「このファイルは変更せず、<code>lib.rs</code> を変更する」よう指示しています。
            </li>
            <li>
              <code>src/lib.rs</code>：Rust のコード本体です。<code>#[cfg_attr(mobile, tauri::mobile_entry_point)]</code> の付いた <code>run</code> 関数があり、モバイルではこのクレートがライブラリとしてビルドされ、各 OS のアプリの殻から読み込まれます（<ChapterLink n={54} />）。<code>app_lib</code> という名前は <code>Cargo.toml</code> の <code>[lib] name</code> に対応します。
            </li>
            <li>
              <code>build.rs</code>：<code>tauri_build::build()</code> を呼び、Tauri のビルドシステムを動かします。
            </li>
            <li>
              <code>tauri.conf.json</code>：Tauri の主設定ファイルです。アプリの識別子や開発サーバーの URL などを書きます。Tauri CLI はこのファイルを手がかりに Rust プロジェクトの場所を見つけます。
            </li>
            <li>
              <code>capabilities/</code>：Tauri が capability ファイルを読む既定のフォルダです。コマンドは、ここで許可されてはじめてフロントエンドから呼べます（<ChapterLink n={37} />）。
            </li>
            <li>
              <code>icons/</code>：<code>tauri icon</code> コマンドの出力先で、アプリのアイコンを置きます。
            </li>
          </ul>
          <p>生成直後の <code>main.rs</code> と <code>lib.rs</code> は次のような形です。<Ref n={7} /><Ref n={10} /></p>
          <Code
            lang="rust"
            title="src-tauri/src/main.rs（変更しない）"
            code={`
// リリースビルドの Windows でコンソールウィンドウを出さない
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    app_lib::run()
}
`}
          />
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（本体。ここにコマンドや設定を書き足す）"
            code={`
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            <code>tauri::Builder</code> にコマンドや状態、プラグインを登録し、最後に <code>run</code> を呼ぶのが <code>lib.rs</code> の基本形です。<code>generate_context!</code> は <code>tauri.conf.json</code> をコンパイル時に読み込むマクロで、ここが前節で述べた「設定はコンパイル時に読まれる」の入口です。Builder の各メソッドは <ChapterLink n={34} /> と <ChapterLink n={36} /> で順に登場します。
          </p>
          <p>
            <code>tauri.conf.json</code> の主要な項目を見ます。公式のリファレンスによると、最上位の項目は <code>identifier</code>（必須）、<code>productName</code>、<code>version</code>、<code>mainBinaryName</code>、<code>build</code>、<code>app</code>、<code>bundle</code>、<code>plugins</code> です。<Ref n={8} />
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（抜粋）"
            code={`
{
  "productName": "Tsumugi",
  "version": "0.1.0",
  "identifier": "dev.example.tsumugi",
  "build": {
    "beforeDevCommand": "npm run dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "npm run build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      { "title": "Tsumugi", "width": 1100, "height": 760 }
    ],
    "security": {
      "csp": null
    }
  }
}
`}
          />
          <ul>
            <li>
              <code>identifier</code>：<code>com.tauri.example</code> のような逆ドメイン形式の文字列です。既定の <code>com.tauri.dev</code> のままだと <code>tauri build</code> が拒否します。<Ref n={8} /> この値は、<ChapterLink n={36} /> で見るデータ保存先のフォルダ名にも使われます。
            </li>
            <li>
              <code>build.beforeDevCommand</code> と <code>build.devUrl</code>：<code>tauri dev</code> の前に実行するシェルコマンドと、開発時に WebView に読み込む URL です。<Ref n={8} />
            </li>
            <li>
              <code>build.beforeBuildCommand</code> と <code>build.frontendDist</code>：<code>tauri build</code> の前に実行するコマンドと、ビルド済みのアセットの場所です。<Ref n={8} />
            </li>
            <li>
              <code>app.windows</code>：起動時に作るウィンドウの配列です。<code>label</code>（ウィンドウの識別子）を省くと <code>main</code> になります。<Ref n={8} /> 複数ウィンドウは <ChapterLink n={39} /> で扱います。
            </li>
            <li>
              <code>app.security.csp</code>：ビルドしたアプリのすべての HTML に注入される Content Security Policy です。<Ref n={8} /> <ChapterLink n={37} /> で設定します。
            </li>
          </ul>
          <p>
            設定は JSON のほかに、Cargo の feature を有効にすれば JSON5（<code>tauri.conf.json5</code>）や TOML（<code>Tauri.toml</code>）でも書けます。また <code>tauri.macos.conf.json</code> のような OS 別のファイルを置くと、主設定にマージされます。<Ref n={8} /> 署名や公証のように OS ごとに違う設定は、この仕組みで分けると見通しがよくなります。
          </p>
        </>
      ),
    },
    {
      id: 'dev-build',
      title: 'tauri dev と tauri build の流れ',
      body: (
        <>
          <p>
            Tauri CLI には <code>init</code>、<code>dev</code>、<code>build</code>、<code>bundle</code>、<code>info</code>、<code>add</code>、<code>icon</code>、<code>android</code>、<code>ios</code>、<code>plugin</code>、<code>signer</code>、<code>permission</code>、<code>capability</code> などのサブコマンドがあります。<Ref n={9} /> 日常的に使うのは <code>dev</code> と <code>build</code> の2つで、それぞれ <code>tauri.conf.json</code> の <code>build</code> 節を読んで動きます。
          </p>
          <Figure n="33-3" title="tauri dev と tauri build の流れ" caption="上段が開発、下段が配布用ビルド。どちらも最初にフロントエンド側のコマンドを実行し、次に Rust をビルドする。dev では WebView が開発サーバーの URL を開き、build では静的ファイルをバイナリに埋め込む。模式図。">
            <DevBuildFigure />
          </Figure>
          <p>
            <code>tauri dev</code> は、公式リファレンスの説明では「Rust コードのホットリロード付きで、開発モードでアプリを実行する」コマンドです。<code>build.beforeDevCommand</code>（通常はフロントエンドの開発サーバーの起動）を実行し、<code>build.devUrl</code> を WebView に読み込みます。<Ref n={9} /> React 側の変更は Vite の HMR で即座に反映されます。Rust 側のファイルを変更すると、CLI の監視機能が再ビルドしてアプリを立ち上げ直します。監視を止めたいときは <code>--no-watch</code>、パニックで終了させたいときは <code>--exit-on-panic</code> を付けます。<Ref n={9} />
          </p>
          <p>
            <code>tauri build</code> は「リリースモードでビルドし、バンドルとインストーラを生成する」コマンドです。<code>build.beforeBuildCommand</code>（通常は <code>vite build</code>）で静的ファイルを出力し、<code>build.frontendDist</code> の中身を Rust のバイナリに埋め込んでからバンドルを作ります。<Ref n={9} /> ここが dev との決定的な違いです。配布されるアプリの中に開発サーバーはなく、HTML や JavaScript はすべて実行ファイルの中から取り出されます。<Ref n={7} /> <code>--no-bundle</code> でバイナリだけを作ったり、<code>--target universal-apple-darwin</code> で Apple シリコンと Intel の両方で動く macOS 用バイナリを作ったりできます。<Ref n={9} /> 配布形式の詳細は <ChapterLink n={51} /> で扱います。
          </p>
          <Code
            lang="bash"
            title="よく使う CLI の呼び出し（npm 経由）"
            code={`
npm run tauri dev                      # 開発モードで起動
npm run tauri build                    # リリースビルドとバンドル
npm run tauri build -- --no-bundle     # バイナリだけ作る
npm run tauri info                     # 環境の診断（バージョンや WebView の情報）
`}
          />
          <p>
            両コマンドに共通する <code>--config</code> オプションは、JSON・JSON5・TOML の追加設定を既定の設定にマージします。<Ref n={9} /> CI で一時的に設定を上書きしたいときに便利です。
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境は Ubuntu 24.04（WSL2）です。Tsumugi を使って Linux 上で <code>tauri dev</code> による起動と、<code>tauri build</code> による本番ビルドと deb パッケージの生成が通ることを確認しました。この節の記述自体は公式の CLI リファレンスとプロジェクト構造のページに基づいており、macOS と Windows での実行結果は未検証です。
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
              Tsumugi の設計（<ChapterLink n={41} />）は、この章の構成図をそのまま下敷きにします。SQLite のファイルを開き、ページを読み書きし、全文検索の索引を更新するのは Core プロセスの仕事です。React の画面は、必要なデータをコマンドで取りに行くだけで、ファイルやデータベースには直接触りません。公式ドキュメントが「データベース接続はグローバルな状態として Core に置く」「業務ロジックは Core に寄せる」と勧めるとおりの分担です。<Ref n={2} />
            </p>
            <p>
              プロジェクト構造も、この章で見た二重構造の上に組みます。<code>src/lib/ipc.ts</code> に <code>invoke</code> の呼び出しを集め、<code>src-tauri/</code> は Tauri に依存しない <code>core</code> クレートと、コマンドの薄い層を持つ <code>tsumugi</code> クレートのワークスペース（<ChapterLink n={22} />）に分けます。設定ファイルでは <code>identifier</code> をアプリ固有の値に変え、データ保存先のフォルダ名を決めます。
            </p>
            <p>
              WebView が OS ごとに違うことは、第6部の UI 作りに直接効きます。macOS の WebKit と Windows の Chromium の両方で崩れないよう、CSS は標準的な機能に絞り、モバイルのセーフエリアの扱い（<ChapterLink n={55} />）も WebKit を基準に確認します。
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
            <li>Tauri アプリは、OS への完全なアクセス権を持つ Rust の Core プロセスと、画面を描く WebView プロセスで構成される。IPC はすべて Core を経由し、Core が要求を検査して捨てることができる。</li>
            <li>WebView は OS 付属のものを動的にリンクする。macOS・iOS・Linux は WebKit 系、Windows・Android は Chromium 系で、更新のされ方も OS ごとに違う。</li>
            <li>ウィンドウは TAO、WebView の描画は WRY が担い、その上に tauri クレート群が乗る。<code>tauri.conf.json</code> はコンパイル時に読まれる。</li>
            <li><code>src-tauri/</code> は普通の Cargo プロジェクトで、<code>lib.rs</code> が本体、<code>main.rs</code> はデスクトップの入口、<code>capabilities/</code> が権限の置き場。</li>
            <li><code>tauri dev</code> は開発サーバーの URL を WebView に読み込み、<code>tauri build</code> は静的ファイルをバイナリに埋め込んでバンドルを作る。</li>
          </ul>
          <p>次章では、IPC の2つの形のうちコマンドを取り上げ、フロントエンドから Rust の関数を呼ぶ方法と、引数・戻り値・エラーの受け渡しを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Tauri Architecture',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/concept/architecture/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'Tauri の定義、Core エコシステムのクレート群、TAO と WRY の位置づけ、ツール群とプラグインの構成の根拠。',
    },
    {
      title: 'Process Model',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/concept/process-model/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'マルチプロセス構成の理由、Core プロセスと WebView プロセスの責務、IPC が Core を経由すること、WebView が動的リンクされることの根拠。',
    },
    {
      title: 'Inter-Process Communication',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/concept/inter-process-communication/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: '非同期メッセージパッシング、コマンドとイベントの違い、Core が要求を捨てられることの根拠。',
    },
    {
      title: 'Webview Versions',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/webview-versions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'OS ごとの WebView（WebView2、WKWebView、webkit2gtk、Android System WebView）と更新のされ方の根拠。',
    },
    {
      title: 'tauri-apps/tao README',
      publisher: 'GitHub',
      url: 'https://github.com/tauri-apps/tao',
      accessed: '2026-11-08',
      note: 'TAO が winit のフォークであること、対応プラットフォーム、Linux が GTK を使うことの根拠。',
    },
    {
      title: 'tauri-apps/wry README',
      publisher: 'GitHub',
      url: 'https://github.com/tauri-apps/wry',
      accessed: '2026-11-08',
      note: 'WRY が各 OS で使う WebView、ウィンドウライブラリ（tao）との関係の根拠。',
    },
    {
      title: 'Project Structure',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/start/project-structure/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'src-tauri 配下の各ファイルの役割、main.rs と lib.rs の関係、静的ファイルがバイナリに埋め込まれることの根拠。',
    },
    {
      title: 'Configuration Reference',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'tauri.conf.json の最上位の項目、build 節と app.windows、identifier の既定値の扱い、JSON5/TOML と OS 別ファイルのマージの根拠。',
    },
    {
      title: 'Command Line Interface',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.x',
      note: 'サブコマンド一覧、tauri dev と tauri build の動作と主なオプションの根拠。',
    },
    {
      title: 'tauri-cli templates/app/src-tauri/src（main.rs, lib.rs）',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli/templates/app',
      accessed: '2026-11-08',
      version: 'tauri-cli 2.12.4',
      note: 'create-tauri-app が生成する main.rs と lib.rs の内容の根拠。',
    },
  ],
}

export default chapter
