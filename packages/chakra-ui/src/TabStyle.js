/** @jsx jsx */
import { css, ThemeContext } from "@emotion/core";
import { useContext } from "react";
import { TabContext } from "./Tabs";

const isDisabled = "&[aria-disabled=true]",
  isSelected = "&[aria-selected=true]",
  isActive = "&:not([aria-disabled=true]):active",
  isHovered = "&:not([aria-disabled=true]):hover",
  isFocused = "&:not([aria-disabled=true]):focus";

const colorPicker = (color, value) => props => {
  const tabColor = props.theme.colors[color];
  return tabColor && tabColor[value];
};

export const baseStyle = {
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  [isFocused]: {
    zIndex: "1",
    boxShadow: `0 0 0px 2px rgba(66, 153, 225, 0.6)`
  }
};

export const disabledStyle = {
  [isDisabled]: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
};

const lineStyle = props => {
  return {
    tabList: css({
      borderBottomWidth: 2,
      borderColor: "inherit"
    }),
    tab: css({
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
      marginBottom: -2,
      [isSelected]: {
        color: colorPicker(props.color, 600)(props),
        borderBottomColor: "currentColor"
      },
      [isActive]: {
        backgroundColor: colorPicker("gray", 200)(props)
      },
      [isDisabled]: {
        opacity: 0.4,
        cursor: "not-allowed"
      }
    })
  };
};

const containedStyle = props => {
  return {
    tab: css({
      "&:not(:first-child)": {
        borderLeftWidth: 1
      },
      [isSelected]: {
        backgroundColor: colorPicker("gray", 100)(props)
      }
    }),
    tabList: css({
      backgroundColor: "#fff",
      borderWidth: 1,
      borderRadius: props.theme.radii["md"],
      overflow: "hidden"
    })
  };
};

const enclosedStyle = props => {
  return {
    tab: css({
      borderRadius: "4px 4px 0 0",
      borderWidth: 1,
      borderColor: "transparent",
      borderBottomColor: "inherit",
      marginBottom: "-1px",
      [isSelected]: {
        color: colorPicker(props.color, 600)(props),
        borderColor: "inherit",
        borderBottomColor: "#fff"
      }
    }),
    tabList: css({
      marginBottom: -1,
      borderBottomWidth: 1,
      borderColor: "inherit"
    })
  };
};

const enclosedColoredStyle = props => {
  return {
    tab: css({
      borderWidth: 1,
      backgroundColor: colorPicker("gray", 50)(props),
      borderBottomColor: "inherit",
      marginBottom: -1,
      "&:not(:last-child)": {
        marginRight: "-1px"
      },
      [isSelected]: {
        backgroundColor: "#fff",
        color: colorPicker(props.color, 600)(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "#fff"
      }
    }),
    tabList: css({
      marginBottom: -1,
      borderBottomWidth: 1,
      borderColor: "inherit"
    })
  };
};

const softRoundedStyle = props => {
  return {
    tab: css({
      borderRadius: props.theme.radii["round"],
      fontWeight: props.theme.fontWeights["semibold"],
      color: colorPicker("gray", 600)(props),
      [isSelected]: {
        color: colorPicker(props.color, 700)(props),
        backgroundColor: colorPicker(props.color, 100)(props)
      }
    }),
    tabList: css({})
  };
};

const solidRoundedStyle = props => {
  return {
    tab: css({
      borderRadius: props.theme.radii["round"],
      fontWeight: props.theme.fontWeights["semibold"],
      color: colorPicker("gray", 600)(props),
      [isSelected]: {
        color: "#fff",
        backgroundColor: colorPicker(props.color, 600)(props)
      }
    }),
    tabList: css({})
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
export const orientationStyle = props => {
  const alignmentOptions = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  switch (props.orientation) {
    case "horizontal":
      return css({
        alignItems: "center",
        justifyContent: alignmentOptions[props.align],
        maxWidth: "100%"
      });
    case "vertical":
      return css({
        flexDirection: "column"
      });
    default:
      break;
  }
};

export const useTabStyle = () => {
  const theme = useContext(ThemeContext);
  const { variant, color, size, isFitted } = useContext(TabContext);
  const tabStyle = css`
    ${baseStyle}
    ${disabledStyle}
    ${theme.sizes.tab[size]}
    ${variantStyle({ variant, color, theme }).tab}
    ${isFitted && { flex: 1 }}
  `;

  return tabStyle;
};

export const useTabListStyle = () => {
  const theme = useContext(ThemeContext);
  const { variant, align, orientation } = useContext(TabContext);

  const tabStyle = css`
    ${variantStyle({ variant, theme }).tabList}
    ${orientationStyle({ align, orientation })}
  `;

  return tabStyle;
};
