import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //本地打包然后放到github部署的配置
  build: {
    outDir:'./docs'
    },
  base: './',
  server: {
    host: '0.0.0.0',
    proxy: {     
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/v1': {
        target: 'https://api-free-openet.terraqt.com',
        changeOrigin: true,
      },
      'https://github.com': {
        target: 'https://github.com',
        changeOrigin: true,
      },
      'https://gibs.earthdata.nasa.gov': {
        target: 'https://gibs.earthdata.nasa.gov',
        changeOrigin: true,
      }
    }
  }
})
