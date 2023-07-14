import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  entry: ["src"],
  clean: true,
  external: ["@chakra-ui/storybook-addon"],
  format: ["esm", "cjs"],
  dts: {
    resolve: true,
  },
  treeshake: "recommended",
  sourcemap: true,
  splitting: false,
  minify: !options.watch,
  platform: "browser",
}))
