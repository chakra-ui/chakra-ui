import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/preset/index.ts",
    "src/preset/decorators.ts",
    "src/preset/register.ts",
  ],
  clean: true,
  external: ["@chakra-ui/storybook-addon"],
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".mjs" }
  },
})
