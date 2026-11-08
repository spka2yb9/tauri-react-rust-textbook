/** 本書が基準にするバージョン。各章の記述はこれに合わせる。 */
export const VERSIONS = {
  checked: '2026-11-08',
  items: [
    { name: 'Tauri', version: '2.12.5', note: 'tauri クレート。@tauri-apps/api と @tauri-apps/cli は 2.12.4' },
    { name: 'React', version: '19.3.1', note: 'React Compiler 1.0.0' },
    { name: 'TypeScript', version: '7.0.2', note: 'Go による移植版。6.0 で非推奨になった設定は 7.0 ではエラーになる' },
    { name: 'Vite', version: '8.3.6', note: '' },
    { name: 'Rust', version: '1.99.1', note: '2024 edition' },
    { name: 'rusqlite', version: '0.41.1', note: 'bundled 機能で SQLite 本体を同梱する' },
    { name: 'SQLite', version: '3.54.1', note: 'FTS5 の trigram トークナイザは 3.34.0 以降' },
    { name: 'BlockNote', version: '0.57.0', note: '@blocknote/core, react, mantine。MPL-2.0' },
    { name: 'React Router', version: '8.5.1', note: '' },
    { name: 'Vitest', version: '5.1.0', note: '' },
    { name: 'Node.js', version: '24.x', note: 'LTS' },
  ],
}
