import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 21-1 構造体と列挙型の違い ---------- */
function StructVsEnumFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="構造体と列挙型の対比。左の構造体 Page は id・title・position のすべてのフィールドを同時に持つ。右の列挙型 Command は Quit・Move・Write のうちどれか1つの形だけを取る">
      <g fontSize="13">
        <text x="160" y="30" textAnchor="middle" fontWeight="600" fontSize="15">struct：すべてを同時に持つ（AND）</text>
        <rect x="40" y="50" width="240" height="150" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="160" y="72" textAnchor="middle" fontWeight="600">Page</text>
        <rect x="55" y="85" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="65" y="105" fontFamily="monospace">id: String</text>
        <rect x="55" y="120" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="65" y="140" fontFamily="monospace">title: String</text>
        <rect x="55" y="155" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="65" y="175" fontFamily="monospace">position: i64</text>

        <line x1="320" y1="20" x2="320" y2="240" stroke="var(--fig-line)" strokeDasharray="4 4" />

        <text x="480" y="30" textAnchor="middle" fontWeight="600" fontSize="15">enum：どれか1つの形（OR）</text>
        <rect x="360" y="50" width="240" height="150" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="480" y="72" textAnchor="middle" fontWeight="600">Command</text>
        <rect x="375" y="85" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="385" y="105" fontFamily="monospace">Quit</text>
        <text x="520" y="105" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">または</text>
        <rect x="375" y="120" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="385" y="140" fontFamily="monospace">Move {'{ x, y }'}</text>
        <text x="540" y="140" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">または</text>
        <rect x="375" y="155" width="210" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="385" y="175" fontFamily="monospace">Write(String)</text>
      </g>
      <text x="320" y="230" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">TypeScript で言えば、左はオブジェクト型、右は判別可能なユニオン型に相当する</text>
    </svg>
  )
}

/* ---------- 図 21-2 enum のメモリ表現 ---------- */
function EnumLayoutFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="列挙型 Command の値がメモリ上でタグとペイロードの組として置かれる模式図。Quit はタグ 0 でペイロードは未使用、Move はタグ 1 でペイロードに x と y、Write はタグ 2 でペイロードに String の ptr・len・capacity を持つ。全体の大きさは最大のバリアントに合わせて固定">
      <g fontSize="13">
        <text x="60" y="30" fontSize="12" fill="var(--fig-muted)">タグ</text>
        <text x="330" y="30" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ペイロード（最大のバリアントの大きさで固定）</text>
        {[
          { y: 45, tag: '0', name: 'Quit', cells: ['（未使用）'], fill: 'var(--fig-box)' },
          { y: 115, tag: '1', name: 'Move', cells: ['x: i32', 'y: i32', '（未使用）'], fill: 'var(--fig-box3)' },
          { y: 185, tag: '2', name: 'Write', cells: ['ptr', 'len', 'capacity'], fill: 'var(--fig-box2)' },
        ].map((row) => (
          <g key={row.name}>
            <text x="10" y={row.y + 32} fontWeight="600">{row.name}</text>
            <rect x="80" y={row.y} width="60" height="50" fill={row.fill} stroke="var(--fig-line)" strokeWidth="2" />
            <text x="110" y={row.y + 31} textAnchor="middle" fontFamily="monospace" fontWeight="600">{row.tag}</text>
            {row.cells.map((c, i) => {
              const w = row.cells.length === 1 ? 480 : 160
              return (
                <g key={i}>
                  <rect x={140 + i * w} y={row.y} width={w} height="50" fill={c.startsWith('（') ? 'var(--fig-bg)' : row.fill} stroke="var(--fig-line)" strokeDasharray={c.startsWith('（') ? '4 3' : undefined} />
                  <text x={140 + i * w + w / 2} y={row.y + 31} textAnchor="middle" fontFamily="monospace" fill={c.startsWith('（') ? 'var(--fig-muted)' : undefined}>{c}</text>
                </g>
              )
            })}
          </g>
        ))}
      </g>
      <text x="320" y="262" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：実際のタグの値・並び順・サイズはコンパイラが決め、Option のようにタグが省略される場合もある</text>
    </svg>
  )
}

