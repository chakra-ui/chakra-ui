import { colorEmphasis, getColor } from "@chakra-ui/color";
import { VariantStyleFunction, getModeColor } from "./utils";

function getSubtleStyle(props: VariantStyleFunction) {
  const { theme: t, variantColor: c } = props;
  const lightBg = getColor(t, `${c}.100`, c);
  const darkBg = colorEmphasis(`${c}.200`, "lowest");

  return { bg: getModeColor(props, lightBg, darkBg) };
}

function getLeftAccentStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  const borderColor = getModeColor(props, `${c}.500`, `${c}.200`);

  return {
    paddingLeft: 3,
    borderLeft: "4px solid",
    borderColor,
    ...getSubtleStyle(props),
  };
}

function getTopAccentStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  const borderColor = getModeColor(props, `${c}.500`, `${c}.200`);

  return {
    paddingTop: 2,
    borderTop: "4px solid",
    borderColor,
    ...getSubtleStyle(props),
  };
}

function getSolidStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  return {
    bg: getModeColor(props, `${c}.500`, `${c}.200`),
    color: getModeColor(props, `white`, `gray.900`),
  };
}

export default {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  variant: {
    solid: getSolidStyle,
    subtle: getSubtleStyle,
    "left-accent": getLeftAccentStyle,
    "top-accent": getTopAccentStyle,
  },
};
