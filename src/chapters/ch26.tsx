import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 26-1 スコープとライフタイムの区間 ---------- */
function ScopeIntervalFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="2つのプログラムを左右に並べ、変数 r と x が有効な区間を縦の帯で示した図。左では x の区間が r の区間より先に終わるため、r を使う行で x がもう無い。右では x が r より長く生きるため問題ない">
      <defs>
        <marker id="arrow26a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* 左: NG */}
      <text x="160" y="24" fontSize="15" fontWeight="600" textAnchor="middle">コンパイルエラー（E0597）</text>
      <g fontSize="12" fontFamily="monospace">
        <text x="20" y="60">let r;</text>
        <text x="20" y="90">{'{'}</text>
        <text x="20" y="120">{'    let x = 5;'}</text>
        <text x="20" y="150">{'    r = &x;'}</text>
        <text x="20" y="180">{'}'}</text>
        <text x="20" y="210">{'println!("{r}");'}</text>
      </g>
      {/* r の帯 'a */}
      <rect x="200" y="50" width="22" height="170" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="211" y="240" fontSize="12" textAnchor="middle">r（'a）</text>
      {/* x の帯 'b */}
      <rect x="240" y="110" width="22" height="70" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="251" y="240" fontSize="12" textAnchor="middle">x（'b）</text>
      {/* 参照の矢印 */}
      <path d="M200,150 L240,150" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow26a)" />
      {/* 使用点で x が無い */}
      <line x1="236" y1="200" x2="266" y2="220" stroke="var(--fig-danger)" strokeWidth="2" />
      <line x1="236" y1="220" x2="266" y2="200" stroke="var(--fig-danger)" strokeWidth="2" />
      <text x="160" y="270" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">r を使う行で、参照先 x はもう存在しない</text>

      {/* 区切り */}
      <line x1="320" y1="40" x2="320" y2="280" stroke="var(--fig-line)" strokeDasharray="4 4" />

      {/* 右: OK */}
      <text x="480" y="24" fontSize="15" fontWeight="600" textAnchor="middle">コンパイルできる</text>
      <g fontSize="12" fontFamily="monospace">
        <text x="340" y="60">let x = 5;</text>
        <text x="340" y="90">{'let r = &x;'}</text>
        <text x="340" y="120">{'println!("{r}");'}</text>
      </g>
      <rect x="540" y="50" width="22" height="80" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="551" y="150" fontSize="12" textAnchor="middle">x（'b）</text>
      <rect x="580" y="80" width="22" height="50" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="591" y="170" fontSize="12" textAnchor="middle">r（'a）</text>
      <path d="M580,90 L562,90" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow26a)" />
      <text x="480" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">'b が 'a を包んでいれば、r は常に有効な値を指す</text>
    </svg>
  )
}

/* ---------- 図 26-2 longest の 'a は重なる区間 ---------- */
function OverlapFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="string1 と string2 の有効区間を縦の帯で示し、両方が有効な重なり部分が longest の戻り値のライフタイム 'a になることを示す図。result を重なりの外で使うとエラーになる">
      <g fontSize="12" fontFamily="monospace">
        <text x="20" y="50">{'let string1 = String::from("long…");'}</text>
        <text x="20" y="80">let result;</text>
        <text x="20" y="110">{'{'}</text>
        <text x="20" y="140">{'    let string2 = String::from("xyz");'}</text>
        <text x="20" y="170">{'    result = longest(&string1, &string2);'}</text>
        <text x="20" y="200">{'}'}</text>
        <text x="20" y="230">{'println!("{result}");'}</text>
      </g>
      {/* string1 */}
      <rect x="400" y="40" width="26" height="200" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="413" y="262" fontSize="12" textAnchor="middle">string1</text>
      {/* string2 */}
      <rect x="450" y="130" width="26" height="70" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="463" y="262" fontSize="12" textAnchor="middle">string2</text>
      {/* 'a = overlap */}
      <rect x="500" y="130" width="26" height="70" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="4" />
      <text x="513" y="262" fontSize="12" textAnchor="middle">'a</text>
      <text x="513" y="280" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">（重なり）</text>
      {/* result */}
      <rect x="560" y="160" width="26" height="80" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" strokeDasharray="5 3" />
      <text x="573" y="262" fontSize="12" textAnchor="middle">result</text>
      {/* 重なりの範囲線 */}
      <line x1="380" y1="130" x2="600" y2="130" stroke="var(--fig-muted)" strokeDasharray="3 3" />
      <line x1="380" y1="200" x2="600" y2="200" stroke="var(--fig-muted)" strokeDasharray="3 3" />
      {/* 使用点 */}
      <line x1="560" y1="218" x2="586" y2="238" stroke="var(--fig-danger)" strokeWidth="2" />
      <line x1="560" y1="238" x2="586" y2="218" stroke="var(--fig-danger)" strokeWidth="2" />
      <text x="320" y="305" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">result は 'a（重なり）より長く使われている → E0597</text>
    </svg>
  )
}

