import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 7-1 命令的と宣言的 ---------- */
function ImperativeDeclarativeFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="命令的な UI 更新と宣言的な UI 更新の対比。左では手続きが各 DOM 要素に個別の命令を出し、右では状態から画面の記述を作り、React が DOM への反映を担当する">
      <defs>
        <marker id="arrow7a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* 左：命令的 */}
      <text x="160" y="28" fontSize="15" fontWeight="600" textAnchor="middle">命令的（DOM を直接操作）</text>
      <rect x="20" y="45" width="280" height="235" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <rect x="40" y="65" width="240" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="6" />
      <text x="160" y="86" fontSize="13" textAnchor="middle">イベント処理（手続き）</text>
      <text x="160" y="104" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">「ボタンを無効に、スピナーを表示…」</text>
      <g fontSize="12">
        <rect x="40" y="150" width="68" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
        <text x="74" y="175" textAnchor="middle">button</text>
        <rect x="126" y="150" width="68" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
        <text x="160" y="175" textAnchor="middle">spinner</text>
        <rect x="212" y="150" width="68" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
        <text x="246" y="175" textAnchor="middle">error</text>
      </g>
      <path d="M100,115 L74,148" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow7a)" />
      <path d="M160,115 L160,148" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow7a)" />
      <path d="M220,115 L246,148" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow7a)" />
      <text x="160" y="222" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">要素ごとに「どう変えるか」を命令する</text>
      <text x="160" y="240" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">要素が増えるほど組み合わせが増える</text>
      {/* 右：宣言的 */}
      <text x="480" y="28" fontSize="15" fontWeight="600" textAnchor="middle">宣言的（React）</text>
      <rect x="340" y="45" width="280" height="235" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <rect x="360" y="65" width="240" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="6" />
      <text x="480" y="90" fontSize="13" textAnchor="middle">状態 status = 'submitting'</text>
      <path d="M480,105 L480,128" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow7a)" />
      <rect x="360" y="130" width="240" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="6" />
      <text x="480" y="151" fontSize="12" textAnchor="middle">コンポーネント（状態 → 画面の記述）</text>
      <text x="480" y="169" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">「この状態ならこう見える」</text>
      <path d="M480,180 L480,203" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow7a)" />
      <rect x="360" y="205" width="240" height="40" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <text x="480" y="230" fontSize="13" textAnchor="middle">React が DOM との差分を反映</text>
      <text x="480" y="268" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">「どう変えるか」は React に任せる</text>
    </svg>
  )
}

/* ---------- 図 7-2 JSX の変換 ---------- */
function JsxTransformFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="JSX が画面になるまでの4段階。JSX のソースがビルドツールで jsx 関数の呼び出しに変換され、実行時に React 要素オブジェクトになり、React DOM が DOM ノードを作る">
      <defs>
        <marker id="arrow7b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="130" height="90" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="85" y="62" textAnchor="middle" fontWeight="600">JSX（ソース）</text>
        <text x="85" y="90" textAnchor="middle" fontSize="12">{'<h1 className="t">'}</text>
        <text x="85" y="108" textAnchor="middle" fontSize="12">{'Hi</h1>'}</text>

        <path d="M150,85 L178,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow7b)" />
        <text x="164" y="72" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">変換</text>

        <rect x="180" y="40" width="170" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="265" y="62" textAnchor="middle" fontWeight="600">関数呼び出し</text>
        <text x="265" y="90" textAnchor="middle" fontSize="12">{"_jsx('h1', {"}</text>
        <text x="265" y="108" textAnchor="middle" fontSize="12">{"className, children })"}</text>

        <path d="M350,85 L378,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow7b)" />
        <text x="364" y="72" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">実行</text>

        <rect x="380" y="40" width="110" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="435" y="62" textAnchor="middle" fontWeight="600">React 要素</text>
        <text x="435" y="90" textAnchor="middle" fontSize="12">{"{ type: 'h1',"}</text>
        <text x="435" y="108" textAnchor="middle" fontSize="12">{'props: {…} }'}</text>

        <path d="M490,85 L518,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow7b)" />
        <text x="504" y="72" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">描画</text>

        <rect x="520" y="40" width="100" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="570" y="62" textAnchor="middle" fontWeight="600">DOM</text>
        <text x="570" y="90" textAnchor="middle" fontSize="12">{'<h1 class="t">'}</text>
        <text x="570" y="108" textAnchor="middle" fontSize="12">{'Hi</h1>'}</text>
      </g>
      {/* 担当 */}
      <g fontSize="12" fill="var(--fig-muted)" textAnchor="middle">
        <line x1="20" y1="150" x2="350" y2="150" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="185" y="170">ビルド時：Vite（@vitejs/plugin-react）が担当</text>
        <line x1="380" y1="150" x2="620" y2="150" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="495" y="170">実行時：react と react-dom が担当</text>
      </g>
      <text x="320" y="215" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">React 要素は「こういう画面にしたい」という軽量な記述で、DOM ノードそのものではない</text>
      <text x="320" y="238" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：props の中身や key・ref は省略している</text>
    </svg>
  )
}

