import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 6-1 型引数の置き換え ---------- */
function GenericSubstitutionFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="ジェネリック型 Box<T> が型引数によって具体的な型になる様子。上に型の雛形 Box<T> があり、T に string を入れると contents が string の Box、T に Page[] を入れると contents が Page[] の Box になる。関数 identity<T> では呼び出しの引数から T が推論される">
      <defs>
        <marker id="arrow6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="200" y="20" width="240" height="64" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="45" textAnchor="middle" fontWeight="600">interface Box&lt;T&gt;</text>
        <text x="320" y="68" textAnchor="middle">{'{ contents: T }'}</text>
        <text x="320" y="104" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">T は「あとで決める型」の置き場所</text>

        <path d="M260,84 L150,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6a)" />
        <text x="170" y="108" textAnchor="middle" fontSize="12">T = string</text>
        <rect x="30" y="142" width="240" height="64" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="150" y="167" textAnchor="middle" fontWeight="600">Box&lt;string&gt;</text>
        <text x="150" y="190" textAnchor="middle">{'{ contents: string }'}</text>

        <path d="M380,84 L490,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6a)" />
        <text x="470" y="108" textAnchor="middle" fontSize="12">T = Page[]</text>
        <rect x="370" y="142" width="240" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="490" y="167" textAnchor="middle" fontWeight="600">Box&lt;Page[]&gt;</text>
        <text x="490" y="190" textAnchor="middle">{'{ contents: Page[] }'}</text>
      </g>
      <text x="320" y="240" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">雛形は1つ、具体的な型は使う場所ごとに作られる。関数では引数から T が推論されることが多い</text>
    </svg>
  )
}

/* ---------- 図 6-2 判別可能なユニオン ---------- */
function DiscriminatedUnionFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="判別可能なユニオン Shape の図。共通プロパティ kind の値 circle と square によって、Circle と Square のどちらかに分かれる。switch 文の各 case の中では対応する型のプロパティだけが使え、どの case にも当てはまらない default では型が never になる">
      <defs>
        <marker id="arrow6b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="190" y="20" width="260" height="50" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="42" textAnchor="middle" fontWeight="600">shape: Shape = Circle | Square</text>
        <text x="320" y="61" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">共通の目印 kind を持つ</text>

        <path d="M320,70 L320,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6b)" />
        <rect x="220" y="98" width="200" height="40" rx="20" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="123" textAnchor="middle">switch (shape.kind)</text>

        <path d="M220,118 L150,118 L150,166" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6b)" />
        <text x="175" y="110" textAnchor="middle" fontSize="12">"circle"</text>
        <rect x="40" y="168" width="220" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="150" y="192" textAnchor="middle" fontWeight="600">shape: Circle</text>
        <text x="150" y="214" textAnchor="middle" fontSize="12">radius が使える</text>

        <path d="M420,118 L490,118 L490,166" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6b)" />
        <text x="465" y="110" textAnchor="middle" fontSize="12">"square"</text>
        <rect x="380" y="168" width="220" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="490" y="192" textAnchor="middle" fontWeight="600">shape: Square</text>
        <text x="490" y="214" textAnchor="middle" fontSize="12">sideLength が使える</text>

        <path d="M320,138 L320,166" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow6b)" />
        <rect x="275" y="168" width="90" height="64" rx="8" fill="none" stroke="var(--fig-line)" strokeDasharray="3 3" />
        <text x="320" y="192" textAnchor="middle" fontWeight="600">default</text>
        <text x="320" y="214" textAnchor="middle" fontSize="12">shape: never</text>
      </g>
      <text x="320" y="262" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">新しい種類を Shape に足して case を書き忘れると、default の never への代入がエラーになる</text>
    </svg>
  )
}

