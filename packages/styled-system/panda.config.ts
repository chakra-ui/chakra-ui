import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  preflight: true,
  jsxFramework: "react",
  include: [],
  outdir: ".",
})
