import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 30-1 Future の状態遷移とランタイムのポーリング ---------- */
function PollFigure() {
  return (
    <svg viewBox="0 0 640 345" role="img" aria-label="ランタイム（実行器）が Future に poll を呼び、準備ができていなければ Pending が返って Waker が登録され、ランタイムは他のタスクを進める。I/O やタイマーが完了すると wake が呼ばれ、ランタイムが再び poll し、Ready(値) が返って完了する流れを示す図">
      <defs>
        <marker id="arrow30a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
        <marker id="arrow30b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-accent)" />
        </marker>
      </defs>
      {/* ランタイム */}
      <rect x="20" y="60" width="170" height="210" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="105" y="85" fontSize="14" fontWeight="600" textAnchor="middle">ランタイム（実行器）</text>
      <text x="105" y="105" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Tokio など</text>
      <rect x="35" y="120" width="140" height="40" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
      <text x="105" y="137" fontSize="11" textAnchor="middle">実行待ちタスクの列</text>
      <text x="105" y="152" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">task A, task B, …</text>
      <text x="105" y="185" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">列から取り出して poll</text>
      <text x="105" y="200" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Pending なら次のタスクへ</text>
      <text x="105" y="215" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">wake されたら列に戻す</text>

      {/* Future の状態 */}
      <rect x="260" y="60" width="150" height="50" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <text x="335" y="90" fontSize="13" textAnchor="middle">Future（未開始）</text>
      <rect x="260" y="160" width="150" height="50" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="335" y="182" fontSize="13" textAnchor="middle">Pending</text>
      <text x="335" y="200" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">Waker を預けて待つ</text>
      <rect x="260" y="260" width="150" height="50" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="8" />
      <text x="335" y="282" fontSize="13" textAnchor="middle">Ready(値)</text>
      <text x="335" y="300" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">完了。もう poll しない</text>

      {/* 遷移 */}
      <path d="M335,110 L335,158" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow30a)" />
      <text x="372" y="138" fontSize="11" textAnchor="middle">poll</text>
      <path d="M335,210 L335,258" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow30a)" />
      <text x="400" y="238" fontSize="11" textAnchor="middle">poll（準備完了後）</text>
      {/* 自己ループ Pending */}
      <path d="M410,175 C450,165 450,205 410,195" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow30a)" />
      <text x="470" y="188" fontSize="11" textAnchor="middle">poll → まだ Pending</text>

      {/* 外部資源 */}
      <rect x="480" y="60" width="140" height="70" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="8" />
      <text x="550" y="85" fontSize="13" textAnchor="middle">I/O・タイマー</text>
      <text x="550" y="103" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">ソケット、sleep、</text>
      <text x="550" y="118" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">チャネルの受信など</text>
      <path d="M520,130 C520,170 440,230 200,240" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow30b)" />
      <text x="470" y="250" fontSize="11" fill="var(--fig-accent)" textAnchor="middle">完了したら Waker::wake()</text>
      <path d="M190,140 L258,90" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow30a)" strokeDasharray="4 3" />
      <text x="320" y="322" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：await と書いた箇所が、この poll の繰り返しにコンパイルされる</text>
      <text x="320" y="338" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">Pending の間、スレッドは他のタスクを進められる</text>
    </svg>
  )
}

/* ---------- 図 30-2 逐次 await と join の時間 ---------- */
function SequentialJoinFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="2つの 50 ミリ秒かかる非同期処理を、順に await した場合は合計 100 ミリ秒、join で同時に進めた場合は 50 ミリ秒で終わることを横棒で比べた図">
      <text x="20" y="28" fontSize="14" fontWeight="600">逐次：fetch(1).await の後に fetch(2).await</text>
      <rect x="20" y="40" width="260" height="26" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="150" y="58" fontSize="12" textAnchor="middle">fetch(1)  50 ms</text>
      <rect x="280" y="40" width="260" height="26" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="410" y="58" fontSize="12" textAnchor="middle">fetch(2)  50 ms</text>
      <text x="580" y="58" fontSize="12" fill="var(--fig-muted)">計 100 ms</text>

      <text x="20" y="118" fontSize="14" fontWeight="600">並行：tokio::join!(fetch(1), fetch(2))</text>
      <rect x="20" y="130" width="260" height="26" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="4" />
      <text x="150" y="148" fontSize="12" textAnchor="middle">fetch(1)  50 ms</text>
      <rect x="20" y="162" width="260" height="26" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="150" y="180" fontSize="12" textAnchor="middle">fetch(2)  50 ms</text>
      <text x="320" y="165" fontSize="12" fill="var(--fig-muted)">計 50 ms（1本のスレッドで両方を待つ）</text>
      <line x1="20" y1="205" x2="540" y2="205" stroke="var(--fig-line)" />
      <text x="20" y="222" fontSize="11" fill="var(--fig-muted)">0 ms</text>
      <text x="280" y="222" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">50 ms</text>
      <text x="540" y="222" fontSize="11" fill="var(--fig-muted)" textAnchor="end">100 ms</text>
    </svg>
  )
}

