import { css } from "@emotion/core";
import { useTheme, useUIMode } from "../theme";
import { addOpacity, generateAlphaColors } from "../theme/colors.utils";

const solidStyle = ({ theme: { colors }, color }) => {
  let lightModeBg = colors[color][500];
  // let lightModeColor = isDarkColor(lightModeBg) ? "#fff" : colors.gray[800];
  let darkModeBg = addOpacity(lightModeBg, 0.6);
  let darkModeColor = colors.alpha[800];

  return {
    light: {
      backgroundColor: lightModeBg,
      color: "#fff"
    },
    dark: {
      backgroundColor: darkModeBg,
      color: darkModeColor
    }
  };
};

const subtleStyle = ({ theme: { colors }, color }) => {
  let lightModeBg = colors[color][100];
  let lightModeColor = colors[color][800];

  const darkModePrimary = colors[color][200];
  const alphaColors = generateAlphaColors(darkModePrimary);
  let darkModeBg = alphaColors[300];

  return {
    light: {
      backgroundColor: lightModeBg,
      color: lightModeColor
    },
    dark: {
      backgroundColor: darkModeBg,
      color: darkModePrimary
    }
  };
};

const outlineStyle = ({ theme: { colors }, color }) => {
  let darkModeColor = addOpacity(colors[color][200], 0.8);
  return {
    light: {
      boxShadow: `inset 0 0 0px 1px ` + colors[color][500],
      color: colors[color][500],
      backgroundColor: "transparent"
    },
    dark: {
      boxShadow: `inset 0 0 0px 1px ` + darkModeColor,
      color: darkModeColor,
      backgroundColor: "transparent"
    }
  };
};

const variantStyle = props => {
  const { variant, mode } = props;
  switch (variant) {
    case "solid":
      return solidStyle(props)[mode];
    case "subtle":
      return subtleStyle(props)[mode];
    case "outline":
      return outlineStyle(props)[mode];
    default:
      return {};
  }
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const { mode } = useUIMode();
  const _props = { ...props, mode, theme };

  return css`
    ${variantStyle(_props)}
  `;
};

export default useBadgeStyle;
