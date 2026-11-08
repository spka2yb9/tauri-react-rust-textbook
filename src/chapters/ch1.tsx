import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 1-1 Electron と Tauri の構成の違い ---------- */
function BundleCompareFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Electron アプリと Tauri アプリの中身を並べた模式図。Electron は Chromium と Node.js をアプリに同梱するのに対し、Tauri は OS に元からある WebView を使い、アプリには Rust のバイナリとフロントエンドの資産だけが入る">
      <g fontSize="13">
        {/* Electron */}
        <text x="160" y="28" fontSize="15" fontWeight="600" textAnchor="middle">Electron アプリ</text>
        <rect x="30" y="40" width="260" height="210" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <rect x="45" y="55" width="230" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="80" textAnchor="middle">HTML / CSS / JavaScript</text>
        <rect x="45" y="105" width="230" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="130" textAnchor="middle">Chromium（同梱）</text>
        <rect x="45" y="155" width="230" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="180" textAnchor="middle">Node.js（同梱）</text>
        <text x="160" y="225" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">ブラウザエンジンごと配布する</text>
        {/* Tauri */}
        <text x="480" y="28" fontSize="15" fontWeight="600" textAnchor="middle">Tauri アプリ</text>
        <rect x="350" y="40" width="260" height="120" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <rect x="365" y="55" width="230" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="480" y="80" textAnchor="middle">HTML / CSS / JavaScript</text>
        <rect x="365" y="105" width="230" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="130" textAnchor="middle">Rust のバイナリ（Core）</text>
        <rect x="350" y="180" width="260" height="70" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="480" y="205" textAnchor="middle">OS の WebView</text>
        <text x="480" y="228" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">WebView2 / WKWebView / webkitgtk</text>
        <text x="480" y="275" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">破線：アプリには含めず、OS のものを実行時に使う</text>
      </g>
    </svg>
  )
}

/* ---------- 図 1-2 Tauri のプロセスモデル ---------- */
function ProcessModelFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="Tauri のプロセスモデル。左の Core プロセスは Rust で書かれ OS への完全なアクセスを持つ。右の WebView プロセスは HTML と JavaScript で UI を描く。両者は IPC で通信し、すべての IPC は Core を経由する">
      <defs>
        <marker id="arrow1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="30" y="40" width="240" height="150" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="150" y="68" textAnchor="middle" fontSize="15" fontWeight="600">Core プロセス（Rust）</text>
        <text x="150" y="95" textAnchor="middle">アプリの入口</text>
        <text x="150" y="117" textAnchor="middle">ウィンドウ・トレイ・通知の管理</text>
        <text x="150" y="139" textAnchor="middle">OS への完全なアクセス</text>
        <text x="150" y="161" textAnchor="middle">設定や DB 接続などの状態</text>

        <rect x="370" y="40" width="240" height="150" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="490" y="68" textAnchor="middle" fontSize="15" fontWeight="600">WebView プロセス</text>
        <text x="490" y="95" textAnchor="middle">HTML / CSS / JavaScript</text>
        <text x="490" y="117" textAnchor="middle">画面の描画と入力の受付</text>
        <text x="490" y="139" textAnchor="middle">OS の WebView ライブラリを利用</text>
        <text x="490" y="161" textAnchor="middle">React はここで動く</text>

        <path d="M275,100 L365,100" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow1a)" markerStart="url(#arrow1a)" />
        <text x="320" y="90" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">IPC</text>
        <text x="320" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">コマンド・</text>
        <text x="320" y="146" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">イベント</text>
      </g>
      <text x="320" y="225" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：WebView プロセスはウィンドウごとに複数になりうる。IPC はすべて Core を経由する</text>
    </svg>
  )
}

