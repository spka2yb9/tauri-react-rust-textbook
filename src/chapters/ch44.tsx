import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 44-1 Block の構造 ---------- */
function BlockStructureFigure() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="BlockNote の Block の構造。1つの Block は id、type、props、content、children を持つ。content は StyledText や Link といった InlineContent の配列で、children は Block の配列なので入れ子になる。例として heading ブロックと、リンクを含む paragraph ブロック、その子の bulletListItem を示す">
      <g fontSize="12" fontFamily="monospace">
        {/* outer block */}
        <rect x="20" y="20" width="600" height="300" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="32" y="42" fontFamily="sans-serif" fontSize="13" fontWeight="600">Block（paragraph）</text>
        <text x="40" y="64">id: "2"</text>
        <text x="40" y="82">type: "paragraph"</text>
        <text x="40" y="100">props: {'{ textAlignment: "left", … }'}</text>

        {/* content */}
        <text x="40" y="126">content: InlineContent[]</text>
        <rect x="40" y="134" width="560" height="78" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <rect x="52" y="146" width="150" height="54" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="60" y="164">type: "text"</text>
        <text x="60" y="180">text: "SQLite の"</text>
        <text x="60" y="196">styles: {'{}'}</text>
        <rect x="214" y="146" width="210" height="54" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="222" y="164">type: "link"</text>
        <text x="222" y="180">href: "https://sqlite.org"</text>
        <text x="222" y="196">content: [text（bold）]</text>
        <rect x="436" y="146" width="150" height="54" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="444" y="164">type: "text"</text>
        <text x="444" y="180">text: "について。"</text>
        <text x="444" y="196">styles: {'{}'}</text>

        {/* children */}
        <text x="40" y="238">children: Block[]</text>
        <rect x="40" y="246" width="560" height="62" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="52" y="266" fontFamily="sans-serif" fontSize="12" fontWeight="600">Block（bulletListItem）</text>
        <text x="52" y="284">id: "3"  type: "bulletListItem"  content: [text "子ブロック"]  children: []</text>
      </g>
      <text x="320" y="334" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">橙：インラインの内容（文字とリンク）　緑：入れ子の子ブロック　模式図（props は一部省略）</text>
    </svg>
  )
}

/* ---------- 図 44-2 編集から保存までのデータの流れ ---------- */
function SaveFlowFigure() {
  const lanes = [
    { x: 70, label: 'BlockNote' },
    { x: 200, label: 'Editor.tsx' },
    { x: 330, label: 'lib/ipc.ts' },
    { x: 460, label: 'コマンド層' },
    { x: 580, label: 'core + SQLite' },
  ]
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="編集から保存までのシーケンス図。BlockNote の編集で onChange が呼ばれ、Editor.tsx が dirty フラグを立てて 800 ミリ秒のタイマーを再設定する。入力が止まってタイマーが発火すると editor.document を JSON 文字列にし、lib/ipc.ts の savePageContent が invoke でコマンド save_page_content を呼ぶ。コマンド層は with_db でロックを取り、core の save_content が JSON を検証して pages を UPDATE し、全文検索の索引を作り直す。結果は Promise で返り、失敗ならトーストに出る">
      <defs>
        <marker id="arrow44a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 55} y="14" width="110" height="30" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="34" fontSize="12" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="44" x2={l.x} y2="370" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="11">
        <path d="M70,70 L123,70" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="135" y="63" textAnchor="middle">onChange（入力のたび）</text>
        <rect x="125" y="80" width="150" height="30" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="200" y="93" textAnchor="middle">dirty = true</text>
        <text x="200" y="105" textAnchor="middle">タイマーを 800ms で再設定</text>
        <path d="M70,124 L123,124" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="135" y="117" textAnchor="middle">onChange（続けて入力）</text>
        <rect x="125" y="134" width="150" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="200" y="150" textAnchor="middle">タイマーを取り直す</text>

        <rect x="125" y="176" width="150" height="30" rx="4" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="200" y="189" textAnchor="middle">800ms 経過 → save()</text>
        <text x="200" y="201" textAnchor="middle">JSON.stringify(document)</text>

        <path d="M200,222 L328,222" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="264" y="215" textAnchor="middle">savePageContent(id, json)</text>
        <path d="M330,250 L458,250" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="394" y="243" textAnchor="middle">invoke("save_page_content")</text>
        <path d="M460,278 L578,278" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="519" y="271" textAnchor="middle">with_db → save_content</text>
        <rect x="520" y="288" width="116" height="44" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="578" y="302" textAnchor="middle">JSON を検証</text>
        <text x="578" y="314" textAnchor="middle">pages を UPDATE</text>
        <text x="578" y="326" textAnchor="middle">FTS を再索引</text>
        <path d="M578,346 L202,346" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow44a)" />
        <text x="390" y="339" textAnchor="middle">Ok(()) → Promise 解決（Err ならトースト）</text>
      </g>
      <text x="320" y="388" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">濃い矢印：要求　薄い矢印：応答　模式図</text>
    </svg>
  )
}

