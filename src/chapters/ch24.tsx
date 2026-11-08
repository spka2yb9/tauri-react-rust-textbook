import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 24-1 Result の分岐 ---------- */
function ResultBranchFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="失敗しうる関数の戻り値 Result<T, E> が Ok(T) か Err(E) のどちらかであり、呼び出し側が match で分岐して Ok なら値を使い、Err なら回復・伝播・panic のいずれかを選ぶ図">
      <defs>
        <marker id="arrow24a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="95" width="150" height="70" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="95" y="122" textAnchor="middle" fontWeight="600">失敗しうる関数</text>
        <text x="95" y="145" textAnchor="middle" fontFamily="monospace" fontSize="12">-&gt; Result&lt;T, E&gt;</text>

        <path d="M170,115 L255,60" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow24a)" />
        <path d="M170,145 L255,200" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow24a)" />

        <rect x="260" y="35" width="130" height="50" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="325" y="65" textAnchor="middle" fontFamily="monospace">Ok(T)</text>
        <rect x="260" y="175" width="130" height="50" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="325" y="205" textAnchor="middle" fontFamily="monospace">Err(E)</text>

        <path d="M390,60 L455,60" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow24a)" />
        <rect x="460" y="35" width="160" height="50" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="540" y="65" textAnchor="middle">値 T を取り出して使う</text>

        <path d="M390,200 L435,200" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow24a)" />
        <rect x="440" y="120" width="190" height="110" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="535" y="142" textAnchor="middle" fontWeight="600">呼び出し側が選ぶ</text>
        <text x="450" y="166" fontSize="12">・回復する（既定値など）</text>
        <text x="450" y="188" fontSize="12">・上へ伝える（? 演算子）</text>
        <text x="450" y="210" fontSize="12">・止める（unwrap / expect）</text>
      </g>
      <text x="320" y="250" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">Result は型なので、どちらの枝も扱わないとコンパイルが通らない（警告も出る）</text>
    </svg>
  )
}

/* ---------- 図 24-2 ? によるエラーの伝播 ---------- */
function QuestionPropagationFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="? 演算子によるエラー伝播のシーケンス図。main が read_limit を呼び、read_limit が fs::read_to_string と parse を順に呼ぶ。parse が Err を返すと、? がその場で From 変換して read_limit から Err を返し、main に届く。Ok のときは値が取り出されて次の行に進む">
      <defs>
        <marker id="arrow24b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* lifelines */}
        {[
          { x: 90, label: 'main' },
          { x: 300, label: 'read_limit' },
          { x: 530, label: 'parse（失敗）' },
        ].map((l) => (
          <g key={l.label}>
            <rect x={l.x - 65} y="20" width="130" height="34" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
            <text x={l.x} y="42" textAnchor="middle" fontWeight="600">{l.label}</text>
            <line x1={l.x} y1="54" x2={l.x} y2="290" stroke="var(--fig-line)" strokeDasharray="4 4" />
          </g>
        ))}
        {/* call */}
        <path d="M95,85 L295,85" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow24b)" />
        <text x="195" y="76" textAnchor="middle" fontSize="12">read_limit(path)</text>

        <rect x="294" y="100" width="12" height="150" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="125" fontSize="12" fill="var(--fig-muted)">read_to_string(path)? → Ok(text)、続行</text>

        <path d="M306,160 L525,160" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow24b)" />
        <text x="415" y="151" textAnchor="middle" fontSize="12">text.trim().parse()?</text>
        <path d="M525,190 L306,190" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow24b)" />
        <text x="415" y="206" textAnchor="middle" fontSize="12" fill="var(--fig-danger)">Err(ParseIntError)</text>

        <rect x="305" y="215" width="220" height="30" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="415" y="235" textAnchor="middle" fontSize="12">? が From::from で ConfigError に変換</text>

        <path d="M294,265 L95,265" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow24b)" />
        <text x="195" y="256" textAnchor="middle" fontSize="12" fill="var(--fig-danger)">return Err(ConfigError::Parse(..))</text>
        <text x="195" y="284" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">以降の行は実行されない</text>
      </g>
      <text x="320" y="310" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">? は「Ok なら中身を取り出す、Err なら変換して即 return」の省略形</text>
    </svg>
  )
}

