import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 45-1 カスタムブロックの構成 ---------- */
function CustomBlockFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="カスタムブロックの構成。createReactBlockSpec に設定（type、propSchema、content）と実装（render）を渡すと BlockSpec ができ、defaultBlockSpecs と一緒に BlockNoteSchema.create に渡してスキーマを作り、useCreateBlockNote の schema オプションに渡す。保存される JSON では type が callout、props に emoji、content にインライン内容が入る">
      <defs>
        <marker id="arrow45a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" textAnchor="middle">
        <rect x="20" y="20" width="180" height="96" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="110" y="42" fontSize="13" fontWeight="600">設定（config）</text>
        <text x="110" y="62">type: "callout"</text>
        <text x="110" y="80">propSchema: {'{ emoji }'}</text>
        <text x="110" y="98">content: "inline"</text>

        <rect x="20" y="136" width="180" height="96" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="110" y="158" fontSize="13" fontWeight="600">実装（implementation）</text>
        <text x="110" y="178">render(props)</text>
        <text x="110" y="196">props.block / props.editor</text>
        <text x="110" y="214">props.contentRef</text>

        <path d="M200,68 L243,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45a)" />
        <path d="M200,184 L243,142" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45a)" />

        <rect x="247" y="96" width="160" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="327" y="120" fontSize="13" fontWeight="600">createReactBlockSpec</text>
        <text x="327" y="140">→ Callout（BlockSpec）</text>

        <path d="M407,126 L443,126" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45a)" />

        <rect x="447" y="80" width="180" height="92" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="537" y="102" fontSize="13" fontWeight="600">BlockNoteSchema.create</text>
        <text x="536" y="122">{'{ ...defaultBlockSpecs,'}</text>
        <text x="536" y="140">{'  callout: Callout() }'}</text>
        <text x="536" y="160">→ useCreateBlockNote</text>
      </g>
      <g fontSize="12" fontFamily="monospace">
        <rect x="252" y="196" width="368" height="76" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="262" y="216" fontFamily="sans-serif" fontSize="12" fill="var(--fig-muted)">保存される JSON（pages.content の中）</text>
        <text x="262" y="236">{'{ "type": "callout",'}</text>
        <text x="262" y="252">{'  "props": { "emoji": "💡", … },'}</text>
        <text x="262" y="268">{'  "content": [ … ], "children": [] }'}</text>
      </g>
      <text x="320" y="292" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：props の既定値（textAlignment など）は省略</text>
    </svg>
  )
}

/* ---------- 図 45-2 画像の保存と表示の経路 ---------- */
function ImagePathFigure() {
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="画像の保存と表示の経路。保存側では、画像ファイルが uploadFile の saveAttachment に渡り、fs プラグインの writeFile で APPDATA の attachments フォルダに書かれ、相対パス attachments/uuid.png がブロックの props.url として JSON に残る。表示側では、resolveFileUrl の resolveAttachmentUrl が appDataDir と join で絶対パスにし、convertFileSrc で asset プロトコルの URL にして img タグに渡し、WebView が asset プロトコル経由でファイルを読む">
      <defs>
        <marker id="arrow45b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="160" y="24" fontSize="14" fontWeight="600" textAnchor="middle">保存（uploadFile）</text>
      <text x="480" y="24" fontSize="14" fontWeight="600" textAnchor="middle">表示（resolveFileUrl）</text>
      <line x1="320" y1="34" x2="320" y2="330" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <g fontSize="12" textAnchor="middle">
        {/* save side */}
        <rect x="40" y="40" width="240" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="160" y="58" fontWeight="600">File（画像）</text>
        <text x="160" y="73">ドロップ／ファイル選択</text>
        <path d="M160,80 L160,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="40" y="104" width="240" height="40" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="122" fontWeight="600">saveAttachment(file)</text>
        <text x="160" y="137">名前を uuid + 拡張子にする</text>
        <path d="M160,144 L160,164" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="40" y="168" width="240" height="54" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="160" y="186" fontWeight="600">fs プラグイン writeFile</text>
        <text x="160" y="201">baseDir: BaseDirectory.AppData</text>
        <text x="160" y="216" fill="var(--fig-muted)">capability: fs:allow-write-file</text>
        <path d="M160,222 L160,242" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="40" y="246" width="240" height="40" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="264" fontWeight="600">$APPDATA/attachments/uuid.png</text>
        <text x="160" y="279">ファイル本体</text>
        <path d="M160,286 L160,306" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="40" y="310" width="240" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="160" y="328" fontWeight="600">戻り値 "attachments/uuid.png"</text>
        <text x="160" y="343">→ props.url として JSON に保存</text>

        {/* display side */}
        <rect x="360" y="40" width="240" height="40" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="58" fontWeight="600">props.url = "attachments/uuid.png"</text>
        <text x="480" y="73">pages.content から読み込み</text>
        <path d="M480,80 L480,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="360" y="104" width="240" height="54" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="480" y="122" fontWeight="600">resolveAttachmentUrl(url)</text>
        <text x="480" y="137">join(await appDataDir(), url)</text>
        <text x="480" y="152">→ 絶対パス</text>
        <path d="M480,158 L480,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="360" y="182" width="240" height="54" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="480" y="200" fontWeight="600">convertFileSrc(abs)</text>
        <text x="480" y="215">asset://localhost/… の URL</text>
        <text x="480" y="230" fill="var(--fig-muted)">assetProtocol.scope の範囲内のみ</text>
        <path d="M480,236 L480,256" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="360" y="260" width="240" height="54" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="278" fontWeight="600">&lt;img src="asset://…"&gt;</text>
        <text x="480" y="293">WebView が asset プロトコルで読む</text>
        <text x="480" y="308" fill="var(--fig-muted)">CSP: img-src に asset: が必要</text>
        <path d="M480,314 L480,334" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow45b)" />
        <rect x="360" y="338" width="240" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="480" y="356" fontWeight="600">Core がファイルを返す</text>
        <text x="480" y="371">$APPDATA/attachments/uuid.png</text>
      </g>
      <text x="320" y="404" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">JSON には相対パスだけを持たせ、表示のたびに絶対パスへ解決する。模式図</text>
    </svg>
  )
}

