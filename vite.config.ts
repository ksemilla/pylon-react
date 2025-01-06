/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.indexOf("node_modules") !== -1) {
            const basic = id.toString().split("node_modules/")[1]
            const sub1 = basic.split("/")[0]
            if (sub1 !== ".pnpm") {
              return sub1.toString()
            }
            const name = basic.split("/")[1]
            return name.split("@")[name[0] === "@" ? 1 : 0].toString()
          }
        },
      },
    },
  },
})
