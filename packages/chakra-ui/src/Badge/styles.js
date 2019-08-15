import { addOpacity, generateAlphaColors, get } from "../theme/colors-utils";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";

const solidStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][500];
  const darkModeBg = addOpacity(_color, 0.6);
  return {
    light: {
      bg: get(color, 500),
      color: "white",
    },
    dark: {
      bg: darkModeBg,
      color: "whiteAlpha.800",
    },
  };
};

const subtleStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][200];
  const alphaColors = generateAlphaColors(_color);
  const darkModeBg = alphaColors[300];

  return {
    light: {
      bg: get(color, 100),
      color: get(color, 800),
    },
    dark: {
      bg: darkModeBg,
      color: get(color, 200),
    },
  };
};

const outlineStyle = ({ theme: { colors }, color }) => {
  const _color = colors[color] && colors[color][200];
  const darkModeColor = addOpacity(_color, 0.8);
  const boxShadowColor = colors[color] && colors[color][500];
  return {
    light: {
      boxShadow: `inset 0 0 0px 1px ` + boxShadowColor,
      color: get(color, 500),
    },
    dark: {
      boxShadow: `inset 0 0 0px 1px ` + darkModeColor,
      color: darkModeColor,
    },
  };
};

const variantProps = props => {
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
  const { mode } = useColorMode();
  const _props = { ...props, theme, mode };

  return variantProps(_props);
};

export default useBadgeStyle;
