import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 52-1 信頼の連鎖 ---------- */
function TrustChainFigure() {
  const nodes = [
    { x: 20, title: 'Apple 認証局', sub: 'ルート／中間 CA', box: 'var(--fig-box5)' },
    { x: 125, title: 'Developer ID', sub: '開発者の証明書', box: 'var(--fig-box3)' },
    { x: 230, title: 'コード署名', sub: 'codesign', box: 'var(--fig-box3)' },
    { x: 335, title: '公証', sub: 'Apple が検査', box: 'var(--fig-box2)' },
    { x: 440, title: 'ステープル', sub: 'チケットを添付', box: 'var(--fig-box2)' },
    { x: 545, title: 'Gatekeeper', sub: '利用者の Mac', box: 'var(--fig-box4)' },
  ]
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="macOS の信頼の連鎖。Apple の認証局が開発者に Developer ID 証明書を発行し、開発者がその証明書でアプリに署名し、Apple が公証して発行したチケットをアプリに添付し、利用者の Mac の Gatekeeper が署名とチケットを検証する流れを左から右に並べた図">
      <defs>
        <marker id="arrow52a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {nodes.map((n, i) => (
          <g key={n.title}>
            <rect x={n.x} y="60" width="80" height="70" rx="8" fill={n.box} stroke="var(--fig-line)" />
            <text x={n.x + 40} y="88" textAnchor="middle" fontWeight="600" fontSize="12">{n.title}</text>
            <text x={n.x + 40} y="110" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">{n.sub}</text>
            {i < nodes.length - 1 && <path d={`M${n.x + 80},95 L${n.x + 103},95`} stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52a)" />}
          </g>
        ))}
        {/* who */}
        <text x="60" y="40" textAnchor="middle" fill="var(--fig-muted)">Apple</text>
        <text x="217" y="40" textAnchor="middle" fill="var(--fig-muted)">開発者（tauri build が実行）</text>
        <text x="427" y="40" textAnchor="middle" fill="var(--fig-muted)">Apple ↔ 開発者</text>
        <text x="585" y="40" textAnchor="middle" fill="var(--fig-muted)">利用者</text>
        {/* what each step proves */}
        <text x="60" y="160" textAnchor="middle">証明書の正当性</text>
        <text x="165" y="160" textAnchor="middle">誰が作ったか</text>
        <text x="270" y="160" textAnchor="middle">改ざんが無いか</text>
        <text x="375" y="160" textAnchor="middle">マルウェア検査</text>
        <text x="480" y="160" textAnchor="middle">オフライン検証可</text>
        <text x="585" y="160" textAnchor="middle">開けるか判定</text>
        <text x="60" y="178" textAnchor="middle" fill="var(--fig-muted)">（連鎖の起点）</text>
        <text x="165" y="178" textAnchor="middle" fill="var(--fig-muted)">Team ID で識別</text>
        <text x="270" y="178" textAnchor="middle" fill="var(--fig-muted)">ハッシュに署名</text>
        <text x="375" y="178" textAnchor="middle" fill="var(--fig-muted)">チケットを発行</text>
        <text x="480" y="178" textAnchor="middle" fill="var(--fig-muted)">アプリに埋め込む</text>
        <text x="585" y="178" textAnchor="middle" fill="var(--fig-muted)">警告するか決まる</text>
      </g>
      <text x="320" y="225" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">紫：Apple が管理　青：開発者が行う　橙：Apple のサービスとやり取り　緑：利用者側</text>
      <text x="320" y="245" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：各段が何を保証するかを下段に示す</text>
    </svg>
  )
}

