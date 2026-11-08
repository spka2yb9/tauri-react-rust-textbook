import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 29-1 spawn と join の時間の流れ ---------- */
function SpawnJoinFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="メインスレッドと生成されたスレッドの2本のライフラインを縦に描き、spawn で新しいスレッドが始まり、両者が交互に出力し、join でメインスレッドが相手の終了を待つ流れを示す図">
      <defs>
        <marker id="arrow29a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="160" y="28" fontSize="14" fontWeight="600" textAnchor="middle">メインスレッド</text>
      <text x="480" y="28" fontSize="14" fontWeight="600" textAnchor="middle">生成されたスレッド</text>
      <line x1="160" y1="40" x2="160" y2="280" stroke="var(--fig-line)" strokeWidth="2" />
      <line x1="480" y1="80" x2="480" y2="230" stroke="var(--fig-line)" strokeWidth="2" />
      {/* spawn */}
      <rect x="90" y="48" width="140" height="26" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="160" y="66" fontSize="12" textAnchor="middle">thread::spawn(閉包)</text>
      <path d="M230,61 L470,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow29a)" />
      <text x="350" y="60" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">閉包を持って開始（move）</text>
      {/* 交互の出力 */}
      {[
        { y: 100, x: 160, t: 'main 1' },
        { y: 118, x: 480, t: 'spawned 1' },
        { y: 136, x: 160, t: 'main 2' },
        { y: 154, x: 480, t: 'spawned 2' },
        { y: 172, x: 480, t: 'spawned 3' },
      ].map((m) => (
        <g key={m.y}>
          <rect x={m.x - 45} y={m.y - 11} width="90" height="18" fill={m.x === 160 ? 'var(--fig-box)' : 'var(--fig-box2)'} stroke="var(--fig-line)" rx="3" />
          <text x={m.x} y={m.y + 3} fontSize="11" textAnchor="middle">{m.t}</text>
        </g>
      ))}
      <text x="320" y="140" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">順序は OS のスケジューラが決める</text>
      {/* join */}
      <rect x="90" y="195" width="140" height="26" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="4" />
      <text x="160" y="213" fontSize="12" textAnchor="middle">handle.join()</text>
      <rect x="150" y="221" width="20" height="40" fill="var(--fig-box5)" stroke="var(--fig-line)" />
      <text x="110" y="245" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">待つ（ブロック）</text>
      <circle cx="480" cy="230" r="5" fill="var(--fig-line)" />
      <text x="520" y="234" fontSize="11" fill="var(--fig-muted)">終了</text>
      <path d="M475,232 L172,258" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow29a)" />
      <text x="330" y="262" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">終了を知らせ、join が戻る</text>
      <text x="160" y="292" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">main の続き</text>
    </svg>
  )
}

/* ---------- 図 29-2 チャネルの送受信 ---------- */
function ChannelFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="2つの送信側スレッドが tx と tx1 を使ってチャネルに値を送り、受信側のメインスレッドが rx から順に取り出す図。チャネルは複数生産者・単一消費者で、値の所有権は送信で移動する">
      <defs>
        <marker id="arrow29b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <rect x="20" y="40" width="160" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="100" y="65" fontSize="13" textAnchor="middle">スレッド A</text>
      <text x="100" y="85" fontSize="12" textAnchor="middle" fontFamily="monospace">tx1.send(val)</text>
      <rect x="20" y="150" width="160" height="60" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="100" y="175" fontSize="13" textAnchor="middle">スレッド B</text>
      <text x="100" y="195" fontSize="12" textAnchor="middle" fontFamily="monospace">tx.send(val)</text>
      {/* チャネル */}
      <rect x="250" y="95" width="180" height="60" fill="var(--fig-box)" stroke="var(--fig-line)" rx="8" />
      <text x="340" y="115" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">チャネル（キュー）</text>
      {['hi', 'more', 'from'].map((v, i) => (
        <g key={v}>
          <rect x={262 + i * 54} y="122" width="50" height="24" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="3" />
          <text x={287 + i * 54} y="139" fontSize="11" textAnchor="middle" fontFamily="monospace">{v}</text>
        </g>
      ))}
      <path d="M180,70 C220,70 220,110 248,118" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow29b)" />
      <path d="M180,180 C220,180 220,140 248,132" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow29b)" />
      <path d="M430,125 L478,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow29b)" />
      <rect x="480" y="95" width="140" height="60" fill="var(--fig-box3)" stroke="var(--fig-line)" rx="8" />
      <text x="550" y="120" fontSize="13" textAnchor="middle">メインスレッド</text>
      <text x="550" y="140" fontSize="12" textAnchor="middle" fontFamily="monospace">for v in rx</text>
      <text x="320" y="235" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">mpsc = multiple producer, single consumer。送信側は clone で増やせ、受信側は1つ。send で値の所有権が移る</text>
    </svg>
  )
}

