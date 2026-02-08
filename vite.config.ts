import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/fortunetelling-app/',
  server: {
    host: true,
    port: 3000
  }
})
