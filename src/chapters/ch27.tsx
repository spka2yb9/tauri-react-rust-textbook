import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 27-1 クロージャが環境を捕捉する3つの方法 ---------- */
function CaptureFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="クロージャが外側の変数 list を捕捉する3つの方法を左から並べた図。不変借用では list は読めるだけ、可変借用では閉包が生きている間ほかから触れない、move では所有権が閉包に移って元の変数は使えなくなる">
      <defs>
        <marker id="arrow27a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {[
        { x: 20, title: '不変借用（&）', code: '|| println!("{list:?}")', note: '読むだけ。外でも読める', trait: 'Fn', box: 'var(--fig-box4)' },
        { x: 230, title: '可変借用（&mut）', code: '|| list.push(7)', note: '閉包が生きている間は外から触れない', trait: 'FnMut', box: 'var(--fig-box2)' },
        { x: 440, title: '所有権の移動（move）', code: 'move || println!("{list:?}")', note: '元の変数は使えない。スレッドへ渡す', trait: 'Fn（中身次第）', box: 'var(--fig-box5)' },
      ].map((c) => (
        <g key={c.x} fontSize="12">
          <text x={c.x + 90} y="28" fontSize="14" fontWeight="600" textAnchor="middle">{c.title}</text>
          {/* 変数 */}
          <rect x={c.x + 40} y="50" width="100" height="40" fill="var(--fig-box)" stroke="var(--fig-line)" rx="6" />
          <text x={c.x + 90} y="75" textAnchor="middle">list: Vec</text>
          {/* 矢印 */}
          <path d={`M${c.x + 90},90 L${c.x + 90},135`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow27a)" strokeDasharray={c.x === 440 ? '0' : '5 4'} />
          {/* 閉包 */}
          <rect x={c.x} y="140" width="180" height="70" fill={c.box} stroke="var(--fig-line)" rx="6" />
          <text x={c.x + 90} y="162" textAnchor="middle" fontFamily="monospace" fontSize="11">{c.code}</text>
          <text x={c.x + 90} y="185" textAnchor="middle" fill="var(--fig-muted)">トレイト: {c.trait}</text>
          <text x={c.x + 90} y="240" textAnchor="middle" fill="var(--fig-muted)">{c.note}</text>
        </g>
      ))}
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">点線：借用　実線：所有権の移動　（模式図。捕捉方法は本体の使い方からコンパイラが決める）</text>
    </svg>
  )
}

