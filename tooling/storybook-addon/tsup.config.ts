import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/"],
  clean: true,
  external: ["@chakra-ui/storybook-addon"],
  format: ["esm", "cjs"],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
})
