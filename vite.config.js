import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    Components({
      dirs: ["src/components", "src/views"],
      extensions: ["vue"],
      dts: true,
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    AutoImport({
      imports: ["vue", "pinia", "vue-router"],
      dirs: ["src/store", "src/hooks", "src/compositions"],
      dts: true,
      resolvers: [
        ArcoResolver({
          ignoreIcons: ["icon-"],
        }),
      ],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
