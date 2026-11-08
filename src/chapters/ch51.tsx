import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 51-1 tauri build の流れ ---------- */
function BuildFlowFigure() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="tauri build の流れ。beforeBuildCommand でフロントエンドをビルドし、cargo build --release で Rust をコンパイルし、バンドラが OS ごとのインストーラを作る3段階を左から右に並べた図">
      <defs>
        <marker id="arrow51a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <text x="320" y="26" fontSize="14" fontWeight="600" textAnchor="middle">npm run tauri build</text>
      <g fontSize="13">
        {/* 1 */}
        <rect x="20" y="50" width="180" height="90" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="110" y="74" textAnchor="middle" fontWeight="600">1. フロントエンド</text>
        <text x="110" y="96" textAnchor="middle" fontSize="12">beforeBuildCommand</text>
        <text x="110" y="114" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">vite build → dist/</text>
        <path d="M200,95 L225,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow51a)" />
        {/* 2 */}
        <rect x="230" y="50" width="180" height="90" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="74" textAnchor="middle" fontWeight="600">2. Rust のビルド</text>
        <text x="320" y="96" textAnchor="middle" fontSize="12">cargo build --release</text>
        <text x="320" y="114" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">dist/ を実行ファイルに埋め込む</text>
        <path d="M410,95 L435,95" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow51a)" />
        {/* 3 */}
        <rect x="440" y="50" width="180" height="90" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="530" y="74" textAnchor="middle" fontWeight="600">3. バンドル</text>
        <text x="530" y="96" textAnchor="middle" fontSize="12">bundle.targets に従う</text>
        <text x="530" y="114" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">署名・公証もここ</text>
        {/* outputs */}
        <path d="M530,140 L530,170" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow51a)" />
        <rect x="330" y="175" width="290" height="105" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="475" y="195" textAnchor="middle" fontSize="12" fill="var(--fig-muted)">src-tauri/target/release/bundle/</text>
        <text x="475" y="213" textAnchor="middle" fontSize="12">macos/ Tsumugi.app</text>
        <text x="475" y="231" textAnchor="middle" fontSize="12">dmg/ Tsumugi_1.0.0_aarch64.dmg</text>
        <text x="475" y="249" textAnchor="middle" fontSize="12">msi/ …_x64_en-US.msi　nsis/ …_x64-setup.exe</text>
        <text x="475" y="267" textAnchor="middle" fontSize="12">deb/ …_amd64.deb　rpm/　appimage/</text>
        {/* note */}
        <text x="20" y="175" fontSize="12" fill="var(--fig-muted)">--no-bundle で 3 を省略し、</text>
        <text x="20" y="193" fontSize="12" fill="var(--fig-muted)">後から tauri bundle だけ実行できる</text>
        <text x="20" y="225" fontSize="12" fill="var(--fig-muted)">--debug を付けると 2 が</text>
        <text x="20" y="243" fontSize="12" fill="var(--fig-muted)">デバッグビルドになる</text>
      </g>
      <text x="320" y="292" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">模式図：ファイル名は macOS Apple シリコンと Windows x64 の例</text>
    </svg>
  )
}

/* ---------- 図 51-2 配布形式と「どの OS で作れるか」 ---------- */
function TargetMatrixFigure() {
  const cols = [
    { x: 40, title: 'macOS', box: 'var(--fig-box3)', items: ['app（.app フォルダ）', 'dmg（ディスクイメージ）'], host: 'macOS でのみ作成' },
    { x: 230, title: 'Windows', box: 'var(--fig-box2)', items: ['msi（WiX v3）', 'nsis（-setup.exe）'], host: 'msi は Windows のみ／nsis は mac・Linux からも可' },
    { x: 420, title: 'Linux', box: 'var(--fig-box4)', items: ['deb', 'rpm', 'appimage（linuxdeploy）'], host: 'Linux で作成（古い glibc の環境を推奨）' },
  ]
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="Tauri 2 のバンドル形式を OS ごとに3列に並べた図。macOS は app と dmg、Windows は msi と nsis、Linux は deb・rpm・appimage。各列の下に、その形式をどの OS 上で作れるかを示す">
      <g fontSize="13">
        {cols.map((c) => (
          <g key={c.title}>
            <rect x={c.x} y="20" width="180" height="40" rx="8" fill={c.box} stroke="var(--fig-line)" />
            <text x={c.x + 90} y="46" textAnchor="middle" fontWeight="600" fontSize="15">{c.title}</text>
            {c.items.map((it, i) => (
              <g key={it}>
                <rect x={c.x + 10} y={75 + i * 38} width="160" height="30" rx="4" fill="var(--fig-bg)" stroke="var(--fig-line)" />
                <text x={c.x + 90} y={95 + i * 38} textAnchor="middle" fontSize="12">{it}</text>
              </g>
            ))}
          </g>
        ))}
      </g>
      <line x1="40" y1="200" x2="600" y2="200" stroke="var(--fig-line)" strokeDasharray="4 4" />
      <text x="130" y="222" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">macOS でのみ作成</text>
      <text x="320" y="222" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">msi は Windows のみ</text>
      <text x="320" y="240" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">nsis は mac／Linux からも可</text>
      <text x="510" y="222" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">Linux で作成</text>
      <text x="510" y="240" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">（古い glibc の環境を推奨）</text>
    </svg>
  )
}

