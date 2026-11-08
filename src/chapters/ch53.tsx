import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 53-1 更新の流れ ---------- */
function UpdateFlowFigure() {
  const lanes = [
    { x: 110, label: '利用者の PC のアプリ' },
    { x: 330, label: '更新サーバー（latest.json）' },
    { x: 540, label: '配布サーバー（Releases）' },
  ]
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="自動アップデートの時系列。アプリが更新サーバーに latest.json を要求し、バージョンを比較して新しければ配布サーバーからインストーラをダウンロードし、公開鍵で署名を検証してからインストールし、再起動する">
      <defs>
        <marker id="arrow53a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        {lanes.map((l) => (
          <g key={l.label}>
            <rect x={l.x - 95} y="14" width="190" height="30" rx="6" fill="var(--fig-box)" stroke="var(--fig-line)" />
            <text x={l.x} y="34" textAnchor="middle" fontWeight="600">{l.label}</text>
            <line x1={l.x} y1="44" x2={l.x} y2="405" stroke="var(--fig-line)" strokeDasharray="4 4" />
          </g>
        ))}
        {/* 1 check */}
        <path d="M110,80 L322,80" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53a)" />
        <text x="216" y="73" textAnchor="middle">1. check()：GET endpoints[0]</text>
        <text x="216" y="95" textAnchor="middle" fill="var(--fig-muted)">{'{{target}}-{{arch}} と現在の版を含む'}</text>
        {/* 2 json */}
        <path d="M322,125 L118,125" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53a)" />
        <text x="216" y="118" textAnchor="middle">2. latest.json（version・url・signature）</text>
        <text x="216" y="140" textAnchor="middle" fill="var(--fig-muted)">動的サーバーなら 204 = 更新なし</text>
        {/* 3 compare */}
        <rect x="30" y="155" width="160" height="40" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="110" y="172" textAnchor="middle">3. 版を比較</text>
        <text x="110" y="188" textAnchor="middle" fill="var(--fig-muted)">新しいときだけ続行</text>
        {/* 4 download */}
        <path d="M110,225 L532,225" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53a)" />
        <text x="320" y="218" textAnchor="middle">4. download()：platforms[...].url を取得</text>
        <path d="M532,255 L118,255" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53a)" />
        <text x="320" y="248" textAnchor="middle">5. インストーラ本体（.app.tar.gz／-setup.exe／.AppImage）</text>
        {/* 6 verify */}
        <rect x="30" y="275" width="160" height="40" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="110" y="292" textAnchor="middle">6. 署名を検証</text>
        <text x="110" y="308" textAnchor="middle" fill="var(--fig-muted)">pubkey と signature を照合</text>
        {/* 7 install */}
        <rect x="30" y="330" width="160" height="40" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="110" y="347" textAnchor="middle">7. install() → relaunch()</text>
        <text x="110" y="363" textAnchor="middle" fill="var(--fig-muted)">Windows は自動で終了</text>
        <text x="320" y="300" textAnchor="middle" fill="var(--fig-danger)">検証に失敗したら 7 へ進まない</text>
      </g>
      <text x="320" y="398" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">GitHub Releases を使うと 2 と 5 は同じサーバー。模式図。</text>
    </svg>
  )
}

/* ---------- 図 53-2 鍵の流れ ---------- */
function KeyFlowFigure() {
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label="updater の鍵の流れ。tauri signer generate が秘密鍵と公開鍵の対を作り、秘密鍵は CI のシークレットとして環境変数 TAURI_SIGNING_PRIVATE_KEY に入り、ビルド時に各インストーラの .sig を生成する。公開鍵は tauri.conf.json の plugins.updater.pubkey に書かれ、アプリに埋め込まれて .sig の検証に使われる">
      <defs>
        <marker id="arrow53b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="220" y="16" width="200" height="40" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="41" textAnchor="middle" fontWeight="600">tauri signer generate</text>
        <path d="M280,56 L160,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53b)" />
        <path d="M360,56 L480,96" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow53b)" />
        {/* private */}
        <rect x="30" y="100" width="260" height="110" rx="8" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="160" y="122" textAnchor="middle" fontWeight="600">秘密鍵（~/.tauri/tsumugi.key）</text>
        <text x="160" y="144" textAnchor="middle">CI のシークレット →</text>
        <text x="160" y="162" textAnchor="middle">TAURI_SIGNING_PRIVATE_KEY</text>
        <text x="160" y="184" textAnchor="middle" fill="var(--fig-muted)">ビルド時に各インストーラの .sig を作る</text>
        <text x="160" y="202" textAnchor="middle" fill="var(--fig-danger)">失うと既存の利用者に更新を届けられない</text>
        {/* public */}
        <rect x="350" y="100" width="260" height="110" rx="8" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="480" y="122" textAnchor="middle" fontWeight="600">公開鍵（~/.tauri/tsumugi.key.pub）</text>
        <text x="480" y="144" textAnchor="middle">tauri.conf.json →</text>
        <text x="480" y="162" textAnchor="middle">plugins.updater.pubkey</text>
        <text x="480" y="184" textAnchor="middle" fill="var(--fig-muted)">アプリに埋め込まれ .sig を検証する</text>
        <text x="480" y="202" textAnchor="middle" fill="var(--fig-muted)">公開してよい</text>
      </g>
      <text x="320" y="232" fontSize="12" textAnchor="middle" fill="var(--fig-muted)">橙：秘密にする　青：公開してよい</text>
    </svg>
  )
}