/* ---------- 図 24-3 panic か Result か ---------- */
function PanicOrResultFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="panic と Result の使い分けを二分する図。失敗が想定内（入力の誤り、ファイルがない、DB の競合）なら Result を返して呼び出し側に判断を委ねる。失敗がプログラムのバグや契約違反（不変条件の破れ、範囲外アクセス）なら panic で止める">
      <g fontSize="13">
        <rect x="200" y="20" width="240" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="320" y="47" textAnchor="middle" fontWeight="600">この失敗は「起こりうること」か？</text>
        <line x1="260" y1="64" x2="160" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <line x1="380" y1="64" x2="480" y2="100" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="190" y="88" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">はい（想定内）</text>
        <text x="450" y="88" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">いいえ（バグ・契約違反）</text>

        <rect x="30" y="100" width="260" height="110" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="160" y="125" textAnchor="middle" fontWeight="600" fontSize="15">Result を返す</text>
        <text x="45" y="150" fontSize="12">・利用者の入力が不正</text>
        <text x="45" y="170" fontSize="12">・ファイルがない、ネットワーク不通</text>
        <text x="45" y="190" fontSize="12">・呼び出し側に回復の余地がある</text>

        <rect x="350" y="100" width="260" height="110" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="125" textAnchor="middle" fontWeight="600" fontSize="15">panic で止める</text>
        <text x="365" y="150" fontSize="12">・不変条件が破れた（続けると危険）</text>
        <text x="365" y="170" fontSize="12">・範囲外アクセスなどの契約違反</text>
        <text x="365" y="190" fontSize="12">・例・試作・テスト（unwrap / expect）</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 24,
  part: 4,
  title: 'エラー処理',
  summary:
    'Rust には例外がなく、回復できない失敗は panic で、回復しうる失敗は Result 型で表します。match と unwrap・expect、? 演算子による伝播と From による変換、Display と Error を実装した自作エラー型、そして thiserror と anyhow の使い分けまで、アプリで必要なエラー処理を一通り学びます。',
  goals: [
    'panic と Result の違いと、どちらを使うべきかの判断基準を説明できる',
    'Result<T, E> を match・unwrap_or・map などで扱い、unwrap と expect の使いどころを説明できる',
    '? 演算子の意味（Ok なら取り出し、Err なら From で変換して return）を説明できる',
    'Display と std::error::Error を実装した自作のエラー型を書き、From で ? に対応させられる',
    'thiserror でライブラリのエラー型を、anyhow でアプリのエラー処理を書ける',
    'main から Result を返して終了コードに反映させられる',
  ],
  prerequisites: [20, 21, 22],
  sections: [
    {
      id: 'intro',
      title: '例外がない言語のエラー処理',
      body: (
        <>
          <p>
            JavaScript では <code>throw</code> と <code>try/catch</code> でエラーを扱いました。この方式では、関数の型を見ても「どんなエラーが飛んでくるか」「そもそも飛んでくるのか」が分かりません。Rust には例外がなく、失敗を2つに分けて扱います。<Ref n={1} /><Ref n={2} />
          </p>
          <ul>
            <li>
              <Term en="unrecoverable error">回復できないエラー</Term>
              ：プログラムのバグや続行が危険な状態。<code>panic!</code> でプログラムを止める。
            </li>
            <li>
              <Term en="recoverable error">回復できるエラー</Term>
              ：ファイルが見つからない、入力が不正といった想定内の失敗。<code>Result&lt;T, E&gt;</code> 型の値として返し、呼び出し側に扱わせる。
            </li>
          </ul>
          <p>
            重要なのは、後者が「型」であることです。失敗しうる関数は戻り値の型にそれを宣言し、呼び出し側は値を取り出す過程で必ず失敗の枝に向き合います。TypeScript で <ChapterLink n={6} /> の判別可能なユニオンを使って <code>{'{ ok: true, value } | { ok: false, error }'}</code> を返す設計をしたことがあれば、それが言語の標準になったものだと考えてください。
          </p>
        </>
      ),
    },
    {
      id: 'panic',
      title: 'panic：止めるべきときに止める',
      body: (
        <>
          <p>
            <code>panic!</code> は、メッセージを表示し、スタックを
            <Term en="unwinding">巻き戻し</Term>
            て各関数のデータを後片付けしながらプログラムを終了させます。<ChapterLink n={18} /> で見た配列の範囲外アクセスも、内部で panic を起こしています。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let v = vec![1, 2, 3];
v[99];
`}
          />
          <Code
            lang="text"
            code={`
thread 'main' (12345) panicked at src/main.rs:3:5:
index out of bounds: the len is 3 but the index is 99
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace
`}
          />
          <p>
            C 言語なら添字 99 の先にあるメモリを読んでしまい、情報漏えいにつながる
            <Term en="buffer overread">バッファオーバーリード</Term>
            になります。Rust は実行を止めることでこれを防ぎます。<Ref n={1} /> メッセージにあるとおり、<code>RUST_BACKTRACE=1 cargo run</code> とすると、panic に至った関数呼び出しの履歴が表示されます。上から読んで、自分が書いたファイルが最初に出てくる行を見れば原因の場所が分かります。<Ref n={1} />
          </p>
          <p>
            巻き戻しの代わりに即座に終了する設定もあります。<code>Cargo.toml</code> の <code>[profile.release]</code> に <code>panic = 'abort'</code> と書くと、後片付けを OS に任せて実行ファイルを小さくできます。<Ref n={1} /> Tsumugi のリリースビルドでもこの設定を使います（<ChapterLink n={51} />）。
          </p>
        </>
      ),
    },
    {
      id: 'result',
      title: 'Result：失敗を値として返す',
      body: (
        <>
          <p>回復できる失敗は、標準ライブラリの列挙型 <code>Result</code> で表します。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
enum Result<T, E> {
    Ok(T),   // 成功。T が結果の値
    Err(E),  // 失敗。E がエラーの値
}
`}
          />
          <p>
            <code>Option</code> と同じくプレリュードに含まれ、<code>Ok</code> と <code>Err</code> はそのまま書けます。<ChapterLink n={23} /> の <code>"42".parse::&lt;i32&gt;()</code> は <code>Result&lt;i32, ParseIntError&gt;</code> を返していました。扱い方の全体像を図 24-1 に示します。
          </p>
          <Figure n="24-1" title="Result の分岐" caption="失敗しうる関数は Ok(T) か Err(E) を返す。呼び出し側は Ok なら値を使い、Err なら回復・伝播・停止のいずれかを選ぶ。どちらの枝も型として現れるので、扱わずに済ませることはできない。">
            <ResultBranchFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
use std::fs::File;

let greeting_file = match File::open("hello.txt") {
    Ok(file) => file,
    Err(error) => panic!("Problem opening the file: {error:?}"),
};
`}
          />
          <p>
            <code>match</code> が基本の形です。<code>File::open</code> は <code>Result&lt;File, std::io::Error&gt;</code> を返し、<code>io::Error</code> には <code>kind()</code> メソッドがあるので、「見つからないときだけ作る、それ以外は止める」のように種類で分岐できます。<Ref n={2} /> 図の「呼び出し側が選ぶ」の3つの選択肢を、それぞれの道具で見ていきます。
          </p>
          <h3>止める：unwrap と expect</h3>
          <p>
            <code>unwrap()</code> は <code>Ok</code> なら中身を返し、<code>Err</code> なら panic します。<code>expect("メッセージ")</code> は同じ動作で、panic のメッセージを自分で指定できます。公式ブックによれば、なぜ成功するはずなのかを書けるので、本番品質のコードでは多くの Rust 利用者が <code>expect</code> を選びます。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
use std::net::IpAddr;

let home: IpAddr = "127.0.0.1"
    .parse()
    .expect("ハードコードした IP アドレスは妥当なはず");
`}
          />
          <p>
            コンパイラは文字列が妥当な IP かどうか知りませんが、プログラマは知っています。こういう「コンパイラより多くの情報を持っている」場面では <code>expect</code> が適切で、メッセージがその前提を文書化します。<Ref n={3} /> 逆に、文字列が利用者の入力なら <code>expect</code> は不適切で、<code>Result</code> を返して扱わせるべきです。
          </p>
          <h3>回復する：unwrap_or と map 系</h3>
          <p><code>Result</code> には <code>match</code> を書かずに済ませるメソッドが多数あります。<Ref n={7} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>unwrap_or(既定値)</code></td>
                  <td><code>Err</code> なら既定値を返す</td>
                </tr>
                <tr>
                  <td><code>unwrap_or_else(|e| ...)</code></td>
                  <td><code>Err</code> ならクロージャ（<ChapterLink n={27} />）でエラーから値を作る</td>
                </tr>
                <tr>
                  <td><code>unwrap_or_default()</code></td>
                  <td><code>Err</code> なら <code>T::default()</code></td>
                </tr>
                <tr>
                  <td><code>map(|v| ...)</code></td>
                  <td><code>Ok</code> の中身だけを変換する</td>
                </tr>
                <tr>
                  <td><code>map_err(|e| ...)</code></td>
                  <td><code>Err</code> の中身だけを変換する（エラー型の変換に使う）</td>
                </tr>
                <tr>
                  <td><code>and_then(|v| ...)</code></td>
                  <td><code>Ok</code> なら次の失敗しうる処理へつなぐ</td>
                </tr>
                <tr>
                  <td><code>ok()</code></td>
                  <td><code>Option&lt;T&gt;</code> に変換する（エラーは捨てる）</td>
                </tr>
                <tr>
                  <td><code>is_ok()</code> / <code>is_err()</code></td>
                  <td>どちらの枝かを <code>bool</code> で返す</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code
            lang="rust"
            code={`
"x".parse::<i32>().unwrap_or(0);                          // 0
"7".parse::<i32>().map(|n| n * 2).unwrap_or_else(|_| -1); // 14
"x".parse::<i32>().map_err(|e| e.to_string());            // Err("invalid digit found in string")
"x".parse::<i32>().ok();                                  // None
`}
          />
          <p>
            <code>Option</code> にも同じ名前のメソッド群があり、<code>Option</code> から <code>Result</code> へは <code>ok_or(err)</code> で、逆は <code>ok()</code> で変換します。<Ref n={6} /> <code>Result</code> には <code>#[must_use]</code> が付いているので、戻り値を使わずに捨てると「unused <code>Result</code> that must be used」という警告が出ます。失敗を黙って握りつぶすことを防ぐ仕組みです。意図して捨てるときは <code>let _ = ...;</code> と書きます。
          </p>
        </>
      ),
    },
    {
      id: 'question',
      title: '? 演算子：上に伝える',
      body: (
        <>
          <p>
            3つ目の選択肢、「自分では処理せず呼び出し元に返す」のが
            <Term en="propagating errors">エラーの伝播</Term>
            です。<code>match</code> で書くと冗長になります。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
use std::fs;
use std::io;

fn read_username(path: &str) -> Result<String, io::Error> {
    let content = match fs::read_to_string(path) {
        Ok(c) => c,
        Err(e) => return Err(e), // 失敗したらそのまま返す
    };
    Ok(content.trim().to_string())
}
`}
          />
          <p>この「<code>Ok</code> なら取り出し、<code>Err</code> なら即 <code>return</code>」を1文字で書くのが <code>?</code> 演算子です。<Ref n={2} /></p>
          <Code
            lang="rust"
            code={`
fn read_username(path: &str) -> Result<String, io::Error> {
    let content = fs::read_to_string(path)?;
    Ok(content.trim().to_string())
}
`}
          />
          <p>
            <code>?</code> には <code>match</code> 版と1つだけ違いがあります。<code>Err</code> を返すとき、エラーの値が <code>From::from</code> を通って関数の戻り値のエラー型に変換されます。<Ref n={2} /> つまり、呼び出す関数ごとにエラー型が違っても、自分のエラー型への <code>From</code> 実装（<ChapterLink n={25} />）があれば1つの型にまとめて返せます。この流れを図 24-2 に示します。
          </p>
          <Figure n="24-2" title="? によるエラーの伝播" caption="read_limit の中で parse が Err を返すと、? がその場で From::from により ConfigError に変換し、read_limit から Err を return する。以降の行は実行されない。Ok のときは中身が取り出されて次の行に進む。">
            <QuestionPropagationFigure />
          </Figure>
          <p>
            図から読み取れるように、<code>?</code> は関数を途中で抜ける「早期リターン」です。そのため、<code>?</code> は <code>Result</code> か <code>Option</code>（または <code>FromResidual</code> を実装した型）を返す関数の中でしか使えません。戻り値のない <code>main</code> で使うと次のエラーになります。<Ref n={2} />
          </p>
          <Code
            lang="text"
            code={`
error[E0277]: the \`?\` operator can only be used in a function that returns \`Result\` or \`Option\` (or another type that implements \`FromResidual\`)
`}
          />
          <p>
            <code>Option</code> に対する <code>?</code> は、<code>None</code> なら <code>None</code> を返します。<code>Result</code> と <code>Option</code> を混ぜることはできないので、<code>ok()</code> や <code>ok_or()</code> で揃えてから使います。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last() // 行がなければ None を返す
}
`}
          />
          <h3>main から Result を返す</h3>
          <p>
            <code>main</code> は <code>Result&lt;(), E&gt;</code> を返せます。<code>Ok(())</code> なら終了コード 0、<code>Err</code> ならエラーを表示して 0 以外で終了します。<code>Box&lt;dyn Error&gt;</code> は「<code>Error</code> トレイトを実装した何らかの型」を意味し（<ChapterLink n={25} />）、どんなエラーも <code>?</code> で返せます。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;
    Ok(())
}
`}
          />
        </>
      ),
    },
    {
      id: 'custom-error',
      title: '自作のエラー型',
      body: (
        <>
          <p>
            ライブラリやアプリの中核では、起こりうる失敗を列挙型で定義するのが定石です。<code>?</code> と組み合わせるには、<code>std::error::Error</code> トレイトを実装し、元になるエラー型からの <code>From</code> を用意します。<code>Error</code> トレイトは <code>Debug</code> と <code>Display</code> を要求し、それ以外のメソッドにはすべて既定の実装があります。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
use std::fmt;
use std::io;
use std::num::ParseIntError;

#[derive(Debug)]
enum ConfigError {
    Io(io::Error),
    Parse(ParseIntError),
    OutOfRange(i64),
}

impl fmt::Display for ConfigError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ConfigError::Io(e) => write!(f, "設定ファイルを読めません: {e}"),
            ConfigError::Parse(e) => write!(f, "数値として読めません: {e}"),
            ConfigError::OutOfRange(n) => write!(f, "{n} は範囲外です"),
        }
    }
}

