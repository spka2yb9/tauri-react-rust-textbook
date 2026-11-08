import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 34-1 invoke のシーケンス ---------- */
function InvokeSequenceFigure() {
  const lanes = [
    { x: 80, label: 'React の部品' },
    { x: 240, label: '@tauri-apps/api' },
    { x: 400, label: 'Core（tauri）' },
    { x: 560, label: 'コマンド関数' },
  ]
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="invoke の呼び出しから戻り値が返るまでのシーケンス図。React の部品が invoke を呼び、@tauri-apps/api が引数を JSON にして IPC メッセージを送り、Core が権限を確認して引数を Rust の型に変換し、コマンド関数を呼ぶ。戻り値は逆の経路で JSON に直列化され、Promise が解決される">
      <defs>
        <marker id="arrow34a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 65} y="16" width="130" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="13" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="330" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <path d="M80,80 L238,80" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="160" y="72" textAnchor="middle">invoke('get_page', {'{ id }'})</text>
        <path d="M240,120 L398,120" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="320" y="112" textAnchor="middle">引数を JSON にして IPC へ</text>
        <rect x="400" y="135" width="160" height="40" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="151" textAnchor="middle">capability を確認</text>
        <text x="480" y="167" textAnchor="middle">JSON → Rust の型（serde）</text>
        <path d="M400,200 L558,200" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="480" y="192" textAnchor="middle">get_page(id, state)</text>
        <path d="M560,240 L402,240" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="480" y="232" textAnchor="middle">Result&lt;Page, AppError&gt;</text>
        <path d="M400,280 L242,280" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="320" y="272" textAnchor="middle">Rust の型 → JSON（serde）</text>
        <path d="M240,318 L82,318" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow34a)" />
        <text x="160" y="310" textAnchor="middle">Promise を解決（Ok）／拒否（Err）</text>
      </g>
      <text x="320" y="350" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">濃い矢印：要求　薄い矢印：応答　模式図</text>
    </svg>
  )
}

/* ---------- 図 34-2 serde による変換 ---------- */
function SerdeMappingFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Rust の構造体 Page、IPC を流れる JSON、TypeScript の型 Page の3つを横に並べ、フィールドごとの対応を示した図。Rust の snake_case のフィールド名は serde の rename_all で camelCase に変わり、Option は null を許す型に、Vec は配列に対応する">
      <defs>
        <marker id="arrow34b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" fontFamily="monospace">
        {/* Rust */}
        <rect x="20" y="40" width="200" height="200" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="115" y="30" fontSize="13" textAnchor="middle" fontFamily="sans-serif">Rust（Serialize）</text>
        <text x="26" y="66">struct Page {'{'}</text>
        <text x="34" y="92">id: String,</text>
        <text x="34" y="118">parent_id: Option&lt;String&gt;,</text>
        <text x="34" y="144">title: String,</text>
        <text x="34" y="170">position: i64,</text>
        <text x="34" y="196">tags: Vec&lt;String&gt;,</text>
        <text x="26" y="222">{'}'}</text>
        {/* JSON */}
        <rect x="245" y="40" width="160" height="200" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="30" fontSize="13" textAnchor="middle" fontFamily="sans-serif">IPC を流れる JSON</text>
        <text x="255" y="66">{'{'}</text>
        <text x="265" y="92">"id": "p1",</text>
        <text x="265" y="118">"parentId": null,</text>
        <text x="265" y="144">"title": "メモ",</text>
        <text x="265" y="170">"position": 0,</text>
        <text x="265" y="196">"tags": ["a"]</text>
        <text x="255" y="222">{'}'}</text>
        {/* TS */}
        <rect x="430" y="40" width="190" height="200" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="525" y="30" fontSize="13" textAnchor="middle" fontFamily="sans-serif">TypeScript（type）</text>
        <text x="440" y="66">type Page = {'{'}</text>
        <text x="450" y="92">id: string</text>
        <text x="450" y="118">parentId: string | null</text>
        <text x="450" y="144">title: string</text>
        <text x="450" y="170">position: number</text>
        <text x="450" y="196">tags: string[]</text>
        <text x="440" y="222">{'}'}</text>
      </g>
      <path d="M222,140 L243,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow34b)" markerStart="url(#arrow34b)" />
      <path d="M405,140 L428,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow34b)" markerStart="url(#arrow34b)" />
      <text x="320" y="268" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">#[serde(rename_all = "camelCase")] で parent_id → parentId。Option は null、Vec は配列になる</text>
      <text x="320" y="288" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">TypeScript の型は実行時には検査されない（第6章）。JSON と食い違えば静かに壊れる</text>
    </svg>
  )
}

