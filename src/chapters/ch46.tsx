import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 46-1 転置インデックス ---------- */
function InvertedIndexFigure() {
  const docs = [
    { y: 70, id: 'ページ A', text: '設計メモ' },
    { y: 130, id: 'ページ B', text: '設計図を描く' },
    { y: 190, id: 'ページ C', text: 'メモ帳' },
  ]
  const terms = [
    { y: 86, term: '設計メ', ids: 'A' },
    { y: 116, term: '計メモ', ids: 'A' },
    { y: 146, term: '設計図', ids: 'B' },
    { y: 176, term: '計図を', ids: 'B' },
    { y: 206, term: '図を描', ids: 'B' },
    { y: 236, term: 'メモ帳', ids: 'C' },
  ]
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="転置インデックスの模式図。左に3つのページの本文、右に3文字ずつの語とそれを含むページの一覧表があり、語から該当ページを直接引けることを示す">
      <defs>
        <marker id="arrow46a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="130" y="36" fontSize="15" fontWeight="600" textAnchor="middle">本文（pages.content から抽出）</text>
      {docs.map((d) => (
        <g key={d.id} fontSize="13">
          <rect x="30" y={d.y - 22} width="200" height="40" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x="40" y={d.y - 6} fontSize="11" fill="var(--fig-muted)">{d.id}</text>
          <text x="130" y={d.y + 10} textAnchor="middle">{d.text}</text>
        </g>
      ))}
      <path d="M240,130 L318,130" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow46a)" />
      <text x="279" y="118" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">索引を作る</text>
      <text x="480" y="36" fontSize="15" fontWeight="600" textAnchor="middle">転置インデックス（語 → ページ）</text>
      <rect x="330" y="50" width="290" height="205" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="400" y="66" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">語（3文字）</text>
      <text x="550" y="66" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">含むページ</text>
      {terms.map((t) => (
        <g key={t.term} fontSize="13">
          <rect x="345" y={t.y - 14} width="110" height="24" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="400" y={t.y + 3} textAnchor="middle">{t.term}</text>
          <rect x="495" y={t.y - 14} width="110" height="24" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="550" y={t.y + 3} textAnchor="middle">{t.ids}</text>
        </g>
      ))}
      <text x="320" y="270" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">「設計図」で検索 → 右の表で「設計図」の行を引くと B が見つかる。本文を順に読まない</text>
      <text x="320" y="290" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：語は trigram（3文字ごと）で区切った例。実際の格納形式は省略している</text>
    </svg>
  )
}

/* ---------- 図 46-2 trigram の分割 ---------- */
function TrigramFigure() {
  const word = ['デ', 'ー', 'タ', 'ベ', 'ー', 'ス']
  const grams = ['データ', 'ータベ', 'タベー', 'ベース']
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="「データベース」という6文字の語が trigram トークナイザによって、デー タ、ータベ、タベー、ベース の4つの3文字の語に分割される様子。下には、2文字の検索語は一致せず LIKE で代用し、3文字以上の検索語は索引で一致することを示す">
      <defs>
        <marker id="arrow46b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="320" y="30" fontSize="15" fontWeight="600" textAnchor="middle">本文「データベース」を trigram で分割する</text>
      {word.map((c, i) => (
        <g key={i} fontSize="16">
          <rect x={200 + i * 40} y="45" width="40" height="40" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={220 + i * 40} y="71" textAnchor="middle">{c}</text>
          <text x={220 + i * 40} y="100" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">{i}</text>
        </g>
      ))}
      {grams.map((g, i) => (
        <g key={g} fontSize="13">
          <path d={`M${260 + i * 40},108 L${155 + i * 110},136`} stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow46b)" />
          <rect x={105 + i * 110} y="140" width="100" height="30" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
          <text x={155 + i * 110} y="160" textAnchor="middle">{g}</text>
        </g>
      ))}
      <text x="320" y="192" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">1文字ずつずらした3文字の窓。6文字の語から 4 個の trigram ができる</text>
      <g fontSize="13">
        <rect x="40" y="215" width="260" height="60" rx="6" fill="var(--fig-box)" stroke="var(--fig-danger)" strokeDasharray="6 4" />
        <text x="170" y="238" textAnchor="middle">検索語「タベ」（2文字）</text>
        <text x="170" y="260" textAnchor="middle" fill="var(--fig-muted)">索引では一致しない → LIKE に逃がす</text>
        <rect x="340" y="215" width="260" height="60" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="470" y="238" textAnchor="middle">検索語「ベース」（3文字）</text>
        <text x="470" y="260" textAnchor="middle" fill="var(--fig-muted)">trigram「ベース」が索引にある → 一致</text>
      </g>
      <text x="320" y="294" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線：索引を使えない経路　実線：索引を使う経路　模式図</text>
    </svg>
  )
}

