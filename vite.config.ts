import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    port: 3030, // Set your desired port here
    proxy:{
      '/api': {
        target: 'http://34.142.158.113:8093', //server
        // target: 'http://localhost:4433/', //local
        changeOrigin: true,
      }
    }
  },
})
