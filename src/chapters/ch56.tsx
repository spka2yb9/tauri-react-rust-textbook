import type { Chapter } from '../content/types'
import { Callout, ChapterLink, Code, Figure, Ref, Term } from '../components/content'

/* ---------- 図 56-1 呼び出し経路 ---------- */
function CallPathFigure() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="プラグインの ping コマンドが呼ばれる経路のシーケンス図。JavaScript の invoke がプラグインの Rust コマンドに届き、Rust は run_mobile_plugin で Kotlin または Swift の ping メソッドを呼ぶ。ネイティブ側は invoke.resolve で結果を返し、Rust を経由して JavaScript の Promise が解決される。デスクトップでは Rust の desktop.rs がネイティブを呼ばずにそのまま応答する">
      <defs>
        <marker id="arrow56a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--fig-line)" />
        </marker>
      </defs>
      <g fontSize="13" textAnchor="middle">
        <rect x="20" y="20" width="140" height="44" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="90" y="40">フロントエンド</text>
        <text x="90" y="56" fontSize="11" fill="var(--fig-muted)">guest-js / React</text>
        <rect x="250" y="20" width="140" height="44" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="320" y="40">Rust（プラグイン）</text>
        <text x="320" y="56" fontSize="11" fill="var(--fig-muted)">commands.rs → mobile.rs</text>
        <rect x="480" y="20" width="140" height="44" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="550" y="40">Kotlin / Swift</text>
        <text x="550" y="56" fontSize="11" fill="var(--fig-muted)">ExamplePlugin</text>
      </g>
      <line x1="90" y1="64" x2="90" y2="370" stroke="var(--fig-line)" strokeDasharray="4 4" />
      <line x1="320" y1="64" x2="320" y2="370" stroke="var(--fig-line)" strokeDasharray="4 4" />
      <line x1="550" y1="64" x2="550" y2="370" stroke="var(--fig-line)" strokeDasharray="4 4" />
      <g fontSize="12">
        <path d="M90,100 L315,100" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow56a)" />
        <text x="202" y="92" textAnchor="middle">invoke('plugin:example|ping', {'{ payload }'})</text>
        <text x="202" y="118" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">capability で許可されているか検査</text>

        <path d="M320,150 L545,150" stroke="var(--fig-line)" strokeWidth="2" markerEnd="url(#arrow56a)" />
        <text x="432" y="142" textAnchor="middle">run_mobile_plugin("ping", payload)</text>
        <text x="432" y="168" textAnchor="middle" fontSize="11" fill="var(--fig-muted)">Android: JNI　iOS: C FFI</text>

        <rect x="542" y="180" width="16" height="60" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="600" y="200" textAnchor="middle" fontSize="11">parseArgs</text>
        <text x="600" y="218" textAnchor="middle" fontSize="11">処理</text>
        <text x="600" y="236" textAnchor="middle" fontSize="11">resolve</text>

        <path d="M545,260 L325,260" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrow56a)" />
        <text x="432" y="252" textAnchor="middle">{'{ value: "..." }'}（JSON）</text>

        <path d="M315,300 L95,300" stroke="var(--fig-line)" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrow56a)" />
        <text x="202" y="292" textAnchor="middle">Result&lt;PingResponse&gt; → Promise 解決</text>

        <rect x="250" y="320" width="140" height="40" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" strokeDasharray="4 3" />
        <text x="320" y="337" textAnchor="middle" fontSize="11">デスクトップでは</text>
        <text x="320" y="352" textAnchor="middle" fontSize="11">desktop.rs がここで応答</text>
      </g>
      <text x="320" y="390" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">実線：呼び出し　破線：戻り値。縦の点線はそれぞれの実行主体のライフライン</text>
    </svg>
  )
}

