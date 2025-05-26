import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 改为你想要的端口号（如 3000）
    open: true, // 可选：自动在浏览器打开
  },
})