impl std::error::Error for ConfigError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            ConfigError::Io(e) => Some(e),      // 元のエラーをたどれるようにする
            ConfigError::Parse(e) => Some(e),
            ConfigError::OutOfRange(_) => None,
        }
    }
}

impl From<io::Error> for ConfigError {
    fn from(e: io::Error) -> Self { ConfigError::Io(e) }
}
impl From<ParseIntError> for ConfigError {
    fn from(e: ParseIntError) -> Self { ConfigError::Parse(e) }
}

fn read_limit(path: &str) -> Result<i64, ConfigError> {
    let text = std::fs::read_to_string(path)?; // io::Error → ConfigError::Io
    let n: i64 = text.trim().parse()?;         // ParseIntError → ConfigError::Parse
    if !(1..=1000).contains(&n) {
        return Err(ConfigError::OutOfRange(n));
    }
    Ok(n)
}
`}
          />
          <p>
            <code>source()</code> は「このエラーの原因となった下位のエラー」を返すためのメソッドです。標準ライブラリの指針では、包んだエラーは <code>source()</code> で返すか <code>Display</code> の文面に含めるかのどちらかにし、両方はしないとされています。<Ref n={4} /> 上の例は学習のため文面にも含めていますが、実務では <code>source()</code> に任せて文面を短く保つ方が、エラーの連鎖を表示するときに重複しません。<code>Display</code> の文面は小文字で始め、末尾に句読点を付けないのが英語圏の慣習です。<Ref n={4} />
          </p>
          <p>
            このコードは動きますが、<code>Display</code>・<code>Error</code>・<code>From</code> の定型が長いことが分かります。次の節で、この定型を消す2つのクレートを紹介します。
          </p>
        </>
      ),
    },
    {
      id: 'thiserror-anyhow',
      title: 'thiserror と anyhow',
      body: (
        <>
          <h3>thiserror：型を定義する側のために</h3>
          <p>
            <code>thiserror</code> は、<code>std::error::Error</code> の実装を <code>derive</code> で生成するクレートです。<Ref n={8} /> 前節の定型が属性だけで書けます。
          </p>
          <Code
            lang="rust"
            code={`
