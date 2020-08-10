import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const form = multiStyleConfig({
  parts: {
    errorText: "the error message",
    errorIcon: "the error icon",
    requiredIndicator: "the requied asterisks",
    helperText: "the helper text",
  },
  baseStyle: function (props) {
    return {
      errorText: {
        color: mode("red.500", "red.300")(props),
        mt: 2,
        fontSize: "sm",
      },
      requiredIndicator: {
        ml: 1,
        color: mode("red.500", "red.300")(props),
      },
      helperText: {
        mt: 2,
        color: mode("gray.500", "whiteAlpha.600")(props),
        lineHeight: "normal",
        fontSize: "sm",
      },
      errorIcon: {
        mr: "0.5em",
        color: mode("red.500", "red.300")(props),
      },
    }
  },
})

export default form
