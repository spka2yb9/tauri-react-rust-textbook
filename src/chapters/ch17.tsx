import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 17-1 テストの道具の層 ---------- */
function TestStackFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="下から順に、テストを実行する Vitest、DOM を提供する jsdom、コンポーネントを描いて要素を探す React Testing Library、ユーザー操作を再現する user-event、DOM 向けの検証を追加する jest-dom の5層が積み重なる。右側に各層の役割の一言説明がある">
      <g fontSize="13">
        {[
          { y: 30, label: 'jest-dom', desc: 'toBeInTheDocument などの検証（matcher）を追加', fill: 'var(--fig-box5)' },
          { y: 80, label: 'user-event', desc: 'クリック・入力などの「操作」を再現する', fill: 'var(--fig-box2)' },
          { y: 130, label: 'React Testing Library', desc: 'render で描き、screen のクエリで要素を探す', fill: 'var(--fig-box4)' },
          { y: 180, label: 'jsdom', desc: 'Node.js 上に document と window を用意する', fill: 'var(--fig-box3)' },
          { y: 230, label: 'Vitest', desc: 'テストファイルを見つけて実行し、結果を報告する', fill: 'var(--fig-box)' },
        ].map((row) => (
          <g key={row.label}>
            <rect x="20" y={row.y} width="220" height="42" rx="6" fill={row.fill} stroke="var(--fig-line)" />
            <text x="130" y={row.y + 26} textAnchor="middle" fontWeight="600">{row.label}</text>
            <text x="260" y={row.y + 26} fontSize="12" textAnchor="start">{row.desc}</text>
          </g>
        ))}
      </g>
      <text x="320" y="290" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">上の層は下の層に依存する（模式図）</text>
    </svg>
  )
}

/* ---------- 図 17-2 vi.mock がモジュールを差し替える ---------- */
function ViMockFigure() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-label="左はふつうの実行で、Sidebar が lib/ipc を import し、lib/ipc が Tauri の invoke を呼ぶ。右はテストで、vi.mock がファイルの先頭に巻き上げられ、lib/ipc の代わりに vi.fn で作った偽の関数が Sidebar に渡る。Tauri には届かない">
      <defs>
        <marker id="arrow17b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <text x="160" y="30" fontWeight="600">ふつうの実行</text>
        <rect x="80" y="45" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="160" y="70">Sidebar.tsx</text>
        <rect x="80" y="125" width="160" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="150">lib/ipc.ts</text>
        <rect x="80" y="205" width="160" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="230">Tauri の invoke</text>

        <text x="480" y="30" fontWeight="600">テスト実行（vi.mock あり）</text>
        <rect x="400" y="45" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="70">Sidebar.tsx</text>
        <rect x="400" y="125" width="160" height="40" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="480" y="150">偽の lib/ipc（vi.fn）</text>
        <rect x="400" y="205" width="160" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" opacity="0.5" />
        <text x="480" y="230" fill="var(--fig-muted)">Tauri には届かない</text>
      </g>
      <path d="M160,85 L160,123" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow17b)" />
      <path d="M160,165 L160,203" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow17b)" />
      <path d="M480,85 L480,123" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow17b)" />
      <line x1="440" y1="175" x2="520" y2="200" stroke="var(--fig-danger)" strokeWidth="2" />
      <line x1="520" y1="175" x2="440" y2="200" stroke="var(--fig-danger)" strokeWidth="2" />
      <text x="600" y="150" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">戻り値を</text>
      <text x="600" y="166" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">自由に決める</text>
      <text x="320" y="268" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">vi.mock はファイルの先頭に巻き上げられ、import より前に差し替えが決まる（模式図）</text>
    </svg>
  )
}

