import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 22-1 パッケージ・クレート・モジュール ---------- */
function PackageCrateFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="パッケージ、クレート、モジュールの入れ子関係。1つのパッケージ（Cargo.toml）はライブラリクレート最大1つと任意個のバイナリクレートを含み、各クレートはクレートルートから始まるモジュールの木でできている">
      <g fontSize="13">
        <rect x="20" y="20" width="600" height="260" rx="10" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="35" y="45" fontWeight="600" fontSize="15">パッケージ</text>
        <text x="140" y="45" fill="var(--fig-muted)">= Cargo.toml を持つディレクトリ。cargo new が作る単位</text>

        {/* lib crate */}
        <rect x="40" y="65" width="270" height="195" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="55" y="88" fontWeight="600">ライブラリクレート（最大1つ）</text>
        <text x="55" y="108" fontFamily="monospace" fontSize="12">src/lib.rs = クレートルート</text>
        <rect x="55" y="120" width="240" height="125" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="65" y="140" fontSize="12" fill="var(--fig-muted)">モジュールの木</text>
        <text x="75" y="162" fontFamily="monospace" fontSize="12">crate</text>
        <text x="95" y="182" fontFamily="monospace" fontSize="12">├── pages</text>
        <text x="95" y="202" fontFamily="monospace" fontSize="12">│   └── tree</text>
        <text x="95" y="222" fontFamily="monospace" fontSize="12">├── search</text>
        <text x="95" y="242" fontFamily="monospace" fontSize="12">└── error</text>

        {/* bin crates */}
        <rect x="330" y="65" width="270" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="345" y="88" fontWeight="600">バイナリクレート（任意個）</text>
        <text x="345" y="108" fontFamily="monospace" fontSize="12">src/main.rs = クレートルート</text>
        <text x="345" y="128" fontFamily="monospace" fontSize="12">src/bin/*.rs = 追加のバイナリ</text>
        <text x="345" y="146" fontSize="12" fill="var(--fig-muted)">fn main() を持ち、実行ファイルになる</text>

        <rect x="330" y="170" width="270" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="345" y="193" fontWeight="600">外部クレート</text>
        <text x="345" y="213" fontFamily="monospace" fontSize="12">[dependencies] serde = "1"</text>
        <text x="345" y="233" fontSize="12" fill="var(--fig-muted)">crates.io からダウンロードされ、</text>
        <text x="345" y="251" fontSize="12" fill="var(--fig-muted)">use serde::... で参照する</text>
      </g>
    </svg>
  )
}

/* ---------- 図 22-2 モジュールツリーとパス ---------- */
function ModuleTreeFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="モジュールツリーとパスの図。根 crate の下に pages と search があり、pages の下に tree がある。pages::tree の中の関数から見て、crate::search::index は絶対パス、super::create は親をたどる相対パス。pub の付かない項目は親からは見えない">
      <defs>
        <marker id="arrow22a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* root */}
        <rect x="260" y="20" width="120" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="320" y="45" textAnchor="middle" fontFamily="monospace" fontWeight="600">crate</text>
        <text x="400" y="45" fontSize="12" fill="var(--fig-muted)">src/lib.rs</text>

        {/* pages, search */}
        <line x1="320" y1="60" x2="180" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="320" y1="60" x2="460" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="110" y="100" width="140" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="180" y="125" textAnchor="middle" fontFamily="monospace">pub mod pages</text>
        <rect x="390" y="100" width="140" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="460" y="125" textAnchor="middle" fontFamily="monospace">pub mod search</text>

        {/* children of pages */}
        <line x1="180" y1="140" x2="100" y2="180" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="180" y1="140" x2="260" y2="180" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="30" y="180" width="140" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="100" y="205" textAnchor="middle" fontFamily="monospace">pub fn create</text>
        <rect x="190" y="180" width="140" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="260" y="205" textAnchor="middle" fontFamily="monospace">pub mod tree</text>

        {/* children of search */}
        <line x1="460" y1="140" x2="460" y2="180" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="390" y="180" width="140" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="460" y="205" textAnchor="middle" fontFamily="monospace">pub fn index</text>
        <line x1="460" y1="220" x2="460" y2="260" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="390" y="260" width="140" height="40" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="460" y="285" textAnchor="middle" fontFamily="monospace" fill="var(--fig-muted)">fn tokenize</text>
        <text x="460" y="318" textAnchor="middle" fontSize="12" fill="var(--fig-danger)">私的：外から不可視</text>

        {/* child of tree */}
        <line x1="260" y1="220" x2="260" y2="260" stroke="var(--fig-line)" strokeWidth="2" />
        <rect x="190" y="260" width="140" height="40" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="260" y="285" textAnchor="middle" fontFamily="monospace">fn depth_of</text>
        <text x="260" y="318" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">ここから見たパス</text>

        {/* paths */}
        <path d="M330,270 C370,250 380,220 388,200" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow22a)" />
        <text x="372" y="250" fontSize="12" fill="var(--fig-accent)" fontFamily="monospace">crate::search::index</text>
        <path d="M190,275 C150,260 120,240 105,222" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow22a)" />
        <text x="20" y="245" fontSize="12" fill="var(--fig-accent)" fontFamily="monospace">super::create</text>
      </g>
      <text x="320" y="335" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線矢印：絶対パス（crate:: から）　破線矢印：相対パス（super:: は親モジュール）　破線枠：pub なし</text>
    </svg>
  )
}

