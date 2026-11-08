import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 58-1 同期方式の比較 ---------- */
function SyncModelsFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="3つの同期方式を並べた図。左のサーバー権威型は全端末がサーバーを経由して1つの正本を更新する。中央の OT 型は中央の権威が操作の順序を決め、端末は拒否された操作を変換してやり直す。右の CRDT 型は端末同士が直接でも更新を交換でき、どの順序で受け取っても同じ状態に収束する">
      <defs>
        <marker id="arrow58a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {/* titles */}
        <text x="110" y="24" textAnchor="middle" fontWeight="600" fontSize="14">サーバー権威</text>
        <text x="320" y="24" textAnchor="middle" fontWeight="600" fontSize="14">OT（中央権威＋変換）</text>
        <text x="530" y="24" textAnchor="middle" fontWeight="600" fontSize="14">CRDT</text>
        {/* column 1 */}
        <rect x="60" y="50" width="100" height="40" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="110" y="75" textAnchor="middle">サーバー（正本）</text>
        <rect x="20" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="55" y="173" textAnchor="middle">端末 A</text>
        <rect x="130" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="165" y="173" textAnchor="middle">端末 B</text>
        <path d="M70,150 L95,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <path d="M150,150 L125,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <text x="110" y="215" textAnchor="middle" fill="var(--fig-muted)">オフラインでは書けない</text>
        <text x="110" y="233" textAnchor="middle" fill="var(--fig-muted)">競合は「後勝ち」か拒否</text>
        {/* column 2 */}
        <rect x="265" y="50" width="110" height="40" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="75" textAnchor="middle">権威（順序を決定）</text>
        <rect x="230" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="265" y="173" textAnchor="middle">端末 A</text>
        <rect x="340" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="375" y="173" textAnchor="middle">端末 B</text>
        <path d="M280,150 L305,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <path d="M360,150 L335,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <text x="320" y="215" textAnchor="middle" fill="var(--fig-muted)">拒否された操作を rebase</text>
        <text x="320" y="233" textAnchor="middle" fill="var(--fig-muted)">権威が必要（ProseMirror collab）</text>
        {/* column 3 */}
        <rect x="480" y="50" width="100" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="530" y="75" textAnchor="middle" fill="var(--fig-muted)">中継（任意）</text>
        <rect x="440" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="475" y="173" textAnchor="middle">端末 A</text>
        <rect x="550" y="150" width="70" height="36" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="585" y="173" textAnchor="middle">端末 B</text>
        <path d="M510,168 L548,168" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <path d="M490,150 L515,92" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <path d="M570,150 L545,92" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow58a)" markerStart="url(#arrow58a)" />
        <text x="530" y="215" textAnchor="middle" fill="var(--fig-muted)">どの順で届いても同じ状態に収束</text>
        <text x="530" y="233" textAnchor="middle" fill="var(--fig-muted)">オフライン編集が前提</text>
      </g>
      <text x="320" y="275" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">紫：正本や順序を決める主体　青：端末　点線：無くてもよい経路　模式図</text>
    </svg>
  )
}

/* ---------- 図 58-2 CRDT の収束 ---------- */
function CrdtMergeFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="CRDT で2台の端末が同時に別の編集をしても同じ状態に収束する例。共通の初期状態から端末 A はタイトルを変え、端末 B は本文に段落を足す。互いの更新を交換すると、受け取る順序に関係なく両方の変更を含む同じ状態になる">
      <defs>
        <marker id="arrow58b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="240" y="16" width="160" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="34" textAnchor="middle" fontWeight="600">共通の初期状態</text>
        <text x="320" y="51" textAnchor="middle" fill="var(--fig-muted)">title: "メモ", body: [p1]</text>
        <path d="M280,60 L170,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58b)" />
        <path d="M360,60 L470,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58b)" />
        {/* A */}
        <rect x="60" y="100" width="220" height="56" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="170" y="120" textAnchor="middle" fontWeight="600">端末 A（オフライン）</text>
        <text x="170" y="140" textAnchor="middle">title を "会議メモ" に変更</text>
        {/* B */}
        <rect x="360" y="100" width="220" height="56" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="470" y="120" textAnchor="middle" fontWeight="600">端末 B（オフライン）</text>
        <text x="470" y="140" textAnchor="middle">body に p2 を追加</text>
        {/* exchange */}
        <path d="M280,128 L358,128" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow58b)" markerStart="url(#arrow58b)" />
        <text x="320" y="118" textAnchor="middle" fontSize="11" fill="var(--fig-accent)">更新を交換</text>
        <path d="M170,156 L280,196" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58b)" />
        <path d="M470,156 L360,196" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow58b)" />
        <rect x="200" y="200" width="240" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="320" y="218" textAnchor="middle" fontWeight="600">両端末が同じ状態に収束</text>
        <text x="320" y="236" textAnchor="middle" fill="var(--fig-muted)">title: "会議メモ", body: [p1, p2]</text>
      </g>
    </svg>
  )
}

