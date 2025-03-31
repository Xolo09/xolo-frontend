import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        tags: [
          {
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content: "script-src 'self' 'unsafe-eval';"
            },
            injectTo: 'head'
          }
        ]
      }
    })
  ]
});
