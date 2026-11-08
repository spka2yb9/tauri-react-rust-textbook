import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 38-1 プラグインの構造 ---------- */
function PluginStructureFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="公式プラグイン1つの構造。上段は JS 側のパッケージ（@tauri-apps/plugin-fs）で、invoke を呼ぶ関数を提供する。下段は Rust 側のクレート（tauri-plugin-fs）で、コマンド本体と permissions ディレクトリの既定 permission を持つ。両者は plugin:fs|read_text_file のような IPC で結ばれ、アプリ側は Builder に .plugin で登録し、capability に fs:default を書く">
      <defs>
        <marker id="arrow38a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* JS side */}
        <rect x="20" y="30" width="280" height="110" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="54" textAnchor="middle" fontWeight="600">JS 側：@tauri-apps/plugin-fs</text>
        <text x="160" y="74" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">npm パッケージ（型付きの関数）</text>
        <rect x="35" y="88" width="250" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="160" y="106" textAnchor="middle" fontSize="12">readTextFile(path, opts)</text>
        <text x="160" y="122" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">→ invoke('plugin:fs|read_text_file', …)</text>
        {/* Rust side */}
        <rect x="20" y="190" width="280" height="110" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="214" textAnchor="middle" fontWeight="600">Rust 側：tauri-plugin-fs</text>
        <text x="160" y="234" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">クレート（コマンド本体＋スコープ検査）</text>
        <rect x="35" y="248" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="95" y="266" textAnchor="middle" fontSize="12">commands/</text>
        <text x="95" y="282" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">read_text_file …</text>
        <rect x="165" y="248" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="225" y="266" textAnchor="middle" fontSize="12">permissions/</text>
        <text x="225" y="282" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">default.toml …</text>
        {/* IPC arrow */}
        <path d="M160,140 L160,188" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38a)" />
        <text x="175" y="168" fontSize="12" fill="var(--fig-muted)">IPC</text>
        {/* App side */}
        <rect x="340" y="30" width="280" height="270" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="480" y="54" textAnchor="middle" fontWeight="600">アプリ側でやること</text>
        <rect x="355" y="70" width="250" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="480" y="88" textAnchor="middle" fontSize="12">Cargo.toml に tauri-plugin-fs</text>
        <text x="480" y="104" textAnchor="middle" fontSize="12">package.json に @tauri-apps/plugin-fs</text>
        <rect x="355" y="124" width="250" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="480" y="142" textAnchor="middle" fontSize="12">lib.rs の Builder に</text>
        <text x="480" y="158" textAnchor="middle" fontSize="12">.plugin(tauri_plugin_fs::init())</text>
        <rect x="355" y="178" width="250" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="480" y="196" textAnchor="middle" fontSize="12">capabilities/default.json に</text>
        <text x="480" y="212" textAnchor="middle" fontSize="12">"fs:default" と必要な allow-*</text>
        <rect x="355" y="232" width="250" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="480" y="250" textAnchor="middle" fontSize="12">（Rust からも使える）</text>
        <text x="480" y="266" textAnchor="middle" fontSize="12">app.dialog() / app.store() など</text>
        <path d="M300,85 L338,85" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M300,245 L338,245" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="4 3" />
      </g>
      <text x="320" y="314" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：fs を例にした。他の公式プラグインも同じ三点セット（JS 側・Rust 側・permission）でできている</text>
    </svg>
  )
}

/* ---------- 図 38-2 プラグイン呼び出しの流れ ---------- */
function PluginCallFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="writeTextFile を呼んだときの流れを縦のライフラインで示したシーケンス図。フロントエンドが plugin-fs の関数を呼び、invoke が Core の runtime authority に届き、capability の fs:allow-write-text-file とスコープが確認され、プラグインのコマンドがパスをスコープと照合してからファイルに書く">
      <defs>
        <marker id="arrow38b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {/* lifelines */}
        {[
          { x: 80, label: 'React', sub: 'フロントエンド' },
          { x: 230, label: 'plugin-fs (JS)', sub: '@tauri-apps/plugin-fs' },
          { x: 390, label: 'runtime authority', sub: 'Core' },
          { x: 560, label: 'plugin-fs (Rust)', sub: 'コマンド' },
        ].map((l) => (
          <g key={l.x}>
            <rect x={l.x - 65} y="20" width="130" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
            <text x={l.x} y="37" textAnchor="middle" fontWeight="600">{l.label}</text>
            <text x={l.x} y="52" textAnchor="middle" fill="var(--fig-muted)" fontSize="11">{l.sub}</text>
            <line x1={l.x} y1="60" x2={l.x} y2="270" stroke="var(--fig-line)" strokeDasharray="4 4" />
          </g>
        ))}
        <path d="M80,90 L222,90" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38b)" />
        <text x="151" y="82" textAnchor="middle">writeTextFile('a.md', text, opts)</text>
        <path d="M230,125 L382,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38b)" />
        <text x="306" y="117" textAnchor="middle">invoke('plugin:fs|write_text_file')</text>
        <rect x="325" y="140" width="130" height="44" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="390" y="157" textAnchor="middle">capability に</text>
        <text x="390" y="173" textAnchor="middle">allow-write-text-file？</text>
        <path d="M390,195 L552,195" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38b)" />
        <text x="471" y="187" textAnchor="middle">スコープを注入して渡す</text>
        <rect x="500" y="208" width="120" height="44" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="560" y="225" textAnchor="middle">パスは allow 内？</text>
        <text x="560" y="241" textAnchor="middle">→ 書き込み</text>
        <path d="M552,262 L88,262" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow38b)" />
        <text x="320" y="282" textAnchor="middle" fill="var(--fig-muted)">Promise が解決（拒否ならどちらかの検査で reject）</text>
      </g>
    </svg>
  )
}

