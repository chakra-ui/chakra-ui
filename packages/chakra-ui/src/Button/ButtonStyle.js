import { css } from "@emotion/core";
import { useTheme, useUIMode } from "../theme";
import { addBlack, isDarkColor } from "../theme/colors.utils";

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

//////////////////////////////////////////////////////////////

//Styled for the solid variant and gray color button
const solidGrayStyle = props => {
  const { alpha, gray } = props.theme.colors;

  return {
    light: {
      color: "inherit",
      backgroundColor: gray[100],
      [hover]: {
        backgroundColor: gray[200]
      },
      [active]: {
        backgroundColor: gray[300]
      }
    },
    dark: {
      color: "inherit",
      backgroundColor: alpha[300],
      [hover]: {
        backgroundColor: alpha[400]
      },
      [active]: {
        backgroundColor: alpha[500]
      }
    }
  };
};

//Styled for the solid variant and any other color of button
const solidStyle = props => {
  const {
    theme: { colors },
    color
  } = props;
  const _color = colors[color];
  const bgColor = { light: _color[500], dark: _color[200] };

  if (color === "gray") {
    return solidGrayStyle(props);
  }

  return {
    light: {
      backgroundColor: bgColor.light,
      color: "#fff",
      [hover]: {
        backgroundColor: _color[600]
      },
      [active]: {
        backgroundColor: _color[700]
      }
    },
    dark: {
      backgroundColor: bgColor.dark,
      color: isDarkColor(bgColor.dark) ? colors.alpha[800] : colors.gray[800],
      [hover]: {
        backgroundColor: addBlack(bgColor.dark, 0.1)
      },
      [active]: {
        backgroundColor: addBlack(bgColor.dark, 0.2)
      }
    }
  };
};

//////////////////////////////////////////////////////////////

// Styled for the gray color, ghost variant button
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

// Style for ghost style
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

// Style for outline variant of the button
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

// Style for link variant of the button
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
  const { variant, mode } = props;
  switch (variant) {
    case "solid":
      return solidStyle(props)[mode];
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

// Size styles of the button
const sizeStyle = props =>
  css({
    ...props.theme.sizes.button[props.size],
    ...(props.isFullWidth && { width: "100%" })
  });

// Disabled styles of the button
const disabledStyle = css({
  [disabled]: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none"
  }
});

// Focus styles of the button
const focusStyle = props => {
  return css({
    [focus]: {
      boxShadow: props.theme.shadows.outline
    }
  });
};

// The button style hook to generate the button css
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