/* ---------- 図 56-2 ファイル構成 ---------- */
function StructureFigure() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="tauri plugin new --mobile が生成するプラグインのディレクトリ構成。src に Rust の lib.rs・commands.rs・desktop.rs・mobile.rs・models.rs・error.rs、android に Kotlin のプロジェクト、ios に Swift パッケージ、guest-js に TypeScript、permissions に権限定義、ルートに build.rs と Cargo.toml と package.json がある">
      <g fontSize="12">
        <rect x="20" y="20" width="600" height="280" rx="8" fill="var(--fig-box)" stroke="var(--fig-line)" />
        <text x="40" y="44" fontSize="13" fontWeight="600">tauri-plugin-example/</text>
        {/* Rust */}
        <rect x="40" y="60" width="180" height="150" rx="6" fill="var(--fig-box2)" stroke="var(--fig-line)" />
        <text x="130" y="80" textAnchor="middle" fontWeight="600">src/（Rust）</text>
        <text x="52" y="100">lib.rs　　入口・Ext トレイト</text>
        <text x="52" y="118">commands.rs　コマンド</text>
        <text x="52" y="136">desktop.rs　#[cfg(desktop)]</text>
        <text x="52" y="154">mobile.rs　 #[cfg(mobile)]</text>
        <text x="52" y="172">models.rs　 serde 型</text>
        <text x="52" y="190">error.rs　　エラー型</text>
        {/* native */}
        <rect x="240" y="60" width="180" height="70" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="330" y="80" textAnchor="middle" fontWeight="600">android/（Kotlin）</text>
        <text x="252" y="100">build.gradle.kts</text>
        <text x="252" y="118">…/ExamplePlugin.kt</text>
        <rect x="240" y="140" width="180" height="70" rx="6" fill="var(--fig-box4)" stroke="var(--fig-line)" />
        <text x="330" y="160" textAnchor="middle" fontWeight="600">ios/（Swift パッケージ）</text>
        <text x="252" y="180">Package.swift</text>
        <text x="252" y="198">…/ExamplePlugin.swift</text>
        {/* js & permissions */}
        <rect x="440" y="60" width="160" height="70" rx="6" fill="var(--fig-box3)" stroke="var(--fig-line)" />
        <text x="520" y="80" textAnchor="middle" fontWeight="600">guest-js/（TS）</text>
        <text x="452" y="100">index.ts</text>
        <text x="452" y="118" fill="var(--fig-muted)">→ dist-js/ にビルド</text>
        <rect x="440" y="140" width="160" height="70" rx="6" fill="var(--fig-box5)" stroke="var(--fig-line)" />
        <text x="520" y="160" textAnchor="middle" fontWeight="600">permissions/</text>
        <text x="452" y="180">default.toml</text>
        <text x="452" y="198" fill="var(--fig-muted)">autogenerated/（生成）</text>
        {/* root files */}
        <rect x="40" y="225" width="560" height="60" rx="6" fill="var(--fig-bg)" stroke="var(--fig-line)" />
        <text x="52" y="245">build.rs　　COMMANDS から allow-*/deny-* 権限を生成。android_path / ios_path を指定</text>
        <text x="52" y="265">Cargo.toml　tauri, serde, thiserror。[build-dependencies] に tauri-plugin</text>
        <text x="52" y="280" fill="var(--fig-muted)">package.json　NPM パッケージ（--no-api で省略可）</text>
      </g>
      <text x="320" y="314" fontSize="12" fill="var(--fig-muted)" textAnchor="middle">模式図。橙＝Rust、緑＝ネイティブ、青＝JavaScript、紫＝権限</text>
    </svg>
  )
}

