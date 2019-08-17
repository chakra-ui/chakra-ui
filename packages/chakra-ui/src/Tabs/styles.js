/** @jsx jsx */
import { useContext } from "react";
import { TabContext } from ".";
import { useColorMode } from "../ColorModeProvider";
import { useTheme } from "../ThemeProvider";

export const baseProps = {
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  _focus: {
    zIndex: "1",
    boxShadow: "outline",
  },
};

export const disabledProps = {
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

const lineStyle = ({ color, mode }) => {
  const _color = { light: `${color}.600`, dark: `${color}.300` };
  return {
    tabList: {
      borderBottom: "2px",
      borderColor: "inherit",
    },
    tab: {
      borderBottom: "2px",
      borderColor: "transparent",
      mb: "-2px",
      _selected: {
        color: _color[mode],
        borderColor: "currentColor",
      },
      _active: {
        bg: "gray.200",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  };
};

// TODO: Create new issue in @styled-system/css to allow custom alias
const enclosedStyle = ({ color, mode, theme }) => {
  const _selectedColor = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedBg = { light: "#fff", dark: theme.colors.gray[800] };

  return {
    tab: {
      roundedTop: "md",
      border: "1px",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: _selectedColor[mode],
        borderColor: "inherit",
        borderBottomColor: _selectedBg[mode],
      },
    },
    tabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit",
    },
  };
};

const enclosedColoredStyle = ({ color, mode }) => {
  const bg = { light: "gray.50", dark: "whiteAlpha.50" };
  const _selectedColor = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedBg = { light: `#fff`, dark: `gray.800` };

  return {
    tab: {
      border: "1px",
      borderColor: "inherit",
      bg: bg[mode],
      mb: "-1px",
      _notLastChild: {
        mr: "-1px",
      },
      _selected: {
        bg: _selectedBg[mode],
        color: _selectedColor[mode],
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent",
      },
    },
    tabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit",
    },
  };
};

const softRoundedStyle = ({ color }) => {
  return {
    tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: `${color}.700`,
        bg: `${color}.100`,
      },
    },
    tabList: {},
  };
};

const solidRoundedStyle = ({ color, mode }) => {
  const _color = { light: "gray.600", dark: "inherit" };
  const _selectedBg = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedColor = { light: `#fff`, dark: `gray.800` };

  return {
    tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: _color[mode],
      _selected: {
        color: _selectedColor[mode],
        bg: _selectedBg[mode],
      },
    },
    tabList: {},
  };
};

export const variantStyle = props => {
  switch (props.variant) {
    case "line":
      return lineStyle(props);
    case "enclosed":
      return enclosedStyle(props);
    case "enclosed-colored":
      return enclosedColoredStyle(props);
    case "soft-rounded":
      return softRoundedStyle(props);
    case "solid-rounded":
      return solidRoundedStyle(props);
    default:
      break;
  }
};

// TO DO: Add support for vertical orientation
export const orientationStyle = ({ align, orientation }) => {
  const alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start",
  };

  let tabListStyle;
  let tabStyle;

  if (orientation === "horizontal") {
    tabListStyle = {
      alignItems: "center",
      justifyContent: alignments[align],
      maxWidth: "full",
    };

    tabStyle = {
      height: "100%",
    };
  }

  if (orientation === "vertical") {
    tabListStyle = { flexDirection: "column" };

    tabStyle = {
      width: "100%",
    };
  }

  return {
    tabList: tabListStyle,
    tab: tabStyle,
  };
};

const tabSizes = {
  sm: {
    padding: "0.25rem 1rem",
    fontSize: "0.85rem",
  },
  md: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
  },
  lg: {
    fontSize: "1.15rem",
    padding: "0.75rem 1rem",
  },
};

export const useTabStyle = () => {
  const theme = useTheme();
  const { variant, color, size, isFitted, orientation } = useContext(
    TabContext,
  );
  const { mode } = useColorMode();

  const _variantStyle = variantStyle({ variant, color, theme, mode });
  const _orientationStyle = orientationStyle({ orientation });

  return {
    ...baseProps,
    ...disabledProps,
    ...tabSizes[size],
    ...(_variantStyle && _variantStyle.tab),
    ...(_orientationStyle && _orientationStyle.tab),
    ...(isFitted && { flex: 1 }),
  };
};

export const useTabListStyle = () => {
  const theme = useTheme();
  const { variant, align, orientation } = useContext(TabContext);
  const _variantStyle = variantStyle({ variant, theme });
  const _orientationStyle = orientationStyle({ align, orientation });

  return {
    ...(_variantStyle && _variantStyle.tabList),
    ...(_orientationStyle && _orientationStyle.tabList),
  };
};
