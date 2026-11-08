import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 43-1 平坦な一覧から木を組み立てる ---------- */
function ListToTreeFigure() {
  const rows = [
    ['A', 'NULL', '0'],
    ['B', 'NULL', '1'],
    ['A-1', 'A', '0'],
    ['A-2', 'A', '1'],
    ['B-1', 'B', '0'],
  ]
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="左に Rust が返す平坦なページ一覧の表（id、parent_id、position）、右にフロントエンドが組み立てた木構造。PageTree が parentId=null で始まり、childrenOf で A と B を取り出し、各項目の下で PageTree を parentId=自分の id で再帰的に呼ぶ">
      <defs>
        <marker id="arrow43a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="130" y="26" fontSize="14" fontWeight="600" textAnchor="middle">list_pages の戻り値（平坦）</text>
      <g fontSize="12" fontFamily="monospace">
        <rect x="20" y="40" width="245" height="26" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="50" y="58">id</text>
        <text x="120" y="58">parent_id</text>
        <text x="195" y="58">position</text>
        {rows.map((r, i) => (
          <g key={i}>
            <rect x="20" y={66 + i * 26} width="245" height="26" fill="var(--fig-bg)" stroke="var(--fig-line)" />
            <text x="50" y={84 + i * 26}>{r[0]}</text>
            <text x="120" y={84 + i * 26}>{r[1]}</text>
            <text x="195" y={84 + i * 26}>{r[2]}</text>
          </g>
        ))}
      </g>
      <text x="130" y="220" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">ORDER BY parent_id, position</text>

      <path d="M270,130 L300,130" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow43a)" />
      <text x="275" y="118" fontSize="12" fill="var(--fig-accent)" textAnchor="middle">childrenOf</text>

      <text x="470" y="26" fontSize="14" fontWeight="600" textAnchor="middle">サイドバーの木（React）</text>
      <g fontSize="12">
        <rect x="320" y="40" width="300" height="24" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="330" y="56">PageTree parentId=null → [A, B]</text>

        <rect x="340" y="72" width="280" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="350" y="88">TreeItem A</text>
        <rect x="360" y="104" width="260" height="24" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="370" y="120">PageTree parentId=A → [A-1, A-2]</text>
        <rect x="380" y="136" width="240" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="390" y="152">TreeItem A-1（子なし）</text>
        <rect x="380" y="168" width="240" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="390" y="184">TreeItem A-2（子なし）</text>

        <rect x="340" y="200" width="280" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="350" y="216">TreeItem B</text>
        <rect x="360" y="232" width="260" height="24" rx="4" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="370" y="248">PageTree parentId=B → [B-1]</text>
        <rect x="380" y="264" width="240" height="24" rx="4" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="390" y="280">TreeItem B-1（子なし）</text>
      </g>
      <text x="320" y="310" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">青：PageTree（1階層 = 1つの ul）　橙：TreeItem（1行）　模式図</text>
    </svg>
  )
}

/* ---------- 図 43-2 移動時の循環チェック ---------- */
function CycleCheckFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="移動時の循環チェック。左の木では A の下に A-1、その下に A-1-1 があり、B が別のルートにある。A を A-1-1 の下へ移す要求は、descendants(A) に A-1-1 が含まれるので拒否される。B を A-1 の下へ移す要求は、descendants(B) に A-1 が含まれないので許可される">
      <defs>
        <marker id="arrow43b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      {/* tree */}
      <g fontSize="13" textAnchor="middle">
        <rect x="40" y="30" width="80" height="32" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="80" y="51">A</text>
        <rect x="80" y="90" width="80" height="32" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="120" y="111">A-1</text>
        <rect x="120" y="150" width="80" height="32" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="171">A-1-1</text>
        <rect x="40" y="220" width="80" height="32" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="80" y="241">B</text>
        <line x1="80" y1="62" x2="110" y2="90" stroke="var(--fig-line)" strokeWidth="1.5" />
        <line x1="120" y1="122" x2="150" y2="150" stroke="var(--fig-line)" strokeWidth="1.5" />
      </g>
      <text x="120" y="282" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">現在の木</text>

      {/* case 1 */}
      <rect x="250" y="24" width="370" height="110" rx="8" fill="var(--fig-bg)" stroke="var(--fig-danger)" />
      <text x="435" y="46" fontSize="13" fontWeight="600" textAnchor="middle">要求1：A を A-1-1 の下へ</text>
      <text x="435" y="70" fontSize="12" textAnchor="middle" fontFamily="monospace">descendants(A) = [A, A-1, A-1-1]</text>
      <text x="435" y="92" fontSize="12" textAnchor="middle">new_parent = A-1-1 が含まれる</text>
      <text x="435" y="116" fontSize="12" fontWeight="600" textAnchor="middle" fill="var(--fig-danger)">→ Error::Invalid（拒否）</text>
      <path d="M200,166 C230,166 240,60 248,60" fill="none" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrow43b)" />

      {/* case 2 */}
      <rect x="250" y="160" width="370" height="110" rx="8" fill="var(--fig-bg)" stroke="var(--fig-line)" />
      <text x="435" y="182" fontSize="13" fontWeight="600" textAnchor="middle">要求2：B を A-1 の下へ</text>
      <text x="435" y="206" fontSize="12" textAnchor="middle" fontFamily="monospace">descendants(B) = [B]</text>
      <text x="435" y="228" fontSize="12" textAnchor="middle">new_parent = A-1 は含まれない</text>
      <text x="435" y="252" fontSize="12" fontWeight="600" textAnchor="middle">→ 兄弟の中へ差し込んで position を振り直す</text>
      <path d="M120,236 L248,236" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow43b)" />

      <text x="320" y="292" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線（赤枠）：拒否される移動　実線：許可される移動</text>
    </svg>
  )
}

