import mergeWith from "lodash.mergeWith"
import { defineConfig } from "tsup"
import defaultConfig from "../shared-configs/tsup/tsup.config"

export default defineConfig(
  mergeWith(defaultConfig, {
    dts: {
      entry: "src/index.tsx",
    },
  }),
)
