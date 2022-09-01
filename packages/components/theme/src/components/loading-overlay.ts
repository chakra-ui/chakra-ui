import { loadingOverlayAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

import { mode } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {
    p: 4,
  },
  text: {},
})

const variantFill = definePartsStyle((props) => {
  return {
    overlay: {
      bg: mode("whiteAlpha.400", "blackAlpha.400")(props),
    },
  }
})

const variantFullscreen = definePartsStyle((props) => {
  return {
    overlay: {
      position: "fixed",
      inset: 0,
      bg: mode("white", "gray.800")(props),
      zIndex: "modal",
    },
  }
})

const variantOverlay = definePartsStyle((props) => {
  return {
    overlay: {
      position: "absolute",
      inset: 0,
      bg: mode("whiteAlpha.400", "blackAlpha.400")(props),
    },
  }
})

export const loadingOverlayTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: "fill",
  },
  baseStyle,
  variants: {
    fill: variantFill,
    fullscreen: variantFullscreen,
    overlay: variantOverlay,
  },
})
