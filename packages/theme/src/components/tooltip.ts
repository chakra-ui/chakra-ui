import { mode } from "@chakra-ui/theme-tools"

function baseStyle(props: Record<string, any>) {
  return {
    px: "8px",
    py: "2px",
    bg: mode("gray.700", "gray.300")(props),
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
    zIndex: "tooltip",
  }
}

export default {
  baseStyle,
}