/* ---------- 図 29-3 Arc<Mutex<T>> の共有モデル ---------- */
function ArcMutexFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="複数のスレッドがそれぞれ Arc の複製を持ち、ヒープ上の1つの Mutex を指している図。Mutex の中に守られた値があり、lock を呼んだスレッドだけが MutexGuard を通して値に触れ、他のスレッドは待つ">
      <defs>
        <marker id="arrow29c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {[
        { y: 40, name: 'スレッド 1', state: 'lock() → 取得中', box: 'var(--fig-box4)' },
        { y: 115, name: 'スレッド 2', state: 'lock() → 待機', box: 'var(--fig-box)' },
        { y: 190, name: 'スレッド 3', state: 'lock() → 待機', box: 'var(--fig-box)' },
      ].map((t) => (
        <g key={t.y} fontSize="12">
          <rect x="20" y={t.y} width="180" height="56" fill={t.box} stroke="var(--fig-line)" rx="8" />
          <text x="110" y={t.y + 20} fontSize="13" textAnchor="middle">{t.name}</text>
          <text x="110" y={t.y + 40} textAnchor="middle" fontFamily="monospace">Arc の複製</text>
          <path d={`M200,${t.y + 28} C260,${t.y + 28} 280,150 318,150`} fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow29c)" />
          <text x="110" y={t.y + 70} fontSize="11" fill="var(--fig-muted)" textAnchor="middle">{t.state}</text>
        </g>
      ))}
      {/* ヒープ */}
      <rect x="320" y="60" width="300" height="180" fill="var(--fig-box2)" stroke="var(--fig-line)" rx="8" />
      <text x="470" y="82" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ヒープ（Arc が所有、strong_count = 3）</text>
      <rect x="350" y="95" width="240" height="125" fill="var(--fig-box5)" stroke="var(--fig-line)" rx="8" />
      <text x="470" y="117" fontSize="13" fontWeight="600" textAnchor="middle">{'Mutex<T>'}</text>
      <text x="470" y="135" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">ロック状態：スレッド 1 が保持</text>
      <rect x="390" y="150" width="160" height="50" fill="var(--fig-bg)" stroke="var(--fig-line)" rx="4" />
      <text x="470" y="171" fontSize="12" textAnchor="middle">T（守られる値）</text>
      <text x="470" y="190" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">MutexGuard 経由でのみ触れる</text>
      <text x="320" y="275" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">Arc：所有者を複数にする（スレッド安全な Rc）　Mutex：同時に触れるのを1つにする（スレッド安全な RefCell）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 29,
  part: 4,
  title: '並行処理：スレッドと共有状態',
  summary:
    '複数のスレッドで同時に仕事をする方法を学びます。thread::spawn と join、チャネルによるメッセージ渡し、Arc と Mutex による状態の共有、そしてスレッド安全性をコンパイル時に検査する Send と Sync を、図とコードで理解します。',
  goals: [
    'thread::spawn でスレッドを作り、join で終了を待つコードを書ける',
    'move クロージャが必要な理由と、所有権がスレッド間の安全をどう守るかを説明できる',
    'mpsc チャネルで値を送受信し、送信側を複製して複数の生産者を作れる',
    'Arc<Mutex<T>> で状態を共有し、MutexGuard のスコープでロックが解放されることを説明できる',
    'Send と Sync の意味を説明し、Rc や RefCell がスレッドをまたげない理由を言える',
  ],
  prerequisites: [19, 20, 27, 28],
  sections: [
    {
      id: 'intro',
      title: 'Rust が「恐れない並行性」と呼ぶもの',
      body: (
        <>
          <p>
            JavaScript は原則として1つのスレッドで動き、並行性はイベントループと Promise で表現します（<ChapterLink n={3} />）。Rust ではそれに加えて、OS が提供する<Term en="thread">スレッド</Term>を直接使い、複数の処理を本当に同時に走らせることができます。複数の CPU コアを活用できる反面、スレッド間で同じメモリに触れる場面で、データ競合や解放済みメモリへのアクセスといった難しいバグが生まれます。
          </p>
          <p>
            Rust の特徴は、所有権と型システムがこれらのバグの多くをコンパイル時に捕まえることです。公式ブックはこれを「恐れない並行性」と呼びます。この章で見ていくエラーメッセージの多くは、「本番で落ちるはずだったバグをコンパイラが先に見つけた」ものです。<Ref n={1} />
          </p>
          <p>
            この章は、スレッドの作り方（<code>spawn</code> と <code>join</code>）、スレッド間で値を渡す2つの方法（メッセージ渡しと共有状態）、そしてそれを支える2つのトレイト（<code>Send</code> と <code>Sync</code>）の順に進みます。<ChapterLink n={28} /> の <code>Rc</code> と <code>RefCell</code> が、ここでは <code>Arc</code> と <code>Mutex</code> に置き換わります。
          </p>
        </>
      ),
    },
    {
      id: 'spawn',
      title: 'thread::spawn と join',
      body: (
        <>
          <p>新しいスレッドは <code>thread::spawn</code> にクロージャを渡して作ります。<Ref n={1} /></p>
          <Code
            lang="rust"
            code={`
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();   // 生成したスレッドが終わるまで待つ
}
`}
          />
          <p>
            <code>spawn</code> は <code>{'JoinHandle<T>'}</code> を返します。<code>join</code> を呼ぶと、そのスレッドが終わるまで現在のスレッドが止まります（これを<Term en="blocking">ブロック</Term>と呼びます）。<code>join</code> を呼ばずにメインスレッドが終わると、生成したスレッドは途中でも打ち切られます。<Ref n={1} /> 出力が交互に現れるかどうかは OS のスケジューラ次第で、実行のたびに変わります。次の図は、この流れをライフラインで表したものです。
          </p>
          <Figure n="29-1" title="spawn と join の時間の流れ" caption="spawn でクロージャが新しいスレッドに渡され、2本のスレッドが交互に進む。join を呼んだメインスレッドは相手の終了までブロックされる。模式図。出力の順序は実行ごとに変わる。">
            <SpawnJoinFigure />
          </Figure>
          <p>
            <code>join</code> を <code>for</code> の前に移すと、メインスレッドはまず相手の終了を待つので、出力は交互にならず順番になります。「<code>join</code> をどこで呼ぶか」という小さな違いが、スレッドが同時に動くかどうかを左右します。<Ref n={1} />
          </p>
          <h3>move クロージャが必要になる理由</h3>
          <p>メインスレッドの変数を生成したスレッドで使おうとすると、次のエラーになります。<Ref n={1} /></p>
          <Code
            lang="rust"
            code={`
let v = vec![1, 2, 3];

let handle = thread::spawn(|| {
    println!("Here's a vector: {v:?}");   // v を借用している
});
`}
          />
          <Code
            lang="text"
            code={`
error[E0373]: closure may outlive the current function, but it borrows \`v\`,
              which is owned by the current function
  |
  |     let handle = thread::spawn(|| {
  |                                ^^ may outlive borrowed value \`v\`
  |         println!("Here's a vector: {v:?}");
  |                                     - \`v\` is borrowed here
  |
note: function requires argument type to outlive \`'static\`
help: to force the closure to take ownership of \`v\` (and any other referenced
      variables), use the \`move\` keyword
`}
          />
          <p>
            クロージャは <code>println!</code> に必要な参照だけを捕捉しようとします（<ChapterLink n={27} />）。しかし新しいスレッドがいつまで動くかをコンパイラは知らないので、<code>v</code> がスレッドより先に drop されない保証がありません。だから <code>spawn</code> の引数には <code>'static</code>（<ChapterLink n={26} />）が要求されます。解決は、提案どおり <code>move</code> で所有権ごとスレッドに渡すことです。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let v = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Here's a vector: {v:?}");   // v の所有者はこのスレッド
});

handle.join().unwrap();
// println!("{v:?}");  ← ここで v を使うと E0382（move 済み）
`}
          />
          <p>
            <code>move</code> した後にメインスレッドで <code>v</code> を使おうとすれば E0382 になります。「スレッドに渡したものは、もうこちらでは使わない」という約束を、所有権がそのまま表しています。<Ref n={1} />
          </p>
          <Callout>
            <p>
              Rust 1.63 以降の標準ライブラリには <code>thread::scope</code> があります。スコープ内で生成したスレッドはスコープの終わりで必ず <code>join</code> されるため、<code>'static</code> でない値（ローカル変数）を借用できます。「この関数の中だけで並列に処理して結果をまとめたい」ときは、<code>move</code> と <code>Arc</code> を使わずに済むので便利です。<Ref n={5} />
            </p>
          </Callout>
          <Code
            lang="rust"
            code={`
let mut a = vec![1, 2, 3];
let mut x = 0;

thread::scope(|s| {
    s.spawn(|| println!("first: {a:?}"));   // a を借用できる
    s.spawn(|| x += a[0] + a[2]);          // x を可変借用できる
});                                         // ここで両方 join される

a.push(4);           // 借用は終わっているので再び使える
assert_eq!(x, a.len());
`}
          />
        </>
      ),
    },
    {
      id: 'channel',
      title: 'メッセージ渡し：チャネル',
      body: (
        <>
          <p>
            スレッド間で値をやり取りする方法の1つ目は、<Term en="message passing">メッセージ渡し</Term>です。公式ブックは Go 言語の標語「メモリを共有して通信するな。通信してメモリを共有せよ」を引いています。<Ref n={2} /> 標準ライブラリの <code>std::sync::mpsc</code> が提供する
            <Term en="channel">チャネル</Term>
            は、送信側 <code>tx</code> と受信側 <code>rx</code> の2つの半分からなります。<code>mpsc</code> は multiple producer, single consumer の略で、送信側は複数作れますが受信側は1つです。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {               // tx を新しいスレッドへ move
        let val = String::from("hi");
        tx.send(val).unwrap();            // send は Result を返す
    });

    let received = rx.recv().unwrap();    // 値が届くまでブロック
    println!("Got: {received}");
}
`}
          />
          <p>
            <code>send</code> は値の所有権を奪います。送った後に <code>val</code> を使おうとすると E0382 です。別のスレッドが値を変更したり drop したりするかもしれないので、こちらで使い続けるのは危険だとコンパイラが止めています。<Ref n={2} /> 受信側には2つのメソッドがあります。
          </p>
          <ul>
            <li><code>recv()</code>：値が届くまでブロックする。送信側がすべて drop されると <code>Err</code> を返し、もう値は来ないと知らせる。</li>
            <li><code>try_recv()</code>：ブロックせず、値があれば <code>Ok</code>、なければ即座に <code>Err</code>。他の仕事をしながら定期的に確認するループに向く。</li>
          </ul>
          <p>
            <code>rx</code> はイテレータとしても使えます。<code>for received in rx</code> と書くと値ごとにブロックし、チャネルが閉じると（すべての <code>tx</code> が drop されると）ループが終わります。送信側は <code>clone</code> で増やせます。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();                          // 2つ目の送信側
