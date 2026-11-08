import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 14-1 再レンダーの伝播 ---------- */
function RerenderTreeFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="App の下に Sidebar と Editor があり、Editor の下に Toolbar と Content がある木。Editor の state が変わると Editor とその子孫の Toolbar、Content が再レンダーされ、Sidebar は再レンダーされない。memo で包んだ Toolbar は props が同じなら再レンダーを飛ばせる">
      <defs>
        <marker id="arrow14a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        {/* App */}
        <rect x="260" y="20" width="120" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="47">App</text>
        {/* Sidebar */}
        <rect x="100" y="110" width="140" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="170" y="137">Sidebar</text>
        {/* Editor */}
        <rect x="400" y="110" width="140" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-accent)" strokeWidth="3" />
        <text x="470" y="137">Editor（state 更新）</text>
        {/* Toolbar */}
        <rect x="320" y="210" width="140" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="390" y="230">Toolbar</text>
        <text x="390" y="246" fontSize="11" fill="var(--fig-muted)">memo で包めば飛ばせる</text>
        {/* Content */}
        <rect x="480" y="210" width="140" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="550" y="237">Content</text>
      </g>
      <path d="M300,64 L190,108" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow14a)" />
      <path d="M340,64 L450,108" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow14a)" />
      <path d="M450,154 L400,208" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow14a)" />
      <path d="M490,154 L540,208" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow14a)" />
      <text x="170" y="180" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">再レンダーされない</text>
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">橙：再レンダーされる範囲　太枠：更新の起点　破線：memo で飛ばせる候補（模式図）</text>
    </svg>
  )
}

/* ---------- 図 14-2 React Compiler の位置 ---------- */
function CompilerPipelineFigure() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="ビルドの流れ。書いたままのコンポーネントのソースが Vite のビルド中に React Compiler（Babel プラグイン）を通り、メモ化のコードが自動で挿入された出力になってブラウザへ届く。ESLint は同じ解析器で規則違反を事前に指摘する">
      <defs>
        <marker id="arrow14b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <rect x="20" y="60" width="160" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="100" y="88" fontWeight="600">ソースコード</text>
        <text x="100" y="110" fontSize="12" fill="var(--fig-muted)">useMemo を書かない</text>
        <rect x="240" y="60" width="160" height="70" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="88" fontWeight="600">React Compiler</text>
        <text x="320" y="110" fontSize="12" fill="var(--fig-muted)">Vite のビルド中に実行</text>
        <rect x="460" y="60" width="160" height="70" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="88" fontWeight="600">出力コード</text>
        <text x="540" y="110" fontSize="12" fill="var(--fig-muted)">メモ化が挿入済み</text>
        <rect x="240" y="160" width="160" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="320" y="187">eslint-plugin-react-hooks</text>
      </g>
      <path d="M180,95 L238,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow14b)" />
      <path d="M400,95 L458,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow14b)" />
      <path d="M320,158 L320,132" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow14b)" />
      <text x="430" y="185" fontSize="12" fill="var(--fig-muted)" textAnchor="start">同じ解析器で規則違反を指摘</text>
      <text x="100" y="30" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">開発者が書く</text>
      <text x="540" y="30" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ブラウザ（WebView）が実行</text>
    </svg>
  )
}

/* ---------- 図 14-3 Transition の有無 ---------- */
function TransitionFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="上段は通常の更新で、重いレンダーの間は入力に反応できない。下段は Transition で、入力への反応を先に処理し、重いレンダーは中断可能な形で裏で進む。途中で新しい入力が来ると古いレンダーは捨てられる">
      <defs>
        <marker id="arrow14c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <path d="M120,40 L610,40" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow14c)" />
      <text x="600" y="30" fontSize="12" fill="var(--fig-muted)" textAnchor="end">時間</text>
      {/* row 1 */}
      <text x="20" y="90" fontSize="13" fontWeight="600">通常の更新</text>
      <rect x="120" y="65" width="60" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="150" y="90" fontSize="12" textAnchor="middle">入力</text>
      <rect x="180" y="65" width="300" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="330" y="90" fontSize="12" textAnchor="middle">重いレンダー（一覧の描き直し）</text>
      <text x="330" y="125" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">この間、次の入力に反応できない</text>
      {/* row 2 */}
      <text x="20" y="190" fontSize="13" fontWeight="600">Transition</text>
      <rect x="120" y="165" width="60" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="150" y="190" fontSize="12" textAnchor="middle">入力</text>
      <rect x="180" y="165" width="130" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="245" y="190" fontSize="12" textAnchor="middle">裏でレンダー</text>
      <rect x="310" y="165" width="60" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="340" y="190" fontSize="12" textAnchor="middle">次の入力</text>
      <rect x="370" y="165" width="200" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="470" y="190" fontSize="12" textAnchor="middle">やり直して裏でレンダー</text>
      <line x1="190" y1="170" x2="300" y2="200" stroke="var(--fig-danger)" strokeWidth="2" />
      <text x="245" y="230" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">古い結果は捨てられる</text>
      <text x="470" y="230" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">isPending が true の間</text>
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線枠：ブロッキングな処理　破線枠：中断可能な処理（模式図）</text>
    </svg>
  )
}

