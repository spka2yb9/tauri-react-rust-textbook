import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 36-1 State と Mutex とスレッド ---------- */
function StateMutexFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="Tauri が管理する状態 Mutex<Connection> を中央に置き、メインスレッドと非同期ランタイムの複数のタスクから State 経由で参照する図。各コマンドは lock でガードを取り、ガードを持つ間だけ接続を使い、ガードが drop されると次のコマンドがロックを取れる">
      <defs>
        <marker id="arrow36a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* 管理される状態 */}
      <rect x="200" y="20" width="240" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="320" y="44" fontSize="14" fontWeight="600" textAnchor="middle">Tauri が管理する状態</text>
      <rect x="220" y="55" width="200" height="44" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="320" y="73" fontSize="13" textAnchor="middle" fontFamily="monospace">Mutex&lt;Connection&gt;</text>
      <text x="320" y="91" fontSize="11" textAnchor="middle" fill="var(--fig-muted)">manage() で登録。型ごとに1つ</text>
      {/* スレッド・タスク */}
      {[
        { x: 40, label: 'メインスレッド', sub: '同期コマンド', fill: 'var(--fig-box)' },
        { x: 240, label: '非同期タスク A', sub: 'async コマンド', fill: 'var(--fig-box4)' },
        { x: 440, label: '非同期タスク B', sub: 'async コマンド', fill: 'var(--fig-box4)' },
      ].map((t) => (
        <g key={t.x} fontSize="12">
          <rect x={t.x} y="170" width="160" height="60" rx="6" fill={t.fill} stroke="var(--fig-line)" />
          <text x={t.x + 80} y="193" textAnchor="middle" fontSize="13">{t.label}</text>
          <text x={t.x + 80} y="213" textAnchor="middle" fill="var(--fig-muted)">{t.sub}</text>
          <path d={`M${t.x + 80},168 L${t.x + 80},128`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow36a)" />
        </g>
      ))}
      <text x="120" y="150" fontSize="11" textAnchor="middle" fill="var(--fig-muted)">State&lt;'_, …&gt;</text>
      <text x="320" y="150" fontSize="11" textAnchor="middle" fill="var(--fig-muted)">State&lt;'_, …&gt;</text>
      <text x="520" y="150" fontSize="11" textAnchor="middle" fill="var(--fig-muted)">State&lt;'_, …&gt;</text>
      <line x1="200" y1="128" x2="440" y2="128" stroke="var(--fig-line)" />
      {/* ロックの時間軸 */}
      <text x="40" y="262" fontSize="12">lock() の順:</text>
      <rect x="140" y="250" width="120" height="18" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="200" y="263" fontSize="11" textAnchor="middle">メイン が保持</text>
      <rect x="265" y="250" width="120" height="18" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="325" y="263" fontSize="11" textAnchor="middle">A が保持</text>
      <rect x="390" y="250" width="120" height="18" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="450" y="263" fontSize="11" textAnchor="middle">B が保持</text>
      <path d="M140,280 L510,280" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow36a)" />
      <text x="325" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">同時に持てるのは1つ。ガードが drop されると次が取れる。模式図</text>
    </svg>
  )
}

/* ---------- 図 36-3 ライフサイクル ---------- */
function LifecycleFigure() {
  const steps = [
    { x: 20, label: 'Builder', sub: 'manage / plugin', sub2: '/ invoke_handler', fill: 'var(--fig-box)' },
    { x: 175, label: 'setup', sub: 'App を受け取り初期化', fill: 'var(--fig-box2)' },
    { x: 330, label: 'run', sub: 'イベントループ', sub2: 'Ready → 各種イベント', fill: 'var(--fig-box4)' },
    { x: 485, label: '終了', sub: 'ExitRequested → Exit', fill: 'var(--fig-box5)' },
  ]
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Tauri アプリのライフサイクル。Builder で設定し、setup で初期化し、run でイベントループに入り、ウィンドウイベントや ExitRequested を経て Exit で終了する流れ。CloseRequested では prevent_close、ExitRequested では prevent_exit で止められる">
      <defs>
        <marker id="arrow36b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {steps.map((s, i) => (
        <g key={s.x} fontSize="12">
          <rect x={s.x} y="40" width="135" height="76" rx="8" fill={s.fill} stroke="var(--fig-line)" />
          <text x={s.x + 67} y="62" textAnchor="middle" fontSize="13" fontWeight="600">{s.label}</text>
          <text x={s.x + 67} y="84" textAnchor="middle" fill="var(--fig-muted)">{s.sub}</text>
          {'sub2' in s && <text x={s.x + 67} y="100" textAnchor="middle" fill="var(--fig-muted)">{s.sub2}</text>}
          {i < steps.length - 1 && <path d={`M${s.x + 135},72 L${s.x + 153},72`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow36b)" />}
        </g>
      ))}
      {/* run の中身 */}
      <rect x="40" y="130" width="560" height="110" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="60" y="152" fontSize="12" fill="var(--fig-muted)">run の中で届くイベント（RunEvent）の例</text>
      <g fontSize="12">
        <rect x="60" y="165" width="120" height="30" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="120" y="185" textAnchor="middle">Ready</text>
        <rect x="200" y="165" width="200" height="30" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="300" y="185" textAnchor="middle">WindowEvent {'{ label, event }'}</text>
        <rect x="420" y="165" width="160" height="30" rx="4" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="500" y="185" textAnchor="middle">ExitRequested {'{ api }'}</text>
        <text x="290" y="215" textAnchor="middle" fill="var(--fig-muted)">CloseRequested なら api.prevent_close() で</text>
        <text x="290" y="231" textAnchor="middle" fill="var(--fig-muted)">閉じるのを止められる</text>
        <text x="510" y="215" textAnchor="middle" fill="var(--fig-muted)">api.prevent_exit()</text>
      </g>
      <text x="320" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">run は戻らず、終了時に std::process::exit でプロセスを終える。後処理は Exit で行う。模式図</text>
    </svg>
  )
}

