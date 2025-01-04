import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: "styled-system",
  validation: "none",
})
