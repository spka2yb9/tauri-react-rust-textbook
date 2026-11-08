import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 11-1 dispatch → reducer → state ---------- */
function ReducerFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="useReducer の流れ。イベントハンドラが dispatch にアクションオブジェクトを渡し、React が次のレンダーで reducer(現在の state, action) を呼び、その戻り値が新しい state になってコンポーネントが再描画される">
      <defs>
        <marker id="arrow11a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="150" height="80" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="95" y="65" textAnchor="middle" fontWeight="600">イベントハンドラ</text>
        <text x="95" y="88" textAnchor="middle" fontSize="12">dispatch({'{'}</text>
        <text x="95" y="106" textAnchor="middle" fontSize="12">type: 'deleted', id {'}'})</text>

        <path d="M170,80 L218,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow11a)" />
        <text x="194" y="68" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">action</text>

        <rect x="220" y="40" width="200" height="80" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="65" textAnchor="middle" fontWeight="600">reducer(state, action)</text>
        <text x="320" y="88" textAnchor="middle" fontSize="12">switch (action.type) で</text>
        <text x="320" y="106" textAnchor="middle" fontSize="12">次の state を純粋に計算</text>

        <path d="M420,80 L468,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow11a)" />
        <text x="444" y="68" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">戻り値</text>

        <rect x="470" y="40" width="150" height="80" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="545" y="65" textAnchor="middle" fontWeight="600">新しい state</text>
        <text x="545" y="88" textAnchor="middle" fontSize="12">React が保存し</text>
        <text x="545" y="106" textAnchor="middle" fontSize="12">再レンダー</text>

        {/* current state into reducer */}
        <path d="M545,120 L545,170 L320,170 L320,122" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow11a)" />
        <text x="300" y="190" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">次の dispatch では「現在の state」として渡される</text>

        {/* render */}
        <path d="M545,120 L545,205" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow11a)" />
        <rect x="470" y="208" width="150" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="545" y="233" textAnchor="middle">コンポーネントが描画</text>
      </g>
      <text x="320" y="280" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ハンドラは「何が起きたか」だけを伝え、「どう変えるか」は reducer に集約される</text>
    </svg>
  )
}

