import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset", "@pandacss/preset-base"],
  preflight: true,
  jsxFramework: "react",
  jsxFactory: "chakra",
  jsxStyleProps: "all",
  // Tell Panda that the factory/css/patterns are imported from @chakra-ui/react
  // (the v4 story: users import `chakra`, `css`, `Box` from the package) so it
  // statically extracts `chakra.div bg="red.500"` etc. from those imports.
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
