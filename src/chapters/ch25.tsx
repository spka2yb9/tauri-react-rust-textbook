import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 25-1 単相化 ---------- */
function MonomorphizationFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="ジェネリックな関数 largest<T> が、コンパイル時に実際に使われた型ごとに largest_i32 と largest_char という別々の関数に展開される図。実行時には型引数は存在しない">
      <defs>
        <marker id="arrow25a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="80" width="220" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="130" y="105" textAnchor="middle" fontWeight="600">ソースコード（1つ）</text>
        <text x="130" y="130" textAnchor="middle" fontFamily="monospace" fontSize="12">fn largest&lt;T: PartialOrd&gt;</text>
        <text x="130" y="150" textAnchor="middle" fontFamily="monospace" fontSize="12">(list: &[T]) -&gt; &T</text>

        <path d="M240,110 L395,60" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow25a)" />
        <path d="M240,140 L395,190" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow25a)" />
        <text x="315" y="70" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">largest(&[34, 50])</text>
        <text x="315" y="185" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">largest(&['y', 'm'])</text>

        <rect x="400" y="30" width="220" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="510" y="55" textAnchor="middle" fontWeight="600">機械語（i32 版）</text>
        <text x="510" y="77" textAnchor="middle" fontFamily="monospace" fontSize="12">largest_i32(&[i32]) -&gt; &i32</text>
        <rect x="400" y="160" width="220" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="510" y="185" textAnchor="middle" fontWeight="600">機械語（char 版）</text>
        <text x="510" y="207" textAnchor="middle" fontFamily="monospace" fontSize="12">largest_char(&[char]) -&gt; &char</text>
      </g>
      <text x="320" y="245" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">コンパイル時に使われた型ごとに複製される（単相化）。実行時のコストはゼロ</text>
    </svg>
  )
}

/* ---------- 図 25-2 静的ディスパッチと動的ディスパッチ ---------- */
function DispatchFigure() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="静的ディスパッチと動的ディスパッチの対比。左は &impl Shape で、呼び出し先の area 関数がコンパイル時に決まり直接呼ばれる。右は &dyn Shape で、参照がデータへのポインタと vtable へのポインタの2つからなり、実行時に vtable を引いて Circle::area を呼ぶ">
      <defs>
        <marker id="arrow25b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 左 */}
        <text x="150" y="30" textAnchor="middle" fontWeight="600" fontSize="15">静的ディスパッチ（ジェネリクス）</text>
        <rect x="30" y="50" width="240" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="150" y="77" textAnchor="middle" fontFamily="monospace" fontSize="12">fn total&lt;T: Shape&gt;(s: &[T])</text>
        <path d="M150,94 L150,135" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow25b)" />
        <text x="160" y="120" fontSize="12" fill="var(--fig-muted)">コンパイル時に決定</text>
        <rect x="30" y="140" width="240" height="44" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="150" y="167" textAnchor="middle" fontFamily="monospace" fontSize="12">Circle::area を直接呼ぶ</text>
        <text x="150" y="215" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">・型ごとにコードが複製される</text>
        <text x="150" y="235" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">・インライン化などの最適化が効く</text>
        <text x="150" y="255" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">・1つの呼び出しでは T は1種類</text>

        <line x1="320" y1="20" x2="320" y2="340" stroke="var(--fig-line)" strokeDasharray="4 4" />

        {/* 右 */}
        <text x="480" y="30" textAnchor="middle" fontWeight="600" fontSize="15">動的ディスパッチ（dyn Trait）</text>
        <rect x="340" y="50" width="280" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="77" textAnchor="middle" fontFamily="monospace" fontSize="12">fn total(s: &[&dyn Shape])</text>
        {/* fat pointer */}
        <rect x="340" y="120" width="130" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="405" y="142" textAnchor="middle" fontSize="12">data ptr</text>
        <rect x="470" y="120" width="130" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="535" y="142" textAnchor="middle" fontSize="12">vtable ptr</text>
        <text x="470" y="112" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">&dyn Shape はポインタ2つ分</text>
        {/* data */}
        <path d="M405,154 L405,195" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow25b)" />
        <rect x="340" y="200" width="130" height="44" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="405" y="227" textAnchor="middle" fontFamily="monospace" fontSize="12">Circle(1.0)</text>
        {/* vtable */}
        <path d="M535,154 L535,195" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow25b)" />
        <rect x="480" y="200" width="140" height="100" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="550" y="218" textAnchor="middle" fontSize="12" fontWeight="600">vtable（Circle 用）</text>
        <rect x="490" y="226" width="120" height="22" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="550" y="241" textAnchor="middle" fontFamily="monospace" fontSize="11">area → Circle::area</text>
        <rect x="490" y="250" width="120" height="22" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="550" y="265" textAnchor="middle" fontFamily="monospace" fontSize="11">name → Circle::name</text>
        <rect x="490" y="274" width="120" height="22" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="550" y="289" textAnchor="middle" fontFamily="monospace" fontSize="11">size / drop ...</text>
        <text x="480" y="325" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">実行時に表を引く。異なる型を混ぜて並べられる</text>
      </g>
      <text x="320" y="352" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：vtable の実際の構成は省略</text>
    </svg>
  )
}

