import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { paths , componentPaths } from './src/constants/paths'

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      ...paths.reduce((acc, cur) => ({
        ...acc,
        [cur] : `/${cur == 'src' ? cur : "src/" + cur }`
      }), ""),

      // components
      ...componentPaths.reduce((acc,cur) => ({
        ...acc,
        [cur] : `/src/components/${cur}`
      }),"")
    }
  }
})