/* ---------- 図 44-3 Editor のライフサイクル ---------- */
function EditorLifecycleFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="Editor コンポーネントのライフサイクル。PageView が key にページ id を指定するので、別のページを開くと古い Editor がアンマウントされ、新しい Editor がマウントされる。マウント時は content を解析して initialContent にし、useCreateBlockNote でエディタを作る。アンマウント時はタイマーを止めて未保存分を save する">
      <defs>
        <marker id="arrow44b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" textAnchor="middle">
        <rect x="20" y="20" width="600" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="45" fontSize="13">PageView：&lt;Editor key={'{page.id}'} content={'{page.content}'} /&gt;（key が変わると作り直し）</text>

        <rect x="20" y="90" width="180" height="100" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="110" y="112" fontWeight="600">マウント（ページ A）</text>
        <text x="110" y="134">parseContent(content)</text>
        <text x="110" y="152">useCreateBlockNote</text>
        <text x="110" y="170">initialContent を渡す</text>

        <rect x="230" y="90" width="180" height="100" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="112" fontWeight="600">編集中</text>
        <text x="320" y="134">onChange → dirty</text>
        <text x="320" y="152">800ms 後に save()</text>
        <text x="320" y="170">保存先は pageId</text>

        <rect x="440" y="90" width="180" height="100" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="530" y="112" fontWeight="600">アンマウント（B へ移動）</text>
        <text x="530" y="134">clearTimeout</text>
        <text x="530" y="152">save()（未保存分を書く）</text>
        <text x="530" y="170">次に B の Editor がマウント</text>

        <path d="M200,140 L228,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow44b)" />
        <path d="M410,140 L438,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow44b)" />
      </g>
      <text x="320" y="216" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">key による作り直しで、initialContent の差し替えと未保存分の書き出しを同時に解決する</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 44,
  part: 6,
  title: 'ブロックエディタの組み込み',
  summary:
    'ページの本文を編集するブロックエディタとして BlockNote を組み込みます。パッケージの導入、Block[] という JSON のデータモデル、useCreateBlockNote と BlockNoteView による React への組み込み、onChange と 800ms のデバウンスによる自動保存、ページ切り替え時の key による作り直しを順に見ます。スラッシュメニューとドラッグ＆ドロップがライブラリ標準で提供される仕組みも確認します。',
  goals: [
    'BlockNote の3つのパッケージ（core、react、mantine）の役割とライセンス上の注意を説明できる',
    'Block の構造（id、type、props、content、children）を読み、pages.content に保存される JSON の形を説明できる',
    'useCreateBlockNote と BlockNoteView でエディタを React に組み込み、日本語辞書とテーマを設定できる',
    'onChange とデバウンスで自動保存を実装し、アンマウント時に未保存分を書き出せる',
    'ページを切り替えるときに key でエディタを作り直す理由を説明できる',
    'スラッシュメニューとサイドメニュー（ドラッグハンドル）が既定で提供される仕組みを説明できる',
  ],
  prerequisites: [3, 12, 13, 16, 41, 42, 43],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            <ChapterLink n={43} /> でサイドバーからページを開けるようになりました。この章では、開いたページの本文を編集する<Term en="block editor">ブロックエディタ</Term>を組み込みます。ブロックエディタとは、本文を「見出し」「段落」「リスト項目」「画像」といったブロックの列として扱うエディタで、ブロック単位の移動や種類の変更ができます。対象のファイルは <code>features/editor/Editor.tsx</code> と <code>PageView.tsx</code>、そして保存を受ける Rust 側の <code>pages::save_content</code>（<ChapterLink n={42} />）です。
          </p>
          <p>
            エディタは自作せず、<Term en="BlockNote">BlockNote</Term> を使います。BlockNote は React 向けのブロックエディタライブラリで、見出し・リスト・ToDo・コード・引用・表・画像といったブロックと、スラッシュメニュー、ドラッグ＆ドロップ、書式ツールバーを最初から備えています。「エディタを自作しない」のは、この種の UI が見た目以上に難しいからです。日本語入力（IME）の変換中の扱い、選択範囲の管理、Undo/Redo、貼り付けの解釈といった問題は、ライブラリに任せるのが正解です。
          </p>
          <h3>ライセンス</h3>
          <p>
            BlockNote の本体パッケージ（<code>@blocknote/core</code>、<code>@blocknote/react</code>、<code>@blocknote/mantine</code>）は MPL-2.0 で配布されています。<Ref n={1} /><Ref n={13} /><Ref n={14} /> 一方、同じリポジトリの <code>packages/xl-*</code>（複数列レイアウト、AI 連携、PDF や DOCX の書き出しなど）は GPL-3.0 または商用ライセンス（npm の license フィールドは <code>GPL-3.0 OR PROPRIETARY</code>）です。<Ref n={2} /><Ref n={15} /> GPL のパッケージをアプリに組み込むと、アプリ全体の配布条件に影響します。本書では <code>@blocknote/xl-*</code> を使いません。
          </p>
          <Callout kind="unverified">
            <p>
              この章のフロントエンドのコードは <code>npx tsc --noEmit</code> と <code>npx vite build</code> が通ることに加え、Linux 上の <code>tauri dev</code> で、エディタへの入力、約 1 秒後の自動保存、スラッシュメニューの表示、ページを切り替えたあとの本文の復元を確認しています。実際のキーボードとマウスによる操作感、ドラッグ＆ドロップは未検証で、macOS で <code>npm run tauri dev</code> を実行して確かめる想定です。Rust 側の保存処理（JSON の検証と再索引）は <code>cargo test</code> で確認しています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'install',
      title: '導入：3つのパッケージと CSS',
      body: (
        <>
          <p>
            BlockNote は3つのパッケージに分かれています。公式の Getting Started は、<code>@blocknote/core</code>、<code>@blocknote/react</code>、<code>@blocknote/mantine</code> と、UI 部品の土台である <code>@mantine/core</code> と <code>@mantine/hooks</code> のインストールを示しています。<Ref n={3} /> 役割は、<code>core</code> がエディタ本体（フレームワーク非依存）、<code>react</code> が React のフックと部品、<code>mantine</code> が Mantine ベースの見た目です。
          </p>
          <Code
            lang="json"
            title="package.json（抜粋）"
            code={`
  "dependencies": {
    "@blocknote/core": "^0.57.0",
    "@blocknote/mantine": "^0.57.0",
    "@blocknote/react": "^0.57.0",
    "@mantine/core": "^9.7.5",
    "@mantine/hooks": "^9.7.5",
    "@tauri-apps/api": "^2.12.4",
`}
          />
          <p>
            CSS はアプリの入口で読み込みます。公式は <code>@blocknote/mantine/style.css</code>（Mantine 版の既定スタイル）と <code>@blocknote/core/fonts/inter.css</code>（同梱の Inter フォント）の2つを示しています。<Ref n={3} /> Tsumugi では、自前の <code>global.css</code> より前に読み込み、後から上書きできるようにしています（<ChapterLink n={16} />）。
          </p>
          <Code
            lang="tsx"
            title="src/main.tsx"
            code={`
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`}
          />
          <p>
            バージョンは本書の基準どおり 0.57.0 です。BlockNote は 0.x 系で API の変更が比較的多いので、本文のコードは「0.57 時点」のものとして読んでください。
          </p>
        </>
      ),
    },
    {
      id: 'block-model',
      title: 'データモデル：Block[] という JSON',
      body: (
        <>
          <p>
            BlockNote のドキュメントは、<code>Block</code> の配列です。公式の Document Structure は、<code>Block</code> の型を次のように定義しています。<Ref n={4} />
          </p>
          <Code
            lang="ts"
            title="Block の型（BlockNote 公式ドキュメントより）"
            code={`
type Block = {
  id: string;
  type: string;
  props: Record<string, boolean | number | string>;
  content: InlineContent[] | TableContent | undefined;
  children: Block[];
};

type StyledText = {
  type: "text";
  text: string;
  styles: Styles;
};

type Link = {
  type: "link";
  content: StyledText[];
  href: string;
};

type InlineContent = Link | StyledText | CustomInlineContent;
`}
          />
          <p>
            5つのフィールドの意味は次のとおりです。<code>id</code> はブロックの一意な識別子で、作成から削除まで変わりません。<code>type</code> は種類（<code>paragraph</code>、<code>heading</code> など）、<code>props</code> は種類ごとの設定（見出しの <code>level</code>、画像の <code>url</code> など）、<code>content</code> はそのブロック自身のリッチテキストで、入れ子のブロックの文字は含みません。<code>children</code> は入れ子のブロックで、それ自身も <code>Block</code> です。<Ref n={4} /> 図 44-1 に、実際の JSON を箱で表しました。
          </p>
          <Figure n="44-1" title="Block の構造" caption="1つの Block は id、type、props、content、children を持つ。content は文字（StyledText）やリンク（Link）の配列で、children は Block の配列なので再帰的に入れ子になる。模式図。props は一部省略。">
            <BlockStructureFigure />
          </Figure>
          <p>
            図 44-1 を JSON で書くと次のようになります。これは Rust 側のテスト（<code>core/tests/search.rs</code>）で使っているサンプルの一部で、<ChapterLink n={46} /> の全文検索でもう一度使います。
          </p>
          <Code
            lang="json"
            title="src-tauri/core/tests/search.rs の DOC（抜粋）"
            code={`
[
  {"id":"1","type":"heading","props":{"level":2},"content":[{"type":"text","text":"設計メモ","styles":{}}],"children":[]},
  {"id":"2","type":"paragraph","props":{},"content":[
      {"type":"text","text":"SQLite の","styles":{}},
      {"type":"link","href":"https://sqlite.org","content":[{"type":"text","text":"データベース設計","styles":{"bold":true}}]},
      {"type":"text","text":"について。","styles":{}}
    ],"children":[
      {"id":"3","type":"bulletListItem","props":{},"content":[{"type":"text","text":"子ブロック","styles":{}}],"children":[]}
    ]},
  {"id":"4","type":"image","props":{"url":"asset://x.png","caption":"図1"},"children":[]}
]
`}
          />
          <p>
            <ChapterLink n={41} /> で決めたとおり、Tsumugi はこの配列を <code>JSON.stringify</code> した文字列を <code>pages.content</code> にそのまま保存します。ブロックの種類ごとにテーブルを作らないので、BlockNote のブロックが増えてもスキーマは変わりません。文字列として保存される分、SQL では本文を扱えませんが、全文検索は Rust 側がこの JSON を歩いて文字を取り出すことで実現します（<ChapterLink n={46} />）。<code>pages.content</code> の既定値が <code>'[]'</code>（空の配列）なのは、このためです。
          </p>
          <Callout>
            <p>
              図 44-1 の <code>children</code> は、見た目ではリストのインデントに対応します。段落の下にインデントしたリスト項目は、段落の <code>children</code> に入ります。<ChapterLink n={49} /> の Markdown 書き出しでは、この入れ子を平坦化する簡略化をしています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'editor-component',
      title: 'Editor コンポーネント：useCreateBlockNote と BlockNoteView',
      body: (
        <>
          <p>
            React への組み込みは2つの部品で行います。公式ドキュメントによれば、<code>useCreateBlockNote</code> は「新しい <code>BlockNoteEditor</code> のインスタンスを作る」フックで、<code>BlockNoteView</code> は「エディタを描画する」コンポーネントです。<Ref n={5} /> 最小の例は <code>const editor = useCreateBlockNote(); return &lt;BlockNoteView editor={'{editor}'} /&gt;;</code> だけで、これで書式ツールバーとサイドメニューを備えたエディタが動きます。<Ref n={5} />
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/Editor.tsx（抜粋：スキーマと初期化）"
            code={`
const schema = BlockNoteSchema.create({
  blockSpecs: { ...defaultBlockSpecs, callout: Callout() },
});
type Editor = typeof schema.BlockNoteEditor;
type Blocks = (typeof schema.PartialBlock)[];

const SAVE_DELAY_MS = 800;

type Props = {
  pageId: string;
  /** Block[] JSON 文字列 */
  content: string;
  theme: "light" | "dark";
};

function parseContent(json: string): Blocks | undefined {
  try {
    const blocks = JSON.parse(json) as Blocks;
    // BlockNote は空配列を initialContent に受け付けないので undefined にする
    return Array.isArray(blocks) && blocks.length > 0 ? blocks : undefined;
  } catch {
    return undefined;
  }
}

export function Editor({ pageId, content, theme }: Props) {
  // ページが変わるたびに親が key={pageId} で作り直すので、初期値は一度だけ読めばよい
  const initialContent = useMemo(() => parseContent(content), [content]);

  const editor = useCreateBlockNote({
    schema,
    dictionary: ja,
    initialContent,
    uploadFile: saveAttachment,
    resolveFileUrl: resolveAttachmentUrl,
  });
`}
          />
          <p>
            <code>useCreateBlockNote</code> に渡しているオプションを順に見ます。公式の Editor Setup は、よく使うオプションとして <code>initialContent</code>（React の textarea の <code>defaultValue</code> に似た初期内容）、<code>dictionary</code>（表示文字列の辞書）、<code>schema</code>（独自ブロックの追加）、<code>uploadFile</code>（ファイルのアップロード処理）を挙げています。<Ref n={6} />
          </p>
          <ul>
            <li>
              <code>schema</code>：標準のブロック一式 <code>defaultBlockSpecs</code> に、独自の <code>callout</code> ブロックを足したスキーマです。独自ブロックの作り方は <ChapterLink n={45} /> で扱います。<code>typeof schema.BlockNoteEditor</code> のように、スキーマから型を取り出せるのは <ChapterLink n={6} /> の <code>typeof</code> 型演算子の実用例です。
            </li>
            <li>
              <code>dictionary: ja</code>：メニューやプレースホルダを日本語にします。公式の Localization は <code>@blocknote/core/locales</code> からロケールを読み込んで <code>dictionary</code> に渡す方法を示しています。<Ref n={7} />
            </li>
            <li>
              <code>initialContent</code>：<code>pages.content</code> の文字列を <code>JSON.parse</code> した配列です。<code>parseContent</code> は壊れた JSON を <code>undefined</code>（空のエディタ）に逃がし、空配列も <code>undefined</code> にしています。完成版のコードは、空配列を <code>initialContent</code> に渡すと BlockNote が受け付けないと注釈しています。この点は公式ドキュメントの該当ページでは確認できなかったため、コードの注釈に従います。
            </li>
            <li>
              <code>uploadFile</code> と <code>resolveFileUrl</code>：画像の保存と表示で、<ChapterLink n={45} /> で扱います。
            </li>
          </ul>
          <p>描画部分は次のとおりです。</p>
          <Code
            lang="tsx"
            title="src/features/editor/Editor.tsx（抜粋：描画）"
            code={`
  return (
    <BlockNoteView editor={editor} theme={theme} onChange={onChange} slashMenu={false}>
      <SuggestionMenuController triggerCharacter="/" getItems={getItems} />
    </BlockNoteView>
  );
`}
          />
          <p>
            <code>BlockNoteView</code> の props のうち、<code>theme</code> は <code>"light"</code> または <code>"dark"</code> を渡すと、そのテーマに固定できます。既定では OS の設定に自動で追従します。<Ref n={8} /> Tsumugi はアプリ内で手動切替（<ChapterLink n={50} />）を持つので、アプリが決めたテーマを明示的に渡しています。<code>onChange</code> は <code>(editor: BlockNoteEditor) =&gt; void</code> 型の props で、内容が変わるたびに呼ばれます。<Ref n={5} /> <code>slashMenu={'{false}'}</code> と子要素の <code>SuggestionMenuController</code> は、スラッシュメニューを独自項目付きで置き換えるためのもので、この章の後半と <ChapterLink n={45} /> で説明します。
          </p>
        </>
      ),
    },
    {
      id: 'autosave',
      title: '自動保存：onChange と 800ms のデバウンス',
      body: (
        <>
          <p>
            Tsumugi に「保存」ボタンはありません。入力が止まったら自動で保存します。ただし1文字ごとに <code>invoke</code> を呼ぶのは無駄なので、<Term en="debounce">デバウンス</Term>、つまり「最後の入力から一定時間たってから1回だけ実行する」方式にします。
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/Editor.tsx（抜粋：自動保存）"
            code={`
  // ---- 自動保存 ----
  const timer = useRef<number | undefined>(undefined);
  const dirty = useRef(false);
  const save = async () => {
    if (!dirty.current) return;
    dirty.current = false;
    try {
      await ipc.savePageContent(pageId, JSON.stringify(editor.document));
    } catch (e) {
      toastError(e);
    }
  };
  const onChange = () => {
    dirty.current = true;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void save(), SAVE_DELAY_MS);
  };
  useEffect(() => {
    // 別ページへ移るときに未保存分を書き出す
    return () => {
      window.clearTimeout(timer.current);
      void save();
    };
  }, []);
`}
          />
          <p>
            <code>onChange</code> が呼ばれるたびに、<code>dirty</code> を立て、動いているタイマーを取り消し、800ms 後に <code>save</code> を呼ぶタイマーを仕掛け直します。入力が続く間はタイマーが延び続け、止まって 800ms たつと1回だけ <code>save</code> が走ります。<code>save</code> は <code>dirty</code> でなければ何もせず、<code>editor.document</code>（エディタの現在の内容。<code>Block[]</code>）を JSON 文字列にして <code>savePageContent</code> に渡します。
          </p>
          <p>
            <code>timer</code> と <code>dirty</code> を <code>useState</code> ではなく <code>useRef</code>（<ChapterLink n={13} />）で持っているのは、これらが変わっても再描画が不要だからです。タイマー ID が変わるたびにエディタ全体を再描画していては本末転倒です。
          </p>
          <p>この一連の流れを時間順に描いたのが図 44-2 です。</p>
          <Figure n="44-2" title="編集から保存までのデータの流れ" caption="入力のたびに onChange が呼ばれ、タイマーが 800ms で仕掛け直される。入力が止まってタイマーが発火すると editor.document を JSON にして invoke し、コマンド層が with_db で core の save_content を呼ぶ。core は JSON を検証して UPDATE し、全文検索の索引を作り直す。模式図。">
            <SaveFlowFigure />
          </Figure>
          <p>
            図 44-2 の右端、core の <code>save_content</code> は <ChapterLink n={42} /> で見たとおり、保存前に <code>serde_json::from_str</code> で JSON として解析できるかを確かめ、だめなら <code>Error::Json</code> を返します。フロントエンドが <code>JSON.stringify</code> した文字列が壊れていることは通常ありませんが、境界をまたぐデータは受け取る側でも検査する、という <ChapterLink n={34} /> の原則どおりです。この検査は <code>cargo test</code> で確認しています。
          </p>
          <h3>アンマウント時に未保存分を書き出す</h3>
          <p>
            タイマーが発火する前に別のページへ移ると、最後の編集が失われます。これを防ぐのが <code>useEffect</code> のクリーンアップ関数（<ChapterLink n={12} />）です。コンポーネントが消えるときにタイマーを止め、<code>save</code> を直接呼びます。<code>dirty</code> が立っていなければ何もしないので、無駄な保存は起きません。
          </p>
          <Callout kind="warn">
            <p>
              <ChapterLink n={12} /> で学んだとおり、<code>StrictMode</code> の開発時は Effect が「マウント → アンマウント → マウント」と2回走ります。このクリーンアップは <code>dirty</code> が <code>false</code> のときは何もしないので、二重実行でも余計な <code>invoke</code> は発生しません。依存配列が <code>[]</code> なので、<code>save</code> が参照する <code>pageId</code> と <code>editor</code> は最初の描画時のものです。ページが変わるときは次の節のとおりコンポーネントごと作り直すので、古い値を参照する問題は起きません。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'page-switch',
      title: 'ページ切り替え：key で作り直す',
      body: (
        <>
          <p>
            <code>initialContent</code> は名前のとおり「初期」の内容で、後から変えてもエディタには反映されません。<ChapterLink n={10} /> の非制御コンポーネントと同じ性質です。では、サイドバーで別のページを選んだときに本文を切り替えるにはどうするか。答えは「エディタを作り直す」です。
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/PageView.tsx（抜粋）"
            code={`
      {/* key でページごとにエディタを作り直す（initialContent を差し替えるため） */}
      <Editor key={page.id} pageId={page.id} content={page.content} theme={theme} />
`}
          />
          <p>
            react.dev は、<code>key</code> を指定すると React はそれを「親の中での位置の一部」として扱い、別の key を持つ要素を別のコンポーネントとみなして state を作り直す、と説明しています。<Ref n={9} /> ページ id を key にすれば、ページ A から B へ移ったとき、A の <code>Editor</code> はアンマウントされ（クリーンアップで未保存分が書き出され）、B の <code>Editor</code> が新しくマウントされて B の <code>initialContent</code> で初期化されます。図 44-3 にこの流れを示します。
          </p>
          <Figure n="44-3" title="Editor のライフサイクルと key" caption="PageView が key にページ id を指定するので、別のページを開くと古い Editor はアンマウントされ（未保存分を書き出す）、新しい Editor がマウントされて新しい initialContent で初期化される。1つの仕組みで初期化と書き出しの両方が片付く。">
            <EditorLifecycleFigure />
          </Figure>
          <p>
            <code>PageView</code> 自身は、<code>pageId</code> が変わるたびに <code>getPage</code> で本文を取り直し（<ChapterLink n={12} /> のデータ取得）、読み込み中は「読み込み中…」を表示します。タイトルは <code>&lt;input&gt;</code> の制御コンポーネント（<ChapterLink n={10} />）で、フォーカスが外れたときか Enter で <code>rename</code> を呼びます。
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/PageView.tsx（抜粋）"
            code={`
  useEffect(() => {
    setPage(null);
    ipc
      .getPage(pageId)
      .then((p) => {
        setPage(p);
        setTitle(p.title);
      })
      .catch(toastError);
  }, [pageId]);

  if (!page) return <div className="page-empty">読み込み中…</div>;

  const commitTitle = () => {
    const t = title.trim() || "無題";
    setTitle(t);
    if (t !== page.title) void api.rename(page.id, t);
  };
`}
          />
        </>
      ),
    },
    {
      id: 'slash-and-dnd',
      title: 'スラッシュメニューとドラッグ＆ドロップは標準装備',
      body: (
        <>
          <p>
            Notion 風のエディタでおなじみの2つの操作、「/」で始まるメニューと、ブロックをつかんで並べ替えるドラッグ＆ドロップは、BlockNote が標準で提供します。Tsumugi 側で実装するコードはありません。仕組みだけ押さえておきます。
          </p>
          <h3>スラッシュメニュー（Suggestion Menu）</h3>
          <p>
            BlockNote では、特定の文字を入力したときに出るメニューを <Term en="suggestion menu">サジェストメニュー</Term>と呼び、「/」で出るのがスラッシュメニューです。既定で有効で、見出し・リスト・画像などのブロックを挿入できます。公式ドキュメントは、<code>BlockNoteView</code> に <code>slashMenu={'{false}'}</code> を渡すと既定のスラッシュメニューを表示しなくなり、代わりに <code>SuggestionMenuController</code> を子要素として置いて <code>triggerCharacter</code> と <code>getItems</code> を指定すれば、項目を差し替えられると説明しています。<Ref n={10} /> Tsumugi がそうしているのは、標準の項目に独自ブロック「コールアウト」を足すためで、<ChapterLink n={45} /> で実装します。
          </p>
          <h3>サイドメニューとドラッグハンドル</h3>
          <p>
            ブロックの上にマウスを置くと左側に現れるのが <Term en="block side menu">ブロックサイドメニュー</Term>で、公式ドキュメントによれば「+」ボタンとドラッグハンドル（⠿）で構成されます。<Ref n={11} /> ハンドルをつかんでドラッグすると、ブロックは「エディタ内の最も近い位置」に移動します。<Ref n={11} /> <ChapterLink n={43} /> のサイドバーでは自分で HTML のドラッグ＆ドロップ API を書きましたが、エディタ内の並べ替えはライブラリに任せます。
          </p>
          <p>
            これらの操作で内容が変わると、キーボード入力と同じように <code>onChange</code> が呼ばれます。公式の Events は、<code>onChange</code> のコールバックが <code>getChanges()</code> で変更の一覧を取れること、変更には <code>insert</code>・<code>delete</code>・<code>update</code>・<code>move</code> の種類と、<code>local</code>・<code>paste</code>・<code>drop</code>・<code>undo</code> などの発生源があることを説明しています。<Ref n={12} /> Tsumugi はこの詳細を使わず、「何か変わったら 800ms 後に全体を保存する」だけで済ませています。ドラッグでブロックを動かしても、同じ経路で保存されます。
          </p>
        </>
      ),
    },
    {
      id: 'simplifications',
      title: '本書での簡略化と拡張の方向',
      body: (
        <>
          <ul>
            <li>
              保存は常に本文全体です。1文字の変更でもページ全体の JSON を書き込みます。ページが非常に長くなると書き込み量が増えますが、SQLite のローカル書き込みでは数百 KB でも体感できません。差分だけを送りたくなったら、<code>onChange</code> の <code>getChanges()</code> を使う拡張があります。<Ref n={12} />
            </li>
            <li>
              最後の編集から 800ms 以内にアプリが強制終了すると、その分は失われます。間隔を短くすれば損失は減りますが書き込みは増えます。ウィンドウを閉じる前にも書き出したい場合は、<ChapterLink n={36} /> のライフサイクルイベントで <code>save</code> を呼ぶ拡張が考えられます。
            </li>
            <li>
              競合は考えていません。同じページを2つのウィンドウで開いて編集すると、後に保存したほうが勝ちます。複数ウィンドウや同期を扱うなら、CRDT（<ChapterLink n={58} />）やバージョン番号による検出が必要です。
            </li>
            <li>
              Undo の履歴はエディタのメモリ上だけにあり、ページを切り替えると消えます。key でエディタを作り直すためで、Tsumugi では履歴を永続化しません。
            </li>
            <li>
              <code>parseContent</code> は壊れた JSON を空のエディタとして開きます。元の文字列は <code>pages.content</code> に残っていますが、そのページで何か入力すると上書きされます。壊れたデータを検出したらユーザーに知らせ、元の文字列を退避する、という保護を足す余地があります。
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'summary',
      title: 'まとめ',
      body: (
        <>
          <ul>
            <li>BlockNote は <code>core</code>・<code>react</code>・<code>mantine</code> の3パッケージ（MPL-2.0）で導入し、<code>xl-*</code>（GPL-3.0 または商用ライセンス）は使わない。CSS 2つをアプリの入口で読み込む。</li>
            <li>ドキュメントは <code>Block[]</code> で、各 Block は <code>id</code>・<code>type</code>・<code>props</code>・<code>content</code>（インライン内容）・<code>children</code>（入れ子）を持つ。Tsumugi はこの配列を JSON 文字列のまま <code>pages.content</code> に保存する。</li>
            <li><code>useCreateBlockNote</code> に <code>schema</code>・<code>dictionary</code>・<code>initialContent</code>・<code>uploadFile</code> を渡し、<code>BlockNoteView</code> に <code>theme</code> と <code>onChange</code> を渡す。</li>
            <li>自動保存は <code>onChange</code> で <code>dirty</code> を立てて 800ms のタイマーを仕掛け直し、発火時に <code>editor.document</code> を JSON にして <code>invoke</code> する。アンマウント時のクリーンアップで未保存分を書き出す。</li>
            <li>ページの切り替えは <code>key={'{page.id}'}</code> でエディタを作り直す。<code>initialContent</code> の差し替えと未保存分の書き出しが同時に解決する。</li>
            <li>スラッシュメニューとサイドメニュー（ドラッグハンドル）は BlockNote の標準装備で、変更はすべて同じ <code>onChange</code> を通って保存される。</li>
          </ul>
          <p>次章では、このエディタに独自のブロック（コールアウト）とスラッシュメニューの項目を足し、画像を添付して asset プロトコルで表示します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'BlockNote packages/core/LICENSE',
      publisher: 'TypeCellOS / GitHub',
      url: 'https://github.com/TypeCellOS/BlockNote/blob/main/packages/core/LICENSE',
      accessed: '2026-11-08',
      note: '@blocknote/core が Mozilla Public License 2.0 で配布されていることの根拠。',
    },
    {
      title: 'BlockNote packages/xl-multi-column/LICENSE',
      publisher: 'TypeCellOS / GitHub',
      url: 'https://github.com/TypeCellOS/BlockNote/blob/main/packages/xl-multi-column/LICENSE',
      accessed: '2026-11-08',
      note: 'xl-* パッケージが GNU General Public License v3 で配布されていることの根拠。',
    },
    {
      title: 'Getting Started',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/getting-started',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'インストールするパッケージ、2つの CSS の読み込み、useCreateBlockNote と BlockNoteView の最小例の根拠。',
    },
    {
      title: 'Document Structure',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/foundations/document-structure',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'Block、StyledText、Link、InlineContent の型定義と各フィールドの意味の根拠。',
    },
    {
      title: 'React Overview',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/overview',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'useCreateBlockNote の役割と署名、BlockNoteView の props（theme、onChange、slashMenu など）、最小例で書式ツールバーとサイドメニューが付くことの根拠。',
    },
    {
      title: 'Editor Setup',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/getting-started/editor-setup',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'initialContent（defaultValue に似る）、dictionary、schema、uploadFile の各オプションと、useCreateBlockNote が useMemo のラッパーであることの根拠。',
    },
    {
      title: 'Localization',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/features/localization',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: '@blocknote/core/locales からロケールを読み込み dictionary に渡す方法の根拠。',
    },
    {
      title: 'Themes',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/styling-theming/themes',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'theme に "light" / "dark" を渡すと固定でき、既定では OS の設定に追従することの根拠。',
    },
    {
      title: 'Preserving and Resetting State',
      publisher: 'react.dev',
      url: 'https://react.dev/learn/preserving-and-resetting-state',
      accessed: '2026-11-08',
      note: 'key を変えると React が別のコンポーネントとみなして state を作り直すことの根拠。',
    },
    {
      title: 'Suggestion Menus',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/components/suggestion-menus',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'slashMenu={false} で既定のスラッシュメニューを消し、SuggestionMenuController で置き換える方法の根拠。',
    },
    {
      title: 'Block Side Menu',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/components/side-menu',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'サイドメニューが「+」ボタンとドラッグハンドルで構成され、ドラッグしたブロックが最も近い位置へ移動することの根拠。',
    },
    {
      title: 'Events',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/reference/editor/events',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'onChange が内容の変更ごとに呼ばれ、getChanges() で insert・delete・update・move の変更と local・paste・drop・undo などの発生源を取れることの根拠。',
    },
    {
      title: 'BlockNote packages/react/LICENSE',
      publisher: 'TypeCellOS / GitHub',
      url: 'https://github.com/TypeCellOS/BlockNote/blob/main/packages/react/LICENSE',
      accessed: '2026-11-08',
      note: '@blocknote/react が Mozilla Public License 2.0 で配布されていることの根拠。',
    },
    {
      title: 'BlockNote packages/mantine/LICENSE',
      publisher: 'TypeCellOS / GitHub',
      url: 'https://github.com/TypeCellOS/BlockNote/blob/main/packages/mantine/LICENSE',
      accessed: '2026-11-08',
      note: '@blocknote/mantine が Mozilla Public License 2.0 で配布されていることの根拠。',
    },
    {
      title: 'BlockNote README（License の節）',
      publisher: 'TypeCellOS / GitHub',
      url: 'https://github.com/TypeCellOS/BlockNote/blob/main/README.md',
      accessed: '2026-11-08',
      note: '大半が MPL-2.0 で、packages/xl-* 配下（npm の @blocknote/xl-*）の XL パッケージは GPL-3.0 であることの根拠。',
    },
  ],
}

export default chapter
