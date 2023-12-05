import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  entry: ["src"],
  clean: true,
  external: ["@chakra-ui/storybook-addon"],
  format: ["esm", "cjs"],
  treeshake: "recommended",
  sourcemap: true,
  splitting: false,
  minify: !options.watch,
  platform: "browser",
}))
