import { loadingOverlayAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
} from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
  overlay: {
    p: 4,
  },
  text: {},
}

const variantFill: PartsStyleFunction<typeof parts> = (props) => {
  return {
    overlay: {
      bg: mode("whiteAlpha.300", "blackAlpha.300")(props),
    },
  }
}

const variantFullscreen: PartsStyleFunction<typeof parts> = (props) => {
  return {
    overlay: {
      position: "fixed",
      inset: 0,
      bg: mode("white", "gray.800")(props),
      zIndex: "modal",
    },
  }
}

const variantOverlay: PartsStyleFunction<typeof parts> = (props) => {
  return {
    overlay: {
      position: "absolute",
      inset: 0,
      bg: mode("whiteAlpha.300", "blackAlpha.300")(props),
    },
  }
}

export default {
  parts: parts.keys,
  defaultProps: {
    variant: "fill",
  },
  baseStyle,
  variants: {
    fill: variantFill,
    fullscreen: variantFullscreen,
    overlay: variantOverlay,
  },
}