/* ---------- 図 52-2 公証のシーケンス ---------- */
function NotarizeSequenceFigure() {
  const lanes = [
    { x: 90, label: '開発者の Mac／CI' },
    { x: 320, label: 'Apple の公証サービス' },
    { x: 550, label: '利用者の Mac' },
  ]
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="tauri build が行う署名と公証の時系列。開発者側で署名した後、Apple の公証サービスに提出し、審査結果のチケットを受け取って添付する。利用者の Mac はアプリを開く際に署名とチケットを検証する">
      <defs>
        <marker id="arrow52b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {lanes.map((l) => (
          <g key={l.label}>
            <rect x={l.x - 80} y="14" width="160" height="30" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
            <text x={l.x} y="34" textAnchor="middle" fontWeight="600">{l.label}</text>
            <line x1={l.x} y1="44" x2={l.x} y2="380" stroke="var(--fig-line)" strokeDasharray="4 4" />
          </g>
        ))}
        {/* step 1: sign (self) */}
        <rect x="20" y="64" width="140" height="44" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="90" y="82" textAnchor="middle">1. Developer ID で署名</text>
        <text x="90" y="99" textAnchor="middle" fill="var(--fig-muted)">hardened runtime 有効</text>
        {/* step 2 submit */}
        <path d="M160,135 L312,135" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52b)" />
        <text x="236" y="128" textAnchor="middle">2. 署名済みアプリを提出</text>
        <text x="236" y="150" textAnchor="middle" fill="var(--fig-muted)">API キー または Apple ID で認証</text>
        {/* step 3 scan */}
        <rect x="250" y="170" width="140" height="44" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="188" textAnchor="middle">3. 自動検査</text>
        <text x="320" y="205" textAnchor="middle" fill="var(--fig-muted)">マルウェア・署名の不備</text>
        {/* step 4 ticket */}
        <path d="M312,240 L160,240" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52b)" />
        <text x="236" y="233" textAnchor="middle">4. チケット（合否）を返す</text>
        {/* step 5 staple */}
        <rect x="20" y="258" width="140" height="44" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="90" y="276" textAnchor="middle">5. ステープル</text>
        <text x="90" y="293" textAnchor="middle" fill="var(--fig-muted)">チケットを .app に添付</text>
        {/* step 6 distribute */}
        <path d="M160,330 L542,330" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52b)" />
        <text x="350" y="323" textAnchor="middle">6. dmg を配布（Web サイトなど）</text>
        {/* step 7 verify */}
        <rect x="480" y="345" width="140" height="44" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="550" y="363" textAnchor="middle">7. Gatekeeper が検証</text>
        <text x="550" y="380" textAnchor="middle" fill="var(--fig-muted)">署名＋チケット→警告なし</text>
        {/* label for tauri build */}
        <rect x="8" y="56" width="4" height="254" fill="var(--fig-accent)" />
        <text x="20" y="125" fill="var(--fig-accent)" fontSize="11">tauri build が</text>
        <text x="20" y="139" fill="var(--fig-accent)" fontSize="11">1〜5 を自動実行</text>
      </g>
    </svg>
  )
}

