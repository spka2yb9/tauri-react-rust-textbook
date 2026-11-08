import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 55-1 レイアウトの切り替え ---------- */
function LayoutSwitchFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="デスクトップとモバイルのレイアウト比較。左は幅 720px 以上でサイドバーとエディタが横に並ぶ。右は幅 720px 未満でサイドバーがドロワーとして画面の外に隠れ、ヘッダーのボタンで左から引き出す">
      <defs>
        <marker id="arrow55a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* desktop */}
      <text x="190" y="24" fontSize="14" fontWeight="600" textAnchor="middle">幅 720px 以上（デスクトップ、タブレット横）</text>
      <rect x="20" y="36" width="340" height="220" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <rect x="30" y="46" width="100" height="200" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="80" y="70" fontSize="12" textAnchor="middle">サイドバー</text>
      <text x="80" y="90" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">ページツリー</text>
      <text x="80" y="108" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">常に表示</text>
      <rect x="140" y="46" width="210" height="200" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="245" y="70" fontSize="12" textAnchor="middle">エディタ</text>
      <text x="245" y="90" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">BlockNote</text>
      {/* mobile */}
      <text x="510" y="24" fontSize="14" fontWeight="600" textAnchor="middle">幅 720px 未満（スマートフォン）</text>
      <rect x="440" y="36" width="140" height="220" rx="12" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <rect x="448" y="46" width="124" height="28" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="462" y="65" fontSize="14">≡</text>
      <text x="520" y="65" fontSize="11" textAnchor="middle">ヘッダー</text>
      <rect x="448" y="80" width="124" height="166" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="510" y="160" fontSize="12" textAnchor="middle">エディタ</text>
      <text x="510" y="178" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">全幅</text>
      {/* drawer hidden */}
      <rect x="384" y="80" width="52" height="166" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeDasharray="5 4" opacity="0.8" />
      <text x="410" y="150" fontSize="11" textAnchor="middle" transform="rotate(-90 410 150)">ドロワー（隠れている）</text>
      <path d="M440,60 C420,60 410,70 436,100" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow55a)" />
      <text x="320" y="280" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図。破線はふだん画面外にあり、≡ ボタンまたは左端からのスワイプで現れる部分</text>
    </svg>
  )
}

/* ---------- 図 55-2 セーフエリア ---------- */
function SafeAreaFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="スマートフォンの画面とセーフエリア。上部のノッチと下部のホームインジケーターが画面に重なる。viewport-fit=cover で WebView が画面全体に広がり、env(safe-area-inset-top) と env(safe-area-inset-bottom) がそれぞれ上と下の重なりの高さを表す">
      <defs>
        <marker id="arrow55b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* phone */}
      <rect x="200" y="20" width="200" height="300" rx="24" fill="var(--fig-box)" stroke="var(--fig-line)" strokeWidth="2" />
      {/* webview covers all */}
      <rect x="210" y="30" width="180" height="280" rx="16" fill="var(--fig-box3)" stroke="none" opacity="0.5" />
      {/* notch */}
      <rect x="260" y="30" width="80" height="22" rx="10" fill="var(--fig-line)" />
      {/* home indicator */}
      <rect x="265" y="296" width="70" height="5" rx="2.5" fill="var(--fig-line)" />
      {/* safe area */}
      <rect x="210" y="66" width="180" height="214" fill="var(--fig-bg)" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="300" y="150" fontSize="13" textAnchor="middle">セーフエリア</text>
      <text x="300" y="170" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">ここに置けば隠れない</text>
      {/* labels */}
      <path d="M420,30 L420,66" stroke="var(--fig-line)" strokeWidth="2" markerStart="url(#arrow55b)" markerEnd="url(#arrow55b)" />
      <text x="432" y="52" fontSize="12">env(safe-area-inset-top)</text>
      <path d="M420,280 L420,310" stroke="var(--fig-line)" strokeWidth="2" markerStart="url(#arrow55b)" markerEnd="url(#arrow55b)" />
      <text x="432" y="300" fontSize="12">env(safe-area-inset-bottom)</text>
      <text x="100" y="60" fontSize="12" textAnchor="middle">WebView の範囲</text>
      <text x="100" y="78" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">（viewport-fit=cover）</text>
      <path d="M150,66 L208,40" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow55b)" />
      <text x="100" y="200" fontSize="12" textAnchor="middle">固定ヘッダーの</text>
      <text x="100" y="216" fontSize="12" textAnchor="middle">padding-top に加算</text>
      <path d="M150,205 L208,70" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow55b)" />
      <text x="320" y="334" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図。実際の値は端末ごとに異なり、横向きでは左右の inset が非ゼロになる</text>
    </svg>
  )
}

