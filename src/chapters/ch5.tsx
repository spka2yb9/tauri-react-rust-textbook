import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 5-1 型を集合として見る ---------- */
function TypeSetFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="型を値の集合として描いた図。大きな枠 unknown の中に string と number の円があり、string の中に小さな点として文字列リテラル型 left と right がある。string と number を囲む破線が ユニオン型 string | number、円の外の空集合が never">
      <g fontSize="13">
        <rect x="20" y="20" width="600" height="250" rx="12" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="40" y="44" fill="var(--fig-muted)">unknown（すべての値）</text>

        <rect x="60" y="70" width="360" height="170" rx="16" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="8 5" />
        <text x="240" y="232" textAnchor="middle" fill="var(--fig-accent)" fontSize="12">string | number（ユニオン：和集合）</text>

        <circle cx="160" cy="150" r="70" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="100" textAnchor="middle" fontWeight="600">string</text>
        <circle cx="140" cy="150" r="14" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="140" y="154" textAnchor="middle" fontSize="11">"left"</text>
        <circle cx="185" cy="170" r="14" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="185" y="174" textAnchor="middle" fontSize="11">"right"</text>
        <text x="160" y="205" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">リテラル型は要素1つの集合</text>

        <circle cx="330" cy="150" r="70" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="330" y="100" textAnchor="middle" fontWeight="600">number</text>
        <circle cx="330" cy="155" r="14" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="330" y="159" textAnchor="middle" fontSize="11">42</text>

        <rect x="460" y="90" width="130" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="525" y="115" textAnchor="middle" fontWeight="600">boolean</text>
        <text x="525" y="135" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">= true | false</text>

        <rect x="460" y="170" width="130" height="50" rx="8" fill="none" stroke="var(--fig-line)" strokeDasharray="3 3" />
        <text x="525" y="192" textAnchor="middle" fontWeight="600">never</text>
        <text x="525" y="210" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">空集合（値がない）</text>
      </g>
      <text x="320" y="290" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：代入できる＝部分集合である。"left" は string に代入できるが、逆はできない</text>
    </svg>
  )
}

