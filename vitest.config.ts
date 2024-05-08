import { resolve } from "path"
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
    alias: {
      "@chakra-ui/utils": resolve("packages/utils/src"),
      "@chakra-ui/react": resolve("packages/react/src"),
      "@chakra-ui/hooks": resolve("packages/hooks/src"),
    },
  },
})
