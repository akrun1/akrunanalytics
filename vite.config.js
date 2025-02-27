import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // Try alternative port if 3000 is in use
    open: true, // Open browser automatically
    host: true,
    hmr: {
      overlay: true // Show error overlay
    },
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  build: {
    minify: false, // Disable minification for debugging
    sourcemap: true // Enable sourcemaps for debugging
  },
  resolve: {
    alias: {
      // Add alias for easier import of analytics modules
      '@analytics': path.resolve(__dirname, './src/components/analytics-modules'),
    }
  }
})
