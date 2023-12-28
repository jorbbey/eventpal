import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [ react() ],
  css: {
    postcss: './postcss.config.js', // Use the PostCSS config file
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://app.ticketmaster.com',
  //       changeOrigin: true,
  //       rewrite: ( path ) => path.replace( /^\/api/, '' ),
  //     },
  //   },
  // },
} )
