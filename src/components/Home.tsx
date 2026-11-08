import { useEffect } from 'react'
import { chapterLabel, chapters } from '../content/chapters'
import { PARTS } from '../content/types'
import { hrefFor } from '../utils/route'
import { VERSIONS } from '../content/versions'

export function Home() {
  useEffect(() => {
    document.title = 'Tauri 2・React・Rust 教科書'
    scrollTo(0, 0)
  }, [])
  return (
    <article className="chapter home">
      <header className="chapter-head">
        <h1>Tauri 2・React・Rust 教科書</h1>
        <p className="chapter-summary">
          JavaScript の基礎だけを知っている人が、TypeScript・React・Rust を入門から学び、Tauri 2
          でデスクトップとモバイルの両方に対応したアプリを設計・実装・配布できるようになるための教科書です。本全体を通して、Notion
          風のノートアプリ「Tsumugi」を1つ完成させます。
        </p>
      </header>

      <section className="section" id="how-to-read">
        <h2>本書の読み方</h2>
        <p>
          第2部から第3部（React）は順番に読む前提です。第4部（Rust）は第2部・第3部とは独立しているので、先に読んでも構いません。第5部（Tauri）は第3部と第4部の両方を前提にし、第6部以降は第5部を前提にします。各章の冒頭に前提となる章を示しています。
        </p>
        <p>
          本書に演習や確認問題はありません。読み物として通読できるように、各章は「この章で学ぶこと → 本文と図解 → Tsumugi
          での使いどころ → まとめ → 参考資料」の流れで統一しています。
        </p>
      </section>

      <section className="section" id="versions">
        <h2>対象バージョン</h2>
        <p>本書の記述は次のバージョンを基準にしています（確認日 {VERSIONS.checked}）。</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ソフトウェア</th>
                <th>バージョン</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              {VERSIONS.items.map((v) => (
                <tr key={v.name}>
                  <td>{v.name}</td>
                  <td>{v.version}</td>
                  <td>{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="toc">
        <h2>目次</h2>
        {PARTS.map((p) => (
          <div key={p.number} className="toc-part">
            <h3>
              第{p.number}部 {p.title}
            </h3>
            <p className="toc-part-desc">{p.description}</p>
            <ol className="toc-list">
              {chapters
                .filter((c) => c.part === p.number)
                .map((c) => (
                  <li key={c.number}>
                    <a href={hrefFor(c.number)}>
                      <span className="toc-num">{chapterLabel(c)}</span> {c.title}
                    </a>
                    <p className="toc-summary">{c.summary}</p>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </section>
    </article>
  )
}