/* ---------- 図 58-3 計測の2層 ---------- */
function ProfilingLayersFigure() {
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label="Tauri アプリの性能計測を2層に分けた図。上の WebView 層は React DevTools の Profiler でコンポーネントの描画時間を測る。下の Rust 層は cargo flamegraph で CPU のサンプルを取り、関数ごとの時間の割合を見る。2層の間の IPC は、コマンドの往復時間をログで測る">
      <g fontSize="12">
        <rect x="40" y="20" width="560" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="60" y="44" fontWeight="600">WebView 層（React）</text>
        <text x="60" y="66">React DevTools の Profiler タブ／&lt;Profiler onRender&gt;</text>
        <text x="60" y="82" fill="var(--fig-muted)">測るもの：どのコンポーネントが、何回、何ミリ秒かけて描画されたか</text>
        <rect x="40" y="100" width="560" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="60" y="118" fontWeight="600">IPC（invoke の往復）</text>
        <text x="60" y="133" fill="var(--fig-muted)">測るもの：コマンド1回の所要時間。performance.now() と log プラグインで挟む</text>
        <rect x="40" y="150" width="560" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="60" y="174" fontWeight="600">Rust 層（core クレート、SQLite）</text>
        <text x="60" y="196">cargo flamegraph（Linux: perf、macOS: xctrace）</text>
        <text x="60" y="212" fill="var(--fig-muted)">測るもの：CPU 時間の中でどの関数の割合が大きいか</text>
      </g>
      <text x="320" y="236" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">「遅い」と感じたら、まずどの層かを切り分ける</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 58,
  part: 9,
  title: '次の一歩',
  summary:
    'Tsumugi は手元の1台で完結するアプリとして完成しました。この章では、その先にある5つの話題を概観します。複数端末の同期と CRDT、性能の計測、エディタライブラリの選び方、第1章で比較した Electron との違いのふり返り、そして公式の学習リソースです。',
  goals: [
    'サーバー権威・OT・CRDT の3つの同期方式の違いと、CRDT が保証することを説明できる',
    'Automerge と Yjs がどういうライブラリかを知り、Tsumugi に同期を足すときの設計の方向を描ける',
    'React DevTools の Profiler と cargo flamegraph で、WebView 層と Rust 層のどちらが遅いかを切り分けられる',
    'ProseMirror・Tiptap・BlockNote の階層関係を説明し、要件に応じて選べる',
    '本書で経験したことをもとに、Electron と Tauri の違いを自分の言葉で言える',
    '次に読むべき公式の資料を知っている',
  ],
  prerequisites: [1, 44, 50, 53],
  sections: [
    {
      id: 'intro',
      title: 'Tsumugi のその先',
      body: (
        <>
          <p>
            第6部で作った Tsumugi は、ページの入れ子、ブロック編集、全文検索、簡易データベース、Markdown の入出力を備え、第7部と第8部で署名付きの配布と自動更新、モバイル対応まで整いました。ここで一度立ち止まり、本書が扱わなかった、しかし実際のアプリでは必ず問われる話題を見渡します。
          </p>
          <p>
            取り上げるのは5つです。複数の端末で同じノートを使いたいときの同期の設計、「なんとなく遅い」を数字にするための計測、BlockNote 以外のエディタを選ぶときの判断基準、第1章の技術比較を実装経験を踏まえて読み直すこと、そして公式の学習リソースです。いずれも1冊の本になる話題なので、この章では「何が問題で、どこから調べればよいか」の地図を示すことに徹します。
          </p>
        </>
      ),
    },
    {
      id: 'sync',
      title: '同期の設計と CRDT の概要',
      body: (
        <>
          <p>
            Tsumugi のデータは <ChapterLink n={42} /> で設計したとおり、手元の SQLite に <code>pages.content</code> として BlockNote の JSON を保存しています。これを「Mac と iPhone の両方で編集したい」となった瞬間、新しい問題が生まれます。両方がオフラインで同じページを編集した後、どちらの内容を残すのか、という問題です。
          </p>
          <p>
            解き方は大きく3つあります。図で並べてから、それぞれを説明します。
          </p>
          <Figure n="58-1" title="同期方式の比較" caption="左のサーバー権威型は正本が1つで単純だがオフライン編集に弱い。中央の OT 型は中央の権威が操作の順序を決め、端末は拒否された操作を変換してやり直す。右の CRDT 型は中央を必要とせず、更新がどの順で届いても同じ状態に収束する。模式図。">
            <SyncModelsFigure />
          </Figure>
          <ol className="steps">
            <li>
              <Term en="server authority">サーバー権威</Term>。サーバーが唯一の正本を持ち、端末は常にサーバーに書きに行きます。実装は単純ですが、オフラインでは書けないか、書けても後で「後勝ち」で片方が消えます。ノートアプリとしては受け入れにくい性質です。
            </li>
            <li>
              <Term en="operational transformation">OT（操作変換）</Term>。各端末は「3文字目に A を挿入」のような操作を送り、中央の権威が受け付ける順序を決めます。順序から外れた操作は、先に受理された操作を踏まえて変換（rebase）してからやり直します。ProseMirror の協調編集はこの系統の方式です。公式ガイドはこれを OT とは名指ししていませんが、「編集者は変更を1つの中央権威に送り、権威が適用順を決める」「拒否された編集者は相手の変更の上に自分の変更を rebase する」と説明しています。<Ref n={6} /> 中央の権威が必要な点が制約です。
            </li>
            <li>
              <Term en="CRDT">CRDT（Conflict-free Replicated Data Type）</Term>。データ構造そのものに「どの順で更新を適用しても同じ結果になる」性質を持たせます。crdt.tech は、CRDT は「異なるレプリカでどのようなデータ変更が行われても」それらを矛盾なく1つの状態に結合でき、「特別な競合解決コードや利用者の介入を必要としない」と説明しています。<Ref n={1} /> 中央サーバーを前提としないので、端末同士の直接同期や、中継サーバーが落ちている間のオフライン編集が自然に扱えます。
            </li>
          </ol>
          <p>
            CRDT が何を保証するのかを、Tsumugi のページを例に図で確かめます。
          </p>
          <Figure n="58-2" title="CRDT による収束の例" caption="共通の状態から端末 A はタイトルを、端末 B は本文を同時に変える。更新を交換すると、受け取った順序に関係なく両方の変更を含む同じ状態になる。模式図。">
            <CrdtMergeFigure />
          </Figure>
          <p>
            図のように、別の場所への編集は両方が残ります。同じ場所への編集（2台が同じタイトルを別の文字列に変えた場合）は、CRDT のライブラリが決めた規則で一方が選ばれますが、重要なのは「どちらが選ばれるかが全端末で一致する」ことです。収束は保証されますが、「人間にとって正しい方が残る」ことは保証されません。
          </p>
          <h3>Automerge と Yjs</h3>
          <p>
            CRDT を自分で実装する必要はありません。代表的なライブラリが2つあります。<Term en="Automerge">Automerge</Term> は「協調アプリケーションを作るためのデータ構造のライブラリ」で、各利用者の手元のコピーを正本とする <Term en="local-first">ローカルファースト</Term>な設計を掲げています。文書は JSON のようなオブジェクトに git 風の履歴が付いたもので、「任意の2つの Automerge 文書は常にマージできる」とされます。Rust で実装され、WebAssembly 経由でブラウザから使え、iOS 向けの C API もあります。<Ref n={2} /> <Ref n={3} /> Rust 側に <code>core</code> クレートを持つ Tsumugi の構成とは相性がよい選択肢です。
          </p>
          <p>
            <Term en="Yjs">Yjs</Term> は「自動的に同期する協調アプリケーションを作るための高性能な CRDT」で、<code>Y.Map</code> や <code>Y.Array</code> のような共有型を提供します。ネットワークについて何も仮定せず、「すべての変更が最終的に届きさえすれば文書は同期する」と説明されています。ProseMirror や Tiptap など多くのエディタとの結合（バインディング）が用意されているのが強みです。<Ref n={4} /> BlockNote の公式ドキュメントもリアルタイム協調編集を機能として挙げており、<Ref n={7} /> エディタと一体で同期したいなら Yjs の経路が短くなります。
          </p>
          <Callout>
            <p>
              Tsumugi に同期を足すとしたら、設計の要点は「<code>pages.content</code> に JSON の完成形を保存する」のをやめ、CRDT 文書の更新列を保存することです。Rust 側の <code>core</code> クレートで Automerge の文書を持ち、SQLite には文書のバイナリと未送信の更新を置き、同期は <ChapterLink n={30} /> の非同期処理でバックグラウンドに回します。全文検索（<ChapterLink n={46} />）の索引は、文書から抽出したテキストを従来どおり <code>pages_fts</code> に入れればそのまま使えます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'profiling',
      title: 'パフォーマンス計測',
      body: (
        <>
          <p>
            Tauri アプリの「遅い」には2種類あります。WebView の中で React の描画が遅いのか、Rust 側の処理や SQLite が遅いのか、です。対処がまったく違うので、推測ではなく計測で切り分けます。
          </p>
          <Figure n="58-3" title="計測の2層と、それぞれの道具" caption="WebView 層は React DevTools の Profiler、Rust 層は cargo flamegraph で測る。間の IPC はコマンドの往復時間をログで測る。">
            <ProfilingLayersFigure />
          </Figure>
          <h3>WebView 層：React DevTools と Profiler</h3>
          <p>
            React 公式の <Term en="React Developer Tools">React Developer Tools</Term> は、「React コンポーネントの検査、props と state の編集、性能問題の特定」のための道具で、Chrome・Firefox・Edge の拡張として入れると Components と Profiler の2つのパネルが増えます。<Ref n={8} /> Tauri の WebView は macOS では WebKit なので拡張は入れられませんが、公式は Safari など向けに単体版を用意しています。<code>npm install -g react-devtools</code> で入れ、<code>react-devtools</code> で起動し、ページの <code>&lt;head&gt;</code> の先頭に <code>&lt;script src="http://localhost:8097"&gt;&lt;/script&gt;</code> を足して接続します。<Ref n={8} /> 開発中だけ <code>index.html</code> にこのタグを入れ、<ChapterLink n={37} /> の CSP で <code>localhost:8097</code> を許可すれば、<code>tauri dev</code> のまま Profiler が使えます。
          </p>
          <p>
            コードから数字を取りたいときは、<code>&lt;Profiler&gt;</code> コンポーネントを使います。<code>id</code> と <code>onRender</code> を受け取り、その中のコンポーネントが更新されるたびに描画時間を知らせます。<Ref n={9} />
          </p>
          <Code
            lang="tsx"
            code={`
import { Profiler, type ProfilerOnRenderCallback } from 'react'

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration) => {
  // actualDuration: 今回の更新にかかった時間（ms）
  // baseDuration: メモ化なしで全体を再描画した場合の見積もり（ms）
  console.log(\`\${id} \${phase} actual=\${actualDuration.toFixed(1)} base=\${baseDuration.toFixed(1)}\`)
}

<Profiler id="Editor" onRender={onRender}>
  <Editor pageId={pageId} />
</Profiler>
`}
          />
          <p>
            公式リファレンスは、<code>actualDuration</code> が <code>baseDuration</code> より十分小さければメモ化（<ChapterLink n={14} />）が効いている、と読むよう案内しています。<Ref n={9} /> また Profiler は本番ビルドでは無効で、使うには profiling を有効にした特別なビルドが要ること、各 Profiler は CPU とメモリのコストを少し足すので必要なときだけ使うこと、も注意されています。<Ref n={9} />
          </p>
          <h3>Rust 層：cargo flamegraph</h3>
          <p>
            Rust 側は <Term en="flamegraph">フレームグラフ</Term>で見ます。<code>cargo install flamegraph</code> で入る <code>cargo flamegraph</code> は、Linux では <code>perf</code>、macOS では Xcode 付属の <code>xctrace</code> を使って CPU のサンプルを集め、SVG に描きます。<Ref n={10} /> 読み方は、縦軸が呼び出しの深さ、横軸はサンプル全体に対する割合で、左右の並びに意味はありません。幅の広い関数ほど CPU 時間を使っています。色に意味はありません。<Ref n={10} />
          </p>
          <Code
            lang="bash"
            code={`
cargo install flamegraph
cd src-tauri/core
# 既定では cargo run --release 相当を計測する。結合テストの1つを対象にもできる
cargo flamegraph --test pages -- move_subtree
`}
          />
          <p>
            README は、リリースビルドで有用な出力を得るには <code>[profile.release]</code> に <code>debug = true</code> を設定するか、環境変数 <code>CARGO_PROFILE_RELEASE_DEBUG=true</code> を使うよう勧めています。<Ref n={10} /> <ChapterLink n={51} /> で <code>strip = true</code> にしたので、計測のときはこれを外します。Tsumugi の <code>core</code> クレートは Tauri に依存しないので、WebView を起動せずに検索や Markdown 変換だけを単独で計測できます。この分離は <ChapterLink n={42} /> で決めた設計の、もう1つの利点です。
          </p>
          <Callout kind="unverified">
            <p>
              macOS の Instruments（Time Profiler）に関する Apple の公式ページは、本書の制作環境では本文を取得できませんでした。macOS 側の記述は cargo flamegraph の README が xctrace に依存すると述べていることに基づきます。<Ref n={10} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'editors',
      title: 'エディタの選び方',
      body: (
        <>
          <p>
            <ChapterLink n={44} /> では BlockNote を選びました。理由は「設定なしで Notion 風の操作が手に入る」ことでしたが、要件が変わればこの判断も変わります。候補になる3つのライブラリは、実は階層をなしています。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ライブラリ</th>
                  <th>位置づけ（公式の説明）</th>
                  <th>向いている場面</th>
                  <th>注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ProseMirror</td>
                  <td>「Web でリッチテキストエディタを作るためのツールキット」。model・state・view・transform の4モジュールが中核で、スキーマで文書構造を定義し、協調編集を最初から組み込んでいる<Ref n={5} /> <Ref n={6} /></td>
                  <td>文書構造を厳密に自分で決めたい。独自の UI を全部作る</td>
                  <td>UI は何も付いてこない。学習コストが最も高い</td>
                </tr>
                <tr>
                  <td>Tiptap</td>
                  <td>「ProseMirror に基づく、ヘッドレスでフレームワーク非依存のリッチテキストエディタ」。100 以上の拡張<Ref n={11} /></td>
                  <td>自前のデザインシステムに合わせた UI を、拡張の組み合わせで作る</td>
                  <td>協調編集・コメント・バージョン履歴などは Cloud／有料<Ref n={11} /></td>
                </tr>
                <tr>
                  <td>BlockNote</td>
                  <td>「React 向けのブロックベースのリッチテキストエディタ。最小の設定で優れた体験を提供」。ProseMirror と Tiptap の上に構築<Ref n={7} /></td>
                  <td>Notion 風のブロック操作とメニューをすぐ使いたい</td>
                  <td>ブロックという前提から外れにくい。<code>@blocknote/xl-*</code> は GPL-3.0 または商用ライセンスなので採用前にライセンスを確認する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            BlockNote の公式ドキュメントは、ProseMirror と Tiptap は強力だが大規模なカスタマイズが必要で「数か月の専門的な作業」になりうる、と自らの立ち位置を説明しています。<Ref n={7} /> 逆に言えば、BlockNote の前提（ブロック、既製の UI）から外れる要件が増えたら、1段下の Tiptap に降りる判断になります。Tiptap でも足りない、たとえばブロック以外の文書構造（表組みの中に数式、脚注と相互参照）を厳密に制御したいなら、ProseMirror まで降ります。
          </p>
          <p>
            選ぶときの問いは3つです。文書構造を自分で定義する必要があるか。UI をどこまで自作できるか（人手と時間）。協調編集を将来入れるか。3つ目は前節と関係し、Yjs のバインディングが ProseMirror と Tiptap に用意されていること<Ref n={4} /> を踏まえると、BlockNote の下層でも同期は実現できます。
          </p>
        </>
      ),
    },
    {
      id: 'electron',
      title: 'Electron との比較のふり返り',
      body: (
        <>
          <p>
            <ChapterLink n={1} /> では、Electron と Tauri を表の上で比べました。実装と配布を一通り経験した今、同じ比較を読み直します。
          </p>
          <p>
            Electron の公式ドキュメントは、Electron を「JavaScript、HTML、CSS でデスクトップアプリを作るフレームワーク」と定義し、「Chromium と Node.js をバイナリに埋め込むことで、1つの JavaScript コードベースを維持できる」と説明しています。<Ref n={12} /> プロセスモデルは、1つのメインプロセス（Node.js で動き、<code>BrowserWindow</code> を作る）と、ウィンドウごとのレンダラープロセスに分かれ、レンダラーには Node.js への直接アクセスがなく、プリロードスクリプトが <code>contextBridge</code> で機能を公開します。<Ref n={13} />
          </p>
          <div className="compare">
            <div>
              <h4>Electron</h4>
              <ul>
                <li>描画：同梱した Chromium。全 OS で同じ描画結果</li>
                <li>ロジック：メインプロセスの Node.js（JavaScript）</li>
                <li>境界：プリロードと contextBridge で IPC を公開</li>
                <li>サイズ：Chromium と Node.js を含むぶん大きい</li>
                <li>言語：JavaScript だけで完結</li>
              </ul>
            </div>
            <div>
              <h4>Tauri（本書で経験したこと）</h4>
              <ul>
                <li>描画：OS の WebView（WebKit、WebView2、WebKitGTK）。OS ごとの差を意識する（<ChapterLink n={33} />）</li>
                <li>ロジック：Rust の Core。所有権と型で守られる（第4部）</li>
                <li>境界：コマンドと capability で許可する機能を列挙（<ChapterLink n={34} />、<ChapterLink n={37} />）</li>
                <li>サイズ：WebView を同梱しないぶん小さい。Windows は WebView2 の用意が要る（<ChapterLink n={51} />）</li>
                <li>言語：TypeScript と Rust の2言語。型を手でそろえる手間がある</li>
              </ul>
            </div>
          </div>
          <p>
            第1章では「小さい」「安全」という言葉で片付けていた差が、今は具体的な作業として思い浮かぶはずです。WebView が OS 依存であることは、<ChapterLink n={40} /> の E2E テストが macOS で別の道具を要したことや、<ChapterLink n={51} /> で Windows に WebView2 の配布方式を選んだことに現れました。Rust を使うことは、<ChapterLink n={42} /> で <code>core</code> クレートを Tauri から切り離してテストできたことや、前節で WebView なしに計測できたことに現れました。
          </p>
          <p>
            一方で、配布の苦労はどちらも同じです。<ChapterLink n={52} /> の署名と公証は OS の要件であって、フレームワークは関係ありません。更新の仕組みも、Electron には Electron の、Tauri には updater プラグインの、という形でそれぞれ用意されています。「Tauri なら配布が楽」ということはなく、「アプリが小さい」「Rust で書ける」という利点と、「WebView の差」「2言語」という負担を天秤にかけるのが、第1章の表の本当の読み方です。
          </p>
        </>
      ),
    },
    {
      id: 'resources',
      title: '学習リソース',
      body: (
        <>
          <p>
            本書は TypeScript・React・Rust・Tauri を1冊で扱ったため、各技術の公式資料に比べれば浅い部分があります。次に読むべき公式の資料を挙げます。いずれも本書の執筆時点（2026年11月）で実際に開いて確認したものです。
          </p>
          <ul>
            <li>
              Rust：The Rust Programming Language（通称 the book）。第4部の土台にした公式の入門書で、<code>rustup doc --book</code> でオフラインでも開けます。クイズや可視化付きの対話版（rust-book.cs.brown.edu）も案内されています。<Ref n={14} /> あわせて Rustlings。「Rust のコードを読み書きすることに慣れるための小さな演習」で、<code>cargo install rustlings</code> と <code>rustlings init</code> で始められ、公式が「the book と並行して」取り組むよう勧めています。<Ref n={15} />
            </li>
            <li>
              React：react.dev の Learn。Quick Start は「日常的に使う React の概念の 80%」を紹介すると自ら述べており、<ChapterLink n={7} /> から <ChapterLink n={14} /> の内容を公式の順序で復習できます。<Ref n={16} />
            </li>
            <li>
              Tauri：v2.tauri.app の各ガイドと、プラグインごとのリファレンス。本書の第5部と第7部の出典はほぼここです。質問の場は、公式リポジトリの README が案内する Discord サーバーです。<Ref n={17} />
            </li>
            <li>
              同期：crdt.tech の解説と論文一覧、<Ref n={1} /> Automerge のドキュメント（Hello とチュートリアル）、<Ref n={2} /> Yjs のドキュメント。<Ref n={4} />
            </li>
            <li>
              エディタ：ProseMirror の Library guide は、エディタの内部構造を理解するうえで BlockNote を使い続ける場合にも役立ちます。<Ref n={6} />
            </li>
          </ul>
          <p>
            資料を選ぶ基準は、本書と同じです。公式か一次情報であること、バージョンと日付が明記されていること、そして実際に動かして確かめられることです。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi-config',
      title: 'Tsumugi に適用する設定例',
      body: (
        <>
          <p>
            この章の内容のうち、今すぐ Tsumugi に入れられるのは計測の準備です。<ChapterLink n={51} /> の <code>[profile.release]</code> は <code>strip = true</code> でシンボルを消しているので、計測のときだけ Cargo の環境変数でプロファイル設定を上書きします。README が案内する <code>CARGO_PROFILE_RELEASE_DEBUG=true</code> に加え、同じ形式で <code>STRIP</code> も上書きします。<Ref n={10} />
          </p>
          <Code
            lang="bash"
            code={`
cd src-tauri/core
# 結合テストの1つ（例：search.rs の fts_query）を対象に計測する
CARGO_PROFILE_RELEASE_DEBUG=true CARGO_PROFILE_RELEASE_STRIP=false \\
  cargo flamegraph --test search -- fts_query
# flamegraph.svg をブラウザで開く
`}
          />
          <p>
            フロントエンド側は、開発時だけ <code>&lt;Profiler&gt;</code> でエディタを包み、結果を <ChapterLink n={38} /> の log プラグイン経由で Rust 側のログに流しておくと、IPC の往復時間と並べて見られます。
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/EditorPane.tsx（抜粋）"
            code={`
import { Profiler, type ProfilerOnRenderCallback } from 'react'
import { debug } from '@tauri-apps/plugin-log'

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  void debug(\`[profiler] \${id} \${phase} \${actualDuration.toFixed(1)}ms\`)
}

export function EditorPane({ pageId }: { pageId: string }) {
  const editor = <Editor pageId={pageId} />
  // 本番ビルドでは Profiler は何もしないが、コストを避けて開発時だけ包む
  return import.meta.env.DEV ? (
    <Profiler id="Editor" onRender={onRender}>{editor}</Profiler>
  ) : (
    editor
  )
}
`}
          />
          <p>
            同期とエディタの変更は設定で済む話ではないので、ここでは入れません。方向性は前の節の Callout と表に書いたとおりです。
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
            <li>複数端末の同期には、サーバー権威、OT（中央の権威が順序を決める。ProseMirror の協調編集がこの系統）、CRDT（どの順で届いても収束する。Automerge、Yjs）の3方式がある。オフライン前提のノートには CRDT が向く。</li>
            <li>性能は WebView 層（React DevTools の Profiler、<code>&lt;Profiler&gt;</code>）と Rust 層（cargo flamegraph、<code>debug = true</code>）で切り分けて測る。Tauri 非依存の core クレートは単独で計測できる。</li>
            <li>エディタは ProseMirror（ツールキット）、Tiptap（ヘッドレス＋拡張）、BlockNote（ブロック＋既製 UI）の階層で、要件が既製の前提から外れるほど下層へ降りる。</li>
            <li>Electron は Chromium と Node.js を同梱し、Tauri は OS の WebView と Rust を使う。小ささと安全性の代わりに、WebView の差と2言語の負担を引き受ける。配布の要件は両者で変わらない。</li>
            <li>次に読むのは the book と Rustlings、react.dev の Learn、v2.tauri.app、そして crdt.tech・Automerge・Yjs・ProseMirror の公式資料。</li>
          </ul>
          <p>本文はここまでです。付録の用語集は、本書で定義した用語を章番号付きで引けるようにしています。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Conflict-free Replicated Data Types',
      publisher: 'crdt.tech',
      url: 'https://crdt.tech/',
      accessed: '2026-11-08',
      note: 'CRDT の定義、レプリカ間の変更を特別な競合解決コードや利用者の介入なしに結合できること、中央サーバーを前提としないことの根拠。',
    },
    {
      title: 'Hello Automerge',
      publisher: 'Automerge',
      url: 'https://automerge.org/docs/hello/',
      accessed: '2026-11-08',
      note: 'Automerge の定義、ローカルファースト、JavaScript 実装と Rust 実装（WebAssembly、C API）の根拠。',
    },
    {
      title: 'Automerge Concepts',
      publisher: 'Automerge',
      url: 'https://automerge.org/docs/reference/concepts/',
      accessed: '2026-11-08',
      note: '文書が JSON 風オブジェクトと git 風の履歴であること、任意の2文書をマージできること、同期プロトコルがトランスポート非依存であることの根拠。',
    },
    {
      title: 'Yjs Docs - Introduction',
      publisher: 'Yjs',
      url: 'https://docs.yjs.dev/',
      accessed: '2026-11-08',
      note: 'Yjs の定義、共有型、ネットワークを仮定しないこと、ProseMirror と Tiptap のバインディングの根拠。',
    },
    {
      title: 'ProseMirror',
      publisher: 'ProseMirror',
      url: 'https://prosemirror.net/',
      accessed: '2026-11-08',
      note: '「リッチテキストエディタを作るためのツールキット」という定義と、スキーマ・モジュール構成・協調編集の特徴の根拠。',
    },
    {
      title: 'ProseMirror Guide',
      publisher: 'ProseMirror',
      url: 'https://prosemirror.net/docs/guide/',
      accessed: '2026-11-08',
      note: 'model・state・view・transform の4モジュール、スキーマの役割、協調編集が中央権威と rebase で動くことの根拠。',
    },
    {
      title: 'BlockNote Docs - Introduction',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'BlockNote の定義、ProseMirror と Tiptap の上に構築されていること、リアルタイム協調編集の機能、「数か月の専門的な作業」という説明の根拠。',
    },
    {
      title: 'React Developer Tools',
      publisher: 'React',
      url: 'https://react.dev/learn/react-developer-tools',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'ブラウザ拡張の Components・Profiler パネル、Safari など向けの単体版（react-devtools、localhost:8097 の script タグ）の根拠。',
    },
    {
      title: '<Profiler>',
      publisher: 'React',
      url: 'https://react.dev/reference/react/Profiler',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'Profiler の id・onRender、actualDuration と baseDuration の読み方、本番ビルドでは無効であること、コストの注意の根拠。',
    },
    {
      title: 'flamegraph-rs/flamegraph README',
      publisher: 'GitHub（flamegraph-rs）',
      url: 'https://github.com/flamegraph-rs/flamegraph',
      accessed: '2026-11-08',
      note: 'cargo flamegraph のインストール、Linux の perf と macOS の xctrace、[profile.release] debug = true の推奨、フレームグラフの読み方（縦軸・横軸・幅・色）の根拠。',
    },
    {
      title: 'Tiptap Docs',
      publisher: 'Tiptap',
      url: 'https://tiptap.dev/docs',
      accessed: '2026-11-08',
      note: '「ProseMirror に基づくヘッドレスでフレームワーク非依存のエディタ」という定義、100 以上の拡張、協調編集などが Cloud／有料であることの根拠。',
    },
    {
      title: 'Electron Documentation',
      publisher: 'Electron（OpenJS Foundation）',
      url: 'https://www.electronjs.org/docs/latest',
      accessed: '2026-11-08',
      note: 'Electron の定義と、Chromium と Node.js を埋め込むことで1つの JavaScript コードベースを維持できるという説明の根拠。',
    },
    {
      title: 'Process Model',
      publisher: 'Electron（OpenJS Foundation）',
      url: 'https://www.electronjs.org/docs/latest/tutorial/process-model',
      accessed: '2026-11-08',
      note: 'メインプロセスとレンダラープロセス、プリロードスクリプトと contextBridge の根拠。',
    },
    {
      title: 'The Rust Programming Language',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/',
      accessed: '2026-11-08',
      version: 'Rust 1.97 / 2024 edition 対応版',
      note: 'rustup doc --book でのオフライン閲覧、対話版（rust-book.cs.brown.edu）の案内の根拠。',
    },
    {
      title: 'Rustlings',
      publisher: 'The Rust Project',
      url: 'https://rustlings.rust-lang.org/',
      accessed: '2026-11-08',
      note: 'Rustlings の定義、cargo install rustlings と rustlings init、the book と並行して取り組む推奨の根拠。',
    },
    {
      title: 'Quick Start',
      publisher: 'React',
      url: 'https://react.dev/learn',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'Learn セクションの位置づけ（日常的に使う概念の 80%）の根拠。',
    },
    {
      title: 'tauri-apps/tauri README',
      publisher: 'GitHub（tauri-apps）',
      url: 'https://github.com/tauri-apps/tauri',
      accessed: '2026-11-08',
      note: '公式の Discord サーバーが README で案内されていることの根拠。',
    },
  ],
}

export default chapter
