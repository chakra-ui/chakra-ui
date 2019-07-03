import { css } from "@emotion/core";
import { useTheme, useUIMode } from "../theme";

// Just so I don't repeat this :)
let hover = '&:not([aria-disabled="true"]):hover',
  active = '&:not([aria-disabled="true"]):active',
  disabled = '&[aria-disabled="true"]',
  focus = "&:focus";

// This is the base style all buttons
const baseStyle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "1.2"
});

// For unstyled buttons
const unstyledStyle = css({
  userSelect: "inherit",
  background: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  margin: 0,
  padding: 0,
  textAlign: "inherit"
});

const themedSolidStyle = props => {
  const { theme } = props;
  return {
    light: {
      color: "inherit",
      backgroundColor: theme.colors.gray[100],
      [hover]: {
        backgroundColor: theme.colors.gray[200]
      },
      [active]: {
        backgroundColor: theme.colors.gray[300]
      }
    },
    dark: {
      color: theme.colors.alpha[900],
      backgroundColor: theme.colors.alpha[200],
      [hover]: {
        backgroundColor: theme.colors.alpha[300]
      },
      [active]: {
        backgroundColor: theme.colors.alpha[400]
      }
    }
  };
};

// Color styled for contained buttons
const solidStyle = props => {
  const { theme, color, mode } = props;
  return css({
    color: "#fff",
    backgroundColor: theme.colors[color][500],
    [hover]: {
      backgroundColor: theme.colors[color][600]
    },
    [active]: {
      backgroundColor: theme.colors[color][700]
    },
    ...(color === "gray" && themedSolidStyle(props)[mode])
  });
};

const themedGhostStyle = props => {
  const { theme } = props;

  return {
    light: {
      color: "inherit",
      [hover]: {
        backgroundColor: theme.colors.gray[100]
      },
      [active]: {
        backgroundColor: theme.colors.gray[200]
      }
    },
    dark: {
      color: theme.colors.alpha[900],
      [hover]: {
        backgroundColor: theme.colors.alpha[200]
      },
      [active]: {
        backgroundColor: theme.colors.alpha[300]
      }
    }
  };
};

// Color style for ghost style
const ghostStyle = props => {
  const { color, mode, theme } = props;

  return css({
    color: theme.colors[props.color][500],
    backgroundColor: "transparent",
    [hover]: {
      backgroundColor: theme.colors[color][50]
    },
    [active]: {
      backgroundColor: theme.colors[color][100]
    },
    ...(color === "gray" && themedGhostStyle(props)[mode])
  });
};

// Style for outline button
const outlineStyle = props => {
  const { theme, color, mode } = props;

  return css(ghostStyle(props), {
    borderWidth: 1,
    borderColor: theme.colors[color][500],
    ...(color === "gray" && {
      borderColor:
        mode === "dark" ? theme.colors.alpha[400] : theme.colors[color][200]
    })
  });
};

// Style for link variant
const linkStyle = ({ theme, color }) =>
  css({
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    color: theme.colors[color][600],
    [hover]: {
      textDecoration: "underline"
    },
    [active]: {
      color: theme.colors[color][700]
    }
  });

// Finally, a function to determine which style to use
const variantStyle = props => {
  switch (props.variant) {
    case "solid":
      return solidStyle(props);
    case "outline":
      return outlineStyle(props);
    case "ghost":
      return ghostStyle(props);
    case "link":
      return linkStyle(props);
    case "unstyled":
      return unstyledStyle;
    default:
      return {};
  }
};

const sizeStyle = props =>
  css({
    ...props.theme.sizes.button[props.size],
    ...(props.isFullWidth && { width: "100%" })
  });

const disabledStyle = css({
  [disabled]: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none"
  }
});

const focusStyle = props => {
  return css({
    [focus]: {
      boxShadow: props.theme.shadows.focusring
    }
  });
};

const useButtonStyle = props => {
  const theme = useTheme();
  const { mode } = useUIMode();

  const _props = { ...props, theme, mode };
  return css`
    ${baseStyle}
    ${disabledStyle}
    ${focusStyle(_props)}
    ${sizeStyle(_props)}
    ${variantStyle(_props)}
  `;
};

export default useButtonStyle;
