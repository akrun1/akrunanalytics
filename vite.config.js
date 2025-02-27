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
          // ONLY if they are importing the problematic dependencies
          if (command === 'build') {
            // Only transform analytics module files that are importing the problematic packages
            if ((id.includes('/analytics-modules/') || id.includes('/components/analytics-modules/')) && 
                (code.includes('react-simple-maps') || 
                 code.includes('d3-scale') || 
                 code.includes('react-chartjs-2'))) {
              console.log(' Replacing problematic imports in:', id);
              return {
                code: `
                  import React from "react";
                  export default function() {
                    return React.createElement(
                      "div", 
                      { 
                        style: { 
                          padding: "40px", 
                          display: "flex", 
                          flexDirection: "column", 
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#1a1a1a",
                          borderRadius: "8px",
                          color: "#ffffff"
                        } 
                      }, 
                      React.createElement("div", { 
                        style: { 
                          width: "50px", 
                          height: "50px", 
                          border: "5px solid rgba(0, 123, 255, 0.1)", 
                          borderRadius: "50%",
                          borderTop: "5px solid #0d6efd",
                          animation: "spin 1.5s linear infinite"
                        }
                      }),
                      React.createElement("style", null, "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"),
                      React.createElement("p", { style: { marginTop: "15px", color: "#e0e0e0" } }, "Interactive visualization")
                    );
                  }
                `,
                map: null
              };
            }
            
            // Also transform direct imports of problematic packages
            if (id.includes('react-simple-maps') || 
                id.includes('d3-scale') || 
                id.includes('react-chartjs-2')) {
              console.log(' Ignoring external dependency:', id);
              return {
                code: 'export default function() { return null; }',
                map: null
              };
            }
          }
        },
      }
    ],
    server: {
      port: 3003,
      strictPort: true, // Use port 3003 consistently
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
        },
        '/api': {
          target: 'http://localhost:5001',
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
