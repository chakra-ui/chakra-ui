import {
  StyleFunctionProps,
  getModeColor,
  ComponentTheme,
  NestedSystemProps,
} from "./utils";
import { getColor } from "@chakra-ui/color";

function getLineStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props;
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
  };
}

function getEnclosedStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props;
  return {
    Tab: {
      roundedTop: "md",
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
  };
}

function getEnclosedColoredStyle(props: StyleFunctionProps) {
  const { variantColor: c } = props;
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
  };
}

function getSoftRoundedStyle(props: any): NestedSystemProps {
  const { variantColor: c, theme: t } = props;
  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(t, `${c}.700`),
        bg: getColor(t, `${c}.100`),
      },
    },
    TabList: {},
  };
}

function getSolidRoundedStyle(props: StyleFunctionProps): NestedSystemProps {
  const { variantColor: c } = props;
  return {
    Tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: getModeColor(props, "gray.600", "inherit"),
      _selected: {
        color: getModeColor(props, `#fff`, "gray.800"),
        bg: getModeColor(props, `${c}.600`, `${c}.300`),
      },
    },
    TabList: {},
  };
}

const Tabs: ComponentTheme = {
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
  variantSize: {
    __default: "md",
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
  variant: {
    __default: "line",
    line: getLineStyle,
    enclosed: getEnclosedStyle,
    "soft-rounded": getSoftRoundedStyle,
    "enclosed-colored": getEnclosedColoredStyle,
    "solid-rounded": getSolidRoundedStyle,
    unstyled: {},
  },
};

export default Tabs;
