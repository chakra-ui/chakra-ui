import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@pandacss/preset-base", "@chakra-ui/panda-preset"],
  preflight: true,
  jsxFramework: "react",
  include: [],
  outdir: "styled-system-panda",
  optimize: { removeUnusedTokens: true, removeUnusedKeyframes: true },
})
