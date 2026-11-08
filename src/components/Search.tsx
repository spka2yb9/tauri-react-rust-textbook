import { useEffect, useId, useRef, useState } from 'react'
import index from '../content/search-index.json'
import { search, type Hit, type IndexEntry } from '../utils/search'
import { hrefFor } from '../utils/route'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [hits, setHits] = useState<Hit[]>([])
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [open])

  useEffect(() => {
    const t = setTimeout(() => {
      setHits(search(index as IndexEntry[], q))
      setActive(0)
    }, 80)
    return () => clearTimeout(t)
  }, [q])

  if (!open) return null

  const go = (h: Hit) => {
    location.hash = hrefFor(h.entry.chapter, h.entry.sectionId)
    onClose()
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(hits.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter' && hits[active]) {
      go(hits[active])
    }
  }

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-dialog" role="dialog" aria-modal="true" aria-labelledby={`${id}-label`} onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <label id={`${id}-label`} htmlFor={`${id}-input`} className="search-label">
          全文検索（本文も対象。空白区切りで AND 検索）
        </label>
        <input
          id={`${id}-input`}
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="例：所有権 借用 / invoke / capabilities"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
        <ul className="search-results" role="listbox" aria-label="検索結果">
          {q && hits.length === 0 && <li className="search-empty">見つかりませんでした</li>}
          {hits.map((h, i) => (
            <li key={`${h.entry.chapter}-${h.entry.sectionId}`} role="option" aria-selected={i === active} className={i === active ? 'active' : ''}>
              <a href={hrefFor(h.entry.chapter, h.entry.sectionId)} onClick={(e) => { e.preventDefault(); go(h) }} onMouseEnter={() => setActive(i)}>
                <span className="search-where">
                  第{h.entry.chapter}章 {h.entry.chapterTitle} › {h.entry.sectionTitle}
                </span>
                <span className="search-excerpt">{h.excerpt}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="search-help">↑↓ で選択、Enter で移動、Esc で閉じる</div>
      </div>
    </div>
  )
}
