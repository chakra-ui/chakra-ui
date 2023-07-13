import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system"

const $bg = cssVar("skip-link-bg")

const baseStyle = defineStyle({
  borderRadius: "md",
  fontWeight: "semibold",
  _focusVisible: {
    boxShadow: "outline",
    padding: "4",
    position: "fixed",
    top: "6",
    insetStart: "6",
    [$bg.variable]: "colors.white",
    _dark: {
      [$bg.variable]: "colors.gray.700",
    },
    bg: $bg.reference,
  },
})

export const skipLinkTheme = defineStyleConfig({
  baseStyle,
})