/* ---------- 図 1-3 学習マップ ---------- */
function LearningMapFigure() {
  const parts = [
    { x: 20, label: '第1部', sub: '導入', ch: '1〜2章', fill: 'var(--fig-box)' },
    { x: 120, label: '第2部', sub: 'JS と TS', ch: '3〜6章', fill: 'var(--fig-box3)' },
    { x: 220, label: '第3部', sub: 'React', ch: '7〜17章', fill: 'var(--fig-box3)' },
    { x: 320, label: '第4部', sub: 'Rust', ch: '18〜32章', fill: 'var(--fig-box2)' },
    { x: 420, label: '第5部', sub: 'Tauri', ch: '33〜40章', fill: 'var(--fig-box4)' },
    { x: 520, label: '第6部', sub: 'Tsumugi', ch: '41〜50章', fill: 'var(--fig-box5)' },
  ]
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="本書の学習マップ。第1部から第6部までが左から右に並び、第2部と第3部（フロントエンド）と第4部（Rust）が合流して第5部 Tauri に入り、第6部で Tsumugi を作る。その後に第7部 配布、第8部 モバイル、第9部 発展が続く">
      <defs>
        <marker id="arrow1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {parts.map((p) => (
          <g key={p.label}>
            <rect x={p.x} y="60" width="96" height="80" rx="8" fill={p.fill} stroke="var(--fig-line)" />
            <text x={p.x + 48} y="85" textAnchor="middle" fontWeight="600" fontSize="13">{p.label}</text>
            <text x={p.x + 48} y="107" textAnchor="middle">{p.sub}</text>
            <text x={p.x + 48} y="127" textAnchor="middle" fill="var(--fig-muted)">{p.ch}</text>
          </g>
        ))}
        {[116, 216, 316, 416, 516].map((x) => (
          <path key={x} d={`M${x},100 L${x + 4},100`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow1b)" />
        ))}
        <text x="220" y="40" textAnchor="middle" fill="var(--fig-muted)">フロントエンド側（WebView で動く）</text>
        <text x="368" y="40" textAnchor="middle" fill="var(--fig-muted)">Rust 側</text>
        <text x="468" y="40" textAnchor="middle" fill="var(--fig-muted)">両方を橋渡し</text>

        <rect x="60" y="200" width="150" height="56" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="135" y="223" textAnchor="middle" fontWeight="600" fontSize="13">第7部 配布</text>
        <text x="135" y="243" textAnchor="middle" fill="var(--fig-muted)">51〜53章</text>
        <rect x="245" y="200" width="150" height="56" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="223" textAnchor="middle" fontWeight="600" fontSize="13">第8部 モバイル</text>
        <text x="320" y="243" textAnchor="middle" fill="var(--fig-muted)">54〜57章</text>
        <rect x="430" y="200" width="150" height="56" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="505" y="223" textAnchor="middle" fontWeight="600" fontSize="13">第9部 発展・付録</text>
        <text x="505" y="243" textAnchor="middle" fill="var(--fig-muted)">58〜59章</text>
        <path d="M568,140 C568,175 135,165 135,196" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow1b)" />
        <path d="M210,228 L241,228" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow1b)" />
        <path d="M395,228 L426,228" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow1b)" />
      </g>
      <text x="320" y="285" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線：読む順序　破線：Tsumugi を完成させてから配布へ進む</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 1,
  part: 1,
  title: 'Tauri とこの本の全体像',
  summary:
    'デスクトップやモバイルのアプリを作る技術には、ネイティブ、Electron、Flutter、React Native、Tauri などの選択肢があります。各公式資料に基づいて違いを整理し、Tauri が OS の WebView と Rust を組み合わせる仕組みと、本書で作るノートアプリ Tsumugi の完成像、本書の読み方を示します。',
  goals: [
    'アプリ開発の主な技術の選択肢を、仕組みの違いから説明できる',
    'Tauri が OS の WebView と Rust の Core を組み合わせる構造を説明できる',
    'Tauri 2 の特徴（軽量なバイナリ、モバイル対応、セキュリティモデル）を挙げられる',
    '本書で作るアプリ Tsumugi にどんな機能があるかを言える',
    '本書の各部がどうつながっているかを把握し、自分の読む順序を決められる',
  ],
  prerequisites: [],
  sections: [
    {
      id: 'intro',
      title: 'Web の技術でアプリを作るということ',
      body: (
        <>
          <p>
            HTML と CSS で画面を作り、JavaScript で動きを付ける。この Web の技術は、ブラウザの中だけでなく、デスクトップやスマートフォンの「アプリ」を作るためにも広く使われています。Slack や Visual Studio Code のようなデスクトップアプリが Web の技術で作られていることを知っている方も多いでしょう。
          </p>
          <p>
            一方で、Web の技術には「ファイルを直接読み書きできない」「OS の機能に触れにくい」という制約があります。この制約を越えるために、Web の画面と、OS に直接アクセスできる別の層を組み合わせる仕組みが生まれました。<Term en="Tauri">Tauri</Term> はその1つで、画面を Web の技術で、OS に触れる部分を Rust で書くフレームワークです。<Ref n={1} />
          </p>
          <p>
            本書は、JavaScript の基礎を知っている方が、TypeScript・React・Rust を順に身につけ、最後に Tauri 2 でデスクトップとモバイルの両方で動くノートアプリを完成させるまでを扱います。この章では、まず「なぜ Tauri なのか」を他の選択肢と比べながら確認し、そのあとで本書の全体像を示します。
          </p>
        </>
      ),
    },
    {
      id: 'options',
      title: 'アプリを作る技術の選択肢',
      body: (
        <>
          <p>
            デスクトップやモバイルのアプリを作る方法は1つではありません。ここでは代表的な5つを、各プロジェクトの公式資料に書かれている事実だけを根拠に比べます。それぞれ設計思想が違うので、優劣ではなく「何をどこで動かすか」の違いとして読んでください。
          </p>
          <h3>ネイティブ開発</h3>
          <p>
            OS ごとに用意された言語とツールで書く方法です。React Native の公式資料にあるとおり、Android では Kotlin か Java、iOS では Swift か Objective-C で画面の部品（view）を書きます。<Ref n={6} /> OS の機能をすべて使えますが、対応する OS の数だけコードを書くことになります。
          </p>
          <h3>Electron</h3>
          <p>
            <Term en="Electron">Electron</Term> は、公式の説明では「JavaScript、HTML、CSS を使ってデスクトップアプリを作るためのフレームワーク」で、Chromium と Node.js をバイナリに埋め込みます。Windows、macOS、Linux に1つのコードベースで対応できます。<Ref n={4} /> プロセスモデルは Chromium から受け継いだ複数プロセス構成で、Node.js で動くメインプロセスが1つと、ウィンドウごとのレンダラープロセスがあります。<Ref n={5} />
          </p>
          <h3>Flutter</h3>
          <p>
            <Term en="Flutter">Flutter</Term> は Dart 言語で書く「クロスプラットフォームの UI ツールキット」です。OS の部品を使うのではなく、各 UI コントロールを Flutter 自身が実装して描画します。描画エンジン Impeller はアプリと一緒に配布されます。Android、iOS、Windows、macOS、Linux 向けの埋め込み層を持ち、Web へは JavaScript か WebAssembly にコンパイルします。<Ref n={7} />
          </p>
          <h3>React Native</h3>
          <p>
            <Term en="React Native">React Native</Term> は、公式の説明では「React とプラットフォームのネイティブ機能を使って Android と iOS のアプリを作るオープンソースのフレームワーク」です。JavaScript と React のコンポーネントで UI を記述すると、実行時に対応する Android と iOS の view が作られます。つまり画面の部品は Web の DOM ではなく、OS 本来の view です。<Ref n={6} />
          </p>
          <h3>Tauri</h3>
          <p>
            Tauri は、画面を OS に元から備わっている <Term en="WebView">WebView</Term>（Web ページを表示する OS の部品）で描き、OS に触れる部分を Rust で書きます。ブラウザエンジンを同梱しないため、公式資料では「最小構成の Tauri アプリは 600KB 未満になりうる」とされています。<Ref n={1} /> デスクトップ3 OS に加え、Tauri 2 からは iOS と Android にも対応します。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>技術</th>
                  <th>UI を書く言語</th>
                  <th>画面を描くもの</th>
                  <th>OS 側のロジック</th>
                  <th>公式資料が挙げる対応 OS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ネイティブ</td>
                  <td>Swift / Kotlin など OS ごと</td>
                  <td>OS の view</td>
                  <td>同じ言語</td>
                  <td>その OS のみ</td>
                </tr>
                <tr>
                  <td>Electron</td>
                  <td>JavaScript、HTML、CSS</td>
                  <td>同梱した Chromium</td>
                  <td>同梱した Node.js</td>
                  <td>Windows、macOS、Linux</td>
                </tr>
                <tr>
                  <td>Flutter</td>
                  <td>Dart</td>
                  <td>自前の描画エンジン（Impeller）</td>
                  <td>Dart と各 OS の埋め込み層</td>
                  <td>Android、iOS、Windows、macOS、Linux、Web</td>
                </tr>
                <tr>
                  <td>React Native</td>
                  <td>JavaScript（React）</td>
                  <td>OS の view</td>
                  <td>ネイティブモジュール</td>
                  <td>Android、iOS</td>
                </tr>
                <tr>
                  <td>Tauri 2</td>
                  <td>HTML、CSS、JavaScript（任意のフレームワーク）</td>
                  <td>OS の WebView</td>
                  <td>Rust（プラグインで Swift / Kotlin）</td>
                  <td>Windows、macOS、Linux、iOS、Android</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            この表の「画面を描くもの」の列に注目してください。Electron と Tauri はどちらも Web の技術で画面を作りますが、Electron はブラウザエンジンをアプリに同梱し、Tauri は OS のものを借ります。次の図は、この違いをアプリの中身として描いたものです。
          </p>
          <Figure n="1-1" title="Electron アプリと Tauri アプリの中身" caption="模式図。Electron は Chromium と Node.js を同梱して配布する。Tauri は Rust のバイナリとフロントエンドの資産だけを配布し、WebView は OS のものを実行時に使う（破線）。">
            <BundleCompareFigure />
          </Figure>
          <p>
            図から読み取れるのは、Tauri のアプリが小さくなる理由と、その代償です。ブラウザエンジンを持たないので配布物は小さくなりますが、画面の挙動は OS ごとの WebView に依存します。Tauri の公式資料も「WebView ライブラリは実行時に動的にリンクされるため、プラットフォームの違いを考慮する必要がある」と注意しています。<Ref n={2} /> この点は <ChapterLink n={4} /> と <ChapterLink n={33} /> で詳しく扱います。
          </p>
        </>
      ),
    },
    {
      id: 'tauri-features',
      title: 'Tauri の仕組みと特徴',
      body: (
        <>
          <p>
            Tauri の公式資料は、Tauri を「Rust のツールと WebView に描画される HTML からデスクトップアプリを作るツールキット」と説明しています。<Ref n={8} /> 実行時の構造は、Electron や最近のブラウザと同じく複数プロセスです。<Ref n={2} /> 次の図は、その2種類のプロセスの役割を示します。
          </p>
          <Figure n="1-2" title="Tauri のプロセスモデル" caption="Core プロセス（Rust）がアプリの入口で、OS への完全なアクセスを持つ。WebView プロセスは OS の WebView を使って HTML と JavaScript を動かす。両者は IPC で通信する。">
            <ProcessModelFigure />
          </Figure>
          <p>
            図の左、<Term en="Core process">Core プロセス</Term>は Rust で書かれ、アプリの入口であり、OS に完全にアクセスできる唯一の部分です。ウィンドウやシステムトレイ、通知を作り、設定やデータベース接続のような全体の状態を持ちます。図の右、<Term en="WebView process">WebView プロセス</Term>は画面を描く役割で、Core が起動します。ここでは普通の Web 開発と同じツールやフレームワークが使えます。両者の間の通信を <Term en="IPC">IPC</Term>（プロセス間通信）と呼び、すべての IPC は Core を通ります。<Ref n={2} />
          </p>
          <p>
            公式資料はこの分割を「最小権限の原則」と結びつけています。各プロセスに必要な権限だけを与えることで、どこかが乗っ取られても被害を小さくできるという考え方です。フロントエンドでは秘密情報を扱わず、できるだけ多くの業務ロジックを Core に置くことが勧められています。<Ref n={2} />
          </p>
          <h3>Rust で書かれていること</h3>
          <p>
            Core が Rust で書かれているのは、所有権モデルによってメモリ安全性と性能を両立できるからです。<Ref n={2} /> Tauri の公式資料は、アプリが Rust のメモリ安全性・スレッド安全性・型安全性を「Rust の専門家でなくても」引き継げると述べています。<Ref n={1} /> とはいえ本書では、自分のアプリのロジックを Rust で書くために、第4部で Rust を入門書レベルからきちんと学びます。
          </p>
          <h3>Tauri 2 で加わったもの</h3>
          <p>
            Tauri 2.0 の安定版は 2024 年 10 月 2 日に公開されました。<Ref n={3} /> この版で、iOS と Android がデスクトップと並ぶ対象になり、Swift や Kotlin で書いたネイティブのロジックをプラグインとして Rust の Core やフロントエンドに公開できるようになりました。セキュリティモデルも一新され、旧来の allowlist に代わって permission（コマンドの許可）、スコープ（引数の検証）、capability（ウィンドウや WebView への権限の割り当て）の3つで構成されます。<Ref n={3} /> この仕組みは <ChapterLink n={37} /> で扱います。
          </p>
          <h3>その他の特徴</h3>
          <ul>
            <li>フロントエンドは、HTML・JavaScript・CSS にコンパイルできるフレームワークなら何でも使えます。本書は React を使います。<Ref n={1} /></li>
            <li>ウィンドウ作成を担う TAO と WebView 描画を担う WRY は Tauri チームが保守しており、単体でも使えます。<Ref n={1} /></li>
            <li>メジャーとマイナーのリリースごとにセキュリティ監査を受けています。公式資料はこれが「すべてのリスクを取り除くわけではない」とも書いています。<Ref n={1} /></li>
            <li>多くの機能は公式プラグインとして提供されます（<ChapterLink n={38} />）。<Ref n={3} /></li>
            <li>Tauri 自体のライセンスは MIT または Apache-2.0 です。<Ref n={8} /></li>
          </ul>
          <Callout kind="warn">
            <p>
              Tauri の WebView は OS によって異なります。Windows では Microsoft Edge WebView2（Chromium 系）、macOS と iOS では WKWebView（WebKit）、Linux では webkitgtk、Android では端末の Android System WebView です。<Ref n={9} /> 同じ HTML でも OS ごとに描画や対応機能が違いうることは、最初から頭に入れておいてください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tsumugi-overview',
      title: '題材アプリ Tsumugi の完成像',
      body: (
        <>
          <p>
            本書の第6部では、<Term en="Tsumugi">Tsumugi</Term> というノートアプリを設計から実装まで作ります。ページを入れ子にして整理し、ブロック単位で文章を書く、Notion 風のローカル保存型アプリです（名前とデザインはオリジナルで、Notion とは無関係です）。完成時の機能は次のとおりです。
          </p>
          <ol className="steps">
            <li>ページの入れ子。サイドバーのツリーで親子関係と並び順を管理し、移動や削除は子孫ごと行います。</li>
            <li>ブロック編集。見出し、本文、ToDo、リスト、コード、引用、画像のブロックを、エディタライブラリ BlockNote で編集します。</li>
            <li>スラッシュメニューとドラッグ＆ドロップでの並べ替え。</li>
            <li>全文検索。SQLite の FTS5（trigram）でページ本文を索引し、日本語も部分一致で探せます。</li>
            <li>画像の添付。アプリのデータフォルダに保存し、Tauri の asset プロトコルで表示します。</li>
            <li>Markdown の書き出しと読み込み。1ページ単位でも全ページ一括でも扱えます。</li>
            <li>ダークモード。OS の設定に追従し、手動でも切り替えられます。</li>
            <li>モバイル向けレイアウト。幅が狭いときはサイドバーをドロワーにし、セーフエリアに対応します。</li>
            <li>簡易データベース。表形式のビューで、テキスト・数値・選択肢・チェック・日付のプロパティを持ち、並べ替えと絞り込みを保存できます。</li>
            <li>仕上げ。設定画面、キーボードショートカット、ウィンドウ状態の保存、エラー表示。</li>
          </ol>
          <p>
            Tsumugi では、画面（React）は WebView プロセスで動き、データの保存や検索（SQLite）は Rust の Core で動きます。図 1-2 の2つの箱を、1つのアプリとして実際に埋めていくのが第6部です。第1〜5部の各章の終わりには「Tsumugi での使いどころ」という節があり、その章で学んだことが第6部のどこで使われるかを予告します。
          </p>
          <Code
            lang="text"
            code={`
Tsumugi の構成（概要）
  src/            React で書くフロントエンド（WebView プロセスで動く）
  src-tauri/      Rust で書く Core（SQLite、ファイル、設定）
    core/         Tauri に依存しないロジック（cargo test で検証）
    src/          Tauri のコマンドとアプリの起動
`}
          />
          <p>
            この構成の詳しい意味は <ChapterLink n={33} /> と <ChapterLink n={41} /> で説明します。ここでは「フロントエンドと Rust 側が別のフォルダに分かれ、IPC でつながる」という形だけ覚えておけば十分です。
          </p>
        </>
      ),
    },
    {
      id: 'how-to-read',
      title: '本書の読み方',
      body: (
        <>
          <p>
            本書は9つの部からなります。Tauri のアプリは「WebView で動くフロントエンド」と「Rust で動く Core」の2つの世界にまたがるので、第2〜3部でフロントエンドの言葉（TypeScript と React）を、第4部で Rust を学び、第5部で両者を Tauri がどうつなぐかを学びます。次の図は、各部のつながりを示す学習マップです。
          </p>
          <Figure n="1-3" title="本書の学習マップ" caption="第2・3部はフロントエンド側、第4部は Rust 側の基礎で、第5部で合流する。第6部で Tsumugi を完成させてから、第7部の配布と第8部のモバイルに進む。">
            <LearningMapFigure />
          </Figure>
          <p>
            図から分かるように、第3部（React）と第4部（Rust）は互いに依存しません。すでに React を知っている方は第4部から、Rust を知っている方は第3部だけ読んで第5部へ進めます。各章の冒頭には前提となる章の番号を示しているので、飛ばした章が前提になっていたら戻ってください。
          </p>
          <h3>前提とする知識と環境</h3>
          <ul>
            <li>JavaScript の基礎（変数、関数、配列とオブジェクト、条件分岐、ループ、アロー関数）、HTML と CSS の基本、ターミナルの基本操作は知っているものとします。</li>
            <li>Promise や async/await、ES Modules、DOM、TypeScript、React、Rust は本書で説明します。</li>
            <li>開発用の PC は macOS を前提にし、手順は macOS 基準で書きます。Windows や Linux でも Tauri は動きますが、環境構築の手順は公式資料を参照してください。</li>
          </ul>
          <h3>バージョンについて</h3>
          <p>
            本書は 2026 年 11 月 8 日時点のバージョン、具体的には Tauri 2.12、React 19.3、TypeScript 7.0、Rust 1.99（2024 edition）を基準に書いています。バージョンに依存する記述には「Tauri 2.12 時点」のように時点を添えます。基準バージョンの一覧は本書のトップページにまとめてあります。
          </p>
          <h3>出典の扱い</h3>
          <p>
            本文の重要な主張には [1] のような番号を付け、章末の参考資料に対応する公式資料を載せています。本書の制作環境は Linux のため、macOS、Windows、iOS、Android で実際に試せていない手順は「未検証」の枠で明示します。公式資料の記述と本書の制作環境での検証結果を区別して読めるようにするためです。
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
              この章で見た「Core プロセスと WebView プロセス」の分担は、Tsumugi の設計そのものです。ページやブロックの保存、全文検索、Markdown 変換は Rust の Core に置き（<ChapterLink n={42} />）、エディタやサイドバーは React で WebView に描きます（<ChapterLink n={43} />、<ChapterLink n={44} />）。
            </p>
            <p>
              また、OS ごとに WebView が違うという事実は、第6部で画像の表示やモバイルレイアウトを作るときに具体的な制約として現れます（<ChapterLink n={45} />、<ChapterLink n={55} />）。
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
            <li>アプリを作る技術は「UI を書く言語」「画面を描くもの」「OS 側のロジックを書くもの」で整理できる。Electron はブラウザエンジンを同梱し、Flutter は自前で描画し、React Native は OS の view を使い、Tauri は OS の WebView を使う。</li>
            <li>Tauri は Rust の Core プロセスと WebView プロセスからなり、すべての IPC は Core を通る。Core だけが OS に完全にアクセスできる。</li>
            <li>Tauri 2.0（2024-10-02 公開）で iOS と Android に対応し、permission・スコープ・capability によるセキュリティモデルになった。</li>
            <li>WebView は OS ごとに異なる（WebView2、WKWebView、webkitgtk、Android System WebView）。</li>
            <li>本書は第2〜3部でフロントエンド、第4部で Rust、第5部で Tauri を学び、第6部で Tsumugi を完成させる。</li>
          </ul>
          <p>次章では、macOS に開発環境を整え、最初の Tauri アプリを起動します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'What is Tauri?',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'フロントエンド非依存、600KB 未満のバイナリ、Rust の安全性、セキュリティ監査、TAO と WRY、プラグインの根拠。',
    },
    {
      title: 'Process Model',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/process-model/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'Core プロセスと WebView プロセスの役割、IPC が Core を経由すること、最小権限の原則、WebView の動的リンクの根拠。',
    },
    {
      title: 'Tauri 2.0 Stable Release',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/blog/tauri-20/',
      accessed: '2026-11-08',
      note: '2024-10-02 の安定版公開、iOS/Android 対応、Swift/Kotlin プラグイン、permission・スコープ・capability の新セキュリティモデルの根拠。',
    },
    {
      title: 'Electron Documentation',
      publisher: 'OpenJS Foundation',
      url: 'https://www.electronjs.org/docs/latest',
      accessed: '2026-11-08',
      note: 'Electron の定義、Chromium と Node.js の同梱、対応 OS の根拠。',
    },
    {
      title: 'Process Model',
      publisher: 'Electron',
      url: 'https://www.electronjs.org/docs/latest/tutorial/process-model',
      accessed: '2026-11-08',
      note: 'Electron のメインプロセスとレンダラープロセスの根拠。',
    },
    {
      title: 'Core Components and Native Components',
      publisher: 'React Native',
      url: 'https://reactnative.dev/docs/intro-react-native-components',
      accessed: '2026-11-08',
      note: 'React Native の定義、ネイティブの view で描画すること、Android と iOS のネイティブ言語の根拠。',
    },
    {
      title: 'Flutter architectural overview',
      publisher: 'Flutter',
      url: 'https://docs.flutter.dev/resources/architectural-overview',
      accessed: '2026-11-08',
      note: 'Flutter の定義、Dart、自前の UI 実装と Impeller、対応プラットフォームの根拠。',
    },
    {
      title: 'Tauri Architecture',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/architecture/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'Tauri の定義、Core のクレート構成、TAO と WRY、ライセンスの根拠。',
    },
    {
      title: 'Webview Versions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/webview-versions/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'OS ごとの WebView（WebView2、WKWebView、webkitgtk、Android System WebView）の根拠。',
    },
  ],
}

export default chapter
