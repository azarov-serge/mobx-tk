const { defineConfig } = require('vite');
const path = require('path');
const react = require('@vitejs/plugin-react');
const svgr = require('vite-plugin-svgr').default;
const { createHtmlPlugin } = require('vite-plugin-html');
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig((env) => {
  return {
    plugins: [
      basicSsl(),
      svgr({ noSvgo: true }),
      react(),
      createHtmlPlugin({
        minify: true,
        filename: 'index.html',
      }),
    ],
    resolve: {
      alias: {
        'mobx-tk':
          env?.mode === 'development'
            ? path.join(__dirname, '..', '..', 'src')
            : path.join(__dirname, '..', '..', 'dist'),
      },
    },
    build: {
      // 3MB
      chunkSizeWarningLimit: 3072,
      rollupOptions: {
        output: {
          dir: 'build',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
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