/* ---------- 図 43-3 position の振り直し ---------- */
function ReorderFigure() {
  const box = (x: number, y: number, label: string, pos: string, fill: string) => (
    <g>
      <rect x={x} y={y} width="70" height="40" rx="6" fill={fill} stroke="var(--fig-line)" />
      <text x={x + 35} y={y + 18} fontSize="13" textAnchor="middle">{label}</text>
      <text x={x + 35} y={y + 33} fontSize="11" textAnchor="middle" fill="var(--fig-muted)">{pos}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 640 230" role="img" aria-label="move_page の position 振り直しを3段で示す。移動先の兄弟から自分を除いた列を取り出し、指定した位置に自分を差し込み、先頭から 0、1、2 と番号を振り直す">
      <defs>
        <marker id="arrow43c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <text x="20" y="38">1. 移動先の兄弟（自分 C を除く）</text>
        {box(260, 18, 'A', 'pos 0', 'var(--fig-box)')}
        {box(340, 18, 'B', 'pos 1', 'var(--fig-box)')}
        {box(420, 18, 'D', 'pos 2', 'var(--fig-box)')}

        <path d="M320,62 L320,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow43c)" />
        <text x="20" y="108">2. position = 1 に C を差し込む</text>
        {box(260, 88, 'A', '', 'var(--fig-box)')}
        {box(340, 88, 'C', '挿入', 'var(--fig-box2)')}
        {box(420, 88, 'B', '', 'var(--fig-box)')}
        {box(500, 88, 'D', '', 'var(--fig-box)')}

        <path d="M320,132 L320,150" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow43c)" />
        <text x="20" y="178">3. 先頭から 0.. で振り直して UPDATE</text>
        {box(260, 158, 'A', 'pos 0', 'var(--fig-box4)')}
        {box(340, 158, 'C', 'pos 1', 'var(--fig-box4)')}
        {box(420, 158, 'B', 'pos 2', 'var(--fig-box4)')}
        {box(500, 158, 'D', 'pos 3', 'var(--fig-box4)')}
      </g>
      <text x="320" y="220" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">position.min(len) で末尾を超える指定は末尾に丸める。全体を1つのトランザクションで行う</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 43,
  part: 6,
  title: 'ページ管理とサイドバー',
  summary:
    'ページの作成・改名・移動・削除を行うコマンドと、それを呼ぶ React のサイドバーを作ります。Rust 側は親子関係と並び順を parent_id と position で管理し、再帰 CTE で子孫を求めて循環を防ぎ、子孫ごと削除します。フロントエンドは平坦な一覧から木を組み立て、再帰コンポーネントで描き、HTML のドラッグ＆ドロップで移動を指示します。',
  goals: [
    'ページの CRUD コマンドを State と with_db で書き、lib/ipc.ts から型付きで呼べる',
    'parent_id と position で親子関係と並び順を表し、平坦な一覧から木を組み立てられる',
    '再帰コンポーネントでツリーを描き、key の役割を説明できる',
    '再帰 CTE で子孫を求め、自分の子孫の下への移動を拒否する理由を説明できる',
    'HTML のドラッグ＆ドロップ API で「前に置く」「中に入れる」を区別して移動を指示できる',
    'usePages フックで「Rust に頼んで一覧を取り直す」という単純な更新の形を実装できる',
  ],
  prerequisites: [8, 9, 12, 13, 34, 38, 41, 42],
  sections: [
    {
      id: 'what-we-build',
      title: 'この章で作るもの',
      body: (
        <>
          <p>
            この章では、Tsumugi の左側に常に表示されるサイドバーと、その裏側のページ操作を作ります。サイドバーにはページが木構造で並び、クリックで開き、「+」で子ページを作り、「×」で削除し、ドラッグで別の場所へ移せます。対象のファイルは、Rust 側が <code>core/src/pages.rs</code>（<ChapterLink n={42} /> の続き）と <code>src-tauri/src/commands/pages.rs</code>、フロントエンドが <code>features/pages/</code> の <code>usePages.ts</code>、<code>PageTree.tsx</code>、<code>Sidebar.tsx</code> です。
          </p>
          <p>
            設計上の分担は <ChapterLink n={41} /> で決めたとおりです。「どのページがどの親の何番目か」という整合性は Rust 側が守り、「それを木として描く」のはフロントエンドの仕事です。Rust 側が返すのはあくまで平坦な一覧で、木の形はフロントエンドで組み立てます。この分担にすると、Rust 側の関数は SQL の1回の問い合わせで済み、フロントエンドは好きな形（木、パンくず、検索結果）に組み替えられます。
          </p>
        </>
      ),
    },
    {
      id: 'commands',
      title: 'CRUD コマンドと型付きラッパー',
      body: (
        <>
          <p>
            コマンド層はすべて同じ形です。<code>State&lt;'_, Db&gt;</code> を受け取り、<code>with_db</code>（<ChapterLink n={41} />）でロックを取り、core の関数にそのまま渡します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/commands/pages.rs"
            code={`
use tauri::State;
use tsumugi_core::pages::{self, Page, PageSummary};

use super::with_db;
use crate::{Db, error::AppResult};

// 引数名は JS 側で camelCase になる（parent_id → parentId）

#[tauri::command]
pub fn list_pages(db: State<'_, Db>) -> AppResult<Vec<PageSummary>> {
    with_db(&db, pages::list)
}

#[tauri::command]
pub fn get_page(db: State<'_, Db>, id: String) -> AppResult<Page> {
    with_db(&db, |c| pages::get(c, &id))
}

#[tauri::command]
pub fn create_page(db: State<'_, Db>, parent_id: Option<String>, title: String) -> AppResult<Page> {
    with_db(&db, |c| pages::create(c, parent_id.as_deref(), &title))
}

#[tauri::command]
pub fn rename_page(db: State<'_, Db>, id: String, title: String) -> AppResult<()> {
    with_db(&db, |c| pages::rename(c, &id, &title))
}

#[tauri::command]
pub fn save_page_content(db: State<'_, Db>, id: String, content: String) -> AppResult<()> {
    with_db(&db, |c| pages::save_content(c, &id, &content))
}

#[tauri::command]
pub fn set_page_icon(db: State<'_, Db>, id: String, icon: Option<String>) -> AppResult<()> {
    with_db(&db, |c| pages::set_icon(c, &id, icon.as_deref()))
}

#[tauri::command]
pub fn move_page(
    db: State<'_, Db>,
    id: String,
    parent_id: Option<String>,
    position: usize,
) -> AppResult<()> {
    with_db(&db, |c| {
        pages::move_page(c, &id, parent_id.as_deref(), position)
    })
}

#[tauri::command]
pub fn delete_page(db: State<'_, Db>, id: String) -> AppResult<()> {
    with_db(&db, |c| pages::delete(c, &id))
}
`}
          />
          <p>
            <code>list_pages</code> だけはクロージャを書かず、関数名 <code>pages::list</code> をそのまま渡しています。<code>pages::list</code> の型が <code>fn(&amp;Connection) -&gt; Result&lt;Vec&lt;PageSummary&gt;&gt;</code> で、<code>with_db</code> が要求する <code>FnOnce(&amp;Connection) -&gt; Result&lt;T&gt;</code> にそのまま一致するからです（<ChapterLink n={27} />）。<code>parent_id.as_deref()</code> は <code>Option&lt;String&gt;</code> を <code>Option&lt;&amp;str&gt;</code> に変える定番の書き方で、core の関数が借用で受け取れるようにしています（<ChapterLink n={20} />）。
          </p>
          <p>
            冒頭のコメントにあるとおり、引数名は JavaScript 側で camelCase になります。公式ドキュメントは「引数は camelCase のキーを持つ JSON オブジェクトとして渡す」と述べています。<Ref n={1} /> フロントエンドの <code>lib/ipc.ts</code> はこの変換を吸収する場所です。
          </p>
          <Code
            lang="ts"
            title="src/lib/ipc.ts（抜粋）"
            code={`
// ---- pages ----
export const listPages = () => invoke<PageSummary[]>("list_pages");
export const getPage = (id: string) => invoke<Page>("get_page", { id });
export const createPage = (parentId: string | null, title: string) =>
  invoke<Page>("create_page", { parentId, title });
export const renamePage = (id: string, title: string) => invoke<void>("rename_page", { id, title });
export const savePageContent = (id: string, content: string) =>
  invoke<void>("save_page_content", { id, content });
export const setPageIcon = (id: string, icon: string | null) =>
  invoke<void>("set_page_icon", { id, icon });
export const movePage = (id: string, parentId: string | null, position: number) =>
  invoke<void>("move_page", { id, parentId, position });
export const deletePage = (id: string) => invoke<void>("delete_page", { id });
`}
          />
          <p>
            Rust 側の <code>Option&lt;String&gt;</code> は TypeScript 側で <code>string | null</code> に対応します。<code>undefined</code> ではなく <code>null</code> を使うのは、JSON に <code>undefined</code> という値がなく、キーごと消えてしまうからです。<code>null</code> なら JSON に <code>null</code> として残り、serde が <code>None</code> に変換します（<ChapterLink n={34} />）。
          </p>
        </>
      ),
    },
    {
      id: 'parent-position',
      title: '親子関係と並び順',
      body: (
        <>
          <p>
            木構造を SQL のテーブルで表す方法はいくつかありますが、Tsumugi はいちばん単純な <Term en="adjacency list">隣接リスト</Term>、つまり各行が親の id を持つ形を使います。<code>pages.parent_id</code> がそれで、ルートは <code>NULL</code> です。同じ親の子の並び順は <code>position</code>（0 始まりの整数）で持ちます。
          </p>
          <p>
            <ChapterLink n={42} /> で見たとおり、ページを作るときの <code>position</code> は「同じ親の中の最大値 + 1」で、一覧は <code>ORDER BY parent_id, position</code> で返します。つまり Rust 側は「どの親の、何番目か」という情報だけを提供し、木そのものは返しません。この一覧を木にするのが、フロントエンドの <code>childrenOf</code> です。
          </p>
          <Code
            lang="ts"
            title="src/features/pages/usePages.ts（抜粋）"
            code={`
export const childrenOf = (pages: PageSummary[], parentId: string | null) =>
  pages.filter((p) => p.parent_id === parentId).sort((a, b) => a.position - b.position);
`}
          />
          <p>
            たった1行ですが、これが木を組み立てる関数です。「この親の子を、position 順に」返すだけで、それを再帰的に呼べば木になります。図 43-1 で、平坦な一覧がどう木に変わるかを追ってください。
          </p>
          <Figure n="43-1" title="平坦な一覧から木を組み立てる" caption="左は list_pages が返す平坦な一覧。右は PageTree が parentId=null から始めて childrenOf で子を取り出し、各 TreeItem の下で PageTree を再帰的に呼んだ結果。木の形は Rust 側ではなくフロントエンドで決まる。模式図。">
            <ListToTreeFigure />
          </Figure>
          <p>
            図 43-1 の右側で、青い <code>PageTree</code> と橙の <code>TreeItem</code> が交互に入れ子になっているのが再帰の形です。1階層が1つの <code>&lt;ul&gt;</code> に対応し、子を持つ行の下にだけ次の <code>&lt;ul&gt;</code> が現れます。
          </p>
        </>
      ),
    },
    {
      id: 'recursive-component',
      title: '再帰コンポーネントでツリーを描く',
      body: (
        <>
          <p>
            <ChapterLink n={8} /> では、コンポーネントが別のコンポーネントを含められることを学びました。コンポーネントは関数なので、自分自身を含むこともできます。これが<Term en="recursive component">再帰コンポーネント</Term>で、木構造の表示にちょうど合います。
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageTree.tsx（抜粋）"
            code={`
/** 再帰でツリーを描く。1 階層 = 1 つの <ul>。 */
export function PageTree({ pages, api, parentId, selectedId, onSelect, depth = 0 }: Props) {
  const items = childrenOf(pages, parentId);
  return (
    <ul className="tree" style={{ paddingLeft: depth === 0 ? 0 : 12 }}>
      {items.map((page) => (
        <TreeItem
          key={page.id}
          page={page}
          pages={pages}
          api={api}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth}
        />
      ))}
    </ul>
  );
}
`}
          />
          <p>
            <code>PageTree</code> は「ある親の子を1階層分描く」部品です。各子は <code>TreeItem</code> に渡し、<code>TreeItem</code> は自分に子がいれば、その下で <code>PageTree</code> を <code>parentId={'{page.id}'}</code> で呼びます。再帰が止まるのは、<code>childrenOf</code> が空配列を返す葉のページです。
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageTree.tsx（抜粋：TreeItem の描画部分）"
            code={`
  return (
    <li>
      <div
        className={\`tree-row \${selectedId === page.id ? "selected" : ""} \${over ? \`drop-\${over}\` : ""}\`}
        draggable
        onDragStart={onDragStart}
        onDragOver={(e) => allowDrop(e, "before")}
        onDragLeave={() => setOver(null)}
        onDrop={(e) => onDrop(e, "before")}
      >
        <button
          className="tree-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "折りたたむ" : "展開する"}
          style={{ visibility: hasChildren ? "visible" : "hidden" }}
        >
          {open ? "▾" : "▸"}
        </button>
        <button className="tree-title" onClick={() => onSelect(page.id)}>
          <span className="tree-icon">{page.icon ?? "📄"}</span>
          {page.title || "無題"}
        </button>
        <span
          className="tree-nest"
          title="ここへドロップで子ページにする"
          onDragOver={(e) => allowDrop(e, "inside")}
          onDragLeave={() => setOver(null)}
          onDrop={(e) => onDrop(e, "inside")}
        >
          ⤵
        </span>
        <button className="tree-action" title="子ページを追加" onClick={() => void api.create(page.id)}>
          +
        </button>
        <button className="tree-action" title="削除" onClick={() => void remove()}>
          ×
        </button>
      </div>
      {open && hasChildren && (
        <PageTree
          pages={pages}
          api={api}
          parentId={page.id}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth + 1}
        />
      )}
    </li>
  );
`}
          />
          <p>
            <code>key={'{page.id}'}</code> には、データベースの id をそのまま使います。react.dev は、key は「配列のどの項目がどのコンポーネントに対応するかを React に伝える」もので、項目が並べ替えや挿入・削除で動くときに重要だと説明し、兄弟の中で一意で、変化しないことを求めています。<Ref n={2} /> ページの移動で順番が変わっても、id は変わらないので、折りたたみ状態（<code>open</code>）がページに付いて回ります。配列の添字を key にすると、並べ替えのたびに状態がずれます。
          </p>
          <p>
            折りたたみの状態 <code>open</code> は、Rust 側には保存しない「表示のための状態」です（<ChapterLink n={41} /> の3段目）。<ChapterLink n={9} /> の <code>useState</code> で各 <code>TreeItem</code> が自分の分を持ちます。
          </p>
        </>
      ),
    },
    {
      id: 'use-pages',
      title: 'usePages フック：頼んで、取り直す',
      body: (
        <>
          <p>
            ページ一覧と、それを変更する操作は <ChapterLink n={13} /> のカスタムフック <code>usePages</code> にまとめます。方針は1つだけです。どの操作も「Rust に頼み、終わったら一覧を取り直す」。
          </p>
          <Code
            lang="ts"
            title="src/features/pages/usePages.ts（抜粋）"
            code={`
/** ページ一覧（ツリーの元データ）と、それを更新する操作。 */
export function usePages() {
  const [pages, setPages] = useState<PageSummary[]>([]);

  const reload = useCallback(async () => {
    try {
      setPages(await ipc.listPages());
    } catch (e) {
      toastError(e);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  // 各操作は「Rust に頼む → 一覧を取り直す」の単純な形にそろえる
  const run = async <T,>(op: () => Promise<T>): Promise<T | undefined> => {
    try {
      const r = await op();
      await reload();
      return r;
    } catch (e) {
      toastError(e);
      return undefined;
    }
  };

  return {
    pages,
    reload,
    create: (parentId: string | null, title = "無題") => run(() => ipc.createPage(parentId, title)),
    rename: (id: string, title: string) => run(() => ipc.renamePage(id, title)),
    setIcon: (id: string, icon: string | null) => run(() => ipc.setPageIcon(id, icon)),
    move: (id: string, parentId: string | null, position: number) =>
      run(() => ipc.movePage(id, parentId, position)),
    remove: (id: string) => run(() => ipc.deletePage(id)),
  };
}

export type PagesApi = ReturnType<typeof usePages>;
`}
          />
          <p>
            <code>run</code> は、操作を受け取って実行し、成功したら <code>reload</code> で一覧を取り直し、失敗したらトーストに出して <code>undefined</code> を返す小さなラッパーです。<code>&lt;T,&gt;</code> の末尾のカンマは、<code>.tsx</code> ファイルで型引数を JSX タグと区別するための書き方です（<ChapterLink n={6} />）。
          </p>
          <p>
            この形の利点は、フロントエンドが「移動したら position がどう変わるか」を知らなくてよいことです。Rust 側が <code>position</code> を振り直し、フロントエンドはその結果を取り直すだけです。欠点は、操作のたびに一覧全体を読み直すことで、ページが数千を超えると気になるかもしれません。この章の最後で拡張の方向を述べます。
          </p>
          <p>
            <code>useEffect</code> で初回に <code>reload</code> を呼ぶのは、<ChapterLink n={12} /> で学んだ「外部からのデータ取得」の形です。<code>reload</code> を <code>useCallback</code> で固定しているので、依存配列に入れても毎回の再描画で再実行されることはありません。
          </p>
          <p>
            戻り値の型 <code>PagesApi</code> は <code>ReturnType&lt;typeof usePages&gt;</code> で導出しています（<ChapterLink n={6} /> のユーティリティ型）。<code>Sidebar</code> や <code>PageTree</code> は <code>api: PagesApi</code> として受け取り、<code>App.tsx</code> が1回だけ呼んだ <code>usePages()</code> の結果を props で配ります。
          </p>
        </>
      ),
    },
    {
      id: 'move',
      title: 'ページの移動と循環防止',
      body: (
        <>
          <p>
            移動は、この章でいちばん注意が要る操作です。「A を A 自身の子孫の下へ移す」と、A から親をたどっても A に戻ってきてしまい、木が壊れます。これを<Term en="cycle">循環</Term>と呼び、Rust 側で必ず拒否します。そのために「あるページの子孫すべて」を求める関数が必要です。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
/// 自分自身と全ての子孫の id を返す。浅い順に並び、先頭は自分。
pub fn descendants(conn: &Connection, id: &str) -> Result<Vec<String>> {
    // 再帰 CTE の取り出し順は未定義なので、深さを持たせて ORDER BY で順序を保証する
    let mut stmt = conn.prepare(
        "WITH RECURSIVE tree(id, depth) AS (
           SELECT id, 0 FROM pages WHERE id = ?1
           UNION ALL
           SELECT p.id, tree.depth + 1 FROM pages p JOIN tree ON p.parent_id = tree.id
         ) SELECT id FROM tree ORDER BY depth",
    )?;
    let ids = stmt.query_map([id], |r| r.get(0))?;
    Ok(ids.collect::<rusqlite::Result<_>>()?)
}
`}
          />
          <p>
            <code>WITH RECURSIVE</code> は<Term en="recursive common table expression">再帰 CTE</Term>で、SQLite の解説は「木やグラフの階層的・再帰的な問い合わせを行う能力で、SQL には本来ない」機能だと述べています。<Ref n={3} /> 形は「初期 SELECT <code>UNION ALL</code> 再帰 SELECT」で、初期 SELECT の結果をキューに入れ、キューから1行ずつ取り出して再帰 SELECT を実行し、その結果をまたキューに足す、という手順で処理されます。<Ref n={3} /> ここでは、初期 SELECT が自分自身、再帰 SELECT が「<code>parent_id</code> がすでに集めた id のいずれかであるページ」です。子、孫、ひ孫と、キューが空になるまで広がります。これを SQL なしで書くと、ページ全件を取ってから Rust でループすることになりますが、再帰 CTE なら1回の問い合わせで済みます。SQLite は <code>ORDER BY</code> を省略した再帰 CTE の取り出し順を未定義としているので、各行の深さを <code>depth</code> 列に持たせて、<code>ORDER BY depth</code> で浅い順に並べています。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
/// ページを別の親の下の position 番目へ移動する。自分の子孫の下には移動できない。
pub fn move_page(
    conn: &Connection,
    id: &str,
    new_parent: Option<&str>,
    position: usize,
) -> Result<()> {
    get(conn, id)?;
    if let Some(p) = new_parent
        && descendants(conn, id)?.iter().any(|d| d == p)
    {
        return Err(Error::Invalid(
            "自分自身や子孫の下には移動できません".into(),
        ));
    }
    let tx = conn.unchecked_transaction()?;
    // 移動先の兄弟（自分を除く）を取り出し、指定位置に差し込んで 0.. で振り直す
    let mut siblings: Vec<String> = {
        let mut stmt = tx
            .prepare("SELECT id FROM pages WHERE parent_id IS ?1 AND id <> ?2 ORDER BY position")?;
        let ids = stmt.query_map(params![new_parent, id], |r| r.get(0))?;
        ids.collect::<rusqlite::Result<_>>()?
    };
    siblings.insert(position.min(siblings.len()), id.to_owned());
    for (i, sid) in siblings.iter().enumerate() {
        tx.execute(
            "UPDATE pages SET parent_id = ?1, position = ?2 WHERE id = ?3",
            params![new_parent, i as i64, sid],
        )?;
    }
    tx.execute(
        "UPDATE pages SET updated_at = ?1 WHERE id = ?2",
        params![now(), id],
    )?;
    tx.commit()?;
    Ok(())
}
`}
          />
          <p>
            前半が循環チェックです。<code>descendants(id)</code> は自分自身を先頭に含むので、「自分の下へ」も「子孫の下へ」も同じ判定で弾けます。<code>if let ... &amp;&amp; ...</code> は <ChapterLink n={21} /> で触れた let チェーン（Rust 2024 edition）で、<code>Some</code> の取り出しと条件を1つの <code>if</code> に書いています。図 43-2 に、拒否される要求と許可される要求を並べました。
          </p>
          <Figure n="43-2" title="移動時の循環チェック" caption="A を自分の孫 A-1-1 の下へ移す要求は、descendants(A) に A-1-1 が含まれるので Error::Invalid で拒否される。B を A-1 の下へ移す要求は descendants(B) に A-1 が含まれないので通り、兄弟の中へ差し込まれる。模式図。">
            <CycleCheckFigure />
          </Figure>
          <p>
            後半が並び順の更新です。移動先の兄弟から自分を除いた列を取り、指定位置に自分を差し込み、先頭から番号を振り直して <code>UPDATE</code> します。図 43-3 に手順を示します。
          </p>
          <Figure n="43-3" title="move_page の position 振り直し" caption="兄弟から自分を除き、指定位置に差し込み、0 から番号を振り直す。position が兄弟の数を超えていれば末尾に丸める。複数の UPDATE を1つのトランザクションで行うので、途中で失敗しても半端な状態は残らない。">
            <ReorderFigure />
          </Figure>
          <p>
            複数行の <code>UPDATE</code> を <code>unchecked_transaction</code> で1つのトランザクションにまとめています。<ChapterLink n={42} /> で触れたとおり、<code>&amp;Connection</code> から開始でき、入れ子のトランザクションは実行時に SQLite のエラーになるメソッドです。<Ref n={4} /> <code>tx.commit()</code> を呼ばずに <code>tx</code> がスコープを抜けると（<code>?</code> で早期リターンした場合など）、ロールバックされます。<ChapterLink n={19} /> の drop が、ここでは「失敗したら元に戻す」という安全装置として働いています。
          </p>
          <p>
            この振る舞いは、<code>tests/pages.rs</code> の <code>move_reorders_and_prevents_cycles</code> で確認しています。C を先頭へ移すと並びが <code>["C", "A", "B"]</code> で <code>position</code> が <code>[0, 1, 2]</code> になること、B を A の下の先頭へ移すと A の子が <code>["B", "A-1"]</code> になること、A を自分の子 A-1 の下や A 自身の下へ移そうとすると <code>Err(Error::Invalid(_))</code> になることを <code>assert</code> しています。
          </p>
          <h3>フロントエンド：ドラッグ＆ドロップで移動を指示する</h3>
          <p>
            サイドバーでの移動は、ライブラリを足さずに HTML 標準の<Term en="HTML Drag and Drop API">ドラッグ＆ドロップ API</Term>で実装します。MDN によれば、任意の要素は <code>draggable="true"</code> でドラッグ可能になり、ドラッグデータは <code>dragstart</code> の中でだけ <code>dataTransfer.setData</code> で設定でき、要素は既定ではドロップ先にならず、<code>dragover</code> を <code>preventDefault()</code> で取り消すことでドロップ先になり、データを読めるのは（<code>dragstart</code> を除けば）<code>drop</code> の中だけです。<Ref n={5} />
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageTree.tsx（抜粋：D&D の処理）"
            code={`
const DRAG_TYPE = "application/x-tsumugi-page";

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData(DRAG_TYPE, page.id);
    e.dataTransfer.effectAllowed = "move";
  };
  const allowDrop = (e: DragEvent, zone: "before" | "inside") => {
    if (!e.dataTransfer.types.includes(DRAG_TYPE)) return;
    e.preventDefault();
    e.stopPropagation();
    setOver(zone);
  };
  const onDrop = (e: DragEvent, zone: "before" | "inside") => {
    e.preventDefault();
    e.stopPropagation();
    setOver(null);
    const id = e.dataTransfer.getData(DRAG_TYPE);
    if (!id || id === page.id) return;
    // 「前に置く」= 同じ親の、この行の前へ。「中に入れる」= 自分の子の末尾へ
    // 循環（自分の子孫の下へ移動）は Rust 側が拒否してトーストに出る
    if (zone === "before") {
      // move の position は「動かすページを除いた兄弟」の中の番号。page.position は
      // 動かすページを含む番号なので、同じ親の中で下へ動かすとずれる。除いてから探し直す
      const siblings = childrenOf(pages, page.parent_id).filter((p) => p.id !== id);
      void api.move(
        id,
        page.parent_id,
        siblings.findIndex((p) => p.id === page.id),
      );
    } else void api.move(id, page.id, childrenOf(pages, page.id).length);
  };
`}
          />
          <p>
            ドロップ先は2種類あります。行全体にドロップすると「この行の前に置く」、行の右端の「⤵」にドロップすると「この行の子にする」です。前者は、動かすページを除いた同じ親の兄弟の中でこの行が何番目かを求めて <code>api.move</code> に渡します。<code>page.position</code> をそのまま渡さないのは、それが動かすページ自身を数えた番号だからです。兄弟 A、B、C で A を C の前に置くとき、<code>page.position</code> の 2 を渡すと、A を除いた <code>[B, C]</code> の 2 番目、つまり末尾に入って <code>[B, C, A]</code> になってしまいます。除いてから探し直せば、C は 1 番目なので <code>[B, A, C]</code> になります。後者は <code>api.move(id, page.id, 子の数)</code>、つまり自分の子の末尾への要求になります。
          </p>
          <p>
            <code>allowDrop</code> で <code>dataTransfer.types</code> を確認しているのは、ファイルや文字列など、ページ以外のドラッグを受け付けないためです。MDN は、<code>types</code> はドラッグ中のどのイベントハンドラでも読めるが、データ本体は <code>dragstart</code> と <code>drop</code> でしか読めないと説明しています。<Ref n={6} /> だから <code>dragover</code> の時点では「種類」だけで判断し、id は <code>drop</code> で取り出します。独自の MIME 型 <code>application/x-tsumugi-page</code> を使うのはそのためです。<code>stopPropagation</code> は、入れ子の <code>&lt;li&gt;</code> で親の行にもイベントが伝わる（<ChapterLink n={4} /> のイベント伝播）のを止めています。
          </p>
          <p>
            循環のチェックはフロントエンドでは行いません。コメントにあるとおり、Rust 側が拒否して <code>Error::Invalid</code> のメッセージがトーストに出ます。同じ検査を2か所に書くと、片方だけ直して食い違う原因になります。整合性の検査はデータの隣に1か所、という <ChapterLink n={41} /> の方針どおりです。
          </p>
        </>
      ),
    },
    {
      id: 'delete',
      title: '子孫ごと削除する',
      body: (
        <>
          <p>
            ページを削除するときは、子孫もすべて消します。<code>descendants</code> がここでも活躍します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/core/src/pages.rs（抜粋）"
            code={`
/// ページと子孫、付随するデータベースをまとめて削除する。
pub fn delete(conn: &Connection, id: &str) -> Result<()> {
    let ids = descendants(conn, id)?;
    if ids.is_empty() {
        return Err(Error::NotFound(format!("page {id}")));
    }
    let tx = conn.unchecked_transaction()?;
    // 葉から順に消す（parent_id の外部キーがあるため逆順）
    for pid in ids.iter().rev() {
        tx.execute(
            "DELETE FROM db_rows WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute(
            "DELETE FROM db_properties WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute(
            "DELETE FROM db_views WHERE database_id IN (SELECT id FROM databases WHERE page_id = ?1)",
            [pid],
        )?;
        tx.execute("DELETE FROM databases WHERE page_id = ?1", [pid])?;
        tx.execute(
            "DELETE FROM pages_fts WHERE rowid = (SELECT rowid FROM pages WHERE id = ?1)",
            [pid],
        )?;
        tx.execute("DELETE FROM pages WHERE id = ?1", [pid])?;
    }
    tx.commit()?;
    Ok(())
}
`}
          />
          <p>
            <code>descendants</code> の結果は、<code>ORDER BY depth</code> により親が子より先に並びます。<Ref n={3} /> <code>.rev()</code> で逆順にすると、葉から順に消すことになります。<ChapterLink n={42} /> で <code>foreign_keys</code> を有効にしたため、子が残っている親を先に消そうとすると SQLite が拒否します。逆順はそれを避けるためです。各ページについて、簡易データベースの行・列・ビュー、データベース本体、全文検索の索引、最後にページ本体の順で消します。全文検索の索引 <code>pages_fts</code> は外部キーでつながっていないので、明示的に消す必要があります。
          </p>
          <p>
            フロントエンドでは、削除の前に確認ダイアログを出します。<ChapterLink n={38} /> で学んだ dialog プラグインの <code>ask</code> は、Yes と No のボタンを持つ質問ダイアログを表示して真偽値を返します。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageTree.tsx（抜粋）"
            code={`
  const remove = async () => {
    if (await ask(\`「\${page.title}」と配下のページを削除しますか？\`, { title: "削除", kind: "warning" })) {
      await api.remove(page.id);
    }
  };
`}
          />
          <p>
            削除されたページを開いていた場合の後始末は <code>App.tsx</code> にあります。一覧 <code>api.pages</code> から選択中の id が消えたら <code>setSelectedId(null)</code> で選択を外す <code>useEffect</code> で、<ChapterLink n={12} /> で触れた「外部のデータと state を同期する」小さな例です。
          </p>
          <p>テストでは、3階層のページを根ごと消して、別の根だけが残ることと、全文検索の索引も1件になることを確認しています。</p>
          <Code
            lang="rust"
            title="src-tauri/core/tests/pages.rs（抜粋）"
            code={`
#[test]
fn delete_removes_descendants() {
    let conn = db::open_in_memory().unwrap();
    let a = pages::create(&conn, None, "A").unwrap();
    let a1 = pages::create(&conn, Some(&a.id), "A-1").unwrap();
    let _a11 = pages::create(&conn, Some(&a1.id), "A-1-1").unwrap();
    let _b = pages::create(&conn, None, "B").unwrap();
    assert_eq!(pages::descendants(&conn, &a.id).unwrap().len(), 3);

    pages::delete(&conn, &a.id).unwrap();
    let list = pages::list(&conn).unwrap();
    assert_eq!(list.len(), 1);
    assert_eq!(list[0].title, "B");
    let fts: i64 = conn
        .query_row("SELECT count(*) FROM pages_fts", [], |r| r.get(0))
        .unwrap();
    assert_eq!(fts, 1);
}
`}
          />
          <Callout kind="unverified">
            <p>
              Rust 側の移動・循環防止・削除は <code>cargo test</code> で確認しています。サイドバーのツリー表示と、ページの作成・切り替え・アイコン変更は、Linux 上の <code>tauri dev</code> で確認しました。ドラッグ＆ドロップによる、同じ親の中での下方向・上方向の並べ替え、子ページへの移動、循環の拒否とトースト表示も、WebView 内で合成したドラッグイベントで確認しています（実際のマウス操作ではありません）。<code>ask</code> の確認ダイアログはネイティブの操作が要るため未検証で、macOS で <code>npm run tauri dev</code> を実行して確かめる想定です。コードは MDN と Tauri 公式ドキュメントの API に合わせて書いています。
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
          <ul>
            <li>
              一覧は操作のたびに全件取り直します。ページ数が多くなったら、<code>run</code> の中で <code>reload</code> する代わりに、操作の結果を <code>setPages</code> で部分的に反映する（楽観的更新）方法に変えられます。その場合、失敗時に元へ戻す処理が必要になります。
            </li>
            <li>
              <code>childrenOf</code> は呼ばれるたびに全ページを <code>filter</code> します。各 <code>TreeItem</code> が <code>hasChildren</code> の判定でも呼ぶので、計算量はページ数の2乗に比例します。数千ページで気になるなら、<code>useMemo</code>（<ChapterLink n={14} />）で「親 id → 子の配列」の <code>Map</code> を一度だけ作り、各行はそれを引くようにします。
            </li>
            <li>
              移動は兄弟全員の <code>position</code> を書き直します。兄弟が数百あっても1トランザクションで済むので、実用上は問題になりません。
            </li>
            <li>
              HTML のドラッグ＆ドロップ API はマウス向けで、タッチ操作では動かない環境があります。モバイルでは長押しメニューから「移動」を選ぶ UI などの代替が必要です（<ChapterLink n={55} />）。
            </li>
            <li>
              削除は即時で、ごみ箱はありません。<code>pages</code> に <code>deleted_at</code> 列を足して「論理削除」にすれば、復元機能を作れます。
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
            <li>CRUD コマンドは <code>State</code> と <code>with_db</code> で core を呼ぶだけの薄い層で、引数名は camelCase に変換されるので <code>lib/ipc.ts</code> で吸収する。</li>
            <li>親子関係は <code>parent_id</code>、並び順は <code>position</code> で持ち、Rust 側は平坦な一覧を返す。木は <code>childrenOf</code> を再帰的に呼んでフロントエンドで組み立てる。</li>
            <li>再帰コンポーネント <code>PageTree</code> と <code>TreeItem</code> が交互に入れ子になり、<code>key</code> にはページの id を使う。</li>
            <li><code>descendants</code> は再帰 CTE で子孫を1回の問い合わせで求め、移動では循環を拒否し、削除では葉から順に消す。どちらもトランザクションで囲む。</li>
            <li>移動の指示は HTML のドラッグ＆ドロップ API で「前に置く」「中に入れる」を区別し、整合性の検査は Rust 側に1か所だけ置く。</li>
            <li><code>usePages</code> は「Rust に頼んで一覧を取り直す」形にそろえ、失敗はトーストに出す。</li>
          </ul>
          <p>次章では、ページを開いたときに表示される本文、すなわちブロックエディタ BlockNote を組み込み、編集内容を自動保存します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Calling Rust from the Frontend',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/calling-rust/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'コマンド引数が camelCase のキーで渡されることの根拠。',
    },
    {
      title: 'Rendering Lists',
      publisher: 'react.dev',
      url: 'https://react.dev/learn/rendering-lists',
      accessed: '2026-11-08',
      note: 'key が配列の項目とコンポーネントの対応を保つこと、兄弟の中で一意で変化してはならないこと、添字を key にする問題の根拠。',
    },
    {
      title: 'The WITH Clause — Recursive Common Table Expressions',
      publisher: 'SQLite',
      url: 'https://www.sqlite.org/lang_with.html',
      accessed: '2026-11-08',
      note: '再帰 CTE の構造（初期 SELECT UNION ALL 再帰 SELECT）とキューによる処理手順、木構造の問い合わせ、ORDER BY を省略したときの取り出し順は未定義であること（現在の実装では FIFO になるが保証はされない）の根拠。',
    },
    {
      title: 'rusqlite::Connection — docs.rs',
      publisher: 'docs.rs',
      url: 'https://docs.rs/rusqlite/latest/rusqlite/struct.Connection.html',
      accessed: '2026-11-08',
      version: 'rusqlite 0.41.1',
      note: 'unchecked_transaction が &self で開始でき、入れ子のトランザクションが実行時エラーになることの根拠。',
    },
    {
      title: 'HTML Drag and Drop API',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API',
      accessed: '2026-11-08',
      note: 'draggable 属性、dragstart での setData、dragover の preventDefault でドロップ先になること、drop でのみデータを読めることの根拠。',
    },
    {
      title: 'DataTransfer: types property',
      publisher: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types',
      accessed: '2026-11-08',
      note: 'types がドラッグ中のどのイベントでも読めるが、データ本体は dragstart と drop でしか読めないことの根拠。',
    },
    {
      title: 'Dialog',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/dialog/',
      accessed: '2026-11-08',
      version: 'tauri-plugin-dialog 2',
      note: 'ask が Yes と No のボタンを持つ質問ダイアログを表示し、title と kind のオプションを取り、真偽値を返すことの根拠。',
    },
  ],
}

export default chapter
