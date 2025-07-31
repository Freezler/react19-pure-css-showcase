import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              // Production mode - automatically optimize all components
              compilationMode: 'infer', // Automatically optimize all valid components  
              panicThreshold: 'none', // More lenient for production
              sources: (filename) => {
                // Only compile our source code, not node_modules
                return filename.includes('src/') && !filename.includes('node_modules')
              },
            },
          ],
        ],
      },
    }),
  ],
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