/* ---------- 図 27-2 イテレータアダプタの連鎖と遅延評価 ---------- */
function LazyChainFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="v.iter().map().filter().collect() の連鎖を横に並べた図。collect が filter に next を求め、filter が map に、map が iter に求めるという引っ張りの流れを示し、要素が1つずつ右端まで流れることを表す">
      <defs>
        <marker id="arrow27b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
        <marker id="arrow27c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-accent)" />
        </marker>
      </defs>
      <text x="320" y="26" fontSize="14" fontWeight="600" textAnchor="middle">{'let v2: Vec<i32> = v.iter().map(|x| x * 10).filter(|x| x % 20 == 0).collect();'}</text>
      {[
        { x: 20, label: 'v.iter()', sub: '元のデータ', box: 'var(--fig-box)' },
        { x: 180, label: 'map', sub: 'アダプタ（遅延）', box: 'var(--fig-box3)' },
        { x: 340, label: 'filter', sub: 'アダプタ（遅延）', box: 'var(--fig-box3)' },
        { x: 500, label: 'collect', sub: '消費（ここで動く）', box: 'var(--fig-box2)' },
      ].map((b) => (
        <g key={b.x} fontSize="12" textAnchor="middle">
          <rect x={b.x} y="60" width="120" height="60" fill={b.box} stroke="var(--fig-line)" rx="6" />
          <text x={b.x + 60} y="85" fontSize="14" fontWeight="600">{b.label}</text>
          <text x={b.x + 60} y="106" fill="var(--fig-muted)">{b.sub}</text>
        </g>
      ))}
      {/* next() の要求（右から左、上側） */}
      <path d="M500,75 L300,75" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow27c)" fill="none" transform="translate(0,-28)" />
      <text x="400" y="42" fontSize="11" fill="var(--fig-accent)" textAnchor="middle">next()</text>
      <path d="M340,47 L300,47" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow27c)" fill="none" />
      <path d="M180,47 L140,47" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow27c)" fill="none" />
      <text x="240" y="42" fontSize="11" fill="var(--fig-accent)" textAnchor="middle">next()</text>
      <text x="80" y="42" fontSize="11" fill="var(--fig-accent)" textAnchor="middle">next()</text>
      {/* 値の流れ（左から右、下側） */}
      <path d="M140,100 L178,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow27b)" />
      <path d="M300,100 L338,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow27b)" />
      <path d="M460,100 L498,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow27b)" />
      {/* 要素の流れ表 */}
      <g fontSize="12">
        <text x="20" y="160" fill="var(--fig-muted)">要素ごとの流れ（1 → 2 → 3 の順に、1つずつ最後まで運ばれる）</text>
        {[
          { y: 185, a: '&1', b: '10', c: '捨てる（10 % 20 ≠ 0）', d: '' },
          { y: 210, a: '&2', b: '20', c: '通す', d: 'v2 に push' },
          { y: 235, a: '&3', b: '30', c: '捨てる', d: '' },
          { y: 260, a: '&4', b: '40', c: '通す', d: 'v2 に push' },
          { y: 285, a: 'None', b: 'None', c: 'None', d: '終了 → [20, 40]' },
        ].map((r) => (
          <g key={r.y}>
            <text x="80" y={r.y} textAnchor="middle" fontFamily="monospace">{r.a}</text>
            <text x="240" y={r.y} textAnchor="middle" fontFamily="monospace">{r.b}</text>
            <text x="400" y={r.y} textAnchor="middle">{r.c}</text>
            <text x="560" y={r.y} textAnchor="middle">{r.d}</text>
          </g>
        ))}
      </g>
      <text x="320" y="318" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">橙の矢印：next() の要求は右（消費側）から左へ　黒の矢印：値は左から右へ。中間の Vec は作られない</text>
    </svg>
  )
}

