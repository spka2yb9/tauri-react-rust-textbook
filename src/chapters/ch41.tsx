import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 41-1 アーキテクチャ ---------- */
function ArchitectureFigure() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Tsumugi のアーキテクチャ図。左の WebView プロセスには React のコードがあり、lib/ipc.ts から invoke でコマンド層を呼ぶ。右の Core プロセスにはコマンド層、Tauri に依存しない tsumugi-core、SQLite ファイルが縦に並び、公式プラグインは React から直接呼ばれてファイルを読み書きする">
      <defs>
        <marker id="arrow41a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="140" y="26" fontSize="14" fontWeight="600" textAnchor="middle">WebView プロセス</text>
      <text x="475" y="26" fontSize="14" fontWeight="600" textAnchor="middle">Core プロセス（Rust）</text>
      <line x1="295" y1="36" x2="295" y2="380" stroke="var(--fig-line)" strokeDasharray="6 4" />
      <text x="295" y="394" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">信頼境界（capability で通す操作を決める）</text>

      {/* React */}
      <rect x="20" y="50" width="240" height="170" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="140" y="74" fontSize="14" fontWeight="600" textAnchor="middle">React（src/）</text>
      <g fontSize="12" textAnchor="middle">
        <rect x="35" y="88" width="210" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="140" y="107">features/*（画面と操作）</text>
        <rect x="35" y="126" width="210" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="140" y="145">lib/ipc.ts（invoke を集約）</text>
        <rect x="35" y="164" width="210" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="140" y="183">lib/types.ts（Rust と揃えた型）</text>
      </g>

      {/* commands */}
      <rect x="330" y="50" width="290" height="64" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="475" y="73" fontSize="14" fontWeight="600" textAnchor="middle">コマンド層（src-tauri/src）</text>
      <text x="475" y="96" fontSize="12" textAnchor="middle">commands/*.rs ・ State&lt;Db&gt; ・ AppError</text>

      {/* core */}
      <rect x="330" y="140" width="290" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="475" y="163" fontSize="14" fontWeight="600" textAnchor="middle">tsumugi-core（Tauri 非依存）</text>
      <text x="475" y="186" fontSize="12" textAnchor="middle">db / pages / search / database / markdown</text>

      {/* sqlite */}
      <rect x="330" y="230" width="150" height="46" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
      <text x="405" y="250" fontSize="13" fontWeight="600" textAnchor="middle">SQLite</text>
      <text x="405" y="267" fontSize="12" textAnchor="middle">tsumugi.db</text>
      <text x="560" y="258" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">cargo test で検証</text>

      {/* plugins */}
      <rect x="330" y="300" width="290" height="64" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
      <text x="475" y="323" fontSize="14" fontWeight="600" textAnchor="middle">公式プラグイン（fs / dialog / store）</text>
      <text x="475" y="346" fontSize="12" textAnchor="middle">attachments/ ・ settings.json ・ ダイアログ</text>

      {/* arrows */}
      <path d="M245,141 L328,90" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow41a)" />
      <text x="286" y="104" fontSize="12" fill="var(--fig-accent)" textAnchor="middle">invoke</text>
      <path d="M475,114 L475,138" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow41a)" />
      <text x="520" y="131" fontSize="12" fill="var(--fig-muted)">with_db で呼ぶ</text>
      <path d="M405,204 L405,228" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow41a)" />
      <text x="450" y="221" fontSize="12" fill="var(--fig-muted)">rusqlite</text>
      <path d="M245,200 L328,320" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow41a)" />
      <text x="262" y="268" fontSize="12" fill="var(--fig-accent)" textAnchor="middle">プラグイン API</text>
    </svg>
  )
}

