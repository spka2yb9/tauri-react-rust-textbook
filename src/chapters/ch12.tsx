import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 12-1 Effect のタイムライン ---------- */
function EffectTimelineFigure() {
  const rows: { y: number; label: string; sub: string; kind: 'mount' | 'update' | 'unmount' }[] = [
    { y: 80, label: 'マウント', sub: 'roomId = "general"', kind: 'mount' },
    { y: 170, label: '更新', sub: 'roomId = "travel"', kind: 'update' },
    { y: 260, label: '更新', sub: 'theme だけ変化', kind: 'update' },
    { y: 350, label: 'アンマウント', sub: '', kind: 'unmount' },
  ]
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="ChatRoom コンポーネントのマウント・更新・アンマウントの時系列と、依存配列 [roomId] の Effect の実行。マウントで接続、roomId が変わると前の接続を切ってから新しい接続、依存に無い theme の変化では何もせず、アンマウントで切断する">
      <defs>
        <marker id="arrow12a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* lifelines */}
      <text x="130" y="30" fontSize="14" fontWeight="600" textAnchor="middle">コンポーネント（コミット）</text>
      <text x="470" y="30" fontSize="14" fontWeight="600" textAnchor="middle">Effect [roomId]</text>
      <line x1="130" y1="45" x2="130" y2="395" stroke="var(--fig-line)" strokeDasharray="4 4" />
      <line x1="470" y1="45" x2="470" y2="395" stroke="var(--fig-line)" strokeDasharray="4 4" />
      {rows.map((r) => (
        <g key={r.y} fontSize="12">
          <rect x="30" y={r.y - 22} width="200" height="44" rx="6" fill={r.kind === 'mount' ? 'var(--fig-box4)' : r.kind === 'unmount' ? 'var(--fig-box5)' : 'var(--fig-box3)'} stroke="var(--fig-line)" />
          <text x="130" y={r.y - 4} textAnchor="middle" fontSize="13" fontWeight="600">{r.label}</text>
          {r.sub && <text x="130" y={r.y + 13} textAnchor="middle" fill="var(--fig-muted)">{r.sub}</text>}
        </g>
      ))}
      {/* mount: setup */}
      <path d="M230,80 L362,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12a)" />
      <rect x="365" y="64" width="210" height="32" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="470" y="85" fontSize="12" textAnchor="middle">setup：connect("general")</text>
      {/* update roomId: cleanup then setup */}
      <path d="M230,170 L362,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12a)" />
      <rect x="365" y="140" width="210" height="30" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="470" y="160" fontSize="12" textAnchor="middle">cleanup：disconnect("general")</text>
      <rect x="365" y="176" width="210" height="30" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="470" y="196" fontSize="12" textAnchor="middle">setup：connect("travel")</text>
      <text x="300" y="150" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">依存が変化</text>
      {/* update theme: nothing */}
      <path d="M230,260 L372,260" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow12a)" />
      <text x="470" y="264" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">何もしない（依存が同じ）</text>
      {/* unmount: cleanup */}
      <path d="M230,350 L362,350" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12a)" />
      <rect x="365" y="334" width="210" height="32" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="470" y="355" fontSize="12" textAnchor="middle">cleanup：disconnect("travel")</text>
      <text x="320" y="412" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">橙：setup（同期の開始）　灰：cleanup（同期の停止）。cleanup は次の setup の前とアンマウント時に走る</text>
    </svg>
  )
}

