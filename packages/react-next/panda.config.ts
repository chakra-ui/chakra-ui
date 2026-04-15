import chakraPreset from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: [
    "./src/**/*.{ts,tsx}",
    "./__stories__/**/*.{ts,tsx}",
    "../../apps/compositions-next/src/**/*.{ts,tsx}",
  ],
  presets: [chakraPreset],
  jsxFramework: "react",
  jsxStyleProps: "all",
  staticCss: { recipes: "*" },
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            "50": { value: "#eff0ff" },
            "100": { value: "#d9dbff" },
            "200": { value: "#b3b7ff" },
            "300": { value: "#8d93ff" },
            "400": { value: "#676fff" },
            "500": { value: "#414bff" },
            "600": { value: "#3038cc" },
            "700": { value: "#202599" },
            "800": { value: "#101266" },
            "900": { value: "#080933" },
            "950": { value: "#04041a" },
          },
        },
      },
      semanticTokens: {
        colors: {
          "brand.solid": {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.200}",
            },
          },
          "brand.contrast": {
            value: { _light: "{colors.white}", _dark: "{colors.brand.900}" },
          },
          "brand.muted": {
            value: { _light: "{colors.brand.50}", _dark: "{colors.brand.950}" },
          },
        },
      },
    },
  },
  outdir: "../styled-system-next",
  importMap: "@chakra-ui/styled-system",
  jsxFactory: "chakra",
})
