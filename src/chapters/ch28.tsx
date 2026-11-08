import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 28-1 Box と再帰型のヒープ配置 ---------- */
function BoxFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="Cons(1, Box<List>) の連なりを表した図。スタック上の list は i32 とポインタの固定サイズで、ポインタがヒープ上の次の Cons を指し、さらにその Box が次を指して Nil で終わる">
      <defs>
        <marker id="arrow28a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="90" y="28" fontSize="15" fontWeight="600" textAnchor="middle">スタック</text>
      <rect x="20" y="45" width="140" height="80" fill="var(--fig-box)" stroke="var(--fig-line)" rx="6" />
      <text x="30" y="65" fontSize="12" fill="var(--fig-muted)">list: List</text>
      <g fontSize="13">
        <rect x="30" y="75" width="50" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="55" y="98" textAnchor="middle">1</text>
        <rect x="80" y="75" width="70" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="115" y="98" textAnchor="middle" fontSize="12">Box（ptr）</text>
      </g>
      <text x="90" y="145" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">サイズ = i32 + usize</text>
      <text x="90" y="162" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">（決まっている）</text>

      <text x="420" y="28" fontSize="15" fontWeight="600" textAnchor="middle">ヒープ</text>
      <rect x="200" y="40" width="420" height="140" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      {[
        { x: 220, v: '2' },
        { x: 370, v: '3' },
      ].map((c) => (
        <g key={c.x} fontSize="13">
          <rect x={c.x} y="75" width="50" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x={c.x + 25} y="98" textAnchor="middle">{c.v}</text>
          <rect x={c.x + 50} y="75" width="70" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x={c.x + 85} y="98" textAnchor="middle" fontSize="12">Box（ptr）</text>
          <text x={c.x + 60} y="130" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">Cons</text>
        </g>
      ))}
      <rect x="530" y="75" width="60" height="36" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="4 3" />
      <text x="560" y="98" fontSize="13" textAnchor="middle">Nil</text>
      <path d="M150,93 C180,93 190,93 218,93" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow28a)" />
      <path d="M340,93 L368,93" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow28a)" />
      <path d="M490,93 L528,93" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow28a)" />
      <text x="320" y="215" fontSize="13" fill="var(--fig-muted)" textAnchor="middle">Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))))</text>
      <text x="320" y="240" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：Box はポインタ1つ分の固定サイズなので、再帰型のサイズが決まる</text>
    </svg>
  )
}

/* ---------- 図 28-2 Rc の参照カウント ---------- */
function RcFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="ヒープ上の1つの値を a・b・c の3つの Rc が共有している図。値の横に強参照カウント 3 が表示され、c がスコープを抜けると 2 に減り、0 になったときだけ解放される流れを下に示す">
      <defs>
        <marker id="arrow28b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {[
        { y: 40, name: 'a: Rc<List>', note: 'Rc::new(…)' },
        { y: 100, name: 'b 内の Rc', note: 'Rc::clone(&a)' },
        { y: 160, name: 'c 内の Rc', note: 'Rc::clone(&a)' },
      ].map((r) => (
        <g key={r.y} fontSize="13">
          <rect x="20" y={r.y} width="170" height="44" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="6" />
          <text x="105" y={r.y + 19} textAnchor="middle">{r.name}</text>
          <text x="105" y={r.y + 36} textAnchor="middle" fontSize="11" fill="var(--fig-muted)">{r.note}</text>
          <path d={`M190,${r.y + 22} C280,${r.y + 22} 300,122 358,122`} fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow28b)" />
        </g>
      ))}
      <rect x="360" y="80" width="260" height="84" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <text x="490" y="104" fontSize="13" textAnchor="middle">ヒープ上の値（Cons(5, …)）</text>
      <rect x="400" y="116" width="180" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
      <text x="490" y="138" fontSize="13" textAnchor="middle">strong_count = 3</text>
      <g fontSize="12">
        <text x="20" y="240">時系列：</text>
        <text x="90" y="240">a を作る → 1</text>
        <text x="200" y="240">b を作る → 2</text>
        <text x="310" y="240">c を作る → 3</text>
        <text x="420" y="240">c がスコープを抜ける → 2</text>
        <text x="20" y="268" fill="var(--fig-muted)">clone はカウントを 1 増やすだけで、値はコピーしない。カウントが 0 になった時点で値が解放される</text>
      </g>
    </svg>
  )
}

