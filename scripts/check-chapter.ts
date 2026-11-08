// 章ファイルを描画して基本的な整合性を検査する。
// 実行: node --experimental-strip-types scripts/check-chapter.ts 19 20 ...   （番号なしなら全章）
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import type { Chapter } from '../src/content/types'

const want = process.argv.slice(2).map(Number)
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
let failed = false

try {
  const mod = (await server.ssrLoadModule('/src/content/chapters.ts')) as { chapters: Chapter[] }
  const known = new Set(mod.chapters.map((c) => c.number))
  const approved = new Set([...Array.from({ length: 58 }, (_, i) => i + 1), 59])
  for (const ch of mod.chapters) {
    if (want.length && !want.includes(ch.number)) continue
    const problems: string[] = []
    const notes = new Set<string>()
    const ids = new Set<string>()
    let chars = 0
    let figs = 0
    let codes = 0
    let maxRef = 0
    for (const sec of ch.sections) {
      if (!/^[a-z0-9-]+$/.test(sec.id)) problems.push(`節 id が不正: ${sec.id}`)
      if (ids.has(sec.id)) problems.push(`節 id が重複: ${sec.id}`)
      ids.add(sec.id)
      let html: string
      try {
        html = renderToStaticMarkup(createElement('div', null, sec.body))
      } catch (e) {
        problems.push(`節 ${sec.id} の描画に失敗: ${(e as Error).message}`)
        continue
      }
      figs += (html.match(/<figure/g) ?? []).length
      codes += (html.match(/class="code"/g) ?? []).length
      for (const m of html.matchAll(/href="#src-(\d+)"/g)) maxRef = Math.max(maxRef, Number(m[1]))
      for (const m of html.matchAll(/href="#\/(\d+)/g)) {
        const n = Number(m[1])
        if (!approved.has(n)) problems.push(`存在しない章へのリンク: 第${n}章`)
        else if (!known.has(n)) notes.add(`未執筆の章へのリンク: 第${n}章`)
      }
      for (const m of html.matchAll(/<svg(?![^>]*role="img")/g)) problems.push(`role="img" の無い svg（節 ${sec.id}）: ${m[0].slice(0, 40)}`)
      const noPre = html.replace(/<pre[\s\S]*?<\/pre>/g, '')
      if (/\*\*[^*]+\*\*/.test(noPre)) problems.push(`Markdown の太字記法が残っている（節 ${sec.id}）`)
      const text = noPre.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '')
      chars += text.length
    }
    if (maxRef > ch.sources.length) problems.push(`Ref n=${maxRef} に対応する出典がない（出典は ${ch.sources.length} 件）`)
    if (ch.sources.length === 0) problems.push('出典が 0 件')
    for (const s of ch.sources) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s.accessed)) problems.push(`参照日の形式が不正: ${s.accessed}`)
      if (!/^https?:\/\//.test(s.url)) problems.push(`URL が不正: ${s.url}`)
    }
    if (chars < 4000) problems.push(`本文が短い（${chars} 文字。コード・図を除く）`)
    if (figs < 2 && ch.number < 59) problems.push(`図が ${figs} 点（2点以上が目安）`)
    const status = problems.length ? 'NG' : 'OK'
    if (problems.length) failed = true
    console.log(`[${status}] 第${ch.number}章 ${ch.title} — 節 ${ch.sections.length} / 本文 ${chars} 文字 / 図 ${figs} / コード ${codes} / 出典 ${ch.sources.length}`)
    for (const p of problems) console.log(`      - ${p}`)
    for (const p of notes) console.log(`      · ${p}`)
  }
} finally {
  await server.close()
}
process.exit(failed ? 1 : 0)
