import { tabsAnatomy as parts } from "@chakra-ui/anatomy"
import type {
  PartsStyleFunction,
  PartsStyleInterpolation,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools"
import { getColor } from "@chakra-ui/theme-tools"

const baseStyleRoot: SystemStyleFunction = (props) => {
  const { orientation } = props
  return {
    display: orientation === "vertical" ? "flex" : "block",
  }
}

const baseStyleTab: SystemStyleFunction = (props) => {
  const { isFitted } = props

  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      zIndex: 1,
      boxShadow: "outline",
    },
  }
}

const baseStyleTablist: SystemStyleFunction = (props) => {
  const { align = "start", orientation } = props

  const alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start",
  }

  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row",
  }
}

const baseStyleTabpanel: SystemStyleObject = {
  p: 4,
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  root: baseStyleRoot(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel,
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm",
    },
  },
  md: {
    tab: {
      fontSize: "md",
      py: 2,
      px: 4,
    },
  },
  lg: {
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4,
    },
  },
}

const variantLine: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, orientation } = props
  const isVertical = orientation === "vertical"
  const borderProp = orientation === "vertical" ? "borderStart" : "borderBottom"
  const marginProp = isVertical ? "marginStart" : "marginBottom"

  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit",
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "-2px",
      _selected: {
        borderColor: "currentColor",

        _light: {
          color: `${c}.600`,
        },

        _dark: {
          color: `${c}.300`,
        },
      },
      _active: {
        _light: {
          bg: "gray.200",
        },

        _dark: {
          bg: "whiteAlpha.300",
        },
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }
}

const variantEnclosed: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        borderColor: "inherit",
        _light: {
          color: `${c}.600`,
          borderBottomColor: `white`,
        },
        _dark: {
          color: `${c}.300`,
          borderBottomColor: `gray.800`,
        },
      },
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

const variantEnclosedColored: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      mb: "-1px",

      _notLast: {
        marginEnd: "-1px",
      },

      _selected: {
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
        _light: {
          bg: "#fff",
          color: `${c}.600`,
        },
        _dark: {
          bg: "gray.800",
          color: `${c}.300`,
        },
      },

      _light: {
        bg: `gray.50`,
      },

      _dark: {
        bg: `whiteAlpha.50`,
      },
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

const variantSoftRounded: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c, theme } = props
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, `${c}.700`),
        bg: getColor(theme, `${c}.100`),
      },
    },
  }
}

const variantSolidRounded: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",

      _selected: {
        _light: {
          color: `#fff`,
          bg: `${c}.600`,
        },
        _dark: {
          color: "gray.800",
          bg: `${c}.300`,
        },
      },

      _light: {
        color: "gray.600",
      },

      _dark: {
        color: "inherit",
      },
    },
  }
}

const variantUnstyled: PartsStyleObject<typeof parts> = {}

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled,
}

const defaultProps = {
  size: "md",
  variant: "line",
  colorScheme: "blue",
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