/* ---------- 図 52-3 Windows の署名方式 ---------- */
function WindowsSignFigure() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="Tauri が Windows の実行ファイルに署名する2つの経路。左は Windows 上の signtool を使う経路で、証明書のサムプリントを設定に書く。右は signCommand で任意の署名ツールを呼ぶ経路で、クラウドの署名サービスやクロスコンパイル時に使う">
      <defs>
        <marker id="arrow52c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="230" y="16" width="180" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="41" textAnchor="middle" fontWeight="600">tauri build（バンドル段階）</text>
        <path d="M280,56 L170,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52c)" />
        <path d="M360,56 L470,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow52c)" />
        <text x="190" y="80" textAnchor="middle" fill="var(--fig-muted)">certificateThumbprint あり</text>
        <text x="455" y="80" textAnchor="middle" fill="var(--fig-muted)">signCommand あり</text>
        {/* left */}
        <rect x="30" y="100" width="260" height="120" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="160" y="124" textAnchor="middle" fontWeight="600">signtool（Windows SDK）</text>
        <text x="160" y="148" textAnchor="middle">証明書ストアの OV 証明書で署名</text>
        <text x="160" y="170" textAnchor="middle">digestAlgorithm・timestampUrl を指定</text>
        <text x="160" y="196" textAnchor="middle" fill="var(--fig-muted)">Windows 上でのビルド専用</text>
        {/* right */}
        <rect x="350" y="100" width="260" height="120" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="124" textAnchor="middle" fontWeight="600">任意のコマンド（%1 がファイル）</text>
        <text x="480" y="148" textAnchor="middle">Azure Artifact Signing、Key Vault、</text>
        <text x="480" y="170" textAnchor="middle">ハードウェアトークン対応ツールなど</text>
        <text x="480" y="196" textAnchor="middle" fill="var(--fig-muted)">クロスコンパイル時はこちらが必須</text>
      </g>
      <text x="320" y="248" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：どちらも結果は Authenticode 署名付きの .exe／.msi</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 52,
  part: 7,
  title: 'コード署名と macOS の公証',
  summary:
    '署名していないアプリは、macOS でも Windows でも「開発元を確認できない」という警告を出されます。証明書による署名が何を保証するのか、macOS の Developer ID と公証、Windows の署名方式、Linux での事情を、Tauri の設定と CI 用の環境変数に落とし込んで説明します。',
  goals: [
    'コード署名が「誰が作ったか」と「改ざんされていないか」を保証する仕組みを、信頼の連鎖として説明できる',
    'macOS の Developer ID 証明書を用意し、signingIdentity または APPLE_SIGNING_IDENTITY で Tauri に渡せる',
    '公証とステープルの役割を説明し、App Store Connect API キーと Apple ID の2方式の環境変数を正しく設定できる',
    'Windows の署名を certificateThumbprint 方式と signCommand 方式から選べる',
    'Linux の AppImage と rpm の署名が任意であることと、その手順を知っている',
    'CI で証明書を安全に扱うための環境変数の一覧を書ける',
  ],
  prerequisites: [37, 51],
  sections: [
    {
      id: 'why-sign',
      title: 'なぜ署名が必要か',
      body: (
        <>
          <p>
            <ChapterLink n={51} /> で作った .dmg や <code>-setup.exe</code> をそのまま Web サイトに置いて配ると、利用者の OS は警告を出します。macOS では「開発元を確認できないため開けません」、Windows では SmartScreen の「WindowsによってPCが保護されました」という画面です。利用者の多くはここで諦めます。
          </p>
          <p>
            この警告を消すのが <Term en="code signing">コード署名</Term>です。署名は、OS が認めた認証局から発行された証明書を使って、実行ファイルのハッシュに開発者の秘密鍵で署名する仕組みです。利用者の OS はこれを検証して、「この開発者が作り、その後改ざんされていない」ことを確認します。Tauri の公式ドキュメントは、配布に当たって「ほとんどのプラットフォームでコード署名が必要」と述べています。<Ref n={1} />
          </p>
          <p>
            macOS ではさらに<Term en="notarization">公証</Term>という手順が加わります。署名済みのアプリを Apple に提出し、マルウェアの自動検査を受けて「チケット」をもらう手続きです。Apple のサポート文書は、macOS Catalina 以降、App Store 外のソフトウェアは署名に加えて公証されていることが期待される、と説明しています。<Ref n={5} />
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境は Linux で、Apple Developer Program のアカウントも Windows の証明書も持っていません。この章の macOS と Windows の手順は Tauri と Apple の公式資料（Tauri 2.12 時点）に基づく記述で、本書の制作環境では未検証です。環境変数名と設定キーは公式資料から正確に写していますが、実際の運用では公式ページで最新の手順を確認してください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'trust-chain',
      title: '信頼の連鎖：署名が保証すること',
      body: (
        <>
          <p>
            署名と公証の全体像を図で押さえます。この図は macOS の場合を例に、Apple の認証局から利用者の Mac までの間に何が受け渡されるかを示しています。各段が「何を保証するか」を下段に書いてあるので、そこを見てください。
          </p>
          <Figure n="52-1" title="macOS における信頼の連鎖" caption="左から右へ、Apple の認証局が証明書を発行し、開発者が署名し、Apple が公証してチケットを発行し、開発者がそれを添付し、利用者の Mac の Gatekeeper が全体を検証する。模式図。">
            <TrustChainFigure />
          </Figure>
          <p>
            図から読み取れる重要な点は、署名と公証が別の問題を解いていることです。署名は「誰が作ったか」と「改ざんされていないか」を保証しますが、作った人が悪意を持っていないことまでは保証しません。公証は Apple がファイルの中身を検査して「既知のマルウェアを含まない」ことを確認します。Apple の Developer ID の案内では、公証サービスは Developer ID で署名されたソフトウェアを自動で検査し、Gatekeeper に公証済みであることを伝えるチケットを割り当てる、と説明されています。<Ref n={4} />
          </p>
          <p>
            <Term en="Gatekeeper">Gatekeeper</Term> は利用者の Mac で動く検証機能で、App Store 外から入手したアプリを開くときに Developer ID の署名を確認し、公証の有無によって警告を出し分けます。<Ref n={5} /> 公証されていないアプリでも、利用者が「システム設定 → プライバシーとセキュリティ → このまま開く」を選べば起動できますが、<Ref n={5} /> この操作を利用者に求めるのは配布側として避けたいことです。
          </p>
          <p>
            <Term en="stapling">ステープル</Term>は、公証でもらったチケットをアプリや dmg に添付する操作です。これをしておくと、利用者の Mac がオフラインでも公証済みであることを確認できます。Tauri の <code>tauri build</code> はこのステープルまで自動で行い、<code>--skip-stapling</code> を付けたときだけ省略します。<Ref n={7} />
          </p>
          <p>
            Windows の仕組みも骨格は同じです。認証局が発行したコード署名証明書で署名し、Windows の SmartScreen が署名の有無と「評判」で警告を出し分けます。公証に相当する手続きはなく、代わりに時間をかけて評判を積み上げます。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'macos-cert',
      title: 'macOS：Developer ID 証明書と署名の設定',
      body: (
        <>
          <p>
            macOS の署名には Apple Developer Program への加入（有料、年額 99 米ドル）が必要です。無料のアカウントでも署名はできますが、公証ができないため、配布したアプリは「確認できない開発元」の扱いのままになります。<Ref n={1} />
          </p>
          <p>
            証明書は配布経路で選びます。App Store 外で配るなら <Term en="Developer ID Application">Developer ID Application</Term>、App Store に提出するなら <Term en="Apple Distribution">Apple Distribution</Term> です。<Ref n={1} /> Developer ID Application 証明書を作れるのはチームの Account Holder だけです。<Ref n={1} /> <Ref n={4} /> 手順は、Mac のキーチェーンアクセスで証明書署名要求（CSR）を作り、Apple Developer のサイトで証明書の種類を選んで CSR を登録し、ダウンロードした <code>.cer</code> を開いてキーチェーンに入れる、という流れです。<Ref n={1} />
          </p>
          <p>
            キーチェーンに入った証明書は、次のコマンドで「署名アイデンティティ」として一覧できます。
          </p>
          <Code
            lang="bash"
            code={`
security find-identity -v -p codesigning
#  1) A1B2C3... "Developer ID Application: Example Inc. (TEAMID1234)"
`}
          />
          <p>
            この引用符の中の文字列（またはハッシュ）を Tauri に渡します。渡し方は2通りあり、<code>tauri.conf.json</code> の <code>bundle.macOS.signingIdentity</code> に書くか、環境変数 <code>APPLE_SIGNING_IDENTITY</code> で与えます。<Ref n={1} /> 設定ファイルは Git に入るので、本書では環境変数を使います。
          </p>
          <Code
            lang="bash"
            code={`
export APPLE_SIGNING_IDENTITY="Developer ID Application: Example Inc. (TEAMID1234)"
npm run tauri build -- --bundles app,dmg
`}
          />
          <p>
            署名に関係する設定項目が2つあります。<code>bundle.macOS.hardenedRuntime</code> は既定で <code>true</code> で、<Term en="hardened runtime">強化されたランタイム</Term>（実行時のメモリ保護などを有効にする署名オプション）を付けます。<Ref n={6} /> 公証にはこれが必要なので、既定のままにします。<code>bundle.macOS.entitlements</code> は、強化されたランタイムの下で例外的に許可したい機能（カメラやマイク、JIT など）を宣言する plist ファイルへのパスで、署名時に適用されます。<Ref n={8} /> Tsumugi には特別な権限が要らないので、このファイルは置きません。
          </p>
          <Callout>
            <p>
              Apple の証明書を持たずに Apple シリコン向けのビルドを配ると、ダウンロード後に「壊れている」と表示されることがあります。公式ドキュメントは、このときの回避策として <code>"signingIdentity": "-"</code> という疑似アイデンティティでの<Term en="ad-hoc signing">アドホック署名</Term>を挙げています。<Ref n={1} /><Ref n={10} /> ただし、これで警告が消えるわけではなく、利用者が「このまま開く」を選ぶ必要は残ります。公開前の内部テストで使う手段だと考えてください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'notarization',
      title: 'macOS：公証と2つの認証方式',
      body: (
        <>
          <p>
            Developer ID Application 証明書で署名したアプリは、公証が必須です。<Ref n={1} /> Tauri では、公証に必要な認証情報を環境変数で与えておくだけで、<code>tauri build</code> が提出・待機・ステープルまで行います。その流れを時系列で示します。
          </p>
          <Figure n="52-2" title="tauri build が行う署名と公証の時系列" caption="縦線はそれぞれの当事者。1〜5 を tauri build が自動で行い、6 以降は配布後に利用者の Mac で起きる。--skip-stapling を付けると 4 の完了を待たず 5 を省略する。">
            <NotarizeSequenceFigure />
          </Figure>
          <p>
            認証方式は2つあり、どちらか一方の環境変数一式を設定します。<Ref n={1} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>方式</th>
                  <th>環境変数</th>
                  <th>値</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={3}>App Store Connect API キー</td>
                  <td><code>APPLE_API_ISSUER</code></td>
                  <td>App Store Connect の Issuer ID</td>
                </tr>
                <tr>
                  <td><code>APPLE_API_KEY</code></td>
                  <td>API キーの ID</td>
                </tr>
                <tr>
                  <td><code>APPLE_API_KEY_PATH</code></td>
                  <td>ダウンロードした秘密鍵（<code>.p8</code>）のパス</td>
                </tr>
                <tr>
                  <td rowSpan={3}>Apple ID</td>
                  <td><code>APPLE_ID</code></td>
                  <td>Apple ID のメールアドレス</td>
                </tr>
                <tr>
                  <td><code>APPLE_PASSWORD</code></td>
                  <td>App 用パスワード（通常のパスワードではない）</td>
                </tr>
                <tr>
                  <td><code>APPLE_TEAM_ID</code></td>
                  <td>チーム ID（証明書名の括弧内の文字列）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            API キー方式は、個人の Apple ID に依存しないため CI 向きです。Apple ID 方式は手元の Mac で試すときに手早く設定できますが、Apple アカウントの App 用パスワードを発行して使う点に注意が要ります。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            title="API キー方式で手元の Mac から公証付きビルドを行う例"
            code={`
export APPLE_SIGNING_IDENTITY="Developer ID Application: Example Inc. (TEAMID1234)"
export APPLE_API_ISSUER="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
export APPLE_API_KEY="ABCDE12345"
export APPLE_API_KEY_PATH="$HOME/.private_keys/AuthKey_ABCDE12345.p8"

npm run tauri build -- --bundles dmg
`}
          />
          <p>
            初回は公証の審査に時間がかかることがあります。公式ドキュメントは、最初の提出では <code>--skip-stapling</code> を付けて審査の完了を待たずにビルドを終える方法を挙げています。<Ref n={1} /> 審査に通った後に通常のビルドを行えば、チケットがステープルされます。
          </p>
          <Callout kind="warn">
            <p>
              公証に落ちたときは、理由をログで確認する必要があります。Apple の Developer ID の案内では、失敗したときはアップロードの状態ログを確認するよう案内されています。<Ref n={4} /> 典型的な原因は、強化されたランタイムが無効になっている、同梱した外部バイナリ（<code>bundle.externalBin</code>）が署名されていない、といったものです。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'macos-ci',
      title: 'macOS：CI で証明書を扱う',
      body: (
        <>
          <p>
            GitHub Actions のランナーには自分のキーチェーンがありません。そこで、手元の Mac から証明書と秘密鍵を <code>.p12</code> 形式で書き出し、base64 文字列にしてリポジトリのシークレットに入れ、ワークフローの中で一時的なキーチェーンに取り込みます。公式ドキュメントが示す環境変数は次の2つです。<Ref n={1} />
          </p>
          <ul>
            <li><code>APPLE_CERTIFICATE</code>：<code>.p12</code> を <code>openssl base64 -A</code> で1行の base64 にしたもの</li>
            <li><code>APPLE_CERTIFICATE_PASSWORD</code>：<code>.p12</code> を書き出すときに付けたパスワード</li>
          </ul>
          <p>
            公式の GitHub Actions の例では、これに加えて一時キーチェーン用の <code>KEYCHAIN_PASSWORD</code> と、公証用の <code>APPLE_ID</code>・<code>APPLE_PASSWORD</code>（または API キー方式の3変数）をシークレットに登録し、ワークフロー内で <code>security</code> コマンドを使って証明書を取り込み、取り込んだアイデンティティを <code>APPLE_SIGNING_IDENTITY</code> として <code>tauri-action</code> に渡しています。<Ref n={1} />
          </p>
          <Code
            lang="yaml"
            title="証明書の取り込みステップ（macOS ランナーのみ。公式例を参考にした骨子）"
            code={`
- name: import Apple certificate
  if: matrix.platform == 'macos-latest'
  env:
    APPLE_CERTIFICATE: \${{ secrets.APPLE_CERTIFICATE }}
    APPLE_CERTIFICATE_PASSWORD: \${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
    KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
  run: |
    echo "$APPLE_CERTIFICATE" | base64 --decode > certificate.p12
    security create-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
    security default-keychain -s build.keychain
    security unlock-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
    security import certificate.p12 -k build.keychain \\
      -P "$APPLE_CERTIFICATE_PASSWORD" -T /usr/bin/codesign
    security set-key-partition-list -S apple-tool:,apple:,codesign: \\
      -s -k "$KEYCHAIN_PASSWORD" build.keychain
    rm certificate.p12
`}
          />
          <p>
            このステップの後で <code>tauri-action</code> を呼び、<code>env</code> に <code>APPLE_SIGNING_IDENTITY</code> と公証用の変数を渡します。ワークフロー全体は <ChapterLink n={53} /> で組み立てます。
          </p>
          <Callout kind="warn">
            <p>
              <code>.p12</code> と App 用パスワード、API キーの <code>.p8</code> は、いずれも漏れると第三者があなたの名前でアプリに署名できる情報です。リポジトリに直接置かず、必ず CI のシークレット機能に入れてください。ログに出力しないこと、フォークからのプルリクエストでシークレットが使えない GitHub の仕様も確認しておくと安心です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'windows',
      title: 'Windows の署名',
      body: (
        <>
          <p>
            Windows のコード署名証明書は、Apple のように1社が発行するのではなく、複数の認証局から購入します。<Term en="OV certificate">OV 証明書</Term>（組織認証）と <Term en="EV certificate">EV 証明書</Term>（拡張認証）があり、Tauri の公式ドキュメントは「2024年以降、EV 証明書でも SmartScreen の評判が即座に付くことはなくなり、OV と同じように評判を積み上げる」と述べています。<Ref n={2} />
          </p>
          <p>
            Tauri が実行ファイルに署名する経路は2つあります。図で整理します。
          </p>
          <Figure n="52-3" title="Tauri による Windows 署名の2つの経路" caption="左は Windows 上の signtool を使う標準の経路で、証明書ストアに入れた証明書をサムプリントで指定する。右は signCommand で任意の署名コマンドを呼ぶ経路で、クラウド署名サービスやハードウェアトークン、クロスコンパイル時に使う。模式図。">
            <WindowsSignFigure />
          </Figure>
          <h3>経路1：signtool と証明書のサムプリント</h3>
          <p>
            公式ドキュメントの手順は、証明書と秘密鍵を OpenSSL で <code>.pfx</code> にまとめ、PowerShell の <code>Import-PfxCertificate</code> で <code>CurrentUser\My</code> ストアに取り込み、<code>certmgr.msc</code> で確認したサムプリントとハッシュアルゴリズムを設定に書く、というものです。<Ref n={2} /> 公式ドキュメントはこの手順を「2023年6月1日より前に取得した OV 証明書」向けと断っています。それ以降に取得した証明書については発行元の案内に従うよう述べており、秘密鍵をハードウェアトークンやクラウドに置く形式が一般的なため、後述の <code>signCommand</code> を使うことになります。<Ref n={2} />
          </p>
          <Code
            lang="json"
            code={`
{
  "bundle": {
    "windows": {
      "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
      "digestAlgorithm": "sha256",
      "timestampUrl": "http://timestamp.digicert.com"
    }
  }
}
`}
          />
          <p>
            <code>timestampUrl</code> は<Term en="timestamp server">タイムスタンプサーバー</Term>のアドレスです。署名に信頼できる時刻を添えることで、証明書の有効期限が切れた後も「有効期間中に署名された」と判定されます。<code>tsp</code> を <code>true</code> にすると RFC 3161 のプロトコルを使います。<Ref n={6} />
          </p>
          <h3>経路2：signCommand</h3>
          <p>
            <code>bundle.windows.signCommand</code> に任意のコマンドを書くと、Tauri は署名対象のファイルパスを <code>%1</code> に入れてそのコマンドを実行します。<Ref n={2} /> Azure Artifact Signing（旧 Azure Trusted Signing）の CLI や、Azure Key Vault 向けの relic、ハードウェアトークン対応のツールなど、Windows の実行ファイルに署名できるものなら何でも使えます。Linux や macOS から NSIS インストーラをクロスコンパイルする場合も、標準の経路が Windows 専用のため、この方式が必須です。<Ref n={2} />
          </p>
          <Code
            lang="json"
            title="Azure Artifact Signing を使う例（公式ドキュメントより）"
            code={`
{
  "bundle": {
    "windows": {
      "signCommand": "artifact-signing-cli -e https://wus2.codesigning.azure.net -a MyAccount -c MyProfile -d Tsumugi %1"
    }
  }
}
`}
          />
          <p>
            この CLI は <code>cargo install artifact-signing-cli</code> で入り、認証には <code>AZURE_CLIENT_ID</code>・<code>AZURE_CLIENT_SECRET</code>・<code>AZURE_TENANT_ID</code> の環境変数を使います。<Ref n={2} /> 証明書の購入やハードウェアトークンの管理が不要になるため、個人開発者にとっては現実的な選択肢です。
          </p>
          <p>
            GitHub Actions で <code>.pfx</code> を使う場合、公式例はシークレット <code>WINDOWS_CERTIFICATE</code>（base64 の pfx）と <code>WINDOWS_CERTIFICATE_PASSWORD</code> を用意し、Windows ランナーだけで動くステップで <code>certutil -decode</code> と <code>Import-PfxCertificate</code> を実行してから <code>tauri-action</code> を呼んでいます。<Ref n={2} />
          </p>
        </>
      ),
    },
    {
      id: 'linux',
      title: 'Linux の事情',
      body: (
        <>
          <p>
            Linux には、macOS の Gatekeeper や Windows の SmartScreen のように署名の有無で起動を制限する共通の仕組みがありません。そのため署名は任意で、公式ドキュメントも「配布するアプリへの信頼を高めるために使える」という位置づけです。<Ref n={3} /> 対象は AppImage と rpm の2つで、どちらも GPG 鍵を使います。
          </p>
          <h3>AppImage</h3>
          <p>
            <code>gpg2 --full-gen-key</code> で鍵を作った後、ビルド時に環境変数を設定します。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>環境変数</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>SIGN</code></td>
                  <td><code>1</code> にすると AppImage に署名する</td>
                </tr>
                <tr>
                  <td><code>SIGN_KEY</code></td>
                  <td>使う GPG 鍵の ID（省略可）</td>
                </tr>
                <tr>
                  <td><code>APPIMAGETOOL_SIGN_PASSPHRASE</code></td>
                  <td>鍵のパスフレーズ。CI では必須（未設定だと対話ダイアログが出る）</td>
                </tr>
                <tr>
                  <td><code>APPIMAGETOOL_FORCE_SIGN</code></td>
                  <td><code>1</code> にすると署名の失敗でビルドを止める（既定では失敗しても AppImage は生成される）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            重要な注意として、AppImage は自分自身の署名を検証しません。つまり署名があっても、改ざんを自動では検出できません。<Ref n={3} /> 利用者が AppImageUpdate プロジェクトの <code>validate</code> ツールで手動検証することになるので、鍵の ID を TLS で配信される Web サイトなど認証された経路で公開しておきます。<Ref n={3} />
          </p>
          <h3>rpm</h3>
          <p>
            rpm には <ChapterLink n={51} /> で触れたとおり、<code>TAURI_SIGNING_RPM_KEY</code>（秘密鍵の内容）と <code>TAURI_SIGNING_RPM_KEY_PASSPHRASE</code> を設定してビルドすると GPG 署名が付きます。<Ref n={9} /> 署名の確認は <code>rpm -v --checksig</code> で行えます。deb の署名は Tauri の公式ドキュメントでは扱われていません。
          </p>
          <p>
            Linux で実質的に効くのは、むしろ <ChapterLink n={53} /> で扱う updater の署名です。updater は OS に関係なく Tauri 自身が更新ファイルの署名を検証するので、Linux でも更新経路の改ざんは防げます。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi-config',
      title: 'Tsumugi に適用する設定例',
      body: (
        <>
          <p>
            Tsumugi は個人向けに Web サイトと GitHub Releases で配る想定です。macOS は Developer ID Application で署名して公証し、Windows は Azure Artifact Signing を使い、Linux は AppImage に GPG 署名を付けます。秘密情報はすべて環境変数（CI ではシークレット）で渡し、<code>tauri.conf.json</code> には秘密にならない情報だけを書きます。
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（署名に関わる部分）"
            code={`
{
  "bundle": {
    "macOS": {
      "minimumSystemVersion": "12.0",
      "hardenedRuntime": true
    },
    "windows": {
      "digestAlgorithm": "sha256",
      "timestampUrl": "http://timestamp.digicert.com",
      "signCommand": "artifact-signing-cli -e https://wus2.codesigning.azure.net -a TsumugiAccount -c TsumugiProfile -d Tsumugi %1"
    }
  }
}
`}
          />
          <p>
            <code>signingIdentity</code> は書かず、環境変数 <code>APPLE_SIGNING_IDENTITY</code> で与えます。こうしておくと、証明書を持たない協力者が手元でビルドしても設定を書き換えずに済みます（署名は <code>--no-sign</code> で省略できます<Ref n={7} />）。CI で用意する環境変数を一覧にします。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>環境変数（GitHub のシークレット）</th>
                  <th>用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={3}>macOS</td>
                  <td><code>APPLE_CERTIFICATE</code>、<code>APPLE_CERTIFICATE_PASSWORD</code>、<code>KEYCHAIN_PASSWORD</code></td>
                  <td>証明書の取り込み</td>
                </tr>
                <tr>
                  <td><code>APPLE_SIGNING_IDENTITY</code></td>
                  <td>署名に使うアイデンティティ</td>
                </tr>
                <tr>
                  <td><code>APPLE_API_ISSUER</code>、<code>APPLE_API_KEY</code>、<code>APPLE_API_KEY_PATH</code></td>
                  <td>公証（API キー方式）</td>
                </tr>
                <tr>
                  <td>Windows</td>
                  <td><code>AZURE_CLIENT_ID</code>、<code>AZURE_CLIENT_SECRET</code>、<code>AZURE_TENANT_ID</code></td>
                  <td>Azure Artifact Signing の認証</td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td><code>SIGN=1</code>、<code>SIGN_KEY</code>、<code>APPIMAGETOOL_SIGN_PASSPHRASE</code></td>
                  <td>AppImage の GPG 署名（GPG 鍵自体は別途ランナーに取り込む）</td>
                </tr>
                <tr>
                  <td>共通</td>
                  <td><code>TAURI_SIGNING_PRIVATE_KEY</code>、<code>TAURI_SIGNING_PRIVATE_KEY_PASSWORD</code></td>
                  <td>updater 用の署名（<ChapterLink n={53} />）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>APPLE_API_KEY_PATH</code> はファイルのパスなので、CI では <code>.p8</code> の中身をシークレットから一時ファイルに書き出してからパスを渡します。<ChapterLink n={53} /> のワークフローでこの表の変数を実際に配置します。
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
            <li>コード署名は「誰が作ったか」と「改ざんされていないか」を、認証局からの信頼の連鎖で保証する。macOS の公証はそれに加えて Apple がマルウェアの有無を検査し、チケットを発行する。</li>
            <li>macOS は Developer ID Application 証明書で署名し、<code>APPLE_SIGNING_IDENTITY</code> か <code>bundle.macOS.signingIdentity</code> で Tauri に渡す。<code>hardenedRuntime</code> は既定で有効。</li>
            <li>公証の認証は App Store Connect API キー（<code>APPLE_API_ISSUER</code>・<code>APPLE_API_KEY</code>・<code>APPLE_API_KEY_PATH</code>）か Apple ID（<code>APPLE_ID</code>・<code>APPLE_PASSWORD</code>・<code>APPLE_TEAM_ID</code>）。<code>tauri build</code> が提出からステープルまで自動で行う。</li>
            <li>CI では <code>.p12</code> を base64 にした <code>APPLE_CERTIFICATE</code> と <code>APPLE_CERTIFICATE_PASSWORD</code> を使って一時キーチェーンに取り込む。</li>
            <li>Windows は <code>certificateThumbprint</code> 方式（Windows 上の signtool）か <code>signCommand</code> 方式（任意のツール、クロスコンパイル時は必須）。</li>
            <li>Linux の署名は任意で、AppImage は <code>SIGN=1</code> と GPG、rpm は <code>TAURI_SIGNING_RPM_KEY</code>。AppImage は署名を自動検証しない。</li>
          </ul>
          <p>次章では、署名した配布物を自動で更新する updater プラグインと、3 OS のビルドを GitHub Actions で一度に行う仕組みを作ります。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'macOS Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/macos/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Developer ID Application と Apple Distribution の使い分け、証明書の作成、signingIdentity と APPLE_SIGNING_IDENTITY、CI 用の APPLE_CERTIFICATE と APPLE_CERTIFICATE_PASSWORD、公証の2方式の環境変数、--skip-stapling、アドホック署名の根拠。',
    },
    {
      title: 'Windows Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/windows/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'OV と EV の評判に関する記述、2023年6月1日以前の OV 証明書向け手順、certificateThumbprint 方式、signCommand と %1、Azure Artifact Signing の CLI と環境変数、GitHub Actions のシークレット名の根拠。',
    },
    {
      title: 'Linux Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/linux/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'AppImage の GPG 署名の環境変数（SIGN、SIGN_KEY、APPIMAGETOOL_SIGN_PASSPHRASE、APPIMAGETOOL_FORCE_SIGN）、署名が自動検証されない注意、validate ツールの根拠。',
    },
    {
      title: 'Developer ID - Apple Developer',
      publisher: 'Apple',
      url: 'https://developer.apple.com/developer-id/',
      accessed: '2026-11-08',
      note: 'Developer ID 証明書と Gatekeeper の関係、公証サービスが Developer ID 署名済みソフトウェアを自動検査しチケットを割り当てること、Account Holder のみが証明書を作れること、失敗時のログ確認の根拠。',
    },
    {
      title: 'Safely open apps on your Mac',
      publisher: 'Apple Support',
      url: 'https://support.apple.com/en-us/102445',
      accessed: '2026-11-08',
      note: 'Gatekeeper の役割、Developer ID 署名の検証、macOS Catalina 以降は公証が期待されること、「このまま開く」の操作の根拠。',
    },
    {
      title: 'Configuration Reference（MacConfig、WindowsConfig）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'hardenedRuntime の既定値 true、signingIdentity、entitlements、providerShortName、certificateThumbprint、digestAlgorithm、timestampUrl、tsp、signCommand の根拠。',
    },
    {
      title: 'Command Line Interface（build、bundle）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: '--skip-stapling（ステープルを省略し公証の完了を待たない）と --no-sign の根拠。',
    },
    {
      title: 'macOS Application Bundle',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/macos-application-bundle/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'entitlements が署名時に適用されることの根拠。',
    },
    {
      title: 'RPM',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/rpm/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'TAURI_SIGNING_RPM_KEY と TAURI_SIGNING_RPM_KEY_PASSPHRASE、rpm --checksig による確認の根拠。',
    },
    {
      title: 'GitHub Pipelines',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/pipelines/github/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '署名していない Apple シリコン向けビルドが「壊れている（damaged）」と表示されること、アドホック署名の回避策の根拠。',
    },
  ],
}

export default chapter
