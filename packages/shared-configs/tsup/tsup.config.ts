import type { Options } from "tsup"

const defaultConfig: Options = {
  name: "tsup",
  target: "node14",
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
  clean: true,
  format: ["esm", "cjs"],
  treeshake: true,
}

export default defaultConfig
