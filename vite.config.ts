import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages のプロジェクトサイト（https://<user>.github.io/<repo>/）で公開する場合は
// 環境変数 BASE_PATH=/<repo>/ を付けてビルドする。ルート配信なら不要。
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? '/',
})
