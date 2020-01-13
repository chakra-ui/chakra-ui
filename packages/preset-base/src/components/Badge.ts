import { addOpacity, generateAlphaColors, getColor } from "@chakra-ui/color";
import { VariantStyleFunction } from "./utils";

function getSolidStyle({
  theme,
  variantColor,
  colorMode,
}: VariantStyleFunction) {
  const style = {
    light: {
      bg: getColor(theme, `${variantColor}.500`),
      color: "white",
    },
    dark: {
      bg: addOpacity(`${variantColor}.500`, 0.6),
      color: "whiteAlpha.800",
    },
  };
  return style[colorMode];
}

function getSubtleStyle({
  theme,
  variantColor,
  colorMode,
}: VariantStyleFunction) {
  const alphaColors = generateAlphaColors(`${variantColor}.200`);
  const darkModeBg = alphaColors[300];

  const style = {
    light: {
      bg: getColor(theme, `${variantColor}.100`),
      color: getColor(theme, `${variantColor}.800`),
    },
    dark: {
      bg: darkModeBg,
      color: getColor(theme, `${variantColor}.200`),
    },
  };
  return style[colorMode];
}

function getOutlineStyle({
  theme,
  variantColor,
  colorMode,
}: VariantStyleFunction) {
  const darkModeColor = addOpacity(`${variantColor}.200`, 0.8)(theme);
  const lightModeColor = getColor(theme, `${variantColor}.500`);
  const style = {
    light: {
      boxShadow: `inset 0 0 0px 1px ` + lightModeColor,
      color: lightModeColor,
    },
    dark: {
      boxShadow: `inset 0 0 0px 1px ` + darkModeColor,
      color: darkModeColor,
    },
  };
  return style[colorMode];
}

const Badge = {
  baseStyle: {
    display: "inline-block",
    paddingX: 1,
    textTransform: "uppercase",
    fontSize: "xs",
    borderRadius: "sm",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  variant: {
    solid: getSolidStyle,
    outline: getOutlineStyle,
    subtle: getSubtleStyle,
  },
};

export default Badge;