/* ---------- 図 53-3 GitHub Actions のマトリクス ---------- */
function MatrixFigure() {
  const jobs = [
    { x: 20, label: 'macos-latest', sub: 'aarch64-apple-darwin', out: '.app.tar.gz + .sig／.dmg', box: 'var(--fig-box3)' },
    { x: 170, label: 'macos-latest', sub: 'x86_64-apple-darwin', out: '.app.tar.gz + .sig／.dmg', box: 'var(--fig-box3)' },
    { x: 320, label: 'ubuntu-22.04', sub: 'x86_64', out: '.AppImage + .sig／.deb', box: 'var(--fig-box4)' },
    { x: 470, label: 'windows-latest', sub: 'x86_64', out: '-setup.exe + .sig', box: 'var(--fig-box2)' },
  ]
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="GitHub Actions のマトリクス構成。1つのワークフローから macOS の Apple シリコン、macOS の Intel、Ubuntu 22.04、Windows の4ジョブが並列に走り、それぞれ tauri-action でビルドした成果物を同じ GitHub Release に集める。tauri-action は最後に latest.json も生成してアップロードする">
      <defs>
        <marker id="arrow53c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="12">
        <rect x="200" y="14" width="240" height="36" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="320" y="37" textAnchor="middle" fontWeight="600">push（release ブランチ／app-v* タグ）</text>
        {jobs.map((j) => (
          <g key={j.x}>
            <path d={`M320,50 L${j.x + 75},88`} stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow53c)" />
            <rect x={j.x} y="92" width="150" height="100" rx="8" fill={j.box} stroke="var(--fig-line)" />
            <text x={j.x + 75} y="114" textAnchor="middle" fontWeight="600">{j.label}</text>
            <text x={j.x + 75} y="132" textAnchor="middle" fill="var(--fig-muted)">{j.sub}</text>
            <text x={j.x + 75} y="156" textAnchor="middle" fontSize="11">tauri-action@v1</text>
            <text x={j.x + 75} y="176" textAnchor="middle" fontSize="11">{j.out}</text>
            <path d={`M${j.x + 75},192 L320,232`} stroke="var(--fig-line)" strokeWidth="1.5" markerEnd="url(#arrow53c)" />
          </g>
        ))}
        <rect x="150" y="236" width="340" height="50" rx="8" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="320" y="256" textAnchor="middle" fontWeight="600">GitHub Release「app-v1.2.0」（下書き）</text>
        <text x="320" y="275" textAnchor="middle" fontSize="11">全インストーラ + .sig + latest.json</text>
      </g>
    </svg>
  )
}

