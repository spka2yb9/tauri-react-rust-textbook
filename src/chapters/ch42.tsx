import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 42-1 レイヤー構成 ---------- */
function LayersFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="データ層のレイヤー構成。上からコマンド層、with_db、tsumugi-core のリポジトリ関数、rusqlite の Connection、SQLite ファイルの順に積み重なり、右側の結合テストは Tauri を通さずに core を直接呼び、インメモリの SQLite を使う">
      <defs>
        <marker id="arrow42a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <rect x="40" y="20" width="340" height="44" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="210" y="40" fontWeight="600">コマンド層（src-tauri/src/commands/pages.rs）</text>
        <text x="210" y="56" fontSize="12">#[tauri::command] get_page(db: State&lt;Db&gt;, id)</text>

        <path d="M210,64 L210,84" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42a)" />
        <text x="290" y="80" fontSize="12" fill="var(--fig-muted)">with_db でロックを取る</text>

        <rect x="40" y="88" width="340" height="60" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="210" y="108" fontWeight="600">tsumugi-core（リポジトリ関数）</text>
        <text x="210" y="126" fontSize="12">pages::get(conn: &amp;Connection, id) -&gt; Result&lt;Page&gt;</text>
        <text x="210" y="141" fontSize="12">db::open / db::migrate ・ error::Error</text>

        <path d="M210,148 L210,168" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42a)" />

        <rect x="40" y="172" width="340" height="44" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="210" y="192" fontWeight="600">rusqlite（Connection, params!, query_map）</text>
        <text x="210" y="208" fontSize="12">bundled 機能で SQLite 本体を同梱</text>

        <path d="M210,216 L210,236" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42a)" />

        <rect x="40" y="240" width="160" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="259" fontWeight="600">tsumugi.db</text>
        <text x="120" y="275" fontSize="12">app_data_dir 配下・WAL</text>
        <rect x="215" y="240" width="170" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" strokeDasharray="5 3" />
        <text x="300" y="259" fontWeight="600">:memory:</text>
        <text x="300" y="275" fontSize="12">テスト用。ファイルを作らない</text>

        {/* tests */}
        <rect x="430" y="88" width="190" height="60" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="525" y="108" fontWeight="600">結合テスト（core/tests/）</text>
        <text x="525" y="126" fontSize="12">db::open_in_memory()</text>
        <text x="525" y="141" fontSize="12">pages::create(&amp;conn, …)</text>
        <path d="M430,118 L382,118" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow42a)" />
        <path d="M525,148 C525,230 400,262 382,262" fill="none" stroke="var(--fig-accent)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow42a)" />
        <text x="540" y="200" fontSize="12" fill="var(--fig-muted)">Tauri を通さない</text>
      </g>
      <text x="320" y="308" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：アプリ実行時の経路　濃い矢印：テスト時の経路　模式図</text>
    </svg>
  )
}

