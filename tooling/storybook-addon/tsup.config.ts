import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/"],
  clean: true,
  external: ["@chakra-ui/storybook-addon"],
  format: ["esm", "cjs"],
  inject: ["../../react-shim.js"],
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
})
