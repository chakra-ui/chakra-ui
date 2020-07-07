import {
  Props,
  mode,
  ComponentTheme,
  StyleObject,
  getColor,
} from "@chakra-ui/theme-tools/src"

function line(props: Props) {
  const { colorScheme: c } = props
  return {
    TabList: {
      borderBottom: "2px solid",
      borderColor: "inherit",
    },
    Tab: {
      borderBottom: "2px solid",
      borderColor: "transparent",
      marginBottom: "-2px",
      _selected: {
        color: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: "currentColor",
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }
}

function enclosed(props: Props) {
  const { colorScheme: c } = props
  return {
    Tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      marginBottom: "-1px",
      _selected: {
        color: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: "inherit",
        borderBottomColor: mode(`white`, `gray.800`)(props),
      },
    },
    TabList: {
      marginBottom: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

function enclosedColored(props: Props) {
  const { colorScheme: c } = props
  return {
    Tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode(`gray.50`, `whiteAlpha.50`)(props),
      marginBottom: "-1px",
      _notLast: {
        mr: "-1px",
      },
      _selected: {
        bg: mode(`#fff`, "gray.800")(props),
        color: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
    },
    TabList: {
      marginBottom: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

function softRounded(props: any): StyleObject {
  const { colorScheme: c, theme } = props
  return {
    Tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, `${c}.700`),
        bg: getColor(theme, `${c}.100`),
      },
    },
    TabList: {},
  }
}

function solidRounded(props: Props): StyleObject {
  const { colorScheme: c } = props
  return {
    Tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode(`#fff`, "gray.800")(props),
        bg: mode(`${c}.600`, `${c}.300`)(props),
      },
    },
    TabList: {},
  }
}

const Tabs: ComponentTheme = {
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue",
  },
  baseStyle: {
    Tab: {
      transition: "all 0.2s",
      _focus: {
        zIndex: 1,
        boxShadow: "outline",
      },
    },
    TabList: {},
    TabPanel: {
      padding: 4,
    },
  },
  sizes: {
    sm: {
      Tab: {
        paddingY: "0.25rem",
        paddingX: "1rem",
        fontSize: "0.85rem",
      },
    },
    md: {
      Tab: {
        fontSize: "1rem",
        paddingY: "0.5rem",
        paddingX: "1rem",
      },
    },
    lg: {
      Tab: {
        fontSize: "1.15rem",
        paddingY: "0.75rem",
        paddingX: "1rem",
      },
    },
  },
  variants: {
    line: line,
    enclosed: enclosed,
    "soft-rounded": softRounded,
    "enclosed-colored": enclosedColored,
    "solid-rounded": solidRounded,
    unstyled: {},
  },
}

export const TabSizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
}

export const TabVariants = {
  line: "line",
  enclosed: "enclosed",
  "soft-rounded": "soft-rounded",
  "enclosed-colored": "enclosed-colored",
  "solid-rounded": "solid-rounded",
  unstyled: "unstyled",
}

export default Tabs
