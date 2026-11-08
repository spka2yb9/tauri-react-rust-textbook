import { useEffect } from 'react'
import { chapterByNumber, chapterLabel, chapters } from '../content/chapters'
import { PARTS, type Chapter } from '../content/types'
import { hrefFor } from '../utils/route'
import { SourceList } from './content'

export function ChapterView({ chapter, section, restoreY }: { chapter: Chapter; section: string | null; restoreY: number | null }) {
  const idx = chapters.indexOf(chapter)
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]
  const part = PARTS.find((p) => p.number === chapter.part)

  // 節へのハッシュ遷移では固定ヘッダー分を CSS の scroll-margin で避ける
  useEffect(() => {
    if (restoreY != null) {
      scrollTo(0, restoreY) // 前回の読書位置へ復帰
    } else if (section) {
      document.getElementById(section)?.scrollIntoView()
    } else {
      scrollTo(0, 0)
    }
  }, [chapter.number, section, restoreY])

  useEffect(() => {
    document.title = `${chapterLabel(chapter)} ${chapter.title} | Tauri 2・React・Rust 教科書`
  }, [chapter])

  return (
    <article className="chapter">
      <header className="chapter-head">
        <p className="chapter-part">
          第{chapter.part}部 {part?.title}
        </p>
        <h1>
          <span className="chapter-num">{chapterLabel(chapter)}</span> {chapter.title}
        </h1>
        <p className="chapter-summary">{chapter.summary}</p>
        <div className="chapter-goals">
          <h2 id="goals">この章で学ぶこと</h2>
          <ul>
            {chapter.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
          {chapter.prerequisites.length > 0 && (
            <p className="chapter-prereq">
              前提：
              {chapter.prerequisites.map((n, i) => {
                const c = chapterByNumber.get(n)
                return (
                  <span key={n}>
                    {i > 0 && '、'}
                    <a href={hrefFor(n)}>
                      第{n}章{c ? ` ${c.title}` : ''}
                    </a>
                  </span>
                )
              })}
            </p>
          )}
        </div>
      </header>

      {chapter.sections.map((s) => (
        <section key={s.id} id={s.id} className="section" aria-labelledby={`${s.id}-h`}>
          <h2 id={`${s.id}-h`}>
            <a className="anchor" href={hrefFor(chapter.number, s.id)}>
              {s.title}
            </a>
          </h2>
          {s.body}
        </section>
      ))}

      <SourceList sources={chapter.sources} />

      <nav className="prev-next" aria-label="前後の章">
        {prev ? (
          <a className="prev" href={hrefFor(prev.number)}>
            <span className="pn-label">前の章</span>
            {chapterLabel(prev)} {prev.title}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="next" href={hrefFor(next.number)}>
            <span className="pn-label">次の章</span>
            {chapterLabel(next)} {next.title}
          </a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
