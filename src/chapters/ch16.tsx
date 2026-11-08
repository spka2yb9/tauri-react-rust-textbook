import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 16-1 CSS Modules のスコープ ---------- */
function CssModulesFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="左に Sidebar.module.css の .title と Editor.module.css の .title という同名クラス。Vite がそれぞれ別の一意なクラス名に書き換え、各コンポーネントは import したオブジェクト経由でその名前を受け取る。同名でも衝突しない">
      <defs>
        <marker id="arrow16a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <text x="110" y="30" fontSize="13" fontWeight="600" textAnchor="middle">書いた CSS</text>
        <rect x="20" y="45" width="180" height="70" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="30" y="65" fill="var(--fig-muted)">Sidebar.module.css</text>
        <text x="30" y="90">.title {'{ font-size: 12px }'}</text>
        <rect x="20" y="150" width="180" height="70" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="30" y="170" fill="var(--fig-muted)">Editor.module.css</text>
        <text x="30" y="195">.title {'{ font-size: 24px }'}</text>

        <rect x="250" y="100" width="140" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="125" fontSize="13" fontWeight="600" textAnchor="middle">Vite</text>
        <text x="320" y="145" textAnchor="middle">名前を一意にする</text>
        <path d="M200,80 C230,80 230,120 248,120" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16a)" />
        <path d="M200,185 C230,185 230,140 248,140" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16a)" />

        <text x="530" y="30" fontSize="13" fontWeight="600" textAnchor="middle">実際の DOM と CSS</text>
        <rect x="440" y="45" width="180" height="70" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="450" y="65" fill="var(--fig-muted)">Sidebar.tsx</text>
        <text x="450" y="85">styles.title →</text>
        <text x="450" y="103">"_title_a1b2c"</text>
        <rect x="440" y="150" width="180" height="70" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="450" y="170" fill="var(--fig-muted)">Editor.tsx</text>
        <text x="450" y="190">styles.title →</text>
        <text x="450" y="208">"_title_x9y8z"</text>
        <path d="M390,120 C420,120 420,80 438,80" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16a)" />
        <path d="M390,140 C420,140 420,185 438,185" fill="none" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16a)" />
      </g>
      <text x="320" y="262" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：生成されるクラス名の形式は設定で変わる</text>
    </svg>
  )
}

/* ---------- 図 16-2 テーマの決まり方 ---------- */
function ThemeFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="OS の外観設定が prefers-color-scheme として WebView に伝わり、:root の CSS 変数の値を切り替える。アプリ内の手動設定は data-theme 属性で OS 設定を上書きする。各コンポーネントは var() で変数を読むだけなので、テーマの切り替えに関与しない">
      <defs>
        <marker id="arrow16b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" textAnchor="middle">
        <rect x="20" y="40" width="150" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="95" y="63" fontSize="13" fontWeight="600">OS の外観設定</text>
        <text x="95" y="83" fill="var(--fig-muted)">ライト／ダーク</text>
        <rect x="20" y="170" width="150" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="95" y="193" fontSize="13" fontWeight="600">アプリ内の設定</text>
        <text x="95" y="213" fill="var(--fig-muted)">system / light / dark</text>

        <rect x="230" y="40" width="180" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="63" fontSize="13" fontWeight="600">@media</text>
        <text x="320" y="83">(prefers-color-scheme: dark)</text>
        <rect x="230" y="170" width="180" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="320" y="193" fontSize="13" fontWeight="600">:root[data-theme]</text>
        <text x="320" y="213">属性で上書き</text>

        <rect x="470" y="40" width="150" height="190" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="545" y="65" fontSize="13" fontWeight="600">:root の CSS 変数</text>
        <text x="545" y="90">--bg</text>
        <text x="545" y="110">--fg</text>
        <text x="545" y="130">--accent</text>
        <text x="545" y="165" fill="var(--fig-muted)">コンポーネントは</text>
        <text x="545" y="183" fill="var(--fig-muted)">var(--bg) を読むだけ</text>
        <text x="545" y="215" fill="var(--fig-muted)">切り替えに関与しない</text>
      </g>
      <path d="M170,70 L228,70" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16b)" />
      <path d="M170,200 L228,200" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow16b)" />
      <path d="M410,70 L468,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16b)" />
      <path d="M410,200 L468,170" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow16b)" />
      <text x="320" y="140" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：OS 設定に追従する既定の経路　破線：手動設定による上書き</text>
      <text x="320" y="280" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：変数の名前と数は例</text>
    </svg>
  )
}

