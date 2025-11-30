


// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'
// import daisyui from 'daisyui'

// // https://vite.dev/config/
// export default defineConfig({
//   base:'/',
//   plugins: [react(),
             
//               tailwindcss(),
//               ('daisyui'),
        

//   ],
 
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import daisyui from 'daisyui'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'https://languagelearningplatform.onrender.com/signup',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../backend/frontend/dist'
  }
})
