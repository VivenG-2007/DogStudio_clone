import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // In dev, serve from root so public/ assets resolve correctly.
  // In production (e.g. GitHub Pages), use the repo subpath.
  base: mode === 'production'
    ? (process.env.VITE_BASE_PATH || '/DogStudio_clone')
    : '/',
}))
