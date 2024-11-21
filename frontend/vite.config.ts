import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/site/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @를 src로 매핑
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: { 
      "/api/": {
        target: "https://phpproject.powerinmd.com/api",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        secure: false,
      }
    }
  }
})