import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GH_PAGES=true is set only by the gh-pages deploy script, since GitHub Pages
// serves this project from a /Northface/ subpath. Local dev and the Docker
// build (served from the domain root) both use the default base of '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.GH_PAGES ? '/Northface/' : '/',
})
