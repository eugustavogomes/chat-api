import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/message': 'http://localhost:8000', // Redireciona chamadas para o backend
    },
  },
})
