import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 8-1 コンポーネントツリーと props の流れ ---------- */
function PropsFlowFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="App を根とするコンポーネントツリー。App から Sidebar と Editor へ、Sidebar から2つの PageItem へ props が下向きの矢印で流れる。子から親へは onSelect のようなイベントハンドラを呼ぶ点線の矢印が戻る">
      <defs>
        <marker id="arrow8a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
        <marker id="arrow8a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-accent)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* App */}
        <rect x="250" y="20" width="140" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="42" textAnchor="middle" fontWeight="600">App</text>
        <text x="320" y="58" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">pages, selectedId を持つ</text>
        {/* Sidebar */}
        <rect x="80" y="120" width="160" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="160" y="148" textAnchor="middle" fontWeight="600">Sidebar</text>
        {/* Editor */}
        <rect x="400" y="120" width="160" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="480" y="148" textAnchor="middle" fontWeight="600">Editor</text>
        {/* PageItems */}
        <rect x="20" y="230" width="130" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="85" y="258" textAnchor="middle" fontWeight="600">PageItem</text>
        <rect x="170" y="230" width="130" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="235" y="258" textAnchor="middle" fontWeight="600">PageItem</text>
      </g>
      {/* props down */}
      <path d="M290,64 L175,118" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8a)" />
      <text x="190" y="88" fontSize="12" fill="var(--fig-muted)">pages, selectedId</text>
      <path d="M350,64 L465,118" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8a)" />
      <text x="430" y="88" fontSize="12" fill="var(--fig-muted)">page</text>
      <path d="M135,164 L95,228" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8a)" />
      <text x="60" y="200" fontSize="12" fill="var(--fig-muted)">page, selected</text>
      <path d="M185,164 L225,228" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8a)" />
      <text x="215" y="200" fontSize="12" fill="var(--fig-muted)">page, selected</text>
      {/* handler up */}
      <path d="M260,230 C300,190 320,160 330,70" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow8a2)" />
      <text x="330" y="200" fontSize="12" fill="var(--fig-accent)">onSelect(id) を呼ぶ</text>
      <text x="320" y="302" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：props（データ）は親から子へ一方向に流れる　点線：子はハンドラを呼んで親に知らせる</text>
    </svg>
  )
}