/* ---------- 図 55-3 ライフサイクル ---------- */
function LifecycleFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="モバイルアプリの状態遷移。前面で動作中の状態から、ユーザーがアプリを切り替えると背面に移り、WebView には visibilitychange が届く。背面のままメモリ不足になると OS が通知なしにプロセスを終了することがある。背面から戻ると再び前面になる">
      <defs>
        <marker id="arrow55c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="30" y="70" width="160" height="80" rx="10" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="110" y="100" textAnchor="middle" fontWeight="600">前面（動作中）</text>
        <text x="110" y="122" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">visibilityState = visible</text>

        <rect x="250" y="70" width="160" height="80" rx="10" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="330" y="100" textAnchor="middle" fontWeight="600">背面（一時停止）</text>
        <text x="330" y="122" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">visibilityState = hidden</text>

        <rect x="470" y="70" width="150" height="80" rx="10" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="545" y="100" textAnchor="middle" fontWeight="600">終了</text>
        <text x="545" y="122" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">OS が黙って止める</text>

        <path d="M190,95 L245,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow55c)" />
        <text x="218" y="60" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">アプリ切替</text>
        <text x="218" y="88" textAnchor="middle" fontSize="11" fill="var(--fig-accent)">保存する</text>
        <path d="M245,125 L190,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow55c)" />
        <text x="218" y="165" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">戻る</text>

        <path d="M410,110 L465,110" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow55c)" />
        <text x="440" y="60" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">メモリ不足など</text>
        <text x="440" y="165" textAnchor="middle" fontSize="11" fill="var(--fig-danger)">通知なし</text>

        <path d="M545,150 C545,220 110,220 110,155" fill="none" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow55c)" />
        <text x="330" y="235" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">次回起動は最初から（保存したデータから復元する）</text>
      </g>
      <text x="320" y="255" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：確実に観測できる遷移　点線：観測できない遷移</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 55,
  part: 8,
  title: 'モバイル対応：UI とプラットフォームの違い',
  summary:
    '同じコードが動くとはいえ、スマートフォンでは画面の幅、タッチ操作、ノッチとホームインジケーター、アプリが背面に回されるライフサイクル、使えるプラグインが変わります。CSS のメディアクエリと env()、platform() と #[cfg(mobile)] による分岐、公式プラグインの対応表を使って、Tsumugi をモバイルに対応させます。',
  goals: [
    '幅に応じてサイドバーをドロワーに切り替えるレスポンシブレイアウトを CSS と React で実装できる',
    'viewport-fit=cover と env(safe-area-inset-*) でノッチやホームインジケーターを避けられる',
    'hover と pointer のメディアクエリでタッチ操作向けの調整ができる',
    'visibilitychange でアプリが背面に回る瞬間を捉え、保存処理を実行できる',
    'platform() と #[cfg(mobile)] / #[cfg(desktop)] で OS ごとに処理を分岐できる',
    '公式プラグインのモバイル対応状況を読み、使えない機能をデスクトップ限定にできる',
  ],
  prerequisites: [16, 38, 50, 54],
  sections: [
    {
      id: 'intro',
      title: '「動く」と「使える」の間',
      body: (
        <>
          <p>
            前章の手順で Tsumugi をシミュレーターで起動すると、デスクトップと同じ画面がそのまま表示されます。幅 1,200px 向けに作ったサイドバーとエディタが、幅 390px の画面に押し込まれた状態です。文字は小さく、サイドバーがエディタを圧迫し、画面上部のノッチにヘッダーが隠れ、ホバーで出していたボタンはタッチでは出せません。動いてはいますが、使えません。
          </p>
          <p>
            この章では、その差を 5 つに分けて埋めていきます。レイアウト、セーフエリア、タッチ、ライフサイクル、そしてプラットフォームごとの機能差です。前半 3 つはほぼ CSS だけで解決でき、<ChapterLink n={16} /> の知識の延長です。後半 2 つは、OS が WebView の外で何をしているかを知る必要があります。
          </p>
          <Callout kind="unverified">
            <p>
              この章の CSS と TypeScript は、iOS / Android の実機やシミュレーターで本書の制作環境では未検証です。セーフエリアの値や WebView の挙動、プラグインの対応状況は、公式資料（MDN、Tauri）の記述に基づきます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'responsive',
      title: 'レイアウト：幅 720px でサイドバーをドロワーにする',
      body: (
        <>
          <p>
            Tsumugi の設計（<ChapterLink n={41} />）では、幅 720px 未満のときにサイドバーを<Term en="drawer">ドロワー</Term>（ふだんは画面外に隠れ、ボタンで引き出すパネル）に切り替えると決めました。この「幅で切り替える」判断を、CSS の<Term en="media query">メディアクエリ</Term>で行います。
          </p>
          <Figure n="55-1" title="デスクトップとモバイルのレイアウト切り替え" caption="模式図。720px 以上ではサイドバーとエディタを横に並べ、720px 未満ではエディタを全幅にし、サイドバーは画面外のドロワーにする。切り替えは CSS のメディアクエリで行い、React は開閉状態だけを持つ。">
            <LayoutSwitchFigure />
          </Figure>
          <p>
            境界を 720px にしたのは、スマートフォンの縦向き（約 360〜430px）と横向き（約 640〜930px）の間で、タブレットの縦向き（768px 前後）がデスクトップ側に入るようにするためです。CSS は次のようになります。
          </p>
          <Code
            lang="css"
            title="src/styles/layout.css（抜粋）"
            code={`
.app {
  display: grid;
  grid-template-columns: 260px 1fr;   /* サイドバー | エディタ */
  height: 100dvh;                      /* dvh：モバイルのアドレスバーの伸縮に追従する */
}

@media (max-width: 719.98px) {
  .app {
    grid-template-columns: 1fr;        /* エディタだけ */
  }
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;                 /* 左端に固定 */
    width: min(300px, 85vw);
    transform: translateX(-100%);      /* ふだんは画面外 */
    transition: transform 0.2s ease-out;
    z-index: 10;
  }
  .sidebar[data-open='true'] {
    transform: translateX(0);
  }
  .sidebar-backdrop[data-open='true'] {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.4);
    z-index: 9;
  }
}
`}
          />
          <p>
            ポイントは、React 側が「ドロワーが開いているか」だけを state として持ち、「ドロワーにするかどうか」は CSS に任せることです。幅の判定を JavaScript で行うと、ウィンドウのリサイズのたびに再レンダリングが必要になりますが、CSS なら描画エンジンが処理します。React 側は <code>data-open</code> 属性を付け外しするだけです。
          </p>
          <Code
            lang="tsx"
            title="src/App.tsx（抜粋）"
            code={`
const [drawerOpen, setDrawerOpen] = useState(false)

return (
  <div className="app">
    <div className="sidebar-backdrop" data-open={drawerOpen} onClick={() => setDrawerOpen(false)} />
    <aside className="sidebar" data-open={drawerOpen} aria-label="ページ一覧">
      <PageTree onSelect={() => setDrawerOpen(false)} />   {/* ページを選んだら閉じる */}
    </aside>
    <main className="editor-pane">
      <header className="app-header">
        <button className="menu-button" aria-label="ページ一覧を開く" onClick={() => setDrawerOpen(true)}>
          ≡
        </button>
        <PageTitle />
      </header>
      <Editor />
    </main>
  </div>
)
`}
          />
          <p>
            <code>menu-button</code> はデスクトップでは不要なので、720px 以上では <code>display: none</code> にします。デスクトップでドロワーを「開いた」状態のまま幅を広げても、サイドバーは通常の列に戻るだけで壊れません。状態と見た目を分離しておくと、こうした境界の往復に強くなります。
          </p>
        </>
      ),
    },
    {
      id: 'safe-area',
      title: 'セーフエリア：ノッチとホームインジケーターを避ける',
      body: (
        <>
          <p>
            現行のスマートフォンは、画面の角が丸く、上部にカメラのノッチ、下部にホームインジケーターがあります。WebView をそこまで広げると、固定ヘッダーの文字がノッチに隠れ、下部のボタンがホームインジケーターと重なります。この「表示はできるが、隠れたり操作を邪魔されたりしない領域」を<Term en="safe area">セーフエリア</Term>と呼びます。
          </p>
          <Figure n="55-2" title="セーフエリアと env() の関係" caption="模式図。viewport-fit=cover で WebView を画面全体に広げると、上下の重なりの高さが env(safe-area-inset-top) と env(safe-area-inset-bottom) で取れる。固定ヘッダーやフッターの padding にこれを加算すれば、内容がセーフエリアに収まる。">
            <SafeAreaFigure />
          </Figure>
          <p>
            対応は 2 段階です。まず <code>index.html</code> の viewport メタタグに <code>viewport-fit=cover</code> を付け、WebView を画面全体に広げます。MDN は <code>cover</code> を「ビューポートを端末の画面いっぱいに拡大する」と定義し、その場合はセーフエリアの変数を使うことを強く推奨しています。<Ref n={11} />
          </p>
          <Code
            lang="html"
            title="index.html（抜粋）"
            code={`
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
`}
          />
          <p>
            次に CSS で、<code>env()</code> 関数から重なりの大きさを読みます。<code>env()</code> は、ブラウザ（ユーザーエージェント）が定義する環境変数の値を CSS に差し込む関数で、<code>safe-area-inset-top</code> / <code>right</code> / <code>bottom</code> / <code>left</code> の 4 つが「ビューポートの各辺から、安全に内容を置ける位置までの距離」を表します。画面が長方形で何も重なっていなければ値は <code>0</code>、重なりがあれば正の <code>px</code> 値です。<Ref n={10} />
          </p>
          <Code
            lang="css"
            title="src/styles/layout.css（抜粋）"
            code={`
.app-header {
  position: sticky;
  top: 0;
  padding-top: calc(0.5rem + env(safe-area-inset-top, 0px));
}

.editor-pane {
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);    /* 横向きのノッチ */
  padding-right: env(safe-area-inset-right, 0px);
}

.sidebar {
  padding-top: env(safe-area-inset-top, 0px);
}
`}
          />
          <p>
            第 2 引数はフォールバックで、変数が存在しないとき（デスクトップのブラウザなど）に使われます。<Ref n={10} /> <code>0px</code> を明示しておけば、<code>calc()</code> の中でも安全です。MDN の例と同じく、フッターの <code>padding-bottom</code> に <code>env(safe-area-inset-bottom)</code> を足すのが基本形です。<Ref n={10} />
          </p>
          <p>
            もう一つ、ソフトウェアキーボードの扱いがあります。エディタをタップするとキーボードが画面の下半分を覆います。MDN によれば、viewport メタタグの <code>interactive-widget=resizes-content</code> は「キーボードなどの操作ウィジェットがビューポート自体を縮める」挙動を指定します。<Ref n={11} /> 既定の <code>resizes-visual</code> では見た目のビューポートだけが縮むため、固定フッターがキーボードの裏に隠れることがあります。Tsumugi ではエディタの下端がキーボードに隠れないよう、<code>resizes-content</code> を指定します。
          </p>
        </>
      ),
    },
    {
      id: 'touch',
      title: 'タッチ操作：ホバーがない世界',
      body: (
        <>
          <p>
            デスクトップの Tsumugi は、ページツリーの項目にマウスを乗せると「追加」「削除」のボタンが現れます。タッチ画面にはホバーがありません。多くのモバイル端末は長押しでホバーを擬似的に発生させますが、MDN はこれを「便利にホバーできない」状態として <code>hover: none</code> に分類しています。<Ref n={12} />
          </p>
          <p>
            対応は、ホバーに依存する UI を「ホバーできる環境でだけ」有効にすることです。<code>@media (hover: hover)</code> は、主要な入力装置が便利にホバーできる場合にだけ一致します。<Ref n={12} />
          </p>
          <Code
            lang="css"
            title="src/styles/sidebar.css（抜粋）"
            code={`
/* 既定：操作ボタンは常に表示（タッチ端末向け） */
.tree-item .actions {
  opacity: 1;
}

/* ホバーできる環境だけ、乗せたときに表示 */
@media (hover: hover) {
  .tree-item .actions {
    opacity: 0;
  }
  .tree-item:hover .actions,
  .tree-item:focus-within .actions {
    opacity: 1;
  }
}

/* 指で操作する環境では当たり判定を大きく */
@media (pointer: coarse) {
  .tree-item {
    min-height: 44px;
  }
  .actions button {
    min-width: 44px;
    min-height: 44px;
  }
}
`}
          />
          <p>
            <code>pointer: coarse</code> は「主要な入力装置が、タッチ画面上の指のように精度の限られたポインティングデバイスである」ことを表します。<Ref n={13} /> マウス向けの小さなボタンを指で押すのは難しいので、この条件で当たり判定を広げます。<code>focus-within</code> を併用しているのは、キーボード操作でもボタンに到達できるようにするためで、<ChapterLink n={16} /> のアクセシビリティの原則そのままです。
          </p>
          <p>
            BlockNote のドラッグ＆ドロップ（<ChapterLink n={44} />）はマウス操作を前提に設計された UI で、ブロック左側のハンドルは細く、指では掴みにくい可能性があります。本書ではタッチ向けの調整は行わず、スラッシュメニューによる操作を主にします。
          </p>
        </>
      ),
    },
    {
      id: 'lifecycle',
      title: 'ライフサイクル：アプリは黙って止められる',
      body: (
        <>
          <p>
            デスクトップでは、アプリはユーザーが閉じるまで動き続けます。モバイルは違います。ユーザーがほかのアプリに切り替えると、アプリは<Term en="background">背面</Term>に回り、OS はいつでもそのプロセスを終了させてよいと判断します。メモリが足りなくなれば、アプリに通知せずに終了します。次に起動したときは、最初からです。
          </p>
          <Figure n="55-3" title="モバイルアプリのライフサイクル" caption="模式図。前面から背面への遷移は WebView に visibilitychange として届くが、背面から終了への遷移は観測できない。したがって、背面に回る瞬間が「確実に保存できる最後の機会」になる。">
            <LifecycleFigure />
          </Figure>
          <p>
            この図の重要な点は、点線の遷移を観測できないことです。「終了するときに保存する」という設計は、モバイルでは成立しません。背面に回る瞬間に保存しなければなりません。
          </p>
          <p>
            WebView の中からこの瞬間を捉えるのが、<code>document</code> の <code>visibilitychange</code> イベントです。MDN によれば、このイベントは「ユーザーがタブを切り替えたとき、別のページに移動したとき、ブラウザを最小化または閉じたとき、モバイルでは別のアプリに切り替えたとき」に発生し、<code>hidden</code> への遷移は「ページが確実に観測できる最後のイベント」なので、「セッションの終わりと見なして扱うべき」とされています。<Ref n={14} />
          </p>
          <Code
            lang="ts"
            title="src/features/editor/useFlushOnHide.ts"
            code={`
import { useEffect } from 'react'

/** 背面に回る瞬間に、保留中の保存を即時に実行する */
export function useFlushOnHide(flush: () => Promise<void>) {
  useEffect(() => {
    const onChange = () => {
      if (document.visibilityState === 'hidden') {
        void flush()   // await できないので投げっぱなしにする
      }
    }
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [flush])
}
`}
          />
          <p>
            Tsumugi の自動保存（<ChapterLink n={44} />）は 800ms のデバウンスで動いています。最後の入力から 800ms 以内にアプリを切り替えると、保存が走る前に背面に回ります。<code>useFlushOnHide</code> は、そのデバウンスを待たずに即時保存する仕組みです。<code>flush</code> は <code>invoke</code> を呼ぶだけなので、IPC を経由して Rust 側の SQLite 書き込みまで届けば、OS がその直後にプロセスを止めても、データは残ります。
          </p>
          <Callout kind="warn">
            <p>
              <code>beforeunload</code> や <code>unload</code> に保存処理を書くのは避けてください。モバイルではこれらが発火しないまま終了することがあります。MDN が参照先として挙げる記事でも、状態の保存には <code>visibilitychange</code> を使うべきだと説明されています。<Ref n={14} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'platform',
      title: 'プラットフォームで分岐する：platform() と #[cfg(mobile)]',
      body: (
        <>
          <p>
            CSS で解決できない差は、コードで分岐します。フロントエンド側と Rust 側で、それぞれ道具があります。
          </p>
          <h3>フロントエンド：os プラグインの platform()</h3>
          <p>
            <code>@tauri-apps/plugin-os</code> の <code>platform()</code> は、実行中の OS 名を返します。戻り値は <code>linux</code>、<code>macos</code>、<code>ios</code>、<code>freebsd</code>、<code>dragonfly</code>、<code>netbsd</code>、<code>openbsd</code>、<code>solaris</code>、<code>android</code>、<code>windows</code> のいずれかで、値はコンパイル時に決まります。<Ref n={2} /> 非同期ではなく同期関数なので、描画の分岐に直接使えます。粗い分類でよければ <code>type()</code> が <code>linux | windows | macos | ios | android</code> を返します。<Ref n={2} />
          </p>
          <Code
            lang="ts"
            title="src/lib/platform.ts"
            code={`
import { platform } from '@tauri-apps/plugin-os'

const p = platform()
export const isMobile = p === 'ios' || p === 'android'
export const isIOS = p === 'ios'
`}
          />
          <p>
            使うには、Rust 側で <code>tauri_plugin_os::init()</code> を登録し、capability に <code>os:default</code> を加えます。既定の権限には <code>allow-platform</code> や <code>allow-os-type</code> が含まれ、<code>hostname</code> だけが既定から外れています。<Ref n={3} />
          </p>
          <p>
            一方、「画面が狭いか」と「モバイルか」は別の問いです。レイアウトは幅で決め（前節）、機能の有無は OS で決めます。例えば「ウィンドウ状態の保存」はモバイルに存在しない機能なので <code>isMobile</code> で分岐しますが、ドロワーは幅 700px のデスクトップウィンドウでも出すべきなので、メディアクエリで決めます。
          </p>
          <h3>Rust 側：cfg の別名 mobile と desktop</h3>
          <p>
            前章で見たとおり、<code>tauri-build</code> は <code>build.rs</code> の実行時に、ターゲット OS が iOS か Android なら <code>mobile</code>、そうでなければ <code>desktop</code> という cfg を定義します。<Ref n={4} /> これを使うと、モバイルでは使えないプラグインの登録をコンパイル時に外せます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（抜粋）"
            code={`
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init());

    // デスクトップ専用のプラグインは、モバイル向けビルドではコンパイル対象から外す
    #[cfg(desktop)]
    let builder = builder
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build());

    builder
        .invoke_handler(tauri::generate_handler![/* ... */])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            <code>Cargo.toml</code> 側でも、依存クレート自体をデスクトップ限定にしておくと、モバイル向けのビルド時間が短くなります。<code>[target.'cfg(not(any(target_os = "ios", target_os = "android")))'.dependencies]</code> のように書きます（<code>mobile</code> 別名は <code>tauri-build</code> がビルド時に定義するもので、Cargo の依存指定では使えないため、ここでは <code>target_os</code> で書きます<Ref n={15} />）。
          </p>
        </>
      ),
    },
    {
      id: 'plugins',
      title: '公式プラグインのモバイル対応状況',
      body: (
        <>
          <p>
            Tauri 公式のプラグイン一覧ページには、プラグインごとの対応表があります。各プラグインの <code>Cargo.toml</code> の <code>[package.metadata.platforms.support]</code> から生成されるもので、<code>full</code>（そのまま使える）、<code>partial</code>（制限付き）、<code>none</code>（非対応）の 3 段階です。<Ref n={5} /> Tsumugi で使うものと、関連の深いものを抜粋します（2026-11-08 時点）。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>プラグイン</th>
                  <th>Android</th>
                  <th>iOS</th>
                  <th>注記（公式の対応表のツールチップ、または各プラグインページより）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>fs</td>
                  <td>制限付き</td>
                  <td>制限付き</td>
                  <td>既定ではアプリ専用フォルダにしかアクセスできない</td>
                </tr>
                <tr>
                  <td>dialog</td>
                  <td>制限付き</td>
                  <td>制限付き</td>
                  <td>フォルダ選択は非対応</td>
                </tr>
                <tr>
                  <td>store</td>
                  <td>対応</td>
                  <td>対応</td>
                  <td></td>
                </tr>
                <tr>
                  <td>notification</td>
                  <td>対応</td>
                  <td>対応</td>
                  <td>Actions API はモバイル限定</td>
                </tr>
                <tr>
                  <td>opener</td>
                  <td>制限付き</td>
                  <td>制限付き</td>
                  <td><code>open</code> による URL のオープンのみ</td>
                </tr>
                <tr>
                  <td>os</td>
                  <td>対応</td>
                  <td>対応</td>
                  <td></td>
                </tr>
                <tr>
                  <td>log</td>
                  <td>対応</td>
                  <td>対応</td>
                  <td></td>
                </tr>
                <tr>
                  <td>window-state</td>
                  <td>非対応</td>
                  <td>非対応</td>
                  <td></td>
                </tr>
                <tr>
                  <td>global-shortcut</td>
                  <td>非対応</td>
                  <td>非対応</td>
                  <td></td>
                </tr>
                <tr>
                  <td>updater</td>
                  <td>非対応</td>
                  <td>非対応</td>
                  <td>更新はストア経由（第57章）</td>
                </tr>
                <tr>
                  <td>clipboard-manager</td>
                  <td>制限付き</td>
                  <td>制限付き</td>
                  <td>プレーンテキストのみ</td>
                </tr>
                <tr>
                  <td>deep-link</td>
                  <td>制限付き</td>
                  <td>制限付き</td>
                  <td>設定での静的登録のみ。実行時の登録は不可</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            表から読み取れることを 3 つにまとめます。
          </p>
          <ul>
            <li>
              データの保存系（store、log、os）はそのまま動きます。Tsumugi の設定とテーマ（<ChapterLink n={50} />）に変更は要りません。
            </li>
            <li>
              ファイル系（fs、dialog）は「アプリのサンドボックスの中」なら動きます。fs の公式ページは、Android で写真やダウンロードなど外部ストレージのディレクトリを使うには <code>AndroidManifest.xml</code> に <code>READ_EXTERNAL_STORAGE</code> / <code>WRITE_EXTERNAL_STORAGE</code> の権限が要ること、iOS ではファイルのタイムスタンプ API を使う理由を <code>PrivacyInfo.xcprivacy</code> に書く必要があることを説明しています。<Ref n={6} /> dialog の <code>open()</code> が返すのは、iOS では <code>file://</code> の URI、Android では <code>content://</code> の URI で、fs プラグインはどちらの形式もそのまま扱えます。<Ref n={7} />
            </li>
            <li>
              デスクトップの概念に依存するもの（window-state、global-shortcut、updater、システムトレイ、ウィンドウのカスタマイズ）は非対応です。<Ref n={1} /> 前節の <code>#[cfg(desktop)]</code> で外します。
            </li>
          </ul>
          <p>
            表は変わります。使う前に必ず公式の一覧を確認し、本書の表は「どの軸で見ればよいか」の例として読んでください。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi',
      title: 'Tsumugi のモバイル対応で決めたこと',
      body: (
        <>
          <Callout kind="tsumugi">
            <p>
              この章の内容を Tsumugi に当てはめると、次の方針になります。
            </p>
            <ul>
              <li>レイアウト：幅 720px 未満でサイドバーをドロワーにし、<code>viewport-fit=cover</code> と <code>env(safe-area-inset-*)</code> でヘッダー・ドロワー・エディタ下端の余白を取る。キーボードは <code>interactive-widget=resizes-content</code> で避ける。</li>
              <li>自動保存：<code>useFlushOnHide</code> で、背面に回る瞬間にデバウンス中の保存を即時実行する。</li>
              <li>画像の添付（<ChapterLink n={45} />）：dialog の <code>open()</code> で選んだ画像を、Rust 側のコマンドで <code>app_data_dir/attachments</code> にコピーする構造はそのまま。ただし Android では <code>content://</code> URI が渡るため、コピー処理はパス文字列ではなく fs プラグインの読み込み API を経由する。写真ライブラリから直接選ぶ場合は、Android の外部ストレージ権限が別途必要になる。</li>
              <li>Markdown の書き出し（<ChapterLink n={49} />）：全ページを 1 フォルダに書き出す機能は、モバイルではフォルダ選択ができないため提供しない。1 ページの書き出しは、サンドボックス内に書いたうえで opener や OS の共有機能に渡す方式を検討する。公式資料では dialog の <code>save()</code> のモバイル対応を確認できなかったため、本書では「書き出し先の選択はデスクトップ限定」とする。</li>
              <li>ウィンドウ状態の保存と Cmd/Ctrl+K などのグローバルショートカット（<ChapterLink n={50} />）：<code>#[cfg(desktop)]</code> でデスクトップ限定にする。検索はヘッダーのボタンから開けるようにしておく。</li>
            </ul>
            <p>
              本書の制作環境では、これらをシミュレーターや実機で確認できていません。方針の根拠は、この章で参照した公式の対応表と MDN の仕様です。
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
            <li>レイアウトは幅で決め、CSS のメディアクエリ（720px）でサイドバーをドロワーに切り替える。React は開閉状態だけを持つ。</li>
            <li><code>viewport-fit=cover</code> で WebView を画面全体に広げ、<code>env(safe-area-inset-*)</code> をヘッダーやフッターの padding に加算してノッチとホームインジケーターを避ける。</li>
            <li>ホバー依存の UI は <code>@media (hover: hover)</code> の中に限定し、<code>pointer: coarse</code> で当たり判定を広げる。</li>
            <li>背面への遷移は <code>visibilitychange</code> で観測できる最後の機会。そこで保留中の保存を即時実行する。終了は観測できない。</li>
            <li>機能の有無は OS で決める。フロントエンドは <code>platform()</code>、Rust は <code>#[cfg(mobile)]</code> / <code>#[cfg(desktop)]</code>。公式プラグインの対応表で、非対応のもの（window-state、global-shortcut、updater など）をデスクトップ限定にする。</li>
          </ul>
          <p>次章では、公式プラグインにない機能が必要になったときのために、Swift と Kotlin のコードを含むプラグインを自作する方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Features & Recipes（プラグイン一覧とプラットフォーム対応表）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'fs / dialog / store / notification / opener / os / log / window-state / global-shortcut / updater / clipboard-manager / deep-link の Android・iOS 対応状況と注記の根拠。',
    },
    {
      title: 'JavaScript API — @tauri-apps/plugin-os',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/os/',
      accessed: '2026-11-08',
      version: '@tauri-apps/plugin-os 2.x',
      note: 'platform() の戻り値の一覧と「コンパイル時に決まる」こと、type() の戻り値の根拠。',
    },
    {
      title: 'OS Information plugin',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/os-info/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'tauri_plugin_os::init() の登録、os:default 権限の内容、hostname が既定に含まれないことの根拠。',
    },
    {
      title: 'tauri-build crate — src/lib.rs',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-build/src/lib.rs',
      accessed: '2026-11-08',
      note: 'ターゲット OS が ios / android のとき mobile、それ以外で desktop の cfg 別名が定義されることの根拠。',
    },
    {
      title: 'Plugin Development — Declaring Platform Support',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/plugins/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '対応表が Cargo.toml の [package.metadata.platforms.support] から生成され、full / partial / none の 3 段階であることの根拠。',
    },
    {
      title: 'File System plugin',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/file-system/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Android の外部ストレージ権限（READ/WRITE_EXTERNAL_STORAGE）、iOS の PrivacyInfo.xcprivacy、モバイルではアプリフォルダに制限されることの根拠。',
    },
    {
      title: 'Dialog plugin',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/dialog/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'iOS では file:// URI、Android では content URI が返ること、fs プラグインがどちらも扱えること、フォルダ選択が非対応であることの根拠。',
    },
    {
      title: 'Notifications plugin',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/notification/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Actions API がモバイル限定であること、チャンネルが主に Android 向けであることの根拠。',
    },
    {
      title: 'Opener plugin',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/opener/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Android / iOS では open による URL のオープンのみ対応であることの根拠。',
    },
    {
      title: 'env() — CSS',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env',
      accessed: '2026-11-08',
      note: 'env() の定義、safe-area-inset-* の意味と値、フォールバック引数、フッターの padding-bottom に加算する例の根拠。',
    },
    {
      title: '<meta name="viewport"> — HTML',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport',
      accessed: '2026-11-08',
      note: 'viewport-fit の auto / contain / cover の定義、cover ではセーフエリア変数の使用が推奨されること、interactive-widget の値の根拠。',
    },
    {
      title: 'hover — CSS media feature',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover',
      accessed: '2026-11-08',
      note: 'hover: none / hover の定義と、モバイル端末が長押しでホバーを擬似的に発生させることの根拠。',
    },
    {
      title: 'pointer — CSS media feature',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer',
      accessed: '2026-11-08',
      note: 'pointer: none / coarse / fine の定義と、coarse で当たり判定を大きくする例の根拠。',
    },
    {
      title: 'Document: visibilitychange event',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event',
      accessed: '2026-11-08',
      note: 'イベントが発生する状況（モバイルでのアプリ切り替えを含む）、hidden への遷移が確実に観測できる最後のイベントであること、beforeunload / unload ではなく visibilitychange を使うべきことの根拠。',
    },
    {
      title: 'Specifying Dependencies — Platform specific dependencies',
      publisher: 'The Cargo Book',
      url: 'https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html#platform-specific-dependencies',
      accessed: '2026-11-08',
      note: '[target.\'cfg(...)\'.dependencies] で使える cfg は rustc 組み込みのものに限られ、build.rs が定義する別名は使えないことの根拠。',
    },
  ],
}

export default chapter