/* ---------- 図 6-3 コンパイル時と実行時 ---------- */
function CompileRuntimeFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="コンパイル時と実行時を左右に分けた図。左のコンパイル時には型があり tsc が検査する。右の実行時には型が消え JavaScript だけが動く。外部から入ってくる値（JSON、ファイル、IPC の応答）は実行時に初めて分かるので、境界で検証してから型付きの世界に入れる">
      <defs>
        <marker id="arrow6c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="20" width="290" height="200" rx="10" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="165" y="46" textAnchor="middle" fontSize="15" fontWeight="600">コンパイル時</text>
        <text x="165" y="70" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">tsc が検査。型はここにだけある</text>
        <rect x="40" y="90" width="250" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="115" textAnchor="middle">interface Page {'{ id: string; ... }'}</text>
        <rect x="40" y="140" width="250" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="165" textAnchor="middle">invoke&lt;Page[]&gt;("list_pages")</text>
        <text x="165" y="205" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">「Page[] が返るはず」という約束</text>

        <rect x="330" y="20" width="290" height="200" rx="10" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="475" y="46" textAnchor="middle" fontSize="15" fontWeight="600">実行時</text>
        <text x="475" y="70" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">型は消え、JavaScript だけが動く</text>
        <rect x="350" y="90" width="250" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="475" y="115" textAnchor="middle">invoke("list_pages")</text>
        <rect x="350" y="140" width="250" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="475" y="165" textAnchor="middle" fontSize="12">実際に届く値：IPC の応答（JSON）</text>
        <text x="475" y="205" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">約束どおりかは、ここで初めて分かる</text>

        <path d="M310,120 L330,120" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow6c)" />
        <text x="320" y="245" textAnchor="middle" fontSize="12">型を消す（tsc / Vite）</text>

        <rect x="170" y="258" width="300" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-accent)" strokeWidth="2" />
        <text x="320" y="277" textAnchor="middle" fontWeight="600">境界での検証</text>
        <text x="320" y="294" textAnchor="middle" fontSize="12">unknown として受け、型ガードで確かめてから使う</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 6,
  part: 2,
  title: 'TypeScript 実践：ジェネリクスと型の設計',
  summary:
    '型を部品として組み合わせる技法を学びます。ジェネリクスで「型をあとで決める」仕組み、ユーティリティ型による既存の型の加工、判別可能なユニオンによる状態の表現、any の代わりに使う unknown、ライブラリの型定義ファイル、そして型が消える実行時との境界をどう守るかを扱います。',
  goals: [
    'ジェネリックな関数と型を書き、型引数の推論と制約を使える',
    'Partial、Pick、Omit、Record などのユーティリティ型で既存の型から新しい型を作れる',
    '判別可能なユニオンと never による網羅性検査で、状態の取りこぼしをコンパイル時に見つけられる',
    'any と unknown の違いを説明し、外部から来た値を安全に扱える',
    '型定義ファイル（.d.ts）と @types の役割を説明できる',
    'コンパイル時と実行時の境界を意識し、IPC や JSON の値を検証する設計ができる',
  ],
  prerequisites: [5],
  sections: [
    {
      id: 'intro',
      title: '型を「設計」するということ',
      body: (
        <>
          <p>
            <ChapterLink n={5} /> では、値に型を付けて誤りを見つける使い方を学びました。この章では一歩進んで、型そのものを部品として組み合わせる技法を扱います。Handbook は TypeScript の型システムが「他の型を使って型を表現できる」ことを強調しており、ジェネリクス、<code>keyof</code>、<code>typeof</code>、インデックスアクセス、条件型、マップ型、テンプレートリテラル型といった道具を挙げています。<Ref n={6} /> 本章では、このうち日常的に使うものに絞ります。
          </p>
          <p>
            これらの道具が必要になるのは、アプリの中で「同じ構造だが中身の型が違う」ものが繰り返し現れるからです。ページの一覧も、データベースの行の一覧も、Rust 側から返ってくる「結果かエラーか」も、形は同じで中身が違います。型を設計するとは、この繰り返しを1つの雛形にまとめ、使う場所ごとに具体化することです。
          </p>
        </>
      ),
    },
    {
      id: 'generics',
      title: 'ジェネリクス：型をあとで決める',
      body: (
        <>
          <p>
            受け取った値をそのまま返す関数を考えます。引数を <code>number</code> にすると文字列に使えず、<code>any</code> にすると「戻り値が何型だったか」の情報が失われます。Handbook はこの問題を<Term en="generics">ジェネリクス</Term>の動機として挙げています。<Ref n={1} />
          </p>
          <Code
            lang="ts"
            code={`
function identity<Type>(arg: Type): Type {
  return arg;
}

const a = identity<string>("hello"); // 型引数を明示
const b = identity(42);               // 42 から Type = number と推論される
`}
          />
          <p>
            <code>&lt;Type&gt;</code> の部分が<Term en="type variable">型変数</Term>で、Handbook の説明では「値ではなく型に対して働く特別な変数」です。<Ref n={1} /> 呼び出し側が渡した型を捕まえ、戻り値の型に使い回せます。型引数は明示もできますが、多くの場合は引数から推論されます。<Ref n={1} /> 次の図は、型変数が具体的な型に置き換わる様子を、型にジェネリクスを使った例で示します。
          </p>
          <Figure n="6-1" title="ジェネリック型の型引数が置き換わる" caption="Box<T> は雛形で、T は置き場所。Box<string> と書けば contents が string の型が、Box<Page[]> と書けば contents が Page[] の型ができる。関数のジェネリクスでは、引数から T が推論されることが多い。">
            <GenericSubstitutionFigure />
          </Figure>
          <p>
            Handbook は、ジェネリックな <code>Box&lt;Type&gt;</code> を「本物の型の雛形で、<code>Type</code> は別の型に置き換えられる置き場所」と説明しています。<Ref n={3} /> <code>Array&lt;string&gt;</code> や <code>Promise&lt;number&gt;</code> も同じ仕組みで、<code>string[]</code> は <code>Array&lt;string&gt;</code> の省略形にすぎません。<Ref n={3} />
          </p>
          <h3>制約：型変数に条件を付ける</h3>
          <p>
            型変数はどんな型にもなりうるので、関数の中では「どんな型でも許される操作」しかできません。<code>arg.length</code> と書くとエラーになります。<code>extends</code> で<Term en="generic constraint">制約</Term>を付けると、「<code>length</code> を持つ型なら何でも」のように条件を絞れます。<Ref n={1} />
          </p>
          <Code
            lang="ts"
            code={`
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("abc", "de");      // OK: string には length がある
longest([1, 2], [3]);      // OK: 配列にも
longest(10, 20);           // エラー: number に length はない

// keyof と組み合わせると「そのオブジェクトに実在するキー」だけを受け取れる
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const page = { id: "p1", title: "はじめに" };
getProperty(page, "title"); // OK
getProperty(page, "body");  // エラー: "body" は "id" | "title" にない
`}
          />
          <p>
            <code>keyof T</code> は、<code>T</code> のプロパティ名をリテラル型のユニオンにしたものです。<Ref n={1} /> <code>K extends keyof T</code> という制約を付けることで、存在しないプロパティ名をコンパイル時に弾けます。
          </p>
          <h3>よいジェネリクスの書き方</h3>
          <p>
            Handbook は、ジェネリックな関数を書くときの指針を3つ挙げています。可能なら制約ではなく型変数そのものを使うこと、型変数はできるだけ少なくすること、そして1か所にしか現れない型変数は本当に必要か考え直すことです。<Ref n={2} /> 型変数は「2つの値の対応関係」を表すためのものなので、対応する相手がなければジェネリクスにする意味がありません。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'utility-types',
      title: 'ユーティリティ型：既存の型を加工する',
      body: (
        <>
          <p>
            TypeScript には、既存の型から新しい型を作るための<Term en="utility types">ユーティリティ型</Term>が標準で用意されています。いずれもジェネリックな型で、どこでも import なしに使えます。<Ref n={4} /> よく使うものを表にまとめます。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>型</th>
                  <th>作られる型</th>
                  <th>典型的な用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Partial&lt;T&gt;</code></td>
                  <td>すべてのプロパティを省略可能にした型</td>
                  <td>更新用の差分オブジェクト</td>
                </tr>
                <tr>
                  <td><code>Required&lt;T&gt;</code></td>
                  <td>すべてのプロパティを必須にした型</td>
                  <td><code>Partial</code> の逆</td>
                </tr>
                <tr>
                  <td><code>Readonly&lt;T&gt;</code></td>
                  <td>すべてのプロパティを読み取り専用にした型</td>
                  <td>変更を禁止したい設定値</td>
                </tr>
                <tr>
                  <td><code>Record&lt;K, T&gt;</code></td>
                  <td>キーが <code>K</code>、値が <code>T</code> のオブジェクト型</td>
                  <td>ID から値への対応表</td>
                </tr>
                <tr>
                  <td><code>Pick&lt;T, K&gt;</code></td>
                  <td><code>T</code> から <code>K</code> のプロパティだけを選んだ型</td>
                  <td>一覧表示に必要な項目だけ</td>
                </tr>
                <tr>
                  <td><code>Omit&lt;T, K&gt;</code></td>
                  <td><code>T</code> から <code>K</code> を除いた型</td>
                  <td>作成時にまだ無い <code>id</code> を除く</td>
                </tr>
                <tr>
                  <td><code>ReturnType&lt;F&gt;</code></td>
                  <td>関数型 <code>F</code> の戻り値の型</td>
                  <td>関数から型を逆算する</td>
                </tr>
                <tr>
                  <td><code>Awaited&lt;T&gt;</code></td>
                  <td><code>Promise</code> を再帰的に剥がした型</td>
                  <td><code>await</code> の結果の型</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code
            lang="ts"
            code={`
interface Page {
  id: string;
  title: string;
  parentId: string | null;
  content: string;
  updatedAt: string;
}

type NewPage = Omit<Page, "id" | "updatedAt">;      // 作成時の入力。id と updatedAt はまだ無い
type PageUpdate = Partial<Pick<Page, "title" | "content" | "parentId">>; // 更新できる項目だけ省略可能に
type PageSummary = Pick<Page, "id" | "title">;        // サイドバーに必要な項目だけ
type PagesById = Record<string, Page>;               // id → Page の対応表

function updatePage(page: Page, patch: PageUpdate): Page {
  return { ...page, ...patch };
}
`}
          />
          <p>
            Handbook の定義では、<code>Partial&lt;Type&gt;</code> は「<code>Type</code> のすべてのプロパティを省略可能にした型を構築し、与えられた型のすべての部分集合を表す」、<code>Omit&lt;Type, Keys&gt;</code> は「<code>Type</code> からすべてのプロパティを取り、<code>Keys</code> を取り除いた型を構築する」ものです。<Ref n={4} /> 重要なのは、こうして元の型から派生させておけば、<code>Page</code> にプロパティを足したときに派生した型も自動で追従することです。同じ形を2回書かないことが、型の設計の基本です。
          </p>
          <p>
            <code>typeof</code> を型の位置に書くと、値から型を取り出せます。<Ref n={6} /> たとえば <code>const ALIGNS = ["left", "right"] as const</code> に対して <code>typeof ALIGNS[number]</code> と書くと、<code>"left" | "right"</code> が得られます。配列の実体と型を一か所で管理できる、よく使う技法です。
          </p>
        </>
      ),
    },
    {
      id: 'discriminated-unions',
      title: '判別可能なユニオンと網羅性検査',
      body: (
        <>
          <p>
            <ChapterLink n={5} /> のユニオン型を、オブジェクトに適用します。Handbook によれば、ユニオンのすべてのメンバーがリテラル型の共通プロパティを持つとき、TypeScript はそれを<Term en="discriminated union">判別可能なユニオン</Term>として扱い、そのプロパティでメンバーを絞り込めます。<Ref n={5} />
          </p>
          <Code
            lang="ts"
            code={`
interface Circle { kind: "circle"; radius: number }
interface Square { kind: "square"; sideLength: number }
type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;   // shape: Circle
    case "square":
      return shape.sideLength * shape.sideLength;       // shape: Square
    default: {
      const _exhaustive: never = shape;     // すべて処理済みなら shape は never
      return _exhaustive;
    }
  }
}
`}
          />
          <Figure n="6-2" title="判別可能なユニオンの絞り込みと網羅性検査" caption="kind の値で Circle と Square に分かれ、各 case ではそのメンバーのプロパティが使える。すべての case を処理すると default では型が never になる。">
            <DiscriminatedUnionFigure />
          </Figure>
          <p>
            図の <code>default</code> に注目してください。すべてのメンバーを処理し終えると、残る可能性がなくなり、型は <code>never</code> になります。Handbook は <code>never</code> を「決して観測されない値を表す型」と説明し<Ref n={2} />、「<code>never</code> はあらゆる型に代入できるが、<code>never</code> にはどの型も代入できない」という性質を使った<Term en="exhaustiveness checking">網羅性検査</Term>を紹介しています。<Ref n={5} /> あとから <code>Triangle</code> を <code>Shape</code> に足して <code>case</code> を書き忘れると、<code>default</code> で <code>Triangle</code> を <code>never</code> に代入しようとしてエラーになります。<Ref n={5} />
          </p>
          <p>
            この技法は、画面の状態を表すときに特に力を発揮します。「読み込み中」「成功（データあり）」「失敗（エラーあり）」を、省略可能なプロパティの寄せ集めではなく、判別可能なユニオンで表すと、「成功なのにデータが無い」といったありえない状態を型の段階で排除できます。
          </p>
          <Code
            lang="ts"
            code={`
type LoadState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

function render(state: LoadState<Page[]>) {
  if (state.status === "ready") {
    return state.data.length;     // data は ready のときだけ存在する
  }
  return 0;
}
`}
          />
          <p>
            <code>LoadState&lt;T&gt;</code> はジェネリクスと判別可能なユニオンの組み合わせです。React の <code>useReducer</code> のアクション（<ChapterLink n={11} />）も、Rust の <code>enum</code> と <code>match</code>（<ChapterLink n={21} />）も、同じ発想で設計します。
          </p>
        </>
      ),
    },
    {
      id: 'unknown',
      title: 'unknown：安全な「何でも」',
      body: (
        <>
          <p>
            <code>any</code> は型検査を止めてしまうので、どんな操作も通ってしまいます。代わりに使うのが <code>unknown</code> です。Handbook は <code>unknown</code> を「任意の値を表す型」で、<code>any</code> と似ているが「<code>unknown</code> の値に対して何かをするのは許されない」ので安全だと説明しています。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            code={`
function parse(json: string): unknown {
  return JSON.parse(json);       // JSON.parse の戻り値は any だが、unknown として返す
}

const v = parse('{"id":"p1"}');
v.id;                            // エラー: unknown のままでは触れない
if (typeof v === "object" && v !== null && "id" in v) {
  console.log(v.id);             // 絞り込んだ後なら使える
}
`}
          />
          <p>
            <code>unknown</code> の値は、<ChapterLink n={5} /> で学んだ絞り込みを通して初めて使えるようになります。つまり <code>unknown</code> は「中身を確かめてから使え」という要求を型で表したものです。<code>strict</code> に含まれる <code>useUnknownInCatchVariables</code> によって、<code>catch (e)</code> の <code>e</code> も <code>unknown</code> になります。<Ref n={7} /> <code>e.message</code> と書く前に <code>e instanceof Error</code> で確かめる習慣が、ここから自然に身につきます。
          </p>
        </>
      ),
    },
    {
      id: 'declaration-files',
      title: '型定義ファイルと @types',
      body: (
        <>
          <p>
            npm のライブラリの多くは JavaScript で書かれています。TypeScript からそれらを型付きで使うには、ライブラリの型だけを記述した<Term en="declaration file">型定義ファイル</Term>（拡張子 <code>.d.ts</code>）が必要です。Handbook は、<code>.d.ts</code> を学ぶ最も一般的な動機として「型の無い npm パッケージに型を付けること」を挙げています。<Ref n={8} />
          </p>
          <p>
            型定義の入手方法は2つあります。1つは、パッケージ自身が型定義を同梱している場合で、このときは何もしなくても型が付きます。Handbook は「npm パッケージがすでに宣言ファイルを含んでいるなら、対応する <code>@types</code> パッケージは不要」と述べています。<Ref n={9} /> 本書で使う <code>@tauri-apps/api</code> や React Router、BlockNote はこの形です。もう1つは、コミュニティが保守する DefinitelyTyped から <code>@types/パッケージ名</code> を入れる方法で、「npm 以外のツールは要らない」と説明されています。<Ref n={9} /> React 本体はこちらで、<code>@types/react</code> と <code>@types/react-dom</code> を開発依存として入れます。
          </p>
          <Code
            lang="bash"
            code={`
npm install -D @types/react @types/react-dom
`}
          />
          <Callout kind="warn">
            <p>
              TypeScript 6.0 で <code>types</code> の既定値が <code>[]</code> になり（7.0 も同じ）、<code>@types</code> のパッケージがグローバルに自動で読み込まれなくなりました。<Ref n={10} /> <code>import</code> で明示的に使う分には影響ありませんが、<code>process</code> のようなグローバル変数の型が必要なら、<code>tsconfig.json</code> の <code>types</code> に <code>["node"]</code> のように列挙します。<Ref n={7} /> 本書の章で使う設定では <code>types: ["vite/client"]</code> を指定しています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'runtime-boundary',
      title: 'コンパイル時と実行時の境界',
      body: (
        <>
          <p>
            この章の最後に、TypeScript を使ううえで最も誤解されやすい点を整理します。<ChapterLink n={5} /> で確認したとおり、型注釈は JavaScript に変換されるときに消え、実行時の振る舞いを変えません。<Ref n={11} /> つまり、型は「コードを書いている間の約束」であって、実行時に値を検査してくれるものではありません。次の図は、この境界を描いたものです。
          </p>
          <Figure n="6-3" title="コンパイル時と実行時の境界" caption="左のコンパイル時には型があり tsc が検査する。右の実行時には型が消え、外部から届く値が約束どおりかは分からない。境界では unknown として受け、型ガードで確かめてから型付きの世界に入れる。">
            <CompileRuntimeFigure />
          </Figure>
          <p>
            図の左で <code>invoke&lt;Page[]&gt;("list_pages")</code> と書くと、戻り値は <code>Promise&lt;Page[]&gt;</code> になります。Tauri の <code>invoke</code> は <code>function invoke&lt;T&gt;(cmd, args?, options?): Promise&lt;T&gt;</code> と宣言されており、<code>T</code> は「応答の型」として呼び出し側が指定します。<Ref n={12} /> しかし図の右を見ると、実行時に届くのは Rust 側が返した JSON であって、<code>T</code> に合っているかを TypeScript が確かめるわけではありません。<code>JSON.parse</code> やネットワークの応答、ファイルから読んだ設定も同じです。
          </p>
          <p>
            したがって、外の世界から値が入ってくる<Term en="trust boundary">信頼境界</Term>では、値を <code>unknown</code> として受け取り、実行時に検査してから型付きの値に変えるのが安全な設計です。検査には <ChapterLink n={5} /> の型述語が使えます。
          </p>
          <Code
            lang="ts"
            code={`
function isPage(v: unknown): v is Page {
  return (
    typeof v === "object" && v !== null &&
    typeof (v as Record<string, unknown>).id === "string" &&
    typeof (v as Record<string, unknown>).title === "string"
  );
}

async function loadPages(): Promise<Page[]> {
  const raw: unknown = await invoke("list_pages");
  if (!Array.isArray(raw) || !raw.every(isPage)) {
    throw new Error("list_pages の応答が想定と異なります");
  }
  return raw;   // every で絞り込まれ、Page[] として返せる
}
`}
          />
          <p>
            どこまで厳密に検査するかは、境界の向こう側をどれだけ信頼できるかで決めます。Tauri の IPC の相手は自分で書いた Rust コードなので、Rust の構造体と TypeScript の型を手でそろえ、型を信頼して <code>invoke&lt;Page[]&gt;</code> と書く選択も現実的です。一方、ユーザーが用意した Markdown ファイルや設定ファイルのように、内容を保証できない入力は、必ず検証してから使います。「型が付いているから安全」ではなく、「境界で確かめたから安全」と考えてください。
          </p>
          <Callout>
            <p>
              型と実行時の検証を1つの定義から生成するライブラリもありますが、本書は標準の TypeScript だけで進めます。まず「境界はどこか」を見分けられるようになることが先です。型述語で手書きした検証は、仕組みが見えるぶん学習には向いています。
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
              Tsumugi の <code>src/lib/ipc.ts</code> は、すべてのコマンド呼び出しを <code>invoke&lt;T&gt;</code> の型付きラッパーとして集めるモジュールです（<ChapterLink n={34} />）。<code>Page</code> から <code>Omit</code> と <code>Partial</code> で作成用・更新用の型を派生させ、Rust 側の構造体と1対1に対応させます。
            </p>
            <p>
              簡易データベースのプロパティ（<ChapterLink n={47} />）は、<code>kind</code> を目印にした判別可能なユニオンで表し、並べ替えや絞り込みの条件を <code>switch</code> で網羅的に処理します。Markdown の読み込み（<ChapterLink n={49} />）とストアに保存した設定の読み出し（<ChapterLink n={50} />）は、信頼境界として <code>unknown</code> から検証して受け取ります。
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
            <li>ジェネリクスは型変数で「あとで決める型」を表す。型引数は引数から推論され、<code>extends</code> で制約を付けられる。<code>keyof</code> と組み合わせると実在するキーだけを受け取れる。</li>
            <li><code>Partial</code>、<code>Pick</code>、<code>Omit</code>、<code>Record</code> などのユーティリティ型で、元の型から派生させる。同じ形を2回書かない。</li>
            <li>判別可能なユニオンは共通のリテラル型プロパティでメンバーを絞り込む。<code>never</code> への代入で網羅性を検査できる。</li>
            <li><code>unknown</code> は「確かめてから使え」を型で表したもの。<code>any</code> の代わりに使う。</li>
            <li>ライブラリの型は同梱の <code>.d.ts</code> か <code>@types</code> から得る。TypeScript 6.0 以降は <code>types</code> の既定が空になった。</li>
            <li>型は実行時に消える。外部から入る値は信頼境界で <code>unknown</code> として受け、型ガードで検証してから使う。</li>
          </ul>
          <p>次章から第3部に入り、宣言的に UI を記述する React の考え方と JSX を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Generics',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
      accessed: '2026-11-08',
      note: 'ジェネリクスの動機、型変数、型引数の推論、制約、keyof による制約の根拠。',
    },
    {
      title: 'More on Functions',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
      accessed: '2026-11-08',
      note: 'よいジェネリック関数の指針、unknown と never の説明の根拠。',
    },
    {
      title: 'Object Types',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      accessed: '2026-11-08',
      note: 'ジェネリックなオブジェクト型 Box<Type> と Array<T> の根拠。',
    },
    {
      title: 'Utility Types',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
      accessed: '2026-11-08',
      note: 'Partial、Required、Readonly、Record、Pick、Omit、ReturnType、Awaited の定義の根拠。',
    },
    {
      title: 'Narrowing',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
      accessed: '2026-11-08',
      note: '判別可能なユニオン、never、網羅性検査の根拠。',
    },
    {
      title: 'Creating Types from Types',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html',
      accessed: '2026-11-08',
      note: 'keyof、typeof、インデックスアクセス、条件型、マップ型、テンプレートリテラル型の一覧の根拠。',
    },
    {
      title: 'TSConfig Reference',
      publisher: 'TypeScript',
      url: 'https://www.typescriptlang.org/tsconfig/',
      accessed: '2026-11-08',
      version: 'TypeScript 7.0',
      note: 'strict に含まれる useUnknownInCatchVariables、types の既定値と意味の根拠。',
    },
    {
      title: 'Declaration Files: Introduction',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html',
      accessed: '2026-11-08',
      note: '.d.ts を学ぶ動機（型の無い npm パッケージに型を付ける）の根拠。',
    },
    {
      title: 'Declaration Files: Consumption',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html',
      accessed: '2026-11-08',
      note: '@types パッケージの入手方法と、型定義を同梱するパッケージでは不要であることの根拠。',
    },
    {
      title: 'Announcing TypeScript 7.0',
      publisher: 'Microsoft',
      url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
      accessed: '2026-11-08',
      version: 'TypeScript 7.0',
      note: 'types の既定値が [] になったことの根拠。',
    },
    {
      title: 'The Basics',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
      accessed: '2026-11-08',
      note: '型注釈が実行時の振る舞いを変えないことの根拠。',
    },
    {
      title: '@tauri-apps/api: core',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacecore/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'invoke<T> の型シグネチャと戻り値 Promise<T> の根拠。',
    },
  ],
}

export default chapter