/* ---------- 図 30-3 スレッド・タスク・Future の階層と使い分け ---------- */
function ThreadTaskFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="OS が管理するスレッドの上に、ランタイムが管理するタスクが複数載り、各タスクの中に Future の木がある3層の図。右側に、CPU 中心の処理はスレッド、待ち時間中心の処理は async という使い分けを示す">
      <rect x="20" y="40" width="380" height="230" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <text x="40" y="62" fontSize="13" fontWeight="600">スレッド（OS が管理）</text>
      <text x="40" y="80" fontSize="12" fill="var(--fig-muted)">メモリを多く使う。OS が切り替える</text>
      {[40, 220].map((x, i) => (
        <g key={x}>
          <rect x={x} y="95" width="160" height="160" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
          <text x={x + 80} y="112" fontSize="12" fontWeight="600" textAnchor="middle">タスク {i * 2 + 1}, {i * 2 + 2}</text>
          <text x={x + 80} y="128" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ランタイムが管理。軽量</text>
          <text x={x + 80} y="143" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">スレッド間を移動できる</text>
          <rect x={x + 15} y="150" width="130" height="95" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="6" />
          <text x={x + 80} y="167" fontSize="12" fontWeight="600" textAnchor="middle">Future の木</text>
          <circle cx={x + 80} cy="188" r="7" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <circle cx={x + 55} cy="218" r="7" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <circle cx={x + 105} cy="218" r="7" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <line x1={x + 80} y1="195" x2={x + 55} y2="211" stroke="var(--fig-line)" />
          <line x1={x + 80} y1="195" x2={x + 105} y2="211" stroke="var(--fig-line)" />
          <text x={x + 80} y="238" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">await ごとに分岐</text>
        </g>
      ))}
      <g fontSize="12">
        <text x="420" y="62" fontWeight="600">使い分けの目安</text>
        <rect x="420" y="75" width="200" height="60" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="6" />
        <text x="520" y="95" textAnchor="middle">CPU を使い切る処理</text>
        <text x="520" y="112" textAnchor="middle" fill="var(--fig-muted)">（画像変換、大量計算）</text>
        <text x="520" y="128" textAnchor="middle">→ スレッド / spawn_blocking</text>
        <rect x="420" y="150" width="200" height="60" fill="var(--fig-box4)" stroke="var(--fig-line)" rx="6" />
        <text x="520" y="170" textAnchor="middle">待ち時間が中心の処理</text>
        <text x="520" y="187" textAnchor="middle" fill="var(--fig-muted)">（通信、多数の I/O、タイマー）</text>
        <text x="520" y="203" textAnchor="middle">→ async タスク</text>
        <text x="520" y="240" textAnchor="middle" fill="var(--fig-muted)">両方必要なら組み合わせる</text>
        <text x="520" y="256" textAnchor="middle" fill="var(--fig-muted)">（スレッドで計算し、チャネルで通知）</text>
      </g>
      <text x="320" y="290" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：Tokio の既定ランタイムは複数スレッドでタスクを動かし、タスクはスレッド間を移動しうる</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 30,
  part: 4,
  title: '非同期処理：async/await と Tokio',
  summary:
    'JavaScript の async/await に似た構文で、スレッドを増やさずに多くの待ち時間を扱う Rust の非同期処理を学びます。Future がポーリングで進む仕組み、ランタイム Tokio の役割、spawn と join、スレッドとの使い分けを理解し、Tauri の非同期コマンドが Tokio の上で動くことを予告します。',
  goals: [
    'Future が「後で値になるかもしれないもの」であり、poll されるまで何もしないことを説明できる',
    'async fn と .await の構文を使い、ランタイム（Tokio）の上で非同期コードを動かせる',
    '逐次 await と join・spawn の違いを説明し、並行に進めるコードを書ける',
    'tokio::spawn に渡す Future に Send と \'static が要求される理由と、MutexGuard を await をまたいで持たない作法を説明できる',
    'CPU 中心の処理はスレッド、待ち時間中心の処理は async という使い分けを説明できる',
  ],
  prerequisites: [3, 27, 29],
  sections: [
    {
      id: 'intro',
      title: 'JavaScript の async/await との違い',
      body: (
        <>
          <p>
            <ChapterLink n={3} /> で学んだ JavaScript の <code>async</code>/<code>await</code> は、通信や読み書きの待ち時間に他の処理を進める仕組みでした。Rust にも同じキーワードがあり、見た目もよく似ています。しかし裏側は2つの点で異なります。
          </p>
          <ul>
            <li>JavaScript の Promise は作った瞬間に処理が始まりますが、Rust の <Term en="future">Future</Term> は誰かが「進めろ」と言うまで何もしません（遅延）。<Ref n={1} /><Ref n={13} /></li>
            <li>JavaScript にはイベントループが言語処理系に組み込まれていますが、Rust には非同期コードを動かす<Term en="runtime">ランタイム</Term>が標準では付いていません。Tokio などのクレートを自分で選んで使います。<Ref n={1} /></li>
          </ul>
          <p>
            この違いを押さえたうえで、<ChapterLink n={29} /> のスレッドと何が違うのか、どう使い分けるのかを見ていきます。この章は第5部への橋渡しでもあります。Tauri の非同期コマンドは、まさにこの章で学ぶ Tokio のランタイム上で動くからです。
          </p>
        </>
      ),
    },
    {
      id: 'future',
      title: 'Future とポーリング',
      body: (
        <>
          <p>
            公式ブックの定義では、Future は「今は準備ができていないかもしれないが、将来のある時点で準備ができる値」です。<Ref n={1} /> 標準ライブラリの <code>Future</code> トレイトは、<ChapterLink n={27} /> の <code>Iterator</code> と同じく、必須メソッドが1つだけです。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
pub trait Future {
    type Output;                                   // 完了時に生まれる値の型

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}

pub enum Poll<T> {
    Ready(T),   // 完了。値が手に入った
    Pending,    // まだ。後でもう一度 poll してほしい
}
`}
          />
          <p>
            <code>poll</code> は「進められるところまで進めて、終わったか途中かを返す」メソッドです。終わっていなければ <code>Pending</code> を返しますが、そのとき <code>Context</code> に入っている
            <Term en="waker">Waker</Term>
            の複製を手元に保存します。後で I/O の完了などで進められるようになったら、その Waker の <code>wake</code> を呼び、「もう一度 poll してくれ」とランタイムに知らせます。<code>poll</code> はブロックしてはならず、素早く戻る約束です。<Ref n={2} />
          </p>
          <p>
            <code>.await</code> と書いた箇所は、コンパイラによって「<code>poll</code> を呼び、<code>Pending</code> ならランタイムに制御を返し、起こされたらまた <code>poll</code> する」という繰り返しに変換されます。<Ref n={3} /> 次の図は、この状態遷移とランタイムの関係を表したものです。
          </p>
          <Figure n="30-1" title="Future の状態遷移とランタイムのポーリング" caption="ランタイムがタスクを取り出して poll する。Pending なら Waker を預けて他のタスクへ進み、I/O やタイマーが完了して wake が呼ばれると再び poll し、Ready(値) で完了する。Ready を返した Future を再度 poll してはいけない。模式図。">
            <PollFigure />
          </Figure>
          <p>
            図から読み取ってほしいのは、「待っている間、スレッドは止まっていない」という点です。<ChapterLink n={29} /> の <code>thread::sleep</code> や <code>rx.recv()</code> はスレッドをブロックしましたが、非同期の <code>sleep().await</code> や <code>rx.recv().await</code> は制御をランタイムに返し、同じスレッドで他のタスクが進みます。<Ref n={4} />
          </p>
          <p>
            <code>{'self: Pin<&mut Self>'}</code> という見慣れない書き方は、Future が自分自身の一部を参照する状態機械にコンパイルされるため、poll の途中でメモリ上を移動されては困る、という事情から来ています。<code>Pin</code> は「この値はもう動かさない」とコンパイラに約束する印で、ほとんどの場合は意識せずに済みます。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'syntax',
      title: 'async fn、.await、ランタイム',
      body: (
        <>
          <p>
            <code>Future</code> トレイトを自分で実装することはまれで、普段は <code>async</code> キーワードを使います。<code>async fn</code> は「戻り値の型を <code>Output</code> とする Future を返す関数」に変換されます。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
async fn fetch_title(id: u32) -> String {
    tokio::time::sleep(Duration::from_millis(50)).await;   // 通信の代わりに 50 ms 待つ
    format!("page-{id}")
}

// コンパイラはおおよそ次のように扱う
// fn fetch_title(id: u32) -> impl Future<Output = String> { async move { … } }
`}
          />
          <p>
            Rust の <code>await</code> は式の後ろに置きます。<code>get(url).await.text().await</code> のようにメソッドチェーンが素直に書けるためです。<Ref n={1} /> そして <code>main</code> を <code>async</code> にはできません（E0752）。<code>main</code> はランタイムを初期化できても、それ自体がランタイムではないからです。<Ref n={1} /> Tokio を使う場合、<code>Cargo.toml</code> に依存を加え、<code>#[tokio::main]</code> を付けます。<Ref n={4} />
          </p>
          <Code
            lang="toml"
            code={`
[dependencies]
tokio = { version = "1", features = ["full"] }
`}
          />
          <Code
            lang="rust"
            code={`
async fn say_world() {
    println!("world");
}

#[tokio::main]
async fn main() {
    let op = say_world();   // ここでは何も起きない（遅延）
    println!("hello");
    op.await;               // ここで初めて本体が動く
}
// 出力: hello の次に world
`}
          />
          <p>
            <code>#[tokio::main]</code> は構文の糖衣で、次のような同期の <code>main</code> に展開されます。ランタイムを作り、<code>block_on</code> で最上位の Future を完了まで実行します。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            code={`
fn main() {
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        println!("hello");
    });
}
`}
          />
          <p>
            <code>block_on</code> は、同期の世界から非同期の世界へ入る入口です。中の async ブロックはブロックしませんが、外側のコードは <code>block_on</code> が戻るまでブロックされます。<Ref n={5} /> Tauri では、この入口に当たる部分をフレームワークが用意してくれます（後述）。
          </p>
        </>
      ),
    },
    {
      id: 'concurrency',
      title: '並行に進める：join と spawn',
      body: (
        <>
          <p>
            1つの async ブロックの中では、<code>await</code> の順に逐次実行されます。<Ref n={5} /> 2つの通信を順に <code>await</code> すれば、待ち時間は足し算になります。同時に進めるには <code>join</code> か <code>spawn</code> を使います。
          </p>
          <Code
            lang="rust"
            code={`