/* ---------- 図 51-3 バージョンの出どころ ---------- */
function VersionSourceFigure() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="アプリのバージョンがどこから決まるかを示す図。tauri.conf.json の version が設定されていればそれが使われ、無ければ src-tauri/Cargo.toml の package.version が使われる。決まったバージョンはバンドル名、Info.plist、インストーラのメタデータ、updater の比較に流れる">
      <defs>
        <marker id="arrow51c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13">
        <rect x="20" y="30" width="200" height="60" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="120" y="54" textAnchor="middle" fontWeight="600">tauri.conf.json</text>
        <text x="120" y="76" textAnchor="middle" fontSize="12">"version": "1.0.0"（推奨）</text>
        <rect x="20" y="130" width="200" height="60" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" strokeDasharray="6 4" />
        <text x="120" y="154" textAnchor="middle" fontWeight="600">src-tauri/Cargo.toml</text>
        <text x="120" y="176" textAnchor="middle" fontSize="12">[package] version（未設定時）</text>
        <path d="M220,60 L300,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow51c)" />
        <path d="M220,160 L300,120" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow51c)" />
        <rect x="305" y="85" width="110" height="50" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="360" y="115" textAnchor="middle" fontWeight="600">アプリの版</text>
        <path d="M415,110 L450,110" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow51c)" />
        <rect x="455" y="30" width="170" height="160" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="540" y="56" textAnchor="middle" fontWeight="600">使われる場所</text>
        <text x="540" y="84" textAnchor="middle" fontSize="12">バンドルのファイル名</text>
        <text x="540" y="108" textAnchor="middle" fontSize="12">Info.plist／MSI の版</text>
        <text x="540" y="132" textAnchor="middle" fontSize="12">updater の新旧比較</text>
        <text x="540" y="156" textAnchor="middle" fontSize="12">tauri-action の __VERSION__</text>
      </g>
      <text x="320" y="210" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">実線：優先される経路　点線：version が未設定のときだけ使われる経路</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 51,
  part: 7,
  title: 'ビルドとバンドル',
  summary:
    '開発中は tauri dev で動かしてきたアプリを、ほかの人の PC にインストールできる形にします。tauri build の3段階、macOS・Windows・Linux それぞれの配布形式と作れる環境の制約、アイコンの生成、バージョンの管理、実行ファイルのサイズ最適化を扱います。',
  goals: [
    'tauri build が「フロントエンドのビルド → Rust のビルド → バンドル」の順に進むことを説明できる',
    '.app/.dmg、.msi/NSIS、.deb/.rpm/AppImage の違いと、それぞれをどの OS で作れるかを言える',
    'bundle 設定（targets、icon、macOS、windows、linux）の主な項目を読み書きできる',
    'tauri icon でアイコン一式を生成できる',
    'version の出どころ（tauri.conf.json と Cargo.toml の関係）を説明できる',
    'Cargo のプロファイル設定で実行ファイルを小さくする方法を知っている',
  ],
  prerequisites: [2, 33, 50],
  sections: [
    {
      id: 'build-flow',
      title: '開発ビルドから配布ビルドへ：tauri build の3段階',
      body: (
        <>
          <p>
            第6部までで Tsumugi は手元の <code>tauri dev</code> で動くようになりました。しかし、ほかの人に渡すにはこのままでは不十分です。<code>tauri dev</code> は Vite の開発サーバーと Rust のデバッグビルドを組み合わせて動かしており、Node.js も Rust のツールチェーンも入っていない PC では起動できません。
          </p>
          <p>
            配布のためには、フロントエンドを静的ファイルに変換し、Rust を最適化してコンパイルし、OS ごとの作法に合ったインストーラにまとめる必要があります。Tauri ではこの一連の作業を <code>tauri build</code> という1つのコマンドが担います。<Ref n={1} /> 第7部ではこのコマンドを出発点に、署名と公証（<ChapterLink n={52} />）、自動アップデートと CI（<ChapterLink n={53} />）へと進みます。
          </p>
          <p>
            この章で扱うのはデスクトップ3 OS です。モバイルは <code>tauri android build</code> と <code>tauri ios build</code> という別のコマンドを使い、<ChapterLink n={57} /> で扱います。
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境は Linux です。Tsumugi の <code>tauri build --bundles deb</code> は成功し、生成された deb（約 5.5 MiB、依存は <code>libwebkit2gtk-4.1-0</code> と <code>libgtk-3-0</code>）の中身を確認しましたが、インストールは試しておらず、AppImage と rpm も未試行です。macOS と Windows のバンドルも実機で試せていません。この章の macOS・Windows に関する記述は Tauri 公式ドキュメント（Tauri 2.12 時点）に基づくもので、本書の制作環境では未検証です。
            </p>
          </Callout>
          <h3>tauri build の3段階</h3>
          <p>
            <code>tauri build</code> が何をしているかを先に図で押さえます。この図は、コマンドが内部で呼び出す3つの工程と、その成果物が置かれる場所を表しています。各工程がどの設定項目に対応するかに注目してください。
          </p>
          <Figure n="51-1" title="tauri build の流れ" caption="フロントエンドのビルド、Rust のリリースビルド、バンドルの3段階が順に実行される。成果物は src-tauri/target/release/bundle/ の下に形式ごとのフォルダで置かれる。模式図。">
            <BuildFlowFigure />
          </Figure>
          <ol className="steps">
            <li>
              <Term en="frontend build">フロントエンドのビルド</Term>。<code>tauri.conf.json</code> の <code>build.beforeBuildCommand</code>（<ChapterLink n={33} /> で設定した <code>npm run build</code> など）を実行し、Vite が <code>dist/</code> に静的ファイルを書き出します。
            </li>
            <li>
              Rust のビルド。<code>cargo build --release</code> 相当の処理で、<code>dist/</code> の中身を実行ファイルに埋め込みます。<code>--debug</code> を付けるとデバッグビルドになり、DevTools が使える代わりに最適化されません。<Ref n={9} /><Ref n={11} />
            </li>
            <li>
              <Term en="bundle">バンドル</Term>。<code>bundle.targets</code> に列挙された形式のインストーラを作ります。コード署名や公証（<ChapterLink n={52} />）もこの段階で行われます。
            </li>
          </ol>
          <p>
            3段階は分けて実行することもできます。<code>tauri build --no-bundle</code> で 1 と 2 だけを行い、後から <code>tauri bundle</code> で 3 だけを行う、という使い方です。公式ドキュメントは、App Store 向けと直接配布向けで設定を変えてバンドルし直す例として次のコマンドを挙げています。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
# ビルドだけ行い、バンドルは後回しにする
npm run tauri build -- --no-bundle

# 直接配布向け：.app と .dmg を作る
npm run tauri bundle -- --bundles app,dmg

# App Store 向け：別の設定ファイルを重ねて .app だけ作る
npm run tauri bundle -- --bundles app --config src-tauri/tauri.appstore.conf.json
`}
          />
          <p>
            <code>--config</code> は JSON（JSON5、TOML も可）の設定を既定の <code>tauri.conf.json</code> にマージするオプションです。<Ref n={9} /> 配布経路ごとに差分だけを小さなファイルに書く、という使い方が基本です。
          </p>
          <Callout kind="warn">
            <p>
              <code>identifier</code> が既定の <code>com.tauri.dev</code> のままだと <code>tauri build</code> は失敗します。<Ref n={8} /> <code>productName</code> も既定値から変えておきます。この2つはインストール先やアプリデータの保存先（<ChapterLink n={36} />）の名前にもなるので、公開後に変えると別のアプリ扱いになります。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'formats',
      title: '配布形式の比較',
      body: (
        <>
          <p>
            Tauri 2 のバンドラが作れる形式は、<code>bundle.targets</code> に書ける値として <code>deb</code>、<code>rpm</code>、<code>appimage</code>、<code>msi</code>、<code>nsis</code>、<code>app</code>、<code>dmg</code> の7つです。既定値は <code>"all"</code> で、実行中の OS で作れるものをすべて作ります。<Ref n={8} /> それぞれの性格を表にまとめます。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>形式</th>
                  <th>OS</th>
                  <th>中身</th>
                  <th>向いている配布経路</th>
                  <th>作れる環境</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>app</code></td>
                  <td>macOS</td>
                  <td><code>名前.app</code> というフォルダ（実行ファイル、Info.plist、アイコン、署名情報）</td>
                  <td>App Store 提出、dmg の材料</td>
                  <td>macOS</td>
                </tr>
                <tr>
                  <td><code>dmg</code></td>
                  <td>macOS</td>
                  <td>.app を入れたディスクイメージ。Applications フォルダへドラッグして入れる画面付き</td>
                  <td>Web サイトからの直接配布</td>
                  <td>macOS</td>
                </tr>
                <tr>
                  <td><code>msi</code></td>
                  <td>Windows</td>
                  <td>WiX Toolset v3 で作る Windows Installer</td>
                  <td>企業配布、グループポリシー</td>
                  <td>Windows のみ</td>
                </tr>
                <tr>
                  <td><code>nsis</code></td>
                  <td>Windows</td>
                  <td>NSIS で作る <code>-setup.exe</code>。既定では管理者権限なしでユーザー単位にインストール</td>
                  <td>Web サイトからの直接配布</td>
                  <td>Windows、macOS、Linux</td>
                </tr>
                <tr>
                  <td><code>deb</code></td>
                  <td>Linux</td>
                  <td>Debian/Ubuntu 系のパッケージ。依存関係を宣言</td>
                  <td>apt での配布</td>
                  <td>Linux</td>
                </tr>
                <tr>
                  <td><code>rpm</code></td>
                  <td>Linux</td>
                  <td>Fedora/RHEL 系のパッケージ</td>
                  <td>dnf での配布</td>
                  <td>Linux</td>
                </tr>
                <tr>
                  <td><code>appimage</code></td>
                  <td>Linux</td>
                  <td>依存ライブラリを同梱した単一ファイル。インストール不要</td>
                  <td>ディストリビューションを問わない直接配布</td>
                  <td>Linux</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            次の図は、同じ内容を「どの OS 上で作れるか」という視点で並べ直したものです。<ChapterLink n={53} /> で CI のマトリクスを組むとき、この制約がそのまま「どのランナーが必要か」を決めます。
          </p>
          <Figure n="51-2" title="配布形式と、それを作れる OS" caption="macOS の形式は macOS でしか作れない。msi は Windows でしか作れないが、nsis は NSIS と cargo-xwin を使えば macOS や Linux からも作れる。Linux の形式は Linux で作る。">
            <TargetMatrixFigure />
          </Figure>
          <p>
            図から分かるとおり、3 OS すべてに配布するには結局3種類のビルド環境が要ります。手元の Mac だけで完結させるのは現実的ではなく、CI を使うのが普通です。公式ドキュメントも Linux のビルドには Docker か GitHub Actions を勧めています。<Ref n={5} />
          </p>
        </>
      ),
    },
    {
      id: 'macos',
      title: 'macOS：.app と .dmg',
      body: (
        <>
          <p>
            macOS のアプリは <code>名前.app</code> という拡張子付きフォルダです。中には <code>Contents/Info.plist</code>（アプリの説明書）、<code>Contents/MacOS/</code>（実行ファイル）、<code>Contents/Resources/</code>（<code>icon.icns</code> と <code>bundle.resources</code> のファイル）、署名後は <code>_CodeSignature/</code> が入ります。<Ref n={2} /> <code>tauri build --bundles app</code> でこのフォルダだけを作れます。
          </p>
          <p>
            Web サイトから配るときは、この .app を <Term en="disk image">ディスクイメージ</Term>（.dmg）に包みます。開くと「アプリのアイコンを Applications フォルダへドラッグする」画面が出るおなじみの形式で、<code>bundle.macOS.dmg</code> で背景画像や窓の大きさ、アイコンの位置を指定できます。<Ref n={3} />
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（bundle.macOS の抜粋）"
            code={`
{
  "bundle": {
    "macOS": {
      "minimumSystemVersion": "12.0",
      "entitlements": "./Entitlements.plist",
      "dmg": {
        "background": "./images/dmg-background.png",
        "windowSize": { "width": 660, "height": 400 },
        "appPosition": { "x": 180, "y": 170 },
        "applicationFolderPosition": { "x": 480, "y": 170 }
      }
    }
  }
}
`}
          />
          <p>
            <code>minimumSystemVersion</code> の既定値は <code>10.13</code> です。<Ref n={8} /> <code>entitlements</code> は署名時に適用される権限の宣言ファイルで、<ChapterLink n={52} /> で再登場します。カメラやマイクの利用理由のように <code>Info.plist</code> に独自のキーが必要なときは、<code>src-tauri/Info.plist</code> を置けば CLI が生成する内容と統合されます。<Ref n={2} />
          </p>
          <p>
            CPU は Apple シリコン（<code>aarch64-apple-darwin</code>）と Intel（<code>x86_64-apple-darwin</code>）の2種類があり、<code>--target</code> で選びます。両方を1つの実行ファイルに入れた <Term en="universal binary">ユニバーサルバイナリ</Term> は <code>--target universal-apple-darwin</code> で作れますが、<code>rustup target add</code> で両方のターゲットを入れておく必要があります。<Ref n={9} />
          </p>
          <Callout>
            <p>
              公式ドキュメントは、CI 上で dmg を作るとアイコンの位置や大きさの設定が反映されないという既知の問題を挙げています（tauri-apps/tauri#1731）。<Ref n={3} /> また macOS と Linux の GUI アプリはシェルの <code>$PATH</code> を引き継がないため、外部コマンドを呼ぶアプリでは <code>fix-path-env-rs</code> クレートの利用が案内されています。<Ref n={3} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'windows',
      title: 'Windows：MSI と NSIS、WebView2 の同梱',
      body: (
        <>
          <p>
            Windows には2種類のインストーラがあります。<code>msi</code> は WiX Toolset v3 で作る Windows Installer 形式で、Windows 上でしか作れません。<code>nsis</code> は NSIS で作る <code>-setup.exe</code> 形式で、NSIS・LLVM・<code>cargo-xwin</code> を入れれば macOS や Linux からもクロスコンパイルできます。ただし公式ドキュメントはこの経路を「Windows 上でのビルドほどは検証されていない」と断っています。<Ref n={4} />
          </p>
          <p>
            NSIS の既定では、管理者権限を求めずに現在のユーザーだけにインストールします（<code>%LOCALAPPDATA%</code> 配下）。全ユーザー向けにするには <code>bundle.windows.nsis.installMode</code> を <code>perMachine</code> か <code>both</code> にします。<Ref n={4} />
          </p>
          <h3>WebView2 をどう用意するか</h3>
          <p>
            <ChapterLink n={33} /> で見たとおり、Windows の Tauri アプリは Microsoft Edge WebView2 を使って画面を描きます。Windows 10（2018年4月以降）と Windows 11 には最初から入っていますが、入っていない環境のために、インストーラがどう振る舞うかを <code>bundle.windows.webviewInstallMode.type</code> で選びます。<Ref n={4} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>type</th>
                  <th>インストーラに増える容量</th>
                  <th>インターネット</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>downloadBootstrapper</code>（既定）</td>
                  <td>約 0 MB</td>
                  <td>必要</td>
                  <td>小さなブートストラッパをダウンロードして実行する</td>
                </tr>
                <tr>
                  <td><code>embedBootstrapper</code></td>
                  <td>約 1.8 MB</td>
                  <td>必要</td>
                  <td>ブートストラッパを同梱する</td>
                </tr>
                <tr>
                  <td><code>offlineInstaller</code></td>
                  <td>約 127 MB</td>
                  <td>不要</td>
                  <td>WebView2 のインストーラ全体を同梱する</td>
                </tr>
                <tr>
                  <td><code>fixedRuntime</code></td>
                  <td>約 180 MB</td>
                  <td>不要</td>
                  <td>特定バージョンのランタイムをアプリ専用に同梱する</td>
                </tr>
                <tr>
                  <td><code>skip</code></td>
                  <td>0 MB</td>
                  <td>—</td>
                  <td>何もしない。ランタイムが無い PC では起動しないため非推奨</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            一般的な配布では既定の <code>downloadBootstrapper</code> で十分です。オフライン環境への配布が前提なら <code>offlineInstaller</code> を選びます。
          </p>
          <h3>CPU アーキテクチャ</h3>
          <p>
            既定ではビルドしている PC と同じアーキテクチャ（通常は x64）になります。32ビット版は <code>--target i686-pc-windows-msvc</code>、ARM64 版は <code>--target aarch64-pc-windows-msvc</code> を指定し、どちらも事前に <code>rustup target add</code> が必要です。ARM64 では Visual Studio の「C++ ARM64 build tools」も要ります。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'linux',
      title: 'Linux：deb、rpm、AppImage',
      body: (
        <>
          <p>
            Linux はディストリビューションごとにパッケージ形式が違うため、Tauri は3形式を用意しています。<code>deb</code> は Debian/Ubuntu 系、<code>rpm</code> は Fedora/RHEL 系のパッケージで、どちらもシステムのパッケージ管理に組み込まれます。生成される deb は実行時依存として <code>libwebkit2gtk-4.1-0</code> と <code>libgtk-3-0</code> を宣言し、システムトレイを使うなら <code>libappindicator3-1</code> も加わります。<Ref n={5} />
          </p>
          <p>
            <Term en="AppImage">AppImage</Term> は、依存ライブラリを1つのファイルに同梱した形式です。利用者は実行権限を付けて起動するだけで、インストールは要りません。ただし公式ドキュメントは、ファイルサイズが 2〜6 MB から 70 MB 以上に膨らみうると注意しています。<Ref n={7} /> 音声や動画を再生するアプリでは <code>bundle.linux.appimage.bundleMediaFramework</code> で GStreamer を同梱できますが、サイズはさらに増えます。
          </p>
          <p>
            3形式に共通する重要な注意が、ビルド環境の古さです。Linux の実行ファイルはビルドした環境の glibc に依存するため、新しい環境でビルドすると古いディストリビューションで <code>version 'GLIBC_2.33' not found</code> のようなエラーが出ます。公式ドキュメントは、サポートしたい中で最も古い、かつ WebKitGTK 4.1 が入手できる環境（Ubuntu 22.04 や Debian 12 を例示）でビルドするよう勧めています。<Ref n={5} /> <Ref n={6} /> <ChapterLink n={53} /> の GitHub Actions で <code>ubuntu-22.04</code> ランナーを使うのはこのためです。
          </p>
          <p>
            追加ファイルは <code>files</code> で指定します。AppImage の場合、配置先は <code>/usr/</code> から始まる必要があります。<Ref n={7} />
          </p>
          <Code
            lang="json"
            title="bundle.linux の例（deb と appimage に README を同梱）"
            code={`
{
  "bundle": {
    "linux": {
      "deb": {
        "files": { "/usr/share/doc/tsumugi/README.md": "../README.md" }
      },
      "appimage": {
        "bundleMediaFramework": false,
        "files": { "/usr/share/doc/tsumugi/README.md": "../README.md" }
      },
      "rpm": { "epoch": 0, "release": "1" }
    }
  }
}
`}
          />
          <p>
            rpm には GPG 署名の仕組みがあり、<code>TAURI_SIGNING_RPM_KEY</code> と <code>TAURI_SIGNING_RPM_KEY_PASSPHRASE</code> という環境変数で鍵を渡します。<Ref n={6} /> AppImage の署名とあわせて <ChapterLink n={52} /> で扱います。
          </p>
        </>
      ),
    },
    {
      id: 'icons-version',
      title: 'アイコン、バージョン、識別子',
      body: (
        <>
          <p>
            OS ごとにアイコンの形式は異なります。macOS は <code>.icns</code>、Windows は <code>.ico</code>、Linux は複数サイズの PNG が要り、モバイルではさらに多くのサイズが必要です。これらを手で作る代わりに、<code>tauri icon</code> コマンドに1枚の元画像を渡します。
          </p>
          <Code
            lang="bash"
            code={`
# ./app-icon.png（正方形・透過 PNG か SVG）から全形式を生成
npm run tauri icon

# 元画像と出力先を指定する
npm run tauri icon -- ./design/tsumugi-icon.svg --output ./src-tauri/icons
`}
          />
          <p>
            入力の既定値は <code>./app-icon.png</code>、出力先の既定値は <code>tauri.conf.json</code> の隣の <code>icons</code> フォルダです。正方形でない画像はそのままでは拒否され、<code>--fit cover</code> か <code>--fit contain</code> で正方形に合わせる指定が要ります。iOS 用アイコンの背景色は <code>--ios-color</code> で指定し、既定は白です。<Ref n={9} />
          </p>
          <p>
            生成したファイルは <code>bundle.icon</code> に列挙します。<code>create-tauri-app</code> で作ったプロジェクトには最初からこの設定があるので、同じファイル名で上書きするのが一番手間がかかりません。
          </p>
          <Code
            lang="json"
            code={`
{
  "bundle": {
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
`}
          />
          <h3>バージョンと識別子</h3>
          <p>
            Tauri プロジェクトには <code>package.json</code>、<code>src-tauri/Cargo.toml</code>、<code>src-tauri/tauri.conf.json</code> と、バージョンを書けそうな場所が3つあります。アプリのバージョンとして使われるのはどれか、図で整理します。
          </p>
          <Figure n="51-3" title="アプリのバージョンがどこから決まるか" caption="tauri.conf.json の version が設定されていればそれが使われる。未設定なら src-tauri/Cargo.toml の package.version が使われる。決まった値はバンドルの名前や OS ごとのメタデータ、updater の比較に流れる。">
            <VersionSourceFigure />
          </Figure>
          <p>
            公式ドキュメントは <code>tauri.conf.json</code> の <code>version</code> で管理することを推奨しています。これが未設定のときだけ <code>Cargo.toml</code> の <code>package.version</code> が使われます。<Ref n={1} /> <Ref n={8} /> <code>version</code> には semver の文字列のほか、<code>version</code> フィールドを持つ <code>package.json</code> へのパスも書けます。<Ref n={8} /> フロントエンドと同じ番号で管理したいなら、次のように書くと1箇所で済みます。
          </p>
          <Code
            lang="json"
            code={`
{
  "productName": "Tsumugi",
  "identifier": "jp.example.tsumugi",
  "version": "../package.json"
}
`}
          />
          <p>
            <code>package.json</code> の <code>version</code> は Rust 側のクレートのバージョンとは無関係なので、<code>Cargo.toml</code> の方は <code>0.1.0</code> のままでも問題ありません。ただし公式ドキュメントは、OS によってバージョン文字列に制限があると注記しています。<Ref n={1} /> プレリリース識別子（<code>1.0.0-beta.1</code> など）を使う予定があるなら、対象 OS のインストーラで実際に動くかを早めに確かめておきます。
          </p>
          <p>
            <code>identifier</code> は逆ドメイン形式（<code>com.example.app</code>）で、英数字・ハイフン・ピリオドだけが使えます。<Ref n={8} /> <code>bundle.publisher</code> を省略すると identifier の2番目の要素が発行者名として使われ、Windows Installer の Manufacturer や Debian の Maintainer に入ります。<Ref n={8} />
          </p>
        </>
      ),
    },
    {
      id: 'size',
      title: '実行ファイルのサイズ最適化',
      body: (
        <>
          <p>
            Tauri が Electron より小さいのは WebView を OS のものに任せるからですが（<ChapterLink n={1} />）、Rust のビルド設定でもサイズは変わります。公式ドキュメントが安定版ツールチェーン向けに勧める <code>Cargo.toml</code> の設定は次のとおりです。<Ref n={10} />
          </p>
          <Code
            lang="toml"
            title="src-tauri/Cargo.toml"
            code={`
[profile.dev]
incremental = true  # 差分コンパイルで開発中のビルドを速くする

[profile.release]
codegen-units = 1   # 並列度を下げる代わりに LLVM の最適化を効かせる
lto = true          # リンク時最適化
opt-level = "s"     # サイズ優先（速度優先なら 3）
panic = "abort"     # パニック時の巻き戻しを省く
strip = true        # デバッグシンボルを取り除く
`}
          />
          <p>
            <code>codegen-units = 1</code> と <code>lto = true</code> はコンパイル時間を長くします。開発中の <code>tauri dev</code> は <code>profile.dev</code> を使うので影響はなく、リリースビルドだけが遅くなります。<code>strip = true</code> はクラッシュ時のスタックトレースから関数名を消すので、<ChapterLink n={58} /> で触れるプロファイリングをするときは一時的に外します。
          </p>
          <p>
            もう1つ、Tauri 2.4 以降には <code>build.removeUnusedCommands</code> という設定があります。有効にすると、capability ファイル（<ChapterLink n={37} />）で許可していないコマンドをビルドから取り除きます。公式ドキュメントはこの効果を得るために、権限を <code>default</code> のセットで一括許可するのではなく、使うコマンドだけを列挙するよう勧めています。実行時に動的に追加した権限は検出できない点に注意が要ります。<Ref n={10} />
          </p>
          <p>
            フロントエンド側のサイズは Vite の仕事です。第6部で BlockNote のような大きなライブラリを入れたので、<code>vite build</code> の出力サイズを一度は確認しておく価値があります。<ChapterLink n={14} /> の <code>lazy</code> による分割は、ここでも効きます。
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
            ここまでの内容を Tsumugi の <code>tauri.conf.json</code> にまとめます。第6部で設定した <code>build</code> や <code>app</code>、<code>plugins</code> はそのままに、<code>bundle</code> を次のようにします。署名と updater に関する項目は <ChapterLink n={52} /> と <ChapterLink n={53} /> で追加します。
          </p>
          <Code
            lang="json"
            title="src-tauri/tauri.conf.json（配布に関わる部分）"
            code={`
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "Tsumugi",
  "version": "../package.json",
  "identifier": "jp.example.tsumugi",
  "build": {
    "beforeBuildCommand": "npm run build",
    "frontendDist": "../dist",
    "removeUnusedCommands": true
  },
  "bundle": {
    "active": true,
    "targets": ["app", "dmg", "nsis", "deb", "appimage"],
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "category": "Productivity",
    "shortDescription": "ローカル保存のブロック型ノート",
    "longDescription": "ページの入れ子、ブロック編集、全文検索、簡易データベースを備えたノートアプリ。データはすべて手元の SQLite に保存します。",
    "copyright": "© 2026 Tsumugi contributors",
    "license": "MIT",
    "licenseFile": "../LICENSE",
    "macOS": {
      "minimumSystemVersion": "12.0"
    },
    "windows": {
      "webviewInstallMode": { "type": "downloadBootstrapper", "silent": true },
      "nsis": { "installMode": "currentUser", "languages": ["Japanese", "English"] }
    },
    "linux": {
      "appimage": { "bundleMediaFramework": false }
    }
  }
}
`}
          />
          <p>
            判断の根拠を補足します。<code>targets</code> から <code>msi</code> と <code>rpm</code> を外したのは、Tsumugi は個人向けの直接配布を想定しており、企業配布向けの MSI と Fedora 系向けの rpm は当面不要だからです。必要になれば配列に足すだけです。<code>nsis.installMode</code> を明示的に <code>currentUser</code> にしているのは、管理者権限なしでインストールできることを設定ファイル上で読み取れるようにするためです。<code>minimumSystemVersion</code> を 12.0 に上げたのは、Tsumugi が依存する WebKit の機能を古い macOS で検証する余力がないためで、公式の既定値 10.13 のままでも設定上は構いません。
          </p>
          <p>
            <code>Cargo.toml</code> には前節の <code>[profile.release]</code> をそのまま入れます。Tsumugi は <code>src-tauri</code> がワークスペース（<code>core</code> クレートを含む）なので、プロファイルはワークスペースのルートである <code>src-tauri/Cargo.toml</code> に書きます。
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
            <li><code>tauri build</code> は、フロントエンドのビルド、Rust のリリースビルド、バンドルの3段階で進み、<code>--no-bundle</code> と <code>tauri bundle</code> で分けて実行できる。</li>
            <li>バンドル形式は <code>app</code>・<code>dmg</code>（macOS）、<code>msi</code>・<code>nsis</code>（Windows）、<code>deb</code>・<code>rpm</code>・<code>appimage</code>（Linux）の7つ。macOS の形式は macOS、msi は Windows でしか作れず、Linux は古い glibc の環境でビルドする。</li>
            <li>Windows では WebView2 の用意の仕方を <code>webviewInstallMode</code> で選ぶ。既定はダウンロード方式で、オフライン配布なら同梱方式にする。</li>
            <li>アイコンは <code>tauri icon</code> で1枚の画像から全形式を生成する。</li>
            <li>バージョンは <code>tauri.conf.json</code> の <code>version</code> で管理し、未設定時だけ <code>Cargo.toml</code> が使われる。<code>identifier</code> は公開後に変えない。</li>
            <li>サイズは <code>[profile.release]</code> の <code>lto</code>・<code>opt-level = "s"</code>・<code>strip</code> と <code>removeUnusedCommands</code> で削れる。</li>
          </ul>
          <p>次章では、作ったバンドルを利用者の OS に「信頼できるもの」として認めさせるための、コード署名と macOS の公証を扱います。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Distribute',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'tauri build と tauri bundle の関係、--no-bundle、バージョンの出どころ（tauri.conf.json 優先、未設定時は Cargo.toml）、OS ごとの配布経路の根拠。',
    },
    {
      title: 'macOS Application Bundle',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/macos-application-bundle/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '.app の内部構造、Info.plist の統合、bundle.macOS の entitlements・minimumSystemVersion・frameworks・files の根拠。',
    },
    {
      title: 'DMG',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/dmg/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'dmg の役割と bundle.macOS.dmg の設定項目、CI での既知の問題、fix-path-env-rs の根拠。',
    },
    {
      title: 'Windows Installer',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/windows-installer/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'MSI と NSIS の違い、webviewInstallMode の各方式と容量、アーキテクチャの指定、クロスコンパイルの根拠。',
    },
    {
      title: 'Debian',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/debian/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'deb の実行時依存、files 設定、glibc の互換性とビルド環境の推奨の根拠。',
    },
    {
      title: 'RPM',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/rpm/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'rpm の設定項目、出力先、GPG 署名の環境変数の根拠。',
    },
    {
      title: 'AppImage',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/appimage/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'AppImage の性質とサイズ、linuxdeploy、bundleMediaFramework、files の制約の根拠。',
    },
    {
      title: 'Configuration Reference（BundleConfig、BundleTarget、version、identifier）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/#bundleconfig',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'bundle の各項目と既定値、targets に書ける7つの値、version の仕様、identifier の制約、publisher の既定値の根拠。',
    },
    {
      title: 'Command Line Interface（build、bundle、icon）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: 'tauri build の --debug・--target・--config・--no-bundle、universal-apple-darwin、tauri icon の引数とオプションの根拠。',
    },
    {
      title: 'App Size',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/concept/size/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '[profile.release] の推奨設定と各項目の意味、build.removeUnusedCommands の根拠。',
    },
    {
      title: 'Debug',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/debug/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'デバッグビルドで DevTools（インスペクタ）が使えることの根拠。',
    },
  ],
}

export default chapter
