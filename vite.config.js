// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      // the entry file that is loaded whenever someone imports
      // your plugin in their app
      entry: resolve(__dirname, 'src/main.js'),

            // the exposed global variable
      // is required when formats includes 'umd' or 'iife'
      name: 'DevDeps',

      // the proper extensions will be added, ie:
         // name.js (es module)
         // name.umd.cjs) (common js module)
      // default fileName is the name option of package.json
      fileName: 'dev-dependencies'
    },
    rollupOptions: {

      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
})