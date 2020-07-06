import { BaseStyle, mode } from "@chakra-ui/theme-tools"

const register = {
  parts: ["arrow", "container"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    container: {
      paddingX: "8px",
      paddingY: "2px",
      bg: mode(`gray.700`, `gray.300`)(props),
      color: mode(`whiteAlpha.900`, `gray.900`)(props),
      borderRadius: "sm",
      fontWeight: "medium",
      pointerEvents: "none",
      fontSize: "sm",
      boxShadow: "md",
      maxWidth: "320px",
    },
  }
}

const tooltip = {
  register,
  baseStyle,
}

export default tooltip
