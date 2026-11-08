import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 18-1 ソースからバイナリまで ---------- */
function BuildFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="ソースコードから実行ファイルができるまでの流れ。cargo が Cargo.toml を読んで依存クレートを取得し、rustc が src 以下の .rs ファイルをコンパイルして target/debug に実行ファイルを置く">
      <defs>
        <marker id="arrow18a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 入力 */}
        <rect x="20" y="40" width="150" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="95" y="65" textAnchor="middle" fontWeight="600">src/main.rs</text>
        <text x="95" y="86" textAnchor="middle" fill="var(--fig-muted)">ソースコード</text>

        <rect x="20" y="130" width="150" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="95" y="155" textAnchor="middle" fontWeight="600">Cargo.toml</text>
        <text x="95" y="176" textAnchor="middle" fill="var(--fig-muted)">名前・edition・依存</text>

        <rect x="20" y="220" width="150" height="60" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="95" y="245" textAnchor="middle" fontWeight="600">crates.io</text>
        <text x="95" y="266" textAnchor="middle" fill="var(--fig-muted)">依存クレート</text>

        {/* cargo */}
        <rect x="240" y="110" width="160" height="100" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="320" y="140" textAnchor="middle" fontWeight="600" fontSize="15">cargo</text>
        <text x="320" y="162" textAnchor="middle" fill="var(--fig-muted)">依存の取得と</text>
        <text x="320" y="180" textAnchor="middle" fill="var(--fig-muted)">rustc の呼び出し</text>

        {/* rustc */}
        <rect x="240" y="20" width="160" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="320" y="45" textAnchor="middle" fontWeight="600" fontSize="15">rustc</text>
        <text x="320" y="66" textAnchor="middle" fill="var(--fig-muted)">コンパイラ本体</text>

        {/* 出力 */}
        <rect x="470" y="110" width="150" height="100" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="545" y="140" textAnchor="middle" fontWeight="600">target/debug/</text>
        <text x="545" y="162" textAnchor="middle">実行ファイル</text>
        <text x="545" y="184" textAnchor="middle" fill="var(--fig-muted)">（Rust 不要で動く）</text>

        {/* 矢印 */}
        <path d="M170,70 L235,70 L235,110" fill="none" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M170,160 L235,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow18a)" />
        <path d="M170,250 L235,250 L235,210" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M320,110 L320,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow18a)" />
        <path d="M400,160 L465,160" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow18a)" />
        <text x="432" y="150" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">build</text>
      </g>
      <text x="320" y="290" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線：ビルド時に必ず通る経路　点線：依存クレートがあるときだけ</text>
    </svg>
  )
}

/* ---------- 図 18-2 文と式 ---------- */
function StatementExpressionFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="文と式の違い。let y = 6; は値を返さない文で、ブロック { let x = 3; x + 1 } は末尾の式の値 4 を返す式。末尾にセミコロンを付けると値が () になる">
      <defs>
        <marker id="arrow18b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 左：文 */}
        <text x="150" y="30" textAnchor="middle" fontWeight="600" fontSize="15">文（statement）</text>
        <rect x="40" y="45" width="220" height="50" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="150" y="75" textAnchor="middle" fontFamily="monospace">let y = 6;</text>
        <path d="M150,95 L150,135" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow18b)" />
        <rect x="80" y="140" width="140" height="40" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 4" />
        <text x="150" y="165" textAnchor="middle" fill="var(--fig-muted)">値を返さない</text>

        {/* 右：式 */}
        <text x="470" y="30" textAnchor="middle" fontWeight="600" fontSize="15">式（expression）</text>
        <rect x="340" y="45" width="260" height="80" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="355" y="70" fontFamily="monospace">{'{'}</text>
        <text x="375" y="90" fontFamily="monospace">let x = 3;</text>
        <text x="375" y="110" fontFamily="monospace">x + 1</text>
        <text x="470" y="110" fontFamily="monospace" fill="var(--fig-muted)">← セミコロンなし</text>
        <text x="590" y="118" fontFamily="monospace">{'}'}</text>
        <path d="M470,125 L470,165" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow18b)" />
        <rect x="400" y="170" width="140" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="470" y="195" textAnchor="middle">値 4 になる</text>
      </g>
      <text x="320" y="245" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">末尾の x + 1 に ; を付けると、ブロック全体が文になり値は () になる</text>
    </svg>
  )
}

