import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 35-1 3方式の比較 ---------- */
function ThreeWaysFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="コマンド、イベント、チャネルの3方式を横に並べ、フロントエンドと Rust の間の矢印の向きと本数で違いを示した図。コマンドは1往復、イベントは両方向の送りっぱなし、チャネルはコマンドで渡した後に Rust から多数の値が順序付きで流れる">
      <defs>
        <marker id="arrow35a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 列の見出し */}
        <text x="120" y="30" textAnchor="middle" fontWeight="600">コマンド</text>
        <text x="320" y="30" textAnchor="middle" fontWeight="600">イベント</text>
        <text x="520" y="30" textAnchor="middle" fontWeight="600">チャネル</text>
        {/* 上段：フロントエンド */}
        {[120, 320, 520].map((x) => (
          <g key={`f${x}`}>
            <rect x={x - 80} y="45" width="160" height="34" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
            <text x={x} y="67" textAnchor="middle">フロントエンド</text>
            <rect x={x - 80} y="215" width="160" height="34" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
            <text x={x} y="237" textAnchor="middle">Rust（Core）</text>
          </g>
        ))}
      </g>
      <g fontSize="12">
        {/* コマンド：下向き要求、上向き応答 */}
        <path d="M100,79 L100,213" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35a)" />
        <path d="M140,213 L140,79" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow35a)" />
        <text x="120" y="140" textAnchor="middle">invoke</text>
        <text x="120" y="156" textAnchor="middle" fill="var(--fig-muted)">1往復・型あり</text>
        {/* イベント：両方向、点線 */}
        <path d="M300,79 L300,213" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow35a)" />
        <path d="M340,213 L340,79" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow35a)" />
        <text x="320" y="140" textAnchor="middle">emit / listen</text>
        <text x="320" y="156" textAnchor="middle" fill="var(--fig-muted)">送りっぱなし・JSON</text>
        {/* チャネル：下向き1本（invoke で渡す）、上向き多数 */}
        <path d="M480,79 L480,213" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35a)" />
        {[510, 530, 550].map((x) => (
          <path key={x} d={`M${x},213 L${x},79`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow35a)" />
        ))}
        <text x="520" y="140" textAnchor="middle">Channel.send</text>
        <text x="520" y="156" textAnchor="middle" fill="var(--fig-muted)">多数・順序付き</text>
      </g>
      <text x="320" y="280" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：要求や渡し込み　細線：応答や送信　点線：どちらからでも発行できる　模式図</text>
    </svg>
  )
}

/* ---------- 図 35-2 イベントのシーケンス ---------- */
function EventSequenceFigure() {
  const lanes = [
    { x: 90, label: 'Rust のコマンド' },
    { x: 290, label: 'Core（イベント基盤）' },
    { x: 470, label: 'main ウィンドウ' },
    { x: 590, label: 'settings' },
  ]
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="Rust が emit と emit_to でイベントを発行したときのシーケンス図。emit したイベントは main と settings の両方のリスナーに届き、emit_to で main を指定したイベントは main だけに届く。各ウィンドウは事前に listen で登録しておく">
      <defs>
        <marker id="arrow35b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 60} y="16" width="120" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="12" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="300" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <path d="M470,80 L292,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="380" y="72" textAnchor="middle">listen('page-saved')</text>
        <path d="M590,110 L292,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="440" y="102" textAnchor="middle">listen('page-saved')</text>

        <path d="M90,160 L288,160" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="190" y="152" textAnchor="middle">emit("page-saved", payload)</text>
        <path d="M290,185 L468,185" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <path d="M290,205 L588,205" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="380" y="177" textAnchor="middle">全リスナーに配る</text>

        <path d="M90,250 L288,250" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="190" y="242" textAnchor="middle">emit_to("main", "focus-page", …)</text>
        <path d="M290,275 L468,275" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35b)" />
        <text x="380" y="267" textAnchor="middle">main だけに届く</text>
      </g>
      <text x="320" y="320" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：Core は Rust 側からもフロントエンド側からも同じ仕組みでイベントを受け付ける</text>
    </svg>
  )
}

