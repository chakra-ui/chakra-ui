/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from "vite"

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
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      provider: "v8",
      include: ["packages/react/src/**/*.{ts,tsx}"],
      exclude: [
        "**/__tests__/**",
        "**/*.test.{ts,tsx}",
        "**/*.bench.{ts,tsx}",
        "**/index.ts",
        "**/namespace.ts",
        "**/*.d.ts",
        "**/theme/**",
        "**/preset*.ts",
        "**/anatomy.ts",
      ],
      thresholds: {
        statements: 60,
        branches: 55,
        functions: 60,
        lines: 60,
      },
      reporter: ["text", "html", "lcov", "json"],
      reportsDirectory: "./coverage",
    },
    benchmark: {
      include: ["**/*.bench.{ts,tsx}"],
      exclude: ["node_modules", "dist"],
    },
  },
})
