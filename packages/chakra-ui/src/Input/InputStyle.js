/** @jsx jsx */
import { css } from "@emotion/core";
import { useTheme, useUIMode } from "../ThemeProvider";

// Just so I don't repeat this :)
let hover = "&:not([aria-disabled=true]):not(:focus):hover",
  disabled = "&[aria-disabled=true]",
  focus = "&:not([aria-invalid=true]):focus",
  invalid = "&[aria-invalid=true]";

export const themedStyle = props => {
  const { theme, mode } = props;

  if (mode === "light") {
    return {
      color: theme.colors.gray[800],
      backgroundColor: "#fff",
      [hover]: {
        borderColor: theme.colors.gray[30]
      },
      [disabled]: {
        backgroundColor: theme.colors.gray[100],
        boxShadow: "none !important",
        color: theme.colors.gray[500],
        cursor: "not-allowed"
      }
    };
  }

  if (mode === "dark") {
    return {
      color: theme.colors.alpha[800],
      borderColor: theme.colors.alpha[200],
      backgroundColor: theme.colors.alpha[200],
      [hover]: {
        borderColor: theme.colors.alpha[30]
      },
      [disabled]: {
        color: theme.colors.alpha[500],
        cursor: "not-allowed"
      }
    };
  }
};

const flushedStyle = props => {
  const { theme } = props;
  return css({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    boxShadow: "none",
    padding: 0,
    backgroundColor: "transparent",
    [focus]: {
      boxShadow: `0 1px 0 0 ${theme.colors.blue[300]}`,
      borderColor: theme.colors.blue[30]
    },
    [invalid]: {
      borderColor: `${theme.colors.red[500]} !important`,
      boxShadow: `0 1px 0 0 ${theme.colors.red[500]} !important`
    }
  });
};

const unStyledStyle = css({
  backgroundColor: "transparent !important",
  borderColor: "transparent !important",
  boxShadow: "none !important",
  padding: 0
});

const variantStyle = props => {
  switch (props.variant) {
    case "flushed":
      return flushedStyle(props);
    case "unstyled":
      return unStyledStyle;
    default:
      break;
  }
};

const baseStyle = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  transition: "all 0.2s",
  borderWidth: 1
});

const invalidStyle = props => {
  const { mode, theme } = props;
  return css({
    [invalid]: {
      borderColor:
        mode === "dark"
          ? `${theme.colors.red[300]} !important`
          : `${theme.colors.red[500]} !important`
    }
  });
};

const focusStyle = props => {
  const { theme } = props;
  return css({
    [focus]: {
      borderColor: theme.colors.blue[300],
      boxShadow: theme.shadows.focusring
    }
  });
};

const readOnlyStyle = css({
  "&[readonly]": {
    backgroundColor: "transparent",
    boxShadow: "none !important",
    userSelect: "all"
  }
});

const sizeStyle = props => {
  const { theme, size } = props;
  return theme.sizes.input[size];
};

const useInputStyle = props => {
  const theme = useTheme();
  const { mode } = useUIMode();

  const _props = { ...props, theme, mode };

  return css(
    baseStyle,
    readOnlyStyle,
    invalidStyle(_props),
    sizeStyle(_props),
    focusStyle(_props),
    themedStyle(_props),
    variantStyle(_props),
    {
      paddingBottom: 1
    }
  );
};

export default useInputStyle;
