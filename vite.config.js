import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "ES2022" 
  },
  /*resolve:
    { 
      alias:
        {
          'crypto': 'crypto-browserify',
          'buffer':'buffer/',
          'stream': 'readable-stream'
        }
    },
  optimizeDeps:{ 
    include:['@noble/secp256k1'],
    exclude:['chunk-PASC5ASQS']
}*/
})
