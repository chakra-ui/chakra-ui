import {
  ThemeProvider,
  CSSReset,
  Theme,
  addOpacity,
  generateAlphaColors,
  get,
  useTheme,
  useColorMode,
} from "@chakra-ui/theme";
import { BadgeOptions } from "./Badge";

type RequiredProps = Required<BadgeOptions>;

export interface UseBadgeStyleProps {
  variant: RequiredProps["variant"];
  color: RequiredProps["variantColor"];
}

type PropsWithTheme = UseBadgeStyleProps & { theme: Theme };

const solidStyle = ({ theme: { colors }, color }: PropsWithTheme) => {
  const _color = colors[color] && colors[color][500];
  const darkModeBg = addOpacity(_color, 0.6);
  return {
    light: {
      bg: get(color, "500"),
      color: "white",
    },
    dark: {
      bg: darkModeBg,
      color: "whiteAlpha.800",
    },
  };
};

const subtleStyle = ({ theme: { colors }, color }: PropsWithTheme) => {
  const _color = colors[color] && colors[color][200];
  const alphaColors = generateAlphaColors(_color);
  const darkModeBg = alphaColors[300];

  return {
    light: {
      bg: get(color, "100"),
      color: get(color, "800"),
    },
    dark: {
      bg: darkModeBg,
      color: get(color, "200"),
    },
  };
};

const outlineStyle = ({ theme: { colors }, color }: PropsWithTheme) => {
  const _color = colors[color] && colors[color][200];
  const darkModeColor = addOpacity(_color, 0.8);
  const boxShadowColor = colors[color] && colors[color][500];
  return {
    light: {
      boxShadow: `inset 0 0 0px 1px ` + boxShadowColor,
      color: get(color, "500"),
    },
    dark: {
      boxShadow: `inset 0 0 0px 1px ` + darkModeColor,
      color: darkModeColor,
    },
  };
};

const variantProps = (
  props: PropsWithTheme & { colorMode: "light" | "dark" },
) => {
  const { variant, colorMode } = props;
  switch (variant) {
    case "solid":
      return solidStyle(props)[colorMode];
    case "subtle":
      return subtleStyle(props)[colorMode];
    case "outline":
      return outlineStyle(props)[colorMode];
    default:
      return {};
  }
};

const useBadgeStyle = (props: UseBadgeStyleProps) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };

  return variantProps(_props);
};

export default useBadgeStyle;
