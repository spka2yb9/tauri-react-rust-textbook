import { Highlight, themes } from 'prism-react-renderer'
import { useEffect, useState, type ReactNode } from 'react'
import type { Source } from '../content/types'
import { hrefFor } from '../utils/route'

/* ---------- 図 ---------- */

interface FigureProps {
  /** 図番号。例 "33-1" */
  n: string
  title: string
  /** 図の読み方や補足。模式図ならその旨を含める */
  caption?: ReactNode
  children: ReactNode
}

/** 図解の共通枠。幅が足りないときは横スクロールで全体を見られる。 */
export function Figure({ n, title, caption, children }: FigureProps) {
  return (
    <figure className="fig" id={`fig-${n}`}>
      <div className="fig-body">{children}</div>
      <figcaption>
        <span className="fig-label">図 {n}</span> {title}
        {caption && <span className="fig-caption">{caption}</span>}
      </figcaption>
    </figure>
  )
}

/* ---------- コード ---------- */

type Lang = 'tsx' | 'ts' | 'jsx' | 'js' | 'rust' | 'swift' | 'kotlin' | 'sql' | 'json' | 'yaml' | 'bash' | 'toml' | 'html' | 'css' | 'text'

interface CodeProps {
  lang: Lang
  /** ファイル名などのラベル */
  title?: string
  code: string
}

function usePrefersDark(): boolean {
  // 検索索引の生成（Node 上での描画）では matchMedia が無いので false にする
  const [dark, setDark] = useState(() => typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const on = () => setDark(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return dark
}

const langMap: Record<Lang, string> = {
  tsx: 'tsx', ts: 'typescript', jsx: 'jsx', js: 'javascript', rust: 'rust', swift: 'swift', kotlin: 'kotlin',
  sql: 'sql', json: 'json', yaml: 'yaml', bash: 'bash', toml: 'toml', html: 'markup', css: 'css', text: 'plain',
}

/** コードブロック。等幅・横スクロール。 */
export function Code({ lang, title, code }: CodeProps) {
  const dark = usePrefersDark()
  const src = code.replace(/^\n/, '').replace(/\n\s*$/, '')
  return (
    <div className="code">
      {title && <div className="code-title">{title}</div>}
      <Highlight code={src} language={langMap[lang]} theme={dark ? themes.nightOwl : themes.github}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-pre lang-${lang}`} tabIndex={0}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

/* ---------- 補足枠 ---------- */

interface CalloutProps {
  kind?: 'note' | 'warn' | 'tsumugi' | 'unverified'
  title?: string
  children: ReactNode
}

const calloutTitle = { note: '補足', warn: '注意', tsumugi: 'Tsumugi での使いどころ', unverified: '未検証' }

export function Callout({ kind = 'note', title, children }: CalloutProps) {
  return (
    <aside className={`callout callout-${kind}`}>
      <div className="callout-title">{title ?? calloutTitle[kind]}</div>
      <div className="callout-body">{children}</div>
    </aside>
  )
}

/* ---------- 用語・章リンク ---------- */

/** 初出の用語。dfn 要素として強調する。 */
export function Term({ children, en }: { children: ReactNode; en?: string }) {
  return (
    <dfn className="term">
      {children}
      {en && <span className="term-en">（{en}）</span>}
    </dfn>
  )
}

export function ChapterLink({ n, section, children }: { n: number; section?: string; children?: ReactNode }) {
  return <a href={hrefFor(n, section)}>{children ?? `第${n}章`}</a>
}

/* ---------- 出典 ---------- */

/** 本文中の出典参照 [1] のような番号。 */
export function Ref({ n }: { n: number }) {
  return (
    <sup className="ref">
      <a href={`#src-${n}`} onClick={(e) => scrollToId(e, `src-${n}`)}>
        [{n}]
      </a>
    </sup>
  )
}

function scrollToId(e: React.MouseEvent, id: string) {
  const el = document.getElementById(id)
  if (el) {
    e.preventDefault()
    el.scrollIntoView({ block: 'center' })
  }
}

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null
  return (
    <section className="sources" aria-labelledby="sources-h">
      <h2 id="sources-h">参考資料</h2>
      <ol>
        {sources.map((s, i) => (
          <li key={i} id={`src-${i + 1}`}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.title}
            </a>
            、{s.publisher}
            {s.version && `、${s.version}`}。参照日 {s.accessed}。{s.note && <span className="src-note">{s.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}
