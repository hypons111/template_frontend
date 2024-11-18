import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'; // 確保這行存在
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'), // 將 '@' 設定為 'src' 目錄的絕對路徑
    },
  },
});
