import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 47-1 3つの保存方式 ---------- */
function StorageOptionsFigure() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="ユーザーが定義する列を SQLite に保存する3つの方式を横に並べた図。左は EAV で値を1件1行に縦に並べる。中央は動的テーブルで列を ALTER TABLE で増やす。右は JSON 列で行ごとに値のオブジェクトを1つ持つ。Tsumugi は右を選ぶ">
      <g fontSize="12">
        {/* EAV */}
        <rect x="15" y="40" width="195" height="230" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="112" y="30" fontSize="14" fontWeight="600" textAnchor="middle">EAV（縦持ち）</text>
        <text x="112" y="62" textAnchor="middle" fontFamily="monospace">cell(row, prop, value)</text>
        {[
          ['r1', '名前', 'りんご'],
          ['r1', '点数', '30'],
          ['r1', '完了', 'true'],
          ['r2', '名前', 'みかん'],
          ['r2', '点数', '10'],
        ].map((c, i) => (
          <g key={i}>
            <rect x="30" y={75 + i * 26} width="165" height="24" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x="55" y={91 + i * 26} textAnchor="middle">{c[0]}</text>
            <text x="105" y={91 + i * 26} textAnchor="middle">{c[1]}</text>
            <text x="160" y={91 + i * 26} textAnchor="middle">{c[2]}</text>
          </g>
        ))}
        <text x="112" y="230" textAnchor="middle" fill="var(--fig-muted)">1 行を組み立てるのに</text>
        <text x="112" y="248" textAnchor="middle" fill="var(--fig-muted)">プロパティ数ぶんの JOIN</text>

        {/* dynamic table */}
        <rect x="222" y="40" width="195" height="230" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="30" fontSize="14" fontWeight="600" textAnchor="middle">動的テーブル</text>
        <text x="320" y="62" textAnchor="middle" fontFamily="monospace">db_xxx(名前, 点数, 完了)</text>
        <rect x="237" y="75" width="165" height="24" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="265" y="91" textAnchor="middle">名前</text>
        <text x="320" y="91" textAnchor="middle">点数</text>
        <text x="375" y="91" textAnchor="middle">完了</text>
        {[
          ['りんご', '30', '✓'],
          ['みかん', '10', ''],
        ].map((c, i) => (
          <g key={i}>
            <rect x="237" y={101 + i * 26} width="165" height="24" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x="265" y={117 + i * 26} textAnchor="middle">{c[0]}</text>
            <text x="320" y={117 + i * 26} textAnchor="middle">{c[1]}</text>
            <text x="375" y={117 + i * 26} textAnchor="middle">{c[2]}</text>
          </g>
        ))}
        <text x="320" y="190" textAnchor="middle" fill="var(--fig-muted)">列の追加・削除のたびに</text>
        <text x="320" y="208" textAnchor="middle" fill="var(--fig-muted)">ALTER TABLE／表名・列名を</text>
        <text x="320" y="226" textAnchor="middle" fill="var(--fig-muted)">SQL 文字列に組み込む必要</text>

        {/* JSON column */}
        <rect x="429" y="40" width="195" height="230" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="526" y="30" fontSize="14" fontWeight="600" textAnchor="middle">JSON 列（本書の選択）</text>
        <text x="526" y="62" textAnchor="middle" fontFamily="monospace">db_rows(id, "values")</text>
        <g fontFamily="monospace">
          <rect x="444" y="75" width="165" height="60" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="452" y="92">r1 {'{'}"p1":"りんご",</text>
          <text x="452" y="108">    "p2":30,</text>
          <text x="452" y="124">    "p3":true{'}'}</text>
          <rect x="444" y="140" width="165" height="60" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="452" y="157">r2 {'{'}"p1":"みかん",</text>
          <text x="452" y="173">    "p2":10,</text>
          <text x="452" y="189">    "p3":false{'}'}</text>
        </g>
        <text x="526" y="222" textAnchor="middle" fill="var(--fig-muted)">1 行 = 1 レコード。列の増減は</text>
        <text x="526" y="240" textAnchor="middle" fill="var(--fig-muted)">db_properties の行の増減だけ</text>
      </g>
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">p1・p2・p3 は db_properties の id。json_extract("values", '$."p2"') で列の値を取り出せる</text>
      <text x="320" y="320" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図：太枠が採用した方式</text>
    </svg>
  )
}

