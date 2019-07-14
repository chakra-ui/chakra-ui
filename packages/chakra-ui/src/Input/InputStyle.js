/** @jsx jsx */
import { css } from "@emotion/core";
import { useTheme, useUIMode } from "../theme";

// Just so I don't repeat this :)
let hover = "&:not([aria-disabled=true]):not(:focus):hover",
  disabled = "&[aria-disabled=true]",
  focus =
    "&:not([aria-invalid=true]):focus, &:not([aria-invalid=true]):focus-within",
  invalid = "&[aria-invalid=true]";

export const themedStyle = props => {
  const { gray, alpha } = props.theme.colors;

  return {
    light: {
      color: gray[800],
      backgroundColor: "#fff",
      [hover]: {
        borderColor: gray[30]
      },
      [disabled]: {
        backgroundColor: gray[100],
        boxShadow: "none !important",
        color: gray[500],
        cursor: "not-allowed"
      }
    },
    dark: {
      color: alpha[800],
      borderColor: alpha[200],
      backgroundColor: alpha[50],
      [hover]: {
        borderColor: alpha[30]
      },
      [disabled]: {
        color: alpha[500],
        cursor: "not-allowed"
      }
    }
  };
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

  const borderColor = {
    dark: theme.colors.red[300],
    light: theme.colors.red[500]
  };

  return css({
    [invalid]: {
      borderColor: borderColor[mode]
    }
  });
};

const focusStyle = props => {
  const { theme } = props;

  return css({
    [focus]: {
      boxShadow: theme.shadows.outline
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
    themedStyle(_props)[mode],
    variantStyle(_props),
    {
      paddingBottom: 1
    }
  );
};

export default useInputStyle;