/* ---------- 図 41-2 ER 図 ---------- */
function ErFigure() {
  const field = (x: number, y: number, lines: string[]) =>
    lines.map((l, i) => (
      <text key={i} x={x + 10} y={y + 20 + i * 16} fontSize="12" fontFamily="monospace">
        {l}
      </text>
    ))
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="Tsumugi の ER 図。pages は parent_id で自分自身を参照し、本文 content に BlockNote の JSON を持つ。pages_fts は pages と rowid を共有する全文検索用の仮想表。databases は page_id で pages を参照し、db_properties、db_rows、db_views がそれぞれ database_id で databases を参照する">
      <defs>
        <marker id="arrow41b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* pages */}
      <rect x="20" y="20" width="190" height="172" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <rect x="20" y="20" width="190" height="24" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
      <text x="115" y="37" fontSize="13" fontWeight="600" textAnchor="middle">pages</text>
      {field(20, 44, ['id          PK', 'parent_id   FK→pages', 'title', 'content     JSON', 'icon', 'position', 'created_at', 'updated_at'])}
      {/* self reference */}
      <path d="M20,76 C-2,76 -2,120 20,120" fill="none" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow41b)" />

      {/* pages_fts */}
      <rect x="20" y="240" width="190" height="76" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="5 3" />
      <text x="115" y="257" fontSize="13" fontWeight="600" textAnchor="middle">pages_fts（FTS5 仮想表）</text>
      {field(20, 264, ['rowid  = pages.rowid', 'title, body（索引のみ）'])}
      <path d="M115,192 L115,238" stroke="var(--fig-line)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow41b)" />
      <text x="128" y="220" fontSize="12" fill="var(--fig-muted)">保存時に Rust が再索引</text>

      {/* databases */}
      <rect x="250" y="80" width="170" height="100" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
      <text x="335" y="97" fontSize="13" fontWeight="600" textAnchor="middle">databases</text>
      {field(250, 104, ['id          PK', 'page_id     FK→pages', 'name', 'created_at'])}
      <path d="M210,124 L248,124" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow41b)" />

      {/* db_properties */}
      <rect x="455" y="20" width="170" height="132" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="540" y="37" fontSize="13" fontWeight="600" textAnchor="middle">db_properties</text>
      {field(455, 44, ['id          PK', 'database_id FK', 'name', 'kind  text|number|…', 'options     JSON', 'position'])}
      <path d="M420,100 L453,80" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow41b)" />

      {/* db_rows */}
      <rect x="455" y="160" width="170" height="132" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="540" y="177" fontSize="13" fontWeight="600" textAnchor="middle">db_rows</text>
      {field(455, 184, ['id          PK', 'database_id FK', '"values"    JSON', 'position', 'created_at', 'updated_at'])}
      <path d="M420,130 L453,215" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow41b)" />

      {/* db_views */}
      <rect x="455" y="300" width="170" height="116" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
      <text x="540" y="317" fontSize="13" fontWeight="600" textAnchor="middle">db_views</text>
      {field(455, 324, ['id          PK', 'database_id FK', 'name', 'sort        JSON', 'filter      JSON'])}
      <path d="M420,160 L453,350" stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow41b)" />

      <text x="20" y="340" fontSize="12" fill="var(--fig-muted)">矢印：外部キーの参照先　破線：rowid の共有（外部キーではない）</text>
      <text x="20" y="360" fontSize="12" fill="var(--fig-muted)">模式図：列の型や NOT NULL は migrations/001_init.sql を参照</text>
    </svg>
  )
}

