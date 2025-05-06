/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@sh3yk0-ui/react": resolve("packages/react/src"),
      "@sh3yk0-ui/charts": resolve("packages/charts/src"),
      compositions: resolve("apps/compositions/src"),
    },
  },
  test: {
    globals: true,
    watch: false,
    environment: "jsdom",
    include: ["**/*test.{ts,tsx}"],
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      include: ["packages"],
    },
  },
})
