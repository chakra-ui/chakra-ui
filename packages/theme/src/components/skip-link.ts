import { ComponentTheme, mode, BaseStyle } from "@chakra-ui/theme-tools"

const register = {
  parts: ["link"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    link: {
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
    },
  }
}

const skipLink = {
  register,
  baseStyle,
}

export default skipLink
