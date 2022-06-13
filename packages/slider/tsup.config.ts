import { defineConfig } from "tsup"
import defaultConfig from "../shared-configs/tsup/tsup.config"

export default defineConfig({
  ...defaultConfig,
  dts: true,
  entry: {
    index: "src/index.ts",
    slider: "src/slider.tsx",
    "use-slider": "src/use-slider.ts",
    "use-range-slider": "src/use-range-slider.ts",
    "slider-utils": "src/slider-utils.ts",
  },
})
