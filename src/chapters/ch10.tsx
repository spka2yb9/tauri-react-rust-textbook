import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 10-1 state の持ち上げ ---------- */
function LiftStateFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="state の持ち上げの前後。左では2つの Panel がそれぞれ isActive を持ち互いに連動しない。右では親の Accordion が activeIndex を1つ持ち、各 Panel には isActive と onShow を props で渡す">
      <defs>
        <marker id="arrow10a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
        <marker id="arrow10a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-accent)" />
        </marker>
      </defs>
      {/* 左：持ち上げ前 */}
      <text x="160" y="26" fontSize="14" fontWeight="600" textAnchor="middle">持ち上げ前（それぞれが state を持つ）</text>
      <g fontSize="13">
        <rect x="90" y="50" width="140" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="160" y="75" textAnchor="middle">Accordion</text>
        <path d="M130,90 L90,128" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow10a)" />
        <path d="M190,90 L230,128" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow10a)" />
        <rect x="20" y="130" width="130" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="85" y="153" textAnchor="middle" fontWeight="600">Panel</text>
        <text x="85" y="175" textAnchor="middle" fontSize="12">isActive: true</text>
        <rect x="170" y="130" width="130" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="235" y="153" textAnchor="middle" fontWeight="600">Panel</text>
        <text x="235" y="175" textAnchor="middle" fontSize="12">isActive: true</text>
      </g>
      <text x="160" y="232" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">両方同時に開ける（連動しない）</text>
      <line x1="320" y1="40" x2="320" y2="260" stroke="var(--fig-line)" strokeDasharray="4 3" />
      {/* 右：持ち上げ後 */}
      <text x="480" y="26" fontSize="14" fontWeight="600" textAnchor="middle">持ち上げ後（親が1つ持つ）</text>
      <g fontSize="13">
        <rect x="400" y="50" width="160" height="56" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="71" textAnchor="middle" fontWeight="600">Accordion</text>
        <text x="480" y="92" textAnchor="middle" fontSize="12">activeIndex: 0</text>
        <path d="M445,106 L410,128" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow10a)" />
        <path d="M515,106 L550,128" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow10a)" />
        <rect x="340" y="130" width="130" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="405" y="153" textAnchor="middle" fontWeight="600">Panel</text>
        <text x="405" y="172" textAnchor="middle" fontSize="12">isActive={'{true}'}</text>
        <text x="405" y="190" textAnchor="middle" fontSize="12">onShow</text>
        <rect x="490" y="130" width="130" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="555" y="153" textAnchor="middle" fontWeight="600">Panel</text>
        <text x="555" y="172" textAnchor="middle" fontSize="12">isActive={'{false}'}</text>
        <text x="555" y="190" textAnchor="middle" fontSize="12">onShow</text>
      </g>
      <path d="M580,130 C600,100 590,80 562,70" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow10a2)" />
      <text x="612" y="112" fontSize="11" fill="var(--fig-accent)" textAnchor="middle">onShow()</text>
      <text x="480" y="232" fontSize="12" textAnchor="middle">開けるのは常に1つ（信頼できる唯一の情報源）</text>
      <text x="320" y="284" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：props　点線：子が親のハンドラを呼び activeIndex を変える</text>
    </svg>
  )
}

