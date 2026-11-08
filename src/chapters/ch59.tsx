import { Fragment, type ReactNode } from 'react'
import type { Chapter } from '../content/types'
import { ChapterLink, Ref } from '../components/content'

/* ---------- 用語集の1項目 ---------- */
interface Entry {
  /** 見出し語（日本語、または英語のまま） */
  ja: ReactNode
  /** 英語名（見出し語と同じなら省略） */
  en?: string
  /** 説明（1〜3文） */
  d: ReactNode
  /** 初出の章（複数なら、定義の本体がある章を続けて示す） */
  ch: number[]
}

function Glossary({ items }: { items: Entry[] }) {
  return (
    <dl className="glossary">
      {items.map((e, i) => (
        <Fragment key={i}>
          <dt>
            {e.ja}
            {e.en && <span className="term-en">（{e.en}）</span>}
          </dt>
          <dd>
            {e.d}
            <span className="gl-ref">
              →{' '}
              {e.ch.map((n, j) => (
                <Fragment key={n}>
                  {j > 0 && '、'}
                  <ChapterLink n={n} />
                </Fragment>
              ))}
            </span>
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}

/* ================= JavaScript・TypeScript・React ================= */

const jsTools: Entry[] = [
  { ja: <code>Node.js</code>, d: 'ブラウザの外で JavaScript を動かす実行環境です。Tauri アプリ本体には含まれませんが、Vite や TypeScript のコンパイラ、Tauri CLI の npm 版は Node.js 上で動きます。', ch: [2] },
  { ja: 'LTS', en: 'Long Term Support', d: '長期サポート版のことで、安定して長く使える系列を指します。本書は Node.js 24 系を基準にしていますが、LTS であれば新しい系列でも問題ありません。', ch: [2] },
  { ja: <code>npm</code>, d: 'Node.js に同梱されるパッケージマネージャです。ライブラリの取得と、package.json に書いたスクリプトの実行を担います。本書のコマンド例はすべて npm で書いています。', ch: [2] },
  { ja: 'Visual Studio Code', d: '本書が前提にするエディタ（VS Code）です。拡張機能マーケットプレイスから rust-analyzer などの拡張を入れて使います。', ch: [2] },
  { ja: 'Vite', d: 'JSX と TypeScript の変換、開発サーバー、本番ビルドをまとめて面倒を見るフロントエンドのビルドツールです。create-tauri-app のテンプレートも内部で Vite を使います。', ch: [7] },
  { ja: 'HMR', en: 'Hot Module Replacement', d: 'ファイルを保存したとき、ページ全体を再読み込みせずに該当モジュールだけを差し替える開発サーバーの機能です。React では Fast Refresh により、コンポーネントの state を保ったまま差し替えられます。', ch: [7] },
  { ja: 'Vitest', d: 'Vite を動力とするテストフレームワークです。Vite の設定をそのまま読むので、アプリと同じ変換でテストが動きます。本書の基準バージョンは 5.1.0 です。', ch: [17] },
  { ja: 'React Testing Library', en: 'RTL', d: 'DOM Testing Library の上に React 用の薄い層を足したテスト用ライブラリです。render でコンポーネントを DOM に描き、screen のクエリで要素を探し、expect で確かめる、という3段階で使います。', ch: [17] },
  { ja: <code>user-event</code>, d: 'クリックや入力といった1つの「操作」に対応するイベント列を再現するライブラリです。DOM イベントを1つだけ発火する fireEvent と違い、隠れている要素はクリックできないといった検査も行います。', ch: [17] },
  { ja: 'モック', en: 'mock', d: 'テスト対象が依存する外部（Rust 側、時計、ネットワークなど）を、テストが制御できる偽物に差し替える技法です。Vitest では vi オブジェクトに道具がそろっています。', ch: [17] },
  { ja: 'React Developer Tools', d: 'React コンポーネントの検査、props と state の編集、性能問題の特定を行う公式ツールです。ブラウザ拡張のほか、Tauri の WebView 向けには npm の単体版をスクリプトタグで接続して使えます。', ch: [58] },
]

const jsLang: Entry[] = [
  { ja: 'ES Modules', en: 'ESM', d: 'JavaScript の言語仕様に組み込まれたモジュールの仕組みです。1つのファイルを1つのモジュールとして扱い、export で外に公開し、import で取り込みます。', ch: [3] },
  { ja: 'モジュール', en: 'module', d: '変数や関数をファイル単位のスコープに閉じ込める単位です。明示的に export しない限り、中で宣言したものは外から見えません。', ch: [3] },
  { ja: 'Promise', d: '非同期処理の最終的な完了（または失敗）と、その結果の値を表すオブジェクトです。値が確定したときの処理を then などで後から登録できます。', ch: [3] },
  { ja: 'pending', d: 'Promise の初期状態で、まだ成功も失敗もしていない状態です。', ch: [3] },
  { ja: 'fulfilled', d: 'Promise の処理が成功し、値を持っている状態です。', ch: [3] },
  { ja: 'rejected', d: 'Promise の処理が失敗し、理由（通常は Error）を持っている状態です。', ch: [3] },
  { ja: 'settled', d: 'fulfilled と rejected をまとめた呼び名です。一度 settled になった Promise が別の状態に移ることはありません。', ch: [3] },
  { ja: <code>async/await</code>, d: 'Promise を使った処理を同期的なコードのように書くための構文です。async 関数は必ず Promise を返し、その中で await を使えます。', ch: [3] },
  { ja: 'イベントループ', en: 'event loop', d: 'JavaScript の実行環境がキューからジョブを1つ取り出して実行し、終わったら次を取り出す、という繰り返しでプログラムを進める仕組みです。コールバックが「いつ呼ばれるか」を決めています。', ch: [3] },
  { ja: 'コールスタック', en: 'call stack', d: 'いま実行中の関数の積み重ねです。1つのジョブはスタックが空になるまで実行され、途中で他のジョブに割り込まれることはありません。', ch: [3] },
  { ja: 'タスク', en: 'task', d: 'イベントループが処理するジョブのうち、setTimeout のコールバックなどが入るタスクキューの単位です。なお Rust の非同期ランタイムでいう「タスク」（spawn で起動する処理）は別の概念です。', ch: [3] },
  { ja: 'マイクロタスク', en: 'microtask', d: 'Promise のコールバックが入るキューの単位です。タスクキューから次を取り出す前に、マイクロタスクキューは空になるまで優先して処理されます。', ch: [3] },
  { ja: 'DOM', en: 'Document Object Model', d: 'ブラウザが HTML をオブジェクトの集まりに変換し、JavaScript から触れるようにしたものです。文書を論理的な木として表します。', ch: [4] },
  { ja: 'ノード', en: 'node', d: 'DOM の木を構成する各要素で、それぞれがオブジェクトです。', ch: [4] },
  { ja: 'イベント', en: 'event', d: 'クリック、キー入力、フォーム送信など、システムの中で起きる出来事で、コードが反応できるように知らされるものです。addEventListener で受け取ります。Tauri の「イベント」（emit と listen による Rust とフロントエンドの通知）は別の仕組みです。', ch: [4, 35] },
  { ja: 'イベントオブジェクト', en: 'event object', d: 'イベントハンドラに自動的に渡されるオブジェクトで、イベントの種類や発生した要素（target）などの情報を持ちます。', ch: [4] },
  { ja: 'バブリング', en: 'event bubbling', d: 'イベントが、起きた最も内側の要素から親、さらにその親へと上へ伝わっていく段階です。', ch: [4] },
  { ja: 'キャプチャ', en: 'event capture', d: 'バブリングの反対で、最も外側の要素からイベントが起きた要素（target）に向かって降りていく段階です。', ch: [4] },
  { ja: 'イベント委譲', en: 'event delegation', d: '多数の子要素それぞれにリスナーを付ける代わりに、親に1つだけ付けて、子で起きたイベントがバブリングで上がってくるのを受け取る技法です。', ch: [4] },
  { ja: 'リフロー', en: 'reflow', d: 'ブラウザがレンダーツリーの各ノードの寸法と位置を決めるレイアウト処理のうち、後から起きる再計算のことです。', ch: [4] },
]

const tsLang: Entry[] = [
  { ja: 'TypeScript', d: 'JavaScript に型注釈を加えた言語です。実行前に型の整合性を調べ、検査に通ったコードは型注釈を取り除いた JavaScript に変換されます。型注釈は実行時の振る舞いを変えません。', ch: [5] },
  { ja: '型注釈', en: 'type annotation', d: '変数名や引数名の後ろに「: 型」の形で書く、型の指定です。', ch: [5] },
  { ja: '静的型検査', en: 'static type checking', d: 'プログラムを実行する前に、型の整合性を調べることです。', ch: [5] },
  { ja: '型推論', en: 'type inference', d: '初期値などから変数の型を TypeScript が自動で決めることです。関数の引数のように初期値から判断できないところだけ注釈が必要になります。', ch: [5] },
  { ja: '省略可能なプロパティ', en: 'optional property', d: 'プロパティ名の後ろに ? を付けて、あってもなくてもよいとしたプロパティです。読み出した値の型には undefined が加わります。', ch: [5] },
  { ja: 'タプル', en: 'tuple', d: '要素の数と各位置の型が決まった配列（TypeScript では [string, number] のように書く）です。Rust にも同名の型があり、異なる型の値を固定個まとめ、.0 や .1 の添字で取り出します。', ch: [5, 18] },
  { ja: '型エイリアス', en: 'type alias', d: 'type キーワードで、あらゆる型に名前を付ける仕組みです。', ch: [5] },
  { ja: 'インターフェース', en: 'interface', d: 'interface キーワードで、オブジェクトの形に名前を付ける仕組みです。多くの場面で型エイリアスと同じように使えます。', ch: [5] },
  { ja: 'ユニオン型', en: 'union type', d: '「このどれか」を表す型で、string | number のように | でつなぎます。', ch: [5] },
  { ja: 'リテラル型', en: 'literal type', d: '"left" のように特定の値そのものを型にしたものです。許される値をユニオン型で列挙する使い方が典型です。', ch: [5] },
  { ja: '絞り込み', en: 'narrowing', d: '条件分岐などを通じて、宣言された型より具体的な型へ精緻化していく過程です。', ch: [5] },
  { ja: '制御フロー解析', en: 'control flow analysis', d: 'TypeScript がコードの到達可能性を解析して、各地点での型を決める仕組みです。絞り込みの土台です。', ch: [5] },
  { ja: '型述語', en: 'type predicate', d: '関数の戻り値の型を「引数名 is 型」と書き、その関数が true を返したときに引数の型を絞り込めるようにする仕組みです。', ch: [5] },
  { ja: <code>strict</code>, d: 'tsconfig で、より強い正しさの保証につながる幅広い型検査を一括で有効にするフラグです。本書では常に有効にします。TypeScript 7 では既定で true です。', ch: [5] },
  { ja: 'ジェネリクス', en: 'generics', d: '型を引数として受け取り、型の情報を失わずに汎用的な関数や型を書く仕組みです。', ch: [6] },
  { ja: '型変数', en: 'type variable', d: 'ジェネリクスで、値ではなく型に対して働く変数です。呼び出し側が渡した型を捕まえ、戻り値の型などに使い回せます。', ch: [6] },
  { ja: '制約', en: 'generic constraint', d: '型変数に extends で付ける条件です。「length を持つ型なら何でも」のように、型変数が取りうる型を絞ります。', ch: [6] },
  { ja: 'ユーティリティ型', en: 'utility types', d: 'Partial や Pick など、既存の型から新しい型を作るために標準で用意されたジェネリックな型です。', ch: [6] },
  { ja: '判別可能なユニオン', en: 'discriminated union', d: 'すべてのメンバーがリテラル型の共通プロパティを持つオブジェクトのユニオン型です。そのプロパティでメンバーを絞り込めます。', ch: [6] },
  { ja: '網羅性検査', en: 'exhaustiveness checking', d: 'ユニオンのすべてのメンバーを処理し終えると型が never になる性質を使い、分岐の書き忘れをコンパイル時に見つける技法です。Rust の match では標準の動作です。', ch: [6, 21] },
  { ja: '型定義ファイル', en: 'declaration file', d: 'JavaScript で書かれたライブラリの型だけを記述した、拡張子 .d.ts のファイルです。', ch: [6] },
  { ja: '信頼境界', en: 'trust boundary', d: '外の世界から値が入ってくる境目です。そこでは値を unknown として受け取り、実行時に検査してから型付きの値に変えます。Tauri では WebView と Core の間がこの境界に当たります。', ch: [6, 37] },
]

const reactCore: Entry[] = [
  { ja: 'React', d: '画面の見え方を状態から計算する関数として UI を書くためのライブラリです。開発者は「状態がこうなら画面はこう見える」だけを書き、DOM の書き換えは React が決めます。', ch: [7] },
  { ja: '命令的', en: 'imperative', d: '要素ひとつひとつに「表示しろ」「無効にしろ」と手順を命令する書き方です。', ch: [7] },
  { ja: '宣言的', en: 'declarative', d: '「状態がこうなら画面はこう」という事実だけを書き、画面をどう書き換えるかは React に任せる書き方です。', ch: [7] },
  { ja: 'コンポーネント', en: 'component', d: 'React で画面を作る単位で、マークアップを返す JavaScript の関数です。', ch: [7] },
  { ja: 'React 要素', en: 'React element', d: 'コンポーネントが返す、type・props・key・ref を持つ軽量な JavaScript オブジェクトです。DOM の要素そのものではなく、作るだけでは何も描画されません。', ch: [7] },
  { ja: 'JSX', d: 'コンポーネントの中に書く HTML のような記法で、JavaScript の構文拡張です。ブラウザはそのままでは理解できないので、Vite などが関数呼び出しに変換します。', ch: [7] },
  { ja: 'フラグメント', en: 'Fragment', d: '複数の要素を余計な div なしで1つにまとめる空のタグ <>...</> です。DOM には痕跡を残しません。', ch: [7] },
  { ja: 'レンダーツリー', en: 'render tree', d: '1回の描画で、どのコンポーネントがどのコンポーネントを描いたかを表す入れ子の木です。', ch: [8] },
  { ja: 'トップレベルコンポーネント', en: 'top-level component', d: 'レンダーツリーの根に近いコンポーネントです。その下のすべての描画性能に影響します。', ch: [8] },
  { ja: 'リーフコンポーネント', en: 'leaf component', d: '子を持たない末端のコンポーネントです。頻繁に再描画されがちです。', ch: [8] },
  { ja: <code>props</code>, d: '親から子のコンポーネントに渡す情報です。HTML の属性と同じ見た目で渡しますが、オブジェクトや関数など任意の JavaScript の値を渡せます。', ch: [8] },
  { ja: '一方向データフロー', en: 'one-way data flow', d: 'データが常に親から子へ流れるという React の原則です。子から親への連絡は、親が渡した関数を呼ぶ形に限られます。', ch: [8] },
  { ja: <code>key</code>, d: 'リストを描くとき、配列の中で項目を一意に識別するために各要素に付ける文字列か数値です。', ch: [8] },
  { ja: '純粋関数', en: 'pure function', d: '呼び出し前から存在するものを変更せず、同じ入力には同じ出力を返す関数です。React はすべてのコンポーネントが純粋であることを前提にしています。', ch: [8] },
  { ja: <code>state</code>, d: 'レンダーをまたいで値を保持し、新しい値で React に再描画させるための仕組みです。useState で宣言します。', ch: [9] },
  { ja: 'フック', en: 'Hook', d: 'useState のように use で始まる関数です。コンポーネントまたは他のフックの最上位でしか呼べず、条件分岐やループの中では呼べません。', ch: [9] },
  { ja: 'イベントハンドラ', en: 'event handler', d: 'ユーザーの操作に応じて実行する関数で、onClick のような props に渡します。副作用を置いてよい場所です。', ch: [9] },
  { ja: 'レンダー', en: 'render', d: 'React がコンポーネント関数を呼ぶことです。この段階では DOM に触りません。', ch: [9] },
  { ja: 'コミット', en: 'commit', d: 'レンダーで計算した差分を React が DOM に適用する段階です。差分があった DOM ノードだけを変更します。', ch: [9] },
  { ja: 'バッチ処理', en: 'batching', d: 'イベントハンドラの中のすべてのコードが実行し終わるまで待ってから、state の更新をまとめて処理することです。再レンダーの回数が減ります。', ch: [9] },
  { ja: '更新関数', en: 'updater function', d: 'set 関数に値の代わりに渡す、前の state から次の state を計算する関数です。1つのイベントで同じ state を複数回更新するときに使います。', ch: [9] },
  { ja: 'ミューテーション', en: 'mutation', d: 'オブジェクトや配列を直接書き換えることです。React の state では避け、常に新しい値で置き換えます。', ch: [9] },
  { ja: '非制御', en: 'uncontrolled', d: '入力欄の値をブラウザの DOM が持ち、React が関与しない入力の扱い方です。初期値だけを defaultValue で指定できます。', ch: [10] },
  { ja: '制御', en: 'controlled', d: 'value props を渡して、React が入力欄の値を常に state の値に固定する入力の扱い方です。onChange で state を更新します。', ch: [10] },
  { ja: 'state の持ち上げ', en: 'lifting state up', d: '複数のコンポーネントで共有したい state を、最も近い共通の親に移し、props で渡す手法です。', ch: [10] },
  { ja: '信頼できる唯一の情報源', en: 'single source of truth', d: 'ある情報を持つ場所を1か所に決め、矛盾した状態を作れないようにする設計の原則です。', ch: [10] },
  { ja: <code>reducer</code>, d: 'state の更新ロジックをコンポーネントの外に集めた1つの関数です。現在の state とアクションを受け取り、次の state を返します。', ch: [11] },
  { ja: 'アクション', en: 'action', d: 'reducer に渡す「何が起きたか」を表すオブジェクトです。慣例として文字列の type と必要最小限の情報を持たせます。React Router の action、React 19 の Action とは別の概念です。', ch: [11] },
  { ja: 'props のバケツリレー', en: 'prop drilling', d: '途中のコンポーネントが自分では使わない値を受け取って下へ渡すだけになる状態です。Context で解消できます。', ch: [11] },
  { ja: 'Context', d: '親が「この下の木全体に対してこの値を使えるようにする」と宣言し、子孫がどれだけ深くても props なしでその値を読める仕組みです。', ch: [11] },
  { ja: 'カスタムフック', en: 'custom Hook', d: 'state や Effect を組み合わせたロジックを、use で始まる名前の関数に切り出したものです。複数のコンポーネントで使い回せます。', ch: [11, 13] },
  { ja: 'レンダーのコード', en: 'rendering code', d: 'コンポーネント関数の最上位にあり、props と state から JSX を計算する部分です。純粋でなければなりません。', ch: [12] },
  { ja: 'Effect', d: '特定のイベントではなく、レンダーそのものによって引き起こされる副作用です。useEffect で書き、コミットの終わりに実行されます。', ch: [12] },
  { ja: '外部システム', en: 'external system', d: 'ネットワーク、ブラウザの API、React 以外のライブラリなど、React の管理の外にあるものです。Effect はこれらとコンポーネントを同期させるために使います。', ch: [12] },
  { ja: '依存配列', en: 'dependency array', d: 'useEffect の第2引数で、「この値が前回から変わったときだけ再実行する」と指定する配列です。', ch: [12] },
  { ja: 'クリーンアップ関数', en: 'cleanup function', d: 'Effect が返す関数です。Effect を再実行する前と、コンポーネントがアンマウントするときに呼ばれます。', ch: [12] },
  { ja: '再同期', en: 're-synchronization', d: '依存の値が変わったとき、古い値でクリーンアップを呼び、新しい値で Effect を再実行することです。', ch: [12] },
  { ja: 'リアクティブな値', en: 'reactive value', d: 'props、state、およびそれらから計算されてコンポーネント本体で宣言されたすべての値です。Effect の中で読むものは依存配列に含めなければなりません。', ch: [12] },
  { ja: 'Effect イベント', en: 'Effect Event', d: 'useEffectEvent で包んだ関数です。常に最新の props と state を見ますが、リアクティブではないので依存配列に書きません。Effect の中からしか呼べません。', ch: [12] },
  { ja: '競合（レースコンディション）', en: 'race condition', d: '非同期の応答が順序どおりに届かず、古い結果が新しい結果を上書きしてしまう問題です。Effect でのデータ取得では、クリーンアップで古い応答を無視して防ぎます。', ch: [12] },
  { ja: <code>ref</code>, d: '再レンダーを起こさずに値を覚える、または DOM ノードを直接触るための仕組みです。useRef で作ります。', ch: [13] },
  { ja: 'ref コールバック', en: 'ref callback', d: 'ref 属性に渡す関数です。React はノードを結び付けるときに DOM ノード付きでその関数を呼び、関数が返したクリーンアップをノードが外れるときに呼びます。', ch: [13] },
  { ja: 'メモ化', en: 'memoization', d: '出力が変わらないのに呼ばれるレンダーや計算を飛ばす技術です。memo、useMemo、useCallback で行います。', ch: [14] },
  { ja: 'React Compiler', d: '手作業のメモ化を自動化するビルド時のツールです。2025 年 10 月に安定版 1.0 が公開されました。本書の基準は 1.0.0 です。', ch: [14] },
  { ja: 'トランジション', en: 'Transition', d: '必要なレンダーを、ユーザーの操作を邪魔しない形（緊急でない更新として）で行う仕組みです。useTransition と startTransition で使います。', ch: [14] },
  { ja: 'Action', d: 'React 19 で startTransition に渡せる async 関数です。その中の await を含む処理全体が Transition になります。', ch: [14] },
  { ja: 'SPA', en: 'single-page application', d: 'HTML は index.html の1枚だけで、画面の切り替えを JavaScript がコンポーネントを描き替えることで行う構成です。', ch: [15] },
  { ja: 'ルーティング', en: 'routing', d: 'URL の変化と表示するコンポーネントを対応付ける仕組みです。', ch: [15] },
  { ja: 'ルーター', en: 'router', d: 'ルーティングを担う部品です。', ch: [15] },
  { ja: 'React Router', d: '第15章で扱うルーターです（題材の Tsumugi では使いません）。基準バージョンは 8.5.1 で、declarative、data、framework の3つのモードがあります。', ch: [15] },
  { ja: '入れ子ルート', en: 'nested routes', d: '「共通の外枠＋変わる中身」を表すルート定義です。親の path が子に前置され、子の要素は親の Outlet の位置に描かれます。', ch: [15] },
  { ja: '動的セグメント', en: 'dynamic segment', d: 'path の中で : で始まる部分です。一致した値が params として渡され、useParams で読めます。', ch: [15] },
  { ja: <code>loader</code>, d: 'React Router の data モードで、ルートに付けるデータ読み込み関数です。遷移先のデータがそろってから描く順序になります。', ch: [15] },
  { ja: <code>action</code>, d: 'React Router の data モードで、ルートに付ける書き込み関数です。完了するとページ上のすべての loader データが再検証されます。reducer のアクションとは別の概念です。', ch: [15] },
]

const styling: Entry[] = [
  { ja: 'CSS Modules', d: 'ファイル名が .module.css で終わる CSS を、クラス名が一意に書き換えられたオブジェクトとして import できる仕組みです。Vite では自動で有効になります。', ch: [16] },
  { ja: 'CSS カスタムプロパティ', en: 'CSS custom properties', d: '-- で始まる名前で宣言し、var() で参照する CSS 変数です。色を1か所で決めて全体に効かせるのに使います。', ch: [16] },
  { ja: 'アクセシビリティ', en: 'accessibility', d: 'マウスを使わない人、画面を見ない人、タッチ操作が難しい人も同じアプリを使えるようにすることです。最初の一歩はキーボードだけで全部操作できることです。', ch: [16] },
  { ja: 'roving tabindex', d: '複合 UI 部品で、現在の項目だけ tabindex="0"、他は -1 にし、矢印キーで移動したら値を入れ替えて focus() を呼ぶ実装法です。Tab 順序にフォーカス可能な要素を1つだけ含めるために使います。', ch: [16] },
  { ja: 'WAI-ARIA', d: 'HTML 要素に役割（role）、状態、属性を付けて、支援技術に意味を伝える仕様です。役割を付けたら、キーボード操作と状態の更新を自分で実装する約束を負います。', ch: [16] },
  { ja: 'アクセシブルな名前', en: 'accessible name', d: '支援技術が要素を読み上げるときに使う短いラベルです。ラベル要素や aria-label などから決まります。', ch: [16] },
  { ja: 'メディアクエリ', en: 'media query', d: '画面の幅などの条件で CSS を切り替える仕組みです。Tsumugi では幅 720px 未満でサイドバーをドロワーに切り替える判断に使います。', ch: [55] },
]

const tsumugiFront: Entry[] = [
  { ja: '再帰コンポーネント', en: 'recursive component', d: '自分自身を含むコンポーネントです。コンポーネントは関数なので再帰でき、ページツリーのような木構造の表示にちょうど合います。', ch: [43] },
  { ja: 'ドラッグ＆ドロップ API', en: 'HTML Drag and Drop API', d: 'draggable="true"、dragstart、dragover、drop などで要素のドラッグとドロップを扱う HTML 標準の API です。Tsumugi のサイドバーはライブラリを足さずにこれで移動を実装します。', ch: [43] },
  { ja: 'ブロックエディタ', en: 'block editor', d: '本文を「見出し」「段落」「リスト項目」「画像」といったブロックの列として扱うエディタです。ブロック単位の移動や種類の変更ができます。', ch: [44] },
  { ja: 'BlockNote', d: 'React 向けのブロックエディタライブラリです。各種ブロック、スラッシュメニュー、ドラッグ＆ドロップ、書式ツールバーを最初から備えています。本書の基準は 0.57.0 です。', ch: [44] },
  { ja: 'デバウンス', en: 'debounce', d: '最後の入力から一定時間たってから1回だけ処理を実行する方式です。Tsumugi の自動保存で、1文字ごとに保存を呼ばないために使います。', ch: [44] },
  { ja: 'サジェストメニュー', en: 'suggestion menu', d: 'BlockNote で、特定の文字を入力したときに出るメニューです。「/」で出るものがスラッシュメニューです。', ch: [44] },
  { ja: 'ブロックサイドメニュー', en: 'block side menu', d: 'BlockNote でブロックの上にマウスを置くと左側に現れるメニューで、「+」ボタンとドラッグハンドルで構成されます。', ch: [44] },
  { ja: 'カスタムブロック', en: 'custom block', d: 'BlockNote の標準にない、独自に定義したブロックです。Tsumugi では絵文字付きの強調枠「コールアウト」を作ります。', ch: [45] },
  { ja: 'ブロック仕様', en: 'block spec', d: 'BlockNote のブロックを定義する単位です。createReactBlockSpec に設定と実装を渡して作り、スキーマに登録します。', ch: [45] },
  { ja: '楽観的更新', en: 'optimistic update', d: '保存の完了を待たずに先に画面を更新し、万一失敗したら後から知らせる方式です。入力のたびの遅れをなくします。', ch: [47] },
  { ja: 'Markdown', d: '見出しを #、箇条書きを - で書くプレーンテキストの記法です。Tsumugi はページをこの形式で書き出し、読み込みます。', ch: [49] },
  { ja: 'CommonMark', d: 'Markdown の仕様を整理したものです。タスクリストや取り消し線は CommonMark にはなく、その上位集合である GitHub Flavored Markdown（GFM）が拡張として定義しています。', ch: [49] },
  { ja: 'ドロワー', en: 'drawer', d: 'ふだんは画面外に隠れ、ボタンで引き出すパネルです。Tsumugi では幅が狭い画面でサイドバーをこの形にします。', ch: [50] },
]

/* ================= Rust ================= */

const rustBasics: Entry[] = [
  { ja: <code>rustup</code>, d: 'Rust 公式のインストーラです。コンパイラ（rustc）や cargo のほか、モバイル向けなどのビルドターゲットの追加も担います。', ch: [2] },
  { ja: 'rust-analyzer', d: 'Rust 向けの Language Server Protocol の実装です。補完や定義へのジャンプといった機能をエディタに提供します。', ch: [2] },
  { ja: 'コンパイル言語', en: 'compiled language', d: 'ソースコードを実行前に機械語へ変換する言語です。できあがった実行ファイルは、Rust がインストールされていない PC でもそのまま動きます。', ch: [18] },
  { ja: 'edition', d: 'Rust の「文法の版」で、2015、2018、2021、2024 の4つがあります。本書は 2024 edition（Rust 1.85.0 で安定化）を基準にします。', ch: [18] },
  { ja: <code>cargo</code>, d: 'Rust のビルドシステム兼パッケージマネージャです。コードのビルド、依存クレートのダウンロードとビルドを引き受けます。', ch: [18] },
  { ja: 'クレート', en: 'crate', d: 'Rust のコンパイルの単位で、バイナリクレート（実行ファイル）とライブラリクレートがあります。依存ライブラリもクレートとして Cargo.toml に書き、crates.io から取得します。', ch: [18, 22] },
  { ja: 'マクロ', en: 'macro', d: 'println! のように末尾に ! が付く、コードを生成してからコンパイルされる仕組みです。宣言的マクロと手続き的マクロがあります。', ch: [18, 32] },
  { ja: 'プロファイル', en: 'profile', d: 'cargo のビルド設定の組で、dev（開発用）と release（配布用）があります。整数オーバーフローの扱いなどが異なります。', ch: [18] },
  { ja: '不変', en: 'immutable', d: '値を後から変更できないことです。Rust の変数は既定で不変で、変更したいときは mut を付けます。', ch: [18] },
  { ja: 'シャドーイング', en: 'shadowing', d: '同じ名前で let をもう一度書き、前の変数を新しい変数で覆い隠すことです。新しい変数を作るので型を変えられます。', ch: [18] },
  { ja: 'スカラー型', en: 'scalar type', d: '整数、浮動小数点数、真偽値、文字のように単一の値を表す型です。', ch: [18] },
  { ja: '複合型', en: 'compound type', d: 'タプルや配列のように、複数の値をまとめた型です。', ch: [18] },
  { ja: '整数オーバーフロー', en: 'integer overflow', d: '型の範囲を超える計算をすることです。dev プロファイルでは panic で止まり、release では巻き戻ります。明示的に扱うには wrapping_add や checked_add などを使います。', ch: [18] },
  { ja: 'ユニット', en: 'unit', d: '要素のないタプル () です。「値がない」ことを表す型として、関数の戻り値などに現れます。', ch: [18] },
  { ja: '配列', en: 'array', d: '同じ型の値を固定長で並べたもので、スタックに置かれます。[i32; 5] のように「要素の型; 長さ」で型を書きます。長さが変わるものには Vec を使います。', ch: [18] },
  { ja: '文', en: 'statement', d: '動作を行うだけで値を返さないものです。let y = 6; は文です。', ch: [18] },
  { ja: '式', en: 'expression', d: '評価されて値になるものです。算術、関数呼び出し、マクロ呼び出し、波かっこで囲んだブロックは式で、関数本体の末尾の式が戻り値になります。', ch: [18] },
  { ja: '範囲', en: 'range', d: '1..4（1、2、3）や 1..=4（4 を含む）のように、連続する値の列を生む式です。for で使います。', ch: [18] },
]

const ownership: Entry[] = [
  { ja: '所有権', en: 'ownership', d: 'メモリの管理をコンパイル時に検査する Rust の規則です。値には所有者が1つあり、所有者がスコープを抜けると値は解放されます。ガベージコレクタなしでメモリ安全を実現する核心です。', ch: [18, 19] },
  { ja: 'ガベージコレクタ', en: 'garbage collector', d: '使い終わったメモリを実行中に自動で回収する仕組みです。JavaScript はこれを持ち、Rust は持ちません。', ch: [19] },
  { ja: 'スタック', en: 'stack', d: '値を積み上げ、最後に積んだものから取り出すメモリ領域です。コンパイル時にサイズが決まる値だけを置けます。', ch: [19] },
  { ja: 'ヒープ', en: 'heap', d: '実行時に必要な大きさを頼むと確保され、その場所を指すポインタが返るメモリ領域です。長さが実行時に変わるデータを置きます。', ch: [19] },
  { ja: 'ポインタ', en: 'pointer', d: 'メモリ上の場所を指す値です。', ch: [19] },
  { ja: '所有者', en: 'owner', d: 'ある値を持っている変数です。同時に1つだけ存在します。', ch: [19] },
  { ja: 'スコープ', en: 'scope', d: '変数が有効な範囲で、Rust では波かっこで囲まれた区間です。抜けると値は drop されます。Tauri のセキュリティ設定でいう「スコープ」（permission が許すパスや URL の範囲）は別の概念です。', ch: [19, 37] },
  { ja: '二重解放', en: 'double free', d: '同じメモリを2回解放する事故です。所有者を1つに限る規則が、これを仕組みとして防ぎます。', ch: [19] },
  { ja: 'ムーブ（move）', d: '代入や関数呼び出しで、ヒープを持つ値の所有権が別の変数へ移ることです。元の変数はその時点で無効になり、使うとコンパイルエラー E0382 になります。', ch: [19] },
  { ja: <code>Copy</code>, d: '代入が単なるビットのコピーになることを示すトレイトです。整数や真偽値など、ヒープを使わない型だけが Copy になれ、代入後も元の変数を使えます。深いコピーが必要なときは Clone の clone を明示します。', ch: [19] },
  { ja: '参照', en: 'reference', d: '値そのものではなく値の場所を指すポインタで、所有権を持ちません。& で作ります。', ch: [20] },
  { ja: '借用', en: 'borrowing', d: '参照を作ることです。持ち主から借りて、使い終わったら返し、自分のものにはなりません。', ch: [20] },
  { ja: '可変参照', en: 'mutable reference', d: '&mut で作る、指す先を書き換えられる参照です。同じ値に対して同時に1つしか存在できません。', ch: [20] },
  { ja: 'データ競合', en: 'data race', d: '2つ以上のポインタが同じデータにアクセスし、少なくとも1つが書き込みで、同期する仕組みがない状態です。借用規則がこれを防ぎます。', ch: [20] },
  { ja: '参照外し', en: 'dereference', d: '参照が指している値そのものを取り出すことで、演算子 * を使います。', ch: [20] },
  { ja: 'ダングリング参照', en: 'dangling reference', d: 'すでに解放されたメモリを指す参照です。Rust では参照先が参照より先に消えないことをコンパイラが保証します。', ch: [20] },
  { ja: 'スライス', en: 'slice', d: 'コレクションの中の連続した一部分を指す参照です。文字列スライス &str が代表です。', ch: [20] },
  { ja: '参照外し型強制', en: 'deref coercion', d: '&String を &str の引数に渡せるように、コンパイラが自動で行う変換です。Deref トレイトに基づきます。', ch: [20, 28] },
  { ja: 'ライフタイム', en: 'lifetime', d: '参照が有効な区間です。コンパイラはこれを使って、参照が指す先より長く生きないことを検査します。', ch: [26] },
  { ja: '借用チェッカ', en: 'borrow checker', d: 'コンパイラの中で、参照と参照先の有効な区間を比べ、規則に反するプログラムを拒否する部分です。', ch: [26] },
  { ja: 'ライフタイム注釈', en: 'lifetime annotation', d: "'a のように書く、参照のライフタイムの関係を示す注釈です。複数の参照を受け取って参照を返す関数などで必要になります。", ch: [26] },
  { ja: 'ライフタイム省略', en: 'lifetime elision', d: 'よくあるパターンではコンパイラがライフタイム注釈を自動で補う規則です。', ch: [26] },
  { ja: '入力ライフタイム', en: 'input lifetime', d: '関数の引数側の参照のライフタイムです。', ch: [26] },
  { ja: '出力ライフタイム', en: 'output lifetime', d: '関数の戻り値側の参照のライフタイムです。省略規則では入力ライフタイムから決まります。', ch: [26] },
]

const rustTypes: Entry[] = [
  { ja: '構造体', en: 'struct', d: '名前付きのフィールドをまとめた独自の型です。impl ブロックでメソッドを定義できます。', ch: [21] },
  { ja: '列挙型', en: 'enum', d: '値が取りうる形をバリアントとして列挙した型です。各バリアントはデータを持てます。Option と Result も列挙型です。', ch: [21] },
  { ja: '構造体更新記法', en: 'struct update syntax', d: '..base と書いて、既存のインスタンスから一部だけ変えた新しいインスタンスを作る記法です。所有権が移る点に注意が要ります。', ch: [21] },
  { ja: 'タプル構造体', en: 'tuple struct', d: 'struct Rgb(u8, u8, u8); のように、フィールドに名前を付けない構造体です。同じ中身でも別の型として区別したいときに使います。', ch: [21] },
  { ja: 'ユニット様構造体', en: 'unit-like struct', d: 'struct Marker; のように、フィールドを持たない構造体です。トレイトを実装するだけの型が欲しいときに使います。', ch: [21] },
  { ja: 'メソッド', en: 'method', d: 'impl ブロックの中に書く、第1引数が self の関数です。', ch: [21] },
  { ja: '関連関数', en: 'associated function', d: 'impl ブロックの中に書く、self を取らない関数です。String::from や new がこれに当たります。', ch: [21] },
  { ja: 'バリアント', en: 'variant', d: '列挙型が取りうる形の1つです。', ch: [21] },
  { ja: '腕', en: 'arm', d: 'match の各分岐です。値を上から順にパターンと照合し、最初に一致した腕のコードが実行されます。', ch: [21] },
  { ja: '網羅性', en: 'exhaustiveness', d: 'match がすべての可能性を扱っているかをコンパイラが検査する性質です。分岐が足りなければコンパイルエラーになります。', ch: [21] },
  { ja: 'トレイト', en: 'trait', d: '型が持つべき振る舞いの契約で、他の言語のインターフェースに近い概念です。Copy、Debug、From、Error などもトレイトです。', ch: [25] },
  { ja: 'トレイト境界', en: 'trait bound', d: 'T: PartialOrd のように、型パラメータが実装すべきトレイトを指定する制約です。', ch: [25] },
  { ja: '単相化', en: 'monomorphization', d: 'ジェネリックなコードを、実際に使われた具体的な型ごとに複製して専用のコードを生成するコンパイラの処理です。実行時のコストがありません。', ch: [25] },
  { ja: '既定実装', en: 'default implementation', d: 'トレイトのメソッドに本体を与えておき、実装側で上書きしなければそれが使われる仕組みです。', ch: [25] },
  { ja: '孤児規則', en: 'orphan rule', d: 'トレイトか型のどちらか一方が自分のクレートで定義されているときに限って impl を書ける、という規則です。', ch: [25] },
  { ja: '包括実装', en: 'blanket implementation', d: '{"impl<T: Display> ToString for T"} のように、ある条件を満たすすべての型に対してトレイトをまとめて実装することです。', ch: [25] },
  { ja: 'トレイトオブジェクト', en: 'trait object', d: 'dyn Trait の形で、トレイトを実装した異なる型の値を同じ型として扱う仕組みです。', ch: [25] },
  { ja: '仮想関数表', en: 'vtable', d: 'トレイトオブジェクトが持つ、各メソッドの実体の場所を示す関数ポインタの表です。トレイトの実装ごとに1つ作られます。', ch: [25] },
  { ja: '動的ディスパッチ', en: 'dynamic dispatch', d: '呼び出すメソッドを実行時に仮想関数表で決めることです。dyn Trait で起きます。', ch: [25] },
  { ja: '静的ディスパッチ', en: 'static dispatch', d: '呼び出すメソッドをコンパイル時に決めることです。ジェネリクスの単相化で起きます。', ch: [25] },
  { ja: '関連型', en: 'associated type', d: 'トレイトの中で「実装側が決める型」を宣言する仕組みです。Iterator の Item や TryFrom の Error がこれです。', ch: [25] },
]

const modules: Entry[] = [
  { ja: 'パッケージ', en: 'package', d: 'Cargo.toml を持つディレクトリで、cargo new が作る単位です。1つ以上のクレートを含みます。', ch: [22] },
  { ja: 'クレートルート', en: 'crate root', d: 'コンパイラがクレートの起点とするファイルです。src/main.rs はバイナリクレート、src/lib.rs はライブラリクレートのクレートルートです。', ch: [22] },
  { ja: '私的', en: 'private', d: 'モジュールの項目の既定の可視性で、親モジュールからは使えません。外に見せたい項目には pub を付けます。', ch: [22] },
  { ja: 'パス', en: 'path', d: 'モジュールの中の項目を指す名前です。crate:: から始まる絶対パスと、現在のモジュールからの相対パスがあります。', ch: [22] },
  { ja: 'グロブ', en: 'glob', d: 'use std::collections::*; のように、すべての公開項目をまとめて取り込む書き方です。出所が分かりにくくなるので、テストモジュールなど以外では避けます。', ch: [22] },
  { ja: '再公開', en: 're-export', d: 'pub use で、取り込んだ名前を自分のモジュールの項目として外に公開することです。', ch: [22] },
  { ja: 'フィーチャー', en: 'feature', d: 'クレートの機能のオン・オフで、Cargo.toml の features = [...] で指定します。rusqlite の bundled は SQLite 本体を同梱するフィーチャーです。', ch: [22] },
  { ja: 'ワークスペース', en: 'workspace', d: '1つのプロジェクトを複数のパッケージに分けて管理する仕組みです。メンバーは Cargo.lock と target ディレクトリを共有します。', ch: [22] },
  { ja: '仮想マニフェスト', en: 'virtual manifest', d: '[package] がなく [workspace] だけを持つ根の Cargo.toml です。', ch: [22] },
]

const collections: Entry[] = [
  { ja: 'コレクション', en: 'collection', d: '実行時に要素を増減できる、ヒープに置くデータ構造です。多くの用途は Vec と HashMap で足ります。', ch: [23] },
  { ja: 'ベクタ', en: 'vector', d: <>同じ型の値をヒープ上に隣り合わせに並べて保持する <code>{'Vec<T>'}</code> です。JavaScript の配列に相当します。</>, ch: [23] },
  { ja: '容量', en: 'capacity', d: 'Vec や String がヒープに確保済みの要素数です。長さが容量を超えると、より大きな領域を確保して移動します。', ch: [23] },
  { ja: '長さ', en: 'length', d: 'Vec や String に実際に入っている要素数（len）です。常に容量以下です。', ch: [23] },
  { ja: 'UTF-8', d: 'Unicode の文字を 1〜4 バイトで表す符号化方式です。Rust の String は中身が常に妥当な UTF-8 であることを保証するため、添字でのアクセスができません。', ch: [23] },
]

const errors: Entry[] = [
  { ja: '回復できないエラー', en: 'unrecoverable error', d: 'プログラムのバグや続行が危険な状態です。panic! でプログラムを止めます。', ch: [24] },
  { ja: '回復できるエラー', en: 'recoverable error', d: <>ファイルが見つからないといった想定内の失敗です。<code>{'Result<T, E>'}</code> 型の値として返し、呼び出し側に扱わせます。</>, ch: [24] },
  { ja: '巻き戻し', en: 'unwinding', d: 'panic が起きたとき、スタックをさかのぼって各関数のデータを後片付けしながらプログラムを終了させることです。', ch: [24] },
  { ja: 'バッファオーバーリード', en: 'buffer overread', d: '配列などの範囲外のメモリを読んでしまう事故で、情報漏えいにつながります。Rust は範囲外アクセスで panic して防ぎます。', ch: [24] },
  { ja: 'エラーの伝播', en: 'propagating errors', d: 'エラーを自分では処理せず、呼び出し元に返すことです。? 演算子で簡潔に書けます。', ch: [24] },
  { ja: '不正な状態', en: 'bad state', d: '前提・保証・不変条件が破れた状態です。以降のコードがその状態でないことに依存し、型で表現できない場合は panic が適切です。', ch: [24] },
]

const closures: Entry[] = [
  { ja: 'クロージャ', en: 'closure', d: 'JavaScript のアロー関数に当たる無名関数で、外側の変数を捕捉できます。Fn、FnMut、FnOnce のトレイトで分類されます。', ch: [27] },
  { ja: 'イテレータ', en: 'iterator', d: '要素を順に取り出す仕組みで、Iterator トレイトの next を実装したものです。map や filter などのメソッド連鎖で使います。', ch: [27] },
  { ja: '捕捉', en: 'capture', d: 'クロージャが外側の変数を使うことです。不変参照、可変参照、所有権の3通りがあり、本体の使い方からコンパイラが決めます。', ch: [27] },
  { ja: '消費アダプタ', en: 'consuming adapter', d: 'sum や collect のように、next を呼び切ってイテレータを使い果たすメソッドです。', ch: [27] },
  { ja: 'イテレータアダプタ', en: 'iterator adapter', d: 'map や filter のように、元のイテレータを包んで新しいイテレータを返すメソッドです。', ch: [27] },
  { ja: '遅延評価', en: 'lazy', d: 'イテレータは消費するメソッドを呼ぶまで何もしない、という性質です。Rust の Future も同じく、poll されるまで進みません。', ch: [27, 30] },
  { ja: 'ゼロコスト抽象化', en: 'zero-cost abstraction', d: '抽象化を使っても、手書きの低水準なコードと同等の性能になることです。イテレータはコンパイル時にループに展開されます。', ch: [27] },
]

const smartPointers: Entry[] = [
  { ja: 'スマートポインタ', en: 'smart pointer', d: 'ポインタとして振る舞いつつ、追加の情報や能力を持つデータ構造です。Box、Rc、RefCell のほか、String や Vec もその一種です。', ch: [28] },
  { ja: '参照カウント', en: 'reference counting', d: '値を指している参照の数を数え、0 になったときに値を解放する仕組みです。Rc が行います。', ch: [28] },
  { ja: '内部可変性', en: 'interior mutability', d: '不変参照しかない状況でも値を変更できるようにする設計パターンです。RefCell や Mutex がその代表です。', ch: [28] },
  { ja: '循環参照', en: 'reference cycle', d: '値どうしが互いを指し合い、参照カウントが 0 にならず永久に解放されない状態です。Weak で防ぎます。', ch: [28] },
]

const concurrency: Entry[] = [
  { ja: 'スレッド', en: 'thread', d: 'OS が提供する、複数の処理を本当に同時に走らせる単位です。std::thread::spawn で作ります。', ch: [29] },
  { ja: 'ブロック', en: 'blocking', d: 'ある処理が終わるまで現在のスレッドが止まることです。join や lock、同期的な I/O で起きます。', ch: [29] },
  { ja: 'メッセージ渡し', en: 'message passing', d: 'メモリを共有する代わりに、チャネルで値を送り合ってスレッド間で通信する方法です。', ch: [29] },
  { ja: 'チャネル', en: 'channel', d: '送信側と受信側の2つの半分からなる、スレッド間で値を送る仕組みです。標準ライブラリの mpsc は送信側を複数作れます。Tauri の Channel（Rust からフロントエンドへ順序付きで値を流す仕組み）は別の概念です。', ch: [29, 35] },
  { ja: '共有状態の並行性', en: 'shared-state concurrency', d: '複数のスレッドが同じメモリに触れる方式です。同時に触れるのを1つに制限するミューテックスなどが必要になります。', ch: [29] },
  { ja: 'ミューテックス', en: 'mutex', d: '相互排他（mutual exclusion）の道具で、lock を取ったスレッドだけが中身に触れます。Rust の Mutex は型として規則を強制し、ロックはスコープを抜けると自動で返ります。', ch: [29] },
  { ja: '毒化', en: 'poisoning', d: 'ロックを持ったスレッドが panic したとき、Mutex が「不変条件が壊れたかもしれない」と印を付ける仕組みです。lock() の結果が Err になります。', ch: [29] },
  { ja: 'マーカートレイト', en: 'marker trait', d: 'メソッドを持たず、「この型はこの文脈で使って安全だ」という印をコンパイラに伝えるためだけのトレイトです。Send と Sync が代表です。', ch: [29] },
  { ja: 'Future', d: '非同期に完了する計算を表す値です。JavaScript の Promise と違い、ランタイムに poll されるまで何もしません。', ch: [30] },
  { ja: 'ランタイム', en: 'runtime', d: '非同期コードを動かす実行基盤です。Rust には標準で付いていないので、Tokio などのクレートを選んで使います。', ch: [30] },
  { ja: 'Waker', d: 'Future が進められるようになったときに「もう一度 poll してくれ」とランタイムに知らせるための仕組みです。', ch: [30] },
  { ja: '協調的マルチタスク', en: 'cooperative multitasking', d: '各 Future が .await の地点で自発的に制御を手放すことで複数の処理を切り替える方式です。await のない長い計算は他のタスクを飢えさせます。', ch: [30] },
]

const rustTools: Entry[] = [
  { ja: '単体テスト', en: 'unit test', d: 'テスト対象と同じファイルの #[cfg(test)] mod tests に書くテストです。pub でない関数もテストできます。', ch: [31] },
  { ja: '結合テスト', en: 'integration test', d: 'プロジェクト直下の tests ディレクトリに置くテストです。別のクレートとしてコンパイルされ、公開 API だけを使って検証します。', ch: [31] },
  { ja: 'ドキュメントコメント', en: 'documentation comment', d: '/// で始まる Markdown のコメントで、cargo doc で HTML になります。中のコード例はドキュメントテストとして実行されます。', ch: [31] },
  { ja: 'Clippy', d: 'よくある間違いや改善できる書き方を指摘する lint の集まりです。cargo clippy で実行します。', ch: [31] },
  { ja: 'lint', d: 'コードに対する静的検査の規則です。グループごとに既定で有効か無効かが決まっています。', ch: [31] },
  { ja: <code>rustfmt</code>, d: 'Rust の公式スタイルガイドに従ってコードを整形するツールです。cargo fmt で実行します。', ch: [31] },
  { ja: 'フレームグラフ', en: 'flamegraph', d: 'CPU のサンプルを集めて、どの関数が時間を使っているかを幅で示す図です。cargo flamegraph で作れます。', ch: [58] },
]

const advanced: Entry[] = [
  { ja: 'unsafe Rust', d: 'コンパイラのメモリ安全の検査の外に出るための仕組みです。生ポインタの参照外しや他言語の関数の呼び出しなどが unsafe ブロックの中でだけ許されます。', ch: [32] },
  { ja: 'FFI', en: 'Foreign Function Interface', d: 'Rust が他言語の関数と直接やり取りする仕組みです。Tauri が OS の WebView を動かせるのもこれによります。', ch: [32] },
  { ja: '生ポインタ', en: 'raw pointer', d: '*const T と *mut T で表す、借用規則の外にあるポインタです。有効なメモリを指す保証がなく、参照外しには unsafe が要ります。', ch: [32] },
  { ja: 'メタプログラミング', en: 'metaprogramming', d: '「コードを書くコード」のことです。Rust ではマクロがこれに当たります。', ch: [32] },
  { ja: '宣言的マクロ', en: 'declarative macro', d: 'macro_rules! で定義する、渡されたソースコードの構造をパターンで照合して置き換えるマクロです。vec! がその例です。', ch: [32] },
  { ja: '手続き的マクロ', en: 'procedural macro', d: 'トークン列を受け取って Rust のコードで加工し、トークン列を返すマクロです。#[derive] や #[tauri::command] がこれです。', ch: [32] },
  { ja: 'ABI', en: 'Application Binary Interface', d: '関数の呼び出し規約です。Rust は C の ABI に合わせて関数を呼んだり公開したりでき、OS や既存ライブラリとつなぐ共通語になります。', ch: [32] },
]

const dataLayer: Entry[] = [
  { ja: 'core クレート', en: 'core crate', d: 'Tsumugi で、SQLite を扱う純粋なロジックを置く Tauri に依存しないクレート（tsumugi-core）です。Tauri のコマンドはこれを薄く包むだけにします。', ch: [41] },
  { ja: '自己参照', en: 'self-referencing', d: 'テーブルの列が同じテーブルの主キーを参照することです。pages.parent_id が pages(id) を参照してページの入れ子を表します。', ch: [41] },
  { ja: 'データ層', en: 'data layer', d: 'アーキテクチャのいちばん下で、SQLite を読み書きする部分です。接続、マイグレーション、リポジトリ関数、エラー型からなります。', ch: [42] },
  { ja: 'プラグマ', en: 'PRAGMA', d: 'SQLite の動作を接続ごとに設定・照会する特別な命令です。journal_mode や foreign_keys を設定します。', ch: [42] },
  { ja: '先行書き込みログ', en: 'write-ahead log、WAL', d: '変更を WAL ファイルに追記し、後でまとめて本体に反映する SQLite のトランザクション方式です。読み取りと書き込みが互いを妨げません。', ch: [42] },
  { ja: 'マイグレーション', en: 'migration', d: 'データベースの構造（スキーマ）を版管理する仕組みです。どこまで適用済みかを記録しながら、テーブルの作成や列の追加を行います。', ch: [42] },
  { ja: 'リポジトリ', en: 'repository', d: 'テーブルを読み書きする関数をまとめたモジュールです。SQL 文はここにだけ書き、ほかの層には漏らしません。', ch: [42] },
  { ja: '隣接リスト', en: 'adjacency list', d: '木構造を、各行が親の id を持つ形でテーブルに表す方法です。ルートは親が NULL です。', ch: [43] },
  { ja: '循環', en: 'cycle', d: 'ページを自分自身の子孫の下へ移すなどして、親をたどると自分に戻ってきてしまい木が壊れる状態です。Rust 側で必ず拒否します。', ch: [43] },
  { ja: '再帰 CTE', en: 'recursive common table expression', d: 'WITH RECURSIVE で、木やグラフの階層的な問い合わせを1回の SQL で行う機能です。「あるページの子孫すべて」を求めるのに使います。', ch: [43] },
  { ja: 'FTS5', d: 'SQLite に組み込まれた全文検索の拡張です。仮想表として転置インデックスを提供します。', ch: [46] },
  { ja: '転置インデックス', en: 'inverted index', d: '「語 → その語を含む文書の一覧」という表を先に作っておき、検索時はその表を引くだけにする仕組みです。本の巻末の索引と同じ発想です。', ch: [46] },
  { ja: 'トークナイザ', en: 'tokenizer', d: '本文をどんな単位の「語」に切るかを決める部品です。検索の質を決めます。', ch: [46] },
  { ja: '仮想表', en: 'virtual table', d: 'CREATE VIRTUAL TABLE で作る、普通の表と同じ SQL で操作できるが裏では拡張モジュールが動く表です。', ch: [46] },
  { ja: 'trigram トークナイザ', en: 'trigram tokenizer', d: '本文を1文字ずつずらした3文字の窓で切り、その3文字組を語として索引に入れるトークナイザです。日本語のように単語の切れ目がない文でも部分文字列で検索できます。SQLite 3.34.0 以降で使えます。', ch: [46] },
  { ja: 'contentless テーブル', en: 'contentless table', d: "content='' を指定した FTS5 の表で、索引だけを持ち、元の本文は保持しません。", ch: [46] },
  { ja: '簡易データベース', en: 'database', d: 'Tsumugi でページに1つ付けられる、列（プロパティ）と行を持つ表形式のデータです。', ch: [47] },
  { ja: 'プロパティ', en: 'property', d: '簡易データベースの列です。種類（テキスト、数値、チェックなど）を持ちます。', ch: [47] },
  { ja: 'EAV', en: 'Entity-Attribute-Value', d: '「対象・属性・値」の3つ組でデータを表す設計です。列が動的に増える表を固定のテーブル構造で保存するときに検討されます。', ch: [47] },
  { ja: 'ビュー', en: 'view', d: '簡易データベースの並べ替えと絞り込みの設定を保存したものです。SQL の VIEW とは別で、Tsumugi では db_views テーブルに JSON で保存します。', ch: [48] },
  { ja: 'SQL インジェクション', en: 'SQL injection', d: '利用者の入力を SQL 文字列に混ぜたことで、文の構造が書き換えられてしまう攻撃です。', ch: [48] },
  { ja: 'ホワイトリスト', en: 'allowlist', d: '許可する値をあらかじめ列挙し、それ以外を拒否する方式です。列名などパラメータにできない部分の対策に使います。', ch: [48] },
  { ja: 'バインドパラメータ', en: 'bound parameter', d: 'SQL 文の中の ? や :名前 で、実行時に値を埋める場所です。SQL は先に構文解析され、値は後からバインドされるので、値の中に引用符があっても構造が変わりません。', ch: [48] },
  { ja: 'upsert', d: 'INSERT ... ON CONFLICT DO UPDATE で、新規でも更新でも同じ文で済ませる書き方です。', ch: [48] },
]

/* ================= Tauri・配布・モバイル ================= */

const landscape: Entry[] = [
  { ja: 'Tauri', d: '画面を Web の技術で、OS に触れる部分を Rust で書くアプリ開発フレームワークです。ブラウザエンジンを同梱せず OS の WebView を使うため、アプリが小さくなります。Tauri 2 からは iOS と Android にも対応します。', ch: [1] },
  { ja: 'Electron', d: 'Chromium と Node.js をバイナリに埋め込んで、JavaScript、HTML、CSS でデスクトップアプリを作るフレームワークです。', ch: [1] },
  { ja: 'Flutter', d: 'Dart 言語で書くクロスプラットフォームの UI ツールキットです。OS の部品を使わず、各 UI コントロールを自身で描画します。', ch: [1] },
  { ja: 'React Native', d: 'React とプラットフォームのネイティブ機能を使って Android と iOS のアプリを作るフレームワークです。画面の部品は Web の DOM ではなく OS 本来の view です。', ch: [1] },
  { ja: 'WebView', d: 'OS に元から備わっている、Web ページを表示する部品です。macOS と iOS では WebKit（WKWebView）、Windows では WebView2、Linux では WebKitGTK、Android では Android System WebView が使われます。', ch: [1, 33] },
  { ja: 'Tsumugi', d: '本書の第6部で作る、Notion 風のローカル保存型ノートアプリです。名前とデザインはオリジナルで、Notion とは無関係です。', ch: [1] },
  { ja: 'Xcode Command Line Tools', d: 'Apple が提供するコマンドライン用の開発ツール一式です。C コンパイラやリンカ、git が含まれ、Rust が実行ファイルを作るときに使います。', ch: [2] },
  { ja: 'Homebrew', d: 'macOS 向けのパッケージマネージャです。Tauri の公式資料で必要になるのは iOS 向けに CocoaPods を入れる場面だけです。', ch: [2] },
  { ja: <code>create-tauri-app</code>, d: 'Tauri 公式のひな形生成ツールです。フロントエンドのフレームワークを選んで、最初のプロジェクトを作ります。', ch: [2] },
]

const architecture: Entry[] = [
  { ja: 'Core プロセス', en: 'Core process', d: 'Rust で書かれた、アプリの入口であり OS に完全にアクセスできる唯一の部分です。ウィンドウやトレイを作り、全体の状態を持ちます。', ch: [1] },
  { ja: 'WebView プロセス', en: 'WebView process', d: 'Core が起動する、画面を描く役割のプロセスです。普通の Web 開発と同じツールやフレームワークが使えます。', ch: [1] },
  { ja: 'IPC', en: 'inter-process communication', d: 'Core プロセスと WebView プロセスの間の通信です。すべての IPC は Core を通ります。', ch: [1] },
  { ja: 'マルチプロセス構成', en: 'multi-process architecture', d: 'Core と WebView を別プロセスにする構成です。応答性、障害の分離、最小権限の原則のために採用されています。', ch: [33] },
  { ja: 'グローバルな状態', en: 'global state', d: '設定やデータベース接続のように、アプリ全体で共有する状態です。Core プロセスに置くことが勧められています。', ch: [33] },
  { ja: 'TAO', d: 'Tauri が使うクロスプラットフォームのウィンドウ作成ライブラリです。winit のフォークとして始まり、Linux の実装を GTK に置き換えています。', ch: [33] },
  { ja: 'WRY', d: 'Tauri が使うクロスプラットフォームの WebView 描画ライブラリです。どの WebView を使い、どうやりとりするかを決める抽象層です。', ch: [33] },
  { ja: '非同期メッセージパッシング', en: 'asynchronous message passing', d: 'プロセス同士が、単純なデータ形式に直列化した要求と応答をやりとりする方式です。Tauri の IPC はこの形で、受け取る側が要求を拒否したり捨てたりできます。', ch: [33] },
  { ja: 'コマンド', en: 'command', d: 'フロントエンドの JavaScript から Rust の関数を呼び出し、引数を渡して戻り値を受け取る仕組みです。Rust 側は #[tauri::command]、JS 側は invoke で書きます。', ch: [34] },
  { ja: <code>ts-rs</code>, d: 'Rust の型から TypeScript の型宣言を生成するクレートです。#[derive(TS)] を付けた構造体の .ts ファイルが書き出されます。', ch: [34] },
  { ja: <code>tauri-specta</code>, d: 'コマンドの関数から TypeScript の呼び出し関数と型を丸ごと生成するクレートです。', ch: [34] },
  { ja: '管理される状態', en: 'managed state', d: 'manage で登録した値を Tauri が保持し、コマンドの引数 State やハンドルの state() から参照できるようにする仕組みです。', ch: [36] },
  { ja: <code>AppHandle</code>, d: 'コマンドの外（イベントのハンドラや別スレッド）からアプリにアクセスするためのハンドルです。', ch: [36] },
  { ja: <code>Manager</code>, d: 'App、AppHandle、Window などが共通して実装するトレイトで、state() や path() などアプリの機能にアクセスするメソッドを提供します。', ch: [36] },
  { ja: <code>PathResolver</code>, d: 'Manager::path() が返す、OS ごとの標準的なディレクトリ（app_data_dir など）を解決するものです。', ch: [36] },
]

const security: Entry[] = [
  { ja: 'permission（権限）', en: 'permission', d: 'コマンドに対する明示的な特権の記述です。コマンドの許可または拒否、スコープ（許すパスや URL の範囲）の定義、あるいはその両方を表し、識別子は「プラグイン名:権限名」の形です。', ch: [37] },
  { ja: 'capability', d: 'permission をまとめて、どのウィンドウまたは WebView に与えるかを決める単位です。src-tauri/capabilities/ の JSON で定義します。', ch: [37] },
  { ja: 'permission セット', en: 'permission set', d: '複数の permission を束ねて新しい識別子を付けたものです。各プラグインの default はこの形で定義されています。', ch: [37] },
  { ja: 'runtime authority', d: 'Tauri Core の一部で、capability・permission・スコープを実行時に保持し、どのウィンドウがどのコマンドを呼べるかを判定するものです。', ch: [37] },
  { ja: 'CSP', en: 'Content Security Policy', d: 'ページがスクリプト・画像・接続先などをどの送信元から取得してよいかを WebView に伝えるウェブ標準です。tauri.conf.json の app.security.csp で設定します。', ch: [37] },
  { ja: 'brownfield', d: 'Tauri の既定の IPC パターンです。フロントエンドの invoke がそのまま Core に届きます。', ch: [37] },
  { ja: 'isolation パターン', en: 'isolation pattern', d: 'フロントエンドから Core へ届く API メッセージを、Core に到達する前に別の JavaScript で横取りして検証・改変する方式です。', ch: [37] },
]

const pluginsWindows: Entry[] = [
  { ja: 'プラグイン', en: 'plugin', d: 'Tauri 本体に含まれない機能（ファイル、ダイアログ、通知など）を提供する、Cargo クレートと npm パッケージの組です。モバイル対応のプラグインは Swift と Kotlin のコードも含みます。', ch: [38, 56] },
  { ja: 'ベースディレクトリ', en: 'base directory', d: 'fs プラグインの JS 側の関数が、パスとあわせて受け取る基準のディレクトリ（AppData など）です。', ch: [38] },
  { ja: <code>Window</code>, d: 'Tauri が管理する OS のウィンドウそのものを表す型です。タイトルバー、枠、位置、大きさ、フォーカスを持ちます。', ch: [39] },
  { ja: <code>Webview</code>, d: 'ウィンドウの中に置かれる、Web コンテンツを表示する領域を表す Tauri の型です。OS の WebView を包んでいます。', ch: [39] },
  { ja: <code>WebviewWindow</code>, d: 'Window と Webview を一緒に包む型です。ウィンドウ1つに WebView 1つという、ほとんどのアプリの形を表します。', ch: [39] },
  { ja: 'ラベル', en: 'label', d: 'ウィンドウと WebView を識別する文字列です。既定は "main" で、capability はこのラベルで対象を決めます。', ch: [39] },
  { ja: 'グローバルショートカット', en: 'global shortcut', d: 'アプリがフォーカスを持っていないときにも効くショートカットキーです。global-shortcut プラグインで登録します。', ch: [39] },
  { ja: 'WebDriver', d: 'ブラウザを自動操作する W3C の規格です。Tauri は E2E テストのために tauri-driver を提供しますが、macOS には対応していません。', ch: [40] },
  { ja: 'asset プロトコル', en: 'asset protocol', d: 'OS 上のファイルを WebView が読み込める URL に変換する Tauri の仕組みです。convertFileSrc で変換し、スコープの範囲内のファイルだけを返します。', ch: [45] },
]

const distribution: Entry[] = [
  { ja: 'フロントエンドのビルド', en: 'frontend build', d: 'tauri build の最初の段階で、beforeBuildCommand を実行して Vite が dist/ に静的ファイルを書き出すことです。', ch: [51] },
  { ja: 'バンドル', en: 'bundle', d: 'tauri build の最後の段階で、bundle.targets に列挙された形式のインストーラ（.dmg、.msi、.deb など）を作ることです。', ch: [51] },
  { ja: 'ディスクイメージ', en: 'disk image', d: 'macOS で .app を包んで配布する .dmg 形式です。開くとアプリを Applications フォルダへドラッグする画面が出ます。', ch: [51] },
  { ja: 'ユニバーサルバイナリ', en: 'universal binary', d: 'Apple シリコンと Intel の両方の機械語を1つの実行ファイルに入れたものです。--target universal-apple-darwin で作ります。', ch: [51] },
  { ja: 'AppImage', d: '依存ライブラリを1つのファイルに同梱した Linux 向けの配布形式です。実行権限を付けて起動するだけで、インストールは要りません。', ch: [51] },
  { ja: 'コード署名', en: 'code signing', d: '認証局から発行された証明書を使って実行ファイルのハッシュに署名し、「この開発者が作り、改ざんされていない」ことを利用者の OS が検証できるようにする仕組みです。', ch: [52] },
  { ja: '公証', en: 'notarization', d: '署名済みのアプリを Apple に提出し、マルウェアの自動検査を受けてチケットをもらう macOS の手続きです。', ch: [52] },
  { ja: 'Gatekeeper', d: '利用者の Mac で動く検証機能です。App Store 外から入手したアプリを開くときに署名と公証を確認し、警告を出し分けます。', ch: [52] },
  { ja: 'ステープル', en: 'stapling', d: '公証でもらったチケットをアプリや dmg に添付する操作です。利用者の Mac がオフラインでも公証済みと確認できます。', ch: [52] },
  { ja: 'Developer ID Application', d: 'App Store 外で macOS アプリを配るときに使う Apple の署名用証明書です。', ch: [52] },
  { ja: 'Apple Distribution', d: 'App Store と TestFlight に提出するときに使う Apple の署名用証明書です。', ch: [52, 57] },
  { ja: '強化されたランタイム', en: 'hardened runtime', d: '実行時のメモリ保護などを有効にする署名オプションです。公証に必要で、Tauri では既定で有効です。', ch: [52] },
  { ja: 'アドホック署名', en: 'ad-hoc signing', d: '証明書なしで "-" という疑似アイデンティティで署名することです。警告は消えないので、公開前の内部テスト向けです。', ch: [52] },
  { ja: 'OV 証明書', en: 'OV certificate', d: 'Windows のコード署名に使う組織認証の証明書です。', ch: [52] },
  { ja: 'EV 証明書', en: 'EV certificate', d: 'Windows のコード署名に使う拡張認証の証明書です。2024 年以降は OV と同じく SmartScreen の評判を積み上げる必要があります。', ch: [52] },
  { ja: 'タイムスタンプサーバー', en: 'timestamp server', d: '署名に信頼できる時刻を添えるサーバーです。証明書の有効期限が切れた後も、有効期間中に署名されたと判定されます。', ch: [52] },
  { ja: 'updater プラグイン', en: 'updater plugin', d: '更新サーバーか静的な JSON から更新情報を取得し、Tauri 自身の署名を検証してインストールする公式プラグインです。署名の検証は無効にできません。', ch: [53] },
  { ja: <code>tauri-action</code>, d: 'GitHub Actions で各 OS のジョブで tauri build を実行し、成果物を1つの GitHub Release に集め、latest.json を生成する公式の Action です。', ch: [53] },
]

const mobile: Entry[] = [
  { ja: 'ライブラリ', en: 'library', d: 'モバイルでは、Rust のコードを実行ファイルではなくライブラリ（staticlib や cdylib）としてビルドし、各 OS のアプリ殻に組み込みます。', ch: [54] },
  { ja: 'NDK', en: 'Native Development Kit', d: 'C や Rust のようなネイティブコードを Android 向けにコンパイルするためのツールチェーンです。', ch: [54] },
  { ja: '開発チーム', en: 'development team', d: 'iOS の署名に必要な Apple Developer アカウントのチーム ID です。bundle.iOS.developmentTeam か環境変数で渡します。', ch: [54] },
  { ja: 'シミュレーター', en: 'simulator', d: 'Mac 上で動く iOS の仮想端末です。専用の rustup ターゲット（aarch64-apple-ios-sim など）を使います。', ch: [54] },
  { ja: 'エミュレーター', en: 'emulator', d: 'Mac 上で動く Android の仮想端末です。', ch: [54] },
  { ja: 'セーフエリア', en: 'safe area', d: 'ノッチやホームインジケーターに隠れたり操作を邪魔されたりしない画面の領域です。CSS の env(safe-area-inset-*) で余白を取ります。', ch: [55] },
  { ja: '背面', en: 'background', d: 'ユーザーがほかのアプリに切り替えたときにアプリが回る状態です。OS はいつでもそのプロセスを終了させてよいと判断します。', ch: [55] },
  { ja: '証明書', en: 'certificate', d: 'iOS で開発者の身元を示す鍵のペアです。デバッグ用の Apple Development と配布用の Apple Distribution があります。', ch: [57] },
  { ja: 'App ID', d: 'iOS アプリの識別子です。tauri.conf.json の identifier と同じ Bundle ID を App Store Connect に登録します。', ch: [57] },
  { ja: 'プロビジョニングプロファイル', en: 'provisioning profile', d: '証明書と App ID を結び付け、アプリが使う機能を有効にするファイルです。開発用にはインストールを許す端末の一覧も含まれます。', ch: [57] },
  { ja: '自動署名', en: 'automatic signing', d: 'Xcode に追加した Apple アカウントを使い、証明書とプロファイルを Xcode が自動で作成・更新する方式です。Tauri の既定です。', ch: [57] },
  { ja: '手動署名', en: 'manual signing', d: 'CI など Xcode のアカウントを使えない環境で、証明書とプロファイルを base64 にして環境変数で渡す方式です。', ch: [57] },
  { ja: 'キーストア', en: 'keystore', d: 'Android の署名鍵を保管するファイル（.jks）です。JDK 付属の keytool で作ります。', ch: [57] },
  { ja: 'アップロード鍵', en: 'upload key', d: 'Play Console へのアップロードが本人によるものだと検証するために使う開発者の鍵です。', ch: [57] },
  { ja: 'Play App Signing', d: 'ユーザーに配布する APK に署名するアプリ署名鍵を Google が保管する仕組みです。', ch: [57] },
  { ja: 'Android App Bundle', en: '.aab', d: 'Google Play に提出する公開形式です。コンパイル済みのコードとリソースを含み、APK の生成と署名は Google Play に委ねます。', ch: [57] },
  { ja: 'TestFlight', d: 'Apple のベータ配布サービスです。App Store Connect にアップロードしたビルドをテスターに配れます。', ch: [57] },
]

const next: Entry[] = [
  { ja: 'サーバー権威', en: 'server authority', d: 'サーバーが唯一の正本を持ち、端末は常にサーバーに書きに行く同期方式です。オフラインでは書けないか、後勝ちで片方が消えます。', ch: [58] },
  { ja: 'OT（操作変換）', en: 'operational transformation', d: '各端末が操作を送り、中央の権威が受け付ける順序を決め、順序から外れた操作を変換してやり直す同期方式です。', ch: [58] },
  { ja: 'CRDT', en: 'Conflict-free Replicated Data Type', d: 'どの順で更新を適用しても同じ結果になる性質をデータ構造自体に持たせたものです。中央サーバーを前提とせず、オフライン編集を自然に扱えます。', ch: [58] },
  { ja: 'Automerge', d: 'ローカルファーストな設計を掲げる CRDT ライブラリです。Rust で実装され、WebAssembly 経由でブラウザから使えます。', ch: [58] },
  { ja: 'ローカルファースト', en: 'local-first', d: '各利用者の手元のコピーを正本とする設計です。', ch: [58] },
  { ja: 'Yjs', d: '高性能な CRDT の実装で、Y.Map や Y.Array のような共有型を提供します。多くのエディタとの結合が用意されています。', ch: [58] },
]

const count = [jsTools, jsLang, tsLang, reactCore, styling, tsumugiFront, rustBasics, ownership, rustTypes, modules, collections, errors, closures, smartPointers, concurrency, rustTools, advanced, dataLayer, landscape, architecture, security, pluginsWindows, distribution, mobile, next].reduce((n, a) => n + a.length, 0)

const chapter: Chapter = {
  number: 59,
  part: 9,
  title: '用語集',
  summary:
    '本書の各章で定義した用語を、JavaScript・TypeScript・React、Rust、Tauri・配布・モバイルの3つの分野に分けてまとめた付録です。各項目から初出の章に戻れます。',
  goals: [
    '本書で定義した用語の意味を、分野ごとに確認できる',
    '用語の初出の章に戻って、文脈の中での説明を読み直せる',
    '同じ言葉が分野によって別の意味で使われている場合を見分けられる',
  ],
  prerequisites: [],
  sections: [
    {
      id: 'how-to-use',
      title: 'この用語集の使い方',
      body: (
        <>
          <p>
            この付録は、本文で初出の際に定義した用語（{count} 項目）を集めたものです。各項目の説明は、その章の文脈を知らなくても単独で読めるように書き、末尾の矢印の先に初出の章へのリンクを置いています。説明の本体が別の章にある場合や、同じ言葉が別の章で別の意味を持つ場合は、その章へのリンクも続けて示します。
          </p>
          <p>
            用語は五十音順ではなく分野別に並べています。<ChapterLink n={3} /> から <ChapterLink n={17} /> までの内容は「JavaScript・TypeScript・React の用語」、<ChapterLink n={18} /> から <ChapterLink n={32} /> までと Tsumugi のデータ層は「Rust の用語」、<ChapterLink n={33} /> 以降は「Tauri・配布・モバイルの用語」です。各節の中はさらに小見出しで区切り、本文の章の順に並べています。特定の言葉を探すときは、ブラウザのページ内検索か、画面上部の検索機能を使ってください。
          </p>
          <p>
            表記揺れがある用語（ムーブと move など）は1項目にまとめ、別名を併記しました。英語名は見出し語の後ろに丸かっこで示しています。本書の用語の出典は各章の参考資料にありますが、分野ごとの一次資料として、Rust は The Rust Programming Language<Ref n={1} />、React は react.dev<Ref n={2} />、Tauri は v2.tauri.app<Ref n={3} />、TypeScript は TypeScript Handbook<Ref n={4} />、Web 標準は MDN Web Docs<Ref n={5} /> を参照してください。
          </p>
        </>
      ),
    },
    {
      id: 'js-ts-react',
      title: 'JavaScript・TypeScript・React の用語',
      body: (
        <>
          <h3>ツールと実行環境</h3>
          <Glossary items={jsTools} />
          <h3>JavaScript と DOM</h3>
          <Glossary items={jsLang} />
          <h3>TypeScript</h3>
          <Glossary items={tsLang} />
          <h3>React</h3>
          <Glossary items={reactCore} />
          <h3>スタイリングとアクセシビリティ</h3>
          <Glossary items={styling} />
          <h3>Tsumugi のフロントエンド</h3>
          <Glossary items={tsumugiFront} />
        </>
      ),
    },
    {
      id: 'rust',
      title: 'Rust の用語',
      body: (
        <>
          <h3>ツールと基本文法</h3>
          <Glossary items={rustBasics} />
          <h3>所有権・参照・ライフタイム</h3>
          <Glossary items={ownership} />
          <h3>構造体・列挙型・トレイト</h3>
          <Glossary items={rustTypes} />
          <h3>モジュールとクレート</h3>
          <Glossary items={modules} />
          <h3>コレクションと文字列</h3>
          <Glossary items={collections} />
          <h3>エラー処理</h3>
          <Glossary items={errors} />
          <h3>クロージャとイテレータ</h3>
          <Glossary items={closures} />
          <h3>スマートポインタ</h3>
          <Glossary items={smartPointers} />
          <h3>並行処理と非同期処理</h3>
          <Glossary items={concurrency} />
          <h3>テストと開発ツール</h3>
          <Glossary items={rustTools} />
          <h3>発展的な機能</h3>
          <Glossary items={advanced} />
          <h3>Tsumugi のデータ層（SQLite）</h3>
          <Glossary items={dataLayer} />
        </>
      ),
    },
    {
      id: 'tauri-dist-mobile',
      title: 'Tauri・配布・モバイルの用語',
      body: (
        <>
          <h3>技術の選択肢と開発環境</h3>
          <Glossary items={landscape} />
          <h3>アーキテクチャと IPC</h3>
          <Glossary items={architecture} />
          <h3>セキュリティモデル</h3>
          <Glossary items={security} />
          <h3>プラグイン・ウィンドウ・テスト</h3>
          <Glossary items={pluginsWindows} />
          <h3>デスクトップでの配布</h3>
          <Glossary items={distribution} />
          <h3>モバイル</h3>
          <Glossary items={mobile} />
          <h3>同期の設計</h3>
          <Glossary items={next} />
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/',
      accessed: '2026-11-08',
      note: 'Rust の用語の一次資料。各章の参考資料で個別の節を参照している。',
    },
    {
      title: 'React – Quick Start',
      publisher: 'Meta Open Source（react.dev）',
      url: 'https://react.dev/learn',
      accessed: '2026-11-08',
      note: 'React の用語の一次資料。',
    },
    {
      title: 'Tauri 2.0',
      publisher: 'Tauri Programme within The Commons Conservancy',
      url: 'https://v2.tauri.app/',
      accessed: '2026-11-08',
      note: 'Tauri の用語（コマンド、capability、permission、プラグイン、配布）の一次資料。',
    },
    {
      title: 'TypeScript Documentation',
      publisher: 'Microsoft',
      url: 'https://www.typescriptlang.org/docs/',
      accessed: '2026-11-08',
      note: 'TypeScript の用語の一次資料（Handbook への入口）。',
    },
    {
      title: 'MDN Web Docs',
      publisher: 'Mozilla',
      url: 'https://developer.mozilla.org/en-US/',
      accessed: '2026-11-08',
      note: 'JavaScript、DOM、CSS などウェブ標準の用語の一次資料。',
    },
  ],
}

export default chapter
