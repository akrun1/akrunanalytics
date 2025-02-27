import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      {
        name: 'ignore-modules-for-build',
        enforce: 'pre',
        // This plugin will ignore imported files that match these patterns during build
        transform(code, id) {
          // During build, replace imports from problematic directories with empty modules
          if (command === 'build' && 
              (id.includes('/gender-inequality/') || 
               id.includes('/country-clustering/') ||
               id.includes('react-simple-maps') ||
               id.includes('d3-scale') ||
               id.includes('react-chartjs-2'))) {
            console.log(' Ignoring import during build:', id);
            return {
              code: 'export default function() { return null; }',
              map: null
            };
          }
        },
      }
    ],
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
      sourcemap: true, // Enable sourcemaps for debugging
      rollupOptions: {
        // Exclude problematic modules from the build
        external: ['react-simple-maps', 'd3-scale', 'react-chartjs-2'],
        output: {
          // Provide global variables for the external modules
          globals: {
            'react-simple-maps': 'ReactSimpleMaps',
            'd3-scale': 'D3Scale',
            'react-chartjs-2': 'ReactChartJS2'
          }
        }
      }
    },
    resolve: {
      alias: {
        // Add alias for easier import of analytics modules
        '@analytics': path.resolve(__dirname, './src/components/analytics-modules'),
      }
    }
  }
})