/* ---------- 図 25-3 トレイトは契約 ---------- */
function TraitContractFigure() {
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label="トレイト Summary が summarize メソッドの契約を定め、Article と Post がそれぞれ impl Summary for で契約を実装し、notify 関数が契約だけを見て両方を受け取れる図">
      <defs>
        <marker id="arrow25c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="215" y="20" width="210" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="320" y="45" textAnchor="middle" fontWeight="600">trait Summary</text>
        <text x="320" y="67" textAnchor="middle" fontFamily="monospace" fontSize="12">fn summarize(&self) -&gt; String;</text>

        <path d="M125,130 L265,85" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow25c)" />
        <path d="M515,130 L375,85" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow25c)" />
        <text x="190" y="100" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">impl Summary for</text>
        <text x="450" y="100" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">impl Summary for</text>

        <rect x="40" y="130" width="170" height="50" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="125" y="152" textAnchor="middle" fontWeight="600">struct Article</text>
        <text x="125" y="172" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">title, author, body</text>
        <rect x="430" y="130" width="170" height="50" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="515" y="152" textAnchor="middle" fontWeight="600">struct Post</text>
        <text x="515" y="172" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">username, content</text>

        <rect x="215" y="150" width="210" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="320" y="173" textAnchor="middle" fontFamily="monospace" fontSize="12">fn notify(item: &impl Summary)</text>
        <text x="320" y="195" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">契約だけを見る。型は問わない</text>
      </g>
      <text x="320" y="232" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">破線：「この型はこの契約を満たす」という宣言。型とトレイトのどちらかが自分のクレートにあれば書ける</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 25,
  part: 4,
  title: 'ジェネリクスとトレイト',
  summary:
    '型をパラメータ化するジェネリクスと、型が満たすべき振る舞いの契約であるトレイトを学びます。トレイト境界、impl Trait と dyn Trait、静的ディスパッチと動的ディスパッチの違い、derive で自動生成できる標準トレイト、Display・From・Default などの標準トレイトの実装までを扱います。',
  goals: [
    'ジェネリックな関数・構造体・メソッドを書き、単相化により実行時コストがないことを説明できる',
    'トレイトを定義して型に実装し、既定実装と孤児規則を説明できる',
    'トレイト境界（impl Trait、<T: Trait>、where）を使い分けられる',
    'impl Trait と dyn Trait の違い、静的ディスパッチと動的ディスパッチの仕組みを説明できる',
    'derive できる標準トレイトとその意味を説明し、適切に付けられる',
    'Display・From・TryFrom・Default などの標準トレイトを自分の型に実装できる',
  ],
  prerequisites: [20, 21, 22],
  sections: [
    {
      id: 'intro',
      title: '重複を減らす2つの道具',
      body: (
        <>
          <p>
            <ChapterLink n={6} /> で TypeScript のジェネリクスを学びました。「<code>i32</code> の配列から最大値を探す関数」と「<code>char</code> の配列から最大値を探す関数」は、型以外まったく同じコードになります。この重複を消すのが
            <Term en="generics">ジェネリクス</Term>
            で、型を引数のように扱います。<Ref n={1} />
          </p>
          <p>
            ただし、型を抽象化するだけでは「<code>T</code> 同士を <code>&gt;</code> で比べる」ことができません。<code>T</code> がどんな型でもよいなら、比較できない型が来るかもしれないからです。そこで「<code>T</code> は比較できる型に限る」と宣言する必要があり、そのための語彙が
            <Term en="trait">トレイト</Term>
            です。トレイトは型が持つべき振る舞いの契約で、他の言語のインターフェースに近い概念です。<Ref n={2} /> ジェネリクスとトレイトは常に対で使われ、Rust の抽象化のほぼすべてはこの2つの上に成り立っています。これまでに出てきた <code>Copy</code>、<code>Debug</code>、<code>From</code>、<code>Error</code> もすべてトレイトです。
          </p>
        </>
      ),
    },
    {
      id: 'generics',
      title: 'ジェネリクス',
      body: (
        <>
          <Code
            lang="rust"
            code={`
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

largest(&[34, 50, 25, 100, 65]); // 100
largest(&['y', 'm', 'a', 'q']);  // 'y'
`}
          />
          <p>
            関数名の後ろの <code>&lt;T&gt;</code> で型パラメータを宣言し、引数と戻り値で使います。<code>T: PartialOrd</code> が
            <Term en="trait bound">トレイト境界</Term>
            で、「<code>T</code> は <code>PartialOrd</code>（大小比較）を実装した型に限る」という制約です。これを書かないと、<code>item &gt; largest</code> の行で E0369（<code>&gt;</code> を <code>&T</code> に適用できない）になります。<code>i32</code> も <code>char</code> も標準ライブラリが <code>PartialOrd</code> を実装しているので、どちらでも呼べます。<Ref n={1} />
          </p>
          <h3>ジェネリックな構造体とメソッド</h3>
          <Code
            lang="rust"
            code={`
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {              // すべての T に対するメソッド
    fn x(&self) -> &T {
        &self.x
    }
}

impl Point<f64> {               // f64 のときだけ存在するメソッド
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

let p = Point { x: 5, y: 10 };      // Point<i32>
let q = Point { x: 3.0, y: 4.0 };   // Point<f64>
q.distance_from_origin();           // 5.0。p では呼べない
`}
          />
          <p>
            <code>impl&lt;T&gt; Point&lt;T&gt;</code> の <code>impl</code> の後ろの <code>&lt;T&gt;</code> は「これから使う <code>T</code> はジェネリックな型引数だ」という宣言で、<code>impl Point&lt;f64&gt;</code> のように具体的な型を書けば、その型のときだけ存在するメソッドを定義できます。<Ref n={1} /> <code>Point&lt;T&gt;</code> では <code>x</code> と <code>y</code> が同じ型でなければならず、別々にしたければ <code>Point&lt;T, U&gt;</code> と2つ宣言します。<ChapterLink n={21} /> の <code>Option&lt;T&gt;</code> と <ChapterLink n={24} /> の <code>Result&lt;T, E&gt;</code> も、こうして定義されたジェネリックな列挙型です。<Ref n={1} />
          </p>
          <h3>単相化：実行時コストはゼロ</h3>
          <p>
            ジェネリクスを使っても実行は遅くなりません。コンパイラは
            <Term en="monomorphization">単相化</Term>
            という処理で、実際に使われた具体的な型ごとにコードを複製し、型パラメータを埋めた専用の関数を生成します。<Ref n={1} /> 図 25-1 に示します。
          </p>
          <Figure n="25-1" title="単相化" caption="ジェネリックな関数は1つだけ書くが、コンパイル時に使われた型ごとに別々の機械語が生成される。手で2つ書いたのと同じ速さで動く。">
            <MonomorphizationFigure />
          </Figure>
          <p>
            図から分かるとおり、実行時には「ジェネリックな関数」は存在せず、型ごとの具体的な関数だけがあります。この性質が、後述する静的ディスパッチの土台です。
          </p>
        </>
      ),
    },
    {
      id: 'traits',
      title: 'トレイト：振る舞いの契約',
      body: (
        <>
          <p>トレイトは、型が実装すべきメソッドのシグネチャをまとめたものです。<Ref n={2} /> 図 25-2 に、トレイト・実装・利用の関係を示します。</p>
          <Figure n="25-2" title="トレイトは契約" caption="trait が契約（メソッドのシグネチャ）を定め、各型が impl Trait for Type で契約を実装する。契約だけを見る関数は、どの実装型でも受け取れる。">
            <TraitContractFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
pub trait Summary {
    fn summarize_author(&self) -> String;           // 必須：実装側が本体を書く

    fn summarize(&self) -> String {                 // 既定実装：上書きしなくてもよい
        format!("(続きは {} を参照)", self.summarize_author())
    }
}

pub struct Article { pub title: String, pub author: String, pub body: String }
pub struct Post { pub username: String, pub content: String }

impl Summary for Article {
    fn summarize_author(&self) -> String { self.author.clone() }
    fn summarize(&self) -> String {                 // 既定を上書き
        format!("{} 著 {}", self.author, self.title)
    }
}

impl Summary for Post {
    fn summarize_author(&self) -> String { format!("@{}", self.username) }
    // summarize は既定実装のまま
}
`}
          />
          <p>
            <code>impl トレイト for 型</code> で契約を実装します。本体のないメソッドは必須で、本体のあるものは
            <Term en="default implementation">既定実装</Term>
            です。既定実装は同じトレイトの他のメソッド（必須のものを含む）を呼べるので、最小限の実装から多くの機能を導けます。上書きしたメソッドの中から既定実装を呼ぶことはできません。<Ref n={2} /> トレイトのメソッドを呼ぶには、型だけでなくトレイトもスコープにある必要があります（<code>use crate::Summary;</code>）。
          </p>
          <h3>孤児規則</h3>
          <p>
            「トレイトか型のどちらか一方が自分のクレートで定義されている」ときに限って <code>impl</code> を書けます。これを
            <Term en="orphan rule">孤児規則</Term>
            と呼びます。自分の型に標準の <code>Display</code> を実装することも、自分のトレイトを標準の <code>Vec&lt;T&gt;</code> に実装することもできますが、<code>Display</code> を <code>Vec&lt;T&gt;</code> に実装することはできません。2つのクレートが同じ型に同じトレイトを実装して衝突するのを防ぐための規則です。<Ref n={2} />
          </p>
          <h3>トレイト境界の書き方</h3>
          <Code
            lang="rust"
            code={`
pub fn notify(item: &impl Summary) { /* ... */ }           // 1. impl Trait（引数位置）

pub fn notify<T: Summary>(item: &T) { /* ... */ }          // 2. トレイト境界。1 と同じ意味

pub fn notify_pair<T: Summary>(a: &T, b: &T) { /* ... */ } // a と b は同じ型でなければならない

fn describe<T>(item: &T) -> String                         // 3. where 句
where
    T: Summary + Display,                                  // + で複数の境界
{
    format!("{item}: {}", item.summarize())
}
`}
          />
          <p>
            <code>&impl Summary</code> は <code>&lt;T: Summary&gt;</code> の糖衣構文です。違いが出るのは引数が2つ以上のときで、<code>impl Trait</code> を2回書けばそれぞれ別の型でよく、<code>&lt;T&gt;</code> を共有すれば同じ型に限定されます。<code>+</code> で複数のトレイトを要求でき、境界が長くなったら <code>where</code> 句に移すと読みやすくなります。<Ref n={2} /> トレイト境界を使うと、<code>impl&lt;T: Display + PartialOrd&gt; Pair&lt;T&gt;</code> のように「この条件を満たす型にだけメソッドを生やす」こともできます。<Ref n={2} />
          </p>
          <p>
            標準ライブラリはこの仕組みで <code>impl&lt;T: Display&gt; ToString for T</code> という
            <Term en="blanket implementation">包括実装</Term>
            を持っています。<code>Display</code> を実装したすべての型に自動で <code>to_string()</code> が付くのはそのためで、<ChapterLink n={24} /> でエラーを <code>e.to_string()</code> できたのもこの実装のおかげです。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'dispatch',
      title: 'impl Trait と dyn Trait：静的と動的',
      body: (
        <>
          <p>
            <code>impl Trait</code> は戻り値の型にも書けます。「<code>Summary</code> を実装した何か」を返すと宣言し、具体的な型を隠します。<ChapterLink n={27} /> のクロージャやイテレーターのように名前を書けない型を返すときに特に役立ちます。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
fn make_post() -> impl Summary {
    Post { username: String::from("tsumugi"), content: String::from("hi") }
}
`}
          />
          <p>
            ただし、戻り値の <code>impl Trait</code> は「1つの具体的な型」しか返せません。<code>if</code> で <code>Article</code> か <code>Post</code> かを分けて返そうとすると、E0308（<code>if</code> と <code>else</code> の型が合わない）になります。<Ref n={2} /> これは <code>impl Trait</code> がジェネリクスと同じ静的な仕組みだからです。異なる型を混ぜたいときは
            <Term en="trait object">トレイトオブジェクト</Term>
            <code>dyn Trait</code> を使います。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> String { String::from("図形") }
}
struct Circle(f64);
struct Square(f64);
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.0 * self.0 }
    fn name(&self) -> String { String::from("円") }
}
impl Shape for Square {
    fn area(&self) -> f64 { self.0 * self.0 }
}