/* ---------- 図 28-3 RefCell の実行時借用チェック ---------- */
function RefCellFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="コンパイル時に借用を検査する参照と Box、実行時に検査する RefCell を上下で比べた図。RefCell は内部に借用カウンタを持ち、borrow で不変借用数を増やし、borrow_mut は他の借用が 0 のときだけ成功、違反すると panic する">
      <text x="320" y="26" fontSize="15" fontWeight="600" textAnchor="middle">借用規則はどちらでも同じ：可変参照1つ か 不変参照いくつか</text>
      <rect x="20" y="45" width="290" height="110" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <text x="165" y="70" fontSize="14" fontWeight="600" textAnchor="middle">{'&T / &mut T、Box<T>'}</text>
      <text x="165" y="95" fontSize="12" textAnchor="middle">検査するのは：コンパイラ</text>
      <text x="165" y="115" fontSize="12" textAnchor="middle">違反すると：コンパイルエラー</text>
      <text x="165" y="135" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実行時コストなし。Rust の既定</text>

      <rect x="330" y="45" width="290" height="110" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="8" />
      <text x="475" y="70" fontSize="14" fontWeight="600" textAnchor="middle">{'RefCell<T>'}</text>
      <text x="475" y="95" fontSize="12" textAnchor="middle">検査するのは：RefCell 自身（実行時）</text>
      <text x="475" y="115" fontSize="12" textAnchor="middle" fill="var(--fig-danger)">違反すると：panic</text>
      <text x="475" y="135" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">借用の数を数える小さなコストがある</text>

      {/* RefCell の内部 */}
      <rect x="120" y="180" width="400" height="100" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="320" y="202" fontSize="13" fontWeight="600" textAnchor="middle">{'RefCell<Vec<String>> の内部'}</text>
      <rect x="140" y="215" width="150" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
      <text x="215" y="236" fontSize="12" textAnchor="middle">value: Vec</text>
      <text x="215" y="254" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">（守られる値）</text>
      <rect x="310" y="215" width="190" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
      <text x="405" y="236" fontSize="12" textAnchor="middle">借用カウンタ</text>
      <text x="405" y="254" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">borrow: +1 / borrow_mut: 排他</text>
    </svg>
  )
}

