import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 15-1 SPA のルーティング ---------- */
function SpaRoutingFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="左にアドレスバーの URL、中央にルーターの照合表、右に表示されるコンポーネントの木。URL の /pages/42 がルート定義 /pages/:id に一致し、Layout の中に PageView が描かれる。サーバーへの要求は発生しない">
      <defs>
        <marker id="arrow15a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="40" width="170" height="50" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="105" y="60" textAnchor="middle" fontWeight="600">URL</text>
        <text x="105" y="80" textAnchor="middle" fontSize="12">/pages/42</text>
        <path d="M190,65 L248,65" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15a)" />
        <rect x="250" y="20" width="180" height="180" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="340" y="42" textAnchor="middle" fontWeight="600">ルーターの照合</text>
        <rect x="262" y="55" width="156" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="340" y="75" textAnchor="middle" fontSize="12">/  → Home</text>
        <rect x="262" y="92" width="156" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-accent)" strokeWidth="2" />
        <text x="340" y="112" textAnchor="middle" fontSize="12">/pages/:id → PageView</text>
        <rect x="262" y="129" width="156" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="340" y="149" textAnchor="middle" fontSize="12">/settings → Settings</text>
        <text x="340" y="185" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">一致：params = {'{ id: "42" }'}</text>
        <path d="M430,107 L488,107" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15a)" />
        <rect x="490" y="40" width="130" height="140" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="555" y="62" textAnchor="middle" fontWeight="600">描画される木</text>
        <rect x="502" y="75" width="106" height="90" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="555" y="95" textAnchor="middle" fontSize="12">Layout</text>
        <rect x="514" y="105" width="82" height="48" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="555" y="125" textAnchor="middle" fontSize="12">PageView</text>
        <text x="555" y="143" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">id = "42"</text>
      </g>
      <rect x="20" y="220" width="600" height="40" rx="6" fill="none" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="320" y="245" fontSize="12" textAnchor="middle">URL の変更から描画まで、すべてブラウザ（WebView）の中で完結する。サーバーへの要求は発生しない</text>
      <text x="320" y="285" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：太枠が一致したルート</text>
    </svg>
  )
}

/* ---------- 図 15-2 入れ子ルートと Outlet ---------- */
function NestedRouteFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="左にルート定義の木、右に画面の入れ子。親ルート / の Layout はサイドバーと Outlet を持ち、子ルート pages/:id の PageView が Outlet の位置に描かれる。index ルートの Home は URL が / のときに同じ Outlet に描かれる">
      <defs>
        <marker id="arrow15b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <text x="150" y="30" textAnchor="middle" fontWeight="600">ルート定義</text>
        <rect x="40" y="45" width="220" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="150" y="70" textAnchor="middle" fontSize="12">path="/"  element={'<Layout />'}</text>
        <path d="M70,85 L70,115" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M70,115 L88,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15b)" />
        <rect x="90" y="95" width="170" height="40" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="175" y="120" textAnchor="middle" fontSize="12">index  element={'<Home />'}</text>
        <path d="M70,115 L70,165" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M70,165 L88,165" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15b)" />
        <rect x="90" y="145" width="170" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-accent)" strokeWidth="2" />
        <text x="175" y="170" textAnchor="middle" fontSize="12">path="pages/:id"  PageView</text>
        <path d="M70,165 L70,215" stroke="var(--fig-line)" strokeWidth="2" />
        <path d="M70,215 L88,215" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15b)" />
        <rect x="90" y="195" width="170" height="40" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="175" y="220" textAnchor="middle" fontSize="12">path="settings"  Settings</text>
        <text x="150" y="265" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">URL: /pages/42 のとき</text>

        <text x="470" y="30" textAnchor="middle" fontWeight="600">画面の入れ子</text>
        <rect x="320" y="45" width="300" height="200" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="470" y="65" textAnchor="middle" fontSize="12">Layout</text>
        <rect x="332" y="75" width="90" height="160" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="377" y="100" textAnchor="middle" fontSize="12">サイドバー</text>
        <text x="377" y="118" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">共通部分</text>
        <rect x="432" y="75" width="176" height="160" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="520" y="95" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">{'<Outlet />'}</text>
        <rect x="445" y="110" width="150" height="110" rx="6" fill="var(--fig-box2)" stroke="var(--fig-accent)" strokeWidth="2" />
        <text x="520" y="160" textAnchor="middle" fontSize="12">PageView</text>
        <text x="520" y="180" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">params.id = "42"</text>
      </g>
      <path d="M260,165 C300,165 300,165 318,165" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線枠：Outlet（子ルートが描かれる場所）　太枠：URL に一致した子ルート（模式図）</text>
    </svg>
  )
}

