import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [react({})],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  server: {
    host: true,
    open: false
  }
});