/* ---------- 図 45-3 3つの許可 ---------- */
function ThreeGatesFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="画像の添付に必要な3つの許可。書き込みは capability の fs:allow-write-file とスコープ、読み取りは tauri.conf.json の assetProtocol の enable とスコープ、WebView での読み込みは CSP の img-src。どれか1つでも欠けると画像は保存または表示できない">
      <g fontSize="12" textAnchor="middle">
        <rect x="20" y="30" width="190" height="170" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="115" y="54" fontSize="13" fontWeight="600">1. 書き込みの許可</text>
        <text x="115" y="76" fill="var(--fig-muted)">capabilities/default.json</text>
        <text x="115" y="100">fs:allow-write-file</text>
        <text x="115" y="118">allow: $APPDATA/</text>
        <text x="115" y="134">attachments/ 以下</text>
        <text x="115" y="150">欠けると</text>
        <text x="115" y="168">writeFile が forbidden path</text>

        <rect x="225" y="30" width="190" height="170" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="320" y="54" fontSize="13" fontWeight="600">2. 読み取りの許可</text>
        <text x="320" y="76" fill="var(--fig-muted)">tauri.conf.json</text>
        <text x="320" y="100">assetProtocol.enable: true</text>
        <text x="320" y="118">scope: $APPDATA/</text>
        <text x="320" y="134">attachments/ 以下</text>
        <text x="320" y="150">欠けると</text>
        <text x="320" y="168">asset: URL が拒否される</text>

        <rect x="430" y="30" width="190" height="170" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="525" y="54" fontSize="13" fontWeight="600">3. 読み込み元の許可</text>
        <text x="525" y="76" fill="var(--fig-muted)">tauri.conf.json の csp</text>
        <text x="525" y="100">img-src 'self' asset:</text>
        <text x="525" y="118">http://asset.localhost …</text>
        <text x="525" y="150">欠けると</text>
        <text x="525" y="168">WebView が img を遮断</text>
      </g>
      <text x="320" y="228" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">3つは別々の仕組み（permission・スコープ・CSP）で、それぞれ別の場所に書く。第37章の3層に対応する</text>
      <text x="320" y="246" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">さらに Cargo.toml の tauri に protocol-asset フィーチャーが必要</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 45,
  part: 6,
  title: 'エディタの拡張：カスタムブロックと画像',
  summary:
    'BlockNote に独自のブロック「コールアウト」を createReactBlockSpec で追加し、スラッシュメニューに独自項目を足します。後半では画像の添付を実装します。uploadFile で受け取った画像を fs プラグインでデータフォルダの attachments/ に書き、JSON には相対パスだけを残し、表示時に convertFileSrc で asset プロトコルの URL に解決します。そのために必要な capability、assetProtocol のスコープ、CSP の img-src の3つの許可を整理します。',
  goals: [
    'createReactBlockSpec の設定（type、propSchema、content）と実装（render）を書き、スキーマに登録できる',
    'SuggestionMenuController と getDefaultReactSlashMenuItems で、標準項目に独自項目を足したスラッシュメニューを作れる',
    'uploadFile と resolveFileUrl の役割を説明し、JSON に相対パスだけを残す理由を言える',
    'fs プラグインで $APPDATA/attachments に書き込み、必要な capability とスコープを設定できる',
    'convertFileSrc と asset プロトコルで画像を表示し、assetProtocol のスコープと CSP の img-src を設定できる',
  ],
  prerequisites: [8, 13, 37, 38, 44],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            <ChapterLink n={44} /> で組み込んだエディタは、標準のブロックだけなら設定不要で動きます。この章では、そこに2つの拡張を加えます。1つ目は<Term en="custom block">カスタムブロック</Term>で、絵文字付きの強調枠「コールアウト」を作り、スラッシュメニューから挿入できるようにします。2つ目は画像の添付で、エディタにドロップした画像をアプリのデータフォルダに保存し、表示します。
          </p>
          <p>
            対象のファイルは、<code>features/editor/CalloutBlock.tsx</code>、<code>Editor.tsx</code> のスラッシュメニュー部分、<code>attachments.ts</code>、そして設定の <code>capabilities/default.json</code> と <code>tauri.conf.json</code> です。画像の部分は、<ChapterLink n={37} /> のセキュリティモデルと <ChapterLink n={38} /> の fs プラグインがそのまま実践になります。
          </p>
          <Callout kind="unverified">
            <p>
              この章のコードは、TypeScript の型検査と Vite のビルドが通ることに加え、Linux 上の <code>tauri dev</code> と本番ビルドで、スラッシュメニューからコールアウトを挿入して保存できること、画像を <code>attachments/</code> に保存して asset プロトコルで表示できること、スコープ外のファイルは読めないことを確認しています。エディタへの画像のドロップや貼り付け、macOS と Windows での asset の URL は未検証です。設定ファイルの書き方は Tauri 公式ドキュメントの記述に合わせています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'custom-block',
      title: 'カスタムブロック：createReactBlockSpec',
      body: (
        <>
          <p>
            BlockNote のブロックは、<Term en="block spec">ブロック仕様</Term>という単位で定義されます。React 向けには <code>createReactBlockSpec</code> という関数があり、公式ドキュメントによれば、第1引数に設定（<code>blockConfig</code>）、第2引数に実装（<code>blockImplementation</code>）を渡すと、<code>BlockSpec</code> を作る関数を返します。その関数を呼んだ結果をスキーマに登録します（Tsumugi では <code>Callout()</code>）。<Ref n={1} /> Tsumugi のコールアウトは次のとおりです。
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/CalloutBlock.tsx"
            code={`
// 独自ブロックの例: コールアウト（絵文字付きの強調枠）。
// createReactBlockSpec に「設定（type / props / content）」と「描画」を渡す。
import { createReactBlockSpec } from "@blocknote/react";

const EMOJIS = ["💡", "⚠️", "📌", "✅"];

export const Callout = createReactBlockSpec(
  {
    type: "callout",
    propSchema: {
      emoji: { default: "💡", values: EMOJIS },
    },
    content: "inline", // 中にリッチテキストを持てる
  },
  {
    render: (props) => {
      const { emoji } = props.block.props;
      const next = EMOJIS[(EMOJIS.indexOf(emoji) + 1) % EMOJIS.length];
      return (
        <div className="callout">
          {/* contentEditable=false にして、クリックで絵文字を切り替える */}
          <button
            className="callout-emoji"
            contentEditable={false}
            onClick={() => props.editor.updateBlock(props.block, { props: { emoji: next } })}
            title="絵文字を切り替え"
          >
            {emoji}
          </button>
          {/* ここに本文（inline content）が差し込まれる */}
          <div className="callout-body" ref={props.contentRef} />
        </div>
      );
    },
  },
);
`}
          />
          <h3>設定：type、propSchema、content</h3>
          <p>
            <code>type</code> はブロックの識別子で、保存される JSON の <code>type</code> フィールドにそのまま入ります。<code>propSchema</code> は、このブロックが持つ props の定義です。公式ドキュメントでは、各 prop は <code>default</code>（既定値）と任意の <code>values</code>（取り得る値の一覧）を持つオブジェクトで定義します。<Ref n={1} /> ここでは <code>emoji</code> という1つの prop を、4つの絵文字のいずれか、既定は 💡 と定めています。<code>content</code> は <code>"inline"</code>（リッチテキストを持つ）、<code>"plain"</code>（書式なしの文字）、<code>"none"</code>（編集可能な内容を持たない）のいずれかで、<Ref n={1} /> コールアウトは中に文章を書くので <code>"inline"</code> です。
          </p>
          <h3>実装：render</h3>
          <p>
            <code>render</code> は React コンポーネントで、<code>block</code>（描画対象のブロック。<code>props</code> は <code>propSchema</code> の定義に従う）、<code>editor</code>（エディタ本体）、<code>contentRef</code>（編集可能な要素に付ける ref。<code>content</code> が <code>"inline"</code> か <code>"plain"</code> のときだけ使える）の3つを受け取ります。<Ref n={1} />
          </p>
          <p>
            <code>contentRef</code> を <code>&lt;div className="callout-body"&gt;</code> に付けると、そこがブロックの本文になり、BlockNote がインライン内容（文字やリンク）を差し込んで編集可能にします。<ChapterLink n={13} /> で学んだ「ref を props として受け取り、DOM 要素に付ける」形そのものです。左の絵文字ボタンは <code>contentEditable={'{false}'}</code> で編集領域から外し、クリックで <code>editor.updateBlock(block, {'{ props: { emoji: next } }'})</code> を呼んで次の絵文字に切り替えます。<code>updateBlock</code> は「既存のブロックを新しいプロパティで更新する」メソッドです。<Ref n={2} /> 更新は <code>onChange</code> を通るので、<ChapterLink n={44} /> の自動保存でそのまま保存されます。
          </p>
          <h3>スキーマへの登録</h3>
          <p>
            作った <code>Callout</code> は、<ChapterLink n={44} /> で見たとおり <code>BlockNoteSchema.create({'{ blockSpecs: { ...defaultBlockSpecs, callout: Callout() } }'})</code> で標準ブロックと一緒にスキーマに入れ、<code>useCreateBlockNote</code> の <code>schema</code> に渡します。公式ドキュメントも、<code>defaultBlockSpecs</code> を展開して独自ブロックを足す書き方を示しています。<Ref n={1} /> 全体の関係を図 45-1 に示します。
          </p>
          <Figure n="45-1" title="カスタムブロックの構成" caption="設定と実装を createReactBlockSpec に渡して BlockSpec を作り、標準ブロックと一緒にスキーマへ登録する。保存される JSON では type が callout、props に emoji が入り、本文は content に入る。模式図。">
            <CustomBlockFigure />
          </Figure>
          <p>
            図 45-1 の下の JSON が重要です。カスタムブロックを足しても、保存形式は <ChapterLink n={44} /> の <code>Block</code> と同じ形です。Rust 側は <code>type</code> の値を知らなくても、<code>content</code> の中の <code>text</code> を集めれば本文を取り出せます（<ChapterLink n={46} />）。<code>content: "inline"</code> にした副産物として、コールアウトの文章は全文検索の対象にもなります。
          </p>
          <p>見た目は <code>global.css</code> の通常の CSS で付けます。テーマ変数 <code>--callout-bg</code> はライトとダークで別の色を持ちます（<ChapterLink n={50} />）。</p>
          <Code
            lang="css"
            title="src/styles/global.css（抜粋）"
            code={`
/* ---------- 独自ブロック: callout ---------- */
.callout {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--callout-bg);
}
.callout-emoji {
  padding: 0 4px;
  font-size: 18px;
}
.callout-body {
  flex: 1;
}
`}
          />
        </>
      ),
    },
    {
      id: 'slash-menu',
      title: 'スラッシュメニューに独自項目を足す',
      body: (
        <>
          <p>
            コールアウトを挿入する手段として、スラッシュメニューに「コールアウト」という項目を足します。<ChapterLink n={44} /> で触れたとおり、公式の手順は、<code>BlockNoteView</code> に <code>slashMenu={'{false}'}</code> を渡して既定のメニューを消し、<code>SuggestionMenuController</code> を子要素として置いて <code>triggerCharacter</code> と <code>getItems</code> を指定する、というものです。<Ref n={3} />
          </p>
          <Code
            lang="tsx"
            title="src/features/editor/Editor.tsx（抜粋：スラッシュメニュー）"
            code={`
  // ---- スラッシュメニュー ----
  const getItems = async (query: string) =>
    filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), calloutItem(editor)], query);

  return (
    <BlockNoteView editor={editor} theme={theme} onChange={onChange} slashMenu={false}>
      <SuggestionMenuController triggerCharacter="/" getItems={getItems} />
    </BlockNoteView>
  );
}

const calloutItem = (editor: Editor) => ({
  title: "コールアウト",
  subtext: "絵文字付きの強調枠",
  aliases: ["callout", "memo"],
  group: "その他",
  icon: <span>💡</span>,
  onItemClick: () => insertOrUpdateBlockForSlashMenu(editor, { type: "callout" }),
});
`}
          />
          <p>
            <code>getItems</code> は「/」の後に入力された文字列 <code>query</code> を受け取り、表示する項目の配列を返します。<code>getDefaultReactSlashMenuItems(editor)</code> が標準の項目一覧を返すので、<Ref n={3} /> それに <code>calloutItem</code> を足し、<code>filterSuggestionItems</code> で <code>query</code> に合うものだけに絞ります。公式ドキュメントは、この関数を「ユーザーの入力に基づいて項目の一覧を絞り込む」ために使うと説明しています。<Ref n={3} />
          </p>
          <p>
            項目の形は公式の <code>DefaultSuggestionItem</code> 型に従います。<code>title</code>（表示名）と <code>onItemClick</code>（選択時の処理）が必須で、<code>subtext</code>（説明）、<code>aliases</code>（絞り込み時の別名）、<code>group</code>（見出しでまとめる単位）は任意です。<Ref n={3} /> <code>aliases</code> に <code>"callout"</code> と <code>"memo"</code> を入れているので、「/callout」や「/memo」でも出てきます。<code>icon</code> は公式の例でも使われていますが、<Ref n={3} /> 型定義の一覧には載っていないため、バージョンによって扱いが変わる可能性があります。
          </p>
          <p>
            <code>onItemClick</code> の <code>insertOrUpdateBlockForSlashMenu(editor, {'{ type: "callout" }'})</code> は、公式の例と同じ関数で、現在のブロックが空ならその種類を <code>callout</code> に変え、そうでなければ新しいブロックを挿入します。<Ref n={3} /> 公式の例は <code>@blocknote/core/extensions</code> から読み込んでいますが、<code>@blocknote/core</code> のパッケージの根からも同じ関数が公開されており（型定義ファイルで確認）、Tsumugi は後者を使っています。
          </p>
        </>
      ),
    },
    {
      id: 'image-upload',
      title: '画像の保存：uploadFile と fs プラグイン',
      body: (
        <>
          <p>
            BlockNote の画像ブロックは、<code>url</code> と <code>caption</code> などの props を持ち、<code>url</code> の画像を表示します。<Ref n={4} /> ただし、ファイルをどこに置くかはライブラリの仕事ではありません。公式ドキュメントによれば、ファイルパネルの「Upload」タブは既定では表示されず、<code>uploadFile</code> オプションに「ファイルを受け取り、アクセスできる URL に解決する Promise を返す関数」（<code>(file: File) =&gt; Promise&lt;string&gt;</code>）を渡す必要があります。<Ref n={5} /> 公式の例は開発用に Base64 のデータ URL を返していますが、本番では自前の保存先を使うよう注意しています。<Ref n={5} />
          </p>
          <p>
            Tsumugi の保存先は、<ChapterLink n={36} /> で学んだアプリのデータフォルダ（<code>app_data_dir</code>）の下の <code>attachments/</code> です。<code>lib.rs</code> の <code>setup</code> で起動時に <code>create_dir_all</code> しています（<ChapterLink n={41} />）。書き込みは <ChapterLink n={41} /> の分担どおり、Rust のコマンドを作らず、フロントエンドから fs プラグイン（<ChapterLink n={38} />）を直接呼びます。
          </p>
          <Code
            lang="ts"
            title="src/features/editor/attachments.ts（抜粋：冒頭の説明コメントを除く）"
            code={`
import { convertFileSrc } from "@tauri-apps/api/core";
import { appDataDir, join } from "@tauri-apps/api/path";
import { BaseDirectory, writeFile } from "@tauri-apps/plugin-fs";

const PREFIX = "attachments/";

export async function saveAttachment(file: File): Promise<string> {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const name = \`\${crypto.randomUUID()}\${ext}\`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  await writeFile(PREFIX + name, bytes, { baseDir: BaseDirectory.AppData });
  return PREFIX + name;
}

export async function resolveAttachmentUrl(url: string): Promise<string> {
  if (!url.startsWith(PREFIX)) return url; // 外部 URL などはそのまま
  const abs = await join(await appDataDir(), url);
  return convertFileSrc(abs);
}
`}
          />
          <p>
            <code>saveAttachment</code> は <code>uploadFile</code> として <code>useCreateBlockNote</code> に渡した関数です（<ChapterLink n={44} />）。やることは3つです。元のファイル名を捨てて <code>crypto.randomUUID()</code> と拡張子で新しい名前を作る（同名の衝突と、パスに使えない文字を避けるため）。<code>File</code> の中身を <code>Uint8Array</code> にする。fs プラグインの <code>writeFile</code> で書く。公式ドキュメントのとおり、fs プラグインの各 API は <code>baseDir</code> オプションで基準ディレクトリを指定でき、<Ref n={6} /> <code>BaseDirectory.AppData</code> はアプリのデータフォルダです。
          </p>
          <p>
            戻り値は <code>"attachments/&lt;uuid&gt;.png"</code> という相対パスです。これが画像ブロックの <code>props.url</code> になり、<code>pages.content</code> の JSON に入ります。絶対パスを保存しない理由は、ファイル冒頭のコメントに「データフォルダが移動しても壊れない」と書いてあるとおりです。データフォルダの場所は OS やユーザー名で変わり、バックアップを別の Mac に移すこともあります。相対パスなら、フォルダごと移動しても JSON を書き換えずに済みます。
          </p>
          <h3>書き込みの許可：capability とスコープ</h3>
          <p>
            fs プラグインの書き込みには、<ChapterLink n={37} /> の capability で permission とスコープの両方が必要です。公式ドキュメントは「permission だけではスコープは与えられない」と明記し、<code>allow</code> のスコープがないと <code>forbidden path</code> エラーになると説明しています。<Ref n={6} />
          </p>
          <Code
            lang="json"
            title="src-tauri/capabilities/default.json"
            code={`
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Tsumugi のメインウィンドウに与える permission",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "dialog:default",
    "store:default",
    "opener:default",
    "window-state:default",
    "fs:default",
    "fs:allow-read-text-file",
    "fs:allow-write-text-file",
    {
      "identifier": "fs:allow-write-file",
      "allow": [{ "path": "$APPDATA/attachments/**" }]
    }
  ]
}
`}
          />
          <p>
            最後の項目が画像用です。<code>fs:allow-write-file</code> という permission に、<code>$APPDATA/attachments/</code> 以下を指すスコープを付けています。<code>$APPDATA</code> は公式の表で <code>appDataDir</code> に対応する変数で、<Ref n={6} /> 末尾の二重のアスタリスクはその下のすべてのパスに一致します。これで、<code>writeFile</code> はこのフォルダの下にだけ書けます。ほかの場所への書き込みは、フロントエンドのコードに誤りや悪意があっても Core が拒否します。
          </p>
        </>
      ),
    },
    {
      id: 'image-display',
      title: '画像の表示：convertFileSrc と asset プロトコル',
      body: (
        <>
          <p>
            保存した画像を <code>&lt;img&gt;</code> で表示するには、WebView が読める URL が必要です。しかし WebView は OS のファイルを直接読めません（<ChapterLink n={33} /> の信頼境界）。そこで Tauri の <Term en="asset protocol">asset プロトコル</Term>を使います。<code>convertFileSrc</code> は「デバイスのファイルパスを、WebView が読み込める URL に変換する」関数で、<Ref n={7} /> 変換後の URL への要求は Core が受け取り、スコープの範囲内であればファイルの内容を返します。
          </p>
          <p>
            ここで <code>resolveFileUrl</code> の出番です。公式ドキュメントによれば、<code>uploadFile</code> が返す URL はファイルそのものではなく「ファイルにアクセスするための API エンドポイント」でもよく、その場合はブロックを描画するときに <code>resolveFileUrl</code>（<code>(url: string) =&gt; Promise&lt;string&gt;</code>）でアクセス用の URL に変換します。<Ref n={5} /> Tsumugi の <code>resolveAttachmentUrl</code> は、JSON の相対パスを <code>appDataDir()</code> と <code>join</code> で絶対パスにし、<code>convertFileSrc</code> に渡します。<code>appDataDir</code> は「アプリのデータファイル用に推奨されるディレクトリ」を返し、macOS では <code>$HOME/Library/Application Support</code> の下に bundle identifier（Tsumugi では <code>jp.tsumugi.app</code>）を付けたパスです。<Ref n={8} /> <code>join</code> はプラットフォームの区切り文字でパスをつなぎます。<Ref n={8} /> <code>attachments/</code> で始まらない URL（外部の画像など）はそのまま返します。
          </p>
          <p>保存と表示の経路全体を図 45-2 に示します。</p>
          <Figure n="45-2" title="画像の保存と表示の経路" caption="左の保存側では、uploadFile が fs プラグインで $APPDATA/attachments/ に書き、相対パスを JSON に残す。右の表示側では、resolveFileUrl が相対パスを絶対パスにして convertFileSrc で asset プロトコルの URL に変え、WebView が Core 経由でファイルを読む。模式図。">
            <ImagePathFigure />
          </Figure>
          <p>
            図 45-2 の表示側には、2つの関所があります。<code>convertFileSrc</code> の説明には「asset プロトコルが有効で、公開したいファイルがそのスコープに含まれている必要がある」とあり、さらにプロトコルの出所が <code>app.security.csp</code> の該当ディレクティブで許可されている必要があります。<Ref n={7} /> この2つを <code>tauri.conf.json</code> に書きます。
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（抜粋）"
            code={`
    "security": {
      "csp": "default-src 'self'; img-src 'self' asset: http://asset.localhost data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:",
      "assetProtocol": {
        "enable": true,
        "scope": ["$APPDATA/attachments/**"]
      }
    }
`}
          />
          <h3>assetProtocol：有効化とスコープ</h3>
          <p>
            設定リファレンスでは、<code>assetProtocol</code> は <code>enable</code>（asset プロトコルを有効にする）と <code>scope</code>（アクセスできる範囲）を持ち、既定は <code>enable: false</code>、<code>scope: []</code> です。<Ref n={9} /> つまり、何も書かなければ asset プロトコルは使えません。Tsumugi は <code>$APPDATA/attachments/</code> 以下だけを許可します。データベースファイル <code>tsumugi.db</code> は同じ <code>$APPDATA</code> の直下にありますが、スコープの外なので asset プロトコルでは読めません。公開する範囲を必要最小限にするのは、<ChapterLink n={37} /> の原則どおりです。
          </p>
          <p>
            Rust 側では、<code>Cargo.toml</code> の <code>tauri</code> クレートに <code>protocol-asset</code> フィーチャーを付けています（<ChapterLink n={41} /> の抜粋）。docs.rs の機能一覧に <code>protocol-asset</code> は存在しますが説明文はなく、<Ref n={10} /> 本書では完成版の <code>Cargo.toml</code> のコメント「asset: プロトコル（添付画像の表示）には protocol-asset feature が必要」に従っています。
          </p>
          <h3>CSP：img-src</h3>
          <p>
            <Term en="Content Security Policy">CSP</Term> は、WebView がどの出所からリソースを読み込んでよいかを決める仕組みで、<ChapterLink n={37} /> で学びました。公式の CSP の解説は、Tauri 設定ファイルに書いた場合だけ有効になること、できるだけ制限的にして信頼できるホストだけを許可すべきこと、コンパイル時に Tauri が nonce とハッシュを自動で追加することを述べています。<Ref n={11} /> 公式の例の <code>img-src</code> は <code>'self' asset: http://asset.localhost blob: data:</code> で、<Ref n={11} /> Tsumugi もこれに合わせています。<code>asset:</code> が macOS と Linux での、<code>http://asset.localhost</code> が Windows での asset プロトコルの出所です（<code>convertFileSrc</code> の説明の例の CSP も同じ2つを並べています<Ref n={7} />）。<code>data:</code> と <code>blob:</code> は、BlockNote がアップロード前のプレビューや貼り付けで使う可能性に備えたものです。
          </p>
          <p>
            以上をまとめると、画像の添付には3つの別々の許可が要ります。図 45-3 に整理します。
          </p>
          <Figure n="45-3" title="画像の添付に必要な3つの許可" caption="書き込みは capability（permission とスコープ）、読み取りは assetProtocol（enable とスコープ）、WebView での読み込みは CSP の img-src で、それぞれ別の場所に書く。どれか1つ欠けても画像は保存または表示できない。模式図。">
            <ThreeGatesFigure />
          </Figure>
          <p>
            図 45-3 の3つは、<ChapterLink n={37} /> で学んだ「permission」「スコープ」「CSP」の3層にそのまま対応します。画像が出ないときは、この3つのどこで止まっているかを順に疑います。書き込みで <code>forbidden path</code> が出れば1、<code>&lt;img&gt;</code> の要求が拒否されれば2、開発者ツール（<ChapterLink n={40} />）のコンソールに CSP 違反が出れば3です。
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
              画像ブロックを削除しても、<code>attachments/</code> のファイルは残ります。参照されなくなったファイルを消すには、全ページの JSON から <code>props.url</code> を集め、フォルダ内のファイルと突き合わせる掃除処理が必要です。Rust 側に置くのが自然で、core に「参照されている添付の一覧」を返す関数を足す拡張になります。
            </li>
            <li>
              画像は縮小せずそのまま保存します。スマートフォンの写真を貼ると数 MB になることがあります。保存前に <code>&lt;canvas&gt;</code> で縮小する、または Rust 側で <code>image</code> クレートを使って縮小する拡張が考えられます。
            </li>
            <li>
              拡張子はファイル名から取るだけで、中身は検査していません。画像以外のファイルが来ても保存されます。<code>file.type</code>（MIME 型）で制限する検査を足せます。
            </li>
            <li>
              <code>resolveFileUrl</code> は描画のたびに <code>appDataDir()</code> を呼びます。値は起動中に変わらないので、1回取得してモジュール内に持てば <code>invoke</code> を減らせます。
            </li>
            <li>
              コールアウトの絵文字は4種類の固定リストです。<code>propSchema</code> の <code>values</code> を外せば任意の文字列を許せますが、その場合は入力 UI（絵文字ピッカー）が必要になります。
            </li>
            <li>
              カスタムブロックは Markdown への書き出しで専用の記法を持ちません。<ChapterLink n={49} /> では、未知のブロックを段落として扱います。
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
            <li>カスタムブロックは <code>createReactBlockSpec(設定, 実装)</code> で作る。設定は <code>type</code>・<code>propSchema</code>（<code>default</code> と <code>values</code>）・<code>content</code>、実装は <code>render</code> で、<code>contentRef</code> を付けた要素が本文になる。保存形式は標準ブロックと同じ <code>Block</code> の形。</li>
            <li>スラッシュメニューは <code>slashMenu={'{false}'}</code> と <code>SuggestionMenuController</code> で置き換え、<code>getDefaultReactSlashMenuItems</code> に独自項目を足して <code>filterSuggestionItems</code> で絞る。挿入は <code>insertOrUpdateBlockForSlashMenu</code>。</li>
            <li>画像は <code>uploadFile</code> で受け取り、fs プラグインの <code>writeFile</code> で <code>$APPDATA/attachments/</code> に書き、JSON には相対パスだけを残す。書き込みには capability の permission とスコープの両方が要る。</li>
            <li>表示は <code>resolveFileUrl</code> で相対パスを絶対パスにし、<code>convertFileSrc</code> で asset プロトコルの URL に変える。<code>assetProtocol</code> の <code>enable</code> とスコープ、CSP の <code>img-src</code>、Cargo の <code>protocol-asset</code> が必要。</li>
            <li>許可は「書き込み（capability）」「読み取り（assetProtocol）」「読み込み元（CSP）」の3つに分かれ、画像が出ないときはこの順に疑う。</li>
          </ul>
          <p>次章では、保存された JSON から Rust 側が本文テキストを取り出し、SQLite の FTS5（trigram）で全文検索を実装します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Custom Blocks',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/features/custom-schemas/custom-blocks',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'createReactBlockSpec の署名、設定（type、propSchema の default と values、content の inline/plain/none）、実装（render の block・editor・contentRef）、defaultBlockSpecs と一緒にスキーマへ登録する方法の根拠。',
    },
    {
      title: 'Manipulating Content',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/reference/editor/manipulating-content',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'updateBlock が既存のブロックを新しいプロパティで更新すること、editor.document が最上位ブロックのスナップショットを返すことの根拠。',
    },
    {
      title: 'Suggestion Menus',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/components/suggestion-menus',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'slashMenu={false}、SuggestionMenuController の triggerCharacter と getItems、getDefaultReactSlashMenuItems、filterSuggestionItems、DefaultSuggestionItem の型、例の insertOrUpdateBlockForSlashMenu と icon の根拠。',
    },
    {
      title: 'Embeds（File / Image blocks）',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/features/blocks/embeds',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: '画像ブロックの props（url、caption、name、showPreview、previewWidth）の根拠。',
    },
    {
      title: 'File Panel',
      publisher: 'BlockNote',
      url: 'https://www.blocknotejs.org/docs/react/components/image-toolbar',
      accessed: '2026-11-08',
      version: 'BlockNote 0.57',
      note: 'uploadFile の型 (file: File) => Promise<string> と Upload タブが既定で出ないこと、resolveFileUrl の型と「描画時に URL を解決する」用途、Base64 の例が開発用であることの根拠。',
    },
    {
      title: 'File System',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/file-system/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-fs 2',
      note: 'baseDir オプション、permission だけではスコープが与えられず forbidden path になること、permission に allow スコープを付ける書き方、$APPDATA が appDataDir に対応することの根拠。',
    },
    {
      title: '@tauri-apps/api core — convertFileSrc',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacecore/#convertfilesrc',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.12',
      note: 'convertFileSrc の説明と例、asset プロトコルの有効化とスコープが必要なこと、CSP の該当ディレクティブで出所を許可する必要があること、例の CSP（asset: と http://asset.localhost）の根拠。',
    },
    {
      title: '@tauri-apps/api path — appDataDir, join',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacepath/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.12',
      note: 'appDataDir がデータディレクトリに bundle identifier を付けたパスを返し、macOS では $HOME/Library/Application Support の下になること、join がプラットフォームの区切り文字でつなぐことの根拠。',
    },
    {
      title: 'Configuration — AssetProtocolConfig / SecurityConfig',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/#assetprotocolconfig',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'assetProtocol の enable と scope の意味と既定値（enable: false、scope: []）、csp がビルド時に全 HTML へ注入されることの根拠。',
    },
    {
      title: 'tauri — Feature flags',
      publisher: 'docs.rs',
      url: 'https://docs.rs/crate/tauri/latest/features',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: 'protocol-asset フィーチャーが存在すること（説明文は掲載されていない）の根拠。',
    },
    {
      title: 'Content Security Policy (CSP)',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/security/csp/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'CSP が設定ファイルに書いた場合だけ有効になること、制限的にすべきこと、nonce とハッシュの自動追加、例の img-src（self、asset:、http://asset.localhost、blob:、data:）の根拠。',
    },
  ],
}

export default chapter
