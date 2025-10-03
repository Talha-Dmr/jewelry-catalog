import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  },
  resolve: {
    alias: {
      '@repo/contracts': path.resolve(__dirname, '../packages/contracts/src')
    }
  }
});
