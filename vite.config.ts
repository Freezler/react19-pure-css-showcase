import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  build: {
    target: 'baseline-widely-available',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true,
    warmup: {
      clientFiles: ['./src/components/*.tsx']
    }
  }
}))
