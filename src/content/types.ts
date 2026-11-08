import type { ReactNode } from 'react'

/** 参考文献（出典）1件。 */
export interface Source {
  /** 資料名 */
  title: string
  /** 発行者・サイト名 */
  publisher: string
  url: string
  /** 参照日 YYYY-MM-DD */
  accessed: string
  /** 対象バージョン・版（該当する場合） */
  version?: string
  /** この資料が何の主張を支えるか */
  note?: string
}

/** 章内の節（h2 相当）。 */
export interface Section {
  /** URL ハッシュに使う ID（英数字とハイフン） */
  id: string
  title: string
  body: ReactNode
}

export interface Chapter {
  /** 章番号。付録は 59 以降 */
  number: number
  /** 部番号 1〜9 */
  part: number
  title: string
  /** 目次と検索結果に出す1〜2文の要約 */
  summary: string
  /** この章で学ぶこと（箇条書き） */
  goals: string[]
  /** 前提となる章番号 */
  prerequisites: number[]
  sections: Section[]
  sources: Source[]
}

export interface Part {
  number: number
  title: string
  description: string
}

export const PARTS: Part[] = [
  { number: 1, title: '導入', description: 'Tauri と本書の全体像、macOS での開発環境の準備' },
  { number: 2, title: 'JavaScript の補強と TypeScript', description: 'モジュール、非同期処理、DOM、そして型の言葉' },
  { number: 3, title: 'React 入門', description: '宣言的 UI、状態、副作用、ルーティング、テスト' },
  { number: 4, title: 'Rust 入門', description: '所有権からトレイト、ライフタイム、並行処理、async まで' },
  { number: 5, title: 'Tauri の基礎', description: 'アーキテクチャ、IPC、セキュリティモデル、プラグイン、ウィンドウ' },
  { number: 6, title: 'Tsumugi を作る', description: 'Notion 風ノートアプリを設計から仕上げまで実装する' },
  { number: 7, title: 'デスクトップでの配布', description: 'ビルド、署名と公証、自動アップデートと CI' },
  { number: 8, title: 'モバイル', description: 'iOS と Android への対応、ネイティブ連携、配布の流れ' },
  { number: 9, title: '発展と付録', description: '次に学ぶことと用語集' },
]
