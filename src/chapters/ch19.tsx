import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 19-1 スタックとヒープ ---------- */
function StackHeapFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="String を作ったときのスタックとヒープの配置。スタックには ptr・len・capacity の3つが並び、ptr がヒープ上の文字データ hello を指す">
      <defs>
        <marker id="arrow19" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* スタック */}
      <text x="80" y="28" fontSize="15" fontWeight="600" textAnchor="middle">スタック</text>
      <text x="80" y="48" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">（サイズが固定）</text>
      <rect x="20" y="60" width="200" height="150" fill="var(--fig-box)" stroke="var(--fig-line)" rx="6" />
      <text x="30" y="80" fontSize="12" fill="var(--fig-muted)">s1: String</text>
      <g fontSize="14">
        <rect x="30" y="90" width="80" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="40" y="112">ptr</text>
        <rect x="110" y="90" width="100" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="118" y="112" fontSize="12" fill="var(--fig-muted)">→ ヒープへ</text>
        <rect x="30" y="124" width="80" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="40" y="146">len</text>
        <rect x="110" y="124" width="100" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="150" y="146">5</text>
        <rect x="30" y="158" width="80" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="40" y="180">capacity</text>
        <rect x="110" y="158" width="100" height="34" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="150" y="180">5</text>
      </g>
      {/* ヒープ */}
      <text x="470" y="28" fontSize="15" fontWeight="600" textAnchor="middle">ヒープ</text>
      <text x="470" y="48" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">（必要な分だけ確保）</text>
      <rect x="340" y="60" width="260" height="150" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <g fontSize="14" textAnchor="middle">
        {['h', 'e', 'l', 'l', 'o'].map((c, i) => (
          <g key={i}>
            <rect x={370 + i * 40} y="110" width="40" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x={390 + i * 40} y="136">{c}</text>
            <text x={390 + i * 40} y="170" fontSize="11" fill="var(--fig-muted)">{i}</text>
          </g>
        ))}
      </g>
      <text x="470" y="195" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">添字（バイト位置）</text>
      <path d="M210,107 C290,107 300,130 368,130" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow19)" />
      <text x="320" y="250" fontSize="13" textAnchor="middle" fill="var(--fig-muted)">let s1 = String::from("hello");</text>
      <text x="320" y="275" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：実際のアドレスや内部表現は省略している</text>
    </svg>
  )
}

/* ---------- 図 19-2 move ---------- */
function MoveFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="let s2 = s1 を実行した後の状態。スタック上の s1 と s2 は同じヒープ領域を指すが、s1 は無効になり、以後 s1 は使えない">
      <defs>
        <marker id="arrow19b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="110" y="28" fontSize="15" fontWeight="600" textAnchor="middle">スタック</text>
      {/* s1 (無効) */}
      <g opacity="0.55">
        <rect x="20" y="50" width="200" height="100" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" rx="6" />
        <text x="30" y="70" fontSize="12" fill="var(--fig-muted)">s1（無効）</text>
        <text x="40" y="95" fontSize="13">ptr | len 5 | cap 5</text>
        <line x1="30" y1="120" x2="210" y2="80" stroke="var(--fig-danger)" strokeWidth="2" />
        <line x1="30" y1="80" x2="210" y2="120" stroke="var(--fig-danger)" strokeWidth="2" />
      </g>
      <text x="120" y="140" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">以後 s1 は使えない（E0382）</text>
      {/* s2 */}
      <rect x="20" y="170" width="200" height="100" fill="var(--fig-box)" stroke="var(--fig-line)" rx="6" />
      <text x="30" y="190" fontSize="12" fill="var(--fig-muted)">s2（有効）</text>
      <text x="40" y="215" fontSize="13">ptr | len 5 | cap 5</text>
      <text x="40" y="245" fontSize="12" fill="var(--fig-muted)">3つの値だけがコピーされた</text>
      {/* heap */}
      <text x="470" y="28" fontSize="15" fontWeight="600" textAnchor="middle">ヒープ</text>
      <rect x="340" y="110" width="260" height="90" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <g fontSize="14" textAnchor="middle">
        {['h', 'e', 'l', 'l', 'o'].map((c, i) => (
          <g key={i}>
            <rect x={370 + i * 40} y="135" width="40" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x={390 + i * 40} y="161">{c}</text>
          </g>
        ))}
      </g>
      <text x="470" y="100" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">コピーされていない（1つだけ）</text>
      <path d="M210,90 C280,90 300,155 368,155" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" opacity="0.5" markerEnd="url(#arrow19b)" />
      <path d="M210,210 C280,210 300,160 368,160" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow19b)" />
      <text x="320" y="300" fontSize="13" textAnchor="middle" fill="var(--fig-muted)">let s2 = s1;  ← ヒープの持ち主が s1 から s2 へ「移動」する</text>
    </svg>
  )
}

