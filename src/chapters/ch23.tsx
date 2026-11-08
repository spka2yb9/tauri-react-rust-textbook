import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 23-1 Vec の len と capacity ---------- */
function VecCapacityFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="Vec の len と capacity の関係。上段は len 3 capacity 4 で、push しても空きがあるので同じヒープ領域に書き込む。下段は len 4 capacity 4 の状態で push すると、より大きな領域を確保して全要素をコピーし、ptr が新しい領域を指す">
      <defs>
        <marker id="arrow23a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        {/* 上段 */}
        <text x="20" y="30" fontWeight="600">① len 3 / capacity 4 のとき push(4)</text>
        <rect x="20" y="45" width="130" height="80" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="30" y="65" fontFamily="monospace" fontSize="12">ptr</text>
        <text x="30" y="88" fontFamily="monospace" fontSize="12">len 3 → 4</text>
        <text x="30" y="111" fontFamily="monospace" fontSize="12">capacity 4</text>
        {[1, 2, 3, null].map((v, i) => (
          <g key={i}>
            <rect x={220 + i * 50} y="65" width="50" height="40" fill={v === null ? 'var(--fig-bg)' : 'var(--fig-box2)'} stroke="var(--fig-line)" strokeDasharray={v === null ? '4 3' : undefined} />
            <text x={245 + i * 50} y="90" textAnchor="middle" fontFamily="monospace" fill={v === null ? 'var(--fig-muted)' : undefined}>{v === null ? '4' : v}</text>
          </g>
        ))}
        <path d="M150,65 L215,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow23a)" />
        <text x="450" y="90" fill="var(--fig-accent)">空きに書くだけ（速い）</text>

        <line x1="20" y1="150" x2="620" y2="150" stroke="var(--fig-line)" strokeDasharray="4 4" />

        {/* 下段 */}
        <text x="20" y="178" fontWeight="600">② len 4 / capacity 4 のとき push(5)</text>
        <rect x="20" y="193" width="130" height="80" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="30" y="213" fontFamily="monospace" fontSize="12">ptr（付け替え）</text>
        <text x="30" y="236" fontFamily="monospace" fontSize="12">len 4 → 5</text>
        <text x="30" y="259" fontFamily="monospace" fontSize="12">capacity 4 → 8</text>
        {/* old */}
        <g opacity="0.5">
          {[1, 2, 3, 4].map((v, i) => (
            <g key={i}>
              <rect x={220 + i * 36} y="190" width="36" height="30" fill="var(--fig-box2)" stroke="var(--fig-line)" />
              <text x={238 + i * 36} y="210" textAnchor="middle" fontFamily="monospace" fontSize="12">{v}</text>
            </g>
          ))}
          <text x="380" y="210" fontSize="12" fill="var(--fig-muted)">旧領域（解放）</text>
        </g>
        {/* new */}
        {[1, 2, 3, 4, 5, null, null, null].map((v, i) => (
          <g key={i}>
            <rect x={220 + i * 36} y="240" width="36" height="30" fill={v === null ? 'var(--fig-bg)' : 'var(--fig-box4)'} stroke="var(--fig-line)" strokeDasharray={v === null ? '4 3' : undefined} />
            <text x={238 + i * 36} y="260" textAnchor="middle" fontFamily="monospace" fontSize="12">{v ?? ''}</text>
          </g>
        ))}
        <path d="M150,213 C190,213 190,255 215,255" fill="none" stroke="var(--fig-accent)" strokeWidth="2" markerEnd="url(#arrow23a)" />
        <path d="M290,222 L290,238" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow23a)" />
        <text x="520" y="260" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">新領域にコピー</text>
      </g>
      <text x="320" y="305" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：伸び方（ここでは2倍）は保証されていない。再確保で要素が移動するので、古い要素への参照は持てない</text>
    </svg>
  )
}

