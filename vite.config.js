import { defineConfig } from 'vite';

export default defineConfig({
  // Serve index.html for all routes so the SPA router handles them
  server: {
    historyApiFallback: true,
    open: true,
  },
  preview: {
    historyApiFallback: true,
  },
});
