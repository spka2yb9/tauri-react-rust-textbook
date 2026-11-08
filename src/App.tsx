import { useEffect, useRef, useState } from 'react'
import { ChapterView } from './components/ChapterView'
import { Home } from './components/Home'
import { SearchDialog } from './components/Search'
import { chapterByNumber, chapterLabel, chapters } from './content/chapters'
import { PARTS } from './content/types'
import { loadPosition, savePosition, type Position } from './utils/readingPosition'
import { hrefFor, useRoute } from './utils/route'

export default function App() {
  const route = useRoute()
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const restored = useRef(false)
  const restoreTarget = useRef<Position | null>(null)

  // 初回アクセス時、ハッシュが無ければ前回の読書位置へ戻す
  useEffect(() => {
    if (restored.current) return
    restored.current = true
    const pos = loadPosition()
    if (!location.hash && pos?.hash) {
      restoreTarget.current = pos
      location.hash = pos.hash
    }
  }, [])
  // 復帰先の章を表示している間だけ、保存したスクロール位置を渡す
  const restoreY = restoreTarget.current && location.hash === restoreTarget.current.hash ? restoreTarget.current.scrollY : null

  // 読書位置の保存（スクロール停止後）
  useEffect(() => {
    let t: number | undefined
    const onScroll = () => {
      clearTimeout(t)
      t = setTimeout(() => savePosition({ hash: location.hash, scrollY: scrollY }), 300)
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [])

  // ハッシュ遷移時にも保存し、スマホの目次を閉じる
  useEffect(() => {
    savePosition({ hash: location.hash, scrollY: 0 })
    setNavOpen(false)
  }, [route.chapter, route.section])

  // キーボード: / または Ctrl/Cmd+K で検索
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === 'INPUT'
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const chapter = route.chapter != null ? chapterByNumber.get(route.chapter) : undefined

  return (
    <div className={`app ${navOpen ? 'nav-open' : ''}`}>
      <a className="skip" href="#main">
        本文へ移動
      </a>
      <header className="topbar">
        <button className="icon-btn nav-toggle" aria-label="目次を開閉" aria-expanded={navOpen} onClick={() => setNavOpen((o) => !o)}>
          ☰
        </button>
        <a className="brand" href="#/">
          Tauri 2・React・Rust 教科書
        </a>
        <button className="search-btn" onClick={() => setSearchOpen(true)} aria-keyshortcuts="Control+K /">
          <span>検索</span>
          <kbd>/</kbd>
        </button>
      </header>

      <nav className="sidebar" aria-label="目次">
        <ol className="nav-parts">
          {PARTS.map((p) => (
            <li key={p.number}>
              <div className="nav-part">
                第{p.number}部 {p.title}
              </div>
              <ol className="nav-chapters">
                {chapters
                  .filter((c) => c.part === p.number)
                  .map((c) => (
                    <li key={c.number}>
                      <a href={hrefFor(c.number)} aria-current={c === chapter ? 'page' : undefined}>
                        <span className="nav-num">{c.number >= 59 ? '付' : c.number}</span>
                        {c.title}
                      </a>
                      {c === chapter && (
                        <ol className="nav-sections">
                          {c.sections.map((s) => (
                            <li key={s.id}>
                              <a href={hrefFor(c.number, s.id)} aria-current={route.section === s.id ? 'location' : undefined}>
                                {s.title}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
              </ol>
            </li>
          ))}
        </ol>
      </nav>
      <div className="sidebar-backdrop" onClick={() => setNavOpen(false)} />

      <main id="main" className="main">
        {route.chapter == null ? (
          <Home />
        ) : chapter ? (
          <ChapterView chapter={chapter} section={route.section} restoreY={restoreY} />
        ) : (
          <article className="chapter">
            <h1>章が見つかりません</h1>
            <p>
              <a href="#/">目次へ戻る</a>
            </p>
          </article>
        )}
      </main>

      {chapter && (
        <aside className="outline" aria-label="ページ内見出し">
          <div className="outline-title">
            {chapterLabel(chapter)}の見出し
          </div>
          <ol>
            {chapter.sections.map((s) => (
              <li key={s.id}>
                <a href={hrefFor(chapter.number, s.id)} aria-current={route.section === s.id ? 'location' : undefined}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
