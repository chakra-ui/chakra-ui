/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from "vite"
import { defaultExclude } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@chakra-ui/react": resolve("packages/react/src"),
      "@chakra-ui/charts": resolve("packages/charts/src"),
      compositions: resolve("apps/compositions/src"),
    },
  },
  test: {
    globals: true,
    watch: false,
    environment: "jsdom",
    include: ["**/*test.{ts,tsx}"],
    exclude: [...defaultExclude, "**/dist/**", "**/.claude/**"],
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      include: ["packages"],
    },
    benchmark: {
      include: ["**/*.bench.{ts,tsx}"],
      exclude: [...defaultExclude, "**/dist/**", "**/.claude/**"],
    },
  },
})
