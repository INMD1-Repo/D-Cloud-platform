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
      // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
      '/api': {
        // 요청 전달 대상 서버 주소 설정
        target: 'http://localhost',
      },
    },
  }
})