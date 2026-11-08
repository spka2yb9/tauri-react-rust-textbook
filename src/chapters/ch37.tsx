import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 37-1 信頼境界 ---------- */
function TrustBoundaryFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Tauri アプリの信頼境界。左の WebView（フロントエンド）は信頼度が低く、IPC を通してしか Core に届かない。中央の Core（Rust）が権限を判断し、右の OS 資源（ファイル、ダイアログ、ネットワーク）にアクセスする">
      <defs>
        <marker id="arrow37a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* WebView */}
      <rect x="20" y="50" width="190" height="190" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="115" y="78" fontSize="15" fontWeight="600" textAnchor="middle">WebView</text>
      <text x="115" y="98" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">フロントエンド（JS/React）</text>
      <rect x="40" y="115" width="150" height="34" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="115" y="137" fontSize="12" textAnchor="middle">自分のコード</text>
      <rect x="40" y="157" width="150" height="34" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
      <text x="115" y="179" fontSize="12" textAnchor="middle">npm の依存パッケージ</text>
      <text x="115" y="222" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">信頼度：低</text>
      {/* 境界線 */}
      <line x1="245" y1="30" x2="245" y2="270" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="8 5" />
      <text x="245" y="22" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">信頼境界</text>
      {/* IPC 矢印 */}
      <path d="M210,145 L278,145" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37a)" />
      <text x="244" y="135" fontSize="12" textAnchor="middle">IPC</text>
      {/* Core */}
      <rect x="280" y="50" width="190" height="190" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="375" y="78" fontSize="15" fontWeight="600" textAnchor="middle">Core（Rust）</text>
      <text x="375" y="98" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">コマンド・プラグイン</text>
      <rect x="300" y="115" width="150" height="34" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="375" y="137" fontSize="12" textAnchor="middle">runtime authority</text>
      <text x="375" y="170" fontSize="12" textAnchor="middle">許可？ → 実行</text>
      <text x="375" y="188" fontSize="12" textAnchor="middle">拒否 → 呼ばれない</text>
      <text x="375" y="222" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">信頼度：高（制限なし）</text>
      {/* OS */}
      <path d="M470,145 L538,145" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37a)" />
      <rect x="540" y="50" width="80" height="190" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="580" y="78" fontSize="14" fontWeight="600" textAnchor="middle">OS</text>
      <text x="580" y="120" fontSize="12" textAnchor="middle">ファイル</text>
      <text x="580" y="145" fontSize="12" textAnchor="middle">ダイアログ</text>
      <text x="580" y="170" fontSize="12" textAnchor="middle">通知</text>
      <text x="580" y="195" fontSize="12" textAnchor="middle">ネット</text>
      <text x="320" y="290" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：WebView から OS 資源へ届く道は IPC だけで、通すかどうかは Core が決める</text>
    </svg>
  )
}

/* ---------- 図 37-2 window → capability → permission → scope ---------- */
function AclFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="ウィンドウ、capability、permission、スコープの関係図。main というラベルのウィンドウに capability が結び付き、capability は複数の permission を列挙し、permission はコマンドの allow か deny とスコープの allow・deny を持つ">
      <defs>
        <marker id="arrow37b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* window */}
        <rect x="20" y="40" width="130" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="85" y="66" textAnchor="middle" fontWeight="600">ウィンドウ</text>
        <text x="85" y="88" textAnchor="middle" fill="var(--fig-muted)">label: "main"</text>
        <rect x="20" y="130" width="130" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="85" y="156" textAnchor="middle" fontWeight="600">ウィンドウ</text>
        <text x="85" y="178" textAnchor="middle" fill="var(--fig-muted)">label: "settings"</text>
        {/* capability */}
        <path d="M150,75 L208,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37b)" />
        <text x="179" y="64" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">windows</text>
        <rect x="210" y="30" width="170" height="180" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="295" y="56" textAnchor="middle" fontWeight="600">capability</text>
        <text x="295" y="76" textAnchor="middle" fill="var(--fig-muted)">identifier: "default"</text>
        <text x="295" y="100" textAnchor="middle" fontSize="12">platforms: 省略＝全 OS</text>
        <text x="295" y="120" textAnchor="middle" fontSize="12">remote: 省略＝ローカルのみ</text>
        <text x="295" y="150" textAnchor="middle" fontSize="12">permissions: [</text>
        <text x="295" y="166" textAnchor="middle" fontSize="12">"core:default",</text>
        <text x="295" y="182" textAnchor="middle" fontSize="12">"fs:default", …</text>
        <text x="295" y="198" textAnchor="middle" fontSize="12">]</text>
        {/* permission */}
        <path d="M380,115 L438,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37b)" />
        <text x="409" y="104" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">列挙</text>
        <rect x="440" y="30" width="180" height="170" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="530" y="56" textAnchor="middle" fontWeight="600">permission</text>
        <text x="530" y="76" textAnchor="middle" fill="var(--fig-muted)">fs:allow-write-text-file</text>
        <rect x="455" y="90" width="150" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="530" y="107" textAnchor="middle" fontSize="12">commands.allow</text>
        <text x="530" y="123" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">write_text_file</text>
        <rect x="455" y="140" width="150" height="50" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="530" y="157" textAnchor="middle" fontSize="12">スコープ</text>
        <text x="530" y="173" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">allow / deny の path</text>
        {/* 下段 説明 */}
        <rect x="20" y="230" width="600" height="90" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="252" textAnchor="middle" fontSize="13">判定の順序（runtime authority）</text>
        <text x="320" y="274" textAnchor="middle" fontSize="12">1. 呼び出し元のウィンドウ／WebView を特定 → 2. そのウィンドウに付いた capability を集める</text>
        <text x="320" y="292" textAnchor="middle" fontSize="12">→ 3. その中にコマンドを許す permission があるか</text>
        <text x="320" y="310" textAnchor="middle" fontSize="12">→ 4. スコープがあれば注入してコマンドへ（deny が優先）</text>
      </g>
    </svg>
  )
}