/* ---------- 図 47-2 スキーマ ---------- */
function SchemaFigure() {
  const box = (x: number, y: number, w: number, title: string, cols: string[], fill: string) => (
    <g fontSize="12">
      <rect x={x} y={y} width={w} height={24 + cols.length * 18} rx="6" fill={fill} stroke="var(--fig-line)" />
      <text x={x + w / 2} y={y + 17} fontSize="13" fontWeight="600" textAnchor="middle">{title}</text>
      <line x1={x} y1={y + 24} x2={x + w} y2={y + 24} stroke="var(--fig-line)" />
      {cols.map((c, i) => (
        <text key={c} x={x + 10} y={y + 40 + i * 18} fontFamily="monospace">{c}</text>
      ))}
    </g>
  )
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="簡易データベースのスキーマ図。pages の下に databases があり、databases から db_properties、db_rows、db_views の3つの表が database_id で参照されている。db_rows の values 列が JSON で、キーは db_properties の id">
      <defs>
        <marker id="arrow47a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {box(20, 20, 150, 'pages', ['id (PK)', 'title', 'content', '…'], 'var(--fig-box)')}
      {box(240, 20, 170, 'databases', ['id (PK)', 'page_id → pages', 'name', 'created_at'], 'var(--fig-box2)')}
      <path d="M172,50 L238,50" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow47a)" />
      <text x="205" y="42" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">1 対 1</text>

      {box(20, 180, 190, 'db_properties', ['id (PK)', 'database_id', 'name, kind', 'options (JSON), position'], 'var(--fig-box3)')}
      {box(235, 180, 180, 'db_rows', ['id (PK)', 'database_id', '"values" (JSON)', 'position, created_at…'], 'var(--fig-box4)')}
      {box(440, 180, 180, 'db_views', ['id (PK)', 'database_id', 'name', 'sort, filter (JSON)'], 'var(--fig-box5)')}

      <path d="M300,120 L115,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow47a)" />
      <path d="M325,120 L325,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow47a)" />
      <path d="M350,120 L530,178" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow47a)" />
      <text x="325" y="150" fontSize="11" fill="var(--fig-muted)" textAnchor="middle">database_id で参照（1 対 多）</text>

      <path d="M233,255 C222,262 218,262 212,255" stroke="var(--fig-accent)" strokeWidth="2" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow47a)" />
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">点線："values" の JSON のキーは db_properties.id。列の定義と値を別の表で持つ</text>
      <text x="320" y="320" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">kind は text / number / select / checkbox / date の CHECK 制約付き</text>
    </svg>
  )
}

