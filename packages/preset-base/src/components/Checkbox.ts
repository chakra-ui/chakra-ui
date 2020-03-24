import { Props, getModeColor as get, ComponentTheme } from "./utils"

const Checkbox: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: (props: any) => {
    const { colorScheme: c } = props
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "top",
      transition: "background-color 120ms, box-shadow 250ms",
      flexShrink: 0,
      userSelect: "none",
      border: "2px solid",
      borderRadius: "md",
      borderColor: "inherit",
      color: "white",
      _checked: {
        bg: get(props, `${c}.500`, `${c}.200`),
        borderColor: get(props, `${c}.500`, `${c}.200`),
        color: get(props, "white", "gray.900"),
        _hover: {
          bg: get(props, `${c}.600`, `${c}.300`),
          borderColor: get(props, `${c}.600`, `${c}.300`),
        },
        _disabled: {
          borderColor: get(props, "gray.200", "transparent"),
          bg: get(props, "gray.200", "whiteAlpha.300"),
          color: get(props, "gray.500", "whiteAlpha.500"),
        },
      },
      _indeterminate: {
        bg: get(props, `${c}.500`, `${c}.200`),
        borderColor: get(props, `${c}.500`, `${c}.200`),
        color: get(props, "white", "gray.900"),
      },
      _disabled: {
        bg: get(props, "gray.100", "whiteAlpha.100"),
        borderColor: get(props, "gray.100", "transparent"),
      },
      _focus: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: get(props, "red.500", "red.300"),
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
