import { defineConfig } from "@pandacss/dev"
import { defaultBaseConfig, defaultConditions } from "../react/src/preset-base"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  utilities: { extend: defaultBaseConfig.utilities },
  conditions: {
    ...defaultConditions,
    hover: {
      "@media (hover: hover)": {
        "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])": "@slot",
      },
    },
  },
  preflight: true,
  jsxFramework: "react",
  include: [],
  outdir: ".",
})
