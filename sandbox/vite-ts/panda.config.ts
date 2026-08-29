import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
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
