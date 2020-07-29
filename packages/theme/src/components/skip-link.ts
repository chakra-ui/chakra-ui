import { mode, styleConfig } from "@chakra-ui/theme-tools"

// @ts-ignore
const baseStyle = function (props) {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      bg: mode("white", "gray.700")(props),
    },
  }
}

const skipLink = styleConfig({
  baseStyle,
})

export const skipLinkStyles = {
  baseStyle,
}

export default skipLink
