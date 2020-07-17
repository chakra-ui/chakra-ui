import { BaseStyle, mode } from "@chakra-ui/theme-tools"

const register = {
  parts: ["errorText", "requiredIndicator", "helperText", "errorIcon"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  return {
    errorText: {
      color: mode("red.500", "red.300")(props),
      marginTop: 2,
      fontSize: "sm",
    },
    requiredIndicator: {
      marginLeft: 1,
      color: mode("red.500", "red.300")(props),
    },
    helperText: {
      marginTop: 2,
      color: mode("gray.500", "whiteAlpha.600")(props),
      lineHeight: "normal",
      fontSize: "sm",
    },
    errorIcon: {
      marginRight: "0.5em",
      color: mode("red.500", "red.300")(props),
    },
  }
}

const form = {
  register,
  baseStyle,
}

export default form