/* ---------- 図 37-3 CSP の働き ---------- */
function CspFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="CSP の働き。WebView に読み込まれた HTML がスクリプトや画像を取得しようとするとき、CSP の許可リストに合う自分のファイルや asset プロトコルは通り、外部 CDN のスクリプトはブロックされる">
      <defs>
        <marker id="arrow37c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="200" height="220" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="120" y="66" textAnchor="middle" fontWeight="600">WebView のページ</text>
        <text x="120" y="86" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">index.html（ビルド済み）</text>
        <rect x="35" y="100" width="170" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="120" y="120" textAnchor="middle" fontSize="12">script: /assets/app.js</text>
        <rect x="35" y="140" width="170" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="120" y="160" textAnchor="middle" fontSize="12">img: asset://…/photo.png</text>
        <rect x="35" y="180" width="170" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="120" y="200" textAnchor="middle" fontSize="12">script: https://cdn.example</text>
        <rect x="35" y="220" width="170" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="120" y="240" textAnchor="middle" fontSize="12">fetch: ipc://localhost</text>
        {/* CSP wall */}
        <rect x="270" y="40" width="130" height="220" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="335" y="66" textAnchor="middle" fontWeight="600">CSP</text>
        <text x="335" y="86" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">許可リスト</text>
        <text x="335" y="115" textAnchor="middle" fontSize="12">default-src 'self'</text>
        <text x="335" y="135" textAnchor="middle" fontSize="12">img-src asset:</text>
        <text x="335" y="155" textAnchor="middle" fontSize="12">connect-src ipc:</text>
        <text x="335" y="185" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">＋ Tauri が追加する</text>
        <text x="335" y="203" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">ハッシュと nonce</text>
        {/* arrows */}
        <path d="M220,115 L268,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        <path d="M400,115 L458,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        <path d="M220,155 L268,155" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        <path d="M400,155 L458,155" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        <path d="M220,195 L268,195" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="5 3" />
        <line x1="250" y1="182" x2="268" y2="208" stroke="var(--fig-danger)" strokeWidth="2" />
        <line x1="268" y1="182" x2="250" y2="208" stroke="var(--fig-danger)" strokeWidth="2" />
        <path d="M220,235 L268,235" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        <path d="M400,235 L458,235" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37c)" />
        {/* results */}
        <rect x="460" y="95" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="120" textAnchor="middle" fontSize="12">読み込まれる</text>
        <rect x="460" y="135" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="160" textAnchor="middle" fontSize="12">読み込まれる</text>
        <text x="540" y="200" textAnchor="middle" fontSize="12" fill="var(--fig-danger)">ブロック（許可外の送信元）</text>
        <rect x="460" y="215" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="240" textAnchor="middle" fontSize="12">IPC が通る</text>
      </g>
      <text x="320" y="288" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：許可された送信元　破線と×：CSP に無い送信元は WebView が拒否する（模式図）</text>
    </svg>
  )
}

