import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // GitHub Pages deployment configuration
  base: process.env.NODE_ENV === 'production' ? '/qaicodes.github.io/' : '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined, // Let Vite handle chunking automatically
      },
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true,
  },

  // CSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
    devSourcemap: true,
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // Plugin configuration
  plugins: [],

  // Optimization
  optimizeDeps: {
    include: [],
  },
}) 