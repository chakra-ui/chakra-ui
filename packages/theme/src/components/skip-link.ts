import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const baseStyle = defineStyle((props) => ({
  borderRadius: "md",
  fontWeight: "semibold",
  _focusVisible: {
    boxShadow: "outline",
    padding: "1rem",
    position: "fixed",
    top: "6",
    insetStart: "6",
    bg: mode("white", "gray.700")(props),
  },
}))

export const skipLinkTheme = defineStyleConfig({
  baseStyle,
})