/* ---------- 図 17-3 mockIPC の位置 ---------- */
function MockIpcFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="コンポーネントが lib/ipc を経由して @tauri-apps/api の invoke を呼ぶ。本物のアプリでは invoke が WebView の IPC を通って Rust 側に届く。テストでは mockIPC がその IPC の層を横取りし、コマンド名と引数を受け取って返り値を返す。lib/ipc と invoke は本物のまま動く">
      <defs>
        <marker id="arrow17c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <rect x="20" y="70" width="120" height="44" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="80" y="97">コンポーネント</text>
        <rect x="170" y="70" width="110" height="44" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="225" y="97">lib/ipc.ts</text>
        <rect x="310" y="70" width="110" height="44" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="365" y="97">invoke()</text>
        <rect x="450" y="40" width="170" height="44" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeDasharray="6 4" opacity="0.6" />
        <text x="535" y="67" fill="var(--fig-muted)">WebView IPC → Rust 側</text>
        <rect x="450" y="110" width="170" height="44" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="535" y="137">mockIPC の handler</text>
      </g>
      <path d="M140,92 L168,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow17c)" />
      <path d="M280,92 L308,92" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow17c)" />
      <path d="M420,85 L448,65" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow17c)" />
      <path d="M420,100 L448,125" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow17c)" />
      <text x="535" y="180" fontSize="12" textAnchor="middle">(cmd, args) =&gt; 返り値</text>
      <text x="535" y="198" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">テストで用意する</text>
      <text x="320" y="240" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">破線：本物のアプリでの経路　実線（橙）：テストでの経路。lib/ipc と invoke は本物のまま（模式図）</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 17,
  part: 3,
  title: 'React アプリのテスト',
  summary:
    'Vitest 5.1 と React Testing Library で、コンポーネントが「ユーザーの操作どおりに動く」ことを自動で確かめる方法を学びます。要素の探し方の優先順位、user-event による操作の再現、vi.mock による依存の差し替え、そして Tauri の invoke を mockIPC でモックして Rust 側なしにテストする方法までを扱います。',
  goals: [
    'Vitest を Vite プロジェクトに導入し、jsdom 環境でコンポーネントのテストを実行できる',
    'Testing Library の指針に沿って、役割やラベルで要素を探すテストを書ける',
    'user-event でクリックや入力を再現し、findBy で非同期の結果を待てる',
    'vi.fn・vi.mock・偽のタイマーで依存を差し替え、テストを安定させられる',
    'mockIPC で Tauri のコマンド呼び出しを模擬し、Rust 側なしでフロントエンドをテストできる',
  ],
  prerequisites: [12, 13, 15],
  sections: [
    {
      id: 'why-test',
      title: '何を、どう確かめるか',
      body: (
        <>
          <p>
            アプリが大きくなると、「ページの改名を直したら検索が壊れた」のような回帰（regression）が起きます。それを人の目だけで防ぐのは無理なので、自動テストを書きます。ただし、React のテストには1つの落とし穴があります。コンポーネントの内部（state の値、呼ばれた関数の名前）を確かめるテストは、実装を書き換えるたびに壊れ、しかも「ユーザーにとって動いているか」を保証しません。
          </p>
          <p>
            本書が従う指針は、Testing Library のものです。「テストがソフトウェアの使われ方に似ているほど、テストが与えてくれる確信は大きくなる」。<Ref n={3} /> つまり、テストは「ユーザーがするように」操作し、「ユーザーが見るもの」を確かめます。「保存」というボタンをクリックしたら「保存しました」と表示される、という書き方です。<code>useState</code> の中身は見ません。
          </p>
          <p>
            この章で使う道具は5つあり、層になっています。
          </p>
          <Figure n="17-1" title="この章で使うテストの道具とその役割" caption="Vitest がテストを実行し、jsdom が Node.js 上に DOM を用意する。その上で React Testing Library がコンポーネントを描いて要素を探し、user-event が操作を再現し、jest-dom が DOM 向けの検証を追加する。模式図。">
            <TestStackFigure />
          </Figure>
          <p>
            図の下から順に導入していきます。本書が扱うのは、1つのコンポーネントや機能を DOM の上で動かす「コンポーネントテスト」までです。Tauri アプリ全体を実際に起動して操作する E2E テストは <ChapterLink n={40} />、Rust 側の単体テストは <ChapterLink n={31} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'vitest',
      title: 'Vitest の導入',
      body: (
        <>
          <p>
            <Term en="Vitest">Vitest</Term> は、公式サイトの言葉では「Vite を動力とする次世代のテストフレームワーク」です。<Ref n={1} /> 基準バージョンは 5.1.0 で、Vite 6.4 以上と Node 22.12 以上を必要とします。<Ref n={1} /> 最大の利点は、Vite の設定（<ChapterLink n={7} /> で学んだプラグインやパスの別名）をそのまま読むことです。アプリと同じ変換でテストが動くので、設定を二重に持たずに済みます。
          </p>
          <Code lang="bash" code={`npm install -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom`} />
          <p>
            まず、DOM に関係ない純粋な関数のテストから始めます。テストファイルは、既定では名前に <code>.test.</code> か <code>.spec.</code> を含むものが対象になります。<Ref n={1} />
          </p>
          <Code
            lang="ts"
            title="src/lib/slug.test.ts"
            code={`
import { expect, test } from 'vitest'
import { toSlug } from './slug'

test('空白をハイフンに置き換える', () => {
  expect(toSlug('Hello World')).toBe('hello-world')
})
`}
          />
          <p>
            <code>test</code> が1つのテスト、<code>expect(...).toBe(...)</code> が検証です。<code>package.json</code> の <code>scripts</code> に <code>"test": "vitest"</code> を加えると、<code>npm test</code> でファイルを監視しながら実行し、<code>vitest run</code> なら1回だけ実行します。<Ref n={1} />
          </p>
          <h3>コンポーネント用の設定</h3>
          <p>
            コンポーネントを描くには <code>document</code> が必要ですが、Vitest の既定の環境は Node.js で、DOM はありません。<Ref n={2} /> <code>environment</code> を <code>jsdom</code>（または <code>happy-dom</code>）にすると、ブラウザに似た環境が使えます。設定は <code>vite.config.ts</code> の <code>test</code> プロパティに書きます。<Ref n={4} />
          </p>
          <Code
            lang="ts"
            title="vite.config.ts"
            code={`
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',          // document と window を用意する
    globals: true,                 // test, expect を import なしで使えるようにし、RTL の自動 cleanup を有効にする
    setupFiles: ['./src/test/setup.ts'],
  },
})
`}
          />
          <Code
            lang="ts"
            title="src/test/setup.ts"
            code={`
// toBeInTheDocument などの DOM 向け matcher を expect に追加する
import '@testing-library/jest-dom/vitest'
`}
          />
          <p>
            <code>globals: true</code> には2つの意味があります。<code>test</code> や <code>expect</code> を import なしで使えること、そして React Testing Library が各テストの後に自動で描画を片付ける（cleanup する）ために <code>afterEach</code> をグローバルで必要とすることです。<Ref n={5} /> グローバルを使いたくない場合は、setup ファイルで <code>afterEach(() =&gt; cleanup())</code> を自分で呼びます。<Ref n={5} /> <code>jest-dom</code> は <code>@testing-library/jest-dom/vitest</code> を setup ファイルで import するだけで、<code>toBeInTheDocument()</code>、<code>toHaveTextContent()</code>、<code>toBeDisabled()</code>、<code>toHaveAttribute()</code> などが使えるようになります。<Ref n={6} /> TypeScript に <code>test</code> や <code>vi</code> のグローバルを認識させるには、<code>tsconfig.json</code> の <code>types</code> に <code>"vitest/globals"</code> を加えます。<Ref n={13} /> 環境はファイル単位でも変えられ、先頭に <code>// @vitest-environment jsdom</code> と書けば、そのファイルだけ jsdom になります。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'rtl',
      title: 'React Testing Library：描いて、探して、確かめる',
      body: (
        <>
          <p>
            <Term en="React Testing Library">React Testing Library</Term>（RTL）は、DOM Testing Library の上に React 用の薄い層を足したものです。<Ref n={3} /> やることは3つだけです。<code>render</code> でコンポーネントを DOM に描き、<code>screen</code> のクエリで要素を探し、<code>expect</code> で確かめます。
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/PageTitle.test.tsx"
            code={`
import { render, screen } from '@testing-library/react'
import { PageTitle } from './PageTitle'

test('タイトルを見出しとして表示する', () => {
  render(<PageTitle title="設計メモ" />)
  expect(screen.getByRole('heading', { name: '設計メモ' })).toBeInTheDocument()
})
`}
          />
          <p>
            <code>screen</code> は、<code>document.body</code> に束縛されたクエリをまとめたオブジェクトです。<Ref n={7} /> クエリの名前は「接頭辞＋探し方」の組み合わせで、接頭辞が見つからなかったときの振る舞いを決めます。<Ref n={7} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>接頭辞</th>
                  <th>0件</th>
                  <th>1件</th>
                  <th>2件以上</th>
                  <th>再試行</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>getBy</code></td><td>例外</td><td>要素を返す</td><td>例外</td><td>しない</td></tr>
                <tr><td><code>queryBy</code></td><td><code>null</code></td><td>要素を返す</td><td>例外</td><td>しない</td></tr>
                <tr><td><code>findBy</code></td><td>例外（待った後）</td><td>Promise で要素</td><td>例外</td><td>する（既定 1000ms）</td></tr>
                <tr><td><code>getAllBy</code> など</td><td colSpan={3}>配列を返す（<code>getAll</code> は 0 件で例外、<code>queryAll</code> は空配列）</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            使い分けは単純です。あるはずのものは <code>getBy</code>、ないことを確かめたいときは <code>queryBy</code>（<code>null</code> を期待する）、非同期処理の後に現れるものは <code>findBy</code> で待ちます。<Ref n={7} />
          </p>
          <h3>探し方の優先順位</h3>
          <p>
            「探し方」の部分には優先順位があります。Testing Library は、ユーザーが要素を見つける方法に近いものから使うよう勧めています。<Ref n={7} />
          </p>
          <ol className="steps">
            <li><code>getByRole</code>：役割と名前で探す。「ほぼすべての場面で最優先」。<ChapterLink n={16} /> のアクセシブルな名前がそのまま使われる。</li>
            <li><code>getByLabelText</code>：フォーム部品をラベルで探す。<code>getByPlaceholderText</code> はその代替。</li>
            <li><code>getByText</code>：フォーム以外の内容を文字列で探す。<code>getByDisplayValue</code> は入力中の値で探す。</li>
            <li><code>getByAltText</code>、<code>getByTitle</code>：意味的な属性で探す。</li>
            <li><code>getByTestId</code>：最後の手段。<code>data-testid</code> はユーザーには見えない。</li>
          </ol>
          <p>
            この順位は、アクセシビリティと直結しています。<code>getByRole('button', {'{ name: "保存" }'})</code> で見つからないボタンは、スクリーンリーダーの利用者にも「保存」ボタンとして見つかりません。テストを書くことが、<ChapterLink n={16} /> で学んだ名前付けの検査にもなります。
          </p>
        </>
      ),
    },
    {
      id: 'user-event',
      title: 'user-event：ユーザーの操作を再現する',
      body: (
        <>
          <p>
            RTL には <code>fireEvent</code> という、DOM イベントを1つ発火する関数があります。しかし実際のクリックは、pointerdown、mousedown、focus、click のような複数のイベントの連なりです。<Term en="user-event">user-event</Term> は、1つの「操作」に対応するイベント列を再現し、さらに「隠れている要素はクリックできない」「無効化された入力には打てない」といった検査も行います。<Ref n={8} /> 公式ドキュメントは「<code>fireEvent</code> は DOM イベントを発火し、<code>user-event</code> は操作全体をシミュレートする」と区別しています。
          </p>
          <p>
            使い方は、<code>render</code> の前に <code>userEvent.setup()</code> を呼んで操作用のインスタンスを作り、そのメソッドを <code>await</code> します。<Ref n={8} />
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/RenameForm.test.tsx"
            code={`
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RenameForm } from './RenameForm'

test('タイトルを入力して保存すると onSave が呼ばれる', async () => {
  const user = userEvent.setup()           // render より前に用意する
  const onSave = vi.fn()                   // 呼ばれたことを記録する偽の関数
  render(<RenameForm initialTitle="無題" onSave={onSave} />)

  const input = screen.getByRole('textbox', { name: 'タイトル' })
  await user.clear(input)                  // 選択して消す
  await user.type(input, '設計メモ')        // 1文字ずつ入力する
  await user.click(screen.getByRole('button', { name: '保存' }))

  expect(onSave).toHaveBeenCalledWith('設計メモ')
})
`}
          />
          <p>
            <code>user.type</code> は既定で要素をクリックしてから1文字ずつ入力します。<Ref n={9} /> キーだけを押したいときは <code>user.keyboard</code> を使い、<code>{'{Shift>}A{/Shift}'}</code> のように <code>&gt;</code> で押しっぱなし、<code>/</code> で離す、という記法で修飾キーを表します。<Ref n={10} /> <ChapterLink n={16} /> で実装したツリーの矢印キー操作は、<code>user.keyboard('{'{ArrowDown}'}')</code> のように検証できます。
          </p>
          <h3>非同期の結果を待つ</h3>
          <p>
            操作の後にデータ取得が走る場合、結果はすぐには現れません。ここで <code>findBy</code> を使います。<Ref n={7} />
          </p>
          <Code
            lang="tsx"
            code={`
test('読み込みボタンでページ一覧が表示される', async () => {
  const user = userEvent.setup()
  render(<PageList />)
  await user.click(screen.getByRole('button', { name: '読み込む' }))
  // 一覧が現れるまで（既定 1000ms）繰り返し探す
  expect(await screen.findByRole('list')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
})
`}
          />
          <p>
            <code>setTimeout</code> や固定の待ち時間は使いません。<code>findBy</code> は条件が満たされた瞬間に返るので、速くて安定します。
          </p>
        </>
      ),
    },
    {
      id: 'mocking',
      title: 'モック：依存を差し替える',
      body: (
        <>
          <p>
            コンポーネントが Rust 側や時計のような外部に依存していると、テストは遅く、結果が環境に左右されます。<Term en="mock">モック</Term> は、こうした依存を「テストが制御できる偽物」に差し替える技法です。Vitest の <code>vi</code> オブジェクトに道具がそろっています。<Ref n={11} />
          </p>
          <h3>vi.fn：呼び出しを記録する関数</h3>
          <p>
            前節の <code>vi.fn()</code> は、呼ばれた回数と引数を記録する関数を作ります。実装を渡さなければ <code>undefined</code> を返し、<code>vi.fn(() =&gt; 42)</code> のように実装を渡すこともできます。<Ref n={11} /> <code>toHaveBeenCalledWith</code> で引数を、<code>toHaveBeenCalledTimes</code> で回数を検証します。props で受け取るコールバックの検証に最適です。
          </p>
          <h3>vi.mock：モジュールごと差し替える</h3>
          <p>
            props ではなく import で依存している場合は、モジュールを丸ごと差し替えます。<code>vi.mock(パス, ファクトリ)</code> を書くと、そのパスを import したすべての場所にファクトリの戻り値が渡ります。<Ref n={11} />
          </p>
          <Code
            lang="tsx"
            title="src/features/pages/Sidebar.test.tsx"
            code={`
import { render, screen } from '@testing-library/react'
import { listPages } from '../../lib/ipc'
import { Sidebar } from './Sidebar'

// lib/ipc の実装を偽物に差し替える（ファイルの先頭に巻き上げられる）
vi.mock('../../lib/ipc', () => ({
  listPages: vi.fn(),
}))

test('ページ一覧をサイドバーに表示する', async () => {
  vi.mocked(listPages).mockResolvedValue([
    { id: '1', title: 'はじめに' },
    { id: '2', title: '設計メモ' },
  ])
  render(<Sidebar />)
  expect(await screen.findByRole('link', { name: '設計メモ' })).toBeInTheDocument()
})
`}
          />
          <Figure n="17-2" title="vi.mock によるモジュールの差し替え" caption="左はふつうの実行で、Sidebar は lib/ipc を通して Tauri の invoke を呼ぶ。右はテストで、vi.mock がファイルの先頭に巻き上げられ、lib/ipc の代わりに vi.fn で作った偽の関数が渡る。戻り値はテストが自由に決められ、Tauri には届かない。模式図。">
            <ViMockFigure />
          </Figure>
          <p>
            図で見落としやすいのが「巻き上げ」です。公式ドキュメントは「<code>vi.mock</code> はファイルの先頭に巻き上げられ（移動され）、すべての import より前に実行される」と説明しています。<Ref n={11} /> そのため、ファクトリの中からファイル内の変数は参照できません。参照したい値は <code>vi.hoisted(() =&gt; ...)</code> で作ると、import より前に評価されてファクトリから使えます。<Ref n={11} /> <code>vi.mocked(listPages)</code> は型のための補助関数で、<code>listPages</code> をモック関数として扱い、<code>mockResolvedValue</code> などを型エラーなしに呼べるようにします。<Ref n={11} />
          </p>
          <p>
            <ChapterLink n={15} /> で「Rust 側を呼ぶコードは <code>lib/ipc.ts</code> に集約する」と決めた理由がここにあります。差し替える場所が1つなので、どのコンポーネントのテストでも同じ <code>vi.mock('../../lib/ipc', ...)</code> で済みます。
          </p>
          <h3>偽のタイマー</h3>
          <p>
            <ChapterLink n={13} /> で触れた自動保存の debounce（800ms 待ってから保存）のように、時間に依存する処理は <code>vi.useFakeTimers()</code> でタイマーを偽物にし、<code>vi.advanceTimersByTime(800)</code> で時間を進めます。テストが本当に 800ms 待つ必要はなくなります。公式ドキュメントは、偽のタイマーが <code>Date</code> も書き換えること、終わったら <code>vi.useRealTimers()</code> で戻すことを注意しています。<Ref n={11} /> user-event と組み合わせるときは、<code>userEvent.setup({'{ advanceTimers: vi.advanceTimersByTime }'})</code> のように進め方を渡します。ただし Vitest では、RTL が偽のタイマーの有効化を <code>jest</code> グローバルでしか検出しないため、<code>advanceTimers</code> を渡すだけだと <code>await user.click(...)</code> が終わらずタイムアウトすることがあります。<Ref n={14} /> 本書の制作環境（RTL 16.3、Vitest 5.1）では、<code>vi.useFakeTimers({'{ shouldAdvanceTime: true }'})</code> を併用すると完了しました。
          </p>
          <h3>テスト間の後片付け</h3>
          <p>
            モックの記録は、放っておくとテストをまたいで残ります。<code>vi.clearAllMocks()</code> は呼び出し履歴だけを消し、<code>vi.resetAllMocks()</code> は実装も初期化し、<code>vi.restoreAllMocks()</code> は <code>vi.spyOn</code> で置き換えた元の実装を復元します。<Ref n={11} /> setup ファイルの <code>afterEach</code> で <code>vi.clearAllMocks()</code> を呼んでおくと、「前のテストで2回呼ばれたから」という理由で失敗することがなくなります。
          </p>
        </>
      ),
    },
    {
      id: 'tauri-mock',
      title: 'Tauri の invoke をモックする',
      body: (
        <>
          <p>
            前節の <code>vi.mock('../../lib/ipc')</code> は、ラッパー層ごと差し替える方法でした。もう1段深く、「<code>lib/ipc.ts</code> と <code>@tauri-apps/api</code> の <code>invoke</code> は本物のまま動かし、Rust 側に届く直前で横取りする」方法もあります。Tauri が提供する <code>@tauri-apps/api/mocks</code> モジュールの <code>mockIPC</code> です。<Ref n={12} /> ラッパーが引数を正しく組み立てているか（コマンド名のつづり、引数名の camelCase 変換など）まで検証できるのが利点です。
          </p>
          <Figure n="17-3" title="mockIPC が横取りする位置" caption="コンポーネントから lib/ipc、invoke までは本物のコードが動く。本物のアプリでは invoke が WebView の IPC を通って Rust 側に届く（破線）が、テストでは mockIPC に渡した handler がその層を横取りし、コマンド名と引数を受け取って返り値を返す（実線）。模式図。">
            <MockIpcFigure />
          </Figure>
          <Code
            lang="ts"
            title="src/lib/ipc.test.ts"
            code={`
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'
import { randomFillSync } from 'node:crypto'
import { getPage } from './ipc'

// window.__TAURI_INTERNALS__ は型が公開されていないので、spy に必要な形だけ宣言する
declare global {
  interface Window {
    __TAURI_INTERNALS__: {
      invoke: (cmd: string, args?: unknown, options?: unknown) => Promise<unknown>
    }
  }
}

beforeAll(() => {
  // 公式資料は「jsdom には WebCrypto がない」として補う（新しい jsdom では不要なことがある）
  Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: (buffer: Uint8Array) => randomFillSync(buffer) },
  })
})

afterEach(() => {
  clearMocks() // テストごとにモックを消し、状態が持ち越されないようにする
})

test('getPage は get_page コマンドを id 付きで呼ぶ', async () => {
  mockIPC((cmd, args) => {
    if (cmd === 'get_page') {
      return { id: (args as { id: string }).id, title: '設計メモ', content: '[]' }
    }
  })
  const spy = vi.spyOn(window.__TAURI_INTERNALS__, 'invoke')

  const page = await getPage('42')

  expect(page.title).toBe('設計メモ')
  expect(spy).toHaveBeenCalledWith('get_page', { id: '42' }, undefined)
})
`}
          />
          <p>
            <code>mockIPC</code> に渡す handler は、コマンド名 <code>cmd</code> と引数 <code>args</code> を受け取り、Rust 側のコマンドが返すはずの値を返します。<Ref n={12} /> 公式ドキュメントの例は <code>add</code> コマンドで <code>a + b</code> を返し、<code>invoke("add", {'{ a: 12, b: 15 }'})</code> が 27 に解決されることを確かめています。呼び出しの回数や引数を検証したいときは、<code>window.__TAURI_INTERNALS__</code> の <code>invoke</code> を <code>vi.spyOn</code> で監視します。<Ref n={12} /> 公式ドキュメントは、テストのたびに <code>clearMocks()</code> で状態を消すことと、jsdom に WebCrypto がないため <code>window.crypto</code> を補うことを示しています。<Ref n={12} /> ただし本書の制作環境（jsdom 31）では <code>window.crypto.getRandomValues</code> が最初からあり、補わなくても <code>mockIPC</code> は動きました。
          </p>
          <p>
            <code>mockIPC</code> のオプション <code>{'{ shouldMockEvents: true }'}</code> を付けると、Tauri 2.7.0 以降では <code>emit</code> と <code>listen</code>（<ChapterLink n={35} />）も部分的に模擬できます。<code>emitTo</code> と <code>emit_filter</code> はまだ対象外です。<Ref n={12} /> 複数ウィンドウを扱うコードには <code>mockWindows('main', 'second')</code> でウィンドウのラベルを偽装できますが、存在を偽るだけで、ウィンドウの属性は <code>mockIPC</code> で別途返す必要があります。<Ref n={12} />
          </p>
          <Callout kind="unverified">
            <p>
              上の <code>spy</code> の第3引数 <code>undefined</code> は、<code>invoke(cmd, args, options?)</code> の省略されたオプションに対応します。この検証の細部（引数の渡り方）は <code>@tauri-apps/api</code> 2.12 の実装に依存します。公式のモック資料に基づく記述です。
            </p>
          </Callout>
          <h3>2つの方法の使い分け</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>方法</th>
                  <th>差し替える層</th>
                  <th>向く場面</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>vi.mock('./lib/ipc')</code></td>
                  <td>ラッパー関数（<code>listPages</code> など）</td>
                  <td>コンポーネントのテスト。戻り値を型付きで簡単に決めたい</td>
                </tr>
                <tr>
                  <td><code>mockIPC</code></td>
                  <td>WebView と Rust 側の間の IPC</td>
                  <td>ラッパー自体のテスト。コマンド名と引数の組み立てを検証したい</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            どちらも Rust 側のコードは動かしません。「Rust 側のコマンドが正しい SQL を実行するか」は <ChapterLink n={31} /> と <ChapterLink n={42} /> の Rust のテストで、「アプリ全体が実際につながるか」は <ChapterLink n={40} /> の E2E テストで確かめます。公式ドキュメントも、<code>mockIPC</code> はモックランタイムでのみ動き、E2E には <code>@wdio/tauri-service</code> の <code>browser.tauri.mock()</code> を使うと案内しています。<Ref n={12} />
          </p>
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
              Tsumugi のフロントエンドは、この章の構成でテストします。<code>src/test/setup.ts</code> に jest-dom と <code>afterEach(vi.clearAllMocks)</code> を置き、各 feature のディレクトリに <code>*.test.tsx</code> を並べます。<ChapterLink n={43} /> のサイドバーは <code>vi.mock('../../lib/ipc')</code> でページ一覧を偽装し、「新規ページ」をクリックすると <code>createPage</code> が呼ばれ、作られたページのリンクが現れることを <code>findByRole('link')</code> で確かめます。
            </p>
            <p>
              <ChapterLink n={44} /> の自動保存は、偽のタイマーで 800ms を進めて <code>savePage</code> が1回だけ呼ばれることを検証します。<ChapterLink n={46} /> の検索ダイアログは、<code>user.keyboard</code> で <code>Cmd+K</code> を押して開き、検索欄にフォーカスがあること（<code>toHaveFocus()</code>）と、入力後に結果が <code>findAllByRole('option')</code> で現れることを確かめます。<code>lib/ipc.ts</code> 自体のテストには <code>mockIPC</code> を使い、全コマンドの名前と引数の形を Rust 側の定義と照合します。
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
            <li>テストはユーザーの使い方に似せる。state や内部関数ではなく、役割と名前で要素を探し、画面に見えるものを確かめる。</li>
            <li>Vitest 5.1 は Vite の設定をそのまま使う。コンポーネントには <code>environment: 'jsdom'</code>、<code>globals: true</code>、setup ファイルでの jest-dom の読み込みが必要。</li>
            <li>クエリは <code>getBy</code>（あるはず）、<code>queryBy</code>（ないはず）、<code>findBy</code>（現れるまで待つ）を使い分け、探し方は <code>getByRole</code> を最優先にする。</li>
            <li><code>userEvent.setup()</code> を <code>render</code> の前に呼び、<code>click</code>／<code>type</code>／<code>keyboard</code> を <code>await</code> する。固定の待ち時間は使わない。</li>
            <li><code>vi.fn</code> はコールバック、<code>vi.mock</code> はモジュールを差し替える。<code>vi.mock</code> は巻き上げられるので、必要な値は <code>vi.hoisted</code> で作る。時間は偽のタイマーで進める。</li>
            <li>Tauri のコマンドは、ラッパー層を <code>vi.mock</code> するか、IPC 層を <code>mockIPC</code> で横取りする。どちらも Rust 側は動かさない。</li>
          </ul>
          <p>これで第3部の React 入門は終わりです。次の第4部では、Tsumugi のもう半分を担う Rust を、Cargo と基本文法から学び始めます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Getting Started',
      publisher: 'Vitest（vitest.dev）',
      url: 'https://vitest.dev/guide/',
      accessed: '2026-11-08',
      version: 'Vitest 5.1.0',
      note: 'Vitest の位置付け、必要な Vite と Node のバージョン、最初のテスト、テストファイルの命名規則、package.json のスクリプトの根拠。',
    },
    {
      title: 'environment（Config）',
      publisher: 'Vitest（vitest.dev）',
      url: 'https://vitest.dev/config/environment',
      accessed: '2026-11-08',
      version: 'Vitest 5.1.0',
      note: '既定の環境が Node.js であること、jsdom／happy-dom、ファイル単位の @vitest-environment 指定の根拠。',
    },
    {
      title: 'React Testing Library: Introduction',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/react-testing-library/intro/',
      accessed: '2026-11-08',
      note: '「テストがソフトウェアの使われ方に似ているほど確信が大きくなる」という指針、DOM Testing Library の上の薄い層であること、インストールの根拠。',
    },
    {
      title: 'Configuring Vitest',
      publisher: 'Vitest（vitest.dev）',
      url: 'https://vitest.dev/config/',
      accessed: '2026-11-08',
      version: 'Vitest 5.1.0',
      note: 'vite.config.ts の test プロパティと /// <reference types="vitest/config" /> の根拠。',
    },
    {
      title: 'React Testing Library: Setup',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/react-testing-library/setup/',
      accessed: '2026-11-08',
      note: 'Vitest で自動 cleanup に globals: true が必要なこと、setupFiles で afterEach(cleanup) を呼ぶ代替の根拠。',
    },
    {
      title: 'jest-dom（README）',
      publisher: 'Testing Library（GitHub）',
      url: 'https://github.com/testing-library/jest-dom',
      accessed: '2026-11-08',
      note: '@testing-library/jest-dom/vitest の setup ファイルでの読み込み、toBeInTheDocument などの matcher の根拠。',
    },
    {
      title: 'About Queries',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/queries/about/',
      accessed: '2026-11-08',
      note: 'getBy／queryBy／findBy の振る舞いの表、探し方の優先順位、screen の根拠。',
    },
    {
      title: 'user-event: Introduction',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/user-event/intro/',
      accessed: '2026-11-08',
      note: 'fireEvent との違い、可視性・操作可能性の検査、userEvent.setup() を render の前に呼ぶことの根拠。',
    },
    {
      title: 'user-event: Utility APIs',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/user-event/utility',
      accessed: '2026-11-08',
      note: 'user.type、user.clear の動作の根拠。',
    },
    {
      title: 'user-event: Keyboard',
      publisher: 'Testing Library',
      url: 'https://testing-library.com/docs/user-event/keyboard',
      accessed: '2026-11-08',
      note: 'user.keyboard の記法（波かっこのキー名、> と / による押下と解放）の根拠。',
    },
    {
      title: 'Vi（API）',
      publisher: 'Vitest（vitest.dev）',
      url: 'https://vitest.dev/api/vi.html',
      accessed: '2026-11-08',
      version: 'Vitest 5.1.0',
      note: 'vi.fn、vi.mock の巻き上げとファクトリ、vi.hoisted、vi.mocked、vi.spyOn、vi.useFakeTimers、clearAllMocks／resetAllMocks／restoreAllMocks の根拠。',
    },
    {
      title: 'Mock Tauri APIs',
      publisher: 'Tauri（v2.tauri.app）',
      url: 'https://v2.tauri.app/develop/tests/mocking/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '@tauri-apps/api/mocks の mockIPC、mockWindows、clearMocks、window.__TAURI_INTERNALS__.invoke の spy、crypto の補完、shouldMockEvents、E2E との違いの根拠。',
    },
    {
      title: 'globals（Config）',
      publisher: 'Vitest（vitest.dev）',
      url: 'https://vitest.dev/config/globals',
      accessed: '2026-11-08',
      version: 'Vitest 5.1.0',
      note: 'globals が既定で無効であること、tsconfig の types に vitest/globals を加える手順の根拠。',
    },
    {
      title: 'react-testing-library/src/pure.js',
      publisher: 'GitHub（testing-library）',
      url: 'https://github.com/testing-library/react-testing-library/blob/main/src/pure.js',
      accessed: '2026-11-08',
      note: 'asyncWrapper が jest グローバルでのみ偽のタイマーを進めること（jestFakeTimersAreEnabled）の根拠。',
    },
  ],
}

export default chapter
