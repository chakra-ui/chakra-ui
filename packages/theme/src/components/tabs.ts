import { getColor, mode } from "@chakra-ui/theme-tools"

const parts = ["root", "tablist", "tab", "tabpanels", "tabpanel", "indicator"]

type Dict = Record<string, any>

function baseStyleRoot(props: Dict) {
  const { orientation } = props
  return {
    display: orientation === "vertical" ? "flex" : "block",
  }
}

function baseStyleTab(props: Dict) {
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

function baseStyleTablist(props: Dict) {
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

const baseStyleTabpanel = { p: 4 }

const baseStyle = (props: Dict) => ({
  root: baseStyleRoot(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel,
})

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

function variantLine(props: Dict) {
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

function variantEnclosed(props: Dict) {
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

function variantEnclosedColored(props: Dict) {
  const { colorScheme: c } = props
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode(`gray.50`, `whiteAlpha.50`)(props),
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px",
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

function variantSoftRounded(props: Dict) {
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

function variantSolidRounded(props: Dict) {
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

export default {
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps,
}