const chapter: Chapter = {
  number: 56,
  part: 8,
  title: 'プラグインを自作する：Swift・Kotlin との連携',
  summary:
    '公式プラグインにない OS の機能を使うには、Rust と Swift・Kotlin をつなぐプラグインを自分で書きます。tauri plugin new が生成する構成を土台に、JavaScript から Rust、Rust からネイティブへ呼び出しが流れる経路、desktop.rs と mobile.rs の分割、引数と戻り値の受け渡し、権限の定義までを一通り追います。',
  goals: [
    'Tauri プラグインの構成（Rust クレート、NPM パッケージ、Android ライブラリ、Swift パッケージ）を説明できる',
    'tauri plugin new --mobile で生成されるファイルの役割を言える',
    'JavaScript の invoke から Kotlin / Swift のメソッドまで呼び出しが届く経路を図で説明できる',
    'desktop.rs と mobile.rs を #[cfg] で分け、run_mobile_plugin でネイティブのコマンドを呼べる',
    'Kotlin の @TauriPlugin / @Command と Swift の Plugin クラスでコマンドを定義できる',
    'Tauri の権限（capability）と OS の実行時権限の違いを説明できる',
  ],
  prerequisites: [22, 34, 37, 38, 54],
  sections: [
    {
      id: 'intro',
      title: 'OS の機能に手が届かないとき',
      body: (
        <>
          <p>
            前章で、Tsumugi のモバイル版では「書き出した Markdown を別のアプリに渡す」手段がないことが分かりました。デスクトップならファイルに保存して終わりですが、スマートフォンでは OS の共有シート（iOS の共有ボタン、Android の「共有」メニュー）を出すのが自然です。ところが、共有シートを開く公式プラグインは 2026-11-08 時点では存在しません（公式一覧の Community Plugins には <code>tauri-plugin-sharesheet</code> があります）。
          </p>
          <p>
            Tauri の設計思想は「コアには誰もが必要とする機能だけを入れ、それ以外はプラグインで足す」です。<Ref n={1} /> 公式プラグインも、内部ではこの章で学ぶ仕組みで作られています。つまり、公式にない機能は自分で足せます。必要なのは、Rust と、その OS のネイティブ言語（iOS なら Swift、Android なら Kotlin）の少しの知識です。
          </p>
          <p>
            この章では、まず公式テンプレートが生成する <code>ping</code> コマンドを題材に、呼び出しが JavaScript から Rust、Rust からネイティブへ流れる経路を追います。そのうえで、Tsumugi 向けの共有プラグインの設計を示します。Swift と Kotlin の文法は本書の範囲外なので、テンプレートのコードを読める程度に留めます。
          </p>
          <Callout kind="unverified">
            <p>
              この章のコードは Tauri 公式ドキュメントと、<code>tauri plugin new</code> が使うテンプレート（tauri-apps/tauri リポジトリ）に基づいています。Kotlin / Swift を含むプラグインのビルドと実行は、本書の制作環境では未検証です。
            </p>
          </Callout>
        </>
      ),
    },
    {
      id: 'anatomy',
      title: 'プラグインの構成：tauri plugin new --mobile',
      body: (
        <>
          <p>
            Tauri の<Term en="plugin">プラグイン</Term>は、Cargo クレートと、任意の NPM パッケージ（JavaScript 向けの API）からなります。モバイル対応のプラグインは、さらに Android のライブラリプロジェクトと iOS の Swift パッケージを含みます。<Ref n={1} /> クレート名には <code>tauri-plugin-</code> の接頭辞が付き、NPM パッケージは <code>@スコープ/plugin-名前</code> の形が推奨されています。<Ref n={1} />
          </p>
          <p>
            雛形は CLI で作ります。<code>--android</code> と <code>--ios</code>、または両方を意味する <code>--mobile</code> を付けると、ネイティブのプロジェクトも生成されます。<Ref n={2} />
          </p>
          <Code
            lang="bash"
            code={`
npx @tauri-apps/cli plugin new example --mobile
# → tauri-plugin-example/ が作られる
`}
          />
          <Figure n="56-2" title="tauri plugin new --mobile が生成する構成" caption="模式図。Rust の src/ がプラグインの本体で、desktop.rs と mobile.rs が #[cfg] で切り替わる。android/ と ios/ はネイティブの実装、guest-js/ は JavaScript の API、permissions/ は権限の定義。build.rs が COMMANDS の一覧から権限を自動生成する。">
            <StructureFigure />
          </Figure>
          <p>
            公式のテンプレートの <code>build.rs</code> は、わずか数行です。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="build.rs"
            code={`
const COMMANDS: &[&str] = &["ping"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS)
        .android_path("android")
        .ios_path("ios")
        .build();
}
`}
          />
          <p>
            <code>COMMANDS</code> に列挙したコマンド名ごとに、<code>allow-ping</code> と <code>deny-ping</code> という権限が <code>permissions/autogenerated/</code> に生成されます。<Ref n={1} /><Ref n={6} /> <code>android_path</code> と <code>ios_path</code> は、ネイティブのプロジェクトの場所を Tauri のビルドに教えます。アプリのビルド時には、これらが <code>src-tauri/gen/android</code> の Gradle プロジェクトと <code>src-tauri/gen/apple</code> の Xcode プロジェクトに依存関係として組み込まれます。
          </p>
          <p>
            図 56-2 で一番大事なのは、Rust の <code>src/</code> が中心にあり、ネイティブコードはその「手足」だということです。JavaScript はネイティブを直接呼べません。必ず Rust を経由します。次節でその経路を追います。
          </p>
        </>
      ),
    },
    {
      id: 'call-path',
      title: '呼び出しの経路：JavaScript → Rust → Kotlin / Swift',
      body: (
        <>
          <p>
            テンプレートの <code>ping</code> コマンドは、文字列を受け取ってそのまま返すだけの最小の例です。図 56-1 に、<code>ping</code> が呼ばれてから結果が戻るまでの経路を示します。
          </p>
          <Figure n="56-1" title="プラグインのコマンドが呼ばれる経路" caption="JavaScript の invoke は、まず capability で許可されているか検査され、プラグインの Rust コマンドに届く。モバイルでは Rust が run_mobile_plugin でネイティブのメソッドを呼び、ネイティブは invoke.resolve で JSON を返す。デスクトップでは desktop.rs が Rust だけで応答する。">
            <CallPathFigure />
          </Figure>
          <p>
            経路を 4 つのファイルで追います。最初は JavaScript 側の API です。<code>invoke</code> の第 1 引数が <code>plugin:プラグイン名|コマンド名</code> という形になる以外は、<ChapterLink n={34} /> のコマンド呼び出しと同じです。<Ref n={1} /><Ref n={3} />
          </p>
          <Code
            lang="ts"
            title="guest-js/index.ts"
            code={`
import { invoke } from '@tauri-apps/api/core'

export async function ping(value: string): Promise<string | null> {
  return await invoke<{ value?: string }>('plugin:example|ping', {
    payload: { value },
  }).then((r) => (r.value ? r.value : null))
}
`}
          />
          <p>
            Rust 側の入口は <code>commands.rs</code> です。通常のコマンドと同じ <code>#[command]</code> ですが、処理の本体は持たず、拡張トレイト経由で実装に委譲します。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="src/commands.rs"
            code={`
use tauri::{AppHandle, command, Runtime};

use crate::models::*;
use crate::Result;
use crate::ExampleExt;

#[command]
pub(crate) async fn ping<R: Runtime>(app: AppHandle<R>, payload: PingRequest) -> Result<PingResponse> {
    app.example().ping(payload)   // desktop.rs か mobile.rs の Example に委譲
}
`}
          />
          <p>
            <code>app.example()</code> は <code>lib.rs</code> で定義される <code>ExampleExt</code> トレイトのメソッドで、プラグインの初期化時に <code>manage</code> された <code>Example</code> 構造体を取り出します。<ChapterLink n={36} /> で学んだ State と同じ仕組みです。<code>lib.rs</code> はこの構造を組み立てる場所で、ここに <code>#[cfg]</code> による分岐が現れます。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="src/lib.rs"
            code={`
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Example;
#[cfg(mobile)]
use mobile::Example;

/// App / AppHandle / Window から example の API に到達するための拡張トレイト
pub trait ExampleExt<R: Runtime> {
    fn example(&self) -> &Example<R>;
}

impl<R: Runtime, T: Manager<R>> ExampleExt<R> for T {
    fn example(&self) -> &Example<R> {
        self.state::<Example<R>>().inner()
    }
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("example")
        .invoke_handler(tauri::generate_handler![commands::ping])
        .setup(|app, api| {
            #[cfg(mobile)]
            let example = mobile::init(app, api)?;
            #[cfg(desktop)]
            let example = desktop::init(app, api)?;
            app.manage(example);
            Ok(())
        })
        .build()
}
`}
          />
          <p>
            <code>Example</code> という名前の構造体が 2 つあり、どちらがコンパイルされるかは <code>cfg(desktop)</code> / <code>cfg(mobile)</code> で決まります。<ChapterLink n={54} /> で見たとおり、この別名は <code>tauri-build</code> が定義します。<Ref n={5} /> 同じ名前・同じメソッドの構造体を 2 つ用意し、呼び出し側（<code>commands.rs</code>）からは違いが見えないようにするのが、このテンプレートの設計です。
          </p>
          <p>
            デスクトップ版は Rust だけで完結します。<Ref n={3} />
          </p>
          <Code
            lang="rust"
            title="src/desktop.rs"
            code={`
use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(app: &AppHandle<R>, _api: PluginApi<R, C>) -> crate::Result<Example<R>> {
    Ok(Example(app.clone()))
}

pub struct Example<R: Runtime>(AppHandle<R>);

impl<R: Runtime> Example<R> {
    pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
        Ok(PingResponse { value: payload.value })
    }
}
`}
          />
          <p>
            モバイル版が、この章の主役です。<code>init</code> でネイティブのプラグインクラスを登録し、<code>PluginHandle</code> を受け取ります。以後のメソッドは、その <code>PluginHandle</code> の <code>run_mobile_plugin</code> に「ネイティブ側のメソッド名」と「serde でシリアライズできる引数」を渡すだけです。<code>register_android_plugin</code>、<code>register_ios_plugin</code>、<code>ios_plugin_binding!</code> はテンプレートの <code>mobile.rs</code> にあります。<Ref n={3} /> <code>run_mobile_plugin</code> の使い方は公式ページにあります。<Ref n={4} />
          </p>
          <Code
            lang="rust"
            title="src/mobile.rs"
            code={`
use serde::de::DeserializeOwned;
use tauri::{
    plugin::{PluginApi, PluginHandle},
    AppHandle, Runtime,
};

use crate::models::*;

// iOS：Swift 側の @_cdecl("init_plugin_example") と名前を合わせる
#[cfg(target_os = "ios")]
tauri::ios_plugin_binding!(init_plugin_example);

pub fn init<R: Runtime, C: DeserializeOwned>(_app: &AppHandle<R>, api: PluginApi<R, C>) -> crate::Result<Example<R>> {
    // Android：パッケージ名とクラス名で Kotlin のクラスを登録する
    #[cfg(target_os = "android")]
    let handle = api.register_android_plugin("com.plugin.example", "ExamplePlugin")?;
    #[cfg(target_os = "ios")]
    let handle = api.register_ios_plugin(init_plugin_example)?;
    Ok(Example(handle))
}

pub struct Example<R: Runtime>(PluginHandle<R>);

impl<R: Runtime> Example<R> {
    pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
        self.0
            .run_mobile_plugin("ping", payload)   // ネイティブの ping を呼ぶ
            .map_err(Into::into)
    }
}
`}
          />
          <p>
            引数と戻り値の型は <code>models.rs</code> にあり、<code>serde</code> の <code>rename_all = "camelCase"</code> で JavaScript / Kotlin / Swift 側の命名と合わせます。<Ref n={3} /> <code>run_mobile_plugin</code> は引数を JSON にしてネイティブへ渡し、戻ってきた JSON を戻り値の型にデシリアライズします。<ChapterLink n={34} /> で学んだ「IPC の境界では serde が型をそろえる」という原則が、Rust とネイティブの境界でも同じように働いています。
          </p>
        </>
      ),
    },
    {
      id: 'kotlin',
      title: 'Android 側：Kotlin の @TauriPlugin',
      body: (
        <>
          <p>
            Android のプラグインは、<code>app.tauri.plugin.Plugin</code> を継承し、<code>@TauriPlugin</code> を付けた Kotlin のクラスです。<code>@Command</code> を付けたメソッドが、Rust と JavaScript から呼べるコマンドになります。<Ref n={4} /> テンプレートの <code>ping</code> を、本書では処理を <code>Example</code> クラスへ委譲している部分を省いて示します。<Ref n={3} />
          </p>
          <Code
            lang="kotlin"
            title="android/src/main/java/ExamplePlugin.kt"
            code={`
package com.plugin.example

import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.plugin.Invoke

@InvokeArg
class PingArgs {
  var value: String? = null
}

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    @Command
    fun ping(invoke: Invoke) {
        val args = invoke.parseArgs(PingArgs::class.java)

        val ret = JSObject()
        ret.put("value", args.value ?: "default value :(")
        invoke.resolve(ret)
    }
}
`}
          />
          <p>読み方を 4 点に絞ります。</p>
          <ul>
            <li><code>Invoke</code> は 1 回の呼び出しを表すオブジェクトです。<code>parseArgs</code> で引数を取り出し、<code>resolve</code> で結果を返します（失敗なら <code>reject</code>）。</li>
            <li>引数の型は <code>@InvokeArg</code> を付けたクラスで定義します。省略可能な引数は <code>var 名前: 型? = null</code>、既定値付きは <code>var 名前: 型 = 既定値</code>、必須は <code>lateinit var 名前: 型</code> と書き分けます。<Ref n={4} /></li>
            <li><code>JSObject</code> は JavaScript のオブジェクトに相当し、<code>put</code> でキーと値を入れます。これが JSON になって Rust に戻ります。</li>
            <li>コンストラクタで受け取る <code>Activity</code> は、Android の画面（アクティビティ）そのものです。共有シートの表示など、画面が必要な API はここから呼びます。</li>
          </ul>
          <Callout kind="warn">
            <p>
              Android のネイティブコマンドはメインスレッド（UI スレッド）で実行されます。時間のかかる処理をそのまま書くと UI が固まり、「アプリケーションが応答していません（ANR）」になります。公式ドキュメントは、ブロックする処理を <code>CoroutineScope(Dispatchers.IO).launch {'{ ... }'}</code> のようにコルーチンに逃がし、その中で <code>invoke.resolve</code> を呼ぶ方法を示しています。<Ref n={4} />
            </p>
          </Callout>
          <p>
            Kotlin ではなく Java で書きたい場合は、Android Studio の「Convert Kotlin file to Java file」で変換できます。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'swift',
      title: 'iOS 側：Swift の Plugin クラス',
      body: (
        <>
          <p>
            iOS のプラグインは、Tauri パッケージの <code>Plugin</code> クラスを継承した Swift のクラスです。<code>@objc</code> を付け、<code>(_ invoke: Invoke)</code> を受け取る関数がコマンドになります。<Ref n={4} /> プラグイン全体は Swift パッケージとして定義され、<code>Package.swift</code> で Tauri の Swift API に依存します。<Ref n={3} />
          </p>
          <Code
            lang="swift"
            title="ios/Sources/ExamplePlugin.swift"
            code={`
import SwiftRs
import Tauri
import UIKit
import WebKit

class PingArgs: Decodable {
  let value: String?
}

class ExamplePlugin: Plugin {
  @objc public func ping(_ invoke: Invoke) throws {
    let args = try invoke.parseArgs(PingArgs.self)
    invoke.resolve(["value": args.value ?? ""])
  }
}

// Rust 側の tauri::ios_plugin_binding!(init_plugin_example) から呼ばれる
@_cdecl("init_plugin_example")
public func initPlugin() -> Plugin {
  return ExamplePlugin()
}
`}
          />
          <p>
            Kotlin 版との対応は素直です。引数は <code>Decodable</code> に準拠したクラス、戻り値は辞書（<code>[String: Any]</code>）です。違いは 2 点あります。第一に、iOS では引数の既定値がサポートされないため、省略可能な引数は <code>?</code> 付きの型にして、関数の中で既定値を補います。<Ref n={4} /> 第二に、ファイル末尾の <code>@_cdecl("init_plugin_example")</code> です。これは Swift の関数を C の関数名で公開する属性で、Rust 側の <code>ios_plugin_binding!</code> がこの名前で呼び出してプラグインのインスタンスを受け取ります。<Ref n={3} /> 名前を変えるときは両方を同時に変えます。
          </p>
          <p>
            iOS には Android の <code>Activity</code> に相当する引数がありませんが、<code>Plugin</code> クラスが保持する WebView（<code>WKWebView</code>）から画面に到達できます。<code>load(webview:)</code> をオーバーライドすれば、プラグインが WebView に読み込まれた時点で初期化処理を行えます。<Ref n={4} />
          </p>
        </>
      ),
    },
    {
      id: 'permissions',
      title: '二重の権限：Tauri の capability と OS の実行時権限',
      body: (
        <>
          <p>
            プラグインには 2 種類の「権限」が関わります。混同しやすいので分けて説明します。
          </p>
          <div className="compare">
            <div>
              <h4>Tauri の権限（<ChapterLink n={37} />）</h4>
              <p>フロントエンドがそのコマンドを呼んでよいかを、アプリ開発者が capability で決めます。<code>build.rs</code> の <code>COMMANDS</code> から <code>allow-ping</code> / <code>deny-ping</code> が生成され、プラグインは <code>permissions/default.toml</code> で既定の集合を定義します。<Ref n={1} /></p>
            </div>
            <div>
              <h4>OS の実行時権限</h4>
              <p>通知、カメラ、位置情報などを使ってよいかを、エンドユーザーが端末のダイアログで決めます。Android では <code>@TauriPlugin(permissions = [...])</code> に宣言し、iOS では <code>checkPermissions</code> / <code>requestPermissions</code> をオーバーライドします。<Ref n={4} /></p>
            </div>
          </div>
          <p>前者の既定の権限は、次のように書きます。<Ref n={1} /></p>
          <Code
            lang="toml"
            title="permissions/default.toml"
            code={`
"$schema" = "schemas/schema.json"

[default]
description = "ping コマンドを許可する"
permissions = ["allow-ping"]
`}
          />
          <p>
            これを使うアプリ側は、<code>src-tauri/capabilities/default.json</code> の <code>permissions</code> に <code>"example:default"</code> を加えます。<Ref n={4} /> プラグインが発行するイベントを <code>addPluginListener</code> で購読する場合も、同じ権限が必要です。<Ref n={4} />
          </p>
          <p>
            後者について、Tauri はプラグインごとに <code>checkPermissions</code> と <code>requestPermissions</code> という 2 つのコマンドを自動で用意します。Android では、必要な OS 権限とその別名を <code>@TauriPlugin</code> の中に宣言しておくと、Tauri が確認と要求のダイアログを代行します。<Ref n={4} />
          </p>
          <Code
            lang="kotlin"
            title="Android：OS 権限の宣言"
            code={`
@TauriPlugin(
  permissions = [
    Permission(strings = [Manifest.permission.POST_NOTIFICATIONS], alias = "postNotification")
  ]
)
class ExamplePlugin(private val activity: Activity): Plugin(activity) { }
`}
          />
          <p>
            JavaScript からは <code>invoke('plugin:example|checkPermissions')</code> で状態（<code>granted</code>、<code>denied</code>、<code>prompt</code>、<code>prompt-with-rationale</code>）を確認し<Ref n={7} />、、<code>prompt</code> で始まる状態なら <code>requestPermissions</code> を呼びます。<Ref n={4} /> <ChapterLink n={38} /> で使った notification プラグインの <code>isPermissionGranted</code> と <code>requestPermission</code> は、この仕組みを包んだものです。
          </p>
          <p>
            Tauri の権限を通っても OS の権限がなければ失敗し、OS の権限があっても capability になければ呼び出し自体が拒否されます。両方を通して初めて機能が動きます。
          </p>
        </>
      ),
    },
    {
      id: 'tsumugi',
      title: 'Tsumugi の共有プラグインを設計する',
      body: (
        <>
          <Callout kind="tsumugi">
            <p>
              前章で保留にした「モバイルでの Markdown の書き出し」を、共有シートで解決する <code>tauri-plugin-share</code> を設計します。実装はテンプレートの <code>ping</code> の置き換えです。
            </p>
            <ul>
              <li><code>models.rs</code>：<code>ShareRequest {'{ title: String, text: String }'}</code> と、空の <code>ShareResponse</code>。</li>
              <li><code>commands.rs</code>：<code>share(app, payload)</code> が <code>app.share().share(payload)</code> に委譲。<code>build.rs</code> の <code>COMMANDS</code> を <code>&["share"]</code> に変更。</li>
              <li><code>desktop.rs</code>：デスクトップには共有シートがないので、<code>Err(Error::Unsupported)</code> を返す。フロントエンドは <code>platform()</code> で分岐し、デスクトップでは従来のファイル保存を使う。</li>
              <li><code>mobile.rs</code>：<code>run_mobile_plugin("share", payload)</code>。</li>
              <li>Kotlin：<code>@Command fun share(invoke: Invoke)</code> の中で <code>Intent(Intent.ACTION_SEND)</code> に <code>EXTRA_TEXT</code> を載せ、<code>activity.startActivity(Intent.createChooser(...))</code> で共有メニューを出し、<code>invoke.resolve()</code>。</li>
              <li>Swift：<code>UIActivityViewController(activityItems: [text], applicationActivities: nil)</code> を、メインスレッドで最前面のビューコントローラから <code>present</code> し、<code>invoke.resolve()</code>。</li>
              <li><code>permissions/default.toml</code>：<code>permissions = ["allow-share"]</code>。アプリ側の capability に <code>share:default</code>。</li>
            </ul>
            <p>
              テキストの共有には OS の実行時権限は不要なので、<code>checkPermissions</code> の実装は要りません。画像を共有する場合は、ファイルの URI を他アプリに渡すための仕組み（Android の FileProvider）が追加で必要になり、設計が一段複雑になります。本書では Markdown のテキストに限定します。
            </p>
            <p>
              ここに挙げた Android の <code>Intent.ACTION_SEND</code> と iOS の <code>UIActivityViewController</code> は、各 OS の標準 API ですが、Tauri プラグインの中で動かすことは本書の制作環境では検証できていません。実装するときは、各 OS の公式リファレンスを併せて参照してください。
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
            <li>プラグインは Rust クレート＋NPM パッケージ＋（モバイルなら）Android ライブラリと Swift パッケージ。<code>tauri plugin new --mobile</code> が雛形を作り、<code>build.rs</code> の <code>COMMANDS</code> から権限が自動生成される。</li>
            <li>呼び出しは JavaScript → Rust → ネイティブの順で、ネイティブを直接呼ぶ経路はない。<code>commands.rs</code> は拡張トレイトで <code>desktop.rs</code> / <code>mobile.rs</code> の同名の構造体に委譲し、どちらを使うかは <code>#[cfg(desktop)]</code> / <code>#[cfg(mobile)]</code> で決まる。</li>
            <li><code>mobile.rs</code> は <code>register_android_plugin</code> / <code>register_ios_plugin</code> で <code>PluginHandle</code> を得て、<code>run_mobile_plugin("メソッド名", 引数)</code> で呼ぶ。引数と戻り値は serde の JSON。</li>
            <li>Kotlin は <code>@TauriPlugin</code> クラスの <code>@Command</code> メソッド、Swift は <code>Plugin</code> を継承したクラスの <code>@objc</code> 関数。どちらも <code>invoke.parseArgs</code> で受け取り <code>invoke.resolve</code> で返す。Android はメインスレッドで動くので重い処理はコルーチンへ。</li>
            <li>権限は二重。Tauri の capability（開発者が決める）と OS の実行時権限（ユーザーが決める）の両方を通す必要がある。</li>
          </ul>
          <p>次章では、ここまでのモバイル版をビルドし、署名して、TestFlight と Google Play の内部テストで配る流れを追います。</p>
        </>
      ),
    },
  ],
  sources: [
    {
      title: 'Plugin Development',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/plugins/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'プラグインの構成、命名規則、plugin new の生成物、build.rs と自動生成権限、permissions/default.toml、guest-js の invoke 形式、コアとプラグインの設計思想の根拠。',
    },
    {
      title: 'Command Line Interface — tauri plugin new',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/reference/cli/',
      accessed: '2026-11-08',
      version: '@tauri-apps/cli 2.12',
      note: '--android / --ios / --mobile / --no-api / --ios-framework オプションの根拠。',
    },
    {
      title: 'tauri-cli templates/plugin（build.rs, src/*.rs, android/src/main/java/ExamplePlugin.kt, ios-spm/Sources/ExamplePlugin.swift, ios-spm/Package.swift, guest-js/index.ts）',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/tree/dev/crates/tauri-cli/templates/plugin',
      accessed: '2026-11-08',
      note: 'この章に載せた ping の各ファイル（build.rs、lib.rs、commands.rs、desktop.rs、mobile.rs、models.rs、Kotlin、Swift、index.ts）の原文。プレースホルダは example に置き換えた。',
    },
    {
      title: 'Mobile Plugin Development',
      publisher: 'Tauri',
      url: 'https://v2.tauri.app/develop/plugins/develop-mobile/',
      accessed: '2026-11-08',
      version: 'Tauri 2.12',
      note: 'Kotlin の @TauriPlugin / @Command / @InvokeArg と引数の書き分け、Swift の Plugin クラスと Decodable 引数、既定値非対応、run_mobile_plugin、メインスレッドと ANR、コルーチン、load / onNewIntent、OS 権限の宣言と checkPermissions / requestPermissions、イベントと addPluginListener、capability の記述の根拠。',
    },
    {
      title: 'tauri-build crate — src/lib.rs',
      publisher: 'tauri-apps/tauri（GitHub）',
      url: 'https://github.com/tauri-apps/tauri/blob/dev/crates/tauri-build/src/lib.rs',
      accessed: '2026-11-08',
      note: 'desktop / mobile の cfg 別名が tauri-build で定義されることの根拠。',
    },
    {
      title: 'plugins-workspace — plugins/os/permissions（autogenerated, default.toml, schemas）',
      publisher: 'tauri-apps/plugins-workspace（GitHub）',
      url: 'https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/os/permissions',
      accessed: '2026-11-08',
      note: '公式プラグインの permissions/ 配下に autogenerated ディレクトリと default.toml が置かれていることの根拠。',
    },
    {
      title: 'tauri::plugin::PermissionState',
      publisher: 'docs.rs（tauri）',
      url: 'https://docs.rs/tauri/latest/tauri/plugin/enum.PermissionState.html',
      accessed: '2026-11-08',
      version: 'tauri 2.12.5',
      note: '権限状態の列挙（Granted / Denied / Prompt / PromptWithRationale）の根拠。',
    },
  ],
}

export default chapter
