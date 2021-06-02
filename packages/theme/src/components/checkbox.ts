import { mode } from "@chakra-ui/theme-tools"

const parts = ["container", "control", "label", "icon"]

function baseStyleControl(props: Record<string, any>) {
  const { colorScheme: c } = props

  return {
    w: "100%",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
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

    _focus: {
      boxShadow: "outline",
    },

    _invalid: {
      borderColor: mode("red.500", "red.300")(props),
    },
  }
}

const baseStyleLabel = {
  userSelect: "none",
  _disabled: { opacity: 0.4 },
}

const baseStyleIcon = {
  transitionProperty: "transform",
  transitionDuration: "normal",
}

const baseStyle = (props: Record<string, any>) => ({
  icon: baseStyleIcon,
  control: baseStyleControl(props),
  label: baseStyleLabel,
})

const sizes = {
  sm: {
    control: { h: 3, w: 3 },
    label: { fontSize: "sm" },
    icon: { fontSize: "0.45rem" },
  },
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: "md" },
    icon: { fontSize: "0.625rem" },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: "lg" },
    icon: { fontSize: "0.625rem" },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

export default {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}
