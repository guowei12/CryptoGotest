import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or 'modern'
      }
    }
  },
  plugins: [
    vue(),
    // vueDevTools(),
    viteCompression({
      threshold: 10240,//超过10Kb文件就压缩
      deleteOriginFile: false,//不删除源文件
      filter: /.(js|css|html|json|mjs|png|jpg|jpeg|svg)$/i  // 这些文件都要压缩
    }),
    basicSsl()
  ],
  resolve: {
    alias: {
      find: '@',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      replacement: resolve(__dirname, './src')
    }
  },
  build: {

  },
  //解决“vite use `--host` to expose”
  base: './',	//不加打包后白屏
  server: {
    host: '0.0.0.0',
    https:true,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: '',
        secure: false,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
})
