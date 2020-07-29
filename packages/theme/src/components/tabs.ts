import { getColor, mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const parts = {
  tablist: "the tab list or button group",
  tab: "the tab button",
  tabpanel: "the tab content",
  indicator: "the active tab indicator",
}

// @ts-ignore
const baseStyleTab = function (props) {
  const { isFitted } = props

  return {
    flex: isFitted ? 1 : undefined,
    transition: "all 0.2s",
    _focus: {
      zIndex: 1,
      boxShadow: "outline",
    },
  }
}

// @ts-ignore
const baseStyleTablist = function (props) {
  const { align = "start" } = props

  return {
    justifyContent: alignments[align],
  }
}

const baseStyleTabpanel = { p: 4 }

// @ts-ignore
const baseStyle = function (props) {
  return {
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel,
  }
}

const sizes = {
  sm: {
    tab: {
      py: "0.25rem",
      px: "1rem",
      fontSize: "0.85rem",
    },
  },
  md: {
    tab: {
      fontSize: "1rem",
      py: "0.5rem",
      px: "1rem",
    },
  },
  lg: {
    tab: {
      fontSize: "1.15rem",
      py: "0.75rem",
      px: "1rem",
    },
  },
}

// @ts-ignore
const variantLine = function (props) {
  const { colorScheme: c } = props
  return {
    tablist: {
      borderBottom: "2px solid",
      borderColor: "inherit",
    },
    tab: {
      borderBottom: "2px solid",
      borderColor: "transparent",
      mb: "-2px",
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

// @ts-ignore
const variantEnclosed = function (props) {
  const { colorScheme: c } = props
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: "inherit",
        borderBottomColor: mode(`white`, `gray.800`)(props),
      },
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

// @ts-ignore
const variantEnclosedColored = function (props) {
  const { colorScheme: c } = props
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode(`gray.50`, `whiteAlpha.50`)(props),
      mb: "-1px",
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
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

// @ts-ignore
const variantSoftRounded = function (props) {
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

// @ts-ignore
const variantSolidRounded = function (props) {
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
}

const variantUnstyled = {}

const variants = {
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

const tabs = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  variants,
  // @ts-ignore
  defaultProps,
})

const alignments = {
  end: "flex-end",
  center: "center",
  start: "flex-start",
}

export const tabsStyles = {
  parts,
  sizes,
  baseStyleTab,
  baseStyleTablist,
  baseStyleTabpanel,
  variantEnclosed,
  variantLine,
  variantEnclosedColored,
  variantSolidRounded,
  variantSoftRounded,
  variantUnstyled,
  defaultProps,
}

export default tabs
