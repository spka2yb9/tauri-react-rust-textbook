import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 9-1 トリガー→レンダー→コミット ---------- */
function RenderCycleFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="React が画面を更新する3段階。ユーザー操作などで state の更新がトリガーされ、React がコンポーネント関数を呼ぶレンダーが行われ、前回との差分だけを DOM に反映するコミットが行われ、最後にブラウザが画面を描く。コミット後は次のトリガーを待つ">
      <defs>
        <marker id="arrow9a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="60" width="140" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="90" y="85" textAnchor="middle" fontWeight="600">1. トリガー</text>
        <text x="90" y="108" textAnchor="middle" fontSize="12">初回描画、または</text>
        <text x="90" y="126" textAnchor="middle" fontSize="12">set 関数の呼び出し</text>

        <path d="M160,105 L208,105" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow9a)" />

        <rect x="210" y="60" width="220" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="85" textAnchor="middle" fontWeight="600">2. レンダー</text>
        <text x="320" y="108" textAnchor="middle" fontSize="12">React がコンポーネント関数を呼ぶ</text>
        <text x="320" y="126" textAnchor="middle" fontSize="12">（子へ再帰。純粋な計算）</text>

        <path d="M430,105 L458,105" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow9a)" />

        <rect x="460" y="60" width="160" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="85" textAnchor="middle" fontWeight="600">3. コミット</text>
        <text x="540" y="108" textAnchor="middle" fontSize="12">前回との差分だけを</text>
        <text x="540" y="126" textAnchor="middle" fontSize="12">DOM に反映</text>

        <path d="M540,150 L540,185" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow9a)" />
        <rect x="460" y="188" width="160" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="540" y="213" textAnchor="middle">ブラウザが画面を描く</text>

        {/* loop back */}
        <path d="M460,208 L90,208 L90,152" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow9a)" />
        <text x="270" y="200" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">次の操作で再び state を更新 → 再レンダー</text>
      </g>
      <text x="320" y="262" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">レンダーでは DOM に触らない。DOM を変えるのはコミットだけで、差分がなければ何もしない</text>
      <text x="320" y="282" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">点線：更新のたびに繰り返されるループ</text>
    </svg>
  )
}

