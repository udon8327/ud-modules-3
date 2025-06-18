import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      https: {
        key: fs.readFileSync(env.VITE_APP_DEV_SSL_KEY),
        cert: fs.readFileSync(env.VITE_APP_DEV_SSL_CERT),
      }
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "@/style/variables" as *`
        }
      }
    }
  }
})