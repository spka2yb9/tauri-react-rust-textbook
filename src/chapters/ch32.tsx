import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 32-1 安全な Rust と unsafe の境界 ---------- */
function UnsafeBoundaryFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="安全な Rust の広い領域の中に、unsafe ブロックで囲まれた小さな領域があり、その内側だけで生ポインタの参照外しや外部関数の呼び出しができることを示す図。unsafe の領域を安全な関数で包むと、呼び出し側は unsafe を書かずに済む">
      <rect x="20" y="30" width="600" height="240" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="10" />
      <text x="40" y="55" fontSize="14" fontWeight="600">安全な Rust（コンパイラが検査する）</text>
      <text x="40" y="75" fontSize="12" fill="var(--fig-muted)">所有権・借用・型・Send/Sync の規則がすべて適用される。unsafe の中でも借用チェッカは止まらない</text>
      {/* 安全な関数の枠 */}
      <rect x="60" y="95" width="520" height="150" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="80" y="118" fontSize="13" fontWeight="600">{'安全な抽象（pub fn split_at_mut(..) など）'}</text>
      <text x="80" y="136" fontSize="12" fill="var(--fig-muted)">入力を assert! で検証し、unsafe を内側に閉じ込める。呼び出し側は unsafe を書かない</text>
      {/* unsafe ブロック */}
      <rect x="180" y="150" width="280" height="80" fill="var(--fig-box2)" stroke="var(--fig-danger)" strokeWidth="2" rx="8" />
      <text x="320" y="172" fontSize="13" fontWeight="600" textAnchor="middle">{'unsafe { … }'}</text>
      <text x="320" y="192" fontSize="11" textAnchor="middle">5つの操作だけがここで許される</text>
      <text x="320" y="208" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">生ポインタの参照外し／unsafe 関数の呼び出し／</text>
      <text x="320" y="222" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">static mut／unsafe trait の実装／union のフィールド</text>
      <text x="320" y="290" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：unsafe は検査を止める魔法ではなく、「ここは人間が責任を持つ」と印を付ける範囲を小さく区切る道具</text>
    </svg>
  )
}

/* ---------- 図 32-2 マクロ展開の流れ ---------- */
function MacroExpansionFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="ソースコードがコンパイラに読まれ、マクロ展開の段階で vec! や derive が通常の Rust コードに置き換えられ、その後に型検査と借用検査が行われてバイナリになる流れを左から右に示した図">
      <defs>
        <marker id="arrow32a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {[
        { x: 20, t: 'ソース', s: 'vec![1, 2, 3]', s2: '#[derive(Debug)]', box: 'var(--fig-box)' },
        { x: 180, t: 'マクロ展開', s: 'パターンに合わせて', s2: 'コードを生成', box: 'var(--fig-box2)' },
        { x: 340, t: '展開後のコード', s: 'let mut v = …;', s2: 'v.push(1); …', s3: 'impl Debug for …', box: 'var(--fig-box3)' },
        { x: 500, t: '型検査・借用検査', s: '通常のコードとして', s2: '検査されコンパイル', box: 'var(--fig-box4)' },
      ].map((b) => (
        <g key={b.x} fontSize="11" textAnchor="middle">
          <rect x={b.x} y="60" width="120" height="100" fill={b.box} stroke="var(--fig-line)" rx="8" />
          <text x={b.x + 60} y="84" fontSize="13" fontWeight="600">{b.t}</text>
          <text x={b.x + 60} y="108" fontFamily="monospace" fontSize="12">{b.s}</text>
          <text x={b.x + 60} y="126" fontFamily="monospace" fontSize="12">{b.s2}</text>
          {'s3' in b && <text x={b.x + 60} y="144" fontFamily="monospace" fontSize="12">{b.s3}</text>}
        </g>
      ))}
      <path d="M140,110 L178,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow32a)" />
      <path d="M300,110 L338,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow32a)" />
      <path d="M460,110 L498,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow32a)" />
      <g fontSize="12">
        <text x="20" y="200">宣言的マクロ（macro_rules!）：match のようにパターンで置き換える</text>
        <text x="20" y="222">手続き的マクロ（derive、属性、関数形式）：TokenStream を受け取り、Rust のコードで TokenStream を返す</text>
        <text x="20" y="246" fill="var(--fig-muted)">どちらも「コンパイラが意味を解釈する前」に展開される。</text>
        <text x="20" y="264" fill="var(--fig-muted)">だからマクロは引数の数を変えられ、トレイト実装を生成できる</text>
      </g>
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：関数は実行時に呼ばれるが、マクロはコンパイル時にコードを書く</text>
    </svg>
  )
}