/* ---------- 図 21-3 match の分岐 ---------- */
function MatchFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="match の分岐の流れ。値 x: Option<i32> が入力され、上から順にパターン None と Some(i) と照合される。最初に一致した腕の式が match 全体の値になる。すべてのバリアントが網羅されていないとコンパイルエラー E0004">
      <defs>
        <marker id="arrow21a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="110" width="140" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="90" y="135" textAnchor="middle" fontWeight="600">match x</text>
        <text x="90" y="156" textAnchor="middle" fontFamily="monospace" fontSize="12">x: Option&lt;i32&gt;</text>

        {/* 腕1 */}
        <path d="M160,130 L230,70" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow21a)" />
        <rect x="230" y="40" width="160" height="56" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="310" y="62" textAnchor="middle">① None か？</text>
        <text x="310" y="84" textAnchor="middle" fontFamily="monospace" fontSize="12">None =&gt; None</text>
        <path d="M390,68 L465,68" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow21a)" />
        <text x="425" y="58" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">一致</text>

        {/* 腕2 */}
        <path d="M160,150 L230,150" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow21a)" />
        <text x="195" y="140" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">不一致なら次へ</text>
        <rect x="230" y="122" width="160" height="56" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="310" y="144" textAnchor="middle">② Some(i) か？</text>
        <text x="310" y="166" textAnchor="middle" fontFamily="monospace" fontSize="12">Some(i) =&gt; Some(i + 1)</text>
        <path d="M390,150 L465,150" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow21a)" />
        <text x="425" y="140" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">一致、i に束縛</text>

        {/* 出力 */}
        <rect x="470" y="80" width="150" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="545" y="115" textAnchor="middle" fontWeight="600">match の値</text>
        <text x="545" y="140" textAnchor="middle" fontFamily="monospace" fontSize="12">Option&lt;i32&gt;</text>

        {/* 網羅性 */}
        <path d="M310,178 L310,215" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow21a)" />
        <rect x="190" y="220" width="240" height="50" rx="8" fill="var(--fig-bg)" stroke="var(--fig-danger)" strokeDasharray="5 4" />
        <text x="310" y="241" textAnchor="middle" fill="var(--fig-danger)">どの腕にも当てはまらない値がある</text>
        <text x="310" y="260" textAnchor="middle" fill="var(--fig-danger)" fontSize="12">→ コンパイルエラー E0004（網羅性検査）</text>
      </g>
      <text x="320" y="292" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">腕は上から順に照合され、最初に一致した腕だけが実行される</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 21,
  part: 4,
  title: '構造体・列挙型・パターンマッチ',
  summary:
    '関連する値をまとめる構造体と、取りうる形を列挙する列挙型で、アプリ固有の型を定義します。impl によるメソッド、値がないことを表す Option、値の形で安全に分岐する match、短く書くための if let と let-else、2024 edition の let チェーンまでを扱います。',
  goals: [
    'struct を定義してインスタンスを作り、impl でメソッドと関連関数を書ける',
    '&self・&mut self・self の違いを説明できる',
    'データを持つバリアントを含む enum を定義し、構造体との使い分けを説明できる',
    'Option<T> が null の代わりに使われる理由と、T に変換してから使う規則を説明できる',
    'match の網羅性検査、パターンによる束縛、_ の意味を説明できる',
    'if let、let-else、let チェーンを場面に応じて使い分けられる',
  ],
  prerequisites: [18, 19, 20],
  sections: [
    {
      id: 'intro',
      title: '自分の型を定義する',
      body: (
        <>
          <p>
            ここまでに出てきた型は、整数や <code>String</code> のような組み込みの型だけでした。アプリを書くには「ページ」「コマンド」「プロパティの種類」のように、問題領域に合わせた型が必要です。Rust でその役割を担うのが
            <Term en="struct">構造体</Term>
            と
            <Term en="enum">列挙型</Term>
            です。<Ref n={1} /> 両者を組み合わせて領域をモデル化すると、コンパイル時の型検査がそのまま仕様の検査になります。
          </p>
          <p>
            TypeScript で言えば、構造体はオブジェクト型（<code>type Page = {'{ id: string; ... }'}</code>）、列挙型は判別可能なユニオン型（<ChapterLink n={6} />）に相当します。違いは、Rust ではこれらが名前付きの独自の型になり、メソッドを持てることです。図 21-1 に両者の性格の違いを示します。
          </p>
          <Figure n="21-1" title="構造体と列挙型" caption="構造体はすべてのフィールドを同時に持つ（AND）。列挙型は列挙されたバリアントのうちどれか1つの形を取る（OR）。両者を入れ子にして領域をモデル化する。">
            <StructVsEnumFigure />
          </Figure>
          <p>図のとおり、「必ず全部そろっている」なら構造体、「どれか1つ」なら列挙型です。この章では構造体、列挙型、そして列挙型の値を分岐する <code>match</code> の順に見ていきます。</p>
        </>
      ),
    },
    {
      id: 'struct',
      title: '構造体と impl',
      body: (
        <>
          <p>構造体は <code>struct</code> で定義し、各フィールドに名前と型を付けます。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
struct Page {
    id: String,
    title: String,
    parent_id: Option<String>, // 親がないこともある（後述）
    position: i64,
}

fn main() {
    let mut page = Page {
        id: String::from("p1"),
        title: String::from("Untitled"),
        parent_id: None,
        position: 0,
    };
    page.title = String::from("はじめに"); // mut なら書き換えられる
    println!("{}", page.title);
}
`}
          />
          <p>
            インスタンスは <code>型名 {'{ フィールド: 値, ... }'}</code> で作り、フィールドの順番は定義と違っていても構いません。可変にするかどうかはインスタンス全体で決まり、一部のフィールドだけを可変にすることはできません。<Ref n={2} />
          </p>
          <p>
            フィールドと同じ名前の変数がある場合は <code>title: title</code> を <code>title</code> と省略できます（フィールド初期化の省略記法）。既存のインスタンスから一部だけ変えた新しいインスタンスを作るには、<code>..base</code> という
            <Term en="struct update syntax">構造体更新記法</Term>
            を最後に書きます。<code>..</code> は代入と同じく所有権を移すので、<code>String</code> のような Copy でないフィールドを取った元のインスタンスは、その後使えなくなる点に注意してください。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
fn build_page(id: String, title: String) -> Page {
    Page { id, title, parent_id: None, position: 0 } // 省略記法
}

let child = Page {
    id: String::from("p2"),
    parent_id: Some(page.id.clone()),
    ..page // 残りのフィールドは page から。title（String）が移動する
};
`}
          />
          <p>
            フィールドに名前を付けない
            <Term en="tuple struct">タプル構造体</Term>
            <code>struct Rgb(u8, u8, u8);</code> や、フィールドを持たない
            <Term en="unit-like struct">ユニット様構造体</Term>
            <code>struct Marker;</code> もあります。前者は「同じ <code>(u8, u8, u8)</code> でも <code>Rgb</code> と <code>Point</code> を別の型として区別したい」ときに、後者はトレイト（<ChapterLink n={25} />）を実装するだけの型が欲しいときに使います。<Ref n={2} />
          </p>
          <h3>フィールドは所有型にする</h3>
          <p>
            <code>Page</code> のフィールドが <code>&str</code> ではなく <code>String</code> なのは意図的です。構造体に参照を持たせるには、参照が構造体より長生きすることを保証するライフタイム注釈（<ChapterLink n={26} />）が必要で、注釈なしで <code>title: &str</code> と書くと E0106（missing lifetime specifier）になります。<Ref n={2} /> 入門の段階では、構造体のフィールドは所有型にしておくのが無難です。
          </p>
          <h3>Debug 出力</h3>
          <p>
            構造体を <code>println!("{'{page}'}")</code> で表示しようとしてもコンパイルできません。利用者向けの表示方法をコンパイラが推測しないためです。デバッグ用の表示でよければ、定義の上に <code>#[derive(Debug)]</code> を付け、<code>{'{:?}'}</code> または複数行に整形する <code>{'{:#?}'}</code> で出力します。<Ref n={3} /> <code>derive</code> はトレイトの実装を自動生成する属性で、<ChapterLink n={25} /> で正式に扱います。
          </p>
          <Code
            lang="rust"
            code={`
#[derive(Debug)]
struct Page { /* 同上 */ }

println!("{page:?}");
// Page { id: "p1", title: "はじめに", parent_id: None, position: 0 }
`}
          />
          <p>
            式の値を確かめたいときは <code>dbg!(式)</code> も便利です。ファイル名と行番号、式と値を標準エラー出力に出し、値の所有権をそのまま返すので式の途中に挟めます。<Ref n={3} />
          </p>
          <h3>impl でメソッドを定義する</h3>
          <p>
            型に属する関数は <code>impl</code> ブロックの中に書きます。第1引数が <code>self</code> のものが
            <Term en="method">メソッド</Term>
            で、<code>self</code> を取らないものが
            <Term en="associated function">関連関数</Term>
            です。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
impl Page {
    // 関連関数：コンストラクタの慣習として new と名付ける（予約語ではない）
    fn new(id: &str, title: &str) -> Self {
        Self { id: id.to_string(), title: title.to_string(), parent_id: None, position: 0 }
    }

    fn is_root(&self) -> bool {          // 読むだけ：不変借用
        self.parent_id.is_none()
    }

    fn rename(&mut self, title: &str) {  // 書き換える：可変借用
        self.title = title.to_string();
    }

    fn into_title(self) -> String {      // 消費する：所有権を取る
        self.title
    }
}

let mut page = Page::new("p1", "Untitled"); // 関連関数は :: で呼ぶ
page.rename("はじめに");                     // メソッドは . で呼ぶ
println!("{}", page.is_root());
let title = page.into_title();              // 以後 page は使えない
`}
          />
          <p>
            <code>self</code> の形は前章の参照の規則そのものです。<code>&self</code> は <code>self: &Self</code> の省略形で、読むだけのメソッドに使います。<code>&mut self</code> はフィールドを書き換えるメソッドに、<code>self</code> は値を別の何かに変換して元のインスタンスを使えなくしたいときに使います。<code>Self</code> は <code>impl</code> の対象の型の別名です。<Ref n={4} /> 呼び出し側は <code>page.rename(...)</code> と書くだけで、Rust が <code>&mut page</code> を自動で補います。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'enum',
      title: '列挙型とデータを持つバリアント',
      body: (
        <>
          <p>
            列挙型は、値が取りうる形を
            <Term en="variant">バリアント</Term>
            として列挙します。Tsumugi の簡易データベースで使うプロパティの種類は、まさに「どれか1つ」です。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
enum PropertyKind {
    Text,
    Number,
    Select,
    Checkbox,
    Date,
}

let kind = PropertyKind::Select; // バリアントは型名 :: で参照する
`}
          />
          <p>
            ここまでなら TypeScript の文字列リテラルのユニオンと同じです。Rust の列挙型が強力なのは、各バリアントが異なる型と量のデータを持てることです。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
enum Command {
    Quit,                       // データなし
    Move { x: i32, y: i32 },    // 名前付きフィールド（構造体のよう）
    Write(String),              // String を1つ
    ChangeColor(u8, u8, u8),    // 3つの値（タプルのよう）
}

impl Command {                  // 列挙型にも impl でメソッドを書ける
    fn describe(&self) -> String {
        match self {
            Command::Quit => String::from("終了"),
            Command::Move { x, y } => format!("({x}, {y}) へ移動"),
            Command::Write(text) => format!("書き込み: {text}"),
            Command::ChangeColor(r, g, b) => format!("色を ({r}, {g}, {b}) に変更"),
        }
    }
}
`}
          />
          <p>
            4つのバリアントを別々の構造体で定義することもできますが、それでは型が4つに分かれてしまい、「どのコマンドでも受け取る関数」を書けません。列挙型なら <code>Command</code> という1つの型で全部を受けられます。<Ref n={5} /> このような値がメモリ上でどう置かれるかを図 21-2 に示します。
          </p>
          <Figure n="21-2" title="列挙型のメモリ表現（模式図）" caption="値は「どのバリアントか」を示すタグと、そのバリアントのデータ（ペイロード）の組で置かれる。全体の大きさは最大のバリアントに合わせて固定されるので、Vec などに並べて格納できる。実際の配置はコンパイラが最適化する。">
            <EnumLayoutFigure />
          </Figure>
          <p>
            図から読み取れるのは、「列挙型の値には、どのバリアントかを示す印が一緒に入っている」ということです。だから次の節の <code>match</code> は、この印を見て分岐できます。TypeScript の判別可能なユニオンでは <code>kind: 'move'</code> のような判別用のプロパティを自分で持たせましたが、Rust ではそれが言語の仕組みとして組み込まれています。
          </p>
          <h3>Option：null の代わり</h3>
          <p>
            Rust には <code>null</code> がありません。代わりに標準ライブラリが、値が「ある」か「ない」かを表す列挙型 <code>Option&lt;T&gt;</code> を定義しています。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
// 標準ライブラリの定義（自分で書き直す必要はない）
enum Option<T> {
    None,
    Some(T),
}

let some_number = Some(5);             // Option<i32>
let absent: Option<i32> = None;        // None だけでは T を推論できないので注釈が要る
`}
          />
          <p>
            <code>&lt;T&gt;</code> はジェネリックな型引数で（<ChapterLink n={25} />）、<code>Some</code> と <code>None</code> はプレリュードに含まれるので <code>Option::</code> を付けずに書けます。<Ref n={5} /> <code>null</code> との決定的な違いは、<code>Option&lt;i8&gt;</code> と <code>i8</code> が別の型であることです。
          </p>
          <Code
            lang="rust"
            code={`
let x: i8 = 5;
let y: Option<i8> = Some(5);
let sum = x + y; // error[E0277]: cannot add \`Option<i8>\` to \`i8\`
`}
          />
          <p>
            <code>i8</code> 型の値は必ず有効な数値で、「もしかしたら無いかも」という心配は要りません。無いかもしれないのは <code>Option&lt;i8&gt;</code> だけで、その値を使うには中身を取り出す操作が必要です。この取り出しの過程で、コンパイラが <code>None</code> の場合の扱いを強制します。<Ref n={5} /> <code>null</code> 参照の発明者 Tony Hoare が「10億ドルの過ち」と呼んだ問題を、型で封じているわけです。取り出し方の中心が次の <code>match</code> です。
          </p>
        </>
      ),
    },
    {
      id: 'match',
      title: 'match：値の形で分岐する',
      body: (
        <>
          <p>
            <code>match</code> は、値を上から順にパターンと照合し、最初に一致した
            <Term en="arm">腕</Term>
            のコードを実行する式です。<code>if</code> と違い、照合する値は <code>bool</code> でなくて構いません。<Ref n={6} /> 流れを図 21-3 に示します。
          </p>
          <Figure n="21-3" title="match の分岐と網羅性検査" caption="値は腕のパターンと上から順に照合され、最初に一致した腕の式が match 全体の値になる。パターン中の変数（i）には中身が束縛される。取りうる値をすべて覆っていなければ E0004 でコンパイルが止まる。">
            <MatchFlowFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1), // Some の中身が i に束縛される
    }
}

