import { type Options, defineConfig } from "tsup"
import { getEntrypoints } from "./entrypoints"

const defaultConfig: Options = {
  name: "tsup",
  target: "node14",
  dts: true,
  clean: true,
  format: ["esm", "cjs"],
}

export const getTsupConfig = (overrideConfig?: Options) => {
  const cwd = process.cwd()
  return defineConfig({
    ...defaultConfig,
    entry: getEntrypoints(cwd),
    ...overrideConfig,
  })
}
