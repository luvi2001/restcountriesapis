// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./src/setupTests.js'],
    environment: 'jsdom', // You likely need this for DOM testing
    globals: true // Allows using `expect` etc. without importing
  }
})
