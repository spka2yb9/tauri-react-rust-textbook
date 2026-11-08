import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 20-1 参照はヒープを指す変数を指す ---------- */
function ReferenceFigure() {
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label="参照 s が変数 s1 を指し、s1 がヒープ上の文字列 hello を指している二段構えの図。s は所有権を持たないので、s がスコープを抜けてもヒープは解放されない">
      <defs>
        <marker id="arrow20a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="60" width="150" height="90" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="30" y="80" fontSize="12" fill="var(--fig-muted)">s: &String（参照）</text>
        <rect x="30" y="90" width="130" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="40" y="112">ptr</text>
        <text x="95" y="140" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">所有権なし</text>

        <rect x="240" y="40" width="160" height="150" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="250" y="60" fontSize="12" fill="var(--fig-muted)">s1: String（所有者）</text>
        <rect x="250" y="70" width="140" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="260" y="92">ptr</text>
        <rect x="250" y="104" width="140" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="260" y="126">len</text>
        <text x="370" y="126" textAnchor="end">5</text>
        <rect x="250" y="138" width="140" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="260" y="160">capacity</text>
        <text x="370" y="160" textAnchor="end">5</text>

        <rect x="450" y="70" width="170" height="80" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="535" y="90" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">ヒープ</text>
        {['h', 'e', 'l', 'l', 'o'].map((c, i) => (
          <g key={i}>
            <rect x={462 + i * 30} y="100" width="30" height="30" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x={477 + i * 30} y="121" textAnchor="middle">{c}</text>
          </g>
        ))}

        <path d="M160,107 C200,107 200,87 245,87" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow20a)" />
        <path d="M390,87 C420,87 420,115 458,115" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow20a)" />
      </g>
      <text x="320" y="225" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">let s1 = String::from("hello"); let s = &s1;　模式図：アドレスや内部表現は省略</text>
    </svg>
  )
}

/* ---------- 図 20-2 借用規則 ---------- */
function BorrowRulesFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="借用規則の図。左は同じ値に対して不変参照が3つ同時に存在してよい状態。右は可変参照が1つだけ存在する状態で、その間は他の参照を作れない。両方を同時に持つことは禁止">
      <defs>
        <marker id="arrow20b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 左：不変参照は複数OK */}
        <text x="160" y="30" textAnchor="middle" fontWeight="600" fontSize="15">不変参照 &T：いくつでも</text>
        <rect x="110" y="200" width="100" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="160" y="227" textAnchor="middle" fontWeight="600">値 s</text>
        {[60, 160, 260].map((x, i) => (
          <g key={i}>
            <rect x={x - 40} y="60" width="80" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
            <text x={x} y="85" textAnchor="middle">&s（r{i + 1}）</text>
            <path d={`M${x},100 L${x > 160 ? 190 : x < 160 ? 130 : 160},195`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow20b)" />
          </g>
        ))}
        <text x="160" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">読むだけ。互いに干渉しない</text>
        <text x="160" y="270" textAnchor="middle" fill="var(--fig-accent)">OK</text>

        {/* 仕切り */}
        <line x1="320" y1="20" x2="320" y2="280" stroke="var(--fig-line)" strokeDasharray="4 4" />

        {/* 右：可変参照は1つだけ */}
        <text x="480" y="30" textAnchor="middle" fontWeight="600" fontSize="15">可変参照 &mut T：1つだけ</text>
        <rect x="430" y="200" width="100" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="480" y="227" textAnchor="middle" fontWeight="600">値 s</text>
        <rect x="430" y="60" width="100" height="40" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="480" y="85" textAnchor="middle">&mut s</text>
        <path d="M480,100 L480,195" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow20b)" />
        <g opacity="0.6">
          <rect x="560" y="60" width="70" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-danger)" strokeDasharray="5 3" />
          <text x="595" y="85" textAnchor="middle">&s</text>
          <line x1="565" y1="65" x2="625" y2="95" stroke="var(--fig-danger)" strokeWidth="2" />
          <line x1="565" y1="95" x2="625" y2="65" stroke="var(--fig-danger)" strokeWidth="2" />
        </g>
        <text x="480" y="130" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">書き換える間、他の参照は作れない</text>
        <text x="480" y="270" textAnchor="middle" fill="var(--fig-danger)">同時に &s を作ると E0502</text>
      </g>
    </svg>
  )
}