/* ---------- 図 27-3 Fn トレイトの包含関係 ---------- */
function FnTraitsFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="FnOnce が最も外側、その内側に FnMut、さらに内側に Fn がある入れ子の図。Fn を実装するクロージャは FnMut と FnOnce も実装し、FnMut を実装するものは FnOnce も実装する">
      <rect x="40" y="30" width="400" height="170" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="10" />
      <text x="60" y="55" fontSize="14" fontWeight="600">FnOnce</text>
      <text x="60" y="73" fontSize="12" fill="var(--fig-muted)">1回だけ呼べる。捕捉した値を外へ動かす閉包</text>
      <rect x="110" y="85" width="310" height="105" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="10" />
      <text x="130" y="108" fontSize="14" fontWeight="600">FnMut</text>
      <text x="130" y="126" fontSize="12" fill="var(--fig-muted)">何回も呼べる。捕捉した値を変更する</text>
      <rect x="200" y="135" width="200" height="45" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="10" />
      <text x="300" y="155" fontSize="14" fontWeight="600" textAnchor="middle">Fn</text>
      <text x="300" y="172" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">読むだけ、または何も捕捉しない</text>
      <g fontSize="12">
        <text x="470" y="60">受け取る側の境界：</text>
        <text x="470" y="84" fontFamily="monospace">F: FnOnce()</text>
        <text x="470" y="100" fill="var(--fig-muted)">→ どの閉包でも渡せる</text>
        <text x="470" y="128" fontFamily="monospace">F: FnMut()</text>
        <text x="470" y="144" fill="var(--fig-muted)">→ 内側2つが渡せる</text>
        <text x="470" y="172" fontFamily="monospace">F: Fn()</text>
        <text x="470" y="188" fill="var(--fig-muted)">→ 一番内側だけ渡せる</text>
      </g>
      <text x="320" y="222" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">内側の集合は外側の集合に含まれる（Fn ⊂ FnMut ⊂ FnOnce）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 27,
  part: 4,
  title: 'クロージャとイテレーター',
  summary:
    '関数を値として扱うクロージャと、コレクションを宣言的に処理するイテレータを学びます。クロージャが環境をどう捕捉するか、Fn・FnMut・FnOnce の違い、Iterator トレイトと next、アダプタの連鎖が遅延評価される仕組みを、JavaScript の配列メソッドと比べながら理解します。',
  goals: [
    'クロージャの書き方と、型推論が1回の呼び出しで型を固定することを説明できる',
    'クロージャが変数を不変借用・可変借用・move のどれで捕捉するかを本体から判断できる',
    'Fn・FnMut・FnOnce の違いと包含関係を説明し、関数の引数に適切な境界を書ける',
    'Iterator トレイトと next の仕組みを説明し、自分でイテレータを実装できる',
    'map・filter などのアダプタと、collect・sum などの消費メソッドを使い分け、遅延評価の意味を説明できる',
  ],
  prerequisites: [19, 20, 23, 25, 26],
  sections: [
    {
      id: 'intro',
      title: 'JavaScript の配列メソッドとの対応',
      body: (
        <>
          <p>
            JavaScript で配列を処理するとき、<code>arr.filter(x =&gt; x.size === 10).map(x =&gt; x.name)</code> のように、アロー関数をメソッドに渡す書き方を日常的に使います。Rust にも同じ発想の道具があります。アロー関数に当たるのが
            <Term en="closure">クロージャ</Term>
            、配列メソッドの連鎖に当たるのが
            <Term en="iterator">イテレータ</Term>
            です。<Ref n={1} /><Ref n={2} />
          </p>
          <p>
            ただし、2つの点で Rust は JavaScript より厳密です。第一に、クロージャが外側の変数をどう使うか（読むだけか、書き換えるか、所有権ごと持っていくか）を、<ChapterLink n={19} /> と <ChapterLink n={20} /> の規則に従ってコンパイラが追跡します。第二に、イテレータのメソッド連鎖は、最後に結果を要求するまで何も実行しません。JavaScript の <code>map</code> が毎回新しい配列を作るのに対し、Rust は中間の配列を作らずに要素を1つずつ流します。
          </p>
          <p>
            この章では前半でクロージャ、後半でイテレータを扱います。両者は組になって使われるので、前半の「捕捉」の話が後半でそのまま効いてきます。
          </p>
        </>
      ),
    },
    {
      id: 'closures',
      title: 'クロージャ：環境を捕捉する無名関数',
      body: (
        <>
          <p>
            クロージャは、変数に入れたり関数に渡したりできる無名関数です。通常の関数と違い、定義された場所の変数を使えます。<Ref n={1} /> 構文は縦棒 <code>|</code> で引数を囲む形です。関数との対応を4通り並べます。
          </p>
          <Code
            lang="rust"
            code={`
fn  add_one_v1   (x: u32) -> u32 { x + 1 }   // 通常の関数
let add_one_v2 = |x: u32| -> u32 { x + 1 };  // 型をすべて書いたクロージャ
let add_one_v3 = |x|             { x + 1 };  // 型注釈を省略
let add_one_v4 = |x|               x + 1  ;  // 本体が1つの式なら波かっこも省略
// v3 と v4 は、実際に呼び出して使うことで型が決まる（呼ばないと E0284 でコンパイルできない）
`}
          />
          <p>
            関数の引数や戻り値に型注釈が必須なのは、それが他のコードに公開される契約だからです。クロージャは狭い範囲で使われるので、コンパイラが使い方から型を推論します。<Ref n={1} /> ただし推論される型は1つだけで、最初の呼び出しで固定されます。
          </p>
          <Code
            lang="rust"
            code={`
let example_closure = |x| x;

let s = example_closure(String::from("hello")); // ここで x は String に決まる
let n = example_closure(5);                     // エラー E0308：整数は渡せない
`}
          />
          <h3>環境の捕捉：借用か、可変借用か、move か</h3>
          <p>
            クロージャが外側の変数を使うことを<Term en="capture">捕捉</Term>と呼びます。関数が引数を受け取る3つの方法（不変参照、可変参照、所有権）と同じ3通りがあり、どれにするかは本体がその変数をどう使っているかからコンパイラが決めます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let list = vec![1, 2, 3];
let only_borrows = || println!("From closure: {list:?}"); // 読むだけ → 不変借用
println!("Before calling closure: {list:?}");             // 不変借用は複数あってよい
only_borrows();

let mut list2 = vec![1, 2, 3];
let mut borrows_mutably = || list2.push(7);              // 書き換える → 可変借用
// println!("{list2:?}");   ← ここに書くとエラー。可変借用中は他から触れない
borrows_mutably();
println!("After calling closure: {list2:?}");            // 閉包の最後の使用後なら OK

let list3 = vec![1, 2, 3];
std::thread::spawn(move || println!("From thread: {list3:?}")) // move：所有権を閉包へ
    .join()
    .unwrap();
`}
          />
          <p>
            可変借用の例で、クロージャを <code>let mut</code> で受けている点に注意してください。呼ぶたびに中身（捕捉した可変参照）を使うので、クロージャ自体が可変扱いになります。3つ目の <code>move</code> は、本体が参照しか必要としなくても所有権を奪うよう強制するキーワードです。新しいスレッドは元のスコープより長く生きるかもしれないので、借用では安全を保証できません。<ChapterLink n={29} /> でこの形を多用します。<Ref n={1} /> 次の図に3通りを並べます。
          </p>
          <Figure n="27-1" title="クロージャが環境を捕捉する3つの方法" caption="左から、不変借用、可変借用、move による所有権の移動。本体の使い方だけで決まり、move は強制的に3番目にする。下段は、その結果として実装される Fn トレイト。">
            <CaptureFigure />
          </Figure>
          <p>図の下段に「実装するトレイト」と書きました。これが次節の主題です。</p>
        </>
      ),
    },
    {
      id: 'fn-traits',
      title: 'Fn・FnMut・FnOnce',
      body: (
        <>
          <p>
            クロージャを引数に取る関数を書くとき、「どんなクロージャなら受け取れるか」を型で表す必要があります。そのための3つのトレイトが <code>Fn</code>、<code>FnMut</code>、<code>FnOnce</code> です。公式ブックの定義を要約します。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>トレイト</th>
                  <th>どんなクロージャか</th>
                  <th>呼べる回数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>FnOnce</code></td>
                  <td>すべてのクロージャが少なくともこれを実装する。捕捉した値を本体の外へ動かす（move out する）クロージャは、これだけを実装する</td>
                  <td>1回</td>
                </tr>
                <tr>
                  <td><code>FnMut</code></td>
                  <td>捕捉した値を外へ動かさないが、変更するかもしれないクロージャ</td>
                  <td>何回でも</td>
                </tr>
                <tr>
                  <td><code>Fn</code></td>
                  <td>捕捉した値を動かしも変更もしないクロージャ、または何も捕捉しないクロージャ。並行して複数回呼ばれても安全</td>
                  <td>何回でも</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            3つは入れ子になっています。<code>Fn</code> を実装するクロージャは <code>FnMut</code> と <code>FnOnce</code> も実装し、<code>FnMut</code> を実装するものは <code>FnOnce</code> も実装します。<Ref n={1} /> 次の図で、受け取る側の境界と渡せるクロージャの関係を確認してください。
          </p>
          <Figure n="27-3" title="Fn トレイトの包含関係" caption="内側ほど制約が強い。関数の引数に FnOnce と書けばどんなクロージャも渡せ、Fn と書けば読むだけのクロージャしか渡せない。受け取る側は、自分が何回呼ぶかに応じて最も緩い境界を選ぶ。">
            <FnTraitsFigure />
          </Figure>
          <p>
            標準ライブラリの <code>Option::unwrap_or_else</code> は、<code>None</code> のときだけクロージャを1回呼んで既定値を作るので、境界は <code>{'F: FnOnce() -> T'}</code> です。すべてのクロージャが <code>FnOnce</code> を実装するので、どんなクロージャでも渡せます。<Ref n={1} /> 一方、スライスの <code>sort_by_key</code> は要素ごとに何度もクロージャを呼ぶので、境界は <code>FnMut</code> です。ここに「捕捉した値を外へ動かす」クロージャを渡すと、次のエラーになります。
          </p>
          <Code
            lang="rust"
            code={`
let mut sort_operations = vec![];
let value = String::from("closure called");

list.sort_by_key(|r| {
    sort_operations.push(value); // value を閉包の外（sort_operations）へ動かしている
    r.width
});
`}
          />
          <Code
            lang="text"
            code={`
error[E0507]: cannot move out of \`value\`, a captured variable in an \`FnMut\` closure
help: \`Fn\` and \`FnMut\` closures require captured values to be able to be consumed
      multiple times, but \`FnOnce\` closures may consume them only once
`}
          />
          <p>
            <code>value</code> は1回動かしたらもう無いので、2回目の呼び出しで困ります。コンパイラはこのクロージャを <code>FnOnce</code> とみなし、<code>FnMut</code> を要求する <code>sort_by_key</code> に渡せないと判断します。<Ref n={1} /> 回数を数えたいだけなら、整数を <code>+= 1</code> するクロージャにすれば、値を動かさず変更するだけなので <code>FnMut</code> になり、通ります。
          </p>
          <p>自分でクロージャを受け取る関数を書くときは、ジェネリクスとトレイト境界（<ChapterLink n={25} />）で表します。クロージャを返すときは <code>impl Fn</code> を使います。</p>
          <Code
            lang="rust"
            code={`
// 1回だけ呼ぶので FnOnce。どんなクロージャでも渡せる
fn apply<F: FnOnce() -> String>(f: F) -> String {
    f()
}

// n を move で捕捉したクロージャを返す。読むだけなので Fn
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

let s = String::from("owned");
println!("{}", apply(move || s)); // s を閉包の外へ返す → FnOnce だが apply は受け取れる
let add5 = make_adder(5);
println!("{}", add5(1));          // 6
`}
          />
        </>
      ),
    },
    {
      id: 'iterator-trait',
      title: 'Iterator トレイトと next',
      body: (
        <>
          <p>
            イテレータは、要素の並びを1つずつ取り出す仕事を引き受ける値です。<ChapterLink n={23} /> で <code>for</code> 文に <code>Vec</code> を渡しましたが、その裏では <code>Iterator</code> トレイトが動いています。定義は驚くほど小さく、必要なメソッドは <code>next</code> だけです。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
pub trait Iterator {
    type Item;                              // 取り出す要素の型（関連型）

    fn next(&mut self) -> Option<Self::Item>; // 次の要素。尽きたら None

    // 既定実装を持つメソッドが多数続く（map、filter、sum …）
}
`}
          />
          <p>
            <code>type Item</code> は<Term en="associated type">関連型</Term>と呼ばれ、「このイテレータは何を返すか」をトレイト実装側が決めます。<code>next</code> は要素を <code>Some</code> に包んで返し、終わると <code>None</code> を返します。<Ref n={2} /> 直接呼んでみると仕組みがよく分かります。
          </p>
          <Code
            lang="rust"
            code={`
let v1 = vec![1, 2, 3];
let mut v1_iter = v1.iter();   // next は内部の位置を進めるので mut が要る

assert_eq!(v1_iter.next(), Some(&1));
assert_eq!(v1_iter.next(), Some(&2));
assert_eq!(v1_iter.next(), Some(&3));
assert_eq!(v1_iter.next(), None);
`}
          />
          <p>
            <code>iter()</code> が返す要素は <code>&1</code> のように参照です。所有権と借用の3通りに対応して、イテレータを作るメソッドも3つあります。<Ref n={2} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>要素の型</th>
                  <th>元のコレクション</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>iter()</code></td>
                  <td><code>&T</code>（不変参照）</td>
                  <td>借用。後でも使える</td>
                </tr>
                <tr>
                  <td><code>iter_mut()</code></td>
                  <td><code>&mut T</code>（可変参照）</td>
                  <td>可変借用。要素を書き換えられる</td>
                </tr>
                <tr>
                  <td><code>into_iter()</code></td>
                  <td><code>T</code>（所有権）</td>
                  <td>move される。後では使えない</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>for x in v</code> と書いたときは <code>into_iter()</code> が、<code>for x in &v</code> なら <code>iter()</code> が暗黙に呼ばれます。<code>for</code> はイテレータの所有権を取って内部で可変にするので、<code>mut</code> を書く必要はありません。<Ref n={2} />
          </p>
          <h3>自分のイテレータを作る</h3>
          <p><code>next</code> だけ実装すれば、他のメソッドはすべて既定実装から手に入ります。1 から 5 まで数えるイテレータを作ってみます。</p>
          <Code
            lang="rust"
            code={`
struct Counter {
    count: u32,
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

// next しか書いていないのに zip・skip・map・filter・sum が使える
let sum: u32 = Counter { count: 0 }
    .zip(Counter { count: 0 }.skip(1))  // (1,2) (2,3) (3,4) (4,5)
    .map(|(a, b)| a * b)                // 2 6 12 20
    .filter(|x| x % 3 == 0)             // 6 12
    .sum();                             // 18
`}
          />
        </>
      ),
    },
    {
      id: 'adapters',
      title: 'アダプタと消費メソッド、遅延評価',
      body: (
        <>
          <p>
            <code>Iterator</code> の既定実装メソッドは2種類に分かれます。<code>sum</code> や <code>collect</code> のように <code>next</code> を呼び切ってイテレータを使い果たすものを<Term en="consuming adapter">消費アダプタ</Term>、<code>map</code> や <code>filter</code> のように元のイテレータを包んで新しいイテレータを返すものを<Term en="iterator adapter">イテレータアダプタ</Term>と呼びます。<Ref n={2} />
          </p>
          <p>そして重要な性質があります。イテレータは<Term en="lazy">遅延評価</Term>で、消費するメソッドを呼ぶまで何もしません。<Ref n={2} /> アダプタを呼んだだけで放置すると、コンパイラが警告します。</p>
          <Code
            lang="rust"
            code={`
let v1: Vec<i32> = vec![1, 2, 3];
v1.iter().map(|x| x + 1);   // 何も起きない
`}
          />
          <Code
            lang="text"
            code={`
warning: unused \`Map\` that must be used
  = note: iterators are lazy and do nothing unless consumed
`}
          />
          <p>結果が欲しければ消費します。<code>collect</code> は要素を集めてコレクションを作る消費アダプタで、作りたい型を注釈で伝えます。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
let v2: Vec<i32> = v1.iter().map(|x| x + 1).collect();
assert_eq!(v2, vec![2, 3, 4]);

let total: i32 = v1.iter().sum();   // 6。sum はイテレータの所有権を取る
`}
          />
          <p>
            では、連鎖したアダプタはどう動くのでしょうか。JavaScript の <code>map().filter()</code> は、<code>map</code> がまず全要素を処理して新しい配列を作り、次に <code>filter</code> が走ります。Rust では逆に、消費側が「次の要素をくれ」と右から左へ要求し、要素が1つずつ左から右へ流れます。次の図は、この引っ張りの流れを表したものです。
          </p>
          <Figure n="27-2" title="イテレータアダプタの連鎖と遅延評価" caption="collect が filter に next を求め、filter は map に、map は元のイテレータに求める。各要素は1つずつ連鎖の端まで運ばれるので、中間の Vec は作られない。下段は要素ごとの流れ。模式図。">
            <LazyChainFigure />
          </Figure>
          <p>
            図から分かるとおり、<code>map</code> のクロージャは <code>collect</code> が要素を要求した瞬間に初めて動きます。だから <code>take(2)</code> を挟めば、最初の2要素分しか <code>map</code> は呼ばれません。無限に続くイテレータ（<code>(1..)</code> など）を途中で切る書き方が成立するのも、この性質のおかげです。
          </p>
          <p>
            「抽象化の分だけ遅いのでは」という心配は不要です。公式ブックは、文字列検索の <code>for</code> ループ版とイテレータ版を計測し、約 19.6 ms と 19.2 ms でほぼ同じだったと報告しています。イテレータはコンパイル時に手書きのループと同等のコードに展開される<Term en="zero-cost abstraction">ゼロコスト抽象化</Term>です。<Ref n={3} />
          </p>
          <h3>よく使うアダプタと消費メソッド</h3>
          <p>よく使うものを表にまとめます。クロージャが環境を捕捉できるので、外の変数（しきい値や検索語）をそのまま条件に使えます。<Ref n={2} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>種類</th>
                  <th>働き</th>
                  <th>JavaScript の対応</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>map(f)</code></td><td>アダプタ</td><td>各要素を変換</td><td><code>map</code></td></tr>
                <tr><td><code>filter(f)</code></td><td>アダプタ</td><td><code>true</code> の要素だけ通す</td><td><code>filter</code></td></tr>
                <tr><td><code>enumerate()</code></td><td>アダプタ</td><td><code>(添字, 要素)</code> にする</td><td><code>entries()</code></td></tr>
                <tr><td><code>take(n)</code> / <code>skip(n)</code></td><td>アダプタ</td><td>先頭 n 個だけ / 先頭 n 個を飛ばす</td><td><code>slice</code></td></tr>
                <tr><td><code>zip(other)</code></td><td>アダプタ</td><td>2つを組にする</td><td>（なし）</td></tr>
                <tr><td><code>rev()</code></td><td>アダプタ</td><td>逆順</td><td><code>toReversed</code></td></tr>
                <tr><td><code>collect()</code></td><td>消費</td><td>Vec・String・HashMap などに集める</td><td><code>Array.from</code></td></tr>
                <tr><td><code>sum()</code> / <code>count()</code></td><td>消費</td><td>合計 / 個数</td><td><code>reduce</code></td></tr>
                <tr><td><code>fold(init, f)</code></td><td>消費</td><td>畳み込み</td><td><code>reduce</code></td></tr>
                <tr><td><code>find(f)</code> / <code>position(f)</code></td><td>消費</td><td>最初に一致した要素 / その添字</td><td><code>find</code> / <code>findIndex</code></td></tr>
                <tr><td><code>any(f)</code> / <code>all(f)</code></td><td>消費</td><td>1つでも / すべて条件を満たすか</td><td><code>some</code> / <code>every</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>公式ブックの靴の例は、所有権を取る <code>into_iter</code> と、環境の <code>shoe_size</code> を捕捉する <code>filter</code> の組み合わせです。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}
`}
          />
          <Callout>
            <p>
              <code>collect</code> は <code>Result</code> にも集められます。<code>{'Iterator<Item = Result<T, E>>'}</code> を <code>{'Result<Vec<T>, E>'}</code> に集めると、最初の <code>Err</code> が出た時点で全体が <code>Err</code> になります。<ChapterLink n={24} /> の <code>?</code> 演算子と組み合わせると、「複数行をパースしてどれか1つでも失敗したらエラー」という処理が1行で書けます。
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
              Tsumugi の全文検索（<ChapterLink n={46} />）では、BlockNote のドキュメント JSON からテキストだけを取り出して FTS5 の索引に入れます。「各ブロックの本文を取り出し、空のものを捨てて改行でつなぐ」という処理は、イテレータの連鎖で書くのに向いています。中間の <code>Vec</code> を作らずに済み、条件が増えても <code>filter</code> を1段足すだけで対応できます。実物の <code>extract_text</code> は子ブロックや表も辿るため、再帰とループで書かれていますが、取り出して捨てて連結するという流れは同じです。
            </p>
            <p>
              また、<ChapterLink n={42} /> の rusqlite では、問い合わせ結果を行ごとに <code>Result</code> で返すイテレータ（<code>query_map</code>）を <code>{'collect::<Result<Vec<_>, _>>()'}</code> で集める書き方が定番です。どれか1行の変換に失敗したらエラーとして呼び出し元へ返す、という振る舞いが自動で得られます。
            </p>
          </Callout>
          <Code
            lang="rust"
            code={`
struct Block {
    kind: String,  // "heading" | "paragraph" | "image" …
    text: String,
}

// ブロック列から索引用テキストを作る簡略版（実際の JSON 構造は第46章で扱う）
fn extract_text(blocks: &[Block]) -> String {
    blocks
        .iter()
        .filter(|b| b.kind != "image")     // 簡略版では画像を除く（実物はキャプションを拾う）
        .map(|b| b.text.trim())            // 前後の空白を落とす
        .filter(|t| !t.is_empty())         // 空行を捨てる
        .collect::<Vec<_>>()
        .join("\\n")
}
`}
          />
          <p>
            <code>map</code> のクロージャが返す <code>&str</code> は <code>blocks</code> から借りたスライスです。<ChapterLink n={26} /> の省略規則により、戻り値のライフタイムは引数 <code>blocks</code> に結び付きます。<code>join</code> が新しい <code>String</code> を作るので、関数の外に出るのは所有された値だけです。
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
            <li>クロージャは <code>|x| x + 1</code> のように書く無名関数で、外側の変数を不変借用・可変借用・move のいずれかで捕捉する。どれになるかは本体の使い方で決まり、<code>move</code> で所有権の移動を強制できる。</li>
            <li><code>FnOnce</code> ⊃ <code>FnMut</code> ⊃ <code>Fn</code> の包含関係がある。受け取る側は呼ぶ回数と変更の有無に応じて最も緩い境界を選ぶ。</li>
            <li><code>Iterator</code> トレイトの必須メソッドは <code>next</code> だけ。<code>iter</code>・<code>iter_mut</code>・<code>into_iter</code> は借用・可変借用・所有権に対応する。</li>
            <li>アダプタ（<code>map</code>、<code>filter</code>）は遅延評価で、消費メソッド（<code>collect</code>、<code>sum</code>）が <code>next</code> を要求して初めて動く。中間コレクションは作られず、性能はループと同等。</li>
            <li><code>collect</code> は <code>Vec</code> だけでなく <code>{'Result<Vec<T>, E>'}</code> にも集められる。</li>
          </ul>
          <p>次章では、ヒープ上の値を指す <code>Box</code>、複数の所有者を許す <code>Rc</code>、実行時に借用を検査する <code>RefCell</code> といったスマートポインタを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 13.1: Closures: Anonymous Functions that Capture Their Environment',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch13-01-closures.html',
      accessed: '2026-11-08',
      note: 'クロージャの構文、型推論、3つの捕捉方法、move、Fn・FnMut・FnOnce の定義、unwrap_or_else と sort_by_key の例の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 13.2: Processing a Series of Items with Iterators',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch13-02-iterators.html',
      accessed: '2026-11-08',
      note: 'Iterator トレイトの定義、next、iter/iter_mut/into_iter、消費アダプタとイテレータアダプタ、遅延評価、靴の例の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 13.4: Comparing Performance: Loops vs. Iterators',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch13-04-performance.html',
      accessed: '2026-11-08',
      note: 'ループとイテレータの性能比較（約 19.6 ms 対 19.2 ms）とゼロコスト抽象化の根拠。',
    },
  ],
}

export default chapter