/* ---------- 図 38-3 ログの経路 ---------- */
function LogTargetsFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="log プラグインの経路。Rust の log::info! と JS の info() の両方が tauri-plugin-log に集まり、Stdout（ターミナル）、LogDir（ファイル）、Webview（DevTools のコンソール）の各ターゲットへ振り分けられる">
      <defs>
        <marker id="arrow38c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="160" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="100" y="64" textAnchor="middle" fontWeight="600">Rust</text>
        <text x="100" y="86" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">log::info!("…")</text>
        <rect x="20" y="150" width="160" height="60" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="100" y="174" textAnchor="middle" fontWeight="600">JS</text>
        <text x="100" y="196" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">info('…') / console 転送</text>
        <path d="M180,70 L258,118" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38c)" />
        <path d="M180,180 L258,132" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38c)" />
        <text x="240" y="200" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">IPC（log:default）</text>
        <rect x="260" y="90" width="150" height="70" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="335" y="116" textAnchor="middle" fontWeight="600">tauri-plugin-log</text>
        <text x="335" y="136" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">level / filter / format</text>
        <path d="M410,110 L478,68" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38c)" />
        <path d="M410,125 L478,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38c)" />
        <path d="M410,140 L478,182" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow38c)" />
        <rect x="480" y="40" width="140" height="50" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="550" y="60" textAnchor="middle">Stdout</text>
        <text x="550" y="78" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">tauri dev の端末</text>
        <rect x="480" y="100" width="140" height="50" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="550" y="120" textAnchor="middle">LogDir</text>
        <text x="550" y="138" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">OS ごとのログ用フォルダ</text>
        <rect x="480" y="160" width="140" height="50" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="550" y="180" textAnchor="middle">Webview</text>
        <text x="550" y="198" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">attachConsole で表示</text>
      </g>
      <text x="320" y="245" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">既定のターゲットは Stdout と LogDir。Webview は attachConsole と組み合わせて使う（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 38,
  part: 5,
  title: '公式プラグインの活用',
  summary:
    'ファイル操作やダイアログ、設定の保存、通知、外部アプリでの表示、ログといった「OS の機能」は、Tauri 本体ではなく公式プラグインが提供します。プラグインが JS 側・Rust 側・permission の三点セットでできていることを理解し、tauri add からの導入手順と、fs・dialog・store・notification・opener・log の使い方を学びます。',
  goals: [
    '公式プラグインが JS パッケージ、Rust クレート、permission 定義の三つで構成されることを説明できる',
    'tauri add で行われる変更（Cargo.toml、lib.rs、package.json）と、capability への permission 追加を自分で確認できる',
    'fs プラグインのベースディレクトリとスコープの関係を理解し、安全な読み書きの設定が書ける',
    'dialog、store、notification、opener、log の基本的な呼び出しを JS と Rust の両方で書ける',
    '各プラグインのプラットフォーム対応表を読み、モバイルでの制約を把握できる',
  ],
  prerequisites: [34, 36, 37],
  sections: [
    {
      id: 'why-plugins',
      title: 'なぜプラグインに分かれているのか',
      body: (
        <>
          <p>
            Tauri の本体（<code>tauri</code> クレート）が持つのは、ウィンドウ、WebView、IPC、イベント、メニュー、トレイといった「アプリの骨格」です。ファイルを読む、ファイル選択ダイアログを出す、通知を出す、といった機能は本体に含まれず、<Term en="plugin">プラグイン</Term>として別のクレートとパッケージに分かれています。公式のプラグイン一覧は、こうした機能を「Tauri 組み込みの機能」（Official Features）として並べています。<Ref n={1} />
          </p>
          <p>
            分かれていることには利点があります。使わない機能のコードがバイナリに入らないこと、プラグインごとに更新できること、そして <ChapterLink n={37} /> で学んだ permission がプラグイン単位で定義され、使うものだけを capability に書けることです。Tauri 2.12 時点で公式プラグインは 30 種類ほどあり、本章では Tsumugi で使う6つを扱います。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>プラグイン</th>
                  <th>役割</th>
                  <th>Tsumugi での用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>fs</code>（File System）</td>
                  <td>ファイルとディレクトリの読み書き</td>
                  <td>Markdown の書き出し・読み込み</td>
                </tr>
                <tr>
                  <td><code>dialog</code></td>
                  <td>ネイティブのファイル選択・保存ダイアログ、メッセージダイアログ</td>
                  <td>書き出し先の選択、確認ダイアログ</td>
                </tr>
                <tr>
                  <td><code>store</code></td>
                  <td>キーと値の永続化</td>
                  <td>テーマなどの設定</td>
                </tr>
                <tr>
                  <td><code>notification</code></td>
                  <td>OS のネイティブ通知</td>
                  <td>書き出し完了の通知</td>
                </tr>
                <tr>
                  <td><code>opener</code></td>
                  <td>URL やファイルを外部アプリで開く</td>
                  <td>リンクをブラウザで開く、書き出したフォルダを表示</td>
                </tr>
                <tr>
                  <td><code>log</code>（Logging）</td>
                  <td>設定可能なログ出力</td>
                  <td>Rust と JS のログを1か所に集める</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            いずれも Tauri 2.12 時点で Rust 1.90 以上を要求します。<Ref n={1} /> 本書の基準である Rust 1.99 なら問題ありません。
          </p>
        </>
      ),
    },
    {
      id: 'anatomy',
      title: 'プラグインの構造：JS 側・Rust 側・permission',
      body: (
        <>
          <p>
            どのプラグインも同じ形をしています。まず全体を図で見てから、導入手順を追います。
          </p>
          <Figure n="38-1" title="公式プラグイン1つの構造" caption="上が JS 側の npm パッケージ、下が Rust 側のクレート。JS の関数は内部で invoke を呼び、Rust 側のコマンドが処理する。アプリ側は依存の追加、Builder への登録、capability への permission 追加を行う。模式図。">
            <PluginStructureFigure />
          </Figure>
          <ul>
            <li>
              JS 側：<code>@tauri-apps/plugin-&lt;name&gt;</code> という npm パッケージです。<code>readTextFile</code> のような型付きの関数を提供し、内部で <ChapterLink n={34} /> の <code>invoke</code> を呼びます。フロントエンドからは、この関数を <code>import</code> して呼ぶだけです。
            </li>
            <li>
              Rust 側：<code>tauri-plugin-&lt;name&gt;</code> というクレートです。コマンド本体とスコープの検査を含み、<code>permissions/</code> ディレクトリに既定の permission が同梱されています。<Ref n={3} /> Rust のコードから直接使う拡張トレイト（<code>app.dialog()</code> など）も提供します。
            </li>
            <li>
              permission：<ChapterLink n={37} /> で見たとおり、プラグイン名を接頭辞にした識別子（<code>fs:default</code>、<code>dialog:allow-open</code>）です。アプリの capability に書かなければ、JS 側からの呼び出しは拒否されます。
            </li>
          </ul>
          <h3>導入の段階</h3>
          <p>公式の各プラグインページは、導入を次の順で説明しています。<Ref n={2} /></p>
          <ol className="steps">
            <li>
              <code>npm run tauri add fs</code> のように Tauri CLI でプラグインを追加する。これが自動の方法で、以降の 2〜4 をまとめて行う。
            </li>
            <li>
              手動の場合、<code>src-tauri/</code> で <code>cargo add tauri-plugin-fs</code> を実行し、Rust 側の依存を加える。
            </li>
            <li>
              <code>src-tauri/src/lib.rs</code> の <code>tauri::Builder</code> に <code>.plugin(tauri_plugin_fs::init())</code> を追加して登録する。
            </li>
            <li>
              <code>npm install @tauri-apps/plugin-fs</code> で JS 側のバインディングを入れる。
            </li>
            <li>
              <code>src-tauri/capabilities/default.json</code> の <code>permissions</code> に <code>fs:default</code> と、必要な個別の permission を書く。
            </li>
          </ol>
          <p>
            <code>tauri add</code> を使ったときも、5 の capability は必ず自分の目で確認します。CLI は <code>default</code> permission を設定に追加しますが、<Ref n={3} /> 既定セットは安全側に寄せてあるため、書き込みなどの操作は手で足す必要があるからです。
          </p>
          <h3>呼び出しの流れ</h3>
          <p>
            1つの関数呼び出しがどう処理されるかを、fs プラグインの <code>writeTextFile</code> で追います。この図は <ChapterLink n={37} /> の runtime authority の手順を、プラグインの立場から描き直したものです。
          </p>
          <Figure n="38-2" title="writeTextFile が処理される流れ" caption="JS 側の関数は invoke を発行する。Core の runtime authority が capability に permission があるか確かめ、スコープを注入してプラグインのコマンドに渡す。コマンドはパスがスコープ内かを検査してからファイルに書く。どちらの検査で落ちても Promise は reject される。模式図。">
            <PluginCallFlowFigure />
          </Figure>
          <p>
            「permission の検査」と「スコープの検査」が別の場所で行われている点に注目してください。前者は Core、後者はプラグインのコマンドです。<Ref n={4} /> fs プラグインのページが「permission だけではファイルにアクセスできず、スコープがなければ <code>forbidden path</code> になる」と書いているのは、この2段構えのためです。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'fs',
      title: 'fs：ファイルシステム',
      body: (
        <>
          <p>
            fs プラグインは、ファイルの存在確認、読み書き、ディレクトリの作成と一覧、削除、変更の監視などを提供します。JS 側の関数は、パスとあわせて<Term en="base directory">ベースディレクトリ</Term>を受け取るのが特徴です。
          </p>
          <Code
            lang="ts"
            title="src/lib/files.ts（fs プラグインの基本）"
            code={`
import {
  BaseDirectory,
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/plugin-fs';

// $APPDATA/exports/ が無ければ作る
if (!(await exists('exports', { baseDir: BaseDirectory.AppData }))) {
  await mkdir('exports', { baseDir: BaseDirectory.AppData });
}

// $APPDATA/exports/note.md に書く
await writeTextFile('exports/note.md', '# メモ\\n', { baseDir: BaseDirectory.AppData });

// 読む
const text: string = await readTextFile('exports/note.md', { baseDir: BaseDirectory.AppData });
`}
          />
          <p>
            <code>baseDir</code> に <code>BaseDirectory.AppData</code> を指定すると、パスは <ChapterLink n={36} /> で学んだ <code>app_data_dir</code> からの相対になります。公式は、パスはベースディレクトリからの相対か、path API で組み立てたものでなければならず、親ディレクトリを指す <code>..</code> は含められない、と定めています。<Ref n={2} /> ユーザーがダイアログで選んだ絶対パスを渡す場合は <code>baseDir</code> を省きます。
          </p>
          <h3>スコープとベースディレクトリ変数</h3>
          <p>
            fs のスコープは <code>$APPDATA/*</code> のような glob パターンで、先頭の変数は JS 側の <code>BaseDirectory</code> と対応しています。<Ref n={2} /> 既定セット <code>fs:default</code> は、アプリ専用ディレクトリへの読み取りと作成を許し、<code>deny-default</code> を含みます。<Ref n={2} /> <code>deny-default</code> は Windows の <code>$APPLOCALDATA/EBWebView</code> のような WebView の内部データを守るための拒否スコープです。<Ref n={2} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>スコープ変数</th>
                  <th>JS の BaseDirectory</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>$APPDATA</code></td>
                  <td><code>AppData</code></td>
                  <td>アプリのデータ用ディレクトリ</td>
                </tr>
                <tr>
                  <td><code>$APPCONFIG</code></td>
                  <td><code>AppConfig</code></td>
                  <td>アプリの設定用ディレクトリ</td>
                </tr>
                <tr>
                  <td><code>$APPLOCALDATA</code></td>
                  <td><code>AppLocalData</code></td>
                  <td>端末ローカルのデータ用（WebView の内部データもここ）</td>
                </tr>
                <tr>
                  <td><code>$APPLOG</code></td>
                  <td><code>AppLog</code></td>
                  <td>ログ用ディレクトリ</td>
                </tr>
                <tr>
                  <td><code>$HOME</code>、<code>$DOCUMENT</code>、<code>$DOWNLOAD</code>、<code>$DESKTOP</code></td>
                  <td><code>Home</code>、<code>Document</code>、<code>Download</code>、<code>Desktop</code></td>
                  <td>ユーザーの一般的なフォルダ</td>
                </tr>
                <tr>
                  <td><code>$RESOURCE</code></td>
                  <td><code>Resource</code></td>
                  <td>同梱リソース（Linux と macOS では書き込み不可）</td>
                </tr>
                <tr>
                  <td><code>$TEMP</code></td>
                  <td><code>Temp</code></td>
                  <td>一時ファイル</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            permission は「操作 × ディレクトリ × 再帰かどうか」の組み合わせで自動生成されています。たとえば <code>fs:allow-appdata-write-recursive</code> は <code>$APPDATA</code> 配下への再帰的な書き込みをまとめて許す permission です。<Ref n={2} /> 一方、<code>fs:allow-write-text-file</code> はコマンドだけを許し、どのパスかはスコープで別に与えます。<Ref n={2} /> 公式チュートリアルは、ホーム全体を開く自動生成の permission ではなく、<code>$HOME/test.txt</code> だけを許す独自スコープを添える例を示しています。<Ref n={5} />
          </p>
          <Code
            lang="json"
            title="src-tauri/capabilities/default.json（fs の permission を足す）"
            code={`
{
  "identifier": "default",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:default",
    {
      "identifier": "fs:allow-write-text-file",
      "allow": [{ "path": "$HOME/**/*" }, { "path": "$DOCUMENT/**/*" }]
    },
    {
      "identifier": "fs:allow-read-text-file",
      "allow": [{ "path": "$HOME/**/*" }, { "path": "$DOCUMENT/**/*" }]
    }
  ]
}
`}
          />
          <h3>プラットフォームの違い</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>対応</th>
                  <th>注記</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Windows</td>
                  <td>対応</td>
                  <td>MSI／NSIS を perMachine または both モードで入れた場合、<code>$RESOURCES</code> への書き込みには管理者権限が必要</td>
                </tr>
                <tr>
                  <td>Linux、macOS</td>
                  <td>対応</td>
                  <td><code>$RESOURCES</code> への書き込みは不可</td>
                </tr>
                <tr>
                  <td>Android、iOS</td>
                  <td>一部対応</td>
                  <td>既定ではアプリのフォルダに限定される</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            モバイルでは追加の設定も必要です。Android で音声・画像・ダウンロードなどの公開フォルダを使うには <code>AndroidManifest.xml</code> に外部ストレージの権限を書き、iOS では <code>src-tauri/gen/apple</code> に <code>PrivacyInfo.xcprivacy</code> を置いてファイルのタイムスタンプ API の利用理由を宣言します。<Ref n={2} /> モバイル対応の詳細は <ChapterLink n={55} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'dialog',
      title: 'dialog：ネイティブのダイアログ',
      body: (
        <>
          <p>
            dialog プラグインは、OS 標準のファイル選択・保存ダイアログと、メッセージ・確認ダイアログを提供します。<Ref n={6} /> HTML の <code>&lt;input type="file"&gt;</code> と違い、選んだファイルの「パス」が返るので、そのまま fs プラグインや Rust 側のコマンドに渡せます。
          </p>
          <Code
            lang="ts"
            title="src/features/settings/export.ts（保存先を選んで書く）"
            code={`
import { ask, message, open, save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';

export async function exportMarkdown(markdown: string): Promise<void> {
  // 保存ダイアログ。キャンセルなら null
  const path: string | null = await save({
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  });
  if (path === null) return;
  await writeTextFile(path, markdown);
  await message('書き出しました', { title: 'Tsumugi', kind: 'info' });
}

export async function pickMarkdown(): Promise<string | null> {
  // 単一ファイルの選択。ディレクトリ選択は directory: true
  return open({ multiple: false, directory: false, filters: [{ name: 'Markdown', extensions: ['md'] }] });
}

export async function confirmDelete(): Promise<boolean> {
  return ask('このページと子ページを削除します。元に戻せません。', { title: '確認', kind: 'warning' });
}
`}
          />
          <p>
            <code>ask</code> は「はい／いいえ」、<code>confirm</code> は「OK／キャンセル」で、どちらも真偽値を返します。<code>message</code> は通知だけのダイアログです。<Ref n={6} /> <code>open</code> は <code>multiple: true</code> なら配列を、<code>directory: true</code> ならフォルダのパスを返します。
          </p>
          <p>Rust 側からも同じダイアログを出せます。コマンドの中で確認を取りたいときに使います。</p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/files.rs（Rust からファイルを選ぶ）"
            code={`
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub async fn pick_import_file(app: tauri::AppHandle) -> Option<String> {
    // blocking_pick_file はダイアログが閉じるまで待つ。async コマンドから呼ぶ
    app.dialog()
        .file()
        .add_filter("Markdown", &["md"])
        .blocking_pick_file()
        .map(|p| p.to_string())
}
`}
          />
          <p>
            <code>blocking_pick_file</code> はダイアログが閉じられると <code>None</code> を返し、ファイルが選ばれればそのパスを返します。<Ref n={6} /> 待たずにコールバックで受け取る <code>pick_file(|path| …)</code> もあります。<Ref n={6} />
          </p>
          <p>
            permission は <code>dialog:default</code> がすべてのダイアログを有効にします。<Ref n={6} /> <code>dialog:allow-ask</code> と <code>dialog:allow-confirm</code> は Tauri 2.12 時点で <code>allow-message</code> の別名として非推奨になっており、v3 で削除予定です。<Ref n={6} /> 対応は Windows、Linux、macOS が完全、Android と iOS は「フォルダ選択に非対応」の一部対応です。<Ref n={6} />
          </p>
        </>
      ),
    },
    {
      id: 'store',
      title: 'store：設定の永続化',
      body: (
        <>
          <p>
            store プラグインは、状態をファイルに永続化するキーと値のストアです。値は <code>serde_json::Value</code> として扱われるので、JSON で表せるものなら何でも入ります。<Ref n={7} /><Ref n={8} /> 設定画面のテーマや最後に開いたページのように、小さくて構造が単純なデータに向きます。本格的なデータは <ChapterLink n={42} /> の SQLite に置き、store は「設定」に限るのが使い分けです。
          </p>
          <Code
            lang="ts"
            title="src/features/settings/store.ts（設定の読み書き）"
            code={`
import { load } from '@tauri-apps/plugin-store';

type Theme = 'system' | 'light' | 'dark';

// 相対パスはアプリのデータディレクトリ基準で解決される
const store = await load('settings.json', { autoSave: true });

export async function getTheme(): Promise<Theme> {
  return (await store.get<Theme>('theme')) ?? 'system';
}

export async function setTheme(theme: Theme): Promise<void> {
  await store.set('theme', theme);
  // autoSave: true なので、短い遅延のあと自動で書き込まれる
}
`}
          />
          <p>
            <code>load</code> でストアを開き、<code>set</code> と <code>get</code> で読み書きします。<code>get</code> は型引数で戻り値の型を指定でき、キーが無ければ <code>undefined</code> なので <code>??</code> で既定値を補います。保存のタイミングは <code>autoSave</code> で決まり、公式によれば、数値または空の <code>autoSave</code> を指定すると既定 100 ms のデバウンス後に書き込まれ、手動で <code>save()</code> を呼ばなくても正常終了時には保存されます。<Ref n={7} /> 必要な場面まで読み込みを遅らせたいときは <code>new LazyStore('settings.json')</code> が使えます。<Ref n={7} />
          </p>
          <p>Rust 側では <code>StoreExt</code> トレイトで同じファイルにアクセスできます。値は <code>serde_json::Value</code> です。<Ref n={7} /></p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（setup で設定を読む）"
            code={`
use tauri_plugin_store::StoreExt;

tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(|app| {
        // 同じパスのストアが読み込み済みなら、その同じインスタンスが返る
        let store = app.store("settings.json")?;
        let theme = store.get("theme").and_then(|v| v.as_str().map(String::from));
        log::info!("theme = {theme:?}");
        Ok(())
    })
`}
          />
          <p>
            相対パスで指定したストアファイルは、プラグインの <code>resolve_store_path</code> によってアプリのデータディレクトリ基準で解決されます。<Ref n={8} /> permission は <code>store:default</code> で load、get、set、save などすべての操作が有効になります。<Ref n={7} /> 対応はデスクトップ3 OS とモバイル2 OS のすべてで完全です。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'notification-opener-log',
      title: 'notification・opener・log',
      body: (
        <>
          <h3>notification：ネイティブ通知</h3>
          <p>
            notification プラグインは OS の通知センターに通知を出します。通知は OS がユーザーの許可を管理するので、送る前に許可の有無を確かめ、無ければ要求する、という手順が必要です。<Ref n={9} />
          </p>
          <Code
            lang="ts"
            title="src/lib/notify.ts"
            code={`
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

export async function notify(title: string, body: string): Promise<void> {
  let granted = await isPermissionGranted();
  if (!granted) {
    const permission = await requestPermission();
    granted = permission === 'granted';
  }
  if (granted) {
    sendNotification({ title, body });
  }
}
`}
          />
          <p>
            Rust からは <code>NotificationExt</code> で <code>app.notification().builder().title("…").body("…").show()</code> と書きます。<Ref n={9} /> 対応は5つの OS すべてで完全ですが、Windows には「インストールされたアプリでのみ動作し、開発中は PowerShell の名前とアイコンで表示される」という注記があります。<Ref n={9} /> permission は <code>notification:default</code> が通知に関する機能をすべて許します。<Ref n={9} />
          </p>
          <Callout kind="unverified">
            <p>
              Windows の開発時に通知が PowerShell 名義で表示される挙動と、macOS で通知が表示される条件は、公式資料に基づく記述で、本書の制作環境では未検証です。
            </p>
          </Callout>
          <h3>opener：外部アプリで開く</h3>
          <p>
            opener プラグインは、URL を既定のブラウザで開く、ファイルを関連付けられたアプリで開く、ファイルをファイルマネージャで表示する、の3つを提供します。<Ref n={10} /> ノートアプリではリンクを WebView の中ではなく外のブラウザで開きたいので、必ず使うことになります。
          </p>
          <Code
            lang="ts"
            title="src/lib/open.ts"
            code={`
import { openPath, openUrl, revealItemInDir } from '@tauri-apps/plugin-opener';

await openUrl('https://v2.tauri.app');           // 既定のブラウザで開く
await openPath('/Users/me/Documents/note.md');    // 関連付けられたアプリで開く
await revealItemInDir('/Users/me/Documents/note.md'); // Finder などで場所を表示
`}
          />
          <p>
            Rust 側は <code>app.opener().open_url("https://tauri.app", None::&lt;&amp;str&gt;)</code> のように、第2引数で開くアプリ名を指定できます（<code>None</code> なら既定のアプリ）。<Ref n={10} />
          </p>
          <p>
            permission の既定セットは <code>allow-open-url</code>、<code>allow-reveal-item-in-dir</code>、<code>allow-default-urls</code> からなり、<code>mailto:</code>、<code>tel:</code>、<code>https://</code>、<code>http://</code> の URL を開くことと、ファイルの場所を表示することを許します。<Ref n={10} /> 任意のパスを開く <code>open-path</code> は既定に含まれないため、使うには fs と同じ形で <code>opener:allow-open-path</code> に <code>path</code> のスコープを添えて足します。<Ref n={10} />
          </p>
          <p>
            対応はデスクトップ3 OS が完全で、Android と iOS は「<code>open</code> による URL のオープンのみ」の一部対応です。<Ref n={10} />
          </p>
          <h3>log：Rust と JS のログを1か所に</h3>
          <p>
            開発中、Rust 側は <code>println!</code>、フロントエンドは <code>console.log</code> と、ログの出口が2つに分かれるのは不便です。log プラグインは両方のログを Rust の <code>log</code> クレートの仕組みに集め、ターミナル、ファイル、WebView のコンソールへ振り分けます。<Ref n={11} />
          </p>
          <Figure n="38-3" title="log プラグインの経路" caption="Rust の log::info! と JS の info() はどちらも tauri-plugin-log に集まり、level や filter を通ってターゲットへ出力される。既定のターゲットは Stdout と LogDir で、Webview ターゲットは attachConsole と組み合わせる。模式図。">
            <LogTargetsFigure />
          </Figure>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（log プラグインの登録）"
            code={`
use tauri_plugin_log::{Target, TargetKind};

tauri::Builder::default()
    .plugin(
        tauri_plugin_log::Builder::new()
            .level(log::LevelFilter::Info)
            .targets([
                Target::new(TargetKind::Stdout),
                Target::new(TargetKind::LogDir { file_name: Some("tsumugi".into()) }),
                Target::new(TargetKind::Webview),
            ])
            .build(),
    )
`}
          />
          <p>
            Rust 側では <code>Cargo.toml</code> に <code>log = "0.4"</code> を加え、<code>log::info!("…")</code> のようにマクロで記録します。<Ref n={11} /> JS 側は次のように使います。
          </p>
          <Code
            lang="ts"
            title="src/main.tsx（JS 側のログと console の転送）"
            code={`
import { attachConsole, info, warn, error } from '@tauri-apps/plugin-log';

// Rust 側のログを WebView の DevTools コンソールにも流す
await attachConsole();

info('フロントエンドを起動しました');

// console.* をそのままログに転送する（公式の forwardConsole の考え方）
function forward(name: 'log' | 'warn' | 'error', logger: (msg: string) => Promise<void>) {
  const original = console[name];
  console[name] = (message: string) => {
    original(message);
    void logger(message);
  };
}
forward('log', info);
forward('warn', warn);
forward('error', error);
`}
          />
          <p>
            ログファイルの置き場所は OS ごとに決まっています。<Ref n={11} /> Linux は <code>$XDG_DATA_HOME/{'{bundleIdentifier}'}/logs</code>（無ければ <code>$HOME/.local/share/…</code>）、macOS は <code>{'{homeDir}'}/Library/Logs/{'{bundleIdentifier}'}</code>、Windows は <code>{'{FOLDERID_LocalAppData}'}/{'{bundleIdentifier}'}/logs</code> です。ファイルは <code>max_file_size</code> に達すると既定では破棄され、<code>rotation_strategy(RotationStrategy::KeepAll)</code> で古いファイルを残せます。<Ref n={11} /> 時刻は既定で UTC で、<code>timezone_strategy(TimezoneStrategy::UseLocal)</code> でローカル時刻にできます。<Ref n={11} />
          </p>
          <p>
            permission は <code>log:default</code> が <code>log</code> コマンドを許します。<Ref n={11} /> 対応は5つの OS すべてで完全です。<Ref n={1} /> ログを使ったデバッグの進め方は <ChapterLink n={40} /> で続けます。
          </p>
        </>
      ),
    },
    {
      id: 'platform-table',
      title: 'プラットフォーム対応のまとめ',
      body: (
        <>
          <p>
            本章で扱ったプラグインと、<ChapterLink n={39} /> で使うものの対応状況を、公式一覧ページの表から写します。<Ref n={1} /> Tauri 2.12 時点の内容です。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>プラグイン</th>
                  <th>Windows</th>
                  <th>Linux</th>
                  <th>macOS</th>
                  <th>Android</th>
                  <th>iOS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>fs</code></td>
                  <td>完全（$RESOURCES の書き込みは条件付き）</td>
                  <td>完全（$RESOURCES 書き込み不可）</td>
                  <td>完全（$RESOURCES 書き込み不可）</td>
                  <td>一部（アプリのフォルダに限定）</td>
                  <td>一部（アプリのフォルダに限定）</td>
                </tr>
                <tr>
                  <td><code>dialog</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>一部（フォルダ選択不可）</td>
                  <td>一部（フォルダ選択不可）</td>
                </tr>
                <tr>
                  <td><code>store</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                </tr>
                <tr>
                  <td><code>notification</code></td>
                  <td>完全（インストール済みアプリのみ）</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                </tr>
                <tr>
                  <td><code>opener</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>一部（URL のみ）</td>
                  <td>一部（URL のみ）</td>
                </tr>
                <tr>
                  <td><code>log</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                </tr>
                <tr>
                  <td><code>window-state</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>非対応</td>
                  <td>非対応</td>
                </tr>
                <tr>
                  <td><code>global-shortcut</code></td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>完全</td>
                  <td>非対応</td>
                  <td>非対応</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            デスクトップ専用のプラグインは、<code>cargo add tauri-plugin-window-state --target 'cfg(any(target_os = "macos", windows, target_os = "linux"))'</code> のようにターゲットを限定して依存に加え、<code>lib.rs</code> では <code>#[cfg(desktop)]</code> の下で登録します。<Ref n={12} /> こうしておくと、<ChapterLink n={54} /> でモバイル向けにビルドしたときに、存在しない機能をリンクしようとして失敗することがありません。登録は <code>setup</code> の中で <code>app.handle().plugin(tauri_plugin_window_state::Builder::default().build())</code> と書き、その行に <code>#[cfg(desktop)]</code> を付けます。<Ref n={12} />
          </p>
          <p>
            公式の SQL プラグイン（対応表ではすべての OS で完全対応）は本書では使いません。全文検索や簡易データベースのロジックを Tauri に依存しない Rust のクレートに閉じ込めてテストしたいという設計上の理由から、<ChapterLink n={42} /> では <code>rusqlite</code> を Rust 側で直接使います。<Ref n={1} />
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
              Tsumugi の <code>src-tauri/src/lib.rs</code> では、<code>tauri::Builder::default()</code> に fs、dialog、store、notification、opener、log の6つを <code>.plugin(…)</code> で登録し、<code>setup</code> の中で <code>#[cfg(desktop)]</code> 付きで window-state を足します。<code>capabilities/default.json</code> の <code>permissions</code> は、<code>core:default</code> と各プラグインの <code>default</code> に、<code>fs:allow-write-text-file</code> と <code>fs:allow-read-text-file</code>（スコープは <code>$HOME/**/*</code> と <code>$DOCUMENT/**/*</code>）を加えた形です。なお本書に同梱するサンプルコード（<code>examples/tsumugi</code>）は、このうち fs、dialog、store、opener、window-state の5つだけを登録した最小構成です。notification と log はこの章の説明どおりに追加できます。
            </p>
            <p>
              Markdown の書き出し（<ChapterLink n={49} />）は、dialog の <code>save</code> で保存先を選び、Rust 側のコマンドで BlockNote の JSON を Markdown に変換した文字列を受け取り、fs の <code>writeTextFile</code> で書きます。読み込みはその逆で、<code>open</code> → <code>readTextFile</code> → Rust 側で Markdown をブロックに変換します。完了時に <code>sendNotification</code> で知らせ、<code>revealItemInDir</code> で保存先を表示するボタンを付けます。
            </p>
            <p>
              テーマ設定（<ChapterLink n={50} />）は store の <code>settings.json</code> に <code>theme</code> キーで保存します。ログは log プラグインで Rust 側の SQLite 操作と JS 側の自動保存の両方を記録し、<ChapterLink n={40} /> のデバッグで使います。画像の添付（<ChapterLink n={45} />）は fs プラグインではなく Rust 側のコマンドで <code>app_data_dir/attachments/</code> に保存します。保存先をアプリが決めるものは Rust 側で、ユーザーが選ぶものはプラグインで、という分担です。
            </p>
          </Callout>
          <Callout kind="unverified">
            <p>
              本章のコードは公式のプラグインページの API に合わせて書いています。Tsumugi が登録するプラグインのうち、fs の許可と拒否、store による設定の永続化は Linux 上で動作を確認しました。dialog のネイティブなダイアログ、opener、window-state による位置の復元、およびサンプルに含まれない notification と log は未検証です。
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
            <li>OS の機能は公式プラグインが提供する。各プラグインは JS パッケージ、Rust クレート、permission 定義の三点セットでできている。</li>
            <li>導入は <code>tauri add</code>（または Cargo と npm への追加）、<code>.plugin(…)</code> での登録、capability への permission 追加。既定セットは安全側なので、書き込みなどは個別に足す。</li>
            <li>fs はベースディレクトリ基準の相対パスで操作し、スコープは <code>$APPDATA</code> などの変数と glob で書く。permission とスコープの両方が必要。</li>
            <li>dialog はパスを返すのでそのまま fs や Rust に渡せる。store は JSON の設定ファイル、notification は許可の確認が先、opener は URL とファイルを外部アプリで開く。</li>
            <li>log は Rust と JS のログを1か所に集め、Stdout・LogDir・Webview へ振り分ける。</li>
            <li>デスクトップ専用のプラグインは <code>--target</code> と <code>#[cfg(desktop)]</code> で限定する。</li>
          </ul>
          <p>次章では、Tauri 本体が持つウィンドウ・メニュー・システムトレイの機能と、グローバルショートカットのプラグインを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Plugins (overview and platform support table)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '公式プラグインの一覧と説明、各プラグインの OS 対応表、Rust 1.90 の要件。',
    },
    {
      title: 'File System (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/file-system/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-fs 2.x',
      note: '導入手順、使用例、.. の禁止、ベースディレクトリ変数、fs:default と deny-default、permission だけでは forbidden path、対応表とモバイルの追加設定。',
    },
    {
      title: 'Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'プラグインの permissions ディレクトリ、CLI がプラグイン追加時に default を設定に加えること。',
    },
    {
      title: 'Command Scopes',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/scope/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'スコープの検査はコマンド自身が行うこと。',
    },
    {
      title: 'Using Plugin Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/security/using-plugin-permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'fs プラグインを追加し、$HOME/test.txt だけに限定したスコープを添える手順。',
    },
    {
      title: 'Dialog (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/dialog/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-dialog 2.x',
      note: '導入手順、ask・confirm・message・open・save の使い方、Rust の blocking_pick_file、既定 permission、allow-ask／allow-confirm の非推奨、対応表。',
    },
    {
      title: 'Store (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/store/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-store 2.x',
      note: '導入手順、load・set・get・save、autoSave のデバウンス、LazyStore、Rust の StoreExt、store:default の内容。',
    },
    {
      title: 'tauri_plugin_store (docs.rs)',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri-plugin-store/latest/tauri_plugin_store/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-store 2.x',
      note: 'resolve_store_path がアプリのデータディレクトリ基準でパスを解決すること。',
    },
    {
      title: 'Notification (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/notification/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-notification 2.x',
      note: '導入手順、許可の確認と要求、sendNotification、Rust の builder、Windows の注記、既定 permission。',
    },
    {
      title: 'Opener (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/opener/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-opener 2.x',
      note: '導入手順、openPath・openUrl・revealItemInDir、Rust の open_url、既定 permission の内容、スコープ付き allow-open-path の例、対応表。',
    },
    {
      title: 'Logging (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/logging/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-log 2.x',
      note: '導入手順、JS の関数と console 転送、attachConsole、log クレート、ターゲットの種類と既定、OS ごとのログディレクトリ、max_file_size・rotation_strategy・timezone_strategy、log:default。',
    },
    {
      title: 'Window State (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/window-state/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-window-state 2.x',
      note: '--target でデスクトップに限定した cargo add と #[cfg(desktop)] での登録、window-state:default。',
    },
  ],
}

export default chapter