/* ---------- 図 28-4 Weak で循環を断つ ---------- */
function WeakFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="左は親子が互いに Rc で指し合う循環参照で、どちらの強参照カウントも 0 にならず解放されない。右は親から子は Rc、子から親は Weak で指す木構造で、Weak は強参照カウントを増やさないため親が先に解放されても子は upgrade で None を受け取るだけで済む">
      <defs>
        <marker id="arrow28d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
        <marker id="arrow28e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-muted)" />
        </marker>
      </defs>
      {/* 左: 循環 */}
      <text x="160" y="26" fontSize="15" fontWeight="600" textAnchor="middle">Rc どうしの循環（漏れる）</text>
      <rect x="60" y="50" width="200" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="160" y="75" fontSize="13" textAnchor="middle">branch（親）</text>
      <text x="160" y="95" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">strong = 2</text>
      <rect x="60" y="190" width="200" height="60" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="160" y="215" fontSize="13" textAnchor="middle">leaf（子）</text>
      <text x="160" y="235" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">strong = 2</text>
      <path d="M120,110 L120,188" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow28d)" />
      <text x="90" y="155" fontSize="11" textAnchor="middle">Rc</text>
      <path d="M200,190 L200,112" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow28d)" />
      <text x="230" y="155" fontSize="11" textAnchor="middle">Rc</text>
      <text x="160" y="285" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">変数が消えても互いが支え合い、</text>
      <text x="160" y="302" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">カウントが 0 にならない</text>

      <line x1="320" y1="40" x2="320" y2="300" stroke="var(--fig-line)" strokeDasharray="4 4" />

      {/* 右: Weak */}
      <text x="480" y="26" fontSize="15" fontWeight="600" textAnchor="middle">親→子は Rc、子→親は Weak</text>
      <rect x="380" y="50" width="200" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="480" y="75" fontSize="13" textAnchor="middle">branch（親）</text>
      <text x="480" y="95" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">strong = 1, weak = 1</text>
      <rect x="380" y="190" width="200" height="60" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="480" y="215" fontSize="13" textAnchor="middle">leaf（子）</text>
      <text x="480" y="235" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">strong = 2, weak = 0</text>
      <path d="M440,110 L440,188" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow28d)" />
      <text x="410" y="155" fontSize="11" textAnchor="middle">Rc</text>
      <path d="M520,190 L520,112" stroke="var(--fig-muted)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow28e)" />
      <text x="555" y="155" fontSize="11" textAnchor="middle">Weak</text>
      <text x="480" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">Weak は strong を増やさない。親が消えると</text>
      <text x="480" y="302" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">upgrade() は None を返す</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 28,
  part: 4,
  title: 'スマートポインタと内部可変性',
  summary:
    '所有権の規則だけでは表しにくい「ヒープに置きたい」「所有者を複数にしたい」「不変の値を内側から変えたい」という要求に応えるのがスマートポインタです。Box・Rc・RefCell・Weak の4つを、それぞれが解く問題と図で理解し、Deref と Drop の役割も押さえます。',
  goals: [
    'スマートポインタが Deref と Drop を実装した構造体であることを説明できる',
    'Box<T> が解決する問題（再帰型、大きなデータの移動、トレイトオブジェクト）を挙げられる',
    'Rc<T> の参照カウントの増減を追い、Rc::clone が値をコピーしない理由を説明できる',
    'RefCell<T> の実行時借用チェックと panic の条件を説明し、Rc<RefCell<T>> を使える',
    '循環参照によるメモリリークと、Weak<T> で断つ方法を説明できる',
  ],
  prerequisites: [19, 20, 21, 25],
  sections: [
    {
      id: 'intro',
      title: 'スマートポインタとは',
      body: (
        <>
          <p>
            <ChapterLink n={20} /> で学んだ参照 <code>&</code> は、値を借りるだけの最も単純なポインタです。それに対して
            <Term en="smart pointer">スマートポインタ</Term>
            は、ポインタとして振る舞いつつ、追加の情報や能力を持つデータ構造です。多くの場合は値を所有します。<code>String</code> や <code>Vec</code> も、ヒープ上のメモリを所有し、長さなどの情報を持つ点でスマートポインタに近い型です。<Ref n={1} />
          </p>
          <p>
            スマートポインタは構造体として実装され、2つのトレイトで「ポインタらしさ」を得ています。<code>Deref</code> は <code>*</code> で中身を取り出せるようにし、参照と同じ書き方で扱えるようにします。<code>Drop</code> はスコープを抜けたときの後片付け（ヒープの解放など）を定義します。<Ref n={1} /> この章ではまず、標準ライブラリで最もよく使う3つを扱います。
          </p>
          <ul>
            <li><code>{'Box<T>'}</code>：値をヒープに置く。最も単純。</li>
            <li><code>{'Rc<T>'}</code>：参照カウントで、1つの値に複数の所有者を許す。</li>
            <li><code>{'RefCell<T>'}</code>：借用規則の検査をコンパイル時ではなく実行時に行い、不変の値を内側から変えられるようにする。</li>
          </ul>
          <p>
            最後に、<code>Rc</code> と <code>RefCell</code> を組み合わせたときに起きる循環参照と、それを <code>{'Weak<T>'}</code> で断つ方法を見ます。これらは単一スレッド向けで、スレッド間で共有する版（<code>Arc</code>、<code>Mutex</code>）は <ChapterLink n={29} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'box',
      title: 'Box<T>：値をヒープに置く',
      body: (
        <>
          <p>
            <code>{'Box<T>'}</code> は、値をスタックではなくヒープに置き、スタックにはそこを指すポインタだけを残します。ヒープを使うこと以外の追加コストはなく、できることも多くありません。<Ref n={1} /> 公式ブックは、使う場面を3つ挙げています。<Ref n={1} />
          </p>
          <ol>
            <li>コンパイル時にサイズが分からない型を、サイズが必要な文脈で使うとき（再帰型）。</li>
            <li>大きなデータの所有権を、コピーせずに移したいとき（ポインタだけが動く）。</li>
            <li>具体的な型ではなく「あるトレイトを実装している」ことだけが重要な値を所有したいとき（<ChapterLink n={25} /> の <code>dyn Trait</code>）。</li>
          </ol>
          <p>1番目を例で見ます。Lisp 由来の cons リストという再帰的なデータ構造を定義しようとすると、コンパイルが通りません。</p>
          <Code
            lang="rust"
            code={`
enum List {
    Cons(i32, List),   // 自分自身を直接含む
    Nil,
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0072]: recursive type \`List\` has infinite size
  |
1 | enum List {
  | ^^^^^^^^^
2 |     Cons(i32, List),
  |               ---- recursive without indirection
  |
help: insert some indirection (e.g., a \`Box\`, \`Rc\`, or \`&\`) to break the cycle
  |
2 |     Cons(i32, Box<List>),
  |               ++++    +
`}
          />
          <p>
            <code>List</code> のサイズを求めるには <code>Cons</code> のサイズが要り、そのためには <code>List</code> のサイズが要る、と無限に続いてしまいます。コンパイラの提案どおり <code>Box</code> で包むと、<code>Cons</code> が持つのは「ポインタ1つ分」の固定サイズになり、解決します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
`}
          />
          <Figure n="28-1" title="Box による再帰型のヒープ配置" caption="スタック上の list は i32 とポインタの固定サイズ。各 Box がヒープ上の次の Cons を指し、Nil で終わる。Box は1つの値を所有し、スコープを抜けるとポインタとヒープの両方が解放される。模式図。">
            <BoxFigure />
          </Figure>
          <p>
            <code>Box</code> は所有者が1つで、借用規則はコンパイル時に検査されます。普通の値と同じ感覚で使え、<code>*b</code> で中身を取り出せます。実務では、再帰的な木（Tsumugi のページツリーを Rust 側で組み立てる場面など）や、<ChapterLink n={24} /> で触れた <code>{'Box<dyn Error>'}</code> のようなトレイトオブジェクトで目にすることが多いでしょう。
          </p>
          <h3>Deref と Drop</h3>
          <p>
            <code>Box</code> が <code>*</code> で中身を取り出せるのは <code>Deref</code> トレイトを実装しているからです。自作の構造体に <code>Deref</code> を実装すると、コンパイラは <code>*y</code> を <code>*(y.deref())</code> と読み替えます。さらに<Term en="deref coercion">参照外し型強制</Term>という仕組みがあり、<code>{'&Box<String>'}</code> を <code>&str</code> を受け取る関数に渡すと、コンパイラが <code>deref</code> を必要な回数だけ自動で呼んで変換します。<code>{'&String'}</code> を <code>&str</code> として渡せるのも同じ仕組みです。<Ref n={2} />
          </p>
          <p>
            <code>Drop</code> トレイトは、値がスコープを抜けるときに呼ばれる <code>drop(&mut self)</code> を定義します。変数は作られた順と逆に drop されます。ロックやファイルなどを早めに手放したいときは、メソッドの <code>.drop()</code> を直接呼ぶことはできず（E0040）、プレリュードの関数 <code>drop(値)</code> を使います。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data \`{}\`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created");
    drop(c);                                       // ここで drop が呼ばれる
    println!("CustomSmartPointer dropped before the end of main");
}
`}
          />
        </>
      ),
    },
    {
      id: 'rc',
      title: 'Rc<T>：所有者を複数にする',
      body: (
        <>
          <p>
            所有権の規則では所有者は1つです。しかしグラフ構造のように、複数の辺が同じノードを指し、どれか1つでも残っていればノードを生かしておきたい場合があります。
            <Term en="reference counting">参照カウント</Term>
            を行う <code>{'Rc<T>'}</code> は、値を指している参照の数を数え、0 になったときに値を解放します。<Ref n={4} />
          </p>
          <p>
            先ほどの cons リストで、2つのリスト <code>b</code> と <code>c</code> が同じリスト <code>a</code> を共有したいとします。<code>Box</code> では <code>a</code> を <code>b</code> に move した時点で <code>c</code> から使えなくなります（E0382）。<code>Rc</code> に替えると書けます。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use List::{Cons, Nil};
use std::rc::Rc;                         // Rc はプレリュードに無いので use が要る

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));   // 1
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));   // 2
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a)); // 3
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a)); // 2
}
`}
          />
          <p>
            <code>Rc::clone(&a)</code> は値を深くコピーせず、カウントを 1 増やすだけです。<code>a.clone()</code> と書いても同じですが、Rust では「<code>Rc::clone</code> と書いてあればカウントを増やすだけの安い処理、普通の <code>clone</code> は深いコピー」と見分けられるように、関数形式で書く慣習があります。<Ref n={4} /> 次の図は、3つの所有者が1つの値を共有している状態です。
          </p>
          <Figure n="28-2" title="Rc の参照カウント" caption="a・b・c の Rc が同じヒープ上の値を指し、strong_count は 3。clone でカウントが増え、Rc が drop されるとカウントが減る。0 になった時点で値が解放される。模式図。">
            <RcFigure />
          </Figure>
          <p>
            重要な制約が2つあります。第一に、<code>Rc</code> は単一スレッド専用です。カウントの増減がスレッド安全ではないため、スレッドをまたいで送ろうとするとコンパイルエラーになります（<ChapterLink n={29} /> の <code>Arc</code> がその解決です）。第二に、<code>Rc</code> を通して得られるのは不変参照だけです。所有者が複数いる値を自由に書き換えられたら、借用規則が破れてしまうからです。<Ref n={4} /> 「共有しつつ変更したい」という要求には、次の <code>RefCell</code> を組み合わせます。
          </p>
        </>
      ),
    },
    {
      id: 'refcell',
      title: 'RefCell<T>：借用規則を実行時に検査する',
      body: (
        <>
          <p>
            <Term en="interior mutability">内部可変性</Term>とは、不変参照しか無い状況でも値を変更できるようにする設計パターンです。データ構造の内部で <code>unsafe</code> なコードを使い、それを安全な API で包むことで実現されます。<Ref n={5} /> その代表が <code>{'RefCell<T>'}</code> です。
          </p>
          <p>借用規則そのものは変わりません。「可変参照は1つだけ、または不変参照はいくつでも」「参照は常に有効」です。違うのは検査のタイミングです。<Ref n={5} /></p>
          <Figure n="28-3" title="コンパイル時の借用チェックと RefCell の実行時借用チェック" caption="上段：参照と Box はコンパイラが検査し、違反はコンパイルエラー。RefCell は自分で借用の数を数え、違反すると実行時に panic する。下段は RefCell の内部の模式図。">
            <RefCellFigure />
          </Figure>
          <p>
            コンパイル時の検査は早く問題を見つけられ、実行時コストも無いので Rust の既定です。一方、借用チェッカは保守的で、人間にはメモリ安全だと分かるプログラムを拒否することがあります。<code>RefCell</code> は、そのような場合に「規則を守る責任を実行時の検査に委ねる」道具です。<Ref n={5} /> 使い方は2つのメソッドに集約されます。
          </p>
          <ul>
            <li><code>borrow()</code>：不変借用。<code>{'Ref<T>'}</code> というスマートポインタを返し、不変借用の数を 1 増やす。drop されると 1 減る。</li>
            <li><code>borrow_mut()</code>：可変借用。<code>{'RefMut<T>'}</code> を返す。他の借用が1つでも生きていれば panic する。</li>
          </ul>
          <p>
            公式ブックの例は、テストで使う「送信したメッセージを記録するモック」です。トレイトのメソッドが <code>&self</code> しか受け取らないため、普通の <code>{'Vec<String>'}</code> フィールドには push できません（E0596）。<code>RefCell</code> で包むと解決します。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
pub trait Messenger {
    fn send(&self, msg: &str);        // &self なので、素直には自分を変更できない
}

struct MockMessenger {
    sent_messages: RefCell<Vec<String>>,
}

impl Messenger for MockMessenger {
    fn send(&self, message: &str) {
        self.sent_messages.borrow_mut().push(String::from(message)); // &self のまま変更
    }
}

// テスト側
let mock = MockMessenger { sent_messages: RefCell::new(vec![]) };
mock.send("hello");
assert_eq!(mock.sent_messages.borrow().len(), 1);
`}
          />
          <p>規則を破るとどうなるかも見ておきます。同じスコープで <code>borrow_mut</code> を2回呼ぶコードはコンパイルは通りますが、実行すると panic します。<Ref n={5} /></p>
          <Code
            lang="rust"
            code={`
let mut one_borrow = self.sent_messages.borrow_mut();
let mut two_borrow = self.sent_messages.borrow_mut(); // ここで panic
`}
          />
          <Code
            lang="text"
            code={`
thread 'tests::it_sends_an_over_75_percent_warning_message' panicked at src/lib.rs:60:53:
RefCell already borrowed
`}
          />
          <p>
            問題が本番環境まで見つからない可能性があることと、借用を数える小さな実行時コストがあることが、<code>RefCell</code> の代償です。<Ref n={5} /> 3つの型の違いを表にまとめます。<Ref n={5} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>{'Box<T>'}</code></th>
                  <th><code>{'Rc<T>'}</code></th>
                  <th><code>{'RefCell<T>'}</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>所有者</td>
                  <td>1つ</td>
                  <td>複数</td>
                  <td>1つ</td>
                </tr>
                <tr>
                  <td>許される借用</td>
                  <td>不変も可変も</td>
                  <td>不変のみ</td>
                  <td>不変も可変も</td>
                </tr>
                <tr>
                  <td>検査のタイミング</td>
                  <td>コンパイル時</td>
                  <td>コンパイル時</td>
                  <td>実行時</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>{'Rc<RefCell<T>>'}：共有して、変更する</h3>
          <p>
            <code>Rc</code> は複数の所有者を、<code>RefCell</code> は内側からの変更を提供します。組み合わせた <code>{'Rc<RefCell<T>>'}</code> は「複数の場所から共有され、どこからでも変更できる値」になります。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