/* ---------- 図 16-3 roving tabindex ---------- */
function RovingTabindexFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="ツリーの項目が縦に4つ並ぶ。Tab キーはツリー全体に1回だけ止まり、tabindex が 0 の項目にフォーカスが入る。上下の矢印キーで項目間を移動すると、移動元の tabindex が -1、移動先が 0 になり、focus() が呼ばれる。もう一度 Tab を押すとツリーの外へ出る">
      <defs>
        <marker id="arrow16c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="40" y="30" width="120" height="36" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="100" y="53" textAnchor="middle">検索ボタン</text>
        <rect x="200" y="20" width="240" height="230" rx="8" fill="none" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="320" y="40" textAnchor="middle" fill="var(--fig-muted)">role="tree"（ページツリー）</text>
        {[
          { y: 55, label: 'はじめに', ti: '-1' },
          { y: 103, label: '設計メモ', ti: '0', active: true },
          { y: 151, label: '  └ API 一覧', ti: '-1' },
          { y: 199, label: '買い物リスト', ti: '-1' },
        ].map((item) => (
          <g key={item.y}>
            <rect x="215" y={item.y} width="210" height="36" rx="6" fill={item.active ? 'var(--fig-box2)' : 'var(--fig-bg)'} stroke={item.active ? 'var(--fig-accent)' : 'var(--fig-line)'} strokeWidth={item.active ? 3 : 1} />
            <text x="228" y={item.y + 23}>{item.label}</text>
            <text x="412" y={item.y + 23} textAnchor="end" fill="var(--fig-muted)">tabindex={item.ti}</text>
          </g>
        ))}
        <rect x="480" y="30" width="120" height="36" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="540" y="53" textAnchor="middle">エディタ本文</text>
      </g>
      <path d="M160,48 L213,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16c)" />
      <text x="170" y="95" fontSize="12" fill="var(--fig-muted)">Tab</text>
      <path d="M427,110 L478,48" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow16c)" />
      <text x="455" y="95" fontSize="12" fill="var(--fig-muted)">Tab</text>
      <path d="M450,130 L450,180" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow16c)" />
      <path d="M470,180 L470,130" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow16c)" />
      <text x="485" y="160" fontSize="12" textAnchor="start">↑↓ で項目間を移動</text>
      <text x="485" y="178" fontSize="12" textAnchor="start" fill="var(--fig-muted)">tabindex を入れ替え</text>
      <text x="485" y="196" fontSize="12" textAnchor="start" fill="var(--fig-muted)">focus() を呼ぶ</text>
      <text x="320" y="280" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">太枠：現在フォーカスがある項目（tabindex=0）　破線枠：1つの複合ウィジェット（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 16,
  part: 3,
  title: 'スタイリングとアクセシビリティ',
  summary:
    'React で CSS をどう書くかを比べ、Vite の CSS Modules と CSS 変数を使った見た目の整え方、OS 設定に追従するダークモードの作り方を学びます。後半では、キーボードだけで操作できるアプリにするためのフォーカス管理と、WAI-ARIA の正しい使い方を扱います。',
  goals: [
    'CSS の書き方（グローバル CSS、CSS Modules、CSS-in-JS、ユーティリティ）の違いと選び方を説明できる',
    'CSS 変数と prefers-color-scheme、color-scheme でダークモードを実装できる',
    'Tab 順序と tabindex の意味を理解し、roving tabindex で複合ウィジェットのキーボード操作を実装できる',
    'フォーカスの可視化と、ダイアログを開閉したときのフォーカスの移動を実装できる',
    'アクセシブルな名前の決まり方を説明し、ARIA を「使わない方がよい場面」を判断できる',
  ],
  prerequisites: [4, 8, 13],
  sections: [
    {
      id: 'css-approaches',
      title: 'React で CSS をどう書くか',
      body: (
        <>
          <p>
            React は見た目について何も決めていません。<ChapterLink n={7} /> で見たとおり、JSX は最終的に DOM 要素になり、そこにふつうの CSS が当たります。問題は「どのファイルに、どんな単位で書くか」です。主な選択肢を比べます。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>手法</th>
                  <th>書き方</th>
                  <th>長所</th>
                  <th>短所</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>グローバル CSS</td>
                  <td><code>.css</code> を <code>main.tsx</code> で import する</td>
                  <td>道具が要らない。リセットやテーマ変数の定義に向く</td>
                  <td>クラス名が全体で衝突する。どこで使われているか追いにくい</td>
                </tr>
                <tr>
                  <td>CSS Modules</td>
                  <td><code>.module.css</code> を import し、オブジェクト経由でクラス名を使う</td>
                  <td>クラス名がファイル単位で閉じる。ふつうの CSS がそのまま書ける</td>
                  <td>動的な値（色を props で変える等）には CSS 変数やインライン style の併用が要る</td>
                </tr>
                <tr>
                  <td>CSS-in-JS</td>
                  <td>JavaScript の中でスタイルを書くライブラリを使う</td>
                  <td>props に応じたスタイルを書きやすい</td>
                  <td>ライブラリ依存。実行時にスタイルを生成するものは初回描画のコストが増える</td>
                </tr>
                <tr>
                  <td>ユーティリティクラス</td>
                  <td>あらかじめ用意された小さなクラスを JSX に並べる</td>
                  <td>CSS ファイルを行き来せずに済む。命名に悩まない</td>
                  <td>クラス列が長くなる。設定とビルド手順が増える</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            本書では、追加の依存を増やさず Vite が標準で扱える組み合わせ、つまり「テーマと共通部品はグローバル CSS、コンポーネント固有のスタイルは CSS Modules」を採用します。CSS-in-JS やユーティリティクラスが劣っているわけではなく、チームの好みで選んでよい領域です。ただ、入門の段階では「ふつうの CSS がそのまま書ける」ことの価値が大きいと考えます。
          </p>
          <h3>Vite の CSS Modules</h3>
          <p>
            Vite では、ファイル名が <code>.module.css</code> で終わる CSS が自動的に <Term en="CSS Modules">CSS Modules</Term> として扱われます。<Ref n={1} /> import するとオブジェクトが返り、そのプロパティが「一意に書き換えられたクラス名」になっています。
          </p>
          <Code
            lang="css"
            title="src/features/pages/Sidebar.module.css"
            code={`
.root {
  width: 240px;
  border-right: 1px solid var(--border);
}
.title {
  font-size: 12px;
  color: var(--fg-muted);
}
`}
          />
          <Code
            lang="tsx"
            title="src/features/pages/Sidebar.tsx"
            code={`
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <nav className={styles.root}>
      <h2 className={styles.title}>ページ</h2>
      {/* ... */}
    </nav>
  )
}
`}
          />
          <Figure n="16-1" title="CSS Modules がクラス名の衝突を防ぐ仕組み" caption="Sidebar と Editor がどちらも .title というクラスを持っていても、Vite がファイルごとに別の名前へ書き換える。コンポーネントは import したオブジェクト（styles.title）を通してその名前を受け取るので、実際の名前を知る必要がない。模式図。">
            <CssModulesFigure />
          </Figure>
          <p>
            図のとおり、衝突の回避はビルド時に機械的に行われます。クラス名を考えるときに「他のファイルと被らないか」を気にする必要がなくなり、<code>.root</code>、<code>.title</code> のような短い名前を各ファイルで使い回せます。Vite の設定 <code>css.modules</code> で生成名の形式を変えたり、<code>localsConvention</code> を <code>camelCaseOnly</code> にして <code>.apply-color</code> を <code>applyColor</code> という名前付き import で受け取ったりできます。<Ref n={1} /> Sass などのプリプロセッサを使う場合は、対応するパッケージを入れたうえで <code>style.module.scss</code> のように <code>.module</code> を拡張子の前に付けます。<Ref n={1} />
          </p>
          <Callout>
            <p>
              Vite は <code>.ts</code> ファイルを変換するだけで、型検査は行いません。<Ref n={2} /> CSS Modules の import に限らず、型の誤りは <code>tsc --noEmit</code>（<ChapterLink n={5} />）で別途検査します。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'theming',
      title: 'CSS 変数とダークモード',
      body: (
        <>
          <p>
            「色を1か所で決めて全体に効かせる」ための道具が <Term en="CSS custom properties">CSS カスタムプロパティ</Term>（CSS 変数）です。<code>--</code> で始まる名前で宣言し、<code>var()</code> で参照します。MDN は、全体から参照できるように <code>:root</code> 擬似クラスで定義するのが一般的だと説明しています。<Ref n={3} />
          </p>
          <Code
            lang="css"
            title="src/styles/theme.css"
            code={`
:root {
  color-scheme: light dark;   /* ブラウザ標準の部品もテーマに追従させる */
  --bg: #ffffff;
  --fg: #1a1a1a;
  --fg-muted: #6b6b6b;
  --border: #e3e3e3;
  --accent: #2563eb;
}

/* OS がダークモードのとき、変数の値だけを差し替える */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #161616;
    --fg: #ececec;
    --fg-muted: #9a9a9a;
    --border: #333333;
    --accent: #60a5fa;
  }
}

body {
  background: var(--bg);
  color: var(--fg);
}
`}
          />
          <p>
            要点は3つです。
          </p>
          <ul>
            <li>
              <code>var(--name, fallback)</code> の第2引数は、変数が定義されていないときの代替値です。MDN は「最初のコンマ以降はすべて代替値と見なされる」と説明しています。<Ref n={3} /> 変数は親から子へ継承されるので、<code>:root</code> に置けばすべての要素から読めます。
            </li>
            <li>
              <code>@media (prefers-color-scheme: dark)</code> は、OS やブラウザの設定でダークテーマが選ばれているかを調べるメディア特性です。<Ref n={4} /> 値は <code>light</code>（明示的な好みがない場合を含む）と <code>dark</code> の2つです。2020年1月以降のブラウザで広く使えます。<Ref n={4} />
            </li>
            <li>
              <code>color-scheme: light dark</code> は、ページがどちらの配色でも描けることをブラウザに伝えます。これを <code>:root</code> に書くと、フォームの部品やスクロールバーなど「ブラウザが描く UI」の既定色もテーマに追従します。<Ref n={5} /> MDN は、読み込み時のちらつきを防ぐために <code>&lt;meta name="color-scheme"&gt;</code> を <code>&lt;head&gt;</code> の CSS より前に置くことも勧めています。<Ref n={5} />
            </li>
          </ul>
          <p>
            コンポーネントの CSS は <code>var(--bg)</code> のように変数を読むだけにし、ライト／ダークの分岐を書きません。テーマの切り替えは <code>:root</code> の1か所で完結します。
          </p>
          <h3>手動切り替えを加える</h3>
          <p>
            「OS に追従」だけでなく「アプリ内で明示的に選ぶ」も欲しい場合は、<code>&lt;html&gt;</code> に <code>data-theme</code> 属性を付け、メディアクエリより後に属性セレクタで上書きします。
          </p>
          <Code
            lang="css"
            code={`
/* 手動設定が system 以外のときは、OS 設定より優先する */
:root[data-theme='light'] { --bg: #ffffff; --fg: #1a1a1a; /* ... */ color-scheme: light; }
:root[data-theme='dark']  { --bg: #161616; --fg: #ececec; /* ... */ color-scheme: dark; }
`}
          />
          <Code
            lang="tsx"
            title="src/features/settings/useTheme.ts"
            code={`
import { useEffect } from 'react'

export type Theme = 'system' | 'light' | 'dark'

export function useTheme(theme: Theme) {
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])
}
`}
          />
          <Figure n="16-2" title="テーマが決まるまでの流れ" caption="OS の外観設定は prefers-color-scheme として伝わり、:root の変数を切り替える（実線）。アプリ内の手動設定は data-theme 属性で変数を上書きする（破線）。どちらの経路でも、コンポーネントは var() で変数を読むだけでよい。模式図。">
            <ThemeFlowFigure />
          </Figure>
          <p>
            図で確認したいのは、テーマに関する判断が左側の2つの入口と中央の CSS に閉じていて、右側のコンポーネントには届かないことです。<ChapterLink n={13} /> で学んだ <code>matchMedia</code> を購読するカスタムフックは、図やグラフなど JavaScript 側で色を決める必要がある場合にだけ使います。
          </p>
          <h3>画面幅と動きの設定</h3>
          <p>
            同じメディアクエリの仕組みで、画面幅やユーザーの設定にも応答できます。Tsumugi は幅 720px 未満でサイドバーをドロワーに変えます（<ChapterLink n={55} />）。モバイルでは、ノッチや画面下部のバーに内容が隠れないように <code>env(safe-area-inset-*)</code> で余白を確保します。MDN は、長方形の画面で何も重なっていなければこの値は 0 で、そうでなければ 0 より大きい px 値になると説明しています。<Ref n={6} /> また、OS で「視差効果を減らす」設定が有効なら <code>@media (prefers-reduced-motion: reduce)</code> が真になります。<Ref n={7} /> 開閉アニメーションはこの中で短縮します。
          </p>
          <Code
            lang="css"
            code={`
@media (max-width: 719px) {
  .sidebar { position: fixed; inset: 0 auto 0 0; transform: translateX(-100%); }
  .sidebar[data-open='true'] { transform: none; }
}
.app { padding-bottom: env(safe-area-inset-bottom, 0px); }
@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}
`}
          />
        </>
      ),
    },
    {
      id: 'keyboard',
      title: 'キーボードで操作できるようにする',
      body: (
        <>
          <p>
            ここからは <Term en="accessibility">アクセシビリティ</Term> の話です。マウスを使わない人、画面を見ない人（スクリーンリーダーの利用者）、タッチ操作が難しい人も、同じアプリを使えるようにします。最初の一歩は「キーボードだけで全部操作できること」です。これはスクリーンリーダー利用の前提でもあり、キーボード操作を好む多くの人にとっての快適さでもあります。
          </p>
          <h3>Tab 順序と tabindex</h3>
          <p>
            キーボード操作の基本は、W3C の ARIA Authoring Practices Guide（APG）がまとめています。<Ref n={8} /> <code>Tab</code> と <code>Shift+Tab</code> は「UI 部品から部品へ」フォーカスを移し、矢印キーは「部品の中で」移動します。<code>&lt;button&gt;</code>、<code>&lt;a href&gt;</code>、<code>&lt;input&gt;</code> のような組み込み要素は最初から Tab 順序に入っていて、クリックも Enter／Space も既定で動きます。<code>&lt;div onClick&gt;</code> で作ったボタンには、そのどれもありません。「ボタンの見た目の div」を作らず <code>&lt;button&gt;</code> を使う、というのが最初の規則です。
          </p>
          <p>
            Tab 順序を細かく制御するのが <code>tabindex</code> 属性です。<Ref n={8} />
          </p>
          <ul>
            <li><code>tabindex="0"</code>：DOM 上の位置に従って Tab 順序に入る。</li>
            <li><code>tabindex="-1"</code>：Tab 順序には入らないが、<code>element.focus()</code> でフォーカスを当てられる。</li>
            <li>正の値：APG は「使わないよう強く勧める」。順序を変えたいなら DOM の順序を変える。</li>
          </ul>
          <h3>複合ウィジェットと roving tabindex</h3>
          <p>
            ページツリーのように項目が何十個もある部品で、全項目を Tab 順序に入れると、ツリーを通り過ぎるだけで何十回も Tab を押すことになります。APG は「複合 UI 部品は、Tab 順序にフォーカス可能な要素を1つだけ含めるべき」としています。<Ref n={8} /> その実装法が <Term en="roving tabindex">roving tabindex</Term> です。現在の項目だけ <code>tabindex="0"</code>、他は <code>-1</code> にし、矢印キーで移動したら両方の値を入れ替えて移動先に <code>focus()</code> を呼びます。<Ref n={8} /> この方式の利点として、APG はブラウザが新しくフォーカスされた要素を自動で見える位置にスクロールすることを挙げています。
          </p>
          <Figure n="16-3" title="roving tabindex によるツリーのキーボード操作" caption="Tab はツリー全体に1回だけ止まり、tabindex=0 の項目（太枠）にフォーカスが入る。上下の矢印キーで項目間を移動するときは、移動元を -1、移動先を 0 にして focus() を呼ぶ。もう一度 Tab を押すとツリーの外の次の部品へ出る。模式図。">
            <RovingTabindexFigure />
          </Figure>
          <Code
            lang="tsx"
            title="ツリー項目の roving tabindex（骨格）"
            code={`
function TreeItem({ node, isCurrent, onMove }: TreeItemProps) {
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (isCurrent) ref.current?.focus() // 現在項目になったらフォーカスを当てる
  }, [isCurrent])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); onMove('next') }
    if (e.key === 'ArrowUp') { e.preventDefault(); onMove('prev') }
  }

  return (
    <li
      ref={ref}
      role="treeitem"
      tabIndex={isCurrent ? 0 : -1}
      aria-expanded={node.children.length > 0 ? node.expanded : undefined}
      onKeyDown={handleKeyDown}
    >
      {node.title}
    </li>
  )
}
`}
          />
          <p>
            <code>ref</code> と <code>focus()</code> は <ChapterLink n={13} /> の内容そのものです。APG のツリービューのパターンでは、矢印の上下で移動、右で展開（開いていれば最初の子へ）、左で折りたたみ（閉じていれば親へ）、Home／End で先頭と末尾、Enter で既定の操作、という割り当てが決められています。<Ref n={9} /> 親ノードには <code>aria-expanded</code> を付け、末端ノードには付けません。<Ref n={9} />
          </p>
          <h3>フォーカスを見えるようにする</h3>
          <p>
            APG は「視覚的なフォーカスインジケータは常に見えていなければならない」と述べています。<Ref n={8} /> デザインの都合で <code>outline: none</code> と書くのは、キーボード利用者から現在地を奪う行為です。MDN も「フォーカススタイルを変えると使いやすさが下がり、取り除くと視覚を使うキーボード利用者にとって操作不能になる」と注意しています。<Ref n={10} />
          </p>
          <p>
            「マウスでクリックしたときまで枠が出るのが気になる」という場合に使うのが <code>:focus-visible</code> です。これは、ブラウザが「フォーカスを示す必要がある」と判断したとき（キーボード操作のときなど）だけに一致する擬似クラスで、<code>:focus</code> との違いは「いつ出るか」を変えずに「見た目」だけを変えられる点にあります。<Ref n={10} />
          </p>
          <Code
            lang="css"
            code={`
/* マウスクリックでは出ず、キーボード操作では出る */
button:focus-visible,
[role='treeitem']:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
`}
          />
          <p>
            MDN は WCAG 2.1 の基準として、フォーカスインジケータと背景のコントラスト比 3:1 以上を挙げています。<Ref n={10} /> テーマの変数を使い、ライト／ダークの両方で確認します。
          </p>
        </>
      ),
    },
    {
      id: 'aria',
      title: 'ARIA と名前、ダイアログのフォーカス管理',
      body: (
        <>
          <p>
            <Term en="WAI-ARIA">WAI-ARIA</Term> は、HTML 要素に「役割（role）」「状態」「属性」を付けて、支援技術に意味を伝える仕様です。ただし APG は、使い方を誤った ARIA はない方がましだと警告しています。「誤った ARIA は視覚的な体験を誤って伝える」からです。<Ref n={11} /> とくに重要なのが「役割は約束である」という原則です。<code>role="button"</code> を付けると、支援技術の利用者はそれがボタンとして動くと期待します。しかし APG が述べるとおり、「HTML の input 要素と違って、ARIA の役割はブラウザにキーボードの挙動やスタイルを提供させない」のです。<Ref n={11} /> 役割を付けたら、キーボード操作と状態の更新を自分で実装する約束を負います。<code>&lt;button&gt;</code> を使えば、その約束はブラウザが果たしてくれます。
          </p>
          <h3>アクセシブルな名前</h3>
          <p>
            支援技術が要素を読み上げるときに使う短いラベルを <Term en="accessible name">アクセシブルな名前</Term> と呼びます。APG によれば、ブラウザは次の順で最初に見つかったものを名前にします。<Ref n={12} />
          </p>
          <ol className="steps">
            <li><code>aria-labelledby</code>：他の要素の文字列を名前にする。もっとも優先される。</li>
            <li><code>aria-label</code>：画面に表示されない文字列を直接与える。</li>
            <li>HTML の仕組み：<code>&lt;label&gt;</code>、<code>alt</code>、<code>&lt;legend&gt;</code>、<code>&lt;figcaption&gt;</code> など。</li>
            <li>内容：ボタン、リンク、見出しなどは、中の文字列が名前になる。</li>
            <li>最後の手段：<code>title</code>、<code>placeholder</code>。APG はこれに頼らないよう勧めている。</li>
          </ol>
          <p>
            APG の指針は「見える文字列を使う」ことです。見えるラベルがあるなら <code>aria-labelledby</code> で、ないなら <code>aria-label</code> で名前を付けます。<Ref n={12} /> アイコンだけのボタンは、名前になる文字列が中にないので、<code>aria-label</code> が必要な典型例です。
          </p>
          <Code
            lang="tsx"
            code={`
{/* 中に文字がない → aria-label で名前を与える */}
<button aria-label="ページを削除" onClick={onDelete}>
  <TrashIcon aria-hidden="true" />
</button>

{/* 見える見出しがある → aria-labelledby で結び付ける */}
<nav aria-labelledby="pages-heading">
  <h2 id="pages-heading">ページ</h2>
  {/* ... */}
</nav>
`}
          />
          <h3>ダイアログ：開くときと閉じるときのフォーカス</h3>
          <p>
            アクセシビリティの問題がもっとも起きやすいのがモーダルダイアログです。APG のパターンは次の要件を定めています。<Ref n={13} /> 容器に <code>role="dialog"</code> と <code>aria-modal="true"</code>、見える見出しを指す <code>aria-labelledby</code>。<code>Tab</code> と <code>Shift+Tab</code> はダイアログの中で循環し、外へ出ない。<code>Escape</code> で閉じる。開いたときはダイアログ内の要素（一般には最初のフォーカス可能要素）にフォーカスを移し、閉じたときは「ダイアログを開いた要素にフォーカスを戻す」。
          </p>
          <p>
            これを <code>&lt;div&gt;</code> で自作すると、フォーカスの循環や Escape の処理、背景を不活性にする処理をすべて自分で書くことになります。幸い、HTML の <code>&lt;dialog&gt;</code> 要素はこの大半を提供します。MDN によれば、<code>showModal()</code> で開いたダイアログは既定で Escape で閉じられ、最初のフォーカス可能要素にフォーカスが移り、「<code>&lt;dialog&gt;</code> とその中身以外はすべて inert（不活性）にされる」挙動をブラウザが提供します。<Ref n={14} /> 役割も <code>role="dialog"</code> 相当として支援技術に公開されます。
          </p>
          <Code
            lang="tsx"
            title="src/features/search/SearchDialog.tsx（骨格）"
            code={`
import { useEffect, useRef } from 'react'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal() // Escape・フォーカスの閉じ込め・inert はブラウザが担当
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={dialogRef} aria-labelledby="search-title" onClose={onClose}>
      <h2 id="search-title">ページを検索</h2>
      <input autoFocus aria-label="検索語" />
      {/* 結果一覧 */}
    </dialog>
  )
}
`}
          />
          <p>
            「閉じたとき、開いた要素にフォーカスを戻す」は、ブラウザがかなりの場合に面倒を見ますが、開いた要素が React の再レンダーで入れ替わると戻り先を失うことがあります。確実にしたいなら、開く直前に <code>document.activeElement</code> を <ChapterLink n={13} /> の ref に保存し、<code>onClose</code> でその要素の <code>focus()</code> を呼びます。これは APG の「ダイアログが閉じたら、呼び出した要素にフォーカスが戻る」という要件を自分で保証する方法です。<Ref n={13} />
          </p>
          <Callout kind="warn">
            <p>
              APG は、ガイドのコードを本番で使う前に「支援技術との相互運用性のテストが不可欠」だと述べ、モバイルやタッチ操作については対応状況を示せていないと明記しています。<Ref n={11} /> macOS では VoiceOver（<code>Cmd+F5</code>）で、実際に読み上げを聞いて確認します。本書の制作環境では VoiceOver による確認はできていません。
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
              Tsumugi の見た目は、この章の構成そのままです。<code>src/styles/theme.css</code> に CSS 変数とダークモードの定義を置き、各 feature のコンポーネントは CSS Modules で自分のスタイルを持ちます。<ChapterLink n={50} /> の設定画面で system／light／dark を選べるようにし、選択は tauri-plugin-store に保存して起動時に <code>data-theme</code> へ反映します。<ChapterLink n={55} /> のモバイル対応では、幅 720px 未満でサイドバーをドロワーにし、<code>env(safe-area-inset-*)</code> で余白を取ります。
            </p>
            <p>
              <ChapterLink n={43} /> のページツリーは <code>role="tree"</code> と roving tabindex で実装し、矢印キーで移動、右で展開、左で折りたたみ、Enter で開く、という APG の割り当てに従います。<ChapterLink n={46} /> の検索ダイアログは <code>&lt;dialog&gt;</code> と <code>showModal()</code> で作り、<code>Cmd+K</code> で開いたら検索欄にフォーカスを当て、閉じたらエディタへ戻します。アイコンだけのボタン（削除、追加、並べ替え）にはすべて <code>aria-label</code> を付けます。
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
            <li>本書は「テーマと共通部品はグローバル CSS、コンポーネント固有は CSS Modules」で書く。Vite は <code>.module.css</code> を自動で CSS Modules として扱い、クラス名の衝突をビルド時に防ぐ。</li>
            <li>色やサイズは <code>:root</code> の CSS 変数で定義し、<code>@media (prefers-color-scheme: dark)</code> で値を差し替える。<code>color-scheme: light dark</code> でブラウザ標準の部品も追従させ、手動切り替えは <code>data-theme</code> 属性で上書きする。</li>
            <li>キーボード操作は Tab で部品間、矢印キーで部品内を移動する。複合ウィジェットは roving tabindex で Tab 順序に1つだけ入れる。<code>tabindex</code> の正の値は使わない。</li>
            <li>フォーカスインジケータは消さない。見た目を変えるなら <code>:focus-visible</code> で、コントラスト比 3:1 以上を保つ。</li>
            <li>役割は約束。組み込み要素（<code>button</code>、<code>dialog</code>）で済むなら ARIA を書かない。名前は見える文字列を優先し、アイコンだけのボタンには <code>aria-label</code> を付ける。</li>
            <li>ダイアログは <code>&lt;dialog&gt;</code> と <code>showModal()</code> で作り、閉じたら開いた要素にフォーカスを戻す。</li>
          </ul>
          <p>次章では、ここまでに作った部品が「ユーザーの操作どおりに動く」ことを自動で確かめる、React アプリのテストを学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Features（CSS Modules、CSS Pre-processors）',
      publisher: 'Vite（vite.dev）',
      url: 'https://vite.dev/guide/features#css-modules',
      accessed: '2026-11-08',
      version: 'Vite 8',
      note: '.module.css が CSS Modules として扱われること、import の形、localsConvention、プリプロセッサ利用時の命名の根拠。',
    },
    {
      title: 'Features（TypeScript）',
      publisher: 'Vite（vite.dev）',
      url: 'https://vite.dev/guide/features#typescript',
      accessed: '2026-11-08',
      version: 'Vite 8',
      note: 'Vite が .ts を変換するだけで型検査を行わないことの根拠。',
    },
    {
      title: 'Using CSS custom properties (variables)',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
      accessed: '2026-11-08',
      note: ':root での定義、var() と代替値、継承の根拠。',
    },
    {
      title: 'prefers-color-scheme',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme',
      accessed: '2026-11-08',
      note: 'メディア特性の値（light、dark）とブラウザ対応状況の根拠。',
    },
    {
      title: 'color-scheme',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme',
      accessed: '2026-11-08',
      note: 'color-scheme がブラウザ標準の UI の配色に影響すること、:root での light dark 指定、meta タグの推奨の根拠。',
    },
    {
      title: 'env()',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/env',
      accessed: '2026-11-08',
      note: 'safe-area-inset-* の意味と値、代替値の書き方の根拠。',
    },
    {
      title: 'prefers-reduced-motion',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
      accessed: '2026-11-08',
      note: 'reduce の意味と OS 設定との関係の根拠。',
    },
    {
      title: 'Developing a Keyboard Interface（ARIA Authoring Practices Guide）',
      publisher: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/',
      accessed: '2026-11-08',
      note: 'Tab と矢印キーの役割分担、tabindex の値の意味、roving tabindex、フォーカスの可視性の根拠。',
    },
    {
      title: 'Tree View Pattern（ARIA Authoring Practices Guide）',
      publisher: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/',
      accessed: '2026-11-08',
      note: 'tree／treeitem／group の役割、aria-expanded、矢印キーと Home／End／Enter の割り当ての根拠。',
    },
    {
      title: ':focus-visible',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible',
      accessed: '2026-11-08',
      note: ':focus との違い、フォーカススタイルを取り除いてはいけない理由、コントラスト比 3:1 の根拠。',
    },
    {
      title: 'Read Me First（ARIA Authoring Practices Guide）',
      publisher: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/',
      accessed: '2026-11-08',
      note: '「誤った ARIA はない方がまし」「役割は約束」、支援技術でのテストの必要性、モバイル対応状況が未整理であることの根拠。',
    },
    {
      title: 'Providing Accessible Names and Descriptions（ARIA Authoring Practices Guide）',
      publisher: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
      accessed: '2026-11-08',
      note: 'アクセシブルな名前の計算順序、見える文字列の優先、aria-label と aria-labelledby の使い分けの根拠。',
    },
    {
      title: 'Dialog (Modal) Pattern（ARIA Authoring Practices Guide）',
      publisher: 'W3C Web Accessibility Initiative',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
      accessed: '2026-11-08',
      note: 'role=dialog、aria-modal、aria-labelledby、Tab の循環、Escape、開閉時のフォーカス移動の根拠。',
    },
    {
      title: '<dialog>: The Dialog element',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog',
      accessed: '2026-11-08',
      note: 'showModal() による Escape での閉鎖、初期フォーカス、inert の提供、role=dialog 相当として公開されることの根拠。',
    },
  ],
}

export default chapter