/* ---------- 図 35-3 チャネルのシーケンス ---------- */
function ChannelSequenceFigure() {
  const lanes = [
    { x: 110, label: 'フロントエンド' },
    { x: 330, label: 'Core' },
    { x: 530, label: 'コマンド export_all' },
  ]
  return (
    <svg viewBox="0 0 640 355" role="img" aria-label="チャネルを使った進捗通知のシーケンス図。フロントエンドが new Channel を作って onmessage を設定し、invoke の引数として渡す。コマンドは処理の途中で何度も send を呼び、各メッセージが順番に onmessage に届く。最後にコマンドが返り、Promise が解決される">
      <defs>
        <marker id="arrow35c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 75} y="16" width="150" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="12" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="310" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <rect x="20" y="62" width="180" height="22" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="110" y="77" textAnchor="middle">new Channel() + onmessage</text>
        <path d="M110,100 L528,100" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35c)" />
        <text x="320" y="92" textAnchor="middle">invoke('export_all', {'{ onEvent: channel }'})</text>
        {[
          { y: 140, label: 'send(Started { total })' },
          { y: 175, label: 'send(Progress { done: 1 })' },
          { y: 210, label: 'send(Progress { done: 2 })' },
          { y: 245, label: 'send(Finished)' },
        ].map((m) => (
          <g key={m.y}>
            <path d={`M530,${m.y} L112,${m.y}`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow35c)" />
            <text x="320" y={m.y - 8} textAnchor="middle">{m.label}</text>
          </g>
        ))}
        <path d="M530,285 L112,285" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow35c)" />
        <text x="320" y="277" textAnchor="middle">コマンドが返る → Promise 解決</text>
      </g>
      <text x="320" y="330" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：send された順に onmessage が呼ばれる</text>
      <text x="320" y="346" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">コマンドが返った後も、Rust 側がチャネルを持っていれば送り続けられる</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 35,
  part: 5,
  title: 'イベントとチャネル',
  summary:
    'コマンドが「フロントエンドから Rust へ」の呼び出しなら、イベントとチャネルは「Rust からフロントエンドへ」知らせる仕組みです。emit と listen によるイベント、Channel による順序付きのストリーム、そしてコマンドを含めた3方式の使い分けを、公式ドキュメントの記述に沿って整理します。',
  goals: [
    'コマンド、イベント、チャネルの3方式の違いと向き・不向きを説明できる',
    'Rust から emit と emit_to でイベントを発行し、React 側で listen と unlisten で受け取れる',
    'useEffect の後始末で unlisten を正しく呼ぶ形を書ける',
    'tauri::ipc::Channel と JavaScript の Channel で、進捗のような連続した値を順序付きで流せる',
    'イベントが低遅延・高スループット向けではないという公式の記述を踏まえて方式を選べる',
  ],
  prerequisites: [3, 12, 21, 30, 33, 34],
  sections: [
    {
      id: 'why-reverse',
      title: 'なぜ逆向きの通信が必要か',
      body: (
        <>
          <p>
            <ChapterLink n={34} /> のコマンドは、常にフロントエンドが起点でした。呼ぶ、待つ、受け取る、の1往復です。しかしアプリには、Rust 側が起点になって画面に知らせたい場面があります。たとえば、長い書き出し処理の進捗を表示したい、別のウィンドウで保存したページをサイドバーに反映したい、OS からの通知やファイルの変更を画面に伝えたい、といった場面です。
          </p>
          <p>
            Tauri はこのために、<Term en="event">イベント</Term>と<Term en="channel">チャネル</Term>という2つの仕組みを用意しています。公式ドキュメント「Calling the Frontend from Rust」は、イベントを「少量のデータを双方向にやりとりする単純な仕組み」として紹介したうえで、「イベントシステムは低遅延や高スループットの状況向けには設計されていない」と明言し、ストリーミングにはチャネルを使うよう促しています。<Ref n={1} /> この一文が、この章全体の指針になります。
          </p>
          <p>
            どちらの仕組みも、React 側では <ChapterLink n={12} /> の <code>useEffect</code> と後始末の知識が前提になります。Rust 側では <ChapterLink n={21} /> の列挙型と serde、<ChapterLink n={30} /> の非同期処理が登場します。
          </p>
        </>
      ),
    },
    {
      id: 'three-ways',
      title: '3方式の比較：コマンド、イベント、チャネル',
      body: (
        <>
          <p>まず全体像です。3つの方式を、通信の向きと性質で並べました。</p>
          <Figure n="35-1" title="コマンド・イベント・チャネルの比較" caption="コマンドはフロントエンドからの1往復。イベントはどちらからでも発行できる送りっぱなしのメッセージ。チャネルは invoke で Rust に渡し、その後 Rust から多数の値が順序付きで流れてくる。模式図。">
            <ThreeWaysFigure />
          </Figure>
          <p>公式ドキュメントが挙げる、コマンドと比べたときのイベントの性質は次の3点です。<Ref n={1} /></p>
          <ul>
            <li>強い型の支えがない。イベント名は文字列で、ペイロードの型はフロントエンドが型引数で「宣言」するだけ。</li>
            <li>ペイロードは常に JSON 文字列として運ばれるので、大きなメッセージには向かない。</li>
            <li>capability の仕組みで、イベントのデータやチャネルを細かく制御することはできない（<ChapterLink n={37} /> で見るとおり、イベント API 全体の許可・拒否は permission でできるが、イベント名やペイロード単位の制御はできない）。</li>
          </ul>
          <p>
            一方、チャネルは「高速で、順序付きのデータを届けるように設計されている」と説明され、Tauri 自身もダウンロードの進捗、子プロセスの出力、WebSocket のメッセージにチャネルを使っています。<Ref n={1} /> これらをまとめると、次の表になります。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>コマンド</th>
                  <th>イベント</th>
                  <th>チャネル</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>起点</td>
                  <td>フロントエンド</td>
                  <td>どちらでも</td>
                  <td>フロントエンドが作り、Rust が送る</td>
                </tr>
                <tr>
                  <td>応答</td>
                  <td>1回（戻り値）</td>
                  <td>なし（送りっぱなし）</td>
                  <td>何回でも（順序付き）</td>
                </tr>
                <tr>
                  <td>型</td>
                  <td>Rust の型と serde</td>
                  <td>名前は文字列、JSON のみ</td>
                  <td>Rust の型と serde</td>
                </tr>
                <tr>
                  <td>向く用途</td>
                  <td>要求と結果の往復</td>
                  <td>ライフサイクルや状態変化の通知</td>
                  <td>進捗、ログ、大量データのストリーム</td>
                </tr>
                <tr>
                  <td>向かない用途</td>
                  <td>Rust 起点の通知</td>
                  <td>低遅延・高スループット、大きなデータ</td>
                  <td>不特定多数への放送</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            迷ったときの判断は単純です。フロントエンドが聞きたいときに聞くならコマンド、Rust 側で何かが起きたことを広く知らせるならイベント、1つの処理から連続して値を流すならチャネル、です。
          </p>
        </>
      ),
    },
    {
      id: 'emit',
      title: 'イベントを発行する：emit と emit_to',
      body: (
        <>
          <p>
            Rust 側でイベントを発行するには、<code>tauri::Emitter</code> トレイトのメソッドを使います。<code>App</code>、<code>AppHandle</code>、<code>Window</code>、<code>Webview</code>、<code>WebviewWindow</code> がこのトレイトを実装しているので、<ChapterLink n={34} /> で見た注入される引数の <code>AppHandle</code> から呼べます。<Ref n={2} /> ペイロードの型は <code>Serialize + Clone</code> が条件です。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            title="グローバルなイベントを発行する"
            code={`
use tauri::{AppHandle, Emitter};

#[derive(Clone, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct PageSaved {
    page_id: String,
    updated_at: String,
}

#[tauri::command]
fn save_page(app: AppHandle, page_id: String) -> Result<(), String> {
    // ... 保存処理 ...
    app.emit("page-saved", PageSaved { page_id, updated_at: "2026-11-08T00:00:00Z".into() })
        .map_err(|e| e.to_string())?;
    Ok(())
}
`}
          />
          <p>
            <code>emit</code> は「すべてのターゲットにイベントを発行する」メソッドで、グローバルなイベントはすべてのリスナーに届きます。<Ref n={1} /><Ref n={2} /> 特定のウィンドウだけに届けたいときは <code>emit_to</code> を使い、第1引数にウィンドウのラベルを渡します。複数のウィンドウを条件で選ぶには <code>emit_filter</code> に閉包を渡します。<Ref n={1} /><Ref n={2} />
          </p>
          <Code
            lang="rust"
            title="ウィンドウを指定して発行する"
            code={`
use tauri::{AppHandle, Emitter, EventTarget};

fn notify(app: &AppHandle) -> tauri::Result<()> {
    // main ウィンドウだけに届く
    app.emit_to("main", "focus-page", "p1")?;

    // 条件に合うウィンドウにだけ届く
    app.emit_filter("open-file", "/path/to/file", |target| match target {
        EventTarget::WebviewWindow { label } => label == "main" || label == "file-viewer",
        _ => false,
    })?;
    Ok(())
}
`}
          />
          <p>
            ここで1つ注意があります。<code>emit_to</code> で特定のウィンドウに送ったイベントは、普通の <code>listen</code> で登録したグローバルなリスナーには届きません。すべてのイベントを受けたいときは、Rust では <code>listen_any</code> を使います。<Ref n={4} /> JavaScript の <code>@tauri-apps/api/event</code> の <code>listen</code> はオプション <code>target</code> の既定値が <code>{'{ kind: \'Any\' }'}</code> なので、<code>emit_to</code> で送ったイベントも届きます。絞られるのは <code>getCurrentWebviewWindow().listen()</code> のようにウィンドウオブジェクト経由で登録した場合で、自分宛てのイベントだけを受けます。<Ref n={1} /><Ref n={3} />
          </p>
          <Figure n="35-2" title="emit と emit_to の届き方" caption="main と settings の2つのウィンドウが page-saved を listen している。emit したイベントは両方に届き、emit_to で main を指定した focus-page は main だけに届く。模式図。">
            <EventSequenceFigure />
          </Figure>
          <p>
            図 35-2 のとおり、イベントは Core のイベント基盤を経由して配られます。フロントエンドからも <code>@tauri-apps/api/event</code> の <code>emit</code> と <code>emitTo</code> で同じように発行でき、Rust 側は <code>Listener</code> トレイトの <code>listen</code> や <code>once</code> で受け取れます。<Ref n={1} /><Ref n={3} /><Ref n={4} /> <ChapterLink n={33} /> で見た「イベントはどちらからでも発行できる」の具体的な姿です。
          </p>
        </>
      ),
    },
    {
      id: 'listen',
      title: 'イベントを受け取る：listen、once、unlisten',
      body: (
        <>
          <p>
            フロントエンドでは <code>@tauri-apps/api/event</code> の <code>listen</code> を使います。型は <code>listen&lt;T&gt;(event, handler, options?): Promise&lt;UnlistenFn&gt;</code> で、ハンドラには <code>Event&lt;T&gt;</code>（<code>event</code> 名、<code>id</code>、<code>payload</code>）が渡されます。<Ref n={3} /> 戻り値の Promise が解決すると、登録を解除する関数 <code>UnlistenFn</code>（型は <code>() =&gt; void</code>）が得られます。<Ref n={3} />
          </p>
          <Code
            lang="ts"
            title="基本形"
            code={`
import { listen } from '@tauri-apps/api/event'

type PageSaved = { pageId: string; updatedAt: string }

const unlisten = await listen<PageSaved>('page-saved', (event) => {
  console.log(event.payload.pageId, event.payload.updatedAt)
})

// 不要になったら
unlisten()
`}
          />
          <p>
            React では、<ChapterLink n={12} /> で学んだとおり、登録は <code>useEffect</code> の中で行い、クリーンアップで解除します。ここに公式ドキュメントが指摘する落とし穴があります。<code>listen</code> が返すのは Promise であって解除関数ではないので、Promise が解決する前に <code>unlisten()</code> を呼ぼうとしても何も起きません。<Ref n={1} /> 公式ドキュメントの React 向けの例は次の形です。<Ref n={1} />
          </p>
          <Code
            lang="tsx"
            title="React での登録と後始末"
            code={`
import { useEffect, useState } from 'react'
import { listen } from '@tauri-apps/api/event'

type PageSaved = { pageId: string; updatedAt: string }

export function SavedIndicator() {
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    // Promise を保持しておく
    const unlisten = listen<PageSaved>('page-saved', (event) => {
      setLastSaved(event.payload.updatedAt)
    })
    return () => {
      // 解決を待ってから解除する
      unlisten.then((f) => f())
    }
  }, [])

  return <span>{lastSaved ? \`保存済み \${lastSaved}\` : '未保存'}</span>
}
`}
          />
          <p>
            クリーンアップ関数の中で <code>unlisten.then((f) =&gt; f())</code> としているのが要点です。StrictMode の開発時の二重実行（<ChapterLink n={12} />）でも、この形なら登録と解除が対になります。公式ドキュメントはさらに、ページの再読み込みや別 URL への移動ではリスナーが自動で解除されるが、SPA のルーターによる画面遷移では解除されない、と注意しています。<Ref n={1} /> <ChapterLink n={15} /> のルーティングを使うアプリでは、部品ごとに <code>useEffect</code> で解除するのが唯一の安全策です。
          </p>
          <p>
            1回だけ受け取りたいときは <code>once</code> を使います。シグネチャは <code>listen</code> と同じで、1回呼ばれた後に自動で解除されます。<Ref n={3} /> また、Tauri 自身もウィンドウの状態変化を <code>tauri://</code> で始まる名前のイベントとして発行しています。<code>TauriEvent</code> 列挙型には <code>WINDOW_CLOSE_REQUESTED</code>（<code>tauri://close-requested</code>）、<code>WINDOW_FOCUS</code>（<code>tauri://focus</code>）、<code>WINDOW_RESIZED</code>（<code>tauri://resize</code>）、<code>WINDOW_THEME_CHANGED</code>（<code>tauri://theme-changed</code>）、<code>DRAG_DROP</code>（<code>tauri://drag-drop</code>）などがあります。<Ref n={3} />
          </p>
          <h3>Rust 側で受け取る</h3>
          <p>
            Rust 側は <code>tauri::Listener</code> トレイトです。<code>listen</code> は <code>Fn(Event) + Send + 'static</code> のハンドラを取り、<code>EventId</code> を返します。<code>once</code> は <code>FnOnce</code> で1回だけ、<code>unlisten(id)</code> で解除します。<Ref n={4} /> ペイロードは JSON 文字列として届くので、<code>serde_json::from_str</code> で型に戻します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="setup の中でフロントエンドからのイベントを受け取る"
            code={`
use tauri::Listener;

tauri::Builder::default()
    .setup(|app| {
        app.listen("theme-changed", |event| {
            // event.payload() は &str（JSON）
            if let Ok(theme) = serde_json::from_str::<String>(event.payload()) {
                println!("theme: {theme}");
            }
        });
        Ok(())
    })
`}
          />
          <Callout kind="warn">
            <p>
              公式ドキュメントは、非同期のリスナーが短い間隔で届くイベントを順不同で処理し得ることも注意しています。<Ref n={1} /> 順序が重要なデータは、次節のチャネルで流します。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'channels',
      title: 'チャネル：順序付きのストリーム',
      body: (
        <>
          <p>
            <Term en="Channel">チャネル</Term>は、1つのコマンドから複数の値をフロントエンドへ流すための仕組みです。コマンドは1回しか値を返せませんが、チャネルを渡しておけば、コマンドが返る前でも後でも何度でも <code>send</code> できます。docs.rs の説明によると、各メッセージには番号が付き、JavaScript 側で順番が入れ替わっていても並べ直すので、<code>onmessage</code> は常に送った順に呼ばれます。<Ref n={5} />
          </p>
          <p>
            使い方は、フロントエンドで <code>Channel</code> を作って <code>invoke</code> の引数として渡し、Rust 側のコマンドで <code>tauri::ipc::Channel&lt;T&gt;</code> として受け取る、という形です。<code>T</code> は <code>Serialize</code> な型なら何でも構いません。<Ref n={5} /> 公式ドキュメントのダウンロードの例を、Tsumugi の全ページ書き出しに置き換えて示します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            title="Rust 側：進捗を流すコマンド"
            code={`
use tauri::ipc::Channel;

#[derive(Clone, serde::Serialize)]
#[serde(rename_all = "camelCase", tag = "event", content = "data")]
enum ExportEvent {
    Started { total: usize },
    Progress { done: usize },
    Finished,
}

#[tauri::command]
fn export_all(on_event: Channel<ExportEvent>) -> Result<(), String> {
    let pages = vec!["p1", "p2", "p3"]; // 実際は DB から読む
    on_event.send(ExportEvent::Started { total: pages.len() }).map_err(|e| e.to_string())?;
    for (i, _page) in pages.iter().enumerate() {
        // ... 1ページ書き出す ...
        on_event.send(ExportEvent::Progress { done: i + 1 }).map_err(|e| e.to_string())?;
    }
    on_event.send(ExportEvent::Finished).map_err(|e| e.to_string())?;
    Ok(())
}
`}
          />
          <Code
            lang="ts"
            title="フロントエンド側：Channel を作って渡す"
            code={`
import { Channel, invoke } from '@tauri-apps/api/core'

type ExportEvent =
  | { event: 'started'; data: { total: number } }
  | { event: 'progress'; data: { done: number } }
  | { event: 'finished' }

const onEvent = new Channel<ExportEvent>()
onEvent.onmessage = (message) => {
  switch (message.event) {
    case 'started':
      console.log(\`全 \${message.data.total} ページ\`)
      break
    case 'progress':
      console.log(\`\${message.data.done} ページ完了\`)
      break
    case 'finished':
      console.log('完了')
      break
  }
}

await invoke('export_all', { onEvent })
`}
          />
          <p>
            Rust 側の列挙型に付けた <code>#[serde(tag = "event", content = "data")]</code> により、JSON は <code>{'{ "event": "progress", "data": { "done": 1 } }'}</code> の形になります。TypeScript 側では判別可能なユニオン（<ChapterLink n={6} />）として受け取れるので、<code>switch</code> で安全に分岐できます。<ChapterLink n={34} /> のエラー型と同じ技法です。
          </p>
          <Figure n="35-3" title="チャネルによる進捗通知の流れ" caption="フロントエンドが Channel を作り onmessage を設定してから invoke の引数で渡す。コマンドは処理の途中で send を繰り返し、各メッセージは送った順に onmessage に届く。模式図。">
            <ChannelSequenceFigure />
          </Figure>
          <p>
            図 35-3 で、<code>onmessage</code> の設定が <code>invoke</code> より前にある点に注意してください。<code>@tauri-apps/api</code> のリファレンスは、ハンドラを設定する前に届いたメッセージは再生されないので、チャネルを Rust に渡す前に <code>onmessage</code> を設定するよう注意しています。<Ref n={6} /> また、ハンドラを設定し直すと古いハンドラは捨てられます。<Ref n={6} />
          </p>
          <Callout>
            <p>
              チャネルでバイト列を流すときは、<code>Channel&lt;Vec&lt;u8&gt;&gt;</code> だと JSON の数値配列になります。docs.rs の説明によると、<code>Channel&lt;InvokeResponseBody&gt;</code> で <code>InvokeResponseBody::Raw</code> を送れば、JavaScript 側には <code>ArrayBuffer</code> として届きます。<Ref n={5} /> 公式ドキュメントのファイル読み込みの例では <code>Channel&lt;&amp;[u8]&gt;</code> が使われています。<Ref n={7} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'choosing',
      title: '使い分けとよくある誤り',
      body: (
        <>
          <p>3方式の違いを踏まえて、設計でよく迷う場面を整理します。</p>
          <ol className="steps">
            <li>
              画面がデータを必要とする場面は、イベントで配るのではなくコマンドで取りに行きます。イベントで「最新のページ一覧」を配ると、画面が出た時点ではまだ届いていない、という状態が生まれます。イベントは「変わった」という合図だけにして、合図を受けたらコマンドで取り直すのが安定します。
            </li>
            <li>
              1秒に何十回も届く値（再生位置、ログの行、大きなファイルの読み込み）はチャネルにします。公式ドキュメントの「イベントは低遅延・高スループット向けではない」という記述がそのまま当てはまります。<Ref n={1} />
            </li>
            <li>
              大きなデータをイベントに載せません。ペイロードは JSON 文字列として運ばれます。<Ref n={1} /> バイナリは <ChapterLink n={34} /> の <code>tauri::ipc::Response</code> か、チャネルの <code>Raw</code> を使います。
            </li>
            <li>
              リスナーの解除を忘れません。SPA の画面遷移では自動で解除されず、<ChapterLink n={12} /> の二重実行で登録が重複します。<code>useEffect</code> のクリーンアップで <code>unlisten.then((f) =&gt; f())</code> を必ず書きます。
            </li>
          </ol>
          <p>
            最後に、第3の手段として <code>WebviewWindow::eval</code> があります。任意の JavaScript 文字列を WebView で実行するメソッドで、公式ドキュメントは <code>webview.eval("console.log('hello from Rust')")</code> という例を示しています。<Ref n={1} /> ただし、文字列を組み立てて実行する方法はエスケープの誤りがそのまま脆弱性になります。Rust の値を渡したいときのために <code>serialize-to-javascript</code> クレートが紹介されていますが、本書ではイベントとチャネルで足りる範囲に留め、<code>eval</code> は使いません。<Ref n={1} />
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
              Tsumugi の通信はほとんどがコマンドで済みます。ページの読み書きも検索も、画面が必要なときに <code>src/lib/ipc.ts</code> の関数で取りに行く設計です（<ChapterLink n={43} />）。イベントとチャネルの出番は限られますが、その限られた場面がこの章の内容です。
            </p>
            <p>
              イベントを使うのは、OS の設定変更を画面に伝える場面です。ダークモードの OS 追従（<ChapterLink n={50} />）では、<code>tauri://theme-changed</code> を <code>listen</code> して CSS のクラスを切り替えます。また、ウィンドウを閉じる前に未保存の内容を確認するために、<ChapterLink n={36} /> で学ぶ <code>on_window_event</code> と組み合わせて <code>tauri://close-requested</code> を扱います。
            </p>
            <p>
              チャネルを使うのは、全ページの Markdown 書き出し（<ChapterLink n={49} />）です。この章の <code>export_all</code> の形で進捗を流し、画面には進捗バーを出します。ページ数が多いときに「固まった」と見えないようにするためで、イベントではなくチャネルを選ぶ理由は、順序が保証され、処理ごとに独立したストリームになるからです。
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
            <li>コマンドはフロントエンド起点の1往復、イベントはどちらからでも発行できる送りっぱなしの通知、チャネルは1つのコマンドから順序付きで多数の値を流すストリーム。</li>
            <li>公式ドキュメントは、イベントが低遅延・高スループット向けに設計されていないこと、ペイロードが JSON 文字列であること、capability で細かく制御できないことを明記している。</li>
            <li>Rust では <code>Emitter</code> の <code>emit</code>／<code>emit_to</code>／<code>emit_filter</code> で発行し、<code>Listener</code> の <code>listen</code>／<code>once</code>／<code>unlisten</code> で受け取る。ペイロードは <code>Serialize + Clone</code>。</li>
            <li>React では <code>useEffect</code> で <code>listen</code> し、クリーンアップで <code>unlisten.then((f) =&gt; f())</code> と書く。Promise 解決前の <code>unlisten()</code> は効かない。</li>
            <li>チャネルは <code>new Channel()</code> に <code>onmessage</code> を設定してから <code>invoke</code> に渡し、Rust の <code>Channel&lt;T&gt;</code> で <code>send</code> する。メッセージは送った順に届く。</li>
          </ul>
          <p>次章では、コマンドやイベントのハンドラが共有するアプリ全体の状態と、アプリの起動から終了までのライフサイクルを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Calling the Frontend from Rust',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/develop/calling-frontend/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'イベントが低遅延・高スループット向けでないという記述、コマンドと比べたイベントの性質、emit/emit_to/emit_filter、listen と unlisten の落とし穴、チャネルの設計意図、eval の根拠。',
    },
    {
      title: 'tauri::Emitter',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/trait.Emitter.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'emit、emit_to、emit_filter のシグネチャ、Serialize + Clone の境界、実装する型の根拠。',
    },
    {
      title: '@tauri-apps/api: event',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/api/namespaceevent/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'emit、emitTo、listen、once のシグネチャ、Event と UnlistenFn の型、Options の target、TauriEvent の値の根拠。',
    },
    {
      title: 'tauri::Listener',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/trait.Listener.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'listen、once、unlisten、listen_any のシグネチャとハンドラの境界の根拠。',
    },
    {
      title: 'tauri::ipc::Channel',
      publisher: 'docs.rs',
      url: 'https://docs.rs/tauri/latest/tauri/ipc/struct.Channel.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'Channel の型と send、メッセージの順序の保証、Raw ペイロードが ArrayBuffer になることの根拠。',
    },
    {
      title: '@tauri-apps/api: core',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacecore/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'JavaScript 側の Channel クラス、onmessage を先に設定する必要があることの根拠。',
    },
    {
      title: 'Calling Rust from the Frontend（Channels の節）',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'ファイルをチャンクで読み Channel<&[u8]> で流す例の根拠。',
    },
  ],
}

export default chapter