fn total_area_static<T: Shape>(shapes: &[T]) -> f64 {       // 同じ型だけ
    shapes.iter().map(|s| s.area()).sum()
}

fn total_area_dyn(shapes: &[&dyn Shape]) -> f64 {           // 異なる型を混ぜられる
    shapes.iter().map(|s| s.area()).sum()
}

let circles = [Circle(1.0), Circle(2.0)];
total_area_static(&circles);
let mixed: Vec<&dyn Shape> = vec![&Circle(1.0), &Square(2.0)];
total_area_dyn(&mixed);

let owned: Vec<Box<dyn Shape>> = vec![Box::new(Circle(1.0)), Box::new(Square(2.0))];
`}
          />
          <p>
            トレイトオブジェクトは <code>&dyn Shape</code> や <code>Box&lt;dyn Shape&gt;</code> のように、必ずポインタの後ろに置きます（<code>Box</code> は <ChapterLink n={28} /> で扱うヒープ上の所有ポインタです）。<code>Vec&lt;Box&lt;dyn Shape&gt;&gt;</code> には <code>Circle</code> と <code>Square</code> を混ぜて入れられ、ジェネリック版の <code>Vec&lt;T&gt;</code> が1種類の型に限られるのと対照的です。<Ref n={3} /> 両者の仕組みの違いを図 25-3 に示します。
          </p>
          <Figure n="25-3" title="静的ディスパッチと動的ディスパッチ" caption="左のジェネリクスでは、呼び出す関数がコンパイル時に決まる（単相化）。右の dyn Trait では、参照がデータへのポインタと vtable へのポインタの2つからなり、実行時に vtable を引いて呼び出す関数を決める。模式図。">
            <DispatchFigure />
          </Figure>
          <p>
            図から読み取れるのは2点です。第一に、<code>&dyn Shape</code> は通常の参照より大きく、データへのポインタと
            <Term en="vtable">仮想関数表</Term>
            へのポインタの2つを持ちます。vtable は「この型の <code>area</code> はここ、<code>name</code> はここ」という関数ポインタの表で、トレイトの実装ごとに1つ作られます。<Ref n={3} /> 第二に、呼び出しのたびに表を引く分のコストがあり、呼び出し先が決まっていないのでインライン化などの最適化が効きません。<Ref n={3} /> これを
            <Term en="dynamic dispatch">動的ディスパッチ</Term>
            、単相化によるものを
            <Term en="static dispatch">静的ディスパッチ</Term>
            と呼びます。
          </p>
          <p>
            使い分けの目安は、「要素の型が常に1種類ならジェネリクス、実行時に異なる型を混ぜる必要があれば <code>dyn</code>」です。<Ref n={3} /> なお、すべてのトレイトがトレイトオブジェクトになれるわけではなく、<code>dyn</code> 互換性（object safety）という規則があります。詳細は Rust Reference に委ねられており、本書では <ChapterLink n={28} /> で必要な範囲に触れます。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'derive',
      title: 'derive できる標準トレイト',
      body: (
        <>
          <p>
            <ChapterLink n={21} /> で使った <code>#[derive(Debug)]</code> は、トレイトの実装を自動生成する属性です。標準ライブラリで <code>derive</code> できるトレイトは次のとおりで、いずれも「すべてのフィールドがそのトレイトを実装している」ことが条件です。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>トレイト</th>
                  <th>生成されるもの</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Debug</code></td>
                  <td><code>{'{:?}'}</code> による表示</td>
                  <td><code>assert_eq!</code> が失敗時の表示に要求する</td>
                </tr>
                <tr>
                  <td><code>PartialEq</code> / <code>Eq</code></td>
                  <td><code>==</code>、<code>!=</code>。全フィールドが等しければ等しい</td>
                  <td><code>Eq</code> は「必ず自分自身と等しい」の印。<code>NaN</code> を持つ浮動小数点は <code>Eq</code> になれない</td>
                </tr>
                <tr>
                  <td><code>PartialOrd</code> / <code>Ord</code></td>
                  <td><code>&lt;</code>、<code>&gt;</code> など。フィールドの宣言順に比較。列挙型は先に宣言したバリアントが小さい</td>
                  <td><code>Ord</code> は全順序。<code>sort</code> や <code>BTreeMap</code> のキーに要る</td>
                </tr>
                <tr>
                  <td><code>Clone</code> / <code>Copy</code></td>
                  <td><code>clone()</code>（各フィールドを clone した深いコピー）／代入時のビットコピー</td>
                  <td><code>Copy</code> は <code>Clone</code> が前提。全フィールドが <code>Copy</code> のときだけ</td>
                </tr>
                <tr>
                  <td><code>Hash</code></td>
                  <td>ハッシュ値の計算</td>
                  <td><code>HashMap</code> のキーに <code>Eq</code> と合わせて要る</td>
                </tr>
                <tr>
                  <td><code>Default</code></td>
                  <td><code>Type::default()</code>（各フィールドの既定値）</td>
                  <td><code>..Default::default()</code> や <code>unwrap_or_default()</code> で使う</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code
            lang="rust"
            code={`
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
struct Position { x: i32, y: i32 }