/* ---------- 図 26-3 参照を持つ構造体 ---------- */
function StructRefFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="String を所有する novel と、その一部を借りる構造体 Excerpt の関係図。Excerpt の part フィールドは novel のヒープ上の文字列の一部を指し、Excerpt は novel より長く生きられない">
      <defs>
        <marker id="arrow26c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="40" width="200" height="90" fill="var(--fig-box)" stroke="var(--fig-line)" rx="6" />
      <text x="30" y="60" fontSize="12" fill="var(--fig-muted)">novel: String（所有者）</text>
      <text x="40" y="90" fontSize="13">ptr | len | cap</text>
      <text x="120" y="115" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">スコープ: 長い</text>

      <rect x="20" y="150" width="200" height="60" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="6" />
      <text x="30" y="170" fontSize="12" fill="var(--fig-muted)">{"e: Excerpt<'a>"}</text>
      <text x="40" y="195" fontSize="13">{"part: &'a str"}</text>

      <rect x="340" y="60" width="280" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <text x="480" y="52" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ヒープ上の文字列</text>
      <text x="480" y="96" fontSize="13" textAnchor="middle" fontFamily="monospace">Call me Ishmael. Some years ago...</text>
      <rect x="352" y="72" width="118" height="36" fill="none" stroke="var(--fig-accent)" strokeWidth="2" rx="4" />

      <path d="M220,85 L338,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow26c)" />
      <path d="M220,190 C300,190 320,110 350,100" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow26c)" />
      <text x="320" y="220" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">'a は「novel が有効な区間」に含まれていなければならない</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 26,
  part: 4,
  title: 'ライフタイム',
  summary:
    '参照が指す先より長く生きないことをコンパイラがどう確かめているかを学びます。ライフタイム注釈の読み方と書き方、注釈を省略できる3つの規則、参照を持つ構造体、そして \'static の意味を、スコープの区間図で理解します。',
  goals: [
    'ライフタイムが「参照が有効な区間」であり、注釈が区間を変えるものではないことを説明できる',
    "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str のような注釈を読み、なぜ必要かを説明できる",
    'ライフタイム省略の3つの規則を適用して、注釈が要る関数と要らない関数を見分けられる',
    '参照をフィールドに持つ構造体を定義し、その制約を説明できる',
    "'static の意味と、エラー回避のために安易に付けてはいけない理由を説明できる",
  ],
  prerequisites: [19, 20, 25],
  sections: [
    {
      id: 'intro',
      title: 'なぜライフタイムが必要か',
      body: (
        <>
          <p>
            <ChapterLink n={20} /> で、参照は「指している値より長く生きてはいけない」と学びました。値が解放された後に残る参照（ダングリング参照）を Rust はコンパイル時に拒否します。では、コンパイラはどうやって「参照がどのくらい生きるか」を知るのでしょうか。その答えが
            <Term en="lifetime">ライフタイム</Term>
            です。<Ref n={1} />
          </p>
          <p>
            Rust のすべての参照にはライフタイムがあります。ライフタイムとは、その参照が有効であるスコープ（区間）のことです。ほとんどの場合、型が推論されるのと同じように、ライフタイムも自動で推論されます。注釈が必要になるのは、複数の参照のライフタイムの関係が何通りにも考えられ、コンパイラが決めきれないときだけです。<Ref n={1} />
          </p>
          <p>
            ライフタイムは多くの入門者がつまずく話題ですが、本質は「参照の有効区間を、コンパイラに分かる形で結び付ける」だけです。ここで大切なのは、注釈を付けてもライフタイムそのものは1ミリも変わらないという点です。公式ブックの言い方を借りれば、注釈は「渡された値や戻り値のライフタイムを変えるのではなく、この制約に従わない値を借用チェッカが拒否するよう指定する」ものです。<Ref n={1} /> この章では、区間図を使ってこの感覚をつかみます。
          </p>
        </>
      ),
    },
    {
      id: 'borrow-checker',
      title: '借用チェッカはスコープを比べている',
      body: (
        <>
          <p>まず、ライフタイムが絡む最も単純なエラーを見ます。外側で宣言した <code>r</code> に、内側のブロックで作った <code>x</code> への参照を入れるコードです。</p>
          <Code
            lang="rust"
            code={`
fn main() {
    let r;
    {
        let x = 5;
        r = &x;      // x への参照を r に入れる
    }                // ここで x は drop される
    println!("r: {r}"); // エラー：x はもう無い
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0597]: \`x\` does not live long enough
`}
          />
          <p>
            コンパイラの中にある<Term en="borrow checker">借用チェッカ</Term>は、参照 <code>r</code> が有効な区間（<code>'a</code> と呼びます）と、参照先 <code>x</code> が有効な区間（<code>'b</code>）を比べます。<code>'b</code> が <code>'a</code> より短いので、<code>r</code> を使う時点で参照先が存在しない可能性があると判断し、このプログラムを拒否します。<Ref n={1} /> 次の図は、この2つの区間を縦の帯で表したものです。帯の長さと、参照を使う行の位置に注目してください。
          </p>
          <Figure n="26-1" title="スコープとライフタイムの区間" caption="左：参照 r の区間 'a（青）が、参照先 x の区間 'b（橙）より長いため、r を使う行で x は存在せず、エラーになる。右：x を先に宣言すると 'b が 'a を包むので、参照は常に有効。模式図。">
            <ScopeIntervalFigure />
          </Figure>
          <p>
            図の右側のように <code>x</code> を外側で宣言すれば、<code>x</code> の区間が <code>r</code> の区間を完全に包むので、問題は消えます。借用チェッカがやっていることは、結局「参照先の帯が、参照の帯を包んでいるか」の確認です。この絵を頭に置いたうえで、関数の境界をまたぐ場合を見ていきます。
          </p>
        </>
      ),
    },
    {
      id: 'annotation',
      title: '関数のライフタイム注釈',
      body: (
        <>
          <p>2つの文字列スライスのうち長いほうを返す関数を書いてみます。まず注釈なしで書くと、コンパイルが通りません。</p>
          <Code
            lang="rust"
            code={`
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0106]: missing lifetime specifier
 --> src/main.rs:1:33
  |
1 | fn longest(x: &str, y: &str) -> &str {
  |               ----     ----     ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature
          does not say whether it is borrowed from \`x\` or \`y\`
help: consider introducing a named lifetime parameter
  |
1 | fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  |           ++++     ++          ++          ++
`}
          />
          <p>
            エラーの説明にすべてが書かれています。戻り値は借用された値ですが、それが <code>x</code> から借りたものか <code>y</code> から借りたものかを、シグネチャが語っていません。関数の本体は <code>if</code> の結果次第でどちらも返しうるうえ、コンパイラは関数の定義を見る時点では呼び出し側の具体的なスコープを知りません。<Ref n={1} /> そこで、コンパイラの提案どおりに
            <Term en="lifetime annotation">ライフタイム注釈</Term>
            を書きます。
          </p>
          <Code
            lang="rust"
            code={`
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
`}
          />
          <p>
            書き方の規則は3つです。ライフタイムの名前はアポストロフィで始まる短い小文字で、慣習的に最初は <code>'a</code> を使います。関数名の後の <code>{"<'a>"}</code> でその名前を宣言します（ジェネリクスの型パラメータと同じ場所です）。そして各参照の <code>&</code> の直後に <code>'a</code> を置きます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
&i32        // 参照
&'a i32     // 明示的なライフタイム付きの参照
&'a mut i32 // 明示的なライフタイム付きの可変参照
`}
          />
          <p>
            このシグネチャの意味は「戻り値の参照は、<code>x</code> と <code>y</code> の両方が有効な区間（<code>'a</code>）のあいだ有効である」です。具体的には、<code>'a</code> は2つの引数のライフタイムのうち短いほうに一致します。<Ref n={1} /> 呼び出し側で何が起きるかを見てみましょう。
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}"); // エラー
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0597]: \`string2\` does not live long enough
  |
8 |         let string2 = String::from("xyz");
  |             ------- binding \`string2\` declared here
9 |         result = longest(string1.as_str(), string2.as_str());
  |                                            ^^^^^^^ borrowed value does not live long enough
10|     }
  |     - \`string2\` dropped here while still borrowed
11|     println!("The longest string is {result}");
  |                                      ------ borrow later used here
`}
          />
          <p>
            人間が読めば、返されるのは明らかに長いほうの <code>string1</code> で、<code>string2</code> が drop されても困らないと分かります。しかしコンパイラはシグネチャだけを信じます。シグネチャは「戻り値は両方の引数が生きている区間でだけ有効」と言っているので、その区間の外で <code>result</code> を使う行を拒否します。<Ref n={1} /> 次の図で、2つの引数の帯の重なりが <code>'a</code> になる様子を確認してください。
          </p>
          <Figure n="26-2" title="longest の 'a は2つの引数が重なる区間" caption="string1（長い帯）と string2（短い帯）の両方が有効な区間（緑）が 'a。戻り値 result はこの区間でだけ有効なので、ブロックの外で使うと E0597 になる。模式図。">
            <OverlapFigure />
          </Figure>
          <p>
            注釈は関数の契約です。戻り値が常に <code>x</code> に由来するなら、<code>y</code> に注釈は不要で、<code>{"fn longest<'a>(x: &'a str, y: &str) -> &'a str"}</code> と書けます。逆に、関数内で作った <code>String</code> への参照を返そうとすると、どんな注釈を付けても通りません。ローカル変数は関数の終わりで drop されるので、それへの参照はダングリング参照だからです。この場合の正しい直し方は、参照ではなく所有権ごと <code>String</code> を返すことです。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'elision',
      title: '省略規則：注釈を書かなくてよい場面',
      body: (
        <>
          <p>
            ここまで読むと、「<ChapterLink n={20} /> の <code>{'first_word(s: &str) -> &str'}</code> はなぜ注釈なしで通ったのか」という疑問がわきます。Rust 1.0 より前はすべての参照に注釈が必要でしたが、同じパターンが何度も書かれることが分かり、コンパイラがそのパターンを自動で補うようになりました。これを
            <Term en="lifetime elision">ライフタイム省略</Term>
            と呼びます。<Ref n={1} />
          </p>
          <p>
            用語を2つ定義します。関数の引数側のライフタイムを<Term en="input lifetime">入力ライフタイム</Term>、戻り値側を<Term en="output lifetime">出力ライフタイム</Term>と呼びます。コンパイラは次の3つの規則を順に適用し、すべての参照にライフタイムが決まれば注釈なしで受け入れ、決まらなければエラーにします。<Ref n={1} />
          </p>
          <ol className="steps">
            <li>参照である引数のそれぞれに、別々のライフタイムを割り当てる。引数が1つなら <code>{"fn foo<'a>(x: &'a i32)"}</code>、2つなら <code>{"fn foo<'a, 'b>(x: &'a i32, y: &'b i32)"}</code> になる。</li>
            <li>入力ライフタイムがちょうど1つなら、それをすべての出力ライフタイムに割り当てる。<code>{"fn foo<'a>(x: &'a i32) -> &'a i32"}</code>。</li>
            <li>入力ライフタイムが複数あっても、そのうち1つが <code>&self</code> または <code>&mut self</code>（つまりメソッド）なら、<code>self</code> のライフタイムをすべての出力ライフタイムに割り当てる。</li>
          </ol>
          <p>規則を <code>first_word</code> に当てはめてみます。</p>
          <Code
            lang="rust"
            code={`
fn first_word(s: &str) -> &str {            // 書いたコード
fn first_word<'a>(s: &'a str) -> &str {     // 規則1：引数に 'a
fn first_word<'a>(s: &'a str) -> &'a str {  // 規則2：入力が1つなので出力も 'a
`}
          />
          <p>
            すべての参照にライフタイムが決まったので、注釈なしで通ります。一方、<code>longest</code> は規則1で <code>'a</code> と <code>'b</code> の2つが割り当てられ、規則2（入力が1つ）も規則3（メソッド）も当てはまりません。出力ライフタイムが決まらないので、先ほどの E0106 になったわけです。<Ref n={1} /> 規則は「推測」ではなく機械的な置き換えなので、迷ったら自分で3段階を書き出してみると、注釈の要不要が判断できます。
          </p>
          <div className="compare">
            <div>
              <h4>注釈が要らない典型</h4>
              <ul>
                <li><code>{'fn trim(s: &str) -> &str'}</code>（入力1つ）</li>
                <li><code>{'fn name(&self) -> &str'}</code>（self がある）</li>
                <li><code>{'fn len(s: &str) -> usize'}</code>（戻り値が参照でない）</li>
              </ul>
            </div>
            <div>
              <h4>注釈が要る典型</h4>
              <ul>
                <li><code>{'fn pick(a: &str, b: &str) -> &str'}</code>（入力2つ、self なし）</li>
                <li>参照をフィールドに持つ構造体（次節）</li>
                <li>戻り値が「引数のどれでもない」何かを借りるとき（多くは設計の見直しが必要）</li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'struct-lifetime',
      title: '参照を持つ構造体とメソッド',
      body: (
        <>
          <p>
            <ChapterLink n={21} /> で定義した構造体は、すべて <code>String</code> や <code>i32</code> のような所有する型をフィールドに持っていました。フィールドに参照を持たせることもできますが、そのときは構造体にライフタイム注釈が必要です。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
struct Excerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let e = Excerpt { part: first_sentence };
    println!("{}", e.part); // Call me Ishmael
}
`}
          />
          <p>
            <code>{"struct Excerpt<'a>"}</code> という宣言は、「<code>Excerpt</code> のインスタンスは、<code>part</code> が指す参照より長く生きられない」という意味です。この例では <code>novel</code> は <code>e</code> より前に作られ、<code>e</code> が使い終わるまで drop されないので、参照は有効です。<Ref n={1} /> 次の図で、所有者・構造体・ヒープ上のデータの関係を見ておきましょう。
          </p>
          <Figure n="26-3" title="参照をフィールドに持つ構造体" caption="novel が文字列を所有し、Excerpt の part はその一部（最初の文）を借りている。Excerpt のライフタイム 'a は novel の有効区間に含まれる必要がある。模式図。">
            <StructRefFigure />
          </Figure>
          <p>
            メソッドを定義するときは、<code>impl</code> の後と構造体名の後の両方にライフタイムを書きます。ライフタイムは型の一部だからです。ただしメソッドのシグネチャ内では、省略規則のおかげでほとんど注釈が要りません。
          </p>
          <Code
            lang="rust"
            code={`
impl<'a> Excerpt<'a> {
    fn level(&self) -> i32 {
        3                                // 戻り値が参照でないので注釈は不要
    }

    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("お知らせ: {announcement}");
        self.part                        // 規則3：戻り値は &self のライフタイムになる
    }
}
`}
          />
          <p>
            <code>announce_and_return_part</code> には入力ライフタイムが2つ（<code>&self</code> と <code>announcement</code>）ありますが、規則3により戻り値は <code>self</code> のライフタイムを受け取ります。<Ref n={1} /> 結果として、この関数は「自分が借りている文字列の一部を、自分と同じ期間だけ貸し出す」と読めます。
          </p>
          <p>
            実際のコードでは、参照を持つ構造体は「一時的なビュー」に限って使うのが無難です。長く保持するデータは <code>String</code> や <code>Vec</code> で所有し、ライフタイム付きの構造体は、解析中の文字列を指すパーサや、検索結果を一時的に束ねる場面のように、短命な用途にとどめます。
          </p>
        </>
      ),
    },
    {
      id: 'static',
      title: "'static と、エラー提案を鵜呑みにしない",
      body: (
        <>
          <p>
            特別なライフタイムが1つあります。<code>'static</code> は、その参照がプログラムの実行中ずっと有効でありうることを表します。文字列リテラルはすべて <code>'static</code> です。文字列の実体がプログラムのバイナリに埋め込まれていて、常に利用できるからです。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let s: &'static str = "I have a static lifetime.";
`}
          />
          <p>
            エラーメッセージの中で「<code>'static</code> を付けてはどうか」と提案されることがあります。しかし、その提案に従う前に、その参照が本当にプログラム全体で生きるべきかを考えてください。多くの場合、原因はダングリング参照を作ろうとしていることか、ライフタイムの不一致であり、正しい直し方はそちらを修正することです。<code>'static</code> を付けても、実際の値が長く生きるようになるわけではありません。<Ref n={1} />
          </p>
          <Callout kind="warn">
            <p>
              <code>'static</code> の意味は「プログラムの終わりまで生きなければならない」ではなく「生きることができる」です。たとえば <code>String</code> のような所有型は参照を含まないので <code>'static</code> の境界を満たしますが、いつでも drop できます。<Ref n={2} /><ChapterLink n={29} /> のスレッドや <ChapterLink n={30} /> のタスクに渡す値に <code>'static</code> が要求されるのは、「外部の変数を借りている値は渡せない」という意味で、所有権ごと <code>move</code> すれば満たせます。
            </p>
          </Callout>
          <h3>ジェネリクス・トレイト境界との組み合わせ</h3>
          <p>
            ライフタイムは型パラメータと同じ「ジェネリクス」の一種なので、<ChapterLink n={25} /> で学んだ型パラメータやトレイト境界と同じ山かっこの中に並べて書けます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() { x } else { y }
}
`}
          />
          <p>
            型パラメータ <code>T</code> は <code>Display</code> を実装していればよく、<code>'a</code> は2つの入力と出力を結び付けています。ライフタイムの検査はすべてコンパイル時に行われるので、実行時のコストはありません。<Ref n={1} />
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
              Tsumugi の Rust 側（バックエンド）で、ライフタイムを自分で書く場面はほとんどありません。SQLite から読んだページやブロックは <code>String</code> や <code>Vec</code> として所有し、そのままフロントエンドへ返す設計にするからです（<ChapterLink n={42} />）。ライフタイム注釈が必要になるのは「参照を返す関数」や「参照を持つ構造体」であり、所有型を返す限り省略規則だけで済みます。
            </p>
            <p>
              一方、読む場面は確実にあります。<ChapterLink n={36} /> で学ぶ <code>tauri::State</code> はライフタイムパラメータを持つ型で、コマンドの引数に <code>{"State<'_, AppState>"}</code> のように書きます。<Ref n={4} /><code>'_</code> は「省略規則に任せる」という印です。また、<ChapterLink n={34} /> の非同期コマンドでは、<code>&str</code> のような借用した引数をそのまま使えないという制約があり、所有型 <code>String</code> を使うか <code>Result</code> で返すかを選びます。<Ref n={3} /> この章の「借用はスコープに縛られる」という理解が、その制約の背景になります。
            </p>
            <p>
              次のコードは、検索結果の表示用にページのタイトルだけを借りて返す補助関数です。戻り値のスライスは <code>pages</code> から借りているので、<code>pages</code> と同じ <code>'a</code> を付け、<code>word</code> とは結び付けません。
            </p>
          </Callout>
          <Code
            lang="rust"
            code={`
