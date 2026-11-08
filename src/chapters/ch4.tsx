import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 4-1 DOM ツリー ---------- */
function DomTreeFigure() {
  const node = (x: number, y: number, label: string, kind: 'doc' | 'el' | 'text') => {
    const fill = kind === 'doc' ? 'var(--fig-box5)' : kind === 'el' ? 'var(--fig-box3)' : 'var(--fig-box)'
    return (
      <g key={`${x}-${y}`}>
        <rect x={x - 55} y={y - 16} width="110" height="32" rx={kind === 'text' ? 16 : 6} fill={fill} stroke="var(--fig-line)" />
        <text x={x} y={y + 5} textAnchor="middle" fontSize="13">{label}</text>
      </g>
    )
  }
  const edge = (x1: number, y1: number, x2: number, y2: number) => (
    <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1 + 16} x2={x2} y2={y2 - 16} stroke="var(--fig-line)" strokeWidth="1.5" />
  )
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="簡単な HTML を DOM ツリーとして描いた図。document を根に html 要素があり、その下に head と body、head の下に title、body の下に h1 と p がある（p の下の a 要素は図では省略している）。要素の下にはテキストノードがぶら下がる">
      {edge(320, 40, 320, 100)}
      {edge(320, 100, 180, 160)}
      {edge(320, 100, 460, 160)}
      {edge(180, 160, 180, 220)}
      {edge(460, 160, 360, 220)}
      {edge(460, 160, 560, 220)}
      {edge(180, 220, 180, 280)}
      {edge(360, 220, 360, 280)}
      {edge(560, 220, 560, 280)}
      {node(320, 40, 'document', 'doc')}
      {node(320, 100, '<html>', 'el')}
      {node(180, 160, '<head>', 'el')}
      {node(460, 160, '<body>', 'el')}
      {node(180, 220, '<title>', 'el')}
      {node(360, 220, '<h1>', 'el')}
      {node(560, 220, '<p>', 'el')}
      {node(180, 280, '"Tsumugi"', 'text')}
      {node(360, 280, '"ページ一覧"', 'text')}
      {node(560, 280, '"本文…"', 'text')}
      <g fontSize="12" fill="var(--fig-muted)">
        <rect x="20" y="20" width="14" height="14" rx="3" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="40" y="32">Document</text>
        <rect x="20" y="44" width="14" height="14" rx="3" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="40" y="56">要素ノード</text>
        <rect x="20" y="68" width="14" height="14" rx="7" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="40" y="80">テキストノード</text>
      </g>
    </svg>
  )
}

/* ---------- 図 4-2 イベントの伝播 ---------- */
function EventPropagationFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="ボタンをクリックしたときのイベント伝播。window、document、body、div、button が入れ子で描かれ、左側の下向き矢印がキャプチャ段階、右側の上向き矢印がバブリング段階を示す。button が target">
      <defs>
        <marker id="arrow4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="170" y="20" width="300" height="280" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="40" textAnchor="middle">window</text>
        <rect x="195" y="55" width="250" height="230" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="75" textAnchor="middle">document</text>
        <rect x="220" y="90" width="200" height="180" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="110" textAnchor="middle">body</text>
        <rect x="245" y="125" width="150" height="130" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="320" y="145" textAnchor="middle">div（親）</text>
        <rect x="270" y="165" width="100" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="195" textAnchor="middle" fontWeight="600">button</text>
        <text x="320" y="215" textAnchor="middle" fontSize="12">target</text>

        {/* capture */}
        <path d="M100,40 L100,190" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow4a)" />
        <text x="100" y="26" textAnchor="middle" fontSize="12">1. キャプチャ</text>
        <text x="100" y="215" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">外→内</text>
        <text x="100" y="233" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">capture: true の</text>
        <text x="100" y="249" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">リスナーが動く</text>
        {/* bubble */}
        <path d="M540,190 L540,40" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow4a)" />
        <text x="540" y="26" textAnchor="middle" fontSize="12">3. バブリング</text>
        <text x="540" y="215" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">内→外</text>
        <text x="540" y="233" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">既定のリスナー</text>
        <text x="540" y="249" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">はここで動く</text>
        <text x="320" y="250" textAnchor="middle" fontSize="12">2. target で発火</text>
      </g>
      <text x="320" y="314" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">破線：キャプチャ段階　実線：バブリング段階。stopPropagation() はそこから先への伝播を止める</text>
    </svg>
  )
}