/* ---------- 図 20-3 スライスのメモリ ---------- */
function SliceFigure() {
  const chars = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="String s がヒープ上の hello world を所有し、スライス world が ptr と len の2つの値で、ヒープのバイト位置6から長さ5の範囲を指している図">
      <defs>
        <marker id="arrow20c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* s */}
        <rect x="20" y="30" width="150" height="120" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="30" y="50" fontSize="12" fill="var(--fig-muted)">s: String</text>
        <rect x="30" y="60" width="130" height="28" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="38" y="79">ptr</text>
        <rect x="30" y="88" width="130" height="28" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="38" y="107">len</text>
        <text x="150" y="107" textAnchor="end">11</text>
        <rect x="30" y="116" width="130" height="28" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="38" y="135">capacity</text>
        <text x="150" y="135" textAnchor="end">11</text>

        {/* world slice */}
        <rect x="20" y="180" width="150" height="90" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="30" y="200" fontSize="12" fill="var(--fig-muted)">world: &str（スライス）</text>
        <rect x="30" y="210" width="130" height="28" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="38" y="229">ptr</text>
        <rect x="30" y="238" width="130" height="28" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="38" y="257">len</text>
        <text x="150" y="257" textAnchor="end">5</text>

        {/* heap */}
        <rect x="220" y="60" width="400" height="120" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="420" y="80" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">ヒープ</text>
        {chars.map((c, i) => (
          <g key={i}>
            <rect x={235 + i * 34} y="95" width="34" height="34" fill={i >= 6 ? 'var(--fig-box3)' : 'var(--fig-bg)'} stroke="var(--fig-line)" />
            <text x={252 + i * 34} y="118" textAnchor="middle">{c === ' ' ? '␣' : c}</text>
            <text x={252 + i * 34} y="150" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">{i}</text>
          </g>
        ))}
        <text x="420" y="172" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">添字（バイト位置）。青い範囲がスライスの指す部分</text>

        <path d="M160,74 C200,74 200,112 233,112" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow20c)" />
        <path d="M160,224 C300,224 330,200 439,135" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow20c)" />
      </g>
      <text x="400" y="235" fontSize="13" textAnchor="middle" fill="var(--fig-muted)">let world = &s[6..11];</text>
      <text x="400" y="258" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">スライスは capacity を持たない。所有権も持たない。模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 20,
  part: 4,
  title: '参照と借用、スライス',
  summary:
    '所有権を渡さずに値を使わせる仕組みが参照と借用です。不変参照と可変参照、「可変1つか不変複数か」という借用規則、ダングリング参照をコンパイラが防ぐ仕組みを学び、文字列やコレクションの一部を指すスライスと、&str と String の関係を理解します。',
  goals: [
    '& と &mut で参照を作り、関数に所有権を渡さずに値を使わせることができる',
    '借用規則（可変参照は1つ、または不変参照は複数）を説明し、E0499・E0502 を読める',
    '参照の有効範囲が「最後に使われた場所まで」であることを説明できる',
    'ダングリング参照がコンパイルエラー（E0106）で防がれる理由を説明できる',
    'スライスが ptr と len からなることを説明し、&str と String を正しく使い分けられる',
    '関数の引数に &String ではなく &str、&Vec<T> ではなく &[T] を使う理由を説明できる',
  ],
  prerequisites: [18, 19],
  sections: [
    {
      id: 'why-references',
      title: '所有権を渡さずに使わせたい',
      body: (
        <>
          <p>
            <ChapterLink n={19} /> では、<code>String</code> を関数に渡すと所有権が移り、使い続けたければ戻り値で返してもらう必要がありました。文字列の長さを数えるだけの関数にいちいち所有権を渡して返してもらうのは、明らかに面倒です。
          </p>
          <p>
            そこで Rust には、値そのものではなく「値の場所」を渡す仕組みがあります。これが
            <Term en="reference">参照</Term>
            です。参照は値を指すポインタですが、所有権を持ちません。参照を作ることを
            <Term en="borrowing">借用</Term>
            と呼びます。公式ブックの言い方を借りれば、持ち主から借りて、使い終わったら返す。自分のものにはならない、ということです。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // &s1 で参照を渡す
    println!("The length of '{s1}' is {len}."); // s1 はまだ使える
}

fn calculate_length(s: &String) -> usize { // &String を受け取る
    s.len()
} // s はスコープを抜けるが、所有権がないので何も drop されない
`}
          />
          <p>
            <code>&s1</code> が参照を作る構文で、受け取る側の型 <code>&String</code> が「<code>String</code> への参照」です。関数の中で <code>s</code> がスコープを抜けても、<code>s</code> は持ち主ではないので、ヒープの文字列は解放されません。<Ref n={1} /> この様子を図 20-1 に示します。
          </p>
          <Figure n="20-1" title="参照は所有者を指す" caption="参照 s は変数 s1 を指し、s1 がヒープを指す。s はポインタ1つ分の値で、所有権を持たない。s が消えても s1 とヒープは残る。">
            <ReferenceFigure />
          </Figure>
          <p>
            図で見ると、参照はスタック上の「所有者を指すポインタ」にすぎません。JavaScript でオブジェクトを関数に渡すときの「参照渡し」に近い感覚ですが、Rust ではそれが型（<code>&String</code>）として明示され、使い方に規則が付きます。その規則を次の節で見ます。
          </p>
        </>
      ),
    },
    {
      id: 'mutable-references',
      title: '不変参照と可変参照',
      body: (
        <>
          <p>変数と同じく、参照も既定では不変です。借りたものを書き換えようとすると、コンパイラに止められます。<Ref n={1} /></p>
          <Code
            lang="rust"
            code={`
fn change(some_string: &String) {
    some_string.push_str(", world"); // エラー
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0596]: cannot borrow \`*some_string\` as mutable, as it is behind a \`&\` reference
`}
          />
          <p>
            書き換えたいときは、変数を <code>mut</code> にしたうえで、<code>&mut</code> で
            <Term en="mutable reference">可変参照</Term>
            を作ります。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{s}"); // hello, world
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
`}
          />
          <p>
            呼び出し側に <code>&mut s</code> と書く必要があるのがポイントです。関数のシグネチャを見るだけでなく、呼び出しの行を読むだけで「この関数は <code>s</code> を書き換えるかもしれない」と分かります。TypeScript では関数が引数のオブジェクトを変更するかどうかを呼び出し側から判別できませんが、Rust では常に見えます。
          </p>
          <h3>借用規則</h3>
          <p>可変参照には大きな制約が1つあります。ある値に対して、同時に存在できる参照は次のどちらかです。<Ref n={1} /></p>
          <ul>
            <li>可変参照が1つだけ</li>
            <li>または、不変参照がいくつでも</li>
          </ul>
          <p>この規則を図 20-2 に示します。左右どちらかの状態しか許されない、という点を見てください。</p>
          <Figure n="20-2" title="借用規則：可変1つ、または不変複数" caption="左は不変参照が複数ある状態で、全員が読むだけなので干渉しない。右は可変参照が1つある状態で、その間は不変参照も含めて他の参照を作れない（破線に×）。両者の同居はコンパイルエラー。">
            <BorrowRulesFigure />
          </Figure>
          <p>規則を破ると、次の2種類のエラーのどちらかになります。</p>
          <Code
            lang="rust"
            code={`
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s; // error[E0499]: cannot borrow \`s\` as mutable more than once at a time
println!("{r1}, {r2}");
`}
          />
          <Code
            lang="rust"
            code={`
let mut s = String::from("hello");

let r1 = &s;
let r2 = &s;
let r3 = &mut s; // error[E0502]: cannot borrow \`s\` as mutable because it is also borrowed as immutable
println!("{r1}, {r2}, and {r3}");
`}
          />
          <p>
            なぜこんな規則があるのでしょうか。図から読み取れるように、この規則は
            <Term en="data race">データ競合</Term>
            を仕組みとして防ぎます。データ競合とは、2つ以上のポインタが同じデータにアクセスし、少なくとも1つが書き込みで、アクセスを同期する仕組みがない状態です。<Ref n={1} /> 不変参照を持っている人は「読んでいる間に値が変わらない」ことを前提にできます。可変参照を持っている人は「自分以外が見ていない」ことを前提にできます。この保証があるから、<ChapterLink n={23} /> の <code>Vec</code> に要素を追加してメモリが移動しても、古い場所を指す参照が残っていることはありません。
          </p>
          <h3>参照の有効範囲は「最後に使われた場所」まで</h3>
          <p>
            規則は「同時に」存在する参照についてのものです。参照のスコープは、作られた場所から最後に使われた場所までで、波かっこの終わりまでではありません。<Ref n={1} /> そのため次のコードはコンパイルできます。
          </p>
          <Code
            lang="rust"
            code={`
let mut s = String::from("hello");

let r1 = &s;
let r2 = &s;
println!("{r1} and {r2}");
// r1 と r2 はここから先で使われない → 借用は終わっている

let r3 = &mut s; // OK
r3.push_str(" world");
println!("{r3}");
`}
          />
          <p>
            この「最後の使用まで」という判定はコンパイラの借用検査器（borrow checker）が行い、Non-Lexical Lifetimes と呼ばれます。E0502 が出たときは、古い参照を最後に使っている行がどこかを探し、可変参照を作る行をその後ろに動かせないか考えるのが定石です。
          </p>
          <h3>参照の先の値を読む：* と自動参照</h3>
          <p>
            参照が指している値そのものを取り出すには、
            <Term en="dereference">参照外し</Term>
            の演算子 <code>*</code> を使います。可変参照を通して値を書き換えるときに特によく現れます。
          </p>
          <Code
            lang="rust"
            code={`
let mut count = 0;
let r = &mut count;
*r += 1;            // 参照の先の値を書き換える
println!("{count}"); // 1

let title = String::from("memo");
let t = &title;
println!("{}", t.len()); // メソッド呼び出しでは * を書かなくてよい
`}
          />
          <p>
            一方、メソッド呼び出しや <code>println!</code> では <code>*</code> を書かなくても参照の先が使われます。<code>t.len()</code> のようにドットで呼ぶと、Rust がメソッドのシグネチャに合わせて <code>&</code>、<code>&mut</code>、<code>*</code> を自動で補うためです。<Ref n={3} /> 算術や代入のように演算子で値そのものを扱うときに <code>*</code> が必要になる、と覚えておくと迷いません。
          </p>
        </>
      ),
    },
    {
      id: 'dangling',
      title: 'ダングリング参照の防止',
      body: (
        <>
          <p>
            ポインタを持つ言語では、すでに解放されたメモリを指すポインタ、
            <Term en="dangling reference">ダングリング参照</Term>
            が事故の原因になります。Rust では、参照が指す先が参照より先に消えることをコンパイラが保証します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
fn dangle() -> &String {       // String への参照を返す、と宣言
    let s = String::from("hello");
    &s                          // s への参照を返す
}                               // s はここで drop される → 参照だけが残る
`}
          />
          <Code
            lang="text"
            code={`
error[E0106]: missing lifetime specifier
  |
  | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
`}
          />
          <p>
            エラーの文面にあるとおり、「戻り値に借用した値が含まれているが、借りる元になる値がどこにもない」というのが理由です。<code>s</code> は関数の終わりで解放されるので、それを指す参照を返すことはできません。解決策は所有権ごと <code>String</code> を返すことです。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