struct Page {
    title: String,
    body: String,
}

// 戻り値の &str は pages から借りている。word とは無関係なので 'a を付けない
fn titles_containing<'a>(pages: &'a [Page], word: &str) -> Vec<&'a str> {
    pages
        .iter()
        .filter(|p| p.body.contains(word))
        .map(|p| p.title.as_str())
        .collect()
}

fn main() {
    let pages = vec![
        Page { title: "会議メモ".into(), body: "Rust の話".into() },
        Page { title: "買い物".into(), body: "牛乳".into() },
    ];
    let word = String::from("Rust");
    let hits = titles_containing(&pages, &word);
    drop(word);            // word は hits と無関係なので先に捨ててよい
    println!("{hits:?}");  // ["会議メモ"]
}
`}
          />
          <p>
            もし <code>word</code> にも <code>'a</code> を付けてしまうと、<code>hits</code> を使い終わるまで <code>word</code> を drop できなくなります。必要最小限の結び付きだけを書くのが、注釈の作法です。
          </p>
        </>
      ),
    },
    {
      id: 'summary',
      title: 'まとめ',
      body: (
        <>
          <ul>
            <li>ライフタイムは参照が有効な区間。借用チェッカは「参照先の区間が参照の区間を包むか」を比べ、包まなければ E0597 を出す。</li>
            <li>注釈 <code>'a</code> は区間を変えず、複数の参照の関係を宣言するだけ。<code>{"longest<'a>"}</code> の戻り値は引数の区間の重なりでのみ有効。</li>
            <li>省略規則は3つ：引数ごとに別のライフタイム、入力が1つならそれを出力へ、メソッドなら <code>self</code> のものを出力へ。決まらなければ E0106。</li>
            <li>参照を持つ構造体は <code>{"struct S<'a>"}</code> と宣言し、参照先より長く生きられない。<code>impl</code> にも <code>{"<'a>"}</code> を書く。</li>
            <li><code>'static</code> はプログラム全体で生きられる参照。エラー回避のために安易に付けず、所有型を返す設計を先に考える。</li>
          </ul>
          <p>次章では、関数を値として扱うクロージャと、コレクションを宣言的に処理するイテレータを学びます。どちらも参照を多用するので、この章の知識がそのまま役立ちます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 10.3: Validating References with Lifetimes',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html',
      accessed: '2026-11-08',
      note: 'ライフタイムの定義、借用チェッカ、longest の例とエラー、注釈の構文、構造体のライフタイム、省略の3規則、\'static、ジェネリクスとの組み合わせの根拠。',
    },
    {
      title: 'Rust By Example: Static',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/rust-by-example/scope/lifetime/static_lifetime.html',
      accessed: '2026-11-08',
      note: 'トレイト境界としての \'static は「非 static の参照を含まない」ことを意味し、所有データは常に満たす、という根拠。',
    },
    {
      title: 'Calling Rust from the Frontend',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2',
      note: '非同期コマンドで借用した引数を直接使えず、所有型にするか Result を返す必要がある根拠。',
    },
    {
      title: 'tauri::State - docs.rs',
      publisher: 'docs.rs（tauri クレート）',
      url: 'https://docs.rs/tauri/latest/tauri/struct.State.html',
      accessed: '2026-11-08',
      version: 'tauri 2.x',
      note: 'State がライフタイムパラメータ（State<\'r, T>）を持つ型である根拠。',
    },
  ],
}

export default chapter
