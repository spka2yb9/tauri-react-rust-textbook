import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 48-1 条件 → SQL ---------- */
function QueryBuildFigure() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="フロントエンドから届く並べ替えと絞り込みの JSON が、build_query によって SQL 文字列とバインド値の配列に分けられる様子。SQL 文字列には固定の文と ? だけが並び、プロパティ id のパスと比較値はすべてバインド値側に入る">
      <defs>
        <marker id="arrow48a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" fontFamily="monospace">
        {/* input */}
        <rect x="20" y="30" width="250" height="150" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="145" y="22" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">入力（ビューの JSON）</text>
        <text x="30" y="52">sort: {'{'} property_id: "p2",</text>
        <text x="30" y="68">        direction: "desc" {'}'}</text>
        <text x="30" y="94">filter: [ {'{'} property_id: "p1",</text>
        <text x="30" y="110">            op: "contains",</text>
        <text x="30" y="126">            value: "50%" {'}'} ]</text>
        <text x="30" y="160" fontFamily="sans-serif" fill="var(--fig-muted)">props: p1 (text), p2 (number)</text>

        <path d="M272,105 L318,105" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48a)" />
        <text x="295" y="95" fontSize="12" fontFamily="sans-serif" textAnchor="middle">build_query</text>

        {/* check */}
        <rect x="320" y="60" width="300" height="90" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="470" y="52" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">検査（ホワイトリスト）</text>
        <g fontFamily="sans-serif">
          <text x="332" y="82">p1, p2 は props に実在するか → 無ければ Invalid</text>
          <text x="332" y="104">op は 7 種のどれか → 他は Invalid</text>
          <text x="332" y="126">direction は asc / desc か → 他は Invalid</text>
        </g>

        <path d="M470,152 L470,188" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48a)" />
        <path d="M145,182 L145,188 L470,188" stroke="var(--fig-line)" strokeWidth="2" fill="none" />

        {/* SQL */}
        <rect x="20" y="200" width="600" height="80" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="192" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">出力 1：SQL 文字列（固定の語と ? だけ）</text>
        <text x="30" y="222">SELECT … FROM db_rows WHERE database_id = ?</text>
        <text x="30" y="242">  AND json_extract("values", ?) LIKE ? ESCAPE '\'</text>
        <text x="30" y="262">  ORDER BY CAST(json_extract("values", ?) AS REAL) DESC, position ASC</text>

        {/* binds */}
        <rect x="20" y="300" width="600" height="60" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="320" y="292" fontSize="13" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">出力 2：バインド値（? の順）</text>
        <text x="30" y="324">[ "d",  '$."p1"',  "%50\%%",  '$."p2"' ]</text>
        <text x="30" y="346" fontFamily="sans-serif" fill="var(--fig-muted)">database_id　パス（列の代わり）　比較値（% をエスケープ）　並べ替え列のパス</text>
      </g>
      <text x="320" y="388" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ユーザー由来の文字列はすべて下段（バインド値）に行き、上段の SQL には混ざらない。模式図</text>
    </svg>
  )
}

/* ---------- 図 48-2 インジェクションの成立と遮断 ---------- */
function InjectionFigure() {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label="SQL インジェクションが成立する経路と遮断される経路の比較。上段は文字列連結で、入力の引用符が SQL の構造を変えて DELETE 文が実行される。下段はバインドで、SQL の構造は先に確定し、入力は値として渡されるので文字列のまま比較される">
      <defs>
        <marker id="arrow48b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <text x="20" y="28" fontSize="14" fontWeight="600">文字列連結（危険）</text>
        <rect x="20" y="40" width="196" height="60" rx="6" fill="var(--fig-box)" stroke="var(--fig-danger)" strokeDasharray="6 4" />
        <text x="118" y="62" textAnchor="middle">入力</text>
        <text x="118" y="84" textAnchor="middle" fontFamily="monospace">x'); DELETE FROM pages; --</text>
        <path d="M218,70 L238,70" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48b)" />
        <rect x="240" y="40" width="380" height="60" rx="6" fill="var(--fig-box)" stroke="var(--fig-danger)" strokeDasharray="6 4" />
        <text x="430" y="60" textAnchor="middle">format!("... WHERE name = '{}'", input) → 構文解析</text>
        <text x="430" y="84" textAnchor="middle" fontFamily="monospace">WHERE name = 'x'); DELETE FROM pages; --'</text>
        <path d="M430,102 L430,128" stroke="var(--fig-danger)" strokeWidth="2" markerEnd="url(#arrow48b)" />
        <text x="430" y="150" textAnchor="middle" fill="var(--fig-danger)">2 つ目の文として DELETE が実行され得る（構造が変わった）</text>

        <text x="20" y="200" fontSize="14" fontWeight="600">バインド（Tsumugi）</text>
        <rect x="20" y="212" width="196" height="60" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="118" y="234" textAnchor="middle">入力（同じ文字列）</text>
        <text x="118" y="256" textAnchor="middle" fontFamily="monospace">x'); DELETE FROM pages; --</text>
        <rect x="240" y="212" width="380" height="60" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="430" y="232" textAnchor="middle">prepare("... WHERE name = ?") → 構文解析（構造が確定）</text>
        <text x="430" y="256" textAnchor="middle" fontFamily="monospace">bind(1, input) → ? に値として入る</text>
        <path d="M218,242 L238,242" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48b)" />
        <path d="M430,274 L430,300" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48b)" />
        <text x="430" y="322" textAnchor="middle">name がその文字列全体に等しい行を探すだけ（構造は変わらない）</text>
      </g>
      <text x="320" y="350" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線：危険な経路　実線：安全な経路　模式図</text>
    </svg>
  )
}

