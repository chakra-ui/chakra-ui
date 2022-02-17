import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { getColor } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
  },
}

const size: Record<string, SystemStyleObject> = {
  lg: {
    fontSize: "lg",
    px: 4,
    h: 12,
    borderRadius: "md",
  },

  md: {
    fontSize: "md",
    px: 4,
    h: 10,
    borderRadius: "md",
  },

  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "sm",
  },

  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm",
  },
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
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
  xs: {
    field: size.xs,
    addon: size.xs,
  },
}

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColorLight: fc || "blue.500",
    errorBorderColorLight: ec || "red.500",
    focusBorderColorDark: fc || "blue.300",
    errorBorderColorDark: ec || "red.300",
  }
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props
  const {
    focusBorderColorLight: fcL,
    errorBorderColorLight: ecL,
    focusBorderColorDark: fcD,
    errorBorderColorDark: ecD,
  } = getDefaults(props)

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        _light: {
          borderColor: "gray.300",
        },

        _dark: {
          borderColor: "whiteAlpha.400",
        },
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        _light: {
          borderColor: getColor(theme, ecL),
          boxShadow: `0 0 0 1px ${getColor(theme, ecL)}`,
        },
        _dark: {
          borderColor: getColor(theme, ecD),
          boxShadow: `0 0 0 1px ${getColor(theme, ecD)}`,
        },
      },
      _focus: {
        zIndex: 1,
        _light: {
          borderColor: getColor(theme, fcL),
          boxShadow: `0 0 0 1px ${getColor(theme, fcL)}`,
        },
        _dark: {
          borderColor: getColor(theme, fcD),
          boxShadow: `0 0 0 1px ${getColor(theme, fcD)}`,
        },
      },
    },
    addon: {
      border: "1px solid",
      _light: {
        borderColor: "inherit",
        bg: "gray.100",
      },
      _dark: {
        borderColor: "whiteAlpha.50",
        bg: "whiteAlpha.300",
      },
    },
  }
}

const variantFilled: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props

  const {
    focusBorderColorLight: fcL,
    errorBorderColorLight: ecL,
    focusBorderColorDark: fcD,
    errorBorderColorDark: ecD,
  } = getDefaults(props)

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",

      _hover: {
        _light: {
          bg: "gray.200",
        },

        _dark: {
          bg: "whiteAlpha.100",
        },
      },

      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },

      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },

      _invalid: {
        _light: {
          borderColor: getColor(theme, ecL),
        },
        _dark: {
          borderColor: getColor(theme, ecD),
        },
      },

      _focus: {
        bg: "transparent",
        _light: {
          borderColor: getColor(theme, fcL),
        },
        _dark: {
          borderColor: getColor(theme, fcD),
        },
      },

      _light: {
        bg: "gray.100",
      },

      _dark: {
        bg: "whiteAlpha.50",
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",

      _light: {
        bg: "gray.100",
      },

      _dark: {
        bg: "whiteAlpha.50",
      },
    },
  }
}

const variantFlushed: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props
  const {
    focusBorderColorLight: fcL,
    errorBorderColorLight: ecL,
    focusBorderColorDark: fcD,
    errorBorderColorDark: ecD,
  } = getDefaults(props)

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        _light: {
          borderColor: getColor(theme, ecL),
          boxShadow: `0px 1px 0px 0px ${getColor(theme, ecL)}`,
        },
        _dark: {
          borderColor: getColor(theme, ecD),
          boxShadow: `0px 1px 0px 0px ${getColor(theme, ecD)}`,
        },
      },
      _focus: {
        _light: {
          borderColor: getColor(theme, fcL),
          boxShadow: `0px 1px 0px 0px ${getColor(theme, fcL)}`,
        },
        _dark: {
          borderColor: getColor(theme, fcD),
          boxShadow: `0px 1px 0px 0px ${getColor(theme, fcD)}`,
        },
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
    },
  }
}

const variantUnstyled: PartsStyleObject<typeof parts> = {
  field: {
    bg: "transparent",
    px: 0,
    height: "auto",
  },
  addon: {
    bg: "transparent",
    px: 0,
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
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
