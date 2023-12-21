import { defineConfig } from "vitest/config"

export default defineConfig({
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
  resolve: {
    conditions: ["source"],
  },
})
