/// <reference types='vitest' />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwindcss from '@tailwindcss/vite';

const basePath = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig(() => ({
  root: import.meta.dirname,
  base: basePath,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  resolve: {
    alias: {
      '@meli-challenge/ui-components': path.resolve(
        import.meta.dirname,
        '../../libs/ui-components/src/index.ts',
      ),
    },
  },
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': { target: 'http://localhost:3333', changeOrigin: true },
    },
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), tailwindcss()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@meli-challenge/frontend',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