/* ---------- 図 19-3 関数呼び出しと所有権 ---------- */
function OwnershipFlowFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="所有権が移る3つの場面を左から右に並べた図。値を関数に渡すと所有権が関数へ移り、関数が値を返すと呼び出し元に戻り、スコープを抜けると drop される">
      <defs>
        <marker id="arrow19c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="170" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="105" y="68" textAnchor="middle" fontWeight="600">main の変数 s</text>
        <text x="105" y="90" textAnchor="middle" fill="var(--fig-muted)">所有者 = main</text>

        <path d="M190,75 L255,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow19c)" />
        <text x="222" y="62" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">takes(s)</text>

        <rect x="260" y="40" width="170" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="345" y="68" textAnchor="middle" fontWeight="600">関数の引数 t</text>
        <text x="345" y="90" textAnchor="middle" fill="var(--fig-muted)">所有者 = takes</text>

        <path d="M430,75 L495,75" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow19c)" />
        <text x="462" y="62" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">return t</text>

        <rect x="500" y="40" width="120" height="70" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="560" y="68" textAnchor="middle" fontWeight="600">戻り値</text>
        <text x="560" y="90" textAnchor="middle" fill="var(--fig-muted)">所有者 = main</text>

        <path d="M345,110 L345,165" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow19c)" />
        <text x="365" y="140" fontSize="12" fill="var(--fig-muted)">return しない場合</text>
        <rect x="260" y="170" width="170" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="345" y="195" textAnchor="middle" fontWeight="600">関数の終わりで drop</text>
        <text x="345" y="215" textAnchor="middle" fill="var(--fig-muted)">ヒープが解放される</text>
      </g>
      <text x="320" y="252" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線：所有権の移動　点線：所有者のスコープ終了</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 19,
  part: 4,
  title: '所有権',
  summary:
    'Rust がガベージコレクタなしでメモリを安全に扱える仕組みの核心が所有権です。スタックとヒープの違いから始めて、値の持ち主が1つに決まる規則、move、Clone と Copy、スコープ終了時の drop を図で理解します。',
  goals: [
    'スタックとヒープの違いと、String がヒープを使う理由を説明できる',
    '所有権の3つの規則を言える',
    '代入や関数呼び出しで値が「移動」する場面と、コンパイルエラー E0382 の意味を読める',
    'Clone と Copy の違いを説明し、どの型が Copy かを判断できる',
    'スコープを抜けたときに drop が呼ばれることを知っている',
  ],
  prerequisites: [18],
  sections: [
    {
      id: 'why-ownership',
      title: 'なぜ所有権が必要か',
      body: (
        <>
          <p>
            プログラムが使うメモリは、使い終わったら返さなければなりません。JavaScript ではこの作業を
            <Term en="garbage collector">ガベージコレクタ</Term>
            が実行中に自動で行います。C 言語では、プログラマが <code>malloc</code> と <code>free</code>{' '}
            を自分で呼びます。前者は実行時のコストがかかり、後者は解放し忘れ（メモリリーク）や二重解放といった事故の温床になります。
          </p>
          <p>
            Rust は第三の道を選びました。<Term en="ownership">所有権</Term>
            という規則をコンパイル時に検査し、どこでメモリを返すべきかをコンパイラが決めます。実行時に動く仕組みはなく、規則を破ったコードはコンパイルが通りません。
            <Ref n={1} />
          </p>
          <p>
            所有権は Rust を学ぶうえで最初の壁ですが、仕組み自体は単純です。この章では「値には持ち主が1人いる」という考え方を、メモリの絵と一緒に追いかけます。<ChapterLink n={20} /> の参照と借用、<ChapterLink n={26} /> のライフタイムは、すべてこの章の延長線上にあります。
          </p>
        </>
      ),
    },
    {
      id: 'stack-heap',
      title: 'スタックとヒープ',
      body: (
        <>
          <p>
            所有権の規則は、メモリが2種類の領域に分かれていることを前提にしています。
          </p>
          <ul>
            <li>
              <Term en="stack">スタック</Term>：値を積み上げ、最後に積んだものから取り出す領域です。置ける値は、コンパイル時にサイズが決まっているものに限られます。整数、真偽値、固定長の配列などがこれに当たります。
            </li>
            <li>
              <Term en="heap">ヒープ</Term>：実行時に「これだけの大きさが欲しい」と頼むと、空いている場所が確保され、その場所を指す
              <Term en="pointer">ポインタ</Term>
              が返される領域です。文字列のように長さが実行時に変わるデータはここに置かれます。
            </li>
          </ul>
          <p>
            スタックへの積み降ろしはアロケータに頼まないので速く、ヒープはポインタをたどる分だけ遅くなります。<Ref n={1} /> この違いを、実行時に長さが変わる文字列型 <code>String</code> で見てみましょう。
          </p>
          <Code
            lang="rust"
            code={`
let s1 = String::from("hello");
`}
          />
          <p>
            このとき、<code>s1</code> という変数自体はスタックに置かれます。中身は3つの値、つまりヒープ上の文字データを指す <code>ptr</code>、現在の長さ <code>len</code>、確保済みの大きさ <code>capacity</code> です。実際の文字 <code>hello</code> はヒープにあります。
          </p>
          <Figure n="19-1" title="String を作ったときのメモリ配置" caption="左のスタックには ptr・len・capacity の3つの固定サイズの値が並ぶ。ptr がヒープ上の文字データを指している。len と capacity の単位はバイト。">
            <StackHeapFigure />
          </Figure>
          <p>
            「変数の本体はスタックにあり、大きなデータはヒープにあって、そこをポインタで指している」という絵を覚えておくと、この後の move の説明がそのまま理解できます。
          </p>
        </>
      ),
    },
    {
      id: 'rules',
      title: '所有権の3つの規則',
      body: (
        <>
          <p>公式の The Rust Programming Language（以下「公式ブック」）は、所有権の規則を次の3つにまとめています。<Ref n={1} /></p>
          <ol>
            <li>Rust のそれぞれの値には、<Term en="owner">所有者</Term>と呼ばれる変数がある。</li>
            <li>所有者は同時に1つだけである。</li>
            <li>所有者がスコープを抜けると、値は破棄（drop）される。</li>
          </ol>
          <p>
            <Term en="scope">スコープ</Term>とは、変数が有効な範囲のことで、Rust では波かっこ <code>{'{ }'}</code> で囲まれた区間がそれに当たります。
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    {
        let s = String::from("hello"); // ここから s が有効
        println!("{s}");
    }                                  // ここで s のスコープが終わり、ヒープが解放される
    // println!("{s}");                // コンパイルエラー：s はもう存在しない
}
`}
          />
          <p>
            閉じかっこに到達した瞬間、Rust は <code>drop</code> という特別な関数を自動で呼び、<code>s</code> が持っていたヒープ領域を返します。<Ref n={1} />{' '}
            プログラマが <code>free</code> を書く必要はなく、書き忘れることもできません。C++ の RAII と同じ考え方です。
          </p>
          <p>
            drop が呼ばれるのはスコープの終わりだけではありません。可変な変数に新しい値を代入すると、古い値はその時点で drop されます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let mut s = String::from("hello");
s = String::from("ahoy");  // "hello" のヒープはここで解放される
println!("{s}");           // ahoy
`}
          />
          <p>
            「値の持ち主が変わる、あるいは持ち主がいなくなった瞬間に、後片付けが行われる」と覚えておくと、どのタイミングでメモリが返るのかを迷わずに読めます。
          </p>
          <p>
            このとき、同じヒープ領域の持ち主が2つあったらどうなるでしょうか。両方がスコープを抜けると、同じメモリを2回解放することになります（
            <Term en="double free">二重解放</Term>
            ）。規則2「所有者は1つだけ」は、この事故を仕組みとして防ぐためにあります。次の節で、その具体的な現れ方である move を見ます。
          </p>
        </>
      ),
    },
    {
      id: 'move',
      title: '代入すると「移動」する：move',
      body: (
        <>
          <p>JavaScript では、文字列を別の変数に代入しても、元の変数はそのまま使えます。Rust では様子が違います。</p>
          <Code
            lang="rust"
            code={`
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}"); // エラー
`}
          />
          <p>コンパイラは次のようなエラーを出します（抜粋）。</p>
          <Code
            lang="text"
            code={`
error[E0382]: borrow of moved value: \`s1\`
  |
2 |     let s2 = s1;
  |              -- value moved here
3 |     println!("{s1}");
  |                ^^ value borrowed here after move
`}
          />
          <p>
            何が起きたのかを図で見ます。<code>let s2 = s1;</code> でコピーされるのは、スタック上の3つの値（ptr、len、capacity）だけです。ヒープ上の文字データはコピーされません。<Ref n={1} />{' '}
            このままだと <code>s1</code> と <code>s2</code> が同じヒープを指し、二重解放が起きます。そこで Rust は、<code>s1</code> をこの時点で無効にします。持ち主が <code>s1</code> から <code>s2</code> へ移るので、これを <Term en="move">ムーブ</Term> と呼びます。
          </p>
          <Figure n="19-2" title="let s2 = s1; の後のメモリ" caption="スタック上の3つの値だけが s2 にコピーされ、ヒープの文字データは1つのまま。s1 は無効になる（×印と破線）。有効なのは s2 だけなので、二重解放は起きない。">
            <MoveFigure />
          </Figure>
          <p>
            他の言語の「浅いコピー」に似ていますが、元の変数が使えなくなる点が異なるため、Rust ではこれを move と呼び分けます。<Ref n={1} /> エラー番号 E0382 を見たら、「移動した後の値を使おうとした」と読み替えてください。
          </p>
          <h3>関数に渡すときも move する</h3>
          <p>
            代入だけでなく、関数の引数に渡すときや、関数から値を返すときも所有権が移動します。
          </p>
          <Code
            lang="rust"
            code={`
fn takes(t: String) -> String {
    println!("{t}");
    t                       // 所有権を呼び出し元に返す
}

fn main() {
    let s = String::from("hello");
    let s = takes(s);       // s を渡し、戻り値で受け取り直す
    println!("{s}");        // OK
}
`}
          />
          <Figure n="19-3" title="関数呼び出しで所有権が移る流れ" caption="値を関数に渡すと所有者が関数の引数になり、return すると呼び出し元に戻る。return しなければ関数の終わりで drop される。">
            <OwnershipFlowFigure />
          </Figure>
          <p>
            「使うたびに返してもらう」のは面倒です。この面倒を解消するのが、次章で学ぶ参照と借用です。この章では、所有権が移るという原則を先に押さえておきます。
          </p>
        </>
      ),
    },
    {
      id: 'clone-copy',
      title: 'Clone と Copy',
      body: (
        <>
          <p>ヒープのデータまで含めて本当に複製したいときは、<code>clone</code> を明示的に呼びます。</p>
          <Code
            lang="rust"
            code={`
let s1 = String::from("hello");
let s2 = s1.clone();   // ヒープの文字データも複製される
println!("{s1} {s2}"); // 両方使える
`}
          />
          <p>
            <code>clone</code> はヒープの確保とコピーを伴うので、コストのかかる処理です。Rust が深いコピーを自動で行わないのは、「見えないところで重い処理が走らない」ことを保証するためです。<Ref n={1} /> コードに <code>clone()</code> と書いてあれば、そこにコストがあると分かります。
          </p>
          <h3>スタックだけで完結する型は Copy</h3>
          <p>一方、整数のようにスタックだけで完結する型は、代入しても元の変数が使えます。</p>
          <Code
            lang="rust"
            code={`
let x = 5;
let y = x;
println!("{x} {y}"); // OK：整数は Copy
`}
          />
          <p>
            これらの型には <Term>Copy</Term> トレイトが付いており、代入は単なるビットのコピーになります。ヒープを使わない、つまり解放すべき資源を持たない型だけが Copy になれます。公式ブックが Copy として挙げる型は次のとおりです。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Copy になる型</th>
                  <th>例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>整数型</td>
                  <td><code>i32</code>、<code>u64</code> など</td>
                </tr>
                <tr>
                  <td>浮動小数点型</td>
                  <td><code>f32</code>、<code>f64</code></td>
                </tr>
                <tr>
                  <td>真偽値</td>
                  <td><code>bool</code></td>
                </tr>
                <tr>
                  <td>文字</td>
                  <td><code>char</code></td>
                </tr>
                <tr>
                  <td>要素がすべて Copy のタプル</td>
                  <td><code>(i32, i32)</code> は Copy、<code>(i32, String)</code> は Copy ではない</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>Drop</code> を実装している型（スコープ終了時に後片付けが必要な型）に <code>Copy</code> を付けることはできません。「コピーして2つになった値の、どちらが後片付けをするのか」が決められないからです。トレイトの仕組みそのものは <ChapterLink n={25} /> で扱います。
          </p>
          <Callout>
            <p>
              <code>String</code> が Copy でないことは、JavaScript の文字列との大きな違いです。JavaScript の文字列は不変で、代入は常に同じ値の共有ですが、Rust の <code>String</code> は可変なヒープ領域を持つため、持ち主を1つに決める必要があります。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'in-practice',
      title: '所有権と付き合うコツ',
      body: (
        <>
          <p>
            所有権の規則そのものは3つだけですが、慣れないうちは E0382 に何度も出会います。よく起きる場面と、その読み解き方を先に知っておくと、エラーに出会ったときに落ち着いて対処できます。
          </p>
          <h3>よくある場面1：for ループが値を消費する</h3>
          <Code
            lang="rust"
            code={`
let names = vec![String::from("a"), String::from("b")];
for n in names {        // names の所有権がループに移る
    println!("{n}");
}
// println!("{names:?}"); // エラー：names はもう使えない
`}
          />
          <p>
            <code>for n in names</code> は <code>names</code> を消費します。ループの後も使いたいなら、次章で学ぶ参照を使って <code>for n in &names</code> と書きます。「消費する」という言葉は、所有権を受け取って返さないことを指します。
          </p>
          <h3>よくある場面2：メソッドが self を受け取る</h3>
          <p>
            標準ライブラリには、呼び出した値の所有権を受け取るメソッドがあります。例えば <code>into_bytes</code> や <code>into_iter</code> のように <code>into_</code> で始まる名前は、「自分を別の形に変えて渡す」ことを表す慣習で、呼び出し後に元の値は使えません。メソッドの説明（docs.rs）で、第1引数が <code>self</code> なら所有権を受け取り、<code>&self</code> なら借りるだけです。この読み方は <ChapterLink n={21} /> で構造体のメソッドを書くときに役立ちます。
          </p>
          <h3>よくある場面3：とりあえず clone で切り抜ける</h3>
          <p>
            学び始めのうちは、E0382 を <code>clone()</code> で解決しても構いません。動くコードを先に作り、あとから参照に置き換えるほうが、学習の順序としては自然です。ただし、ループの中で毎回 <code>clone</code> していたり、大きな <code>Vec</code> を <code>clone</code> していたりしたら、その箇所は設計を見直す候補です。
          </p>
          <h3>JavaScript との対応表</h3>
          <p>JavaScript の感覚を Rust の言葉に置き換えると、次のようになります。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>JavaScript</th>
                  <th>Rust</th>
                  <th>違いの要点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>数値や真偽値の代入</td>
                  <td>Copy 型の代入</td>
                  <td>どちらも値がコピーされ、元の変数も使える</td>
                </tr>
                <tr>
                  <td>オブジェクトや配列の代入（参照の共有）</td>
                  <td>move</td>
                  <td>JavaScript は両方の変数から同じ値を触れる。Rust は持ち主が1つに移り、元の変数は使えない</td>
                </tr>
                <tr>
                  <td><code>structuredClone</code>（深いコピー）や展開構文（浅いコピー）での複製</td>
                  <td><code>clone()</code></td>
                  <td>どちらも明示的に複製を作る。Rust ではコストが見える</td>
                </tr>
                <tr>
                  <td>ガベージコレクタによる回収</td>
                  <td>スコープ終了時の drop</td>
                  <td>JavaScript は「いつか」回収される。Rust は解放のタイミングがコードから読める</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            この表の2行目が、JavaScript 経験者にとって最大の違いです。「代入したら元の変数は使えない」という感覚に慣れるまでは、図 19-2 の絵に戻って考えてください。
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
              Tsumugi の Rust 側では、SQLite から読み出したページやブロックを <code>String</code> や <code>Vec</code> として組み立て、フロントエンドへ返します（<ChapterLink n={42} />）。コマンドの戻り値として所有権ごとフロントエンドに渡すのが基本の形で、関数の中で一時的に文字列を加工するときだけ <code>clone</code> を使います。
            </p>
            <p>
              また、<ChapterLink n={36} /> で学ぶアプリ全体の状態（データベース接続など）は、「誰が持ち主か」が設計の中心になります。この章の規則が、そこでの判断の土台になります。
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
            <li>固定サイズの値はスタックに、実行時に大きさが変わるデータはヒープに置かれ、変数はポインタでヒープを指す。</li>
            <li>所有権の規則：値には所有者が1つあり、所有者がスコープを抜けると値は drop される。</li>
            <li>ヒープを持つ値を代入・引数渡し・return すると所有権が移動（move）し、元の変数は使えなくなる。E0382 がその印。</li>
            <li>深いコピーが必要なら <code>clone</code> を明示する。スタックだけで完結する型は Copy で、代入しても元の変数を使える。</li>
          </ul>
          <p>次章では、所有権を渡さずに値を使わせる仕組み、参照と借用を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 4: Understanding Ownership（4.1 What is Ownership?）',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html',
      accessed: '2026-11-08',
      note: '所有権の3規則、スタックとヒープ、String の内部構造、move、Clone と Copy、drop の根拠。',
    },
  ],
}

export default chapter
