import { addOpacity, generateAlphaColors, getColor } from "@chakra-ui/color";
import { VariantStyleFunction, getModeColor } from "./utils";

function getSolidStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  const darkBg = addOpacity(`${c}.500`, 0.6);
  return {
    bg: getModeColor(props, `${c}.500`, darkBg),
    color: getModeColor(props, `white`, `whiteAlpha.800`),
  };
}

function getSubtleStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  const alphaColors = generateAlphaColors(`${c}.200`);
  const darkModeBg = alphaColors[300];

  return {
    bg: getModeColor(props, `${c}.200`, darkModeBg),
    color: getModeColor(props, `${c}.800`, `${c}.200`),
  };
}

function getOutlineStyle(props: VariantStyleFunction) {
  const { variantColor: c, theme: t } = props;
  const darkModeColor = addOpacity(`${c}.200`, 0.8)(t);
  const lightModeColor = getColor(t, `${c}.500`);
  const color = getModeColor(props, lightModeColor, darkModeColor);

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ` + color,
  };
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
