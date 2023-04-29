/*
 * @Author: Carlos
 * @Date: 2022-12-27 15:28:22
 * @LastEditTime: 2023-04-26 17:08:52
 * @FilePath: /vite-react-swc/vite.config.ts
 * @Description:
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString().startsWith('refractor')) {
              return 'refractor'
            }
          }
          return undefined
        }
      }
    }
  },
  server: {
    proxy: {
      '/music-api': {
        target: 'http://106.55.147.116',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/music-api/, '')
      },
      '/static-api': {
        target: 'http://106.55.147.116',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/music-api/, '')
      },
      '/nest-api': {
        target: 'http://106.55.147.116',
        // target: 'http://localhost:3001',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/music-api/, '')
      },
    }
  }
})
