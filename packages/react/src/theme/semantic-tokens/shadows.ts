import { defineSemanticTokens } from "../../styled-system"

export const semanticShadows = defineSemanticTokens.shadows({
  xs: {
    value: {
      _light:
        "0px 1px 2px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 1px 1px {colors.blackAlpha.800}, 0px 0px 1px inset {colors.whiteAlpha.300}",
    },
  },
  sm: {
    value: {
      _light:
        "0px 2px 4px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 2px 4px {colors.blackAlpha.700}, 0px 0px 1px inset {colors.whiteAlpha.400}",
    },
  },
  md: {
    value: {
      _light:
        "0px 4px 8px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 4px 8px {colors.blackAlpha.700}, 0px 0px 1px inset {colors.whiteAlpha.400}",
    },
  },
  lg: {
    value: {
      _light:
        "0px 8px 16px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 8px 16px {colors.blackAlpha.700}, 0px 0px 1px inset {colors.whiteAlpha.400}",
    },
  },
  xl: {
    value: {
      _light:
        "0px 16px 24px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 16px 24px {colors.blackAlpha.700}, 0px 0px 1px inset {colors.whiteAlpha.400}",
    },
  },
  "2xl": {
    value: {
      _light:
        "0px 24px 40px {colors.blackAlpha.300}, 0px 0px 1px {colors.blackAlpha.400}",
      _dark:
        "0px 24px 40px {colors.blackAlpha.700}, 0px 0px 1px inset {colors.whiteAlpha.400}",
    },
  },
  inset: {
    value: {
      _light: "inset 0 0 0 1px {colors.blackAlpha.100}",
      _dark: "inset 0 0 0 1px {colors.whiteAlpha.100}",
    },
  },
})