// 逐次：約 100 ms
let a = fetch_title(1).await;
let b = fetch_title(2).await;

// 並行：約 50 ms。両方の完了を待ち、結果のタプルを返す
let (a, b) = tokio::join!(fetch_title(1), fetch_title(2));
`}
          />
          <Figure n="30-2" title="逐次 await と join の所要時間" caption="50 ms かかる処理を2つ順に await すると 100 ms。join! で同時に進めると 50 ms。どちらも1本のスレッドで動く。模式図。">
            <SequentialJoinFigure />
          </Figure>
          <p>
            <code>join</code> は「この場で複数の Future を同時に待つ」道具です。それに対して <code>tokio::spawn</code> は、Future をランタイムに
            <Term en="task">タスク</Term>
            として預け、呼び出し側は先に進みます。Tokio のチュートリアルはタスクを「非同期のグリーンスレッド」と表現しています。タスクは軽量（1回のアロケーションと 64 バイト程度）で、生成したスレッドで動くとは限らず、ランタイムの別のスレッドに移動することもあります。<Ref n={6} />
          </p>
          <Code
            lang="rust"
            code={`
let handle = tokio::spawn(async {
    for i in 1..4 {
        println!("hi number {i} from the task!");
        tokio::time::sleep(Duration::from_millis(10)).await;
    }
    "done"
});