/* ---------- 図 14-4 Suspense の境界 ---------- */
function SuspenseFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="外側の Suspense 境界の中に、すぐ表示できる見出しと、lazy で読み込む Editor コンポーネントがある。Editor のコードが届くまでは境界全体が fallback に置き換わる。内側にもう1つ境界を置けば、見出しは先に出て Editor の部分だけが fallback になる">
      <g fontSize="13">
        <rect x="20" y="20" width="290" height="230" rx="10" fill="none" stroke="var(--fig-line)" strokeDasharray="8 5" />
        <text x="165" y="42" textAnchor="middle" fontWeight="600">境界が1つ</text>
        <rect x="40" y="60" width="250" height="40" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="165" y="85" textAnchor="middle">見出し（すぐ描ける）</text>
        <rect x="40" y="110" width="250" height="60" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="165" y="135" textAnchor="middle">Editor（lazy で読み込み中）</text>
        <text x="165" y="155" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">コードがまだ届いていない</text>
        <rect x="40" y="190" width="250" height="40" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="165" y="215" textAnchor="middle">→ 全体が fallback になる</text>

        <rect x="330" y="20" width="290" height="230" rx="10" fill="none" stroke="var(--fig-line)" strokeDasharray="8 5" />
        <text x="475" y="42" textAnchor="middle" fontWeight="600">境界を入れ子にする</text>
        <rect x="350" y="60" width="250" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="475" y="85" textAnchor="middle">見出し（先に表示される）</text>
        <rect x="350" y="110" width="250" height="90" rx="8" fill="none" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="475" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">内側の Suspense</text>
        <rect x="365" y="140" width="220" height="48" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="475" y="160" textAnchor="middle">fallback（この部分だけ）</text>
        <text x="475" y="178" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">Editor が届いたら差し替わる</text>
        <text x="475" y="225" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">読み込みの順序を境界で設計する</text>
      </g>
      <text x="320" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線：Suspense 境界　紫：fallback　緑：表示済み（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 14,
  part: 3,
  title: 'パフォーマンスと並行レンダリング',
  summary:
    '再レンダーが木をどう伝わるかを出発点に、memo・useMemo・useCallback の仕組みと限界、それらを自動化する React Compiler の導入手順を学びます。後半では、重い更新を中断可能にする useTransition と、読み込み中の表示を宣言的に書く Suspense と lazy を扱います。',
  goals: [
    'state 更新がどの範囲のコンポーネントを再レンダーするかを説明できる',
    'memo・useMemo・useCallback が何を比較し、どんなときに効かないかを説明できる',
    'React Compiler が何を自動化するかを理解し、Vite プロジェクトで有効化できる',
    'useTransition で重い更新を非ブロッキングにし、isPending で保留中の表示を出せる',
    'Suspense と lazy でコード分割と読み込み中の表示を実装できる',
    '計測せずに最適化しない、という姿勢を説明できる',
  ],
  prerequisites: [9, 12, 13],
  sections: [
    {
      id: 'rerender',
      title: '再レンダーはどこまで広がるか',
      body: (
        <>
          <p>
            <ChapterLink n={9} /> で、React の更新は「トリガー → レンダー → コミット」の3段階で進むと学びました。この章では「レンダー」の段階で、どのコンポーネントの関数が呼ばれるのかを正確に押さえます。公式ドキュメントはこう説明しています。「2回目以降のレンダーでは、React は state 更新を起こしたコンポーネント関数を呼ぶ。この処理は再帰的で、更新されたコンポーネントが別のコンポーネントを返せばそれをレンダーし、それがまた別のものを返せばそれもレンダーする」。<Ref n={1} />
          </p>
          <p>
            つまり、state が変わったコンポーネントを起点に、その子孫がすべて再レンダーされます。親や兄弟は再レンダーされません。木の形で見てみます。
          </p>
          <Figure n="14-1" title="state 更新で再レンダーされる範囲" caption="Editor の state が変わると、Editor とその子孫（Toolbar、Content）が再レンダーされる。親の App と兄弟の Sidebar は関係ない。Toolbar の props が変わっていないなら、memo で包むことで再レンダーを飛ばせる。模式図。">
            <RerenderTreeFigure />
          </Figure>
          <p>
            ここで大事なのは、再レンダーと DOM の書き換えは別だということです。公式ドキュメントは「React はレンダー間で差があった DOM ノードだけを変更する」と述べています。<Ref n={1} /> 再レンダーされた <code>Toolbar</code> の出力が前回と同じなら、DOM には何も起きません。つまり、ほとんどの場合、子孫の再レンダーは「無駄な関数呼び出し」ではあっても「無駄な画面更新」ではありません。
          </p>
          <p>
            それでも、子孫の数が多い、あるいは1回のレンダーが重い（大きな配列を並べ替える、など）場合は、関数呼び出しそのものが目に見える遅さになります。この章の前半で学ぶ <Term en="memoization">メモ化</Term> は、この「出力が変わらないのに呼ばれる」レンダーを飛ばす技術です。
          </p>
          <Callout kind="warn">
            <p>
              最適化の前に計測します。公式ドキュメントの <code>useMemo</code> の解説は「数千個のオブジェクトを作ったりループしたりしていない限り、たぶん重くない」と述べ、<code>console.time</code> で測って 1ms 以上かかるならメモ化を検討する、という目安を示しています。<Ref n={3} /> 体感できない遅さのためにコードを複雑にする必要はありません。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'memo',
      title: 'memo：props が同じなら飛ばす',
      body: (
        <>
          <p>
            <code>memo</code> はコンポーネントを包んで、新しいコンポーネントを返す関数です。包まれたコンポーネントは「親が再レンダーされても、props が変わっていなければ、ふつうは再レンダーされない」ようになります。<Ref n={2} />
          </p>
          <Code
            lang="tsx"
            code={`
import { memo } from 'react'

type ToolbarProps = { canUndo: boolean; onUndo: () => void }

export const Toolbar = memo(function Toolbar({ canUndo, onUndo }: ToolbarProps) {
  return <button disabled={!canUndo} onClick={onUndo}>元に戻す</button>
})
`}
          />
          <p>
            props が「変わっていない」かどうかは、React が各 props を <code>Object.is</code> で比べて判断します。<Ref n={2} /> ここが落とし穴です。<code>Object.is(3, 3)</code> は true ですが、<code>Object.is({'{}'}, {'{}'})</code> は false です。親のレンダー中に作られたオブジェクト、配列、関数は、中身が同じでも毎回「別物」になります。つまり、次のように書くと <code>memo</code> は一度も効きません。
          </p>
          <Code
            lang="tsx"
            code={`
function Editor() {
  const [history, setHistory] = useState<string[]>([])
  // 🔴 レンダーのたびに新しい関数が作られるので、Toolbar の props は毎回「変わる」
  return <Toolbar canUndo={history.length > 0} onUndo={() => setHistory(history.slice(0, -1))} />
}
`}
          />
          <p>
            公式ドキュメントは「常に新しい値が1つあるだけで、コンポーネント全体のメモ化が壊れる」と警告しています。<Ref n={2} /> 関数を安定させるには、次節の <code>useCallback</code> が必要です。
          </p>
          <h3>memo が効かない場面</h3>
          <ul>
            <li>そのコンポーネント自身の state が変わったとき。「メモ化は親から渡される props にだけ関係する」ので、自分の state 更新ではふつうに再レンダーされます。<Ref n={2} /></li>
            <li>使っている Context の値が変わったとき。<ChapterLink n={11} /> の Context は props を経由しないので、<code>memo</code> では止められません。Context の一部だけに反応させたいなら、Context を読む外側のコンポーネントと、必要な値だけを props で受け取る内側の <code>memo</code> コンポーネントに分けます。<Ref n={2} /></li>
            <li>props のどれかが毎回新しいオブジェクトや関数のとき（上の例）。</li>
          </ul>
          <p>
            第2引数に独自の比較関数 <code>arePropsEqual</code> を渡すこともできますが、公式ドキュメントは「すべての props（関数を含む）を比較すること」「深い比較は避けること」と注意しています。<Ref n={2} /> 古い <code>onClick</code> を使い続けるバグや、比較自体が再レンダーより遅くなる事態を招くためです。本書では使いません。
          </p>
          <p>
            公式ドキュメントの基本姿勢は明快です。「<code>memo</code> には性能最適化としてだけ頼ること。<code>memo</code> なしでコードが動かないなら、まず根本の問題を見つけて直すこと」。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'usememo-usecallback',
      title: 'useMemo と useCallback：値と関数を安定させる',
      body: (
        <>
          <p>
            <code>useMemo</code> は、計算結果を再レンダーの間でキャッシュするフックです。<Ref n={3} /> 第1引数に引数なしの純粋な計算関数、第2引数にその中で使う反応的な値（props、state、それらから導いた変数）の配列を渡します。React は前回の依存配列と <code>Object.is</code> で比べ、どれも変わっていなければ前回の結果をそのまま返します。
          </p>
          <Code
            lang="tsx"
            code={`
import { useMemo } from 'react'

function PageList({ pages, query }: { pages: Page[]; query: string }) {
  // pages か query が変わったときだけ絞り込みをやり直す
  const visible = useMemo(() => filterPages(pages, query), [pages, query])
  return <List items={visible} />
}
`}
          />
          <p>
            <code>useMemo</code> には主な用途が2つあります。<Ref n={3} /> 1つは重い計算を飛ばすこと。もう1つは、<code>memo</code> で包んだ子に渡す配列やオブジェクトを安定させることです。<code>filterPages</code> は毎回新しい配列を返すので、<code>useMemo</code> なしでは <code>List</code> の <code>memo</code> が効きません。
          </p>
          <p>
            依存配列に、コンポーネント本体で作ったオブジェクトを入れないよう注意します。公式ドキュメントは <code>const options = {'{ mode, text }'}</code> を依存にする例を挙げ、「こうしたオブジェクトに依存するとメモ化の意味がなくなる」と述べています。<Ref n={3} /> オブジェクトの生成を <code>useMemo</code> の中へ移し、依存は <code>[mode, text]</code> のようなプリミティブにします。
          </p>
          <h3>useCallback は「関数そのもの」をキャッシュする</h3>
          <p>
            関数も <code>useMemo(() =&gt; fn, deps)</code> でキャッシュできますが、入れ子が読みにくいので専用のフックがあります。<code>useCallback(fn, deps)</code> は、依存が変わるまで同じ関数を返し続けます。公式ドキュメントは内部実装を「<code>useMemo</code> の薄い包み」として示しています。<Ref n={4} /> 違いは、<code>useMemo</code> が関数を呼んでその結果をキャッシュするのに対し、<code>useCallback</code> は関数を呼ばずに関数自体をキャッシュする点です。
          </p>
          <Code
            lang="tsx"
            code={`
import { useCallback, useState } from 'react'

function Editor() {
  const [history, setHistory] = useState<string[]>([])
  // 更新関数（prev => ...）を使えば history に依存せずに済む
  const handleUndo = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1))
  }, [])
  return <Toolbar canUndo={history.length > 0} onUndo={handleUndo} />
}
`}
          />
          <p>
            公式ドキュメントは「メモ化する関数の依存はできるだけ少なくする」ことを勧め、<code>setTodos([...todos, x])</code> を <code>setTodos(todos =&gt; [...todos, x])</code> に書き換えて依存を消す例を示しています。<Ref n={4} /> <ChapterLink n={9} /> で学んだ更新関数は、ここでも役立ちます。
          </p>
          <p>
            <code>useCallback</code> が価値を持つのは、公式ドキュメントによれば限られた場面です。<Ref n={4} /> <code>memo</code> で包んだコンポーネントに渡すときと、他のフック（<code>useEffect</code> など）の依存にするときの2つが挙げられています。また、カスタムフックが関数を返す場合は、その関数を <code>useCallback</code> で包むことが勧められています。それ以外の場面で付けても、関数を作るコスト自体は減らないので、得られるものはありません。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>道具</th>
                  <th>何をキャッシュするか</th>
                  <th>比較の対象</th>
                  <th>典型的な相手</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>memo</code></td>
                  <td>コンポーネントのレンダー結果</td>
                  <td>各 props（<code>Object.is</code>）</td>
                  <td>props が変わらないのに親がよく再レンダーする子</td>
                </tr>
                <tr>
                  <td><code>useMemo</code></td>
                  <td>計算の結果（値）</td>
                  <td>依存配列の各要素</td>
                  <td>重い計算、<code>memo</code> の子へ渡す配列・オブジェクト</td>
                </tr>
                <tr>
                  <td><code>useCallback</code></td>
                  <td>関数そのもの</td>
                  <td>依存配列の各要素</td>
                  <td><code>memo</code> の子へ渡すハンドラ、Effect の依存</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Callout>
            <p>
              3つとも「キャッシュは保証ではない」点が共通です。公式ドキュメントは「React は特定の理由がない限りキャッシュを捨てないが、将来のバージョンで捨てる場面が増える可能性がある」と述べています。<Ref n={3} /> 正しさをキャッシュに依存させず、性能のためだけに使います。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'react-compiler',
      title: 'React Compiler：メモ化を自動化する',
      body: (
        <>
          <p>
            前節までの手作業のメモ化は、公式ドキュメントの言葉を借りれば「面倒で、間違えやすく、維持すべきコードを増やす」作業です。<Ref n={5} /> <Term en="React Compiler">React Compiler</Term> はこれを自動化するビルド時のツールで、2025年10月7日に最初の安定版 1.0 が公開されました。<Ref n={6} /> 本書の基準バージョンは React Compiler 1.0.0、パッケージ名は <code>babel-plugin-react-compiler</code> です。
          </p>
          <p>
            コンパイラは、<ChapterLink n={7} /> で学んだ JSX の変換と同じく、ビルドの途中でソースを書き換えます。ふつうの JavaScript のまま動き、React のルール（Rules of React）を理解しているので、コードを書き直す必要はありません。<Ref n={5} />
          </p>
          <Figure n="14-2" title="ビルドの流れの中の React Compiler" caption="開発者は useMemo や memo を書かずにコンポーネントを書く。Vite のビルド中に React Compiler（Babel プラグイン）がメモ化のコードを挿入し、その出力がブラウザ（Tauri では WebView）で動く。eslint-plugin-react-hooks は同じ解析器を使い、コンパイラが最適化できないコードを事前に指摘する。模式図。">
            <CompilerPipelineFigure />
          </Figure>
          <h3>何を自動化するか</h3>
          <p>
            公式ドキュメントは、コンパイラの最適化が主に「更新時の性能（既存コンポーネントの再レンダー）」を対象にすると説明し、2つの効果を挙げています。<Ref n={5} /> 1つは連鎖的な再レンダーの抑止で、図 14-1 の <code>Toolbar</code> を <code>memo</code> で包んだのと同じ効果を自動で得られます。もう1つは重い計算のスキップで、レンダー中の関数呼び出しが <code>useMemo</code> と同等にキャッシュされます。ただし「コンポーネントとフックの中だけを対象にし、すべての関数をメモ化するわけではない」「メモ化は複数のコンポーネント間で共有されない」という制限があります。<Ref n={5} />
          </p>
          <p>
            前節の <code>Editor</code> と <code>Toolbar</code> の例を思い出してください。<code>onUndo={'{'}() =&gt; ...{'}'}</code> と書くと <code>memo</code> は壊れました。公式ドキュメントは、コンパイラなら「アロー関数があってもなくても正しく最適化でき、<code>Item</code> は <code>props.onClick</code> が変わったときだけ再レンダーされる」と述べています。<Ref n={5} /> 手でメモ化したときに起きやすい取りこぼしも、コンパイラなら避けられます。
          </p>
          <h3>Vite プロジェクトで有効にする</h3>
          <p>
            インストール手順は公式の導入ページに従います。<Ref n={7} /> React チームは、テストが十分でないプロジェクトでは <code>^1.0.0</code> のような範囲指定ではなく <code>1.0.0</code> のような厳密なバージョンに固定することを勧めています。<Ref n={6} />
          </p>
          <Code
            lang="bash"
            code={`
npm install --save-dev --save-exact babel-plugin-react-compiler@latest
npm install -D @rolldown/plugin-babel
`}
          />
          <p>
            2026年11月時点の導入ページは、<code>@vitejs/plugin-react</code> 6.0.0 以降を前提に、<code>@rolldown/plugin-babel</code> と <code>reactCompilerPreset</code> を組み合わせる設定を示しています。<Ref n={7} />
          </p>
          <Code
            lang="ts"
            title="vite.config.ts"
            code={`
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
})
`}
          />
          <p>
            同じページには、<code>@vitejs/plugin-react</code> が 6.0.0 より前の場合の設定（<code>react({'{ babel: { plugins: [\'babel-plugin-react-compiler\'] } }'})</code>）も載っていますが、6.0.0 でこのインライン Babel オプションは削除されたと注記されています。<Ref n={7} /> 設定は変わりやすいので、導入時は必ず最新の導入ページを確認してください。
          </p>
          <p>
            有効になったかは、React DevTools でコンポーネント名の横に「Memo ✨」のバッジが付くことで確認できます。<Ref n={7} /> コンパイラが変換した直後のコードに <code>react/compiler-runtime</code> からの import とキャッシュ用のコードが現れるのも目印です。
          </p>
          <Callout kind="unverified">
            <p>
              上の設定は公式の導入ページ（2026-11-08 参照）に基づく記述です。本書の制作環境では、React DevTools による「Memo ✨」バッジの表示までは確認していません。Vite 8.3 と <code>@vitejs/plugin-react</code> 6.2.1 の組み合わせで上の設定を使うと、ビルド結果にコンパイラが挿入するキャッシュ用のコードが入ることは確認しました。
            </p>
          </Callout>
          <h3>リンターとルール</h3>
          <p>
            コンパイラは React のルールを守ったコードを前提にします。ルールを破っているコンポーネントは安全のために最適化を飛ばし、残りを最適化します。<Ref n={7} /> どこが飛ばされたかを知るために、<code>eslint-plugin-react-hooks</code> の最新版を入れます。コンパイラの解析器を使ったルール（<code>set-state-in-render</code>、<code>set-state-in-effect</code>、<code>refs</code> など）が <code>recommended</code> プリセットに含まれており、コンパイラ本体を入れなくても使えます。<Ref n={6} />
          </p>
          <Code
            lang="js"
            title="eslint.config.js"
            code={`
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

export default defineConfig([reactHooks.configs.flat.recommended])
`}
          />
          <h3>既存の useMemo はどうするか</h3>
          <p>
            公式の指針は次のとおりです。<Ref n={5} /> 新しいコードでは、メモ化はコンパイラに任せ、精密な制御が必要なところだけ <code>useMemo</code>／<code>useCallback</code> を使います。既存のメモ化は「そのまま残すか（消すとコンパイル結果が変わりうる）、慎重にテストしてから消す」のが推奨です。<code>memo</code> も同様で、コンパイラが同等の処理を自動で行うため、新しく書く必要はなくなります。<Ref n={2} /> 本書の Tsumugi では、コンパイラを有効にしたうえで、Effect の依存に使う値など限られた場面でだけ手動メモ化を使います。
          </p>
        </>
      ),
    },
    {
      id: 'transitions',
      title: 'useTransition：重い更新を中断可能にする',
      body: (
        <>
          <p>
            ここからは、メモ化とは別の方向の道具です。メモ化は「無駄なレンダーを減らす」技術でした。<Term en="Transition">トランジション</Term> は「必要なレンダーを、ユーザーの操作を邪魔しない形で行う」技術です。
          </p>
          <p>
            検索欄に1文字打つたびに、数千件の一覧を絞り込んで描き直す場面を考えます。描き直しに 100ms かかると、その間は次のキー入力に反応できず、入力がカクつきます。<code>useTransition</code> で一覧の更新を Transition として印を付けると、React はその更新を「非ブロッキング」として扱い、裏で進めます。<Ref n={8} /> 途中で新しい入力が来れば、古いレンダーは捨てて新しい方を優先します。
          </p>
          <Figure n="14-3" title="通常の更新と Transition の違い" caption="上段では重いレンダーが終わるまで次の入力を処理できない。下段では入力への反応が優先され、重いレンダーは中断可能な形で裏で進む。次の入力が来ると進行中のレンダーは捨てられ、最新の値でやり直す。isPending はその間 true になる。模式図。">
            <TransitionFigure />
          </Figure>
          <Code
            lang="tsx"
            code={`
import { useState, useTransition } from 'react'

function SearchPages({ pages }: { pages: Page[] }) {
  const [query, setQuery] = useState('')       // 入力欄の値（緊急）
  const [filterQuery, setFilterQuery] = useState('') // 絞り込みに使う値（非緊急）
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value) // 入力欄はすぐ反映する
    startTransition(() => {
      setFilterQuery(e.target.value) // 一覧の更新は裏で進める
    })
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        <ResultList pages={pages} query={filterQuery} />
      </div>
    </>
  )
}
`}
          />
          <p>
            <code>useTransition</code> は引数を取らず、<code>isPending</code> と <code>startTransition</code> の2つを返します。<Ref n={8} /> <code>startTransition</code> に渡した関数はすぐに実行され、その中で起きた state 更新が Transition として扱われます。<code>isPending</code> は保留中の Transition がある間 true になるので、結果を薄く表示するなどの手がかりに使えます。
          </p>
          <p>
            上の例で state を2つに分けている理由は、公式ドキュメントの注意事項にあります。「Transition の更新はテキスト入力の制御には使えない」。<Ref n={8} /> 入力欄の値は change イベントに同期して反映されるべきなので、入力用の state は通常の更新にし、一覧用の state だけを Transition にします。同じことを1つの state で実現したいときは、props や値の側で遅延させる <code>useDeferredValue</code> を使います。
          </p>
          <h3>Action：非同期処理を Transition にする</h3>
          <p>
            React 19 からは、<code>startTransition</code> に async 関数を渡せます。この関数は <Term en="Action">Action</Term> と呼ばれ、その中の await を含む処理全体が Transition になります。<code>isPending</code> は最初の呼び出しで true になり、すべての Action が終わって最終 state が表示されるまで true のままです。<Ref n={8} /> ただし現時点では、<code>await</code> の後で state を更新するときは、もう一度 <code>startTransition</code> で包む必要があります。
          </p>
          <Code
            lang="tsx"
            code={`
startTransition(async () => {
  const saved = await savePage(page) // Rust 側のコマンドを呼ぶなど
  startTransition(() => {
    setStatus(saved ? 'saved' : 'error') // await の後は再度包む
  })
})
`}
          />
          <p>
            フォーム送信のような典型例には、Action を前提に設計された <code>useActionState</code> と <code>&lt;form action&gt;</code> があり、公式ドキュメントはそちらを勧めています。<Ref n={8} /> 本書ではこれ以上立ち入りませんが、「非同期処理の保留状態を React が追跡してくれる仕組み」として覚えておいてください。
          </p>
        </>
      ),
    },
    {
      id: 'suspense-lazy',
      title: 'Suspense と lazy：読み込み中を宣言的に書く',
      body: (
        <>
          <p>
            <code>&lt;Suspense&gt;</code> は、子が読み込み中の間、代わりに <code>fallback</code> を表示するコンポーネントです。<Ref n={9} />
          </p>
          <Code
            lang="tsx"
            code={`
<Suspense fallback={<p>読み込み中...</p>}>
  <Editor pageId={pageId} />
</Suspense>
`}
          />
          <p>
            何が「読み込み中」と見なされるかは決まっています。公式ドキュメントが挙げるのは、<code>lazy</code> で遅延読み込みされるコンポーネント、<code>use</code> で読む Promise（Suspense 対応のフレームワークやキャッシュ済みの Promise）、<code>precedence</code> 付きのスタイルシートなどです。<Ref n={9} /> 逆に、<ChapterLink n={12} /> で学んだ「Effect の中で fetch する」データ取得は Suspense に検知されません。公式ドキュメントは「Effect やイベントハンドラの中で行われるデータ取得を Suspense は検知しない」と明記しています。<Ref n={9} /> Suspense を使うには、Suspense 対応のデータ取得（第15章で見る React Router の loader など）に乗る必要があります。
          </p>
          <h3>lazy でコードを分割する</h3>
          <p>
            SPA でもっとも手軽に Suspense の恩恵を受けられるのが <code>lazy</code> です。<code>lazy(load)</code> は、コンポーネントのコードの読み込みを「最初にレンダーされるとき」まで遅らせます。<Ref n={10} /> <ChapterLink n={3} /> で学んだ動的 <code>import()</code> と組み合わせ、Vite がその部分を別ファイル（チャンク）に分割します。
          </p>
          <Code
            lang="tsx"
            title="App.tsx"
            code={`
import { lazy, Suspense } from 'react'

// ✅ コンポーネントの外（モジュールのトップレベル）で宣言する
const DatabaseView = lazy(() => import('./features/database/DatabaseView'))

export function PageBody({ kind }: { kind: 'doc' | 'database' }) {
  if (kind !== 'database') return <DocBody />
  return (
    <Suspense fallback={<p>表を準備しています...</p>}>
      <DatabaseView />
    </Suspense>
  )
}
`}
          />
          <p>
            注意点は2つです。<Ref n={10} /> <code>lazy</code> に渡す <code>import()</code> は default export を持つモジュールでなければなりません。また、<code>lazy</code> をコンポーネントの中で呼んではいけません。レンダーのたびに別のコンポーネントとして扱われ、state がすべてリセットされます。読み込まれた結果はキャッシュされるので、<code>load</code> が2回呼ばれることはありません。
          </p>
          <h3>境界の置き方</h3>
          <p>
            Suspense の境界の中は、既定で「1つの単位」として扱われます。中に複数の読み込み中コンポーネントがあれば、全部そろってから一度に表示されます。<Ref n={9} /> 先に出せるものを先に出したいときは、境界を入れ子にします。
          </p>
          <Figure n="14-4" title="Suspense 境界の置き方で変わる表示の順序" caption="左は境界が1つなので、Editor のコードが届くまで見出しも含めて全体が fallback になる。右は Editor の周りに内側の境界を置いたので、見出しは先に表示され、Editor の部分だけが fallback になる。境界の位置が読み込みの順序を決める。模式図。">
            <SuspenseFigure />
          </Figure>
          <p>
            図の右側のように、「ここは先に見せたい、ここは待ってよい」という単位で境界を切ります。公式ドキュメントは、すべてのコンポーネントを境界で包むのではなく、ユーザーに見せたい読み込みの順序に合わせて置くよう勧めています。<Ref n={9} />
          </p>
          <h3>表示済みの内容を隠さない：Transition との組み合わせ</h3>
          <p>
            すでに表示されている画面の中で、state 更新によって何かが再び読み込み中になると、その境界は fallback に戻ります。ページ遷移で画面全体がスピナーに置き換わる、という体験はこれが原因です。前節の <code>startTransition</code> で state 更新を包むと、React は「表示済みの内容を隠すくらいなら前の画面を出したまま待つ」ようになります。<Ref n={9} /> ただし Transition が待つのは表示済みの内容を守るためだけで、新しく現れる入れ子の境界はすぐ fallback を出します。<Ref n={8} /> 公式ドキュメントの表現では「React が不要な fallback を防ぐのは非緊急の更新のときだけ」で、<code>startTransition</code> か <code>useDeferredValue</code> で明示的に非緊急にする必要があります。<Ref n={9} />
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
              Tsumugi は React Compiler を有効にして作ります（<ChapterLink n={41} />）。そのため、サイドバーのページツリー（<ChapterLink n={43} />）のように、ページを1つ編集するたびに親が再レンダーされる構造でも、<code>memo</code> を手で書かずに済みます。手動の <code>useMemo</code> が残るのは、<ChapterLink n={44} /> の自動保存で Effect の依存にする値を安定させる、といった限られた場面です。
            </p>
            <p>
              <ChapterLink n={46} /> の全文検索は、この章の <code>useTransition</code> の例そのものです。検索欄への入力は即座に反映し、Rust 側の FTS5 を呼んで結果一覧を更新する処理は Transition にして、<code>isPending</code> の間は前の結果を薄く表示します。
            </p>
            <p>
              <ChapterLink n={47} /> の簡易データベースの表ビューは、ふつうのページでは使わない大きめのコンポーネントなので、<code>lazy</code> で分割して Suspense で包みます。起動時に読み込む JavaScript が減り、Tauri アプリの起動が軽くなります。
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
            <li>state 更新は、そのコンポーネントと子孫を再帰的に再レンダーする。DOM が書き換わるのは差分があった部分だけ。</li>
            <li><code>memo</code> は props を <code>Object.is</code> で比べ、同じなら再レンダーを飛ばす。レンダーのたびに作られるオブジェクトや関数が1つでもあると効かない。</li>
            <li><code>useMemo</code> は値を、<code>useCallback</code> は関数をキャッシュする。計測して重いと分かった計算と、<code>memo</code> の子や Effect の依存に渡す値に使う。</li>
            <li>React Compiler 1.0（2025-10-07）はメモ化をビルド時に自動化する。Vite では <code>babel-plugin-react-compiler</code> を入れ、<code>eslint-plugin-react-hooks</code> で規則違反を検出する。</li>
            <li><code>useTransition</code> は更新を非ブロッキングにし、<code>isPending</code> で保留中を示す。テキスト入力の制御には使わない。</li>
            <li><code>Suspense</code> は読み込み中の表示を宣言的に書く。<code>lazy</code> によるコード分割が手軽な入口で、境界の位置が表示の順序を決める。</li>
          </ul>
          <p>次章では、画面の切り替えを URL で表現するルーティングと、React Router を使ったアプリの構成を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Render and Commit',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/render-and-commit',
      accessed: '2026-11-08',
      version: 'React 19',
      note: '再レンダーが子孫へ再帰的に伝わること、DOM は差分があった部分だけ更新されることの根拠。',
    },
    {
      title: 'memo',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/memo',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'memo の動作、Object.is による浅い比較、効かない場面（state・Context・常に新しい props）、arePropsEqual の注意、React Compiler との関係の根拠。',
    },
    {
      title: 'useMemo',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/useMemo',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'useMemo の動作、console.time による計測の目安、依存配列にオブジェクトを入れない指針、キャッシュが保証でないことの根拠。',
    },
    {
      title: 'useCallback',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/useCallback',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'useCallback と useMemo の関係、価値を持つ場面（memo の子に渡す、他のフックの依存にする）とカスタムフックでの推奨、更新関数で依存を減らす方法の根拠。',
    },
    {
      title: 'React Compiler: Introduction',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/react-compiler/introduction',
      accessed: '2026-11-08',
      version: 'React Compiler 1.0',
      note: 'コンパイラが自動化する内容（連鎖的な再レンダーの抑止、重い計算のスキップ）、制限、既存の useMemo の扱いの指針の根拠。',
    },
    {
      title: 'React Compiler v1.0',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/blog/2025/10/07/react-compiler-1',
      accessed: '2026-11-08',
      version: 'React Compiler 1.0.0（2025-10-07）',
      note: '安定版の公開日、厳密なバージョン固定の推奨、eslint-plugin-react-hooks のリントルールと flat config の根拠。',
    },
    {
      title: 'React Compiler: Installation',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/react-compiler/installation',
      accessed: '2026-11-08',
      version: 'React Compiler 1.0',
      note: 'npm でのインストール、Vite（@vitejs/plugin-react 6.0.0 以降と @rolldown/plugin-babel）の設定、React DevTools での確認方法、ルール違反時にコンポーネントを飛ばす動作の根拠。',
    },
    {
      title: 'useTransition',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/useTransition',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'useTransition の戻り値、非ブロッキングな更新、Action と await 後の再包み、テキスト入力に使えない注意、表示済み内容を隠さない動作の根拠。',
    },
    {
      title: 'Suspense',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/Suspense',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'fallback の仕組み、Suspense を起動するデータソース、Effect 内の fetch は検知されないこと、入れ子の境界、startTransition との組み合わせの根拠。',
    },
    {
      title: 'lazy',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/reference/react/lazy',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'lazy の使い方、default export の要件、コンポーネント内で宣言してはいけない理由、結果がキャッシュされることの根拠。',
    },
  ],
}

export default chapter