/* ---------- 図 23-2 UTF-8 のバイト列と char ---------- */
function Utf8Figure() {
  const bytes = [
    { b: 'E3', c: 'あ', first: true },
    { b: '81' },
    { b: '82' },
    { b: 'E3', c: 'ノ', first: true },
    { b: '83' },
    { b: '8E', },
    { b: '41', c: 'A', first: true },
  ]
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="文字列 あノA の UTF-8 表現。上段は 7 個のバイト（あ は 3 バイト、ノ は 3 バイト、A は 1 バイト）、下段は 3 個の char。len() は 7 を返し、chars().count() は 3 を返す。バイト位置 1 で切ると文字の途中になる">
      <g fontSize="13">
        <text x="20" y="30" fontWeight="600">バイト（u8）：len() = 7</text>
        {bytes.map((x, i) => (
          <g key={i}>
            <rect x={20 + i * 80} y="45" width="80" height="44" fill={x.first ? 'var(--fig-box2)' : 'var(--fig-bg)'} stroke="var(--fig-line)" />
            <text x={60 + i * 80} y="72" textAnchor="middle" fontFamily="monospace">0x{x.b}</text>
            <text x={60 + i * 80} y="106" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">{i}</text>
          </g>
        ))}
        <text x="20" y="150" fontWeight="600">文字（char）：chars().count() = 3</text>
        <rect x="20" y="165" width="240" height="44" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="140" y="193" textAnchor="middle">'あ'（U+3042、3 バイト）</text>
        <rect x="260" y="165" width="240" height="44" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="380" y="193" textAnchor="middle">'ノ'（U+30CE、3 バイト）</text>
        <rect x="500" y="165" width="80" height="44" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="540" y="193" textAnchor="middle">'A'（1）</text>
        <line x1="100" y1="40" x2="100" y2="215" stroke="var(--fig-danger)" strokeWidth="2" strokeDasharray="5 3" />
        <text x="20" y="235" textAnchor="start" fontSize="12" fill="var(--fig-danger)">&s[0..1] はここで切る → 文字の途中なので panic</text>
      </g>
      <text x="320" y="255" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">橙：各文字の先頭バイト。添字はバイト位置</text>
    </svg>
  )
}