/* ---------- 図 10-2 ツリー上の位置と state ---------- */
function TreePositionFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="レンダーツリー上の位置と state の対応を示す3つの場面。同じ位置に同じ Counter が描かれ続ければ state は保持され、同じ位置に別のコンポーネントが描かれると state は破棄され、key が変わると同じ Counter でも新しい state になる">
      <g fontSize="13">
        {/* 場面1 */}
        <text x="110" y="24" fontSize="13" fontWeight="600" textAnchor="middle">同じ型・同じ位置</text>
        <rect x="60" y="40" width="100" height="36" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="110" y="63" textAnchor="middle">div</text>
        <line x1="110" y1="76" x2="110" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="40" y="100" width="140" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="110" y="122" textAnchor="middle">Counter</text>
        <text x="110" y="142" textAnchor="middle" fontSize="12">score: 3 → 保持</text>
        <text x="110" y="180" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">isFancy が変わっても</text>
        <text x="110" y="198" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">props が変わるだけ</text>

        {/* 場面2 */}
        <text x="320" y="24" fontSize="13" fontWeight="600" textAnchor="middle">別の型・同じ位置</text>
        <rect x="270" y="40" width="100" height="36" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="63" textAnchor="middle">div</text>
        <line x1="320" y1="76" x2="320" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <g opacity="0.5">
          <rect x="250" y="100" width="140" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeDasharray="5 4" />
          <text x="320" y="122" textAnchor="middle">Counter</text>
          <text x="320" y="142" textAnchor="middle" fontSize="12">score: 3 → 破棄</text>
        </g>
        <line x1="255" y1="105" x2="385" y2="151" stroke="var(--fig-danger)" strokeWidth="2" />
        <line x1="255" y1="151" x2="385" y2="105" stroke="var(--fig-danger)" strokeWidth="2" />
        <rect x="250" y="170" width="140" height="40" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="195" textAnchor="middle">p（See you）</text>
        <text x="320" y="236" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">次に Counter に戻しても</text>
        <text x="320" y="254" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">score は 0 から</text>

        {/* 場面3 */}
        <text x="530" y="24" fontSize="13" fontWeight="600" textAnchor="middle">同じ型・key が違う</text>
        <rect x="480" y="40" width="100" height="36" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="530" y="63" textAnchor="middle">div</text>
        <line x1="530" y1="76" x2="530" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <g opacity="0.5">
          <rect x="460" y="100" width="140" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeDasharray="5 4" />
          <text x="530" y="122" textAnchor="middle" fontSize="12">Counter key="Taylor"</text>
          <text x="530" y="142" textAnchor="middle" fontSize="12">score: 3 → 破棄</text>
        </g>
        <rect x="460" y="170" width="140" height="56" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="530" y="192" textAnchor="middle" fontSize="12">Counter key="Sarah"</text>
        <text x="530" y="212" textAnchor="middle" fontSize="12">score: 0（新規）</text>
        <text x="530" y="250" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">key は位置の一部として</text>
        <text x="530" y="268" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">扱われる</text>
      </g>
      <text x="320" y="310" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線＋×印：破棄されるノード。state は JSX ではなくツリー上の「位置」に結び付いている</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 10,
  part: 3,
  title: 'フォームと状態の設計',
  summary:
    '入力欄を React の state と結び付ける制御コンポーネントから始め、どの情報を state にするか、どこに置くかという設計の原則を学びます。複数のコンポーネントで共有する state の持ち上げと、React がツリー上の位置で state を保持・リセットする仕組みを図で理解します。',
  goals: [
    '制御コンポーネントと非制御コンポーネントの違いを説明し、入力欄を state と結び付けられる',
    '画面の視覚的な状態を列挙し、矛盾や重複のない最小限の state を設計できる',
    '複数のコンポーネントで共有する state を共通の親に持ち上げられる',
    'React がツリー上の位置で state を保持すること、位置や型が変わるとリセットされることを説明できる',
    'key を使って同じ位置のコンポーネントの state を意図的にリセットできる',
  ],
  prerequisites: [8, 9],
  sections: [
    {
      id: 'declarative-ui',
      title: '画面を状態の集まりとして考える',
      body: (
        <>
          <p>
            <ChapterLink n={7} /> で見た「送信フォーム」を、今度は自分で設計する立場で考えます。公式ドキュメントは、対話的な画面を宣言的に組み立てる手順を5段階にまとめています。<Ref n={1} />
          </p>
          <ol className="steps">
            <li>視覚的な状態を列挙する。フォームなら「空」「入力中」「送信中」「成功」「エラー」の5つ。</li>
            <li>状態を変えるきっかけを決める。人間の入力（クリック、入力）と、コンピュータの入力（ネットワーク応答、タイマー）の2種類がある。</li>
            <li><code>useState</code> で状態を表す。最初は多めでよい。</li>
            <li>不要な state を取り除く。矛盾、重複、裏返しを探す。</li>
            <li>イベントハンドラで state を更新する。</li>
          </ol>
          <p>
            段階4が設計の中心です。最初に <code>isEmpty</code>、<code>isTyping</code>、<code>isSubmitting</code>、<code>isSuccess</code>、<code>isError</code> という5つの真偽値を作ったとします。これには3つの問題があります。<code>isTyping</code> と <code>isSubmitting</code> が同時に <code>true</code> になりうる（矛盾）、<code>isEmpty</code> は <code>answer.length === 0</code> から分かる（重複）、<code>isError</code> は <code>error !== null</code> と同じ（裏返し）。整理すると、必要な state は <code>answer</code>、<code>error</code>、そして <code>'typing' | 'submitting' | 'success'</code> の3値をとる <code>status</code> の3つだけになります。<Ref n={1} />
          </p>
          <p>
            公式ドキュメントは state を「動く部品」にたとえ、動く部品は少ないほどバグが減ると述べています。<Ref n={1} /> この章では、この考え方をフォームの入力、state の構造、置き場所の順に具体化していきます。
          </p>
        </>
      ),
    },
    {
      id: 'controlled',
      title: '制御コンポーネントと非制御コンポーネント',
      body: (
        <>
          <p>
            HTML の <code>{'<input>'}</code> は、それ自体が入力値を覚えています。React で何もしなければ、値はブラウザの DOM が持ち、React は関与しません。これを <Term en="uncontrolled">非制御</Term> の入力と呼びます。初期値だけを <code>defaultValue</code>（チェックボックスなら <code>defaultChecked</code>）で指定できますが、「今の値」は React から制御できません。<Ref n={2} />
          </p>
          <p>
            一方、<code>value</code> props を渡すと、React が入力欄の値を常にその値に固定します。これを <Term en="controlled">制御</Term> された入力と呼びます。ユーザーが文字を打つと <code>onChange</code> が発火するので、そこで state を更新し、新しい値を <code>value</code> に渡す、という往復で入力欄が動きます。<Ref n={2} />
          </p>
          <Code
            lang="tsx"
            code={`
function RenameForm({ initialTitle, onSubmit }: { initialTitle: string; onSubmit: (title: string) => void }) {
  const [title, setTitle] = useState(initialTitle)
  const [pinned, setPinned] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()           // ページの再読み込みを止める
    onSubmit(title.trim())
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>
        <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
        ピン留め
      </label>
      <button disabled={title.trim() === ''}>保存</button>
    </form>
  )
}
`}
          />
          <p>
            制御された入力の利点は、state が「信頼できる唯一の情報源」になることです。空白だけなら保存ボタンを無効にする、入力のたびに検証する、別の場所に同じ値を表示する、といったことが state からの計算で書けます。<code>onChange</code> はキー入力のたびに発火します。<Ref n={2} />
          </p>
          <Callout kind="warn">
            <p>
              <code>value</code> を渡して <code>onChange</code> を渡さないと、入力欄に文字を打てなくなります。React が毎回 <code>value</code> に戻すからです。また、入力欄は途中で制御と非制御を切り替えられません。<code>value={'{undefined}'}</code> で始めて後から文字列を渡すと警告が出ます。state の初期値は <code>null</code> や <code>undefined</code> ではなく <code>''</code> にするか、<code>value={'{v ?? \'\'}'}</code> と書きます。<Ref n={2} />
            </p>
          </Callout>
          <p>
            制御された入力は、キー入力のたびにそのコンポーネントを再レンダーします。大きな画面の最上位に入力の state を置くと重くなるので、入力欄と state を小さなコンポーネントにまとめて、再レンダーの範囲を絞るのが定石です。<Ref n={2} />
          </p>
          <h3>React 19 の form action</h3>
          <p>
            React 19 からは、<code>{'<form>'}</code> の <code>action</code> props に関数を渡す書き方も使えます。送信時に React がその関数を <code>FormData</code> 付きで呼び、入力欄は非制御のままでよく、<code>e.preventDefault()</code> も不要です。関数が正常に終わると非制御の入力欄はリセットされます。<Ref n={3} />
          </p>
          <Code
            lang="tsx"
            code={`
function SearchForm({ onSearch }: { onSearch: (q: string) => void }) {
  function search(formData: FormData) {
    onSearch(String(formData.get('query') ?? ''))
  }
  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">検索</button>
    </form>
  )
}
`}
          />
          <p>
            公式リファレンスは、React 19 以降では <code>action</code> が送信処理の推奨 API だとしつつ、送信イベントそのものを扱いたいときやリセットを避けたいときは <code>onSubmit</code> を使うとしています。<Ref n={3} /> 入力中の値を使ってリアルタイムに画面を変える（検索語に応じて候補を出すなど）なら制御された入力、送信時にまとめて値を取るだけなら <code>action</code>、と使い分けるとよいでしょう。
          </p>
        </>
      ),
    },
    {
      id: 'state-structure',
      title: 'state 設計の原則',
      body: (
        <>
          <p>
            公式ドキュメントは state の構造について5つの原則を挙げ、「state はできる限り単純に、ただし単純すぎないように」とまとめています。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>原則</th>
                  <th>内容</th>
                  <th>例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>関連する state をまとめる</td>
                  <td>常に同時に更新する複数の値は1つにする</td>
                  <td><code>x</code> と <code>y</code> を <code>{'{ x, y }'}</code> に</td>
                </tr>
                <tr>
                  <td>矛盾を避ける</td>
                  <td>同時に成り立たない組み合わせが作れる構造にしない</td>
                  <td><code>isSending</code> と <code>isSent</code> を <code>status</code> に</td>
                </tr>
                <tr>
                  <td>冗長な state を避ける</td>
                  <td>props や他の state から計算できる値は state にしない</td>
                  <td><code>fullName</code> は毎回 <code>first + ' ' + last</code> で計算</td>
                </tr>
                <tr>
                  <td>重複を避ける</td>
                  <td>同じデータを複数の state や入れ子に置かない</td>
                  <td><code>selectedItem</code> ではなく <code>selectedId</code> を持つ</td>
                </tr>
                <tr>
                  <td>深い入れ子を避ける</td>
                  <td>階層が深いと更新が難しい。平坦にする</td>
                  <td>木構造を <code>id</code> をキーにした表に</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            「重複を避ける」の例を見ます。一覧の中の1件を選択する画面で、選択中の項目そのものを state に持つと、一覧側で項目を編集したときに選択中の項目が古いままになります。<Ref n={4} />
          </p>
          <Code
            lang="tsx"
            code={`
// 悪い例：items の中のオブジェクトと selectedItem が同じデータを二重に持つ
const [items, setItems] = useState(initialItems)
const [selectedItem, setSelectedItem] = useState(items[0])

// 良い例：id だけを持ち、項目はレンダー中に探す
const [items, setItems] = useState(initialItems)
const [selectedId, setSelectedId] = useState(items[0].id)
const selectedItem = items.find((item) => item.id === selectedId)
`}
          />
          <p>
            「深い入れ子を避ける」の例として、公式ドキュメントは旅行計画の木構造を、<code>{'{ 0: { id: 0, childIds: [1, 42] }, 1: { ... } }'}</code> のような id をキーにした平坦な表に変換しています。こうすると、ある場所を削除するときに触る階層が2段階で済みます。<Ref n={4} /> Tsumugi のページツリーもこの形で持ちます（後述）。
          </p>
          <h3>props を state に写さない</h3>
          <p>
            よくある誤りが、<code>useState(props.messageColor)</code> のように props を state の初期値に入れることです。state は初回レンダーでしか初期化されないので、後から親が別の値を渡しても state は更新されません。props はそのまま使い、必要なら計算で変換します。意図的に「初期値としてだけ使い、以後の変更は無視する」場合は、props 名を <code>initialColor</code> や <code>defaultColor</code> のように <code>initial</code>・<code>default</code> で始めて意図を示します。<Ref n={4} /> 前節の <code>RenameForm</code> が <code>initialTitle</code> という名前なのはこのためです。
          </p>
        </>
      ),
    },
    {
      id: 'lifting-state',
      title: 'state の持ち上げ',
      body: (
        <>
          <p>
            2つのコンポーネントの state を連動させたいことがあります。たとえばアコーディオンで、1つのパネルを開いたら他は閉じたい。各 <code>Panel</code> が自分の <code>isActive</code> を持っていると、互いの state が見えないので連動できません。
          </p>
          <p>
            解決策は、state を両方から取り除き、最も近い共通の親に移し、props で渡すことです。これを <Term en="lifting state up">state の持ち上げ</Term> と呼びます。公式ドキュメントの手順は3段階です。<Ref n={5} />
          </p>
          <ol className="steps">
            <li>子から state を取り除き、代わりに props（<code>isActive</code>）で受け取る。</li>
            <li>共通の親から、まずは固定値を渡して配線を確かめる。</li>
            <li>親に state を追加し、更新するためのハンドラ（<code>onShow</code>）も props で渡す。</li>
          </ol>
          <Code
            lang="tsx"
            code={`
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <Panel title="概要" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        アルマトイはカザフスタン最大の都市です。
      </Panel>
      <Panel title="語源" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        名前はカザフ語で「リンゴ」を意味する алма に由来します。
      </Panel>
    </>
  )
}

function Panel({ title, children, isActive, onShow }: { title: string; children: ReactNode; isActive: boolean; onShow: () => void }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>表示</button>}
    </section>
  )
}
`}
          />
          <Figure n="10-1" title="state の持ち上げの前後" caption="左は各 Panel が isActive を持ち、連動できない。右は Accordion が activeIndex を1つ持ち、各 Panel には isActive と onShow を渡す。開けるパネルは常に1つになる。">
            <LiftStateFigure />
          </Figure>
          <p>
            図の右では、<code>Accordion</code> が「どのパネルが開いているか」の <Term en="single source of truth">信頼できる唯一の情報源</Term> になっています。2つの真偽値ではなく1つのインデックスにしたことで、2つ同時に開くという矛盾した状態が作れなくなりました。<Ref n={5} /> これは前節の「矛盾を避ける」の実践です。
          </p>
          <p>
            「唯一の情報源」とは、すべての state を1か所に集めるという意味ではありません。それぞれの state について、それを持つコンポーネントが1つに決まっている、という意味です。<Ref n={5} /> 持ち上げる先は「その state を使うすべてのコンポーネントの、最も近い共通の親」で、場合によってはそのために新しいコンポーネントを作ります。<Ref n={6} />
          </p>
          <h3>制御されたコンポーネント・非制御のコンポーネント</h3>
          <p>
            入力欄だけでなく、自作のコンポーネントにも同じ言葉を使います。元の <code>Panel</code> のように自分の state で動くものを「非制御」、持ち上げ後の <code>Panel</code> のように重要な情報を props で受け取るものを「制御された」コンポーネントと呼びます。非制御は使うのが簡単ですが連動させにくく、制御されたものは柔軟ですが親が全部設定しなければなりません。実際のコンポーネントはたいてい両方の性質を少しずつ持ちます。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'preserving-resetting',
      title: 'state の保持とリセット',
      body: (
        <>
          <p>
            state は各コンポーネントのものだと説明してきましたが、正確には、React は state を「レンダーツリー上のどの位置にそのコンポーネントがあるか」で管理しています。<Ref n={7} /> state は JSX の中にあるのではなく React の中にあり、React は「ツリーのこの位置の、この型のコンポーネント」に state を結び付けます。
          </p>
          <Figure n="10-2" title="ツリー上の位置と state の対応" caption="左：同じ位置に同じ型が描かれ続ける限り state は保持される（props が変わっても）。中央：同じ位置に別の型が描かれると state は破棄される。右：key が変わると同じ型でも別物として扱われ、新しい state になる。">
            <TreePositionFigure />
          </Figure>
          <p>この図から、3つの規則が読み取れます。<Ref n={7} /></p>
          <ul>
            <li>同じ位置に同じコンポーネントが描かれ続ける限り、state は保持される。<code>{'{isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}'}</code> は、props が変わるだけで <code>Counter</code> の <code>score</code> は保たれる。</li>
            <li>同じ位置に別のコンポーネント（または別の HTML 要素）が描かれると、その下のサブツリーごと state が破棄される。<code>{'<section>'}</code> の中の <code>Counter</code> を <code>{'<div>'}</code> の中に移すだけでも、親の型が変わったのでリセットされる。</li>
            <li>重要なのは JSX の書き方ではなく、ツリー上の位置である。<code>if</code> の2つの分岐で別々に <code>{'<Counter />'}</code> と書いても、どちらも <code>{'<div>'}</code> の最初の子なら同じ位置とみなされる。</li>
          </ul>
          <h3>key で意図的にリセットする</h3>
          <p>
            同じ位置の同じコンポーネントを「別物」として扱いたいこともあります。チャット画面で、送信先を切り替えたのに入力途中の本文がそのまま残っていたら、誤送信の原因になります。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            code={`
// 送信先 to を切り替えても、Chat は同じ位置の同じ型なので state（下書き）が残る
<Chat contact={to} />

// key を付けると、to.id が変わるたびに Chat は作り直され、下書きが消える
<Chat key={to.id} contact={to} />
`}
          />
          <p>
            key を指定すると、React は親の中での順番ではなく key そのものを位置の一部として使います。<Ref n={7} /> <ChapterLink n={8} /> ではリストの対応付けに使いましたが、仕組みは同じで、「同じ key なら同じもの、違う key なら別のもの」という identity の指定です。公式ドキュメントは「誰かとのチャット」が概念的に別物である以上、送信先に基づく key を付けるのが自然だと説明しています。<Ref n={7} /> 逆に、切り替えても下書きを残したいなら、下書きを親に持ち上げて送信先ごとに保存するのが最も一般的な方法です。<Ref n={7} />
          </p>
          <Callout kind="warn">
            <p>
              <ChapterLink n={7} /> の「コンポーネントの定義を入れ子にしない」という規則の理由がここにあります。親の関数の中でコンポーネントを定義すると、親がレンダーされるたびに「新しい関数」つまり別の型になります。同じ位置に別の型が来たとみなされ、その子の state（入力中の文字など）がレンダーのたびに消えます。<Ref n={7} />
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
              ページツリー（<ChapterLink n={43} />）では、「選択中のページ」を <code>selectedPageId</code> という id の state として <code>App</code> に持ち上げ、サイドバーとエディタの両方に props で渡します。サイドバーは選択の見た目に、エディタは表示するページの決定に使い、どちらも同じ情報源を見ます。ページの配列は平坦に持ち、親子関係は <code>parent_id</code> から計算します。
            </p>
            <p>
              エディタ（<ChapterLink n={44} />）には <code>{'<Editor key={pageId} />'}</code> のように key を付けます。別のページに切り替えたとき、前のページの編集状態やカーソル位置が残らないようにするためです。ページ名の変更は <code>initialTitle</code> を受け取る制御された入力欄で、検索ダイアログ（<ChapterLink n={46} />）の検索語は入力のたびに結果を更新するので制御された入力、簡易データベース（<ChapterLink n={48} />）の絞り込み条件は <code>status</code> のような矛盾のない形で設計します。
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
            <li>画面の視覚的な状態を列挙し、矛盾・重複・裏返しを取り除いて最小限の state にする。</li>
            <li><code>value</code> と <code>onChange</code> を渡した入力は制御され、state が唯一の情報源になる。<code>defaultValue</code> だけなら非制御。途中で切り替えない。React 19 の <code>{'<form action>'}</code> は送信時にまとめて値を取る用途に向く。</li>
            <li>state の構造は、関連するものをまとめ、矛盾・冗長・重複・深い入れ子を避ける。props を state に写さない。</li>
            <li>連動させたい state は、最も近い共通の親に持ち上げ、値とハンドラを props で渡す。</li>
            <li>React は state をツリー上の位置と型に結び付けて保持する。位置や型が変わるとリセットされ、key を変えると意図的にリセットできる。</li>
          </ul>
          <p>次章では、state の更新ロジックをコンポーネントの外に出す reducer と、props を経由せずに深い場所へ値を届ける Context を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Reacting to Input with State',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/reacting-to-input-with-state',
      accessed: '2026-11-08',
      note: '宣言的に UI を考える5段階、矛盾・重複・裏返しの除去、「動く部品」の根拠。',
    },
    {
      title: '<input> – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react-dom/components/input',
      accessed: '2026-11-08',
      note: '制御／非制御の入力、value と onChange、defaultValue、途中で切り替えられない点、undefined を避ける点、再レンダーの範囲を絞る助言の根拠。',
    },
    {
      title: '<form> – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react-dom/components/form',
      accessed: '2026-11-08',
      note: 'action に関数を渡す書き方、FormData、成功時のリセット、onSubmit との使い分けの根拠。',
    },
    {
      title: 'Choosing the State Structure',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/choosing-the-state-structure',
      accessed: '2026-11-08',
      note: '5つの原則、selectedId の例、平坦化、props を state に写さない（initial／default の命名）の根拠。',
    },
    {
      title: 'Sharing State Between Components',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/sharing-state-between-components',
      accessed: '2026-11-08',
      note: 'state の持ち上げの3段階、Accordion の例、信頼できる唯一の情報源、制御された／非制御のコンポーネントの根拠。',
    },
    {
      title: 'Thinking in React',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/thinking-in-react',
      accessed: '2026-11-08',
      note: 'state の置き場所の決め方（共通の親、必要なら新しいコンポーネント）の根拠。',
    },
    {
      title: 'Preserving and Resetting State',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/preserving-and-resetting-state',
      accessed: '2026-11-08',
      note: 'state がツリー上の位置に結び付く点、同じ型・同じ位置での保持、別の型での破棄、key によるリセット、チャットの例、入れ子定義の問題の根拠。',
    },
  ],
}

export default chapter
