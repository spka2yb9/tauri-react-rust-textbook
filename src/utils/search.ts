export interface IndexEntry {
  chapter: number
  chapterTitle: string
  sectionId: string
  sectionTitle: string
  text: string
}

export interface Hit {
  entry: IndexEntry
  excerpt: string
  score: number
}

/** 空白区切りの各語をすべて含む節を返す。日本語は部分一致で探す。 */
export function search(index: IndexEntry[], query: string, limit = 30): Hit[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0)
  if (terms.length === 0) return []

  const hits: Hit[] = []
  for (const entry of index) {
    const title = (entry.chapterTitle + ' ' + entry.sectionTitle).toLowerCase()
    const text = entry.text.toLowerCase()
    let score = 0
    let firstPos = -1
    let ok = true
    for (const t of terms) {
      const inTitle = title.includes(t)
      const pos = text.indexOf(t)
      if (!inTitle && pos < 0) {
        ok = false
        break
      }
      if (inTitle) score += 10
      if (pos >= 0) {
        score += 1 + Math.min(5, countOccurrences(text, t))
        if (firstPos < 0 || pos < firstPos) firstPos = pos
      }
    }
    if (!ok) continue
    hits.push({ entry, score, excerpt: makeExcerpt(entry.text, firstPos) })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

function countOccurrences(text: string, t: string): number {
  let n = 0
  let i = text.indexOf(t)
  while (i >= 0 && n < 50) {
    n++
    i = text.indexOf(t, i + t.length)
  }
  return n
}

function makeExcerpt(text: string, pos: number, span = 60): string {
  if (pos < 0) return text.slice(0, span * 2) + (text.length > span * 2 ? '…' : '')
  const start = Math.max(0, pos - span)
  const end = Math.min(text.length, pos + span)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}