fn no_dangle() -> String {
    let s = String::from("hello");
    s // 所有権が呼び出し元へ移る
}
`}
          />
          <p>
            エラーメッセージに出てきた「lifetime（ライフタイム）」は、参照がどれだけの期間有効かをコンパイラが追跡するための仕組みで、<ChapterLink n={26} /> で扱います。本章の範囲では、参照のルールを2つにまとめておきます。<Ref n={1} />
          </p>
          <ol>
            <li>どの時点でも、可変参照は1つだけ、または不変参照はいくつでも持てる。</li>
            <li>参照は常に有効でなければならない。</li>
          </ol>
        </>
      ),
    },
    {
      id: 'slices',
      title: 'スライス：連続した一部分への参照',
      body: (
        <>
          <p>
            参照のもう1つの形が
            <Term en="slice">スライス</Term>
            です。スライスは、コレクションの中の連続した一部分を指す参照で、所有権を持ちません。<Ref n={2} /> 典型的な題材として、文字列から最初の単語を取り出す関数を考えます。
          </p>
          <p>
            単語の終わりの位置を <code>usize</code> で返す設計にすると、位置と元の文字列が別々の値になります。その後に <code>s.clear()</code> で文字列を空にしても、位置の変数は <code>5</code> のまま残り、意味を失った値が黙って生き続けます。<Ref n={2} /> この種のバグを型で防ぐのがスライスです。
          </p>
          <Code
            lang="rust"
            code={`
