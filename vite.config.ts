import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves from https://PRADXP007.github.io/BMW/
  base: '/BMW/',
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
  },
})
