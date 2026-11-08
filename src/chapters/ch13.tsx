import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 13-1 state と ref の違い ---------- */
function StateVsRefFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="コンポーネントの内側に state と ref の2つの箱がある。state を更新すると再レンダーが起きて画面に反映されるが、ref.current を書き換えても再レンダーは起きず、React はその変更を追跡しない">
      <defs>
        <marker id="arrow13a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="20" width="400" height="260" rx="10" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="220" y="45" fontSize="14" fontWeight="600" textAnchor="middle">関数コンポーネント</text>
      {/* state */}
      <rect x="40" y="70" width="170" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="125" y="95" fontSize="13" fontWeight="600" textAnchor="middle">state</text>
      <text x="125" y="118" fontSize="12" textAnchor="middle">[count, setCount]</text>
      <text x="125" y="140" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">React が追跡する</text>
      {/* ref */}
      <rect x="230" y="70" width="170" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="315" y="95" fontSize="13" fontWeight="600" textAnchor="middle">ref</text>
      <text x="315" y="118" fontSize="12" textAnchor="middle">{'{ current: ... }'}</text>
      <text x="315" y="140" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">React は追跡しない</text>
      {/* actions */}
      <text x="125" y="190" fontSize="12" textAnchor="middle">setCount(1)</text>
      <path d="M125,198 L125,235" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow13a)" />
      <rect x="55" y="240" width="140" height="28" rx="6" fill="var(--fig-bg)" stroke="var(--fig-accent)" />
      <text x="125" y="259" fontSize="12" textAnchor="middle">再レンダーが起きる</text>
      <text x="315" y="190" fontSize="12" textAnchor="middle">ref.current = 1</text>
      <path d="M315,198 L315,235" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow13a)" />
      <rect x="245" y="240" width="140" height="28" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="315" y="259" fontSize="12" textAnchor="middle">何も起きない</text>
      {/* screen */}
      <rect x="450" y="70" width="170" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="535" y="100" fontSize="13" fontWeight="600" textAnchor="middle">画面</text>
      <text x="535" y="125" fontSize="12" textAnchor="middle">描画結果に反映</text>
      <path d="M195,254 C300,290 420,200 448,120" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow13a)" />
      <text x="320" y="292" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：再レンダーを伴う経路　破線：再レンダーを伴わない経路（模式図）</text>
    </svg>
  )
}

/* ---------- 図 13-2 ref がセットされるタイミング ---------- */
function RefTimingFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="レンダーとコミットの時間軸。レンダー中は ref.current が null または古い値で、コミットで DOM が更新された直後に ref.current に DOM ノードが入る。その後のイベントハンドラや Effect からは安全に読める">
      <defs>
        <marker id="arrow13b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <path d="M30,60 L610,60" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow13b)" />
      <text x="600" y="48" fontSize="12" fill="var(--fig-muted)" textAnchor="end">時間</text>
      {/* phases */}
      <rect x="40" y="80" width="170" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="125" y="105" fontSize="13" fontWeight="600" textAnchor="middle">レンダー</text>
      <text x="125" y="126" fontSize="12" textAnchor="middle">コンポーネント関数を呼ぶ</text>
      <rect x="230" y="80" width="170" height="60" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="315" y="105" fontSize="13" fontWeight="600" textAnchor="middle">コミット</text>
      <text x="315" y="126" fontSize="12" textAnchor="middle">DOM を書き換える</text>
      <rect x="420" y="80" width="190" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="515" y="105" fontSize="13" fontWeight="600" textAnchor="middle">コミット後</text>
      <text x="515" y="126" fontSize="12" textAnchor="middle">Effect・イベントハンドラ</text>
      {/* ref state */}
      <text x="40" y="180" fontSize="12" fill="var(--fig-muted)">ref.current の中身</text>
      <rect x="40" y="190" width="170" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-danger)" strokeDasharray="6 4" />
      <text x="125" y="215" fontSize="12" textAnchor="middle">null（初回）／古いノード</text>
      <rect x="230" y="190" width="170" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="315" y="208" fontSize="11" textAnchor="middle">DOM 更新前に null にし</text>
      <text x="315" y="223" fontSize="11" textAnchor="middle">更新後にノードを入れる</text>
      <rect x="420" y="190" width="190" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-accent)" strokeWidth="2" />
      <text x="515" y="215" fontSize="12" textAnchor="middle">新しい DOM ノード</text>
      <text x="125" y="260" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">ここで読まない</text>
      <text x="515" y="260" fontSize="12" fill="var(--fig-accent)" textAnchor="middle">ここで読む（focus など）</text>
      <text x="320" y="288" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：1回の更新における ref の設定タイミング</text>
    </svg>
  )
}

