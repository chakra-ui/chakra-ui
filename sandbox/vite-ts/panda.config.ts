import { defaultBaseConfig } from "@chakra-ui/react/preset-base"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  utilities: { extend: defaultBaseConfig.utilities },
  conditions: {
    ...defaultBaseConfig.conditions,
    hover: {
      "@media (hover: hover)": {
        "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])": "@slot",
      },
    },
  },
  preflight: true,
  jsxFramework: "react",
  jsxFactory: "chakra",
  jsxStyleProps: "all",
  importMap: {
    css: "@chakra-ui/react",
    recipes: "@chakra-ui/react",
    patterns: "@chakra-ui/react",
    jsx: "@chakra-ui/react",
  },
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
})