use std::cell::RefCell;
use std::rc::Rc;

let value = Rc::new(RefCell::new(5));
let shared = Rc::clone(&value);   // 同じ RefCell を指す

*value.borrow_mut() += 10;        // value 側から変更
println!("shared = {}", shared.borrow()); // shared = 15
`}
          />
          <Callout kind="warn">
            <p>
              <code>{'Rc<RefCell<T>>'}</code> は便利ですが、「何でも共有して何でも変更できる」状態は、所有権が与えてくれる見通しのよさを手放すことでもあります。まず所有型と借用で書けないかを考え、どうしても必要な局所的な場面（GUI の木構造、テストのモックなど）に限って使うのが無難です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'weak',
      title: '循環参照と Weak<T>',
      body: (
        <>
          <p>
            Rust の安全性保証にメモリリークの防止は含まれていません。<code>Rc</code> と <code>RefCell</code> を組み合わせると、値どうしが互いを指し合う
            <Term en="reference cycle">循環参照</Term>
            を作れてしまい、どちらのカウントも 0 にならないため、永久に解放されません。<Ref n={6} />
          </p>
          <p>
            典型例は親子関係です。親が子を <code>Rc</code> で持ち、子も親を <code>Rc</code> で持つと、両方の変数が消えても互いに支え合って残ります。解決策は、片方向だけを「所有しない参照」にすることです。それが <code>{'Weak<T>'}</code> です。<Ref n={6} />
          </p>
          <ul>
            <li><code>Rc::downgrade(&rc)</code> で <code>{'Weak<T>'}</code> を作る。<code>weak_count</code> が 1 増えるが、<code>strong_count</code> は変わらない。</li>
            <li>値が解放されるかどうかは <code>strong_count</code> だけで決まる。<code>weak_count</code> が残っていても解放される。</li>
            <li><code>Weak</code> から値を使うには <code>upgrade()</code> を呼ぶ。戻り値は <code>{'Option<Rc<T>>'}</code> で、値がすでに解放されていれば <code>None</code>。</li>
          </ul>
          <Figure n="28-4" title="Weak で循環を断つ" caption="左：親子が互いを Rc で指すと、どちらの strong_count も 0 にならず漏れる。右：子から親は Weak（点線）にすると strong_count に数えられず、親が先に消えても upgrade が None を返すだけで安全。模式図。">
            <WeakFigure />
          </Figure>
          <p>公式ブックの木構造の例です。親から子へは <code>{'RefCell<Vec<Rc<Node>>>'}</code>、子から親へは <code>{'RefCell<Weak<Node>>'}</code> で結びます。<Ref n={6} /></p>
          <Code
            lang="rust"
            code={`
