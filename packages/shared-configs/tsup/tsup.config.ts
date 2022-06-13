import type { Options } from "tsup"

const defaultConfig: Options = {
  name: "tsup",
  target: "node14",
  dts: {
    resolve: true,
    // build types for `src/index.ts` only
    // otherwise `Options` will not be exported by `tsup`,
    // not sure how this happens, probably a bug in rollup-plugin-dts
    entry: "./src/index.ts",
  },
  clean: true,
  sourcemap: true,
  external: ["react"],
  format: ["esm", "cjs"],
  treeshake: true,
}

export default defaultConfig