plus_one(Some(5)); // Some(6)
plus_one(None);    // None
`}
          />
          <p>
            <code>Some(i)</code> のようにパターンに変数を書くと、一致したときに中身がその変数に束縛されます。これが列挙型のデータを取り出す基本の方法です。<Ref n={6} /> 腕の右側は式なので、<code>match</code> 全体が値を持ち、関数の戻り値にそのまま使えます。
          </p>
          <h3>網羅性検査</h3>
          <p>図の下側に示したように、<code>None</code> の腕を消すとコンパイルできません。<Ref n={6} /></p>
          <Code
            lang="text"
            code={`
error[E0004]: non-exhaustive patterns: \`None\` not covered
`}
          />
          <p>
            この
            <Term en="exhaustiveness">網羅性</Term>
            の検査があるから、「<code>None</code> の場合を忘れていた」というバグはコンパイル時に見つかります。列挙型にバリアントを追加したときも、分岐が足りない場所をコンパイラがすべて指摘してくれます。TypeScript では <code>switch</code> の <code>default</code> に <code>never</code> を使って同じことを手作業で実現していましたが、Rust では標準の動作です。
          </p>
          <h3>残りをまとめて受ける</h3>
          <Code
            lang="rust"
            code={`
let dice_roll = 9;
match dice_roll {
    3 => println!("帽子を被る"),
    7 => println!("帽子を脱ぐ"),
    other => println!("{other} マス進む"), // 残りすべてに一致し、値を使う
}

match dice_roll {
    1..=6 => println!("通常の目"),       // 範囲パターン
    _ => (),                              // 残りは何もしない。_ は値を束縛しない
}
`}
          />
          <p>
            変数名を書けば残りの値すべてに一致して値も使えます。値が要らなければ <code>_</code> を書くと、未使用変数の警告も出ません。何もしない腕には、ユニット値 <code>()</code> を置きます。腕は上から順に照合されるので、これらの包括的な腕は最後に置きます。<Ref n={6} />
          </p>
        </>
      ),
    },
    {
      id: 'if-let',
      title: 'if let、let-else、let チェーン',
      body: (
        <>
          <p>
            1つのパターンにだけ興味があり、残りは無視したい場面では、<code>match</code> に <code>_ =&gt; ()</code> の腕を書くのは冗長です。その省略形が <code>if let</code> です。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            code={`
let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("最大値は {max}");
} else {
    println!("未設定");
}
`}
          />
          <p>
            <code>if let パターン = 値</code> で、一致すれば束縛された変数を使ってブロックを実行し、<code>else</code> は <code>match</code> の <code>_</code> の腕に相当します。短く書ける代わりに網羅性の検査は失われるので、「全部の場合を扱うべき分岐」には <code>match</code> を使い、「1つだけ拾えばよい分岐」に <code>if let</code> を使う、と使い分けます。<Ref n={7} />
          </p>
          <h3>let-else：早期リターンで本筋を平らにする</h3>
          <p>
            「パターンに一致しなければ関数を抜ける」という形は非常によく出てきます。<code>if let</code> で書くと本筋のコードが <code>if</code> の中に入ってインデントが深くなるので、<code>let-else</code> を使います。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            code={`
fn parent_title(page: &Page) -> String {
    let Some(parent) = &page.parent_id else {
        return String::from("(ルート)"); // 一致しなければここで抜ける
    };
    // ここから先、parent は普通の変数として使える
    format!("親: {parent}")
}
`}
          />
          <p>
            <code>let パターン = 値 else {'{ ... }'}</code> と書き、一致したときの束縛は外側のスコープに置かれます。<code>else</code> ブロックは <code>return</code>、<code>break</code>、<code>continue</code>、<code>panic!</code> などで必ずその場から抜けなければなりません。<Ref n={7} /> 入力の検証を先頭に並べ、本筋をインデントなしで書けるのがこの構文の利点です。
          </p>
          <h3>let チェーン（2024 edition）</h3>
          <p>
            2024 edition では、<code>if</code> や <code>while</code> の条件の中で <code>let</code> を <code>&amp;&amp;</code> でつなげられるようになりました。<Ref n={8} /> 以前は「パターンに一致し、かつ条件を満たす」を書くのに <code>if let</code> の中にもう1つ <code>if</code> を入れる必要がありました。
          </p>
          <Code
            lang="rust"
            code={`
fn first_even(nums: &[i32]) -> Option<i32> {
    if let Some(&first) = nums.first()
        && first % 2 == 0
    {
        Some(first)
    } else {
        None
    }
}
`}
          />
          <p>
            各 <code>let</code> は条件の最上位に <code>&amp;&amp;</code> で並べる必要があり、<code>||</code> とは組み合わせられません。<Ref n={8} /> この機能は 2024 edition の <code>if let</code> の一時変数のスコープ変更に依存しているため、edition が 2024 以上でないと使えません。Edition Guide には最小のコンパイラバージョンの記載がないので、本書では「Rust 1.99・2024 edition でコンパイルできることを確認した」とだけ述べておきます。本章の他のコードも同様に確認しています。
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
              Tsumugi の <code>core</code> クレートでは、<code>pages</code> テーブルの1行を <code>struct Page</code> として表し、<code>parent_id</code> は <code>Option&lt;String&gt;</code> にします。ルートページでは <code>None</code>、子ページでは <code>Some(親の id)</code> です。SQL の <code>NULL</code> を <code>Option</code> に対応させるのは、rusqlite が自然にサポートしている変換です（<ChapterLink n={42} />）。
            </p>
            <p>
              簡易データベース（<ChapterLink n={47} />）のプロパティ型は <code>text</code>・<code>number</code>・<code>select</code>・<code>checkbox</code>・<code>date</code> の「どれか1つ」で、<code>core</code> クレートでは <code>kind</code> 列の文字列のまま持ち、定数 <code>KINDS</code> で検査しています。並べ替えや絞り込みの条件（<ChapterLink n={48} />）も「等しい」「含む」「より大きい」を表す文字列を <code>match</code> で SQL の断片に変換しており、未知の文字列は <code>other</code> の腕でエラーにしています。これらを列挙型で持てば、網羅性検査のおかげで、種類を増やしたときに変換し忘れた箇所がコンパイルエラーとして見つかります。
            </p>
            <p>
              また、エラー型 <code>AppError</code>（<ChapterLink n={24} />）もデータを持つ列挙型です。フロントエンドとやり取りする型には <code>serde</code> の <code>derive</code> を付けて JSON に変換します（<ChapterLink n={34} />）。
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
            <li>構造体は名前付きフィールドをまとめた型。<code>impl</code> にメソッド（<code>&self</code>・<code>&mut self</code>・<code>self</code>）と関連関数（<code>Type::new</code>）を書く。</li>
            <li><code>#[derive(Debug)]</code> と <code>{'{:?}'}</code> でデバッグ表示できる。フィールドは所有型（<code>String</code>）にしておく。</li>
            <li>列挙型は「どれか1つ」を表し、バリアントごとに異なるデータを持てる。メモリ上はタグとペイロードの組。</li>
            <li><code>Option&lt;T&gt;</code> は null の代わり。<code>T</code> とは別の型なので、中身を取り出す過程で <code>None</code> の扱いが強制される。</li>
            <li><code>match</code> は値の形で分岐する式で、パターンで中身を束縛し、網羅性が検査される。残りは変数名か <code>_</code> で受ける。</li>
            <li>1パターンだけなら <code>if let</code>、早期リターンなら <code>let-else</code>、条件の組み合わせなら 2024 edition の let チェーン。</li>
          </ul>
          <p>次章では、ここで作った型や関数をファイルやクレートに分けて整理する、モジュールと Cargo の仕組みを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 5 Using Structs to Structure Related Data',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch05-00-structs.html',
      accessed: '2026-11-08',
      note: '構造体と列挙型が領域のモデル化の基本部品であるという位置づけの根拠。',
    },
    {
      title: 'The Rust Programming Language, 5.1 Defining and Instantiating Structs',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch05-01-defining-structs.html',
      accessed: '2026-11-08',
      note: '構造体の定義と生成、インスタンス全体の可変性、フィールド初期化の省略記法、構造体更新記法と move、タプル構造体、ユニット様構造体、参照フィールドと E0106 の根拠。',
    },
    {
      title: 'The Rust Programming Language, 5.2 An Example Program Using Structs',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch05-02-example-structs.html',
      accessed: '2026-11-08',
      note: '#[derive(Debug)]、{:?} と {:#?}、dbg! マクロの根拠。',
    },
    {
      title: 'The Rust Programming Language, 5.3 Method Syntax',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch05-03-method-syntax.html',
      accessed: '2026-11-08',
      note: 'impl、&self・&mut self・self、Self、関連関数と new の慣習、自動参照の根拠。',
    },
    {
      title: 'The Rust Programming Language, 6.1 Defining an Enum',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html',
      accessed: '2026-11-08',
      note: '列挙型の定義、データを持つバリアント、enum への impl、Option<T> の定義と null を持たない理由、E0277 の根拠。',
    },
    {
      title: 'The Rust Programming Language, 6.2 The match Control Flow Construct',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch06-02-match.html',
      accessed: '2026-11-08',
      note: 'match の構文、パターンによる束縛、網羅性検査と E0004、包括的な腕と _、() の根拠。',
    },
    {
      title: 'The Rust Programming Language, 6.3 Concise Control Flow with if let and let else',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch06-03-if-let.html',
      accessed: '2026-11-08',
      note: 'if let と else、let-else の構文と使いどころの根拠。',
    },
    {
      title: 'The Rust Edition Guide, Rust 2024: Let chains',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/edition-guide/rust-2024/let-chains.html',
      accessed: '2026-11-08',
      version: 'Rust 2024 edition',
      note: 'let チェーンの構文、2024 edition 以降で使えること、&& のみで || は不可、if let のスコープ変更に依存することの根拠。',
    },
  ],
}

export default chapter
