import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 49-1 変換の対応と往復で保たれる要素 ---------- */
function MappingFigure() {
  const rows = [
    { block: 'heading (level 2)', md: '## 見出し', keep: true },
    { block: 'paragraph + bold / code / link', md: '記号で囲んだ本文 + [文字](url)', keep: true },
    { block: 'bulletListItem / numberedListItem', md: '- 項目 / 1. 項目', keep: true },
    { block: 'checkListItem (checked)', md: '- [x] 完了', keep: true },
    { block: 'codeBlock (language)', md: '```rust … ```', keep: true },
    { block: 'quote / image (caption, url)', md: '> 引用 / ![図](url)', keep: true },
    { block: 'children（入れ子）', md: '平坦化される', keep: false },
    { block: 'table / callout / 文字色', md: '落ちる・段落になる', keep: false },
  ]
  return (
    <svg viewBox="0 0 640 380" role="img" aria-label="BlockNote のブロックと Markdown の記法の対応表。見出し、段落と太字・コード・リンク、リスト、チェックリスト、コードブロック、引用と画像は往復で保たれる。children の入れ子は平坦化され、table や callout、文字色は失われる">
      <defs>
        <marker id="arrow49a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" fontWeight="600" textAnchor="middle">
        <text x="150" y="28">BlockNote の Block（JSON）</text>
        <text x="455" y="28">Markdown の行</text>
      </g>
      {rows.map((r, i) => (
        <g key={r.block} fontSize="12">
          <rect x="20" y={42 + i * 38} width="260" height="30" rx="5" fill={r.keep ? 'var(--fig-box3)' : 'var(--fig-box)'} stroke={r.keep ? 'var(--fig-line)' : 'var(--fig-danger)'} strokeDasharray={r.keep ? undefined : '5 3'} />
          <text x="150" y={61 + i * 38} textAnchor="middle" fontFamily="monospace">{r.block}</text>
          <path d={`M284,${57 + i * 38} L316,${57 + i * 38}`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49a)" markerStart={r.keep ? 'url(#arrow49a)' : undefined} />
          <rect x="320" y={42 + i * 38} width="290" height="30" rx="5" fill={r.keep ? 'var(--fig-box4)' : 'var(--fig-box)'} stroke={r.keep ? 'var(--fig-line)' : 'var(--fig-danger)'} strokeDasharray={r.keep ? undefined : '5 3'} />
          <text x="465" y={61 + i * 38} textAnchor="middle" fontFamily="monospace">{r.md}</text>
        </g>
      ))}
      <text x="320" y="360" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">両向き矢印・実線：往復で保たれる（テストで確認）　片向き矢印・破線：書き出すと情報が減る　模式図</text>
    </svg>
  )
}

/* ---------- 図 49-2 書き出しと読み込みの流れ ---------- */
function IOFlowFigure() {
  const lanes = [
    { x: 80, label: 'markdownIO.ts' },
    { x: 240, label: 'dialog プラグイン' },
    { x: 400, label: 'コマンド層 + core' },
    { x: 560, label: 'fs プラグイン' },
  ]
  return (
    <svg viewBox="0 0 640 380" role="img" aria-label="Markdown の書き出しと読み込みのシーケンス図。書き出しでは markdownIO.ts が dialog の save でパスを得て、export_page_markdown コマンドで Markdown 文字列を受け取り、fs の writeTextFile で書く。読み込みでは dialog の open でパスを得て、fs の readTextFile で読み、import_markdown コマンドでページを作る">
      <defs>
        <marker id="arrow49b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 70} y="16" width="140" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="13" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="350" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <text x="20" y="72" fill="var(--fig-muted)">書き出し</text>
        <path d="M80,90 L238,90" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="160" y="82" textAnchor="middle">save({'{ defaultPath, filters }'})</text>
        <path d="M240,115 L82,115" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="160" y="107" textAnchor="middle">path（fs スコープに追加済み）</text>
        <path d="M80,145 L398,145" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="240" y="137" textAnchor="middle">export_page_markdown(id)</text>
        <path d="M400,170 L82,170" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="240" y="162" textAnchor="middle">"# タイトル\n\n…"（文字列）</text>
        <path d="M80,200 L558,200" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="320" y="192" textAnchor="middle">writeTextFile(path, markdown)</text>

        <text x="20" y="242" fill="var(--fig-muted)">読み込み</text>
        <path d="M80,260 L238,260" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="160" y="252" textAnchor="middle">open({'{ multiple: true }'})</text>
        <path d="M80,290 L558,290" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="320" y="282" textAnchor="middle">readTextFile(path) → 文字列</text>
        <path d="M80,320 L398,320" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow49b)" />
        <text x="240" y="312" textAnchor="middle">import_markdown(markdown, parentId, fallbackTitle) → Page</text>
      </g>
      <text x="320" y="370" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">濃い矢印：要求　薄い矢印：応答　ファイルの選択と読み書きはフロントエンドがプラグインを直接呼ぶ　模式図</text>
    </svg>
  )
}