/* ---------- 図 48-3 ビューの保存と再取得 ---------- */
function ViewFlowFigure() {
  const lanes = [
    { x: 80, label: 'FilterBar／列見出し' },
    { x: 240, label: 'DatabaseView' },
    { x: 400, label: 'コマンド層' },
    { x: 560, label: 'tsumugi-core' },
  ]
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="絞り込み条件や並べ替えを変更したときのシーケンス図。FilterBar が onChange で DatabaseView に条件を渡し、DatabaseView が save_view コマンドで db_views に保存し、返ってきたビューで state を更新すると、loadRows が query_rows コマンドを呼んで行を取り直す">
      <defs>
        <marker id="arrow48c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {lanes.map((l) => (
        <g key={l.x}>
          <rect x={l.x - 70} y="16" width="140" height="34" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
          <text x={l.x} y="38" fontSize="13" textAnchor="middle">{l.label}</text>
          <line x1={l.x} y1="50" x2={l.x} y2="300" stroke="var(--fig-line)" strokeDasharray="4 4" />
        </g>
      ))}
      <g fontSize="12">
        <path d="M80,80 L238,80" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="160" y="72" textAnchor="middle">onChange(filter) / toggleSort</text>
        <path d="M240,110 L398,110" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="320" y="102" textAnchor="middle">save_view({'{ ...view, filter }'})</text>
        <path d="M400,140 L558,140" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="480" y="132" textAnchor="middle">database::save_view（upsert）</text>
        <path d="M560,170 L242,170" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="400" y="162" textAnchor="middle">保存された View</text>
        <rect x="160" y="180" width="160" height="34" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="240" y="194" textAnchor="middle">setBundle → view が変わる</text>
        <text x="240" y="208" textAnchor="middle">→ loadRows が再実行</text>
        <path d="M240,235 L398,235" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="320" y="227" textAnchor="middle">query_rows(id, sort, filter)</text>
        <path d="M400,260 L558,260" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="480" y="252" textAnchor="middle">build_query → SELECT</text>
        <path d="M560,285 L242,285" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow48c)" />
        <text x="400" y="277" textAnchor="middle">Row[] → setRows</text>
      </g>
      <text x="320" y="320" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">濃い矢印：要求　薄い矢印：応答　条件は常に db_views に保存してから使う　模式図</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 48,
  part: 6,
  title: '簡易データベース（2）：並べ替え・絞り込み・ビューの保存',
  summary:
    '前章の JSON 列に対して、並べ替えと絞り込みを SQL で実行できるようにします。条件の JSON から SQL を組み立てる build_query を読み、json_extract による値の取り出し、プロパティのホワイトリスト、値とパスのバインドという3つの守りで SQL インジェクションを防ぐ方法を学びます。条件は db_views に保存し、テストで SQL 文字列とバインド値を完全一致で検証します。',
  goals: [
    'Sort と Filter の JSON 表現と、7つの絞り込み演算子を説明できる',
    'build_query が条件から SQL 文字列とバインド値の配列を組み立てる流れを読める',
    'json_extract と CAST で JSON の値を SQL の比較に使う方法を説明できる',
    'SQL インジェクションが成立する仕組みと、バインドで遮断される理由を説明できる',
    '列名や識別子はバインドできないため、実在するプロパティのホワイトリストで守る必要があることを説明できる',
    'ON CONFLICT による upsert でビューを保存し、テストで SQL とバインド値を検証する方法を読める',
  ],
  prerequisites: [12, 21, 24, 31, 42, 47],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            前章で、ページに表を置き、セルを編集できるようになりました。しかし行が増えると、「点数の高い順に見たい」「未完了のものだけ見たい」という要求が出てきます。この章では、列見出しのクリックで並べ替え、表の上の条件欄で絞り込みができるようにし、その設定を<Term en="view">ビュー</Term>として <code>db_views</code> に保存します。次にページを開いたとき、同じ並び・同じ絞り込みで表示されるようにするためです。
          </p>
          <p>
            技術的な中心は、フロントエンドから届く「条件の JSON」を SQL に変換する処理です。並べ替えも絞り込みも、SQLite にやらせます。JavaScript で全行を取ってきて <code>sort</code> と <code>filter</code> を掛けてもよいのですが、SQL でやれば行数が増えても取得量が減り、何より「条件 → SQL」という変換を書く練習として、この章の主題である<Term en="SQL injection">SQL インジェクション</Term>の話に直結します。
          </p>
          <p>
            ユーザーが選んだ列や入力した値を SQL に組み込む、というのは、Web アプリで最も古典的な脆弱性の入口です。ローカルで動くノートアプリでも、Markdown の取り込み（<ChapterLink n={49} />）のように外から来たデータを扱う以上、他人事ではありません。この章では「どう守るか」を、動くコードとそれを検証するテストで示します。
          </p>
        </>
      ),
    },
    {
      id: 'model',
      title: '並べ替えと絞り込みの表現',
      body: (
        <>
          <p>条件は、Rust と TypeScript の両方で同じ形の構造体として定義します。</p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Sort {
    pub property_id: String,
    /// "asc" | "desc"
    pub direction: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Filter {
    pub property_id: String,
    /// "eq" | "neq" | "contains" | "gt" | "lt" | "empty" | "not_empty"
    pub op: String,
    #[serde(default)]
    pub value: Value,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct View {
    pub id: String,
    pub database_id: String,
    pub name: String,
    pub sort: Option<Sort>,
    pub filter: Vec<Filter>,
}
`}
          />
          <Code
            lang="ts"
            title="src/lib/types.ts（抜粋）"
            code={`
export type Sort = { property_id: string; direction: "asc" | "desc" };

export const FILTER_OPS = ["eq", "neq", "contains", "gt", "lt", "empty", "not_empty"] as const;
export type FilterOp = (typeof FILTER_OPS)[number];
export type Filter = { property_id: string; op: FilterOp; value: unknown };
`}
          />
          <p>
            <code>direction</code> と <code>op</code> を Rust 側で <code>String</code> にしているのは意図的です。列挙型にして serde で受ければ不正な値は受信時に弾けますが、ここでは「文字列として受け取り、SQL を組み立てる関数の中でホワイトリストと照合する」という流れを見せたいので、あえて文字列のままにしています。TypeScript 側はリテラル型で縛り、画面からは正しい値しか送れないようにします。<code>#[serde(default)]</code> は、<code>value</code> キーが無い JSON（<code>empty</code> や <code>not_empty</code> のとき）を <code>Value::Null</code> として受けるための指定です。
          </p>
          <p>7 つの演算子の意味を整理します。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>op</th>
                  <th>意味</th>
                  <th>SQL（<code>col</code> は列の値を取り出す式）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>eq</code></td><td>等しい</td><td><code>col = ?</code></td></tr>
                <tr><td><code>neq</code></td><td>等しくない（値が無い行も含む）</td><td><code>col IS NOT ?</code></td></tr>
                <tr><td><code>contains</code></td><td>文字列を含む</td><td><code>col LIKE ? ESCAPE '\'</code></td></tr>
                <tr><td><code>gt</code></td><td>より大きい</td><td><code>col &gt; ?</code></td></tr>
                <tr><td><code>lt</code></td><td>より小さい</td><td><code>col &lt; ?</code></td></tr>
                <tr><td><code>empty</code></td><td>値が無い</td><td><code>(col IS NULL OR col = '')</code></td></tr>
                <tr><td><code>not_empty</code></td><td>値がある</td><td><code>(col IS NOT NULL AND col &lt;&gt; '')</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>neq</code> に <code>!=</code> ではなく <code>IS NOT</code> を使っているのは、SQL の <code>NULL</code> の扱いのためです。<code>NULL != 'a'</code> は真にも偽にもならず（<code>NULL</code> になり）行が落ちますが、<code>NULL IS NOT 'a'</code> は真になります。「a 以外」には値の無い行も含めたい、という判断です。
          </p>
        </>
      ),
    },
    {
      id: 'build-query',
      title: '条件から SQL を組み立てる：build_query',
      body: (
        <>
          <p>
            変換の本体は <code>build_query</code> です。データベースの id、実在するプロパティの一覧、並べ替え、絞り込みを受け取り、SQL 文字列とバインド値の配列を返す純粋関数です。<code>Connection</code> を受け取らないので、データベース無しでテストできます。まず、この関数が何を作るのかを図 48-1 で見てから、コードを読みます。
          </p>
          <Figure n="48-1" title="条件の JSON から SQL 文字列とバインド値への変換" caption="上の入力はフロントエンドから届くビューの内容。中央でプロパティ id・演算子・方向を検査し、下の2つの出力に分ける。SQL 文字列には固定の語と ? だけが並び、プロパティのパスも比較値もすべてバインド値の配列に入る。模式図。">
            <QueryBuildFigure />
          </Figure>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
/// SQL とバインド値を組み立てる（純粋関数。テストしやすいよう分離）。
///
/// 安全のための約束:
/// - プロパティはこのデータベースに実在するもの（ホワイトリスト）だけ使う
/// - JSON パス・比較値はすべてプレースホルダで渡し、SQL 文字列に埋め込まない
pub fn build_query(
    database_id: &str,
    props: &[Property],
    sort: Option<&Sort>,
    filter: &[Filter],
) -> Result<(String, Vec<SqlValue>)> {
    let find = |id: &str| {
        props
            .iter()
            .find(|p| p.id == id)
            .ok_or_else(|| Error::Invalid(format!("unknown property: {id}")))
    };
    let mut sql = String::from(
        "SELECT id, database_id, \\"values\\", position, created_at, updated_at FROM db_rows WHERE database_id = ?",
    );
    let mut args: Vec<SqlValue> = vec![SqlValue::Text(database_id.to_owned())];

    for f in filter {
        let prop = find(&f.property_id)?;
        let col = column_expr(prop);
        args.push(SqlValue::Text(json_path(&prop.id)));
        let clause = match f.op.as_str() {
            "eq" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} = ?")
            }
            "neq" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} IS NOT ?")
            }
            "contains" => {
                let s = f.value.as_str().unwrap_or_default();
                args.push(SqlValue::Text(format!(
                    "%{}%",
                    s.replace('\\\\', "\\\\\\\\")
                        .replace('%', "\\\\%")
                        .replace('_', "\\\\_")
                )));
                format!("{col} LIKE ? ESCAPE '\\\\'")
            }
            "gt" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} > ?")
            }
            "lt" => {
                args.push(to_sql(&f.value, &prop.kind));
                format!("{col} < ?")
            }
            "empty" => format!("({col} IS NULL OR {col} = '')"),
            "not_empty" => format!("({col} IS NOT NULL AND {col} <> '')"),
            other => return Err(Error::Invalid(format!("unknown filter op: {other}"))),
        };
        // empty / not_empty は col を 2 回使うのでパスも 2 回バインドする
        if f.op == "empty" || f.op == "not_empty" {
            args.push(SqlValue::Text(json_path(&prop.id)));
        }
        sql.push_str(" AND ");
        sql.push_str(&clause);
    }

    sql.push_str(" ORDER BY ");
    if let Some(s) = sort {
        let prop = find(&s.property_id)?;
        let dir = match s.direction.as_str() {
            "asc" => "ASC",
            "desc" => "DESC",
            other => return Err(Error::Invalid(format!("unknown direction: {other}"))),
        };
        args.push(SqlValue::Text(json_path(&prop.id)));
        sql.push_str(&format!("{} {dir}, ", column_expr(prop)));
    }
    sql.push_str("position ASC");
    Ok((sql, args))
}
`}
          />
          <p>読むときの要点を 4 つ挙げます。</p>
          <ol className="steps">
            <li>
              <code>find</code> クロージャ（<ChapterLink n={27} />）が、条件に出てくる <code>property_id</code> を <code>props</code> の中から探します。見つからなければ <code>Error::Invalid</code> で即座に失敗します。これが<Term en="allowlist">ホワイトリスト</Term>です。存在しない id はもちろん、<code>"x"; DROP TABLE pages; --</code> のような文字列も、プロパティとして実在しない以上、ここで止まります。
            </li>
            <li>
              SQL 文字列に <code>format!</code> で差し込んでいるのは <code>col</code>（<code>column_expr</code> が返す固定の式）と <code>dir</code>（<code>ASC</code> か <code>DESC</code> の固定文字列）だけです。どちらも <code>match</code> で有限の候補から選ばれた、プログラムが持つ文字列です。ユーザーの入力はいっさい <code>format!</code> に渡していません。
            </li>
            <li>
              <code>args</code> には、<code>?</code> が現れる順番どおりに値を積みます。列を指す JSON パス、比較値、並べ替え列のパスの順です。<code>empty</code> と <code>not_empty</code> は 1 つの条件で <code>col</code> を 2 回書くので、パスも 2 回積みます。この「<code>?</code> の数と順序を合わせる」のが唯一の難所で、後述のテストで守ります。
            </li>
            <li>
              <code>ORDER BY</code> の末尾には必ず <code>position ASC</code> を付けます。並べ替えの値が同じ行同士の順序が実行のたびに変わらないようにするためです。
            </li>
          </ol>
          <p>
            <code>query_rows</code> はこの結果を受け取り、<code>conn.prepare(&amp;sql)</code> と <code>stmt.query_map(rusqlite::params_from_iter(args), ...)</code> で実行します。<code>params_from_iter</code> は、<code>ToSql</code> を実装した要素のイテレータを受け取ってバインドに使える形にする rusqlite の関数で、個数が実行時に決まるバインド値を渡すときに使います。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'json-extract',
      title: 'json_extract と型の扱い',
      body: (
        <>
          <p>
            <code>col</code> の正体は、<code>column_expr</code> が返す次の式です。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
/// JSON パス \`$."<id>"\` を作る。id はバインド値として渡すので SQL には混ざらない。
fn json_path(property_id: &str) -> String {
    format!("$.\\"{}\\"", property_id.replace('"', ""))
}

fn column_expr(prop: &Property) -> &'static str {
    match prop.kind.as_str() {
        "number" => "CAST(json_extract(\\"values\\", ?) AS REAL)",
        _ => "json_extract(\\"values\\", ?)",
    }
}
`}
          />
          <p>
            <code>json_extract("values", ?)</code> は、<code>"values"</code> 列の JSON から、2 番目の引数のパスが指す値を取り出します。パスは <code>$."p2"</code> のような文字列で、これをバインド値として渡しています。公式文書によると、パスが 1 つのとき <code>json_extract</code> は JSON の値を SQL の値に変換して返します。数値は <code>INTEGER</code> か <code>REAL</code>、文字列は引用符を外したテキスト、<code>true</code> / <code>false</code> は 1 / 0、JSON の <code>null</code> と存在しないパスは SQL の <code>NULL</code> です。<Ref n={1} /> だから、取り出した値をそのまま <code>=</code> や <code>&gt;</code> で比べたり、<code>ORDER BY</code> に並べたりできます。
          </p>
          <p>
            <code>number</code> だけ <code>CAST(... AS REAL)</code> で包んでいるのは、比較を必ず数値として行うためです。<code>&lt;input type="number"&gt;</code> から来た値は数値で保存されますが、Markdown の取り込みなど別の経路で文字列 <code>"30"</code> として入る可能性を考え、SQL 側で型をそろえています。<code>CAST</code> が無いと、SQLite は文字列と数値を別の型として比べ、<code>"30" &gt; 10</code> のような比較が意図と違う結果になります。
            </p>
          <p>
            比較値のほうは <code>to_sql</code> が <code>kind</code> に応じて変換します。JSON の数値は <code>Integer</code> か <code>Real</code>、真偽値は <code>Integer</code> の 1 / 0 に、<code>number</code> 列に文字列が来たら <code>f64</code> に解釈し、<code>checkbox</code> 列に文字列が来たら <code>"true"</code> / <code>"1"</code> を 1 にします。<code>json_extract</code> が返す値の型と、バインドする値の型を一致させるための変換です。<code>checkbox</code> の <code>true</code> が <code>json_extract</code> では 1 になるので、比較値も 1 にしなければ <code>eq</code> が一致しません。
          </p>
          <p>
            <code>contains</code> の <code>LIKE</code> では、<code>%</code> と <code>_</code> がワイルドカードです。<Ref n={3} /> ユーザーが「50%」を含む行を探したいのに、<code>%</code> がワイルドカードとして解釈されては困るので、バックスラッシュでエスケープし、<code>ESCAPE '\'</code> で「この文字の次は文字どおりに扱う」と宣言します。<Ref n={3} /> なお、SQLite の <code>LIKE</code> は既定では ASCII の範囲だけ大文字小文字を区別せず、それ以外の文字では区別します。<Ref n={3} /> 日本語の検索には影響しませんが、アクセント付きの文字を扱うときは覚えておく必要があります。
          </p>
        </>
      ),
    },
    {
      id: 'sql-injection',
      title: 'SQL インジェクションの仕組みと防ぎ方',
      body: (
        <>
          <p>
            ここまで「バインドする」「ホワイトリストで検査する」と繰り返してきました。なぜそれで安全なのかを、攻撃側の視点から確認します。OWASP は SQL インジェクションを、「クライアントからアプリケーションへの入力データを通じて SQL クエリを挿入（注入）する攻撃」と定義しています。<Ref n={2} /> 成立する条件は 2 つで、信頼できない入力がプログラムに入ること、そしてその入力を使って SQL クエリを動的に組み立てることです。<Ref n={2} />
          </p>
          <p>
            OWASP の例では、商品名を <code>name' OR 'a'='a</code> と入力すると <code>WHERE</code> 句が常に真になって全行が返り、<code>name'); DELETE FROM items; --</code> と入力すると元の文が閉じられ、後ろに <code>DELETE</code> 文がつながります。<Ref n={2} /> 入力の中の引用符が、「値」のつもりで書いた場所を「SQL の構造」に変えてしまうのです。図 48-2 の上段が、この成立の経路です。
          </p>
          <Figure n="48-2" title="SQL インジェクションの成立（上）と、バインドによる遮断（下）" caption="上段：文字列連結では、入力に含まれる引用符とセミコロンが SQL の構造を変え、別の文が実行され得る。下段：バインドでは prepare の時点で SQL の構造が確定し、入力は後から ? の位置に値として入るので、どんな文字が含まれていても文字列として比較されるだけ。模式図。">
            <InjectionFigure />
          </Figure>
          <p>
            下段が遮断の仕組みです。SQLite の SQL には <code>?</code> や <code>:名前</code> などの<Term en="bound parameter">バインドパラメータ</Term>を書けます。公式文書によると、これは式の中の「実行時に <code>sqlite3_bind()</code> 系のインターフェイスで値を埋める場所」です。<Ref n={5} /> 重要なのは順序です。SQL 文字列は <code>prepare</code> の時点で構文解析され、<code>?</code> は「ここに値が来る」という 1 つの項として構造に組み込まれます。値はその後にバインドされるので、値の中に引用符やセミコロンがあっても、構文解析には影響しません。文字列連結では「入力を混ぜてから解析する」ので構造が変わり得る、バインドでは「解析してから入力を渡す」ので変わり得ない、という違いです。OWASP も、パラメータ化された文は「保守が少なく、セキュリティに関してより多くの保証を提供できる」と述べ、手作業のエスケープだけでは安全にならないと注意しています。<Ref n={2} />
          </p>
          <p>
            ただし、バインドできるのは「値」だけです。表名や列名、<code>ASC</code> / <code>DESC</code> のようなキーワードは SQL の構造そのものなので、<code>?</code> の位置に置けません。簡易データベースでは「どの列で並べ替えるか」をユーザーが選ぶため、ここが弱点になり得ます。前章で動的テーブル方式を退けた理由がこれです。列名を SQL に書かざるを得ない設計では、ユーザー由来の列名を文字列連結するしかなくなります。
          </p>
          <p>Tsumugi は、この弱点を 2 段構えで消しています。</p>
          <ol className="steps">
            <li>
              列の指定を「列名」ではなく「JSON パス」にすることで、値としてバインドできる形に変えました。<code>json_extract("values", ?)</code> の列名部分は固定の <code>"values"</code> で、どの列かはバインド値のパスで決まります。
            </li>
            <li>
              それでも <code>property_id</code> は実在するものに限ります。<code>find</code> による検査です。バインドしているので構文上は安全ですが、存在しない id で検索しても意味がないうえ、万一 <code>json_path</code> の組み立てに穴があったときの二重の守りになります。<code>json_path</code> が id から <code>"</code> を取り除いているのも同じ理由で、id は UUID なので本来含まれませんが、含まれてもパスの構文を壊さないようにしています。
            </li>
          </ol>
          <Callout kind="warn">
            <p>
              「ローカルのアプリだから攻撃者はいない」と考えるのは危険です。<ChapterLink n={49} /> の Markdown 取り込みや、将来の同期機能では、他人が作ったデータがそのままアプリに入ります。SQL に混ぜる文字列が「自分のコードが決めた有限の候補」か「外から来た値」かを、すべての <code>format!</code> について確認する習慣が、この章で身につけてほしいことです。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tests',
      title: 'テストで SQL とバインド値を検証する',
      body: (
        <>
          <p>
            <code>build_query</code> を純粋関数として切り出した見返りは、テストで出力を完全一致で検証できることです。<code>tests/database.rs</code> の <code>build_query_is_parameterized_and_whitelisted</code> は、3 つの絞り込みと 1 つの並べ替えを与えて、SQL 文字列とバインド値の配列が期待どおりかを確かめます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/tests/database.rs（抜粋）"
            code={`
    let (sql, args) = database::build_query("d", &props, Some(&sort), &filters).unwrap();
    assert_eq!(
        sql,
        "SELECT id, database_id, \\"values\\", position, created_at, updated_at FROM db_rows WHERE database_id = ? \\
         AND json_extract(\\"values\\", ?) LIKE ? ESCAPE '\\\\' \\
         AND CAST(json_extract(\\"values\\", ?) AS REAL) > ? \\
         AND (json_extract(\\"values\\", ?) IS NOT NULL AND json_extract(\\"values\\", ?) <> '') \\
         ORDER BY CAST(json_extract(\\"values\\", ?) AS REAL) DESC, position ASC"
    );
    assert_eq!(
        args,
        vec![
            SqlValue::Text("d".into()),
            SqlValue::Text("$.\\"p1\\"".into()),
            SqlValue::Text("%50\\\\%%".into()),
            SqlValue::Text("$.\\"p2\\"".into()),
            SqlValue::Integer(10),
            SqlValue::Text("$.\\"p1\\"".into()),
            SqlValue::Text("$.\\"p1\\"".into()),
            SqlValue::Text("$.\\"p2\\"".into()),
        ]
    );

    // 存在しない列・不正な演算子・不正な方向は拒否
    let bad = Filter {
        property_id: "x\\"; DROP TABLE pages; --".into(),
        op: "eq".into(),
        value: json!(1),
    };
    assert!(matches!(
        database::build_query("d", &props, None, &[bad]),
        Err(Error::Invalid(_))
    ));
`}
          />
          <p>
            このテストが守っている性質を言葉にすると、「SQL 文字列には <code>?</code> が 8 個あり、バインド値も 8 個で、順序が対応している」「ユーザー由来の文字列（<code>50%</code> や <code>p1</code>）は SQL 文字列側に一度も現れない」の 2 つです。将来 <code>build_query</code> を直して <code>?</code> の数とバインド値の数がずれれば、このテストが落ちます。後半では、インジェクションを狙った id、未知の演算子 <code>regexp</code>、不正な方向 <code>DESC; --</code> のそれぞれが <code>Error::Invalid</code> で拒否されることも確かめています。
          </p>
          <p>
            もう 1 つのテスト <code>rows_sort_and_filter</code> は、インメモリ SQLite に 3 行を入れて、実際に並べ替えと絞り込みを実行します。数値の昇順、日付の降順、<code>gt</code>、<code>checkbox</code> の <code>eq</code>、<code>contains</code>、<code>empty</code> の結果、ビューの保存と読み戻し、保存したビューでの再問い合わせまでを一続きで検証します。<code>$."p1"</code> という引用符付きラベルのパスが同梱の SQLite 3.54.1 で動くことも、このテストが通ることで確認できています。本制作環境では、これらを含む core のテスト 14 件がすべて合格しています。
          </p>
        </>
      ),
    },
    {
      id: 'views-frontend',
      title: 'ビューの保存とフロントエンド',
      body: (
        <>
          <p>
            条件は <code>db_views</code> に保存します。<code>sort</code> と <code>filter</code> は JSON 文字列にして <code>TEXT</code> 列に入れ、絞り込みが空のときは <code>NULL</code> にします。保存は <code>INSERT ... ON CONFLICT DO UPDATE</code> の<Term en="upsert">upsert</Term>で、新規でも更新でも同じ文で済ませます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/database.rs（抜粋）"
            code={`
/// ビューを upsert する。
pub fn save_view(conn: &Connection, view: View) -> Result<View> {
    let sort = match &view.sort {
        Some(s) => Some(serde_json::to_string(s)?),
        None => None,
    };
    let filter = if view.filter.is_empty() {
        None
    } else {
        Some(serde_json::to_string(&view.filter)?)
    };
    conn.execute(
        "INSERT INTO db_views (id, database_id, name, sort, filter) VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT(id) DO UPDATE SET name = excluded.name, sort = excluded.sort, filter = excluded.filter",
        params![view.id, view.database_id, view.name, sort, filter],
    )?;
    Ok(view)
}
`}
          />
          <p>
            SQLite の公式文書によると、UPSERT は「INSERT が一意性制約に違反するときに UPDATE または何もしない動作に変える」<code>INSERT</code> の句で、3.24.0（2018-06-04）で追加されました。<Ref n={6} /> <code>DO UPDATE</code> の中で <code>excluded.name</code> と書くと、「挿入しようとした値」を指します。<Ref n={6} /> つまり、<code>id</code> が既にあれば、その行の <code>name</code>、<code>sort</code>、<code>filter</code> を新しい値で上書きします。
          </p>
          <p>
            フロントエンド側は、前章の <code>DatabaseView</code> に 2 つの操作が加わるだけです。列見出しのクリックで並べ替えを「昇順 → 降順 → なし」と循環させる <code>toggleSort</code> と、<code>FilterBar</code> からの条件を受け取る <code>setFilter</code> で、どちらも <code>updateView</code> を呼びます。
          </p>
          <Code
            lang="tsx"
            title="src/features/database/DatabaseView.tsx（抜粋）"
            code={`
  // ビュー（並べ替え・絞り込み）を保存して行を取り直す
  const updateView = async (patch: Partial<View>) => {
    try {
      const saved = await ipc.saveView({ ...view, ...patch });
      setBundle({ ...bundle, views: [saved, ...bundle.views.slice(1)] });
    } catch (e) {
      toastError(e);
    }
  };
  const toggleSort = (propertyId: string) => {
    const s = view.sort;
    const next =
      s?.property_id !== propertyId
        ? { property_id: propertyId, direction: "asc" as const }
        : s.direction === "asc"
          ? { property_id: propertyId, direction: "desc" as const }
          : null;
    void updateView({ sort: next });
  };
  const setFilter = (filter: Filter[]) => void updateView({ filter });
`}
          />
          <p>
            <code>updateView</code> は、保存した結果で <code>bundle</code> の先頭のビューを置き換えます。すると <code>view</code> が変わり、それに依存する <code>loadRows</code>（<code>useCallback</code> の依存配列に <code>view</code> が入っている）が作り直され、<code>useEffect</code> が再実行されて行を取り直します。「保存 → state 更新 → Effect で再取得」という、<ChapterLink n={12} /> の依存配列を利用した連鎖です。図 48-3 に、この一連の流れをまとめます。
          </p>
          <Figure n="48-3" title="条件の変更が保存され、行が取り直されるまで" caption="FilterBar や列見出しからの変更は、まず save_view で db_views に保存される。返ってきたビューで bundle を更新すると view が変わり、loadRows が再実行されて query_rows で行を取り直す。保存してから使うので、再起動後も同じ条件で表示される。模式図。">
            <ViewFlowFigure />
          </Figure>
          <p>
            <code>FilterBar</code> は、プロパティ・演算子・値の 3 つの入力と「絞り込む」ボタンで条件を 1 つ作る部品です。値は入力欄では文字列なので、<code>kind</code> が <code>number</code> なら <code>Number()</code>、<code>checkbox</code> なら <code>"true"</code> との比較で真偽値に変換してから送ります。Rust 側の <code>to_sql</code> でも <code>kind</code> に応じた変換を行うので二重になっていますが、「正しい型で送る」責任をフロントエンドに、「どんな型で来ても比較を壊さない」責任を Rust に置く、と考えれば自然な分担です。
          </p>
          <Code
            lang="tsx"
            title="src/features/database/FilterBar.tsx（抜粋）"
            code={`
  const apply = () => {
    if (!property) return;
    // 型に合わせて値を変換（Rust 側でも kind に応じた比較をする）
    let v: unknown = value;
    if (property.kind === "number") v = Number(value);
    if (property.kind === "checkbox") v = value === "true";
    onChange([{ property_id: propertyId, op, value: needsValue ? v : null }]);
  };
`}
          />
          <Callout kind="unverified">
            <p>
              列見出しのクリックで並べ替え記号（▲）が付くこと、並べ替えの設定が再起動後も残ること、<code>query_rows</code> による並べ替えと絞り込みの結果は、Linux 上の <code>tauri dev</code> で確認しています。絞り込みバーの画面操作と、絞り込み後の表の見た目は未検証です。core のテスト（SQL の組み立てと実行結果）と <code>tsc</code>・<code>vite build</code> も通っています。
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
                  <td>絞り込み条件は 1 つだけ（<code>FilterBar</code> が <code>filter[0]</code> しか扱わない）</td>
                  <td><code>build_query</code> はすでに配列を <code>AND</code> でつなぐので、UI で条件を複数行にするだけ。<code>OR</code> が要るなら <code>Filter</code> に <code>group</code> を足して括弧で囲む</td>
                </tr>
                <tr>
                  <td>並べ替えは 1 列だけ</td>
                  <td><code>sort</code> を <code>Vec&lt;Sort&gt;</code> にし、<code>ORDER BY</code> の項を列挙する。ホワイトリストとバインドの形は変わらない</td>
                </tr>
                <tr>
                  <td><code>json_extract</code> に索引が無く、毎回全行を走査する</td>
                  <td>行数が増えたら <code>CREATE INDEX ... ON db_rows(json_extract("values", '$."固定id"'))</code> の式インデックスを、よく使う列にだけ作る。ただし索引は式が一致したときだけ使われ、パスをバインド値で渡す現在の <code>build_query</code> のままでは使われない（本書の確認では <code>SCAN</code> になる）。パスを SQL 文に直接書く形への変更も要り、その場合は <code>find</code> で実在を確かめた id だけを使う</td>
                </tr>
                <tr>
                  <td><code>date</code> の比較は文字列比較（YYYY-MM-DD なら順序が一致する）</td>
                  <td>時刻付きや別形式を許すなら、保存形式を ISO 8601 に固定するか、<code>julianday()</code> で数値にしてから比べる</td>
                </tr>
                <tr>
                  <td><code>contains</code> は ASCII 以外で大文字小文字を区別する</td>
                  <td>必要なら <code>lower()</code> を両辺に掛けるか、SQLite の ICU 拡張を有効にする</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            どの拡張も、「SQL に書くのは固定の語だけ、ユーザー由来の値はバインド、識別子はホワイトリスト」という 3 つの約束を保ったまま行えます。この約束を破らない限り、条件が複雑になってもインジェクションの入口は増えません。
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
            <li>並べ替えと絞り込みは Sort と Filter の JSON で表し、7 つの演算子を SQL の句に対応させる。neq は NULL を含めるため IS NOT を使う。</li>
            <li>build_query は、プロパティの実在をホワイトリストで検査し、SQL 文字列には固定の語と ? だけを書き、JSON パスと比較値をすべてバインド値の配列に積む純粋関数。</li>
            <li>json_extract は JSON の値を SQL の値（数値・テキスト・1/0・NULL）として返すので、そのまま比較と並べ替えに使える。number 列は CAST で数値比較に固定する。</li>
            <li>SQL インジェクションは、入力を混ぜてから構文解析することで SQL の構造が変わる攻撃。バインドは解析後に値を渡すので構造が変わらない。識別子はバインドできないため、JSON パス化とホワイトリストで守る。</li>
            <li>ビューは ON CONFLICT DO UPDATE の upsert で db_views に保存し、保存した結果で state を更新すると Effect の連鎖で行が取り直される。テストは SQL 文字列とバインド値を完全一致で検証する。</li>
          </ul>
          <p>次章では、ページを Markdown ファイルとして書き出し、Markdown ファイルからページを作る機能を、dialog と fs プラグインを使って実装します。</p>
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
      note: 'json_extract がパス 1 つのときに返す SQL の型（数値・テキスト・1/0・NULL）の根拠。',
    },
    {
      title: 'SQL Injection',
      publisher: 'OWASP Foundation',
      url: 'https://owasp.org/www-community/attacks/SQL_Injection',
      accessed: '2026-11-08',
      note: 'SQL インジェクションの定義、成立条件、攻撃例（OR 条件の常時真、文の閉じと DELETE の追加）、パラメータ化された文の推奨と手作業のエスケープが不十分であることの根拠。参照時は community.owasp.org へ転送された。',
    },
    {
      title: 'SQL Language Expressions（The LIKE, GLOB, REGEXP, MATCH, and extract operators）',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_expr.html#like',
      accessed: '2026-11-08',
      note: 'LIKE の % と _ の意味、ESCAPE 句、ASCII 以外では大文字小文字を区別することの根拠。',
    },
    {
      title: 'rusqlite::params_from_iter',
      publisher: 'docs.rs',
      url: 'https://docs.rs/rusqlite/latest/rusqlite/fn.params_from_iter.html',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'ToSql を実装した要素のイテレータからバインド値を作る関数であることの根拠。',
    },
    {
      title: 'SQL Language Expressions（Parameters）',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_expr.html#varparam',
      accessed: '2026-11-08',
      note: 'バインドパラメータ（?、?NNN、:AAAA など）が実行時に sqlite3_bind() で値を埋める場所であることの根拠。',
    },
    {
      title: 'UPSERT',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_upsert.html',
      accessed: '2026-11-08',
      note: 'ON CONFLICT DO UPDATE の意味、3.24.0 での追加、excluded. 接頭辞が挿入しようとした値を指すことの根拠。',
    },
  ],
}

export default chapter