/* ---------- 図 41-3 機能の置き場所の判断 ---------- */
function PlacementFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="機能をどこに置くかの判断を3段で表した図。永続化や OS アクセスを伴う処理は Rust 側、公式プラグインで済むファイル操作やダイアログはフロントエンドから直接プラグインを呼び、表示と編集中の状態はフロントエンドに置く">
      <defs>
        <marker id="arrow41c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="20" width="600" height="56" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="40" y="43" fontWeight="600">1. データの保存・検索・整合性に関わるか？</text>
        <text x="40" y="64" fill="var(--fig-muted)" fontSize="12">→ Rust 側（core クレート）に置く：ページ CRUD、ツリー移動、FTS、簡易 DB のクエリ組み立て</text>

        <path d="M320,76 L320,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow41c)" />
        <text x="335" y="92" fontSize="12" fill="var(--fig-muted)">いいえ</text>

        <rect x="20" y="100" width="600" height="56" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="40" y="123" fontWeight="600">2. 公式プラグインがそのまま提供しているか？</text>
        <text x="40" y="144" fill="var(--fig-muted)" fontSize="12">→ フロントエンドから直接呼ぶ：ファイル保存（fs）、確認ダイアログ（dialog）、設定（store）</text>

        <path d="M320,156 L320,176" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow41c)" />
        <text x="335" y="172" fontSize="12" fill="var(--fig-muted)">いいえ</text>

        <rect x="20" y="180" width="600" height="56" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="40" y="203" fontWeight="600">3. 画面の表示や編集中の状態か？</text>
        <text x="40" y="224" fill="var(--fig-muted)" fontSize="12">→ フロントエンド（React）に置く：ツリーの組み立て、エディタの状態、ダイアログの開閉、テーマ</text>
      </g>
      <text x="320" y="270" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">上から順に当てはめる。1 と 2 の両方に当たる場合（画像の保存など）は、ファイル書き込みをプラグイン、</text>
      <text x="320" y="288" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">パスの記録を Rust 側の JSON 保存に分ける</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 41,
  part: 6,
  title: '設計：機能・アーキテクチャ・データモデル',
  summary:
    '第6部では、これまでに学んだ TypeScript・React・Rust・Tauri を使って、ノートアプリ Tsumugi を設計から仕上げまで作ります。この章は設計の章です。機能一覧を確定し、フロントエンドと Rust 側の分担基準を決め、Tauri に依存しない core クレートとコマンド層に分けたアーキテクチャと、SQLite のデータモデル（ER 図）を固めます。',
  goals: [
    'Tsumugi の機能一覧と、第42〜50章でそれぞれ何を作るかを説明できる',
    '「どの処理をフロントエンドに置き、どの処理を Rust 側に置くか」の判断基準を言える',
    'core クレートとコマンド層を分ける理由と、分けたことで何がテストできるようになるかを説明できる',
    'pages・pages_fts・databases・db_properties・db_rows・db_views の6つのテーブルの関係を ER 図で読める',
    'フロントエンドと Rust 側の間で型とエラーをどうそろえるかを説明できる',
  ],
  prerequisites: [15, 22, 24, 33, 34, 36, 37, 38],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの：Tsumugi の全体像',
      body: (
        <>
          <p>
            第6部は、第1〜5部で学んだ道具を1つのアプリにまとめる部です。題材の <Term en="Tsumugi">Tsumugi</Term> は、ページを入れ子にして整理し、ブロック単位で本文を書き、全文検索と簡易データベースを備えた、ローカル保存のノートアプリです。Notion 風の操作感を目指しますが、名前もデザインもオリジナルで、Notion とは無関係です。完成版のコードは <code>examples/tsumugi/</code> にあり、第6部の各章はそこから抜粋して説明します。
          </p>
          <p>
            この章ではコードをほとんど書きません。代わりに、アプリを作り始める前に決めておくべき3つのこと、すなわち機能の範囲、処理の置き場所、データの形を決めます。先に決めておかないと、「この処理は Rust に置くべきだったのに TypeScript で書いてしまった」「テーブルの設計を変えたので全部書き直し」といった手戻りが起きます。
          </p>
          <h3>機能一覧と担当する章</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>機能</th>
                  <th>概要</th>
                  <th>章</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>データ層</td>
                  <td>SQLite（rusqlite）への接続、マイグレーション、リポジトリ関数、テスト</td>
                  <td><ChapterLink n={42} /></td>
                </tr>
                <tr>
                  <td>ページの入れ子</td>
                  <td>サイドバーのツリー、作成・改名・移動・削除（子孫ごと）</td>
                  <td><ChapterLink n={43} /></td>
                </tr>
                <tr>
                  <td>ブロック編集</td>
                  <td>BlockNote の組み込み、Block[] JSON の保存、800ms の自動保存、スラッシュメニューと D&amp;D</td>
                  <td><ChapterLink n={44} /></td>
                </tr>
                <tr>
                  <td>エディタの拡張</td>
                  <td>カスタムブロック（コールアウト）、画像の添付と asset プロトコルでの表示</td>
                  <td><ChapterLink n={45} /></td>
                </tr>
                <tr>
                  <td>全文検索</td>
                  <td>FTS5 trigram、JSON からのテキスト抽出、検索ダイアログ（⌘K）</td>
                  <td><ChapterLink n={46} /></td>
                </tr>
                <tr>
                  <td>簡易データベース</td>
                  <td>表形式ビュー、プロパティ型、並べ替え・絞り込み・ビューの保存</td>
                  <td><ChapterLink n={47} />、<ChapterLink n={48} /></td>
                </tr>
                <tr>
                  <td>Markdown</td>
                  <td>書き出しと読み込み（dialog と fs プラグイン）</td>
                  <td><ChapterLink n={49} /></td>
                </tr>
                <tr>
                  <td>仕上げ</td>
                  <td>テーマ、設定画面、ショートカット、ウィンドウ状態、エラー表示（トースト）</td>
                  <td><ChapterLink n={50} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            この一覧は、要件として承認された範囲です。「同期」「共同編集」「ネットワーク越しの共有」は含めません。範囲を先に固定するのは、設計の自由度を下げるためではなく、どこまで作れば完成かを明確にするためです。
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境（Ubuntu 24.04、WSL2、WebKitGTK 2.52）では、Tsumugi を <code>tauri dev</code> で起動し、<code>tauri build</code> で本番ビルドと deb パッケージの生成まで行って、ページの作成・編集・自動保存・検索・データベース・設定の主要な操作が動くことを確認しています。操作は WebView の中から合成したクリックと入力で行い、仮想ディスプレイ上で実行したため、ネイティブのダイアログ、実際のマウスによるドラッグ＆ドロップ（サイドバーは合成イベントで確認済み）、ウィンドウ位置の復元は確認できていません。macOS と Windows での実行は未検証です。Rust の core クレートは <code>cargo test</code> で 14 件のテストが通ります。本文では「テストで確認」「Linux で確認」「未検証」を書き分けます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'split',
      title: 'フロントエンドと Rust 側の分担',
      body: (
        <>
          <p>
            Tauri のアプリは、<ChapterLink n={33} /> で学んだとおり、OS に直接触れられる Core プロセス（Rust 側）と、画面を描く WebView プロセス（フロントエンド）に分かれています。公式のプロセスモデルの解説は、Core を「OS への完全なアクセスを持つ唯一の構成要素」とし、攻撃面を小さく保つためにビジネスロジックをできるだけ Core に寄せるよう勧めています。<Ref n={1} /> 一方で、画面の状態まで Rust に置くと、React の宣言的な利点（<ChapterLink n={9} />）を捨てることになります。
          </p>
          <p>Tsumugi では、次の3つの問いを上から順に当てはめて置き場所を決めます。</p>
          <Figure n="41-3" title="機能の置き場所を決める3つの問い" caption="上から順に当てはめる。永続化と整合性は Rust 側、公式プラグインで済む OS 操作はフロントエンドから直接呼び、表示と編集中の状態はフロントエンドに置く。模式図。">
            <PlacementFigure />
          </Figure>
          <p>
            図 41-3 の1段目が Rust 側に置く理由は、SQLite を触れるのが Rust 側だけだからです。rusqlite はネイティブライブラリなので WebView からは呼べません。ページの親子関係の整合性（自分の子孫の下へは移動できない、など）も、データの隣にあるコードで守るのがいちばん確実です。
          </p>
          <p>
            2段目は、<ChapterLink n={38} /> で学んだ公式プラグインです。ファイル保存や確認ダイアログを自作コマンドで包み直す必要はなく、capability（<ChapterLink n={37} />）で許可を与えてフロントエンドから直接呼びます。Markdown の読み書きがこの例で、ファイルの選択と読み書きはフロントエンドが dialog と fs プラグインで行い、Rust 側は「ページと Markdown 文字列の相互変換」だけを担当します。
          </p>
          <p>
            3段目はフロントエンドの領分です。ページの一覧を木構造に組み立てる処理、エディタの編集中の状態、どのダイアログが開いているか、といった「表示のための状態」は React の <code>useState</code> に置きます。Rust 側が返すのは平坦な一覧で、木にするのはフロントエンドの仕事です（<ChapterLink n={43} />）。
          </p>
          <h3>判断に迷う例：画像の添付</h3>
          <p>
            画像の添付は、1段目（データ）と2段目（ファイル操作）の両方に当たります。Tsumugi では、画像ファイルそのものは fs プラグインでデータフォルダの <code>attachments/</code> に書き（2段目）、エディタの JSON には相対パスだけを持たせて Rust 側に保存します（1段目）。表示は asset プロトコルで行います。この分割の詳細は <ChapterLink n={45} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'architecture',
      title: 'アーキテクチャ：core クレートとコマンド層',
      body: (
        <>
          <p>
            Rust 側はさらに2つに分けます。SQLite を扱う純粋なロジックを <Term en="core crate">core クレート</Term>（<code>tsumugi-core</code>）に置き、Tauri のコマンド（<ChapterLink n={34} />）はそれを薄く包むだけにします。全体の配置を図 41-1 に示します。
          </p>
          <Figure n="41-1" title="Tsumugi のアーキテクチャ" caption="左の React は lib/ipc.ts に invoke を集約し、右のコマンド層を呼ぶ。コマンド層は State のロックを取って tsumugi-core を呼び、core が rusqlite で SQLite を読み書きする。ファイル保存やダイアログは公式プラグインを React から直接呼ぶ。模式図。">
            <ArchitectureFigure />
          </Figure>
          <p>
            図 41-1 で注目してほしいのは、<code>tsumugi-core</code> の箱が Tauri に依存していないことです。core の <code>Cargo.toml</code> には <code>rusqlite</code>、<code>serde</code>、<code>serde_json</code>、<code>thiserror</code>、<code>uuid</code>、<code>chrono</code> しかなく、<code>tauri</code> クレートは入っていません。分ける理由は3つあります。
          </p>
          <ol className="steps">
            <li>
              テストできる。Tauri アプリ本体のビルドには OS の WebView が必要ですが、core は普通の Rust ライブラリなので、<ChapterLink n={31} /> で学んだ <code>cargo test</code> がそのまま動きます。インメモリの SQLite を使えば、ファイルを作らずに CRUD や検索を検証できます。
            </li>
            <li>
              コマンドが薄くなる。コマンド関数の仕事は「引数を受け取り、ロックを取り、core を呼び、結果を返す」だけになります。ロジックとコマンドの境界がはっきりするので、コマンドの数が増えても読みやすさが保てます。
            </li>
            <li>
              差し替えられる。将来 CLI ツールや別の UI から同じデータを扱いたくなっても、core をそのまま使えます。
            </li>
          </ol>
          <p>
            2つのクレートは Cargo のワークスペース（<ChapterLink n={22} />）でまとめます。ワークスペースは複数のパッケージを一緒に管理する仕組みで、<code>[workspace]</code> を <code>[package]</code> と同じ <code>Cargo.toml</code> に書くと、そのパッケージがルートパッケージになります。<Ref n={2} />
          </p>
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml（抜粋）"
            code={`
[workspace]
members = ["core"]

[package]
name = "tsumugi"
version = "0.1.0"
description = "Tsumugi - Notion 風ローカルノート（教科書 第6部の題材）"
edition = "2024"

[dependencies]
# asset: プロトコル（添付画像の表示）には protocol-asset feature が必要
tauri = { version = "2", features = ["protocol-asset"] }
tauri-plugin-fs = "2"
tauri-plugin-dialog = "2"
tauri-plugin-store = "2"
tauri-plugin-opener = "2"
tsumugi-core = { path = "core" }
rusqlite = { version = "0.41", features = ["bundled"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
thiserror = "2"
`}
          />
          <h3>コマンド層の骨格</h3>
          <p>
            コマンド層の中心は、<ChapterLink n={36} /> で学んだ <code>State</code> です。SQLite の接続を <code>Mutex</code> で包んで <code>setup</code> で <code>manage</code> し、各コマンドはロックを取って core の関数を呼びます。公式ドキュメントは、可変な状態には標準ライブラリの <code>Mutex</code> で十分で、ガードを <code>.await</code> をまたいで持つ場合だけ非同期の Mutex が必要だと述べています。<Ref n={3} /> Tsumugi のコマンドはすべて同期なので、標準の <code>Mutex</code> を使います。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（抜粋）"
            code={`
/// 管理 State。SQLite の Connection は Sync ではないので Mutex で包む。
/// ponytail: 単一接続 + グローバルロック。ローカル 1 ユーザーのノートには十分。
pub struct Db(pub Mutex<Connection>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // ウィンドウ位置・サイズの保存はデスクトップのみ
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_window_state::Builder::default().build())?;

            // app_data_dir: macOS なら ~/Library/Application Support/jp.tsumugi.app
            let data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(data_dir.join("attachments"))?;
            let conn = tsumugi_core::db::open(&data_dir.join("tsumugi.db"))?;
            app.manage(Db(Mutex::new(conn)));
            Ok(())
        })
`}
          />
          <p>
            ロックを取って core を呼ぶ手順は、すべてのコマンドで同じです。そこで <code>with_db</code> という小さなヘルパーに切り出し、各コマンドはクロージャで core の関数を渡すだけにします。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/commands.rs（抜粋）"
            code={`
/// ロックを取って core の関数を呼ぶ共通ヘルパー。
pub fn with_db<T>(
    db: &State<'_, Db>,
    f: impl FnOnce(&Connection) -> tsumugi_core::Result<T>,
) -> AppResult<T> {
    let conn =
        db.0.lock()
            .map_err(|e| AppError::Internal(format!("lock poisoned: {e}")))?;
    Ok(f(&conn)?)
}
`}
          />
          <p>
            <code>f(&amp;conn)?</code> の <code>?</code> は、core の <code>Error</code> をコマンド層の <code>AppError</code> に <code>From</code> で変換しています。この変換の仕組みは、この章の後半と <ChapterLink n={42} /> で見ます。
          </p>
        </>
      ),
    },
    {
      id: 'directories',
      title: 'ディレクトリ構成',
      body: (
        <>
          <p>
            <ChapterLink n={15} /> では React アプリを「機能ごと」に分ける構成を学びました。Tsumugi もそれに従い、<code>features/</code> の下に機能単位のフォルダを置きます。Rust 側は、前節のとおり core クレートとコマンド層に分かれます。
          </p>
          <Code
            lang="text"
            title="examples/tsumugi/ の構成"
            code={`
examples/tsumugi/
  package.json, index.html, vite.config.ts, tsconfig.json
  src/                         # React（TypeScript strict）
    main.tsx, App.tsx          # 画面全体、ショートカット、ダイアログの開閉
    lib/ipc.ts                 # invoke の型付きラッパー（全コマンドをここに集約）
    lib/types.ts               # Rust の struct と手でそろえた型
    lib/theme.ts               # テーマ（tauri-plugin-store に保存、data-theme 属性に反映）
    lib/toast.tsx              # エラー表示用トースト
    features/pages/            # サイドバー、ページツリー（D&D で移動）、ページ操作
    features/editor/           # BlockNote 組み込み、自動保存、callout ブロック、画像添付
    features/search/           # 検索ダイアログ（⌘K）
    features/database/         # 表ビュー、プロパティ編集、並べ替え・絞り込み
    features/settings/         # 設定ダイアログ、Markdown 書き出し・読み込み
    styles/global.css          # CSS 変数によるテーマ、モバイル用メディアクエリ、safe-area
  src-tauri/
    Cargo.toml                 # workspace（members = ["core"]）+ Tauri アプリ本体
    tauri.conf.json            # identifier、ウィンドウ、CSP、assetProtocol のスコープ
    capabilities/default.json  # メインウィンドウに与える permission
    core/                      # クレート tsumugi-core（Tauri 非依存。cargo test で検証）
      migrations/001_init.sql  # スキーマ（include_str! で埋め込み、user_version で管理）
      src/db.rs                # 接続とマイグレーション
      src/pages.rs             # ページ CRUD、ツリー移動（循環防止）、子孫ごと削除
      src/search.rs            # BlockNote JSON → テキスト抽出、FTS5 検索
      src/database.rs          # 簡易データベース、並べ替え・絞り込みの SQL 組み立て
      src/markdown.rs          # BlockNote JSON ⇄ Markdown
      src/error.rs
      tests/                   # 結合テスト（インメモリ SQLite）
    src/
      main.rs, lib.rs          # Builder、プラグイン登録、State（Mutex<Connection>）
      error.rs                 # AppError（serde::Serialize でフロントエンドへ）
      commands.rs              # 共通ヘルパー（with_db）と、下のサブモジュールの宣言
      commands/                # pages / search / database / files / settings
`}
          />
          <p>
            この構成で守る約束は2つです。1つ目は、<code>invoke</code> を呼ぶのは <code>lib/ipc.ts</code> だけ、という約束です。コマンド名の文字列と引数の形がこのファイルに集まるので、Rust 側のコマンドを変えたときに直す場所が1か所で済みます。2つ目は、core の各モジュール（<code>pages.rs</code> など）が受け取るのは <code>&amp;Connection</code> だけ、という約束です。Tauri の <code>State</code> や <code>AppHandle</code> を core に持ち込まないことで、core の独立性が保たれます。
          </p>
        </>
      ),
    },
    {
      id: 'data-model',
      title: 'データモデル：6つのテーブル',
      body: (
        <>
          <p>
            データは SQLite の1つのファイル <code>tsumugi.db</code> に保存します。テーブルは6つで、その関係を図 41-2 に示します。中心は <code>pages</code> で、ほかのテーブルはすべて直接または間接に <code>pages</code> を参照します。
          </p>
          <Figure n="41-2" title="Tsumugi の ER 図" caption="pages は parent_id で自分自身を参照して木構造を作る。pages_fts は本文を持たない FTS5 の索引で、pages と rowid を共有する。databases は1ページに1つ付き、db_properties（列）、db_rows（行）、db_views（並べ替え・絞り込みの保存）がそれにぶら下がる。模式図。">
            <ErFigure />
          </Figure>
          <p>
            図 41-2 の各テーブルを、実際のスキーマで確認します。<ChapterLink n={42} /> で見るとおり、この SQL はバイナリに埋め込まれ、初回起動時に実行されます。
          </p>
          <Code
            lang="sql"
            title="src-tauri/core/migrations/001_init.sql"
            code={`
-- 001: 初期スキーマ（教科書と共有するデータモデル）
CREATE TABLE pages (
  id         TEXT PRIMARY KEY,
  parent_id  TEXT NULL REFERENCES pages(id),
  title      TEXT NOT NULL,
  content    TEXT NOT NULL DEFAULT '[]',  -- BlockNote の Block[] JSON
  icon       TEXT NULL,
  position   INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX pages_parent_idx ON pages(parent_id, position);

-- 全文検索。外部コンテンツ無し（content=''）なので本文は保持せず索引だけを持つ。
-- contentless_delete=1 で DELETE 文が使えるようにする（SQLite 3.43+）。
-- rowid は pages の rowid をそのまま使い、検索結果から pages を引く。
CREATE VIRTUAL TABLE pages_fts USING fts5(
  title, body, content='', contentless_delete=1, tokenize='trigram'
);

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
          <h3>設計の要点</h3>
          <p>
            <code>pages.parent_id</code> が <code>pages(id)</code> を参照する <Term en="self-referencing">自己参照</Term>で、ページの入れ子を表します。ルートのページは <code>parent_id</code> が <code>NULL</code> です。同じ親を持つページの並び順は <code>position</code> で持ち、<code>(parent_id, position)</code> に索引を張って「ある親の子を順に取る」問い合わせを速くしています。
          </p>
          <p>
            本文は <code>pages.content</code> に、BlockNote のドキュメント（<code>Block[]</code>）を JSON 文字列のまま丸ごと保存します。ブロックごとのテーブルは作りません。エディタの内部表現をそのまま保存すれば、読み込み時に変換が要らず、ブロックの種類が増えてもスキーマを変えずに済むからです。代わりに、本文を SQL で検索することはできなくなります。この穴を埋めるのが <code>pages_fts</code> です。保存のたびに Rust 側が JSON から本文テキストを取り出し、FTS5 の索引を作り直します（<ChapterLink n={46} />）。<code>content=''</code> は索引だけを持ち本文を持たない設定で、<code>contentless_delete=1</code> を付けると <code>DELETE</code> 文が使えます。<Ref n={4} />
          </p>
          <p>
            簡易データベースは、1ページに1つの <code>databases</code> を付け、列の定義を <code>db_properties</code>、行を <code>db_rows</code> に持ちます。行の値は <code>"values"</code> 列に <code>{'{'}propertyId: value{'}'}</code> の JSON で保存します。列が増減するたびにテーブルを変更しないためです。並べ替えと絞り込みの設定は <code>db_views</code> に JSON で保存します（<ChapterLink n={47} />、<ChapterLink n={48} />）。
          </p>
          <p>
            主キーはすべて <code>TEXT</code> で、Rust 側が UUID v4 を生成します。時刻は <code>TEXT</code> の RFC 3339 形式（ミリ秒、UTC）です。SQLite には専用の日時型がないため、文字列で持って辞書順で比較できる形式を選んでいます。
          </p>
        </>
      ),
    },
    {
      id: 'ipc-contract',
      title: 'IPC の契約：型とエラー',
      body: (
        <>
          <p>
            フロントエンドと Rust 側は JSON でやり取りします（<ChapterLink n={34} />）。境界をまたぐ型は、<code>lib/types.ts</code> で Rust の <code>struct</code> と手でそろえます。Rust 側の構造体には <code>rename_all</code> を付けていないので、フィールド名は <code>snake_case</code> のまま JSON に出ます。TypeScript 側もそれに合わせます。
          </p>
          <Code
            lang="ts"
            title="src/lib/types.ts（抜粋）"
            code={`
// Rust 側（src-tauri/core）の struct と手でそろえる型。
// serde はフィールド名をそのまま使うので snake_case のまま。

export type Page = {
  id: string;
  parent_id: string | null;
  title: string;
  /** BlockNote の Block[] JSON 文字列 */
  content: string;
  icon: string | null;
  position: number;
  created_at: string;
  updated_at: string;
};

export type PageSummary = Pick<Page, "id" | "parent_id" | "title" | "icon" | "position">;
`}
          />
          <p>
            一方、コマンドの引数名は既定で <code>camelCase</code> に変換されます。公式ドキュメントは「引数は camelCase のキーを持つ JSON オブジェクトとして渡す」と述べています。<Ref n={5} /> つまり、Rust の引数 <code>parent_id</code> は <code>invoke</code> では <code>parentId</code> と書き、戻り値の構造体のフィールド <code>parent_id</code> は <code>parent_id</code> のまま返ってきます。この非対称は混乱のもとなので、<code>lib/ipc.ts</code> の先頭にコメントで明記し、<code>invoke</code> をこのファイルに閉じ込めています。
          </p>
          <Code
            lang="ts"
            title="src/lib/ipc.ts（抜粋）"
            code={`
// Tauri コマンドの型付きラッパー。invoke を直接呼ぶのはこのファイルだけにする。
// 引数のキーは Rust の snake_case 引数が camelCase に変換されたもの（parent_id → parentId）。
import { invoke } from "@tauri-apps/api/core";

// ---- pages ----
export const listPages = () => invoke<PageSummary[]>("list_pages");
export const getPage = (id: string) => invoke<Page>("get_page", { id });
export const createPage = (parentId: string | null, title: string) =>
  invoke<Page>("create_page", { parentId, title });
`}
          />
          <h3>エラーは1つの型にまとめて文字列で送る</h3>
          <p>
            コマンドが返すエラーは、<ChapterLink n={34} /> で学んだとおり <code>serde::Serialize</code> を実装している必要があります。<Ref n={5} /> Tsumugi では <code>AppError</code> という1つの列挙型にまとめ、<code>to_string()</code> の結果を文字列として送ります。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/error.rs"
            code={`
//! コマンドが返すエラー。Tauri は \`Err\` を serde でシリアライズして
//! フロントエンドの Promise を reject するので、Serialize が必須。

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error(transparent)]
    Core(#[from] tsumugi_core::Error),
    #[error("ファイル操作に失敗しました: {0}")]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
    #[error("内部エラー: {0}")]
    Internal(String),
}

impl serde::Serialize for AppError {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        // フロントエンドには文字列として届く（catch (e) { String(e) }）
        serializer.serialize_str(&self.to_string())
    }
}

pub type AppResult<T> = Result<T, AppError>;
`}
          />
          <p>
            <code>#[error(transparent)]</code> は、包んでいる内側のエラーの <code>Display</code> をそのまま使う指定です。<Ref n={6} /> core の <code>Error</code> が「見つかりません: page xxx」という日本語のメッセージを持っているので、それがそのままフロントエンドに届きます。フロントエンドでは、文字列として届いたエラーをトーストに表示する小さな関数を <code>lib/toast.tsx</code> に用意し、すべての <code>catch</code> から呼びます（<ChapterLink n={50} />）。
          </p>
          <Code
            lang="tsx"
            title="src/lib/toast.tsx（抜粋）"
            code={`
/** コマンドのエラーは文字列（AppError の Serialize）で届く */
export function errorMessage(e: unknown): string {
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  return String(e);
}

export function toastError(e: unknown) {
  toast(errorMessage(e), "error");
}
`}
          />
          <p>
            エラーの種類をフロントエンドで区別したい場合は、<ChapterLink n={34} /> で見た「種類付きの列挙型として直列化する」方法に差し替えられます。Tsumugi では、エラーの扱いが「トーストに出す」だけなので、文字列で十分と判断しました。
          </p>
        </>
      ),
    },
    {
      id: 'simplifications',
      title: '本書での簡略化と拡張の方向',
      body: (
        <>
          <p>
            Tsumugi は教材なので、意図的に単純にしている箇所があります。コード中では <code>ponytail:</code> というコメントで印を付けています。設計の段階で把握しておくべきものを挙げます。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>簡略化</th>
                  <th>影響</th>
                  <th>拡張するなら</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SQLite の接続を1つだけ持ち、<code>Mutex</code> で直列化する</td>
                  <td>コマンドは1つずつ順に実行される。ローカルの1ユーザーなら体感できる遅れはない</td>
                  <td>読み取り用の接続を複数持つ（接続プール）。WAL モードなら読み取りと書き込みが並行できる（<ChapterLink n={42} />）</td>
                </tr>
                <tr>
                  <td>ページ一覧は操作のたびに全件取り直す</td>
                  <td>ページ数が数千を超えると再描画が重くなる可能性がある</td>
                  <td>変更された部分だけを state に反映する、仮想リストを使う</td>
                </tr>
                <tr>
                  <td>本文は <code>Block[]</code> JSON を丸ごと保存する</td>
                  <td>1文字の変更でも本文全体を書き込む。SQL で本文の一部を扱えない</td>
                  <td>変更差分の保存、ブロック単位のテーブル、CRDT（<ChapterLink n={58} />）</td>
                </tr>
                <tr>
                  <td>Markdown の入れ子は平坦化する</td>
                  <td>子ブロックを持つリストが書き出し時に1階層に崩れる</td>
                  <td>インデント付きの書き出しと、読み込み時の階層復元（<ChapterLink n={49} />）</td>
                </tr>
                <tr>
                  <td>簡易データベースの絞り込みは、画面からは1条件だけ設定できる（Rust 側は条件の配列を AND でつなぐ）</td>
                  <td>OR や入れ子の組み合わせができない</td>
                  <td>条件の木を JSON で持ち、パラメータ化した SQL に再帰的に変換する（<ChapterLink n={48} />）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            これらはどれも「後から直せる」種類の簡略化です。逆に、後から直しにくいもの、つまりテーブルの主キーの型、本文を JSON で持つという決定、core とコマンド層の分離は、この章で先に決めました。設計で時間をかけるべきなのは、この「後から直しにくい」部分です。
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
            <li>Tsumugi の機能範囲は、ページの入れ子、ブロック編集、全文検索、簡易データベース、Markdown、仕上げの6群で、第42〜50章で順に作る。</li>
            <li>処理の置き場所は「永続化と整合性は Rust 側」「公式プラグインで済む OS 操作はフロントエンドから直接」「表示と編集中の状態はフロントエンド」の順で決める。</li>
            <li>Rust 側は Tauri に依存しない <code>tsumugi-core</code> と薄いコマンド層に分け、core は <code>cargo test</code> で検証する。コマンドは <code>with_db</code> でロックを取って core を呼ぶ。</li>
            <li>データは6つのテーブルに持ち、<code>pages</code> は自己参照で木を作り、本文は <code>content</code> に Block[] JSON を丸ごと保存し、<code>pages_fts</code> で検索を補う。</li>
            <li>境界の型は <code>lib/types.ts</code> で手でそろえ（フィールドは snake_case、コマンド引数は camelCase）、エラーは <code>AppError</code> を文字列化してトーストに出す。</li>
          </ul>
          <p>次章では、この設計の土台になる Rust のデータ層、すなわち rusqlite の接続、マイグレーション、リポジトリ関数、テストを実装します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Process Model',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/process-model/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Core プロセスが OS への完全なアクセスを持つ唯一の構成要素であること、ビジネスロジックを Core に寄せて攻撃面を小さくする勧め、IPC がすべて Core を経由することの根拠。',
    },
    {
      title: 'Workspaces — The Cargo Book',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/cargo/reference/workspaces.html',
      accessed: '2026-11-08',
      note: 'ワークスペースの定義、members キー、[package] と同居する場合のルートパッケージ、Cargo.lock と target の共有の根拠。',
    },
    {
      title: 'State Management',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/state-management/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'setup 内の app.manage、標準ライブラリの Mutex で十分であること、ガードを .await をまたいで持つ場合だけ非同期 Mutex が必要なことの根拠。',
    },
    {
      title: 'SQLite FTS5 Extension',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/fts5.html',
      accessed: '2026-11-08',
      note: "contentless テーブル（content=''）と contentless_delete=1（SQLite 3.43.0 以降）で DELETE が使えること、trigram トークナイザの根拠。",
    },
    {
      title: 'Calling Rust from the Frontend',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'コマンド引数が camelCase のキーで渡されること、戻り値とエラーが serde::Serialize を実装する必要があることの根拠。',
    },
    {
      title: 'thiserror — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/thiserror/latest/thiserror/',
      accessed: '2026-11-08',
      version: 'thiserror 2',
      note: '#[error(transparent)] が内側のエラーの Display と source を転送すること、#[from] が From 実装を生成することの根拠。',
    },
  ],
}

export default chapter