// ここで他の仕事ができる

let out = handle.await.unwrap();   // JoinHandle 自体が Future。Result<T, JoinError>
println!("GOT {out}");             // GOT done
`}
          />
          <p>
            <code>spawn</code> は <code>JoinHandle</code> を返し、<code>.await</code> すると完了を待って戻り値を受け取れます。<ChapterLink n={29} /> の <code>handle.join()</code> がブロックしたのに対し、こちらは制御をランタイムに返します。<Ref n={5} /><Ref n={6} /> 結果が <code>Result</code> なのは、タスクが panic したり、ランタイムの終了で打ち切られたりする可能性があるからです。<Ref n={6} />
          </p>
          <h3>spawn に渡せる Future の条件：'static と Send</h3>
          <p>
            <code>tokio::spawn</code> に渡す Future には、スレッドと同じ2つの制約があります。<Ref n={6} />
          </p>
          <ul>
            <li><code>'static</code>：タスクの外にある値を借用できない。ローカル変数を使うなら <code>async move</code> で所有権を移す（E0373 と <code>move</code> の提案が出る）。</li>
            <li><code>Send</code>：ランタイムがタスクをスレッド間で移動させるため、<code>.await</code> をまたいで保持される値がすべて <code>Send</code> でなければならない。</li>
          </ul>
          <p>
            2つ目は見落としやすい形で現れます。<ChapterLink n={29} /> で学んだ <code>std::sync::Mutex</code> のガードは <code>Send</code> ではないので、ロックを持ったまま <code>.await</code> すると、タスク全体が <code>Send</code> でなくなります。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            code={`
