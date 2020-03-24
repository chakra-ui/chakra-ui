import { Props, getModeColor, ComponentTheme, StyleProps } from "./utils"
import { getColor } from "@chakra-ui/color"

function getLineStyle(props: Props) {
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
        color: getModeColor(props, `${c}.600`, `${c}.300`),
        borderColor: "currentColor",
      },
      _active: {
        bg: getModeColor(props, "gray.200", "whiteAlpha.300"),
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  }
}

function getEnclosedStyle(props: Props) {
  const { colorScheme: c } = props
  return {
    Tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      marginBottom: "-1px",
      _selected: {
        color: getModeColor(props, `${c}.600`, `${c}.300`),
        borderColor: "inherit",
        borderBottomColor: getModeColor(props, `white`, `gray.800`),
      },
    },
    TabList: {
      marginBottom: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  }
}

function getEnclosedColoredStyle(props: Props) {
  const { colorScheme: c } = props
  return {
    Tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: getModeColor(props, `gray.50`, `whiteAlpha.50`),
      marginBottom: "-1px",
      _notLast: {
        mr: "-1px",
      },
      _selected: {
        bg: getModeColor(props, `#fff`, "gray.800"),
        color: getModeColor(props, `${c}.600`, `${c}.300`),
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

function getSoftRoundedStyle(props: any): StyleProps {
  const { colorScheme: c, theme: t } = props
  return {
    Tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(t, `${c}.700`),
        bg: getColor(t, `${c}.100`),
      },
    },
    TabList: {},
  }
}

function getSolidRoundedStyle(props: Props): StyleProps {
  const { colorScheme: c } = props
  return {
    Tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: getModeColor(props, "gray.600", "inherit"),
      _selected: {
        color: getModeColor(props, `#fff`, "gray.800"),
        bg: getModeColor(props, `${c}.600`, `${c}.300`),
      },
    },
    TabList: {},
  }
}

const Tabs: ComponentTheme = {
  defaultProps: {
    size: "md",
    variant: "line",
  },
  baseStyle: {
    Tab: {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
      _focus: {
        zIndex: 1,
        boxShadow: "outline",
      },
    },
    TabList: {
      display: "flex",
    },
  },
  sizes: {
    sm: {
      Tab: { padding: "0.25rem 1rem", fontSize: "0.85rem" },
    },
    md: {
      Tab: { fontSize: "1rem", padding: "0.5rem 1rem" },
    },
    lg: {
      Tab: {
        fontSize: "1.15rem",
        padding: "0.75rem 1rem",
      },
    },
  },
  variants: {
    line: getLineStyle,
    enclosed: getEnclosedStyle,
    "soft-rounded": getSoftRoundedStyle,
    "enclosed-colored": getEnclosedColoredStyle,
    "solid-rounded": getSolidRoundedStyle,
    unstyled: {},
  },
}

export default Tabs
