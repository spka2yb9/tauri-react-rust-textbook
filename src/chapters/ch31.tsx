import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 31-1 テストの配置 ---------- */
function TestLayoutFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="クレートのディレクトリ構成に3種類のテストの置き場所を重ねた図。src/lib.rs の中の #[cfg(test)] mod tests が単体テストで非公開の関数も呼べる。tests/ ディレクトリの各ファイルは別クレートの結合テストで公開 API だけを使う。/// コメント内のコードブロックはドキュメントテストとして実行される">
      <defs>
        <marker id="arrow31a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* ディレクトリ木 */}
      <g fontSize="12" fontFamily="monospace">
        <text x="20" y="40">adder/</text>
        <text x="40" y="62">Cargo.toml</text>
        <text x="40" y="84">src/</text>
        <text x="60" y="106">lib.rs</text>
        <text x="40" y="190">tests/</text>
        <text x="60" y="212">integration_test.rs</text>
        <text x="60" y="234">common/mod.rs</text>
      </g>
      {/* lib.rs の中身 */}
      <rect x="200" y="60" width="200" height="110" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="6" />
      <text x="300" y="78" fontSize="12" fontWeight="600" textAnchor="middle">src/lib.rs の中</text>
      <g fontSize="11" fontFamily="monospace">
        <text x="210" y="96">/// 1 を足す</text>
        <text x="210" y="110">/// ```</text>
        <text x="210" y="124">/// assert_eq!(…);</text>
        <text x="210" y="138">pub fn add_one(..)</text>
        <text x="210" y="152">fn internal(..)</text>
        <text x="210" y="166">#[cfg(test)] mod tests</text>
      </g>
      <path d="M100,102 L198,102" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow31a)" />
      {/* 3種類の説明 */}
      <rect x="420" y="40" width="200" height="60" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="6" />
      <text x="520" y="60" fontSize="12" fontWeight="600" textAnchor="middle">ドキュメントテスト</text>
      <text x="520" y="76" fontSize="11" textAnchor="middle">/// 内のコードブロック</text>
      <text x="520" y="92" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">利用例が常に動く保証</text>
      <path d="M400,118 L418,70" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow31a)" />

      <rect x="420" y="120" width="200" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
      <text x="520" y="140" fontSize="12" fontWeight="600" textAnchor="middle">単体テスト</text>
      <text x="520" y="156" fontSize="11" textAnchor="middle">同じファイル内の tests モジュール</text>
      <text x="520" y="172" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">非公開の関数も呼べる</text>
      <path d="M400,164 L418,152" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow31a)" />

      <rect x="420" y="200" width="200" height="76" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="6" />
      <text x="520" y="220" fontSize="12" fontWeight="600" textAnchor="middle">結合テスト</text>
      <text x="520" y="236" fontSize="11" textAnchor="middle">tests/ の各ファイル = 別クレート</text>
      <text x="520" y="252" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">use adder::… で公開 API だけ</text>
      <text x="520" y="268" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">common/ は共通部品（節にならない）</text>
      <path d="M210,208 L418,228" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow31a)" />
      <text x="320" y="312" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">cargo test は 単体 → 結合 → ドキュメント の3節を順に実行し、途中で失敗すると後続の節は走らない</text>
    </svg>
  )
}

