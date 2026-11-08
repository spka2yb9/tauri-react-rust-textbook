import type { Chapter } from './types'

// src/chapters/chNN.tsx が default export する Chapter を自動で集める。
const modules = import.meta.glob<{ default: Chapter }>('../chapters/ch*.tsx', { eager: true })

export const chapters: Chapter[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.number - b.number)

export const chapterByNumber = new Map(chapters.map((c) => [c.number, c]))

export function chapterLabel(c: Chapter): string {
  return c.number >= 59 ? '付録' : `第${c.number}章`
}