/* ---------- 図 37-4 isolation パターン ---------- */
function IsolationFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="isolation パターンのメッセージの流れ。フロントエンドの invoke はまずサンドボックス化された iframe 内の isolation アプリに渡され、フックで検査・加工され、AES-GCM で暗号化されてから Core に届き、Core が復号してコマンドを実行する">
      <defs>
        <marker id="arrow37d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="60" width="150" height="110" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="95" y="86" textAnchor="middle" fontWeight="600">フロントエンド</text>
        <text x="95" y="108" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">invoke('cmd', args)</text>
        <text x="95" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">依存パッケージ込み</text>

        <path d="M170,115 L233,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37d)" />
        <text x="204" y="104" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">平文</text>

        <rect x="235" y="40" width="180" height="150" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="325" y="64" textAnchor="middle" fontWeight="600">isolation アプリ</text>
        <text x="325" y="82" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">sandbox 付き iframe</text>
        <rect x="241" y="95" width="168" height="34" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="325" y="117" textAnchor="middle" fontSize="12">__TAURI_ISOLATION_HOOK__</text>
        <text x="325" y="150" textAnchor="middle" fontSize="12">検査・書き換え</text>
        <text x="325" y="170" textAnchor="middle" fontSize="12">→ AES-GCM で暗号化</text>

        <path d="M415,115 L478,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow37d)" />
        <text x="444" y="104" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">暗号文</text>

        <rect x="480" y="60" width="140" height="110" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="550" y="86" textAnchor="middle" fontWeight="600">Core</text>
        <text x="550" y="108" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">復号して検証</text>
        <text x="550" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">→ コマンド実行</text>
      </g>
      <text x="320" y="225" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">鍵は起動のたびに新しく生成されるので、事前に鍵を読んで暗号文を改変することはできない</text>
      <text x="320" y="245" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：既定の brownfield パターンではこの iframe は存在せず、invoke はそのまま Core に届く</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 37,
  part: 5,
  title: 'セキュリティモデル：capabilities・permissions・CSP',
  summary:
    'Tauri は WebView で動くフロントエンドを「信頼しない」前提で設計されています。どのウィンドウがどのコマンドを呼べるかを決める capability・permission・スコープの三層と、それを実行時に判定する runtime authority、そして WebView 側を守る CSP と isolation パターンを、設定ファイルを読みながら理解します。',
  goals: [
    'Tauri の信頼境界がどこにあり、なぜフロントエンドを信頼しないのかを説明できる',
    'capability・permission・スコープの役割の違いと、ウィンドウからコマンドまでの結び付きを図で説明できる',
    'capability ファイルを読み、ウィンドウラベルやプラットフォームで適用範囲を絞る書き方が分かる',
    'deny が allow に優先する規則と、既定で拒否される仕組みを理解している',
    'CSP の設定が何を防ぎ、asset プロトコルや IPC のためにどの送信元を許す必要があるかを説明できる',
    'isolation パターンが何を守り、どんな制約があるかを概説できる',
  ],
  prerequisites: [33, 34, 36],
  sections: [
    {
      id: 'why-security',
      title: 'なぜフロントエンドを信頼しないのか',
      body: (
        <>
          <p>
            <ChapterLink n={33} /> で見たとおり、Tauri アプリは Rust で書かれた Core と、OS の WebView 上で動くフロントエンドの2つの部分でできています。両者は IPC でつながっていて、フロントエンドは <code>invoke</code> でコマンドを呼び、Rust 側がファイルやネットワークといった OS の資源を操作します（<ChapterLink n={34} />）。
          </p>
          <p>
            では、フロントエンドが「どんなコマンドでも」呼べてよいのでしょうか。公式のセキュリティ概要は、Tauri のセキュリティモデルが「アプリの Core 向けに書かれた Rust コード」と「フロントエンドのコード」を区別すると述べています。<Ref n={1} /> フロントエンドには npm から入れた大量の依存パッケージが含まれ、その一つが乗っ取られれば WebView の中では何でも実行できてしまうからです。
          </p>
          <p>
            このような、データや実行の信頼度が切り替わる地点を<Term en="trust boundary">信頼境界</Term>と呼びます。<Ref n={1} /> Tauri では WebView と Core の間がその境界で、IPC 層が「境界が破られないこと」を保証します。WebView の中で動くコードは「IPC を通して公開された資源にしか触れられない」のに対し、プラグインや Core の Rust コードは OS 資源に制限なくアクセスできます。<Ref n={1} />
          </p>
          <Figure n="37-1" title="Tauri アプリの信頼境界" caption="WebView（左）と Core（右）の間に信頼境界がある。WebView から OS 資源へ届く道は IPC だけで、通すかどうかを Core の runtime authority が判断する。模式図。">
            <TrustBoundaryFigure />
          </Figure>
          <p>
            図の左側では自分のコードと依存パッケージを区別できません。だから判断は右側の Core で行います。この章で学ぶ capability・permission・スコープはその判断の材料で、CSP と isolation パターンは左側そのものを固くする仕組みです。
          </p>
        </>
      ),
    },
    {
      id: 'three-layers',
      title: 'capability・permission・スコープの三層',
      body: (
        <>
          <p>
            Tauri 2 の権限の仕組みは、三つの部品でできています。役割がはっきり分かれているので、まず定義をそろえます。
          </p>
          <ul>
            <li>
              <Term en="permission">permission（権限）</Term>：「コマンドに対する明示的な特権の記述」です。<Ref n={3} /> コマンドの許可または拒否、スコープの定義、あるいはその両方を表します。識別子は <code>fs:allow-read-text-file</code> のように「プラグイン名:権限名」の形で、プラグインの既定セットは <code>fs:default</code> のように <code>:default</code> で終わります。<Ref n={3} />
            </li>
            <li>
              <Term en="scope">スコープ</Term>：コマンドが「何に対して」許されるかを細かく定める追加情報です。<Ref n={4} /> たとえばファイルシステムのプラグインでは、アクセスしてよいパスのパターンがスコープです。
            </li>
            <li>
              <Term en="capability">capability</Term>：permission をまとめて、「どのウィンドウまたは WebView に対して」与えるかを決める単位です。公式は「どのウィンドウや WebView に、どの permission を与えるか、または拒否するかを定義する」と説明しています。<Ref n={2} />
            </li>
          </ul>
          <p>
            三つの関係を図にします。左から右へ、ウィンドウ → capability → permission → スコープの順に読みます。
          </p>
          <Figure n="37-2" title="ウィンドウ・capability・permission・スコープの関係" caption="ウィンドウはラベル（label）で capability に結び付く。capability は permission の一覧を持ち、各 permission はコマンドの allow／deny と、必要ならスコープの allow／deny を持つ。下段は実行時の判定順序。模式図。">
            <AclFigure />
          </Figure>
          <p>
            大切なのは「既定ではすべて閉じている」ことです。各プラグインのページは「危険になりうるコマンドとスコープは既定でブロックされ、capability で有効にしなければ使えない」と述べています。<Ref n={11} />
          </p>
          <h3>permission の中身</h3>
          <p>
            permission は TOML で書かれ、<Ref n={3} /> ふつうはプラグインが用意したものを使います。構造を知るために、公式の fs プラグインの例を1つ見ます。
          </p>
          <Code
            lang="toml"
            title="permissions/allow-mkdir.toml（プラグイン側に同梱される permission の例）"
            code={`
[[permission]]
identifier = "allow-mkdir"
description = "This enables the mkdir command."
commands.allow = ["mkdir"]
`}
          />
          <p>
            <code>commands.allow</code> にコマンド名が並びます。スコープ付きの permission では <code>[[permission.scope.allow]]</code> や <code>[[permission.scope.deny]]</code> にキーと値を書きます。<Ref n={3} /> 複数の permission を束ねて新しい識別子を付けたものが<Term en="permission set">permission セット</Term>で、各プラグインの <code>default</code> はこの形です。<Ref n={3} /> fs の <code>default</code> は <code>read-all</code>、<code>scope-app-recursive</code>、<code>deny-default</code> を束ねたもので、<Ref n={12} /> Tauri CLI でプラグインを追加すると自動で設定に加えられます。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'capability-file',
      title: 'capability ファイルを読む',
      body: (
        <>
          <p>
            capability は <code>src-tauri/capabilities/</code> に置く JSON（JSON5 可）または TOML のファイルで、既定ですべて自動的に有効になります。<Ref n={2} /> 公式ページの例を読みます。
          </p>
          <Code
            lang="json"
            title="src-tauri/capabilities/default.json"
            code={`
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:path:default",
    "core:event:default",
    "core:window:default",
    "core:app:default",
    "core:resources:default",
    "core:menu:default",
    "core:tray:default",
    "core:window:allow-set-title"
  ]
}
`}
          />
          <p>各フィールドの意味は ACL のリファレンスで次のように定義されています。<Ref n={7} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>フィールド</th>
                  <th>型・既定値</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>identifier</code></td>
                  <td>文字列、必須</td>
                  <td>capability の識別子</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td>文字列</td>
                  <td>この capability が何を許すつもりかの説明</td>
                </tr>
                <tr>
                  <td><code>windows</code></td>
                  <td>文字列の配列</td>
                  <td>対象のウィンドウラベル。glob パターン可。該当ウィンドウ内のすべての WebView に適用</td>
                </tr>
                <tr>
                  <td><code>webviews</code></td>
                  <td>文字列の配列</td>
                  <td>対象の WebView ラベル。ウィンドウのラベルに関係なく適用</td>
                </tr>
                <tr>
                  <td><code>permissions</code></td>
                  <td>配列、必須</td>
                  <td>permission の識別子、またはスコープを添えたオブジェクト</td>
                </tr>
                <tr>
                  <td><code>platforms</code></td>
                  <td>配列、省略時は全プラットフォーム</td>
                  <td><code>macOS</code>、<code>windows</code>、<code>linux</code>、<code>android</code>、<code>iOS</code> で対象 OS を限定</td>
                </tr>
                <tr>
                  <td><code>local</code></td>
                  <td>真偽値、既定 <code>true</code></td>
                  <td>ローカルのアプリ URL に対して有効かどうか</td>
                </tr>
                <tr>
                  <td><code>remote</code></td>
                  <td>オブジェクト、既定は未設定</td>
                  <td><code>urls</code> に列挙したリモートの URL にも permission を与える</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>$schema</code> は <code>tauri-build</code> が <code>gen/schemas/</code> に生成する JSON スキーマで、そのアプリで使える全 permission が列挙され、エディタの補完に使えます。<Ref n={2} />
          </p>
          <h3>ウィンドウとプラットフォームで絞る</h3>
          <p>
            公式のチュートリアルは、<code>first</code> と <code>second</code> の2つのウィンドウを作り、ファイル読み取りの capability を <code>first</code> だけに、さらに Linux と Windows だけに限定する例を示しています。<Ref n={8} />
          </p>
          <Code
            lang="json"
            title="src-tauri/capabilities/fs-read-home.json（ウィンドウと OS を絞った例）"
            code={`
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "fs-read-home",
  "description": "first ウィンドウだけにホームディレクトリの読み取りを許す",
  "windows": ["first"],
  "platforms": ["linux", "windows"],
  "permissions": ["fs:allow-home-read"]
}
`}
          />
          <p>
            境界は「ウィンドウのラベル」で決まり、タイトルではありません。<Ref n={2} /> ラベルは <ChapterLink n={39} /> で学ぶウィンドウ作成時の識別子です。同じウィンドウが複数の capability に含まれる場合、permission は合算されます。<Ref n={2} /> また公式は、新しいウィンドウを作る権限は特権の高いウィンドウだけに与えるよう勧めています。<Ref n={2} /> 自由にウィンドウを作れると、強い capability が付いたラベルを名乗れてしまうからです。
          </p>
          <h3>リモート URL への開放</h3>
          <p>
            既定では、アプリに同梱したコード（ローカル URL）だけが IPC を使えます。<Ref n={2} /> リモートのページにも開くときは <code>remote.urls</code> に URLPattern 標準のパターン（<code>https://*.mydomain.dev</code>、<code>https://mydomain.dev/api/*</code> など）を書きます。<Ref n={7} />
          </p>
          <Callout kind="warn">
            <p>
              公式は「リモートの送信元にローカルのシステムアクセスを与えることの影響を理解するように」と注意しています。<Ref n={7} /> Linux と Android では、埋め込んだ <code>&lt;iframe&gt;</code> からの要求とウィンドウ自身からの要求を Tauri が区別できません。<Ref n={2} />
            </p>
          </Callout>
          <h3>tauri.conf.json で明示的に選ぶ</h3>
          <p>
            使う capability を <code>tauri.conf.json</code> に列挙することもでき、明示すると列挙したものだけがビルドに含まれます。<Ref n={2} />
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（抜粋）"
            code={`
{
  "app": {
    "security": {
      "capabilities": ["my-capability", "main-capability"]
    }
  }
}
`}
          />
        </>
      ),
    },
    {
      id: 'scope-and-deny',
      title: 'スコープと deny の優先',
      body: (
        <>
          <p>
            「ファイルを読める」という permission だけでは、どのファイルかが決まりません。公式はスコープを「Tauri コマンドの許される／許されない振る舞いを細かく定義する方法」と説明しています。<Ref n={4} /> 型はプラグインごとに異なり（<code>serde</code> でシリアライズできる任意の型）、fs では glob 形式のパス文字列です。<Ref n={4} />
          </p>
          <p>
            スコープには <code>allow</code> と <code>deny</code> があり、「<code>deny</code> は常に <code>allow</code> スコープに優先する」のが規則です。<Ref n={4} /> 公式は「<code>$APPLOCALDATA</code> 配下は許すが、WebView データが入る <code>EBWebView</code> フォルダ（Windows）は拒む」例を示しています。<Ref n={4} />
          </p>
          <Code
            lang="toml"
            title="スコープを持つ permission の例（fs プラグインの考え方を簡略化）"
            code={`
[[permission]]
identifier = "scope-applocaldata-recursive"
description = "$APPLOCALDATA 配下への再帰的なアクセスを許す"

[[permission.scope.allow]]
path = "$APPLOCALDATA/**"

[[permission]]
identifier = "deny-webview-data-windows"
description = "WebView の内部データが入るフォルダは拒む"

[[permission.scope.deny]]
path = "$APPLOCALDATA/EBWebView/**"
`}
          />
          <p>
            capability 側では、permission をオブジェクトで書いてスコープを追加できます。<Ref n={7} />
          </p>
          <Code
            lang="json"
            title="capability の permissions にスコープを添える"
            code={`
"permissions": [
  "fs:default",
  {
    "identifier": "fs:allow-exists",
    "allow": [{ "path": "$APPDATA/*" }]
  }
]
`}
          />
          <p>
            これで <code>exists</code> コマンドが <code>$APPDATA</code> の直下に対してだけ許されます（サブディレクトリは <code>*</code> に一致しません）。<Ref n={11} /> <code>$APPDATA</code> は <ChapterLink n={36} /> のアプリ用ディレクトリに対応する「ベースディレクトリ変数」で、一覧は <ChapterLink n={38} /> で扱います。
          </p>
          <Callout kind="warn" title="permission だけでは足りない">
            <p>
              fs プラグインのページは、<code>fs:allow-exists</code> のようなコマンド permission を与えても、対応する <code>allow</code> スコープがなければ <code>forbidden path</code> エラーで失敗する、と明記しています。<Ref n={11} />
            </p>
          </Callout>
          <h3>スコープを守るのはコマンド自身</h3>
          <p>
            公式は「スコープはコマンドに渡され、それを扱い正しく適用するのはコマンド自身の実装である」と述べ、スコープの迂回がないことを確認するよう求めています。<Ref n={4} /> 公式プラグインは検査を内蔵していますが、自作コマンドでパスを受け取るときは自分で検証を書きます。<ChapterLink n={45} /> の画像の保存先がその実例です。
          </p>
        </>
      ),
    },
    {
      id: 'runtime-authority',
      title: '実行時の判定：runtime authority',
      body: (
        <>
          <p>
            設定を実行時に照合するのが <Term en="runtime authority">runtime authority</Term> です。公式はこれを Tauri Core の一部で「すべての permission、capability、スコープを実行時に保持し、どのウィンドウがどのコマンドを呼べるかを決める」ものと説明しています。<Ref n={6} /> <code>invoke</code> からコマンドまでの手順は次のとおりです。<Ref n={6} />
          </p>
          <ol className="steps">
            <li>invoke 要求を受け取る。</li>
            <li>要求の送信元（どのウィンドウ・WebView・URL か）が、そのコマンドを使うことを許されているか確かめる。</li>
            <li>送信元が capability に含まれているか、そのコマンドにスコープが定義されているかを調べる。</li>
            <li>スコープがあれば、それを invoke 要求に注入する。</li>
            <li>該当する Tauri コマンドに要求を渡す。</li>
          </ol>
          <p>
            許可がなければ要求はここで拒否され、コマンドは一度も呼ばれません。<Ref n={6} /> フロントエンド側では、この拒否は <code>invoke</code> の Promise が reject される形で現れます（公式ページは「要求を拒否し、コマンドは呼ばれない」までを述べています）。「<code>fs.write_text_file not allowed</code>」のようなメッセージが出たら、permission が適用されていない可能性を疑います。<Ref n={12} />
          </p>
          <h3>Core が提供する permission</h3>
          <p>
            Tauri 本体の機能にも permission があり、識別子は <code>core:</code> で始まります。<code>core:default</code> は各機能の既定セットをまとめた permission セットです。<Ref n={9} /> 既定セットは取得系に寄せてあり、タイトル変更やウィンドウを閉じる操作、新しいウィンドウの作成は個別に足します。<Ref n={9} /> <Ref n={10} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>セット</th>
                  <th>既定で許されるコマンドの例</th>
                  <th>個別に足す例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>core:window:default</code></td>
                  <td>inner-size、is-maximized、title、theme など取得系</td>
                  <td><code>core:window:allow-set-title</code>、<code>core:window:allow-close</code></td>
                </tr>
                <tr>
                  <td><code>core:event:default</code></td>
                  <td>listen、unlisten、emit、emit-to</td>
                  <td>（<code>core:event:deny-listen</code> で拒否もできる）</td>
                </tr>
                <tr>
                  <td><code>core:webview:default</code></td>
                  <td>get-all-webviews、webview-size など</td>
                  <td><code>core:webview:allow-create-webview-window</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            アプリ自身が <code>#[tauri::command]</code> で定義したコマンドは、<code>invoke_handler</code> に登録すれば既定ですべてのウィンドウから呼べます。<Ref n={2} /> 個別の permission を付けたい場合は <code>src-tauri/permissions/</code> に TOML を置きますが、<Ref n={3} /> 本書では作りません。
          </p>
        </>
      ),
    },
    {
      id: 'csp',
      title: 'CSP：WebView 側の防壁',
      body: (
        <>
          <p>
            ここまでは「Core に届く要求を絞る」話でした。もう一つ、WebView の中で何が読み込まれるかを絞る仕組みがあります。<Term en="Content Security Policy">CSP</Term>は、ページがスクリプト・画像・接続先をどの送信元から取得してよいかを WebView に伝えるウェブ標準で、Tauri は攻撃対象面を狭める汎用的な手段としてこれを提供しています。<Ref n={1} />
          </p>
          <p>
            CSP は <code>tauri.conf.json</code> の <code>app.security.csp</code> に書き、「設定ファイルに設定された場合にだけ有効になる」ものです。<Ref n={5} /> 開発中だけ別の値にするには <code>devCsp</code> を使います。<Ref n={13} />
          </p>
          <Figure n="37-3" title="CSP の働き" caption="ページがスクリプトや画像を取得するとき、WebView は CSP の許可リストと照合する。自分のファイル（'self'）と asset プロトコルは通り、許可外の CDN のスクリプトはブロックされる。IPC の接続先も connect-src に書く必要がある。模式図。">
            <CspFigure />
          </Figure>
          <p>
            図の中央の「Tauri が追加するハッシュと nonce」が Tauri 固有の点です。ビルド時にローカルのスクリプトはハッシュで、スタイルと外部スクリプトは nonce で参照され、Tauri がそれらを自動で CSP に加えるので、開発者が書くのは許したい送信元だけです。<Ref n={5} /> 公式の <code>api</code> サンプルの設定を見ます。
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（公式 api サンプルの CSP）"
            code={`
{
  "app": {
    "security": {
      "csp": {
        "default-src": "'self' customprotocol: asset:",
        "connect-src": "ipc: http://ipc.localhost",
        "font-src": ["https://fonts.gstatic.com"],
        "img-src": "'self' asset: http://asset.localhost blob: data:",
        "style-src": "'unsafe-inline' 'self' https://fonts.googleapis.com"
      }
    }
  }
}
`}
          />
          <p>
            値は1本の文字列でも、ディレクティブごとのオブジェクトでも書けます。<Ref n={13} /> 読み方のポイントは2つです。
          </p>
          <ul>
            <li>
              <code>connect-src</code> の <code>ipc:</code> と <code>http://ipc.localhost</code> は IPC の接続先です。これを忘れると <code>invoke</code> 自体が止まります。
            </li>
            <li>
              <code>img-src</code> の <code>asset:</code> と <code>http://asset.localhost</code> は、ディスク上のファイルを WebView に見せる asset プロトコルの許可です。asset プロトコル自体は <code>app.security.assetProtocol</code> で <code>enable: true</code> にし、公開してよいパスを <code>scope</code> に書くことで有効になり、ここでも <code>deny</code> が <code>allow</code> に優先します。<Ref n={14} />
            </li>
          </ul>
          <Callout kind="warn">
            <p>
              公式は「CDN から配信されるスクリプトのようなリモートコンテンツの読み込みは攻撃経路になるので避ける」と注意しています。<Ref n={5} /> Rust 製の WebAssembly を使うときは <code>script-src</code> に <code>'wasm-unsafe-eval'</code> を加えます。<Ref n={5} />
            </p>
          </Callout>
          <p>
            権限が「Core に届く要求」を守り、CSP が「WebView に入ってくるもの」を守る、と役割を分けて覚えます。関連して、<code>freezePrototype</code> を <code>true</code> にすると <code>Object.freeze(Object.prototype)</code> を実行する初期化スクリプトが入り、プロトタイプ汚染の対策になります。<Ref n={13} />
          </p>
        </>
      ),
    },
    {
      id: 'isolation',
      title: 'isolation パターン',
      body: (
        <>
          <p>
            IPC の「パターン」は2つあります。既定は <Term en="brownfield">brownfield</Term> で（<code>app.security.pattern</code> の既定値 <code>{'{ "use": "brownfield" }'}</code>）、<Ref n={13} /> <code>invoke</code> はそのまま Core に届きます。もう一つの <Term en="isolation pattern">isolation パターン</Term>は、公式の説明では「フロントエンドから Tauri Core へ届く API メッセージを、Core に到達する前に JavaScript で横取りして改変する方法」です。<Ref n={15} /> 狙いは、依存パッケージの深い階層に潜むコードから Core を守ることです。<Ref n={15} /> 権限の仕組みは「誰が呼んだか」で判断するため、同じウィンドウ内の悪意あるコードと自分のコードを区別できません。その弱点を、メッセージそのものを検査する層で補います。
          </p>
          <Figure n="37-4" title="isolation パターンのメッセージの流れ" caption="invoke はまずサンドボックス化された iframe（isolation アプリ）に渡され、window.__TAURI_ISOLATION_HOOK__ のフックで検査・加工されたあと、SubtleCrypto の AES-GCM で暗号化されて Core に届く。鍵は起動のたびに作り直される。模式図。">
            <IsolationFigure />
          </Figure>
          <p>
            図の流れが仕組みのすべてです。<Ref n={15} /> 設定とフックは次のように書きます。
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（isolation パターンを有効にする）"
            code={`
{
  "build": {
    "frontendDist": "../dist"
  },
  "app": {
    "security": {
      "pattern": {
        "use": "isolation",
        "options": { "dir": "../dist-isolation" }
      }
    }
  }
}
`}
          />
          <Code
            lang="js"
            title="dist-isolation/index.js（フックの最小例。公式の例はメッセージをそのまま返す）"
            code={`
window.__TAURI_ISOLATION_HOOK__ = (payload) => {
  // ここで payload を検査・加工する。公式の例はログを出してそのまま返す
  console.log('hook', payload);
  return payload;
};
`}
          />
          <p>
            制約もあります。暗号化の分だけ遅くなりますが、ほとんどのアプリでは気付かない程度です。Windows では iframe 内で外部ファイルを読めないためビルド時にスクリプトがインライン化され、ES Modules は使えません。isolation アプリ自体は依存を最小にして単純に保ちます。<Ref n={15} /> 公式は可能な限り isolation の採用を「強く勧める」としていますが、<Ref n={15} /> 本書の Tsumugi は学習用として既定の brownfield のまま進めます。
          </p>
          <h3>守れるものと守れないもの</h3>
          <p>
            capability の仕組みが何を守り、何を守らないかは公式が明示しています。<Ref n={2} />
          </p>
          <div className="compare">
            <div>
              <h4>守れるもの</h4>
              <ul>
                <li>フロントエンドが乗っ取られたときの影響を最小化する</li>
                <li>ローカルのシステムインターフェースやデータを、うっかり公開してしまうことを減らす</li>
                <li>フロントエンドから Rust 側への権限昇格を防ぐ</li>
              </ul>
            </div>
            <div>
              <h4>守れないもの</h4>
              <ul>
                <li>悪意のある、または安全でない Rust コード</li>
                <li>緩すぎるスコープや設定</li>
                <li>コマンド内の誤ったスコープ検査</li>
                <li>Rust 側からの意図的な迂回</li>
                <li>WebView のゼロデイ脆弱性、サプライチェーン攻撃</li>
              </ul>
            </div>
          </div>
          <p>
            右側の多くは Rust 側のコードの質に帰着します。権限の仕組みは境界を越える要求を絞るだけで、内側で何をするかは Rust のコードが決めます。設定を書くときは「このウィンドウに、このコマンドを、この範囲で」の三つをそろえて考えます。
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
              Tsumugi はウィンドウが <code>main</code> 一つなので、capability も <code>src-tauri/capabilities/default.json</code> の1ファイルです。<code>permissions</code> には <code>core:default</code> と、<ChapterLink n={38} /> で導入する各プラグインの既定セット（<code>fs:default</code>、<code>dialog:default</code>、<code>store:default</code>、<code>notification:default</code>、<code>opener:default</code>、<code>log:default</code>、デスクトップ限定の <code>window-state:default</code>）を並べます。Markdown の書き出し・読み込み（<ChapterLink n={49} />）はユーザーが選んだパスに書くため、<code>fs:allow-write-text-file</code> と <code>fs:allow-read-text-file</code> を足し、スコープは <code>$HOME/**/*</code> と <code>$DOCUMENT/**/*</code> に限定します。
            </p>
            <p>
              画像の表示（<ChapterLink n={45} />）は asset プロトコルを使い、<code>assetProtocol.scope</code> を <code>$APPDATA/attachments/**/*</code> に限ります。CSP の <code>img-src</code> に <code>asset:</code> と <code>http://asset.localhost</code> を、<code>connect-src</code> に <code>ipc:</code> と <code>http://ipc.localhost</code> を書きます。画像の保存先は Rust 側のコマンドが決めるので、ファイル名に <code>..</code> が含まれないことをコマンド側で検証します。「スコープを守るのはコマンド自身」の実例です。
            </p>
          </Callout>
          <Callout kind="unverified">
            <p>
              capability と CSP の設定内容は公式資料に基づく記述です。Tsumugi の設定は Linux 上で実際に起動して確かめ、許可していないパスへの fs 操作が拒否されること、asset プロトコルのスコープ外のファイルが読めないこと、CSP の下で添付画像が表示できることを確認しました。macOS と Windows での動作確認は <ChapterLink n={41} /> 以降で、読者の環境で行う前提です。
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
            <li>信頼境界は WebView と Core の間にあり、WebView のコードは IPC で公開された資源にしか触れられない。</li>
            <li>permission はコマンドの許可・拒否とスコープ、capability はそれをウィンドウ（ラベル）に結び付ける単位。既定ではすべて閉じている。</li>
            <li>capability は <code>windows</code>、<code>platforms</code>、<code>remote.urls</code> で適用範囲を絞れる。境界はラベルで決まる。</li>
            <li>スコープでは <code>deny</code> が常に <code>allow</code> に優先し、守るのはコマンドの実装である。</li>
            <li>CSP は <code>app.security.csp</code> に書いたときだけ有効で、Tauri がハッシュと nonce を加える。IPC と asset の送信元を忘れない。</li>
            <li>isolation パターンは IPC メッセージを iframe 内のフックで検査し暗号化して Core に渡す。既定は brownfield。</li>
          </ul>
          <p>次章では、この権限の仕組みの上で動く公式プラグイン（fs、dialog、store、notification、opener、log と、デスクトップ限定の window-state）の導入と設定を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Tauri Security',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '信頼境界の定義、Core とフロントエンドの区別、IPC が境界を守ること、OS の WebView を使う理由。',
    },
    {
      title: 'Capabilities',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/capabilities/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'capability の定義、ファイルの置き場所と自動有効化、default.json の例、windows・platforms・remote、ラベルで境界が決まること、守れるもの／守れないもの、invoke_handler の既定。',
    },
    {
      title: 'Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'permission の定義と識別子の形式、TOML の構造、permission セット、default の特別扱い、アプリの permissions ディレクトリ。',
    },
    {
      title: 'Command Scopes',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/scope/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'スコープの定義、deny が allow に優先すること、EBWebView の例、スコープの適用はコマンド自身の責任であること。',
    },
    {
      title: 'Content Security Policy (CSP)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/csp/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'CSP は設定した場合のみ有効、ハッシュと nonce の自動付与、api サンプルの設定例、リモートコンテンツへの注意、wasm-unsafe-eval。',
    },
    {
      title: 'Runtime Authority',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/runtime-authority/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'runtime authority の役割と invoke 処理の手順、拒否時にコマンドが呼ばれないこと。',
    },
    {
      title: 'Capability (ACL reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/acl/capability/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'capability の各フィールドの型と既定値、remote.urls の URLPattern、PermissionEntry のオブジェクト形式、platforms の値。',
    },
    {
      title: 'Capabilities for Different Windows and Platforms',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/security/capabilities-for-windows-and-platforms/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'first と second の2ウィンドウに異なる capability を与え、platforms で Linux と Windows に限定する例。',
    },
    {
      title: 'Core Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/acl/core-permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'core:default の構成、core:window:default などの既定セットの内容、allow-set-title・allow-close・deny-listen の例。',
    },
    {
      title: 'webviewWindow (JavaScript API reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacewebviewwindow/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.12',
      note: 'ウィンドウ作成に core:webview:allow-create-webview-window が必要で、既定セットには含まれないこと。',
    },
    {
      title: 'File System (plugin)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/file-system/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-fs 2.x',
      note: 'ベースディレクトリ変数の一覧、permission だけでは forbidden path になること、スコープ付き capability の例、deny-default、deny の優先。',
    },
    {
      title: 'Using Plugin Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/security/using-plugin-permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'fs の default セットの構成（read-all、scope-app-recursive、deny-default）、not allowed エラーの意味。',
    },
    {
      title: 'Configuration (tauri.conf.json reference)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'app.security の csp・devCsp・freezePrototype・pattern（既定 brownfield）・assetProtocol・capabilities の定義と既定値、Csp の書式。',
    },
    {
      title: 'Asset Protocol',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/asset-protocol/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'assetProtocol の enable と scope、deny が allow に優先、requireLiteralLeadingDot の既定。',
    },
    {
      title: 'Isolation Pattern',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/inter-process-communication/isolation/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'isolation パターンの目的と仕組み、フックと AES-GCM、設定例、性能と制約、推奨。',
    },
  ],
}

export default chapter