#[derive(Debug, thiserror::Error)]
enum AppError {
    #[error("データベースエラー: {0}")]
    Db(#[from] rusqlite::Error),               // From impl も生成、source にもなる
    #[error("JSON の変換に失敗しました: {0}")]
    Json(#[from] serde_json::Error),
    #[error("ページ {0} が見つかりません")]
    NotFound(String),                           // {0} はタプルの0番目
    #[error("入力が不正です: {reason}")]
    Invalid { reason: String },                 // {reason} は名前付きフィールド
}

fn find_title(conn: &rusqlite::Connection, id: &str) -> Result<String, AppError> {
    let mut stmt = conn.prepare("SELECT title FROM pages WHERE id = ?1")?; // rusqlite::Error → AppError::Db
    let mut rows = stmt.query_map([id], |row| row.get::<_, String>(0))?;
    match rows.next() {
        Some(row) => Ok(row?),
        None => Err(AppError::NotFound(id.to_string())),
    }
}
`}
          />
          <p>
            <code>#[error("...")]</code> が <code>Display</code> の文面になり、<code>{'{0}'}</code> や <code>{'{reason}'}</code> でフィールドを埋め込めます。<code>#[from]</code> を付けたフィールドには <code>From</code> 実装が生成され、同時に <code>source()</code> の戻り値にもなります。<code>#[from]</code> を使うバリアントは、そのフィールド以外を持てません。<code>#[error(transparent)]</code> を使うと、<code>Display</code> と <code>source()</code> を内側のエラーにそのまま委ねることもできます。<Ref n={8} />
          </p>
          <p>
            生成されるコードは手書きの実装と等価で、<code>thiserror</code> 自体は公開 API に現れません。手書きと <code>derive</code> を後から切り替えても互換性が壊れないので、ライブラリのエラー型に安心して使えます。<Ref n={8} /> thiserror 2.0.21 時点の記述です。
          </p>
          <h3>anyhow：使う側（アプリ）のために</h3>
          <p>
            一方、アプリの末端では「どんなエラーでもよいから、文脈を付けて上に返したい」ことがほとんどです。<code>anyhow</code> は、<code>std::error::Error</code> を実装したあらゆる型を <code>?</code> で受け取れる具体的なエラー型 <code>anyhow::Error</code> と、<code>anyhow::Result&lt;T&gt;</code>（<code>Result&lt;T, anyhow::Error&gt;</code> の別名）を提供します。<Ref n={9} />
          </p>
          <Code
            lang="rust"
            code={`
use anyhow::Context;

fn load_limit(path: &str) -> anyhow::Result<i64> {
    let text = std::fs::read_to_string(path)
        .with_context(|| format!("{path} を読めません"))?;   // 文脈を付けて伝播
    let n: i64 = text.trim().parse().context("数値として読めません")?;
    anyhow::ensure!(n > 0, "limit は正の数である必要があります: {n}"); // 条件を満たさなければ Err
    Ok(n)
}

fn main() -> anyhow::Result<()> {
    let n = load_limit("limit.txt")?;
    println!("{n}");
    Ok(())
}
`}
          />
          <Code
            lang="text"
            code={`
Error: limit.txt を読めません

Caused by:
    No such file or directory (os error 2)
`}
          />
          <p>
            <code>context</code> / <code>with_context</code> で「何をしようとして失敗したか」を積み重ね、<code>{'{:?}'}</code> で表示すると <code>Caused by:</code> の連鎖として出力されます。<code>anyhow!</code>（その場でエラーを作る）、<code>bail!</code>（エラーで即 return）、<code>ensure!</code>（条件付き return）のマクロもあります。具体的な型に戻したいときは <code>downcast_ref</code> で取り出せます。<Ref n={9} /> anyhow 1.0.104 時点の記述です。
          </p>
          <h3>使い分け</h3>
          <p>
            anyhow の文書は自前のエラー型を書くときに thiserror を勧め、thiserror の文書はアプリのエラー処理に anyhow を勧めています。<Ref n={8} /><Ref n={9} /> これをまとめると、次の方針になります。
          </p>
          <ul>
            <li>呼び出し側に「どの失敗か」を区別させたいとき（ライブラリ、アプリの中核クレート）：列挙型のエラー型を <code>thiserror</code> で定義する。</li>
            <li>区別が要らず、文脈付きで表示・記録できればよいとき（CLI の <code>main</code>、スクリプト、テスト）：<code>anyhow</code> を使う。</li>
            <li>両者は共存できる。中核クレートが <code>thiserror</code> の型を返し、アプリ側がそれを <code>anyhow</code> で受けて文脈を足す形が一般的。</li>
          </ul>
          <p>本章のコードは、<code>rusqlite</code>・<code>serde_json</code>・<code>thiserror</code>・<code>anyhow</code> を依存に加えたプロジェクトで Rust 1.99 によりコンパイルし、出力を確認しています。</p>
        </>
      ),
    },
    {
      id: 'when-to-panic',
      title: 'panic か Result かの判断基準',
      body: (
        <>
          <p>最後に、どちらを使うかの判断基準を整理します。既定は <code>Result</code> です。失敗しうる関数は <code>Result</code> を返し、呼び出し側に回復するかどうかを選ばせます。<Ref n={3} /> 図 24-3 に判断の分かれ目を示します。</p>
          <Figure n="24-3" title="panic か Result か" caption="失敗が想定内なら Result を返して呼び出し側に委ねる。失敗がバグや契約違反で、続けると危険な状態なら panic で止める。例・試作・テストでは unwrap と expect が許される。">
            <PanicOrResultFigure />
          </Figure>
          <p>公式ブックが panic を適切とする状況は次のとおりです。<Ref n={3} /></p>
          <ul>
            <li>例、試作、テスト。<code>unwrap</code> や <code>expect</code> は「ここは後で堅牢にする」という印になる。テストでは失敗が panic であるべきなので自然。</li>
            <li>コンパイラより多くの情報を持っているとき。前述のハードコードした IP アドレスの例。</li>
            <li>
              <Term en="bad state">不正な状態</Term>
              、つまり前提・保証・不変条件が破れたとき。それが「ときどき起こること」ではなく、以降のコードがその状態でないことに依存し、型で表現できない場合。続行すると安全でない・有害なら panic。
            </li>
            <li>契約違反。関数の前提条件を呼び出し側が破ったのは呼び出し側のバグなので、panic で知らせ、条件を文書に書く。</li>
          </ul>
          <p>
            逆に、入力の形式が不正、HTTP のレート制限のように「失敗が予想されること」は <code>Result</code> です。また、型で不正な状態を排除できるなら検査そのものが不要になります。<code>Option&lt;T&gt;</code> ではなく <code>T</code> を受け取れば <code>None</code> の心配はなく、<code>u32</code> なら負の数の検査は要りません。範囲が決まった値には、検証済みの値しか作れない型（私的なフィールドと <code>new</code>）を用意するのが Rust 流の設計です。<Ref n={3} />
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
              Tsumugi の <code>core</code> クレートは <code>error.rs</code> に <code>thiserror</code> でエラー型を定義し、<code>rusqlite::Error</code> と <code>serde_json::Error</code> を <code>#[from]</code> で包みます。本章の <code>AppError</code> がその原型です（型名は <code>Error</code>。<ChapterLink n={42} />）。ほかに、見つからない場合の <code>NotFound(String)</code> と、移動先やプロパティ型の指定が不正な場合の <code>Invalid(String)</code> のバリアントがあり、失敗の種類を呼び出し側（Tauri コマンド）が <code>match</code> で扱えるようにしています。
            </p>
            <p>
              Tauri のコマンド（<ChapterLink n={34} />）はエラーをフロントエンドに JSON で返す必要があるため、アプリ側の <code>AppError</code> には <code>serde::Serialize</code> を実装し、<code>core</code> のエラーから <code>From</code> で変換します。フロントエンドではそれを受けてトースト表示します（<ChapterLink n={50} />）。一方、<code>core</code> のテストコード（<ChapterLink n={31} />）では、<code>unwrap()</code> で成功を確かめ、<code>matches!(err, Err(Error::Invalid(_)))</code> で失敗の種類を確かめています。Tsumugi は <code>anyhow</code> を使っていません。
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
            <li>回復できない失敗は <code>panic!</code>（既定は巻き戻し。<code>RUST_BACKTRACE=1</code> で履歴表示）、回復できる失敗は <code>Result&lt;T, E&gt;</code> で返す。</li>
            <li><code>match</code> が基本。止めるなら <code>unwrap</code>／<code>expect</code>、回復するなら <code>unwrap_or</code>／<code>map</code>／<code>map_err</code>／<code>and_then</code>。<code>Result</code> は捨てると警告が出る。</li>
            <li><code>?</code> は「<code>Ok</code> なら取り出し、<code>Err</code> なら <code>From::from</code> で変換して即 <code>return</code>」。<code>Result</code>／<code>Option</code> を返す関数でしか使えず、<code>main</code> も <code>Result</code> を返せる。</li>
            <li>自作エラー型は列挙型＋<code>Display</code>＋<code>Error</code>（<code>source</code>）＋<code>From</code>。定型は <code>thiserror</code> の <code>#[error]</code> と <code>#[from]</code> で消せる。</li>
            <li>アプリの末端や <code>main</code>、テストでは <code>anyhow::Result</code> と <code>context</code> で文脈を積む。ライブラリは thiserror、アプリは anyhow が基本の使い分け。</li>
            <li>既定は <code>Result</code>。バグ・契約違反・続行が危険な状態だけ panic。型で不正な状態を排除できれば検査は不要になる。</li>
          </ul>
          <p>次章では、<code>From</code> や <code>Display</code> のようなトレイトの仕組みそのものと、ジェネリクスによる抽象化を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 9.1 Unrecoverable Errors with panic!',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html',
      accessed: '2026-11-08',
      note: 'panic! の動作、巻き戻しと abort、RUST_BACKTRACE、バッファオーバーリードの根拠。',
    },
    {
      title: 'The Rust Programming Language, 9.2 Recoverable Errors with Result',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html',
      accessed: '2026-11-08',
      note: 'Result の定義、File::open と match、error.kind()、unwrap と expect、伝播、? の意味と From 変換、? の使える場所と E0277、Option への ?、main の Result と終了コードの根拠。',
    },
    {
      title: 'The Rust Programming Language, 9.3 To panic! or Not to panic!',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html',
      accessed: '2026-11-08',
      note: 'Result が既定、panic が適切な場面（例・試作・テスト、コンパイラより多くの情報、不正な状態、契約違反）、型による検証の根拠。',
    },
    {
      title: 'std::error::Error — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/error/trait.Error.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'Error トレイトの定義（Debug + Display）、source() の意味と既定、文面の慣習、Box<dyn Error> への From の根拠。',
    },
    {
      title: 'std::fmt — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/fmt/index.html',
      accessed: '2026-11-08',
      note: 'Display の実装方法（Formatter と write!）の根拠。',
    },
    {
      title: 'std::option::Option — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/option/enum.Option.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'Option の unwrap_or、map、ok_or などのメソッドの根拠。',
    },
    {
      title: 'std::result::Result — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/result/enum.Result.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'Result の unwrap_or、map、map_err、and_then、ok などのメソッドと、? の From 変換の根拠。',
    },
    {
      title: 'thiserror — docs.rs',
      publisher: 'docs.rs（David Tolnay）',
      url: 'https://docs.rs/thiserror/latest/thiserror/',
      accessed: '2026-11-08',
      version: 'thiserror 2.0.21',
      note: '#[derive(Error)]、#[error("...")] の書式、#[from] と source、transparent、手書きと等価で公開 API に現れないこと、anyhow を勧めていることの根拠。',
    },
    {
      title: 'anyhow — docs.rs',
      publisher: 'docs.rs（David Tolnay）',
      url: 'https://docs.rs/anyhow/latest/anyhow/',
      accessed: '2026-11-08',
      version: 'anyhow 1.0.104',
      note: 'anyhow::Result と anyhow::Error、? による変換、context/with_context、anyhow!/bail!/ensure!、downcast、自前の型には thiserror を勧めていることの根拠。',
    },
  ],
}

export default chapter
