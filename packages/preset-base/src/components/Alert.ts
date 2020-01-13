import { colorEmphasis } from "@chakra-ui/color";
import { VariantStyleFunction } from "./utils";

function getSubtleStyle({ variantColor, colorMode }: VariantStyleFunction) {
  const style = {
    light: {
      bg: `${variantColor}.100`,
    },
    dark: { bg: colorEmphasis(`${variantColor}.200`, "lowest") },
  };
  return style[colorMode];
}

function getLeftAccentStyle(props: VariantStyleFunction) {
  const { variantColor, colorMode } = props;
  const style = {
    light: {
      paddingLeft: 3,
      borderLeft: "4px solid",
      borderColor: `${variantColor}.500`,
    },
    dark: {
      paddingLeft: 3,
      borderLeft: "4px solid",
      borderColor: `${variantColor}.200`,
    },
  };
  return {
    ...getSubtleStyle(props),
    ...style[colorMode],
  };
}

function getTopAccentStyle(props: VariantStyleFunction) {
  const { variantColor, colorMode } = props;
  const style = {
    light: {
      paddingTop: 2,
      borderTop: "4px solid",
      borderColor: `${variantColor}.500`,
    },
    dark: {
      paddingTop: 2,
      borderTop: "4px solid",
      borderColor: `${variantColor}.200`,
    },
  };
  return {
    ...getSubtleStyle(props),
    ...style[colorMode],
  };
}

function getSolidStyle({ variantColor, colorMode }: VariantStyleFunction) {
  const style = {
    light: { bg: `${variantColor}.500`, color: "white" },
    dark: { bg: `${variantColor}.200`, color: "gray.900" },
  };
  return style[colorMode as keyof typeof style];
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