/* ---------- 図 34-3 同期コマンドと非同期コマンドの実行場所 ---------- */
function AsyncPlacementFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="同期コマンドと非同期コマンドがどこで実行されるかを比べた図。同期コマンドは既定でメインスレッドで実行され、長い処理は画面を止める。async fn のコマンドは Tauri の非同期ランタイムの別タスクで実行され、メインスレッドを塞がない">
      <g fontSize="13">
        <rect x="20" y="30" width="290" height="170" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="165" y="55" textAnchor="middle" fontWeight="600">同期コマンド（fn）</text>
        <rect x="40" y="70" width="250" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="165" y="92" textAnchor="middle">メインスレッドで実行（既定）</text>
        <text x="165" y="130" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">短い処理向き。長い処理は</text>
        <text x="165" y="148" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">ウィンドウの応答を止める</text>
        <text x="165" y="180" textAnchor="middle" fontSize="12">#[tauri::command(async)] で別タスクへ</text>

        <rect x="330" y="30" width="290" height="170" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="475" y="55" textAnchor="middle" fontWeight="600">非同期コマンド（async fn）</text>
        <rect x="350" y="70" width="250" height="34" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="475" y="92" textAnchor="middle">非同期ランタイムの別タスク</text>
        <text x="475" y="130" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">メインスレッドを塞がない。</text>
        <text x="475" y="148" textAnchor="middle" fill="var(--fig-muted)" fontSize="12">Future は Send である必要がある</text>
        <text x="475" y="180" textAnchor="middle" fontSize="12">&amp;str や State&lt;'_, T&gt; の借用に制約あり</text>
      </g>
      <text x="320" y="222" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：どちらもフロントエンド側では同じ invoke で呼び、Promise で結果を受け取る</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 34,
  part: 5,
  title: 'コマンド：フロントエンドから Rust を呼ぶ',
  summary:
    'Tauri のコマンドは、React から Rust の関数を呼ぶための仕組みです。#[tauri::command] と invoke の基本から、serde による引数と戻り値の変換、Result によるエラーの返し方、非同期コマンドの制約、State などの注入される引数、TypeScript と Rust の型をそろえる方法までを扱います。',
  goals: [
    '#[tauri::command] を付けた関数を登録し、invoke で呼び出せる',
    '引数名の camelCase 変換と、serde による JSON との相互変換の規則を説明できる',
    'Result とシリアライズ可能なエラー型を使って、失敗をフロントエンドの Promise の拒否として受け取れる',
    '非同期コマンドが別タスクで動くことと、借用した引数に関する制約を知っている',
    'State、WebviewWindow、AppHandle をコマンドの引数として受け取れる',
    'TypeScript と Rust の型を手でそろえる方法と、ts-rs や tauri-specta で生成する方法の現状を説明できる',
  ],
  prerequisites: [3, 6, 12, 21, 24, 30, 33],
  sections: [
    {
      id: 'what-is-command',
      title: 'コマンドとは何か',
      body: (
        <>
          <p>
            <ChapterLink n={33} /> で、Core プロセスと WebView プロセスの会話には「コマンド」と「イベント」の2つの形があることを見ました。この章はコマンドの章です。<Term en="command">コマンド</Term>は、フロントエンドの JavaScript から Rust の関数を呼び出し、引数を渡して戻り値を受け取るための仕組みです。公式ドキュメントは、IPC メッセージの上に作られた「外部関数インターフェイスに似た抽象」と表現しています。<Ref n={6} />
          </p>
          <p>
            Web アプリの経験で言えば、<code>fetch</code> でサーバーの API を呼ぶのに近い感覚です。違いは、呼ばれる先がネットワークの向こうのサーバーではなく、同じアプリの Core プロセスにある Rust の関数だという点です。呼び出しは非同期で、結果は <ChapterLink n={3} /> で学んだ Promise として返ってきます。
          </p>
          <p>
            コマンドを書くには、Rust 側で関数に <code>#[tauri::command]</code> を付けて <code>Builder</code> に登録し、TypeScript 側で <code>@tauri-apps/api/core</code> の <code>invoke</code> を呼びます。この往復で、引数と戻り値は JSON を経由します。その変換を担うのが、<ChapterLink n={25} /> で触れた derive マクロの代表格である serde です。この章は公式の「Calling Rust from the Frontend」を一次資料として、この往復を順に追います。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'first-command',
      title: '最初のコマンド：定義、登録、呼び出し',
      body: (
        <>
          <p>最小のコマンドは次の3つの部品でできています。</p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs"
            code={`
#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JavaScript!");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <Code
            lang="ts"
            title="src/App.tsx（抜粋）"
            code={`
import { invoke } from '@tauri-apps/api/core'

await invoke('my_custom_command')
`}
          />
          <ol className="steps">
            <li>
              関数に <code>#[tauri::command]</code> を付けます。このマクロが、JSON の引数を Rust の型に変換して関数を呼び、戻り値を JSON に戻すコードを生成します。<Ref n={1} />
            </li>
            <li>
              <code>tauri::generate_handler![...]</code> にコマンドを列挙し、<code>Builder::invoke_handler</code> に渡します。公式ドキュメントは、<code>invoke_handler</code> を複数回呼んでも最後の呼び出しだけが有効になるので、すべてのコマンドを1回の <code>generate_handler!</code> にまとめるよう注意しています。<Ref n={1} />
            </li>
            <li>
              フロントエンドで <code>invoke</code> に関数名を文字列で渡します。<code>invoke</code> の型は <code>function invoke&lt;T&gt;(cmd, args?, options?): Promise&lt;T&gt;</code> で、型引数 <code>T</code> が戻り値の型になります。<Ref n={2} />
            </li>
          </ol>
          <p>
            この一連の流れを時間順に描いたのが図 34-1 です。<code>invoke</code> から Rust の関数に届くまでの間に Core が何をしているかに注目してください。
          </p>
          <Figure n="34-1" title="invoke からコマンド関数を経て Promise が解決されるまで" caption="引数は @tauri-apps/api で JSON になり、Core が capability で許可を確認してから Rust の型に変換し、コマンド関数を呼ぶ。戻り値は逆向きに JSON を経て Promise を解決する。Err なら拒否になる。模式図。">
            <InvokeSequenceFigure />
          </Figure>
          <p>
            図 34-1 の Core の箱にある「capability を確認」は、<ChapterLink n={33} /> で見た「IPC は Core を経由し、Core が要求を捨てられる」の具体的な現れです。コマンドを呼べるかどうかは <ChapterLink n={37} /> の設定で決まります。
          </p>
          <h3>コマンドの名前と置き場所</h3>
          <p>
            コマンド名はアプリ全体で一意でなければなりません。モジュールで分けても名前空間は分かれず、<code>invoke</code> に渡す名前にモジュール名は含まれません。<Ref n={1} /> コマンドを別ファイルに置くときは、関数を <code>pub</code> にして、<code>generate_handler!</code> にモジュールパスで列挙します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/pages.rs と lib.rs"
            code={`
// commands/pages.rs
#[tauri::command]
pub fn list_pages() -> Vec<String> {
    vec![]
}

// lib.rs
mod commands;

tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![commands::pages::list_pages])
`}
          />
          <Callout kind="warn">
            <p>
              公式ドキュメントは、<code>lib.rs</code> に直接書くコマンドを <code>pub</code> にしてはいけないと注意しています。マクロが生成する項目と名前がぶつかり、E0255 のエラーになります。別モジュールに置く場合は、逆に <code>pub</code> が必要です。<Ref n={1} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'args-and-return',
      title: '引数と戻り値：serde による変換',
      body: (
        <>
          <p>
            引数は JSON のオブジェクトとして渡されます。ここで名前の変換規則に注意が必要です。Rust の引数名は <code>snake_case</code> で書きますが、フロントエンドからは既定で <code>camelCase</code> のキーで渡します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
#[tauri::command]
fn my_custom_command(invoke_message: String) {
    println!("I was invoked from JavaScript, with this message: {invoke_message}");
}
`}
          />
          <Code
            lang="ts"
            code={`
invoke('my_custom_command', { invokeMessage: 'Hello!' })
`}
          />
          <p>
            この変換が煩わしければ、<code>#[tauri::command(rename_all = "snake_case")]</code> を付けると、フロントエンド側でも Rust と同じ <code>invoke_message</code> という名前を使えます。<Ref n={1} /> どちらにするかはプロジェクトで統一します。本書では既定の camelCase 変換を使います。
          </p>
          <p>
            引数の型は <code>serde::Deserialize</code> を、戻り値の型は <code>serde::Serialize</code> を実装している必要があります。<Ref n={1} /> <code>String</code>、数値、<code>bool</code>、<code>Vec</code>、<code>Option</code> などは最初から対応しています。自分で定義した構造体は <code>#[derive(Serialize, Deserialize)]</code> を付けます。<ChapterLink n={21} /> の構造体と <ChapterLink n={25} /> の derive がここで合流します。
          </p>
          <Code
            lang="rust"
            title="構造体を返すコマンド"
            code={`
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct Page {
    id: String,
    parent_id: Option<String>,
    title: String,
    position: i64,
    tags: Vec<String>,
}

#[tauri::command]
fn get_page(id: String) -> Page {
    Page { id, parent_id: None, title: "メモ".into(), position: 0, tags: vec!["a".into()] }
}
`}
          />
          <p>
            戻り値の構造体がどう JSON になり、TypeScript ではどう見えるかを図 34-2 に並べました。フィールド名の変換と、<code>Option</code> や <code>Vec</code> の対応に注目してください。
          </p>
          <Figure n="34-2" title="Rust の構造体・JSON・TypeScript の型の対応" caption="左が Rust の構造体、中央が IPC を流れる JSON、右が TypeScript 側の型。serde の rename_all でフィールド名が camelCase になり、Option は null を許す型に、Vec は配列になる。右の型は実行時には検査されない。">
            <SerdeMappingFigure />
          </Figure>
          <p>
            図 34-2 の右端の型は、TypeScript が実行時に検査するものではありません（<ChapterLink n={6} />）。Rust 側で <code>rename_all</code> を書き忘れて <code>parent_id</code> のまま送ると、TypeScript 側の <code>parentId</code> は常に <code>undefined</code> になりますが、コンパイルは通ってしまいます。この「境界のずれ」をどう防ぐかは、この章の後半で扱います。
          </p>
          <p>
            フロントエンド側では、<code>invoke</code> の型引数で戻り値の型を宣言します。
          </p>
          <Code
            lang="ts"
            code={`
type Page = {
  id: string
  parentId: string | null
  title: string
  position: number
  tags: string[]
}

const page = await invoke<Page>('get_page', { id: 'p1' })
console.log(page.title)
`}
          />
          <Callout>
            <p>
              大きなバイナリデータ（画像ファイルなど）を返すときは、<code>Vec&lt;u8&gt;</code> をそのまま返すと JSON の数値配列になって無駄が大きくなります。公式ドキュメントは <code>tauri::ipc::Response::new(data)</code> を返す方法を示しており、この場合フロントエンドでは <code>ArrayBuffer</code> として受け取れます。<Ref n={1} /><Ref n={2} /> 逆方向、つまりフロントエンドから生のバイト列を送るには、<code>invoke</code> の第2引数に <code>ArrayBuffer</code> や <code>Uint8Array</code> を渡し、Rust 側で <code>tauri::ipc::Request</code> を受け取ります。<Ref n={1} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'errors',
      title: 'エラーの返し方',
      body: (
        <>
          <p>
            コマンドが <code>Result&lt;T, E&gt;</code> を返すと、<code>Ok</code> のときは Promise が解決され、<code>Err</code> のときは拒否されます。<Ref n={1} /> <ChapterLink n={24} /> で学んだ <code>Result</code> と <code>?</code> が、そのままフロントエンドの <code>try/catch</code> につながるわけです。ただし、エラーも JSON に直列化されて送られるため、エラー型は <code>serde::Serialize</code> を実装している必要があります。<Ref n={1} />
          </p>
          <p>いちばん簡単なのは、エラーを <code>String</code> に変えてしまう方法です。</p>
          <Code
            lang="rust"
            code={`
#[tauri::command]
fn my_custom_command() -> Result<(), String> {
    std::fs::File::open("path/to/file").map_err(|err| err.to_string())?;
    // 成功時は null が返る
    Ok(())
}
`}
          />
          <p>
            <code>std::io::Error</code> は <code>Serialize</code> を実装していないので、<code>map_err</code> で文字列に変換してから <code>?</code> を使っています。手軽ですが、コマンドごとに <code>map_err</code> を書くのは面倒で、フロントエンドでもエラーの種類を区別できません。
          </p>
          <p>
            公式ドキュメントが勧める形は、<ChapterLink n={24} /> で学んだ <code>thiserror</code> で自作のエラー型を作り、<code>Serialize</code> を手で実装する方法です。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="自作エラー型に Serialize を実装する"
            code={`
// アプリで起こり得るすべてのエラーを表す型
#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

// serde::Serialize は手で実装する（メッセージ文字列として送る）
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[tauri::command]
fn my_custom_command() -> Result<(), Error> {
    // ? がそのまま使える（io::Error → Error に From で変換される）
    std::fs::File::open("path/that/does/not/exist")?;
    Ok(())
}
`}
          />
          <p>
            これで <code>?</code> が使えるようになり、<code>map_err</code> は不要になります。さらに、フロントエンドでエラーの種類ごとに処理を分けたい場合は、公式ドキュメントのもう1つの例のように、種類と文字列を持つ列挙型に変換して直列化します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="種類付きのエラーとして送る"
            code={`
#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum ErrorKind {
    Io(String),
    Utf8(String),
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Io(_) => ErrorKind::Io(error_message),
            Self::Utf8(_) => ErrorKind::Utf8(error_message),
        };
        error_kind.serialize(serializer)
    }
}
`}
          />
          <Code
            lang="ts"
            title="フロントエンド側"
            code={`
type ErrorKind = {
  kind: 'io' | 'utf8'
  message: string
}

invoke('read').catch((e: ErrorKind) => {
  console.error(e.kind, e.message)
})
`}
          />
          <p>
            <code>#[serde(tag = "kind", content = "message")]</code> は、列挙型を <code>{'{ "kind": "io", "message": "..." }'}</code> という形の JSON にする指定です。TypeScript 側では <ChapterLink n={6} /> の判別可能なユニオンとして受け取れるので、<code>kind</code> で分岐できます。
          </p>
        </>
      ),
    },
    {
      id: 'async-commands',
      title: '非同期コマンド',
      body: (
        <>
          <p>
            ファイルの読み書きやネットワークのように時間のかかる処理は、<code>async fn</code> のコマンドにします。公式ドキュメントによると、<code>async</code> のコマンドは非同期ランタイムの別タスクで実行され、<code>async</code> でないコマンドは既定でメインスレッドで実行されます。<Ref n={1} /> メインスレッドはウィンドウのイベントループを回しているスレッドなので、ここで重い処理をすると画面が固まります。
          </p>
          <Figure n="34-3" title="同期コマンドと非同期コマンドの実行場所" caption="左の同期コマンドは既定でメインスレッドで動き、長い処理は画面を止める。右の async fn のコマンドは非同期ランタイムの別タスクで動く。同期コマンドでも #[tauri::command(async)] を付ければ別タスクで実行される。模式図。">
            <AsyncPlacementFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
#[tauri::command]
async fn my_custom_command(value: String) -> String {
    some_async_function().await;
    value
}
`}
          />
          <p>
            フロントエンドからの呼び方は同期コマンドと同じです。<code>invoke</code> はもともと Promise を返すので、Rust 側が <code>async</code> かどうかを気にする必要はありません。<Ref n={1} />
          </p>
          <h3>借用した引数の制約</h3>
          <p>
            公式ドキュメントは、非同期コマンドの引数に <code>&amp;str</code> や <code>State&lt;'_, Data&gt;</code> のような借用した型をそのまま使えない、と注意しています。<Ref n={1} /> 回避策は2つ示されています。
          </p>
          <ul>
            <li>引数を <code>&amp;str</code> ではなく <code>String</code> のような所有型にする（<ChapterLink n={19} />）。</li>
            <li>戻り値を <code>Result&lt;T, E&gt;</code> にする。公式ドキュメントは <code>Result&lt;String, ()&gt;</code> の例を示し、これはあらゆる型で使えると述べています。<Ref n={1} /></li>
          </ul>
          <p>
            実務では、エラーを返すために戻り値はどのみち <code>Result</code> にするので、2つ目の回避策が自然に満たされます。<ChapterLink n={36} /> で <code>State&lt;'_, Mutex&lt;...&gt;&gt;</code> を非同期コマンドで受け取るときも、戻り値を <code>Result</code> にする形で書きます。
          </p>
          <h3>Send と await をまたぐ値</h3>
          <p>
            別タスクで動くということは、<ChapterLink n={30} /> で学んだ <code>spawn</code> と同じく、コマンドの <code>Future</code> が <code>Send</code> でなければならないということです。典型的に引っかかるのは、<code>std::sync::Mutex</code> のロックガードを <code>await</code> をまたいで持ち続けるコードです。ガードは <code>Send</code> ではないため、コンパイルエラーになります。<ChapterLink n={29} /> の <code>Send</code> と <code>Sync</code> の知識が、ここで実際に必要になります。対処法（ロックの範囲を狭める、または <code>tokio::sync::Mutex</code> を使う）は <ChapterLink n={36} /> で状態管理と合わせて扱います。
          </p>
        </>
      ),
    },
    {
      id: 'injected-args',
      title: '注入される引数：State、WebviewWindow、AppHandle',
      body: (
        <>
          <p>
            コマンドの引数には、フロントエンドから渡される値のほかに、Tauri が自動で注入する特別な型を並べられます。公式の例ではこれらを型で受け取っており、引数の順序や名前には依存しません。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>型</th>
                  <th>得られるもの</th>
                  <th>詳しくは</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>tauri::State&lt;'_, T&gt;</code></td>
                  <td><code>Builder::manage</code> で登録したアプリ全体の状態（DB 接続など）</td>
                  <td><ChapterLink n={36} /></td>
                </tr>
                <tr>
                  <td><code>tauri::WebviewWindow</code></td>
                  <td>コマンドを呼んだウィンドウ。<code>label()</code> で識別子が取れる</td>
                  <td><ChapterLink n={39} /></td>
                </tr>
                <tr>
                  <td><code>tauri::AppHandle</code></td>
                  <td>アプリ全体への軽量なハンドル。パスの解決やイベント発行に使う</td>
                  <td><ChapterLink n={35} />、<ChapterLink n={36} /></td>
                </tr>
                <tr>
                  <td><code>tauri::ipc::Request</code></td>
                  <td>生のリクエスト本体とヘッダー</td>
                  <td>本章の「引数と戻り値」</td>
                </tr>
                <tr>
                  <td><code>tauri::ipc::Channel&lt;T&gt;</code></td>
                  <td>Rust からフロントエンドへ値を流すチャネル</td>
                  <td><ChapterLink n={35} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>公式ドキュメントの「完全な例」は、これらを1つのコマンドにまとめています。<Ref n={1} /></p>
          <Code
            lang="rust"
            title="注入される引数をまとめて使う"
            code={`
struct Database;

#[derive(serde::Serialize)]
struct CustomResponse {
    message: String,
    other_val: usize,
}

#[tauri::command]
async fn my_custom_command(
    window: tauri::WebviewWindow,
    number: usize,
    database: tauri::State<'_, Database>,
) -> Result<CustomResponse, String> {
    println!("Called from {}", window.label());
    let result: Option<String> = some_other_function().await;
    if let Some(message) = result {
        Ok(CustomResponse { message, other_val: 42 + number })
    } else {
        Err("No result".into())
    }
}

// 登録側
tauri::Builder::default()
    .manage(Database {})
    .invoke_handler(tauri::generate_handler![my_custom_command])
`}
          />
          <p>
            フロントエンドから渡すのは <code>number</code> だけです。<code>window</code> と <code>database</code> は Tauri が埋めます。非同期コマンドで <code>State&lt;'_, Database&gt;</code> を借用しているため、戻り値が <code>Result</code> になっている点も、前節の制約どおりです。
          </p>
          <Callout>
            <p>
              テスト用のモックランタイムなど、既定とは別のランタイムを使う場合は、<code>WebviewWindow</code> や <code>AppHandle</code> に <code>&lt;R: tauri::Runtime&gt;</code> の型引数が必要になります。<Ref n={1} /> 通常のアプリでは省略できます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'type-sharing',
      title: 'TypeScript と Rust の型をそろえる',
      body: (
        <>
          <p>
            図 34-2 で見たとおり、コマンドの境界では Rust の型と TypeScript の型が JSON を介して向かい合っています。両者がずれても、コンパイラは教えてくれません。ずれを防ぐ方法は、大きく3つあります。
          </p>
          <h3>方法1：手でそろえ、呼び出しを1か所に集める</h3>
          <p>
            最も単純で、追加の道具が要らない方法です。Rust の構造体と対になる TypeScript の型を1つのファイルに書き、<code>invoke</code> の呼び出しもすべて1つのモジュールに集めます。型を変えるときは両方のファイルを同時に直す、という運用で守ります。
          </p>
          <Code
            lang="ts"
            title="src/lib/ipc.ts：invoke を集約した型付きラッパー"
            code={`
import { invoke } from '@tauri-apps/api/core'
import type { Page } from './types'

export function getPage(id: string): Promise<Page> {
  return invoke<Page>('get_page', { id })
}

export function createPage(parentId: string | null, title: string): Promise<Page> {
  return invoke<Page>('create_page', { parentId, title })
}
`}
          />
          <p>
            画面側の部品は <code>getPage</code> のような関数だけを呼び、コマンド名の文字列や引数のキー名を知らずに済みます。ずれが起きたとしても、直す場所はこのファイルだけです。
          </p>
          <h3>方法2：ts-rs で型定義を生成する</h3>
          <p>
            <Term en="ts-rs">ts-rs</Term> は、Rust の型から TypeScript の型宣言を生成するクレートです。確認した時点（2026-11-08）の最新版は 12.0.1 で、<code>#[derive(TS)]</code> と <code>#[ts(export)]</code> を構造体に付け、<code>cargo test</code> を実行すると <code>bindings/</code> ディレクトリに <code>.ts</code> ファイルが書き出されます。<Ref n={3} /> 既定で有効な <code>serde-compat</code> 機能により、<code>rename</code>、<code>rename_all</code>、<code>tag</code>、<code>content</code>、<code>skip</code>、<code>flatten</code> などの serde 属性が解釈されるので、<code>rename_all = "camelCase"</code> を付けた構造体は camelCase の型として出力されます。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
#[derive(serde::Serialize, ts_rs::TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
struct Page {
    id: String,
    parent_id: Option<String>,
    title: String,
}
`}
          />
          <p>
            ts-rs が生成するのは型だけで、<code>invoke</code> の呼び出し側は方法1と同じく手で書きます。コマンド名や引数のキー名のずれは防げませんが、戻り値の型のずれは防げます。
          </p>
          <h3>方法3：tauri-specta でコマンドの呼び出しごと生成する</h3>
          <p>
            <Term en="tauri-specta">tauri-specta</Term> は、コマンドの関数から TypeScript の呼び出し関数と型を丸ごと生成するクレートです。コマンドに <code>#[specta::specta]</code> を付け、<code>collect_commands!</code> で集めて <code>export</code> すると、<code>bindings.ts</code> に <code>commands.helloWorld(name)</code> のような関数が書き出されます。<Ref n={4} /> イベント（<ChapterLink n={35} />）の型付けにも対応しています。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            title="tauri-specta 2.0.0-rc.26 の設定例（公式ドキュメントより）"
            code={`
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

#[tauri::command]
#[specta::specta] // コマンドに必ず付ける
fn hello_world(my_name: String) -> String {
    format!("Hello, {my_name}! You've been greeted from Rust!")
}

pub fn run() {
    let builder = Builder::new().commands(collect_commands![hello_world,]);

    #[cfg(debug_assertions)] // デバッグビルドのときだけ書き出す
    builder
        .export(Typescript::default(), "../src/bindings.ts")
        .expect("Failed to export typescript bindings");

    tauri::Builder::default()
        .invoke_handler(builder.invoke_handler())
        .setup(move |app| {
            builder.mount_events(app); // イベントを使う場合に必要
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            確認した時点（2026-11-08）の事実を記しておきます。crates.io 上の tauri-specta の最新版は 2.0.0-rc.26（2026-10-21 公開）で、安定版として公開されている最新は Tauri 1 向けの 1.0.2 です。<Ref n={5} /> Tauri 2 に対応するのは 2.0.0-rc 系で、公式ドキュメントは <code>specta@=2.0.0-rc.26</code> と <code>specta-typescript@0.0.13</code> をバージョン固定で追加するよう案内しています。<Ref n={4} /> rc 版は更新で API が変わる可能性があるので、採用するならバージョンを固定し、更新時は生成されたファイルの差分を確認します。
          </p>
          <div className="compare">
            <div>
              <h4>手でそろえる（本書の選択）</h4>
              <p>道具を増やさず、Rust と TypeScript の対応を自分で把握できる。学習用には見通しがよい。ずれは運用で防ぐ。</p>
            </div>
            <div>
              <h4>生成する（ts-rs／tauri-specta）</h4>
              <p>型のずれを機械的に防げる。コマンドが増えるほど効く。ビルド手順が1つ増え、rc 版の追従も必要になる。</p>
            </div>
          </div>
          <Callout kind="unverified">
            <p>
              ts-rs と tauri-specta の動作は、公式ドキュメントと crates.io の情報に基づく記述で、本書の制作環境では未検証です。採用時は、使う時点の最新のドキュメントで API を確認してください。
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
              Tsumugi では、ページの作成・取得・更新・削除、検索、簡易データベースの操作、Markdown の書き出しと読み込みが、すべてコマンドとして Rust 側に並びます。フロントエンドの <code>src/lib/ipc.ts</code> がこの章の方法1そのもので、全コマンドの <code>invoke</code> をここに集め、<code>src/lib/types.ts</code> に Rust の構造体と対になる型を置きます（<ChapterLink n={41} />）。
            </p>
            <p>
              エラーは、この章の <code>thiserror</code> と <code>Serialize</code> の形で <code>AppError</code> という1つの型にまとめます（<code>src-tauri/src/error.rs</code>）。rusqlite のエラーや I/O エラーは <code>#[from]</code> で <code>AppError</code> に変換され、すべてのコマンドが <code>Result&lt;T, AppError&gt;</code> を返します。フロントエンドはこれを <code>catch</code> で受け取り、トーストとして表示します（<ChapterLink n={50} />）。
            </p>
            <p>
              データベース接続は <code>State&lt;Mutex&lt;Connection&gt;&gt;</code> としてコマンドに注入されます。SQLite の操作は同期的ですが、ロックの範囲を狭く保てば同期コマンドでも十分に速く、非同期コマンドにするときは <code>Result</code> を返す形で借用の制約を満たします。この設計の詳細は <ChapterLink n={36} /> と <ChapterLink n={42} /> で扱います。
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
            <li>コマンドは <code>#[tauri::command]</code> を付けた Rust の関数で、<code>generate_handler!</code> に1回でまとめて登録し、フロントエンドから <code>invoke</code> で呼ぶ。名前はアプリ全体で一意。</li>
            <li>引数は JSON オブジェクトで渡し、Rust の snake_case は既定で camelCase に変換される。引数は <code>Deserialize</code>、戻り値は <code>Serialize</code> が必要で、構造体には derive と <code>rename_all</code> を付ける。</li>
            <li><code>Result</code> を返すと <code>Err</code> が Promise の拒否になる。エラー型は <code>Serialize</code> が必要で、<code>thiserror</code> の型に手で実装するのが定石。</li>
            <li><code>async fn</code> のコマンドは別タスクで動く。借用した引数を使うときは戻り値を <code>Result</code> にし、<code>Future</code> は <code>Send</code> でなければならない。</li>
            <li><code>State</code>、<code>WebviewWindow</code>、<code>AppHandle</code> は型で判別されて自動注入される。</li>
            <li>TypeScript と Rust の型は、手でそろえて <code>invoke</code> を1か所に集めるか、ts-rs や tauri-specta（2026-11-08 時点で 2.0.0-rc.26）で生成する。</li>
          </ul>
          <p>次章では、逆向きの通信、つまり Rust からフロントエンドへ知らせるためのイベントとチャネルを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Calling Rust from the Frontend',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'コマンドの定義と登録、引数の camelCase 変換、Serialize/Deserialize の要件、エラー処理、非同期コマンドの制約、注入される引数、完全な例の根拠。',
    },
    {
      title: '@tauri-apps/api: core',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacecore/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'invoke の型、InvokeArgs、生のバイト列と ArrayBuffer の扱いの根拠。',
    },
    {
      title: 'ts-rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/ts-rs',
      accessed: '2026-11-08',
      version: 'ts-rs 12.0.1',
      note: '#[derive(TS)] と #[ts(export)]、cargo test による書き出し、serde-compat 機能の根拠。',
    },
    {
      title: 'tauri_specta',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri-specta/2.0.0-rc.26/tauri_specta/',
      accessed: '2026-11-08',
      version: 'tauri-specta 2.0.0-rc.26',
      note: '#[specta::specta]、collect_commands!、export、invoke_handler、mount_events の使い方と依存クレートのバージョン指定の根拠。',
    },
    {
      title: 'crates.io API: tauri-specta',
      publisher: 'crates.io',
      url: 'https://crates.io/api/v1/crates/tauri-specta',
      accessed: '2026-11-08',
      note: '最新版が 2.0.0-rc.26（2026-10-21）、安定版の最新が 1.0.2 であることの根拠。',
    },
    {
      title: 'Inter-Process Communication',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/inter-process-communication/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'コマンドを IPC メッセージの上の「外部関数インターフェイスに似た抽象」と説明している箇所の根拠。',
    },
  ],
}

export default chapter
