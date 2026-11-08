import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 57-1 配布の流れ ---------- */
function DistributionFlowFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="iOS と Android の配布の流れを上下 2 段で並べた図。iOS は署名素材（証明書とプロビジョニングプロファイル）から tauri ios build で ipa を作り、App Store Connect にアップロードして TestFlight で配り、審査を経て App Store に公開する。Android はキーストアから tauri android build --aab で aab を作り、Play Console にアップロードして内部テストで配り、審査を経て Google Play に公開する">
      <defs>
        <marker id="arrow57a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" textAnchor="middle">
        <text x="20" y="30" fontSize="14" fontWeight="600" textAnchor="start">iOS</text>
        <rect x="20" y="42" width="140" height="64" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="90" y="64" fontWeight="600">署名素材</text>
        <text x="90" y="82" fontSize="11">Apple Distribution 証明書</text>
        <text x="90" y="98" fontSize="11">Provisioning Profile</text>
        <path d="M160,74 L180,74" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57a)" />
        <rect x="185" y="42" width="130" height="64" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="250" y="64" fontWeight="600">ビルド成果物</text>
        <text x="250" y="82" fontSize="11">tauri ios build</text>
        <text x="250" y="98" fontSize="11">→ .ipa</text>
        <path d="M315,74 L345,74" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57a)" />
        <rect x="350" y="42" width="130" height="64" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="415" y="64" fontWeight="600">テスト配布</text>
        <text x="415" y="82" fontSize="11">App Store Connect に</text>
        <text x="415" y="98" fontSize="11">アップロード→TestFlight</text>
        <path d="M480,74 L510,74" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow57a)" />
        <rect x="515" y="42" width="105" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="567" y="64" fontWeight="600">ストア</text>
        <text x="567" y="82" fontSize="11">App Review</text>
        <text x="567" y="98" fontSize="11">→ App Store</text>

        <text x="20" y="180" fontSize="14" fontWeight="600" textAnchor="start">Android</text>
        <rect x="20" y="192" width="130" height="64" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="85" y="214" fontWeight="600">署名素材</text>
        <text x="85" y="232" fontSize="11">アップロード鍵</text>
        <text x="85" y="248" fontSize="11">（upload-keystore.jks）</text>
        <path d="M150,224 L180,224" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57a)" />
        <rect x="185" y="192" width="130" height="64" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="250" y="214" fontWeight="600">ビルド成果物</text>
        <text x="250" y="232" fontSize="11">tauri android build --aab</text>
        <text x="250" y="248" fontSize="11">→ .aab（署名済み）</text>
        <path d="M315,224 L345,224" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57a)" />
        <rect x="350" y="192" width="130" height="64" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="415" y="214" fontWeight="600">テスト配布</text>
        <text x="415" y="232" fontSize="11">Play Console に</text>
        <text x="415" y="248" fontSize="11">アップロード→内部テスト</text>
        <path d="M480,224 L510,224" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow57a)" />
        <rect x="515" y="192" width="105" height="64" rx="8" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="567" y="214" fontWeight="600">ストア</text>
        <text x="567" y="232" fontSize="11">審査</text>
        <text x="567" y="248" fontSize="11">→ Google Play</text>
      </g>
      <text x="320" y="140" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">紫＝一度用意して保管するもの　橙＝毎回のビルド　青＝テスト配布　緑＝ストア公開</text>
      <text x="320" y="300" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：コマンドと管理画面の操作で進む　点線：審査を経て進む（本書では概要のみ）</text>
    </svg>
  )
}