thread::spawn(move || {
    for val in ["hi", "from", "the", "thread"] {
        tx1.send(val.to_string()).unwrap();
        thread::sleep(Duration::from_millis(10));
    }
});                                            // tx1 はここで drop

thread::spawn(move || {
    for val in ["more", "messages"] {
        tx.send(val.to_string()).unwrap();
        thread::sleep(Duration::from_millis(10));
    }
});                                            // tx はここで drop

for received in rx {                           // 両方が drop されると終わる
    println!("Got: {received}");
}
`}
          />
          <Figure n="29-2" title="チャネルによるメッセージ渡し" caption="2つのスレッドが複製した送信側から値を送り、受信側は1つ。値は送信で所有権ごと移動し、受信側は届いた順に取り出す。模式図。到着順は実行ごとに変わる。">
            <ChannelFigure />
          </Figure>
          <p>
            チャネルのよいところは、値の持ち主が常に1つであることです。送ったら手放し、受け取ったら自分のものになる。ロックを意識する必要がなく、「作業スレッドが結果をメインスレッドに報告する」「UI スレッドに進捗を知らせる」といった形に自然に合います。
          </p>
        </>
      ),
    },
    {
      id: 'shared-state',
      title: '共有状態：Mutex と Arc',
      body: (
        <>
          <p>
            2つ目の方法は、複数のスレッドが同じメモリに触れる<Term en="shared-state concurrency">共有状態の並行性</Term>です。所有権の言葉でいえば「複数の所有者」であり、同時に触れるのを1つに制限する道具が必要です。それが
            <Term en="mutex">ミューテックス</Term>
            （mutual exclusion、相互排他）です。<Ref n={3} />
          </p>
          <p>ミューテックスを使うときの約束は2つあります。データに触る前にロックを取ること、使い終わったらロックを返すことです。Rust ではどちらも型が面倒を見てくれます。<Ref n={3} /></p>
          <Code
            lang="rust"
            code={`
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();   // ロックを取る。MutexGuard が返る
        *num = 6;                          // Deref で中の値に触れる
    }                                      // num が drop され、ロックが返る

    println!("m = {m:?}");                 // Mutex { data: 6, poisoned: false, .. }
}
`}
          />
          <p>
            <code>m</code> の型は <code>{'Mutex<i32>'}</code> であって <code>i32</code> ではないので、<code>lock</code> を呼ばなければ中身に触れません（約束1を型が強制）。<code>lock</code> が返す <code>MutexGuard</code> は <code>Deref</code> と <code>Drop</code> を実装したスマートポインタで、スコープを抜けると自動でロックを返します（約束2を <code>Drop</code> が保証）。<Ref n={3} /> <code>lock().unwrap()</code> の <code>unwrap</code> は、ロックを持ったスレッドが panic したときの
            <Term en="poisoning">毒化</Term>
            に対するものです。毒化は「別のスレッドが不変条件を壊したまま落ちたかもしれない」という警告で、<code>PoisonError::into_inner</code> で無視して取り出すこともできます。<Ref n={6} />
          </p>
          <h3>複数スレッドで共有する：Arc</h3>
          <p>
            10 本のスレッドでカウンタを増やしてみます。<code>Mutex</code> を <code>move</code> で各スレッドに渡すと、最初のスレッドで move された後は使えません（E0382）。<ChapterLink n={28} /> の <code>Rc</code> で包めば複数の所有者を作れそうですが、今度は別のエラーになります。<Ref n={3} />
          </p>
          <Code
            lang="text"
            code={`