/* ---------- 図 46-3 保存→索引→検索 ---------- */
function SearchFlowFigure() {
  const lanes = [
    { x: 80, label: 'エディタ／検索画面' },
    { x: 240, label: 'コマンド層' },
    { x: 400, label: 'tsumugi-core' },
    { x: 560, label: 'SQLite' },
  ]
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="保存から索引更新、検索までのシーケンス図。エディタが save_page_content を呼ぶと core の pages::save_content が pages を更新し search::reindex が pages_fts を削除して挿入する。検索画面が search_pages を呼ぶと core の search::search が MATCH か LIKE で問い合わせ、結果にスニペットを付けて返す">
      <defs>
        <marker id="arrow46c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 70} y="16" width="140" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="13" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="370" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <text x="30" y="72" fill="var(--fig-muted)">保存</text>
        <path d="M80,90 L238,90" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="160" y="82" textAnchor="middle">save_page_content(id, content)</text>
        <path d="M240,120 L398,120" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="320" y="112" textAnchor="middle">pages::save_content</text>
        <path d="M400,150 L558,150" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="480" y="142" textAnchor="middle">UPDATE pages SET content</text>
        <rect x="405" y="162" width="150" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="176" textAnchor="middle">search::reindex</text>
        <text x="480" y="190" textAnchor="middle">extract_text で本文抽出</text>
        <path d="M400,215 L558,215" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="480" y="207" textAnchor="middle">DELETE / INSERT pages_fts</text>

        <text x="30" y="252" fill="var(--fig-muted)">検索</text>
        <path d="M80,270 L238,270" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="160" y="262" textAnchor="middle">search_pages(query)</text>
        <path d="M240,300 L398,300" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="320" y="292" textAnchor="middle">search::search</text>
        <path d="M400,330 L558,330" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="480" y="322" textAnchor="middle">MATCH（3文字以上）／LIKE</text>
        <path d="M560,355 L82,355" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow46c)" />
        <text x="320" y="347" textAnchor="middle">SearchHit[]（id・title・snippet）</text>
      </g>
      <text x="320" y="390" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">濃い矢印：要求　薄い矢印：応答　コマンド層は with_db でロックを取って core を呼ぶ　模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 46,
  part: 6,
  title: '全文検索',
  summary:
    'SQLite の FTS5 を使って、Tsumugi のページ本文を全文検索できるようにします。転置インデックスの考え方、日本語に trigram トークナイザが必要な理由、本文を持たない contentless テーブル、BlockNote の JSON からテキストを抜き出す処理、検索コマンドと Cmd/Ctrl+K で開く検索ダイアログまでを実装します。',
  goals: [
    '転置インデックスが LIKE による全走査と比べて何を速くするのかを説明できる',
    'unicode61 トークナイザで日本語が分割されない理由と、trigram トークナイザの仕組みを説明できる',
    'contentless テーブルと contentless_delete の意味、pages の rowid を共有する設計を読める',
    'BlockNote の Block[] JSON からプレーンテキストを再帰的に取り出す Rust コードを読める',
    '3文字未満の検索語を LIKE に逃がす理由と、MATCH 文字列のエスケープを説明できる',
    'ネイティブの dialog 要素と遅延実行で検索ダイアログを作れる',
  ],
  prerequisites: [23, 27, 36, 42, 44],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            ノートが数十ページを超えると、サイドバーのツリーをたどって探すのは面倒になります。この章では、<ChapterLink n={44} /> で保存できるようになったページ本文を対象に、キーワードで探す全文検索を作ります。完成形は、<code>Cmd+K</code>（Windows と Linux では <code>Ctrl+K</code>）で開く検索ダイアログに文字を打つと、タイトルと本文の両方から一致するページが並び、クリックでそのページへ移動する、というものです。
          </p>
          <p>
            検索そのものは <ChapterLink n={42} /> で導入した SQLite に任せます。SQLite には <Term en="FTS5">FTS5</Term> という全文検索の拡張が組み込まれており、rusqlite の <code>bundled</code> 機能で同梱される SQLite 本体（本書の基準は 3.54.1）でそのまま使えます。<Ref n={1} /> ただし、日本語を扱うには 1 つ落とし穴があります。既定のトークナイザは日本語の文を分割できないのです。この落とし穴と、それを避ける trigram トークナイザが、この章の中心になります。
          </p>
          <p>この章の実装は、次の 3 つの層にまたがります。</p>
          <ul>
            <li>SQLite のスキーマ（<code>src-tauri/core/migrations/001_init.sql</code>）: <code>pages_fts</code> 仮想表の定義。</li>
            <li>Rust の core クレート（<code>src-tauri/core/src/search.rs</code>）: BlockNote JSON からのテキスト抽出、索引の更新、検索。<code>cargo test</code> で検証できます。</li>
            <li>コマンドとフロントエンド（<code>src-tauri/src/commands/search.rs</code>、<code>src/features/search/SearchDialog.tsx</code>、<code>src/App.tsx</code>）: 検索コマンドとダイアログ、ショートカット。</li>
          </ul>
          <p>
            まず「なぜ索引が要るのか」から始め、FTS5 の仕組みを押さえてから、コードを上の順に読んでいきます。
          </p>
        </>
      ),
    },
    {
      id: 'inverted-index',
      title: '転置インデックスという考え方',
      body: (
        <>
          <p>
            いちばん素朴な検索は、SQL の <code>LIKE</code> です。<code>WHERE content LIKE '%設計図%'</code> と書けば、本文に「設計図」を含む行が返ります。欠点は、毎回すべての行の本文を先頭から末尾まで読むことです。ページが 10 件なら気になりませんが、本文が長く件数が増えるほど、入力のたびに全ページを読む処理は重くなります。
          </p>
          <p>
            全文検索エンジンは、この問題を<Term en="inverted index">転置インデックス</Term>で解決します。本の巻末にある索引と同じ発想で、「語 → その語を含む文書の一覧」という表を先に作っておき、検索時はその表を引くだけにします。本文を読むのは索引を作るとき、つまり保存のときだけです。図 46-1 は、3 ページ分の本文から索引を作った様子を模式的に描いたものです。右の表の左列が語、右列がその語を含むページを表します。
          </p>
          <Figure n="46-1" title="転置インデックスの考え方" caption="左が本文、右が「語 → 含むページ」の表。検索時は右の表で語を引くだけで該当ページが分かり、本文を順に読まない。語の区切り方（ここでは3文字ごと）はトークナイザが決める。模式図。">
            <InvertedIndexFigure />
          </Figure>
          <p>
            図 46-1 で押さえてほしいのは 2 点です。1 つは、索引は「保存時に作り、検索時に引く」ものなので、保存の手間が少し増える代わりに検索が軽くなるという取引であること。もう 1 つは、本文をどんな単位の「語」に切るかを決める部品が別にあり、それが検索の質を決めることです。この部品を<Term en="tokenizer">トークナイザ</Term>と呼びます。
          </p>
          <p>
            FTS5 は、この転置インデックスを SQLite の<Term en="virtual table">仮想表</Term>として提供します。<code>CREATE VIRTUAL TABLE ... USING fts5(...)</code> で作った表に <code>INSERT</code> すると索引が更新され、<code>WHERE 表名 MATCH '検索語'</code> で引けます。<Ref n={1} /> 普通の表と同じ SQL で操作できるので、rusqlite からも特別な API は要りません。
          </p>
        </>
      ),
    },
    {
      id: 'tokenizer',
      title: 'unicode61 では日本語を分割できない：trigram トークナイザ',
      body: (
        <>
          <p>
            FTS5 の既定のトークナイザは <code>unicode61</code> です。公式文書によると、これはすべての Unicode 文字を「区切り文字」か「語を構成する文字」のどちらかに分類し、語を構成する文字が連続する区間を 1 つの語とみなします。<Ref n={1} /> 既定では、文字（カテゴリ L*）、数字（N*）、私用文字（Co）が語を構成する文字で、空白や記号が区切りです。<Ref n={1} />
          </p>
          <p>
            英語の文なら、これで単語ごとに切れます。<code>"SQLite full text search"</code> は空白で 4 語になります。ところが日本語の文には空白がありません。「設計図を描く」の 6 文字はすべてカテゴリ L の文字なので、unicode61 はこれ全体を 1 つの語として索引に入れます。その結果、「設計図」で検索しても「設計図を描く」という語とは一致せず、見つかりません。単語を切り出すには形態素解析が必要ですが、SQLite はそれを持っていません。
          </p>
          <p>
            この問題への答えが、SQLite 3.34.0（2020-12-01）で追加された <Term en="trigram tokenizer">trigram トークナイザ</Term>です。<Ref n={2} /> 公式文書は、これを「通常の語の一致ではなく、部分文字列の一致を一般にサポートするよう FTS5 を拡張するもの」と説明しています。<Ref n={1} /> 仕組みは単純で、本文を 1 文字ずつずらした 3 文字の窓で切り、その 3 文字組をすべて語として索引に入れます。図 46-2 で、「データベース」がどう切られるかを見てください。
          </p>
          <Figure n="46-2" title="trigram トークナイザによる分割と、検索語の長さによる違い" caption="上：6文字の語は4つの3文字組になる。下：検索語が2文字だと索引のどの3文字組とも一致しないため、Tsumugi では LIKE に逃がす。3文字以上なら検索語自身も3文字組に切られ、索引で一致する。模式図。">
            <TrigramFigure />
          </Figure>
          <p>
            検索語も同じ規則で 3 文字組に切られ、その 3 文字組をすべて含む行が一致します。文字の切れ目をあらかじめ決めないので、「設計図」でも「計図を」でも一致します。単語の境界を知らなくてよい代わりに、索引は大きくなり、「京都府」で検索すると「東京都府中市」にも一致するような、語の境界を無視した一致も起きます。ノートアプリの検索としては、見つからないよりは多めに見つかるほうが使いやすいので、Tsumugi ではこの性質を受け入れます。
          </p>
          <p>
            図 46-2 の下段が、設計上いちばん大事な制約です。公式文書には「3 文字未満の部分文字列は、全文検索クエリで使っても、どの行にも一致しない」と明記されています。<Ref n={1} /> 3 文字組の索引しかないので、2 文字の検索語は原理的に引けないのです。Tsumugi では、2 文字以下の検索語は索引を使わず <code>LIKE</code> で全走査します。短い語の検索は頻度も低く、走査の対象はタイトルと本文の文字列だけなので、実用上は問題になりません。
          </p>
          <p>
            大文字と小文字は、<code>case_sensitive</code> オプションの既定値 0 により区別されません。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'schema',
      title: 'contentless テーブルと rowid の共有',
      body: (
        <>
          <p>
            FTS5 の表は、既定では索引に加えて元の本文も自分で保持します。Tsumugi の本文はすでに <code>pages.content</code> にあるので、同じ内容を二重に持つのは無駄です。そこで <code>content=''</code> を指定した <Term en="contentless table">contentless テーブル</Term>にします。公式文書によると、contentless テーブルでは <code>rowid</code> 以外の列を読もうとすると <code>NULL</code> が返り、また通常は <code>UPDATE</code> と <code>DELETE</code> 文が使えません。<Ref n={1} /> 索引だけを持ち、本文は捨てる、ということです。
          </p>
          <p>
            「DELETE が使えない」のは困ります。ページを編集するたびに古い索引を消して新しい索引を入れたいからです。これを可能にするのが、SQLite 3.43.0（2023-08-24）で追加された <code>contentless_delete=1</code> オプションです。<Ref n={3} /> 公式文書によると、このオプションを付けた contentless-delete テーブルは <code>DELETE</code> 文と <code>INSERT OR REPLACE</code> 文を受け付けます。<Ref n={1} /> マイグレーションの該当部分は次のとおりです。
          </p>
          <Code
            lang="sql"
            title="src-tauri/core/migrations/001_init.sql（抜粋）"
            code={`
-- 全文検索。外部コンテンツ無し（content=''）なので本文は保持せず索引だけを持つ。
-- contentless_delete=1 で DELETE 文が使えるようにする（SQLite 3.43+）。
-- rowid は pages の rowid をそのまま使い、検索結果から pages を引く。
CREATE VIRTUAL TABLE pages_fts USING fts5(
  title, body, content='', contentless_delete=1, tokenize='trigram'
);
`}
          />
          <p>
            列は <code>title</code> と <code>body</code> の 2 つです。<code>body</code> には、次節で作るプレーンテキストが入ります。<code>tokenize='trigram'</code> が前節のトークナイザの指定です。
          </p>
          <p>
            もう 1 つの設計判断は、<code>pages_fts</code> の <code>rowid</code> に <code>pages</code> 表の <code>rowid</code> をそのまま使うことです。<code>pages</code> の主キーは文字列の <code>id</code> ですが、SQLite の通常の表には隠れた整数の <code>rowid</code> があり、FTS5 の表も行を <code>rowid</code> で識別します。同じ番号を使えば、検索結果の <code>rowid</code> から <code>JOIN pages p ON p.rowid = f.rowid</code> で元のページを引けます。contentless テーブルは本文を返せないので、タイトルと本文は <code>pages</code> から取り直す、という流れになります。
          </p>
          <Callout>
            <p>
              SQLite の文書は、<code>VACUUM</code> コマンドが「明示的な <code>INTEGER PRIMARY KEY</code> を持たない表の ROWID を変えることがある」と注意しています。<Ref n={5} /> <code>pages</code> の主キーは文字列なのでこの条件に当てはまりますが、Tsumugi は <code>VACUUM</code> を実行せず、索引は保存のたびに作り直すので実害はありません。長期運用するなら、全件の再索引コマンドを用意するのが堅実です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'extract-text',
      title: 'BlockNote JSON からテキストを取り出す',
      body: (
        <>
          <p>
            <code>pages.content</code> に入っているのは、<ChapterLink n={44} /> で見た BlockNote の <code>Block[]</code> を JSON 文字列にしたものです。見出しや段落のテキストは、各ブロックの <code>content</code> 配列の中に <code>{'{ type: "text", text: "..." }'}</code> として入っていて、リンクはさらにその中に <code>content</code> を持ちます。表ブロックは <code>content</code> がオブジェクトで、<code>rows</code> と <code>cells</code> の入れ子です。画像ブロックはテキストを持ちませんが、<code>props.caption</code> に説明文があります。そして、どのブロックも <code>children</code> に子ブロックを持ち得ます。
          </p>
          <p>
            この JSON をそのまま索引に入れると、<code>"type"</code> や <code>"paragraph"</code> といったキー名まで検索に引っかかってしまいます。そこで、保存時に Rust 側でテキストだけを抜き出します。<code>search.rs</code> の前半がその処理です。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/search.rs（抜粋）"
            code={`
/// BlockNote の Block[] JSON からプレーンテキストを取り出す（ブロックごとに改行）。
pub fn extract_text(content_json: &str) -> String {
    let blocks: Value = serde_json::from_str(content_json).unwrap_or(Value::Null);
    let mut out = Vec::new();
    collect_blocks(&blocks, &mut out);
    out.join("\\n")
}

fn collect_blocks(blocks: &Value, out: &mut Vec<String>) {
    let Some(arr) = blocks.as_array() else { return };
    for block in arr {
        let mut text = String::new();
        match &block["content"] {
            // 通常ブロック: InlineContent[]
            Value::Array(inline) => collect_inline(inline, &mut text),
            // テーブル: { rows: [{ cells: [InlineContent[] | {content: InlineContent[]}] }] }
            Value::Object(table) => {
                if let Some(rows) = table["rows"].as_array() {
                    for row in rows {
                        if let Some(cells) = row["cells"].as_array() {
                            for cell in cells {
                                let inline = cell.as_array().or_else(|| cell["content"].as_array());
                                if let Some(inline) = inline {
                                    collect_inline(inline, &mut text);
                                    text.push(' ');
                                }
                            }
                        }
                    }
                }
            }
            _ => {}
        }
        // 画像などは caption をテキスト扱いにする
        if let Some(caption) = block["props"]["caption"].as_str() {
            text.push_str(caption);
        }
        let text = text.trim().to_owned();
        if !text.is_empty() {
            out.push(text);
        }
        collect_blocks(&block["children"], out);
    }
}

fn collect_inline(inline: &[Value], text: &mut String) {
    for item in inline {
        match item["type"].as_str() {
            Some("text") => text.push_str(item["text"].as_str().unwrap_or("")),
            // link は中に text を持つ
            Some("link") => {
                if let Some(inner) = item["content"].as_array() {
                    collect_inline(inner, text);
                }
            }
            _ => {}
        }
    }
}
`}
          />
          <p>
            読み方のポイントを挙げます。<code>serde_json::Value</code> は JSON を型を決めずに受け取る列挙型で、<code>block["content"]</code> のように添字でたどれます。存在しないキーをたどっても <code>Value::Null</code> が返るだけで、パニックしません（<ChapterLink n={23} />）。<code>as_array</code> や <code>as_str</code> は期待した型でなければ <code>None</code> を返すので、<code>let-else</code> や <code>if let</code> で安全に分岐できます（<ChapterLink n={21} />）。
          </p>
          <p>
            <code>collect_blocks</code> は自分自身を <code>children</code> に対して呼んでいます。ブロックの入れ子が何段あっても、再帰で平らなテキストにできるわけです。壊れた JSON が来たときは <code>unwrap_or(Value::Null)</code> で空文字列になり、索引が空になるだけで保存自体は失敗しません。この関数の挙動は、テスト <code>extracts_plain_text</code> で確認しています。見出し、リンクを含む段落、子ブロック、画像の caption、表のセルを含む文書から、次のテキストが得られることを検証しています。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/tests/search.rs（抜粋）"
            code={`
#[test]
fn extracts_plain_text() {
    let text = search::extract_text(DOC);
    assert_eq!(
        text,
        "設計メモ\\nSQLite のデータベース設計について。\\n子ブロック\\n図1\\nセルA セルB"
    );
    assert_eq!(search::extract_text("not json"), "");
}
`}
          />
        </>
      ),
    },
    {
      id: 'search-impl',
      title: '索引の更新と検索：search.rs の後半',
      body: (
        <>
          <p>
            索引の更新は <code>reindex</code> が担当します。<code>pages</code> から <code>rowid</code>・タイトル・本文を読み、<code>pages_fts</code> の同じ <code>rowid</code> の行を削除してから挿入します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/search.rs（抜粋）"
            code={`
/// ページの索引を作り直す（delete + insert）。
pub fn reindex(conn: &Connection, page_id: &str) -> Result<()> {
    let (rowid, title, content): (i64, String, String) = conn.query_row(
        "SELECT rowid, title, content FROM pages WHERE id = ?1",
        [page_id],
        |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?)),
    )?;
    conn.execute("DELETE FROM pages_fts WHERE rowid = ?1", [rowid])?;
    conn.execute(
        "INSERT INTO pages_fts(rowid, title, body) VALUES (?1, ?2, ?3)",
        params![rowid, title, extract_text(&content)],
    )?;
    Ok(())
}
`}
          />
          <p>
            この関数は <code>pages.rs</code> の <code>create_with_content</code>、<code>rename</code>、<code>save_content</code> の末尾から呼ばれます（<ChapterLink n={43} />）。タイトルの変更も索引に反映させる必要があるので、<code>rename</code> からも呼ぶのを忘れないのがポイントです。ページ削除時は <code>pages::delete</code> が <code>DELETE FROM pages_fts WHERE rowid = (SELECT rowid FROM pages WHERE id = ?1)</code> で索引側も消します。
          </p>
          <p>検索関数は、検索語の長さで 2 つの SQL を使い分けます。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/search.rs（抜粋）"
            code={`
pub fn search(conn: &Connection, query: &str, limit: usize) -> Result<Vec<SearchHit>> {
    let query = query.trim();
    if query.is_empty() {
        return Ok(vec![]);
    }
    // trigram は 3 文字未満をヒットさせないので、短い語は LIKE で代用する
    let sql = if query.chars().count() < 3 {
        "SELECT id, title, content FROM pages
         WHERE title LIKE ?1 ESCAPE '\\\\' OR content LIKE ?1 ESCAPE '\\\\'
         ORDER BY updated_at DESC LIMIT ?2"
    } else {
        "SELECT p.id, p.title, p.content FROM pages_fts f
         JOIN pages p ON p.rowid = f.rowid
         WHERE pages_fts MATCH ?1 ORDER BY rank LIMIT ?2"
    };
    let arg = if query.chars().count() < 3 {
        format!("%{}%", like_escape(query))
    } else {
        // MATCH の文字列リテラル。" を "" に倍化して演算子として解釈されないようにする
        format!("\\"{}\\"", query.replace('"', "\\"\\""))
    };
    let mut stmt = conn.prepare(sql)?;
    let rows = stmt.query_map(params![arg, limit as i64], |r| {
        let content: String = r.get(2)?;
        Ok(SearchHit {
            id: r.get(0)?,
            title: r.get(1)?,
            snippet: make_snippet(&extract_text(&content), query),
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}
`}
          />
          <p>いくつか細かい判断が詰まっているので、順に説明します。</p>
          <ul>
            <li>
              文字数は <code>query.chars().count()</code> で数えます。<code>len()</code> はバイト数なので、日本語 1 文字が 3 バイトと数えられてしまいます（<ChapterLink n={23} />）。
            </li>
            <li>
              <code>MATCH</code> に渡す文字列は FTS5 独自のクエリ構文で解釈され、<code>AND</code> や <code>NOT</code>、<code>*</code> などが演算子になります。公式文書によると、二重引用符で囲んだ文字列は 1 つのフレーズ（語の並び）として扱われ、中の二重引用符は SQL と同様に 2 つ重ねてエスケープします。<Ref n={1} /> そのため、検索語全体を二重引用符で囲み、中の <code>"</code> を <code>""</code> に倍化しています。これで「<code>"AND OR" NOT</code>」のような入力も演算子ではなく文字列として扱われ、エラーになりません（テスト <code>fts_finds_japanese_substring</code> で確認）。
            </li>
            <li>
              <code>ORDER BY rank</code> の <code>rank</code> は、FTS5 のすべての表が持つ隠し列で、既定では <code>bm25()</code> 関数と同じ値を返します。よい一致ほど小さい値になるので、昇順で並べると一致度の高い順になります。<Ref n={1} />
            </li>
            <li>
              <code>LIKE</code> 側では、<code>%</code> と <code>_</code> がワイルドカードなので、<code>like_escape</code> でバックスラッシュを前置し、<code>ESCAPE '\'</code> で無効化しています。これを忘れると「50%」のような検索語が「50 で始まる何か」になってしまいます。
            </li>
            <li>
              <code>SearchHit</code> の <code>snippet</code> は、<code>make_snippet</code> が本文テキストから一致位置の前後 20 文字を切り出したものです。contentless テーブルは本文を持たないので、<code>pages.content</code> から再度 <code>extract_text</code> して切り出しています。
            </li>
          </ul>
          <p>
            保存から検索までの全体の流れを、図 46-3 に時間順でまとめます。コマンド層が <code>with_db</code> でロックを取って core を呼ぶ形は、<ChapterLink n={42} /> と同じです。
          </p>
          <Figure n="46-3" title="保存時の索引更新と、検索時の問い合わせ" caption="上半分が保存：save_page_content → pages::save_content → search::reindex の順に呼ばれ、pages_fts が削除と挿入で作り直される。下半分が検索：search_pages → search::search が検索語の長さで MATCH か LIKE を選び、スニペット付きの結果を返す。模式図。">
            <SearchFlowFigure />
          </Figure>
          <p>
            図 46-3 の上半分は、ユーザーが文字を打つたびではなく、<ChapterLink n={44} /> の自動保存（800 ミリ秒の遅延）のタイミングで走ります。索引の更新は保存に含まれるので、フロントエンドは「索引」という概念を知らずに済みます。
          </p>
          <p>
            これらの挙動は、インメモリ SQLite を使うテスト <code>fts_finds_japanese_substring</code> で確認しています。「データベース」でページが 1 件見つかること、2 文字の「の話」がタイトルに <code>LIKE</code> で一致すること、本文を書き換えた後は古い語で見つからないこと、ページ削除後は索引からも消えることを検証しています。本制作環境では core のテスト 14 件がすべて合格しています。
          </p>
        </>
      ),
    },
    {
      id: 'frontend',
      title: '検索コマンドと検索ダイアログ',
      body: (
        <>
          <p>コマンド層は、他のコマンドと同じく core を薄く包むだけです。</p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/search.rs"
            code={`
#[tauri::command]
pub fn search_pages(
    db: State<'_, Db>,
    query: String,
    limit: Option<usize>,
) -> AppResult<Vec<SearchHit>> {
    with_db(&db, |c| search::search(c, &query, limit.unwrap_or(20)))
}
`}
          />
          <p>
            <code>limit</code> を <code>Option</code> にしてあるので、フロントエンドが省略しても 20 件になります。<code>src/lib/ipc.ts</code> の <code>searchPages(query, limit = 20)</code> がこれを呼びます。
          </p>
          <p>
            検索ダイアログは、HTML 標準の <code>&lt;dialog&gt;</code> 要素で作ります。MDN によると、<code>showModal()</code> で開いたダイアログは外側の内容を操作不能（inert）にし、<code>Esc</code> キーで閉じられ、<code>::backdrop</code> 擬似要素で背景を暗くできます。<Ref n={4} /> フォーカスの移動や <code>Esc</code> の処理を自分で書かずに済むのが利点です。
          </p>
          <Code
            lang="tsx"
            title="src/features/search/SearchDialog.tsx"
            code={`
/** 全文検索。ネイティブの <dialog> を使う（Esc で閉じる・フォーカス管理が無料）。 */
export function SearchDialog({ open, onClose, onSelect }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setHits([]);
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);

  // 入力のたびに 200ms 待ってから検索（連打を抑える）
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      ipc.searchPages(query).then(setHits).catch(toastError);
    }, 200);
    return () => window.clearTimeout(t);
  }, [query, open]);

  return (
    <dialog ref={ref} className="dialog search-dialog" onClose={onClose}>
      <input
        autoFocus
        className="search-input"
        placeholder="ページを検索（3 文字以上で全文検索）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="search-results">
        {hits.map((h) => (
          <li key={h.id}>
            <button onClick={() => onSelect(h.id)}>
              <strong>{h.title || "無題"}</strong>
              <span className="snippet">{h.snippet}</span>
            </button>
          </li>
        ))}
        {query && hits.length === 0 && <li className="muted">見つかりません</li>}
      </ul>
    </dialog>
  );
}
`}
          />
          <p>
            2 つの <code>useEffect</code> がそれぞれ 1 つの仕事をしています。1 つ目は、<code>open</code> という props と DOM のダイアログの開閉状態を同期させる Effect です。<ChapterLink n={13} /> の <code>useRef</code> で DOM 要素を参照し、<ChapterLink n={12} /> で学んだ「外部システムとの同期」として <code>showModal()</code> と <code>close()</code> を呼びます。<code>Esc</code> で閉じられたときは <code>onClose</code> イベントが親に伝わり、親が <code>open</code> を <code>false</code> にします。
          </p>
          <p>
            2 つ目は、入力の 200 ミリ秒後に検索を実行する Effect です。クリーンアップで <code>clearTimeout</code> を呼ぶので、タイマーが切れる前に次の文字が打たれると前の予約は捨てられます。これが <ChapterLink n={12} /> で見たクリーンアップの典型的な使い方で、1 文字ごとにコマンドを呼ぶ無駄を防ぎます。結果の取得に失敗したら <code>toastError</code> でトーストに出します（<ChapterLink n={50} />）。
          </p>
          <p>ショートカットは <code>App.tsx</code> で <code>window</code> の <code>keydown</code> を監視しています。</p>
          <Code
            lang="tsx"
            title="src/App.tsx（抜粋）"
            code={`
  // キーボードショートカット（macOS は ⌘、それ以外は Ctrl）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "k") {
        e.preventDefault();
        setDialog((d) => (d === "search" ? null : "search"));
      } else if (e.key === "n") {
        e.preventDefault();
        void createPage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
`}
          />
          <p>
            <code>metaKey</code> が macOS の <code>⌘</code>、<code>ctrlKey</code> が <code>Ctrl</code> です。どちらかが押されていれば同じ扱いにすることで、OS ごとの分岐を書かずに済ませています。<code>setDialog</code> に関数を渡しているのは、<ChapterLink n={9} /> で学んだ「前の state に基づく更新」です。この Effect の依存配列は空なので、登録は最初の 1 回だけで、<code>onKey</code> が参照する <code>createPage</code> も初回レンダー時のものです。それでも正しく動くのは、<code>createPage</code> がたどる <code>api.create</code> が、<code>useCallback</code> で固定された <code>reload</code> と state の更新関数しか使っていないからです（<ChapterLink n={43} /> の <code>usePages</code>）。将来 <code>createPage</code> が変わる値に依存するようになったら、<ChapterLink n={13} /> の ref で最新の関数を参照する形に直します。
          </p>
          <Callout kind="unverified">
            <p>
              検索ダイアログは、Linux 上の <code>tauri dev</code> で、<code>Ctrl+K</code> での表示、日本語の入力による結果の表示、0 件のときの表示、結果の選択によるページ移動を確認しています。<code>Esc</code> での閉じ方と macOS の <code>⌘K</code> は未検証です。core のテストと <code>tsc</code>・<code>vite build</code> も通っています。
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
          <p>この章の実装は、ノートアプリの個人利用には十分ですが、意図的に省いたことがあります。</p>
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
                  <td>検索語を 1 つのフレーズとして扱い、複数語の AND や OR に対応していない</td>
                  <td>空白で分割し、各語を二重引用符で囲んで <code>AND</code> でつなぐ。FTS5 のクエリ構文をそのまま使える</td>
                </tr>
                <tr>
                  <td>スニペットは Rust 側で本文を再抽出して切り出している</td>
                  <td>本文を FTS5 側にも持たせる（外部コンテンツテーブル）と、<code>snippet()</code> や <code>highlight()</code> 補助関数で一致箇所の強調まで任せられる。その分、本文の二重保持とトリガーの管理が要る</td>
                </tr>
                <tr>
                  <td>2 文字以下の検索語は <code>LIKE</code> で全走査する</td>
                  <td>件数が増えて遅くなれば、2 文字以下は「タイトルのみ」に限定する、あるいは bigram の索引を別に持つ</td>
                </tr>
                <tr>
                  <td>索引の再構築コマンドがない</td>
                  <td>スキーマ変更や不整合に備えて、全ページを走査して <code>reindex</code> を呼ぶコマンドを設定画面に置く</td>
                </tr>
                <tr>
                  <td>「東京都」が「京都」に一致するような、語境界を無視した一致を許している</td>
                  <td>形態素解析器（Rust なら lindera など）でトークナイザを自作する。SQLite のカスタムトークナイザ API を Rust から登録する必要があり、難度は上がる</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            これらはどれも、core クレートの <code>search.rs</code> とマイグレーションを変えるだけで実現でき、コマンド層やフロントエンドには影響しません。Tauri に依存しない層に検索ロジックを置いたことで、テストを回しながら安心して改良できる構造になっています。
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
            <li>全文検索は、保存時に「語 → 文書」の転置インデックスを作り、検索時にそれを引く。FTS5 はこれを SQLite の仮想表として提供する。</li>
            <li>既定の unicode61 トークナイザは文字の連続を 1 語にするため、空白のない日本語を分割できない。trigram トークナイザ（SQLite 3.34.0 以降）は 3 文字の窓で切るので部分一致ができるが、3 文字未満の検索語は一致しないため LIKE に逃がす。</li>
            <li><code>content=''</code> の contentless テーブルは索引だけを持ち、<code>contentless_delete=1</code>（3.43.0 以降）で DELETE が使える。rowid を pages と共有して結果を JOIN で引く。</li>
            <li>保存時に Rust が BlockNote JSON を再帰的にたどってテキストを抽出し、delete と insert で索引を作り直す。MATCH の検索語は二重引用符で囲み、中の引用符を倍化して演算子の解釈を防ぐ。</li>
            <li>検索ダイアログはネイティブの dialog 要素と 200 ミリ秒の遅延実行で作り、Cmd/Ctrl+K で開閉する。</li>
          </ul>
          <p>次章では、ページの中に表形式のデータを置ける簡易データベースを設計し、プロパティの型と表の描画を実装します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'SQLite FTS5 Extension',
      publisher: 'SQLite',
      url: 'https://sqlite.org/fts5.html',
      accessed: '2026-11-08',
      version: 'SQLite 3.54.1 時点の文書',
      note: '仮想表としての FTS5、unicode61 の分類規則、trigram トークナイザ（4.3.4）と 3 文字未満が一致しないこと、case_sensitive の既定値、contentless テーブルと contentless_delete、MATCH の文字列構文と引用符の倍化、rank 列と bm25 の根拠。',
    },
    {
      title: 'SQLite Release 3.34.0 On 2020-12-01',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/releaselog/3_34_0.html',
      accessed: '2026-11-08',
      note: 'FTS5 の trigram 索引が 3.34.0 で追加されたことの根拠。',
    },
    {
      title: 'SQLite Release 3.43.0 On 2023-08-24',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/releaselog/3_43_0.html',
      accessed: '2026-11-08',
      note: 'contentless-delete テーブルが 3.43.0 で追加されたことの根拠。',
    },
    {
      title: '<dialog>: The Dialog element',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
      accessed: '2026-11-08',
      note: 'showModal() による inert 化、Esc キーで閉じること、::backdrop の根拠。',
    },
    {
      title: 'VACUUM',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_vacuum.html',
      accessed: '2026-11-08',
      note: 'INTEGER PRIMARY KEY を持たない表の ROWID が VACUUM で変わり得ることの根拠。',
    },
  ],
}

export default chapter
