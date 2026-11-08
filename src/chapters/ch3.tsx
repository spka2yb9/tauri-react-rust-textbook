import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 3-1 Promise の状態遷移 ---------- */
function PromiseStateFigure() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="Promise の3つの状態。左の pending から、成功すると右上の fulfilled へ、失敗すると右下の rejected へ移る。fulfilled と rejected をまとめて settled と呼び、一度 settled になると状態は変わらない">
      <defs>
        <marker id="arrow3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="40" y="80" width="160" height="60" rx="30" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="120" y="105" textAnchor="middle" fontWeight="600">pending</text>
        <text x="120" y="125" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">未決定（初期状態）</text>

        <rect x="400" y="20" width="180" height="60" rx="30" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="490" y="45" textAnchor="middle" fontWeight="600">fulfilled</text>
        <text x="490" y="65" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">成功。値を持つ</text>

        <rect x="400" y="140" width="180" height="60" rx="30" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="490" y="165" textAnchor="middle" fontWeight="600">rejected</text>
        <text x="490" y="185" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">失敗。理由（エラー）を持つ</text>

        <path d="M200,100 L395,55" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3a)" />
        <text x="290" y="62" textAnchor="middle" fontSize="12">resolve(値)</text>
        <path d="M200,120 L395,165" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3a)" />
        <text x="290" y="162" textAnchor="middle" fontSize="12">reject(理由) / throw</text>

        <rect x="385" y="8" width="210" height="204" rx="12" fill="none" stroke="var(--fig-muted)" strokeDasharray="6 4" />
        <text x="490" y="118" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">settled（確定）：以後変わらない</text>
      </g>
    </svg>
  )
}

/* ---------- 図 3-2 イベントループ ---------- */
function EventLoopFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="イベントループの模式図。左にコールスタック、右上にマイクロタスクキュー、右下にタスクキューがある。スタックが空になるとまずマイクロタスクキューを空になるまで処理し、その後タスクキューから1つ取り出して実行する。Promise の then は マイクロタスクに、setTimeout やクリックイベントはタスクに入る">
      <defs>
        <marker id="arrow3b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* コールスタック */}
        <text x="130" y="30" textAnchor="middle" fontSize="15" fontWeight="600">コールスタック</text>
        <rect x="40" y="45" width="180" height="200" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <rect x="55" y="195" width="150" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="130" y="218" textAnchor="middle">main（スクリプト）</text>
        <rect x="55" y="155" width="150" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="130" y="178" textAnchor="middle">load()</text>
        <rect x="55" y="115" width="150" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="130" y="138" textAnchor="middle" fill="var(--fig-muted)">（次に積まれる関数）</text>
        <text x="130" y="265" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">今実行中の関数の積み重ね</text>
        <text x="130" y="283" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">空になるまで中断されない</text>

        {/* マイクロタスクキュー */}
        <text x="460" y="30" textAnchor="middle" fontSize="15" fontWeight="600">マイクロタスクキュー</text>
        <rect x="320" y="45" width="280" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <rect x="335" y="60" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="395" y="85" textAnchor="middle" fontSize="12">then のコールバック</text>
        <rect x="465" y="60" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="525" y="85" textAnchor="middle" fontSize="12">await の続き</text>

        {/* タスクキュー */}
        <text x="460" y="150" textAnchor="middle" fontSize="15" fontWeight="600">タスクキュー</text>
        <rect x="320" y="165" width="280" height="70" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <rect x="335" y="180" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="395" y="205" textAnchor="middle" fontSize="12">setTimeout の関数</text>
        <rect x="465" y="180" width="120" height="40" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="525" y="205" textAnchor="middle" fontSize="12">click イベント</text>

        {/* 矢印 */}
        <path d="M320,80 C270,80 250,100 225,125" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow3b)" />
        <text x="262" y="72" textAnchor="middle" fontSize="12" fill="var(--fig-accent)">1. 先に全部</text>
        <path d="M320,200 C270,200 250,170 225,145" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3b)" />
        <text x="262" y="222" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">2. 次に1つ</text>
      </g>
      <text x="320" y="315" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：スタックが空になるたびに 1 → 2 を繰り返す。描画の更新は 2 の合間に行われる</text>
    </svg>
  )
}