use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,          // 親は所有しない
    children: RefCell<Vec<Rc<Node>>>,     // 子は所有する
}

fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
    // leaf strong = 1, weak = 0

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });
        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);
        // branch strong = 1, weak = 1
        // leaf   strong = 2, weak = 0
        println!("{:?}", leaf.parent.borrow().upgrade().map(|p| p.value)); // Some(5)
    }   // branch の strong が 0 になり解放される。weak が 1 残っていても構わない

    println!("{:?}", leaf.parent.borrow().upgrade()); // None
    // leaf strong = 1, weak = 0
}
`}
          />
          <p>
            内側のブロックを抜けると <code>branch</code> は解放され、<code>leaf</code> の <code>parent</code> を <code>upgrade</code> すると <code>None</code> が返ります。<code>Option</code> を必ず扱わせることで、無効なポインタに触れる事故が起きません。<Ref n={6} /> 「所有する方向は <code>Rc</code>、逆向きは <code>Weak</code>」が木やグラフを組むときの基本形です。
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
              Tsumugi の Rust 側で、この章の型を直接使う場面は多くありません。ページの親子関係は <code>pages.parent_id</code> として SQLite に持たせ、Rust 側ではフラットな <code>{'Vec<PageSummary>'}</code> を返してフロントエンドの React（<ChapterLink n={43} />）が木を組み立てるからです。所有型で済むなら <code>Rc</code> も <code>RefCell</code> も要らない、というのがこの設計の利点です。
            </p>
            <p>
              それでもこの章が重要なのは、<ChapterLink n={36} /> で学ぶアプリ状態の持ち方が、ここで学んだ考え方のスレッド版だからです。Tauri はアプリ状態を複数のコマンドから共有し、コマンドは <code>&self</code> 相当の共有参照でしか状態に触れません。それでも SQLite の接続を書き換えたいので、内部可変性が必要になります。単一スレッドなら <code>{'Rc<RefCell<Connection>>'}</code> ですが、Tauri のコマンドは複数スレッドから呼ばれうるので、<ChapterLink n={29} /> で学ぶ <code>{'Mutex<Connection>'}</code> を使います。「共有は <code>Rc</code>/<code>Arc</code>、内側からの変更は <code>RefCell</code>/<code>Mutex</code>」という対応を覚えておいてください。
            </p>
            <p>
              また、エラー型を <code>{'Box<dyn Error>'}</code> で束ねる場面（<ChapterLink n={24} />）や、BlockNote のブロックを再帰的な構造体として表すとき（子ブロックを <code>{'Vec<Block>'}</code> で持つ場合は <code>Vec</code> 自体がヒープを使うので <code>Box</code> は不要）に、<code>Box</code> の知識が判断の根拠になります。
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
            <li>スマートポインタは <code>Deref</code>（<code>*</code> で中身を取り出す、参照外し型強制）と <code>Drop</code>（スコープ終了時の後片付け）を実装した構造体。</li>
            <li><code>{'Box<T>'}</code> は値をヒープに置く。再帰型のサイズを決める、大きな値をコピーせず移す、トレイトオブジェクトを所有する、の3用途。</li>
            <li><code>{'Rc<T>'}</code> は参照カウントで複数の所有者を許す。<code>Rc::clone</code> はカウントを増やすだけ。単一スレッド専用で、不変参照しか得られない。</li>
            <li><code>{'RefCell<T>'}</code> は借用規則を実行時に検査し、違反すると panic する。<code>&self</code> からでも値を変更できる内部可変性を与える。<code>{'Rc<RefCell<T>>'}</code> で「共有して変更」ができる。</li>
            <li>循環参照はメモリリークになる。所有しない方向を <code>{'Weak<T>'}</code> にし、<code>upgrade()</code> の <code>Option</code> で安全に扱う。</li>
          </ul>
          <p>次章では、これらのスレッド安全版である <code>Arc</code> と <code>Mutex</code> を使って、複数のスレッドで状態を共有する方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 15.1: Using Box<T> to Point to Data on the Heap',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-01-box.html',
      accessed: '2026-11-08',
      note: 'スマートポインタの定義、Box の3つの用途、cons リストと E0072、Box による解決の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 15.2: Treating Smart Pointers Like Regular References with Deref',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-02-deref.html',
      accessed: '2026-11-08',
      note: 'Deref トレイト、*y の読み替え、参照外し型強制の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 15.3: Running Code on Cleanup with the Drop Trait',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-03-drop.html',
      accessed: '2026-11-08',
      note: 'Drop トレイト、drop の順序、E0040、std::mem::drop の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 15.4: Rc<T>, the Reference Counted Smart Pointer',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-04-rc.html',
      accessed: '2026-11-08',
      note: 'Rc の目的、Rc::clone の慣習、strong_count の推移、単一スレッド限定と不変参照のみの制約の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 15.5: RefCell<T> and the Interior Mutability Pattern',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-05-interior-mutability.html',
      accessed: '2026-11-08',
      note: '内部可変性、RefCell の実行時借用チェック、borrow/borrow_mut、MockMessenger の例、panic メッセージ、Box/Rc/RefCell の比較表、Rc<RefCell<T>> の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 15.6: Reference Cycles Can Leak Memory',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch15-06-reference-cycles.html',
      accessed: '2026-11-08',
      note: '循環参照によるリーク、Weak、downgrade/upgrade、strong_count と weak_count、木構造の Node の例の根拠。',
    },
  ],
}

export default chapter