/* ---------- 図 57-2 署名素材の関係 ---------- */
function SigningMaterialsFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="署名素材の関係。左の iOS では、Apple Developer アカウントで作る証明書と、tauri.conf.json の identifier と一致する App ID が、プロビジョニングプロファイルによって結び付けられ、ipa の署名に使われる。右の Android では、keytool で作ったキーストアのアップロード鍵で aab に署名し、Google Play が Play App Signing でアプリ署名鍵を保管して配布用に署名し直す">
      <defs>
        <marker id="arrow57b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12" textAnchor="middle">
        {/* iOS */}
        <text x="160" y="26" fontSize="14" fontWeight="600">iOS</text>
        <rect x="20" y="40" width="130" height="50" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="85" y="60">証明書</text>
        <text x="85" y="78" fontSize="11" fill="var(--fig-muted)">Apple Distribution</text>
        <rect x="170" y="40" width="130" height="50" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="235" y="60">App ID</text>
        <text x="235" y="78" fontSize="11" fill="var(--fig-muted)">= identifier</text>
        <path d="M85,90 L140,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57b)" />
        <path d="M235,90 L180,140" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57b)" />
        <rect x="60" y="145" width="200" height="56" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="160" y="167">プロビジョニングプロファイル</text>
        <text x="160" y="186" fontSize="11" fill="var(--fig-muted)">両者を結び、capability を有効化</text>
        <path d="M160,201 L160,240" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57b)" />
        <rect x="95" y="245" width="130" height="44" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="272">署名済み .ipa</text>
        {/* Android */}
        <text x="480" y="26" fontSize="14" fontWeight="600">Android</text>
        <rect x="400" y="40" width="160" height="50" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="480" y="60">アップロード鍵</text>
        <text x="480" y="78" fontSize="11" fill="var(--fig-muted)">keytool で作った .jks</text>
        <path d="M480,90 L480,130" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow57b)" />
        <rect x="400" y="135" width="160" height="44" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="480" y="162">署名済み .aab</text>
        <path d="M480,179 L480,220" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrow57b)" />
        <rect x="380" y="225" width="200" height="64" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="480" y="247">Google Play（Play App Signing）</text>
        <text x="480" y="265" fontSize="11" fill="var(--fig-muted)">アップロード鍵で検証し、</text>
        <text x="480" y="281" fontSize="11" fill="var(--fig-muted)">アプリ署名鍵で配布用に署名し直す</text>
      </g>
      <text x="320" y="310" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図。紫＝漏らしてはいけない秘密、青＝Apple の管理画面で作る、橙＝ビルド成果物、緑＝ストア側</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 57,
  part: 8,
  title: 'モバイルのビルドと配布の流れ',
  summary:
    'モバイルアプリの配布は、デスクトップと違ってストアを経由します。iOS の証明書とプロビジョニングプロファイル、Android のキーストアという署名素材を用意し、tauri ios build と tauri android build で ipa と aab を作り、TestFlight と Google Play の内部テストで配る流れを、ストア申請の概要まで追います。',
  goals: [
    'iOS の署名に必要な素材（証明書、App ID、プロビジョニングプロファイル）とその関係を説明できる',
    'Android のアップロード鍵と Play App Signing の役割を説明できる',
    'tauri ios build と tauri android build の主なオプションと成果物（ipa、aab、apk）を言える',
    'バージョン番号が CFBundleVersion と versionCode にどう反映されるかを説明できる',
    'TestFlight と Google Play の内部テストで、テスターに配るまでの流れを説明できる',
    '秘密の署名素材を安全に保管し、CI に渡す方法を知っている',
  ],
  prerequisites: [51, 52, 53, 54],
  sections: [
    {
      id: 'intro',
      title: 'デスクトップとの違い：ストアが間に入る',
      body: (
        <>
          <p>
            <ChapterLink n={51} /> から <ChapterLink n={53} /> で学んだデスクトップの配布は、「ビルドして、署名して、自分のサイトに置き、updater で更新する」という自己完結の流れでした。モバイルでは、その中心にストアが入ります。iOS アプリを一般のユーザーに届ける経路は App Store（EU では代替マーケットプレイスも）に限られ、Android も Google Play 経由が標準です。<Ref n={5} /> 更新もストアが行うため、updater プラグインはモバイルに対応していません（<ChapterLink n={55} />）。
          </p>
          <p>
            ストアが間に入ると、2 つのことが変わります。第一に、署名の素材をストア運営者（Apple、Google）に登録し、その素材で署名した成果物しか受け付けられません。第二に、テスターへの配布もストアの仕組み（TestFlight、Google Play のテストトラック）を使います。この章では、その 2 つを軸に流れを追います。
          </p>
          <Figure n="57-1" title="iOS と Android の配布の流れ" caption="どちらも「署名素材 → ビルド成果物 → テスト配布 → ストア」の 4 段階。署名素材は一度作って厳重に保管し、ビルドは毎回のリリースで行う。テスト配布とストア公開は、それぞれの管理画面（App Store Connect、Play Console）で操作する。">
            <DistributionFlowFigure />
          </Figure>
          <p>
            図の最後の段階、ストアへの申請と審査は、本書では概要に留めます。審査の基準や管理画面の操作は頻繁に変わり、公式の最新資料を見るのが確実だからです。本書が扱うのは、そこに至るまでの「Tauri で作ったものを、ストアが受け取れる形にする」部分です。
          </p>
          <Callout kind="unverified">
            <p>
              この章の手順は、Tauri 公式の配布ガイドと Apple・Google の公式資料（2026-11-08 参照）に基づきます。Apple Developer Program と Play Console の開発者登録、証明書の作成、ストアへのアップロードは、本書の制作環境では一切試せていません。料金や人数の上限などは変わることがあるので、実施時に必ず公式資料を確認してください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'ios-signing',
      title: 'iOS の署名素材：証明書・App ID・プロビジョニングプロファイル',
      body: (
        <>
          <p>
            iOS では、開発中の実機実行から配布まで、すべての段階でコード署名が強制されます。必要なものは、Apple Developer Program への登録（Tauri の資料では年額 99 ドルと記載）、署名を行う Apple の機器、そして 3 つの素材です。<Ref n={3} />
          </p>
          <ul>
            <li>
              <Term en="certificate">証明書</Term>：開発者（またはチーム）の身元を示す鍵のペアです。用途ごとに種類があり、デバッグ用は「Apple Development」、App Store Connect と Ad Hoc 配布用は「Apple Distribution」です。<Ref n={3} />
            </li>
            <li>
              <Term en="App ID">App ID</Term>：アプリの識別子です。<code>tauri.conf.json</code> の <code>identifier</code> と同じ Bundle ID を、App Store Connect に登録します。<Ref n={3} /><Ref n={1} />
            </li>
            <li>
              <Term en="provisioning profile">プロビジョニングプロファイル</Term>：証明書と App ID を結び付け、そのアプリが使う機能（プッシュ通知など）を有効にするファイルです。<Ref n={3} /> 開発用のプロファイルには、インストールを許す端末の一覧も含まれます。
            </li>
          </ul>
          <Figure n="57-2" title="署名素材の関係" caption="模式図。iOS では証明書と App ID をプロビジョニングプロファイルが結び付け、それで ipa に署名する。Android ではアップロード鍵で aab に署名し、Google Play が自社で保管するアプリ署名鍵で配布用に署名し直す。紫の素材は漏らしてはいけない。">
            <SigningMaterialsFigure />
          </Figure>
          <p>
            Tauri では、これらの素材の扱いに 2 通りの方法があります。既定は<Term en="automatic signing">自動署名</Term>で、Xcode の「Settings &gt; Accounts」に追加した Apple アカウントを使い、証明書とプロファイルを Xcode が自動で作成・更新します。<Ref n={3} /> 手元の Mac でビルドするなら、これで十分です。必要な設定は <code>tauri.conf.json</code> の <code>bundle.iOS.developmentTeam</code>（または環境変数 <code>APPLE_DEVELOPMENT_TEAM</code>）だけです。<Ref n={6} />
          </p>
          <p>
            CI など Xcode のアカウントを使えない環境では、<Term en="manual signing">手動署名</Term>に切り替えます。Apple Distribution 証明書を Keychain Access から <code>.p12</code> として書き出し、App Store Connect 用のプロファイルを Apple の管理画面からダウンロードして、それぞれ base64 にしたものを環境変数で渡します。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>環境変数</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>IOS_CERTIFICATE</code></td>
                  <td>書き出した <code>.p12</code> 証明書の base64（<code>base64 -i cert.p12 | pbcopy</code>）</td>
                </tr>
                <tr>
                  <td><code>IOS_CERTIFICATE_PASSWORD</code></td>
                  <td><code>.p12</code> を書き出すときに付けたパスワード</td>
                </tr>
                <tr>
                  <td><code>IOS_MOBILE_PROVISION</code></td>
                  <td>プロビジョニングプロファイル（<code>.mobileprovision</code>）の base64</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            CI で App Store Connect に自動署名させる方法もあります。App Store Connect の「Users and Access &gt; Integrations」で Admin 権限の API キーを作り、<code>APPLE_API_ISSUER</code>、<code>APPLE_API_KEY</code>、<code>APPLE_API_KEY_PATH</code> を設定します。API キーの秘密鍵（App Store Connect が配る <code>.p8</code> ファイル）は一度しかダウンロードできないので、作成時に安全な場所へ保存します。<Ref n={3} />
          </p>
        </>
      ),
    },
    {
      id: 'android-signing',
      title: 'Android の署名素材：キーストアと Play App Signing',
      body: (
        <>
          <p>
            Android の署名は、iOS より単純です。中央で証明書を発行する仕組みはなく、開発者が自分で鍵を作り、その鍵で署名します。鍵は<Term en="keystore">キーストア</Term>というファイル（<code>.jks</code>）に保管します。JDK 付属の <code>keytool</code> で作ります。<Ref n={4} />
          </p>
          <Code
            lang="bash"
            code={`
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
`}
          />
          <p>
            RSA 2048 ビットの鍵を、10,000 日の有効期限と <code>upload</code> という別名で作る、という意味です。<code>keytool</code> が見つからないときは、Android Studio に同梱された JDK（<ChapterLink n={54} /> の <code>JAVA_HOME</code>）の中にあります。<Ref n={4} />
          </p>
          <p>
            次に、Gradle がこの鍵を使えるように設定します。<code>src-tauri/gen/android/keystore.properties</code> にパスワードと別名とファイルパスを書き、<code>src-tauri/gen/android/app/build.gradle.kts</code> に署名設定を追加します。<Ref n={4} />
          </p>
          <Code
            lang="text"
            title="src-tauri/gen/android/keystore.properties"
            code={`
password=<keytool で設定したパスワード>
keyAlias=upload
storeFile=<upload-keystore.jks への絶対パス>
`}
          />
          <Code
            lang="kotlin"
            title="src-tauri/gen/android/app/build.gradle.kts（追加部分）"
            code={`
import java.util.Properties
import java.io.FileInputStream

android {
    signingConfigs {
        create("release") {
            val keystorePropertiesFile = rootProject.file("keystore.properties")
            val keystoreProperties = Properties()
            if (keystorePropertiesFile.exists()) {
                keystoreProperties.load(FileInputStream(keystorePropertiesFile))
            }
            keyAlias = keystoreProperties["keyAlias"] as String
            keyPassword = keystoreProperties["password"] as String
            storeFile = file(keystoreProperties["storeFile"] as String)
            storePassword = keystoreProperties["password"] as String
        }
    }
    buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}
`}
          />
          <p>
            これで、リリースビルドが自動的に署名されます。<Ref n={4} /> ここで作った鍵は<Term en="upload key">アップロード鍵</Term>と呼ばれます。Google Play には <Term en="Play App Signing">Play App Signing</Term> という仕組みがあり、ユーザーに配布する APK に署名する「アプリ署名鍵」は Google が保管します。開発者のアップロード鍵は、Play Console へのアップロードが本人によるものだと検証するために使われます。<Ref n={14} /> 図 57-2 の右側がこの関係です。仕組みの詳細は Tauri の資料が案内する Google の公式資料を参照してください。<Ref n={4} />
          </p>
          <Callout kind="warn">
            <p>
              キーストアと <code>keystore.properties</code> は秘密です。公開リポジトリにコミットしてはいけません。<Ref n={4} /> <code>src-tauri/gen/android/</code> を git で管理するなら、<code>.gitignore</code> に両方を加えます。<ChapterLink n={53} /> の updater の署名鍵と同じく、パスワードマネージャや CI のシークレットに保管し、ファイル自体は base64 にして環境変数経由で渡します。Tauri の資料は、GitHub Actions で <code>ANDROID_KEY_BASE64</code> というシークレットから <code>$RUNNER_TEMP</code> にデコードする例を示しています。<Ref n={4} />
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'build',
      title: 'ビルド成果物：ipa と aab',
      body: (
        <>
          <h3>iOS：tauri ios build と ipa</h3>
          <p>
            iOS の配布用成果物は <code>.ipa</code>（iOS App Store Package）です。<code>--export-method</code> で用途を指定します。<Ref n={2} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri ios build -- --export-method app-store-connect
# → src-tauri/gen/apple/build/arm64/Tsumugi.ipa
`}
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th><code>--export-method</code></th>
                  <th>用途</th>
                  <th>使う証明書</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>app-store-connect</code></td>
                  <td>App Store と TestFlight</td>
                  <td>Apple Distribution</td>
                </tr>
                <tr>
                  <td><code>release-testing</code></td>
                  <td>登録済み端末への Ad Hoc 配布</td>
                  <td>Apple Distribution</td>
                </tr>
                <tr>
                  <td><code>debugging</code></td>
                  <td>開発用</td>
                  <td>Apple Development</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>--target</code> は既定で実機用の <code>aarch64</code> です。<code>--open</code> を付けると Xcode が開き、そこからアーカイブと書き出しを GUI で行うこともできます。<Ref n={2} /><Ref n={1} /> アイコンは <code>tauri icon</code> に <code>--ios-color</code> を付けて生成します。<Ref n={1} />
          </p>
          <h3>Android：tauri android build と aab</h3>
          <p>
            Google Play に提出するのは <Term en="Android App Bundle">Android App Bundle</Term>（<code>.aab</code>）です。Android の公式資料によれば、これは「コンパイル済みのコードとリソースをすべて含み、APK の生成と署名を Google Play に委ねる公開形式」で、Google Play はこれを元に端末ごとに最適化した APK を生成して配信します。2021 年 8 月以降、新規アプリは App Bundle での公開が必須です。<Ref n={9} />
          </p>
          <Code
            lang="bash"
            code={`
npm run tauri android build -- --aab
# → src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab

npm run tauri android build -- --apk                  # ストア外での配布やテスト用
npm run tauri android build -- --aab --target aarch64  # アーキテクチャを絞る
`}
          />
          <p>
            既定では <ChapterLink n={54} /> で入れた 4 つのアーキテクチャすべてを含む「universal」なバンドルが作られます。<code>--target</code> で絞れます。<code>--split-per-abi</code> はアーキテクチャごとに別ファイルを作りますが、Google Play 向けには不要で、ストア外の配布やテストにだけ役立ちます。<Ref n={5} /> なお <code>.aab</code> は Google Play が APK に変換して配信するための形式なので、手元の端末で試すときは <code>--apk</code> を使います。<Ref n={5} /><Ref n={9} />
          </p>
          <p>
            Android の Rust ライブラリは、Google が新規提出に求めつつある 16KB メモリページにも対応している必要があります。NDK 28 以降でビルドすれば自動的に満たされ、古い NDK では <code>.cargo/config.toml</code> にリンカフラグを足す回避策が公式に示されています。<Ref n={8} />
          </p>
          <h3>バージョン番号の扱い</h3>
          <p>
            <code>tauri.conf.json</code> の <code>version</code> は、各 OS のバージョン表記に変換されます。<Ref n={6} />
          </p>
          <ul>
            <li>
              iOS：<code>CFBundleShortVersionString</code>（ユーザーに見える版）になり、既定では <code>CFBundleVersion</code>（ビルド番号）にも同じ値が使われます。別の値にしたいときは <code>bundle.iOS.bundleVersion</code> か、<code>tauri ios build --build-number</code> を使います。同じ <code>version</code> のまま TestFlight に何度もアップロードするときは、<code>--build-number</code> で区別します。
            </li>
            <li>
              Android：<code>versionCode</code> という整数が必要で、既定では <code>major * 1000000 + minor * 1000 + patch</code> で計算されます。<code>bundle.android.versionCode</code> で固定値を指定することも、<code>autoIncrementVersionCode</code> でビルドごとに自動加算することもできます（後者は <code>gen/android/app/.gitignore</code> から <code>tauri.properties</code> を外し、現在の値をリポジトリに含める必要があります）。<Ref n={6} />
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'testing',
      title: 'テスト配布：TestFlight と Google Play の内部テスト',
      body: (
        <>
          <p>
            成果物ができたら、ストアに公開する前にテスターへ配ります。どちらの OS にも、ストアの仕組みを使った公式の配布手段があります。
          </p>
          <h3>iOS：TestFlight</h3>
          <p>
            <Term en="TestFlight">TestFlight</Term> は Apple のベータ配布サービスです。ビルドを App Store Connect にアップロードすると、Apple が検証し、通ればテスターに配れるようになります。<Ref n={1} /> アップロードは Tauri の資料にあるとおり、<code>altool</code> と前節の API キーで行えます。<Ref n={1} />
          </p>
          <Code
            lang="bash"
            code={`
# APPLE_API_KEY_ID は第52章の APPLE_API_KEY と同じ Key ID
xcrun altool --upload-app --type ios \\
  --file "src-tauri/gen/apple/build/arm64/Tsumugi.ipa" \\
  --apiKey $APPLE_API_KEY_ID --apiIssuer $APPLE_API_ISSUER
`}
          />
          <p>
            テスターには 2 種類あります。Apple の資料によれば、内部テスターは「Account Holder、Admin、App Manager、Developer、Marketing のいずれかの役割を持つチームの最大 100 人」、外部テスターは「メールまたは公開リンクで招待する最大 10,000 人」です。<Ref n={10} /> 外部テスターに配る最初のビルドは App Review（ベータ版の審査）に送られ、承認されてからテストを始められます。2 回目以降のビルドは完全な審査を要しないことがあります。<Ref n={11} /> ビルドは 90 日で期限切れになり、テスターは無料の TestFlight アプリから新しいビルドを受け取ります。<Ref n={11} />
          </p>
          <h3>Android：内部テスト・クローズドテスト・オープンテスト</h3>
          <p>
            Google Play には 3 段階のテストトラックがあります。<Ref n={12} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>トラック</th>
                  <th>テスター</th>
                  <th>特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>内部テスト</td>
                  <td>アプリごとに最大 100 人</td>
                  <td>公開から数分で届く。最初の動作確認向け</td>
                </tr>
                <tr>
                  <td>クローズドテスト</td>
                  <td>メールリストまたは Google グループ</td>
                  <td>リストは 1 件 2,000 人まで。グループなら上限なし</td>
                </tr>
                <tr>
                  <td>オープンテスト</td>
                  <td>誰でも参加可能（上限は 1,000 人以上で設定可）</td>
                  <td>Google Play 上で見つかるため、公開に耐える状態が前提</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            どのトラックも、Play Console でリリースを作って <code>.aab</code> をアップロードし、テスターにオプトインのリンクを共有します。<Ref n={12} /> Tauri の資料は、最初のアップロードだけは Google が署名と識別子を検証するために手動でウェブサイトから行う必要があり、リリース作成の自動化はまだ提供していない、と説明しています。<Ref n={5} />
          </p>
          <Callout kind="note">
            <p>
              2023 年 11 月 13 日以降に作られた個人の開発者アカウントには、本番公開の前に「12 人以上のテスターが 14 日間継続して参加するクローズドテスト」を行う要件があります。<Ref n={13} /> これから個人で登録する読者は、テスターの確保を計画に入れてください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'store',
      title: 'ストア申請の概要',
      body: (
        <>
          <p>
            テストが済んだら、ストアに申請します。本書は手順の詳細には立ち入らず、Tauri の成果物をどこに差し込むかという観点で全体像だけを示します。
          </p>
          <ol className="steps">
            <li>
              開発者登録。Apple Developer Program（App Store Connect）と Google Play Console の開発者アカウントを作ります。<Ref n={1} /><Ref n={5} />
            </li>
            <li>
              アプリの登録。App Store Connect では <code>identifier</code> と一致する Bundle ID で、Play Console ではウィザードに従ってアプリを作り、必要な申告（データの扱い、年齢区分など）を埋めます。<Ref n={1} /><Ref n={5} />
            </li>
            <li>
              ビルドの提出。TestFlight に上げた <code>.ipa</code> を App Store の審査に回し、内部テストで使った <code>.aab</code> を本番トラックに昇格させます。
            </li>
            <li>
              審査と公開。App Review と Google Play の審査を経て公開されます。審査基準は各社のガイドラインに従います。
            </li>
          </ol>
          <p>
            Tauri 固有の注意として、Tauri の資料は macOS の App Store 提出で暗号化輸出規制の申告（<code>Info.plist</code> の <code>ITSAppUsesNonExemptEncryption</code>）が必要だと説明しています。<Ref n={1} /> iOS の提出でも同種の申告を求められるため、審査の前に Apple の最新資料で確認し、必要なら <code>src-tauri/gen/apple</code> の Info.plist に追記します。また fs プラグインを使うアプリは、<ChapterLink n={55} /> で触れた <code>PrivacyInfo.xcprivacy</code> が必要です。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi',
      title: 'Tsumugi のリリース準備',
      body: (
        <>
          <Callout kind="tsumugi">
            <p>
              Tsumugi をストアに出すと仮定したときの準備を、この章の順に並べます。
            </p>
            <ul>
              <li>識別子：<code>tauri.conf.json</code> の <code>identifier</code>（例 <code>dev.example.tsumugi</code>）を、App Store Connect の Bundle ID と Play Console のパッケージ名として登録する。一度公開すると変えられないので、ドメインを含む形で慎重に決める。</li>
              <li>署名素材：Apple Distribution 証明書とプロファイルは Xcode の自動署名に任せ、<code>developmentTeam</code> だけを設定に書く。Android のキーストアは <code>keytool</code> で作り、ファイルと <code>keystore.properties</code> を <code>.gitignore</code> に入れ、パスワードマネージャに控える。</li>
              <li>バージョン：<code>version</code> を <code>1.0.0</code> から始め、TestFlight への再アップロードは <code>--build-number</code>、Android は <code>autoIncrementVersionCode</code> で番号を進める。</li>
              <li>ビルド：<code>tauri ios build --export-method app-store-connect</code> と <code>tauri android build --aab</code>。CI で行うなら、<ChapterLink n={53} /> の GitHub Actions に iOS の手動署名用の環境変数と <code>ANDROID_KEY_BASE64</code> をシークレットとして追加する。</li>
              <li>テスト：まず TestFlight の内部テスターと Google Play の内部テストで、<ChapterLink n={55} /> のセーフエリアとドロワー、画像添付、背面復帰時の保存を実機で確認する。</li>
              <li>申告：fs プラグインを使うので <code>PrivacyInfo.xcprivacy</code> を置き、暗号化輸出規制の申告を Apple の資料で確認する。</li>
            </ul>
            <p>
              Tsumugi のデータはすべて端末内にあり、同期機能はありません。ストアのプライバシー申告では「データを収集しない」と答えられる設計ですが、その根拠を <ChapterLink n={41} /> の設計と照らして確認してから提出します。
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
            <li>モバイルの配布はストアが中心。署名素材はストア運営者に登録したものを使い、テスト配布もストアの仕組み（TestFlight、Google Play のテストトラック）を使う。</li>
            <li>iOS の署名素材は証明書・App ID・プロビジョニングプロファイル。既定は Xcode の自動署名で、<code>developmentTeam</code> を設定するだけ。CI では <code>IOS_CERTIFICATE</code> などの環境変数か App Store Connect の API キーを使う。</li>
            <li>Android は <code>keytool</code> で作ったアップロード鍵で署名し、Google が Play App Signing でアプリ署名鍵を保管する。キーストアと <code>keystore.properties</code> は秘密。</li>
            <li>成果物は <code>tauri ios build --export-method app-store-connect</code> の <code>.ipa</code> と、<code>tauri android build --aab</code> の <code>.aab</code>。バージョンは <code>CFBundleVersion</code> と <code>versionCode</code> に変換され、再提出のたびに増やす。</li>
            <li>TestFlight は内部 100 人・外部 10,000 人、外部は初回のみ審査あり、ビルドは 90 日で失効。Google Play は内部テスト 100 人から始め、個人アカウントはクローズドテストの要件を満たしてから本番へ。</li>
          </ul>
          <p>第8部はここまでです。次の第9部では、同期の設計やパフォーマンス計測など、Tsumugi をさらに育てるための次の一歩を示します。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Distribute — App Store',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/app-store/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Apple Developer Program の登録、Bundle ID と identifier の一致、tauri ios build --export-method app-store-connect と ipa の出力先、altool によるアップロードと API キー、TestFlight への反映、ITSAppUsesNonExemptEncryption、tauri icon --ios-color の根拠。',
    },
    {
      title: 'Command Line Interface — tauri ios build / tauri android build',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: '--export-method の選択肢（app-store-connect / release-testing / debugging）、--build-number、--target の既定、--aab / --apk / --split-per-abi、--open の根拠。',
    },
    {
      title: 'Distribute — iOS Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/ios/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Apple Developer Program（99 ドル／年）、証明書の種類、プロビジョニングプロファイルの役割、自動署名が既定であること、手動署名の環境変数 IOS_CERTIFICATE 等、API キー APPLE_API_ISSUER / APPLE_API_KEY / APPLE_API_KEY_PATH、EU の代替マーケットプレイスの根拠。',
    },
    {
      title: 'Distribute — Android Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/android/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'keytool コマンド、keystore.properties、build.gradle.kts の signingConfigs、Play App Signing、キーストアを公開しない注意、CI での ANDROID_KEY_BASE64 の根拠。',
    },
    {
      title: 'Distribute — Google Play',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/google-play/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Play Console の開発者登録、aab の出力先、--target / --split-per-abi の用途、最初のアップロードが手動であること、リリース自動化が未提供であることの根拠。',
    },
    {
      title: 'Configuration — version, bundle > iOS, bundle > android',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'developmentTeam と APPLE_DEVELOPMENT_TEAM、version が CFBundleShortVersionString / CFBundleVersion に変換されること、bundleVersion、versionCode の計算式、autoIncrementVersionCode の根拠。',
    },
    {
      title: 'Prerequisites — Configure for Mobile Targets',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/start/prerequisites/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'JAVA_HOME が Android Studio 同梱の JDK を指すことの根拠（keytool の所在）。',
    },
    {
      title: 'Mobile Plugin Development — Android 16KB Memory Pages',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/plugins/develop-mobile/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: '16KB ページ対応が NDK 28 以降で自動的に満たされること、古い NDK 向けの .cargo/config.toml のリンカフラグの根拠。',
    },
    {
      title: 'About Android App Bundles',
      publisher: 'Android Developers',
      url: 'https://developer.android.com/guide/app-bundle',
      accessed: '2026-11-08',
      note: 'App Bundle の定義、Google Play が端末ごとに最適化した APK を生成すること、2021 年 8 月以降の新規アプリで必須であることの根拠。',
    },
    {
      title: 'TestFlight',
      publisher: 'Apple Developer',
      url: 'https://developer.apple.com/testflight/',
      accessed: '2026-11-08',
      note: '内部テスター最大 100 人（役割の条件付き）、外部テスター最大 10,000 人、メールと公開リンクによる招待の根拠。',
    },
    {
      title: 'TestFlight overview — App Store Connect Help',
      publisher: 'Apple Developer',
      url: 'https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview',
      accessed: '2026-11-08',
      note: 'ビルドが 90 日で失効すること、外部テストの最初のビルドが App Review に送られること、テスターが無料の TestFlight アプリを使うことの根拠。',
    },
    {
      title: 'Set up an open, closed, or internal test',
      publisher: 'Google Play Console Help',
      url: 'https://support.google.com/googleplay/android-developer/answer/9845334',
      accessed: '2026-11-08',
      note: '内部テストの最大 100 人と数分での反映、クローズドテストのリスト上限と Google グループ、オープンテストの上限設定、オプトインリンクの共有の根拠。',
    },
    {
      title: 'App testing requirements for new personal developer accounts',
      publisher: 'Google Play Console Help',
      url: 'https://support.google.com/googleplay/android-developer/answer/14151465',
      accessed: '2026-11-08',
      note: '2023 年 11 月 13 日以降の個人アカウントに、12 人以上のテスターによる 14 日間のクローズドテストが求められることの根拠。',
    },
    {
      title: 'Use Play App Signing',
      publisher: 'Google Play Console ヘルプ',
      url: 'https://support.google.com/googleplay/android-developer/answer/9842756',
      accessed: '2026-11-08',
      note: 'アプリ署名鍵を Google が保管し、アップロード鍵はアップロードの本人確認に使われることの根拠。',
    },
  ],
}

export default chapter