/* ---------- 図 4-3 レンダリングの流れ ---------- */
function RenderPipelineFigure() {
  const boxes = [
    { x: 20, y: 60, w: 110, label: 'HTML', sub: '解析', fill: 'var(--fig-box3)' },
    { x: 20, y: 150, w: 110, label: 'CSS', sub: '解析', fill: 'var(--fig-box3)' },
    { x: 160, y: 60, w: 110, label: 'DOM', sub: '構造の木', fill: 'var(--fig-box)' },
    { x: 160, y: 150, w: 110, label: 'CSSOM', sub: 'スタイルの木', fill: 'var(--fig-box)' },
    { x: 300, y: 105, w: 110, label: 'レンダーツリー', sub: '表示する要素だけ', fill: 'var(--fig-box4)' },
    { x: 440, y: 105, w: 80, label: 'レイアウト', sub: '位置と大きさ', fill: 'var(--fig-box2)' },
    { x: 540, y: 105, w: 80, label: 'ペイント', sub: '描画', fill: 'var(--fig-box2)' },
  ]
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="ブラウザが画面を描くまでの流れ。HTML を解析して DOM、CSS を解析して CSSOM を作り、両者を合わせてレンダーツリーを作る。レンダーツリーからレイアウトで位置と大きさを決め、ペイントで描画し、最後に合成する。JavaScript は HTML の解析を止めることがあり、DOM を書き換えると再レイアウトと再描画が起きる">
      <defs>
        <marker id="arrow4b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {boxes.map((b) => (
          <g key={b.label}>
            <rect x={b.x} y={b.y} width={b.w} height="56" rx="8" fill={b.fill} stroke="var(--fig-line)" />
            <text x={b.x + b.w / 2} y={b.y + 24} textAnchor="middle" fontWeight="600" fontSize="13">{b.label}</text>
            <text x={b.x + b.w / 2} y={b.y + 43} textAnchor="middle" fill="var(--fig-muted)">{b.sub}</text>
          </g>
        ))}
        <path d="M130,88 L156,88" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <path d="M130,178 L156,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <path d="M270,88 L296,120" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <path d="M270,178 L296,146" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <path d="M410,133 L436,133" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <path d="M520,133 L536,133" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <text x="620" y="88" textAnchor="end" fill="var(--fig-muted)">ペイント後に合成（compositing）</text>

        <rect x="20" y="20" width="110" height="26" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="75" y="38" textAnchor="middle">JavaScript</text>
        <path d="M75,46 L75,56" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow4b)" />
        <text x="140" y="36" fill="var(--fig-muted)">script は HTML 解析を止めうる</text>
        <path d="M215,220 C215,240 480,240 480,170" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#arrow4b)" />
        <text x="330" y="254" textAnchor="middle" fill="var(--fig-accent)">DOM の変更 → 再レイアウト（reflow）と再描画</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 4,
  part: 2,
  title: 'ブラウザと DOM の基礎',
  summary:
    'JavaScript が画面を操作する相手である DOM の木構造、ユーザー操作がイベントとして伝わる仕組み、ブラウザが HTML と CSS から画面を描くまでの流れを学びます。最後に、Tauri が画面の表示に使う WebView が何であり、ブラウザとどう違うのかを整理します。',
  goals: [
    'DOM が木構造であること、ノードと要素の関係を説明できる',
    'DOM API で要素を取得・作成・変更できる',
    'イベントのキャプチャ、target、バブリングの3段階を図で説明できる',
    'HTML と CSS から DOM、CSSOM、レンダーツリー、レイアウト、ペイントへ進む流れを説明できる',
    'WebView とは何か、OS ごとに何が違うかを説明できる',
  ],
  prerequisites: [3],
  sections: [
    {
      id: 'intro',
      title: 'JavaScript は何を操作しているのか',
      body: (
        <>
          <p>
            <ChapterLink n={3} /> では JavaScript そのものの仕組みを扱いました。この章では、JavaScript が「画面」をどう扱うかに目を向けます。ブラウザの中で JavaScript がボタンの文字を変えたり、クリックに反応したりできるのは、ブラウザが HTML をオブジェクトの集まりに変換し、JavaScript から触れるようにしているからです。その集まりが <Term en="DOM">DOM</Term>（Document Object Model）です。
          </p>
          <p>
            React を使うと DOM を直接触る機会は減りますが、React 自身は最終的に DOM を操作して画面を作っています。React の「仮想 DOM と差分更新」「合成イベント」「ref で DOM を参照する」といった話題（<ChapterLink n={9} />、<ChapterLink n={13} />）は、どれもこの章の内容が前提です。また Tauri のアプリは WebView の中で動くので、WebView が「ブラウザのどの部分」なのかを知っておくと、OS ごとの違いを理解しやすくなります。
          </p>
        </>
      ),
    },
    {
      id: 'dom-tree',
      title: 'DOM の木構造',
      body: (
        <>
          <p>
            MDN は DOM を「文書の構造（たとえば Web ページを表す HTML）をメモリ上に表現することで、Web ページとスクリプトやプログラミング言語をつなぐもの」と定義しています。DOM は文書を論理的な木として表し、木の各枝の先が<Term en="node">ノード</Term>で、ノードはオブジェクトです。<Ref n={1} /> ブラウザは HTML を解析して DOM ツリーを作り、それを使って文書を表示します。<Ref n={1} />
          </p>
          <Code
            lang="html"
            code={`
<!doctype html>
<html>
  <head><title>Tsumugi</title></head>
  <body>
    <h1>ページ一覧</h1>
    <p>本文…<a href="/about">詳細</a></p>
  </body>
</html>
`}
          />
          <p>
            この HTML がどんな木になるかを図で見ます。要素とテキストの関係、そして根にある <code>document</code> に注目してください。
          </p>
          <Figure n="4-1" title="HTML から作られる DOM ツリー" caption="模式図。document を根として、要素ノードが入れ子になり、文字はテキストノードとして要素の子になる。実際の DOM ツリーは改行などの空白文字もテキストノードとして保持する。">
            <DomTreeFigure />
          </Figure>
          <p>
            図から分かるように、文書内のすべてのものはノードです。HTML 文書では、ノードは要素ノードのほかに、テキストノードや属性ノードでもありえます。<Ref n={1} /> 要素は <code>Element</code> インターフェースと、より基本的な <code>Node</code> インターフェースを実装しており、HTML の要素はさらに <code>HTMLElement</code> とその派生（<code>HTMLTableElement</code> など）で拡張されます。<Ref n={1} /> この階層が、後で TypeScript で DOM を扱うときの型（<code>HTMLInputElement</code> など）に直接対応します。
          </p>
          <p>
            MDN は、DOM が JavaScript の言語仕様の一部ではなく、Web サイトを作るための Web API であることを強調しています。DOM は特定の言語に依存しないよう設計されており、JavaScript 以外の言語からも同じ構造にアクセスできます。<Ref n={1} /> Node.js に <code>document</code> が存在しないのはこのためで、DOM はあくまでブラウザ（と WebView）が提供するものです。
          </p>
          <p>
            DOM の操作で最もよく使う2つのオブジェクトが <code>window</code> と <code>document</code> です。MDN の言葉を借りると、<code>window</code> は「ブラウザのようなもの」を表し、<code>document</code> は「文書そのものの根」です。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'dom-api',
      title: 'DOM API で要素を扱う',
      body: (
        <>
          <p>
            DOM のメソッドを使うと、木を手続き的に操作できます。MDN は「文書の構造、スタイル、内容を変更できる」と説明しています。<Ref n={1} /> 基本は、要素を見つける、作る、つなぐ、書き換える、外す、の5つです。
          </p>
          <Code
            lang="js"
            code={`
// 見つける：CSS セレクタで最初の1つ、または ID で
const list = document.querySelector("#page-list");
const title = document.getElementById("title");

// 作る → 内容を入れる → 木につなぐ
const item = document.createElement("li");
item.textContent = "新しいページ";
list.appendChild(item);

// 書き換える
title.textContent = "Tsumugi";

// 外す
list.removeChild(item);
`}
          />
          <p>
            MDN の例でも、<code>createElement</code> で要素を作り、<code>createTextNode</code> や <code>textContent</code> で文字を入れ、<code>appendChild</code> で木に追加する、という流れが示されています。<Ref n={1} /> 作っただけの要素は木につながるまで画面に現れません。「木に入っているかどうか」が表示の有無を決めるという感覚は、React の「マウント」「アンマウント」を理解するときにも役立ちます。
          </p>
          <p>
            ここで気づいてほしいのは、この書き方が「何をどの順で行うか」を逐一指示している、つまり命令的であることです。表示したい状態が変わるたびに、どの要素を足し、どれを消し、どの文字を書き換えるかを自分で管理しなければなりません。要素が増えるとこの管理は急に難しくなります。React はこの問題を「宣言的」な書き方で解決します（<ChapterLink n={7} />）。その違いを実感するためにも、命令的な DOM 操作の形を一度見ておくことに意味があります。
          </p>
        </>
      ),
    },
    {
      id: 'events',
      title: 'イベント：操作に反応する',
      body: (
        <>
          <p>
            <Term en="event">イベント</Term>は、MDN の定義では「プログラムしているシステムの中で起きる出来事で、コードが反応できるようにシステムが知らせてくれるもの」です。クリック、キー入力、フォーム送信、ページの読み込み完了などがイベントです。イベントを受け取る方法として MDN が推奨するのは <code>addEventListener()</code> です。<Ref n={2} />
          </p>
          <Code
            lang="js"
            code={`
const btn = document.querySelector("#save");

function onSave(event) {
  console.log(event.type);   // "click"
  console.log(event.target); // クリックされた要素
}

btn.addEventListener("click", onSave);
// 不要になったら同じ関数を渡して外す
btn.removeEventListener("click", onSave);
`}
          />
          <p>
            ハンドラには<Term en="event object">イベントオブジェクト</Term>が自動的に渡され、イベントの種類や発生した要素などの情報が入っています。<code>target</code> は常に「イベントが起きた要素」を指します。<Ref n={2} /> <code>addEventListener</code> は同じ要素の同じイベントに複数のハンドラを登録できますが、<code>btn.onclick = f</code> のようなプロパティ方式では1つしか登録できず、後から代入すると上書きされます。<Ref n={2} /> HTML 属性に書く <code>onclick="..."</code> の形は、MDN が「使うべきでない」と明言している古い書き方です。<Ref n={2} />
          </p>
          <p>
            ブラウザが既定で行う動作を止めたいときは <code>event.preventDefault()</code> を呼びます。MDN の例では、フォームの <code>submit</code> イベントで入力の不足を見つけたときに送信を止めています。<Ref n={2} /> リンクの遷移を止める、Tauri アプリで右クリックメニューを出さない、といった場面でも使います。
          </p>
        </>
      ),
    },
    {
      id: 'propagation',
      title: 'イベントの伝わり方：キャプチャとバブリング',
      body: (
        <>
          <p>
            ボタンをクリックしたとき、イベントはボタンだけで起きるのではありません。MDN の説明では、イベントは「クリックされた最も内側の要素から上へ泡のように上がっていく」ので、ボタン、その親の <code>div</code>、さらに <code>body</code> の順にハンドラが呼ばれます。これを <Term en="event bubbling">バブリング</Term>と呼びます。<Ref n={3} /> 反対に、最も外側の要素から target に向かって降りていく段階が <Term en="event capture">キャプチャ</Term>です。<Ref n={3} /> 次の図は、この2つの段階と target の位置関係を示します。
          </p>
          <Figure n="4-2" title="クリックイベントの伝播" caption="外側から target へ降りるキャプチャ段階（破線）、target での発火、target から外側へ上がるバブリング段階（実線）の順に進む。既定のリスナーはバブリング段階で呼ばれる。">
            <EventPropagationFigure />
          </Figure>
          <p>
            図のとおり、リスナーは既定ではバブリング段階で呼ばれます。キャプチャ段階で呼んでほしいときは、<code>addEventListener</code> の第3引数に <code>{'{ capture: true }'}</code> を渡します。MDN の例では、キャプチャで登録した <code>body</code> と <code>div</code> のハンドラが先に動き、ボタンの通常のハンドラが最後に動きます。<Ref n={3} /> MDN は「ほとんどのイベントハンドラは既定でバブリング段階に登録され、たいていはそのほうが理にかなっている」とも述べています。<Ref n={3} />
          </p>
          <h3>target と currentTarget</h3>
          <p>
            伝播を理解すると、イベントオブジェクトの2つのプロパティの違いが分かります。<code>target</code> はイベントが最初に起きた要素で、伝播の間ずっと同じです。<code>currentTarget</code> は「いま実行中のハンドラが付いている要素」で、ハンドラごとに変わります。<Ref n={3} />
          </p>
          <h3>伝播を止める、伝播を利用する</h3>
          <p>
            <code>event.stopPropagation()</code> を呼ぶと、それより外側の要素へのバブリングが止まります。MDN の例は、動画をクリックしたときに背後の枠の「閉じる」処理まで動いてしまう問題を、これで解決しています。<Ref n={3} /> 逆に、伝播を積極的に利用する技法が <Term en="event delegation">イベント委譲</Term>です。たくさんの子要素のそれぞれにリスナーを付ける代わりに、親に1つだけ付けて、子で起きたイベントがバブリングで上がってくるのを受け取ります。<Ref n={3} />
          </p>
          <Code
            lang="js"
            code={`
// 100 個の li にそれぞれ付けるのではなく、親の ul に 1 つ付ける
document.querySelector("#page-list").addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (li) openPage(li.dataset.id);
});
`}
          />
          <p>
            React も内部ではこの委譲の考え方を使っていて、個々の要素ではなくルート要素でイベントをまとめて受けています。<ChapterLink n={9} /> でイベントハンドラを書くとき、<code>e.stopPropagation()</code> が必要になる場面があるのは、React の中でもバブリングが生きているからです。
          </p>
        </>
      ),
    },
    {
      id: 'rendering',
      title: '画面が描かれるまでの流れ',
      body: (
        <>
          <p>
            DOM を変更すると画面が変わります。ではブラウザは、HTML と CSS からどうやって画面を描いているのでしょうか。MDN の解説に沿って、主要な段階を追います。<Ref n={4} />
          </p>
          <Figure n="4-3" title="HTML と CSS から画面が描かれるまで" caption="模式図。HTML の解析で DOM、CSS の解析で CSSOM ができ、両者からレンダーツリーが作られる。レイアウトで位置と大きさを決め、ペイントで描画し、合成で重ね合わせる。DOM を変更すると再レイアウトと再描画が起きる。">
            <RenderPipelineFigure />
          </Figure>
          <ol className="steps">
            <li>解析。ブラウザは受け取った HTML をトークンに分け、木を組み立てて DOM を作ります。CSS も同様に解析され、CSSOM というもう1つの木になります。2つは独立したデータ構造です。<Ref n={4} /></li>
            <li>レンダーツリー。DOM と CSSOM を組み合わせて、画面に表示される要素だけの木を作ります。<code>head</code> の中身や <code>display: none</code> の要素は含まれません。一方、<code>visibility: hidden</code> の要素は場所を取るので含まれます。<Ref n={4} /></li>
            <li>レイアウト。レンダーツリーの各ノードの寸法と位置を決めます。後から起きる再計算を<Term en="reflow">リフロー</Term>と呼びます。<Ref n={4} /></li>
            <li>ペイント。文字、色、枠線、影、画像など、要素の見た目を画面に描きます。<Ref n={4} /></li>
            <li>合成。重なり合う複数のレイヤーに分けて描かれた内容を、正しい順序で重ね合わせます。<Ref n={4} /></li>
          </ol>
          <p>
            図で注目してほしいのは、JavaScript から DOM へ伸びる矢印と、DOM の変更からレイアウトへ戻る破線です。MDN によれば、<code>async</code> や <code>defer</code> の付いていない <code>script</code> 要素は HTML の解析を止めます。<Ref n={4} /> また、リフローが起きると再描画と再合成も起きます。<Ref n={4} /> DOM をむやみに書き換えると、この後半の工程が何度も走ることになります。
          </p>
          <p>
            もう1つ、MDN が示す数字を覚えておいてください。滑らかなスクロールやアニメーションのためには、スタイル計算、リフロー、ペイントを含むメインスレッドの処理を 16.67 ミリ秒以内に収める必要があります。<Ref n={4} /> <ChapterLink n={3} /> で見たとおり、JavaScript のジョブはメインスレッドで実行され、長いジョブはユーザー操作への応答を妨げます。描画も同じスレッドを使うため、重い JavaScript は画面の更新も止めてしまいます。React の並行レンダリング（<ChapterLink n={14} />）は、この制約の中で画面の応答性を保つための仕組みです。
          </p>
        </>
      ),
    },
    {
      id: 'webview',
      title: 'WebView とは何か',
      body: (
        <>
          <p>
            ここまでの話は「ブラウザ」を前提にしてきましたが、Tauri のアプリはブラウザの中では動きません。動くのは <Term en="WebView">WebView</Term> の中です。WebView は、OS が提供する「Web ページを表示する部品」で、ブラウザからアドレスバーやタブ、ブックマークなどの UI を取り除き、HTML の描画と JavaScript の実行を行うエンジン部分だけを、アプリに埋め込める形にしたものです。Tauri の Core プロセスは、OS の WebView ライブラリを使って WebView プロセスを起動し、そこで HTML、CSS、JavaScript を動かします。<Ref n={5} />
          </p>
          <p>
            重要なのは、WebView がアプリに同梱されるのではなく、OS のものを実行時に使う点です。Tauri の公式資料は、WebView ライブラリは実行時に動的にリンクされるので実行ファイルが小さくなる一方、プラットフォームの違いを考慮する必要があると説明しています。<Ref n={5} /> OS ごとの WebView は次のとおりです。<Ref n={6} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>WebView</th>
                  <th>エンジン</th>
                  <th>更新のされ方</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Windows</td>
                  <td>Microsoft Edge WebView2</td>
                  <td>Chromium</td>
                  <td>WebView2 自身が自動更新するため、比較的新しい Chromium が使える</td>
                </tr>
                <tr>
                  <td>macOS、iOS</td>
                  <td>WKWebView</td>
                  <td>WebKit</td>
                  <td>OS の更新と一緒に更新される。サポートが切れた OS では更新されない</td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td>webkitgtk</td>
                  <td>WebKit</td>
                  <td>ディストリビューションのパッケージに依存する</td>
                </tr>
                <tr>
                  <td>Android</td>
                  <td>Android System WebView</td>
                  <td>Chromium</td>
                  <td>端末の WebView プロバイダに依存し、端末ごとに異なりうる</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            この表から言えることは2つあります。1つは、同じ HTML と CSS でも、Windows では Chromium、macOS では WebKit で描かれるため、対応している機能や細かな描画が異なりうることです。Tauri の公式資料は、macOS と iOS では対応する Safari のバージョンを基準に caniuse.com で機能の対応状況を確認するよう勧めています。<Ref n={6} /> もう1つは、ユーザーの OS のバージョンによって WebView の新しさが変わることです。古い macOS では古い WebKit が使われます。<Ref n={6} />
          </p>
          <Callout kind="warn">
            <p>
              ブラウザの開発者ツールで動作確認をするときは、macOS なら Safari、Windows なら Edge で確認すると、実際の WebView に近い結果が得られます。Chrome だけで確認して macOS で崩れる、という事故を避けられます。Tauri 自体の開発者ツールの開き方は <ChapterLink n={40} /> で扱います。
            </p>
          </Callout>
          <p>
            一方で、WebView の中で動く DOM、イベント、レンダリングの仕組みは、この章で学んだブラウザのものとまったく同じです。WebView の中の JavaScript から OS の機能（ファイルや通知など）に触れられないのもブラウザと同じで、そこを Rust 側との IPC で補うのが Tauri です（<ChapterLink n={33} />）。
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
              Tsumugi のエディタである BlockNote は、内部で DOM と <code>contenteditable</code> を直接扱うライブラリです。ブロックのドラッグ＆ドロップやスラッシュメニューは、DOM のイベント伝播の上に作られています（<ChapterLink n={44} />）。カスタムブロックを作るとき（<ChapterLink n={45} />）や、キーボードショートカットを全体で受けるとき（<ChapterLink n={50} />）には、<code>target</code> の判定や <code>preventDefault</code> が直接必要になります。
            </p>
            <p>
              また、Tsumugi はデスクトップでは WebKit（macOS）か Chromium（Windows）、モバイルでは WKWebView か Android WebView で表示されます。画像の表示（asset プロトコル）やセーフエリアの扱い（<ChapterLink n={55} />）は、この WebView の違いを前提に設計します。
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
            <li>DOM は文書をノードの木として表す Web API で、JavaScript 言語の一部ではない。要素は <code>Node</code> と <code>Element</code>、HTML では <code>HTMLElement</code> の階層を持つ。</li>
            <li><code>querySelector</code>、<code>createElement</code>、<code>appendChild</code>、<code>textContent</code> で木を操作できる。この書き方は命令的で、React はこれを宣言的に置き換える。</li>
            <li>イベントは <code>addEventListener</code> で受ける。<code>target</code> は発生元、<code>currentTarget</code> はハンドラの付いた要素。</li>
            <li>イベントはキャプチャ、target、バブリングの順に伝わる。<code>stopPropagation</code> で止め、イベント委譲で活用する。</li>
            <li>ブラウザは DOM と CSSOM からレンダーツリーを作り、レイアウト、ペイント、合成の順に描く。DOM の変更はリフローと再描画を起こす。</li>
            <li>WebView は OS が提供する描画エンジン部分で、Windows は Chromium 系の WebView2、macOS と iOS は WKWebView、Linux は webkitgtk、Android は System WebView。</li>
          </ul>
          <p>次章では、ここまでの JavaScript に型を加える TypeScript の基本を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Introduction to the DOM',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
      accessed: '2026-11-08',
      note: 'DOM の定義、木構造とノード、Node と Element の階層、window と document、DOM が Web API であること、createElement と appendChild の例の根拠。',
    },
    {
      title: 'Introduction to events',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events',
      accessed: '2026-11-08',
      note: 'イベントの定義、addEventListener と removeEventListener、イベントハンドラプロパティ、インライン属性の非推奨、イベントオブジェクトと target、preventDefault の根拠。',
    },
    {
      title: 'Event bubbling',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling',
      accessed: '2026-11-08',
      note: 'バブリング、キャプチャと capture オプション、target と currentTarget、stopPropagation、イベント委譲の根拠。',
    },
    {
      title: 'Populating the page: how browsers work',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work',
      accessed: '2026-11-08',
      note: '解析、DOM と CSSOM、script による解析の停止、レンダーツリー、レイアウトとリフロー、ペイント、合成、16.67 ミリ秒の根拠。',
    },
    {
      title: 'Process Model',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/process-model/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'WebView プロセスが OS の WebView ライブラリを使うこと、動的リンクとプラットフォーム差の根拠。',
    },
    {
      title: 'Webview Versions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/webview-versions/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'OS ごとの WebView、更新のされ方、Safari バージョンと caniuse による確認の根拠。',
    },
  ],
}

export default chapter