/* ---------- 図 47-3 値 JSON と表示の対応 ---------- */
function ValueMappingFigure() {
  const rows = [
    { kind: 'text', json: '"p1": "りんご"', ui: '<input type="text">', fill: 'var(--fig-box)' },
    { kind: 'number', json: '"p2": 30', ui: '<input type="number">', fill: 'var(--fig-box2)' },
    { kind: 'select', json: '"p3": "todo"', ui: '<select> （options から）', fill: 'var(--fig-box3)' },
    { kind: 'checkbox', json: '"p4": true', ui: '<input type="checkbox">', fill: 'var(--fig-box4)' },
    { kind: 'date', json: '"p5": "2026-01-03"', ui: '<input type="date">', fill: 'var(--fig-box5)' },
  ]
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="db_rows の values に入る JSON の各キーが、db_properties の kind に応じてどのネイティブ入力要素で描画されるかの対応表。text は文字列と text 入力、number は数値と number 入力、select は文字列と select 要素、checkbox は真偽値とチェックボックス、date は YYYY-MM-DD の文字列と date 入力に対応する">
      <defs>
        <marker id="arrow47b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" fontWeight="600" textAnchor="middle">
        <text x="90" y="30">kind</text>
        <text x="280" y="30">"values" の JSON（1 行分の一部）</text>
        <text x="520" y="30">CellEditor が出す要素</text>
      </g>
      {rows.map((r, i) => (
        <g key={r.kind} fontSize="13">
          <rect x="30" y={45 + i * 46} width="120" height="36" rx="6" fill={r.fill} stroke="var(--fig-line)" />
          <text x="90" y={68 + i * 46} textAnchor="middle" fontFamily="monospace">{r.kind}</text>
          <rect x="170" y={45 + i * 46} width="220" height="36" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="280" y={68 + i * 46} textAnchor="middle" fontFamily="monospace">{r.json}</text>
          <path d={`M392,${63 + i * 46} L418,${63 + i * 46}`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow47b)" />
          <rect x="420" y={45 + i * 46} width="200" height="36" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
          <text x="520" y={68 + i * 46} textAnchor="middle" fontFamily="monospace">{r.ui}</text>
        </g>
      ))}
      <text x="320" y="292" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">キー p1〜p5 は db_properties.id の例。値が無いキーは未入力として空欄で描画される。模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 47,
  part: 6,
  title: '簡易データベース（1）：設計と表形式のビュー',
  summary:
    'ページの中に表形式のデータを置ける簡易データベースを作ります。前半は設計の章です。5つのプロパティ型を決め、ユーザーが列を自由に増やせるデータを SQLite にどう保存するか（EAV・動的テーブル・JSON 列）を比べて JSON 列を選び、スキーマと Rust の操作関数、表の描画とセル編集までを実装します。',
  goals: [
    'text / number / select / checkbox / date の5つのプロパティ型と、値の JSON 表現を説明できる',
    'ユーザー定義の列を保存する3つの方式（EAV・動的テーブル・JSON 列）の長所と短所を比べ、JSON 列を選んだ理由を説明できる',
    'databases / db_properties / db_rows / db_views のスキーマと、各表の役割を読める',
    'core クレートの作成・プロパティ追加・行更新の関数と、kind の検証を読める',
    'プロパティの型ごとにネイティブの入力要素を出し分け、楽観的更新でセルを編集する React コードを読める',
  ],
  prerequisites: [8, 10, 21, 42, 43],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            ノートアプリには、文章だけでなく「読んだ本の一覧」や「タスクの表」のような、列を持ったデータを置きたくなる場面があります。Tsumugi では、どのページにも 1 つだけ<Term en="database">簡易データベース</Term>を付けられるようにします。ページの本文の下に表が現れ、列（<Term en="property">プロパティ</Term>）を追加し、行を追加し、セルを直接編集できる、という機能です。
          </p>
          <p>
            この機能は 2 章に分けます。この章では、データの形を決め、表を描いてセルを編集できるところまで作ります。次の <ChapterLink n={48} /> で、並べ替えと絞り込み、そしてその条件をビューとして保存する機能を足します。
          </p>
          <p>設計で決めなければならないことは、次の 3 つです。</p>
          <ol className="steps">
            <li>列にどんな型を許すか。型が決まると、値の表現と入力部品が決まります。</li>
            <li>ユーザーが好きに列を増やせるデータを、固定のスキーマを持つ SQLite にどう保存するか。</li>
            <li>その保存形式のまま、次章で並べ替えと絞り込みができるか。</li>
          </ol>
          <p>
            3 つ目が、この章の設計判断を最も強く縛ります。「保存できる」だけなら何でもよいのですが、「SQL で並べ替えられる」形でなければ、次章で行き詰まります。この視点を持って読み進めてください。
          </p>
        </>
      ),
    },
    {
      id: 'property-types',
      title: 'プロパティの型と値の表現',
      body: (
        <>
          <p>
            型は 5 つに絞ります。多すぎると入力部品と比較の規則が増えて手に負えなくなり、少なすぎると使い物になりません。Notion 風のアプリでよく使う最小限として、次の 5 つを選びました。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>kind</th>
                  <th>意味</th>
                  <th>JSON での値</th>
                  <th>入力部品</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>text</code></td>
                  <td>自由な文字列</td>
                  <td>文字列</td>
                  <td><code>&lt;input type="text"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>number</code></td>
                  <td>数値</td>
                  <td>数値</td>
                  <td><code>&lt;input type="number"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>select</code></td>
                  <td>選択肢から 1 つ</td>
                  <td>文字列（選択肢の 1 つ）</td>
                  <td><code>&lt;select&gt;</code></td>
                </tr>
                <tr>
                  <td><code>checkbox</code></td>
                  <td>オン／オフ</td>
                  <td><code>true</code> / <code>false</code></td>
                  <td><code>&lt;input type="checkbox"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>date</code></td>
                  <td>日付</td>
                  <td><code>"YYYY-MM-DD"</code> の文字列</td>
                  <td><code>&lt;input type="date"&gt;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            どの型も、値が無いときは <code>null</code> か、キーそのものが無い状態にします。日付を文字列にしているのは、<code>&lt;input type="date"&gt;</code> の <code>value</code> が常に <code>YYYY-MM-DD</code> 形式に正規化されるためです。<Ref n={2} /> この形式は辞書順と時間順が一致するので、次章の並べ替えで文字列比較がそのまま使えます。<code>select</code> の選択肢は、プロパティ側に <code>options</code> として持ちます。
          </p>
          <p>
            型の一覧は、Rust 側では <code>database.rs</code> の <code>KINDS</code> 定数、TypeScript 側では <code>types.ts</code> の <code>PROPERTY_KINDS</code> として、両方に書きます。<ChapterLink n={34} /> で選んだ「手でそろえる」方針どおりです。
          </p>
          <Code
            lang="ts"
            title="src/lib/types.ts（抜粋）"
            code={`
export const PROPERTY_KINDS = ["text", "number", "select", "checkbox", "date"] as const;
export type PropertyKind = (typeof PROPERTY_KINDS)[number];

export type Property = {
  id: string;
  database_id: string;
  name: string;
  kind: PropertyKind;
  options: string[] | null;
  position: number;
};

export type Row = {
  id: string;
  database_id: string;
  values: Record<string, unknown>;
  position: number;
  created_at: string;
  updated_at: string;
};
`}
          />
          <p>
            <code>as const</code> と <code>(typeof PROPERTY_KINDS)[number]</code> の組み合わせは、<ChapterLink n={6} /> で学んだ「配列から文字列リテラルのユニオン型を作る」書き方です。配列は <code>&lt;select&gt;</code> の選択肢を並べるために、型は <code>switch</code> の網羅性検査のために使います。<code>Row.values</code> が <code>Record&lt;string, unknown&gt;</code> なのは、キー（プロパティ id）も値の型も実行時にしか決まらないからです。読み出す側が <code>kind</code> を見て解釈します。
          </p>
        </>
      ),
    },
    {
      id: 'storage-design',
      title: '保存方式の比較：EAV・動的テーブル・JSON 列',
      body: (
        <>
          <p>
            普通のアプリでは、表の列はプログラマが設計時に決めます。簡易データベースでは、列をユーザーが実行時に決めます。この「列が動く」データを、列が固定されたリレーショナルデータベースにどう入れるかには、大きく 3 つの方式があります。図 47-1 に並べました。
          </p>
          <Figure n="47-1" title="ユーザー定義の列を保存する3つの方式" caption="左の EAV は「行・プロパティ・値」の組を1件1行で縦に積む。中央の動的テーブルはデータベースごとに実際の表を作り列を増減する。右の JSON 列は1行に値のオブジェクトを丸ごと持つ。Tsumugi は右を採用する。模式図。">
            <StorageOptionsFigure />
          </Figure>
          <p>それぞれの長所と短所を整理します。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>方式</th>
                  <th>長所</th>
                  <th>短所</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Term en="EAV">EAV</Term>（Entity-Attribute-Value）</td>
                  <td>スキーマが固定。値ごとに型付きの列や索引を持てる</td>
                  <td>1 行を表示するだけでプロパティ数ぶんの JOIN か集約が要る。「点数が 10 より大きい行」のような条件も自己結合になり、SQL が複雑</td>
                </tr>
                <tr>
                  <td>動的テーブル</td>
                  <td>SQL が最も素直。並べ替えも絞り込みも通常の列と同じ</td>
                  <td>列の追加・削除のたびに <code>ALTER TABLE</code>。表名と列名はバインドできないので、ユーザー由来の名前を SQL 文字列に組み込むことになり、SQL インジェクションの入口になる（<ChapterLink n={48} />）</td>
                </tr>
                <tr>
                  <td>JSON 列</td>
                  <td>1 行 = 1 レコードで読み書きが単純。列の増減はメタデータの行の増減だけ。<code>json_extract</code> で値を取り出して並べ替えと絞り込みができる</td>
                  <td>値に SQLite の型制約を掛けられない。値ごとの索引は式インデックスを別に作る必要がある。大量データの集計には向かない</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Tsumugi は JSON 列を選びます。決め手は 2 つです。1 つは、SQLite の JSON 関数が 3.38.0（2022-02-22）以降は既定で組み込まれていて、<code>json_extract(X, P)</code> で JSON の中の値を取り出せることです。<Ref n={1} /> 公式文書によると、パスが 1 つのとき <code>json_extract</code> は、JSON の数値には <code>INTEGER</code> か <code>REAL</code>、文字列には引用符を外したテキスト、<code>true</code> と <code>false</code> には 1 と 0、JSON の <code>null</code> や存在しないパスには SQL の <code>NULL</code> を返します。<Ref n={1} /> つまり、JSON の中身が SQL の値として扱えるので、<code>ORDER BY</code> や <code>WHERE</code> にそのまま使えます。
          </p>
          <p>
            もう 1 つは安全性です。JSON のパスは SQL のバインド値として渡せるため、ユーザーが付けた列名や id を SQL 文字列に混ぜる必要がありません。動的テーブルでは避けられなかった問題が、構造的に消えます。この点は次章で詳しく扱います。
          </p>
          <p>
            JSON のパスは <code>$</code> で始まり、<code>.ラベル</code> や <code>[添字]</code> を連ねます。<Ref n={1} /> Tsumugi では <code>$."p1"</code> のようにラベルを二重引用符で囲む形を使っています。公式文書のパス構文の説明には引用符付きラベルの記述がありませんが、この形で動くことは次章で見る core のテスト <code>rows_sort_and_filter</code>（同梱の SQLite 3.54.1）で確認しています。
          </p>
          <Callout>
            <p>
              個人のノートに入る行数は、多くても数千件です。この規模では、JSON 列を毎回パースして並べ替えても体感できる遅さにはなりません。「データベースらしさ」より「コードの単純さ」を優先できるのは、この前提があるからです。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'schema',
      title: 'スキーマ：4つの表',
      body: (
        <>
          <p>保存方式が決まったので、表を定義します。マイグレーションの該当部分です。</p>
          <Code
            lang="sql"
            title="src-tauri/core/migrations/001_init.sql（抜粋）"
            code={`
CREATE TABLE databases (
  id         TEXT PRIMARY KEY,
  page_id    TEXT NOT NULL REFERENCES pages(id),
  name       TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE db_properties (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  name        TEXT NOT NULL,
  kind        TEXT NOT NULL CHECK(kind IN ('text','number','select','checkbox','date')),
  options     TEXT NULL,   -- select の選択肢 JSON
  position    INTEGER NOT NULL
);

CREATE TABLE db_rows (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  "values"    TEXT NOT NULL,  -- {propertyId: value} JSON
  position    INTEGER NOT NULL,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE db_views (
  id          TEXT PRIMARY KEY,
  database_id TEXT NOT NULL REFERENCES databases(id),
  name        TEXT NOT NULL,
  sort        TEXT NULL,   -- JSON
  filter      TEXT NULL    -- JSON
);
`}
          />
          <Figure n="47-2" title="簡易データベースのスキーマ" caption="databases はページと 1 対 1 で結び付く。db_properties（列の定義）、db_rows（行）、db_views（並べ替え・絞り込みの保存先）はいずれも database_id で databases を参照する。db_rows の values 列は JSON で、そのキーが db_properties の id を指す。">
            <SchemaFigure />
          </Figure>
          <p>図 47-2 を見ながら、各表の役割と細かい決めごとを確認します。</p>
          <ul>
            <li>
              <code>databases</code>：ページと 1 対 1 です。<code>page_id</code> で <code>pages</code> を参照し、ページが削除されるときは <ChapterLink n={43} /> の <code>pages::delete</code> が付随する 4 つの表の行もまとめて消します。
            </li>
            <li>
              <code>db_properties</code>：列の定義です。<code>kind</code> には <code>CHECK</code> 制約を付け、5 つの文字列以外を SQLite の層で拒否します。Rust 側でも検証しますが、制約を二重に持つことで、将来別の経路で書き込むコードが増えても壊れません。<code>position</code> は表示順です。
            </li>
            <li>
              <code>db_rows</code>：行です。<code>"values"</code> が二重引用符で囲まれているのは、<code>VALUES</code> が SQLite のキーワードだからです。公式文書によると、キーワードを名前として使うには引用が必要で、二重引用符で囲んだキーワードは識別子として扱われます。<Ref n={3} /> 以後、この列を SQL に書くときは必ず <code>"values"</code> と引用します。
            </li>
            <li>
              <code>db_views</code>：次章で使う、並べ替えと絞り込みの条件の保存先です。この章では、データベース作成時に「既定」という名前の空のビューを 1 つ作るところまでを扱います。
            </li>
          </ul>
          <p>
            この 4 表に対応する Rust の構造体は、<code>database.rs</code> の先頭にあります。<code>Row.values</code> は <code>serde_json::Value</code> で、TypeScript 側の <code>Record&lt;string, unknown&gt;</code> と対になります。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
pub const KINDS: &[&str] = &["text", "number", "select", "checkbox", "date"];

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Property {
    pub id: String,
    pub database_id: String,
    pub name: String,
    pub kind: String,
    /// select の選択肢
    pub options: Option<Vec<String>>,
    pub position: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Row {
    pub id: String,
    pub database_id: String,
    pub values: Value,
    pub position: i64,
    pub created_at: String,
    pub updated_at: String,
}

/// フロントエンドへ一括で返す形
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct DatabaseBundle {
    pub database: Database,
    pub properties: Vec<Property>,
    pub views: Vec<View>,
}
`}
          />
          <p>
            <code>DatabaseBundle</code> は、データベース本体・プロパティ一覧・ビュー一覧を 1 回のコマンドで返すための入れ物です。フロントエンドが表を描くには 3 つとも必要なので、往復を 1 回にまとめています。Tsumugi の構造体は <code>serde(rename_all)</code> を付けず <code>snake_case</code> のまま JSON にするので、TypeScript の型も <code>database_id</code> のように書きます。
          </p>
        </>
      ),
    },
    {
      id: 'rust-crud',
      title: 'Rust 側：作成・プロパティ・行の操作',
      body: (
        <>
          <p>
            core クレートの関数は、どれも <code>&amp;Connection</code> を受け取って <code>Result</code> を返す形で、<ChapterLink n={42} /> のページ操作と同じ流儀です。まず、データベースを作る関数を見ます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
pub fn create(conn: &Connection, page_id: &str, name: &str) -> Result<DatabaseBundle> {
    let db = Database {
        id: new_id(),
        page_id: page_id.to_owned(),
        name: name.to_owned(),
        created_at: now(),
    };
    conn.execute(
        "INSERT INTO databases (id, page_id, name, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![db.id, db.page_id, db.name, db.created_at],
    )?;
    // 最初のプロパティと既定ビューを用意しておく
    let name_prop = add_property(conn, &db.id, "名前", "text", None)?;
    let view = save_view(
        conn,
        View {
            id: new_id(),
            database_id: db.id.clone(),
            name: "既定".into(),
            sort: None,
            filter: vec![],
        },
    )?;
    Ok(DatabaseBundle {
        database: db,
        properties: vec![name_prop],
        views: vec![view],
    })
}
`}
          />
          <p>
            作った直後から表として成立するように、「名前」という <code>text</code> のプロパティと、空のビューを一緒に作っています。空の表に「まず列を追加してください」と言うより、1 列ある状態から始めるほうが使い始めやすいからです。テスト <code>create_has_default_property_and_view</code> で、この初期状態と、<code>get_by_page</code> で同じ内容が読み戻せることを確認しています。
          </p>
          <p>プロパティの追加では、<code>kind</code> をホワイトリストで検証します。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
pub fn add_property(
    conn: &Connection,
    database_id: &str,
    name: &str,
    kind: &str,
    options: Option<Vec<String>>,
) -> Result<Property> {
    check_kind(kind)?;
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM db_properties WHERE database_id = ?1",
        [database_id],
        |r| r.get(0),
    )?;
    let prop = Property {
        id: new_id(),
        database_id: database_id.to_owned(),
        name: name.to_owned(),
        kind: kind.to_owned(),
        options,
        position,
    };
    conn.execute(
        "INSERT INTO db_properties (id, database_id, name, kind, options, position)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            prop.id,
            prop.database_id,
            prop.name,
            prop.kind,
            options_json(&prop.options)?,
            prop.position
        ],
    )?;
    Ok(prop)
}

fn check_kind(kind: &str) -> Result<()> {
    if KINDS.contains(&kind) {
        Ok(())
    } else {
        Err(Error::Invalid(format!("unknown property kind: {kind}")))
    }
}
`}
          />
          <p>
            <code>check_kind</code> が <code>Error::Invalid</code> を返すと、<code>?</code> によってそのまま呼び出し元へ伝わり、コマンド層で <code>AppError</code> に変換され、フロントエンドのトーストに「不正な入力: unknown property kind: blob」と表示されます（<ChapterLink n={50} />）。<code>position</code> は「今の最大値 + 1、無ければ 0」で、<ChapterLink n={43} /> のページの並び順と同じ計算です。<code>options</code> は <code>Vec&lt;String&gt;</code> を JSON 文字列にして <code>TEXT</code> 列に入れます。
          </p>
          <p>行の追加と更新は、JSON をそのまま出し入れするだけです。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
pub fn update_row(conn: &Connection, id: &str, values: &Value) -> Result<()> {
    if !values.is_object() {
        return Err(Error::Invalid("values must be a JSON object".into()));
    }
    let n = conn.execute(
        "UPDATE db_rows SET \\"values\\" = ?1, updated_at = ?2 WHERE id = ?3",
        params![values.to_string(), now(), id],
    )?;
    if n == 0 {
        return Err(Error::NotFound(format!("row {id}")));
    }
    Ok(())
}
`}
          />
          <p>
            <code>values</code> がオブジェクトであることだけを検査し、各キーが実在するプロパティかどうかや、値が <code>kind</code> に合っているかまでは検査していません。セルの編集は 1 セルずつ行の JSON 全体を送り直す形なので、検証を厳しくするなら、ここで <code>properties</code> を引いてキーと型を突き合わせます。本書では、フロントエンドが <code>kind</code> ごとに正しい型の値を作ることと、次章の比較が型に応じて値を変換することに任せ、Rust 側の検査は形だけに留めています。
          </p>
          <p>
            <code>update_row</code> の <code>execute</code> が返す件数が 0 なら、その id の行が無かったということなので <code>NotFound</code> を返します。この「更新件数で存在を判定する」書き方は、事前に <code>SELECT</code> で確認する書き方より往復が 1 回少なく、Tsumugi の core 全体で使っています。
          </p>
        </>
      ),
    },
    {
      id: 'commands',
      title: 'コマンドと ipc.ts',
      body: (
        <>
          <p>コマンド層は、引数を受け取って <code>with_db</code> 経由で core を呼ぶだけです。データベース関連の 10 個のコマンドのうち、この章で使うものを抜粋します。</p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/database.rs（抜粋）"
            code={`
#[tauri::command]
pub fn get_database(db: State<'_, Db>, page_id: String) -> AppResult<Option<DatabaseBundle>> {
    with_db(&db, |c| database::get_by_page(c, &page_id))
}

#[tauri::command]
pub fn create_database(
    db: State<'_, Db>,
    page_id: String,
    name: String,
) -> AppResult<DatabaseBundle> {
    with_db(&db, |c| database::create(c, &page_id, &name))
}

#[tauri::command]
pub fn add_property(
    db: State<'_, Db>,
    database_id: String,
    name: String,
    kind: String,
    options: Option<Vec<String>>,
) -> AppResult<Property> {
    with_db(&db, |c| {
        database::add_property(c, &database_id, &name, &kind, options)
    })
}

#[tauri::command]
pub fn update_row(db: State<'_, Db>, id: String, values: Value) -> AppResult<()> {
    with_db(&db, |c| database::update_row(c, &id, &values))
}
`}
          />
          <p>
            <code>get_database</code> が <code>Option</code> を返す点に注目してください。データベースを持たないページのほうが多いので、「無い」は正常な結果です。<code>Option&lt;DatabaseBundle&gt;</code> は JSON では <code>null</code> かオブジェクトになり、TypeScript 側では <code>DatabaseBundle | null</code> で受けます。<code>update_row</code> の <code>values: Value</code> は、フロントエンドから来た JSON オブジェクトを <code>serde_json::Value</code> として受け取る書き方で、形の決まらないデータをコマンドの引数にするときの定石です。
          </p>
          <Code
            lang="ts"
            title="src/lib/ipc.ts（抜粋）"
            code={`
export const getDatabase = (pageId: string) =>
  invoke<DatabaseBundle | null>("get_database", { pageId });
export const createDatabase = (pageId: string, name: string) =>
  invoke<DatabaseBundle>("create_database", { pageId, name });
export const addProperty = (
  databaseId: string,
  name: string,
  kind: PropertyKind,
  options: string[] | null,
) => invoke<Property>("add_property", { databaseId, name, kind, options });
export const addRow = (databaseId: string) => invoke<Row>("add_row", { databaseId });
export const updateRow = (id: string, values: Record<string, unknown>) =>
  invoke<void>("update_row", { id, values });
`}
          />
          <p>
            引数のキーは、Rust の <code>page_id</code> が <code>pageId</code> になる <ChapterLink n={34} /> の規則どおりです。一方、戻り値の構造体のフィールドは <code>snake_case</code> のままなので、同じファイルの中に <code>pageId</code>（引数）と <code>page_id</code>（戻り値）が混在します。混乱しやすい点ですが、「引数は Tauri が変換する、戻り値は serde がそのまま出す」と覚えておけば整理できます。
          </p>
        </>
      ),
    },
    {
      id: 'table-view',
      title: 'フロントエンド：表の描画とセル編集',
      body: (
        <>
          <p>
            <code>DatabaseView</code> は、ページ本文の下に置かれる部品です（<code>PageView.tsx</code> から <code>&lt;DatabaseView pageId={'{page.id}'} /&gt;</code> として呼ばれます）。state は 3 つで、<code>bundle</code> がデータベースの定義、<code>rows</code> が行、<code>editing</code> がプロパティ編集フォームの状態です。
          </p>
          <Code
            lang="tsx"
            title="src/features/database/DatabaseView.tsx（抜粋）"
            code={`
export function DatabaseView({ pageId }: { pageId: string }) {
  const [bundle, setBundle] = useState<DatabaseBundle | null | undefined>(undefined);
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<"new" | Property | null>(null);

  const view: View | undefined = bundle?.views[0];

  useEffect(() => {
    ipc.getDatabase(pageId).then(setBundle).catch(toastError);
  }, [pageId]);

  const loadRows = useCallback(async () => {
    if (!bundle || !view) return;
    try {
      setRows(await ipc.queryRows(bundle.database.id, view.sort, view.filter));
    } catch (e) {
      toastError(e);
    }
  }, [bundle, view]);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  if (bundle === undefined) return null;
  if (bundle === null) {
    return (
      <div className="db-empty">
        <button onClick={() => ipc.createDatabase(pageId, "データベース").then(setBundle).catch(toastError)}>
          ▦ データベースを追加
        </button>
      </div>
    );
  }
`}
          />
          <p>
            <code>bundle</code> の型が <code>DatabaseBundle | null | undefined</code> と 3 値になっているのは、「まだ読み込んでいない（<code>undefined</code>）」と「読み込んだがデータベースは無い（<code>null</code>）」を区別するためです。前者では何も描かず、後者では「データベースを追加」ボタンを出します。この区別がないと、読み込み中の一瞬だけボタンがちらついてしまいます。<ChapterLink n={10} /> で見た「state で表せる状態を正確に列挙する」設計の小さな実例です。
          </p>
          <p>
            行の取得 <code>loadRows</code> は、<code>view.sort</code> と <code>view.filter</code> を渡して <code>query_rows</code> コマンドを呼びます。この章では両方とも空（並べ替えなし、絞り込みなし）なので <code>position</code> 順の全行が返りますが、次章で条件を入れても、この関数は 1 文字も変わりません。
          </p>
          <p>表の描画部分です。列見出しは <code>properties</code>、各行のセルは <code>properties</code> と <code>rows</code> の二重ループで作ります。</p>
          <Code
            lang="tsx"
            title="src/features/database/DatabaseView.tsx（抜粋）"
            code={`
  const setCell = (row: Row, propertyId: string, value: unknown) => {
    const values = { ...row.values, [propertyId]: value };
    setRows(rows.map((r) => (r.id === row.id ? { ...r, values } : r)));
    ipc.updateRow(row.id, values).catch(toastError);
  };

  // ...

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {properties.map((p) => (
                  <td key={p.id}>
                    <CellEditor property={p} value={row.values[p.id]} onChange={(v) => setCell(row, p.id, v)} />
                  </td>
                ))}
                <td>
                  <button className="row-delete" onClick={() => void removeRow(row.id)} title="行を削除">
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
`}
          />
          <p>
            <code>setCell</code> は<Term en="optimistic update">楽観的更新</Term>の形です。まず画面の <code>rows</code> を新しい値で置き換えてから、Rust に保存を頼みます。保存の完了を待ってから画面を更新すると、入力のたびに一瞬の遅れが出ます。ローカルの SQLite への書き込みはまず失敗しないので、先に画面を更新し、万一失敗したらトーストで知らせる、という割り切りです。<code>{'{ ...row.values, [propertyId]: value }'}</code> は、<ChapterLink n={9} /> で学んだ「オブジェクトを変更せず新しいオブジェクトを作る」更新です。
          </p>
          <p>セルの中身は、<code>CellEditor</code> が <code>kind</code> ごとに出し分けます。図 47-3 に、JSON の値と入力要素の対応をまとめました。</p>
          <Figure n="47-3" title="値の JSON と CellEditor が出す要素の対応" caption="db_properties の kind が、values の JSON の値の型と、描画に使うネイティブ入力要素を決める。date の値は input type=date の value 形式である YYYY-MM-DD の文字列。模式図。">
            <ValueMappingFigure />
          </Figure>
          <Code
            lang="tsx"
            title="src/features/database/CellEditor.tsx"
            code={`
/** プロパティの型ごとにネイティブの input を出し分ける。 */
export function CellEditor({ property, value, onChange }: Props) {
  switch (property.kind) {
    case "checkbox":
      return <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />;
    case "number":
      return (
        <input
          type="number"
          defaultValue={typeof value === "number" ? value : ""}
          onBlur={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        />
      );
    case "date":
      return (
        <input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value || null)}
        />
      );
    case "select":
      return (
        <select value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value || null)}>
          <option value="">—</option>
          {(property.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type="text"
          defaultValue={typeof value === "string" ? value : ""}
          onBlur={(e) => onChange(e.target.value || null)}
        />
      );
  }
}
`}
          />
          <p>
            入力要素は、ライブラリを入れずにブラウザ標準のものを使います。日付は <code>&lt;input type="date"&gt;</code> にすれば、OS やブラウザに応じた日付選択の UI が出て、<code>value</code> は常に <code>YYYY-MM-DD</code> で受け取れます。<Ref n={2} /> MDN によると、画面に表示される日付の書式はブラウザのロケールに従いますが、<code>value</code> の書式は変わりません。<Ref n={2} /> 日本語環境でも英語環境でも、保存される値は同じです。
          </p>
          <p>
            制御と非制御の使い分けにも意図があります（<ChapterLink n={10} />）。<code>checkbox</code>、<code>date</code>、<code>select</code> は値が離散的なので、<code>value</code>（<code>checked</code>）と <code>onChange</code> で制御し、変更のたびに保存します。一方 <code>text</code> と <code>number</code> は 1 文字ごとに保存すると書き込みが多すぎるので、<code>defaultValue</code> で非制御にし、フォーカスが外れた <code>onBlur</code> でまとめて保存します。<code>value</code> の型が <code>unknown</code> なので、<code>typeof</code> で絞り込んでから要素に渡しているのは、<ChapterLink n={5} /> の型の絞り込みです。空文字列は <code>null</code> に正規化し、「未入力」を 1 つの表現にそろえます。
          </p>
          <Callout kind="unverified">
            <p>
              データベースの追加、行の追加、テキストセルの編集と保存は、Linux 上の <code>tauri dev</code> で確認しています。日付選択 UI の見た目は OS ごとの WebView に依存し、未検証です。core のテストと <code>tsc</code>・<code>vite build</code> も通っています。
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
          <p>この章の実装で意図的に省いたことと、必要になったときの直し方をまとめます。</p>
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
                  <td>プロパティを削除しても、各行の JSON に残った値（孤児キー）はそのまま。表示時に無視される</td>
                  <td><code>delete_property</code> で <code>json_remove("values", ?)</code> を全行に掛けて掃除する</td>
                </tr>
                <tr>
                  <td>ビューは常に <code>views[0]</code> の 1 つだけを使う</td>
                  <td>ビューの切り替え UI を付け、<code>db_views</code> に複数行を持つ。core の <code>save_view</code> は upsert なので、そのまま使える</td>
                </tr>
                <tr>
                  <td>行の JSON の値が <code>kind</code> に合っているかを Rust 側で検査しない</td>
                  <td><code>update_row</code> でプロパティ一覧を引き、キーと型を突き合わせて <code>Error::Invalid</code> を返す</td>
                </tr>
                <tr>
                  <td>列の並べ替え（<code>position</code> の変更）UI がない</td>
                  <td><ChapterLink n={43} /> のページ移動と同じ「兄弟を取り出して差し込み、振り直す」関数を <code>db_properties</code> 向けに書く</td>
                </tr>
                <tr>
                  <td>セル編集は 1 セルごとに行の JSON 全体を送る</td>
                  <td>行数も列数も個人利用の規模なら十分。大きくなれば <code>json_set</code> で 1 キーだけ更新するコマンドにする</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            どの拡張も、スキーマを変えずに済みます。JSON 列という選択は、最初の実装を小さくするだけでなく、後からの変更を core クレートの関数単位に閉じ込める効果もあります。
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
            <li>プロパティ型は text / number / select / checkbox / date の 5 つ。値は JSON の文字列・数値・真偽値で表し、日付は input type=date の value 形式である YYYY-MM-DD の文字列にする。</li>
            <li>ユーザー定義の列は、EAV（JOIN が増える）、動的テーブル（ALTER TABLE と名前の SQL 埋め込みが要る）、JSON 列（1 行 1 レコードで json_extract が使える）の 3 方式があり、Tsumugi は JSON 列を選ぶ。</li>
            <li>スキーマは databases（ページと 1 対 1）、db_properties（列定義、kind に CHECK）、db_rows（"values" に JSON）、db_views（条件の保存先）の 4 表。values はキーワードなので二重引用符で囲む。</li>
            <li>core は作成時に「名前」列と既定ビューを用意し、kind をホワイトリストで検証する。コマンド層は with_db で包むだけ。</li>
            <li>表は properties と rows の二重ループで描き、セルは kind ごとにネイティブ入力要素を出し分け、楽観的更新で保存する。</li>
          </ul>
          <p>次章では、この JSON 列に対して json_extract で並べ替えと絞り込みを行い、SQL インジェクションを防ぎながら条件を SQL に組み立てる方法と、その条件をビューとして保存する方法を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'JSON Functions And Operators',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/json1.html',
      accessed: '2026-11-08',
      version: 'SQLite 3.54.1 時点の文書',
      note: 'JSON 関数が 3.38.0 以降は既定で組み込まれること、json_extract の戻り値の型、パス構文（$ と .label）の根拠。',
    },
    {
      title: '<input type="date">',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date',
      accessed: '2026-11-08',
      note: 'value が YYYY-MM-DD に正規化されること、表示書式がロケールに依存すること、日付選択 UI がブラウザと OS で異なることの根拠。',
    },
    {
      title: 'SQLite Keywords',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_keywords.html',
      accessed: '2026-11-08',
      note: 'VALUES がキーワードであること、二重引用符で囲んだキーワードが識別子になることの根拠。',
    },
  ],
}

export default chapter
