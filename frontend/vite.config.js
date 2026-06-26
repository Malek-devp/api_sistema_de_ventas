import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/usuarios': 'http://localhost:2203',
      '/roles': 'http://localhost:2203',
      '/productos': 'http://localhost:2203',
      '/ventas': 'http://localhost:2203',
      '/detalle': 'http://localhost:2203',
    },
  },
})