let s = String::from("hello world");

let hello = &s[0..5];  // "hello"
let world = &s[6..11]; // "world"
`}
          />
          <p>
            <code>&s[開始..終了]</code> で文字列スライスを作ります。終了の添字は含みません。<code>&s[..2]</code>、<code>&s[3..]</code>、<code>&s[..]</code> のように、先頭と末尾は省略できます。<Ref n={2} /> スライスの型は <code>&str</code> です。メモリ上の様子を図 20-3 に示します。
          </p>
          <Figure n="20-3" title="スライスは ptr と len の組" caption="world は、ヒープ上のバイト位置 6 を指すポインタと長さ 5 の2つの値だけを持つ。String と違って capacity はなく、所有権も持たない。添字はバイト位置。">
            <SliceFigure />
          </Figure>
          <p>
            図から分かるように、スライスは「開始位置のポインタ」と「長さ」の2つを持つだけです。<Ref n={2} /> 元の <code>String</code> のデータを指しているので、スライスが生きている間は元の文字列を書き換えられません。これは借用規則そのものです。
          </p>
          <Code
            lang="rust"
            code={`
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s);
    s.clear(); // error[E0502]: cannot borrow \`s\` as mutable because it is also borrowed as immutable
    println!("the first word is: {word}");
}
`}
          />
          <p>
            <code>word</code> が <code>s</code> を不変に借りている間に <code>clear()</code>（可変借用）を呼んだので、E0502 になります。添字で返す設計では実行時まで気づけなかったバグが、コンパイル時に止まりました。<Ref n={2} />
          </p>
          <Callout kind="warn">
            <p>
              文字列スライスの添字はバイト位置で、文字の境界に合っていなければなりません。日本語のようにマルチバイトの文字の途中で切ると、コンパイルは通りますが実行時に panic します。<Ref n={2} /> この章の例は ASCII だけを前提にしています。UTF-8 の扱いは <ChapterLink n={23} /> で正面から扱います。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'str-vs-string',
      title: '&str と String',
      body: (
        <>
          <p>
            ここまで、文字列には <code>String</code> と <code>&str</code> の2つの型が出てきました。関係を整理します。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th><code>String</code></th>
                  <th><code>&str</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>所有権</td>
                  <td>持つ（ヒープを所有）</td>
                  <td>持たない（どこかの文字列を指す）</td>
                </tr>
                <tr>
                  <td>中身</td>
                  <td>ptr・len・capacity</td>
                  <td>ptr・len</td>
                </tr>
                <tr>
                  <td>変更</td>
                  <td><code>mut</code> なら伸ばせる</td>
                  <td>できない</td>
                </tr>
                <tr>
                  <td>作り方</td>
                  <td><code>String::from("..")</code>、<code>"..".to_string()</code></td>
                  <td>文字列リテラル、<code>&s[..]</code>、<code>&s</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            文字列リテラル <code>"Hello, world!"</code> の型は <code>&str</code> です。リテラルは実行ファイルの中に埋め込まれていて、そこを指すスライスなので不変です。<Ref n={2} />
          </p>
          <h3>引数は &str で受け取る</h3>
          <p>
            <code>first_word</code> の引数を <code>&String</code> から <code>&str</code> に変えると、関数はぐっと使いやすくなります。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
fn first_word(s: &str) -> &str { /* 本体は同じ */ }

let my_string = String::from("hello world");
first_word(&my_string[0..6]); // String の一部のスライス
first_word(&my_string[..]);   // String 全体のスライス
first_word(&my_string);       // &String もそのまま渡せる

let literal = "hello world";
first_word(literal);          // リテラルは最初から &str
`}
          />
          <p>
            <code>&String</code> を <code>&str</code> の引数に渡せるのは、
            <Term en="deref coercion">参照外し型強制</Term>
            という変換がコンパイラによって自動で行われるためです（仕組みは <ChapterLink n={28} /> で扱います）。<Ref n={2} /> 結論として、読み取るだけの関数の引数は <code>&String</code> ではなく <code>&str</code> にします。そうすれば <code>String</code> もリテラルも部分文字列も受け取れます。
          </p>
          <h3>配列や Vec のスライス</h3>
          <p>同じ考え方は文字列以外にも当てはまります。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