/* ---------- 図 36-2 macOS での保存先 ---------- */
function PathsFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="macOS でのアプリのデータ保存先の構造。ホームの Library/Application Support の下に bundle identifier 名のフォルダがあり、それが app_data_dir と app_config_dir になる。その中に tsumugi.db と attachments を置く。ログは Library/Logs の下の identifier 名のフォルダ">
      <g fontSize="13" fontFamily="monospace">
        <text x="30" y="40">$HOME/Library/</text>
        <text x="60" y="68">├── Application Support/</text>
        <text x="90" y="96">│   └── dev.example.tsumugi/</text>
        <text x="120" y="124">│       ├── tsumugi.db</text>
        <text x="120" y="152">│       └── attachments/</text>
        <text x="60" y="180">└── Logs/</text>
        <text x="90" y="208">    └── dev.example.tsumugi/</text>
      </g>
      <g fontSize="12" fill="var(--fig-muted)">
        <rect x="400" y="80" width="220" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="510" y="97" textAnchor="middle" fill="var(--fig-text)">app_data_dir() = app_config_dir()</text>
        <rect x="400" y="192" width="220" height="24" rx="4" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="510" y="209" textAnchor="middle" fill="var(--fig-text)">app_log_dir()</text>
      </g>
      <text x="320" y="245" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">macOS では data_dir と config_dir が同じ場所を指す。Windows と Linux では別の場所になる。模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 36,
  part: 5,
  title: '状態管理とライフサイクル',
  summary:
    'データベース接続のようにアプリ全体で共有する値は、Tauri が管理する状態として Core プロセスに置きます。manage と State、Mutex による変更、非同期コマンドでの注意、AppHandle と Manager トレイト、app_data_dir などの保存先、そして setup から run、終了までのライフサイクルを扱います。',
  goals: [
    'manage で登録した状態を State としてコマンドで受け取れる',
    'Mutex で状態を変更する形と、ガードが drop されるまでロックが続くことを説明できる',
    '非同期コマンドで std::sync::Mutex と tokio::sync::Mutex をどう使い分けるかを判断できる',
    'AppHandle と Manager トレイトを使い、コマンドの外から状態やパスにアクセスできる',
    'app_data_dir などの保存先が OS ごとにどこになるかを言える',
    'setup、run、on_window_event、RunEvent による起動から終了までの流れを追える',
  ],
  prerequisites: [19, 20, 28, 29, 30, 33, 34],
  sections: [
    {
      id: 'where-state-lives',
      title: 'アプリの状態はどこに置くか',
      body: (
        <>
          <p>
            <ChapterLink n={33} /> で、公式ドキュメントが設定やデータベース接続などのグローバルな状態を Core プロセスに置くよう勧めていることを見ました。では、Rust 側でそれをどう持てばよいのでしょうか。コマンドは独立した関数なので、関数の外に置いた値を複数のコマンドから参照する仕組みが必要です。さらに、<ChapterLink n={34} /> で見たとおり、コマンドはメインスレッドでも非同期タスクでも動きます。つまり、複数のスレッドから同時に触られる可能性があります。
          </p>
          <p>
            これは <ChapterLink n={29} /> で学んだ「共有状態」の問題そのものです。Rust では、スレッド間で共有する値は <code>Send + Sync</code> でなければならず、変更するには <code>Mutex</code> のような内部可変性（<ChapterLink n={28} />）が要ります。Tauri はこの問題に、<Term en="managed state">管理される状態</Term>という仕組みで答えます。<code>manage</code> で登録した値を Tauri が保持し、コマンドの引数 <code>State</code> やハンドルの <code>state()</code> から参照できるようにするものです。<Ref n={1} />
          </p>
          <p>
            この章の後半では、状態と並んで「アプリが起動してから終了するまで」の流れを扱います。データベースを開くのは起動時、閉じるのは終了時であり、状態管理とライフサイクルは切り離せないからです。
          </p>
        </>
      ),
    },
    {
      id: 'manage-and-state',
      title: 'manage と State',
      body: (
        <>
          <p>
            状態の登録は <code>Builder::manage</code> か、<code>setup</code> の中で <code>app.manage</code> を呼ぶ形で行います。docs.rs の説明によると、<code>manage</code> の型引数 <code>T</code> には <code>Send + Sync + 'static</code> の境界があり、同じ型 <code>T</code> を2回登録することはできません。<code>Builder::manage</code> は同じ型が既にあるとパニックし、<code>Manager::manage</code> は <code>false</code> を返して何もしません。<Ref n={2} /><Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="setup の中で登録し、コマンドで受け取る"
            code={`
use tauri::{Manager, State};

struct AppData {
    welcome_message: &'static str,
}

#[tauri::command]
fn greet(state: State<'_, AppData>) -> String {
    state.welcome_message.to_string()
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(AppData { welcome_message: "Welcome to Tauri!" });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            コマンド側の <code>State&lt;'_, AppData&gt;</code> は、登録済みの <code>AppData</code> への参照を包んだ型です。<ChapterLink n={26} /> で学んだライフタイムの省略記法 <code>'_</code> を使い、「コマンドが動いている間だけ借りる」ことを表します。<code>State</code> は <code>Deref</code> を実装しているので、<code>state.welcome_message</code> のように中身へ直接アクセスできます。
          </p>
          <Callout kind="warn">
            <p>
              <code>State</code> の型を間違えてもコンパイルエラーにはなりません。公式ドキュメントによると、間違った型を <code>State</code> で受け取ると実行時にフロントエンドの <code>invoke</code> が <code>state not managed for field ...</code> というエラーで拒否され、<code>Manager::state()</code> で直接取り出した場合はパニックします。<Ref n={1} /> 型は <code>manage</code> したものと厳密に同じでなければならず、<code>Mutex&lt;AppState&gt;</code> を登録したのに <code>State&lt;AppState&gt;</code> で受けるのは間違いです。公式ドキュメントは、<code>type AppState = Mutex&lt;AppStateInner&gt;;</code> のような型エイリアスを使い、二重に <code>Mutex</code> で包まないよう勧めています。<Ref n={1} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'mutex',
      title: 'Mutex で状態を変更する',
      body: (
        <>
          <p>
            前節の <code>AppData</code> は読むだけでした。変更したい場合、<code>State</code> は共有参照なので直接は書き換えられません。公式ドキュメントは「複数のスレッドで共有される値は直接は変更できない」と述べ、<code>Mutex</code> で包む形を示しています。<Ref n={1} /> docs.rs の <code>Builder::manage</code> の説明も、変更は内部可変性を通してのみ可能だと明記しています。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            title="Mutex で包んだ状態を変更する"
            code={`
use std::sync::Mutex;
use tauri::{Manager, State};

#[derive(Default)]
struct AppState {
    counter: u32,
}

#[tauri::command]
fn increase_counter(state: State<'_, Mutex<AppState>>) -> u32 {
    let mut state = state.lock().unwrap();
    state.counter += 1;
    state.counter
    // ここでガードが drop され、ロックが外れる
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::default()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![increase_counter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            <code>lock()</code> はロックを取って <code>MutexGuard</code> を返します。ガードはスコープを抜けると自動で drop され、そのときロックが外れます。<Ref n={1} /> <ChapterLink n={29} /> で学んだ仕組みがそのまま使われています。<code>unwrap()</code> は、別のスレッドがロック中にパニックした場合（毒された状態）にエラーになる可能性に対するもので、公式ドキュメントの例もそのまま <code>unwrap()</code> しています。<Ref n={1} />
          </p>
          <Figure n="36-1" title="管理される状態と Mutex とスレッドの関係" caption="中央の Mutex<Connection> を、メインスレッドの同期コマンドと非同期タスクの async コマンドが State を介して参照する。ロックを持てるのは同時に1つで、ガードが drop されると次のコマンドが取れる。模式図。">
            <StateMutexFigure />
          </Figure>
          <p>
            図 36-1 から読み取れることは2つです。1つ目は、<code>Arc</code> が要らないことです。<ChapterLink n={29} /> では <code>Arc&lt;Mutex&lt;T&gt;&gt;</code> の組み合わせを使いましたが、公式ドキュメントは「<code>State</code> で管理される状態については Tauri が共有を引き受けるので <code>Arc</code> は不要」と述べています。<Ref n={1} /> 2つ目は、ロックを持つ時間を短くするほど、他のコマンドの待ち時間が減ることです。図の下段の帯が「ロックを持つ時間」で、これが長いコマンドが1つあると、他のすべてのコマンドがそこで待ちます。
          </p>
        </>
      ),
    },
    {
      id: 'async-mutex',
      title: '非同期コマンドと Mutex',
      body: (
        <>
          <p>
            <ChapterLink n={34} /> で、非同期コマンドの <code>Future</code> は <code>Send</code> でなければならず、<code>std::sync::Mutex</code> のガードを <code>await</code> をまたいで持つとコンパイルエラーになる、と述べました。では非同期コマンドでは <code>tokio::sync::Mutex</code> を使うべきなのでしょうか。
          </p>
          <p>
            公式ドキュメントは、Tokio 自身の指針を引用して答えています。「非同期コードでも標準ライブラリの通常の <code>Mutex</code> を使うのは問題なく、むしろ望ましいことが多い」、そして非同期の <code>Mutex</code> が必要なのは「<code>MutexGuard</code> を <code>await</code> をまたいで保持する必要があるとき」だけ、という指針です。<Ref n={1} /> <ChapterLink n={30} /> で見たとおり、<code>tokio::sync::Mutex</code> の <code>lock().await</code> は、ロックが取れるまで他のタスクに実行を譲ります。そのガードは <code>Send</code> なので、<code>await</code> をまたいで保持できます。<Ref n={11} />
          </p>
          <div className="compare">
            <div>
              <h4>std::sync::Mutex（既定）</h4>
              <p>ロックの中で <code>await</code> しないなら、こちらを使う。速く、追加の依存もない。SQLite の操作のように同期的に完結する処理はこれで足りる。ガードを <code>await</code> の前に drop する形に書く。</p>
            </div>
            <div>
              <h4>tokio::sync::Mutex</h4>
              <p>ロックを持ったまま <code>await</code> する必要があるときだけ使う。<code>lock().await</code> で取り、ガードは <code>Send</code>。非同期コマンドで <code>State</code> を借用するので、戻り値は <code>Result</code> にする必要がある。</p>
            </div>
          </div>
          <Code
            lang="rust"
            title="非同期コマンドで std::sync::Mutex を使う（ロックの範囲を狭める）"
            code={`
use std::sync::Mutex;
use tauri::State;

#[tauri::command]
async fn save_and_notify(
    state: State<'_, Mutex<AppState>>,
    title: String,
) -> Result<u32, String> {
    // ロックはこのブロックの中だけ。await の前にガードが drop される
    let count = {
        let mut s = state.lock().map_err(|e| e.to_string())?;
        s.counter += 1;
        s.counter
    };
    some_async_notification(&title).await;
    Ok(count)
}
`}
          />
          <p>
            波かっこでブロックを作り、ガードの寿命をその中に閉じ込めるのが要点です。<ChapterLink n={19} /> の「スコープを抜けると drop される」が、ここでは「<code>await</code> の前にロックを手放す」ために使われています。戻り値が <code>Result</code> になっているのは、非同期コマンドで <code>State</code> を借用するための <ChapterLink n={34} /> の制約です。公式ドキュメントも、Tokio の <code>Mutex</code> を使う非同期コマンドの例で「引数を借用しているので戻り値は <code>Result</code> でなければならない」と注記しています。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'apphandle-manager',
      title: 'AppHandle と Manager トレイト',
      body: (
        <>
          <p>
            コマンドの外、たとえばイベントのハンドラや別スレッドの中からも状態にアクセスしたいことがあります。そのための入口が <Term en="AppHandle">AppHandle</Term> と <Term en="Manager">Manager</Term> トレイトです。
          </p>
          <p>
            <code>Manager</code> は <code>App</code>、<code>AppHandle</code>、<code>Window</code>、<code>Webview</code>、<code>WebviewWindow</code> が実装するトレイトで、docs.rs によると次のようなメソッドを持ちます。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>manage&lt;T&gt;(state) -&gt; bool</code></td>
                  <td>状態を登録する。同じ型が既にあれば <code>false</code></td>
                </tr>
                <tr>
                  <td><code>state&lt;T&gt;() -&gt; State&lt;'_, T&gt;</code></td>
                  <td>登録済みの状態を取り出す。未登録ならパニック</td>
                </tr>
                <tr>
                  <td><code>try_state&lt;T&gt;() -&gt; Option&lt;State&lt;'_, T&gt;&gt;</code></td>
                  <td>未登録なら <code>None</code> を返す安全版</td>
                </tr>
                <tr>
                  <td><code>app_handle() -&gt; &amp;AppHandle</code></td>
                  <td>アプリのハンドルを得る</td>
                </tr>
                <tr>
                  <td><code>get_webview_window(label) -&gt; Option&lt;WebviewWindow&gt;</code></td>
                  <td>ラベルでウィンドウを探す</td>
                </tr>
                <tr>
                  <td><code>path() -&gt; &amp;PathResolver</code></td>
                  <td>保存先などのパスを解決する（次節）</td>
                </tr>
                <tr>
                  <td><code>config() -&gt; &amp;Config</code></td>
                  <td><code>tauri.conf.json</code> の内容を読む</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            公式ドキュメントは、<code>on_window_event</code> のハンドラのように「コマンドの引数注入に頼れない場所」で <code>app_handle.state::&lt;Mutex&lt;AppState&gt;&gt;()</code> を使う例を示しています。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="コマンドの外から状態を読む"
            code={`
use std::sync::Mutex;
use tauri::Manager;

tauri::Builder::default()
    .on_window_event(|window, event| {
        if let tauri::WindowEvent::Focused(true) = event {
            let state = window.app_handle().state::<Mutex<AppState>>();
            let s = state.lock().unwrap();
            println!("focused. counter = {}", s.counter);
        }
    })
`}
          />
          <p>
            <code>AppHandle</code> は「意図的に安価に clone できる」ように作られています。<Ref n={1} /> ライフタイムの制約で <code>State</code> をスレッドに持ち込めないときは、代わりに <code>AppHandle</code> を clone してスレッドに渡し、その中で <code>state()</code> を呼びます。<Ref n={1} /> <ChapterLink n={35} /> で見た <code>emit</code> も <code>AppHandle</code> から呼べるので、バックグラウンドの処理が画面に知らせる経路もこれで作れます。
          </p>
        </>
      ),
    },
    {
      id: 'paths',
      title: 'データの保存先：app_data_dir など',
      body: (
        <>
          <p>
            デスクトップアプリは、ファイルを「どこに」保存するかを OS の作法に合わせる必要があります。Tauri は <code>Manager::path()</code> が返す <Term en="PathResolver">PathResolver</Term> で、OS ごとの標準的な場所を解決してくれます。docs.rs によると、アプリ用のディレクトリはユーザーの標準ディレクトリに <code>tauri.conf.json</code> の <code>identifier</code> を付けた場所になります。<Ref n={4} /> 主なものを macOS の実際の場所とともに示します。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>メソッド</th>
                  <th>解決される場所</th>
                  <th>macOS での実際の場所</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>app_data_dir()</code></td>
                  <td><code>data_dir/{'{identifier}'}</code></td>
                  <td><code>$HOME/Library/Application Support/{'{identifier}'}</code></td>
                </tr>
                <tr>
                  <td><code>app_config_dir()</code></td>
                  <td><code>config_dir/{'{identifier}'}</code></td>
                  <td>同上（macOS では data_dir と config_dir が同じ）</td>
                </tr>
                <tr>
                  <td><code>app_local_data_dir()</code></td>
                  <td><code>local_data_dir/{'{identifier}'}</code></td>
                  <td>同上</td>
                </tr>
                <tr>
                  <td><code>app_cache_dir()</code></td>
                  <td><code>cache_dir/{'{identifier}'}</code></td>
                  <td><code>$HOME/Library/Caches/{'{identifier}'}</code></td>
                </tr>
                <tr>
                  <td><code>app_log_dir()</code></td>
                  <td>OS ごとに異なる</td>
                  <td><code>$HOME/Library/Logs/{'{identifier}'}</code></td>
                </tr>
                <tr>
                  <td><code>resource_dir()</code></td>
                  <td>バンドルに同梱したリソース</td>
                  <td><code>.app</code> 内の <code>Contents/Resources</code>（場所は契約ではないと明記）</td>
                </tr>
                <tr>
                  <td><code>home_dir()</code>、<code>document_dir()</code>、<code>download_dir()</code></td>
                  <td>ユーザーのディレクトリ</td>
                  <td><code>$HOME</code>、<code>$HOME/Documents</code>、<code>$HOME/Downloads</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Windows では <code>data_dir</code> が <code>{'{FOLDERID_RoamingAppData}'}</code>、<code>local_data_dir</code> が <code>{'{FOLDERID_LocalAppData}'}</code> と別の場所になり、Linux では <code>$XDG_DATA_HOME</code>（既定は <code>$HOME/.local/share</code>）と <code>$XDG_CONFIG_HOME</code>（既定は <code>$HOME/.config</code>）に分かれます。<Ref n={4} /> ログだけは macOS でも別の場所（<code>Library/Logs</code>）になる点に注意してください。
          </p>
          <Figure n="36-2" title="macOS でのデータ保存先の例" caption="identifier が dev.example.tsumugi のとき、app_data_dir は Library/Application Support の下、app_log_dir は Library/Logs の下になる。データベースファイルと添付画像は app_data_dir の中に置く。模式図。">
            <PathsFigure />
          </Figure>
          <p>
            Rust 側でデータベースのパスを組み立てる例です。<code>app_data_dir()</code> は <code>tauri::Result&lt;PathBuf&gt;</code> を返すので、<code>?</code> で扱います。<Ref n={4} /> アプリ用のディレクトリは実行時にアプリ自身が作る必要があるので、<code>std::fs::create_dir_all</code> で作っておきます。<Ref n={10} />
          </p>
          <Code
            lang="rust"
            title="setup で保存先を決めて DB を開く"
            code={`
use std::sync::Mutex;
use tauri::Manager;

tauri::Builder::default()
    .setup(|app| {
        let dir = app.path().app_data_dir()?;      // Library/Application Support/{identifier}
        std::fs::create_dir_all(&dir)?;
        let db_path = dir.join("tsumugi.db");
        let conn = rusqlite::Connection::open(db_path)?;
        app.manage(Mutex::new(conn));
        Ok(())
    })
`}
          />
          <p>
            フロントエンドにも同じ情報を得る API があります。<code>@tauri-apps/api/path</code> の <code>appDataDir()</code>、<code>appConfigDir()</code>、<code>appLogDir()</code> などはそれぞれ <code>Promise&lt;string&gt;</code> を返し、<code>join</code>、<code>dirname</code>、<code>basename</code> といったパス操作の関数もそろっています。<Ref n={5} /> <code>BaseDirectory</code> 列挙型（<code>AppData</code>、<code>AppConfig</code>、<code>Document</code> など）は、<ChapterLink n={38} /> で使う fs プラグインに「どの基準ディレクトリからの相対パスか」を伝えるために使います。<Ref n={5} /> ただし、Tsumugi ではファイルの読み書きを Rust 側に寄せる方針なので、フロントエンドでパスを扱う場面は限られます。
          </p>
        </>
      ),
    },
    {
      id: 'lifecycle',
      title: 'ライフサイクル：setup から run、終了まで',
      body: (
        <>
          <p>
            最後に、アプリが起動してから終了するまでの流れを追います。<ChapterLink n={33} /> で見た <code>lib.rs</code> の <code>run</code> 関数の中身が、そのままライフサイクルの記述になっています。
          </p>
          <Figure n="36-3" title="Tauri アプリのライフサイクル" caption="Builder で設定を積み、setup で初期化し、run でイベントループに入る。ループの中ではウィンドウイベントや終了要求が RunEvent として届き、Exit で終わる。CloseRequested は prevent_close、ExitRequested は prevent_exit で止められる。模式図。">
            <LifecycleFigure />
          </Figure>
          <ol className="steps">
            <li>
              <code>Builder</code>：<code>manage</code>、<code>plugin</code>、<code>invoke_handler</code>、<code>on_window_event</code> などで設定を積みます。この時点ではまだ何も動いていません。
            </li>
            <li>
              <code>setup</code>：docs.rs によると、クロージャの型は <code>FnOnce(&amp;mut App) -&gt; Result&lt;(), Box&lt;dyn Error&gt;&gt; + Send + 'static</code> です。<Ref n={2} /> <code>App</code> を可変で受け取れる唯一の場所で、ここでデータベースを開き、状態を <code>manage</code> し、必要ならウィンドウを作ります。エラーを返すと起動に失敗し、<code>run</code> がパニックします。<Ref n={6} /> <code>?</code> が使えるので、<ChapterLink n={24} /> の <code>Box&lt;dyn Error&gt;</code> の形がそのまま生きます。
            </li>
            <li>
              <code>run</code>：<code>Builder::run(context)</code> は <code>build</code> してから <code>App::run</code> を呼ぶ省略形です。<Ref n={2} /> <code>App::run</code> は <code>FnMut(&amp;AppHandle, RunEvent)</code> のコールバックを取り、イベントループに入ります。docs.rs は「この関数は戻らず、アプリが終わるとプロセスは <code>std::process::exit</code> で直接終了する」と明記しています。<Ref n={6} />
            </li>
            <li>
              終了：ユーザーがウィンドウを閉じるなどして終了が要求されると <code>RunEvent::ExitRequested</code> が届き、続いて <code>RunEvent::Exit</code> が届いてイベントループが終わります。<Ref n={7} />
            </li>
          </ol>
          <p>
            <code>RunEvent</code> の主な変種は、<code>Ready</code>（アプリの準備完了）、<code>WindowEvent {'{ label, event }'}</code>（ウィンドウに関する出来事）、<code>ExitRequested {'{ code, api }'}</code>（終了が要求された。<code>code</code> はユーザー操作による終了なら <code>None</code>）、<code>Exit</code>（イベントループの終了）、<code>MenuEvent</code>、<code>TrayIconEvent</code> です。<Ref n={7} /> <code>#[non_exhaustive]</code> なので、<code>match</code> には必ず <code>_ =&gt; {'{}'}</code> の腕が要ります。<Ref n={7} />
          </p>
          <Code
            lang="rust"
            title="RunEvent を受け取り、終了時に後処理をする"
            code={`
let app = tauri::Builder::default()
    .setup(|app| { /* ... */ Ok(()) })
    .build(tauri::generate_context!())
    .expect("error while building tauri application");

app.run(|app_handle, event| match event {
    tauri::RunEvent::Ready => {
        println!("ready");
    }
    tauri::RunEvent::ExitRequested { code, .. } => {
        // code が None ならユーザー操作による終了。
        // 止めたいときは { api, .. } で受けて api.prevent_exit() を呼ぶ
        println!("exit requested: {code:?}");
    }
    tauri::RunEvent::Exit => {
        // 最後の後処理。状態を取り出して保存するなど
        let _ = app_handle;
    }
    _ => {}
});
`}
          />
          <p>
            ウィンドウ単位の出来事は <code>Builder::on_window_event</code> でも受け取れます。ハンドラの型は <code>Fn(&amp;Window, &amp;WindowEvent) + Send + Sync + 'static</code> で、すべてのウィンドウに対して登録されます。<Ref n={2} /> <code>WindowEvent</code> には <code>Resized</code>、<code>Moved</code>、<code>CloseRequested {'{ api }'}</code>、<code>Destroyed</code>、<code>Focused(bool)</code>、<code>ScaleFactorChanged</code>、<code>DragDrop</code>、<code>ThemeChanged</code> があります。<Ref n={8} /> <code>CloseRequested</code> の <code>api.prevent_close()</code> を呼ぶと、ウィンドウが閉じるのを止められます。<Ref n={9} />
          </p>
          <Code
            lang="rust"
            title="閉じる前に確認する（未保存の変更がある場合）"
            code={`
use std::sync::Mutex;
use tauri::{Emitter, Manager};

tauri::Builder::default()
    .on_window_event(|window, event| {
        if let tauri::WindowEvent::CloseRequested { api, .. } = event {
            let dirty = window.app_handle().state::<Mutex<AppState>>().lock().unwrap().dirty;
            if dirty {
                api.prevent_close();                       // いったん止める
                let _ = window.emit("confirm-close", ());  // 画面側に確認を頼む
            }
        }
    })
`}
          />
          <p>
            この例は、<ChapterLink n={35} /> のイベントと、この章の <code>Manager::state</code> を組み合わせています。画面側は <code>confirm-close</code> を受けて確認ダイアログを出し、ユーザーが承諾すればコマンドで保存してからウィンドウを閉じる、という流れになります。<code>run</code> が戻らないことと、<code>Exit</code> が最後の後処理の場所であることは、データベースを確実に閉じたいアプリにとって重要です。なお <code>App::run_return</code> を使うとイベントループの終了後に戻ってくるので、その後ろに後処理を書くこともできます（iOS では使えません）。<Ref n={6} /> モバイルでは OS がアプリを通知なしに終了させることがあるため、この章の説明はデスクトップ向けです。モバイルでの最後の保存機会は <ChapterLink n={55} /> で扱います。
          </p>
          <Callout kind="unverified">
            <p>
              この節のコードは docs.rs の <code>Builder</code>、<code>App</code>、<code>RunEvent</code>、<code>WindowEvent</code> のドキュメントに基づいて書いたもので、Tsumugi のサンプルには含まれず、本書の制作環境では実行して確認していません。
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
              Tsumugi の Rust 側で最も重要な状態は SQLite の接続です。<ChapterLink n={42} /> では、この章の形そのままに、<code>setup</code> で <code>app.path().app_data_dir()</code> の下に <code>tsumugi.db</code> を開き、<code>Mutex&lt;Connection&gt;</code> として <code>manage</code> します。各コマンドは <code>State&lt;'_, Mutex&lt;Connection&gt;&gt;</code> を受け取り、ロックの中で SQL を実行してすぐ手放します。SQLite の操作は同期的に完結するので、<code>std::sync::Mutex</code> で足ります。
            </p>
            <p>
              添付画像は同じ <code>app_data_dir</code> の下の <code>attachments/</code> に保存し、asset プロトコルで画面に表示します（<ChapterLink n={45} />）。保存先を <code>app_data_dir</code> に統一しておくと、macOS では <code>Library/Application Support/{'{identifier}'}</code> の1つのフォルダをバックアップすればデータが丸ごと残ります。
            </p>
            <p>
              ライフサイクルの出番は <ChapterLink n={50} /> の仕上げです。ウィンドウの位置と大きさの保存は window-state プラグインに任せますが、未保存の内容がある状態で閉じようとしたときの確認は、この章の <code>CloseRequested</code> と <code>prevent_close</code> で実装します。
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
            <li>アプリ全体で共有する値は <code>manage</code> で登録し、コマンドでは <code>State&lt;'_, T&gt;</code> で受け取る。型は <code>Send + Sync + 'static</code> で、同じ型は1つだけ。型の不一致は実行時エラーになる。</li>
            <li>変更するには <code>Mutex</code> で包む。<code>lock()</code> のガードが drop されるまでロックが続くので、範囲を狭く保つ。<code>Arc</code> は要らない。</li>
            <li>非同期コマンドでも既定は <code>std::sync::Mutex</code>。ガードを <code>await</code> をまたいで持つときだけ <code>tokio::sync::Mutex</code> を使い、戻り値は <code>Result</code> にする。</li>
            <li><code>AppHandle</code> は安価に clone でき、<code>Manager</code> トレイトの <code>state()</code>、<code>path()</code>、<code>get_webview_window()</code> でコマンドの外からも状態やパスに届く。</li>
            <li><code>app_data_dir()</code> は macOS では <code>Library/Application Support/{'{identifier}'}</code>。OS ごとに場所が違うので、パスは必ず <code>PathResolver</code> で解決する。</li>
            <li><code>setup</code> で初期化し、<code>run</code> でイベントループに入る。<code>run</code> は戻らず、<code>ExitRequested</code> と <code>Exit</code> が終了の合図。<code>CloseRequested</code> の <code>prevent_close()</code> で閉じるのを止められる。</li>
          </ul>
          <p>次章では、ここまで出てきた「コマンドを呼べるかどうかは capability で決まる」という話を正面から取り上げ、Tauri のセキュリティモデルを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'State Management',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/develop/state-management/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'manage と State の使い方、Mutex による変更、Tokio の Mutex に関する指針、Arc が不要なこと、型不一致が実行時エラーになること、Manager 経由のアクセスの根拠。',
    },
    {
      title: 'tauri::Builder',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/struct.Builder.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'setup、manage、on_window_event、build、run のシグネチャと、manage の型の一意性・パニック条件、内部可変性に関する記述の根拠。',
    },
    {
      title: 'tauri::Manager',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/trait.Manager.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'manage、state、try_state、path、get_webview_window などのメソッドと実装する型の根拠。',
    },
    {
      title: 'tauri::path::PathResolver',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/path/struct.PathResolver.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'app_data_dir、app_config_dir、app_log_dir などの解決規則と OS ごとの実際の場所の根拠。',
    },
    {
      title: '@tauri-apps/api: path',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacepath/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'フロントエンド側の appDataDir などの関数、join などのパス操作、BaseDirectory 列挙型の根拠。',
    },
    {
      title: 'tauri::App',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/struct.App.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'App::run のコールバック型、戻らずに std::process::exit で終了すること、setup の失敗でパニックすることの根拠。',
    },
    {
      title: 'tauri::RunEvent',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/enum.RunEvent.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'Ready、WindowEvent、ExitRequested、Exit などの変種と non_exhaustive の根拠。',
    },
    {
      title: 'tauri::WindowEvent',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/enum.WindowEvent.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'CloseRequested、Focused、ThemeChanged などの変種の根拠。',
    },
    {
      title: 'tauri::CloseRequestApi',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/2.12.5/tauri/struct.CloseRequestApi.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'prevent_close がウィンドウを閉じるのを防ぐことの根拠。',
    },
    {
      title: 'Using Plugin Permissions',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/learn/security/using-plugin-permissions/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'アプリ用のディレクトリ（$APP など）はアプリが実行時に作成する必要があることの根拠。',
    },
    {
      title: 'tokio::sync::MutexGuard',
      publisher: 'docs.rs（tokio）',
      url: 'https://docs.rs/tokio/latest/tokio/sync/struct.MutexGuard.html',
      accessed: '2026-11-08',
      note: 'tokio の Mutex のガードが Send であり、await をまたいで保持できることの根拠。',
    },
  ],
}

export default chapter
