/** @jsx jsx */
import { ThemeContext } from "@emotion/core";
import { useContext } from "react";
import { TabContext } from ".";
import { useUIMode } from "../ThemeProvider";

export const baseProps = {
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  _focus: {
    zIndex: "1",
    boxShadow: "outline"
  }
};

export const disabledProps = {
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
};

const lineStyle = ({ color, mode }) => {
  const _color = { light: `${color}.600`, dark: `${color}.300` };
  return {
    tabList: {
      borderBottom: "2px",
      borderColor: "inherit"
    },
    tab: {
      borderBottom: "2px",
      borderColor: "transparent",
      mb: "-2px",
      _selected: {
        color: _color[mode],
        borderColor: "currentColor"
      },
      _active: {
        bg: "gray.200"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    }
  };
};

const containedStyle = props => {
  return {
    tab: {
      _notFirstChild: {
        borderLeftWidth: 1
      },
      _selected: {
        bg: "gray.100"
      }
    },
    tabList: {
      bg: "#fff",
      borderWidth: "1px",
      rounded: "md",
      overflow: "hidden"
    }
  };
};

// TODO: Create new issue in @styled-system/css to allow custom alias
const enclosedStyle = ({ color, mode, theme }) => {
  const _selectedColor = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedBg = { light: "#fff", dark: theme.colors.gray[900] };

  return {
    tab: {
      roundedTop: "md",
      border: "1px",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: _selectedColor[mode],
        borderColor: "inherit",
        borderBottomColor: _selectedBg[mode]
      }
    },
    tabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit"
    }
  };
};

const enclosedColoredStyle = ({ color, mode }) => {
  const bg = { light: "gray.50", dark: "whiteAlpha.50" };
  const _selectedColor = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedBg = { light: `#fff`, dark: `gray.900` };

  return {
    tab: {
      border: "1px",
      borderColor: "inherit",
      bg: bg[mode],
      mb: "-1px",
      _notLastChild: {
        mr: "-1px"
      },
      _selected: {
        bg: _selectedBg[mode],
        color: _selectedColor[mode],
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tabList: {
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit"
    }
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
        bg: `${color}.100`
      }
    },
    tabList: {}
  };
};

const solidRoundedStyle = ({ color, mode }) => {
  const _color = { light: "gray.600", dark: "inherit" };
  const _selectedBg = { light: `${color}.600`, dark: `${color}.300` };
  const _selectedColor = { light: `#fff`, dark: `gray.900` };

  return {
    tab: {
      rounded: "full",
      fontWeight: "semibold",
      color: _color[mode],
      _selected: {
        color: _selectedColor[mode],
        bg: _selectedBg[mode]
      }
    },
    tabList: {}
  };
};

export const variantStyle = props => {
  switch (props.variant) {
    case "line":
      return lineStyle(props);
    case "contained":
      return containedStyle(props);
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
    start: "flex-start"
  };
  switch (orientation) {
    case "horizontal":
      return {
        alignItems: "center",
        justifyContent: alignments[align],
        maxWidth: "full"
      };
    case "vertical":
      return {
        flexDirection: "column"
      };
    default:
      return {};
  }
};

export const useTabStyle = () => {
  const theme = useContext(ThemeContext);
  const { variant, color, size, isFitted } = useContext(TabContext);
  const { mode } = useUIMode();

  return {
    ...baseProps,
    ...disabledProps,
    ...theme.sizes.tab[size],
    ...variantStyle({ variant, color, theme, mode }).tab,
    ...(isFitted && { flex: 1 })
  };
};

export const useTabListStyle = () => {
  const theme = useContext(ThemeContext);
  const { variant, align, orientation } = useContext(TabContext);

  return {
    ...variantStyle({ variant, theme }).tabList,
    ...orientationStyle({ align, orientation })
  };
};