error[E0277]: \`Rc<std::sync::Mutex<i32>>\` cannot be sent between threads safely
  = help: within \`{closure@src/main.rs:11:36: 11:43}\`, the trait \`Send\`
          is not implemented for \`Rc<std::sync::Mutex<i32>>\`
`}
          />
          <p>
            <code>Rc</code> はカウントの増減をスレッド安全に行わないので、スレッドをまたいで送れません。代わりに使うのが <code>{'Arc<T>'}</code>（atomically reference counted）です。API は <code>Rc</code> と同じで、カウントの更新だけがアトミック操作になっています。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);        // 所有者を1つ増やす
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });                                        // ここでロックが返る
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());   // Result: 10
}
`}
          />
          <Figure n="29-3" title="Arc<Mutex<T>> の共有モデル" caption="各スレッドは Arc の複製を持ち、ヒープ上の1つの Mutex を指す。lock を取ったスレッドだけが MutexGuard 経由で値に触れ、他は待つ。Arc は所有者を増やし、Mutex は同時アクセスを1つに絞る。模式図。">
            <ArcMutexFigure />
          </Figure>
          <p>
            図のとおり、<code>Arc</code> と <code>Mutex</code> は役割が違います。<code>Arc</code> は「誰が持ち主か」を複数にし、<code>Mutex</code> は「誰が今触っているか」を1つにします。<code>counter</code> 自体は不変の束縛なのに中の値を変えられるので、<code>Mutex</code> は <code>RefCell</code> と同じく内部可変性を提供しているといえます。単一スレッドの <code>{'Rc<RefCell<T>>'}</code> に対応するスレッド版が <code>{'Arc<Mutex<T>>'}</code> です。<Ref n={3} />
          </p>
          <p>
            なぜ標準の型がすべて <code>Arc</code> を使わないかといえば、スレッド安全にはコストがあるからです。単一スレッドで済む場面では <code>Rc</code> のほうが速く動きます。<Ref n={3} /> また、<code>Mutex</code> はデッドロック（2つのロックを互いに待ち合って止まる）を防いではくれません。ロックを取る順序を揃える、ロックの保持区間を短くする、といった設計上の注意は依然として必要です。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'send-sync',
      title: 'Send と Sync',
      body: (
        <>
          <p>
            先ほどの E0277 に出てきた <code>Send</code> は、Rust の並行性の安全を支える2つの
            <Term en="marker trait">マーカートレイト</Term>
            の1つです。マーカートレイトはメソッドを持たず、「この型はこの文脈で使って安全だ」という印をコンパイラに伝えるためだけに存在します。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>トレイト</th>
                  <th>意味</th>
                  <th>実装しない代表例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Send</code></td>
                  <td>値の所有権を別のスレッドへ移してよい</td>
                  <td><code>{'Rc<T>'}</code>、生ポインタ</td>
                </tr>
                <tr>
                  <td><code>Sync</code></td>
                  <td>複数のスレッドから参照してよい。<code>T: Sync</code> は <code>&T: Send</code> と同じ意味</td>
                  <td><code>{'Rc<T>'}</code>、<code>{'RefCell<T>'}</code>、<code>{'Cell<T>'}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            ほとんどの型は <code>Send</code> かつ <code>Sync</code> です。<code>Send</code> な型だけで組み立てた型は自動で <code>Send</code> になり、<code>Sync</code> も同様です。<code>Rc</code> が除外されるのは、カウントの更新が競合するからです。<code>RefCell</code> が <code>Sync</code> でないのは、実行時の借用カウントがスレッド安全でないからで、その代わりが <code>Mutex</code>（<code>Sync</code>）です。<Ref n={4} />
          </p>
          <p>
            これらのトレイトを手で実装するには <code>unsafe</code> が必要です（<ChapterLink n={32} />）。生ポインタを含む型を自分でスレッド安全にするような特殊な場合を除き、自分で実装することはまずありません。「<code>spawn</code> に渡す値は <code>Send + 'static</code>」「スレッド間で共有する参照の中身は <code>Sync</code>」という2つの要求を、コンパイラが型を見て検査してくれる、と理解しておけば十分です。<Ref n={4} />
          </p>
          <div className="compare">
            <div>
              <h4>単一スレッド</h4>
              <ul>
                <li>複数の所有者：<code>{'Rc<T>'}</code></li>
                <li>内側からの変更：<code>{'RefCell<T>'}</code>（実行時に借用を検査、違反で panic）</li>
                <li>組み合わせ：<code>{'Rc<RefCell<T>>'}</code></li>
              </ul>
            </div>
            <div>
              <h4>複数スレッド</h4>
              <ul>
                <li>複数の所有者：<code>{'Arc<T>'}</code>（Send + Sync）</li>
                <li>内側からの変更：<code>{'Mutex<T>'}</code>（ロックで直列化、違反は待ち）</li>
                <li>組み合わせ：<code>{'Arc<Mutex<T>>'}</code></li>
              </ul>
            </div>
          </div>
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
              Tsumugi の Rust 側では、SQLite の接続 <code>rusqlite::Connection</code> をアプリ全体で1つ持ち、すべてのコマンドから使います。<code>Connection</code> は <code>Sync</code> ではなく、Tauri が管理する State は複数のスレッドから共有されうるので、接続を <code>{'Mutex<Connection>'}</code> で包み、<ChapterLink n={36} /> で学ぶ <code>tauri::State</code> に登録します。<code>State</code> に登録できる型は <code>Send + Sync + 'static</code> でなければならず、<code>Connection</code> を <code>Mutex</code> で包むことでこの条件を満たします。<Ref n={7} /> コマンドの中では <code>state.db.lock()</code> でガードを取り、問い合わせが終わってガードが drop されるまで他のコマンドは待ちます。 下の例は仕組みを示すための簡略版で、完成版の Tsumugi では <code>{'Db(pub Mutex<Connection>)'}</code> というタプル構造体を <code>State</code> に登録し、<code>with_db</code> というヘルパー関数がロックの取得とエラー変換をまとめて行います（<ChapterLink n={42} />）。
            </p>
            <p>
              Tauri 側が <code>State</code> の所有と共有を引き受けてくれるので、Tsumugi のコードに <code>Arc</code> が直接現れる場面は多くありません。しかし「<code>Mutex</code> で守られた接続を、複数の呼び出しが順番に使う」というモデルは、この章の <code>{'Arc<Mutex<T>>'}</code> そのものです。次のコードは、Tauri に依存しない形でその骨格を再現したものです。
            </p>
          </Callout>
          <Code
            lang="rust"
            code={`
