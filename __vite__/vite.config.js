import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import dts from 'vite-plugin-dts';
import babel from 'vite-plugin-babel';

export default defineConfig(() => {
  return {
    plugins: [
      svgr({ noSvgo: true }),
      react(),
      dts({
        include: ['src', 'node_modules'],
        exclude: ['example'],
        insertTypesEntry: true,
      }),
      babel({
        babelConfig: {
          plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
        },
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, '..', 'src', 'index.ts'),
        name: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react-router',
          'react-router-dom',
          'mobx',
          'mobx-react',
          '@admiral-ds/icons',
          '@admiral-ds/react-ui',
          'axios',
          'styled-components',
        ],
        output: {
          dir: 'dist',
          // 1MB
          chunkSizeWarningLimit: 500,
          entryFileNames: '[name].js',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [fixReactVirtualized],
      },
    },
  };
});
