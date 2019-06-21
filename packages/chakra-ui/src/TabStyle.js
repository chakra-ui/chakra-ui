/** @jsx jsx */
import css from "@styled-system/css";

const isDisabled = "&[aria-disabled=true]",
  isSelected = "&[aria-selected=true]",
  isActive = "&:not([aria-disabled=true]):active",
  isHovered = "&:not([aria-disabled=true]):hover",
  isFocused = "&:not([aria-disabled=true]):focus";

const disabledStyle = {
  [isDisabled]: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
};

const lineStyle = props => {
  return {
    tabList: css({
      borderBottom: "2px",
      borderColor: "inherit"
    }),
    tab: css({
      borderBottom: "2px",
      borderBottomColor: "transparent",
      mb: "-2px",
      [isSelected]: {
        color: "blue.600",
        borderBottomColor: "currentColor"
      },
      [isActive]: {
        bg: "gray.200"
      },
      ...disabledStyle
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
        bg: "gray.100"
      },
      ...disabledStyle
    }),
    tabList: css({
      bg: "white",
      borderWidth: 1,
      borderRadius: "md",
      overflow: "hidden"
    })
  };
};

const enclosedStyle = props => {
  return {
    tab: css({
      borderRadius: "4px 4px 0 0",
      borderWidth: "1px",
      borderColor: "transparent",
      borderBottomColor: "inherit",
      mb: "-1px",
      [isSelected]: {
        color: "blue.600",
        borderColor: "inherit",
        borderBottomColor: "white"
      }
    }),
    tabList: css({
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit"
    })
  };
};

const enclosedColoredStyle = props => {
  return {
    tab: css({
      borderWidth: "1px",
      bg: "gray.50",
      borderBottomColor: "inherit",
      mb: "-1px",
      "&:not(:last-child)": {
        mr: "-1px"
      },
      [isSelected]: {
        bg: "white",
        color: "blue.600",
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "white"
      }
    }),
    tabList: css({
      mb: "-1px",
      borderBottom: "1px",
      borderColor: "inherit"
    })
  };
};

const softRoundedStyle = props => {
  return {
    tab: css({
      borderRadius: "round",
      fontWeight: "semibold",
      color: "gray.500",
      [isSelected]: {
        color: "inherit",
        bg: "gray.100"
      }
    }),
    tabList: css({})
  };
};

const solidRoundedStyle = props => {
  return {
    tab: css({
      borderRadius: "round",
      fontWeight: "semibold",
      color: "gray.500",
      [isSelected]: {
        color: "white",
        bg: "blue.500"
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
    right: "flex-end",
    center: "center",
    left: "flex-start"
  };
  switch (props["aria-orientation"]) {
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
