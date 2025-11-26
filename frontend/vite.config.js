// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import daisyui from 'daisyui'

// https://vite.dev/config/
export default defineConfig({
  base:'/',
  plugins: [react(),
             
              tailwindcss(),
              ('daisyui'),
        

  ],
 
})