/* ---------- 図 5-2 絞り込みの流れ ---------- */
function NarrowingFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="string | number | null 型の引数が、制御フローの分岐で絞り込まれる様子。最初の if で null を除き、typeof が string の分岐では string、そうでない分岐では number になる">
      <defs>
        <marker id="arrow5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="200" y="20" width="240" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="47" textAnchor="middle">id: string | number | null</text>

        <path d="M320,64 L320,90" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow5a)" />
        <polygon points="320,92 420,122 320,152 220,122" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="127" textAnchor="middle">id === null ?</text>

        <path d="M220,122 L140,122 L140,158" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow5a)" />
        <text x="175" y="112" textAnchor="middle" fontSize="12">true</text>
        <rect x="70" y="160" width="140" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="140" y="187" textAnchor="middle">id: null → return</text>

        <path d="M320,152 L320,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow5a)" />
        <text x="345" y="170" fontSize="12">false</text>
        <text x="420" y="170" fontSize="12" fill="var(--fig-muted)">id: string | number</text>
        <polygon points="320,180 440,210 320,240 200,210" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="215" textAnchor="middle">typeof id === "string" ?</text>

        <path d="M200,210 L140,210 L140,250" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow5a)" />
        <text x="170" y="232" textAnchor="middle" fontSize="12">true</text>
        <rect x="70" y="252" width="140" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="140" y="277" textAnchor="middle">id: string</text>

        <path d="M440,210 L500,210 L500,250" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow5a)" />
        <text x="470" y="200" textAnchor="middle" fontSize="12">false</text>
        <rect x="430" y="252" width="140" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="500" y="277" textAnchor="middle">id: number</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 5,
  part: 2,
  title: 'TypeScript 入門：型の基本',
  summary:
    'TypeScript は JavaScript に型を加え、実行前に誤りを見つける言語です。型注釈と型推論、オブジェクト型、type と interface、ユニオン型と型の絞り込みを、型を「値の集合」として捉える見方で学びます。最後に tsconfig と strict の意味を、TypeScript 7.0 の既定値に基づいて整理します。',
  goals: [
    '型注釈と型推論の使い分けを説明できる',
    'オブジェクト型を type や interface で定義し、省略可能・読み取り専用の性質を付けられる',
    'ユニオン型とリテラル型を、値の集合として理解できる',
    'typeof、in、等価比較などで型を絞り込み、コンパイラが追跡する仕組みを説明できる',
    'tsconfig の strict が何を有効にするかを説明できる',
  ],
  prerequisites: [3],
  sections: [
    {
      id: 'intro',
      title: 'なぜ型を書くのか',
      body: (
        <>
          <p>
            JavaScript では、変数にどんな値が入るかを実行してみるまで確かめられません。文字列に対して関数呼び出しをすれば実行時に例外になりますし、存在しないプロパティを読んでも例外にならず <code>undefined</code> が返るだけです。TypeScript の Handbook は後者を「例外にならない失敗」と呼び、どちらもコードを実行する前に見つけられると説明しています。<Ref n={1} />
          </p>
          <p>
            <Term en="TypeScript">TypeScript</Term> は、JavaScript に<Term en="type annotation">型注釈</Term>を加えた言語で、<Term en="static type checking">静的型検査</Term>、つまり実行前にプログラムの型の整合性を調べます。検査に通ったコードは、型注釈を取り除いた JavaScript に変換されます。Handbook はこの点を「型注釈はプログラムの実行時の振る舞いを決して変えない」と強調しています。<Ref n={1} />
          </p>
          <Code
            lang="ts"
            code={`
function greet(person: string, date: Date) {
  console.log(\`Hello \${person}, today is \${date.toDateString()}!\`);
}

greet("Maddison", Date()); // エラー: Date() は string を返すので Date 型の引数に渡せない
greet("Maddison", new Date()); // OK
`}
          />
          <p>
            このコードはコンパイルすると、型注釈が消えて <code>function greet(person, date)</code> になります。<Ref n={1} /> つまり TypeScript は「コードを書いている間だけ存在する検査の層」です。この性質は <ChapterLink n={6} /> の「コンパイル時と実行時の境界」で改めて重要になります。
          </p>
          <p>
            React では props の形を、Tauri ではコマンドの引数と戻り値の形を、型で表します。型があると、エディタが補完を出し、間違った使い方をその場で指摘してくれます。本書で書くフロントエンドのコードは、すべて TypeScript です。
          </p>
        </>
      ),
    },
    {
      id: 'annotation-inference',
      title: '型注釈と型推論',
      body: (
        <>
          <p>
            TypeScript の基本の型は、JavaScript の値の種類に対応します。文字列は <code>string</code>、数値は <code>number</code>（整数と小数の区別はなく、すべて <code>number</code> です）、真偽値は <code>boolean</code> です。配列は <code>number[]</code> か <code>Array&lt;number&gt;</code> と書きます。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            code={`
let title: string = "Tsumugi";      // 型注釈：変数名の後ろに「: 型」
let count = 0;                      // 型推論：初期値から number と判断される
const tags: string[] = [];          // 空配列は推論できないので注釈が要る

function area(width: number, height: number): number {
  return width * height;            // 戻り値の型も省略すれば推論される
}
`}
          />
          <p>
            型注釈は、変数名や引数名の後ろに <code>: 型</code> と書きます。しかし Handbook によれば、変数の型は初期値から推論されるため、ほとんどの場合は注釈を書く必要がありません。<Ref n={2} /> これを<Term en="type inference">型推論</Term>と呼びます。注釈が必要になるのは、関数の引数のように初期値から判断できないところと、空配列のように情報が足りないところです。
          </p>
          <p>
            関数に渡す無名関数の引数も、文脈から型が決まります。Handbook はこれを「文脈的型付け」と呼び、<code>names.forEach((s) =&gt; ...)</code> の <code>s</code> が自動的に <code>string</code> になる例を挙げています。<Ref n={2} /> React のイベントハンドラや配列の <code>map</code> で、引数に型を書かずに済むのはこの仕組みのおかげです。
          </p>
          <h3>any：型検査を止める型</h3>
          <p>
            <code>any</code> は「何でもあり」の型で、Handbook の言葉では「以降の型検査をすべて無効にする」型です。<Ref n={2} /> 型が分からないときに TypeScript が黙って <code>any</code> にしてしまうことを防ぐのが <code>noImplicitAny</code> という設定で、暗黙の <code>any</code> をエラーにします。<Ref n={2} /> この設定は後述の <code>strict</code> に含まれるため、本書の設定では常に有効です。
          </p>
        </>
      ),
    },
    {
      id: 'object-types',
      title: 'オブジェクト型',
      body: (
        <>
          <p>
            オブジェクトの形は、プロパティの名前と型を並べて表します。Handbook によれば、オブジェクト型は無名のまま書くことも、<code>interface</code> や <code>type</code> で名前を付けることもできます。<Ref n={3} />
          </p>
          <Code
            lang="ts"
            code={`
type Page = {
  id: string;
  title: string;
  parentId: string | null;   // 親がないときは null
  icon?: string;             // 省略可能：無いときは undefined
  readonly createdAt: string; // 読み取り専用：代入するとエラー
};

const page: Page = { id: "p1", title: "はじめに", parentId: null, createdAt: "2026-11-08" };
page.createdAt = "x";   // エラー: 読み取り専用
page.icon?.toUpperCase(); // icon は string | undefined なので ?. で安全に扱う
`}
          />
          <p>
            プロパティ名の後ろに <code>?</code> を付けると<Term en="optional property">省略可能なプロパティ</Term>になります。読み出した値の型には <code>undefined</code> が加わるので、使う前に確認が必要です。<Ref n={3} /> <code>readonly</code> を付けたプロパティは型検査の間は書き込めません。ただし Handbook は、これが「値そのものを不変にするわけではない」と注意しています。別名を通した書き換えは防げません。<Ref n={3} />
          </p>
          <h3>余分なプロパティの検査</h3>
          <p>
            オブジェクトリテラルを直接代入したり引数に渡したりするときだけ、TypeScript は宣言にないプロパティをエラーにします。Handbook はこれを「余分なプロパティの検査」と呼び、たとえば <code>color</code> と書くべきところを <code>colour</code> と書いた誤りを見つける例を挙げています。<Ref n={3} /> 一見厳しい規則ですが、Handbook は「余分なプロパティのエラーの大半は実際にバグである」と述べています。<Ref n={3} />
          </p>
          <h3>配列とタプル</h3>
          <p>
            <code>string[]</code> は <code>Array&lt;string&gt;</code> の省略形です。<Ref n={3} /> 要素の数と各位置の型が決まった配列は<Term en="tuple">タプル</Term>型で、<code>[string, number]</code> のように書きます。<Ref n={3} /> React の <code>useState</code> が返す「値と更新関数の組」はタプルで、<ChapterLink n={9} /> で登場します。
          </p>
        </>
      ),
    },
    {
      id: 'type-interface',
      title: 'type と interface',
      body: (
        <>
          <p>
            型に名前を付ける方法は2つあります。<Term en="type alias">型エイリアス</Term>（<code>type</code>）はあらゆる型に名前を付けられ、<Term en="interface">インターフェース</Term>（<code>interface</code>）はオブジェクトの形に名前を付けます。多くの場面でどちらを使っても同じように動きます。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            code={`
// 拡張の書き方が違う
interface Animal { name: string }
interface Bear extends Animal { honey: boolean }

type Animal2 = { name: string };
type Bear2 = Animal2 & { honey: boolean };   // 交差型（&）で合成する

// interface は同名で再宣言すると合成される（宣言のマージ）
interface Window { myApp: string }

// type は再宣言できない：Duplicate identifier エラー
`}
          />
          <p>
            Handbook が挙げる違いは、主に拡張の仕方です。<code>interface</code> は <code>extends</code> で拡張でき、同じ名前で再び宣言するとプロパティが合成されます。<code>type</code> は交差型 <code>&amp;</code> で合成でき、一度作った後は変更できません。<Ref n={2} /> 交差型で同じ名前のプロパティが異なる型を持つと、自動的に合成されて <code>never</code> になることがあり、<code>interface</code> の <code>extends</code> なら矛盾がエラーとして報告されます。<Ref n={3} />
          </p>
          <p>
            Handbook の指針は「<code>type</code> の機能が必要になるまでは <code>interface</code> を使う」です。<Ref n={2} /> ただし、ユニオン型や後述のリテラル型には <code>type</code> しか使えません。本書では、オブジェクトの形には <code>interface</code> を、ユニオンや関数型には <code>type</code> を使い、どちらでもよい場面では文脈に合わせて選びます。どちらを使っても、TypeScript は名前ではなく構造で型の互換性を判断する「構造的型付け」であることは変わりません。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'union-literal',
      title: 'ユニオン型とリテラル型：型を集合として見る',
      body: (
        <>
          <p>
            <Term en="union type">ユニオン型</Term>は、「このどれか」を表す型で、<code>string | number</code> のように <code>|</code> でつなぎます。<Ref n={2} /> また、特定の値そのものを型にできます。これが<Term en="literal type">リテラル型</Term>で、<code>"left" | "right" | "center"</code> のように、許される値を列挙する使い方が典型です。<Ref n={2} />
          </p>
          <p>
            これらを理解する最もよい見方は、「型とは値の集合である」というものです。次の図は、代表的な型を集合として描いたものです。
          </p>
          <Figure n="5-1" title="型を値の集合として見る" caption="模式図。string や number は値の集合で、リテラル型はその中の1点。ユニオン型は和集合。boolean は true | false。never は空集合。ある型の値を別の型に代入できるのは、前者が後者の部分集合のとき。">
            <TypeSetFigure />
          </Figure>
          <p>
            図から読み取れる規則は1つだけです。<code>A</code> 型の値を <code>B</code> 型の変数に代入できるのは、<code>A</code> が <code>B</code> の部分集合のときです。<code>"left"</code> は <code>string</code> の部分集合なので <code>string</code> の変数に入れられますが、逆に任意の <code>string</code> を <code>"left" | "right"</code> の変数には入れられません。<code>boolean</code> が <code>true | false</code> のユニオンの別名であることも、Handbook に明記されています。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            code={`
type Align = "left" | "right" | "center";

function setAlign(a: Align) { /* ... */ }
setAlign("left");    // OK
setAlign("centre");  // エラー: "centre" は Align に代入できない

const req = { method: "GET" };          // method は string と推論される（広げられる）
const req2 = { method: "GET" } as const; // method は "GET" のまま
`}
          />
          <p>
            オブジェクトのプロパティにリテラルを書くと、後から書き換えられる前提で <code>string</code> に広げて推論されます。リテラル型のまま保ちたいときは <code>as const</code> を付けます。<Ref n={2} /> この挙動は、Tauri のコマンド名や React のアクションの種類をリテラル型で扱うときによく遭遇します。
          </p>
          <p>
            ユニオン型の値に対しては、すべてのメンバーに共通する操作しか許されません。<code>string | number</code> に <code>toUpperCase()</code> は呼べません。使うには、次の節の絞り込みが必要です。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'narrowing',
      title: '型の絞り込み',
      body: (
        <>
          <p>
            Handbook は、「宣言された型より具体的な型へ精緻化する過程」を<Term en="narrowing">絞り込み</Term>と呼んでいます。<Ref n={4} /> JavaScript で普通に書く条件分岐を、TypeScript が型の情報として読み取る仕組みです。次の図は、1つの引数が分岐を通るたびに型が狭まっていく様子を示します。
          </p>
          <Figure n="5-2" title="制御フローによる型の絞り込み" caption="string | number | null の引数が、null の検査で null を除かれ、typeof の検査で string と number に分かれる。各分岐の中では、狭まった型のメソッドが使える。">
            <NarrowingFlowFigure />
          </Figure>
          <Code
            lang="ts"
            code={`
function label(id: string | number | null): string {
  if (id === null) {
    return "(なし)";            // ここでは id: null
  }
  // ここでは id: string | number
  if (typeof id === "string") {
    return id.toUpperCase();    // id: string
  }
  return id.toFixed(0);         // id: number
}
`}
          />
          <p>
            図とコードが示すとおり、TypeScript はコードの到達可能性を解析して、各地点での型を決めます。Handbook はこれを<Term en="control flow analysis">制御フロー解析</Term>と呼びます。<Ref n={4} /> 絞り込みに使える条件には、次のようなものがあります。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>書き方</th>
                  <th>何を絞り込むか</th>
                  <th>注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>typeof x === "string"</code></td>
                  <td>プリミティブの種類</td>
                  <td><code>typeof null</code> は <code>"object"</code> なので、<code>"object"</code> の分岐では <code>null</code> が残る</td>
                </tr>
                <tr>
                  <td><code>if (x)</code></td>
                  <td>真偽値への変換（truthiness）</td>
                  <td><code>0</code> や空文字列も偽になるので、プリミティブには不向き</td>
                </tr>
                <tr>
                  <td><code>x === y</code>、<code>x == null</code></td>
                  <td>等価比較</td>
                  <td><code>== null</code> は <code>null</code> と <code>undefined</code> の両方を除く</td>
                </tr>
                <tr>
                  <td><code>"swim" in x</code></td>
                  <td>プロパティの有無</td>
                  <td>オブジェクトのユニオンを分けるのに便利</td>
                </tr>
                <tr>
                  <td><code>x instanceof Date</code></td>
                  <td>クラスのインスタンス</td>
                  <td>クラスで作られた値にだけ使える</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            条件を関数に切り出したいときは、戻り値の型に <code>引数名 is 型</code> と書く<Term en="type predicate">型述語</Term>を使います。Handbook の例では、<code>function isFish(pet: Fish | Bird): pet is Fish</code> と宣言すると、呼び出し側の <code>if (isFish(pet))</code> の中で <code>pet</code> が <code>Fish</code> になります。<Ref n={4} />
          </p>
          <h3>null と undefined</h3>
          <p>
            <code>strictNullChecks</code> が有効なとき、<code>null</code> と <code>undefined</code> はそれぞれ独自の型になり、具体的な値が必要なところに渡すと型エラーになります。<Ref n={5} /> Handbook は、この設定が無効だと <code>null</code> の扱い忘れが「バグの大きな源」になるため、有効にすることを勧めています。<Ref n={2} /> 値が <code>null</code> でないと確信できるときは、後置の <code>!</code>（非 null アサーション）で検査を省略できますが、実行時には何も確かめないので、確信がないときは使わないでください。<Ref n={2} />
          </p>
          <Callout kind="warn">
            <p>
              <code>as</code> による型アサーションも、実行時には何もしません。Handbook は、<code>document.getElementById("main_canvas") as HTMLCanvasElement</code> のように「TypeScript より自分のほうが型を知っている」ときに使うものだと説明しています。<Ref n={2} /> 絞り込みで表せるなら絞り込みを、どうしても必要なときだけアサーションを使うのが安全です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tsconfig',
      title: 'tsconfig と strict',
      body: (
        <>
          <p>
            TypeScript のコンパイラは <code>tsc</code> というコマンドで、<code>npm install -D typescript</code> で入ります。<Ref n={6} /> 設定はプロジェクト直下の <code>tsconfig.json</code> に書きます。Vite のプロジェクトでは、JavaScript への変換は Vite が行い、<code>tsc</code> は型検査だけを担当します。この分担を表す設定が <code>noEmit</code> で、「JavaScript やソースマップなどの出力ファイルを生成しない」という意味です。<Ref n={5} />
          </p>
          <Code
            lang="json"
            title="tsconfig.json（本書の章で使う最小構成の例）"
            code={`
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
`}
          />
          <h3>strict とその家族</h3>
          <p>
            最も重要な設定が <Term en="strict">strict</Term> です。公式リファレンスは、これを「より強いプログラムの正しさの保証につながる、幅広い型検査を有効にするフラグ」と説明し、strict モード家族のすべてのオプションを有効にするのと同じだとしています。<Ref n={5} /> 含まれるのは <code>noImplicitAny</code>、<code>strictNullChecks</code>、<code>strictFunctionTypes</code>、<code>strictBindCallApply</code>、<code>strictPropertyInitialization</code>、<code>noImplicitThis</code>、<code>useUnknownInCatchVariables</code>、<code>alwaysStrict</code>、<code>strictBuiltinIteratorReturn</code> です。<Ref n={5} /> 個別に無効化もできますが、本書では常にすべて有効にします。
          </p>
          <p>
            <code>strict</code> の既定値は <code>true</code> です。6.0 で変更され、7.0 が引き継いでいます。<Ref n={5} /> <Ref n={6} /> つまり <code>tsconfig.json</code> に何も書かなくても strict です。それでも上の例に <code>"strict": true</code> を書いているのは、古い版との違いを明示するためです。公式リファレンスは、将来の版で strict の下に新しい検査が追加されうるので、TypeScript を更新すると新しい型エラーが出ることがある、とも注意しています。<Ref n={5} />
          </p>
          <h3>TypeScript 7.0 の既定値</h3>
          <p>
            本書の基準である TypeScript 7.0 は、2026 年 7 月 8 日に公開された、コンパイラを Go 言語で書き直した版です。公式ブログは「10 倍速いネイティブ移植」と表現し、<code>npm install -D typescript</code> で入れた <code>tsc</code> コマンドがそのまま使えると説明しています。<Ref n={6} /> 7.0 は 6.0 で導入された新しい既定値を採用しており、そのうち本書に関係するものは次のとおりです。<Ref n={6} />
          </p>
          <ul>
            <li><code>strict</code> が既定で有効。</li>
            <li><code>module</code> の既定が <code>esnext</code>。</li>
            <li><code>types</code> の既定が <code>[]</code>（空）。<code>@types</code> パッケージを自動で全部読み込まなくなった。<code>["*"]</code> で以前の挙動に戻せる。</li>
            <li><code>noUncheckedSideEffectImports</code> が既定で有効。</li>
          </ul>
          <p>
            また、6.0 で非推奨になっていた設定は 7.0 ではエラーになります。公式ブログが挙げるのは、<code>target: es5</code>、<code>downlevelIteration</code>、<code>moduleResolution</code> の <code>node</code>（<code>node10</code>）と <code>classic</code>、<code>module</code> の <code>amd</code>・<code>umd</code>・<code>systemjs</code>・<code>none</code>、<code>baseUrl</code>、<code>esModuleInterop</code> や <code>allowSyntheticDefaultImports</code> を <code>false</code> にすること、<code>alwaysStrict</code> を <code>false</code> にすること、などです。<Ref n={6} /> 古い記事の <code>tsconfig.json</code> をそのまま使うとエラーになるのはこのためです。
          </p>
          <Callout>
            <p>
              <code>verbatimModuleSyntax</code> は、型だけを import する行を確実に消すための設定です。<code>import type {'{ A }'} from "a"</code> は消され、<code>import {'{ b, type c }'}</code> は <code>import {'{ b }'}</code> に書き換えられます。<Ref n={5} /> 本書のコードで型を import するときに <code>import type</code> と書くのは、この設定を前提にしているからです。
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
              Tsumugi のフロントエンドでは、ページやデータベースの形を <code>src/lib/types.ts</code> に <code>interface Page</code> のように定義し、Rust 側の構造体と手でそろえます（<ChapterLink n={34} />、<ChapterLink n={41} />）。<code>parentId: string | null</code> のように「無いかもしれない」をユニオン型で表し、使う前に絞り込みます。
            </p>
            <p>
              簡易データベースのプロパティの種類（<ChapterLink n={47} />）は <code>"text" | "number" | "select" | "checkbox" | "date"</code> というリテラル型のユニオンで表します。SQLite 側の CHECK 制約と同じ集合を、TypeScript では型として持つわけです。
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
            <li>TypeScript は実行前に型を検査し、型注釈は JavaScript への変換で消える。実行時の振る舞いは変わらない。</li>
            <li>型は初期値から推論されるので、注釈は関数の引数など必要なところにだけ書く。<code>any</code> は型検査を止めるので避ける。</li>
            <li>オブジェクト型は <code>type</code> か <code>interface</code> で名前を付ける。<code>?</code> で省略可能、<code>readonly</code> で読み取り専用。</li>
            <li>型は値の集合。ユニオンは和集合、リテラル型は1点、<code>never</code> は空集合。代入できるのは部分集合のとき。</li>
            <li><code>typeof</code>、等価比較、<code>in</code>、<code>instanceof</code>、型述語で絞り込み、制御フロー解析が各地点の型を決める。</li>
            <li><code>strict</code> は型検査の家族をまとめて有効にする設定で、TypeScript 6.0 から既定で有効（7.0 も同じ）。6.0 で非推奨になった設定は 7.0 でエラーになる。</li>
          </ul>
          <p>次章では、型を部品として組み合わせるジェネリクスとユーティリティ型、そして型が消えた実行時との境界をどう守るかを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Basics',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
      accessed: '2026-11-08',
      note: '静的型検査、例外にならない失敗、型注釈が実行時の振る舞いを変えないこと、tsc の根拠。',
    },
    {
      title: 'Everyday Types',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      accessed: '2026-11-08',
      note: 'プリミティブ、配列、型注釈と推論、文脈的型付け、any と noImplicitAny、type と interface の違い、ユニオンとリテラル型、as const、型アサーション、null と非 null アサーションの根拠。',
    },
    {
      title: 'Object Types',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      accessed: '2026-11-08',
      note: '省略可能と readonly、余分なプロパティの検査、extends と交差型、配列とタプルの根拠。',
    },
    {
      title: 'Narrowing',
      publisher: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
      accessed: '2026-11-08',
      note: '絞り込みの定義、typeof・truthiness・等価・in・instanceof、制御フロー解析、型述語の根拠。',
    },
    {
      title: 'TSConfig Reference',
      publisher: 'TypeScript',
      url: 'https://www.typescriptlang.org/tsconfig/',
      accessed: '2026-11-08',
      version: 'TypeScript 7.0',
      note: 'strict の説明と既定値 true、strict 家族の一覧、strictNullChecks、noEmit、verbatimModuleSyntax の根拠。',
    },
    {
      title: 'Announcing TypeScript 7.0',
      publisher: 'Microsoft',
      url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
      accessed: '2026-11-08',
      version: 'TypeScript 7.0',
      note: '公開日、Go による移植、インストール方法、strict・module・types の既定値変更、非推奨設定のエラー化の根拠。',
    },
  ],
}

export default chapter
