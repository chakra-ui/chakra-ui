import { defineSemanticTokens } from "../../styled-system"

export const semanticShadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light:
        "0px 1px 2px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/20}",
      _dark: "0px 1px 1px {black/64}, 0px 0px 1px inset {colors.gray.300/20}",
    },
  },
  sm: {
    value: {
      _light:
        "0px 2px 4px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
      _dark: "0px 2px 4px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
    },
  },
  md: {
    value: {
      _light:
        "0px 4px 8px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
      _dark: "0px 4px 8px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
    },
  },
  lg: {
    value: {
      _light:
        "0px 8px 16px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
      _dark: "0px 8px 16px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
    },
  },
  xl: {
    value: {
      _light:
        "0px 16px 24px {colors.gray.900/10}, 0px 0px 1px {colors.gray.900/30}",
      _dark: "0px 16px 24px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
    },
  },
  "2xl": {
    value: {
      _light:
        "0px 24px 40px {colors.gray.900/16}, 0px 0px 1px {colors.gray.900/30}",
      _dark: "0px 24px 40px {black/64}, 0px 0px 1px inset {colors.gray.300/30}",
    },
  },
  inner: {
    value: {
      _light: "inset 0 2px 4px 0 {black/5}",
      _dark: "inset 0 2px 4px 0 black",
    },
  },
  inset: {
    value: {
      _light: "inset 0 0 0 1px {black/5}",
      _dark: "inset 0 0 0 1px {colors.gray.300/5}",
    },
  },
})
