import { resolve } from "node:path"
import { realpathSync } from "node:fs"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  cacheDir: "../.vite-cache",
  server: {
    fs: {
      allow: [resolve(import.meta.dirname, ".."), realpathSync(resolve(import.meta.dirname, "node_modules"))],
    },
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../demo",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
})