/* ---------- 図 3-3 await の前後の実行順 ---------- */
function AwaitSequenceFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="async 関数 main と非同期処理の時間軸。main は await に到達するまで同期的に実行され、await で呼び出し元へ制御を返す。処理が完了すると main の続きがマイクロタスクとして再開される">
      <defs>
        <marker id="arrow3c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <text x="120" y="30" textAnchor="middle" fontWeight="600">呼び出し元</text>
        <text x="320" y="30" textAnchor="middle" fontWeight="600">async function main</text>
        <text x="530" y="30" textAnchor="middle" fontWeight="600">非同期処理（fetch など）</text>
        <line x1="120" y1="40" x2="120" y2="270" stroke="var(--fig-line)" strokeDasharray="4 4" />
        <line x1="320" y1="40" x2="320" y2="270" stroke="var(--fig-line)" strokeDasharray="4 4" />
        <line x1="530" y1="40" x2="530" y2="270" stroke="var(--fig-line)" strokeDasharray="4 4" />

        <path d="M120,60 L315,60" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3c)" />
        <text x="218" y="52" textAnchor="middle" fontSize="12">main() を呼ぶ</text>
        <rect x="312" y="60" width="16" height="50" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="345" y="85" fontSize="12">await までは同期的に実行</text>
        <path d="M328,100 L525,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3c)" />
        <text x="430" y="114" textAnchor="middle" fontSize="12">開始を依頼</text>
        <rect x="522" y="100" width="16" height="90" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <path d="M312,115 L125,115" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow3c)" />
        <text x="218" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-accent)">await：制御を戻す</text>
        <rect x="112" y="115" width="16" height="70" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="30" y="155" fontSize="12" fill="var(--fig-muted)">他の処理や</text>
        <text x="30" y="171" fontSize="12" fill="var(--fig-muted)">描画が進む</text>

        <path d="M522,190 L328,190" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3c)" />
        <text x="430" y="182" textAnchor="middle" fontSize="12">完了（値）</text>
        <rect x="312" y="190" width="16" height="50" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="345" y="215" fontSize="12">続きがマイクロタスクで再開</text>
        <path d="M312,245 L125,245" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow3c)" />
        <text x="218" y="262" textAnchor="middle" fontSize="12">Promise が確定する</text>
      </g>
      <text x="320" y="292" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">縦線は時間の流れ（上から下）。塗りつぶしの帯はそのレーンが実行中の区間</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 3,
  part: 2,
  title: 'モダン JavaScript：モジュールと非同期処理',
  summary:
    'React と TypeScript、そして Tauri の IPC を理解するために欠かせない JavaScript の2つの仕組みを学びます。ファイルを分けて組み合わせる ES Modules と、時間のかかる処理を待つための Promise、async/await、そしてそれらを動かしているイベントループです。',
  goals: [
    'export と import でモジュールを分割し、組み合わせられる',
    'Promise の3つの状態と、then/catch/finally の連鎖を説明できる',
    'async/await を使って非同期処理を読みやすく書ける',
    'イベントループ、タスク、マイクロタスクの関係を図で説明できる',
    '非同期処理のエラーを try/catch と catch() の両方で扱える',
  ],
  prerequisites: [1],
  sections: [
    {
      id: 'intro',
      title: 'なぜモジュールと非同期処理から始めるのか',
      body: (
        <>
          <p>
            本書の読者は、変数や関数、配列やオブジェクトといった JavaScript の基礎を知っている前提です。しかし React のコードを読み始めると、冒頭の <code>import</code> と、あちこちに現れる <code>async</code> や <code>await</code> でつまずくことが少なくありません。この2つは文法としては小さいものの、背後にある「ファイルをどう組み合わせるか」「時間のかかる処理をどう待つか」という考え方は、JavaScript の基礎の範囲を少し超えています。
          </p>
          <p>
            Tauri ではこの2つが特に重要です。フロントエンドから Rust の関数を呼ぶ <code>invoke</code> は Promise を返し、<code>@tauri-apps/api</code> というモジュールから import して使います。<Ref n={9} /> つまり、Tauri アプリのフロントエンドはすべて「モジュール」と「非同期処理」の上に成り立っています。この章では、その土台を固めます。
          </p>
        </>
      ),
    },
    {
      id: 'es-modules',
      title: 'ES Modules：ファイルを分けて組み合わせる',
      body: (
        <>
          <p>
            <Term en="ES Modules">ES Modules</Term>（ESM）は、JavaScript の言語仕様に組み込まれたモジュールの仕組みです。1つのファイルを1つの<Term en="module">モジュール</Term>として扱い、必要なものだけを <code>export</code> で外に公開し、別のファイルから <code>import</code> で取り込みます。MDN の説明では、モジュールで宣言した変数や関数はそのモジュールのスコープに閉じ、明示的に export しない限り外からは見えません。<Ref n={1} />
          </p>
          <Code
            lang="js"
            title="square.js"
            code={`
// 名前付きエクスポート：名前を付けて公開する
export const name = "square";

export function area(length) {
  return length * length;
}

// デフォルトエクスポート：モジュールに1つだけ置ける
export default function describe(length) {
  return \`\${name}: \${area(length)}\`;
}
`}
          />
          <Code
            lang="js"
            title="main.js"
            code={`
// 名前付きは波かっこで、デフォルトは好きな名前で受け取る
import describe, { name, area } from "./square.js";

console.log(name);        // "square"
console.log(area(3));     // 9
console.log(describe(3)); // "square: 9"
`}
          />
          <p>
            名前付きエクスポートとデフォルトエクスポートは1つのモジュールに共存できます。<Ref n={1} /> import した値は読み取り専用の「窓」のようなもので、import 側から書き換えることはできません。名前が衝突するときは <code>as</code> で別名を付け、すべてをまとめて受け取りたいときは <code>import * as Square from "./square.js"</code> と書きます。<Ref n={1} />
          </p>
          <h3>ブラウザでの読み込み</h3>
          <p>
            HTML からモジュールを読み込むには、<code>script</code> 要素に <code>type="module"</code> を付けます。モジュールのスクリプトは自動的に strict モードになり、通常のスクリプトと違って既定で遅延（defer）実行されます。つまり HTML の解析を止めず、解析が終わってから実行されます。<Ref n={1} /> <Ref n={2} />
          </p>
          <Code
            lang="html"
            code={`
<script type="module" src="main.js"></script>
`}
          />
          <p>
            実際の開発では、ブラウザに直接 ESM を読ませることは少なく、Vite のようなビルドツールがモジュールの依存関係を解決してまとめます（<ChapterLink n={7} />）。それでも「1ファイル1モジュール、export したものだけが見える」という規則は同じです。
          </p>
          <h3>動的 import</h3>
          <p>
            <code>import()</code> を関数のように呼ぶと、モジュールを必要になった時点で読み込めます。戻り値は Promise で、モジュールの名前空間オブジェクトで解決されます。<Ref n={1} /> これは次の節で学ぶ Promise の、最初の実例でもあります。React の <code>lazy</code>（<ChapterLink n={14} />）はこの仕組みの上に作られています。
          </p>
          <Code
            lang="js"
            code={`
const mod = await import("./square.js");
console.log(mod.area(4)); // 16
`}
          />
        </>
      ),
    },
    {
      id: 'promise',
      title: 'Promise：「あとで届く値」を表す',
      body: (
        <>
          <p>
            ネットワークからデータを取る、ファイルを読む、Rust 側の関数を呼ぶ。こうした処理は結果が返るまでに時間がかかります。JavaScript は結果を待っている間も他の処理を止めないため、「結果が出たら何をするか」をあらかじめ渡しておく必要があります。古くはコールバック関数を渡していましたが、処理が連なるとネストが深くなる「コールバック地獄」に陥りました。<Ref n={4} />
          </p>
          <p>
            <Term en="Promise">Promise</Term> は、MDN の定義では「非同期処理の最終的な完了（または失敗）と、その結果の値を表すオブジェクト」です。<Ref n={3} /> 値がまだ分からない時点で「値の代理」として受け取り、値が確定したときの処理を後から登録できます。Promise は次の3つの状態のどれかにあります。<Ref n={3} />
          </p>
          <Figure n="3-1" title="Promise の状態遷移" caption="pending から fulfilled か rejected のどちらかに一度だけ移る。この2つをまとめて settled と呼ぶ。settled になった Promise の状態は変わらない。">
            <PromiseStateFigure />
          </Figure>
          <ul>
            <li><Term en="pending">pending</Term>：初期状態。まだ成功も失敗もしていない。</li>
            <li><Term en="fulfilled">fulfilled</Term>：処理が成功し、値を持っている。</li>
            <li><Term en="rejected">rejected</Term>：処理が失敗し、理由（通常は Error）を持っている。</li>
          </ul>
          <p>
            図のとおり、fulfilled と rejected をまとめて <Term en="settled">settled</Term> と呼びます。一度 settled になった Promise が別の状態に移ることはありません。<Ref n={3} /> この「一度だけ、どちらかに決まる」という性質が、後の処理を安心して登録できる根拠です。
          </p>
          <h3>then、catch、finally</h3>
          <p>
            結果を受け取る処理は <code>then</code> で登録します。失敗したときの処理は <code>catch</code>、成否にかかわらず最後に行う処理は <code>finally</code> です。<code>catch(f)</code> は <code>then(null, f)</code> の省略形にすぎません。<Ref n={4} />
          </p>
          <Code
            lang="js"
            code={`
fetch("/api/pages")
  .then((res) => res.json())         // 成功したら JSON に変換（これも Promise を返す）
  .then((pages) => render(pages))    // 変換が終わったら描画
  .catch((err) => showError(err))    // どこかで失敗したらここに来る
  .finally(() => hideSpinner());     // 成否にかかわらず実行
`}
          />
          <p>
            重要なのは、<code>then</code> が元の Promise とは別の新しい Promise を返すことです。<Ref n={4} /> ハンドラが値を返せば新しい Promise はその値で fulfilled になり、Promise を返せばその結果に追従し、例外を投げれば rejected になります。<Ref n={3} /> だから <code>then</code> を数珠つなぎにでき、鎖のどこで起きたエラーも末尾の <code>catch</code> まで流れてきます。
          </p>
          <Callout kind="warn">
            <p>
              よくある誤りは、<code>then</code> の中で Promise を返し忘れることです。<code>.then((url) =&gt; {'{'} fetch(url); {'}'})</code> のように <code>return</code> を書かないと、次の <code>then</code> は <code>fetch</code> の完了を待たずに <code>undefined</code> を受け取ります。MDN は、then のコールバックからは常に Promise を返すことが重要だと述べています。<Ref n={4} />
            </p>
          </Callout>
          <h3>複数の Promise をまとめる</h3>
          <p>
            複数の非同期処理を同時に走らせて、まとめて待ちたいときは <code>Promise.all</code> を使います。MDN の定義では、すべてが fulfilled になれば fulfilled、どれか1つでも rejected になれば rejected です。<Ref n={3} /> 失敗したものも含めて全部の結果が欲しいときは <code>Promise.allSettled</code>、最初に settled になったものだけを使いたいときは <code>Promise.race</code> を使います。<Ref n={3} />
          </p>
          <Code
            lang="js"
            code={`
const [pages, settings] = await Promise.all([
  fetch("/api/pages").then((r) => r.json()),
  fetch("/api/settings").then((r) => r.json()),
]);
`}
          />
        </>
      ),
    },
    {
      id: 'async-await',
      title: 'async/await：同期的に読める非同期処理',
      body: (
        <>
          <p>
            <code>then</code> の連鎖は強力ですが、条件分岐やループが絡むと読みにくくなります。<Term en="async/await">async/await</Term> は、Promise を使った処理を同期的なコードのように書くための構文です。MDN の説明では、<code>async</code> 関数は「必ず Promise を返し」、関数の中で <code>await</code> を使えるようにします。戻り値が Promise でなければ、自動的に Promise で包まれます。<Ref n={5} />
          </p>
          <Code
            lang="js"
            code={`
async function loadPages() {
  const res = await fetch("/api/pages"); // Promise が settled になるまで、この関数の実行を中断
  const pages = await res.json();
  return pages;                          // 呼び出し元には Promise<配列> として返る
}
`}
          />
          <p>
            <code>await</code> は、右辺の Promise が settled になるまでその関数の実行を中断し、fulfilled なら値を取り出して式の値にします。rejected なら、その場所で例外が投げられたのと同じになります。<Ref n={5} /> ここで大切なのは、中断されるのはその <code>async</code> 関数だけで、プログラム全体は止まらないことです。MDN はこれを「<code>await</code> はプログラム全体を止めるのではなく、その値に依存する部分だけを止める」と表現しています。<Ref n={4} />
          </p>
          <Figure n="3-2" title="await の前後で制御がどう移るか" caption="main は最初の await まで同期的に進み、そこで Promise を返して呼び出し元に制御を戻す。非同期処理が完了すると、main の続きがマイクロタスクとして再開される。">
            <AwaitSequenceFigure />
          </Figure>
          <p>
            図から読み取れるのは、<code>async</code> 関数の中身が「最初の <code>await</code> まで」と「それ以降」に分かれることです。MDN によれば、最初の <code>await</code> までは同期的に実行され、<code>await</code> 以降のコードは <code>then</code> のコールバックの中にあるのと同じと考えられます。<Ref n={5} /> つまり <code>async/await</code> は Promise の上に作られた書き方であり、Promise を置き換えるものではありません。<Ref n={4} />
          </p>
          <h3>直列と並行</h3>
          <p>
            <code>await</code> を並べると、処理は1つずつ順番に待ちます。互いに依存しない処理なら、先に全部開始してから <code>Promise.all</code> でまとめて待つほうが速く終わります。MDN の例では、2秒と1秒の処理を順に <code>await</code> すると3秒かかり、同時に開始すると2秒で終わります。<Ref n={5} />
          </p>
          <Code
            lang="js"
            code={`
// 直列：合計 3 秒
const a = await wait(2000);
const b = await wait(1000);

// 並行：合計 2 秒
const [c, d] = await Promise.all([wait(2000), wait(1000)]);
`}
          />
        </>
      ),
    },
    {
      id: 'event-loop',
      title: 'イベントループ：非同期処理を動かす仕組み',
      body: (
        <>
          <p>
            ここまで「結果が出たらコールバックが呼ばれる」と説明してきましたが、誰がいつ呼ぶのでしょうか。その答えが<Term en="event loop">イベントループ</Term>です。MDN の実行モデルの説明では、JavaScript の実行環境は「コールスタック」「ヒープ」「ジョブのキュー」を持ち、キューからジョブを1つ取り出して実行し、終わったら次を取り出す、という繰り返しでプログラムが進みます。<Ref n={6} />
          </p>
          <Figure n="3-3" title="イベントループの構造" caption="模式図。コールスタックが空になると、まずマイクロタスクキューを空になるまで処理し、次にタスクキューから1つ取り出す。Promise のコールバックはマイクロタスク、setTimeout やイベントはタスクとして積まれる。">
            <EventLoopFigure />
          </Figure>
          <p>
            図の左の<Term en="call stack">コールスタック</Term>は、いま実行中の関数の積み重ねです。1つのジョブはスタックが空になるまで実行され、途中で他のジョブに割り込まれることはありません。MDN はこれを「各ジョブは他のジョブが処理される前に完全に処理される」と表現しています。<Ref n={6} /> この性質は予測しやすい反面、1つのジョブが長引くと、クリックやスクロールといったユーザー操作に応答できなくなります。<Ref n={6} />
          </p>
          <p>
            図の右には2種類のキューがあります。HTML のイベントループは、ジョブを<Term en="task">タスク</Term>と<Term en="microtask">マイクロタスク</Term>に分け、マイクロタスクのほうを優先します。マイクロタスクキューは、タスクキューから次を取り出す前に空になるまで処理されます。<Ref n={6} /> Promise のコールバックはマイクロタスクキューに入り、<code>setTimeout</code> のコールバックはタスクキューに入ります。<Ref n={4} /> <Ref n={7} />
          </p>
          <Code
            lang="js"
            code={`
console.log("1");
setTimeout(() => console.log("4: タスク"), 0);
Promise.resolve().then(() => console.log("3: マイクロタスク"));
console.log("2");
// 出力順: 1, 2, 3: マイクロタスク, 4: タスク
`}
          />
          <p>
            このコードは、図の規則をそのまま確かめるものです。まずスクリプト全体が1つのタスクとして実行され、1 と 2 が出ます。その間に <code>then</code> のコールバックがマイクロタスクに、<code>setTimeout</code> のコールバックがタスクに積まれます。スクリプトが終わってスタックが空になると、まずマイクロタスクが処理されて 3 が出て、その後にタスクが取り出されて 4 が出ます。MDN が示す同じ構造の例でも、タイムアウトのコールバックより先にマイクロタスクが実行されます。<Ref n={7} /> <code>setTimeout</code> の遅延 0 が「即座に」ではなく「次の機会に」を意味するのはこのためです。<Ref n={8} />
          </p>
          <Callout>
            <p>
              マイクロタスクの中でさらにマイクロタスクを積むと、それも次のタスクより先に処理されます。MDN は、再帰的にマイクロタスクを積むとイベントループが延々とマイクロタスクを処理し続ける危険があると警告しています。<Ref n={7} /> 普段の開発で意識する場面は少ないものの、「Promise の処理は描画より先に走る」という感覚は持っておいてください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'error-handling',
      title: '非同期処理のエラー処理',
      body: (
        <>
          <p>
            非同期処理のエラーは、同期処理の <code>try/catch</code> ではそのままでは捕まえられません。例外が投げられるのが、<code>try</code> ブロックを抜けた後だからです。Promise の世界では、失敗は rejected という状態で表され、2つの方法で受け取れます。
          </p>
          <h3>then の鎖では catch を末尾に置く</h3>
          <p>
            MDN は、Promise の鎖ではエラーが鎖を伝わって最初の <code>catch</code> に届くので、末尾に <code>catch</code> を1つ置けば前段のすべてのエラーを扱えると説明しています。Promise は、投げられた例外やプログラミング上の誤りも含めて「すべてのエラーを捕まえる」点で、コールバック方式の欠点を解消しています。<Ref n={4} />
          </p>
          <h3>async/await では try/catch が使える</h3>
          <p>
            <code>await</code> は rejected な Promise を例外として投げ直すので、<code>async</code> 関数の中では普通の <code>try/catch</code> が使えます。<Ref n={5} /> 同期処理と同じ書き方で済むのが、async/await の大きな利点です。
          </p>
          <Code
            lang="js"
            code={`
async function loadOrFallback() {
  try {
    const res = await fetch("/api/pages");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("読み込みに失敗:", err);
    return [];                  // 既定値で続行する
  } finally {
    hideSpinner();
  }
}
`}
          />
          <p>
            <code>async</code> 関数の中で例外が投げられ、捕まえられなかった場合、その関数が返す Promise は rejected になります。<Ref n={5} /> つまりエラーは呼び出し元へ Promise として伝わり、呼び出し元が <code>await</code> していれば、そこでまた例外として現れます。
          </p>
          <h3>誰も受け取らなかったエラー</h3>
          <p>
            rejected になったのに <code>catch</code> も <code>try/catch</code> もない Promise があると、ブラウザは <code>unhandledrejection</code> イベントを発生させます。MDN はこれを「Promise が拒否されたが、拒否ハンドラが存在しないときに送られる」と説明しています。<Ref n={4} /> 開発中はコンソールに「Uncaught (in promise)」として現れます。関数を呼ぶだけで <code>await</code> も <code>catch</code> も付けない「浮いた Promise」は、この原因になりやすいので注意が必要です。
          </p>
          <Callout kind="warn">
            <p>
              MDN は、互いに独立した2つの Promise を順番に <code>await</code> する書き方の落とし穴も指摘しています。後に <code>await</code> する Promise が先に rejected になると、まだ誰も待っていない時点で失敗するため、呼び出し側に <code>catch</code> があっても未処理の拒否として報告されます。同時に走らせるなら <code>Promise.all</code> でまとめて待つのが安全です。<Ref n={5} />
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
              Tsumugi のフロントエンドは、Rust 側のコマンドを呼ぶ関数を <code>src/lib/ipc.ts</code> という1つのモジュールに集め、各画面はそこから import します。Tauri の <code>invoke</code> は Promise を返し、Rust 側が <code>Err</code> を返すと rejected になります。<Ref n={9} /> ページの読み込みや保存はすべて <code>await invoke(...)</code> の形で書き、失敗は <code>try/catch</code> で受けてトースト表示に回します（<ChapterLink n={34} />、<ChapterLink n={50} />）。
            </p>
            <p>
              エディタの自動保存では、入力のたびに保存せず一定時間待ってから保存します（<ChapterLink n={44} />）。これは <code>setTimeout</code> とタスクキューの性質をそのまま使った仕組みです。
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
            <li>ES Modules は1ファイル1モジュール。<code>export</code> したものだけが <code>import</code> で見える。モジュールは strict モードで、<code>type="module"</code> のスクリプトは既定で遅延実行される。</li>
            <li>Promise は pending から fulfilled か rejected へ一度だけ移る。<code>then</code> は新しい Promise を返すので鎖にでき、エラーは末尾の <code>catch</code> に流れる。</li>
            <li><code>async</code> 関数は必ず Promise を返し、<code>await</code> はその関数だけを中断する。独立した処理は <code>Promise.all</code> で並行に待つ。</li>
            <li>イベントループは、スタックが空になるたびにマイクロタスクをすべて処理してからタスクを1つ取り出す。Promise はマイクロタスク、<code>setTimeout</code> とイベントはタスク。</li>
            <li>非同期のエラーは <code>catch()</code> か <code>try/catch</code> で受ける。受け取り手のない拒否は <code>unhandledrejection</code> になる。</li>
          </ul>
          <p>次章では、JavaScript が操作する相手である DOM と、ブラウザが画面を描く流れ、そして Tauri が使う WebView とは何かを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'JavaScript modules',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
      accessed: '2026-11-08',
      note: 'export/import の構文、モジュールスコープと strict モード、type="module"、動的 import の根拠。',
    },
    {
      title: '<script>: The Script element',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script',
      accessed: '2026-11-08',
      note: 'モジュールスクリプトが既定で遅延実行されることの根拠。',
    },
    {
      title: 'Promise',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      accessed: '2026-11-08',
      note: 'Promise の定義、3つの状態と settled、then の戻り値の規則、Promise.all などの定義の根拠。',
    },
    {
      title: 'Using promises',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
      accessed: '2026-11-08',
      note: 'コールバック地獄、鎖とエラー処理、return の忘れ、マイクロタスクとタスク、unhandledrejection、async/await との関係の根拠。',
    },
    {
      title: 'async function',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
      accessed: '2026-11-08',
      note: 'async 関数が常に Promise を返すこと、await の意味、最初の await までが同期的であること、直列と並行の違い、try/catch の根拠。',
    },
    {
      title: 'JavaScript execution model',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model',
      accessed: '2026-11-08',
      note: 'コールスタック、ヒープ、ジョブキュー、run-to-completion、タスクとマイクロタスクの優先順位の根拠。',
    },
    {
      title: 'In depth: Microtasks and the JavaScript runtime environment',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
      accessed: '2026-11-08',
      note: 'マイクロタスクが次のタスクの前に空になるまで処理されること、Promise がマイクロタスクを使うこと、再帰的なマイクロタスクの警告の根拠。',
    },
    {
      title: 'Window: setTimeout() method',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout',
      accessed: '2026-11-08',
      note: '遅延 0 が「次のイベントサイクルで実行」を意味することの根拠。',
    },
    {
      title: 'Calling Rust from the Frontend',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: 'invoke が Promise を返し、コマンドが Err を返すと reject されることの根拠。',
    },
  ],
}

export default chapter
