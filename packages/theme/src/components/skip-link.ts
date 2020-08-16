import { mode } from "@chakra-ui/theme-tools"

const baseStyle = function (props: Record<string, any>) {
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

const skipLink = {
  baseStyle,
}

export default skipLink