/* ---------- 図 18-3 整数型のビット幅 ---------- */
function IntegerWidthFigure() {
  const rows = [
    { t: 'u8', bits: 8, range: '0 〜 255' },
    { t: 'i8', bits: 8, range: '-128 〜 127' },
    { t: 'u32', bits: 32, range: '0 〜 約43億' },
    { t: 'i32', bits: 32, range: '約 ±21億（既定）' },
    { t: 'i64', bits: 64, range: '約 ±9.2×10^18' },
  ]
  return (
    <svg viewBox="0 0 640 245" role="img" aria-label="整数型のビット幅を横棒の長さで表した図。u8 と i8 は 8 ビット、u32 と i32 は 32 ビット、i64 は 64 ビットで、符号付きは範囲の半分を負の数に使う">
      <g fontSize="13">
        {rows.map((r, i) => {
          const y = 30 + i * 36
          const w = r.bits * 6
          return (
            <g key={r.t}>
              <text x="50" y={y + 17} textAnchor="end" fontFamily="monospace" fontWeight="600">{r.t}</text>
              <rect x="60" y={y} width={w} height="24" fill={r.t.startsWith('i') ? 'var(--fig-box3)' : 'var(--fig-box2)'} stroke="var(--fig-line)" />
              {r.t.startsWith('i') && <line x1={60 + w / 2} y1={y} x2={60 + w / 2} y2={y + 24} stroke="var(--fig-line)" strokeDasharray="3 3" />}
              <text x={60 + w + 10} y={y + 17} fill="var(--fig-muted)">{r.bits} ビット　{r.range}</text>
            </g>
          )
        })}
      </g>
      <text x="320" y="218" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">橙：符号なし（u）　青：符号付き（i、点線の左半分が負の数）</text>
      <text x="320" y="235" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">usize/isize はポインタ幅（64 ビット環境では 64）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 18,
  part: 4,
  title: 'Rust の第一歩：Cargo と基本文法',
  summary:
    'Rust がどんな言語で、なぜ Tauri の土台に選ばれているのかを押さえ、cargo でプロジェクトを作って動かすところから始めます。変数と不変性、基本的な型、関数、文と式の違い、制御フローまで、以降の章で前提になる文法を一通り学びます。',
  goals: [
    'Rust がコンパイル言語であることと、rustc と cargo の役割の違いを説明できる',
    'cargo new・build・run・check の使い分けができ、Cargo.toml の意味が読める',
    '変数が既定で不変であること、mut・const・シャドーイングの違いを説明できる',
    '整数・浮動小数点・bool・char・タプル・配列の型を読み書きできる',
    '文と式の違いを理解し、関数の戻り値をセミコロンなしの式で書ける',
    'if・loop・while・for を使った制御フローを書ける',
  ],
  prerequisites: [2],
  sections: [
    {
      id: 'why-rust',
      title: 'なぜ Rust を学ぶのか',
      body: (
        <>
          <p>
            第4部では、Tauri アプリの Rust 側（バックエンド）を書くための言語、Rust を学びます。ここから <ChapterLink n={32} /> までの15章は、Tauri に必要な範囲に絞らず、Rust の入門書として独立して読める構成にしています。
          </p>
          <p>
            JavaScript や TypeScript と比べたとき、Rust の最大の違いは
            <Term en="compiled language">コンパイル言語</Term>
            であることです。ソースコードは実行前に機械語へ変換され、できあがった実行ファイルは Rust がインストールされていない PC でもそのまま動きます。<Ref n={2} /> JavaScript がブラウザや Node.js といった実行環境を必要とするのとは対照的です。Tauri がデスクトップとモバイルの両方で小さく速いアプリを作れるのは、この性質に支えられています。
          </p>
          <p>
            もう1つの違いは、メモリの管理を
            <Term en="ownership">所有権</Term>
            という規則でコンパイル時に検査することです。ガベージコレクタを持たないのに、C や C++ で起きがちなメモリの事故をコンパイラが未然に防ぎます。この仕組みは <ChapterLink n={19} /> と <ChapterLink n={20} /> で扱います。本章ではその前段として、Rust のプロジェクトの作り方と、他の言語にもある基本的な文法を一気に通ります。
          </p>
          <p>
            本書は Rust 1.99（2024 edition）を基準にしています。<Term en="edition">edition</Term> は Rust の「文法の版」で、2015、2018、2021、2024 の4つがあります。2024 edition は Rust 1.85.0（2025 年 2 月）で安定化しました。新しい edition では一部の書き方が変わるため、本書で触れる 2024 edition 固有の変更は、公式の Edition Guide で確認したものだけを必要な箇所で示します。<Ref n={8} />
          </p>
        </>
      ),
    },
    {
      id: 'cargo',
      title: 'rustc と cargo：プロジェクトを作って動かす',
      body: (
        <>
          <p>
            Rust のコンパイラは <code>rustc</code> です。<ChapterLink n={2} /> で <code>rustup</code> を使ってインストールしたので、ターミナルで <code>rustc --version</code> を実行すると <code>rustc 1.99.1 (...)</code> のようにバージョンが表示されます。<Ref n={1} /> 1ファイルだけなら <code>rustc main.rs</code> で直接コンパイルできますが、実際の開発では
            <Term en="Cargo">cargo</Term>
            を使います。cargo は Rust のビルドシステム兼パッケージマネージャで、コードのビルド、依存ライブラリ（Rust では
            <Term en="crate">クレート</Term>
            と呼びます）のダウンロード、そのビルドまでを引き受けます。<Ref n={3} /> npm と webpack（または Vite）を合わせたような道具だと考えると近いです。
          </p>
          <p>まず、新しいプロジェクトを作ります。</p>
          <Code
            lang="bash"
            code={`
$ cargo new hello_cargo
    Creating binary (application) \`hello_cargo\` package
note: see more \`Cargo.toml\` keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
$ cd hello_cargo
`}
          />
          <p>
            <code>cargo new</code> は、ディレクトリ <code>hello_cargo</code> の中に <code>Cargo.toml</code> と <code>src/main.rs</code> を作り、Git リポジトリと <code>.gitignore</code> も初期化します（すでに Git リポジトリの中なら初期化は省かれます）。<Ref n={3} /> ソースコードは <code>src</code> の下に置き、最上位には README や設定ファイルだけを置くのが慣習です。
          </p>
          <Code
            lang="toml"
            title="Cargo.toml"
            code={`
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2024"

[dependencies]
`}
          />
          <p>
            <code>Cargo.toml</code> は TOML 形式の設定ファイルで、<code>package.json</code> に相当します。<code>[package]</code> にはパッケージ名、バージョン、edition を書き、<code>[dependencies]</code> に依存クレートを並べます。<Ref n={3} /> Rust 1.99 の <code>cargo new</code> は <code>edition = "2024"</code> を書き込みます（本書の制作環境で確認）。
          </p>
          <Code
            lang="rust"
            title="src/main.rs"
            code={`
fn main() {
    println!("Hello, world!");
}
`}
          />
          <p>
            <code>fn main()</code> は、実行ファイルで最初に呼ばれる関数です。<code>println!</code> の末尾の <code>!</code> は、これが関数ではなく
            <Term en="macro">マクロ</Term>
            であることを示します。マクロはコードを生成してコンパイルされる仕組みで、通常の関数とは少し違う規則で動きます（<ChapterLink n={32} /> で概要を扱います）。いまは「<code>!</code> が付いていたらマクロ」とだけ覚えておけば十分です。<Ref n={2} />
          </p>
          <p>ビルドと実行は次のコマンドで行います。</p>
          <Code
            lang="bash"
            code={`
$ cargo run
   Compiling hello_cargo v0.1.0 (/Users/you/hello_cargo)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.29s
     Running \`target/debug/hello_cargo\`
Hello, world!
`}
          />
          <p>ここで、図 18-1 にソースから実行ファイルができるまでの流れを示します。cargo と rustc の役割の違いと、成果物がどこに置かれるかに注目してください。</p>
          <Figure n="18-1" title="ソースから実行ファイルまでの流れ" caption="cargo が Cargo.toml を読み、必要なら crates.io から依存クレートを取得してから rustc を呼び出す。成果物はソースと別の target ディレクトリに置かれ、既定では target/debug に入る。">
            <BuildFlowFigure />
          </Figure>
          <p>
            図から分かるように、rustc を直接呼ぶのは cargo の仕事です。成果物はソースの横ではなく <code>target/debug/</code> に置かれ、最初のビルド時には依存クレートの正確なバージョンを記録する <code>Cargo.lock</code> も作られます。<code>Cargo.lock</code> は <code>package-lock.json</code> に相当し、手で編集しません。<Ref n={3} />
          </p>
          <p>よく使うサブコマンドをまとめます。<Ref n={3} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>コマンド</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>cargo build</code></td>
                  <td>コンパイルして <code>target/debug/</code> に実行ファイルを置く</td>
                </tr>
                <tr>
                  <td><code>cargo run</code></td>
                  <td>ビルドしてすぐ実行する。ソースが変わっていなければビルドを省く</td>
                </tr>
                <tr>
                  <td><code>cargo check</code></td>
                  <td>実行ファイルを作らずにコンパイルが通るかだけ検査する。build より速いので、書きながら繰り返す</td>
                </tr>
                <tr>
                  <td><code>cargo build --release</code></td>
                  <td>最適化してビルドし <code>target/release/</code> に置く。コンパイルは遅いが実行は速い。配布用</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>dev</code>（開発用）と <code>release</code>（配布用）の2つの
            <Term en="profile">プロファイル</Term>
            があることは、後述する整数オーバーフローの扱いの違いにも関わります。Tauri では <code>npm run tauri dev</code> と <code>npm run tauri build</code> の裏側で、それぞれのプロファイルが使われます（<ChapterLink n={33} />）。
          </p>
          <Callout>
            <p>
              Rust には標準のフォーマッタ <code>rustfmt</code> が同梱されていて、<code>cargo fmt</code> で整形できます。本書のコードもこの整形に従っています。Prettier と同じように、スタイルで迷う時間をなくすための道具です。<Ref n={2} /> 静的解析ツール <code>clippy</code> と合わせて <ChapterLink n={31} /> で扱います。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'variables',
      title: '変数と不変性',
      body: (
        <>
          <p>
            Rust の変数は <code>let</code> で宣言します。JavaScript の <code>let</code> と似て見えますが、決定的な違いがあります。Rust の変数は既定で
            <Term en="immutable">不変</Term>
            です。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    let x = 5;
    println!("x = {x}");
    x = 6; // エラー
}
`}
          />
          <Code
            lang="text"
            code={`
error[E0384]: cannot assign twice to immutable variable \`x\`
  |
2 |     let x = 5;
  |         - first assignment to \`x\`
3 |     println!("x = {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut x = 5;
  |         +++
`}
          />
          <p>
            Rust のコンパイルエラーは、原因の場所と直し方の提案までを一緒に表示します。この例では <code>let mut x</code> にすれば直る、と教えてくれています。
            <code>mut</code> を付けた変数は再代入できます。
            <code>mut</code> は「この値は後で変わる」という読み手への合図にもなります。<Ref n={4} />
          </p>
          <p>
            <code>println!</code> の中の <code>{'{x}'}</code> は、スコープ内の変数をそのまま埋め込む書き方です。JavaScript のテンプレートリテラル <code>{'${x}'}</code> に相当し、<code>{'{}'}</code> と書いて後ろに引数を並べる形も使えます。<Ref n={9} />
          </p>
          <h3>定数</h3>
          <p>
            変更しない値には <code>const</code> も使えます。<code>const</code> は常に不変で <code>mut</code> を付けられず、型注釈が必須で、コンパイル時に計算できる式しか書けません。名前は大文字とアンダースコアで書く慣習です。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
const MAX_TITLE_LEN: usize = 200;
`}
          />
          <h3>シャドーイング</h3>
          <p>
            同じ名前で <code>let</code> をもう一度書くと、前の変数を新しい変数で覆い隠せます。これを
            <Term en="shadowing">シャドーイング</Term>
            と呼びます。<code>mut</code> による再代入と違い、新しい変数を作るので型を変えられます。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
let spaces = "   ";        // &str（文字列）
let spaces = spaces.len(); // usize（数値）。型が変わってもよい
`}
          />
          <p>
            同じことを <code>let mut spaces = "   "; spaces = spaces.len();</code> と書くと、<code>&str</code> の変数に <code>usize</code> を代入することになり E0308（型の不一致）でエラーになります。<Ref n={4} /> 「入力文字列を解析して数値に変える」のように、同じ意味の値を加工しながら名前を使い回したいときにシャドーイングが便利です。
          </p>
        </>
      ),
    },
    {
      id: 'types',
      title: '基本的な型',
      body: (
        <>
          <p>
            Rust は静的型付けで、すべての変数の型はコンパイル時に決まります。ただし多くの場合は TypeScript と同じように型推論が働くので、注釈を書くのは推論できない場面だけです。型は大きく
            <Term en="scalar type">スカラー型</Term>
            （単一の値）と
            <Term en="compound type">複合型</Term>
            （複数の値をまとめたもの）に分かれます。<Ref n={5} />
          </p>
          <h3>整数</h3>
          <p>
            JavaScript の <code>number</code> と違い、Rust の整数にはビット幅と符号の有無があります。図 18-3 に代表的な型を示します。
          </p>
          <Figure n="18-3" title="整数型のビット幅と範囲" caption="棒の長さがビット幅。符号付き（i）は範囲の半分を負の数に使う。usize と isize はポインタと同じ幅で、主にコレクションの添字に使う。">
            <IntegerWidthFigure />
          </Figure>
          <p>
            8、16、32、64、128 ビットの <code>i8</code>〜<code>i128</code>（符号付き）と <code>u8</code>〜<code>u128</code>（符号なし）、そしてポインタ幅の <code>isize</code>・<code>usize</code> があります。注釈のない整数リテラルは <code>i32</code> になります。<Ref n={5} /> リテラルは <code>98_222</code> のようにアンダースコアで区切れ、<code>0xff</code>（16進）、<code>0o77</code>（8進）、<code>0b1111_0000</code>（2進）、<code>b'A'</code>（<code>u8</code> のバイト）も書けます。<code>57u8</code> のように型を後ろに付けることもできます。
          </p>
          <p>
            範囲を超える計算、たとえば <code>u8</code> の 255 に 1 を足すと
            <Term en="integer overflow">整数オーバーフロー</Term>
            になります。<code>dev</code> プロファイルでは実行時に panic（<ChapterLink n={24} />）で止まり、<code>--release</code> では panic せずに 0 へ巻き戻ります。巻き戻りに頼るのは誤りで、明示的に扱いたいときは <code>wrapping_add</code>（常に巻き戻す）、<code>checked_add</code>（溢れたら <code>None</code>）、<code>saturating_add</code>（上限で止める）、<code>overflowing_add</code>（値と溢れたかの組を返す）を使います。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
let n: u8 = 250;
println!("{:?}", n.checked_add(10)); // None（溢れた）
println!("{:?}", n.checked_add(5));  // Some(255)
println!("{}", n.wrapping_add(10));  // 4
`}
          />
          <h3>浮動小数点、bool、char</h3>
          <p>
            小数は <code>f32</code> と <code>f64</code> で、既定は <code>f64</code> です。整数同士の割り算は 0 に向かって切り捨てられ、<code>-5 / 3</code> は <code>-1</code> になります。<code>bool</code> は <code>true</code> か <code>false</code> です。<code>char</code> は 4 バイトの Unicode スカラー値で、シングルクォートで書きます。<code>'あ'</code> や絵文字も 1 つの <code>char</code> です。<Ref n={5} /> ただし「人が1文字と感じるもの」と <code>char</code> が一致しないことがあり、これは <ChapterLink n={23} /> の文字列で詳しく扱います。
          </p>
          <h3>タプルと配列</h3>
          <Code
            lang="rust"
            code={`
let tup: (i32, f64, char) = (500, 6.4, 'x');
let (p, q, r) = tup;      // 分解して取り出す
println!("{p} {q} {}", tup.1); // 添字でも取り出せる

let arr = [1, 2, 3, 4, 5];     // [i32; 5]
let zeros = [0; 3];            // [0, 0, 0]
let first = arr[0];
`}
          />
          <p>
            <Term en="tuple">タプル</Term>
            は異なる型の値を固定個まとめたもので、分解（パターン）か <code>.0</code>、<code>.1</code> のような添字で取り出します。要素のないタプル <code>()</code> は
            <Term en="unit">ユニット</Term>
            と呼ばれ、「値がない」ことを表す型として関数の戻り値などに現れます。
            <Term en="array">配列</Term>
            は同じ型の値を固定長で並べたもので、スタックに置かれます。<code>[i32; 5]</code> のように「要素の型; 長さ」で型を書き、<code>[0; 3]</code> は 0 を 3 つ並べた配列です。<Ref n={5} /> 長さが変わるものには <ChapterLink n={23} /> の <code>Vec</code> を使います。
          </p>
          <p>
            配列の範囲外を添字で読むと、コンパイルは通りますが実行時に <code>index out of bounds: the len is 5 but the index is 10</code> という panic で止まります。C 言語のように隣のメモリを読んでしまうことはなく、不正なメモリアクセスを実行時の検査で止めるのが Rust の方針です。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'functions',
      title: '関数、文と式',
      body: (
        <>
          <p>
            関数は <code>fn</code> で定義します。名前は snake_case で、引数の型は必ず書きます。戻り値の型は <code>-&gt;</code> の後に書きます。定義する順番は問われず、呼び出し元から見える場所にあればよいです。<Ref n={6} />
          </p>
          <Code
            lang="rust"
            code={`
fn title_len(title: &str) -> usize {
    title.len()
}

fn print_labeled(value: usize, unit: char) {
    println!("The measurement is: {value}{unit}");
}

fn main() {
    let len = title_len("Tsumugi");
    print_labeled(len, 'B'); // The measurement is: 7B
}
`}
          />
          <p>
            <code>title_len</code> の本体に <code>return</code> がないことに注目してください。Rust を読み書きするうえで最初に身につけたい区別が、
            <Term en="statement">文</Term>
            と
            <Term en="expression">式</Term>
            です。文は動作を行うだけで値を返しません。式は評価されて値になります。<code>let y = 6;</code> は文で、<code>5 + 6</code>、関数呼び出し、マクロ呼び出し、そして波かっこで囲んだブロックは式です。<Ref n={6} /> 図 18-2 で両者を並べて見ます。
          </p>
          <Figure n="18-2" title="文と式" caption="左の let は文で、値を持たない。右のブロックは式で、末尾のセミコロンのない行の値がブロック全体の値になる。">
            <StatementExpressionFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
let y = {
    let x = 3;
    x + 1   // セミコロンがない → この値がブロックの値
};          // y は 4
`}
          />
          <p>
            図と例から読み取れるのは、「セミコロンを付けると式が文になり、値を返さなくなる」という規則です。関数の本体もブロックなので、最後の式がそのまま戻り値になります。<code>return</code> は途中で抜けるときだけ使うのが普通です。<Ref n={6} /> JavaScript では <code>x = y = 6</code> のように代入が値を持つ式として連鎖できますが、Rust では <code>let y = 6</code> が文なので <code>let x = (let y = 6);</code> とは書けません。
          </p>
          <p>うっかり末尾にセミコロンを付けると、次のエラーになります。</p>
          <Code
            lang="text"
            code={`
error[E0308]: mismatched types
  |
7 | fn plus_one(x: i32) -> i32 {
  |    --------            ^^^ expected \`i32\`, found \`()\`
  |    |
  |    implicitly returns \`()\` as its body has no tail or \`return\` expression
8 |     x + 1;
  |          - help: remove this semicolon to return this value
`}
          />
          <p>
            本体が文だけになると関数は <code>()</code> を返すことになり、宣言した <code>i32</code> と食い違う、というのが E0308 の意味です。<Ref n={6} /> このエラーを見たら、まず末尾のセミコロンを疑ってください。
          </p>
        </>
      ),
    },
    {
      id: 'control-flow',
      title: '制御フロー',
      body: (
        <>
          <h3>if は式</h3>
          <Code
            lang="rust"
            code={`
let number = 6;
if number % 4 == 0 {
    println!("4 で割り切れる");
} else if number % 3 == 0 {
    println!("3 で割り切れる");
} else {
    println!("どちらでもない");
}

let label = if number > 5 { "big" } else { "small" };
`}
          />
          <p>
            条件は <code>bool</code> でなければなりません。JavaScript のように <code>if (number)</code> と書いて 0 以外を真と見なす変換は行われず、<code>if number {'{'}</code> は E0308（expected <code>bool</code>, found integer）になります。<code>if number != 0</code> と書きます。<Ref n={7} />
          </p>
          <p>
            <code>if</code> も式なので、値を <code>let</code> に束縛できます。このとき各分岐の型はそろっていなければならず、<code>if c {'{ 5 }'} else {'{ "six" }'}</code> は「<code>if</code> と <code>else</code> の型が合わない」というエラーになります。変数の型はコンパイル時に1つに決まる必要があるためです。<Ref n={7} />
          </p>
          <h3>loop、while、for</h3>
          <Code
            lang="rust"
            code={`
let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2; // break に値を付けると loop の値になる
    }
}; // result は 20

let mut n = 3;
while n != 0 {
    println!("{n}!");
    n -= 1;
}

let arr = [10, 20, 30];
for element in arr {
    println!("{element}");
}
for i in (1..4).rev() { // 3, 2, 1
    println!("{i}");
}
`}
          />
          <p>
            <code>loop</code> は <code>break</code> するまで繰り返し、<code>break</code> に値を添えるとそれが <code>loop</code> 式の値になります。入れ子のループでは <code>'outer: loop</code> のようにラベルを付け、<code>break 'outer</code> で外側のループを抜けられます。<code>while</code> は条件が真の間繰り返します。<Ref n={7} />
          </p>
          <p>
            もっともよく使うのは <code>for</code> です。配列やコレクションの要素を順に取り出すので、<code>while</code> と添字で回すより安全で速く、長さが変わってもコードを直す必要がありません。<code>1..4</code> は 1、2、3 を生む
            <Term en="range">範囲</Term>
            で、終端を含めたいときは <code>1..=4</code> と書きます。<code>.rev()</code> で逆順になります。<Ref n={7} /> <code>for</code> の裏で動いているイテレーターの仕組みは <ChapterLink n={27} /> で扱います。
          </p>
          <p>
            JavaScript との違いをまとめると、<code>if</code> の条件は厳密に <code>bool</code>、<code>switch</code> に相当するものはなく代わりに <ChapterLink n={21} /> の <code>match</code> を使う、<code>for (let i = 0; ...)</code> の形はなく範囲や要素を回す、の3点です。
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
              Tsumugi の Rust 側は <code>src-tauri/</code> の下にあり、<code>cargo</code> のワークスペースとして <code>core</code> クレート（Tauri に依存しない純粋なロジック）と Tauri アプリ本体に分かれています（<ChapterLink n={22} />、<ChapterLink n={41} />）。<code>npm run tauri dev</code> はこの <code>Cargo.toml</code> を読んで <code>cargo build</code> を実行しているので、本章のコマンドの理解がそのまま Tauri の開発サイクルの理解になります。
            </p>
            <p>
              データモデルでは、ページの並び順 <code>position</code> や作成日時を扱うときに本章の整数型（<code>i64</code>）と文字列を使います。また、<code>core</code> クレートの関数はほぼすべて「最後の式を返す」書き方で書かれているので、文と式の区別に慣れておくとコードが読みやすくなります。
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
            <li>Rust はコンパイル言語。<code>rustc</code> がコンパイラ、<code>cargo</code> がビルドと依存管理を担い、成果物は <code>target/debug</code>（または <code>release</code>）に置かれる。</li>
            <li><code>cargo new</code>、<code>run</code>、<code>check</code>、<code>build --release</code> を使い分ける。<code>Cargo.toml</code> が設定、<code>Cargo.lock</code> が依存の固定。</li>
            <li>変数は既定で不変。<code>mut</code> で可変に、<code>const</code> で定数に、シャドーイングで型を変えつつ名前を使い回せる。</li>
            <li>整数はビット幅と符号で型が分かれ、既定は <code>i32</code>。オーバーフローは dev では panic、release では巻き戻る。</li>
            <li>文は値を返さず、式は値になる。ブロックや関数の末尾にセミコロンのない式を置くとそれが値になる。</li>
            <li><code>if</code> の条件は <code>bool</code> 限定で、<code>if</code> と <code>loop</code> は式。繰り返しは <code>for</code> と範囲が基本。</li>
          </ul>
          <p>次章では、Rust の中心にある所有権の仕組みを、スタックとヒープの絵と一緒に学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 1.1 Installation',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch01-01-installation.html',
      accessed: '2026-11-08',
      note: 'rustup、rustc --version、リンカ（xcode-select --install）の根拠。',
    },
    {
      title: 'The Rust Programming Language, 1.2 Hello, World!',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch01-02-hello-world.html',
      accessed: '2026-11-08',
      note: 'main 関数、println! がマクロであること、事前コンパイル言語であること、rustfmt の根拠。',
    },
    {
      title: 'The Rust Programming Language, 1.3 Hello, Cargo!',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch01-03-hello-cargo.html',
      accessed: '2026-11-08',
      note: 'cargo new / build / run / check / --release、Cargo.toml と Cargo.lock、target ディレクトリの根拠。',
    },
    {
      title: 'The Rust Programming Language, 3.1 Variables and Mutability',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html',
      accessed: '2026-11-08',
      note: '不変性、mut、const の規則、シャドーイング、E0384 と E0308 の根拠。',
    },
    {
      title: 'The Rust Programming Language, 3.2 Data Types',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch03-02-data-types.html',
      accessed: '2026-11-08',
      note: '整数型の一覧とリテラル、オーバーフローの挙動と wrapping/checked 系メソッド、浮動小数点、bool、char、タプル、配列、範囲外アクセスの panic の根拠。',
    },
    {
      title: 'The Rust Programming Language, 3.3 Functions',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
      accessed: '2026-11-08',
      note: 'fn の構文、引数の型注釈、文と式、戻り値、セミコロンによる E0308 の根拠。',
    },
    {
      title: 'The Rust Programming Language, 3.5 Control Flow',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch03-05-control-flow.html',
      accessed: '2026-11-08',
      note: 'if の条件が bool であること、if 式、loop と break の値、ラベル、while、for と範囲の根拠。',
    },
    {
      title: 'The Rust Edition Guide, Rust 2024',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/edition-guide/rust-2024/',
      accessed: '2026-11-08',
      version: 'Rust 2024 edition（Rust 1.85.0 で安定化）',
      note: '2024 edition の変更点一覧の所在。本書で触れる edition 固有の変更はここに掲載のものに限る。',
    },
    {
      title: 'std::fmt — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/fmt/index.html',
      accessed: '2026-11-08',
      note: 'println! の書式文字列（{x} によるインライン引数、{} と {:?}）の根拠。',
    },
  ],
}

export default chapter
