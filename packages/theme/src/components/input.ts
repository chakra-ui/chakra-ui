import {
  ComponentTheme,
  getColor,
  mode,
  ExtendProps,
} from "@chakra-ui/theme-tools"

export interface InputOptions {
  focusBorderColor?: string
  errorBorderColor?: string
}

type InputProps = ExtendProps<InputOptions>

function getDefaults(props: InputProps) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  }
}

function outline(props: InputProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    Input: {
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
    Addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  }
}

function filled(props: InputProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    Input: {
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
        zIndex: 1,
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
    },
    Addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  }
}

function flushed(props: InputProps) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    Input: {
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
        zIndex: 1,
        borderColor: getColor(theme, fc),
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
    },
    Addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      paddingX: 0,
      bg: "transparent",
    },
  }
}

const unstyled = {
  Input: {
    bg: "transparent",
    paddingX: 0,
    height: "auto",
  },
  Addon: {
    bg: "transparent",
    paddingX: 0,
    height: "auto",
  },
}

const sizes = {
  lg: {
    Input: {
      fontSize: "lg",
      paddingLeft: 4,
      paddingRight: 4,
      height: 12,
      borderRadius: "md",
    },
  },
  md: {
    Input: {
      fontSize: "md",
      paddingLeft: 4,
      paddingRight: 4,
      height: 10,
      borderRadius: "md",
    },
  },
  sm: {
    Input: {
      fontSize: "sm",
      paddingLeft: 3,
      paddingRight: 3,
      height: 8,
      borderRadius: "sm",
    },
  },
}

export type InputTheme = ComponentTheme<InputProps>

const Input = {
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  baseStyle: {
    Input: {
      width: "100%",
      outline: 0,
      position: "relative",
      appearance: "none",
      transition: "all 0.2s",
    },
    Addon: {},
  },
  sizes,
  variants: {
    outline,
    filled,
    flushed,
    unstyled,
  },
}

export const InputSizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

export const InputVariants = {
  outline: "outline",
  filled: "filled",
  flushed: "flushed",
  unstyled: "unstyled",
}

export default Input