/* ---------- 図 22-3 mod 宣言とファイルの対応 ---------- */
function ModFilesFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="mod 宣言とファイルの対応。src/lib.rs の mod pages; は src/pages.rs を読み込み、src/pages.rs の mod tree; は src/pages/tree.rs を読み込む。ファイルを分けてもモジュールの木は変わらない">
      <defs>
        <marker id="arrow22b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" fontFamily="monospace">
        <rect x="20" y="30" width="190" height="90" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="30" y="52" fontWeight="600">src/lib.rs</text>
        <text x="30" y="78">pub mod pages;</text>
        <text x="30" y="100">pub mod search;</text>

        <rect x="250" y="30" width="190" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="260" y="52" fontWeight="600">src/pages.rs</text>
        <text x="260" y="78">pub mod tree;</text>
        <text x="260" y="100">pub fn create() {'{}'}</text>

        <rect x="480" y="30" width="150" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="490" y="52" fontWeight="600" fontSize="12">src/pages/tree.rs</text>
        <text x="490" y="78" fontSize="12">pub fn depth_of()</text>
        <text x="490" y="100" fontSize="12">{'{ super::create() }'}</text>

        <rect x="250" y="150" width="190" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="260" y="172" fontWeight="600">src/search.rs</text>
        <text x="260" y="196">pub fn index() {'{}'}</text>

        <path d="M150,74 L245,74" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow22b)" />
        <path d="M160,96 L220,96 L220,180 L245,180" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow22b)" />
        <path d="M370,74 L475,74" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow22b)" />
      </g>
      <text x="320" y="245" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">mod 名; と書かれた場所から、同名の .rs ファイル（子は親の名前のディレクトリの下）が探される</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 22,
  part: 4,
  title: 'モジュール・クレート・Cargo',
  summary:
    'コードが増えてきたら、モジュールで整理し、クレートに分け、Cargo で依存を管理します。パッケージとクレートの関係、mod と pub による可視性、絶対パスと相対パス、use による取り込み、ファイルへの分割、外部クレートの追加、複数クレートをまとめるワークスペースを学びます。',
  goals: [
    'パッケージ・クレート・モジュールの関係と、src/main.rs と src/lib.rs の役割を説明できる',
    'mod と pub でモジュールの木を作り、私的と公開の規則を説明できる',
    'crate:: から始まる絶対パスと super:: を使う相対パスを書き分けられる',
    'use で名前を取り込み、慣習的な書き方と pub use による再公開を説明できる',
    'mod 宣言とファイル配置の対応規則に従ってモジュールをファイルに分けられる',
    'Cargo.toml に依存クレートを追加し、ワークスペースで複数クレートをまとめられる',
  ],
  prerequisites: [18, 21],
  sections: [
    {
      id: 'why-modules',
      title: 'コードを分ける単位',
      body: (
        <>
          <p>
            ここまでの例は <code>src/main.rs</code> 1つに収まる大きさでした。アプリが育つと、ページ管理、検索、エラー型のように役割ごとにコードを分け、どの関数を外に見せるかを決めたくなります。JavaScript では ES Modules のファイル単位の <code>import</code> と <code>export</code>（<ChapterLink n={3} />）がその役目でしたが、Rust には3段階の単位があります。<Ref n={1} />
          </p>
          <ul>
            <li>
              <Term en="package">パッケージ</Term>
              ：<code>Cargo.toml</code> を持つディレクトリ。<code>cargo new</code> が作る単位で、1つ以上のクレートを含む。
            </li>
            <li>
              <Term en="crate">クレート</Term>
              ：コンパイラが一度に扱う最小の単位。実行ファイルになるバイナリクレートと、他から使われるライブラリクレートの2種類。
            </li>
            <li>
              <Term en="module">モジュール</Term>
              ：クレートの中でコードを整理し、名前の可視性を制御する単位。
            </li>
          </ul>
          <Figure n="22-1" title="パッケージ・クレート・モジュールの関係" caption="1つのパッケージはライブラリクレートを最大1つ、バイナリクレートを任意個含む。各クレートはクレートルートのファイルから始まるモジュールの木でできている。外部クレートは Cargo.toml の [dependencies] で取り込む。">
            <PackageCrateFigure />
          </Figure>
          <p>
            図のとおり、パッケージには規則があります。ライブラリクレートは最大1つ、バイナリクレートはいくつでも、合わせて最低1つです。Cargo は <code>src/main.rs</code> があればそれをパッケージと同名のバイナリクレートの
            <Term en="crate root">クレートルート</Term>
            、<code>src/lib.rs</code> があればパッケージと同名のライブラリクレートのクレートルートと見なします。両方あれば2つのクレートを持つパッケージです。<code>src/bin/</code> の下の各ファイルは、それぞれ別のバイナリクレートになります。<Ref n={1} />
          </p>
          <p>
            バイナリクレートには <code>main</code> 関数が必要で、ライブラリクレートにはありません。Rust の人が「クレート」と言うとき、ふつうはライブラリクレートを指しています。<Ref n={1} /> 標準ライブラリ <code>std</code> も1つのクレートで、Rust に同梱されているので <code>Cargo.toml</code> に書かなくても使えます。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'mod-pub',
      title: 'mod と pub：モジュールの木と可視性',
      body: (
        <>
          <p>
            コンパイラはクレートルート（<code>src/lib.rs</code> か <code>src/main.rs</code>）から読み始めます。そこに <code>mod pages;</code> と書くと、<code>pages</code> という名前のモジュールが宣言され、その中身を次の3か所から探します。<Ref n={2} />
          </p>
          <ol>
            <li>その場の波かっこの中：<code>mod pages {'{ ... }'}</code></li>
            <li>ファイル <code>src/pages.rs</code></li>
            <li>ファイル <code>src/pages/mod.rs</code></li>
          </ol>
          <p>
            クレートルート以外のファイルでも同じ方法で子モジュールを宣言できます。<code>src/pages.rs</code> に <code>mod tree;</code> と書けば、<code>src/pages/tree.rs</code>（または <code>src/pages/tree/mod.rs</code>）が探されます。<Ref n={2} /> まずは1ファイルの中に波かっこで書いた例で、モジュールの木を見てみます。
          </p>
          <Code
            lang="rust"
            title="src/lib.rs"
            code={`
pub mod pages {
    pub fn create() {}

    pub mod tree {
        pub fn depth_of() -> usize {
            super::create();          // 親モジュールの関数（相対パス）
            crate::search::index();   // 根からたどる（絶対パス）
            0
        }
    }
}

pub mod search {
    pub fn index() {
        tokenize();                   // 同じモジュール内なので pub なしでも呼べる
    }

    fn tokenize() {}                  // pub がない：search の外からは見えない
}
`}
          />
          <p>この木を図 22-2 に示します。各ノードに <code>pub</code> があるかどうかと、矢印で示した2種類のパスに注目してください。</p>
          <Figure n="22-2" title="モジュールツリーとパス" caption="根は暗黙のモジュール crate。pages::tree::depth_of から見て、crate::search::index は根から下る絶対パス、super::create は親に上る相対パス。pub の付かない tokenize は search の外から見えない。">
            <ModuleTreeFigure />
          </Figure>
          <p>
            図から読み取れる規則は2つです。第一に、クレートルートは <code>crate</code> という名前の暗黙の根モジュールになり、ファイルシステムのディレクトリ木のようにモジュールが入れ子になります。<Ref n={2} /> 第二に、項目は既定で
            <Term en="private">私的</Term>
            です。親モジュールは子の私的な項目を使えませんが、子は祖先の項目を使えます。外に見せたい項目には <code>pub</code> を付けます。<Ref n={3} />
          </p>
          <p>
            <code>pub mod</code> はモジュール自体を祖先から見えるようにするだけで、中の項目まで公開はされません。モジュールにも関数にも <code>pub</code> が要ります。付け忘れると、エラー E0603（<code>function `hidden` is private</code> など）になります。<Ref n={3} /> この既定が私的という設計は、「公開した項目は他のコードが依存するので、簡単に変えられない。私的な項目は自由に変えてよい」という線引きをコンパイラに強制させるためのものです。
          </p>
          <h3>構造体と列挙型の pub</h3>
          <p>
            <code>pub struct</code> にしても、フィールドはそれぞれ <code>pub</code> を付けない限り私的のままです。私的なフィールドを持つ構造体は外からリテラルで作れないので、<code>pub fn new(...)</code> のような公開の関連関数を用意します。これは「必ず検証済みの値だけを持つ型」を作るときの基本的な技法です。一方、<code>pub enum</code> のバリアントはすべて公開になります。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'paths-use',
      title: 'パスと use',
      body: (
        <>
          <p>
            モジュールの中の項目を指す
            <Term en="path">パス</Term>
            には2種類あります。<Ref n={3} />
          </p>
          <ul>
            <li>絶対パス：<code>crate::</code>（自分のクレート）または外部クレート名から始まる。例 <code>crate::search::index</code></li>
            <li>相対パス：現在のモジュールから始まる。<code>self::</code>、親を表す <code>super::</code>、または現在のモジュール内の名前から始める。例 <code>super::create</code></li>
          </ul>
          <p>
            公式ブックは、定義の場所と呼び出しの場所が独立に動きやすいという理由で、一般には絶対パスを勧めています。<code>super::</code> はファイルシステムの <code>..</code> に相当し、「親と一緒に動く」ことが分かっている近い関係の項目を指すときに向いています。<Ref n={3} />
          </p>
          <h3>use で短い名前を作る</h3>
          <p>
            毎回フルパスを書くのは冗長なので、<code>use</code> でスコープに名前を取り込みます。<code>use</code> は書かれたスコープの中だけで有効で、子モジュールには引き継がれません。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
use crate::pages::tree;           // モジュールまでを取り込み、tree::depth_of() と呼ぶ
use std::collections::HashMap;    // 型はフルパスで取り込む
use std::fmt::Result;
use std::io::Result as IoResult;  // 名前がぶつかるときは as で別名にする
use std::{cmp::Ordering, fs};     // 共通の接頭辞をまとめる
use std::io::{self, Write};       // io 自身と io::Write の両方

fn main() {
    let mut map: HashMap<String, usize> = HashMap::new();
    map.insert(String::from("a"), 1);
    tree::depth_of();
}
`}
          />
          <p>
            慣習として、関数は親モジュールまでを取り込んで <code>tree::depth_of()</code> のように呼び、構造体・列挙型・トレイトはフルパスで取り込んで名前だけで使います。関数の場合に親を残すのは、「その関数がこのファイルで定義されたものではない」ことを読み手に示すためです。例外は、<code>fmt::Result</code> と <code>io::Result</code> のように同じ名前の型が2つあるときで、親モジュールを残すか <code>as</code> で別名を付けます。<Ref n={4} />
          </p>
          <p>
            <code>use std::collections::*;</code> のような
            <Term en="glob">グロブ</Term>
            はすべての公開項目を取り込みます。どの名前がどこから来たのか分かりにくくなるので、テストモジュールやプレリュード（よく使う項目をまとめた慣習的なモジュール）以外では避けます。<Ref n={4} />
          </p>
          <h3>pub use：再公開</h3>
          <p>
            <code>pub use</code> と書くと、取り込んだ名前を自分のモジュールの項目として外に公開できます。これを
            <Term en="re-export">再公開</Term>
            と呼びます。内部のモジュール構造と、利用者に見せたい構造が違うときに使います。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            title="src/lib.rs"
            code={`
pub mod error;
pub mod pages;

pub use error::{Error, Result};  // 利用者は tsumugi_core::Error と書ける
                                 // （tsumugi_core::error::Error でもよい）
`}
          />
        </>
      ),
    },
    {
      id: 'files',
      title: 'モジュールをファイルに分ける',
      body: (
        <>
          <p>
            波かっこで書いたモジュールは、中身をそのままファイルに移せます。クレートルートには本体のない <code>mod pages;</code> だけを残し、中身を <code>src/pages.rs</code> に置きます。<Ref n={5} /> 図 22-3 に対応を示します。
          </p>
          <Figure n="22-3" title="mod 宣言とファイルの対応" caption="mod 名; が書かれた場所に応じてファイルが探される。クレートルートの mod pages; は src/pages.rs、src/pages.rs の mod tree; は src/pages/tree.rs。ファイルを分けてもモジュールの木とパスは変わらない。">
            <ModFilesFigure />
          </Figure>
          <Code
            lang="rust"
            title="src/pages.rs"
            code={`
pub mod tree;                 // 中身は src/pages/tree.rs

pub fn create() {}
`}
          />
          <Code
            lang="rust"
            title="src/pages/tree.rs"
            code={`
pub fn depth_of() -> usize {
    super::create();          // パスは分割前と同じ
    0
}
`}
          />
          <p>
            図から分かる重要な点は、<code>mod</code> は C の <code>#include</code> のような「ファイルの取り込み」ではないことです。<code>mod pages;</code> はモジュールの木に1回だけ宣言し、他のファイルからはパスで参照します。同じモジュールを別のファイルで再び <code>mod</code> すると、別のモジュールが2つできてしまいます。<Ref n={5} /> また、<code>use</code> はどのファイルがコンパイルされるかに影響しません。<code>use</code> だけ書いて <code>mod</code> を忘れると「見つからない」というエラーになります。
          </p>
          <p>
            子モジュールのファイルは、親の名前のディレクトリの下に置きます。<code>src/tree.rs</code> に置くと、クレートルート直下の <code>tree</code> モジュールと解釈されてしまいます。古い書き方として <code>src/pages/mod.rs</code> も使えますが、同じモジュールに両方の形式を使うとエラーになり、エディタで <code>mod.rs</code> がいくつも開いて見分けにくいという欠点があるため、本書では <code>src/pages.rs</code> の形式を使います。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'dependencies',
      title: '外部クレートと Cargo.toml',
      body: (
        <>
          <p>
            crates.io に公開されているクレートを使うには、<code>Cargo.toml</code> の <code>[dependencies]</code> に名前とバージョンを書きます。<code>cargo add</code> コマンドを使うと、最新バージョンを調べて書き込んでくれます。<Ref n={7} />
          </p>
          <Code
            lang="bash"
            code={`
$ cargo add serde --features derive
$ cargo add serde_json thiserror
`}
          />
          <Code
            lang="toml"
            title="Cargo.toml（抜粋）"
            code={`
[dependencies]
serde = { version = "1.0.229", features = ["derive"] }
serde_json = "1.0.154"
thiserror = "2.0.21"
`}
          />
          <p>
            バージョンの書き方には規則があります。<code>"1.0.229"</code> のように書くと、SemVer で互換とされる範囲、つまり <code>&gt;=1.0.229, &lt;2.0.0</code> を意味します（<code>^</code> を付けたのと同じ）。<code>0.x</code> のクレートでは一番左の 0 でない桁が固定され、<code>"0.41.1"</code> は <code>&gt;=0.41.1, &lt;0.42.0</code> です。<Ref n={6} /> 実際にどのバージョンが選ばれたかは <code>Cargo.lock</code> に固定され、<code>cargo update</code> で更新します。
          </p>
          <p>
            クレートには
            <Term en="feature">フィーチャー</Term>
            と呼ばれる機能のオン・オフがあり、<code>features = [...]</code> で指定します。<code>serde</code> の <code>derive</code> は、<ChapterLink n={25} /> で扱う <code>#[derive(Serialize, Deserialize)]</code> を使うために必要です。<code>default-features = false</code> で既定の機能を外すこともできます。<Ref n={6} /> Tsumugi で使う <code>rusqlite</code> の <code>bundled</code> フィーチャーは、SQLite 本体をクレートに同梱してビルドするもので、OS に SQLite を別途入れなくて済みます。<Ref n={9} />
          </p>
          <p>
            crates.io 以外に、ローカルのディレクトリ（<code>{'{ path = "../core" }'}</code>）や Git リポジトリ（<code>{'{ git = "...", tag = "..." }'}</code>）も依存先に指定できます。<Ref n={6} /> 取り込んだクレートは、自分のクレートと同じように <code>use serde::Serialize;</code> のようなパスで参照します。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'workspace',
      title: 'ワークスペース：複数のクレートをまとめる',
      body: (
        <>
          <p>
            「Tauri に依存しない純粋なロジック」と「Tauri アプリ本体」のように、1つのプロジェクトを複数のパッケージに分けたいことがあります。そのための仕組みが
            <Term en="workspace">ワークスペース</Term>
            です。ワークスペースのメンバーは <code>Cargo.lock</code> と <code>target</code> ディレクトリを共有し、<code>cargo build --workspace</code> のようにまとめて操作できます。<Ref n={8} />
          </p>
          <Code
            lang="toml"
            title="Cargo.toml（ワークスペースの根）"
            code={`
[workspace]
resolver = "3"
members = ["core", "app"]

[workspace.package]
version = "0.1.0"
edition = "2024"

[workspace.dependencies]
serde = { version = "1", features = ["derive"] }
thiserror = "2"
`}
          />
          <Code
            lang="toml"
            title="core/Cargo.toml"
            code={`
[package]
name = "tsumugi-core"
version.workspace = true      # 根の [workspace.package] から継承
edition.workspace = true

[dependencies]
serde = { workspace = true }  # 根の [workspace.dependencies] から継承
thiserror = { workspace = true }
`}
          />
          <Code
            lang="toml"
            title="app/Cargo.toml"
            code={`
[package]
name = "tsumugi"
version.workspace = true
edition.workspace = true

[dependencies]
tsumugi-core = { path = "../core" }   # 同じワークスペースのクレート
`}
          />
          <p>
            根の <code>Cargo.toml</code> に <code>[package]</code> がなく <code>[workspace]</code> だけのものを
            <Term en="virtual manifest">仮想マニフェスト</Term>
            と呼びます。この場合、edition から推測できないので <code>resolver</code> を明示します。<Ref n={8} /> 2024 edition のパッケージでは <code>resolver = "3"</code> が既定で、これは各クレートの <code>rust-version</code>（必要な最小コンパイラバージョン）を考慮して依存を解決する、Rust バージョン対応の解決器です。<Ref n={10} />
          </p>
          <p>
            <code>[workspace.package]</code> と <code>[workspace.dependencies]</code> に共通の設定をまとめ、各メンバーで <code>workspace = true</code> と書いて継承するのが現在の標準的な書き方です。バージョンや依存の指定が1か所にまとまるので、メンバーごとに食い違う心配がなくなります。<Ref n={8} /> 上の3つの <code>Cargo.toml</code> は、本書の制作環境で実際にビルドして動作を確認しています。
          </p>
          <Callout>
            <p>
              クレート名にはハイフン（<code>tsumugi-core</code>）が使えますが、Rust のコードの中ではアンダースコアに置き換えて <code>use tsumugi_core::pages;</code> と書きます。<code>cargo new</code> の出力や crates.io のクレート名（<code>serde_json</code> と <code>serde-json</code> は同じものを指す）で戸惑いやすい点です。
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
              Tsumugi の <code>src-tauri/</code> は、この章のワークスペースと同じ考え方で作られています。根の <code>Cargo.toml</code> はアプリ本体のパッケージ（<code>tsumugi</code>）を兼ねたワークスペースで、<code>members</code> に <code>core/</code> を持ちます（この章の例のような仮想マニフェストではありません）。<code>core/</code> がライブラリクレート <code>tsumugi-core</code>（<code>db.rs</code>、<code>pages.rs</code>、<code>search.rs</code>、<code>database.rs</code>、<code>markdown.rs</code>、<code>error.rs</code> の各モジュール）、<code>src/</code> が Tauri アプリ本体（ライブラリ <code>tsumugi_lib</code> と <code>main.rs</code> のバイナリ）です（<ChapterLink n={41} />）。
            </p>
            <p>
              分ける理由は2つあります。1つは、<code>core</code> が Tauri に依存しないので、WebView のない環境でも <code>cargo test</code> で動作を検証できること（<ChapterLink n={31} />、<ChapterLink n={42} />）。もう1つは、Tauri のコマンド（<ChapterLink n={34} />）を <code>commands/pages.rs</code> のような薄いモジュールにして、ロジック本体と IPC の層をはっきり分けられることです。<code>core</code> の <code>lib.rs</code> では <code>pub use error::{'{'}Error, Result{'}'};</code> のように主要な型を再公開し、アプリ側からは短いパスで使えるようにします。
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
            <li>パッケージ（Cargo.toml）はクレート（ライブラリ最大1つ＋バイナリ任意個）を含み、クレートはクレートルート（<code>src/lib.rs</code> か <code>src/main.rs</code>）から始まるモジュールの木でできている。</li>
            <li><code>mod 名;</code> でモジュールを宣言し、中身はその場・<code>名.rs</code>・<code>名/mod.rs</code> のいずれかから探される。子モジュールのファイルは親の名前のディレクトリの下に置く。</li>
            <li>項目は既定で私的。<code>pub</code> で公開し、構造体はフィールドごとに、列挙型はバリアントまとめて公開される。</li>
            <li>パスは <code>crate::</code> からの絶対パスか、<code>super::</code> などの相対パス。<code>use</code> で短い名前を作り、<code>pub use</code> で再公開する。</li>
            <li>外部クレートは <code>[dependencies]</code> に書く。バージョン指定は SemVer 互換範囲、フィーチャーで機能を選ぶ。</li>
            <li>ワークスペースで複数クレートをまとめ、<code>[workspace.package]</code> と <code>[workspace.dependencies]</code> で設定を共有する。</li>
          </ul>
          <p>次章では、標準ライブラリの中心的なコレクションである <code>Vec</code>、<code>String</code>、<code>HashMap</code> を扱います。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 7.1 Packages and Crates',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html',
      accessed: '2026-11-08',
      note: 'クレートの2種類、クレートルート、パッケージの規則、src/main.rs・src/lib.rs・src/bin の慣習の根拠。',
    },
    {
      title: 'The Rust Programming Language, 7.2 Defining Modules to Control Scope and Privacy',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html',
      accessed: '2026-11-08',
      note: 'モジュールのチートシート（mod の探索場所3つ、子モジュール、パス、私的と公開、use）とモジュールツリーの根拠。',
    },
    {
      title: 'The Rust Programming Language, 7.3 Paths for Referring to an Item in the Module Tree',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html',
      accessed: '2026-11-08',
      note: '絶対パスと相対パス、私的の規則、E0603、super、構造体フィールドと列挙型バリアントの公開規則の根拠。',
    },
    {
      title: 'The Rust Programming Language, 7.4 Bringing Paths into Scope with the use Keyword',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html',
      accessed: '2026-11-08',
      note: 'use のスコープ、慣習的な取り込み方、as、pub use、外部クレートと std、入れ子パス、self、グロブの根拠。',
    },
    {
      title: 'The Rust Programming Language, 7.5 Separating Modules into Different Files',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html',
      accessed: '2026-11-08',
      note: 'mod は1回だけ宣言する、ファイル配置の規則、mod.rs 形式とその欠点の根拠。',
    },
    {
      title: 'The Cargo Book, Specifying Dependencies',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html',
      accessed: '2026-11-08',
      note: 'バージョン要件（キャレットが既定、0.x の扱い）、features と default-features、path 依存、git 依存の根拠。',
    },
    {
      title: 'The Cargo Book, cargo add',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/cargo/commands/cargo-add.html',
      accessed: '2026-11-08',
      note: 'cargo add の用法と、Cargo.toml の [dependencies] を編集することの根拠。',
    },
    {
      title: 'The Cargo Book, Workspaces',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/cargo/reference/workspaces.html',
      accessed: '2026-11-08',
      note: 'ワークスペースの定義、members、Cargo.lock と target の共有、仮想マニフェストと resolver、workspace.package と workspace.dependencies の継承の根拠。',
    },
    {
      title: 'rusqlite — Feature flags',
      publisher: 'docs.rs',
      url: 'https://docs.rs/crate/rusqlite/latest/features',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'bundled フィーチャーが libsqlite3-sys/bundled を有効にすることの根拠。',
    },
    {
      title: 'The Rust Edition Guide, Rust 2024: Cargo: Rust-version aware resolver',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/edition-guide/rust-2024/cargo-resolver.html',
      accessed: '2026-11-08',
      version: 'Rust 2024 edition',
      note: 'edition 2024 で resolver = "3" が既定になること、rust-version を考慮した解決、仮想ワークスペースで明示が必要なことの根拠。',
    },
  ],
}

export default chapter
