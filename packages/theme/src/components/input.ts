import {
  BaseStyle,
  DefaultProps,
  getColor,
  mode,
  Sizes,
  Variants,
} from "@chakra-ui/theme-tools"

const register = {
  parts: ["field", "addon"],
  sizes: ["sm", "md", "lg"],
  variants: ["outline", "flushed", "filled", "unstyled"],
} as const

const baseStyle: BaseStyle<typeof register> = {
  field: {
    width: "100%",
    outline: 0,
    position: "relative",
    appearance: "none",
    transition: "all 0.2s",
  },
}

const commonSizeStyle = {
  lg: {
    fontSize: "lg",
    paddingLeft: 4,
    paddingRight: 4,
    height: 12,
    borderRadius: "md",
  },

  md: {
    fontSize: "md",
    paddingLeft: 4,
    paddingRight: 4,
    height: 10,
    borderRadius: "md",
  },

  sm: {
    fontSize: "sm",
    paddingLeft: 3,
    paddingRight: 3,
    height: 8,
    borderRadius: "sm",
  },
}

const sizes: Sizes<typeof register> = {
  lg: {
    field: commonSizeStyle.lg,
    addon: commonSizeStyle.lg,
  },
  md: {
    field: commonSizeStyle.md,
    addon: commonSizeStyle.md,
  },
  sm: {
    field: commonSizeStyle.sm,
    addon: commonSizeStyle.sm,
  },
}

const variants: Variants<typeof register> = {
  outline(props) {
    const { theme } = props
    const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

    return {
      field: {
        border: "1px solid",
        borderColor: mode("inherit", "whiteAlpha.50")(props),
        bg: mode("white", "whiteAlpha.100")(props),
        _hover: { borderColor: mode("gray.300", "whiteAlpha.200")(props) },
        _readOnly: { boxShadow: "none !important", userSelect: "all" },
        _disabled: { opacity: 0.4, cursor: "not-allowed" },
        _focus: {
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
  },

  filled(props) {
    const { theme } = props
    const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

    return {
      field: {
        border: "2px solid",
        borderColor: "transparent",
        bg: mode("gray.100", "whiteAlpha.50")(props),
        _hover: { bg: mode("gray.200", "whiteAlpha.100")(props) },
        _readOnly: { boxShadow: "none !important", userSelect: "all" },
        _disabled: { opacity: 0.4, cursor: "not-allowed" },
        _focus: {
          bg: "transparent",
          borderColor: getColor(theme, fc),
        },
        _invalid: { borderColor: getColor(theme, ec) },
      },
      addon: {
        border: "2px solid",
        borderColor: "transparent",
        bg: mode("gray.100", "whiteAlpha.50")(props),
      },
    }
  },

  flushed(props) {
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
  },

  unstyled: {
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
  },
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
  variant: "outline",
}

const input = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default input

interface InputOptions {
  focusBorderColor?: string
  errorBorderColor?: string
}

function getDefaults(props: InputOptions) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}