const chapter: Chapter = {
  number: 53,
  part: 7,
  title: '自動アップデートと CI',
  summary:
    '配布したアプリに新しい版を届ける仕組みを作ります。updater プラグインが latest.json を読んで署名を検証し、ダウンロードして再起動するまでの流れ、更新用の署名鍵の生成と管理、そして3 OS のビルドと GitHub Release への公開を GitHub Actions と tauri-action で自動化する方法を扱います。',
  goals: [
    'updater プラグインが更新を見つけてからインストールするまでの流れと、各段階で何が検証されるかを説明できる',
    'tauri signer generate で鍵対を作り、公開鍵を pubkey に、秘密鍵を環境変数に配置できる',
    'endpoints のプレースホルダと latest.json の形式（静的）、動的サーバーの応答規約を書ける',
    'フロントエンドから check・downloadAndInstall・relaunch を呼ぶコードを書ける',
    'tauri-action を使った GitHub Actions のワークフローを、マトリクスと署名用シークレットを含めて組める',
  ],
  prerequisites: [38, 51, 52],
  sections: [
    {
      id: 'why-updater',
      title: 'なぜ自動アップデートが要るか',
      body: (
        <>
          <p>
            Web アプリなら、サーバーを更新すれば利用者は次に開いたときに新しい版を使います。デスクトップアプリはそうはいきません。利用者の PC に置かれた実行ファイルは、誰かが入れ替えない限り古いままです。不具合の修正やセキュリティ更新を確実に届けるには、アプリ自身が新しい版を探してインストールする仕組みが要ります。
          </p>
          <p>
            Tauri 公式の <Term en="updater plugin">updater プラグイン</Term>（<code>tauri-plugin-updater</code>）がこの役目を担います。<ChapterLink n={38} /> で見た公式プラグインの1つで、更新サーバーか静的な JSON ファイルから更新情報を取得し、署名を検証してインストールします。<Ref n={1} /> 署名の検証は必須で、無効にはできません。<Ref n={1} /> <ChapterLink n={52} /> の OS ごとの署名とは別の、Tauri 自身の署名です。
          </p>
          <p>
            更新を届けるには、新しい版のインストーラをどこかに置く必要もあります。この章の後半では、GitHub Actions で3 OS のビルドを行い、GitHub Releases に成果物と更新情報を並べるところまでを自動化します。
          </p>
          <Callout kind="unverified">
            <p>
              本書の制作環境でも Tauri 本体は Linux でビルドできますが、updater の動作と GitHub Actions のワークフローは実行して確かめていません。この章の記述は Tauri 公式ドキュメントと tauri-action の README（Tauri 2.12、tauri-action v1 時点）に基づいています。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'update-flow',
      title: '更新の流れ',
      body: (
        <>
          <p>
            まず全体の動きを時系列で見ます。この図は、アプリが更新を確認してから再起動するまでに、どのサーバーと何をやり取りするかを示しています。署名の検証がどこに入るかに注目してください。
          </p>
          <Figure n="53-1" title="updater プラグインによる更新の流れ" caption="アプリは endpoints の URL から latest.json を取得し、版を比較し、新しければインストーラをダウンロードして署名を検証し、インストールして再起動する。検証に失敗すればインストールしない。">
            <UpdateFlowFigure />
          </Figure>
          <p>
            図の 1 で送る URL には、<code>{'{{target}}'}</code>（<code>linux</code>・<code>windows</code>・<code>darwin</code>）、<code>{'{{arch}}'}</code>（<code>x86_64</code>・<code>aarch64</code>・<code>i686</code>・<code>armv7</code>）、<code>{'{{current_version}}'}</code> という3つのプレースホルダを埋め込めます。<Ref n={1} /> 静的な JSON を置くだけなら使いませんが、動的なサーバーはこれを見て「この環境向けの更新があるか」を判断できます。
          </p>
          <p>
            図の 2 で返る JSON には、新しい版の番号、インストーラの URL、そして署名が入っています。図の 6 で、アプリに埋め込まれた公開鍵を使ってこの署名を検証します。配布サーバーが乗っ取られて偽のインストーラに差し替えられても、秘密鍵が漏れていない限り署名が合わないため、インストールされません。これが「署名を無効にできない」理由です。
          </p>
          <p>
            図の 7 の再起動は必須ではありません。公式ドキュメントは、利用者に再起動を促すだけにしたり、次回起動まで待ったりしてもよいとしています。ただし Windows では、インストーラの制約により、インストールの段階でアプリが自動的に終了します。<Ref n={1} /> 終了前に処理をはさみたいときは、Rust 側のビルダーに <code>on_before_exit</code> を登録します。<Ref n={1} />
          </p>
        </>
      ),
    },
    {
      id: 'signing-key',
      title: '更新用の署名鍵',
      body: (
        <>
          <p>
            updater の署名には、Tauri CLI が作る鍵対を使います。鍵がどこへ行くかを図で確認してから、コマンドを実行します。
          </p>
          <Figure n="53-2" title="updater の鍵対の行き先" caption="秘密鍵はビルド環境の環境変数（CI ではシークレット）に、公開鍵は tauri.conf.json に置く。秘密鍵でインストーラごとの .sig を作り、アプリに埋め込まれた公開鍵で検証する。">
            <KeyFlowFigure />
          </Figure>
          <Code
            lang="bash"
            code={`
# 鍵対を生成し、秘密鍵を ~/.tauri/tsumugi.key に保存する（公開鍵は .key.pub）
npm run tauri signer generate -- -w ~/.tauri/tsumugi.key
`}
          />
          <p>
            実行するとパスワードを聞かれます（<code>-p</code> で指定することもできます）。<Ref n={6} /> 生成された公開鍵の内容を <code>tauri.conf.json</code> の <code>plugins.updater.pubkey</code> に文字列として書きます。ファイルパスは書けません。<Ref n={1} />
          </p>
          <p>
            ビルド時には、次の環境変数で秘密鍵を渡します。<Ref n={1} />
          </p>
          <ul>
            <li><code>TAURI_SIGNING_PRIVATE_KEY</code>：秘密鍵ファイルのパス、またはその内容そのもの</li>
            <li><code>TAURI_SIGNING_PRIVATE_KEY_PASSWORD</code>：鍵のパスワード（設定していれば）</li>
          </ul>
          <p>
            公式ドキュメントは、これらを <code>.env</code> ファイルで与えることはできず、<code>export</code>（PowerShell では <code>$env:</code>）で設定するよう注意しています。<Ref n={1} /> さらに <code>bundle.createUpdaterArtifacts</code> を <code>true</code> にすると、<code>tauri build</code> が通常のインストーラに加えて updater 用の成果物と <code>.sig</code> ファイルを作るようになります。<Ref n={1} /> OS ごとの成果物は次のとおりです。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>OS</th>
                  <th>updater 用の成果物</th>
                  <th>署名</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>macOS</td>
                  <td><code>.app.tar.gz</code></td>
                  <td><code>.app.tar.gz.sig</code></td>
                </tr>
                <tr>
                  <td>Windows</td>
                  <td><code>-setup.exe</code>（NSIS）と <code>.msi</code></td>
                  <td>それぞれに <code>.sig</code></td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td><code>.AppImage</code>（本書の更新経路。updater 2.1 以降は <code>.deb</code>、2.10 以降は <code>.rpm</code> も対象）</td>
                  <td><code>.AppImage.sig</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            公式ガイドの成果物一覧に Linux で載っているのは AppImage だけですが、updater プラグインの変更履歴によると 2.1 で deb、2.10 で rpm の更新にも対応しています。本書では AppImage を更新経路として扱います。<code>createUpdaterArtifacts</code> に <code>"v1Compatible"</code> を指定すると Tauri 1 時代の圧縮形式になりますが、新規のアプリで使う理由はありません。<Ref n={1} /> <Ref n={7} /> <Ref n={11} />
          </p>
          <Callout kind="warn">
            <p>
              秘密鍵を失うと、すでに配布したアプリには二度と更新を届けられません。<Ref n={1} /> アプリに埋め込まれた公開鍵と対になる秘密鍵がなければ、どんなインストーラも検証に通らないからです。鍵ファイルとパスワードは、パスワードマネージャーなど CI のシークレットとは別の場所にも保管してください。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'plugin-setup',
      title: 'プラグインの導入と設定',
      body: (
        <>
          <p>
            導入の手順は <ChapterLink n={38} /> の他のプラグインと同じです。<code>npm run tauri add updater</code> で Rust と JavaScript の両方のパッケージが入ります。<Ref n={1} /> 再起動には <code>process</code> プラグインの <code>relaunch</code> を使うので、<code>npm run tauri add process</code> も実行します。
          </p>
          <Code
            lang="rust"
            title="src-tauri/src/lib.rs（抜粋）"
            code={`
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            // updater はデスクトップ専用なので cfg で囲む
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`}
          />
          <p>
            <code>#[cfg(desktop)]</code> で囲んでいるのは、updater プラグインがモバイルに対応しておらず、<code>Cargo.toml</code> の依存もデスクトップ向けにだけ宣言するためです。<Ref n={1} /> 第8部でモバイル版を作るとき、この囲いがそのまま効きます。
          </p>
          <p>
            設定は <code>tauri.conf.json</code> の2箇所です。
          </p>
          <Code
            lang="json"
            code={`
{
  "bundle": {
    "createUpdaterArtifacts": true
  },
  "plugins": {
    "updater": {
      "pubkey": "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IC4uLg==",
      "endpoints": [
        "https://github.com/example/tsumugi/releases/latest/download/latest.json"
      ],
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
`}
          />
          <p>
            <code>endpoints</code> は配列で、先頭から順に試し、2XX 以外の応答が返ったときだけ次の URL に進みます。<Ref n={1} /> 本番では HTTPS が強制され、HTTP を使うには <code>dangerousInsecureTransportProtocol</code> を明示する必要があります。<Ref n={1} /> <code>windows.installMode</code> は Windows でインストーラをどう表示するかで、既定の <code>passive</code> は小さな進捗バーだけを出し、<code>basicUi</code> は利用者の操作を求め、<code>quiet</code> は何も表示しませんが管理者権限の都合で非推奨です。<Ref n={1} />
          </p>
          <p>
            最後に、<ChapterLink n={37} /> の capability に権限を足します。<code>updater:default</code> は <code>allow-check</code>・<code>allow-download</code>・<code>allow-install</code>・<code>allow-download-and-install</code> をまとめて許可します。<Ref n={1} /> 再起動のために <code>process:allow-restart</code> も加えます。<Ref n={10} />
          </p>
          <Code
            lang="json"
            title="src-tauri/capabilities/default.json（抜粋）"
            code={`
{
  "permissions": [
    "core:default",
    "updater:default",
    "process:allow-restart"
  ]
}
`}
          />
        </>
      ),
    },
    {
      id: 'latest-json',
      title: 'latest.json の形式と動的サーバー',
      body: (
        <>
          <p>
            更新情報の置き方は2通りあります。1つは静的な JSON ファイルを S3 や GitHub Releases に置く方法、もう1つは要求ごとに判断する動的なサーバーを立てる方法です。<Ref n={1} /> Tsumugi は前者を使います。
          </p>
          <Code
            lang="json"
            title="latest.json（静的な形式の例）"
            code={`
{
  "version": "1.2.0",
  "notes": "検索の不具合を修正し、データベースの絞り込みに日付型を追加しました。",
  "pub_date": "2026-11-08T09:00:00Z",
  "platforms": {
    "darwin-aarch64": {
      "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkK...",
      "url": "https://github.com/example/tsumugi/releases/download/app-v1.2.0/Tsumugi_1.2.0_aarch64.app.tar.gz"
    },
    "darwin-x86_64": {
      "signature": "...",
      "url": "https://github.com/example/tsumugi/releases/download/app-v1.2.0/Tsumugi_x64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "...",
      "url": "https://github.com/example/tsumugi/releases/download/app-v1.2.0/Tsumugi_1.2.0_amd64.AppImage"
    },
    "windows-x86_64": {
      "signature": "...",
      "url": "https://github.com/example/tsumugi/releases/download/app-v1.2.0/Tsumugi_1.2.0_x64-setup.exe"
    }
  }
}
`}
          />
          <p>
            必須なのは <code>version</code> と、各プラットフォームの <code>url</code>・<code>signature</code> です。<code>notes</code> と <code>pub_date</code>（RFC 3339 形式）は省略できます。<Ref n={1} /> <code>platforms</code> のキーは <code>OS-ARCH</code> の形で、OS は <code>linux</code>・<code>darwin</code>・<code>windows</code>、ARCH は <code>x86_64</code>・<code>aarch64</code>・<code>i686</code>・<code>armv7</code> です。<Ref n={1} /> <code>signature</code> には <code>.sig</code> ファイルの中身をそのまま入れます。パスや URL ではありません。<Ref n={1} />
          </p>
          <p>
            注意点が1つあります。Tauri はファイル全体を読んでから <code>version</code> を比較するので、<code>platforms</code> に書いた項目のどれかに <code>url</code> や <code>signature</code> が欠けていると、ファイル全体の検証に失敗して他のプラットフォームでも更新できなくなります。<Ref n={1} /> 手で書くと間違えやすい部分ですが、後述の tauri-action が全ジョブの成果物からこのファイルを生成してくれます。
          </p>
          <h3>動的サーバーの規約</h3>
          <p>
            自前のサーバーで更新の有無を判断する場合、規約は単純です。更新がなければ <code>204 No Content</code> を返し、あれば <code>200 OK</code> で JSON を返します。JSON の必須項目は <code>url</code>・<code>version</code>・<code>signature</code>、任意項目は <code>pub_date</code>・<code>notes</code> です。<Ref n={1} /> 配布経路ごとの段階的な展開や、古い版への巻き戻しをサーバー側で制御したいときに使います。Tauri の公式パートナーである CrabNebula は、この動的サーバーと CDN をセットにした CrabNebula Cloud を提供しています。<Ref n={5} /> 本書では扱いませんが、GitHub Releases のダウンロード数や帯域が気になり始めたら検討する選択肢です。
          </p>
        </>
      ),
    },
    {
      id: 'frontend',
      title: 'フロントエンドからの更新処理',
      body: (
        <>
          <p>
            更新の確認とインストールは JavaScript から呼べます。公式ドキュメントの例を Tsumugi の設定画面向けに整えると次のようになります。<Ref n={1} />
          </p>
          <Code
            lang="ts"
            title="src/features/settings/updater.ts"
            code={`
import { check } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'

export type UpdateProgress = (downloaded: number, total: number | undefined) => void

/** 更新があればダウンロードしてインストールし、再起動する。無ければ false を返す。 */
export async function updateIfAvailable(onProgress: UpdateProgress): Promise<boolean> {
  const update = await check()
  if (!update) return false

  let downloaded = 0
  let total: number | undefined
  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case 'Started':
        total = event.data.contentLength
        break
      case 'Progress':
        downloaded += event.data.chunkLength
        onProgress(downloaded, total)
        break
      case 'Finished':
        break
    }
  })
  await relaunch()
  return true
}
`}
          />
          <p>
            <code>check()</code> は更新が無ければ <code>null</code> を返します。あれば <code>Update</code> オブジェクトが返り、<code>version</code> や <code>body</code>（latest.json の <code>notes</code>）を読んで「新しい版があります」と表示してから <code>downloadAndInstall</code> を呼ぶ、という作りにできます。コールバックに来るイベントは <code>Started</code>（全体のバイト数）、<code>Progress</code>（受信したチャンクのバイト数）、<code>Finished</code> の3種類です。<Ref n={1} /> <Ref n={9} /> ダウンロードとインストールを分けたいときは <code>update.download()</code> と <code>update.install()</code> を別々に呼べます。<Ref n={1} />
          </p>
          <p>
            <code>check()</code> には <code>timeout</code>（ミリ秒）、<code>proxy</code>、<code>headers</code> を渡せます。<Ref n={1} /> 起動直後に毎回確認する設計なら、ネットワークが無い環境で長く待たないように <code>timeout</code> を短めにしておきます。
          </p>
          <p>
            Rust 側から行う方法もあります。<code>app.updater()?.check().await?</code> で確認し、<code>download_and_install</code> に進捗と完了のクロージャを渡し、<code>app.restart()</code> で再起動します。<Ref n={1} /> 公式ドキュメントは、<ChapterLink n={35} /> のチャネルで進捗をフロントエンドに流し、<ChapterLink n={36} /> の State で保留中の更新を保持するパターンも示しています。<Ref n={1} /> Tsumugi では UI の都合で JavaScript 側に寄せますが、起動時の自動確認を Rust 側に置く設計も自然です。
          </p>
        </>
      ),
    },
    {
      id: 'github-actions',
      title: 'GitHub Actions と tauri-action',
      body: (
        <>
          <p>
            <ChapterLink n={51} /> で見たとおり、3 OS 向けのバンドルには3種類のビルド環境が要ります。GitHub Actions には macOS・Ubuntu・Windows のランナーがそろっているので、1つのワークフローで並列にビルドできます。公式の <Term en="tauri-action">tauri-action</Term> は、その各ジョブで <code>tauri build</code> を実行し、成果物を1つの GitHub Release に集め、<code>latest.json</code> まで生成してアップロードする GitHub Action です。<Ref n={2} /> <Ref n={3} />
          </p>
          <Figure n="53-3" title="GitHub Actions のマトリクス構成" caption="1回の push から4つのジョブが並列に走り、各 OS の成果物と .sig を同じ下書き Release に集める。tauri-action は集まった .sig から latest.json を生成する。公式例には ubuntu-22.04-arm のジョブも含まれるが、公開リポジトリ限定のため図では省いた。">
            <MatrixFigure />
          </Figure>
          <p>
            公式ドキュメントのワークフロー例の構造を整理します。<Ref n={2} />
          </p>
          <ol className="steps">
            <li>トリガー。<code>release</code> ブランチへの push か手動実行（<code>workflow_dispatch</code>）。タグ <code>app-v*</code> の push をトリガーにする代替案も示されています。</li>
            <li><code>permissions: contents: write</code>。Release の作成に必要です。リポジトリ設定で Actions のトークンが読み取り専用になっていると「Resource not accessible by integration」で失敗するので、「Read and write permissions」に変えます。</li>
            <li>マトリクス。<code>platform</code> と <code>args</code> の組を列挙し、macOS は <code>--target aarch64-apple-darwin</code> と <code>--target x86_64-apple-darwin</code> の2ジョブ、Ubuntu は <code>ubuntu-22.04</code>（と公開リポジトリなら <code>ubuntu-22.04-arm</code>）、Windows は <code>windows-latest</code>。<code>fail-fast: false</code> で、1 OS の失敗が他を止めないようにします。</li>
            <li>Ubuntu だけ <code>apt-get</code> で <code>libwebkit2gtk-4.1-dev</code>・<code>libappindicator3-dev</code>・<code>librsvg2-dev</code>・<code>patchelf</code>・<code>xdg-utils</code> を入れます。</li>
            <li>Node.js（<code>actions/setup-node@v6</code>）、Rust（<code>dtolnay/rust-toolchain@stable</code>、macOS だけ <code>targets</code> を指定）、Rust のキャッシュ（<code>swatinem/rust-cache@v2</code>）、<code>npm install</code>。</li>
            <li><code>tauri-apps/tauri-action@v1</code>。<code>env</code> に <code>GITHUB_TOKEN</code>、<code>with</code> に <code>tagName</code>・<code>releaseName</code>・<code>releaseBody</code>・<code>releaseDraft</code>・<code>prerelease</code>・<code>args</code>。</li>
          </ol>
          <p>
            <code>tagName</code> と <code>releaseName</code> に書いた <code>__VERSION__</code> は、アクションがアプリのバージョンに置き換えます。<Ref n={2} /> <Ref n={3} /> <ChapterLink n={51} /> で <code>version</code> を <code>package.json</code> に寄せておいたので、<code>package.json</code> の番号を上げて push すれば、タグと Release 名がそろいます。
          </p>
          <p>
            README に載っている入力のうち、updater に関わるものを挙げます。<Ref n={3} />
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>入力</th>
                  <th>既定値</th>
                  <th>意味</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>uploadUpdaterJson</code></td>
                  <td><code>true</code></td>
                  <td>updater 用の JSON（latest.json）を生成して Release に上げる</td>
                </tr>
                <tr>
                  <td><code>uploadUpdaterSignatures</code></td>
                  <td><code>true</code></td>
                  <td>Tauri が生成した <code>.sig</code> を上げる</td>
                </tr>
                <tr>
                  <td><code>updaterJsonPreferNsis</code></td>
                  <td><code>false</code></td>
                  <td>NSIS と MSI の両方があるとき、latest.json に NSIS を使う</td>
                </tr>
                <tr>
                  <td><code>releaseDraft</code></td>
                  <td><code>false</code></td>
                  <td>下書きとして作る。公開前に成果物を確認できる</td>
                </tr>
                <tr>
                  <td><code>projectPath</code></td>
                  <td><code>./</code></td>
                  <td>Tauri プロジェクトのルート</td>
                </tr>
                <tr>
                  <td><code>retryAttempts</code></td>
                  <td><code>0</code></td>
                  <td>ビルド失敗時に再試行する回数</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <code>releaseDraft: true</code> にしておくと、4つのジョブが終わった時点では Release は下書きのままです。成果物がそろっていることを確認してから手で公開すると、<code>releases/latest/download/latest.json</code> という URL が新しい版を指すようになり、利用者のアプリが更新を見つけます。GitHub の「latest」リリースは公開済みのものから選ばれ、下書きは含まれないので、ビルドの途中で中途半端な latest.json が配られる心配はありません。<Ref n={12} />
          </p>
          <Callout>
            <p>
              Apple の証明書を持たずに macOS 向けをビルドして GitHub Releases で配ると、Apple シリコンの Mac で「壊れている」と表示されることがあります。公式ドキュメントはこの場合、<ChapterLink n={52} /> で触れたアドホック署名の設定を勧めています。<Ref n={2} /> <ChapterLink n={52} /> の内容を適用する前の段階で試す場合は、この設定を一時的に入れておきます。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'tsumugi-config',
      title: 'Tsumugi に適用する設定例',
      body: (
        <>
          <p>
            <ChapterLink n={51} />・<ChapterLink n={52} /> の設定と、この章の署名用シークレットをすべて組み込んだワークフローです。公式例を土台に、updater の署名鍵、macOS の証明書の取り込みと公証、Windows の Azure Artifact Signing の認証を足しています。
          </p>
          <Code
            lang="yaml"
            title=".github/workflows/release.yml"
            code={`
name: release
on:
  push:
    tags:
      - 'app-v*'
  workflow_dispatch:

jobs:
  build:
    permissions:
      contents: write
    strategy:
      fail-fast: false
      matrix:
        include:
          - platform: 'macos-latest'
            args: '--target aarch64-apple-darwin'
          - platform: 'macos-latest'
            args: '--target x86_64-apple-darwin'
          - platform: 'ubuntu-22.04'
            args: ''
          - platform: 'windows-latest'
            args: ''
    runs-on: \${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v7

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-22.04'
        run: |
          sudo apt-get update
          sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf xdg-utils

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: 'npm'

      - uses: dtolnay/rust-toolchain@stable
        with:
          targets: \${{ matrix.platform == 'macos-latest' && 'aarch64-apple-darwin,x86_64-apple-darwin' || '' }}

      - uses: swatinem/rust-cache@v2
        with:
          workspaces: './src-tauri -> target'

      - run: npm install

      # 第52章：Apple の証明書を一時キーチェーンに取り込む
      - name: import Apple certificate
        if: matrix.platform == 'macos-latest'
        env:
          APPLE_CERTIFICATE: \${{ secrets.APPLE_CERTIFICATE }}
          APPLE_CERTIFICATE_PASSWORD: \${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
          KEYCHAIN_PASSWORD: \${{ secrets.KEYCHAIN_PASSWORD }}
          APPLE_API_KEY_CONTENT: \${{ secrets.APPLE_API_KEY_CONTENT }}
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
          # 公証用の API キー（.p8）をファイルに書き出す
          echo "$APPLE_API_KEY_CONTENT" > "$RUNNER_TEMP/AuthKey.p8"

      - uses: tauri-apps/tauri-action@v1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          # 第53章：updater の署名鍵
          TAURI_SIGNING_PRIVATE_KEY: \${{ secrets.TAURI_SIGNING_PRIVATE_KEY }}
          TAURI_SIGNING_PRIVATE_KEY_PASSWORD: \${{ secrets.TAURI_SIGNING_PRIVATE_KEY_PASSWORD }}
          # 第52章：macOS の署名と公証（API キー方式）
          APPLE_SIGNING_IDENTITY: \${{ secrets.APPLE_SIGNING_IDENTITY }}
          APPLE_API_ISSUER: \${{ secrets.APPLE_API_ISSUER }}
          APPLE_API_KEY: \${{ secrets.APPLE_API_KEY }}
          APPLE_API_KEY_PATH: \${{ runner.temp }}/AuthKey.p8
          # 第52章：Windows の Azure Artifact Signing
          AZURE_CLIENT_ID: \${{ secrets.AZURE_CLIENT_ID }}
          AZURE_CLIENT_SECRET: \${{ secrets.AZURE_CLIENT_SECRET }}
          AZURE_TENANT_ID: \${{ secrets.AZURE_TENANT_ID }}
        with:
          tagName: app-v__VERSION__
          releaseName: 'Tsumugi v__VERSION__'
          releaseBody: '各 OS 向けのインストーラは Assets からダウンロードしてください。'
          releaseDraft: true
          prerelease: false
          args: \${{ matrix.args }}
`}
          />
          <p>
            Windows ランナーには <code>artifact-signing-cli</code> が入っていないので、実際には Windows だけのステップで <code>cargo install artifact-signing-cli</code> を行う必要があります。ビルド時間を抑えるにはバイナリのキャッシュを検討します。Linux の AppImage 署名（<code>SIGN=1</code>）は GPG 鍵をランナーに取り込むステップが別途要るため、この例では省いています。<ChapterLink n={52} /> で述べたとおり Linux の署名は任意で、updater の署名検証は別に効いています。
          </p>
          <p>
            <code>tauri.conf.json</code> 側は、前節までに示した <code>bundle.createUpdaterArtifacts</code>、<code>plugins.updater</code>、capability の <code>updater:default</code> を入れておきます。<code>endpoints</code> の URL はリポジトリの実際の owner と名前に合わせます。
          </p>
          <ol className="steps">
            <li><code>package.json</code> の <code>version</code> を上げてコミットする。</li>
            <li><code>git tag app-v1.2.0</code> を打って push する。4ジョブが走り、下書き Release に成果物と <code>latest.json</code> がそろう。</li>
            <li>GitHub 上で下書きを確認し、公開する。</li>
            <li>利用者のアプリが次に <code>check()</code> を呼んだとき、<code>releases/latest/download/latest.json</code> が新しい版を指しているので更新が始まる。</li>
          </ol>
        </>
      ),
    },
    {
      id: 'summary',
      title: 'まとめ',
      body: (
        <>
          <ul>
            <li>updater プラグインは、endpoints から latest.json を取得し、版を比較し、ダウンロードしたインストーラの署名を公開鍵で検証してからインストールする。署名検証は無効にできない。</li>
            <li>鍵対は <code>tauri signer generate</code> で作る。公開鍵は <code>plugins.updater.pubkey</code>、秘密鍵は <code>TAURI_SIGNING_PRIVATE_KEY</code>（と <code>_PASSWORD</code>）で渡し、<code>bundle.createUpdaterArtifacts: true</code> で <code>.sig</code> を生成する。秘密鍵は失わない。</li>
            <li>latest.json は <code>version</code> と <code>platforms.OS-ARCH.url/signature</code> が必須で、書いた項目はどれも欠けなく完全である必要がある。動的サーバーは 204 で「更新なし」、200 で JSON を返す。</li>
            <li>フロントエンドは <code>check()</code> → <code>downloadAndInstall()</code> → <code>relaunch()</code>。Windows はインストール時に自動終了する。</li>
            <li>tauri-action は OS ごとのマトリクスでビルドし、1つの Release に成果物・<code>.sig</code>・latest.json を集める。<code>__VERSION__</code> はアプリの版に置き換わり、<code>releaseDraft: true</code> で公開前に確認できる。</li>
          </ul>
          <p>デスクトップでの配布はこれで一通りです。第8部では、同じコードベースを iOS と Android で動かすモバイル対応に進みます。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Updater',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/updater/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12 / tauri-plugin-updater 2',
      note: '導入手順、鍵の生成と環境変数、createUpdaterArtifacts と OS ごとの成果物、pubkey・endpoints・プレースホルダ・installMode、updater:default 権限、静的 JSON と動的サーバーの規約、JS と Rust の API、Windows の自動終了と on_before_exit の根拠。',
    },
    {
      title: 'GitHub Pipelines',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/pipelines/github/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12 / tauri-action v1',
      note: 'ワークフロー例の構造（トリガー、permissions、マトリクス、Ubuntu の依存パッケージ、各ステップ、tauri-action の入力）、__VERSION__、トークン権限のトラブルシュート、アドホック署名の勧めの根拠。',
    },
    {
      title: 'tauri-apps/tauri-action README',
      publisher: 'GitHub（tauri-apps）',
      url: 'https://github.com/tauri-apps/tauri-action',
      accessed: '2026-11-08',
      version: 'action-v1.0.0',
      note: '入力（tagName、releaseName、releaseDraft、uploadUpdaterJson、uploadUpdaterSignatures、updaterJsonPreferNsis、projectPath、retryAttempts など）と既定値、出力、__VERSION__ の置換の根拠。',
    },
    {
      title: 'tauri-apps/tauri-action Releases',
      publisher: 'GitHub（tauri-apps）',
      url: 'https://github.com/tauri-apps/tauri-action/releases',
      accessed: '2026-11-08',
      note: '最新リリースが action-v1.0.0 であることの確認。',
    },
    {
      title: 'CrabNebula Cloud',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/pipelines/crabnebula-cloud/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'CrabNebula Cloud が updater と統合した配布プラットフォームで、CDN・複数チャネル・GitHub Action を提供することの根拠。',
    },
    {
      title: 'Command Line Interface（signer generate、signer sign）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: 'tauri signer generate の -w・-p・-f・--ci オプションの根拠。',
    },
    {
      title: 'Configuration Reference（Updater）',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/config/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'createUpdaterArtifacts が真偽値または "v1Compatible" を取ることの根拠。',
    },
    {
      title: 'macOS Code Signing',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/distribute/sign/macos/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'ワークフロー例で使う APPLE_CERTIFICATE、APPLE_CERTIFICATE_PASSWORD、KEYCHAIN_PASSWORD、APPLE_SIGNING_IDENTITY、公証用の環境変数名の根拠。',
    },
    {
      title: '@tauri-apps/plugin-updater JavaScript API Reference',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/javascript/updater/',
      accessed: '2026-11-08',
      version: '@tauri-apps/plugin-updater 2',
      note: 'check() が Update | null を返すこと、Update の version・body・date、DownloadEvent の Started/Progress/Finished と contentLength・chunkLength、CheckOptions の timeout・proxy・headers の根拠。',
    },
    {
      title: 'Process',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/plugin/process/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12 / tauri-plugin-process 2',
      note: 'relaunch() と process:allow-restart 権限の根拠。',
    },
    {
      title: 'tauri-plugin-updater CHANGELOG',
      publisher: 'Tauri（plugins-workspace）',
      url: 'https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/updater/CHANGELOG.md',
      accessed: '2026-11-08',
      version: 'tauri-plugin-updater 2.14.1',
      note: '2.1.0 で deb、2.10.0 で rpm（および NSIS・MSI）の更新に対応した記録の根拠。',
    },
    {
      title: 'REST API endpoints for releases',
      publisher: 'GitHub Docs',
      url: 'https://docs.github.com/en/rest/releases/releases',
      accessed: '2026-11-08',
      note: '「latest」リリースが下書きやプレリリースを除いた最新の公開リリースを指すことの根拠。',
    },
  ],
}

export default chapter
