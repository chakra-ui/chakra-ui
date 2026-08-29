import { defaultBaseConfig, defaultConditions } from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

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