/* ---------- 図 13-3 カスタムフックは state を共有しない ---------- */
function CustomHookFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="useOnlineStatus という1つのカスタムフックの定義を、StatusBar と SaveButton の2つのコンポーネントがそれぞれ呼んでいる。呼び出しごとに独立した state と Effect が作られ、どちらも同じブラウザのイベントを購読している">
      <defs>
        <marker id="arrow13c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="220" y="20" width="200" height="54" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
      <text x="320" y="42" fontSize="13" fontWeight="600" textAnchor="middle">function useOnlineStatus()</text>
      <text x="320" y="62" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">定義は1つ（ロジックの共有）</text>
      <path d="M270,74 L150,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow13c)" />
      <path d="M370,74 L490,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow13c)" />
      {/* left */}
      <rect x="30" y="115" width="250" height="110" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="155" y="138" fontSize="13" fontWeight="600" textAnchor="middle">StatusBar</text>
      <rect x="45" y="150" width="105" height="60" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="97" y="175" fontSize="12" textAnchor="middle">state A</text>
      <text x="97" y="195" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">isOnline</text>
      <rect x="160" y="150" width="105" height="60" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
      <text x="212" y="175" fontSize="12" textAnchor="middle">Effect A</text>
      <text x="212" y="195" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">購読・解除</text>
      {/* right */}
      <rect x="360" y="115" width="250" height="110" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="485" y="138" fontSize="13" fontWeight="600" textAnchor="middle">SaveButton</text>
      <rect x="375" y="150" width="105" height="60" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="427" y="175" fontSize="12" textAnchor="middle">state B</text>
      <text x="427" y="195" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">isOnline</text>
      <rect x="490" y="150" width="105" height="60" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
      <text x="542" y="175" fontSize="12" textAnchor="middle">Effect B</text>
      <text x="542" y="195" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">購読・解除</text>
      <text x="320" y="250" fontSize="12" textAnchor="middle">state A と state B は別物。同じ値になるのは、どちらも同じブラウザのイベントを見ているから</text>
      <text x="320" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線枠：state　破線枠：Effect（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 13,
  part: 3,
  title: 'ref とカスタムフック',
  summary:
    'state では扱いにくい「再レンダーを起こしたくない値」と「DOM ノードそのもの」を useRef で扱う方法を学びます。React 19 で ref が通常の props になった点を押さえ、後半では state とロジックを再利用するカスタムフックの作り方と設計指針をまとめます。',
  goals: [
    'useRef が返すオブジェクトの形と、state との違いを説明できる',
    'DOM ノードへの参照を取り、フォーカス移動やスクロールを実装できる',
    'ref が設定されるタイミング（コミット時）を理解し、レンダー中に ref.current を読まない理由を言える',
    'React 19 の「ref は通常の props」という変更を使い、子コンポーネントの DOM を親から操作できる',
    'use で始まるカスタムフックを書き、「ロジックは共有するが state は共有しない」ことを説明できる',
    'カスタムフックに切り出すべき場面と、避けるべき設計を判断できる',
  ],
  prerequisites: [9, 12],
  sections: [
    {
      id: 'why-refs',
      title: 'state では足りない場面',
      body: (
        <>
          <p>
            <ChapterLink n={9} /> で学んだとおり、React のコンポーネントは state が変わるたびに再レンダーされ、画面がその state に合わせて描き直されます。この仕組みは「画面に出る情報」にはぴったりです。しかし、画面には出ないが覚えておきたい値もあります。たとえば <code>setInterval</code> が返すタイマーの ID、直前に処理したイベントの時刻、外部ライブラリが作ったオブジェクトなどです。
          </p>
          <p>
            これらを state に入れると、更新のたびに不要な再レンダーが起きます。かといって、ただのローカル変数に入れると、再レンダーのたびにコンポーネント関数が最初から実行されるので、値が消えてしまいます（<ChapterLink n={9} /> の「state はスナップショット」を思い出してください）。
          </p>
          <p>
            もう1つ、React には不得意な仕事があります。入力欄にフォーカスを当てる、特定の要素までスクロールする、要素の大きさを測る、といった操作です。これらは「画面がどう見えるか」ではなく「ブラウザに何をさせるか」であり、JSX では表現できません。公式ドキュメントは「React にはこれらを行う組み込みの手段がないので、DOM ノードへの ref が必要になる」と説明しています。<Ref n={2} />
          </p>
          <p>
            この2つの問題、つまり「再レンダーを起こさずに値を覚える」と「DOM ノードを直接触る」の両方に答えるのが、この章の前半で学ぶ <Term en="ref">ref</Term> です。後半では、state と Effect を組み合わせたロジックを複数のコンポーネントで使い回すための <Term en="custom Hook">カスタムフック</Term> を学びます。
          </p>
        </>
      ),
    },
    {
      id: 'useref',
      title: 'useRef：再レンダーを起こさない「ポケット」',
      body: (
        <>
          <p>
            <code>useRef</code> は初期値を1つ受け取り、<code>current</code> というプロパティを1つだけ持つオブジェクトを返します。<Ref n={1} />
          </p>
          <Code
            lang="tsx"
            code={`
import { useRef } from 'react'

const ref = useRef(0)
// ref は { current: 0 } という形のオブジェクト
ref.current = ref.current + 1 // 読み書きは current を通して行う
`}
          />
          <p>
            公式ドキュメントはこのオブジェクトを「React が追跡しない、コンポーネントの秘密のポケット」と表現しています。<Ref n={1} /> state との違いを表にまとめます。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>ref</th>
                  <th>state</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>作り方</td>
                  <td><code>useRef(初期値)</code> が <code>{'{ current: 初期値 }'}</code> を返す</td>
                  <td><code>useState(初期値)</code> が <code>[値, setter]</code> を返す</td>
                </tr>
                <tr>
                  <td>変更したとき</td>
                  <td>再レンダーは起きない</td>
                  <td>再レンダーが起きる</td>
                </tr>
                <tr>
                  <td>書き換え</td>
                  <td>可変。<code>current</code> をいつでも直接書き換えてよい</td>
                  <td>不変。setter を通して次のレンダーを予約する</td>
                </tr>
                <tr>
                  <td>レンダー中に読むこと</td>
                  <td>避ける（値が変わっても React が気づかない）</td>
                  <td>いつでも読める（レンダーごとのスナップショット）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            再レンダーの間も、React は同じ ref オブジェクトを返し続けます。つまり ref は「state と同じく再レンダーをまたいで生き残るが、state と違って変更しても再レンダーを起こさない」値です。この関係を図にします。
          </p>
          <Figure n="13-1" title="state と ref の違い" caption="左の state は setter を呼ぶと再レンダーが起きて画面に反映される。右の ref は current を直接書き換えられるが、React はその変更を知らないので画面は変わらない。模式図。">
            <StateVsRefFigure />
          </Figure>
          <p>
            図の右側の経路が「何も起きない」ことは、欠点ではなく目的です。画面に関係ない値の変更で、画面を描き直す必要はありません。公式ドキュメントの判断基準はこうです。「描画に使う情報は state に置く。イベントハンドラだけが必要とし、変更しても再描画がいらない情報は ref の方が効率的」。<Ref n={1} />
          </p>
          <h3>タイマー ID を ref に置くストップウォッチ</h3>
          <p>
            公式ドキュメントのストップウォッチは、この使い分けの典型です。開始時刻と現在時刻は画面に出るので state に、タイマー ID は止めるときにだけ必要なので ref に置きます。<Ref n={1} />
          </p>
          <Code
            lang="tsx"
            title="Stopwatch.tsx"
            code={`
import { useRef, useState } from 'react'

export function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number | null>(null)
  // タイマー ID は描画に使わないので ref に置く
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())
    if (intervalRef.current !== null) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setNow(Date.now()), 10)
  }

  function handleStop() {
    if (intervalRef.current !== null) clearInterval(intervalRef.current)
  }

  const seconds = startTime !== null && now !== null ? (now - startTime) / 1000 : 0
  return (
    <>
      <h1>経過時間: {seconds.toFixed(3)}</h1>
      <button onClick={handleStart}>開始</button>
      <button onClick={handleStop}>停止</button>
    </>
  )
}
`}
          />
          <p>
            <code>intervalRef</code> を state にすると、開始のたびに意味のない再レンダーが1回増えます。ローカル変数にすると、再レンダー後の <code>handleStop</code> からは ID が見えなくなります。ref はこの中間にある、ちょうどよい置き場所です。
          </p>
          <h3>レンダー中に ref.current を読まない</h3>
          <p>
            公式ドキュメントが挙げる注意点は2つです。<Ref n={1} /> 1つ目は「ref は逃げ道（escape hatch）として扱う」こと。アプリのデータの流れの多くが ref に頼っているなら、設計を見直す合図です。2つ目は「レンダー中に <code>ref.current</code> を読み書きしない」こと。React は ref の変更を知らないので、JSX の中で <code>ref.current</code> を表示しても、値が変わったときに画面が更新されません。描画に必要な値は state に置きます。唯一の例外は <code>if (!ref.current) ref.current = new Thing()</code> のように、初回だけ値を入れる遅延初期化です。
          </p>
        </>
      ),
    },
    {
      id: 'dom-refs',
      title: 'DOM ノードを参照する',
      body: (
        <>
          <p>
            ref のもっとも一般的な用途は DOM ノードの保持です。JSX の要素に <code>ref</code> 属性で ref オブジェクトを渡すと、React がその要素の DOM ノードを作ったときに <code>current</code> へ入れてくれます。<Ref n={2} /> 入力欄にフォーカスを当てる例を見ます。
          </p>
          <Code
            lang="tsx"
            title="FocusInput.tsx"
            code={`
import { useRef } from 'react'

export function FocusInput() {
  // 1. DOM ノード用の ref。初期値は null（まだノードがない）
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    // 3. イベントハンドラから DOM の API を呼ぶ
    inputRef.current?.focus()
  }

  return (
    <>
      {/* 2. ref 属性で要素に結び付ける */}
      <input ref={inputRef} />
      <button onClick={handleClick}>入力欄にフォーカス</button>
    </>
  )
}
`}
          />
          <p>
            TypeScript では、<code>useRef&lt;HTMLInputElement&gt;(null)</code> のように要素の型を型引数で与えます。<code>current</code> の型は <code>HTMLInputElement | null</code> になるので、<code>?.</code> で null を避けて呼びます（<ChapterLink n={5} /> の型の絞り込みです）。<code>focus()</code> のほかにも、<code>scrollIntoView()</code> で要素まで滑らかにスクロールする、<code>getBoundingClientRect()</code> で大きさを測る、といった DOM の API がそのまま使えます。<Ref n={2} />
          </p>
          <h3>ref がセットされるのはコミットのとき</h3>
          <p>
            <ChapterLink n={9} /> で、React の更新は「レンダー」と「コミット」の2段階に分かれると学びました。ref に DOM ノードが入るのはコミットの段階です。公式ドキュメントは「React は DOM を更新する前に該当する <code>ref.current</code> を null にし、DOM を更新した直後に対応する DOM ノードをセットする」と説明しています。<Ref n={2} /> この順番を図で確認します。
          </p>
          <Figure n="13-2" title="1回の更新の中で ref.current が決まるタイミング" caption="レンダー中（左）は ref.current が null か古いノードなので読んではいけない。コミット（中央）で DOM が書き換わり、その直後に新しいノードが入る。イベントハンドラや Effect（右）からは安全に読める。模式図。">
            <RefTimingFigure />
          </Figure>
          <p>
            図から分かるとおり、初回レンダーの最中は DOM ノードがまだ存在せず、更新時のレンダー中は DOM がまだ古いままです。だから「ふつうは、ref にはイベントハンドラからアクセスする」のが基本で、<Ref n={2} /> それ以外のタイミングで必要なら <ChapterLink n={12} /> で学んだ Effect（コミット後に走る）を使います。
          </p>
          <h3>state 更新の直後に DOM を触りたいとき：flushSync</h3>
          <p>
            「項目を追加して、追加した項目までスクロールする」という処理には落とし穴があります。state の更新はキューに積まれるので、<code>setTodos</code> の直後に <code>listRef.current.lastChild</code> を読んでも、DOM にはまだ新しい項目がありません。<Ref n={2} /> この場合は <code>react-dom</code> の <code>flushSync</code> で state 更新を同期的に反映させます。
          </p>
          <Code
            lang="tsx"
            code={`
import { flushSync } from 'react-dom'

function handleAdd() {
  // flushSync の中の state 更新は、この関数を抜ける前に DOM へ反映される
  flushSync(() => {
    setTodos([...todos, newTodo])
  })
  // ここでは DOM に新しい項目がある
  listRef.current?.lastElementChild?.scrollIntoView()
}
`}
          />
          <h3>React が管理する DOM を書き換えない</h3>
          <p>
            フォーカスやスクロールのような「壊さない操作」は安全です。一方、<code>ref.current.remove()</code> のように React が描いた DOM ノードを自分で消したり書き換えたりすると、React が持っている「今の DOM はこうなっているはず」という前提が崩れ、次の state 更新でクラッシュすることがあります。<Ref n={2} /> 公式ドキュメントの原則は「React が管理する DOM ノードを変更しない。変更するなら、React が更新する理由のない部分だけにする」です。たとえば JSX では常に空の <code>&lt;div&gt;</code> を用意し、その中身だけを外部ライブラリに任せる、という使い方は安全です。
          </p>
        </>
      ),
    },
    {
      id: 'ref-callback',
      title: 'ref コールバックとリスト',
      body: (
        <>
          <p>
            リストの各項目の DOM が必要なとき、<code>map</code> の中で <code>useRef</code> を呼ぶことはできません。フックはコンポーネントのトップレベルでしか呼べないからです。<Ref n={2} /> この場合は <code>ref</code> 属性に関数を渡します。これを <Term en="ref callback">ref コールバック</Term> と呼び、React はノードを結び付けるときにその関数を DOM ノード付きで呼びます。関数がクリーンアップ関数を返すと、ノードが外れるときにそれが呼ばれます。<Ref n={2} />
          </p>
          <Code
            lang="tsx"
            title="CatList.tsx（ref コールバックで Map に集める）"
            code={`
import { useRef } from 'react'

export function CatList({ cats }: { cats: { id: string; name: string }[] }) {
  const itemsRef = useRef<Map<string, HTMLLIElement>>(new Map())

  function scrollTo(id: string) {
    itemsRef.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <ul>
      {cats.map((cat) => (
        <li
          key={cat.id}
          ref={(node) => {
            // ノードが結び付いたときに呼ばれる
            if (node) itemsRef.current.set(cat.id, node)
            // 外れるときに呼ばれるクリーンアップ
            return () => {
              itemsRef.current.delete(cat.id)
            }
          }}
        >
          <button onClick={() => scrollTo(cat.id)}>{cat.name}</button>
        </li>
      ))}
    </ul>
  )
}
`}
          />
          <p>
            クリーンアップ関数を返せるのは React 19 からの機能です。<Ref n={4} /> それ以前は、ノードが外れるときに ref コールバックが <code>null</code> 付きで呼ばれ、その <code>null</code> を自分で処理していました。React 19 では、クリーンアップ関数を返す場合は <code>null</code> 付きの呼び出しが省略されます。この変更に伴い、ref コールバックから他の値を返すと TypeScript の型エラーになります。アロー関数の暗黙の戻り値 <code>ref={'{'}(el) =&gt; (instance = el){'}'}</code> は <code>ref={'{'}(el) =&gt; {'{'} instance = el {'}'}{'}'}</code> のように波かっこで囲む必要があります。<Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              <ChapterLink n={12} /> の Effect と同じく、開発時の StrictMode では ref コールバックも2回実行されます。<Ref n={2} /> set と delete が対になっていれば、2回呼ばれても結果は同じです。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'ref-prop',
      title: 'ref を props として渡す（React 19）',
      body: (
        <>
          <p>
            自分で作ったコンポーネント <code>&lt;MyInput ref={'{'}inputRef{'}'} /&gt;</code> に ref を渡しても、既定では何も起きません。コンポーネントは自分の DOM ノードを外に公開しないからです。<Ref n={2} /> 公開したい場合、React 19 からは <code>ref</code> を通常の props として受け取り、内側の組み込み要素に渡すだけで済みます。<Ref n={4} />
          </p>
          <Code
            lang="tsx"
            title="MyInput.tsx（React 19 以降）"
            code={`
import { useRef, type Ref } from 'react'

type MyInputProps = {
  placeholder?: string
  ref?: Ref<HTMLInputElement>
}

// ref はただの props。forwardRef は不要
function MyInput({ placeholder, ref }: MyInputProps) {
  return <input placeholder={placeholder} ref={ref} />
}

export function MyForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <MyInput ref={inputRef} placeholder="タイトル" />
      <button onClick={() => inputRef.current?.focus()}>フォーカス</button>
    </>
  )
}
`}
          />
          <p>
            React 18 までは、関数コンポーネントは <code>ref</code> を props として受け取れず、<code>forwardRef</code> という関数でコンポーネントを包む必要がありました。React 19 のリリースノートは「新しい関数コンポーネントでは <code>forwardRef</code> はもう不要になり、将来のバージョンで非推奨化と削除を行う」と述べています。<Ref n={4} /> 既存のコードを変換する codemod も提供されています。本書は React 19.3 を基準にするので、以後 <code>forwardRef</code> は使いません。古い記事やライブラリのコードで <code>forwardRef</code> を見かけたら、「<code>ref</code> を props で受け取るための旧来の書き方」と読み替えてください。
          </p>
          <h3>公開する操作を絞る：useImperativeHandle</h3>
          <p>
            DOM ノードをそのまま渡すと、親は何でもできてしまいます。「フォーカスだけ許したい」のように公開する操作を絞るには <code>useImperativeHandle</code> を使い、ref の値として独自のオブジェクトを提供します。<Ref n={2} />
          </p>
          <Code
            lang="tsx"
            code={`
import { useImperativeHandle, useRef, type Ref } from 'react'

export type MyInputHandle = { focus: () => void }

function MyInput({ ref }: { ref?: Ref<MyInputHandle> }) {
  const realInputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    // 親から見える操作は focus だけ
    focus() {
      realInputRef.current?.focus()
    },
  }))
  return <input ref={realInputRef} />
}
`}
          />
          <p>
            公式ドキュメントは、他のコンポーネントの DOM を手で操作するとコードが壊れやすくなると注意しています。<Ref n={2} /> ref を公開するのは、フォーカス管理やスクロールのように、宣言的な props では表現できない操作に限るのが無難です。
          </p>
        </>
      ),
    },
    {
      id: 'custom-hooks',
      title: 'カスタムフック：ロジックを再利用する',
      body: (
        <>
          <p>
            ここからは章の後半です。<ChapterLink n={12} /> で書いたような「state を持ち、Effect でブラウザのイベントを購読する」ロジックは、複数のコンポーネントで必要になりがちです。たとえば、ネットワークの接続状態を見て「オフライン」と表示するバーと、オフライン時に無効化する保存ボタンは、どちらも同じ購読処理を持ちます。この重複を取り除くのが <Term en="custom Hook">カスタムフック</Term> です。中身はふつうの関数で、内部で他のフックを呼びます。<Ref n={3} />
          </p>
          <Code
            lang="tsx"
            title="useOnlineStatus.ts"
            code={`
import { useEffect, useState } from 'react'

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
`}
          />
          <Code
            lang="tsx"
            title="使う側"
            code={`
function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? 'オンライン' : '接続が切れています'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()
  return <button disabled={!isOnline}>{isOnline ? '保存' : '再接続中...'}</button>
}
`}
          />
          <p>
            使う側のコードが「何をしたいか（オンライン状態を使う）」だけを書き、「どうやるか（イベントを購読する）」がフックの中に隠れた点に注目してください。公式ドキュメントはこれをカスタムフックの主な利点に挙げています。<Ref n={3} />
          </p>
          <h3>命名規則：use で始める</h3>
          <p>
            コンポーネント名は大文字で始め、フック名は <code>use</code> の後に大文字を続けます。<code>useState</code>、<code>useOnlineStatus</code> がその例です。<Ref n={3} /> この規則があるおかげで、コンポーネントを読むだけで「どこに state や Effect が隠れているか」が分かります。<code>getColor()</code> という呼び出しの中にフックはあり得ませんが、<code>useOnlineStatus()</code> にはたぶんあります。
          </p>
          <p>
            逆に、フックを1つも呼ばない関数に <code>use</code> を付けてはいけません。公式ドキュメントの言い方では「フックを呼ばない関数は、フックである必要がない」です。<Ref n={3} /> たとえば配列を並べ替えるだけの関数は <code>getSorted(items)</code> と名付けます。そうすれば条件分岐の中でも呼べます。<code>use</code> が付いた瞬間、その関数はフックの規則（トップレベルでのみ呼ぶ）に縛られます。React 向けに設定したリンターはこの規則を機械的に検査します。
          </p>
          <h3>共有されるのはロジックであって state ではない</h3>
          <p>
            カスタムフックでもっとも誤解されやすい点です。公式ドキュメントは「カスタムフックは state を持つロジック（stateful logic）を共有するが、state そのものは共有しない。同じフックへの呼び出しは、それぞれ完全に独立している」と強調しています。<Ref n={3} /> 上の例で <code>StatusBar</code> と <code>SaveButton</code> が同じ <code>isOnline</code> を表示するのは、state を共有しているからではなく、両方が同じブラウザのイベントを見ているからです。
          </p>
          <Figure n="13-3" title="1つのカスタムフックを2つのコンポーネントが呼んだときの state" caption="定義（上）は1つだが、呼び出しごとに独立した state と Effect ができる。state A と state B は別の値で、同じブラウザイベントを購読しているから同じ値になるにすぎない。模式図。">
            <CustomHookFigure />
          </Figure>
          <p>
            したがって、同じ値を本当に共有したいなら、カスタムフックではなく <ChapterLink n={10} /> の state の持ち上げや <ChapterLink n={11} /> の Context を使います。カスタムフックは「同じ手順を別々のコンポーネントで繰り返す」ための道具です。
          </p>
          <h3>引数と戻り値は毎レンダー最新になる</h3>
          <p>
            カスタムフックの中身は、呼び出し元のコンポーネントがレンダーされるたびに再実行されます。そのため、props や state を引数として渡せば、常に最新の値を受け取ります。<Ref n={3} /> 公式ドキュメントの <code>useChatRoom({'{ serverUrl, roomId }'})</code> は、引数が変わると Effect が再同期する例です。また、あるフックの戻り値を別のフックの引数に渡して「連鎖」させることもできます。
          </p>
          <p>
            一方、イベントハンドラをカスタムフックに渡すときは注意が要ります。ハンドラ関数をそのまま Effect の依存配列に入れると、親が再レンダーするたびに関数が作り直され、Effect が再実行されてしまいます。公式ドキュメントは、受け取ったハンドラを <code>useEffectEvent</code> で包み、依存配列から外す方法を示しています。<Ref n={3} /> <code>useEffectEvent</code> の詳しい扱いは <ChapterLink n={12} /> の範囲ですが、「カスタムフックが受け取るイベントハンドラは Effect Event で包む」という規則だけ覚えておくと、無駄な再接続を防げます。
          </p>
        </>
      ),
    },
    {
      id: 'hook-design',
      title: 'カスタムフックの設計指針',
      body: (
        <>
          <p>
            どんなときにカスタムフックへ切り出すべきでしょうか。公式ドキュメントの指針を整理します。<Ref n={3} />
          </p>
          <ul>
            <li>
              小さな重複を全部フックにする必要はありません。<code>useState</code> を1回呼ぶだけの処理を <code>useFormInput</code> に包むのは、たいてい過剰です。
            </li>
            <li>
              Effect を書いたら、カスタムフックに包んだ方が読みやすくならないか考えます。Effect は「React の外に出る」ための逃げ道なので、包んで意図を名前にすると、データの流れが明示的になります。
            </li>
            <li>
              名前は具体的で高水準にします。<code>useData(url)</code>、<code>useChatRoom(options)</code>、<code>useMediaQuery(query)</code> のように、「何を同期するか」が分かる名前です。
            </li>
            <li>
              <code>useMount(fn)</code> や <code>useEffectOnce(fn)</code> のような、ライフサイクルを包むだけのフックは作りません。これらは React の考え方に合わず、リンターが依存配列を検査できなくなります。
            </li>
          </ul>
          <p>
            「よいカスタムフックは、できることを制限することで、呼び出し側のコードをより宣言的にする」というのが公式の言葉です。<Ref n={3} /> フックは何でもできる万能関数ではなく、目的を1つに絞った小さな部品として設計します。
          </p>
          <h3>実装を差し替えても呼び出し側は変わらない</h3>
          <p>
            カスタムフックに包んでおく利点は、後から実装を改善できることです。先ほどの <code>useOnlineStatus</code> には弱点があります。初期値を <code>true</code> と決め打ちしているので、最初からオフラインだった場合に一瞬だけ誤った表示になります。React には外部の値を購読するための専用フック <code>useSyncExternalStore</code> があり、これを使うと初回から正しい値を読めます。<Ref n={3} />
          </p>
          <Code
            lang="tsx"
            title="useOnlineStatus.ts（useSyncExternalStore 版）"
            code={`
import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // クライアントでの値の読み方
    () => true, // サーバーでの値（SPA では使われない）
  )
}
`}
          />
          <p>
            この書き換えで、<code>StatusBar</code> と <code>SaveButton</code> には1行も手を入れていません。公式ドキュメントも「コンポーネントを一切変更せずにこの移行ができた」点を利点として挙げています。<Ref n={3} /> ロジックを1か所に閉じ込めておくと、改善のコストが下がります。
          </p>
          <Callout>
            <p>
              カスタムフックの中で <code>useRef</code> を使うこともよくあります。たとえば「最新の値を Effect の外から読みたい」ときに、state を ref に写しておく手法です。前半で学んだ「再レンダーを起こさない値」と、後半の「ロジックの再利用」は、組み合わせて使う道具です。
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
              Tsumugi では、ref がフォーカス管理の要になります。<ChapterLink n={43} /> のサイドバーで「新規ページ」を作った直後にタイトル入力欄へフォーカスを移す処理や、<ChapterLink n={46} /> の検索ダイアログを <code>Cmd+K</code> で開いたときに検索欄へフォーカスを当てる処理は、この章の <code>inputRef.current?.focus()</code> そのものです。検索結果の一覧で、キーボードで選んだ項目を <code>scrollIntoView</code> で見える位置に保つ処理も同じ仕組みです。
            </p>
            <p>
              <ChapterLink n={44} /> のエディタでは、自動保存の debounce（800ms）に使うタイマー ID を ref に置きます。タイマー ID は画面に出ないので、state にすると入力のたびに無駄な再レンダーが増えてしまいます。この章のストップウォッチと同じ判断です。
            </p>
            <p>
              カスタムフックは、<code>src/lib/ipc.ts</code> の <code>invoke</code> ラッパーを呼んでページ一覧を読み込む <code>usePages()</code> や、OS のダークモード設定を追従する <code>usePrefersDark()</code>（<ChapterLink n={50} />）として現れます。<code>usePrefersDark</code> は <code>matchMedia</code> の変化を購読するので、この章の <code>useOnlineStatus</code> とまったく同じ形になります。
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
            <li><code>useRef</code> は <code>{'{ current }'}</code> を1つ持つオブジェクトを返す。再レンダーをまたいで生き残るが、変更しても再レンダーは起きない。描画に使う値は state に、使わない値は ref に置く。</li>
            <li>JSX の <code>ref</code> 属性で DOM ノードを受け取れる。ノードが入るのはコミット後なので、イベントハンドラか Effect から読む。レンダー中には読まない。</li>
            <li>React が管理する DOM を壊す操作はしない。フォーカス・スクロール・計測のような壊さない操作に限る。</li>
            <li>React 19 では <code>ref</code> は通常の props になり、<code>forwardRef</code> は不要。ref コールバックはクリーンアップ関数を返せる。</li>
            <li>カスタムフックは <code>use</code> で始まる関数で、state を持つロジックを共有する。state そのものは呼び出しごとに独立する。</li>
            <li>Effect はカスタムフックに包んで名前を付けると意図が明確になる。<code>useMount</code> のようなライフサイクル包装は作らない。</li>
          </ul>
          <p>次章では、再レンダーがどう伝播するかを出発点に、memo・useMemo・useCallback と React Compiler、そして並行レンダリングの道具である useTransition と Suspense を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Referencing Values with Refs',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/referencing-values-with-refs',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'useRef の戻り値、state との比較表、ストップウォッチの例、「レンダー中に ref.current を読まない」の根拠。',
    },
    {
      title: 'Manipulating the DOM with Refs',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/manipulating-the-dom-with-refs',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'DOM ノードの参照、コミット時に ref がセットされる仕組み、ref コールバック、flushSync、useImperativeHandle、React が管理する DOM を変更しない原則の根拠。',
    },
    {
      title: 'Reusing Logic with Custom Hooks',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'useOnlineStatus の例、use の命名規則、「ロジックは共有するが state は共有しない」、useEffectEvent、設計指針、useSyncExternalStore への移行の根拠。',
    },
    {
      title: 'React v19（リリースノート）',
      publisher: 'React（react.dev）',
      url: 'https://react.dev/blog/2024/12/05/react-19',
      accessed: '2026-11-08',
      version: 'React 19.0（2024-12-05）',
      note: 'ref が props になり forwardRef が不要になった件、ref コールバックのクリーンアップ関数、TypeScript での暗黙の戻り値エラーの根拠。',
    },
  ],
}

export default chapter
