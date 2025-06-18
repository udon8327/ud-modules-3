import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isDev = command === 'serve'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: isDev
      ? {
          https: {
            key: fs.readFileSync(env.VITE_APP_DEV_SSL_KEY),
            cert: fs.readFileSync(env.VITE_APP_DEV_SSL_CERT),
          },
          // proxy: {
          //   '/api': {
          //     target: env.VITE_APP_DEV_PROXY ,
          //     changeOrigin: true,
          //     rewrite: path => path.replace(/^\/api/, '')
          //   }
          // },
        }
      : {},
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "@/style/variables" as *`
        }
      }
    }
  }
})