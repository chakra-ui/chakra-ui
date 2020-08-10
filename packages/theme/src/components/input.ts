import { getColor, mode, multiStyleConfig } from "@chakra-ui/theme-tools"

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

const parts = {
  field: "the input field itself",
  addon: "the left and right input addon",
}

const size = {
  lg: {
    fontSize: "lg",
    pl: 4,
    paddingRight: 4,
    h: 12,
    borderRadius: "md",
  },

  md: {
    fontSize: "md",
    pl: 4,
    paddingRight: 4,
    h: 10,
    borderRadius: "md",
  },

  sm: {
    fontSize: "sm",
    pl: 3,
    paddingRight: 3,
    h: 8,
    borderRadius: "sm",
  },
}

const baseStyle = {
  field: {
    width: "100%",
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s",
  },
}

const sizes = {
  lg: {
    field: size.lg,
    addon: size.lg,
  },
  md: {
    field: size.md,
    addon: size.md,
  },
  sm: {
    field: size.sm,
    addon: size.sm,
  },
}

const variantOutline = function (props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("white", "whiteAlpha.100")(props),
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.200")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  }
}

const variantFilled = function (props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
}

const variantFlushed = function (props: Record<string, any>) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _focus: {
        borderColor: getColor(theme, fc),
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      bg: "transparent",
    },
  }
}

const variantUnstyled = {
  field: {
    bg: "transparent",
    paddingX: 0,
    height: "auto",
  },
  addon: {
    bg: "transparent",
    paddingX: 0,
    height: "auto",
  },
}

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
}

const defaultProps = {
  size: "md",
  variant: "outline",
} as const

const input = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
})

export const inputStyles = {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}

export default input