/* ---------- 図 11-2 Provider ツリー ---------- */
function ProviderTreeFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="Context の Provider ツリー。App が ThemeContext に dark を提供し、その下の Layout と Sidebar を経由せずに、深い位置の Button が useContext で dark を読む。別の枝では内側の Provider が light を提供して上書きし、その下の Button は light を読む">
      <defs>
        <marker id="arrow11b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-accent)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="220" y="20" width="200" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="38" textAnchor="middle" fontWeight="600">App</text>
        <text x="320" y="56" textAnchor="middle" fontSize="12">{'<ThemeContext value="dark">'}</text>

        <line x1="270" y1="64" x2="160" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="370" y1="64" x2="480" y2="100" stroke="var(--fig-line)" strokeWidth="2" />

        <rect x="90" y="100" width="140" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="160" y="125" textAnchor="middle">Layout</text>
        <line x1="160" y1="140" x2="160" y2="170" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="90" y="170" width="140" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="160" y="195" textAnchor="middle">Sidebar</text>
        <line x1="160" y1="210" x2="160" y2="240" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="90" y="240" width="140" height="56" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="160" y="262" textAnchor="middle" fontWeight="600">Button</text>
        <text x="160" y="282" textAnchor="middle" fontSize="12">useContext → "dark"</text>

        <rect x="380" y="100" width="200" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="118" textAnchor="middle">Preview</text>
        <text x="480" y="136" textAnchor="middle" fontSize="12">{'<ThemeContext value="light">'}</text>
        <line x1="480" y1="144" x2="480" y2="170" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="410" y="170" width="140" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="480" y="195" textAnchor="middle">Card</text>
        <line x1="480" y1="210" x2="480" y2="240" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="410" y="240" width="140" height="56" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="262" textAnchor="middle" fontWeight="600">Button</text>
        <text x="480" y="282" textAnchor="middle" fontSize="12">useContext → "light"</text>
      </g>
      {/* context flow arrows */}
      <path d="M240,50 C60,60 40,200 86,262" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow11b)" />
      <text x="40" y="150" fontSize="12" fill="var(--fig-accent)">dark</text>
      <path d="M582,122 C610,160 605,220 554,262" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow11b)" />
      <text x="606" y="200" fontSize="12" fill="var(--fig-accent)">light</text>
      <text x="320" y="318" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：コンポーネントの親子　点線：Context の値（中間の部品を飛び越えて届く）</text>
      <text x="320" y="335" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">内側の Provider が外側の値を上書きする</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 11,
  part: 3,
  title: 'useReducer と Context',
  summary:
    'state の更新ロジックが多くのハンドラに散らばると見通しが悪くなります。更新を「何が起きたか」と「どう変えるか」に分ける reducer と、props を何段も渡さずに深い場所へ値を届ける Context を学び、2つを組み合わせてアプリ全体の状態を管理する形を作ります。',
  goals: [
    'useState の更新ロジックを reducer に移し、アクションを dispatch する形に書き換えられる',
    'reducer が純粋でなければならない理由と、useState との使い分けを説明できる',
    'props のバケツリレーを説明し、Context の作成・提供・読み取りの3段階を書ける',
    'Context を使う前に検討すべき代替手段と、Context の値が変わったときの再レンダーの範囲を説明できる',
    'reducer と Context を組み合わせ、Provider コンポーネントとカスタムフックで状態管理を1ファイルにまとめられる',
  ],
  prerequisites: [9, 10],
  sections: [
    {
      id: 'scattered-updates',
      title: '散らばった更新ロジック',
      body: (
        <>
          <p>
            <ChapterLink n={9} /> と <ChapterLink n={10} /> で、state はできるだけ小さく、信頼できる唯一の情報源に置くと学びました。しかし、1つの state を更新する場所が増えると、別の問題が出てきます。ToDo アプリの <code>tasks</code> を考えます。追加、変更、削除のハンドラがそれぞれ <code>setTasks</code> を呼び、それぞれが配列の作り直し方を知っています。
          </p>
          <Code
            lang="tsx"
            code={`
function handleAddTask(text: string) {
  setTasks([...tasks, { id: nextId++, text, done: false }])
}
function handleChangeTask(task: Task) {
  setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
}
function handleDeleteTask(taskId: number) {
  setTasks(tasks.filter((t) => t.id !== taskId))
}
`}
          />
          <p>
            この程度なら読めますが、操作が増え、ハンドラが複数のコンポーネントに分かれ、1つの操作が複数の state を変えるようになると、「この state はどんな変わり方をしうるのか」を一目で把握できなくなります。公式ドキュメントが示す対策は、更新ロジックをコンポーネントの外の1つの関数に集めることです。その関数を <Term en="reducer">reducer</Term> と呼びます。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'reducer',
      title: 'reducer に更新ロジックを集める',
      body: (
        <>
          <p>useState から useReducer への移行は3段階です。<Ref n={1} /></p>
          <ol className="steps">
            <li>ハンドラの中の <code>setTasks</code> を、<code>dispatch</code> にアクションを渡す形に置き換える。</li>
            <li>reducer 関数を書く。現在の state とアクションを受け取り、次の state を返す。</li>
            <li>コンポーネントで <code>useState</code> の代わりに <code>useReducer</code> を使う。</li>
          </ol>
          <p>
            <Term en="action">アクション</Term> は「何が起きたか」を表すただのオブジェクトです。形は自由ですが、慣例として文字列の <code>type</code> と、それに必要な最小限の情報だけを持たせます。<Ref n={1} /> 公式ドキュメントの言い方では、「React に『何をするか』を指示する代わりに、『ユーザーが何をしたか』を伝える」のがアクションです。
          </p>
          <Code
            lang="tsx"
            title="src/features/tasks/tasksReducer.ts"
            code={`
export interface Task { id: number; text: string; done: boolean }

// アクションは判別可能なユニオンで表す（第6章）
export type TaskAction =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number }

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added': {
      return [...tasks, { id: action.id, text: action.text, done: false }]
    }
    case 'changed': {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t))
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id)
    }
  }
}
`}
          />
          <Code
            lang="tsx"
            title="src/features/tasks/TaskApp.tsx"
            code={`
import { useReducer } from 'react'
import { tasksReducer, type Task } from './tasksReducer'

const initialTasks: Task[] = []

export function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  function handleAddTask(text: string) {
    dispatch({ type: 'added', id: Date.now(), text })
  }
  function handleDeleteTask(id: number) {
    dispatch({ type: 'deleted', id })
  }
  // ...
}
`}
          />
          <Figure n="11-1" title="dispatch → reducer → state の流れ" caption="ハンドラは dispatch にアクションを渡すだけ。React は次のレンダーで reducer(現在の state, action) を呼び、戻り値を新しい state として保存して再描画する。">
            <ReducerFlowFigure />
          </Figure>
          <p>
            図のとおり、<code>dispatch</code> は <ChapterLink n={9} /> の set 関数と同じく「次のレンダーのための更新を予約する」だけです。呼んだ直後に <code>state</code> を読んでも古い値です。<Ref n={2} /> reducer は state を引数で受け取るので、コンポーネントの外に書けます。これによりインデントが浅くなり、別ファイルに切り出して単独でテストできます。<Ref n={1} />
          </p>
          <h3>reducer は純粋でなければならない</h3>
          <p>
            reducer はレンダー中に実行されます。<ChapterLink n={9} /> の更新関数と同じ理由で、純粋でなければなりません。リクエストの送信やタイマーの設定などの副作用を起こさず、オブジェクトや配列は書き換えずに新しいものを返します。<code>alert</code> のような処理は reducer ではなくハンドラに置きます。<Ref n={1} /> StrictMode では、純粋さを確かめるために reducer と初期化関数が2回呼ばれます（結果の一方は捨てられます）。<Ref n={2} />
          </p>
          <p>
            もう1つの指針は、1つのアクションが1つのユーザー操作を表すことです。フォームの「リセット」ボタンは、5つの <code>set_field</code> アクションではなく1つの <code>reset_form</code> アクションにします。アクションの記録を見たときに、何が起きたか追いやすくなります。<Ref n={1} />
          </p>
          <p>
            「reducer」という名前は配列の <code>reduce()</code> に由来します。<code>reduce</code> が「これまでの結果」と「次の要素」から新しい結果を作るように、reducer は「これまでの state」と「アクション」から次の state を作ります。<Ref n={1} />
          </p>
          <Callout>
            <p>
              TypeScript では、アクションを判別可能なユニオン（<ChapterLink n={6} />）で定義すると、<code>switch (action.type)</code> の各分岐で <code>action</code> の型が絞り込まれ、存在しない <code>type</code> を dispatch するとコンパイルエラーになります。すべてのケースを網羅していれば <code>default</code> も不要です。初期 state の計算が重いときは <code>useReducer(reducer, arg, init)</code> の第3引数に初期化関数を渡すと初回だけ実行されます。<Ref n={2} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'usestate-vs-usereducer',
      title: 'useState と useReducer の使い分け',
      body: (
        <>
          <p>
            2つは等価で、いつでも相互に書き換えられますし、同じコンポーネントで混ぜて使えます。<Ref n={1} /> 公式ドキュメントが挙げる比較の観点は次のとおりです。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>観点</th>
                  <th>useState</th>
                  <th>useReducer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>コード量</td>
                  <td>少ない。最初に書く量が小さい</td>
                  <td>reducer と dispatch の分だけ増えるが、似た更新が多いと減る</td>
                </tr>
                <tr>
                  <td>読みやすさ</td>
                  <td>単純な更新なら読みやすい</td>
                  <td>複雑な更新で「どう変えるか」と「何が起きたか」を分離できる</td>
                </tr>
                <tr>
                  <td>デバッグ</td>
                  <td>どこで set したかを追う必要がある</td>
                  <td>reducer に <code>console.log</code> を置けば全更新とその理由が見える</td>
                </tr>
                <tr>
                  <td>テスト</td>
                  <td>コンポーネントごと動かす必要がある</td>
                  <td>純粋関数なので単独でテストできる</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            目安としては、state が単純な値で更新箇所が少なければ <code>useState</code>、1つの state に対する更新の種類が多い、更新が複数の箇所から行われる、更新のバグが多い、といった場合に <code>useReducer</code> を検討します。Tsumugi では、簡易データベースの表ビューのように「並べ替え」「絞り込み」「列の追加」など多種類の操作が1つの状態を変える場面で reducer を使います。
          </p>
        </>
      ),
    },
    {
      id: 'context',
      title: 'Context：props を経由せずに値を届ける',
      body: (
        <>
          <p>
            props は親から子へしか渡せません。テーマ（ダーク／ライト）のように画面のあちこちで使う値や、ツリーの深い位置でだけ使う値を props で渡すと、途中のコンポーネントは自分では使わない値を受け取って下へ渡すだけになります。これを <Term en="prop drilling">props のバケツリレー</Term>（prop drilling）と呼びます。<Ref n={3} />
          </p>
          <p>
            <Term en="Context">Context</Term> は、親が「この下の木全体に対して、この値を使えるようにする」と宣言し、子孫はどれだけ深くても props なしでその値を読める仕組みです。<Ref n={3} /> 使い方は3段階です。
          </p>
          <Code
            lang="tsx"
            title="1. 作る：src/features/settings/ThemeContext.ts"
            code={`
import { createContext } from 'react'

export type Theme = 'light' | 'dark'
// 引数は、上に Provider が無いときに使われる既定値
export const ThemeContext = createContext<Theme>('light')
`}
          />
          <Code
            lang="tsx"
            title="2. 読む：深い位置のコンポーネント"
            code={`
import { useContext } from 'react'
import { ThemeContext } from '../settings/ThemeContext'

function Button({ children }: { children: ReactNode }) {
  const theme = useContext(ThemeContext)
  return <button className={\`btn btn-\${theme}\`}>{children}</button>
}
`}
          />
          <Code
            lang="tsx"
            title="3. 提供する：上位のコンポーネント"
            code={`
function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  return (
    <ThemeContext value={theme}>
      <Layout />
    </ThemeContext>
  )
}
`}
          />
          <p>
            <code>{'<ThemeContext value={theme}>'}</code> のように Context オブジェクトそのものをタグとして描く書き方は React 19 からのものです。React 18 以前は <code>{'<ThemeContext.Provider value={...}>'}</code> と書く必要がありました。古い書き方も動きますが、公式リファレンスは <code>.Provider</code> を「React 19 より前の、レガシーな方法」と位置付けています。<Ref n={4} /> 同様に、値を読む <code>{'<ThemeContext.Consumer>'}</code> もレガシーで、新しいコードでは <code>useContext</code> を使います。<Ref n={4} />
          </p>
          <Figure n="11-2" title="Provider ツリーと Context の値の流れ" caption="App が ThemeContext に dark を提供すると、Layout と Sidebar を経由せずに深い位置の Button が dark を読める。別の枝では Preview が内側で light を提供して上書きし、その下の Button は light を読む。">
            <ProviderTreeFigure />
          </Figure>
          <p>
            図から読み取れる規則は3つです。<Ref n={3} /> <Ref n={5} /> 第一に、Context の値は中間のコンポーネントを飛び越えて届きます。間にある <code>Layout</code> や <code>Sidebar</code>、HTML の <code>{'<div>'}</code> は何もしなくてよい。第二に、<code>useContext</code> は「自分より上にある、最も近い Provider」の値を返します。内側の Provider が外側を上書きするので、画面の一部だけテーマを変えることができます。第三に、上に Provider が1つもなければ <code>createContext</code> に渡した既定値が返ります。既定値は決して変化しないので、動的に変えたい値は state と組み合わせて Provider に渡します。<Ref n={4} />
          </p>
          <p>
            公式ドキュメントは CSS の継承にたとえています。<code>color</code> を上位の要素に指定すれば子孫に継承され、途中で別の値を指定すれば上書きされる。異なる Context は異なる CSS プロパティのように互いに独立しています。<Ref n={3} />
          </p>
          <Callout kind="warn">
            <p>
              Provider は「読む側のコンポーネントより上」になければなりません。<code>App</code> の中で <code>useContext(ThemeContext)</code> を呼びつつ、同じ <code>App</code> の JSX で <code>{'<ThemeContext value="dark">'}</code> を描いても、<code>App</code> 自身はその値を読めません。<Ref n={5} /> また、<code>{'<ThemeContext theme={theme}>'}</code> のように props 名を間違えると値が <code>undefined</code> になります。props 名は必ず <code>value</code> です。<Ref n={5} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'before-context',
      title: 'Context を使う前に',
      body: (
        <>
          <p>
            Context は便利なぶん、使いすぎると「このコンポーネントはどこから値を受け取っているのか」が見えにくくなります。公式ドキュメントは、何段か props を渡す必要があるというだけで Context に飛びつかず、まず次の2つを試すよう勧めています。<Ref n={3} />
          </p>
          <ol>
            <li>まずは props で渡す。データの流れが明示的で、どのコンポーネントが何を使っているか追いやすい。</li>
            <li>コンポーネントを分割し、JSX を <code>children</code> として渡す。<code>{'<Layout posts={posts} />'}</code> のように途中の <code>Layout</code> が使わない値を渡しているなら、<code>{'<Layout><Posts posts={posts} /></Layout>'}</code> とすれば、値を指定する側と使う側の間の層が減る。</li>
          </ol>
          <p>
            それでも合わないときの Context の典型的な用途は、テーマ、ログイン中のアカウント、ルーティング（<ChapterLink n={15} /> の React Router は内部で Context を使っています）、そして次節で扱う状態管理です。<Ref n={3} />
          </p>
          <h3>値が変わると読んでいる側がすべて再レンダーされる</h3>
          <p>
            Provider に渡した <code>value</code> が変わると（比較は <code>Object.is</code>）、その Context を読んでいるすべての子孫が再レンダーされます。<ChapterLink n={14} /> で学ぶ <code>memo</code> で再レンダーを省略していても、Context の新しい値は届きます。<Ref n={5} /> 注意が必要なのは、<code>{'value={{ user, login }}'}</code> のように毎レンダーで新しいオブジェクトを作ると、中身が同じでも毎回「変わった」とみなされる点です。大きなアプリでは <code>useMemo</code> でオブジェクトを安定させますが、小さなアプリでは不要な最適化です。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'reducer-and-context',
      title: 'reducer と Context を組み合わせる',
      body: (
        <>
          <p>
            reducer で更新ロジックを集めても、<code>tasks</code> と <code>dispatch</code> を深い子に渡すには props が必要です。そこで、state と dispatch を Context で配ります。公式ドキュメントは、state 用と dispatch 用の2つの Context を別々に作ることを勧めています。<Ref n={6} /> dispatch は変化しない（安定した identity を持つ<Ref n={2} />）ので、dispatch だけを読むコンポーネントは state が変わっても Context の更新による再レンダーが起きずに済みます。公式ページは2つに分ける理由までは書いていないため、この点は Context の仕組みからの説明です。
          </p>
          <Code
            lang="tsx"
            title="src/features/tasks/TasksContext.tsx"
            code={`
import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'
import { tasksReducer, type Task, type TaskAction } from './tasksReducer'

// 意味のある既定値が無いので null にし、読む側で検査する
const TasksContext = createContext<Task[] | null>(null)
const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  )
}

export function useTasks(): Task[] {
  const tasks = useContext(TasksContext)
  if (tasks === null) throw new Error('useTasks は TasksProvider の中で使ってください')
  return tasks
}

export function useTasksDispatch(): Dispatch<TaskAction> {
  const dispatch = useContext(TasksDispatchContext)
  if (dispatch === null) throw new Error('useTasksDispatch は TasksProvider の中で使ってください')
  return dispatch
}
`}
          />
          <Code
            lang="tsx"
            title="使う側"
            code={`
export function TaskApp() {
  return (
    <TasksProvider>
      <h1>京都での休日</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  )
}

function TaskList() {
  const tasks = useTasks()
  const dispatch = useTasksDispatch()
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => dispatch({ type: 'deleted', id: task.id })}>削除</button>
        </li>
      ))}
    </ul>
  )
}
`}
          />
          <p>
            <code>TasksProvider</code> は、reducer で state を管理し、2つの Context を提供し、<code>children</code> を受け取る、という3つの役割を1つにまとめたコンポーネントです。<Ref n={6} /> <code>useTasks</code> と <code>useTasksDispatch</code> は <code>useContext</code> を包んだだけの <Term en="custom Hook">カスタムフック</Term> で、名前が <code>use</code> で始まるので中でフックを呼べます。この包み紙を用意しておくと、後から Context を分割したり処理を足したりしても使う側を変えずに済みます。<Ref n={6} /> カスタムフックの設計は <ChapterLink n={13} /> で詳しく扱います。
          </p>
          <p>
            TypeScript では、既定値に <code>null</code> を使って <code>createContext&lt;T | null&gt;(null)</code> と型付けし、カスタムフックの中で <code>null</code> なら例外を投げるのが公式の推奨パターンです。<Ref n={7} /> こうすると、使う側では <code>null</code> の検査なしに <code>Task[]</code> として扱え、Provider の外で誤って使った場合は早い段階で気付けます。
          </p>
          <p>
            結果として、<code>TaskList</code> は「データをどこから得るか」ではなく「何を表示するか」だけに集中できます。公式ドキュメントの言葉を借りれば、<code>TasksProvider</code> は「タスクの扱い方を知っている画面の一部」、<code>useTasks</code> は「読む手段」、<code>useTasksDispatch</code> は「下のどこからでも更新する手段」です。<Ref n={6} />
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
              設定とテーマ（<ChapterLink n={50} />）は、この章の Context そのものです。<code>SettingsProvider</code> が「OS に追従」「ライト」「ダーク」の設定を state で持ち、Context で配ります。サイドバー、エディタ、ダイアログのどこからでも <code>useSettings()</code> で読めるので、props のバケツリレーは起きません。設定の永続化（tauri-plugin-store、<ChapterLink n={38} />）は Provider の中に閉じ込めます。
            </p>
            <p>
              簡易データベースの表ビュー（<ChapterLink n={47} />、<ChapterLink n={48} />）では、並べ替え・絞り込み・列の表示設定を1つの reducer で管理します。<code>{"{ type: 'sorted', propertyId, direction }"}</code> や <code>{"{ type: 'filter-added', ... }"}</code> のようなアクションをヘッダーやメニューから dispatch し、reducer がビュー設定を純粋に計算します。ビュー設定を保存する操作は、reducer ではなくハンドラから Rust 側のコマンドを呼びます。
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
            <li>reducer は「現在の state とアクションから次の state を返す純粋関数」。ハンドラは <code>dispatch</code> で「何が起きたか」を伝えるだけになり、更新ロジックが1か所に集まる。</li>
            <li>アクションは <code>type</code> と最小限の情報を持つオブジェクトで、1つの操作に1つのアクションを対応させる。TypeScript では判別可能なユニオンにする。</li>
            <li><code>useState</code> と <code>useReducer</code> は等価。更新の種類が多い、更新箇所が多い、テストしたい、という場合に reducer が有利。</li>
            <li>Context は <code>createContext</code> で作り、<code>{'<Ctx value={...}>'}</code> で提供し、<code>useContext</code> で読む。中間のコンポーネントを飛び越え、内側の Provider が外側を上書きする。</li>
            <li>Context の前に props と <code>children</code> での分割を検討する。値が変わると読んでいる子孫はすべて再レンダーされる。</li>
            <li>state と dispatch を別々の Context で配り、Provider コンポーネントとカスタムフックにまとめると、使う側は表示に集中できる。</li>
          </ul>
          <p>次章では、レンダーの外側で外部システムと同期するための仕組み、useEffect を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Extracting State Logic into a Reducer',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer',
      accessed: '2026-11-08',
      note: '移行の3段階、アクションの慣例、reducer の純粋性、1操作1アクション、useState との比較、reduce に由来する名前の根拠。',
    },
    {
      title: 'useReducer – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/useReducer',
      accessed: '2026-11-08',
      note: 'dispatch が次のレンダーまで反映されない点、StrictMode での二重呼び出し、初期化関数、dispatch の安定した identity の根拠。',
    },
    {
      title: 'Passing Data Deeply with Context',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/passing-data-deeply-with-context',
      accessed: '2026-11-08',
      note: 'props のバケツリレー、作成・読み取り・提供の3段階、中間を飛び越える性質、内側の Provider による上書き、CSS のたとえ、使う前の代替案、用途の根拠。',
    },
    {
      title: 'createContext – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/createContext',
      accessed: '2026-11-08',
      note: 'React 19 で Context を直接 Provider として描ける点、.Provider と .Consumer がレガシーである点、既定値が変化しない点の根拠。',
    },
    {
      title: 'useContext – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/useContext',
      accessed: '2026-11-08',
      note: '最も近い Provider の値を返す点、Provider は上になければならない点、値の変化で子孫が再レンダーされる点（memo でも）、オブジェクト値と useMemo、props 名は value の根拠。',
    },
    {
      title: 'Scaling Up with Reducer and Context',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/scaling-up-with-reducer-and-context',
      accessed: '2026-11-08',
      note: 'state と dispatch の2つの Context、Provider コンポーネント、useTasks／useTasksDispatch のカスタムフック、1ファイルへの集約の根拠。',
    },
    {
      title: 'Using TypeScript',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/typescript',
      accessed: '2026-11-08',
      note: 'useReducer のアクション型付け、createContext<T | null>(null) とカスタムフックで例外を投げるパターンの根拠。',
    },
  ],
}

export default chapter
