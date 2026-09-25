import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { routeIds, routeSections } from './src/routes.js';

export default defineConfig({
  plugins: [react(), {
    name: 'github-pages-route-entries',
    async closeBundle() {
      // Static entry pages let GitHub Pages serve deep links without SPA rewrites.
      const output = resolve('dist');
      for (const section of routeSections) {
        for (const id of routeIds) {
          const directory = resolve(output, section, id);
          await mkdir(directory, { recursive: true });
          await copyFile(resolve(output, 'index.html'), resolve(directory, 'index.html'));
        }
      }
      await copyFile(resolve(output, 'index.html'), resolve(output, '404.html'));
    },
  }],
  base: '/',
  preview: { port: 4173, open: '/' },
});