/* ---------- 図 15-3 data モードの遷移シーケンス ---------- */
function DataModeSequenceFigure() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="ユーザー、ルーター、loader、コンポーネントの4本のライフライン。リンクをクリックすると、ルーターが遷移先の loader を呼び、その間 useNavigation の state が loading になる。loader がデータを返してからコンポーネントが描かれる">
      <defs>
        <marker id="arrow15c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle" fontWeight="600">
        <text x="80" y="30">ユーザー</text>
        <text x="240" y="30">ルーター</text>
        <text x="400" y="30">loader</text>
        <text x="560" y="30">コンポーネント</text>
      </g>
      {[80, 240, 400, 560].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="320" stroke="var(--fig-line)" strokeDasharray="4 4" />
      ))}
      <g fontSize="12">
        <path d="M80,70 L238,70" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15c)" />
        <text x="160" y="62" textAnchor="middle">Link をクリック</text>
        <path d="M240,110 L398,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15c)" />
        <text x="320" y="102" textAnchor="middle">loader({'{ params }'}) を呼ぶ</text>
        <rect x="392" y="110" width="16" height="80" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="470" y="150" textAnchor="start" fill="var(--fig-muted)">invoke などで取得</text>
        <rect x="232" y="110" width="16" height="130" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="150" y="175" textAnchor="middle" fill="var(--fig-muted)">navigation.state</text>
        <text x="150" y="192" textAnchor="middle" fill="var(--fig-muted)">= "loading"</text>
        <path d="M400,190 L242,190" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow15c)" />
        <text x="320" y="182" textAnchor="middle">データを返す</text>
        <path d="M240,240 L558,240" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow15c)" />
        <text x="400" y="232" textAnchor="middle">URL を更新し、描画する</text>
        <rect x="552" y="240" width="16" height="50" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="470" y="268" textAnchor="start">useLoaderData() で</text>
        <text x="470" y="284" textAnchor="start">データを読む</text>
        <path d="M560,300 L82,300" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow15c)" />
        <text x="320" y="315" textAnchor="middle">新しい画面が見える</text>
      </g>
      <text x="320" y="348" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">loader が終わるまで前の画面が残る。縦の帯は各参加者が処理中の区間（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 15,
  part: 3,
  title: 'ルーティングとアプリ構成',
  summary:
    'SPA で「URL と画面を対応付ける」仕組みを学び、React Router 8.5 の3つのモードから Tauri アプリに合うものを選びます。入れ子ルートと Outlet、URL パラメータ、data モードの loader と action を押さえたうえで、機能単位のディレクトリ構成を決めます。',
  goals: [
    'SPA のルーティングがサーバーなしで動く仕組みを説明できる',
    'React Router の declarative・data・framework の3モードの違いと、Tauri で SSR を使わない理由を説明できる',
    'Routes と Route、Link と NavLink、useNavigate で画面遷移を実装できる',
    '入れ子ルートと Outlet、index ルート、URL パラメータを使ってレイアウトを組める',
    'data モードの loader・action・useNavigation・ErrorBoundary の役割を説明できる',
    '機能単位のディレクトリ構成を説明し、ルーターの置き場所を決められる',
  ],
  prerequisites: [8, 12, 14],
  sections: [
    {
      id: 'spa-routing',
      title: 'SPA のルーティングとは',
      body: (
        <>
          <p>
            従来の Web サイトでは、リンクをクリックするとブラウザがサーバーに新しい HTML を要求し、ページ全体が置き換わります。<ChapterLink n={7} /> で学んだ React アプリはそうではありません。HTML は <code>index.html</code> の1枚だけで、画面の切り替えは JavaScript がコンポーネントを描き替えることで行います。この構成を <Term en="single-page application">SPA</Term> と呼びます。
          </p>
          <p>
            しかし「1枚の HTML」には不便もあります。どの画面を見ていても URL が同じなら、ブラウザの「戻る」が効かず、特定の画面を指すリンクも作れません。そこで、URL の変化と表示するコンポーネントを対応付ける仕組みが必要になります。これが <Term en="routing">ルーティング</Term> で、それを担う部品を <Term en="router">ルーター</Term> と呼びます。
          </p>
          <Figure n="15-1" title="SPA のルーティングの流れ" caption="URL が変わると、ルーターが定義済みのパターンと照合し、一致したルートのコンポーネントを描く。/pages/:id の :id のような可変部分は params として取り出せる。サーバーへの要求は発生しない。模式図。">
            <SpaRoutingFigure />
          </Figure>
          <p>
            図の要点は、照合と描画がすべてブラウザの中で終わることです。<ChapterLink n={4} /> で触れた History API（<code>pushState</code>）を使えば、ページを読み直さずにアドレスバーの URL だけを書き換えられます。ルーターはこの API と、URL が変わったときの照合処理をまとめた部品です。
          </p>
          <p>
            Tauri アプリでは、この性質がとくに重要です。Tauri は「静的な Web ホスト」としてふるまい、HTML・CSS・JavaScript のファイル一式を WebView に渡すだけです。<Ref n={1} /> URL ごとに HTML を生成するサーバーはいません。だから画面の切り替えは、すべてフロントエンドのルーターで行います。
          </p>
        </>
      ),
    },
    {
      id: 'modes',
      title: 'React Router の3つのモードと Tauri での選び方',
      body: (
        <>
          <p>
            本書で使うルーターは <Term en="React Router">React Router</Term> です。基準バージョンは 8.5.1 で、公式サイトは Node 22 以上、Vite 7 以上、React 19 以上を前提にし、ESM のみで配布されると述べています。<Ref n={2} /> React Router には3つの使い方（モード）があり、公式は「各モードの機能は加算的で、declarative から data、framework へ進むほど、構造の自由度と引き換えに機能が増える」と説明しています。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>モード</th>
                  <th>入口</th>
                  <th>得られるもの</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>declarative（宣言的）</td>
                  <td><code>&lt;BrowserRouter&gt;</code> で包み、<code>&lt;Routes&gt;</code> を JSX で書く</td>
                  <td>URL とコンポーネントの対応、<code>Link</code>、<code>useNavigate</code>、<code>useLocation</code> などの基本機能</td>
                </tr>
                <tr>
                  <td>data（データ）</td>
                  <td><code>createBrowserRouter</code> でルート定義を React の外に出し、<code>&lt;RouterProvider&gt;</code> で描く</td>
                  <td>上に加えて <code>loader</code>、<code>action</code>、保留状態（pending）、<code>useFetcher</code> など</td>
                </tr>
                <tr>
                  <td>framework（フレームワーク）</td>
                  <td>Vite プラグインとルート設定ファイル。各ルートはモジュール（ファイル）</td>
                  <td>上に加えて型安全な <code>href</code> とルートモジュール、自動コード分割、SPA／SSR／静的生成の切り替え</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            公式の選び方のガイドは、迷ったら framework モードを勧めています。一方で declarative モードは「React Router をできるだけ単純に使いたい」「データ層が保留状態を自前で持っている（ローカルファーストやバックグラウンド同期など）」場合に、data モードは「データ機能は欲しいが、バンドルやサーバーの抽象化は自分で制御したい」場合に向くとされています。<Ref n={3} />
          </p>
          <h3>Tauri では declarative か data モードを使う</h3>
          <p>
            Tauri アプリでは、framework モードの利点の多くが使えません。framework モードの強みは SSR（サーバーサイドレンダリング）や静的生成を含む描画戦略の切り替えと、サーバーを前提にしたルートモジュールですが、Tauri の公式ガイドは「Tauri は SSR のようなサーバーベースの方式をネイティブにはサポートしない」と明言し、フロントエンドには静的生成（SSG）、SPA、従来型の MPA のいずれかを使うよう求めています。<Ref n={1} /> サーバーがない以上、Next.js のような SSR フレームワークや、サーバーでコンポーネントを実行する React Server Components（RSC）は本書の対象外です。Tauri 2.12 時点で、これらを使う理由も手段もありません。
          </p>
          <p>
            残るのは declarative と data の2択です。本書では、画面の対応付けだけなら declarative を、「遷移時にデータを読み込んでから描く」「保存中の保留状態を表示する」といった要件があるなら data を使います。なお、本書の題材 Tsumugi（第6部）は、画面が「サイドバーと、選択中のページ」の1種類だけなので、React Router を使わず、選択中のページの ID を state で持つ作りにしています。理由はこの章の最後の Tsumugi の節で述べます。この章の例は、画面が増えたアプリで React Router を使うときの書き方です。どちらのモードでも API は同じ <code>react-router</code> パッケージにあり、declarative から data へ移るときは、ルート定義を JSX から配列に書き直し、<code>RouterProvider</code> に渡す形にします（data モードの <code>RouterProvider</code> だけは、後述のとおり <code>react-router/dom</code> から読み込みます）。
          </p>
          <Callout>
            <p>
              Tauri ではブラウザのアドレスバーが見えないので、「URL を使う意味があるのか」と思うかもしれません。URL は人に見せるためだけのものではありません。「今どの画面にいるか」を1つの文字列で表せるので、戻る・進む、画面の状態の保存と復元、画面間のリンクが、すべて URL という共通の仕組みに乗ります。これはデスクトップアプリでも有効です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'declarative',
      title: 'declarative モードの基本',
      body: (
        <>
          <p>
            まずは単純な declarative モードから始めます。パッケージは <code>react-router</code> の1つだけです。<Ref n={4} />
          </p>
          <Code lang="bash" code={`npm i react-router`} />
          <p>
            エントリーポイントでアプリ全体を <code>&lt;BrowserRouter&gt;</code> で包みます。<Ref n={4} />
          </p>
          <Code
            lang="tsx"
            title="src/main.tsx"
            code={`
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
`}
          />
          <p>
            ルートの定義は <code>&lt;Routes&gt;</code> と <code>&lt;Route&gt;</code> を JSX で書きます。<code>path</code> が URL のパターン、<code>element</code> が一致したときに描く要素です。<Ref n={5} />
          </p>
          <Code
            lang="tsx"
            title="src/App.tsx"
            code={`
import { Route, Routes } from 'react-router'

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="pages/:id" element={<PageView />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  )
}
`}
          />
          <h3>遷移する：Link、NavLink、useNavigate</h3>
          <p>
            画面遷移の手段は3つあります。<Ref n={6} /> <code>&lt;Link to="..."&gt;</code> はふつうのリンクです。<code>&lt;NavLink&gt;</code> は、リンク先が現在の URL と一致しているときに <code>active</code> クラスが付き、<code>className</code> や <code>style</code> に関数を渡すと <code>isActive</code> を受け取れます。サイドバーのナビゲーションのように「今どこにいるか」を示したいときに使います。
          </p>
          <Code
            lang="tsx"
            code={`
import { Link, NavLink } from 'react-router'

function Sidebar({ pages }: { pages: { id: string; title: string }[] }) {
  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        ホーム
      </NavLink>
      {pages.map((p) => (
        <NavLink key={p.id} to={\`/pages/\${p.id}\`}>{p.title}</NavLink>
      ))}
      <Link to="/settings">設定</Link>
    </nav>
  )
}
`}
          />
          <p>
            <code>end</code> を付けると、リンク先より長い URL ではアクティブになりません（<code>to="/pages"</code> の <code>NavLink</code> は、<code>end</code> がなければ <code>/pages/42</code> でもアクティブです）。<Ref n={14} /> <code>to="/"</code> だけは例外で、すべての URL が <code>/</code> に一致してしまうため、公式は <code>end</code> を事実上無視してルートにいるときだけ一致させると説明しています。<Ref n={14} /> 上の例の <code>end</code> は、その意図を明示するためのものです。
          </p>
          <p>
            3つ目の <code>useNavigate</code> は、クリック以外のきっかけで遷移するためのフックです。公式ドキュメントは、フォーム送信の完了後や一定時間後の自動遷移など、「ユーザーがリンクを直接クリックしていない場面」に限って使うよう勧めています。<Ref n={6} /> <code>Link</code> と <code>NavLink</code> は <code>&lt;a&gt;</code> 要素を描くので、キーボード操作、「新しいウィンドウで開く」、右クリックメニューがそのまま使えるからです。
          </p>
          <Code
            lang="tsx"
            code={`
import { useNavigate } from 'react-router'

function NewPageButton() {
  const navigate = useNavigate()
  async function handleClick() {
    const id = await createPage() // Rust 側でページを作る
    navigate(\`/pages/\${id}\`)      // 作ったページへ移動
  }
  return <button onClick={handleClick}>新規ページ</button>
}
`}
          />
        </>
      ),
    },
    {
      id: 'nested',
      title: '入れ子ルートと Outlet',
      body: (
        <>
          <p>
            サイドバーが常に表示され、右側の本文だけが URL に応じて変わる画面を考えます。この「共通の外枠＋変わる中身」を表すのが <Term en="nested routes">入れ子ルート</Term> です。<code>&lt;Route&gt;</code> の中に <code>&lt;Route&gt;</code> を書くと、親の <code>path</code> が子に自動的に前置されます。<Ref n={5} /> 子の要素は、親コンポーネントの中の <code>&lt;Outlet /&gt;</code> の位置に描かれます。
          </p>
          <Code
            lang="tsx"
            code={`
import { Outlet, Route, Routes } from 'react-router'

function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Outlet /> {/* ここに子ルートの要素が入る */}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pages/:id" element={<PageView />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
`}
          />
          <Figure n="15-2" title="入れ子ルートと Outlet の対応" caption="左のルート定義で、親 / の Layout はサイドバーと Outlet を持つ。URL が /pages/42 のとき、子ルート pages/:id が一致し、その要素 PageView が Outlet の位置（右の破線枠）に描かれる。URL が / なら index ルートの Home が同じ位置に入る。模式図。">
            <NestedRouteFigure />
          </Figure>
          <p>
            図の左右を対応させて読んでください。親ルートのコンポーネントは URL が変わっても描き直されず、<code>Outlet</code> の中身だけが入れ替わります。サイドバーのスクロール位置や入力中のテキストが遷移で失われないのは、このためです。
          </p>
          <h3>index ルートとレイアウトルート</h3>
          <p>
            <code>index</code> を付けたルートは、親の URL そのもの（この例では <code>/</code>）のときに親の <code>Outlet</code> に描かれる既定の子です。<Ref n={5} /> index ルートは子を持てません。また、<code>path</code> を持たない <code>&lt;Route element={'{<AuthLayout />}'}&gt;</code> は、URL にセグメントを追加せずに入れ子だけを作る「レイアウトルート」になります。<Ref n={5} /> 逆に、<code>element</code> を持たない <code>&lt;Route path="projects"&gt;</code> は、レイアウトを挟まずに子のパスに接頭辞だけを足します。
          </p>
        </>
      ),
    },
    {
      id: 'params',
      title: 'URL パラメータ',
      body: (
        <>
          <p>
            <code>path="pages/:id"</code> の <code>:id</code> のように、<code>:</code> で始まるセグメントは <Term en="dynamic segment">動的セグメント</Term> になり、一致した値が <code>params</code> として渡されます。コンポーネントからは <code>useParams</code> で読みます。<Ref n={5} />
          </p>
          <Code
            lang="tsx"
            code={`
import { useParams } from 'react-router'

function PageView() {
  const { id } = useParams() // string | undefined
  if (!id) return null
  return <Editor pageId={id} />
}
`}
          />
          <p>
            <code>useParams</code> の戻り値は文字列です。数値 ID を使う場合は自分で変換します。Tsumugi のページ ID は文字列（UUID）なので、そのまま使えます。1つのパスに複数の動的セグメント（<code>/c/:categoryId/p/:productId</code>）を置くこともできますが、公式ドキュメントは名前を重複させないよう注意しています。後のセグメントの値が前の値を上書きするためです。<Ref n={5} />
          </p>
          <p>
            このほか、セグメント末尾の <code>?</code> で省略可能にする（<code>:lang?/categories</code>）、末尾の <code>/*</code> で残りの URL をすべて受け取る（<code>files/*</code>。<code>params["*"]</code> で読む）という書き方があります。<Ref n={5} /> 後者は、存在しない URL を受け止める「見つかりません」画面を <code>path="*"</code> で用意するときに使います。
          </p>
          <Callout kind="warn">
            <p>
              URL パラメータは「外から来る文字列」です。<ChapterLink n={34} /> で学ぶように、この値をそのまま Rust 側に渡して SQL に埋め込んではいけません。Tsumugi では ID を引数として <code>invoke</code> に渡し、Rust 側でパラメータ化したクエリに使います（<ChapterLink n={48} />）。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'data-mode',
      title: 'data モード：loader と action',
      body: (
        <>
          <p>
            declarative モードでは、ページを開いてからコンポーネント内の Effect でデータを取りに行きます（<ChapterLink n={12} />）。これだと、画面が一瞬「空」になり、読み込み中の表示を各コンポーネントが自前で持つことになります。data モードは、ルート定義を React の外に出し、各ルートに <Term en="loader">loader</Term> を付けることで、「遷移先のデータがそろってから描く」順序に変えます。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            title="src/router.tsx"
            code={`
import { createBrowserRouter } from 'react-router'
import { getPage, listPages } from './lib/ipc'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: RootErrorBoundary,
    loader: async () => ({ pages: await listPages() }),
    children: [
      { index: true, Component: Home },
      {
        path: 'pages/:id',
        Component: PageView,
        loader: async ({ params }) => ({ page: await getPage(params.id!) }),
      },
      { path: 'settings', Component: Settings },
    ],
  },
])
`}
          />
          <Code
            lang="tsx"
            title="src/main.tsx"
            code={`
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
`}
          />
          <p>
            <code>RouterProvider</code> は <code>react-router</code> と <code>react-router/dom</code> の両方から読み込めますが、後者は <code>react-dom</code> の <code>flushSync</code> を自動で結び付けます。公式は、DOM 環境では「ほぼ常に」後者を使うよう述べています。<Ref n={16} /> 上の <code>main.tsx</code> が <code>react-router/dom</code> から読み込んでいるのはこのためです。
          </p>
          <p>
            ルート定義はオブジェクトの配列で、<code>path</code>、<code>Component</code>、<code>children</code>、<code>index: true</code> が declarative の JSX と1対1に対応します。<Ref n={8} /> 違いは <code>loader</code> です。公式ドキュメントは「ユーザーがルート間を移動すると、ルートコンポーネントが描かれる前に loader が呼ばれる」と説明しています。<Ref n={7} /> コンポーネントは <code>useLoaderData</code> でその結果を読みます。
          </p>
          <Code
            lang="tsx"
            code={`
import { useLoaderData } from 'react-router'

function PageView() {
  const { page } = useLoaderData() as { page: Page }
  return <Editor page={page} />
}
`}
          />
          <Figure n="15-3" title="data モードでリンクをクリックしてから描画されるまで" caption="クリックを受けたルーターは、遷移先の loader を先に呼ぶ。その間 useNavigation の state は loading になり、前の画面は残る。loader がデータを返してから URL を更新し、新しいコンポーネントを描く。コンポーネントは useLoaderData でデータを受け取る。模式図。">
            <DataModeSequenceFigure />
          </Figure>
          <p>
            図のとおり、新しい画面が描かれる時点でデータはそろっています。コンポーネントの中に「読み込み中なら…」という分岐がなくなり、<ChapterLink n={14} /> で学んだ Suspense 対応のデータ取得に近い形になります。「読み込み中」はルーター全体で1か所、<code>useNavigation</code> で扱います。<Ref n={9} />
          </p>
          <Code
            lang="tsx"
            code={`
import { Outlet, useNavigation } from 'react-router'

function Layout() {
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)
  return (
    <div className="app">
      <Sidebar />
      <main style={{ opacity: isNavigating ? 0.6 : 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
`}
          />
          <h3>action：書き込みと再検証</h3>
          <p>
            読み込みが <code>loader</code> なら、書き込みは <Term en="action">action</Term> です。ルートに <code>action</code> を付け、<code>&lt;Form method="post"&gt;</code> か <code>useFetcher</code> から呼びます。公式ドキュメントは「action が完了すると、ページ上のすべての loader データが再検証され、コードを書かなくても UI がデータと同期する」と説明しています。<Ref n={10} /> ページを作ったあとにサイドバーの一覧が自動で更新される、という動きがこれで手に入ります。<code>&lt;Form&gt;</code> は遷移を伴い履歴が増えますが、<code>useFetcher</code> は遷移せずに送信でき、<code>fetcher.state</code> で保存中の表示を出せます。<Ref n={10} />
          </p>
          <Code
            lang="tsx"
            code={`
import { useFetcher } from 'react-router'

function RenameForm({ page }: { page: Page }) {
  const fetcher = useFetcher()
  const busy = fetcher.state !== 'idle'
  return (
    <fetcher.Form method="post" action={\`/pages/\${page.id}\`}>
      <input name="title" defaultValue={page.title} />
      <button type="submit" disabled={busy}>{busy ? '保存中...' : '保存'}</button>
    </fetcher.Form>
  )
}
`}
          />
          <h3>ErrorBoundary：loader や描画の失敗を受け止める</h3>
          <p>
            loader が例外を投げたり、コンポーネントの描画が失敗したりすると、もっとも近い <code>ErrorBoundary</code> が代わりに描かれます。公式ドキュメントは「すべてのアプリは最低限、ルートの ErrorBoundary を持つべき」と述べています。<Ref n={11} /> 中では <code>useRouteError</code> でエラーを取り出し、<code>isRouteErrorResponse</code> で「404 のように意図して投げたもの」と「予期しない例外」を分けて表示します。
          </p>
          <h3>Tauri で使うルーターの種類</h3>
          <p>
            ここまで <code>createBrowserRouter</code>（History API を使う）を使いました。このほかに、URL のハッシュ部分（<code>#/pages/42</code>）に場所を保存する <code>createHashRouter</code> があります。declarative モードの対応物である <code>HashRouter</code> について、公式は「場所を URL のハッシュ部分に保存するのでサーバーに送られない」と説明しています。<Ref n={15} /> declarative モードには、URL を一切触らずメモリ上に履歴を持つ <code>MemoryRouter</code> もあります。<Ref n={13} />
          </p>
          <Callout kind="unverified">
            <p>
              Tauri の WebView は <code>pushState</code> による URL の書き換えをふつうに扱えるので、アプリの起動中は <code>createBrowserRouter</code> で問題なく動きます。一方、製品ビルドで <code>/pages/42</code> のような深い URL のまま WebView を再読み込みしたときの挙動は、Linux（Tauri 2.12、<code>tauri://localhost</code>）で試し、<code>index.html</code> にフォールバックして画面が描画されることを確認しました。Windows と macOS での挙動は未検証です。確実に避けたい場合は <code>createHashRouter</code> を使います。本書の教科書サイト自体もハッシュルーティングで動いています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'structure',
      title: 'アプリのディレクトリ構成',
      body: (
        <>
          <p>
            ルーティングが決まると、アプリの骨格が見えてきます。React 自体はディレクトリ構成を定めていませんが、本書では「機能（feature）ごとにまとめる」構成を取ります。画面の種類が増えるにつれ、「コンポーネントは components/、フックは hooks/」のような種類別の分け方だと、1つの機能を直すのに複数のディレクトリを行き来することになるからです。
          </p>
          <Code
            lang="text"
            title="Tsumugi のフロントエンド構成（src/）"
            code={`
src/
  main.tsx              エントリーポイント
  App.tsx               全体のレイアウト、選択中のページ ID、ダイアログの開閉
  lib/
    ipc.ts              invoke の型付きラッパー。全コマンドをここに集約
    types.ts            Page, Database などの型（Rust 側と手でそろえる）
    theme.ts, toast.tsx テーマの保存、エラー表示
  features/
    pages/              サイドバー、ページツリー、ページ操作
    editor/             BlockNote の組み込み、自動保存、カスタムブロック
    search/             検索ダイアログ
    database/           表ビュー、プロパティ編集、並べ替え・絞り込み
    settings/           テーマ、書き出し・読み込み
  styles/               共通 CSS と CSS 変数
`}
          />
          <p>
            判断の基準は次のとおりです。
          </p>
          <ul>
            <li>React Router を使うなら、ルート定義は <code>router.tsx</code> のような1か所に置きます（Tsumugi はルーターを使わないので、この構成にはありません）。公式ドキュメントは「データルーターは React の state に持たず、React の木の外で1回だけ作って <code>RouterProvider</code> に渡す」よう求めています。<Ref n={12} /></li>
            <li>Rust 側を呼ぶコードは <code>lib/ipc.ts</code> に集約します。loader も action もここの関数を呼ぶだけにすると、<ChapterLink n={17} /> のテストでモックする場所が1つで済みます。</li>
            <li><code>features/</code> の各ディレクトリは、そのルートで使うコンポーネント、フック、CSS を自分の中に持ちます。他の機能から使うものだけを <code>index.ts</code> から公開します。</li>
            <li>大きな機能は <ChapterLink n={14} /> の <code>lazy</code> で分割できます。data モードではルートオブジェクトの <code>lazy</code> プロパティで、<code>Component</code> と <code>loader</code> をまとめて遅延読み込みできます。<Ref n={8} /></li>
          </ul>
          <Code
            lang="tsx"
            code={`
{
  path: 'databases/:id',
  lazy: async () => {
    // コンポーネントと loader を並行して読み込む
    const [{ DatabaseView }, { databaseLoader }] = await Promise.all([
      import('./features/database/DatabaseView'),
      import('./features/database/loader'),
    ])
    return { Component: DatabaseView, loader: databaseLoader }
  },
}
`}
          />
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
              本書の Tsumugi は、React Router を使いません。画面が「サイドバーと、選択中のページ」の1種類だけで、URL で区別したい画面がないためです。デスクトップアプリにはアドレスバーがなく、URL を共有したりブックマークしたりする場面もありません。使わなければ依存が1つ減り、ルート定義や loader の置き場所を考える必要もなくなります。
            </p>
            <p>
              代わりに、<code>App</code> コンポーネントが選択中のページの ID を <code>useState</code> で持ちます（<ChapterLink n={9} /> の state）。サイドバーでページを選ぶと <code>select(id)</code> が呼ばれ、右側の <code>PageView</code> が受け取った <code>pageId</code> でデータを読み込みます。検索と設定は、ルートではなく画面に重なるダイアログで、どちらを開くかも同じく state で持ちます（<ChapterLink n={46} />）。ページの作成、改名、削除は、<ChapterLink n={43} /> の <code>usePages</code> が Rust のコマンドを呼んで一覧を取り直します。
            </p>
            <p>
              この作りには代償があります。ブラウザの「戻る」「進む」に当たるものがなく、アプリを再起動すると、最初は何のページも選ばれていない状態になります。ウィンドウの位置と大きさは <ChapterLink n={50} /> の window-state プラグインが覚えますが、開いていたページまでは覚えません。画面が増えたり、「前回のページに戻る」を作りたくなったりしたら、この章の方法に切り替えます。そのとき <code>lib/ipc.ts</code> がコマンドの呼び出しをすでに集約しているので、loader からも同じ関数を呼ぶだけで済みます。
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
            <li>SPA のルーティングは、URL の変化と描くコンポーネントの対応付けで、サーバーなしでブラウザの中だけで動く。Tauri は静的ファイルを配るだけなので、画面の切り替えはすべてフロントエンドのルーターが担う。</li>
            <li>React Router 8.5 には declarative・data・framework の3モードがある。Tauri は SSR をサポートしないので framework モードの利点が活きず、declarative か data を使う。</li>
            <li><code>Routes</code>／<code>Route</code>（または <code>createBrowserRouter</code> のルートオブジェクト）で対応を定義し、<code>Link</code>／<code>NavLink</code> で遷移する。<code>useNavigate</code> はクリック以外のきっかけに限る。</li>
            <li>入れ子ルートの子は親の <code>Outlet</code> に描かれる。<code>index</code> は親の URL での既定の子。<code>:id</code> は <code>useParams</code> で読む。</li>
            <li>data モードでは <code>loader</code> がデータをそろえてから描き、<code>action</code> の完了後に loader が再検証される。保留状態は <code>useNavigation</code> と <code>fetcher.state</code>、失敗は <code>ErrorBoundary</code> で扱う。</li>
            <li>ディレクトリは機能単位に分け、ルート定義と <code>invoke</code> ラッパーは1か所に集約する。</li>
          </ul>
          <p>次章では、画面の見た目を整える CSS の手法と、ダークモード、そしてキーボードだけでも使えるアプリにするためのアクセシビリティを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Frontend Configuration',
      publisher: 'Tauri（v2.tauri.app）',
      url: 'https://v2.tauri.app/start/frontend/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Tauri が静的な Web ホストとしてふるまうこと、SSR をネイティブにサポートしないこと、SSG／SPA／MPA を使うべきことの根拠。',
    },
    {
      title: 'React Router（トップページ）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'v8 の前提環境（Node 22 以上、Vite 7 以上、React 19 以上、ESM のみ）の根拠。',
    },
    {
      title: 'Picking a Mode',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/modes',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'declarative・data・framework の3モードの違い、機能が加算的であること、モードの選び方の根拠。',
    },
    {
      title: 'Installation（Declarative）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/declarative/installation',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'react-router パッケージのインストールと BrowserRouter によるエントリーポイントの設定の根拠。',
    },
    {
      title: 'Routing（Declarative）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/declarative/routing',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'Routes と Route、入れ子ルートと Outlet、index ルート、レイアウトルート、動的セグメントと useParams、省略可能セグメント、スプラットの根拠。',
    },
    {
      title: 'Navigating（Declarative）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/declarative/navigating',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'Link、NavLink（isActive、end）、useNavigate の使い分けの根拠。',
    },
    {
      title: 'Data Loading（Data）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/data/data-loading',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'loader がコンポーネントの描画前に呼ばれること、useLoaderData の根拠。',
    },
    {
      title: 'Route Object（Data）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/data/route-object',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'ルートオブジェクトの Component・loader・action・lazy の根拠。',
    },
    {
      title: 'Pending UI（Framework。Data モードから参照される）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/framework/pending-ui',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'useNavigation による全体の保留表示、NavLink の isPending の根拠。Data モードの Pending UI ページはこのページを参照している。',
    },
    {
      title: 'Actions（Data）',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/start/data/actions',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'action、Form、useFetcher、完了後の loader 再検証の根拠。',
    },
    {
      title: 'Error Boundaries',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/how-to/error-boundary',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'ルートオブジェクトの ErrorBoundary、useRouteError、isRouteErrorResponse、ルートの ErrorBoundary を必ず置く指針の根拠。',
    },
    {
      title: 'createHashRouter',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/api/data-routers/createHashRouter',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'ハッシュに場所を保存するデータルーターであること、ルーターを React の木の外で1回だけ作る指針の根拠。',
    },
    {
      title: 'MemoryRouter',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/api/declarative-routers/MemoryRouter',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'メモリ上に履歴を持つ declarative ルーターの根拠。',
    },
    {
      title: 'NavLink',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/api/components/NavLink',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'end プロパティの意味と、to="/" の NavLink が例外であることの根拠。',
    },
    {
      title: 'HashRouter',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/api/declarative-routers/HashRouter',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'ハッシュ部分に場所を保存するのでサーバーに送られない、という説明の根拠。',
    },
    {
      title: 'RouterProvider',
      publisher: 'React Router（reactrouter.com）',
      url: 'https://reactrouter.com/api/data-routers/RouterProvider',
      accessed: '2026-11-08',
      version: 'React Router 8.5.1',
      note: 'react-router/dom からの読み込みで flushSync が自動で結び付くことの根拠。',
    },
  ],
}

export default chapter