async fn increment_and_do_stuff(mutex: &Mutex<i32>) {
    let mut lock = mutex.lock().unwrap();
    *lock += 1;
    do_something_async().await;      // ガードを持ったまま await
}                                    // lock はここまで生きている
`}
          />
          <Code
            lang="text"
            code={`
error: future cannot be sent between threads safely
  = help: the trait \`Send\` is not implemented for \`std::sync::MutexGuard<'_, i32>\`
note: future is not \`Send\` as this value is used across an await
  |     let mut lock = mutex.lock().unwrap();
  |         -------- has type \`MutexGuard<'_, i32>\` which is not \`Send\`
  |     do_something_async().await;
  |                          ^^^^^ await occurs here, with \`mut lock\` maybe used later
`}
          />
          <p>
            Tokio のチュートリアルは、ガードのスコープをブロックで区切り、<code>.await</code> の前に drop する直し方を示しています。さらに、ロック操作を <code>async</code> でない通常の関数に閉じ込める構成を勧めています。ロックを持ったまま制御を手放すと、同じスレッドで動く別のタスクがそのロックを待ってデッドロックする恐れがあるためで、エラーを回避するだけでは危険が残るからです。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            code={`
struct CanIncrement {
    mutex: Mutex<i32>,
}

impl CanIncrement {
    fn increment(&self) {                       // async ではない関数の中で完結
        let mut lock = self.mutex.lock().unwrap();
        *lock += 1;
    }                                           // ここでガードが drop
}

async fn increment_and_do_stuff(can_incr: &CanIncrement) {
    can_incr.increment();
    do_something_async().await;                 // ガードはもう無い
}
`}
          />
          <Callout>
            <p>
              Tokio には <code>tokio::sync::Mutex</code> という非同期版のミューテックスもあり、こちらはガードを <code>.await</code> をまたいで持てます。ただし Tokio のチュートリアルは「async コードの中で無条件に <code>tokio::sync::Mutex</code> を使うのはよくある間違い」と述べ、競合が少なくロックを <code>.await</code> をまたいで持たないなら、標準の <code>std::sync::Mutex</code> で十分だとしています。非同期版は通常の版より高くつきます。<Ref n={7} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'threads-vs-async',
      title: 'スレッドとの使い分け',
      body: (
        <>
          <p>
            公式ブックは「スレッドか async か」という問いに「場合による。多くの場合はスレッドと async の両方だ」と答えています。<Ref n={8} /> 3つの単位の関係を整理します。<Ref n={8} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>単位</th>
                  <th>管理するもの</th>
                  <th>特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>スレッド</td>
                  <td>OS</td>
                  <td>メモリを多く使う。OS とハードウェアの支援が要る。一度始めると完了まで走る</td>
                </tr>
                <tr>
                  <td>タスク</td>
                  <td>ランタイム（実行器）</td>
                  <td>軽量なスレッドのようなもの。await ごとに切り替わる。スレッド間を移動できる</td>
                </tr>
                <tr>
                  <td>Future</td>
                  <td>Rust（コンパイラ）</td>
                  <td>最小の並行性の単位。1つの Future が他の Future の木を含む</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Figure n="30-3" title="スレッド・タスク・Future の階層と使い分け" caption="OS のスレッドの上でランタイムがタスクを動かし、各タスクは Future の木を持つ。CPU を使い切る処理はスレッドへ、待ち時間が中心の処理は async タスクへ。両方必要なら組み合わせる。模式図。">
            <ThreadTaskFigure />
          </Figure>
          <p>公式ブックの目安は次のとおりです。<Ref n={8} /></p>
          <ul>
            <li>並列化しやすく CPU を使い切る処理（大量のデータを分割して処理する）はスレッド。</li>
            <li>多くの発生源から不規則に届くメッセージを扱うような、待ち時間中心の処理は async。</li>
            <li>両方必要なら組み合わせる。たとえば動画のエンコードを専用スレッドで行い、完了を async のチャネルで UI に知らせる。</li>
          </ul>
          <p>
            async の世界で気を付けるべきは、<code>.await</code> の無い長い計算です。Future は <code>await</code> の地点でしか制御を手放さないので、その間のコードは同期的に走り、同じスレッドの他のタスクを飢えさせます。公式ブックはこれを<Term en="cooperative multitasking">協調的マルチタスク</Term>と呼び、「各 Future には長くブロックしない責任がある」と述べています。<Ref n={9} />
          </p>
          <p>
            CPU を使う処理やブロックする I/O（<code>std::fs</code> の読み書きや、同期的なデータベース呼び出し）を async の中で行うときは、<code>tokio::task::spawn_blocking</code> を使います。これは「ブロックしてよい専用のスレッド」でクロージャを動かし、結果を <code>JoinHandle</code> で受け取れるようにするものです。短時間で終わるブロック処理に向き、長く動き続ける仕事には <code>thread::spawn</code> の専用スレッドが勧められています。<Ref n={10} />
          </p>
          <Code
            lang="rust"
            code={`
let sum = tokio::task::spawn_blocking(|| {
    (1..=1_000_000u64).sum::<u64>()   // CPU を使う処理。ランタイムのスレッドを塞がない
})
.await
.unwrap();
`}
          />
          <p>
            非同期版のチャネル（<code>tokio::sync::mpsc</code>）も用意されています。使い方は <ChapterLink n={29} /> の <code>std::sync::mpsc</code> とほぼ同じで、違いは <code>recv()</code> がブロックせずに Future を返す点です。受信側は <code>while let Some(v) = rx.recv().await</code> で回し、送信側がすべて drop されると <code>None</code> が返ってループが終わります。<Ref n={5} />
          </p>
          <Code
            lang="rust"
            code={`
let (tx, mut rx) = tokio::sync::mpsc::channel::<String>(8);   // 容量付き

tokio::spawn(async move {                       // tx を move。終わると drop され、チャネルが閉じる
    for v in ["hi", "from", "the", "task"] {
        tx.send(v.to_string()).await.unwrap();
    }
});

while let Some(v) = rx.recv().await {           // None でループ終了
    println!("received '{v}'");
}
`}
          />
        </>
      ),
    },
    {
      id: 'tauri-preview',
      title: '第5部への橋渡し：Tauri の非同期コマンド',
      body: (
        <>
          <p>
            Tauri の Rust 側には、<code>tauri::async_runtime</code> というモジュールがあります。これは Tauri 自身が内部で使い、開発者にも公開している単一のランタイムで、Tokio の <code>Runtime</code> を用いて <code>setup</code> フックやプラグインの初期化を実行します。<code>spawn</code>、<code>spawn_blocking</code>、<code>block_on</code> といった、この章で学んだのと同じ名前の関数を提供しています。<Ref n={11} />
          </p>
          <p>
            <ChapterLink n={34} /> で学ぶコマンドを <code>async fn</code> として定義すると、Tauri はそれを <code>async_runtime::spawn</code> で別の非同期タスクとして実行します。公式ドキュメントは、重い処理には非同期コマンドが好ましいと述べ、<code>async</code> の付いていないコマンドは <code>#[tauri::command(async)]</code> と書かない限りメインスレッドで実行されると説明しています。<Ref n={12} /> つまり、非同期コマンドの中で <code>.await</code> する間、UI を動かすメインスレッドは塞がれません。注意点が1つあり、非同期コマンドの引数には <code>&str</code> や <code>{"State<'_, T>"}</code> のような借用型をそのまま使えません。公式ドキュメントは、<code>String</code> のような所有型に替えるか、戻り値を <code>Result</code> で包む、という2つの回避策を示しています。<Ref n={12} /> フロントエンド側からは、<code>invoke</code> がもともと Promise を返すので、同期コマンドと同じ書き方で呼べます。<Ref n={12} />
          </p>
          <Code
            lang="rust"
            code={`
// 第34章で詳しく扱う。&str ではなく String で受け取る
#[tauri::command]
async fn my_custom_command(value: String) -> String {
    some_async_function().await;   // この間、メインスレッドは他の仕事ができる
    value
}
`}
          />
          <Callout kind="unverified">
            <p>
              上のコマンドの例は Tauri 公式ドキュメント（v2.tauri.app、Tauri 2.12 時点）に基づく記述で、Tsumugi のサンプルには含まれないため、本書の制作環境では実行して確認していません。<code>async_runtime</code> が Tokio を使うことは docs.rs の記述で確認しましたが、そのランタイムの種類（マルチスレッドかどうか）までは同ページから確認できませんでした。
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
              Tsumugi のコマンドの多くは、<ChapterLink n={29} /> で見た <code>{'State<Mutex<Connection>>'}</code> から接続を取り出して rusqlite を呼ぶ同期的な処理です。rusqlite は同期 API なので、ロックを取ってクエリを実行し、ガードを drop して結果を返す、という流れを <code>async</code> でない通常の関数にまとめます。この章で学んだ「ガードを <code>.await</code> をまたいで持たない」「ロック操作は同期関数に閉じ込める」という作法が、そのまま設計指針になります。
            </p>
            <p>
              一方、Markdown の書き出し・読み込み（<ChapterLink n={49} />）のように、ファイルダイアログを開いてユーザーの選択を待ち、その後にファイルを読み書きする処理は、待ち時間が中心です。こうしたコマンドは <code>async fn</code> にして、ダイアログの Future を <code>.await</code> し、UI を止めないようにします。「CPU や同期 I/O の処理は同期関数に、待ちが中心の処理は <code>async</code> に」という本章の使い分けが、コマンドごとの判断に直結します。
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
            <li>Future は「後で値になるもの」で、<code>poll</code> されるまで何もしない。<code>Pending</code> なら Waker を預けて待ち、<code>wake</code> されたら再び <code>poll</code> され、<code>Ready(値)</code> で完了する。</li>
            <li><code>async fn</code> は Future を返す関数に変換され、<code>.await</code> は <code>poll</code> の繰り返しにコンパイルされる。動かすにはランタイムが必要で、Tokio では <code>#[tokio::main]</code>（<code>Runtime::new</code> と <code>block_on</code>）を使う。</li>
            <li>同じブロック内の <code>await</code> は逐次。<code>join!</code> はその場で同時に待ち、<code>tokio::spawn</code> はタスクとしてランタイムに預ける。<code>spawn</code> に渡す Future は <code>'static + Send</code>。</li>
            <li><code>std::sync::Mutex</code> のガードを <code>.await</code> をまたいで持たない。ロック操作は同期関数に閉じ込める。</li>
            <li>CPU 中心の処理はスレッドか <code>spawn_blocking</code>、待ち時間中心の処理は async タスク。Tauri の非同期コマンドは <code>tauri::async_runtime</code>（Tokio）上のタスクとして動く。</li>
          </ul>
          <p>次章では、ここまで書いてきた Rust コードを守るためのテストと、clippy・rustfmt といった開発ツールを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 17.1: Futures and the Async Syntax',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch17-01-futures-and-syntax.html',
      accessed: '2026-11-08',
      note: 'Future の定義、遅延、後置の await、async fn が Future を返す関数に変換されること、main を async にできない理由とランタイムの必要性の根拠。',
    },
    {
      title: 'std::future::Future - Rust',
      publisher: 'The Rust Project（標準ライブラリドキュメント）',
      url: 'https://doc.rust-lang.org/std/future/trait.Future.html',
      accessed: '2026-11-08',
      note: 'Future トレイトの定義、poll の契約（ブロックしない、Pending 時に Waker を保存、Ready 後は poll しない）の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 17.5: A Closer Look at the Traits for Async',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch17-05-traits-for-async.html',
      accessed: '2026-11-08',
      note: 'Poll 列挙型、Pending と Ready の意味、await が poll のループにコンパイルされること、Pin と Unpin の説明の根拠。',
    },
    {
      title: 'Tokio Tutorial: Hello Tokio',
      publisher: 'Tokio',
      url: 'https://tokio.rs/tokio/tutorial/hello-tokio',
      accessed: '2026-11-08',
      note: 'Cargo.toml の依存指定、#[tokio::main] の展開（Runtime::new と block_on）、async fn の遅延の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 17.2: Applying Concurrency with Async',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch17-02-concurrency-with-async.html',
      accessed: '2026-11-08',
      note: '同一ブロック内の await が逐次であること、join、タスクのハンドルが Future であること、非同期チャネルの recv が制御を返すこと、block_on が同期と非同期の境界であることの根拠。',
    },
    {
      title: 'Tokio Tutorial: Spawning',
      publisher: 'Tokio',
      url: 'https://tokio.rs/tokio/tutorial/spawning',
      accessed: '2026-11-08',
      note: 'tokio::spawn、タスクを非同期のグリーンスレッドと呼ぶこと、軽量さ、JoinHandle と Result、\'static と Send の制約の根拠。',
    },
    {
      title: 'Tokio Tutorial: Shared state',
      publisher: 'Tokio',
      url: 'https://tokio.rs/tokio/tutorial/shared-state',
      accessed: '2026-11-08',
      note: 'MutexGuard を await をまたいで持つと Send でなくなるエラー、スコープで区切る直し方、同期関数に閉じ込める推奨、std::sync::Mutex と tokio::sync::Mutex の使い分けの根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 17.6: Putting It All Together: Futures, Tasks, and Threads',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch17-06-futures-tasks-threads.html',
      accessed: '2026-11-08',
      note: 'スレッド・タスク・Future の階層、使い分けの目安、スレッドと async を組み合わせる例の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 17.3: Working with Any Number of Futures',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch17-03-more-futures.html',
      accessed: '2026-11-08',
      note: 'await 点でのみ制御を手放すこと、協調的マルチタスク、長くブロックしない責任、yield_now の根拠。',
    },
    {
      title: 'tokio::task::spawn_blocking - docs.rs',
      publisher: 'docs.rs（tokio クレート）',
      url: 'https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html',
      accessed: '2026-11-08',
      version: 'tokio 1.x',
      note: 'spawn_blocking がブロック可能なスレッドでクロージャを動かすこと、短時間のブロック処理向けで長期の仕事は専用スレッドが勧められることの根拠。',
    },
    {
      title: 'tauri::async_runtime - docs.rs',
      publisher: 'docs.rs（tauri クレート）',
      url: 'https://docs.rs/tauri/latest/tauri/async_runtime/index.html',
      accessed: '2026-11-08',
      version: 'tauri 2.x',
      note: 'Tauri が使い開発者にも公開する単一のランタイムであること、Tokio の Runtime を用いること、spawn・spawn_blocking・block_on を提供することの根拠。',
    },
    {
      title: 'Calling Rust from the Frontend（Async Commands）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '非同期コマンドが async_runtime::spawn で別タスクとして実行されること、async でないコマンドがメインスレッドで実行されること、借用引数の制約と2つの回避策、invoke が Promise を返すことの根拠。',
    },
    {
      title: 'Promise() constructor - JavaScript | MDN',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise',
      accessed: '2026-11-08',
      note: 'Promise の executor がコンストラクタの呼び出し時点で同期的に実行されること（Rust の Future との対比）の根拠。',
    },
  ],
}

export default chapter
