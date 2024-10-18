import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {vitePluginForArco} from '@arco-plugins/vite-vue'
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitePluginForArco({
            style: 'css'
        }),
        topLevelAwait({
            // 可选配置项
            promiseExportName: '__tla',
            promiseImportName: (i) => `__tla_${i}`,
        }),
    ],

    base: "./",
    build: {
        sourcemap: false, // 对应 productionSourceMap: false
    },
    server: {
        hmr: {
            overlay: false, // 对应 devServer.client.overlay: false
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        }
    }
})