/* ---------- 図 32-3 FFI の境界 ---------- */
function FfiFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="左に Rust、右に C のライブラリを置き、unsafe extern C ブロックで C の関数を宣言して Rust から呼ぶ向きと、no_mangle と extern C を付けた Rust 関数を C から呼ぶ向きの両方向の矢印を示した図。境界では repr(C) の構造体と C 文字列、ABI の約束が必要">
      <defs>
        <marker id="arrow32b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="40" width="240" height="170" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="140" y="65" fontSize="14" fontWeight="600" textAnchor="middle">Rust</text>
      <text x="140" y="95" fontSize="11" fontFamily="monospace" textAnchor="middle">{'unsafe extern "C" { fn abs(..); }'}</text>
      <text x="140" y="112" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">C の関数を宣言して呼ぶ</text>
      <text x="140" y="150" fontSize="11" fontFamily="monospace" textAnchor="middle">#[unsafe(no_mangle)]</text>
      <text x="140" y="166" fontSize="11" fontFamily="monospace" textAnchor="middle">{'pub extern "C" fn call_from_c()'}</text>
      <text x="140" y="183" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">C から呼ばれる関数を公開する</text>

      <rect x="380" y="40" width="240" height="170" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="500" y="65" fontSize="14" fontWeight="600" textAnchor="middle">C / OS のライブラリ</text>
      <text x="500" y="95" fontSize="11" fontFamily="monospace" textAnchor="middle">int abs(int);</text>
      <text x="500" y="150" fontSize="11" fontFamily="monospace" textAnchor="middle">call_from_c();</text>

      <path d="M260,100 L378,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow32b)" />
      <path d="M378,160 L262,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow32b)" />
      <line x1="320" y1="40" x2="320" y2="210" stroke="var(--fig-danger)" strokeDasharray="5 4" />
      <text x="320" y="30" fontSize="12" fill="var(--fig-danger)" textAnchor="middle">境界：コンパイラは向こう側を検査できない</text>
      <text x="320" y="238" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">境界で守る約束：C の ABI（extern "C"）、#[repr(C)] の構造体、NUL 終端の CString、panic を越えさせない</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 32,
  part: 4,
  title: '発展的な機能の概要：unsafe・マクロ・FFI',
  summary:
    '第4部の締めくくりとして、普段は使わないが仕組みを知っておくべき3つの機能を概観します。コンパイラの検査の外に出る unsafe、コンパイル時にコードを生成するマクロ、他言語の関数とやり取りする FFI について、それぞれ「何ができて、何を守るべきか」を図で押さえます。',
  goals: [
    'unsafe が許す5つの操作を挙げ、unsafe が借用チェッカを止めるものではないことを説明できる',
    '生ポインタの作成は安全で参照外しが unsafe である理由と、unsafe を安全な関数で包む設計を説明できる',
    '宣言的マクロ（macro_rules!）の読み方と、手続き的マクロ（derive など）の仕組みの概要を説明できる',
    'extern ブロックで C の関数を呼ぶ形と、Rust の関数を C に公開する形を読める',
    'これらの機能が Tauri とそのプラグインのどこで使われているかを指摘できる',
  ],
  prerequisites: [20, 25, 29],
  sections: [
    {
      id: 'intro',
      title: 'なぜ「概要」なのか',
      body: (
        <>
          <p>
            ここまでの章で学んだ Rust は、コンパイラがメモリ安全を保証する「安全な Rust」です。しかし、OS の API を呼ぶ、ハードウェアに直接触れる、コンパイラが証明できない最適化を行う、といった場面では、検査の外に出る手段が必要になります。それが
            <Term en="unsafe Rust">unsafe Rust</Term>
            です。<Ref n={1} /> また、<code>println!</code> や <code>vec!</code>、<code>#[derive(Debug)]</code> のように何度も使ってきた構文は、すべて
            <Term en="macro">マクロ</Term>
            という「コードを書くコード」です。<Ref n={2} /> そして Tauri が macOS や Windows の WebView を動かせるのは、Rust が他言語の関数と直接やり取りする
            <Term en="FFI">FFI</Term>
            （Foreign Function Interface）を持つからです。<Ref n={3} />
          </p>
          <p>
            この3つは、Tsumugi を作るうえで自分で書く必要はほとんどありません。しかし依存クレートのソースやエラーメッセージに必ず現れるので、「読めること」「どこに危険があるかを知っていること」が目標です。深く掘るのではなく、全体像と境界線を押さえる章として読んでください。
          </p>
        </>
      ),
    },
    {
      id: 'unsafe',
      title: 'unsafe：検査の外に出る5つの操作',
      body: (
        <>
          <p>
            <code>unsafe</code> キーワードは、借用チェッカやその他の安全性検査を止めるものではありません。許されるのは、コンパイラがメモリ安全を検査できない次の5つの操作だけで、それらを <code>unsafe</code> ブロックの中でだけ使えるようにします。<Ref n={1} />
          </p>
          <ol>
            <li>生ポインタの参照外し</li>
            <li>unsafe な関数やメソッドの呼び出し</li>
            <li>可変の static 変数へのアクセスと変更</li>
            <li>unsafe なトレイトの実装</li>
            <li><code>union</code> のフィールドへのアクセス</li>
          </ol>
          <p>
            <code>unsafe</code> の中では「この操作がメモリ安全であること」を人間が保証します。だからブロックは小さく保ち、危険な部分を安全な API で包んで、呼び出し側が <code>unsafe</code> を書かずに済むようにするのが基本です。<Ref n={1} /> 次の図はこの入れ子の関係を表したものです。
          </p>
          <Figure n="32-1" title="安全な Rust と unsafe の境界" caption="unsafe ブロック（橙、赤枠）は安全な抽象（青）の内側に閉じ込め、その外側の広い領域（緑）は通常の検査を受ける。unsafe の中でも所有権や借用の規則は適用され続ける。模式図。">
            <UnsafeBoundaryFigure />
          </Figure>
          <h3>生ポインタ</h3>
          <p>
            <Term en="raw pointer">生ポインタ</Term>は <code>*const T</code> と <code>*mut T</code> と書きます。参照と違い、借用規則を無視でき（同じ場所を指す可変ポインタが複数あってよい）、有効なメモリを指す保証がなく、null になりえて、自動の後片付けもありません。作るだけなら安全で、参照外しに <code>unsafe</code> が要ります。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let mut num = 5;

let r1 = &raw const num;   // 生ポインタを作るのは安全
let r2 = &raw mut num;

unsafe {                   // 参照外しは unsafe
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0133]: dereference of raw pointer is unsafe and requires unsafe block
  = note: raw pointers may be null, dangling or unaligned; they can violate aliasing
          rules and cause data races: all of these are undefined behavior
`}
          />
          <h3>unsafe を安全な関数で包む</h3>
          <p>
            公式ブックの例は、可変スライスを2つに分ける <code>split_at_mut</code> です。安全な Rust だけで書こうとすると、同じスライスを2回可変借用することになり E0499 で拒否されます。重ならない範囲なので実際は安全ですが、借用チェッカにはそれが分かりません。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
use std::slice;

fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    let ptr = values.as_mut_ptr();

    assert!(mid <= len);                 // ここで範囲を保証する

    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid),
            slice::from_raw_parts_mut(ptr.add(mid), len - mid),
        )
    }
}
`}
          />
          <p>
            <code>from_raw_parts_mut</code> と <code>add</code> はポインタを信用する unsafe な関数です。しかし <code>assert!</code> によりすべてのポインタがスライスの範囲内に収まるので、この関数全体は健全な安全な抽象であり、<code>unsafe fn</code> と宣言する必要はありません。<Ref n={1} /> 公式ブックは、unsafe な関数には「呼び出し側が守るべき条件」を、unsafe な操作には「なぜ健全か」を、<code>SAFETY</code> コメントとして書く慣習も紹介しています。<Ref n={1} />
          </p>
          <p>
            可変の static 変数は、複数スレッドから触るとデータ競合になるため読み書きに <code>unsafe</code> が要り、参照を取ることは <code>static_mut_refs</code> lint で既定では拒否されます。<ChapterLink n={29} /> の <code>Mutex</code> や <code>Atomic</code> 型で置き換えられるなら、そちらを使うべきです。<Ref n={1} /> unsafe なトレイトの代表は <code>Send</code> と <code>Sync</code> で、生ポインタを含む型をスレッド安全だと宣言したいときに <code>unsafe impl Send for …</code> と書きます。<Ref n={1} />
          </p>
          <Callout>
            <p>
              unsafe なコードの正しさを確かめる公式ツールが Miri です。nightly ツールチェーンで <code>cargo +nightly miri test</code> のように実行すると、未定義動作（ダングリング参照など）を実行時に検出します。Miri が問題を報告すれば本当にバグですが、報告が無いことは正しさの証明ではなく、実際に走った経路しか検査しません。<Ref n={1} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'macros',
      title: 'マクロ：コンパイル時にコードを書く',
      body: (
        <>
          <p>
            マクロは<Term en="metaprogramming">メタプログラミング</Term>、つまり「コードを書くコード」です。関数との違いは3つあります。関数の引数の数と型は固定ですが、マクロは <code>println!("hi")</code> と <code>{'println!("hi {}", name)'}</code> のように可変です。関数は実行時に呼ばれますが、マクロはコンパイラがコードの意味を解釈する前に展開されるので、トレイトの実装を生成するといったことができます。そして、マクロは呼び出す前に定義（またはスコープに導入）しておかなければなりません。<Ref n={2} />
          </p>
          <Figure n="32-2" title="マクロ展開の流れ" caption="ソース中の vec! や #[derive] は、型検査の前の「マクロ展開」の段階で通常の Rust コードに置き換えられ、その後は普通のコードとして検査される。模式図。">
            <MacroExpansionFigure />
          </Figure>
          <h3>宣言的マクロ：macro_rules!</h3>
          <p>
            <Term en="declarative macro">宣言的マクロ</Term>は <code>match</code> に似ています。ただし比べるのは値ではなく、渡されたソースコードの構造です。公式ブックが示す、簡略化した <code>vec!</code> の定義を見てみます。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
#[macro_export]                      // このクレートを use した側でも使える
macro_rules! vec {
    ( $( $x:expr ),* ) => {          // パターン：式がカンマ区切りで 0 個以上
        {
            let mut temp_vec = Vec::new();
            $(                       // 一致した回数だけ繰り返す
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
`}
          />
          <p>
            <code>$x:expr</code> は「任意の式に一致し、それを <code>$x</code> と呼ぶ」という意味で、<code>$( … ),*</code> は「カンマ区切りで 0 回以上」です。<code>vec![1, 2, 3]</code> と書くと、本体の <code>$( … )*</code> が3回展開され、<code>push(1)</code>、<code>push(2)</code>、<code>push(3)</code> を並べたブロックに置き換わります。<Ref n={2} /> 標準ライブラリの本物の <code>vec!</code> は事前にメモリを確保する点が異なります。
          </p>
          <h3>手続き的マクロ：derive、属性、関数形式</h3>
          <p>
            <Term en="procedural macro">手続き的マクロ</Term>は、パターンの置き換えではなく、トークン列（<code>TokenStream</code>）を受け取って Rust のコードで加工し、トークン列を返す関数です。専用の <code>proc-macro</code> クレートに置く必要があります。3種類あります。<Ref n={2} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>種類</th>
                  <th>見た目</th>
                  <th>本書での例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>カスタム derive</td>
                  <td><code>#[derive(名前)]</code></td>
                  <td><code>#[derive(Serialize, Deserialize)]</code>（serde）</td>
                </tr>
                <tr>
                  <td>属性形式</td>
                  <td><code>#[名前(引数)]</code></td>
                  <td><code>#[tauri::command]</code>、<code>#[tokio::main]</code></td>
                </tr>
                <tr>
                  <td>関数形式</td>
                  <td><code>名前!(…)</code></td>
                  <td><code>tauri::generate_handler![…]</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            カスタム derive の骨格は次の形です。<code>syn</code> クレートがトークン列を構文木に解析し、<code>quote</code> クレートが構文木から Rust コードを生成します。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            title="hello_macro_derive/src/lib.rs"
            code={`
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    let ast: syn::DeriveInput = syn::parse(input).unwrap();   // トークン列 → 構文木
    let name = &ast.ident;                                     // 付けられた型の名前
    let generated = quote! {                                   // 生成するコード
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}!", stringify!(#name));
            }
        }
    };
    generated.into()
}
`}
          />
          <p>
            <code>#[derive(HelloMacro)] struct Pancakes;</code> と書くと、この関数が <code>struct Pancakes;</code> のトークン列を受け取り、<code>{'impl HelloMacro for Pancakes { … }'}</code> を返します。利用者はトレイト実装を1行も書いていないのに、<code>Pancakes::hello_macro()</code> が呼べるようになります。<Ref n={2} /> <ChapterLink n={34} /> で使う <code>#[tauri::command]</code> も同じ仕組みで、普通の関数から「フロントエンドの <code>invoke</code> に応答し、引数を JSON から復元する」ための補助コードを生成しています。
          </p>
        </>
      ),
    },
    {
      id: 'ffi',
      title: 'FFI：他言語の関数とやり取りする',
      body: (
        <>
          <p>
            Rust は C の<Term en="ABI">ABI</Term>（Application Binary Interface、関数の呼び出し規約）に合わせて関数を呼んだり公開したりできます。C 以外の言語の多くも C の ABI を話せるので、Rust と OS や既存ライブラリをつなぐ共通語になります。<Ref n={1} /><Ref n={3} />
          </p>
          <Figure n="32-3" title="FFI の境界" caption="Rust から C の関数を呼ぶ向き（上）と、Rust の関数を C に公開する向き（下）。境界の向こう側はコンパイラが検査できないので、型と呼び出し規約を人間が一致させる。模式図。">
            <FfiFigure />
          </Figure>
          <h3>C の関数を呼ぶ：extern ブロック</h3>
          <p>
            他言語の関数は <code>extern</code> ブロックで宣言します。向こう側は Rust の規則を守っていないので、2024 edition ではブロック自体に <code>unsafe</code> を付け、呼び出しも <code>unsafe</code> ブロックで行います。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
unsafe extern "C" {
    fn abs(input: i32) -> i32;        // C 標準ライブラリの abs
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
`}
          />
          <p>
            <code>abs</code> のように呼んでも安全だと分かっている関数には <code>safe fn</code> と書けます。すると <code>unsafe</code> ブロックなしで呼べますが、<code>safe</code> はコンパイラへの約束であって保証ではなく、正しさの責任は書いた人にあります。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
unsafe extern "C" {
    safe fn abs(input: i32) -> i32;   // 呼び出し側は unsafe を書かなくてよい
}

fn main() {
    println!("Absolute value of -3 according to C: {}", abs(-3));
}
`}
          />
          <h3>Rust の関数を C に公開する</h3>
          <p>
            逆向きは、関数に <code>{'extern "C"'}</code> で呼び出し規約を指定し、<code>#[unsafe(no_mangle)]</code> でコンパイラによる名前の変形（マングリング）を止めます。名前の衝突が起きうるので、この属性は <code>unsafe</code> 扱いです。<Ref n={1} /> ライブラリとして配布するときは <code>Cargo.toml</code> の <code>[lib] crate-type = ["cdylib"]</code> を指定し、C 側のヘッダは <code>cbindgen</code> で生成するのが実務的です。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
#[unsafe(no_mangle)]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
`}
          />
          <h3>境界で守るべきこと</h3>
          <p>Rustonomicon の FFI の章から、境界で守るべき点を抜き出します。<Ref n={3} /></p>
          <ul>
            <li>C に渡す構造体には <code>#[repr(C)]</code> を付け、メモリ配置を C と同じにする。</li>
            <li>Rust の文字列は NUL 終端ではないので、<code>std::ffi::CString</code> に変換して渡す。</li>
            <li>参照や <code>Box</code> は null にできない。null になりうる C のポインタは <code>Option</code> で受ける（<code>{'Option<extern "C" fn(…)>'}</code> は C の関数ポインタと同じ表現になる）。</li>
            <li>panic を境界の向こうへ越えさせない。C の例外が Rust に入ってくるのは未定義動作で、Rust の panic が <code>"C"</code> ABI の境界に達するとプロセスは中断する。必要なら <code>std::panic::catch_unwind</code> で受け止める。</li>
            <li>unsafe な呼び出しは安全な <code>pub fn</code> で包み、バッファ長の検証や <code>Option</code> への変換を内側で済ませる。</li>
          </ul>
          <Code
            lang="rust"
            code={`
// Rustonomicon の例：圧縮ライブラリ snappy の検証関数を安全な関数で包む
pub fn validate_compressed_buffer(src: &[u8]) -> bool {
    unsafe {
        snappy_validate_compressed_buffer(src.as_ptr(), src.len() as size_t) == 0
    }
}
`}
          />
          <p>
            スライスの先頭ポインタと長さを C に渡し、戻り値の整数を <code>bool</code> に変換しています。呼び出し側から見れば普通の安全な関数であり、<code>unsafe</code> はこの1か所に閉じ込められています。<Ref n={3} />
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
              Tsumugi のコードに <code>unsafe</code> や <code>extern</code> を自分で書く場面はありません。しかし依存の中では常に動いています。rusqlite（<ChapterLink n={42} />）は C で書かれた SQLite 本体を FFI で呼び、<code>bundled</code> 機能で SQLite のソースを同梱してビルドします。<code>Connection</code> や <code>Statement</code> は、SQLite の生ポインタを安全な API で包んだ型です。Tauri（<ChapterLink n={33} />）が各 OS の WebView を動かす WRY や TAO も、OS のネイティブ API を FFI で呼んでいます。
            </p>
            <p>
              マクロはもっと身近です。<code>#[tauri::command]</code>（属性形式）、<code>tauri::generate_handler!</code>（関数形式）、<code>#[derive(Serialize, Deserialize)]</code>（カスタム derive）を <ChapterLink n={34} /> から毎章のように使います。マクロが展開されたコードはエラーメッセージに現れることがあるので、「このエラーは自分のコードではなく、属性が生成した部分で起きている」と読み解けることが役立ちます。<ChapterLink n={56} /> で Swift や Kotlin と連携するプラグインを自作するときは、Tauri のプラグイン機構がこの章の FFI の境界を隠してくれる形になります。
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
            <li><code>unsafe</code> が許すのは5つの操作だけで、借用チェッカは止まらない。ブロックは小さく保ち、安全な関数で包み、<code>SAFETY</code> コメントで根拠を書く。</li>
            <li>生ポインタは作るのは安全で、参照外しが <code>unsafe</code>。<code>split_at_mut</code> のように <code>assert!</code> で前提を保証すれば、unsafe を含む関数も安全な API になる。</li>
            <li>マクロはコンパイラが意味を解釈する前に展開される。<code>macro_rules!</code> はパターンで置き換え、手続き的マクロは <code>TokenStream</code> を Rust のコードで加工する。</li>
            <li>FFI は <code>{'unsafe extern "C"'}</code> で他言語の関数を宣言し、<code>#[unsafe(no_mangle)] pub extern "C" fn</code> で Rust の関数を公開する。境界では <code>#[repr(C)]</code>、<code>CString</code>、null の扱い、panic の封じ込めを守る。</li>
            <li>Tsumugi ではこれらを自分で書かないが、rusqlite・Tauri・serde の内部で常に使われており、読めることが重要。</li>
          </ul>
          <p>第4部はここまでです。次の第5部では、ここまで学んだ Rust を Tauri の Rust 側として使い、フロントエンドの React とつなぐ方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 20.1: Unsafe Rust',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html',
      accessed: '2026-11-08',
      note: 'unsafe の5つの操作、生ポインタ、split_at_mut の例、unsafe extern と safe fn、#[unsafe(no_mangle)]、static mut、unsafe trait、SAFETY コメント、Miri の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 20.5: Macros',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch20-05-macros.html',
      accessed: '2026-11-08',
      note: 'マクロと関数の違い、macro_rules! と vec! の簡略版、#[macro_export]、手続き的マクロの3種類、syn と quote による derive の実装の根拠。',
    },
    {
      title: 'The Rustonomicon: Foreign Function Interface',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/nomicon/ffi.html',
      accessed: '2026-11-08',
      note: 'snappy の例と安全なラッパー、#[repr(C)]、CString、null ポインタ最適化と Option、panic と例外の境界越え、cdylib と cbindgen の根拠。',
    },
  ],
}

export default chapter