let a = [1, 2, 3, 4, 5];
let slice: &[i32] = &a[1..3]; // 型は &[i32]
assert_eq!(slice, &[2, 3]);

fn sum(values: &[i32]) -> i32 {
    let mut total = 0;
    for v in values {
        total += v;
    }
    total
}

sum(&a);              // 配列全体
sum(slice);           // 一部
sum(&vec![10, 20]);   // &Vec<i32> も &[i32] として渡せる
`}
          />
          <p>
            <code>&[i32]</code> が「<code>i32</code> のスライス」の型です。関数の引数を <code>&Vec&lt;i32&gt;</code> ではなく <code>&[i32]</code> にしておくと、配列も <code>Vec</code> も部分列も受け取れます。<code>&str</code> と同じ理屈です。本章のコードは Rust 1.99 でコンパイルできることを確認しています。
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
              Tsumugi の <code>core</code> クレートでは、ページを検索・更新する関数が <code>rusqlite</code> の接続を <code>&Connection</code> として借りて受け取ります（<ChapterLink n={42} />）。接続の持ち主はアプリ全体の状態（<ChapterLink n={36} />）で、各関数は借りるだけです。rusqlite の通常のトランザクション API は <code>&mut Connection</code> を要求しますが、Tsumugi では <code>Mutex</code> のロックを通して 1 つの処理だけが接続を使うことが保証されているため、<code>&Connection</code> から開ける <code>unchecked_transaction</code> を使っています。<Ref n={4} /> どちらを選ぶかの判断も、この章の借用規則を理解していれば読み解けます。
            </p>
            <p>
              また、ページのタイトルや本文を受け取る引数は <code>&str</code> で宣言します。フロントエンドから来た <code>String</code> も、テストで書いたリテラルも、同じ関数に渡せるからです。全文検索（<ChapterLink n={46} />）で BlockNote の JSON からテキストを切り出す処理も、元の文字列を <code>&str</code> で受け取り、必要な部分を <code>String</code> に組み立てる形で書きます。
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
            <li>参照（<code>&T</code>）は所有権を持たずに値を指す。参照を作ることを借用と呼び、参照が消えても値は drop されない。</li>
            <li><code>&mut T</code> で書き換えられる参照を作る。呼び出し側にも <code>&mut</code> を書くので、書き換えの可能性が常に見える。</li>
            <li>借用規則：同時に存在できるのは、可変参照1つ、または不変参照いくつでも。データ競合をコンパイル時に防ぐ。参照の範囲は最後の使用まで。</li>
            <li>解放済みのメモリを指す参照（ダングリング）は E0106 で止められる。値を返したいなら所有権ごと返す。</li>
            <li>スライスは ptr と len の組で、連続した一部分を指す。<code>&str</code> は文字列スライス、<code>&[T]</code> は配列・Vec のスライス。</li>
            <li>読み取りだけの引数は <code>&str</code> や <code>&[T]</code> で受け取ると、所有型も部分列も渡せる。</li>
          </ul>
          <p>次章では、独自の型を定義する構造体と列挙型、そして値の形で分岐する <code>match</code> を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 4.2 References and Borrowing',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html',
      accessed: '2026-11-08',
      note: '参照と借用、&mut、借用規則、E0596・E0499・E0502、参照のスコープが最後の使用までであること、ダングリング参照と E0106 の根拠。',
    },
    {
      title: 'The Rust Programming Language, 4.3 The Slice Type',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch04-03-slices.html',
      accessed: '2026-11-08',
      note: 'first_word の例、スライスの構文と ptr・len、文字境界の panic、リテラルが &str であること、&str 引数と参照外し型強制、配列スライス &[i32] の根拠。',
    },
    {
      title: 'The Rust Programming Language, 5.3 Method Syntax',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch05-03-method-syntax.html',
      accessed: '2026-11-08',
      note: 'メソッド呼び出し時に &、&mut、* が自動で補われる（automatic referencing and dereferencing）ことの根拠。',
    },
    {
      title: 'rusqlite::Connection — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/rusqlite/0.41.1/rusqlite/struct.Connection.html',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'transaction が &mut self、unchecked_transaction が &self を取ることの根拠。',
    },
  ],
}

export default chapter