#[derive(Debug, Default, Clone, PartialEq)]
struct Settings { theme: String, font_size: u32, sidebar_open: bool }

let a = Position { x: 1, y: 2 };
let b = a;                                    // Copy なので a も使える
assert!(a == b && a < Position { x: 1, y: 3 });
let s = Settings { theme: "dark".into(), ..Default::default() };
let mut set = std::collections::HashSet::new();
set.insert(a);                                // Hash + Eq が要る
`}
          />
          <p>
            <code>Display</code> は <code>derive</code> できません。利用者にどう見せるかはプログラマにしか決められないからです。<Ref n={4} /> <code>Position</code> に全部付けられるのは <code>i32</code> がすべてを実装しているからで、<code>Settings</code> は <code>String</code> を持つので <code>Copy</code> にはできません（<ChapterLink n={19} />）。
          </p>
          <p>
            <code>serde</code> の <code>#[derive(Serialize, Deserialize)]</code> も同じ仕組みで、<code>derive</code> フィーチャーを有効にしたときに使えるようになります。<Ref n={8} /> これは <ChapterLink n={34} /> で Tauri のコマンドと JSON をやり取りするときの要になります。
          </p>
        </>
      ),
    },
    {
      id: 'std-traits',
      title: '手で実装する標準トレイト',
      body: (
        <>
          <p>derive できないが頻繁に実装するトレイトを3つ見ておきます。いずれも <ChapterLink n={24} /> で先行して使ったものです。</p>
          <h3>Display：利用者向けの表示</h3>
          <Code
            lang="rust"
            code={`
