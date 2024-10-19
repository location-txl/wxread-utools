import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {vitePluginForArco} from '@arco-plugins/vite-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitePluginForArco({
            style: 'css'
        }),
    ],

    base: "./",
    build: {
        sourcemap: false, // 对应 productionSourceMap: false
        outDir: "./utools/dist"
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
    },
})
