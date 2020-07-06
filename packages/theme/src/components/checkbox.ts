import { BaseStyle, DefaultProps, mode, Sizes } from "@chakra-ui/theme-tools"

const register = {
  parts: ["control", "label", "description", "icon"],
  sizes: ["sm", "md", "lg"],
} as const

const baseStyle: BaseStyle<typeof register> = (props) => {
  const { colorScheme: c } = props
  return {
    control: {
      width: "100%",
      transition: "box-shadow 250ms",
      border: "2px solid",
      borderRadius: "sm",
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
      _focus: { boxShadow: "outline" },
      _invalid: { borderColor: mode("red.500", "red.300")(props) },
    },
    label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },
    icon: {
      width: "0.625rem",
      height: "0.625rem",
      color: "currentColor",
      transition: "transform 240ms, opacity 240ms",
    },
  }
}

const sizes: Sizes<typeof register> = {
  sm: {
    control: { height: 3, width: 3 },
    label: { fontSize: "sm" },
  },
  md: {
    control: { width: 4, height: 4 },
    label: { fontSize: "md" },
  },
  lg: {
    control: { width: 5, height: 5 },
    label: { fontSize: "lg" },
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
  colorScheme: "blue",
}

const checkbox = {
  defaultProps,
  baseStyle,
  sizes,
}

export default checkbox