use std::fmt;

impl fmt::Display for Post {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Post by {}", self.username)
    }
}
// println!("{post}") が使え、post.to_string() も包括実装で付く
`}
          />
          <p>
            <code>write!</code> は <code>println!</code> と同じ書式で <code>Formatter</code> に書き込み、<code>fmt::Result</code> を返します。<Ref n={7} /> <code>Display</code> を実装すると、<code>{'{}'}</code> での表示、<code>to_string()</code>、そして <code>std::error::Error</code> の前提条件がそろいます。
          </p>
          <h3>From と TryFrom：型の変換</h3>
          <Code
            lang="rust"
            code={`
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum PropertyKind { Text, Number }

impl From<PropertyKind> for String {          // 失敗しない変換
    fn from(k: PropertyKind) -> Self {
        match k {
            PropertyKind::Text => "text".to_string(),
            PropertyKind::Number => "number".to_string(),
        }
    }
}

impl TryFrom<&str> for PropertyKind {         // 失敗しうる変換
    type Error = String;
    fn try_from(s: &str) -> Result<Self, Self::Error> {
        match s {
            "text" => Ok(PropertyKind::Text),
            "number" => Ok(PropertyKind::Number),
            other => Err(format!("未知の種類: {other}")),
        }
    }
}

let s: String = PropertyKind::Text.into();   // From があれば into() も使える
let k = PropertyKind::try_from("number");    // Ok(Number)
`}
          />
          <p>
            <code>From&lt;A&gt; for B</code> を実装すると、<code>B::from(a)</code> と <code>a.into()</code> の両方が使えます（<code>Into</code> は <code>From</code> から包括実装で導かれます）。<code>?</code> 演算子がエラー型を変換するときに使うのもこの <code>From</code> です（<ChapterLink n={24} />）。<code>TryFrom</code> は失敗しうる変換で、<code>type Error</code> という
            <Term en="associated type">関連型</Term>
            でエラーの型を指定します。関連型はトレイトの中で「実装側が決める型」を宣言する仕組みで、<ChapterLink n={27} /> の <code>Iterator</code> の <code>Item</code> でも使います。
          </p>
          <h3>演算子のトレイト</h3>
          <p>
            <code>+</code> や <code>==</code> のような演算子も、<code>std::ops::Add</code> や <code>PartialEq</code> というトレイトのメソッド呼び出しです。<code>impl Add for Meters</code> のように実装すれば、自分の型に <code>+</code> を定義できます。本章のコードは Rust 1.99 でコンパイルし、出力を確認しています。
          </p>
          <Callout>
            <p>
              2024 edition では、戻り値の <code>impl Trait</code> がスコープ内のすべてのライフタイムを暗黙に捕捉するようになりました。<code>fn f(x: &str) -&gt; impl Sized</code> の戻り値は、2021 edition では <code>x</code> の借用と無関係でしたが、2024 edition では <code>x</code> を借りている間しか使えない型になります。以前の動作にしたければ <code>impl Sized + use&lt;&gt;</code> と書いて捕捉するものを明示します。<Ref n={5} /> ライフタイムの概念は <ChapterLink n={26} /> で扱うので、ここでは「2024 edition で <code>impl Trait</code> の戻り値を返す関数の借用が長引くことがある」とだけ覚えておけば十分です。
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
              Tsumugi で最も多く書くトレイト実装は <code>serde</code> の <code>derive</code> です。<code>Page</code>、<code>Database</code>、<code>Row</code> などフロントエンドとやり取りする構造体には <code>#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]</code> を付け、Tauri のコマンドが JSON に変換します（<ChapterLink n={34} />、<ChapterLink n={42} />）。rusqlite の行から構造体を組み立てる処理も、行の列を <code>String</code> や <code>Option&lt;String&gt;</code> に変換するトレイト（<code>FromSql</code>）の上に成り立っています。
            </p>
            <p>
              簡易データベース（<ChapterLink n={47} />）のプロパティの種類は、TypeScript 側では <code>PropertyKind</code> 型ですが、Rust 側の <code>core</code> では <code>String</code> のまま持ち、<code>check_kind</code> 関数で許可された種類かを検査します。本章の <code>PropertyKind</code> のように列挙型と <code>From</code>／<code>TryFrom</code> で表す設計もありえますが、Tsumugi はそうしていません。エラー型 <code>AppError</code>（<ChapterLink n={24} />）には <code>Display</code>・<code>Error</code>・<code>From</code> を thiserror で、<code>Serialize</code> を serde で実装します。また、<code>core</code> クレートの関数は <code>&Connection</code> を受け取るので、テストではトレイトで差し替える代わりに、メモリ上の SQLite（<code>db::open_in_memory</code>）を渡しています（<ChapterLink n={31} />）。
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
            <li>ジェネリクスは型をパラメータ化する。<code>fn f&lt;T: Bound&gt;</code>、<code>struct S&lt;T&gt;</code>、<code>impl&lt;T&gt; S&lt;T&gt;</code>。単相化により実行時コストはない。</li>
            <li>トレイトは振る舞いの契約。<code>impl Trait for Type</code> で実装し、既定実装を持てる。孤児規則により、トレイトか型のどちらかが自分のクレートにあるときだけ実装できる。</li>
            <li>トレイト境界は <code>&impl Trait</code>、<code>&lt;T: Trait&gt;</code>、<code>where</code> の3通り。<code>+</code> で複数を要求する。包括実装で <code>Display</code> → <code>ToString</code> のような自動導出が行われる。</li>
            <li>戻り値の <code>impl Trait</code> は1つの型だけ。異なる型を混ぜるなら <code>&dyn Trait</code> や <code>Box&lt;dyn Trait&gt;</code>。前者は静的ディスパッチ、後者は vtable による動的ディスパッチで、わずかな実行時コストと引き換えに柔軟性を得る。</li>
            <li><code>derive</code> で <code>Debug</code>、<code>PartialEq</code>/<code>Eq</code>、<code>PartialOrd</code>/<code>Ord</code>、<code>Clone</code>/<code>Copy</code>、<code>Hash</code>、<code>Default</code> を自動実装できる。<code>Display</code> はできない。</li>
            <li><code>Display</code>、<code>From</code>/<code>TryFrom</code>、演算子のトレイトは手で実装する。<code>From</code> があれば <code>into()</code> と <code>?</code> の変換が使える。</li>
          </ul>
          <p>次章では、参照を持つ構造体や関数の戻り値で必要になるライフタイム注釈を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 10.1 Generic Data Types',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch10-01-syntax.html',
      accessed: '2026-11-08',
      note: 'largest<T: PartialOrd> と E0369、ジェネリックな構造体・列挙型・メソッド、impl Point<f32> の特殊化、単相化と実行時コストの根拠。',
    },
    {
      title: 'The Rust Programming Language, 10.2 Traits: Defining Shared Behavior',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch10-02-traits.html',
      accessed: '2026-11-08',
      note: 'トレイトの定義と実装、孤児規則、既定実装、impl Trait と trait bound と where、戻り値の impl Trait が1つの型に限られること、条件付き実装、包括実装の根拠。',
    },
    {
      title: 'The Rust Programming Language, 18.2 Using Trait Objects to Abstract over Shared Behavior',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch18-02-trait-objects.html',
      accessed: '2026-11-08',
      note: 'トレイトオブジェクトの構文と vtable、Vec<Box<dyn Draw>>、ジェネリクスとの違い（同種・異種）、静的ディスパッチと動的ディスパッチ、動的ディスパッチの実行時コスト、dyn 互換性の根拠。',
    },
    {
      title: 'The Rust Programming Language, Appendix C: Derivable Traits',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/appendix-03-derivable-traits.html',
      accessed: '2026-11-08',
      note: 'derive できるトレイトの一覧と意味、条件、Display が derive できない理由の根拠。',
    },
    {
      title: 'The Rust Edition Guide, Rust 2024: RPIT lifetime capture rules',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/edition-guide/rust-2024/rpit-lifetime-capture.html',
      accessed: '2026-11-08',
      version: 'Rust 2024 edition',
      note: '2024 edition で戻り値の impl Trait がスコープ内のすべてのライフタイムを捕捉すること、use<..> による明示の根拠。',
    },
    {
      title: 'std::collections — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/collections/index.html',
      accessed: '2026-11-08',
      note: 'HashSet と BTreeMap のキーに必要なトレイトの背景（前章の復習として参照）。',
    },
    {
      title: 'std::fmt — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/fmt/index.html',
      accessed: '2026-11-08',
      note: 'Display の実装方法（Formatter と write!、fmt::Result）の根拠。',
    },
    {
      title: 'serde — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/serde/latest/serde/',
      accessed: '2026-11-08',
      version: 'serde 1.0.229',
      note: 'Serialize / Deserialize の derive が derive フィーチャーで使えること、トレイトに基づく設計の根拠。',
    },
  ],
}

export default chapter
