import { type Options, defineConfig } from "tsup"
// import { getEntrypoints } from "./entrypoints"

const defaultConfig: Options = {
  name: "tsup",
  target: "node14",
  dts: true,
  clean: true,
  format: ["esm", "cjs"],
}

export const getTsupConfig = (overrideConfig?: Options) => {
  // const cwd = process.cwd()
  // const entries = getEntrypoints(cwd)

  return defineConfig({ ...defaultConfig, ...overrideConfig })
}
