import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webSpatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webSpatial(),
    createHtmlPlugin({
      inject: {
        data: {
          XR_ENV: process.env.XR_ENV,
          XR_ENV_BASE: process.env.XR_ENV === 'visionos' ? '/spatial' : '',
        },
      },
    }),  
  ],
  define: {
    __XR_ENV_BASE__: JSON.stringify(process.env.XR_ENV === 'visionos' ? '/spatial' : ''),
  },
})
