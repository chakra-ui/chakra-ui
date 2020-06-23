import { ComponentTheme, mode } from "@chakra-ui/theme-tools"

const Form: ComponentTheme = {
  baseStyle: (props) => ({
    Label: {
      fontSize: "md",
      marginRight: 3,
      marginBottom: 2,
      fontWeight: "medium",
      transition: "all 0.2s",
      opacity: 1,
      _disabled: {
        opacity: 0.4,
      },
    },
    ErrorText: {
      color: mode("red.500", "red.300")(props),
      marginTop: 2,
      fontSize: "sm",
    },
    RequiredIndicator: {
      marginLeft: 1,
      color: mode("red.500", "red.300")(props),
    },
    HelperText: {
      marginTop: 2,
      color: mode("gray.500", "whiteAlpha.600")(props),
      lineHeight: "normal",
      fontSize: "sm",
    },
    ErrorIcon: {
      marginRight: "0.5em",
      color: mode("red.500", "red.300")(props),
    },
  }),
}

export default Form
