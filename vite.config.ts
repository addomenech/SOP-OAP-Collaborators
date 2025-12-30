import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // GitHub Pages base path (auto-switch)
    base: process.env.GITHUB_PAGES === 'true' ? '/SOP-OAP-Collaborators/' : '/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    // Safe defaults (won't crash if undefined)
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