/* ---------- 図 12-2 Effect が必要かの判断 ---------- */
function NeedEffectFigure() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="ある処理を Effect に書くべきかの判断の流れ。props や state から計算できるならレンダー中に計算する。特定の操作が原因ならイベントハンドラに書く。表示されたこと自体が原因で外部システムと同期する必要があるときだけ Effect に書く">
      <defs>
        <marker id="arrow12b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="200" y="20" width="240" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="47" textAnchor="middle" fontWeight="600">この処理はどこに書く？</text>

        <path d="M320,64 L320,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <rect x="170" y="95" width="300" height="44" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="122" textAnchor="middle">props や state から計算できる？</text>
        <path d="M470,117 L548,117" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <text x="505" y="108" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">はい</text>
        <rect x="550" y="95" width="80" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="590" y="113" textAnchor="middle" fontSize="12">レンダー中</text>
        <text x="590" y="130" textAnchor="middle" fontSize="12">に計算</text>

        <path d="M320,139 L320,172" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <text x="335" y="160" fontSize="11" fill="var(--fig-muted)">いいえ</text>
        <rect x="170" y="175" width="300" height="44" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="202" textAnchor="middle">特定の操作（クリック・送信）が原因？</text>
        <path d="M470,197 L548,197" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <text x="505" y="188" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">はい</text>
        <rect x="550" y="175" width="80" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="590" y="193" textAnchor="middle" fontSize="12">イベント</text>
        <text x="590" y="210" textAnchor="middle" fontSize="12">ハンドラ</text>

        <path d="M320,219 L320,252" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <text x="335" y="240" fontSize="11" fill="var(--fig-muted)">いいえ</text>
        <rect x="170" y="255" width="300" height="44" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="282" textAnchor="middle">表示されたこと自体が原因で、外部と同期する？</text>
        <path d="M470,277 L548,277" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow12b)" />
        <text x="505" y="268" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">はい</text>
        <rect x="550" y="255" width="80" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="590" y="282" textAnchor="middle" fontWeight="600">Effect</text>
      </g>
      <text x="320" y="330" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">外部システム：ネットワーク、ブラウザ API、タイマー、React 以外のライブラリ、Tauri のイベント購読など</text>
      <text x="320" y="350" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">公式ドキュメント「You Might Not Need an Effect」の指針を図にした模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 12,
  part: 3,
  title: '副作用と useEffect',
  summary:
    'ネットワーク接続やブラウザ API の購読のように、レンダーでもイベントハンドラでもない処理を扱うのが Effect です。useEffect の依存配列とクリーンアップ、Effect が「同期の開始と停止」として再実行される仕組み、StrictMode が開発時に二重実行する理由、そして Effect を書かずに済む多くの場面を学びます。',
  goals: [
    'Effect が「特定の操作ではなく、描画そのものが原因で起きる副作用」であることを説明できる',
    'useEffect の依存配列の3つのパターンと、クリーンアップ関数がいつ呼ばれるかを説明できる',
    'Effect のライフサイクルを「同期の開始と停止」として捉え、依存が変わったときの再同期を追える',
    'StrictMode が開発時に setup → cleanup → setup を1回余分に実行する理由と、正しい対処を説明できる',
    'Effect を使わずに済む場面（計算、イベント、key、親への通知）を見分け、適切な書き方に直せる',
    'データ取得を Effect で書くときの競合（レースコンディション）を ignore フラグで防げる',
  ],
  prerequisites: [8, 9, 10],
  sections: [
    {
      id: 'what-is-effect',
      title: 'レンダーでもイベントでもない処理',
      body: (
        <>
          <p>
            ここまでに、コンポーネントの中の処理は2種類に分けられると学びました。1つは <Term en="rendering code">レンダーのコード</Term>で、関数の最上位にあり、props と state から JSX を計算します。純粋でなければなりません（<ChapterLink n={8} />）。もう1つは <Term en="event handler">イベントハンドラ</Term>で、クリックや入力といった特定の操作に応じて「何かをする」関数です。副作用を置いてよい場所でした（<ChapterLink n={9} />）。
          </p>
          <p>
            しかし、どちらにも収まらない処理があります。チャット画面は、画面に表示されている間はサーバーと接続していなければなりません。これは「ボタンが押されたから」ではなく「表示されたから」起きる処理です。公式ドキュメントの定義では、<Term en="Effect">Effect</Term> とは「特定のイベントではなく、レンダーそのものによって引き起こされる副作用」です。<Ref n={1} /> メッセージの送信はイベント、接続の確立は Effect です。
          </p>
          <p>
            Effect の実行タイミングは、コミット（<ChapterLink n={9} />）の終わり、画面が更新された後です。<Ref n={1} /> そのため、ネットワーク、ブラウザの API、React 以外のライブラリといった <Term en="external system">外部システム</Term> と React のコンポーネントを同期させるのに向いています。逆に、外部システムと同期していないなら、おそらく Effect は不要です。<Ref n={2} /> この点は本章の後半で詳しく扱います。
          </p>
        </>
      ),
    },
    {
      id: 'useeffect-basics',
      title: 'useEffect の3段階',
      body: (
        <>
          <p>Effect を書く手順は3段階です。<Ref n={1} /></p>
          <h3>段階1：Effect を宣言する</h3>
          <Code
            lang="tsx"
            code={`
import { useEffect, useRef } from 'react'

function VideoPlayer({ src, isPlaying }: { src: string; isPlaying: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play()
    } else {
      ref.current?.pause()
    }
  })

  return <video ref={ref} src={src} loop playsInline />
}
`}
          />
          <p>
            <code>{'<video>'}</code> には <code>isPlaying</code> のような props がなく、DOM の <code>play()</code>／<code>pause()</code> を呼ぶしかありません。これをレンダー中に書くと、DOM ノードがまだ存在しないため失敗しますし、レンダーは純粋な計算であるべきという約束にも反します。<code>useEffect</code> で包むと、その処理は「このレンダーが画面に反映された後」まで遅らされます。<Ref n={1} /> <code>useRef</code> は DOM 要素への参照を得る仕組みで、<ChapterLink n={13} /> で扱います。
          </p>
          <Callout kind="warn">
            <p>
              依存配列のない Effect の中で無条件に state を更新すると、レンダー → Effect → 更新 → レンダー → … の無限ループになります。公式ドキュメントはこれを「コンセントを自分自身に差し込む」ことにたとえています。<Ref n={1} />
            </p>
          </Callout>
          <h3>段階2：依存配列を指定する</h3>
          <p>
            上の Effect は毎回のレンダー後に実行されます。多くの場合それは無駄で、たとえば入力欄に1文字打つたびにチャットへ再接続するのは困ります。第2引数の <Term en="dependency array">依存配列</Term> で、「この値が前回から変わったときだけ再実行する」と指定します。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>書き方</th>
                  <th>実行されるタイミング</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>useEffect(() =&gt; {'{...}'})</code></td>
                  <td>毎回のレンダー後</td>
                </tr>
                <tr>
                  <td><code>useEffect(() =&gt; {'{...}'}, [])</code></td>
                  <td>マウント時（初めて画面に現れたとき）だけ</td>
                </tr>
                <tr>
                  <td><code>useEffect(() =&gt; {'{...}'}, [a, b])</code></td>
                  <td>マウント時と、<code>a</code> か <code>b</code> が前回のレンダーから変わったとき</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            重要なのは、依存配列は「選ぶ」ものではないという点です。Effect の中で読んでいる props や state は、すべて依存配列に書かなければなりません。書き漏らすとリンターがエラーを出します。<Ref n={1} /> 比較は <code>Object.is</code> で行われ、すべての依存が前回と同じなら Effect はスキップされます。例外として、<code>useRef</code> が返すオブジェクトと <code>useState</code> の set 関数は identity が安定しているため、省略しても構いません。<Ref n={1} />
          </p>
          <h3>段階3：必要ならクリーンアップを返す</h3>
          <Code
            lang="tsx"
            code={`
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId)
    connection.connect()
    return () => {
      connection.disconnect()   // クリーンアップ
    }
  }, [roomId])
  return <h1>{roomId} へようこそ</h1>
}
`}
          />
          <p>
            Effect が返す関数を <Term en="cleanup function">クリーンアップ関数</Term> と呼びます。React は、Effect を再実行する前と、コンポーネントがアンマウント（画面から消える）するときに、これを呼びます。<Ref n={1} /> 接続、購読、タイマーのように「始めたら終わらせる必要がある」処理には必ず必要です。クリーンアップが無いと、別の画面に移って戻るたびに接続が増えていきます。
          </p>
        </>
      ),
    },
    {
      id: 'lifecycle',
      title: 'Effect のライフサイクル：同期の開始と停止',
      body: (
        <>
          <p>
            コンポーネントにはマウント、更新、アンマウントという3つの局面があります。Effect を「マウント時にこれをして、アンマウント時にあれをする」と考えたくなりますが、公式ドキュメントはこの考え方を勧めていません。Effect ができることは「同期を開始する」と「同期を停止する」の2つだけで、この開始と停止は、コンポーネントが表示されている間に何度も繰り返されうるからです。<Ref n={3} />
          </p>
          <Figure n="12-1" title="マウント・更新・アンマウントと Effect の実行" caption="依存配列 [roomId] の ChatRoom。マウントで setup、roomId が変わると前の部屋の cleanup → 新しい部屋の setup、依存に含まれない theme の変化では何もしない、アンマウントで cleanup。縦が時間の流れ。">
            <EffectTimelineFigure />
          </Figure>
          <p>
            図の2行目を見てください。<code>roomId</code> が <code>"general"</code> から <code>"travel"</code> に変わると、React はまず古い値でクリーンアップを呼び（general を切断）、次に新しい値で setup を呼びます（travel に接続）。<Ref n={4} /> これを <Term en="re-synchronization">再同期</Term> と呼びます。コンポーネントの視点では「更新」ですが、Effect の視点では「古い同期を止めて、新しい同期を始めた」だけです。マウント時もアンマウント時も、同じ「開始」と「停止」の組み合わせで説明できます。<Ref n={3} />
          </p>
          <h3>リアクティブな値</h3>
          <p>
            Effect が再同期するのは、依存配列の値が変わったときです。では何を依存に書くべきか。公式ドキュメントは「props、state、そしてそれらから計算されてコンポーネント本体で宣言されたすべての値」を <Term en="reactive value">リアクティブな値</Term> と呼び、Effect の中で読むリアクティブな値はすべて依存に含めなければならない、と定めています。<Ref n={3} /> 一方、コンポーネントの外（モジュールの最上位）で宣言した定数はレンダーで変わらないのでリアクティブではなく、依存に書く必要がありません。
          </p>
          <p>
            もう1つの指針は、1つの Effect は1つの独立した同期を表す、というものです。訪問の記録と部屋への接続を同じ Effect に書くと、接続の依存が変わるたびに訪問が記録されてしまいます。別々の処理は別々の Effect に分けます。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'strict-mode',
      title: 'StrictMode は Effect を1回余分に実行する',
      body: (
        <>
          <p>
            <ChapterLink n={7} /> のテンプレートで <code>{'<StrictMode>'}</code> が有効になっているため、開発時にはもう1つの挙動が加わります。React は、コンポーネントのマウント直後に setup → cleanup → setup という1回余分なサイクルを実行します。<Ref n={5} /> 前節の <code>ChatRoom</code> なら、コンソールに「接続」「切断」「接続」と出ます。本番ビルドではこの余分なサイクルは起きず、接続は1回です。
          </p>
          <p>
            なぜそんなことをするのでしょうか。公式ドキュメントの説明は「マウントし直すことで、画面を離れて戻ってきても壊れないことを React が検証している」です。<Ref n={1} /> クリーンアップを書き忘れた Effect は、この余分なサイクルで「接続」「接続」と2回出て、接続が漏れていることがすぐ分かります。判断の基準は、「Effect が1回だけ実行された場合（本番）と、setup → cleanup → setup の場合（開発）を、ユーザーが区別できてはいけない」です。<Ref n={1} /> <Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              「開発時に2回実行されるのが気持ち悪い」と、<code>useRef</code> のフラグで2回目を抑止するコードを見かけますが、公式ドキュメントはこれを「ログが1回になるだけで、バグは直っていない」と退けています。<Ref n={1} /> 正しい問いは「2回実行されないようにするには」ではなく「再マウントされても動くように Effect を直すには」です。
            </p>
          </Callout>
          <p>
            StrictMode の開発時専用の検査は全部で4つあります。コンポーネント関数・初期化関数・更新関数・reducer の二重呼び出し（<ChapterLink n={8} />、<ChapterLink n={9} />、<ChapterLink n={11} />）、Effect の余分な setup + cleanup、ref コールバックの余分な setup + cleanup（<ChapterLink n={13} />）、非推奨 API の警告です。いずれも本番ビルドには影響しません。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'dependencies',
      title: '依存配列とうまく付き合う',
      body: (
        <>
          <p>
            依存配列はコードから決まるものなので、「この依存を外したい」と思ったら、配列ではなくコードのほうを変えます。公式ドキュメントは、リンターのエラーを抑止することを「React に嘘をつく」ことだと強く戒め、エラーはコンパイルエラーと同じように扱うよう勧めています。<Ref n={6} /> 典型的な見直しの観点は次のとおりです。<Ref n={6} />
          </p>
          <h3>オブジェクトや関数を依存にしない</h3>
          <p>
            レンダー中に作ったオブジェクトや関数は、中身が同じでも毎回「別物」です。<code>{'const options = { serverUrl, roomId }'}</code> を依存に入れると、Effect は毎レンダー再実行されます。対処は、オブジェクトを Effect の中で作って依存を文字列などのプリミティブにするか、変化しないならコンポーネントの外に出すことです。<Ref n={4} /> props でオブジェクトを受け取るなら、先に <code>{'const { roomId, serverUrl } = options'}</code> と取り出してから依存にします。<Ref n={6} />
          </p>
          <h3>前の state を読むなら更新関数</h3>
          <Code
            lang="tsx"
            code={`
// 悪い例：messages を読むために依存に入れ、メッセージが届くたびに再接続する
useEffect(() => {
  const connection = createConnection(roomId)
  connection.on('message', (msg) => setMessages([...messages, msg]))
  connection.connect()
  return () => connection.disconnect()
}, [roomId, messages])

// 良い例：更新関数なら messages を読まずに済む
useEffect(() => {
  const connection = createConnection(roomId)
  connection.on('message', (msg) => setMessages((msgs) => [...msgs, msg]))
  connection.connect()
  return () => connection.disconnect()
}, [roomId])
`}
          />
          <h3>最新の値を読みたいが、反応はしたくない：useEffectEvent</h3>
          <p>
            接続が確立したときに「現在のテーマで」通知を出したいとします。<code>theme</code> を Effect で読むと依存に入れなければならず、テーマを切り替えるたびに再接続してしまいます。この「Effect の中から呼ばれるが、それ自体はリアクティブでない」処理のために、React 19.2 で <code>useEffectEvent</code> が追加されました。<Ref n={7} /> <Ref n={8} />
          </p>
          <Code
            lang="tsx"
            code={`
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, theme }: { roomId: string; theme: Theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('接続しました', theme)   // 常に最新の theme を見る
  })

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', () => onConnected())
    connection.connect()
    return () => connection.disconnect()
  }, [roomId])   // theme は依存に不要。onConnected も依存に書かない
}
`}
          />
          <p>
            <code>useEffectEvent</code> で包んだ関数を <Term en="Effect Event">Effect イベント</Term> と呼びます。イベントハンドラがユーザー操作に応じて動くのに対し、Effect イベントは Effect の中から呼ばれます。常に最新の props と state を見ますが、リアクティブではないので依存配列に書きません。<Ref n={7} /> 制約として、Effect の中からしか呼べず、他のコンポーネントやフックに渡してはいけません。また、依存配列を減らすための抜け道として使ってはいけません。<Ref n={8} /> 公式ドキュメントが「概念的にイベントであるもの」にだけ使うよう求めているのはそのためです。
          </p>
          <Callout kind="unverified">
            <p>
              <code>useEffectEvent</code> は React 19.2 のリリース記事で「新機能（New React Features）」として紹介され、react.dev の API リファレンスにも載っています。本書の基準バージョン React 19.3 で利用できます。<Ref n={8} /> Canary や実験的機能とする注記は公式資料に見当たりませんでしたが、「安定版」と明記した文言も確認できていません。リンターに依存として追加されないようにするには <code>eslint-plugin-react-hooks</code> の最新版が必要とされています。上のコードは、本書の制作時に React 19.3.1 で動かし、テーマを切り替えても再接続せず、通知には最新の <code>theme</code> が使われることを確認しました。リンターの挙動は確認していません。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'no-effect',
      title: 'Effect は必要ないかもしれない',
      body: (
        <>
          <p>
            公式ドキュメントは Effect を「React の枠組みからの脱出口」と呼び、外部システムとの同期以外に使わないよう繰り返し注意しています。<Ref n={2} /> Effect を書く前に、図の流れで考えてください。
          </p>
          <Figure n="12-2" title="その処理は Effect に書くべきか" caption="上から順に判断する。計算できるならレンダー中に。操作が原因ならハンドラに。表示されたこと自体が原因で外部と同期するときだけ Effect に。模式図。">
            <NeedEffectFigure />
          </Figure>
          <p>Effect が不要な代表的な場面を、公式ドキュメントの分類に沿って挙げます。<Ref n={2} /></p>
          <Code
            lang="tsx"
            code={`
// 1. props や state から計算できる → レンダー中に計算する
// 悪い例
const [fullName, setFullName] = useState('')
useEffect(() => { setFullName(firstName + ' ' + lastName) }, [firstName, lastName])
// 良い例
const fullName = firstName + ' ' + lastName

// 2. 重い計算 → useMemo（第14章）
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter])

// 3. props が変わったら state を全部リセット → key（第10章）
<Profile userId={userId} key={userId} />

// 4. 操作が原因の処理 → イベントハンドラ
// 悪い例：submitted フラグを Effect で監視して POST する
useEffect(() => { if (submitted) post('/api/register') }, [submitted])
// 良い例
function handleSubmit() { post('/api/register') }
`}
          />
          <p>
            1 の悪い例は、state を更新するためだけに Effect を使っており、余分なレンダーが1回増えるうえに <code>fullName</code> が一瞬古い値になります。<Ref n={2} /> 4 の悪い例は、「表示されたから」ではなく「ボタンが押されたから」起きるべき処理を Effect に置いています。Effect が実行される時点では、ユーザーが何をしたのかもう分かりません。<Ref n={2} />
          </p>
          <p>そのほか、よくある誤りと正しい形は次のとおりです。<Ref n={2} /></p>
          <ul>
            <li>親に state の変化を通知する：Effect で <code>onChange(isOn)</code> を呼ぶのではなく、<code>setIsOn(next)</code> と同じハンドラの中で <code>onChange(next)</code> を呼ぶ。さらに良いのは state を親に持ち上げること。</li>
            <li>子が取得したデータを親に渡す：親が取得して子に渡す。データは下向きに流す。</li>
            <li>アプリ起動時に1回だけ実行する：<code>useEffect(..., [])</code> は開発時に2回走る。モジュールの最上位で実行するか、モジュールレベルの <code>didInit</code> フラグで守る。ただし乱用せず、エントリーポイント付近に限る。</li>
            <li>ブラウザの状態（オンラインかどうかなど）を購読する：Effect で <code>addEventListener</code> するのではなく、<code>useSyncExternalStore</code> を使う。</li>
            <li>state の連鎖（A が変わったら B、B が変わったら C を Effect で更新）：レンダー中の計算とハンドラでの一括更新に直す。</li>
          </ul>
          <p>
            まとめると、「レンダー中に計算できるなら Effect は要らない」が原則です。公式ドキュメントは「生の <code>useEffect</code> が少ないほどアプリは保守しやすい」とまで述べています。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'fetching',
      title: 'データ取得と競合',
      body: (
        <>
          <p>
            「表示されたから取得する」というデータ取得は、Effect の正当な用途です。ただし、落とし穴があります。<code>userId</code> が <code>'Alice'</code> から <code>'Bob'</code> に変わったとき、Alice の応答が Bob の応答より後に届くと、画面に Alice のデータが表示されてしまいます。これを <Term en="race condition">競合（レースコンディション）</Term> と呼びます。<Ref n={1} />
          </p>
          <Code
            lang="tsx"
            code={`
function useData<T>(url: string | null): T | null {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    if (url === null) return
    let ignore = false
    fetch(url)
      .then((res) => res.json() as Promise<T>)
      .then((json) => {
        if (!ignore) setData(json)   // 古い応答は捨てる
      })
    return () => {
      ignore = true
    }
  }, [url])
  return data
}
`}
          />
          <p>
            クリーンアップで <code>ignore</code> を <code>true</code> にすることで、<code>url</code> が変わった後やアンマウント後に届いた応答は無視されます。<Ref n={1} /> <Ref n={9} /> 開発時の StrictMode では2回リクエストが飛びますが、1回目の応答はクリーンアップで無視されるので、画面に影響はありません。<Ref n={1} /> このように取得処理をカスタムフック（<ChapterLink n={13} />）に閉じ込めておけば、後からキャッシュやライブラリに置き換えるのが楽になります。公式ドキュメントは、本格的なアプリではフレームワークの仕組みや TanStack Query、SWR、React Router のようなキャッシュ付きの手段を勧めています。<Ref n={1} />
          </p>
          <p>
            Tauri アプリでは、<code>fetch</code> の代わりに Rust 側のコマンドを呼ぶ <code>invoke</code>（<ChapterLink n={34} />）が同じ位置に入ります。<code>invoke</code> も Promise を返すので、競合の対処は上とまったく同じです。
          </p>
          <Callout>
            <p>
              <code>useEffect</code> のコールバックに直接 <code>async</code> 関数は渡せません。Effect が返すのはクリーンアップ関数でなければならず、<code>async</code> 関数は Promise を返すからです。上の例のように <code>.then</code> で書くか、Effect の中で <code>async function run() {'{...}'}</code> を定義して呼び出します。
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
              ページを開いたときの読み込み（<ChapterLink n={43} />、<ChapterLink n={44} />）は、この章の <code>useData</code> と同じ形で <code>invoke('get_page', {'{ id }'})</code> を Effect から呼びます。<code>pageId</code> を依存にし、<code>ignore</code> フラグで古い応答を捨てます。エディタの自動保存は、BlockNote の変更イベントをハンドラとして受け、その中でデバウンス（800 ms）してから保存コマンドを呼びます。タイマーの解除はクリーンアップに書きます。
            </p>
            <p>
              テーマ（<ChapterLink n={50} />）で OS のダークモードに追従する部分は、<code>matchMedia('(prefers-color-scheme: dark)')</code> の変化を購読する典型的な外部システムとの同期です。Tauri 側のイベント購読（<code>listen</code>、<ChapterLink n={35} />）も同じで、Effect の中で購読を開始し、返ってきた解除関数をクリーンアップで呼びます。一方で、検索結果の絞り込み（<ChapterLink n={46} />）や表ビューの並べ替え（<ChapterLink n={48} />）はレンダー中の計算であり、Effect は使いません。
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
            <li>Effect は「特定の操作ではなく、描画そのものが原因で起きる副作用」で、コミット後に実行される。外部システムとの同期に使う。</li>
            <li>依存配列は Effect の中で読むリアクティブな値（props、state、それらから計算した値）をすべて含める。<code>[]</code> はマウント時だけ、省略すると毎回。</li>
            <li>Effect は「同期の開始（setup）」と「停止（cleanup）」の組み合わせ。依存が変わると cleanup → setup の再同期が起き、アンマウントで cleanup が呼ばれる。</li>
            <li>StrictMode は開発時に setup → cleanup → setup を1回余分に実行し、クリーンアップ漏れをあぶり出す。抑止せず、再マウントに耐える Effect に直す。</li>
            <li>依存を減らしたいときはコードを直す。オブジェクトや関数は Effect の中で作り、前の state は更新関数で読み、概念的にイベントである処理は <code>useEffectEvent</code> に出す。</li>
            <li>レンダー中に計算できる、操作が原因、親への通知、といった処理に Effect は不要。データ取得は <code>ignore</code> フラグで競合を防ぎ、カスタムフックに閉じ込める。</li>
          </ul>
          <p>次章では、レンダーに影響しない値を保持する ref と DOM への参照、そして自分のフックを設計する方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Synchronizing with Effects',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/synchronizing-with-effects',
      accessed: '2026-11-08',
      note: 'Effect の定義、コミット後の実行、3段階（宣言・依存・クリーンアップ）、VideoPlayer と ChatRoom の例、無限ループの注意、StrictMode の再マウントの理由、ref で抑止しない助言、データ取得の ignore フラグと代替手段の根拠。',
    },
    {
      title: 'You Might Not Need an Effect',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/you-might-not-need-an-effect',
      accessed: '2026-11-08',
      note: 'Effect が不要な場面の分類（計算、useMemo、key、ハンドラ、親への通知、初期化、useSyncExternalStore、連鎖）の根拠。',
    },
    {
      title: 'Lifecycle of Reactive Effects',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/lifecycle-of-reactive-effects',
      accessed: '2026-11-08',
      note: '同期の開始と停止という捉え方、再同期、リアクティブな値の定義、1つの Effect は1つの同期という指針の根拠。',
    },
    {
      title: 'useEffect – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/useEffect',
      accessed: '2026-11-08',
      note: '依存が変わったときに古い値で cleanup → 新しい値で setup が走る点、オブジェクト依存の問題と対処、二重実行時の判断基準の根拠。',
    },
    {
      title: 'StrictMode – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/StrictMode',
      accessed: '2026-11-08',
      note: '開発時専用の4つの検査（二重レンダー、Effect と ref コールバックの余分なサイクル、非推奨 API の警告）と本番への影響が無い点の根拠。',
    },
    {
      title: 'Removing Effect Dependencies',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/removing-effect-dependencies',
      accessed: '2026-11-08',
      note: 'リンターを抑止しない、依存を変えるならコードを変える、更新関数で state の依存を外す、props のオブジェクトからプリミティブを取り出す根拠。',
    },
    {
      title: 'Separating Events from Effects',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/separating-events-from-effects',
      accessed: '2026-11-08',
      note: 'リアクティブな処理と非リアクティブな処理、useEffectEvent の使い方と制約の根拠。',
    },
    {
      title: 'React 19.2',
      publisher: 'React Blog (react.dev)',
      url: 'https://react.dev/blog/2025/10/01/react-19-2',
      accessed: '2026-11-08',
      version: 'React 19.2',
      note: 'useEffectEvent が 19.2 の新機能として追加された点、eslint-plugin-react-hooks の最新版が必要な点の根拠。useEffectEvent の制約は https://react.dev/reference/react/useEffectEvent も参照した。',
    },
    {
      title: 'Reusing Logic with Custom Hooks',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
      accessed: '2026-11-08',
      note: 'useData カスタムフックの形の根拠。',
    },
  ],
}

export default chapter
