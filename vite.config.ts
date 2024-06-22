/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@chakra-ui/utils": resolve("packages/utils/src"),
      "@chakra-ui/react": resolve("packages/react/src"),
      "@chakra-ui/hooks": resolve("packages/hooks/src"),
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