/* ---------- 図 8-2 key による対応付け ---------- */
function KeyFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="リストの先頭に項目を挿入したときの、key なしと key ありの比較。key なしでは位置で対応付けるため全項目がずれて更新され、key ありでは id で対応付けるため既存項目はそのままで新項目だけが追加される">
      <defs>
        <marker id="arrow8b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* 左: key なし */}
      <text x="160" y="24" fontSize="14" fontWeight="600" textAnchor="middle">key なし（index で対応）</text>
      <g fontSize="12">
        <text x="70" y="52" textAnchor="middle" fill="var(--fig-muted)">前の描画</text>
        <text x="250" y="52" textAnchor="middle" fill="var(--fig-muted)">次の描画</text>
        {['Apple', 'Peas'].map((t, i) => (
          <g key={t}>
            <rect x="20" y={64 + i * 46} width="100" height="34" rx="4" fill="var(--fig-box)" stroke="var(--fig-line)" />
            <text x="70" y={86 + i * 46} textAnchor="middle">{i}: {t}</text>
          </g>
        ))}
        {['Melon', 'Apple', 'Peas'].map((t, i) => (
          <g key={t}>
            <rect x="200" y={64 + i * 46} width="100" height="34" rx="4" fill={i === 0 ? 'var(--fig-box2)' : 'var(--fig-box)'} stroke="var(--fig-line)" />
            <text x="250" y={86 + i * 46} textAnchor="middle">{i}: {t}</text>
          </g>
        ))}
        <path d="M120,81 L198,81" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow8b)" />
        <path d="M120,127 L198,127" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow8b)" />
        <text x="160" y="232" textAnchor="middle" fill="var(--fig-danger)">0 と 1 の中身を書き換え、</text>
        <text x="160" y="250" textAnchor="middle" fill="var(--fig-danger)">2 を新規作成（全部ずれる）</text>
      </g>
      <line x1="320" y1="40" x2="320" y2="270" stroke="var(--fig-line)" strokeDasharray="4 3" />
      {/* 右: key あり */}
      <text x="480" y="24" fontSize="14" fontWeight="600" textAnchor="middle">key あり（id で対応）</text>
      <g fontSize="12">
        <text x="390" y="52" textAnchor="middle" fill="var(--fig-muted)">前の描画</text>
        <text x="570" y="52" textAnchor="middle" fill="var(--fig-muted)">次の描画</text>
        {[['a1', 'Apple'], ['p7', 'Peas']].map(([k, t], i) => (
          <g key={k}>
            <rect x="340" y={64 + i * 46} width="100" height="34" rx="4" fill="var(--fig-box)" stroke="var(--fig-line)" />
            <text x="390" y={86 + i * 46} textAnchor="middle">{k}: {t}</text>
          </g>
        ))}
        {[['m3', 'Melon'], ['a1', 'Apple'], ['p7', 'Peas']].map(([k, t], i) => (
          <g key={k}>
            <rect x="520" y={64 + i * 46} width="100" height="34" rx="4" fill={i === 0 ? 'var(--fig-box2)' : 'var(--fig-box)'} stroke="var(--fig-line)" />
            <text x="570" y={86 + i * 46} textAnchor="middle">{k}: {t}</text>
          </g>
        ))}
        <path d="M440,81 L518,127" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8b)" />
        <path d="M440,127 L518,173" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow8b)" />
        <text x="480" y="232" textAnchor="middle">a1 と p7 はそのまま保持し、</text>
        <text x="480" y="250" textAnchor="middle">m3 だけを新規作成</text>
      </g>
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">橙の枠：新しく挿入された項目　矢印：React が「同じ項目」とみなした対応</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 8,
  part: 3,
  title: 'コンポーネントと props',
  summary:
    'React の画面は、小さなコンポーネントを組み合わせた木として作ります。親から子へ情報を渡す props、子要素を受け取る children、TypeScript での型付け、配列から一覧を描くときの key、条件によって表示を切り替える方法、そしてコンポーネントが純粋であるべき理由を学びます。',
  goals: [
    'コンポーネントツリーの中で props が親から子へ一方向に流れることを説明できる',
    'props を分割代入で受け取り、既定値を設定し、children で「穴」のあるコンポーネントを書ける',
    'props の型を interface で定義し、ReactNode やイベントハンドラの型を正しく使える',
    'map で配列から要素の配列を作り、安定した key を付ける理由を説明できる',
    'if・三項演算子・&& を使い分けて条件付き描画を書け、&& の 0 の落とし穴を避けられる',
    'コンポーネントが純粋であるべき理由と、StrictMode が開発時に2回呼ぶ意味を説明できる',
  ],
  prerequisites: [5, 6, 7],
  sections: [
    {
      id: 'component-tree',
      title: '部品を組み合わせて画面を作る',
      body: (
        <>
          <p>
            <ChapterLink n={7} /> で、コンポーネントは JSX を返す関数だと学びました。React アプリでは、ルートコンポーネント（<code>App</code>）が他のコンポーネントを返し、それがさらに別のコンポーネントを返す、という入れ子で画面全体を作ります。React はこの入れ子を <Term en="render tree">レンダーツリー</Term> と呼び、「1回の描画で、どのコンポーネントがどのコンポーネントを描いたか」を表す木として扱います。<Ref n={1} />
          </p>
          <p>
            たとえばノートアプリの画面は、次のような木になります。
          </p>
          <Code
            lang="text"
            code={`
App
├── Sidebar
│   ├── PageItem
│   └── PageItem
└── Editor
    └── BlockList
`}
          />
          <p>
            公式ドキュメントは、木の根に近いコンポーネントを <Term en="top-level component">トップレベルコンポーネント</Term>、子を持たない末端のコンポーネントを <Term en="leaf component">リーフコンポーネント</Term> と呼び分けています。前者はその下のすべての描画性能に影響し、後者は頻繁に再描画されがちです。<Ref n={1} /> この区別は <ChapterLink n={14} /> のパフォーマンスの話で効いてきます。
          </p>
          <p>
            どこで部品を切るかには正解が1つあるわけではありませんが、公式ドキュメントの「Thinking in React」は、1つのコンポーネントは理想的には1つの関心事だけを扱い、大きくなったら分割する、という指針を示しています。<Ref n={2} /> 画面の模型を見て、意味のまとまりごとに枠で囲み、名前を付ける作業が最初の一歩です。
          </p>
        </>
      ),
    },
    {
      id: 'props',
      title: 'props：親から子へ情報を渡す',
      body: (
        <>
          <p>
            分割した部品は、親から情報を受け取って初めて意味のある表示になります。この情報を <Term en="props">props</Term> と呼びます。HTML の属性と同じ見た目で渡しますが、文字列だけでなくオブジェクト、配列、関数など任意の JavaScript の値を渡せます。<Ref n={3} />
          </p>
          <Code
            lang="tsx"
            code={`
function Avatar({ person, size }: { person: { name: string; imageId: string }; size: number }) {
  return (
    <img
      className="avatar"
      src={\`https://example.com/\${person.imageId}.jpg\`}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}

function Profile() {
  return <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />
}
`}
          />
          <p>
            コンポーネント関数の引数は常に1つで、渡された props がまとまったオブジェクトです。<code>{'{ person, size }'}</code> という引数の書き方は、オブジェクトの分割代入です。<code>function Avatar(props)</code> と受け取って <code>props.person</code> と書くのと同じですが、通常は分割代入で必要なものだけ取り出します。<Ref n={3} />
          </p>
          <h3>既定値</h3>
          <p>
            分割代入の中で <code>size = 100</code> と書くと、その props が省略されたとき、または <code>undefined</code> が渡されたときに既定値が使われます。<code>null</code> や <code>0</code> を渡した場合は既定値は使われません。<Ref n={3} />
          </p>
          <h3>props は読み取り専用</h3>
          <p>
            子コンポーネントは、受け取った props を変更してはいけません。公式ドキュメントの言い方では、props は「その時点のスナップショット」であり、描画のたびに新しい版を受け取ります。<Ref n={3} /> 子が表示を変えたいときは、props を書き換えるのではなく、親に「別の props を渡してほしい」と頼みます。その頼み方が、イベントハンドラを props として渡す方法です。
          </p>
          <Code
            lang="tsx"
            code={`
function PageItem({ page, selected, onSelect }: { page: Page; selected: boolean; onSelect: (id: string) => void }) {
  return (
    <li className={selected ? 'selected' : ''}>
      <button onClick={() => onSelect(page.id)}>{page.title}</button>
    </li>
  )
}
`}
          />
          <p>
            <code>onSelect</code> は親が渡した関数です。子はクリックされたときにそれを呼ぶだけで、「選択されたらどうなるか」は親が決めます。慣例として、ハンドラを受け取る props の名前は <code>on</code> で始め（<code>onSelect</code>、<code>onPlayMovie</code>）、ハンドラを定義する側の関数名は <code>handle</code> で始めます（<code>handleSelect</code>）。<Ref n={4} />
          </p>
          <Figure n="8-1" title="コンポーネントツリーと props の流れ" caption="データ（props）は親から子へ、実線の矢印の向きにだけ流れる。子が何かを親に伝えたいときは、親から受け取ったハンドラ（点線）を呼ぶ。これを一方向データフローと呼ぶ。">
            <PropsFlowFigure />
          </Figure>
          <p>
            図のように、データは常に上から下へ流れます。公式ドキュメントはこれを <Term en="one-way data flow">一方向データフロー</Term> と呼び、データが最上位のコンポーネントから木の下へ流れる構造だと説明しています。<Ref n={2} /> 子から親への連絡は、親が渡した関数を呼ぶ形に限られます。
          </p>
          <Callout kind="warn">
            <p>
              props をまとめて転送する <code>{'<Avatar {...props} />'}</code> というスプレッド構文があります。便利ですが、公式ドキュメントは「控えめに使うこと。どのコンポーネントでも使っているなら何かが間違っている」と注意しています。多くの場合、コンポーネントを分割して <code>children</code> として JSX を渡すほうが適切です。<Ref n={3} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'children',
      title: 'children：JSX を子として受け取る',
      body: (
        <>
          <p>
            JSX のタグの間に何かを書くと、それは <code>children</code> という名前の props として渡されます。
          </p>
          <Code
            lang="tsx"
            code={`
import type { ReactNode } from 'react'

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function Profile() {
  return (
    <Card title="プロフィール">
      <Avatar person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} size={100} />
      <p>地球化学者。</p>
    </Card>
  )
}
`}
          />
          <p>
            公式ドキュメントは、<code>children</code> を持つコンポーネントを「穴の空いた部品」にたとえています。穴に何を入れるかは親が決め、<code>Card</code> は中身を知る必要がありません。<Ref n={3} /> 枠、パネル、モーダル、レイアウトのように「中身を問わない入れ物」は、ほぼすべてこの形で書きます。
          </p>
          <p>
            <code>children</code> という名前は特別で、タグの間に書いた内容が自動的に入ります。ただし、同じ仕組みで <code>children</code> 以外の名前の props に JSX を渡すこともできます（<code>{'<Layout sidebar={<Sidebar />} />'}</code>）。JSX はただのオブジェクトなので、変数に入れたり関数の引数にしたりできることを思い出してください。
          </p>
        </>
      ),
    },
    {
      id: 'typing-props',
      title: 'props の型付け',
      body: (
        <>
          <p>
            ここまでの例では props の型を引数にインラインで書きましたが、数が増えると読みにくくなります。公式ドキュメントは、props を <code>interface</code> または <code>type</code> で定義することを勧めています。<Ref n={5} /> <ChapterLink n={5} /> と <ChapterLink n={6} /> の知識がそのまま使えます。
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageItem.tsx"
            code={`
import type { ReactNode, MouseEvent } from 'react'

interface Page {
  id: string
  title: string
  icon?: string          // 省略可能
}

interface PageItemProps {
  /** 表示するページ */
  page: Page
  /** 選択中かどうか */
  selected?: boolean
  /** クリック時に呼ばれる */
  onSelect: (id: string) => void
  /** 右側に表示する追加の要素 */
  trailing?: ReactNode
}

export function PageItem({ page, selected = false, onSelect, trailing }: PageItemProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onSelect(page.id)
  }
  return (
    <li className={selected ? 'page-item selected' : 'page-item'}>
      <button type="button" onClick={handleClick}>
        {page.icon ?? '📄'} {page.title}
      </button>
      {trailing}
    </li>
  )
}
`}
          />
          <p>よく使う型は次のとおりです。<Ref n={5} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>用途</th>
                  <th>型</th>
                  <th>補足</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>子要素（JSX、文字列、数値、null など何でも）</td>
                  <td><code>ReactNode</code></td>
                  <td>children に使う最も広い型</td>
                </tr>
                <tr>
                  <td>JSX 要素だけ</td>
                  <td><code>ReactElement</code></td>
                  <td>文字列や数値は受け付けない</td>
                </tr>
                <tr>
                  <td>イベントオブジェクト</td>
                  <td><code>{'MouseEvent<HTMLButtonElement>'}</code>、<code>{'ChangeEvent<HTMLInputElement>'}</code></td>
                  <td>すべてのイベントの基底は <code>SyntheticEvent</code></td>
                </tr>
                <tr>
                  <td>イベントハンドラそのもの</td>
                  <td><code>{'MouseEventHandler<HTMLButtonElement>'}</code></td>
                  <td>関数全体の型を一度に付けたいとき</td>
                </tr>
                <tr>
                  <td>style props</td>
                  <td><code>CSSProperties</code></td>
                  <td>CSS プロパティの和集合。補完が効く</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>MouseEvent</code> などの名前はブラウザの DOM にも同名の型がありますが、React のハンドラが受け取るのは <code>react</code> パッケージから import した型のほうです。<code>import type {'{ MouseEvent }'} from 'react'</code> と明示的に取り込むか、<code>React.MouseEvent</code> と書きます。<Ref n={5} />
          </p>
          <p>
            なお、TypeScript では「<code>{'<li>'}</code> だけを children に受け付ける」といった、子の JSX の種類を限定する型は書けません。<Ref n={5} /> そうした制約が必要なら、JSX ではなくデータの配列を props で受け取り、コンポーネント側で <code>{'<li>'}</code> を作るのが現実的です。
          </p>
        </>
      ),
    },
    {
      id: 'lists-keys',
      title: 'リストと key',
      body: (
        <>
          <p>
            配列から一覧を描くには、JavaScript の <code>map</code> で「データの配列」を「React 要素の配列」に変換し、JSX の波かっこに入れます。絞り込みは <code>filter</code> で行います。<Ref n={6} />
          </p>
          <Code
            lang="tsx"
            code={`
function PageList({ pages, selectedId, onSelect }: { pages: Page[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const visible = pages.filter((p) => !p.archived)
  return (
    <ul>
      {visible.map((page) => (
        <PageItem key={page.id} page={page} selected={page.id === selectedId} onSelect={onSelect} />
      ))}
    </ul>
  )
}
`}
          />
          <p>
            <code>map</code> の中で返す要素には、必ず <Term en="key">key</Term> を付けます。key は、その配列の中で項目を一意に識別する文字列か数値です。付け忘れると、React はコンソールに警告を出します。<Ref n={6} />
          </p>
          <h3>なぜ key が必要か</h3>
          <p>
            React は前回の描画と今回の描画を比べて、DOM のどこを変えるかを決めます（<ChapterLink n={9} />）。配列の項目が並べ替えられたり、途中に挿入・削除されたりしたとき、「どの項目が前回のどの項目に対応するか」を React に教えるのが key です。<Ref n={6} />
          </p>
          <Figure n="8-2" title="先頭に項目を挿入したときの key の有無による違い" caption="左は key なし（配列の添字で対応付け）。先頭に Melon が入ると、0 番と 1 番の中身が書き換わり 2 番が新規作成される。右は key あり（id で対応付け）。Apple と Peas はそのまま保たれ、Melon だけが新規作成される。">
            <KeyFigure />
          </Figure>
          <p>
            図の左のように添字で対応付けると、項目の見た目だけでなく、その項目が内部に持つ状態（入力途中のテキストなど）もずれます。公式ドキュメントは、添字を key にすると「捉えにくく紛らわしいバグ」になると述べ、並べ替えや挿入が起きない静的な一覧に限って許容しています。<Ref n={6} />
          </p>
          <p>key を選ぶときの規則は次の3つです。<Ref n={6} /></p>
          <ul>
            <li>兄弟の間で一意であること。別の配列の中なら同じ key を使ってよい。</li>
            <li>変わらないこと。描画中に <code>Math.random()</code> などで生成してはいけない。毎回異なる key になり、全項目が作り直されて入力内容も失われる。</li>
            <li>データ自体に含めること。データベースの ID や、作成時に <code>crypto.randomUUID()</code> で付けた ID を使う。</li>
          </ul>
          <p>
            key はコンポーネントに props として渡されません。React だけが使う目印です。コンポーネントの中で ID が必要なら、<code>{'<PageItem key={page.id} page={page} />'}</code> のように別の props で渡します。<Ref n={6} /> また、1項目から複数の要素を返したいときは、短い <code>{'<>'}</code> ではなく <code>{'<Fragment key={...}>'}</code> を使います。短い構文には key を付けられないからです。<Ref n={6} />
          </p>
        </>
      ),
    },
    {
      id: 'conditional',
      title: '条件付き描画',
      body: (
        <>
          <p>
            React には条件分岐のための特別な構文がありません。JavaScript の <code>if</code>、三項演算子、<code>&amp;&amp;</code> をそのまま使います。<Ref n={7} /> 書き方は5つあり、状況に応じて選びます。
          </p>
          <Code
            lang="tsx"
            code={`
// 1. if で別々の JSX を return する
function Item({ name, isPacked }: { name: string; isPacked: boolean }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>
  }
  return <li className="item">{name}</li>
}

// 2. 何も描かないときは null を返す
function Badge({ count }: { count: number }) {
  if (count === 0) return null
  return <span className="badge">{count}</span>
}

// 3. 三項演算子：どちらか一方
<li className="item">{isPacked ? name + ' ✅' : name}</li>

// 4. &&：条件が真のときだけ描く
<li className="item">{name} {isPacked && '✅'}</li>

// 5. 変数に JSX を入れてから使う
let content: ReactNode = name
if (isPacked) {
  content = <del>{name} ✅</del>
}
return <li className="item">{content}</li>
`}
          />
          <p>
            JSX の中で <code>false</code>、<code>null</code>、<code>undefined</code>、<code>true</code> は何も描きません。<code>&amp;&amp;</code> はこの性質を利用した書き方で、左辺が偽なら左辺の値（<code>false</code>）がそのまま結果になり、画面には何も出ません。<Ref n={7} />
          </p>
          <Callout kind="warn">
            <p>
              <code>&amp;&amp;</code> の左辺に数値を置いてはいけません。<code>{'{count && <p>新着</p>}'}</code> は <code>count</code> が <code>0</code> のとき、<code>false</code> ではなく <code>0</code> を返すので、画面に「0」が表示されます。<code>{'{count > 0 && <p>新着</p>}'}</code> のように、左辺が真偽値になるように書いてください。<Ref n={7} />
            </p>
          </Callout>
          <p>
            三項演算子の入れ子は読みにくくなるので、公式ドキュメントも「ほどほどに」と注意しています。分岐が複雑になったら、変数に JSX を入れる書き方（5）か、分岐ごとに子コンポーネントへ切り出す方法を選びます。<Ref n={7} /> また、<code>null</code> を返すコンポーネントは呼び出す側を驚かせるので、親の JSX で含めるかどうかを決めるほうが一般的です。<Ref n={7} />
          </p>
        </>
      ),
    },
    {
      id: 'purity',
      title: 'コンポーネントは純粋な関数として書く',
      body: (
        <>
          <p>
            React は、すべてのコンポーネントが <Term en="pure function">純粋関数</Term> であることを前提にしています。純粋関数とは、「呼び出し前から存在するオブジェクトや変数を変更しない」「同じ入力には同じ出力を返す」の2つを満たす関数です。<Ref n={8} /> コンポーネントで言えば、同じ props・state・context を受け取れば、常に同じ JSX を返すということです。
          </p>
          <Code
            lang="tsx"
            code={`
let guest = 0

// 悪い例：外側の変数を描画中に書き換えている
function Cup() {
  guest = guest + 1
  return <h2>{guest} 人目のお客様のカップ</h2>
}

// 良い例：必要な情報は props で受け取る
function Cup({ guest }: { guest: number }) {
  return <h2>{guest} 人目のお客様のカップ</h2>
}
`}
          />
          <p>
            悪い例の <code>Cup</code> は、呼ばれるたびに違う JSX を返します。表示が描画の回数や順序に依存してしまい、React がコンポーネントをいつ・何回呼ぶかによって結果が変わります。<Ref n={8} />
          </p>
          <p>
            ただし、描画の途中で自分が作ったオブジェクトを変更するのは問題ありません。たとえば空の配列を作ってループで <code>push</code> し、最後に返すのは、外から観測できないので純粋です。公式ドキュメントはこれを「局所的な変更（local mutation）」と呼び、コンポーネントの「小さな秘密」だと説明しています。<Ref n={8} />
          </p>
          <h3>StrictMode は開発時に2回呼ぶ</h3>
          <p>
            <ChapterLink n={7} /> の <code>main.tsx</code> にあった <code>{'<StrictMode>'}</code> は、開発時にそれぞれのコンポーネント関数を2回呼びます。純粋な関数なら2回呼んでも結果は同じなので何も起きません。悪い例の <code>Cup</code> のような不純なコンポーネントでは、番号が2ずつ増えるといった異常が現れ、問題が発見できます。この二重呼び出しは開発時だけで、本番ビルドには影響しません。<Ref n={8} /> <Ref n={9} />
          </p>
          <p>
            では、画面を変える、データを保存するといった「何かを変える処理」はどこに書けばよいのでしょうか。公式ドキュメントの答えは、まずイベントハンドラです。クリックや入力に応じて実行されるハンドラは描画の途中では動かないため、純粋である必要がありません。<Ref n={8} /> ハンドラに置けない処理のための最後の手段が <code>useEffect</code>（<ChapterLink n={12} />）です。
          </p>
          <p>
            React が純粋性にこだわる理由は3つあります。純粋なら、サーバーなど別の環境でも同じ結果になる。入力が変わっていないコンポーネントの描画を安全に省略できる（<ChapterLink n={14} />）。描画の途中でデータが変わったら、やりかけの描画を捨てて最初からやり直せる。<Ref n={8} /> これらはすべて、「同じ入力なら同じ出力」が保証されているからこそ可能になります。
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
              サイドバーのページツリー（<ChapterLink n={43} />）は、この章の内容がそのまま形になった部品です。<code>pages</code> の配列を <code>map</code> で <code>PageItem</code> に変換し、<code>key</code> には SQLite の <code>pages.id</code> を使います。親子関係のあるページは、<code>PageItem</code> が自分の子の一覧を再び <code>PageItem</code> として描く再帰コンポーネントになります。選択・改名・削除はすべて <code>onSelect</code> のようなハンドラ props で親に伝えます。
            </p>
            <p>
              検索ダイアログ（<ChapterLink n={46} />）の結果一覧、簡易データベースの表ビュー（<ChapterLink n={47} />）の行と列も、配列と key の組み合わせです。表のセルは「プロパティの型が text なら入力欄、checkbox ならチェックボックス」のように条件付き描画で切り替えます。モーダルやパネルの枠は <code>children</code> を受け取る入れ物コンポーネントとして用意し、設定画面（<ChapterLink n={50} />）でも使い回します。
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
            <li>画面はコンポーネントの木（レンダーツリー）で、props は親から子へ一方向に流れる。子から親へは、親が渡したハンドラを呼んで伝える。</li>
            <li>props は分割代入で受け取り、既定値は <code>size = 100</code> の形で書く。props は読み取り専用のスナップショットで、子が書き換えてはいけない。</li>
            <li><code>children</code> はタグの間に書いた JSX を受け取る特別な props で、「穴の空いた部品」を作れる。型は <code>ReactNode</code>。</li>
            <li>配列は <code>map</code> で要素の配列に変換し、兄弟の中で一意で変わらない <code>key</code> を付ける。添字や乱数は key にしない。</li>
            <li>条件付き描画は JavaScript の <code>if</code>・三項演算子・<code>&amp;&amp;</code> で書く。<code>&amp;&amp;</code> の左辺に数値を置かない。</li>
            <li>コンポーネントは純粋関数として書く。StrictMode は開発時に2回呼んで不純さを見つける。変更を伴う処理はイベントハンドラに置く。</li>
          </ul>
          <p>次章では、コンポーネントが自分の情報を記憶し、ユーザーの操作に応じて画面を更新する仕組み、state とレンダリングのサイクルを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Understanding Your UI as a Tree',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/understanding-your-ui-as-a-tree',
      accessed: '2026-11-08',
      note: 'レンダーツリー、トップレベル／リーフコンポーネントの定義の根拠。',
    },
    {
      title: 'Thinking in React',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/thinking-in-react',
      accessed: '2026-11-08',
      note: 'コンポーネントの分割指針（単一の関心事）、一方向データフローの根拠。',
    },
    {
      title: 'Passing Props to a Component',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/passing-props-to-a-component',
      accessed: '2026-11-08',
      note: 'props の分割代入、既定値の挙動、children、props の不変性とスナップショット、スプレッド構文の注意の根拠。',
    },
    {
      title: 'Responding to Events',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/responding-to-events',
      accessed: '2026-11-08',
      note: 'ハンドラを props として渡す方法と、on／handle の命名慣例の根拠。',
    },
    {
      title: 'Using TypeScript',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/typescript',
      accessed: '2026-11-08',
      note: 'props の interface 定義、ReactNode と ReactElement、イベント型、CSSProperties、children の種類を限定できない点の根拠。',
    },
    {
      title: 'Rendering Lists',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/rendering-lists',
      accessed: '2026-11-08',
      note: 'map と filter、key の規則（一意・不変・データ由来）、添字と乱数を避ける理由、key は props にならない点、Fragment with key の根拠。',
    },
    {
      title: 'Conditional Rendering',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/conditional-rendering',
      accessed: '2026-11-08',
      note: 'if／null／三項演算子／&&／変数の5つの書き方と、&& の 0 の落とし穴の根拠。',
    },
    {
      title: 'Keeping Components Pure',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/keeping-components-pure',
      accessed: '2026-11-08',
      note: '純粋関数の定義、局所的な変更、StrictMode の二重呼び出し、副作用はイベントハンドラへ、純粋性が重要な理由の根拠。',
    },
    {
      title: 'StrictMode – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/StrictMode',
      accessed: '2026-11-08',
      note: '開発時のみの二重レンダーと、本番ビルドに影響しない点の根拠。',
    },
  ],
}

export default chapter