use std::sync::{Arc, Mutex};
use std::thread;

struct Connection { rows: u32 }                     // rusqlite::Connection の代わり
impl Connection {
    fn execute(&mut self, _sql: &str) { self.rows += 1; }
}

struct AppState {
    db: Mutex<Connection>,                           // 第36章では State<AppState> に載せる
}

fn main() {
    let state = Arc::new(AppState { db: Mutex::new(Connection { rows: 0 }) });

    let handles: Vec<_> = (0..4).map(|_| {
        let state = Arc::clone(&state);
        thread::spawn(move || {                      // コマンドが別スレッドで呼ばれる状況
            let mut conn = state.db.lock().unwrap();
            conn.execute("INSERT INTO pages ...");
        })                                           // ガードが drop → 次の呼び出しへ
    }).collect();

    for h in handles { h.join().unwrap(); }
    println!("rows = {}", state.db.lock().unwrap().rows);   // rows = 4
}
`}
          />
          <p>
            ロックの保持区間を短くする、という設計上の注意はそのまま当てはまります。長い処理（ファイルの書き出しなど）をロックを持ったまま行うと、他のコマンドがすべて待たされます。次章で学ぶ非同期コマンドでは、この点がさらに重要になります。
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
            <li><code>thread::spawn</code> はクロージャを新しいスレッドで動かし、<code>JoinHandle</code> の <code>join</code> で終了を待つ。メインスレッドが終わると他のスレッドも打ち切られる。</li>
            <li>スレッドに渡すクロージャは <code>'static</code> が要求されるため、外の変数は <code>move</code> で所有権ごと渡す。<code>thread::scope</code> なら借用のまま使える。</li>
            <li><code>mpsc::channel</code> は複数生産者・単一消費者のチャネル。<code>send</code> で所有権が移り、<code>rx</code> をイテレートすると閉じるまで受け取れる。</li>
            <li><code>{'Mutex<T>'}</code> は <code>lock</code> で <code>MutexGuard</code> を返し、スコープ終了で自動解放。<code>{'Arc<T>'}</code> はスレッド安全な <code>Rc</code>。<code>{'Arc<Mutex<T>>'}</code> が共有状態の基本形。</li>
            <li><code>Send</code>（所有権を移してよい）と <code>Sync</code>（参照を共有してよい）はマーカートレイトで、コンパイラがスレッド安全性を検査する。<code>Rc</code> と <code>RefCell</code> は対象外。</li>
          </ul>
          <p>次章では、スレッドを増やさずに多くの待ち時間を扱う仕組み、<code>async</code>/<code>await</code> と Tokio ランタイムを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, Chapter 16.1: Using Threads to Run Code Simultaneously',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch16-01-threads.html',
      accessed: '2026-11-08',
      note: 'thread::spawn、JoinHandle と join、出力の順序、move クロージャと E0373、E0382 の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 16.2: Using Message Passing to Transfer Data Between Threads',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch16-02-message-passing.html',
      accessed: '2026-11-08',
      note: 'Go の標語、mpsc::channel、send/recv/try_recv、送信後の所有権、tx.clone による複数生産者の根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 16.3: Shared-State Concurrency',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch16-03-shared-state.html',
      accessed: '2026-11-08',
      note: 'Mutex と lock、MutexGuard、Rc が Send でないエラー、Arc、RefCell/Rc と Mutex/Arc の対応、デッドロックの根拠。',
    },
    {
      title: 'The Rust Programming Language, Chapter 16.4: Extensible Concurrency with the Send and Sync Traits',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch16-04-extensible-concurrency-sync-and-send.html',
      accessed: '2026-11-08',
      note: 'Send と Sync の定義、Rc・RefCell・Cell・生ポインタが除外される理由、自動実装、手動実装が unsafe である根拠。',
    },
    {
      title: 'std::thread::scope - Rust',
      publisher: 'The Rust Project（標準ライブラリドキュメント）',
      url: 'https://doc.rust-lang.org/std/thread/fn.scope.html',
      accessed: '2026-11-08',
      version: 'Rust 1.63.0 で安定化',
      note: 'スコープ付きスレッドが非 \'static の値を借用でき、スコープの終わりで自動的に join される根拠。',
    },
    {
      title: 'std::sync::Mutex - Rust',
      publisher: 'The Rust Project（標準ライブラリドキュメント）',
      url: 'https://doc.rust-lang.org/std/sync/struct.Mutex.html',
      accessed: '2026-11-08',
      note: '毒化（poisoning）の意味、PoisonError::into_inner、lock と try_lock、ガードの drop でロックが返る根拠。',
    },
    {
      title: 'tauri::State - docs.rs',
      publisher: 'docs.rs（tauri クレート）',
      url: 'https://docs.rs/tauri/latest/tauri/struct.State.html',
      accessed: '2026-11-08',
      version: 'tauri 2.x',
      note: 'コマンド引数として使う State<T> の T に Send + Sync + \'static が要求される根拠。',
    },
  ],
}

export default chapter