/* ---------- 図 49-3 スコープの流れ ---------- */
function ScopeFigure() {
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="fs プラグインのスコープがどう決まるかの図。capability には $APPDATA/attachments 以下だけが書かれている。dialog プラグインでユーザーがファイルを選ぶと、そのパスが実行時に fs のスコープへ追加され、writeTextFile や readTextFile が許可される。選んでいないパスは拒否される">
      <defs>
        <marker id="arrow49c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="20" y="30" width="200" height="70" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="52" textAnchor="middle" fontWeight="600">capability（静的）</text>
        <text x="120" y="72" textAnchor="middle" fontFamily="monospace">$APPDATA/attachments/ 以下</text>
        <text x="120" y="90" textAnchor="middle" fill="var(--fig-muted)">画像の保存先だけ</text>

        <rect x="20" y="130" width="200" height="70" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="120" y="152" textAnchor="middle" fontWeight="600">dialog（実行時）</text>
        <text x="120" y="172" textAnchor="middle" fontFamily="monospace">~/Documents/メモ.md</text>
        <text x="120" y="190" textAnchor="middle" fill="var(--fig-muted)">ユーザーが選んだパス</text>

        <path d="M222,65 L318,105" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49c)" />
        <path d="M222,165 L318,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49c)" />
        <text x="270" y="140" textAnchor="middle" fill="var(--fig-muted)">allow_file</text>

        <rect x="320" y="80" width="150" height="70" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="395" y="105" textAnchor="middle" fontWeight="600">fs のスコープ</text>
        <text x="395" y="125" textAnchor="middle">許可されたパスの集合</text>

        <path d="M472,100 L518,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow49c)" />
        <path d="M472,130 L518,150" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow49c)" />
        <rect x="520" y="50" width="105" height="50" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="572" y="71" textAnchor="middle">選んだパス</text>
        <text x="572" y="89" textAnchor="middle" fill="var(--fig-muted)">→ 読み書き OK</text>
        <rect x="520" y="130" width="105" height="50" rx="6" fill="var(--fig-bg)" stroke="var(--fig-danger)" strokeDasharray="5 3" />
        <text x="572" y="151" textAnchor="middle">それ以外</text>
        <text x="572" y="169" textAnchor="middle" fill="var(--fig-muted)">→ forbidden path</text>
      </g>
      <text x="320" y="220" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：許可　破線：拒否　模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 49,
  part: 6,
  title: 'Markdown の書き出しと読み込み',
  summary:
    'ページを Markdown ファイルとして書き出し、Markdown ファイルからページを作れるようにします。BlockNote の JSON と Markdown を相互に変換する Rust コード、変換で失われる情報、ファイル選択の dialog プラグインと読み書きの fs プラグインの使い方、capability での許可と、dialog が選んだパスが自動的に許可される仕組みを扱います。',
  goals: [
    'Markdown を書き出し形式に選ぶ理由と、CommonMark と GFM 拡張の関係を説明できる',
    'BlockNote の Block[] JSON を Markdown に変換する Rust コードと、逆変換の行単位の解析を読める',
    '変換で保たれる要素と失われる要素を挙げ、往復テストが何を保証しているかを説明できる',
    'dialog プラグインの open / save と fs プラグインの readTextFile / writeTextFile を組み合わせて使える',
    'fs のスコープが capability と dialog の選択の両方で決まることを説明できる',
  ],
  prerequisites: [23, 27, 37, 38, 44, 45],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            Tsumugi のデータは、<ChapterLink n={42} /> で見たとおり SQLite のファイル 1 つに入っています。アプリの中では便利ですが、「他のアプリに持っていきたい」「テキストとして Git で管理したい」「アプリをやめても読める形で残したい」という要求には応えられません。この章では、ページを <Term en="Markdown">Markdown</Term> のテキストファイルとして書き出し、逆に Markdown ファイルを読み込んでページを作る機能を実装します。
          </p>
          <p>できることは 3 つです。</p>
          <ul>
            <li>ページ見出しの「⬇ MD」ボタンで、今開いているページを 1 つの <code>.md</code> ファイルに書き出す。</li>
            <li>設定ダイアログから、全ページを選んだフォルダに 1 ファイルずつ書き出す。</li>
            <li>設定ダイアログから、複数の <code>.md</code> ファイルを選んで、それぞれを新しいページとして取り込む。</li>
          </ul>
          <p>役割分担は、これまでの章と少し違います。</p>
          <ul>
            <li>Rust の core クレート（<code>markdown.rs</code>）は、「BlockNote の JSON ⇄ Markdown 文字列」の変換だけを担当します。ファイルには触りません。</li>
            <li>ファイルの選択は dialog プラグイン、読み書きは fs プラグインを、フロントエンド（<code>src/features/settings/markdownIO.ts</code>）から直接呼びます。</li>
          </ul>
          <p>
            ファイル操作を Rust のコマンドに書かずプラグインに任せるのは、<ChapterLink n={38} /> で見た「公式プラグインがあるものは自分で書かない」方針です。ユーザーが選んだパスへの読み書きの許可も、プラグインが面倒を見てくれます。その仕組みは後半で確認します。
          </p>
        </>
      ),
    },
    {
      id: 'design',
      title: '設計：Markdown に何を写し、何をあきらめるか',
      body: (
        <>
          <p>
            Markdown は、見出しを <code>#</code>、箇条書きを <code>-</code> で書くプレーンテキストの記法です。仕様は <Term en="CommonMark">CommonMark</Term> として整理されており、ATX 見出し（<code>#</code> から <code>######</code>）、<code>```</code> で囲むコードブロック、<code>&gt;</code> の引用、<code>-</code> や <code>1.</code> のリスト、アスタリスクで囲む強調（1 つで斜体、2 つで太字）、バッククォートのコードスパン、<code>[文字](url)</code> のリンク、<code>![説明](url)</code> の画像が定義されています。<Ref n={1} /> 一方、チェックボックス付きの <code>- [ ]</code>（タスクリスト）と <code>~~</code> の取り消し線は CommonMark にはなく、GitHub Flavored Markdown（GFM）が拡張として定義しているものです。<Ref n={2} /> GFM は CommonMark の厳密な上位集合なので、<Ref n={2} /> Tsumugi はこの 2 つの拡張を含む GFM の範囲で書き出します。
          </p>
          <p>
            BlockNote のブロックは、Markdown より表現力があります。<ChapterLink n={44} /> で見たように、ブロックは <code>type</code>、<code>props</code>、<code>content</code>、<code>children</code> を持ち、<ChapterLink n={45} /> では独自の callout ブロックも足しました。Markdown にはそのすべてを写す記法がありません。だから、変換の設計は「何を写し、何をあきらめるか」を決める作業になります。図 49-1 に、Tsumugi の対応表を示します。
          </p>
          <Figure n="49-1" title="ブロックと Markdown の対応と、往復で保たれる範囲" caption="上の 6 行は書き出して読み込むと元のブロックに戻る（往復テストで確認）。下の 2 行は書き出すと情報が減る。children の入れ子は平坦化され、table ブロック、callout ブロック、文字色などの装飾は Markdown に対応する記法が無いため落ちる。模式図。">
            <MappingFigure />
          </Figure>
          <p>対応するブロックと装飾は、<code>markdown.rs</code> の冒頭にモジュールのドキュメントコメントとして書いてあります。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（冒頭）"
            code={`
//! BlockNote の Block[] JSON ⇄ Markdown。
//!
//! 対応ブロック: heading / paragraph / bulletListItem / numberedListItem /
//! checkListItem / codeBlock / quote / image。
//! インライン装飾: bold(**) / italic(*) / code(\`) / strike(~~)。
//!
//! ponytail: 入れ子（children）は書き出し時に平坦化し、読み込みでもネストしない。
//! 階層付きリストが必要になったらインデント幅で親子を復元する。
`}
          />
          <p>あきらめた点を正直に書いておきます。</p>
          <ul>
            <li>
              入れ子（<code>children</code>）は平坦化します。段落の下にぶら下がった箇条書きは、書き出すと同じ階層の行になります。読み込みでもインデントを見ません。上のコメントの <code>ponytail:</code> の行が、この判断の記録です。
            </li>
            <li>
              表ブロック（<code>table</code>）は、<code>content</code> が配列ではなくオブジェクトなので、インライン変換が空文字列を返し、空行になります。callout ブロックは、既知の型に当てはまらないので中のテキストだけが段落として出ます。
            </li>
            <li>
              文字の装飾のうち、太字・斜体・コード・取り消し線は写しますが、文字色や背景色、下線は落ちます。
            </li>
            <li>
              画像は <code>![caption](url)</code> になりますが、<ChapterLink n={45} /> で保存した画像の <code>url</code> は <code>attachments/…</code> というアプリ内の相対パスなので、書き出したファイルを他のアプリで開いても画像は表示されません。画像ファイル自体は書き出しません。
            </li>
            <li>
              ブロックの <code>id</code> は、Markdown には存在しません。読み込むと BlockNote が新しい id を振ります。
            </li>
          </ul>
          <p>
            「完全な往復」を目指すなら、JSON をそのまま書き出すのが正解です。しかしそれでは、他のアプリで読めるという Markdown の利点が消えます。ここでは「人が読める形で持ち出せること」を優先し、往復で保たれる範囲をテストで明示する、という落としどころを選びます。
          </p>
        </>
      ),
    },
    {
      id: 'export',
      title: 'Rust 側：JSON から Markdown へ',
      body: (
        <>
          <p>
            書き出しは、<code>page_to_markdown</code> がタイトルを <code># タイトル</code> の 1 行目にし、本文を <code>blocks_to_markdown</code> で続けます。本体の <code>write_blocks</code> は、ブロックの配列を上から順に Markdown の行へ変換します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（抜粋）"
            code={`
/// ページ全体を Markdown にする。先頭行が \`# タイトル\`。
pub fn page_to_markdown(title: &str, content_json: &str) -> Result<String> {
    let body = blocks_to_markdown(content_json)?;
    Ok(format!("# {title}\\n\\n{body}"))
}

fn write_blocks(blocks: &Value, lines: &mut Vec<String>) {
    let Some(arr) = blocks.as_array() else { return };
    let mut prev_type = "";
    for block in arr {
        let ty = block["type"].as_str().unwrap_or("paragraph");
        let text = inline_to_markdown(&block["content"]);
        // リスト項目同士以外は空行で区切る
        let is_list = matches!(ty, "bulletListItem" | "numberedListItem" | "checkListItem");
        if !lines.is_empty() && !(is_list && prev_type == ty) {
            lines.push(String::new());
        }
        match ty {
            "heading" => {
                let level = block["props"]["level"].as_u64().unwrap_or(1).clamp(1, 6) as usize;
                lines.push(format!("{} {text}", "#".repeat(level)));
            }
            "bulletListItem" => lines.push(format!("- {text}")),
            "numberedListItem" => lines.push(format!("1. {text}")),
            "checkListItem" => {
                let mark = if block["props"]["checked"].as_bool().unwrap_or(false) {
                    "x"
                } else {
                    " "
                };
                lines.push(format!("- [{mark}] {text}"));
            }
            "codeBlock" => {
                let lang = block["props"]["language"].as_str().unwrap_or("");
                let raw = plain_text(&block["content"]);
                lines.push(format!("\`\`\`{lang}"));
                lines.extend(raw.lines().map(str::to_owned));
                lines.push("\`\`\`".into());
            }
            "quote" => lines.push(format!("> {text}")),
            "image" => {
                let url = block["props"]["url"].as_str().unwrap_or("");
                let caption = block["props"]["caption"].as_str().unwrap_or("");
                lines.push(format!("![{caption}]({url})"));
            }
            _ => lines.push(text),
        }
        prev_type = ty;
        write_blocks(&block["children"], lines);
    }
}
`}
          />
          <p>読みどころを挙げます。</p>
          <ul>
            <li>
              空行の入れ方。Markdown では段落同士を空行で区切りますが、リスト項目同士は続けて書きます。<code>prev_type</code> で直前のブロックの型を覚えておき、「同じ種類のリスト項目が続くとき以外は空行を入れる」としています。<code>matches!</code> マクロ（<ChapterLink n={21} />）で 3 種類のリストをまとめて判定しています。
            </li>
            <li>
              番号付きリストは常に <code>1.</code> で書きます。CommonMark では番号付きリストの番号は最初の項目のものだけが意味を持つので、全部 <code>1.</code> でも正しく番号付きリストになります。番号を数える手間を省けます。
            </li>
            <li>
              コードブロックの中身は <code>plain_text</code> で装飾なしのテキストを取り、行ごとに分けて <code>```</code> で囲みます。中身を <code>inline_to_markdown</code> に通すと、コード中の <code>*</code> が強調の記号に化けてしまうからです。
            </li>
            <li>
              最後の <code>write_blocks(&amp;block["children"], lines)</code> が平坦化です。子ブロックを、親と同じ <code>lines</code> に同じ階層で追加しています。
            </li>
          </ul>
          <p>インラインの変換は、<code>styles</code> を見て記号で囲みます。<code>text</code> の分岐の前半と、<code>link</code> の分岐を抜粋します。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（抜粋。bold / italic / strike の分岐は省略）"
            code={`
fn inline_to_markdown(content: &Value) -> String {
    let mut s = String::new();
    let Some(items) = content.as_array() else {
        return s;
    };
    for item in items {
        match item["type"].as_str() {
            Some("text") => {
                let text = item["text"].as_str().unwrap_or("");
                let styles = &item["styles"];
                let mut t = text.to_owned();
                if styles["code"].as_bool() == Some(true) {
                    t = format!("\`{t}\`");
                }
`}
          />
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（抜粋。link の分岐）"
            code={`
            Some("link") => {
                let inner = inline_to_markdown(&item["content"]);
                let href = item["href"].as_str().unwrap_or("");
                s.push_str(&format!("[{inner}]({href})"));
            }
`}
          />
          <p>
            省略した 3 つの分岐は、<code>code</code> と同じ形で、<code>bold</code> なら 2 つのアスタリスク、<code>italic</code> なら 1 つのアスタリスク、<code>strike</code> なら 2 つのチルダで <code>t</code> を囲み、最後に <code>s.push_str(&amp;t)</code> で連結します。<code>code</code> を最初に処理しているのは、他の記号の内側にバッククォートが来るようにするためです。<code>link</code> は中の <code>content</code> を再帰で変換してから <code>[文字](url)</code> の形にします。<code>table</code> ブロックの <code>content</code> はオブジェクトなので、最初の <code>let-else</code> で空文字列が返り、前節で述べたとおり空行になります。
          </p>
        </>
      ),
    },
    {
      id: 'import',
      title: 'Rust 側：Markdown から JSON へ',
      body: (
        <>
          <p>
            読み込みは、書き出しの逆です。ただし、Markdown の完全な構文解析器を書くつもりはありません。Tsumugi 自身が書き出した形と、よくある手書きの Markdown が読めれば十分です。そこで、1 行ずつ先頭の記号を見て分岐する、行単位の解析にしています。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（抜粋）"
            code={`
pub fn markdown_to_blocks(md: &str) -> Result<String> {
    let mut blocks: Vec<Value> = Vec::new();
    let mut lines = md.lines().peekable();
    while let Some(line) = lines.next() {
        let trimmed = line.trim_end();
        if trimmed.trim().is_empty() {
            continue;
        }
        if let Some(lang) = trimmed.strip_prefix("\`\`\`") {
            let mut code = Vec::new();
            for l in lines.by_ref() {
                if l.trim_end() == "\`\`\`" {
                    break;
                }
                code.push(l);
            }
            blocks.push(block(
                "codeBlock",
                json!({ "language": lang.trim() }),
                vec![text_node(&code.join("\\n"), json!({}))],
            ));
        } else if let Some((level, rest)) = heading(trimmed) {
            blocks.push(block(
                "heading",
                json!({ "level": level }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed
            .strip_prefix("- [ ] ")
            .or(trimmed.strip_prefix("* [ ] "))
        {
            blocks.push(block(
                "checkListItem",
                json!({ "checked": false }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed
            .strip_prefix("- [x] ")
            .or(trimmed.strip_prefix("* [x] "))
        {
            blocks.push(block(
                "checkListItem",
                json!({ "checked": true }),
                parse_inline(rest),
            ));
        } else if let Some(rest) = trimmed.strip_prefix("- ").or(trimmed.strip_prefix("* ")) {
            blocks.push(block("bulletListItem", json!({}), parse_inline(rest)));
        } else if let Some(rest) = numbered(trimmed) {
            blocks.push(block("numberedListItem", json!({}), parse_inline(rest)));
        } else if let Some(rest) = trimmed.strip_prefix("> ") {
            blocks.push(block("quote", json!({}), parse_inline(rest)));
        } else if let Some((caption, url)) = image(trimmed) {
            blocks.push(json!({
                "type": "image",
                "props": { "url": url, "caption": caption, "name": "" },
                "children": []
            }));
        } else {
            blocks.push(block("paragraph", json!({}), parse_inline(trimmed)));
        }
    }
    Ok(serde_json::to_string(&blocks)?)
}
`}
          />
          <p>
            <code>strip_prefix</code> は、文字列が指定の接頭辞で始まっていればその後ろを <code>Some</code> で返す <code>&amp;str</code> のメソッドです（<ChapterLink n={20} />）。<code>if let ... else if let ...</code> の連鎖で、「<code>- [ ] </code> で始まるか、<code>- [x] </code> か、<code>- </code> か」と、長い接頭辞から順に試しています。順序を逆にすると、<code>- [ ] 未完了</code> が箇条書きとして解釈されてしまいます。
          </p>
          <p>
            コードブロックだけは複数行にまたがるので、<code>```</code> を見つけたら閉じの <code>```</code> まで <code>lines.by_ref()</code> で行を消費します。<code>by_ref</code> は、イテレータの所有権を渡さずに <code>for</code> で回すための書き方で（<ChapterLink n={27} />）、ループを抜けた後も外側の <code>while</code> が同じイテレータの続きを読めます。
          </p>
          <p>
            行内の装飾を戻す <code>parse_inline</code> は、文字を 1 つずつ見て <code>**</code> や <code>~~</code> で太字・取り消し線の状態を反転させ、バッククォートは閉じまでをコード、<code>[文字](url)</code> はリンクにする小さな状態機械です。閉じられていないバッククォートや、<code>](</code> が続かない <code>[</code> は、記号ではなく普通の文字として扱います。この挙動はテスト <code>inline_edge_cases</code> で確認しています。
          </p>
          <p>ページ単位の読み込みでは、先頭の <code># 見出し</code> をタイトルにします。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/markdown.rs（抜粋）"
            code={`
/// \`# タイトル\` で始まる Markdown を (タイトル, Block[] JSON) に分ける。
/// 見出しが無ければタイトルは \`fallback_title\`。
pub fn markdown_to_page(md: &str, fallback_title: &str) -> Result<(String, String)> {
    let mut lines = md.lines().peekable();
    while lines.peek().is_some_and(|l| l.trim().is_empty()) {
        lines.next();
    }
    let (title, rest): (String, String) = match lines.peek().and_then(|l| l.strip_prefix("# ")) {
        Some(t) => {
            let t = t.trim().to_owned();
            lines.next();
            (t, lines.collect::<Vec<_>>().join("\\n"))
        }
        None => (
            fallback_title.to_owned(),
            lines.collect::<Vec<_>>().join("\\n"),
        ),
    };
    Ok((title, markdown_to_blocks(&rest)?))
}
`}
          />
          <p>
            <code>peekable</code> にしたイテレータの <code>peek</code> は、次の行を消費せずに覗きます。先頭の空行を読み飛ばし、次の行が <code># </code> で始まればタイトルとして取り出し、そうでなければ呼び出し側から渡された <code>fallback_title</code>（ファイル名から拡張子を除いたもの）を使います。
          </p>
        </>
      ),
    },
    {
      id: 'round-trip-tests',
      title: '往復テスト：何が保たれるかを明示する',
      body: (
        <>
          <p>
            変換で何が保たれるかは、文章で約束するより、テストで示すほうが確実です。<code>tests/markdown.rs</code> には、見出し・装飾付き段落・2 種類のリスト・チェックリスト・コードブロック・引用・画像を含む <code>BLOCKS</code>（JSON）と、それに対応する <code>MD</code>（Markdown）が定数として書かれています。テストは 3 段階です。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/tests/markdown.rs（抜粋）"
            code={`
#[test]
fn blocks_to_markdown_matches_expected() {
    assert_eq!(markdown::blocks_to_markdown(BLOCKS).unwrap(), MD);
}

#[test]
fn markdown_round_trip() {
    let json = markdown::markdown_to_blocks(MD).unwrap();
    let mut expected = normalize(BLOCKS);
    // 画像は読み込み側が name:"" を補うので揃える
    for b in expected.iter_mut() {
        if b["type"] == "image" {
            b["props"]["name"] = Value::String(String::new());
        }
    }
    assert_eq!(normalize(&json), expected);
    // 再度書き出すと同じ Markdown
    assert_eq!(markdown::blocks_to_markdown(&json).unwrap(), MD);
}
`}
          />
          <ol className="steps">
            <li><code>BLOCKS</code> を書き出すと <code>MD</code> と完全一致する。空行の入れ方まで含めて固定されます。</li>
            <li><code>MD</code> を読み込むと <code>BLOCKS</code> と同じ構造になる。<code>normalize</code> という補助関数で、型・props・テキスト・styles だけを比べ、<code>id</code> のような往復で変わって当然のものは無視します。</li>
            <li>読み込んだ結果をもう一度書き出すと、再び <code>MD</code> になる。これで「書き出し → 読み込み → 書き出し」が安定していることが分かります。</li>
          </ol>
          <p>
            このテストに含まれている要素が「往復で保たれる範囲」であり、含まれていない要素（入れ子、表、callout、文字色）が「保たれない範囲」です。図 49-1 の線引きは、このテストの中身をそのまま表にしたものです。本制作環境では、これらを含む core のテスト 14 件がすべて合格しています。
          </p>
        </>
      ),
    },
    {
      id: 'plugins',
      title: 'dialog と fs プラグイン、そして capability',
      body: (
        <>
          <p>
            変換ができたので、ファイルとやり取りします。使うのは 2 つの公式プラグインです。dialog プラグインは、<code>open()</code> でファイルやフォルダを選ぶダイアログを、<code>save()</code> で保存先を選ぶダイアログを出します。<code>open()</code> は <code>multiple: true</code> なら配列を、そうでなければ 1 つのパスを返し、ユーザーがキャンセルすると <code>null</code> になります。<code>save()</code> はパスか <code>null</code> です。<Ref n={3} /> <code>filters</code> で拡張子を絞り、<code>defaultPath</code> で初期のファイル名を指定できます。<Ref n={3} /> fs プラグインは、<code>readTextFile</code> と <code>writeTextFile</code> でテキストを読み書きします。<Ref n={4} />
          </p>
          <p>
            どちらも Rust 側では <code>lib.rs</code> で <code>.plugin(tauri_plugin_fs::init())</code> と <code>.plugin(tauri_plugin_dialog::init())</code> を登録し、<ChapterLink n={37} /> の capability で許可を与えます。Tsumugi の capability は次のとおりです。
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
            ここで疑問が湧くはずです。<code>fs:allow-read-text-file</code> と <code>fs:allow-write-text-file</code> にはスコープ（パスの一覧）が付いていません（<code>fs:default</code> が含むのは <code>$APPDATA</code> などアプリ専用ディレクトリのスコープで、ユーザーの書類フォルダは含みません。<Ref n={4} />）。fs プラグインの公式文書によると、permission を有効にしただけではどのパスにもアクセスできず、allow スコープの無いパスへの操作は実行時に <code>forbidden path</code> エラーになります。<Ref n={4} /> それなら、ユーザーの書類フォルダに書き出すには <code>$HOME</code> 以下すべてを許すような広いスコープが要るのでしょうか。
          </p>
          <p>
            要りません。dialog プラグインの Rust 実装（<code>plugins/dialog/src/commands.rs</code>）を読むと、<code>open</code> と <code>save</code> でユーザーがファイルを選んだ後に、<code>tauri_plugin_fs::FsExt</code> の <code>try_fs_scope()</code> を通じて <code>allow_file</code>（フォルダなら <code>allow_directory</code>）を呼び、選ばれたパスを fs のスコープに追加しています。<Ref n={5} /> つまり、「ユーザーがダイアログで選んだ」こと自体が許可になり、そのパスだけが読み書きできるようになります。図 49-3 に、この 2 系統の許可をまとめます。
          </p>
          <Figure n="49-3" title="fs のスコープは capability と dialog の両方で決まる" caption="左上の capability には、アプリが自分で決めるパス（画像の保存先）だけを書く。左下の dialog でユーザーが選んだパスは、実行時に allow_file でスコープに加わる。どちらにも無いパスは forbidden path で拒否される。模式図。">
            <ScopeFigure />
          </Figure>
          <p>
            この設計の良さは、capability に広いパスを書かずに済むことです。アプリが勝手にユーザーのファイルを読む経路はなく、ユーザーが明示的に選んだファイルだけが対象になります。一方、<ChapterLink n={45} /> の画像保存は、ユーザーが選ぶのではなくアプリが決めた場所（<code>$APPDATA/attachments/</code>）に書くので、こちらは capability に静的なスコープとして書いてあります。
          </p>
          <Callout kind="unverified">
            <p>
              「dialog で選んだパスが fs のスコープに追加される」挙動は、plugins-workspace の <code>v2</code> ブランチのソースコードを読んで確認したもので、v2.tauri.app の dialog と fs のガイドページには明記されていません（2026-11-08 時点）。Linux 上の <code>tauri dev</code> では、capability で許可していないパス（<code>/tmp</code> など）への書き込みと読み取りが拒否されることまでは確認しましたが、dialog で選んだパスが許可される動きは、ネイティブのダイアログを操作できず未検証です。もし書き込みが <code>forbidden path</code> で失敗する場合は、capability の <code>fs:allow-write-text-file</code> に <code>$HOME</code> や <code>$DOCUMENT</code> 以下を許す <code>allow</code> スコープを足して対処してください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'frontend',
      title: 'フロントエンドとコマンド',
      body: (
        <>
          <p>コマンド層は、変換だけを担当する 2 つのコマンドです。</p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/files.rs（抜粋）"
            code={`
#[tauri::command]
pub fn export_page_markdown(db: State<'_, Db>, id: String) -> AppResult<String> {
    with_db(&db, |c| {
        let page = pages::get(c, &id)?;
        markdown::page_to_markdown(&page.title, &page.content)
    })
}

/// Markdown 文字列から新しいページを作る。先頭の \`# 見出し\` がタイトルになる。
#[tauri::command]
pub fn import_markdown(
    db: State<'_, Db>,
    markdown: String,
    parent_id: Option<String>,
    fallback_title: String,
) -> AppResult<Page> {
    with_db(&db, |c| {
        let (title, content) = markdown::markdown_to_page(&markdown, &fallback_title)?;
        pages::create_with_content(c, parent_id.as_deref(), &title, &content)
    })
}
`}
          />
          <p>
            <code>import_markdown</code> は、変換した JSON を <code>pages::create_with_content</code> に渡してページを作ります。この関数は <ChapterLink n={46} /> の <code>search::reindex</code> を呼ぶので、取り込んだページは即座に検索できます。Markdown の文字列はコマンドの引数として JSON 経由で Rust に渡り、変換結果の文字列が戻ってきます。ファイルの中身を往復させる形ですが、ノートの 1 ページ分なら問題になる大きさではありません。
          </p>
          <p>フロントエンドの <code>markdownIO.ts</code> が、dialog・コマンド・fs を順につなぎます。</p>
          <Code
            lang="ts"
            title="src/features/settings/markdownIO.ts（抜粋）"
            code={`
import { join } from "@tauri-apps/api/path";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

const MD_FILTER = [{ name: "Markdown", extensions: ["md"] }];

// ファイル名に使えない文字を落とす
const safeName = (title: string) => (title.replace(/[\\\\/:*?"<>|]/g, "_").trim() || "無題") + ".md";

export async function exportPage(id: string, title: string) {
  try {
    const path = await save({ defaultPath: safeName(title), filters: MD_FILTER });
    if (!path) return;
    await writeTextFile(path, await ipc.exportPageMarkdown(id));
    toast("書き出しました");
  } catch (e) {
    toastError(e);
  }
}

/** 全ページを選んだフォルダに 1 ファイルずつ書き出す */
export async function exportAll() {
  try {
    const dir = await open({ directory: true, title: "書き出し先のフォルダ" });
    if (!dir) return;
    const pages = await ipc.listPages();
    const used = new Set<string>();
    for (const p of pages) {
      let name = safeName(p.title);
      if (used.has(name)) name = \`\${p.id.slice(0, 8)}-\${name}\`;
      used.add(name);
      await writeTextFile(await join(dir, name), await ipc.exportPageMarkdown(p.id));
    }
    toast(\`\${pages.length} ページを書き出しました\`);
  } catch (e) {
    toastError(e);
  }
}

/** Markdown ファイルを選んでページとして取り込む。取り込んだ件数を返す。 */
export async function importFiles(parentId: string | null): Promise<number> {
  try {
    const files = await open({ multiple: true, filters: MD_FILTER, title: "取り込む Markdown" });
    if (!files) return 0;
    for (const path of files) {
      const fallback = path.split(/[\\\\/]/).pop()?.replace(/\\.md$/i, "") ?? "無題";
      await ipc.importMarkdown(await readTextFile(path), parentId, fallback);
    }
    toast(\`\${files.length} ファイルを取り込みました\`);
    return files.length;
  } catch (e) {
    toastError(e);
    return 0;
  }
}
`}
          />
          <p>
            3 つの関数は同じ形をしています。ダイアログでパスを得て、<code>null</code>（キャンセル）なら黙って戻り、プラグインとコマンドを <code>await</code> でつなぎ、成功したらトースト、失敗したら <code>toastError</code> で知らせます（<ChapterLink n={50} />）。図 49-2 に、書き出しと読み込みのそれぞれの順序をまとめます。
          </p>
          <Figure n="49-2" title="書き出しと読み込みで、誰が何を呼ぶか" caption="書き出しは dialog の save → コマンドで変換 → fs で書く、の順。読み込みは dialog の open → fs で読む → コマンドで変換とページ作成、の順。Rust のコマンドはファイルに触らず、文字列の変換だけを行う。模式図。">
            <IOFlowFigure />
          </Figure>
          <p>細かい工夫も見ておきます。</p>
          <ul>
            <li>
              <code>safeName</code> は、タイトルからファイル名に使えない文字（<code>\ / : * ? " &lt; &gt; |</code>）を <code>_</code> に置き換えます。macOS で許されていても Windows で許されない文字があるので、最も厳しい側に合わせています。
            </li>
            <li>
              <code>exportAll</code> では、同じタイトルのページが複数あるとファイル名が衝突するので、2 つ目以降には id の先頭 8 文字を前置します。
            </li>
            <li>
              パスの連結には <code>@tauri-apps/api/path</code> の <code>join</code> を使います。OS ごとの区切り文字で連結して正規化してくれるので、<Ref n={6} /> <code>dir + "/" + name</code> のような手書きを避けられます。
            </li>
            <li>
              <code>importFiles</code> の <code>fallback</code> は、パスの最後の要素から <code>.md</code> を除いたものです。<code>/[\\/]/</code> で区切っているのは、Windows のバックスラッシュにも対応するためです。
            </li>
          </ul>
          <p>
            これらの関数は、<code>PageView.tsx</code>（1 ページの書き出しボタン）と <code>SettingsDialog.tsx</code>（全ページの書き出し、取り込み）から呼ばれます。取り込み後は <code>onImported</code> でサイドバーのページ一覧を取り直します。
          </p>
          <Callout kind="unverified">
            <p>
              ダイアログの表示と、ダイアログ経由でのファイルの実際の読み書きは、ネイティブのダイアログが必要なため未検証で、macOS で <code>npm run tauri dev</code> を実行して確認する想定の記述です。Linux 上では、fs プラグインが <code>$APPDATA</code> 配下への書き込みを許可し、それ以外を拒否することを確認しています。そのほか確認済みなのは core の変換と往復のテスト、および <code>tsc</code>・<code>vite build</code> が通ることです。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'simplifications',
      title: '本書での簡略化と拡張の方向',
      body: (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>簡略化した点</th>
                  <th>拡張するなら</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>入れ子を平坦化する（<code>ponytail:</code> コメント）</td>
                  <td>書き出しで子ブロックを 2 スペースずつインデントし、読み込みでインデント幅から親子を復元する。<code>write_blocks</code> と <code>markdown_to_blocks</code> に深さの引数を足す</td>
                </tr>
                <tr>
                  <td>表と callout は落ちる</td>
                  <td>表は GFM のパイプ記法（<code>| a | b |</code>）に、callout は <code>&gt; [!NOTE]</code> のような慣習的な記法に写す。どちらも読み込み側の分岐を 1 つ足す</td>
                </tr>
                <tr>
                  <td>画像ファイルを書き出さない</td>
                  <td>全ページ書き出しで <code>attachments/</code> をフォルダごとコピーし、<code>url</code> を相対パスのまま残す。fs プラグインの <code>copyFile</code> と、読み込み側のスコープ追加が要る</td>
                </tr>
                <tr>
                  <td>行単位の簡易解析（強調の入れ子や複数行の段落には対応しない）</td>
                  <td>CommonMark 準拠の解析が必要なら、pulldown-cmark のような Rust のクレートを core に追加し、イベント列からブロックを組み立てる</td>
                </tr>
                <tr>
                  <td>取り込みは常に新しいページを作る（同名のページを上書きしない）</td>
                  <td>Markdown の先頭に YAML フロントマターで <code>id</code> を書き出し、読み込み時に同じ id のページがあれば更新する</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            変換ロジックが core クレートの純粋関数として分かれているので、どの拡張も往復テストに項目を足しながら進められます。「テストに入っている要素だけを保証する」という線引きを保てば、拡張しても約束が曖昧になりません。
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
            <li>書き出し形式は、他のアプリで読める Markdown（CommonMark + GFM のタスクリストと取り消し線）。JSON より表現力が落ちるので、何を写し何をあきらめるかを決め、往復テストで線引きを明示する。</li>
            <li>書き出しはブロックを上から行に変換し、同種のリスト項目以外は空行で区切る。コードブロックの中身は装飾を付けない。children は平坦化する。</li>
            <li>読み込みは行の先頭記号で分岐する行単位の解析。長い接頭辞から順に試し、コードブロックだけ閉じまで行を消費する。先頭の # 見出しがタイトルになる。</li>
            <li>ファイルの選択は dialog プラグイン、読み書きは fs プラグインをフロントエンドから直接呼び、Rust のコマンドは文字列の変換だけを担当する。</li>
            <li>fs のスコープは、capability に書く静的な許可と、dialog で選んだパスが実行時に追加される許可の 2 系統で決まる。ユーザーのフォルダを capability に列挙しなくてよい。</li>
          </ul>
          <p>次章では、テーマの切り替え、設定の保存、ウィンドウ状態の復元、エラーのトースト表示といった仕上げを行い、Tsumugi を完成させます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'CommonMark Spec, Version 0.31.2',
      publisher: 'CommonMark',
      url: 'https://spec.commonmark.org/0.31.2/',
      accessed: '2026-11-08',
      version: '0.31.2',
      note: 'ATX 見出し（4.2）、fenced code blocks（4.5）、block quotes（5.1）、list items（5.2）、code spans（6.1）、emphasis（6.2）、links（6.3）、images（6.4）の根拠。',
    },
    {
      title: 'GitHub Flavored Markdown Spec',
      publisher: 'GitHub',
      url: 'https://github.github.com/gfm/',
      accessed: '2026-11-08',
      note: 'GFM が CommonMark の厳密な上位集合であること、タスクリスト項目（5.3）と取り消し線（6.5）が拡張であることの根拠。',
    },
    {
      title: '@tauri-apps/plugin-dialog',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/dialog/',
      accessed: '2026-11-08',
      version: '@tauri-apps/plugin-dialog 2.x',
      note: 'open() の multiple / directory / filters / title / defaultPath、save() の defaultPath / filters、戻り値（配列・単一パス・null）の根拠。',
    },
    {
      title: 'File System',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/plugin/file-system/',
      accessed: '2026-11-08',
      version: 'Tauri 2.x ドキュメント',
      note: 'readTextFile / writeTextFile、permission だけではパスにアクセスできずスコープが必要なこと、forbidden path エラー、$APPDATA などのパス変数、fs:default がアプリ専用ディレクトリの読み取りを含むことの根拠。',
    },
    {
      title: 'plugins-workspace: plugins/dialog/src/commands.rs（v2 ブランチ）',
      publisher: 'GitHub（tauri-apps）',
      url: 'https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/dialog/src/commands.rs',
      accessed: '2026-11-08',
      note: 'open / save で選ばれたパスが try_fs_scope() の allow_file / allow_directory で fs のスコープに追加されることの根拠。',
    },
    {
      title: '@tauri-apps/api: path',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/reference/javascript/api/namespacepath/',
      accessed: '2026-11-08',
      version: '@tauri-apps/api 2.x',
      note: 'join() がプラットフォームの区切り文字でパスを連結して正規化することの根拠。',
    },
  ],
}

export default chapter
