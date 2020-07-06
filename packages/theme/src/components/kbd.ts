import { BaseStyle, mode } from "@chakra-ui/theme-tools"

const register = {
  parts: ["kbd"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    kbd: {
      bg: mode("gray.100", "whiteAlpha")(props),
      borderRadius: "md",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      fontSize: "0.8em",
      fontWeight: "bold",
      lineHeight: "normal",
      px: "0.4em",
      whiteSpace: "nowrap",
    },
  }
}

const kbd = {
  register,
  baseStyle,
}

export default kbd