/* ---------- 図 9-2 state はスナップショット ---------- */
function SnapshotFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="number が 0 のレンダーで setNumber(number + 1) を3回呼んだときの様子。3回とも number は 0 のスナップショットを見るので setNumber(1) が3回キューに入り、次のレンダーでは number が 1 になる">
      <defs>
        <marker id="arrow9b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* レンダー1 */}
      <rect x="20" y="20" width="290" height="250" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="165" y="45" fontSize="14" fontWeight="600" textAnchor="middle">レンダー 1（number = 0）</text>
      <rect x="40" y="60" width="250" height="34" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="165" y="82" fontSize="12" textAnchor="middle">{'<button onClick={...}>+3</button>'}</text>
      <text x="165" y="118" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">クリック → このレンダーのハンドラが動く</text>
      <g fontSize="12">
        <rect x="40" y="130" width="250" height="28" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="50" y="149">setNumber(number + 1)  // 0 + 1</text>
        <rect x="40" y="164" width="250" height="28" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="50" y="183">setNumber(number + 1)  // 0 + 1</text>
        <rect x="40" y="198" width="250" height="28" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="50" y="217">setNumber(number + 1)  // 0 + 1</text>
      </g>
      <text x="165" y="252" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">number はこのレンダーの間ずっと 0</text>
      {/* queue */}
      <path d="M310,178 L368,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow9b)" />
      <rect x="370" y="140" width="100" height="80" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="420" y="162" fontSize="12" fontWeight="600" textAnchor="middle">更新キュー</text>
      <text x="420" y="182" fontSize="12" textAnchor="middle">「1 にする」</text>
      <text x="420" y="198" fontSize="12" textAnchor="middle">「1 にする」</text>
      <text x="420" y="214" fontSize="12" textAnchor="middle">「1 にする」</text>
      <path d="M470,178 L518,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow9b)" />
      {/* レンダー2 */}
      <rect x="520" y="120" width="100" height="116" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="570" y="145" fontSize="13" fontWeight="600" textAnchor="middle">レンダー 2</text>
      <text x="570" y="170" fontSize="13" textAnchor="middle">number = 1</text>
      <text x="570" y="195" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">（3 ではない）</text>
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">set 関数は「今の変数」を変えず、次のレンダーのための更新をキューに積むだけ</text>
      <text x="320" y="320" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：React 内部のキューの構造は簡略化している</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 9,
  part: 3,
  title: 'state とイベント、レンダリングの仕組み',
  summary:
    'コンポーネントが情報を記憶し、操作に応じて画面を更新する仕組みが state です。useState とイベントハンドラの書き方から始め、トリガー→レンダー→コミットという React の更新サイクル、state がレンダーごとのスナップショットである理由、更新のバッチ処理、オブジェクトと配列を置き換えで更新する方法を学びます。',
  goals: [
    'useState で state を宣言し、set 関数で更新して再描画を起こせる',
    'イベントハンドラを「渡す」と「呼ぶ」の違い、伝播の止め方、既定動作の抑止を説明できる',
    'トリガー・レンダー・コミットの3段階と、各段階で React が何をするかを説明できる',
    'state がレンダーごとのスナップショットである理由と、set 関数を複数回呼んだときの結果を予測できる',
    'バッチ処理と更新関数（n => n + 1）の使い分けを説明できる',
    'state のオブジェクトと配列を、変更ではなく置き換えで更新できる',
  ],
  prerequisites: [7, 8],
  sections: [
    {
      id: 'why-state',
      title: 'なぜ state が必要か',
      body: (
        <>
          <p>
            <ChapterLink n={8} /> までのコンポーネントは、props から画面を計算するだけでした。しかし実際の画面は、入力欄の文字、開いているパネル、選択中の項目など、操作に応じて変わる情報を「覚えて」いなければなりません。
          </p>
          <p>
            普通のローカル変数ではこれができません。理由は2つあります。第一に、ローカル変数はレンダーをまたいで保持されません。React がコンポーネントを再び呼ぶとき、関数は最初から実行されるので、前回の変更は消えています。第二に、ローカル変数を変えても React は気付かず、再描画が起きません。<Ref n={1} />
          </p>
          <p>
            つまり、画面を更新するには「レンダーをまたいで値を保持する」ことと「新しい値で React に再描画させる」ことの両方が必要です。この2つを同時に提供するのが <Term en="state">state</Term> で、宣言には <code>useState</code> を使います。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'usestate',
      title: 'useState の使い方',
      body: (
        <>
          <Code
            lang="tsx"
            code={`
import { useState } from 'react'

function Gallery({ sculptures }: { sculptures: Sculpture[] }) {
  const [index, setIndex] = useState(0)          // number と推論される
  const [showMore, setShowMore] = useState(false) // boolean と推論される

  const sculpture = sculptures[index]
  function handleNext() {
    setIndex(index + 1)
  }
  return (
    <>
      <button onClick={handleNext}>次へ</button>
      <h2>{sculpture.name}</h2>
      <button onClick={() => setShowMore(!showMore)}>{showMore ? '隠す' : '詳細'}</button>
      {showMore && <p>{sculpture.description}</p>}
    </>
  )
}
`}
          />
          <p>
            <code>useState</code> の引数は初期値で、戻り値は「現在の値」と「値を更新する関数」の2要素の配列です。<code>const [index, setIndex]</code> という書き方は配列の分割代入で、<code>[something, setSomething]</code> と名付けるのが慣例です。<Ref n={1} /> 更新するときは変数に代入するのではなく、<code>setIndex(index + 1)</code> のように set 関数を呼びます。これが新しい値を保存し、再描画を予約します。
          </p>
          <p>
            型は初期値から推論されます。<code>useState(0)</code> なら <code>number</code> です。初期値が <code>null</code> だったりユニオン型だったりするときは、<code>{"useState<Status>('idle')"}</code> のように型引数で明示します。<Ref n={2} /> 初期値の計算が重い場合は、値ではなく関数 <code>useState(createInitialTodos)</code> を渡すと初回だけ呼ばれます。<Ref n={3} />
          </p>
          <h3>Hooks のルール</h3>
          <p>
            <code>useState</code> のように <code>use</code> で始まる関数を <Term en="Hook">フック</Term> と呼びます。フックには1つ大きな制約があります。コンポーネントまたは他のフックの最上位でしか呼べず、条件分岐やループ、入れ子の関数の中では呼べません。<Ref n={1} /> React は state を名前ではなく呼び出し順で対応付けているため、レンダーごとに呼び出し順が変わると壊れるからです。<code>if</code> の中で呼んで、前回より呼び出し数が減るレンダーが起きると「Rendered fewer hooks than expected」のような実行時エラーになります。<Ref n={1} />
          </p>
          <h3>state はコンポーネントのインスタンスごとに独立</h3>
          <p>
            同じコンポーネントを画面に2回置くと、それぞれが完全に独立した state を持ちます。一方の <code>Gallery</code> で「次へ」を押しても、もう一方には影響しません。state は props と違い、宣言したコンポーネントだけのもので、親からも見えません。<Ref n={1} /> 2つを連動させたいときの方法（state の持ち上げ）は <ChapterLink n={10} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'events',
      title: 'イベントハンドラ',
      body: (
        <>
          <p>
            state を更新するきっかけは、たいていユーザーの操作です。操作に応じて実行する関数を <Term en="event handler">イベントハンドラ</Term> と呼び、<code>onClick</code> のような props に渡します。<Ref n={4} />
          </p>
          <Code
            lang="tsx"
            code={`
// 正しい：関数を「渡す」。クリック時に React が呼ぶ
<button onClick={handleClick}>保存</button>
<button onClick={() => setOpen(true)}>開く</button>

// 間違い：関数を「呼んで」いる。レンダーのたびに実行される
<button onClick={handleClick()}>保存</button>
`}
          />
          <p>
            公式ドキュメントは「ハンドラに渡す関数は、呼ぶのではなく渡す」と強調しています。<code>handleClick()</code> と括弧を付けると、レンダー中に即座に実行され、その戻り値（<code>undefined</code>）がハンドラになります。state を更新するハンドラをこう書くと、レンダー → 更新 → レンダー、の無限ループになり「Too many re-renders」というエラーで止まります。<Ref n={3} />
          </p>
          <h3>伝播と既定動作</h3>
          <p>
            <ChapterLink n={4} /> で学んだイベントの伝播（バブリング）は React でも同じです。ボタンのクリックは、ボタンの <code>onClick</code> の後に親の <code>{'<div>'}</code> の <code>onClick</code> も発火させます。親に届かせたくないときは <code>e.stopPropagation()</code> を呼びます。<code>{'<form>'}</code> の送信でページが再読み込みされるような、ブラウザの既定の動作を止めるのは <code>e.preventDefault()</code> です。2つは無関係な別の機能なので混同しないでください。<Ref n={4} /> React のイベントは <code>onScroll</code> を除いてすべて伝播します。<Ref n={4} />
          </p>
          <p>
            イベントハンドラは副作用を起こしてよい場所です。<ChapterLink n={8} /> で「コンポーネント関数は純粋に」と学びましたが、ハンドラは描画の途中では動かないので純粋である必要はありません。公式ドキュメントは「イベントハンドラは副作用に最適の場所」と言い切っています。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'render-cycle',
      title: 'トリガー → レンダー → コミット',
      body: (
        <>
          <p>
            set 関数を呼んでから画面が変わるまでに、React の内部では何が起きているのでしょうか。公式ドキュメントはこれを、レストランの注文にたとえて3段階で説明しています。コンポーネントは料理人、React はウェイターです。<Ref n={5} />
          </p>
          <ol className="steps">
            <li>トリガー：注文をキッチンに届ける。初回描画か、state の更新がきっかけになる。</li>
            <li>レンダー：キッチンで料理を作る。React がコンポーネント関数を呼び、返された JSX（React 要素）を受け取る。</li>
            <li>コミット：料理をテーブルに運ぶ。React が DOM を変更する。</li>
          </ol>
          <Figure n="9-1" title="React が画面を更新する3段階" caption="トリガーで始まり、レンダーでコンポーネント関数が呼ばれ、コミットで差分だけが DOM に反映される。その後ブラウザが画面を描く。state が更新されるたびにこのループが回る。">
            <RenderCycleFigure />
          </Figure>
          <h3>段階1：トリガー</h3>
          <p>
            レンダーが起きる理由は2つだけです。アプリ起動時の初回描画と、コンポーネント自身またはその祖先の state が更新されたときです。<Ref n={5} /> 初回描画は <ChapterLink n={7} /> で見た <code>createRoot(...).render(...)</code> が起こし、それ以降は set 関数の呼び出しが自動的にレンダーを予約します。
          </p>
          <h3>段階2：レンダー</h3>
          <p>
            <Term en="render">レンダー</Term> とは「React がコンポーネント関数を呼ぶこと」です。<Ref n={5} /> 初回はルートコンポーネントを、再レンダーでは state が更新されたコンポーネントを呼びます。呼ばれた関数が別のコンポーネントを返せばそれも呼び、入れ子がなくなるまで再帰的に続きます。再レンダーのとき、React は前回のレンダー結果と比べてどの属性が変わったかを計算しますが、この段階では DOM に触りません。<Ref n={5} />
          </p>
          <p>
            レンダーは純粋な計算でなければなりません（<ChapterLink n={8} />）。同じ入力に同じ JSX を返し、既存のオブジェクトや変数を変えない。この約束があるから、React はレンダーを途中で中断したり、やり直したりできます。
          </p>
          <h3>段階3：コミット</h3>
          <p>
            <Term en="commit">コミット</Term> では、React が DOM を変更します。初回は作った DOM ノードを <code>appendChild()</code> で画面に置き、再レンダーでは「レンダー中に計算した最小限の操作」だけを適用します。公式ドキュメントの原則は「React はレンダー間で差分があった DOM ノードだけを変更する」です。<Ref n={5} />
          </p>
          <p>
            これを確かめられる例があります。毎秒新しい <code>time</code> props を受け取る <code>Clock</code> が <code>{'<h1>{time}</h1><input />'}</code> を返すとき、入力欄に文字を打っても消えません。<code>{'<input>'}</code> は前回と同じ位置にあるので、React は <code>{'<h1>'}</code> のテキストだけを更新し、<code>{'<input>'}</code> には触らないからです。<Ref n={5} />
          </p>
          <p>
            コミットが終わると、ブラウザが画面を描き直します。公式ドキュメントはこれを React の「レンダー」と区別するために「ペイント」と呼んでいます。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'snapshot',
      title: 'state はスナップショット',
      body: (
        <>
          <p>
            set 関数を呼ぶと再レンダーが予約されますが、「今持っている state 変数」の値は変わりません。この性質を理解していないと、次のコードの結果に驚くことになります。<Ref n={6} />
          </p>
          <Code
            lang="tsx"
            code={`
const [number, setNumber] = useState(0)

<button onClick={() => {
  setNumber(number + 1)
  setNumber(number + 1)
  setNumber(number + 1)
}}>+3</button>
`}
          />
          <p>
            このボタンを1回押すと、<code>number</code> は 3 ではなく 1 になります。理由を図で確認します。
          </p>
          <Figure n="9-2" title="state のスナップショットと +3 ボタン" caption="レンダー 1 では number が 0 に固定されている。3回の setNumber はすべて「0 + 1 = 1 にする」という更新をキューに積む。次のレンダーで number は 1 になる。模式図。">
            <SnapshotFigure />
          </Figure>
          <p>
            コンポーネント関数が返す JSX は、そのレンダー時点の UI の「スナップショット」です。その中の props、イベントハンドラ、ローカル変数は、すべてレンダー時の state を使って計算されています。<Ref n={6} /> state そのものは関数の外、React の中に「棚に置かれたように」保管されていて、レンダーのたびに React がそのときの値を渡してくれます。<Ref n={6} />
          </p>
          <p>
            だから、レンダー 1 で作られたハンドラの中では、<code>number</code> は何回読んでも <code>0</code> です。<code>setNumber(number + 1)</code> は3回とも <code>setNumber(1)</code> と同じ意味になります。公式ドキュメントの原則は「state 変数の値は、1回のレンダーの中では決して変わらない」です。<Ref n={6} />
          </p>
          <p>
            これは非同期処理でも同じです。<code>setNumber(number + 5)</code> の後に <code>setTimeout(() =&gt; alert(number), 3000)</code> を書くと、3秒後のアラートには更新前の値が表示されます。アラートは「ユーザーが操作した時点のスナップショット」を使って予約されたからです。<Ref n={6} /> 一見不便に思えますが、「ハンドラの実行中に state が変わっているかもしれない」と心配しなくてよいのは、この性質のおかげです。
          </p>
          <Callout>
            <p>
              set 関数を呼んだ直後に <code>console.log(number)</code> しても古い値が出るのは、バグではなくこの性質です。更新後の値をその場で使いたいなら、<code>const next = number + 1; setNumber(next)</code> のように、まず変数に入れてから set 関数に渡します。<Ref n={3} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'batching',
      title: 'バッチ処理と更新関数',
      body: (
        <>
          <p>
            前節の例で、React は <code>setNumber</code> を1回呼ぶたびに再レンダーしたわけではありません。React は「イベントハンドラの中のすべてのコードが実行し終わるまで待ってから」state の更新をまとめて処理します。これを <Term en="batching">バッチ処理</Term> と呼びます。<Ref n={7} /> 注文を全部聞いてからキッチンに伝えるウェイターと同じで、途中の中途半端な状態で画面が描かれることがなく、再レンダーの回数も減ります。ただし、クリック2回のような別々のイベントはまとめられず、それぞれ処理されます。<Ref n={7} />
          </p>
          <p>
            では、1つのイベントで同じ state を複数回更新したいときはどうすればよいのでしょうか。set 関数には、値の代わりに「前の state から次の state を計算する関数」を渡せます。これを <Term en="updater function">更新関数</Term> と呼びます。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            code={`
<button onClick={() => {
  setNumber((n) => n + 1)
  setNumber((n) => n + 1)
  setNumber((n) => n + 1)
}}>+3</button>   // 今度は 3 増える
`}
          />
          <p>
            React は更新関数をキューに積み、次のレンダーで順に実行します。各関数は前の関数の戻り値を <code>n</code> として受け取ります。<Ref n={7} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>キューの更新</th>
                  <th>n</th>
                  <th>戻り値</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>n =&gt; n + 1</code></td><td>0</td><td>1</td></tr>
                <tr><td><code>n =&gt; n + 1</code></td><td>1</td><td>2</td></tr>
                <tr><td><code>n =&gt; n + 1</code></td><td>2</td><td>3</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            値と関数を混ぜたときの規則も単純です。更新関数はキューに追加され、値は「その値に置き換える」という操作としてキューに追加されます。置き換えは、それより前にキューに積まれたものを無視します。<Ref n={7} /> たとえば <code>setNumber(number + 5)</code> → <code>setNumber(n =&gt; n + 1)</code> → <code>setNumber(42)</code> の順に呼ぶと、最終結果は 42 です。
          </p>
          <p>
            更新関数はレンダー中に実行されるため、純粋でなければなりません。中で別の state を更新したり副作用を起こしたりしてはいけません。StrictMode では、純粋さを確かめるために更新関数も2回呼ばれます（結果の一方は捨てられます）。<Ref n={7} /> 引数名は <code>setEnabled(e =&gt; !e)</code> のように state 名の頭文字を使うのが慣例です。<Ref n={7} />
          </p>
          <p>
            まとめると、「前の値に基づいて更新する」場面では更新関数を使うのが安全です。「特定の値にする」場面では値を渡せば十分です。
          </p>
        </>
      ),
    },
    {
      id: 'objects-arrays',
      title: 'オブジェクトと配列の更新',
      body: (
        <>
          <p>
            数値や文字列の state は、<code>setCount(5)</code> のように新しい値で置き換えるしかありません。オブジェクトや配列は技術的には書き換え（<Term en="mutation">ミューテーション</Term>）できますが、React の state では「数値と同じく不変のものとして扱い、常に置き換える」のが規則です。<Ref n={8} />
          </p>
          <Code
            lang="tsx"
            code={`
const [position, setPosition] = useState({ x: 0, y: 0 })

// 悪い例：前回のレンダーのオブジェクトを書き換えている。React は気付かない
onPointerMove={(e) => {
  position.x = e.clientX
  position.y = e.clientY
}}

// 良い例：新しいオブジェクトを作って置き換える
onPointerMove={(e) => {
  setPosition({ x: e.clientX, y: e.clientY })
}}
`}
          />
          <p>
            書き換えが問題なのは、set 関数を通らないため React が変化を検知できず、再レンダーが起きないからです。<Ref n={8} /> また、React は「前の値と新しい値が <code>Object.is</code> で同じなら再レンダーを省略する」という最適化をしているので、同じオブジェクトを書き換えて set 関数に渡しても、同じ参照なので何も起きません。<Ref n={3} />
          </p>
          <h3>スプレッド構文で一部だけ変える</h3>
          <Code
            lang="tsx"
            code={`
const [person, setPerson] = useState({ firstName: 'Niki', lastName: 'de Saint Phalle', artwork: { title: 'Blue Nana', city: 'Hamburg' } })

// 1段階：他のフィールドをコピーし、1つだけ上書き
setPerson({ ...person, firstName: e.target.value })

// 入れ子：変更したい場所までの各段階をコピーする
setPerson({ ...person, artwork: { ...person.artwork, city: 'New Delhi' } })
`}
          />
          <p>
            <code>...</code> スプレッドは浅いコピーで、1段階しか複製しません。入れ子のプロパティを変えるときは、変える場所までの各段階で使います。<Ref n={8} /> 入れ子が深くて面倒なら、state を平坦な構造に変えるか、Immer というライブラリ（<code>use-immer</code>）で「書き換えているように見えるコードから新しいコピーを作る」方法があります。<Ref n={8} />
          </p>
          <h3>配列の操作</h3>
          <p>配列も同様に、元の配列を変更するメソッドを避け、新しい配列を返すメソッドを使います。<Ref n={9} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>操作</th>
                  <th>避ける（元を変更する）</th>
                  <th>使う（新しい配列を返す）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>追加</td><td><code>push</code>、<code>unshift</code></td><td><code>concat</code>、<code>[...arr]</code> スプレッド</td></tr>
                <tr><td>削除</td><td><code>pop</code>、<code>shift</code>、<code>splice</code></td><td><code>filter</code>、<code>slice</code></td></tr>
                <tr><td>置換</td><td><code>splice</code>、<code>arr[i] = ...</code></td><td><code>map</code></td></tr>
                <tr><td>並べ替え</td><td><code>reverse</code>、<code>sort</code></td><td>先にコピーしてから変更する</td></tr>
              </tbody>
            </table>
          </div>
          <Code
            lang="tsx"
            code={`
setPages([...pages, newPage])                               // 末尾に追加
setPages(pages.filter((p) => p.id !== id))                  // 削除
setPages(pages.map((p) => (p.id === id ? { ...p, title } : p)))  // 1件だけ更新
setPages([...pages.slice(0, at), newPage, ...pages.slice(at)])   // 途中に挿入
const sorted = [...pages]; sorted.sort(byPosition); setPages(sorted)  // 並べ替え
`}
          />
          <p>
            注意点は、配列をコピーしても中の要素は同じオブジェクトだということです。<code>const next = [...pages]; next[0].title = 'x'</code> は、元の state の中のオブジェクトを書き換えてしまいます。要素を変えるときは <code>map</code> で、変えたい要素だけ新しいオブジェクトに置き換えます。公式ドキュメントの原則は「自分が今作ったばかりのオブジェクトだけを変更してよい」です。<Ref n={9} />
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
              Tsumugi のサイドバー（<ChapterLink n={43} />）は、ページの配列を state として持ち、追加・改名・削除・移動のたびにこの章の表のとおり <code>filter</code> や <code>map</code> で新しい配列に置き換えます。並び順（<code>position</code>）の変更も、コピーしてから並べ替えます。検索ダイアログ（<ChapterLink n={46} />）の「検索語」と「結果一覧」、簡易データベース（<ChapterLink n={47} />、<ChapterLink n={48} />）の「並べ替え条件」「絞り込み条件」も、すべて useState で持つ値です。
            </p>
            <p>
              「set 関数を呼んでもその場では値が変わらない」というスナップショットの性質は、Rust 側へ保存した直後に画面を更新する場面で効いてきます。たとえばページを作成するコマンド（<ChapterLink n={34} />）の戻り値を <code>setPages((prev) =&gt; [...prev, created])</code> のように更新関数で足すのは、非同期処理の完了までに他の更新が入っても取りこぼさないためです。
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
            <li>state は「レンダーをまたいで保持され」「更新すると再描画が起きる」変数。<code>useState(初期値)</code> が <code>[値, set 関数]</code> を返す。フックはコンポーネントの最上位でだけ呼ぶ。</li>
            <li>イベントハンドラは関数を渡す（呼ばない）。<code>stopPropagation</code> は伝播を止め、<code>preventDefault</code> は既定動作を止める。ハンドラは副作用を置いてよい場所。</li>
            <li>画面更新はトリガー → レンダー（コンポーネント関数を呼ぶ純粋な計算）→ コミット（差分だけ DOM に反映）の3段階。差分がなければ DOM に触らない。</li>
            <li>state はレンダーごとのスナップショット。1回のレンダーの中では値が変わらず、set 関数は次のレンダーのための更新をキューに積むだけ。</li>
            <li>React はイベントハンドラの終了までまとめて（バッチで）処理する。前の値に基づく更新は <code>setN(n =&gt; n + 1)</code> の更新関数で書く。</li>
            <li>オブジェクトと配列は書き換えず、スプレッド・<code>map</code>・<code>filter</code> で新しい値を作って置き換える。</li>
          </ul>
          <p>次章では、フォームの入力を state で扱う方法と、state をどこに置くか、どう設計するかという判断を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: "State: A Component's Memory",
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/state-a-components-memory',
      accessed: '2026-11-08',
      note: 'ローカル変数では不十分な2つの理由、useState の構造と命名、フックのルール、state がインスタンスごとに独立である点の根拠。',
    },
    {
      title: 'Using TypeScript',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/typescript',
      accessed: '2026-11-08',
      note: 'useState の型推論と型引数の明示の根拠。',
    },
    {
      title: 'useState – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/useState',
      accessed: '2026-11-08',
      note: '初期化関数、Object.is による再レンダー省略、「Too many re-renders」、set 直後に古い値が見える点の根拠。',
    },
    {
      title: 'Responding to Events',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/responding-to-events',
      accessed: '2026-11-08',
      note: 'ハンドラは渡す（呼ばない）、伝播と stopPropagation、preventDefault、onScroll の例外、ハンドラは副作用に最適という記述の根拠。',
    },
    {
      title: 'Render and Commit',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/render-and-commit',
      accessed: '2026-11-08',
      note: 'トリガー・レンダー・コミットの3段階、レストランのたとえ、再帰的なレンダー、差分だけ DOM を変える原則、Clock の例、ペイントの根拠。',
    },
    {
      title: 'State as a Snapshot',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/state-as-a-snapshot',
      accessed: '2026-11-08',
      note: '+3 の例、state が React の中に保管される点、1回のレンダー内で値が変わらない原則、setTimeout の例の根拠。',
    },
    {
      title: 'Queueing a Series of State Updates',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/queueing-a-series-of-state-updates',
      accessed: '2026-11-08',
      note: 'バッチ処理、更新関数とキューの表、値と関数を混ぜたときの規則、更新関数の純粋性と StrictMode、命名慣例の根拠。',
    },
    {
      title: 'Updating Objects in State',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/updating-objects-in-state',
      accessed: '2026-11-08',
      note: 'state を読み取り専用として扱う理由、スプレッドが浅いコピーである点、入れ子の更新、Immer の根拠。',
    },
    {
      title: 'Updating Arrays in State',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/updating-arrays-in-state',
      accessed: '2026-11-08',
      note: '避けるメソッドと使うメソッドの表、挿入と並べ替えの書き方、配列内オブジェクトの更新の根拠。',
    },
  ],
}

export default chapter
