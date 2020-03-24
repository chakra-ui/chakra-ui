import { ComponentTheme, mode } from "./utils"

const Checkbox: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => {
    const { colorScheme: c } = props
    return {
      transition: "background-color 120ms, box-shadow 250ms",
      border: "2px solid",
      borderRadius: "md",
      borderColor: "inherit",
      color: "white",
      _checked: {
        bg: mode(`${c}.500`, `${c}.200`)(props),
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
        color: mode("white", "gray.900")(props),
        _hover: {
          bg: mode(`${c}.600`, `${c}.300`)(props),
          borderColor: mode(`${c}.600`, `${c}.300`)(props),
        },
        _disabled: {
          borderColor: mode("gray.200", "transparent")(props),
          bg: mode("gray.200", "whiteAlpha.300")(props),
          color: mode("gray.500", "whiteAlpha.500")(props),
        },
      },
      _indeterminate: {
        bg: mode(`${c}.500`, `${c}.200`)(props),
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
        color: mode("white", "gray.900")(props),
      },
      _disabled: {
        bg: mode("gray.100", "whiteAlpha.100")(props),
        borderColor: mode("gray.100", "transparent")(props),
      },
      _focus: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: mode("red.500", "red.300")(props),
      },
    }
  },
  sizes: {
    lg: { width: 5, height: 5 },
    md: { width: 4, height: 4 },
    sm: { height: "auto", width: "auto" },
  },
}

export default Checkbox
