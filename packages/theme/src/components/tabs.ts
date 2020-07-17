import {
  BaseStyle,
  DefaultProps,
  getColor,
  mode,
  Sizes,
  Variants,
  Props,
} from "@chakra-ui/theme-tools"

const register = {
  orientation: ["horizontal", "vertical"],
  parts: ["tablist", "tab", "tabpanel", "indicator"],
  sizes: ["sm", "md", "lg"],
  variants: [
    "line",
    "enclosed",
    "soft-rounded",
    "enclosed-colored",
    "solid-rounded",
    "unstyled",
  ],
} as const

const alignments = {
  end: "flex-end",
  center: "center",
  start: "flex-start",
}

const baseStyle: BaseStyle<typeof register> = (props) => {
  const { align = "start", isFitted } = props
  return {
    tab: {
      flex: isFitted ? 1 : undefined,
      transition: "all 0.2s",
      _focus: {
        zIndex: 1,
        boxShadow: "outline",
      },
    },
    tablist: { justifyContent: alignments[align] },
    tabpanel: {
      padding: 4,
    },
  }
}

const orientation = (props: Props) => {
  const { orientation } = props
  return {
    tablist: {
      [orientation === "vertical"
        ? "borderRight"
        : "borderBottom"]: "2px solid",
      borderColor: "inherit",
    },
  }
}

const sizes: Sizes<typeof register> = {
  sm: {
    tab: {
      paddingY: "0.25rem",
      paddingX: "1rem",
      fontSize: "0.85rem",
    },
  },
  md: {
    tab: {
      fontSize: "1rem",
      paddingY: "0.5rem",
      paddingX: "1rem",
    },
  },
  lg: {
    tab: {
      fontSize: "1.15rem",
      paddingY: "0.75rem",
      paddingX: "1rem",
    },
  },
}

const variants: Variants<typeof register> = {
  line: function (props) {
    const { colorScheme: c } = props
    return {
      tablist: {
        borderBottom: "2px solid",
        borderColor: "inherit",
      },
      tab: {
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
  },

  enclosed: function (props) {
    const { colorScheme: c } = props
    return {
      tab: {
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
      tablist: {
        marginBottom: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit",
      },
    }
  },

  "enclosed-colored": function (props) {
    const { colorScheme: c } = props
    return {
      tab: {
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
      tablist: {
        marginBottom: "-1px",
        borderBottom: "1px solid",
        borderColor: "inherit",
      },
    }
  },

  "soft-rounded": function (props) {
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
      tablist: {},
    }
  },

  "solid-rounded": function (props) {
    const { colorScheme: c } = props
    return {
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        color: mode("gray.600", "inherit")(props),
        _selected: {
          color: mode(`#fff`, "gray.800")(props),
          bg: mode(`${c}.600`, `${c}.300`)(props),
        },
      },
    }
  },

  unstyled: {},
}

const defaultProps: DefaultProps<typeof register> = {
  size: "md",
  variant: "line",
  colorScheme: "blue",
}

const tabs = {
  register,
  defaultProps,
  baseStyle,
  sizes,
  variants,
}

export default tabs