/* ---------- 図 23-3 HashMap ---------- */
function HashMapFigure() {
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label="HashMap の仕組みの模式図。キー Blue をハッシュ関数に通して数値にし、その数値でバケットの位置を決めて値 10 を置く。取り出すときも同じ計算で位置が分かるので、要素数に関わらずほぼ一定時間で済む">
      <defs>
        <marker id="arrow23c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="80" width="120" height="44" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="80" y="107" textAnchor="middle" fontFamily="monospace">"Blue"</text>
        <text x="80" y="65" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">キー K</text>
        <path d="M140,102 L195,102" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow23c)" />
        <rect x="200" y="70" width="140" height="64" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" strokeWidth="2" />
        <text x="270" y="96" textAnchor="middle" fontWeight="600">ハッシュ関数</text>
        <text x="270" y="118" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">既定は SipHash</text>
        <path d="M340,102 L395,102" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow23c)" />
        <text x="367" y="92" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">位置</text>
        {/* buckets */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="400" y={30 + i * 36} width="220" height="34" fill={i === 2 ? 'var(--fig-box4)' : 'var(--fig-bg)'} stroke="var(--fig-line)" />
            <text x="412" y={52 + i * 36} fontSize="12" fill="var(--fig-muted)">{i}</text>
            {i === 2 && <text x="510" y={52 + i * 36} textAnchor="middle" fontFamily="monospace">("Blue", 10)</text>}
            {i === 4 && <text x="510" y={52 + i * 36} textAnchor="middle" fontFamily="monospace">("Yellow", 50)</text>}
          </g>
        ))}
        <text x="510" y="20" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">バケット（ヒープ上）</text>
      </g>
      <text x="320" y="232" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：実際の内部構造は省略。並び順はハッシュで決まるので、挿入順とは無関係</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 23,
  part: 4,
  title: 'コレクションと文字列',
  summary:
    '標準ライブラリのコレクションのうち、最もよく使う Vec・String・HashMap を学びます。Vec の len と capacity、要素の読み書きと借用規則の関係、String が UTF-8 のバイト列であることと添字でアクセスできない理由、HashMap の entry API と所有権の扱いを押さえます。',
  goals: [
    'Vec を作成・追加・参照・走査でき、添字と get の違いを説明できる',
    'len と capacity の違いと、push で再確保が起きる仕組みを説明できる',
    'String が UTF-8 のバイト列であることを理解し、バイト・char の2つの見方を使い分けられる',
    'String に添字でアクセスできない理由と、chars・bytes・スライスの正しい使い方を説明できる',
    'HashMap で挿入・取得・更新ができ、entry API を使える',
    '他のコレクション（VecDeque、BTreeMap、HashSet など）の使いどころを概観できる',
  ],
  prerequisites: [19, 20, 21],
  sections: [
    {
      id: 'intro',
      title: 'ヒープに置く可変長のデータ',
      body: (
        <>
          <p>
            <ChapterLink n={18} /> の配列とタプルは長さが固定でした。実行時に要素を増やしたり減らしたりするデータは、ヒープに置く
            <Term en="collection">コレクション</Term>
            を使います。標準ライブラリにはいくつもありますが、公式の文書は「ほとんどの用途は <code>Vec</code> と <code>HashMap</code> で足りる」と述べています。<Ref n={6} /> この章では、JavaScript の配列に相当する <code>Vec</code>、文字列の <code>String</code>、オブジェクトや <code>Map</code> に相当する <code>HashMap</code> の3つを扱います。
          </p>
          <p>
            いずれも <ChapterLink n={19} /> の <code>String</code> と同じ構造、つまりスタック上の小さな値がヒープ上のデータを指す形をしています。だから所有権の規則と借用規則がそのまま効きます。コレクションを理解するコツは、「ヒープのどこに何があり、どの参照がそこを指しているか」を常に思い浮かべることです。
          </p>
        </>
      ),
    },
    {
      id: 'vec',
      title: 'Vec：可変長の配列',
      body: (
        <>
          <p>
            <Term en="vector">ベクタ</Term>
            <code>Vec&lt;T&gt;</code> は、同じ型 <code>T</code> の値をヒープ上に隣り合わせに並べて保持します。<Ref n={1} />
          </p>
          <Code
            lang="rust"
            code={`
let v: Vec<i32> = Vec::new(); // 空なので型注釈が要る
let mut v = vec![1, 2, 3];    // vec! マクロ。型は推論される
v.push(4);                    // 追加には mut が要る
v.push(5);

let third: &i32 = &v[2];      // 添字：範囲外なら panic
match v.get(100) {            // get：Option<&T> を返す
    Some(x) => println!("{x}"),
    None => println!("100番目はない"),
}
`}
          />
          <p>
            要素の読み方は2つあります。<code>&v[2]</code> は範囲外で panic するので、範囲外が起きたらプログラムを止めたいときに使います。<code>v.get(2)</code> は <code>Option&lt;&T&gt;</code> を返すので、利用者の入力のように範囲外が普通に起こりうるときに使います。<Ref n={1} />
          </p>
          <h3>len と capacity</h3>
          <p>
            <code>Vec</code> は、ポインタ、
            <Term en="capacity">容量</Term>
            、
            <Term en="length">長さ</Term>
            の3つ組です。長さ <code>len</code> は実際に入っている要素数、容量 <code>capacity</code> はヒープに確保済みの要素数で、<code>len &lt;= capacity</code> が常に成り立ちます。<Ref n={5} /> <code>push</code> したときに何が起きるかを図 23-1 に示します。
          </p>
          <Figure n="23-1" title="Vec の len と capacity" caption="空きがあれば push は確保済みの領域に書くだけで済む。len が capacity に達した状態で push すると、より大きな領域を確保して全要素をコピーし、ポインタを付け替える。模式図。">
            <VecCapacityFigure />
          </Figure>
          <p>
            図から2つのことが読み取れます。第一に、再確保はコストが高い操作なので、要素数の見当がつくなら <code>Vec::with_capacity(n)</code> で最初から確保しておくと再確保を避けられます。<code>push</code> は <code>len &lt; capacity</code> の間は決して再確保せず、償却で O(1) です。<Ref n={5} />
          </p>
          <p>第二に、再確保で要素が別の場所へ移動します。だから次のコードはコンパイルできません。<Ref n={1} /></p>
          <Code
            lang="rust"
            code={`
let mut v = vec![1, 2, 3, 4, 5];
let first = &v[0];  // 先頭要素への参照（不変借用）
v.push(6);          // error[E0502]: cannot borrow \`v\` as mutable because it is also borrowed as immutable
println!("The first element is: {first}");
`}
          />
          <p>
            <code>push</code> が再確保を起こすと <code>first</code> は解放済みの旧領域を指してしまいます。借用規則（<ChapterLink n={20} />）はこの事故をコンパイル時に止めます。<code>Vec</code> への参照を持ったまま <code>Vec</code> を変更したいときは、添字を保持するか、先に参照の利用を終えるように順序を変えます。
          </p>
          <h3>走査と主なメソッド</h3>
          <Code
            lang="rust"
            code={`
for i in &v {          // &T を順に取り出す
    println!("{i}");
}
for i in &mut v {      // &mut T を順に取り出す
    *i += 50;          // 参照外しで書き換える
}

let last = v.pop();    // Option<T>。末尾を取り出す
v.insert(0, 1);        // 位置 0 に挿入（後ろをずらす）
v.remove(1);           // 位置 1 を削除
v.retain(|x| *x > 50); // 条件を満たす要素だけ残す
v.sort();              // 並べ替え（スライスのメソッド）
v.contains(&53);       // 含むか
`}
          />
          <p>
            <code>for</code> の中で要素を追加・削除することは、ループが <code>Vec</code> 全体を借りているため、やはりコンパイルエラーになります。<Ref n={1} /> <code>sort</code> や <code>contains</code> は <code>Vec</code> 自身ではなくスライス <code>[T]</code> のメソッドで、<code>Vec</code> が自動的にスライスとして扱われる（参照外し型強制）ことで呼べています。<Ref n={5} /> <code>Vec</code> がスコープを抜けると、要素もすべて drop されます。<Ref n={1} />
          </p>
          <p>
            <code>Vec</code> は1つの型しか入れられませんが、列挙型を使えば「どれか1つ」の値を並べられます。表計算のセルのように型が混ざる行は <code>Vec&lt;Cell&gt;</code> として、<code>match</code> で各バリアントを扱います。<Ref n={1} /> 型の集合がコンパイル時に決まらない場合はトレイトオブジェクト（<ChapterLink n={25} />）を使います。
          </p>
        </>
      ),
    },
    {
      id: 'string',
      title: 'String と UTF-8',
      body: (
        <>
          <p>
            <code>String</code> は <code>Vec&lt;u8&gt;</code> を包んだ型で、中身が常に妥当な
            <Term en="UTF-8">UTF-8</Term>
            であることを保証します。<Ref n={2} /><Ref n={7} /> <ChapterLink n={20} /> で見た <code>&str</code> がスライス側です。<Ref n={4} />作り方と伸ばし方は <code>Vec</code> とよく似ています。
          </p>
          <Code
            lang="rust"
            code={`
let mut s = String::new();
s.push_str("foo");            // &str を末尾に追加
s.push('!');                  // char を1つ追加
let t = "bar".to_string();    // &str → String
let u = String::from("baz");  // 同じ

let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2;            // s1 は移動して使えなくなる。s2 は &str として借りるだけ
let joined = format!("{s3}-{s2}-{t}"); // すべて借用。所有権は動かない
`}
          />
          <p>
            <code>+</code> の正体は <code>fn add(self, s: &str) -&gt; String</code> というメソッドで、左辺の所有権を取り、右辺は <code>&str</code> を要求します。<code>&s2</code> は <code>&String</code> ですが、参照外し型強制で <code>&str</code> に変換されます。<Ref n={2} /> 複数の文字列をつなぐときは、所有権を動かさず読みやすい <code>format!</code> を使うのが普通です。
          </p>
          <h3>添字でアクセスできない理由</h3>
          <p>JavaScript の感覚で <code>s[0]</code> と書くと、コンパイルエラーになります。<Ref n={2} /></p>
          <Code
            lang="text"
            code={`
error[E0277]: the type \`str\` cannot be indexed by \`{integer}\`
`}
          />
          <p>
            理由は UTF-8 の性質にあります。図 23-2 に、日本語と英字を含む文字列のバイト列を示します。
          </p>
          <Figure n="23-2" title="UTF-8 のバイト列と char" caption="「あノA」は 7 バイトだが char は 3 つ。日本語の文字は 3 バイト、A は 1 バイトなので、バイト位置と文字の位置は一致しない。文字の途中で切るスライスは実行時に panic する。">
            <Utf8Figure />
          </Figure>
          <p>
            図から分かるように、<code>s[0]</code> が返すべき値がバイト <code>0xE3</code> なのか文字 <code>'あ'</code> なのかが曖昧で、バイトを返しても意味のある値になりません。さらに、n 番目の文字を得るには先頭から歩いて数える必要があり、添字に期待される O(1) で済みません。この2つの理由で Rust は添字アクセスをコンパイル時に拒みます。<Ref n={2} />
          </p>
          <p>
            文字列には2つの見方があります。<code>bytes()</code> は <code>u8</code> を、<code>chars()</code> は Unicode スカラー値 <code>char</code> を順に返します。<code>len()</code> が返すのはバイト数です。<Ref n={2} /><Ref n={7} /> 人が「1文字」と感じる単位（書記素クラスタ）は標準ライブラリにはなく、必要なら crates.io のクレートを使います。<Ref n={2} />
          </p>
          <Code
            lang="rust"
            code={`
let note = "日本語の ノート";
println!("{} {}", note.len(), note.chars().count()); // 22 8

for (i, c) in note.char_indices() {   // (バイト位置, char)
    println!("{i}: {c}");             // 0: 日 / 3: 本 / 6: 語 / ...
}
let hello = "Здравствуйте";
let zd = &hello[0..4];                // "Зд"：2 バイト文字 2 つ分。境界が合えば OK
// &hello[0..1]  → 実行時 panic: end byte index 1 is not a char boundary
`}
          />
          <p>
            範囲によるスライスは使えますが、添字はバイト位置で、文字の境界に合っていないと実行時に panic します。<Ref n={2} /> <code>find</code> や <code>char_indices</code> が返す位置はすべてバイト位置なので、それをそのままスライスに使う分には安全です。
          </p>
          <h3>よく使う str のメソッド</h3>
          <Code
            lang="rust"
            code={`
"  Untitled  ".trim();                 // 前後の空白を除いた &str
note.contains("ノート");               // 部分文字列の有無
note.replace("ノート", "メモ");         // 置換した新しい String
note.find('ノ');                       // Some(13)：バイト位置
"a\\nb".lines();                        // 行ごとのイテレーター
let n: i64 = "42".parse().expect("数字のはず"); // 文字列 → 数値（Result を返す）
String::from_utf8(vec![240, 159, 146, 150]);     // Ok("💖")。不正なら Err
`}
          />
          <p>
            <code>String</code> は <code>str</code> への参照外しができるので、<code>str</code> のメソッドはすべて <code>String</code> でも呼べます。<Ref n={7} /> <code>parse</code> は失敗しうるので <code>Result</code> を返します。その扱いは次章で学びます。
          </p>
        </>
      ),
    },
    {
      id: 'hashmap',
      title: 'HashMap：キーと値の対応',
      body: (
        <>
          <p>
            <code>HashMap&lt;K, V&gt;</code> は、キー <code>K</code> から値 <code>V</code> への対応をヒープに保持します。<code>Vec</code> が位置で引くのに対し、<code>HashMap</code> は任意の型のキーで引きます。プレリュードに入っていないので <code>use std::collections::HashMap;</code> が必要です。<Ref n={3} /> 仕組みを図 23-3 に示します。
          </p>
          <Figure n="23-3" title="HashMap の仕組み" caption="キーをハッシュ関数で数値に変換し、その値で格納位置を決める。取り出すときも同じ計算をするので、要素数によらずほぼ一定時間で済む。並び順はハッシュで決まり、挿入順ではない。模式図。">
            <HashMapFigure />
          </Figure>
          <Code
            lang="rust"
            code={`
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team = String::from("Blue");
let score = scores.get(&team).copied().unwrap_or(0); // get は Option<&V>

for (key, value) in &scores {   // 順序は不定
    println!("{key}: {value}");
}

scores.insert(String::from("Blue"), 25);                // 上書き
scores.entry(String::from("Red")).or_insert(5);         // 無いときだけ挿入
scores.entry(String::from("Blue")).or_insert(5);        // Blue は 25 のまま
`}
          />
          <p>
            <code>get</code> は <code>Option&lt;&V&gt;</code> を返します。例では <code>copied()</code> で <code>Option&lt;i32&gt;</code> にし、<code>unwrap_or(0)</code> で既定値付きの <code>i32</code> にしています。走査の順序は不定で、実行のたびに変わることもあります。<Ref n={3} /> 図から読み取れるとおり、順序はハッシュ値で決まるためです。キーを並べた順に扱いたいなら、後述の <code>BTreeMap</code> を使います。
          </p>
          <h3>entry API で更新する</h3>
          <p>
            「キーがあれば更新、なければ挿入」は頻出のパターンで、<code>entry</code> がそのためにあります。<code>or_insert</code> は値への可変参照 <code>&mut V</code> を返すので、参照外しで直接書き換えられます。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            code={`
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;                 // 可変参照はこの反復の終わりで消える
}
// {"hello": 1, "world": 2, "wonderful": 1}
`}
          />
          <h3>所有権とハッシュ関数</h3>
          <p>
            <code>i32</code> のような Copy の型はマップにコピーされますが、<code>String</code> のような所有型は <code>insert</code> でマップに移動し、以後は元の変数を使えません。参照をキーや値にする場合は、参照先がマップより長生きしなければならず、これはライフタイム（<ChapterLink n={26} />）の話になります。<Ref n={3} />
          </p>
          <p>
            既定のハッシュ関数は SipHash で、ハッシュの衝突を狙ったサービス拒否攻撃に耐える設計です。最速ではありませんが、安全性との引き換えとして採用されています。計測して遅いと分かった場合だけ、<code>BuildHasher</code> を実装した別のハッシュ関数に差し替えられます。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'others',
      title: 'その他のコレクションと使い分け',
      body: (
        <>
          <p>標準ライブラリの <code>std::collections</code> は、次の4グループに分類されています。<Ref n={6} /></p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>グループ</th>
                  <th>型</th>
                  <th>向いている場面</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>列</td>
                  <td><code>Vec</code>、<code>VecDeque</code>、<code>LinkedList</code></td>
                  <td>末尾に追加が主なら <code>Vec</code>。両端から出し入れするキューなら <code>VecDeque</code></td>
                </tr>
                <tr>
                  <td>マップ</td>
                  <td><code>HashMap</code>、<code>BTreeMap</code></td>
                  <td>キーで引くだけなら <code>HashMap</code>。キー順の走査や範囲検索、最小・最大が要るなら <code>BTreeMap</code></td>
                </tr>
                <tr>
                  <td>集合</td>
                  <td><code>HashSet</code>、<code>BTreeSet</code></td>
                  <td>値を伴わず「見たことがあるか」だけ追う。性能はマップと同じ</td>
                </tr>
                <tr>
                  <td>その他</td>
                  <td><code>BinaryHeap</code></td>
                  <td>常に最大（最優先）の要素を取り出す優先度付きキュー</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            計算量の目安として、<code>Vec</code> の位置アクセスは O(1)、途中への挿入・削除は後ろをずらす分 O(n)、<code>HashMap</code> の取得・挿入・削除は期待値 O(1)、<code>BTreeMap</code> は O(log n) です。<Ref n={6} /> Rust のコレクションは自動では縮まないので、大量に削除した後にメモリを返したいときは <code>shrink_to_fit</code> を呼びます。<Ref n={5} /><Ref n={6} />
          </p>
          <p>
            走査には3種類のメソッドがあります。<code>iter()</code> は <code>&T</code>、<code>iter_mut()</code> は <code>&mut T</code>、<code>into_iter()</code> はコレクションを消費して <code>T</code> を返します。<code>for x in &v</code> は <code>iter()</code>、<code>for x in v</code> は <code>into_iter()</code> に対応します。<Ref n={6} /> <code>map</code> や <code>filter</code> を連ねて別のコレクションに <code>collect</code> する書き方は <ChapterLink n={27} /> で扱います。本章のコードは Rust 1.99 でコンパイルし、出力を確認しています。
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
              Tsumugi の <code>core</code> クレートでは、SQLite から読んだページの一覧を <code>Vec&lt;PageSummary&gt;</code> として返します（<ChapterLink n={42} />）。サイドバーのツリー（<ChapterLink n={43} />）は、この平らな一覧から親 id が一致する子を取り出して組み立てます（この部分はフロントエンドの TypeScript で書かれています）。親 id ごとに子をまとめたいなら、Rust では <code>HashMap&lt;Option&lt;String&gt;, Vec&lt;PageSummary&gt;&gt;</code> と <code>entry(parent_id).or_default().push(page)</code> という本章の entry API の書き方が使えます。
            </p>
            <p>
              全文検索（<ChapterLink n={46} />）では、BlockNote の JSON からテキストを取り出して <code>String</code> に連結し、FTS5 の索引に渡します。検索結果の抜粋を作るときに「ヒット位置の前後 n 文字」を切り出しますが、ここで本章の UTF-8 の知識が必須になります。バイト位置で切ると日本語の途中で panic するので、本文を <code>Vec&lt;char&gt;</code> に変換し、文字の位置で切り出します（<code>search.rs</code> の <code>make_snippet</code>）。簡易データベース（<ChapterLink n={47} />）の行の値は、プロパティ id をキーとする JSON オブジェクトとして <code>serde_json::Value</code> に持たせます。
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
            <li><code>Vec&lt;T&gt;</code> はヒープ上の可変長配列。<code>vec!</code> で作り、<code>push</code> で伸ばし、添字（panic）か <code>get</code>（Option）で読む。</li>
            <li>len は要素数、capacity は確保済みの数。満杯で <code>push</code> すると再確保で要素が移動するので、要素への参照を持ったまま変更できない（E0502）。</li>
            <li><code>String</code> は UTF-8 保証付きの <code>Vec&lt;u8&gt;</code>。<code>len()</code> はバイト数で、添字アクセスはできない。<code>chars()</code>・<code>bytes()</code>・<code>char_indices()</code> を使い分け、スライスは文字境界で切る。</li>
            <li><code>+</code> は左辺を消費し、<code>format!</code> は借用だけで連結する。</li>
            <li><code>HashMap&lt;K, V&gt;</code> はキーで引く。<code>get</code> は <code>Option&lt;&V&gt;</code>、更新は <code>entry().or_insert()</code>。所有型のキー・値は移動する。順序は不定。</li>
            <li>順序が要るなら <code>BTreeMap</code>、両端キューなら <code>VecDeque</code>、重複排除なら <code>HashSet</code>。</li>
          </ul>
          <p>次章では、<code>parse</code> や <code>File::open</code> が返していた <code>Result</code> を中心に、Rust のエラー処理を学びます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'The Rust Programming Language, 8.1 Storing Lists of Values with Vectors',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch08-01-vectors.html',
      accessed: '2026-11-08',
      note: 'Vec::new と vec!、push、添字と get、push 時の E0502 と再確保の理由、走査と *、列挙型による混在、drop の根拠。',
    },
    {
      title: 'The Rust Programming Language, 8.2 Storing UTF-8 Encoded Text with Strings',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch08-02-strings.html',
      accessed: '2026-11-08',
      note: 'String が Vec<u8> の包装であること、push_str と push、+ と add のシグネチャ、format!、添字不可（E0277）の理由、バイト・スカラー値・書記素クラスタ、スライスと境界の panic、chars と bytes の根拠。',
    },
    {
      title: 'The Rust Programming Language, 8.3 Storing Keys with Associated Values in Hash Maps',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch08-03-hash-maps.html',
      accessed: '2026-11-08',
      note: 'HashMap の作成と insert、get と copied().unwrap_or、走査順が不定、所有権の移動、上書き、entry().or_insert、単語数の例、SipHash の根拠。',
    },
    {
      title: 'The Rust Programming Language, 4.3 The Slice Type',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/book/ch04-03-slices.html',
      accessed: '2026-11-08',
      note: '&str がスライスであることの根拠（前章の復習として参照）。',
    },
    {
      title: 'std::vec::Vec — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'Vec が (ptr, capacity, len) の3つ組であること、with_capacity、len < capacity の間は再確保しないこと、push が償却 O(1)、自動で縮まないこと、スライスへの参照外しの根拠。',
    },
    {
      title: 'std::collections — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/collections/index.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'コレクションの4分類と使い分け、計算量の表、iter/iter_mut/into_iter、entry API の根拠。',
    },
    {
      title: 'std::string::String — Rust 標準ライブラリ',
      publisher: 'The Rust Project',
      url: 'https://doc.rust-lang.org/std/string/struct.String.html',
      accessed: '2026-11-08',
      version: 'Rust 1.99',
      note: 'UTF-8 保証、len がバイト数であること、from_utf8 が Result を返すこと、str への Deref により str のメソッドが使えることの根拠。',
    },
  ],
}

export default chapter