/* ---------- 図 42-2 マイグレーションの流れ ---------- */
function MigrationFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="マイグレーションの流れ。接続を開いた後、PRAGMA user_version を読み、その値を配列の添字として未適用の SQL を順に BEGIN と COMMIT で囲んで実行し、実行するたびに user_version を添字プラス1に更新する。新規ファイルでは 0 から始まり、適用済みなら何もしない">
      <defs>
        <marker id="arrow42b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <rect x="20" y="30" width="150" height="50" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="95" y="51" fontWeight="600">接続を開く</text>
        <text x="95" y="69" fontSize="12">open / open_in_memory</text>

        <path d="M170,55 L196,55" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42b)" />

        <rect x="198" y="30" width="190" height="50" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="293" y="51" fontWeight="600">user_version を読む</text>
        <text x="293" y="69" fontSize="12">PRAGMA user_version → current</text>

        <path d="M388,55 L410,55" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42b)" />

        <rect x="412" y="30" width="208" height="50" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="516" y="51" fontWeight="600">MIGRATIONS[current..] を順に</text>
        <text x="516" y="69" fontSize="12">skip(current) で未適用だけ残す</text>

        <path d="M516,80 L516,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42b)" />

        <rect x="340" y="114" width="280" height="76" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="135" fontWeight="600">i 番目の SQL を適用</text>
        <text x="480" y="154" fontSize="12">execute_batch("BEGIN; …sql… COMMIT;")</text>
        <text x="480" y="172" fontSize="12">PRAGMA user_version = i + 1</text>

        <path d="M340,152 L300,152" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow42b)" />
        <text x="320" y="142" fontSize="12" fill="var(--fig-muted)">次へ</text>
        <path d="M296,152 C250,152 250,55 296,55" fill="none" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* two cases */}
        <rect x="20" y="210" width="290" height="70" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="165" y="232" fontWeight="600">新規ファイル：user_version = 0</text>
        <text x="165" y="252" fontSize="12">001_init.sql を適用 → user_version = 1</text>
        <text x="165" y="270" fontSize="12">migrate の戻り値は 1</text>
        <rect x="330" y="210" width="290" height="70" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="475" y="232" fontWeight="600">2回目以降：user_version = 1</text>
        <text x="475" y="252" fontSize="12">skip(1) で残りなし → 何もしない</text>
        <text x="475" y="270" fontSize="12">migrate の戻り値は 0（テストで確認）</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 42,
  part: 6,
  title: 'Rust のデータ層：SQLite',
  summary:
    'Tsumugi のデータ層を Tauri に依存しない core クレートとして実装します。rusqlite の bundled 機能で SQLite を同梱し、WAL と外部キーのプラグマを設定し、include_str! と user_version でマイグレーションを管理します。pages テーブルを扱うリポジトリ関数、thiserror によるエラー型、インメモリ SQLite での結合テストまでを通して、データ層の作り方を身につけます。',
  goals: [
    'rusqlite の bundled 機能で SQLite を同梱する理由と、Connection の開き方を説明できる',
    'journal_mode=WAL と foreign_keys=ON のプラグマが何をするかを説明できる',
    'include_str! で SQL を埋め込み、PRAGMA user_version で適用済みのマイグレーションを管理する仕組みを実装できる',
    'query_row・query_map・params! を使ったリポジトリ関数を書き、Option と Result で「見つからない」を表せる',
    'thiserror でデータ層のエラー型を定義し、コマンド層の AppError へ変換できる',
    'インメモリ SQLite を使った結合テストを tests/ に書き、cargo test で検証できる',
  ],
  prerequisites: [20, 21, 22, 24, 27, 31, 36, 41],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            この章では、<ChapterLink n={41} /> で決めたアーキテクチャのいちばん下、SQLite を読み書きする <Term en="data layer">データ層</Term>を作ります。対象は <code>src-tauri/core/</code> の <code>db.rs</code>（接続とマイグレーション）、<code>pages.rs</code>（ページのリポジトリ関数）、<code>error.rs</code>（エラー型）、そして <code>tests/pages.rs</code>（結合テスト）です。ツリーの移動や削除といったページ操作の詳細は <ChapterLink n={43} /> に、検索は <ChapterLink n={46} /> に回し、ここでは土台に集中します。
          </p>
          <p>
            保存先に SQLite を選んだ理由を先に述べます。Tsumugi のデータは1人のユーザーのローカルに閉じており、サーバーはありません。SQLite は1つのファイルにデータベース全体が入り、別プロセスのサーバーを必要としないので、デスクトップアプリの保存先として自然です。JSON ファイルに全部書く方法と比べると、全文検索（FTS5）やトランザクションが最初から使える点が決め手です。
          </p>
          <p>
            Rust から SQLite を使うクレートには <code>rusqlite</code> を選びました。公式ドキュメントは「SQLite を Rust から使うための人間工学的なラッパー」と説明しています。<Ref n={1} /> <ChapterLink n={38} /> で触れたとおり、Tauri 公式の SQL プラグインは iOS 対応の記述が資料によって食い違うため、本書では使いません。
          </p>
          <Figure n="42-1" title="データ層のレイヤー構成" caption="コマンド層は with_db でロックを取り、core のリポジトリ関数に &Connection を渡す。core は rusqlite を通して SQLite を読み書きする。右の結合テストは Tauri を通さずに core を直接呼び、インメモリの SQLite を使う。模式図。">
            <LayersFigure />
          </Figure>
          <p>
            図 42-1 の縦の経路がアプリ実行時の流れ、右からの濃い矢印がテスト時の流れです。core の関数がどれも <code>&amp;Connection</code> を受け取るだけで Tauri の型を知らないからこそ、同じ関数をテストから直接呼べます。
          </p>
        </>
      ),
    },
    {
      id: 'crate-and-bundled',
      title: 'core クレートと rusqlite の bundled 機能',
      body: (
        <>
          <p>core クレートの依存関係は次のとおりです。</p>
          <Code
            lang="toml"
            title="src-tauri/core/Cargo.toml"
            code={`
[package]
name = "tsumugi-core"
version = "0.1.0"
edition = "2024"
description = "Tsumugi のドメイン層。Tauri に依存せず cargo test で検証できる"

[dependencies]
rusqlite = { version = "0.41", features = ["bundled"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
thiserror = "2"
uuid = { version = "1", features = ["v4"] }
chrono = "0.4"
`}
          />
          <p>
            <code>rusqlite</code> の <code>bundled</code> 機能は、SQLite の C ソースをクレートに同梱してビルド時にコンパイルする設定です。docs.rs の機能一覧では、<code>bundled</code> が <code>libsqlite3-sys/bundled</code> と <code>modern_sqlite</code> を有効にすると示されています。<Ref n={2} /> これを付けると、ユーザーの macOS に入っている SQLite のバージョンに依存せず、FTS5 の trigram トークナイザや <code>contentless_delete</code> のような新しい機能を確実に使えます。本書の基準バージョン（<ChapterLink n={22} /> で触れた <code>src/content/versions.ts</code>）では rusqlite 0.41.1、SQLite 3.54.1 です。
          </p>
          <p>
            <code>uuid</code> は主キーの生成に、<code>chrono</code> は時刻の文字列化に使います。どちらも <code>lib.rs</code> の小さな関数に閉じ込め、各モジュールからはこの2つだけを呼びます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/lib.rs"
            code={`
//! tsumugi-core: Tauri に依存しないドメイン層。
//!
//! - \`db\`       … 接続とマイグレーション
//! - \`pages\`    … ページの CRUD とツリー操作
//! - \`search\`   … BlockNote JSON からのテキスト抽出と FTS5 検索
//! - \`database\` … 簡易データベース（表）とクエリ組み立て
//! - \`markdown\` … BlockNote JSON ⇄ Markdown
//!
//! Tauri 側（src-tauri/src）はここの関数を薄く包んでコマンドにするだけ。

pub mod database;
pub mod db;
pub mod error;
pub mod markdown;
pub mod pages;
pub mod search;

pub use error::{Error, Result};

pub(crate) fn new_id() -> String {
    uuid::Uuid::new_v4().to_string()
}

pub(crate) fn now() -> String {
    chrono::Utc::now().to_rfc3339_opts(chrono::SecondsFormat::Millis, true)
}
`}
          />
          <p>
            <code>pub(crate)</code> は <ChapterLink n={22} /> で学んだ可視性の指定で、クレートの外からは見えません。<code>new_id</code> と <code>now</code> は内部の都合なので公開しない、という意思表示です。<code>pub use error::{'{Error, Result}'}</code> で、利用側が <code>tsumugi_core::Result</code> と短く書けるようにしています。
          </p>
        </>
      ),
    },
    {
      id: 'connection',
      title: '接続とプラグマ',
      body: (
        <>
          <p>
            接続を開く関数は2つ用意します。ファイルを開く <code>open</code> と、テスト用にメモリ上に作る <code>open_in_memory</code> です。どちらも開いた直後に共通の設定（<code>configure</code>）を適用します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/db.rs（抜粋）"
            code={`
/// マイグレーションはバイナリに埋め込む。配列の添字 + 1 が \`PRAGMA user_version\` になる。
const MIGRATIONS: &[&str] = &[include_str!("../migrations/001_init.sql")];

pub fn open(path: &Path) -> Result<Connection> {
    let conn = Connection::open(path)?;
    conn.pragma_update(None, "journal_mode", "WAL")?;
    configure(&conn)?;
    Ok(conn)
}

pub fn open_in_memory() -> Result<Connection> {
    let conn = Connection::open_in_memory()?;
    configure(&conn)?;
    Ok(conn)
}

fn configure(conn: &Connection) -> Result<()> {
    conn.pragma_update(None, "foreign_keys", true)?;
    migrate(conn)?;
    Ok(())
}
`}
          />
          <p>
            <code>Connection::open</code> は「SQLite データベースへの新しい接続を開く。パスにデータベースがなければ作る」と説明されています。<Ref n={3} /> 初回起動時にファイルがなくても、この1行でファイルが作られます。<code>open_in_memory</code> はメモリ上のデータベースへの接続を開き、プロセスが終わると消えます。<Ref n={3} />
          </p>
          <h3>PRAGMA とは</h3>
          <p>
            <Term en="PRAGMA">プラグマ</Term>は、SQLite の動作を接続ごとに設定・照会するための特別な命令です。rusqlite では <code>pragma_update</code>（設定）と <code>pragma_query_value</code>（照会）で扱えます。<Ref n={3} /> Tsumugi では2つ設定します。
          </p>
          <p>
            1つ目の <code>journal_mode = WAL</code> は、トランザクションの実装を<Term en="write-ahead log">先行書き込みログ</Term>方式に切り替えます。既定のロールバックジャーナル方式では、変更前の内容を別ファイルに退避してから本体を書き換えますが、WAL では本体をそのままにして変更を WAL ファイルに追記し、後でまとめて本体に反映します。SQLite の解説は、WAL の利点として「ほとんどの場面で大幅に速い」「読み取りが書き込みを妨げず、書き込みが読み取りを妨げない」ことを挙げています。<Ref n={4} /> 注意点は、この設定がファイルに保存され、いったん設定すると接続を閉じて開き直しても WAL のままになることです。<Ref n={4} /> だから <code>open</code> でだけ設定し、インメモリでは設定していません。
          </p>
          <p>
            2つ目の <code>foreign_keys = true</code> は、外部キー制約の検査を有効にします。SQLite では歴史的な理由で外部キー検査が既定でオフになっており、公式の解説は「将来変わるかもしれないので、既定値に頼らずアプリが必要なとおりに設定すべき」と述べています。<Ref n={5} /> この設定は接続ごとに必要なので、<code>configure</code> で毎回適用しています。これが有効だと、存在しないページを親に指定した <code>INSERT</code> や、子を残したままの親の <code>DELETE</code> が SQLite 側で拒否されます。
          </p>
          <Callout>
            <p>
              <code>pragma_update</code> の第1引数 <code>None</code> はスキーマ名で、<code>main</code> データベースを指します。複数のデータベースを <code>ATTACH</code> している場合に名前を指定しますが、Tsumugi では使いません。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'migration',
      title: 'マイグレーション：include_str! と user_version',
      body: (
        <>
          <p>
            <Term en="migration">マイグレーション</Term>は、データベースの構造（スキーマ）を版管理する仕組みです。初回起動ではテーブルを作り、アプリの更新で列が増えたら既存のファイルに列を足す、という操作を、どこまで適用済みかを記録しながら行います。
          </p>
          <p>
            Tsumugi では、SQL ファイルを <code>include_str!</code> でバイナリに埋め込みます。このマクロは「UTF-8 のファイルを文字列として取り込む」もので、パスは呼び出し元のファイルからの相対パスとして解釈され、結果は <code>&amp;'static str</code> になります。<Ref n={6} /> 配布後のアプリが SQL ファイルを探しに行く必要がなく、ファイルが見つからないという事故が起きません。
          </p>
          <p>
            適用済みの版は、SQLite のファイルヘッダに記録される <code>PRAGMA user_version</code> で管理します。公式の説明では、これは「アプリケーションが好きなように使える整数で、SQLite 自身は使わない」値です。<Ref n={5} /> 専用の管理テーブルを作らずに済むので、最小のマイグレーション機構に向いています。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/db.rs（抜粋）"
            code={`
/// 未適用のマイグレーションを順に適用し、適用した本数を返す。
pub fn migrate(conn: &Connection) -> Result<usize> {
    let current: i64 = conn.pragma_query_value(None, "user_version", |r| r.get(0))?;
    let mut applied = 0;
    for (i, sql) in MIGRATIONS.iter().enumerate().skip(current as usize) {
        conn.execute_batch(&format!("BEGIN; {sql} COMMIT;"))?;
        conn.pragma_update(None, "user_version", (i + 1) as i64)?;
        applied += 1;
    }
    Ok(applied)
}

pub fn user_version(conn: &Connection) -> Result<usize> {
    let v: i64 = conn.pragma_query_value(None, "user_version", |r| r.get(0))?;
    Ok(v as usize)
}
`}
          />
          <p>この関数の流れを図 42-2 に示します。配列の添字と <code>user_version</code> の対応に注目してください。</p>
          <Figure n="42-2" title="マイグレーションの流れ" caption="user_version を読み、その値だけ配列を skip して未適用の SQL を順に適用する。各 SQL は BEGIN と COMMIT で囲み、適用後に user_version を添字 + 1 に更新する。新規ファイルでは 0 から始まり 1 になる。2回目以降は何もしない。">
            <MigrationFigure />
          </Figure>
          <p>
            図 42-2 の要点は、「<code>MIGRATIONS</code> 配列の添字 + 1 が <code>user_version</code>」という単純な約束です。<code>enumerate().skip(current)</code> は <ChapterLink n={27} /> のイテレータアダプタで、適用済みの分を読み飛ばします。2番目のマイグレーションを足すときは、<code>002_xxx.sql</code> を作って配列の末尾に <code>include_str!</code> を1つ追加するだけです。
          </p>
          <p>
            <code>execute_batch</code> は「パラメータを取らない複数の SQL 文をまとめて実行する」メソッドで、<Ref n={3} /> SQL ファイルに複数の <code>CREATE TABLE</code> が並んでいてもそのまま渡せます。<code>BEGIN</code> と <code>COMMIT</code> で囲んでいるのは、途中の文で失敗したときに半端な状態を残さないためです。
          </p>
          <Callout kind="warn">
            <p>
              一度配布した <code>001_init.sql</code> を書き換えてはいけません。既存ユーザーの <code>user_version</code> は 1 なので、書き換えた内容は適用されず、新規ユーザーとスキーマが食い違います。変更は必ず新しい番号のファイルとして追加します。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'repository',
      title: 'リポジトリ関数：pages.rs',
      body: (
        <>
          <p>
            テーブルを読み書きする関数をまとめたモジュールを、本書では<Term en="repository">リポジトリ</Term>と呼びます。SQL 文はここにだけ書き、ほかのモジュールやコマンド層には漏らしません。まず、1行を表す構造体と、行から構造体への変換です。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Page {
    pub id: String,
    pub parent_id: Option<String>,
    pub title: String,
    /// BlockNote の Block[] JSON 文字列
    pub content: String,
    pub icon: Option<String>,
    pub position: i64,
    pub created_at: String,
    pub updated_at: String,
}

/// サイドバー用。本文を含まない。
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PageSummary {
    pub id: String,
    pub parent_id: Option<String>,
    pub title: String,
    pub icon: Option<String>,
    pub position: i64,
}

const COLS: &str = "id, parent_id, title, content, icon, position, created_at, updated_at";

fn row_to_page(r: &rusqlite::Row) -> rusqlite::Result<Page> {
    Ok(Page {
        id: r.get(0)?,
        parent_id: r.get(1)?,
        title: r.get(2)?,
        content: r.get(3)?,
        icon: r.get(4)?,
        position: r.get(5)?,
        created_at: r.get(6)?,
        updated_at: r.get(7)?,
    })
}
`}
          />
          <p>
            <code>Page</code> は <ChapterLink n={21} /> の構造体そのものです。<code>parent_id</code> と <code>icon</code> が <code>Option&lt;String&gt;</code> なのは、SQL の <code>NULL</code> を <code>None</code> に対応させるためで、rusqlite の <code>r.get</code> はこの変換を自動で行います。<code>Serialize</code> と <code>Deserialize</code> を derive しているのは、この構造体がそのままコマンドの戻り値になり、JSON に変換されるからです（<ChapterLink n={34} />）。<code>PageSummary</code> は本文を含まない軽い版で、サイドバーの一覧に使います。ページが増えても一覧の取得で本文を全部読まないための分離です。
          </p>
          <p>
            <code>COLS</code> に列名を1か所にまとめ、<code>row_to_page</code> の添字（0〜7）と対応させています。列を足すときはこの2か所を一緒に直します。
          </p>
          <h3>1件取得：query_row と optional</h3>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
pub fn get(conn: &Connection, id: &str) -> Result<Page> {
    conn.query_row(
        &format!("SELECT {COLS} FROM pages WHERE id = ?1"),
        [id],
        row_to_page,
    )
    .optional()?
    .ok_or_else(|| Error::NotFound(format!("page {id}")))
}
`}
          />
          <p>
            <code>query_row</code> は「1行を返すことが期待される問い合わせを実行する」メソッドで、行がなければ <code>QueryReturnedNoRows</code> のエラーになります。<Ref n={3} /> ここに <code>OptionalExtension</code> トレイトの <code>.optional()</code> を付けると、「行がない」が <code>Ok(None)</code> に変わります。<Ref n={3} /> その後 <code>ok_or_else</code> で <code>None</code> を自作の <code>Error::NotFound</code> に変換しています。<ChapterLink n={24} /> で学んだ「<code>Option</code> を <code>Result</code> に持ち上げる」書き方です。SQL の <code>?1</code> はプレースホルダで、値は第2引数で渡します。文字列を <code>format!</code> で SQL に埋め込んでいるのは列名の定数 <code>COLS</code> だけで、ユーザーの入力はすべてプレースホルダを通します。
          </p>
          <h3>一覧と作成</h3>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
/// 全ページを (parent_id, position) 順で返す。ツリー化はフロントエンドで行う。
pub fn list(conn: &Connection) -> Result<Vec<PageSummary>> {
    let mut stmt = conn.prepare(
        "SELECT id, parent_id, title, icon, position FROM pages ORDER BY parent_id, position",
    )?;
    let rows = stmt.query_map([], |r| {
        Ok(PageSummary {
            id: r.get(0)?,
            parent_id: r.get(1)?,
            title: r.get(2)?,
            icon: r.get(3)?,
            position: r.get(4)?,
        })
    })?;
    Ok(rows.collect::<rusqlite::Result<_>>()?)
}

pub fn create_with_content(
    conn: &Connection,
    parent_id: Option<&str>,
    title: &str,
    content: &str,
) -> Result<Page> {
    if let Some(p) = parent_id {
        get(conn, p)?; // 親の存在確認
    }
    let position: i64 = conn.query_row(
        "SELECT COALESCE(MAX(position) + 1, 0) FROM pages WHERE parent_id IS ?1",
        [parent_id],
        |r| r.get(0),
    )?;
    let page = Page {
        id: new_id(),
        parent_id: parent_id.map(str::to_owned),
        title: title.to_owned(),
        content: content.to_owned(),
        icon: None,
        position,
        created_at: now(),
        updated_at: now(),
    };
    conn.execute(
        &format!("INSERT INTO pages ({COLS}) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)"),
        params![
            page.id,
            page.parent_id,
            page.title,
            page.content,
            page.icon,
            page.position,
            page.created_at,
            page.updated_at
        ],
    )?;
    search::reindex(conn, &page.id)?;
    Ok(page)
}
`}
          />
          <p>
            <code>list</code> は <code>prepare</code> で文を用意し、<code>query_map</code> で各行をクロージャで変換します。<code>query_map</code> が返すのは「行ごとの <code>Result</code> を返すイテレータ」なので、<ChapterLink n={27} /> で見た <code>collect::&lt;Result&lt;Vec&lt;_&gt;, _&gt;&gt;()</code> で、どれか1行でも失敗したらエラーとして返します。
          </p>
          <p>
            <code>create_with_content</code> では、同じ親の中での <code>position</code> を「現在の最大値 + 1」で決めています。<code>COALESCE</code> は最初の <code>NULL</code> でない値を返す SQL 関数で、兄弟がまだ1つもない（<code>MAX</code> が <code>NULL</code>）ときに 0 にします。<code>WHERE parent_id IS ?1</code> と <code>=</code> ではなく <code>IS</code> を使っているのは、<code>parent_id</code> が <code>NULL</code> のルートページでも正しく比較するためです（SQL では <code>NULL = NULL</code> は真になりません）。<code>params!</code> は複数の値をまとめてプレースホルダに渡すマクロです。<Ref n={1} /> 最後の <code>search::reindex</code> は全文検索の索引を作る処理で、<ChapterLink n={46} /> で扱います。
          </p>
          <h3>更新：1つの関数に集約する</h3>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
pub fn rename(conn: &Connection, id: &str, title: &str) -> Result<()> {
    touch(conn, id, "title", title)?;
    search::reindex(conn, id)
}

pub fn save_content(conn: &Connection, id: &str, content: &str) -> Result<()> {
    // 保存前に JSON として妥当か確認し、壊れたデータを書かない
    serde_json::from_str::<serde_json::Value>(content)?;
    touch(conn, id, "content", content)?;
    search::reindex(conn, id)
}

pub fn set_icon(conn: &Connection, id: &str, icon: Option<&str>) -> Result<()> {
    touch(conn, id, "icon", icon)
}

fn touch(conn: &Connection, id: &str, col: &str, value: impl rusqlite::ToSql) -> Result<()> {
    // col は呼び出し側の固定文字列のみ（ユーザー入力は通さない）
    let n = conn.execute(
        &format!("UPDATE pages SET {col} = ?1, updated_at = ?2 WHERE id = ?3"),
        params![value, now(), id],
    )?;
    if n == 0 {
        return Err(Error::NotFound(format!("page {id}")));
    }
    Ok(())
}
`}
          />
          <p>
            3つの更新関数はどれも「1列を更新して <code>updated_at</code> を進める」だけなので、<code>touch</code> にまとめました。<code>execute</code> は変更した行数を返すので、0 なら対象のページが存在しなかったと分かり、<code>NotFound</code> を返します。<code>col</code> を <code>format!</code> で SQL に埋め込んでいますが、渡しているのは <code>"title"</code> などの固定文字列だけで、<code>touch</code> は <code>pub</code> ではありません。列名はプレースホルダにできないので、「固定文字列だけを通す」ことをコメントで明示しています。<code>save_content</code> が保存前に JSON として解析しているのは、壊れた文字列をデータベースに入れないための入力検査です。
          </p>
          <Callout>
            <p>
              <ChapterLink n={20} /> では、トランザクションを開くとき <code>&amp;mut Connection</code> が必要になると述べました。rusqlite の <code>Connection::transaction</code> は確かに <code>&amp;mut self</code> を取りますが、Tsumugi の <code>with_db</code> はクロージャに <code>&amp;Connection</code> を渡す設計です。そこで <code>pages.rs</code> の移動と削除では <code>unchecked_transaction</code> を使っています。これは <code>&amp;self</code> で開始できる代わりに、入れ子のトランザクションの検査をコンパイル時ではなく実行時（SQLite のエラー）に委ねるメソッドです。<Ref n={3} /> 使い方は <ChapterLink n={43} /> で見ます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'errors',
      title: 'エラー型',
      body: (
        <>
          <p>
            データ層のエラーは、<ChapterLink n={24} /> で学んだ <code>thiserror</code> で定義します。rusqlite と serde_json のエラーを <code>#[from]</code> で包み、業務上の失敗（見つからない、入力が不正）を自前のバリアントで表します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/error.rs"
            code={`
#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("データベースエラー: {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("JSON エラー: {0}")]
    Json(#[from] serde_json::Error),
    #[error("見つかりません: {0}")]
    NotFound(String),
    #[error("不正な入力: {0}")]
    Invalid(String),
}

pub type Result<T> = std::result::Result<T, Error>;
`}
          />
          <p>
            <code>#[from]</code> を付けたバリアントには <code>From</code> の実装が生成され、<Ref n={7} /> リポジトリ関数の中で <code>conn.query_row(...)?</code> と書くだけで <code>rusqlite::Error</code> が <code>Error::Sqlite</code> に変わります。<code>#[error("...")]</code> の <code>{'{0}'}</code> は最初のフィールドを埋め込む指定で、ユーザーに見せるメッセージを日本語で組み立てています。
          </p>
          <p>
            このエラーは、コマンド層の <code>AppError</code>（<ChapterLink n={41} />）に <code>#[error(transparent)] Core(#[from] tsumugi_core::Error)</code> として包まれます。<code>transparent</code> は内側の <code>Display</code> をそのまま使うので、<Ref n={7} /> フロントエンドに届く文字列は「見つかりません: page xxx」のままです。2段階の変換（rusqlite → core の Error → AppError）がすべて <code>?</code> だけで済むのが、<code>From</code> を生成する利点です。
          </p>
          <p>
            バリアントを4つに絞っているのも設計です。「どのテーブルで」「どの列で」といった細かい区別は、メッセージの文字列に入れれば十分で、呼び出し側が <code>match</code> で分岐するのは <code>NotFound</code> と <code>Invalid</code> くらいです。テストでは <code>matches!(result, Err(Error::NotFound(_)))</code> のように、この区別を確認します。
          </p>
        </>
      ),
    },
    {
      id: 'tests',
      title: 'インメモリ SQLite での結合テスト',
      body: (
        <>
          <p>
            <ChapterLink n={31} /> で学んだとおり、<code>tests/</code> ディレクトリのファイルは<Term en="integration test">結合テスト</Term>として、ライブラリの公開 API だけを使って外側から検証します。公式ブックは、このディレクトリの各ファイルが別々のクレートとしてコンパイルされ、<code>cargo test</code> のときだけビルドされると説明しています。<Ref n={8} /> core は Tauri に依存しないので、この仕組みがそのまま使えます。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/tests/pages.rs（抜粋）"
            code={`
use tsumugi_core::{Error, db, pages};

#[test]
fn migrations_apply_once() {
    let conn = db::open_in_memory().unwrap();
    assert_eq!(db::user_version(&conn).unwrap(), 1);
    // 2 回目は何も適用しない
    assert_eq!(db::migrate(&conn).unwrap(), 0);
    let tables: Vec<String> = conn
        .prepare("SELECT name FROM sqlite_master WHERE type IN ('table') ORDER BY name")
        .unwrap()
        .query_map([], |r| r.get(0))
        .unwrap()
        .collect::<Result<_, _>>()
        .unwrap();
    for t in [
        "pages",
        "pages_fts",
        "databases",
        "db_properties",
        "db_rows",
        "db_views",
    ] {
        assert!(
            tables.contains(&t.to_string()),
            "missing table {t}: {tables:?}"
        );
    }
}

#[test]
fn crud_and_sibling_order() {
    let conn = db::open_in_memory().unwrap();
    let a = pages::create(&conn, None, "A").unwrap();
    let b = pages::create(&conn, None, "B").unwrap();
    let a1 = pages::create(&conn, Some(&a.id), "A-1").unwrap();
    assert_eq!((a.position, b.position, a1.position), (0, 1, 0));

    pages::rename(&conn, &a.id, "A!").unwrap();
    pages::save_content(
        &conn,
        &a.id,
        r#"[{"type":"paragraph","content":[{"type":"text","text":"hi","styles":{}}]}]"#,
    )
    .unwrap();
    pages::set_icon(&conn, &a.id, Some("📘")).unwrap();
    let got = pages::get(&conn, &a.id).unwrap();
    assert_eq!(got.title, "A!");
    assert!(got.content.contains("hi"));
    assert_eq!(got.icon.as_deref(), Some("📘"));
    assert!(got.updated_at >= got.created_at);

    // 壊れた JSON は保存しない
    assert!(matches!(
        pages::save_content(&conn, &a.id, "{oops"),
        Err(Error::Json(_))
    ));
    assert!(matches!(pages::get(&conn, "nope"), Err(Error::NotFound(_))));
    // （以下略）
}
`}
          />
          <p>
            1つ目のテストは、マイグレーションが「1回だけ」適用されることを確かめます。<code>open_in_memory</code> の中で <code>migrate</code> が走って <code>user_version</code> が 1 になり、もう一度 <code>migrate</code> を呼んでも 0 本しか適用しないこと、そして <code>sqlite_master</code>（SQLite がスキーマを保持する内部テーブル）に6つのテーブルがそろっていることを確認しています。
          </p>
          <p>
            2つ目のテストは、作成・改名・本文保存・アイコン設定・取得の一連の流れと、<code>position</code> の採番（同じ親の中で 0, 1, ...）、壊れた JSON が <code>Error::Json</code> になること、存在しない id が <code>NotFound</code> になることを確認しています。テストごとに <code>open_in_memory</code> で新しいデータベースを作るので、テスト同士が干渉しません。
          </p>
          <p>実行は <code>examples/tsumugi/src-tauri/core</code> に移動して <code>cargo test</code> です。本書の制作環境では次のとおり、4ファイル 14 件が通ることを確認しています。</p>
          <Code
            lang="text"
            title="cargo test の出力（抜粋。tests/pages.rs の分）"
            code={`
     Running tests/pages.rs (.../target/debug/deps/pages-ddf2ad51a94fa73b)

running 4 tests
test migrations_apply_once ... ok
test crud_and_sibling_order ... ok
test move_reorders_and_prevents_cycles ... ok
test delete_removes_descendants ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.01s
`}
          />
          <p>
            テストは並列に実行されるため、表示される順序は実行のたびに変わることがあります。全体では <code>tests/database.rs</code> が 4 件、<code>tests/markdown.rs</code> が 4 件、<code>tests/pages.rs</code> が 4 件、<code>tests/search.rs</code> が 2 件の計 14 件です。
          </p>
          <p>
            残りの2つのテスト（移動と循環防止、子孫ごとの削除）は <ChapterLink n={43} /> で、検索のテストは <ChapterLink n={46} /> で、簡易データベースと Markdown のテストはそれぞれの章で読みます。
          </p>
        </>
      ),
    },
    {
      id: 'simplifications',
      title: '本書での簡略化と拡張の方向',
      body: (
        <>
          <p>データ層で意図的に単純にしている点と、必要になったときの拡張の方向をまとめます。</p>
          <ul>
            <li>
              接続は1つだけで、<code>Mutex</code> で直列化しています（<code>lib.rs</code> の <code>ponytail:</code> コメント）。WAL モードは読み取りと書き込みの並行を許すので、<Ref n={4} /> 読み取り専用の接続を複数持つ接続プール（<code>r2d2-sqlite</code> など）に置き換えれば、検索中に保存が待たされる状況を減らせます。ローカルの1ユーザーでは必要になりません。
            </li>
            <li>
              マイグレーションは前進のみで、巻き戻し（down）はありません。配布後に取り消したい変更が出たら、それを打ち消す新しい版を追加します。
            </li>
            <li>
              マイグレーションの SQL は文字列の配列で、ファイル名の番号と添字の対応は人が守ります。数が増えたら、<code>refinery</code> のような専用クレートに移す選択肢があります。
            </li>
            <li>
              <code>row_to_page</code> の添字（0〜7）は <code>COLS</code> の順序と手で合わせています。<code>serde_rusqlite</code> のように列名から構造体へ対応付けるクレートを使えば、この手作業をなくせます。
            </li>
            <li>
              時刻は UTC の文字列で、タイムゾーンの変換は表示側の仕事にしています。
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
            <li>データ層は Tauri に依存しない <code>tsumugi-core</code> に置き、各関数は <code>&amp;Connection</code> だけを受け取る。だからテストから直接呼べる。</li>
            <li><code>rusqlite</code> の <code>bundled</code> 機能で SQLite 本体を同梱し、OS の SQLite のバージョンに依存しない。</li>
            <li>接続を開いたら <code>journal_mode=WAL</code>（ファイルのみ）と <code>foreign_keys=true</code>（毎回）を設定する。</li>
            <li>マイグレーションは <code>include_str!</code> で埋め込んだ SQL の配列と <code>PRAGMA user_version</code> で管理し、「添字 + 1 が版」という約束で未適用分だけを適用する。</li>
            <li>リポジトリ関数は <code>query_row</code> + <code>.optional()</code>、<code>query_map</code> + <code>collect</code>、<code>params!</code> で書き、ユーザー入力は必ずプレースホルダを通す。</li>
            <li>エラーは <code>thiserror</code> の <code>Error</code> にまとめ、<code>#[from]</code> と <code>?</code> で rusqlite → core → <code>AppError</code> と変換する。結合テストはインメモリ SQLite で <code>cargo test</code> する。</li>
          </ul>
          <p>次章では、このデータ層の上にページの親子関係と並び順、ツリーの移動と削除を実装し、React のサイドバーにつなぎます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'rusqlite — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/rusqlite/latest/rusqlite/',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'クレートの位置づけ（SQLite の人間工学的なラッパー）、Connection・prepare・query_map・params! の基本的な使い方の根拠。',
    },
    {
      title: 'rusqlite — Feature flags',
      publisher: 'docs.rs',
      url: 'https://docs.rs/crate/rusqlite/latest/features',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'bundled 機能が libsqlite3-sys/bundled と modern_sqlite を有効にすることの根拠。',
    },
    {
      title: 'rusqlite::Connection — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/rusqlite/latest/rusqlite/struct.Connection.html',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'open（なければ作る）、open_in_memory、pragma_update、pragma_query_value、execute_batch、query_row と .optional()、unchecked_transaction の説明の根拠。',
    },
    {
      title: 'Write-Ahead Logging',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/wal.html',
      accessed: '2026-11-08',
      note: 'WAL の仕組み、速度と並行性の利点、設定がファイルに永続化されることの根拠。',
    },
    {
      title: 'PRAGMA Statements',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/pragma.html',
      accessed: '2026-11-08',
      note: 'user_version がアプリケーションが自由に使える整数であること、journal_mode=WAL、foreign_keys の既定値が OFF で既定に頼らず設定すべきことの根拠。',
    },
    {
      title: 'include_str — std',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/macro.include_str.html',
      accessed: '2026-11-08',
      note: 'UTF-8 ファイルを文字列として埋め込むこと、パスが呼び出し元からの相対であること、&\'static str を返すことの根拠。',
    },
    {
      title: 'thiserror — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/thiserror/latest/thiserror/',
      accessed: '2026-11-08',
      version: 'thiserror 2',
      note: '#[from] による From の生成、#[error("{0}")] の補間、#[error(transparent)] の転送の根拠。',
    },
    {
      title: 'The Rust Programming Language, 11.3 Test Organization',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch11-03-test-organization.html',
      accessed: '2026-11-08',
      note: 'tests ディレクトリの結合テストが公開 API だけを使い、各ファイルが別クレートとして cargo test 時にだけコンパイルされることの根拠。',
    },
  ],
}

export default chapter