/* ---------- 図 7-3 Vite プロジェクトの起動の流れ ---------- */
function ViteProjectFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Vite の React プロジェクトでブラウザが画面を表示するまでの流れ。index.html が src/main.tsx を module として読み込み、main.tsx が createRoot で App.tsx を root 要素に描画する。開発中は vite dev サーバーが各ファイルを変換して配信する">
      <defs>
        <marker id="arrow7c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="20" width="600" height="60" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <text x="320" y="44" fontSize="14" fontWeight="600" textAnchor="middle">vite dev サーバー（localhost:5173）</text>
      <text x="320" y="64" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">.tsx を要求されるたびに JS へ変換して返す。保存すると差し替え（HMR / Fast Refresh）</text>
      <g fontSize="13">
        <rect x="20" y="120" width="170" height="80" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="105" y="145" textAnchor="middle" fontWeight="600">index.html</text>
        <text x="105" y="165" textAnchor="middle" fontSize="12">{'<div id="root">'}</text>
        <text x="105" y="183" textAnchor="middle" fontSize="12">{'<script type="module">'}</text>

        <path d="M190,160 L233,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow7c)" />
        <text x="212" y="148" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">src=</text>

        <rect x="235" y="120" width="170" height="80" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="145" textAnchor="middle" fontWeight="600">src/main.tsx</text>
        <text x="320" y="165" textAnchor="middle" fontSize="12">createRoot(root)</text>
        <text x="320" y="183" textAnchor="middle" fontSize="12">{'.render(<App />)'}</text>

        <path d="M405,160 L448,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow7c)" />
        <text x="427" y="148" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">import</text>

        <rect x="450" y="120" width="170" height="80" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="535" y="145" textAnchor="middle" fontWeight="600">src/App.tsx</text>
        <text x="535" y="165" textAnchor="middle" fontSize="12">ルートコンポーネント</text>
        <text x="535" y="183" textAnchor="middle" fontSize="12">（以下、部品の木）</text>
      </g>
      <path d="M105,80 L105,118" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow7c)" />
      <path d="M320,80 L320,118" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow7c)" />
      <path d="M535,80 L535,118" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow7c)" />
      <rect x="20" y="230" width="600" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="8" />
      <text x="320" y="250" fontSize="13" textAnchor="middle">設定ファイル：vite.config.ts（plugins: [react()]）、tsconfig.app.json（jsx: react-jsx）</text>
      <text x="320" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：読み込みの順序　点線：dev サーバーからの配信</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 7,
  part: 3,
  title: 'React の考え方と JSX',
  summary:
    'React は「状態から画面を記述し、DOM への反映は React に任せる」宣言的なライブラリです。命令的な DOM 操作との違い、コンポーネントと React 要素、JSX の規則とその変換、そして Vite で作った React プロジェクトの構成を学びます。',
  goals: [
    '命令的な UI 更新と宣言的な UI 更新の違いを、具体例を挙げて説明できる',
    'コンポーネントが「JSX を返す関数」であることと、名前が大文字で始まる理由を説明できる',
    'JSX の主な規則（単一のルート、閉じタグ、camelCase、波かっこ）に従って書ける',
    'JSX がビルド時に関数呼び出しへ変換され、実行時に React 要素オブジェクトになる流れを説明できる',
    'Vite で作った React + TypeScript プロジェクトの各ファイルの役割を説明できる',
  ],
  prerequisites: [3, 4, 5],
  sections: [
    {
      id: 'why-react',
      title: 'なぜ React が必要か',
      body: (
        <>
          <p>
            <ChapterLink n={4} /> では、ブラウザが HTML を DOM の木に変換し、JavaScript から <code>document.querySelector</code> や <code>element.textContent</code> で木を書き換えられることを学びました。小さなページならこれで十分です。しかし、画面の部品が増え、それぞれが互いに影響し合うようになると、「どの操作のあとに、どの要素を、どう変えるか」の組み合わせが急激に増えます。
          </p>
          <p>
            たとえば、入力欄と送信ボタンと読み込み中の表示とエラー表示があるフォームを考えます。送信中はボタンと入力欄を無効にし、スピナーを出し、前回のエラーを消す。成功したらフォーム全体を隠してお礼の文を出す。失敗したらスピナーを消し、エラーを出し、入力欄を再び有効にする。要素が1つ増えるたびに、既存のすべての処理に「その要素をどうするか」を書き足し、書き忘れがないか見直す必要があります。<Ref n={1} />
          </p>
          <p>
            <Term en="React">React</Term> は、この問題を「画面の見え方を状態から計算する関数」として書き直すためのライブラリです。開発者は「状態がこうなら画面はこう見える」だけを書き、DOM をどう書き換えるかは React が決めます。この章では、その考え方の根本にある命令的と宣言的の対比から始め、React が使う記法 JSX、そして JSX がブラウザで動くまでの道具立て（Vite）を順に見ていきます。
          </p>
          <p>
            この章から <ChapterLink n={17} /> までが React 入門です。Tauri アプリの画面はすべて React で作るので、ここで学ぶ内容は第5部以降のすべての章の土台になります。
          </p>
        </>
      ),
    },
    {
      id: 'imperative-declarative',
      title: '命令的と宣言的',
      body: (
        <>
          <p>
            前節のフォームを、DOM を直接操作するやり方で書くと次のようになります（抜粋）。
          </p>
          <Code
            lang="ts"
            title="命令的な書き方（DOM を直接操作）"
            code={`
async function handleFormSubmit(e: SubmitEvent) {
  e.preventDefault()
  textarea.disabled = true      // 入力欄を無効に
  button.disabled = true        // ボタンを無効に
  spinner.style.display = ''    // スピナーを表示
  errorBox.style.display = 'none' // 前回のエラーを消す
  try {
    await submitForm(textarea.value)
    form.style.display = 'none'   // フォームを隠す
    thankYou.style.display = ''   // お礼を表示
  } catch (err) {
    errorBox.textContent = String(err)
    errorBox.style.display = ''   // エラーを表示
    textarea.disabled = false     // 入力欄を戻す
    button.disabled = false       // ボタンを戻す
  } finally {
    spinner.style.display = 'none'
  }
}
`}
          />
          <p>
            このように、要素ひとつひとつに「表示しろ」「無効にしろ」と命令する書き方を <Term en="imperative">命令的</Term> と呼びます。React 公式ドキュメントは、これを「隣に座った人に、曲がり角ごとに道順を指示する」ことにたとえています。運転手は目的地を知らないので、指示を1つ間違えれば違う場所に着いてしまいます。<Ref n={1} />
          </p>
          <p>
            対して React では、「今の状態」を変数で持ち、その変数から画面の見え方を記述します。
          </p>
          <Code
            lang="tsx"
            title="宣言的な書き方（React）"
            code={`
type Status = 'typing' | 'submitting' | 'success'

function Form() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<Status>('typing')

  if (status === 'success') {
    return <h1>送信しました</h1>
  }
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={answer} disabled={status === 'submitting'} onChange={(e) => setAnswer(e.target.value)} />
      <button disabled={answer.length === 0 || status === 'submitting'}>送信</button>
      {error !== null && <p className="error">{error.message}</p>}
    </form>
  )
}
`}
          />
          <p>
            ここでは「ボタンを無効にしろ」とは書いていません。「<code>status</code> が <code>'submitting'</code> ならボタンは無効」という事実を書いているだけです。送信処理は <code>setStatus('submitting')</code> のように状態を変えるだけで、画面をどう書き換えるかは React が計算します。この書き方を <Term en="declarative">宣言的</Term> と呼びます。公式ドキュメントのたとえでは、タクシーに乗って行き先だけを告げるのに相当します。運転手（React）は道順を自分で決め、近道も知っています。<Ref n={1} />
          </p>
          <Figure n="7-1" title="命令的な更新と宣言的な更新の対比" caption="左は、イベント処理の手続きが各要素に個別の命令を出す。右は、状態からコンポーネントが画面の記述を作り、DOM への反映は React が担当する。右では「状態」と「見え方」の対応だけを書けばよい。">
            <ImperativeDeclarativeFigure />
          </Figure>
          <p>
            図の左側では、状態が増えるたびに矢印の本数（命令の組み合わせ）が増えます。右側では、状態が増えても「状態 → 画面」の関数に分岐を1つ足すだけで済みます。宣言的なコードは一見長くなりますが、新しい表示状態を後から足しても既存の動きを壊しにくい、というのが React の主張です。<Ref n={1} /> <code>useState</code> の詳しい仕組みは <ChapterLink n={9} /> で扱います。この章では「状態から画面を記述する」という形だけを覚えてください。
          </p>
        </>
      ),
    },
    {
      id: 'components-elements',
      title: 'コンポーネントと React 要素',
      body: (
        <>
          <p>
            React で画面を作る単位を <Term en="component">コンポーネント</Term> と呼びます。公式ドキュメントの定義は「マークアップを散りばめられる JavaScript の関数」です。<Ref n={2} /> 見出し、ボタン、サイドバー、ページ全体まで、React アプリの画面はすべてコンポーネントでできています。
          </p>
          <Code
            lang="tsx"
            title="src/Profile.tsx"
            code={`
export default function Profile() {
  return (
    <img
      src="https://example.com/katherine.jpg"
      alt="Katherine Johnson"
    />
  )
}
`}
          />
          <p>コンポーネントを書くときの規則は次の4つです。<Ref n={2} /></p>
          <ol>
            <li>関数として定義し、他のファイルから使えるように <code>export</code> する。</li>
            <li>名前は大文字で始める。React は、<code>{'<section>'}</code> のような小文字のタグを HTML 要素、<code>{'<Profile />'}</code> のような大文字のタグをコンポーネントとして区別します。</li>
            <li>画面の記述（JSX）を <code>return</code> する。</li>
            <li>複数行にわたる JSX は丸かっこで囲む。囲まないと、<code>return</code> の次の行以降が無視されます。</li>
          </ol>
          <p>
            もう1つ、重要な禁止事項があります。コンポーネントの定義を、別のコンポーネントの関数の中に書いてはいけません。公式ドキュメントは「非常に遅く、バグの原因になる」と明言しています。<Ref n={2} /> 理由は <ChapterLink n={10} /> で state の保持とリセットを学ぶと分かります。コンポーネントは常にファイルの最上位で定義し、親から子へ渡したい値は props（<ChapterLink n={8} />）で渡します。
          </p>
          <h3>コンポーネントが返すもの：React 要素</h3>
          <p>
            コンポーネントが返す <code>{'<img ... />'}</code> は、DOM の要素そのものではありません。これは <Term en="React element">React 要素</Term> と呼ばれる、ただの JavaScript オブジェクトです。公式リファレンスによれば、React 要素は <code>type</code>（タグ名の文字列、またはコンポーネント関数）、<code>props</code>（属性と子要素）、<code>key</code> などを持つ軽量な「記述」で、作るだけでは何も描画されません。<Ref n={5} /> なお、リファレンスは <code>ref</code> も要素の性質として挙げていますが、React 19 では <code>ref</code> は通常の props の1つとして渡されるようになり、要素の <code>ref</code> プロパティを読む使い方は廃止されました（19.3.1 の開発ビルドでも警告が出ます）。<Ref n={12} />
          </p>
          <Code
            lang="ts"
            title="React 要素の中身（簡略化）"
            code={`
// <Profile /> が作るオブジェクト（key は省略時 null）
{ type: Profile, props: {}, key: null }

// <h1 className="greeting">Hello</h1> が作るオブジェクト
{ type: 'h1', props: { className: 'greeting', children: 'Hello' }, key: null }
`}
          />
          <p>
            この「コンポーネントは React 要素という記述を返すだけで、実際の DOM 操作は React が行う」という分業が、前節の宣言的な書き方を支えています。React 要素は作られた後に変更してはいけません。開発時には React がオブジェクトを凍結してこれを強制します。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'jsx-rules',
      title: 'JSX の書き方',
      body: (
        <>
          <p>
            コンポーネントの中に書いた HTML のような記法を <Term en="JSX">JSX</Term> と呼びます。JavaScript の構文拡張で、ブラウザはそのままでは理解できません（変換の仕組みは次節）。React が見た目のマークアップと表示ロジックを1つの関数にまとめる理由は、ボタンの見た目とボタンの振る舞いのように密接に関係するものを同じ場所に置き、編集のたびに同期させるためです。<Ref n={3} />
          </p>
          <p>JSX は HTML に似ていますが、より厳密で、次の規則があります。<Ref n={3} /></p>
          <h3>規則1：ルート要素は1つ</h3>
          <p>
            複数の要素を返すときは、1つの親タグで包みます。余計な <code>{'<div>'}</code> を増やしたくないときは、空のタグ <code>{'<>...</>'}</code> を使います。これを <Term en="Fragment">フラグメント</Term> と呼び、ブラウザの DOM には痕跡を残しません。なぜ包む必要があるかというと、JSX は関数呼び出しに変換されるため、関数から2つのオブジェクトを配列なしで返せないのと同じ理由です。<Ref n={3} />
          </p>
          <h3>規則2：すべてのタグを閉じる</h3>
          <p>
            HTML では <code>{'<img>'}</code> や <code>{'<li>'}</code> を閉じずに書けますが、JSX では <code>{'<img />'}</code>、<code>{'<li>…</li>'}</code> と必ず閉じます。
          </p>
          <h3>規則3：属性名はおおむね camelCase</h3>
          <p>
            JSX の属性は JavaScript のオブジェクトのキーになるため、ハイフンを含む名前や予約語が使えません。<code>class</code> は <code>className</code>、<code>stroke-width</code> は <code>strokeWidth</code> と書きます。例外として、<code>aria-*</code> と <code>data-*</code> 属性は HTML と同じくハイフン付きのまま書きます。<Ref n={3} />
          </p>
          <h3>規則4：波かっこで JavaScript を埋め込む</h3>
          <p>
            JSX の中では、波かっこ <code>{'{ }'}</code> が JavaScript への「窓」になります。使える場所は2つだけです。タグの中身のテキストとして（<code>{'<h1>{name}</h1>'}</code>）と、属性の <code>=</code> の直後として（<code>{'src={avatar}'}</code>）です。<code>{'src="{avatar}"'}</code> のように引用符で囲むと、ただの文字列として扱われます。波かっこの中には変数だけでなく、関数呼び出しなど任意の式を書けます。<Ref n={4} />
          </p>
          <Code
            lang="tsx"
            code={`
const user = { name: 'Gregorio Y. Zara', avatar: '/gregorio.jpg' }
const today = new Date()

function TodoList() {
  return (
    <>
      <h1>{user.name} の ToDo</h1>
      <p>{today.toLocaleDateString('ja-JP')}</p>
      <img className="avatar" src={user.avatar} alt={user.name} />
      <ul style={{ backgroundColor: 'black', color: 'pink' }}>
        <li>テレビ電話を改良する</li>
      </ul>
    </>
  )
}
`}
          />
          <p>
            <code>{'style={{ ... }}'}</code> の二重の波かっこは特別な構文ではなく、「JSX の波かっこの中にオブジェクトリテラルを書いた」だけです。<code>style</code> のプロパティ名も <code>backgroundColor</code> のように camelCase で書きます。<Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              既存の HTML をコピーして貼り付けても、JSX としてはそのまま動きません。閉じタグや属性名の変換が必要です。間違った属性名を書くと、React はブラウザのコンソールに修正候補を出してくれます。<Ref n={3} /> また、オブジェクトを <code>{'{person}'}</code> のように直接テキストとして埋め込むと「Objects are not valid as a React child」というエラーになります。<code>{'{person.name}'}</code> のように、文字列や数値になる式を書いてください。<Ref n={4} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'jsx-transform',
      title: 'JSX はどう変換されるか',
      body: (
        <>
          <p>
            ブラウザは JSX を理解しないので、誰かが JSX を普通の JavaScript に変換しなければなりません。その「誰か」がビルドツールです。本書では Vite が担当します。変換結果は次のようになります。<Ref n={6} />
          </p>
          <Code
            lang="jsx"
            title="変換前（書くコード）"
            code={`
function App() {
  return <h1 className="t">Hi</h1>
}
`}
          />
          <Code
            lang="js"
            title="変換後（簡略化した出力）"
            code={`
// この import はコンパイラが自動で挿入する（自分では書かない）
import { jsx as _jsx } from 'react/jsx-runtime'

function App() {
  return _jsx('h1', { className: 't', children: 'Hi' })
}
`}
          />
          <p>
            JSX のタグ1つが、<code>_jsx(型, props)</code> という関数呼び出し1つに対応します。小文字のタグは文字列 <code>'h1'</code> に、大文字のタグは関数そのもの（<code>Profile</code>）に変換されます。これが、コンポーネントの規則「名前は大文字で始める」の正体です。<Ref n={5} /> 実際の Vite の出力では、開発中は <code>react/jsx-dev-runtime</code> の <code>jsxDEV</code> が使われ、ファイル位置などの引数が加わります。 この <code>_jsx</code> を実行すると、前々節で見た React 要素オブジェクトが返ります。
          </p>
          <p>
            2020 年以前の React では、JSX は <code>React.createElement('h1', ...)</code> に変換されていました。そのため JSX を使うすべてのファイルに <code>import React from 'react'</code> が必要でした。React 17 で導入された新しい変換（自動ランタイム）では、コンパイラが <code>react/jsx-runtime</code> からの import を自動で挿入するため、JSX のためだけの <code>import React</code> は不要になりました。<Ref n={6} /> Vite の React プラグインは既定でこの自動ランタイムを使います。<Ref n={9} /> TypeScript 側でも <code>tsconfig</code> の <code>"jsx": "react-jsx"</code> がこの方式に対応します。
          </p>
          <Figure n="7-2" title="JSX が画面になるまでの4段階" caption="左から右へ、JSX のソース → ビルド時に関数呼び出しへ変換 → 実行時に React 要素オブジェクト → React DOM が DOM ノードを作る。左2つはビルドツール（Vite）の仕事、右2つは react と react-dom の仕事。模式図。">
            <JsxTransformFigure />
          </Figure>
          <p>
            図から分かるように、JSX は「HTML を JavaScript に混ぜたもの」ではなく、「オブジェクトを作る関数呼び出しの、読みやすい書き方」です。この理解があると、「なぜルート要素が1つでなければならないのか」「なぜ属性名が camelCase なのか」「なぜ波かっこの中に式しか書けないのか」が、すべて JavaScript の制約として説明できます。
          </p>
          <Callout>
            <p>
              <code>_jsx</code> や <code>react/jsx-runtime</code> を自分のコードに直接書くことはありません。公式ブログも「これらの関数はコンパイラの変換からのみ使うべき」としています。<Ref n={6} /> 手で React 要素を作りたい特殊な場面では、今も <code>createElement</code> が使えます。<Ref n={5} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'vite-project',
      title: 'Vite プロジェクトの構成',
      body: (
        <>
          <p>
            JSX の変換、TypeScript の変換、開発サーバー、本番ビルドをまとめて面倒を見るのが <Term en="Vite">Vite</Term> です。Tauri の <code>create-tauri-app</code>（<ChapterLink n={2} />）も内部で Vite のテンプレートを使うので、ここで素の Vite プロジェクトの構成を押さえておくと、Tauri プロジェクトのフロントエンド部分がそのまま読めます。
          </p>
          <p>
            新しいプロジェクトは次のコマンドで作ります。Vite 8.3 時点で Node.js は 20.19 以降または 22.12 以降が必要です（本書は Node.js 24 を前提にしています）。<Ref n={7} />
          </p>
          <Code
            lang="bash"
            code={`
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev   # http://localhost:5173 で開発サーバーが起動する
`}
          />
          <p>
            <code>npm create vite@latest</code> の後ろの <code>--</code> は、npm 自身ではなくテンプレートのコマンドに引数を渡すための区切りです。<code>react-ts</code> は React + TypeScript のテンプレートです。<Ref n={7} /> 生成されるファイルのうち重要なものは次の表のとおりです。<Ref n={8} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ファイル</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>index.html</code></td>
                  <td>プロジェクトのルートに置かれる入口。<code>{'<div id="root">'}</code> と <code>{'<script type="module" src="/src/main.tsx">'}</code> を含む</td>
                </tr>
                <tr>
                  <td><code>src/main.tsx</code></td>
                  <td>React の起動。<code>createRoot</code> で root 要素を取得し、<code>{'<App />'}</code> を描画する</td>
                </tr>
                <tr>
                  <td><code>src/App.tsx</code></td>
                  <td>ルートコンポーネント。アプリの画面はここから始まる木になる</td>
                </tr>
                <tr>
                  <td><code>vite.config.ts</code></td>
                  <td>Vite の設定。<code>plugins: [react()]</code> で JSX 変換と Fast Refresh を有効にする</td>
                </tr>
                <tr>
                  <td><code>tsconfig.app.json</code></td>
                  <td>TypeScript の設定。<code>"jsx": "react-jsx"</code>、<code>"noEmit"</code>、<code>"verbatimModuleSyntax"</code> など。<code>strict</code> は TypeScript の既定値なので書かれていない</td>
                </tr>
                <tr>
                  <td><code>package.json</code></td>
                  <td>依存関係とスクリプト（<code>dev</code>、<code>build</code>、<code>preview</code>）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            他の多くのツールと違い、Vite では <code>index.html</code> が <code>public/</code> の中ではなくプロジェクトのルートにあります。開発中の Vite はサーバーとして動き、<code>index.html</code> を「アプリケーションの入口」として扱います。<code>{'<script type="module">'}</code> が指すファイルを起点に、<code>import</code> をたどってモジュールの木を組み立て、要求されたファイルをその場で変換して返します。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            title="src/main.tsx（テンプレートの内容）"
            code={`
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`}
          />
          <p>
            <code>createRoot(domNode)</code> は、ブラウザの DOM 要素の中に React の「ルート」を作り、その内側の DOM 管理を React に引き渡します。<code>root.render(reactNode)</code> で JSX を描画します。すべてが React で作られたアプリでは、この呼び出しは起動時に1回だけです。<Ref n={10} /> <code>document.getElementById('root')!</code> の末尾の <code>!</code> は、<ChapterLink n={5} /> で学んだ非 null アサーションで、「この要素は必ず存在する」と TypeScript に伝えています。<code>{'<StrictMode>'}</code> は開発時だけ追加の検査を有効にする部品で、<ChapterLink n={9} /> と <ChapterLink n={12} /> で詳しく扱います。
          </p>
          <Figure n="7-3" title="Vite プロジェクトが画面を表示するまでの流れ" caption="index.html が src/main.tsx を ES Module として読み込み、main.tsx が createRoot で App を root 要素に描画する。開発中はこれらのファイルを vite dev サーバーが変換して配信する。">
            <ViteProjectFigure />
          </Figure>
          <p>
            図の上段が示すように、開発中は Vite が <code>.tsx</code> を要求されるたびに変換して返すため、ビルドの待ち時間がありません。ファイルを保存すると、ページ全体を再読み込みせずに該当モジュールだけを差し替えます。これを <Term en="HMR">HMR</Term>（Hot Module Replacement）と呼び、React では <code>@vitejs/plugin-react</code> がコンポーネントの状態を保ったまま差し替える Fast Refresh を有効にします。Fast Refresh が正しく働くためには、「コンポーネントを定義するファイルはコンポーネントだけを export する」ことが推奨されています。<Ref n={9} />
          </p>
          <h3>export と import の流儀</h3>
          <p>
            <ChapterLink n={3} /> で学んだ ES Modules の default export と named export は、どちらもコンポーネントに使えます。1ファイルにコンポーネントが1つなら default export、複数の部品や値を出すなら named export にするのが一般的です。<Ref n={11} /> どちらを選ぶにせよ、<code>export default () =&gt; {'{...}'}</code> のような無名のコンポーネントは避けます。デバッグ時に名前が表示されなくなるからです。<Ref n={11} />
          </p>
          <p>
            本番用のビルドは <code>npm run build</code> です。テンプレートの <code>build</code> スクリプトは <code>tsc -b &amp;&amp; vite build</code> で、まず TypeScript の型検査を行い（<code>noEmit</code> なので出力はしない）、それから Vite が最適化した静的ファイルを <code>dist/</code> に出力します。<Ref n={8} /> Tauri はこの <code>dist/</code> をアプリに同梱します（<ChapterLink n={33} />）。
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
              Tsumugi のフロントエンドは、この章で見た構成そのものです。<code>examples/tsumugi/</code> の <code>index.html</code> → <code>src/main.tsx</code> → <code>src/App.tsx</code> という入口の連なりは Vite のテンプレートと同じで、<code>vite.config.ts</code> に Tauri 向けの設定が少し足されるだけです（<ChapterLink n={33} />）。
            </p>
            <p>
              「状態から画面を記述する」という考え方は、第6部の至るところに現れます。サイドバーのページツリー（<ChapterLink n={43} />）は「ページの配列」という状態から木を描き、検索ダイアログ（<ChapterLink n={46} />）は「検索語と結果の配列」から一覧を描きます。簡易データベースの表ビュー（<ChapterLink n={47} />）も、行と列の状態から表を描くだけで、セルを1つずつ書き換えるコードは出てきません。設定画面のテーマ切り替え（<ChapterLink n={50} />）も、「現在のテーマ」という状態を変えるだけで画面全体が追従します。
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
            <li>命令的な UI は要素ごとに「どう変えるか」を命令し、要素が増えると組み合わせが爆発する。宣言的な UI は「状態がこうなら画面はこう」とだけ書き、DOM の更新は React に任せる。</li>
            <li>コンポーネントは JSX を返す関数。名前は大文字で始め、ファイルの最上位で定義し、入れ子にしない。</li>
            <li>コンポーネントが返すのは React 要素という軽量なオブジェクト（<code>type</code>、<code>props</code>、<code>key</code> など）で、DOM ノードではない。</li>
            <li>JSX の規則：ルートは1つ（フラグメント可）、タグは必ず閉じる、属性は camelCase（<code>aria-*</code>、<code>data-*</code> を除く）、波かっこで式を埋め込む。</li>
            <li>JSX はビルド時に <code>_jsx()</code> の呼び出しへ変換され、実行時に React 要素になる。自動ランタイムのおかげで <code>import React</code> は不要。</li>
            <li>Vite プロジェクトは <code>index.html</code> → <code>main.tsx</code> → <code>App.tsx</code> の順に読み込まれ、開発中は HMR でモジュール単位の差し替えが行われる。</li>
          </ul>
          <p>次章では、コンポーネントを組み合わせる仕組みである props と、リスト・条件付き描画の書き方を学びます。</p>
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
      note: '命令的と宣言的の対比、タクシーのたとえ、フォームの例の根拠。',
    },
    {
      title: 'Your First Component',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/your-first-component',
      accessed: '2026-11-08',
      note: 'コンポーネントの定義、大文字始まりの規則、定義を入れ子にしない根拠。',
    },
    {
      title: 'Writing Markup with JSX',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/writing-markup-with-jsx',
      accessed: '2026-11-08',
      note: 'JSX の規則（単一ルート、閉じタグ、camelCase、フラグメント）の根拠。',
    },
    {
      title: 'JavaScript in JSX with Curly Braces',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces',
      accessed: '2026-11-08',
      note: '波かっこが使える場所、二重波かっこ、オブジェクトを子に渡せない点の根拠。',
    },
    {
      title: 'createElement – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react/createElement',
      accessed: '2026-11-08',
      note: 'React 要素オブジェクトの構造（type, props, key, ref）、不変性、大文字・小文字タグの変換の根拠。',
    },
    {
      title: 'Introducing the New JSX Transform',
      publisher: 'React Blog (legacy.reactjs.org)',
      url: 'https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html',
      accessed: '2026-11-08',
      note: '自動ランタイムによる変換結果（react/jsx-runtime の _jsx）と import React 不要の根拠。',
    },
    {
      title: 'Getting Started – Vite',
      publisher: 'Vite (vite.dev)',
      url: 'https://vite.dev/guide/',
      accessed: '2026-11-08',
      version: 'Vite 8.3',
      note: 'npm create vite の手順、Node.js の要件、index.html がルートにあり入口となる点、dev/build/preview の根拠。',
    },
    {
      title: 'create-vite template-react-ts',
      publisher: 'vitejs/vite (GitHub)',
      url: 'https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts',
      accessed: '2026-11-08',
      note: 'テンプレートの index.html、src/main.tsx、vite.config.ts、tsconfig.app.json、package.json の内容の根拠。',
    },
    {
      title: '@vitejs/plugin-react README',
      publisher: 'vitejs/vite-plugin-react (GitHub)',
      url: 'https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react',
      accessed: '2026-11-08',
      note: '既定で自動 JSX ランタイムを使うこと、Fast Refresh、コンポーネントのみを export する推奨の根拠。',
    },
    {
      title: 'createRoot – React Reference',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/reference/react-dom/client/createRoot',
      accessed: '2026-11-08',
      note: 'createRoot と root.render の役割、起動時に1回だけ呼ぶ点の根拠。',
    },
    {
      title: 'Importing and Exporting Components',
      publisher: 'React (react.dev)',
      url: 'https://react.dev/learn/importing-and-exporting-components',
      accessed: '2026-11-08',
      note: 'default export と named export の使い分け、無名コンポーネントを避ける根拠。',
    },
    {
      title: 'React v19',
      publisher: 'React Blog (react.dev)',
      url: 'https://react.dev/blog/2024/12/05/react-19',
      accessed: '2026-11-08',
      version: 'React 19',
      note: 'React 19 で ref が関数コンポーネントの通常の props として渡せるようになったことの根拠。',
    },
  ],
}

export default chapter
