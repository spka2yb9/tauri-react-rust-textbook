const KEY = 'tauri-textbook:position'

export interface Position {
  hash: string
  scrollY: number
}

export function savePosition(pos: Position): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(pos))
  } catch {
    // ストレージが使えない環境では保存しない（閲覧は継続できる）
  }
}

export function loadPosition(): Position | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as Partial<Position>
    if (typeof p.hash !== 'string' || typeof p.scrollY !== 'number') return null
    return { hash: p.hash, scrollY: p.scrollY }
  } catch {
    return null
  }
}