/* ---------- 図 31-2 開発ツールの流れ ---------- */
function ToolchainFigure() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="コードを書いてから共有するまでに通す4つのツールを左から右に並べた図。cargo fmt で整形し、cargo clippy で改善点を指摘させ、cargo test で動作を確かめ、CI では同じ3つを --check や警告のエラー化付きで走らせる">
      <defs>
        <marker id="arrow31b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {[
        { x: 8, t: 'cargo fmt', s: '整形', d: '見た目の議論を無くす', box: 'var(--fig-box)' },
        { x: 168, t: 'cargo clippy', s: '静的解析', d: '800 以上の lint で指摘', box: 'var(--fig-box2)' },
        { x: 328, t: 'cargo test', s: '実行して検証', d: '単体・結合・ドキュメント', box: 'var(--fig-box3)' },
        { x: 488, t: 'CI', s: '同じことを機械で', d: 'fmt --check、警告はエラー', box: 'var(--fig-box4)' },
      ].map((b) => (
        <g key={b.x} fontSize="12" textAnchor="middle">
          <rect x={b.x} y="50" width="140" height="90" fill={b.box} stroke="var(--fig-line)" rx="8" />
          <text x={b.x + 70} y="75" fontSize="13" fontWeight="600" fontFamily="monospace">{b.t}</text>
          <text x={b.x + 70} y="97">{b.s}</text>
          <text x={b.x + 70} y="117" fontSize="11" fill="var(--fig-muted)">{b.d}</text>
        </g>
      ))}
      <path d="M150,95 L166,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow31b)" />
      <path d="M310,95 L326,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow31b)" />
      <path d="M470,95 L486,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow31b)" />
      <text x="320" y="180" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">手元では左の3つを繰り返し、共有する前に CI が同じ3つを機械的に確認する</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 31,
  part: 4,
  title: 'テストと開発ツール',
  summary:
    'Rust に組み込まれたテストの仕組みを学びます。#[test] 関数と assert 系マクロ、panic を期待するテスト、単体テスト・結合テスト・ドキュメントテストの置き場所、cargo test の使い方、そして clippy と rustfmt による品質の底上げを扱います。',
  goals: [
    '#[test] と assert!・assert_eq!・assert_ne! でテストを書き、失敗時の出力を読める',
    '#[should_panic] と Result を返すテストを使い分けられる',
    '単体テスト（#[cfg(test)] mod tests）、結合テスト（tests/）、ドキュメントテスト（///）の違いと置き場所を説明できる',
    'cargo test の絞り込み、並列実行の制御、#[ignore] を使える',
    'cargo clippy と cargo fmt を日常の流れに組み込み、CI で機械的に検査できる',
  ],
  prerequisites: [18, 22, 24, 27],
  sections: [
    {
      id: 'intro',
      title: 'テストは言語に組み込まれている',
      body: (
        <>
          <p>
            <ChapterLink n={17} /> では Vitest と Testing Library を導入して React をテストしました。Rust では、テストの実行器がコンパイラと Cargo に最初から組み込まれています。追加のクレートを入れなくても、<code>#[test]</code> を付けた関数を書いて <code>cargo test</code> を実行するだけで動きます。<Ref n={1} />
          </p>
          <p>
            型システムと借用チェッカはメモリ安全や型の整合を保証しますが、「この関数が正しい値を返すか」は保証できません。たとえば <code>add_two(2)</code> が 4 ではなく 5 を返すバグは型では防げません。それを捕まえるのがテストです。<Ref n={1} />
          </p>
          <p>
            この章では、テストの書き方、置き場所、実行の制御の順に見たあと、コードの質を底上げする2つのツール <code>clippy</code> と <code>rustfmt</code> を扱います。第6部で作る Tsumugi の Rust 側は、Tauri に依存しない <code>core</code> クレートに論理を集め、この章の方法でテストします。
          </p>
        </>
      ),
    },
    {
      id: 'writing',
      title: 'テスト関数の書き方',
      body: (
        <>
          <p>
            <code>cargo new adder --lib</code> でライブラリクレートを作ると、<code>src/lib.rs</code> にテストのひな型が生成されます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="src/lib.rs"
            code={`
pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]           // cargo test のときだけコンパイルされる
mod tests {
    use super::*;      // 外側のモジュールの項目を取り込む

    #[test]            // この関数がテスト
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
`}
          />
          <p>
            <code>cargo test</code> を実行すると、テスト用のバイナリが作られ、<code>#[test]</code> の付いた関数が1つずつ別のスレッドで実行されます。テストが panic すればそのテストは失敗、最後まで走れば成功です。<Ref n={1} />
          </p>
          <Code
            lang="text"
            code={`
running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
`}
          />
          <h3>assert 系マクロ</h3>
          <p>検証には3つのマクロを使います。<Ref n={1} /></p>
          <ul>
            <li><code>assert!(式)</code>：式が <code>true</code> なら何もせず、<code>false</code> なら panic する。</li>
            <li><code>assert_eq!(a, b)</code>：<code>==</code> で比べ、違えば両方の値を表示して panic する。</li>
            <li><code>assert_ne!(a, b)</code>：<code>!=</code> で比べる。「この値にはならないはず」を確かめるときに使う。</li>
          </ul>
          <p><code>assert_eq!</code> が失敗したときの出力は、<code>left</code> と <code>right</code> という名前で両方の値を並べます。Rust では引数の順序に意味はなく、どちらを期待値にしても構いません。<Ref n={1} /></p>
          <Code
            lang="text"
            code={`
assertion \`left == right\` failed
  left: 5
 right: 4
`}
          />
          <p>
            比べる型は <code>PartialEq</code> と <code>Debug</code> を実装している必要があります。自作の構造体や列挙型には <code>#[derive(PartialEq, Debug)]</code> を付けます（<ChapterLink n={25} />）。<Ref n={1} /> また、必須の引数の後に <code>format!</code> と同じ形式でメッセージを追加でき、失敗時に表示されます。
          </p>
          <Code
            lang="rust"
            code={`
#[test]
fn greeting_contains_name() {
    let result = greeting("Carol");
    assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was \`{result}\`"
    );
}
`}
          />
          <h3>panic を期待する：should_panic</h3>
          <p>「不正な入力で panic すること」を確かめるには <code>#[should_panic]</code> を付けます。<code>expected</code> でメッセージの一部を指定すると、別の理由で panic したときに失敗として検出できます。<Ref n={1} /></p>
          <Code
            lang="rust"
            code={`
pub struct Guess { value: i32 }

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be greater than or equal to 1, got {value}.");
        } else if value > 100 {
            panic!("Guess value must be less than or equal to 100, got {value}.");
        }
        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "less than or equal to 100")]   // 部分文字列で一致
    fn greater_than_100() {
        Guess::new(200);
    }
}
`}
          />
          <h3>Result を返すテスト</h3>
          <p>
            テスト関数は <code>{'Result<(), E>'}</code> を返すこともできます。<code>Ok(())</code> なら成功、<code>Err</code> なら失敗です。この形にすると、テストの中で <ChapterLink n={24} /> の <code>?</code> 演算子が使えるので、「途中の操作がどれか1つでも <code>Err</code> を返したら失敗」というテストが短く書けます。<code>#[should_panic]</code> とは併用できず、<code>Err</code> が返ることを確かめたいときは <code>?</code> ではなく <code>assert!(value.is_err())</code> を使います。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
#[test]
fn it_works() -> Result<(), String> {
    let result = add(2, 2);
    if result == 4 {
        Ok(())
    } else {
        Err(String::from("two plus two does not equal four"))
    }
}
`}
          />
        </>
      ),
    },
    {
      id: 'organization',
      title: 'テストの置き場所：単体・結合・ドキュメント',
      body: (
        <>
          <p>Rust のテストは、置き場所によって3種類に分かれます。公式ブックは単体テストと結合テストの2分類で説明し、ドキュメントテストは第14章で扱っています。<Ref n={3} /><Ref n={4} /> 次の図に、ひとつのクレートの中での3つの置き場所をまとめます。</p>
          <Figure n="31-1" title="テストの配置" caption="単体テストは src 内の同じファイルに #[cfg(test)] mod tests として置き、非公開の関数も呼べる。結合テストは tests/ ディレクトリに置かれ、各ファイルが別クレートとしてコンパイルされるため公開 API だけを使う。ドキュメントテストは /// コメント内のコードブロック。">
            <TestLayoutFigure />
          </Figure>
          <h3>単体テスト</h3>
          <p>
            <Term en="unit test">単体テスト</Term>は、テスト対象と同じファイルの <code>#[cfg(test)] mod tests</code> に書きます。<code>#[cfg(test)]</code> は「<code>cargo test</code> のときだけコンパイルする」という指示で、<code>cargo build</code> の成果物にテストが混ざらず、ビルド時間も節約できます。子モジュールは親の非公開な項目を使えるので、<code>use super::*</code> により <code>pub</code> でない関数もテストできます。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
pub fn add_two(a: u64) -> u64 {
    internal_adder(a, 2)
}

fn internal_adder(left: u64, right: u64) -> u64 {   // pub ではない
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        assert_eq!(internal_adder(2, 2), 4);         // 非公開でも呼べる
    }
}
`}
          />
          <h3>結合テスト</h3>
          <p>
            <Term en="integration test">結合テスト</Term>は、プロジェクト直下の <code>tests</code> ディレクトリに置きます。Cargo はこのディレクトリの各ファイルを別々のクレートとしてコンパイルするので、<code>use adder::add_two;</code> のように自分のライブラリを外部クレートとして取り込み、公開 API だけを使います。利用者と同じ立場でクレートを検証できるのが利点です。<code>#[cfg(test)]</code> は不要です（<code>cargo test</code> のときしかコンパイルされないため）。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="tests/integration_test.rs"
            code={`
use adder::add_two;

mod common;            // tests/common/mod.rs を取り込む

#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(add_two(2), 4);
}
`}
          />
          <p>
            複数の結合テストで共有する準備コードは、<code>tests/common.rs</code> ではなく <code>tests/common/mod.rs</code> に置きます。<code>tests</code> 直下のファイルはそれぞれ独立したテストクレートとして扱われ、出力に「running 0 tests」の節が増えてしまいますが、サブディレクトリのファイルはそうならないからです。<Ref n={3} />
          </p>
          <p>
            バイナリクレート（<code>src/main.rs</code> だけ）の関数は結合テストから呼べません。そのため、論理は <code>src/lib.rs</code> に置き、<code>main.rs</code> はそれを呼ぶだけの薄い層にする、という構成が勧められています。<Ref n={3} /> 第6部の Tsumugi で「Tauri に依存しない <code>core</code> クレート」を分けるのは、この原則の延長です。
          </p>
          <h3>ドキュメントテスト</h3>
          <p>
            <code>///</code> で始まる<Term en="documentation comment">ドキュメントコメント</Term>は Markdown で書け、<code>cargo doc --open</code> で HTML に変換されます。公開 API には <code># Examples</code> 節で使い方を示すのが慣習で、必要に応じて <code># Panics</code>（panic する条件）、<code># Errors</code>（<code>Result</code> の <code>Err</code> になる条件）、<code># Safety</code>（<code>unsafe</code> 関数で呼び出し側が守るべき条件）を書きます。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
//! # adder
//!
//! \`adder\` は足し算のユーティリティです。      ← //! はそれを含む項目（クレート）の説明

/// 与えられた数に 1 を足します。
///
/// # Examples
///
/// \`\`\`
/// let answer = adder::add_one(5);
/// assert_eq!(6, answer);
/// \`\`\`
pub fn add_one(x: i32) -> i32 {
    x + 1
}
`}
          />
          <p>
            このコードブロックは <code>cargo test</code> の「Doc-tests」節で実際にコンパイル・実行されます。関数の振る舞いが変わって例が古くなれば、テストが落ちて教えてくれます。「ドキュメントの例が常に動く」ことを機械的に保証できるのが、この仕組みの価値です。<Ref n={4} />
          </p>
          <Code
            lang="text"
            code={`
   Doc-tests adder

running 1 test
test src/lib.rs - add_one (line 9) ... ok
`}
          />
        </>
      ),
    },
    {
      id: 'running',
      title: 'cargo test の使い方',
      body: (
        <>
          <p>
            <code>cargo test</code> の引数は <code>--</code> の前後で行き先が変わります。前は <code>cargo test</code> 自身への指示、後ろはテストバイナリへの指示です。<Ref n={2} /> よく使う形を表にまとめます。<Ref n={2} /><Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>コマンド</th>
                  <th>働き</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>cargo test</code></td><td>単体 → 結合 → ドキュメントの順にすべて実行。途中の節で失敗すると後続は走らない</td></tr>
                <tr><td><code>cargo test add</code></td><td>名前に <code>add</code> を含むテストだけ実行（モジュール名も名前の一部）</td></tr>
                <tr><td><code>cargo test --test integration_test</code></td><td><code>tests/integration_test.rs</code> だけ実行</td></tr>
                <tr><td><code>cargo test -- --test-threads=1</code></td><td>並列実行をやめ、1つずつ実行する</td></tr>
                <tr><td><code>cargo test -- --show-output</code></td><td>成功したテストの標準出力も表示する（既定では隠される）</td></tr>
                <tr><td><code>cargo test -- --ignored</code></td><td><code>#[ignore]</code> を付けたテストだけ実行</td></tr>
                <tr><td><code>cargo test -- --include-ignored</code></td><td><code>#[ignore]</code> も含めてすべて実行</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            テストは既定でスレッドを使って並列に走ります。そのため、同じファイルや環境変数、作業ディレクトリに依存するテストどうしは干渉します。各テストが別のファイル名を使うか、<code>--test-threads=1</code> で直列にするのが対策です。<Ref n={2} /> Tsumugi の <code>core</code> クレートのテストでインメモリの SQLite を使うのは、テストごとに独立したデータベースを持てて並列実行と相性がよいからでもあります。
          </p>
          <p>時間のかかるテストには <code>#[ignore]</code> を付けておき、普段は飛ばし、余裕のあるときに <code>--ignored</code> で回します。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
#[test]
#[ignore]
fn expensive_test() {
    // 1時間かかるような処理
}
`}
          />
        </>
      ),
    },
    {
      id: 'tools',
      title: 'clippy と rustfmt',
      body: (
        <>
          <p>テストは「動くか」を確かめます。それに加えて、「読みやすいか」「もっとよい書き方がないか」を機械に見てもらう2つのツールが標準で配布されています。どちらも <code>rustup component add</code> で入り、<ChapterLink n={2} /> の手順で rustup を入れていれば多くの場合すでに使えます。</p>
          <Figure n="31-2" title="開発ツールの流れ" caption="手元では fmt → clippy → test の順に繰り返し、共有前に CI が同じ3つを機械的に確認する。fmt は --check で差分の有無だけを返し、clippy は警告をエラーに格上げして失敗させる。">
            <ToolchainFigure />
          </Figure>
          <h3>clippy：改善点を指摘する lint 集</h3>
          <p>
            <Term en="Clippy">Clippy</Term> は、よくある間違いや改善できる書き方を指摘する <Term en="lint">lint</Term>（静的検査の規則）の集まりで、800 以上の lint があります。<code>cargo clippy</code> で実行します。<Ref n={5} /> lint はグループに分かれ、既定で有効なのは <code>correctness</code>（明らかに誤り。エラー扱い）、<code>suspicious</code>、<code>style</code>、<code>complexity</code>、<code>perf</code>（いずれも警告）です。<code>pedantic</code>（厳格。誤検知もある）や <code>restriction</code>（特定の機能を禁じる）は既定では無効で、必要なものを選んで有効にします。<Ref n={5} />
          </p>
          <p>実際に、ありがちなコードに対して clippy が何を言うか見てみます。</p>
          <Code
            lang="rust"
            code={`
pub fn total(v: &Vec<i32>) -> i32 {
    let mut total = 0;
    for i in 0..v.len() {
        total += v[i];
    }
    if total == 0 { return 0; } else { return total; }
}
`}
          />
          <Code
            lang="text"
            code={`
warning: unneeded \`return\` statement
  = note: \`#[warn(clippy::needless_return)]\` on by default

warning: writing \`&Vec\` instead of \`&[_]\` involves a new object where a slice will do
  = note: \`#[warn(clippy::ptr_arg)]\` on by default
help: change this to
   |
 - pub fn total(v: &Vec<i32>) -> i32 {
 + pub fn total(v: &[i32]) -> i32 {

warning: the loop variable \`i\` is only used to index \`v\`
  = note: \`#[warn(clippy::needless_range_loop)]\` on by default
help: consider using an iterator
`}
          />
          <p>
            3つの指摘はいずれも、<ChapterLink n={20} /> のスライス、<ChapterLink n={27} /> のイテレータ、<ChapterLink n={18} /> の「最後の式が戻り値」という、本書で学んだ Rust らしい書き方への誘導です。各警告には lint 名と説明ページへのリンクが付くので、なぜそう書くべきかを調べられます。機械的に直せるものは <code>cargo clippy --fix</code> で自動修正できます。<Ref n={6} />
          </p>
          <p>lint の有効・無効は、コマンドライン、ソース中の属性、どちらでも指定できます。<Ref n={6} /></p>
          <Code
            lang="rust"
            code={`
#![warn(clippy::pedantic)]           // クレート全体で pedantic を警告にする（lib.rs の先頭）

#[allow(clippy::too_many_arguments)] // この関数だけ特定の lint を黙らせる
fn build(a: i32, b: i32, c: i32, d: i32, e: i32, f: i32, g: i32, h: i32) {}
`}
          />
          <p>
            Clippy の文書は「<code>#[allow]</code> を気軽に使ってよい」と述べています。同意できない指摘は項目単位やプロジェクト単位で無効にして構いません。一方 <code>restriction</code> グループを丸ごと有効にするのは、互いに矛盾する lint が含まれるため勧められていません。<Ref n={6} /> CI で警告を失敗扱いにするには、Cargo 1.97 以降なら環境変数 <code>CARGO_BUILD_WARNINGS=deny</code> を付けて <code>cargo clippy</code> を実行するか、<code>.cargo/config.toml</code> の <code>[build] warnings = "deny"</code> を使います。<Ref n={6} />
          </p>
          <h3>rustfmt：整形を機械に任せる</h3>
          <p>
            <Term en="rustfmt">rustfmt</Term> は、Rust の公式スタイルガイドに従ってコードを整形するツールです。<code>cargo fmt</code> でプロジェクト全体（ワークスペースを含む）を整形し、<code>cargo fmt --check</code> は整形が必要なら終了コード 1 を返すので CI で使えます。設定は <code>rustfmt.toml</code> に書き、<code>edition</code> と <code>style_edition</code> を明示しておくと <code>rustfmt</code> 単体と <code>cargo fmt</code> の結果がそろいます。<Ref n={7} />
          </p>
          <Code
            lang="toml"
            title="rustfmt.toml"
            code={`
edition = "2024"
style_edition = "2024"
`}
          />
          <p>
            整形を機械に任せる利点は、コードレビューで字下げや改行位置について話す必要がなくなることです。<ChapterLink n={16} /> や <ChapterLink n={17} /> で触れたフロントエンド側の Prettier と同じ役割を、Rust 側では rustfmt が担います。
          </p>
          <Callout>
            <p>
              Cargo の主なビルドプロファイルは <code>dev</code> と <code>release</code> の2つです。<code>cargo build</code> は <code>dev</code>（最適化なし、<code>opt-level = 0</code>）、<code>cargo build --release</code> は <code>release</code>（<code>opt-level = 3</code>）です。<code>cargo test</code> は <code>dev</code> を引き継ぐ <code>test</code> プロファイルを使うため、こちらも最適化なしです。性能を測るテストは <code>--release</code> で行わないと、実際より大幅に遅い結果になります。<Ref n={8} /><Ref n={9} />
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
              Tsumugi の Rust 側は、<code>src-tauri/core</code>（クレート <code>tsumugi-core</code>）と <code>src-tauri/src</code>（Tauri のコマンドの薄い層）に分かれます。ページの CRUD、全文検索のテキスト抽出、簡易データベースの SQL 組み立て、Markdown の往復変換といった論理はすべて <code>core</code> に置き、Tauri に依存させません。<ChapterLink n={42} /> で見るように、こうすると WebView や OS の仕組みを立ち上げずに <code>cargo test</code> だけで検証できます。本節で学んだ「論理は <code>lib.rs</code>、入口は薄く」の原則そのものです。
            </p>
            <p>
              <code>core</code> のテストは、現時点では <code>tests/</code> の結合テストにまとめています。SQL の組み立てと列名のホワイトリスト検査、インメモリ SQLite（<code>Connection::open_in_memory</code>）を使った CRUD・FTS・Markdown 往復を、いずれも公開 API 越しに検証します。<code>#[cfg(test)]</code> の単体テストとドキュメントテストは、まだ置いていません。<ChapterLink n={40} /> では、この <code>core</code> のテストに加えて、Tauri 固有のデバッグと E2E テストを扱います。
            </p>
          </Callout>
          <Code
            lang="rust"
            title="src-tauri/core/tests/pages.rs（概略）"
            code={`
use tsumugi_core::{db, pages};

#[test]
fn create_and_fetch_page() -> Result<(), tsumugi_core::Error> {
    let conn = db::open_in_memory()?;          // テストごとに独立した DB。並列実行でも干渉しない
    let page = pages::create(&conn, None, "最初のページ")?;
    let fetched = pages::get(&conn, &page.id)?;
    assert_eq!(fetched.title, "最初のページ");
    assert_eq!(fetched.parent_id, None);
    Ok(())                                     // ? が使えるので途中の失敗はそのままテスト失敗になる
}
`}
          />
          <p>
            <code>Result</code> を返すテストと <code>?</code> の組み合わせで、準備段階のエラーを <code>unwrap</code> で潰さずに済みます。実際のコードは第6部で示します。
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
            <li>テストは <code>#[test]</code> を付けた関数で、<code>assert!</code>・<code>assert_eq!</code>・<code>assert_ne!</code> で検証する。panic すれば失敗。<code>#[should_panic(expected = "…")]</code> で panic を期待でき、<code>Result</code> を返せば <code>?</code> が使える。</li>
            <li>単体テストは同じファイルの <code>#[cfg(test)] mod tests</code>（非公開も呼べる）、結合テストは <code>tests/</code>（別クレート、公開 API のみ）、ドキュメントテストは <code>///</code> 内のコードブロック。</li>
            <li><code>cargo test 名前</code> で絞り込み、<code>-- --test-threads=1</code> で直列化、<code>#[ignore]</code> と <code>-- --ignored</code> で重いテストを分ける。</li>
            <li><code>cargo clippy</code> は 800 以上の lint で Rust らしい書き方へ導く。不要な指摘は <code>#[allow]</code> で黙らせてよい。</li>
            <li><code>cargo fmt</code> で整形を機械に任せ、CI では <code>--check</code> と警告のエラー化で同じ検査を自動化する。</li>
          </ul>
          <p>次章は第4部の締めくくりとして、安全な Rust の境界の外にある <code>unsafe</code>、コードを生成するマクロ、他言語と連携する FFI の概要を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 11.1: How to Write Tests',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch11-01-writing-tests.html',
      accessed: '2026-11-08',
      note: '#[test]、テストの実行モデル、assert 系マクロと失敗時の出力、カスタムメッセージ、#[should_panic] と expected、Result を返すテストの根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 11.2: Controlling How Tests Are Run',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch11-02-running-tests.html',
      accessed: '2026-11-08',
      note: '-- の前後の引数の行き先、並列実行と --test-threads、--show-output、名前での絞り込み、#[ignore] の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 11.3: Test Organization',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch11-03-test-organization.html',
      accessed: '2026-11-08',
      note: '単体テストと #[cfg(test)]、非公開関数のテスト、tests/ ディレクトリと別クレート、common/mod.rs、バイナリクレートの構成、--test の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 14.2: Publishing a Crate to Crates.io（Making Useful Documentation Comments）',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html',
      accessed: '2026-11-08',
      note: '/// と //! のドキュメントコメント、cargo doc --open、Examples/Panics/Errors/Safety 節、ドキュメントテストの根拠。',
    },
    {
      title: 'Clippy Documentation（Introduction）',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/clippy/',
      accessed: '2026-11-08',
      note: 'Clippy の概要、800 以上の lint、lint グループと既定のレベル、restriction グループの扱いの根拠。',
    },
    {
      title: 'Clippy Documentation: Usage',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/clippy/usage.html',
      accessed: '2026-11-08',
      note: 'cargo clippy、--fix、属性による lint レベルの指定、#[allow] の推奨、CI で警告をエラーにする方法（CARGO_BUILD_WARNINGS、.cargo/config.toml）の根拠。',
    },
    {
      title: 'rustfmt README',
      publisher: 'rust-lang/rustfmt（GitHub）',
      url: 'https://github.com/rust-lang/rustfmt/blob/master/README.md',
      accessed: '2026-11-08',
      note: 'rustfmt の導入、cargo fmt と --check、rustfmt.toml、edition と style_edition の設定の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 14.1: Customizing Builds with Release Profiles',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch14-01-release-profiles.html',
      accessed: '2026-11-08',
      note: 'dev と release プロファイル、opt-level の既定値の根拠。',
    },
    {
      title: 'The Cargo Book: Profiles',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/cargo/reference/profiles.html',
      accessed: '2026-11-08',
      note: 'cargo test が dev を引き継ぐ test プロファイルを使うことの根拠。',
    },
  ],
}

export default chapter
