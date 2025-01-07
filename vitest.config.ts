/// <reference types="vitest" />

import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

// https://vite.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/testing/setup-tests.ts",
      exclude: ["**/node_modules/**", "**/e2e/**"],
      coverage: {
        include: ["src/**"],
      },
    },
  })
)
