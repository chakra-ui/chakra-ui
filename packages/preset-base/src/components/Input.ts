import { VariantStyleFunction, getModeColor } from "./utils";
import { getColor } from "@chakra-ui/color";

type InputVariant = VariantStyleFunction & {
  focusBorderColor: string;
  errorBorderColor: string;
};

function getOutlinedStyle(props: InputVariant) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props;
  return {
    border: "1px solid",
    borderColor: getModeColor(props, "inherit", "whiteAlpha.50"),
    bg: getModeColor(props, "white", "whiteAlpha.100"),
    _hover: {
      borderColor: getModeColor(props, "gray.300", "whiteAlpha.200"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
      boxShadow: `0 0 0 1px ${getColor(t, fc)}`,
    },
    _invalid: {
      borderColor: getColor(t, ec),
      boxShadow: `0 0 0 1px ${getColor(t, ec)}`,
    },
  };
}

function getFilledStyle(props: InputVariant) {
  const { theme: t, focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: getModeColor(props, "gray.100", "whiteAlpha.50"),
    _hover: {
      bg: getModeColor(props, "gray.200", "whiteAlpha.100"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  };
}

function getFlushedStyle(props: InputVariant) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props;

  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    rounded: 0,
    paddingX: undefined,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  };
}

const unstyled = {
  bg: "transparent",
  paddingX: 0,
  height: "auto",
};

export default {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "all 0.2s",
    outline: "none",
  },
  variantSize: {},
  variant: {
    outline: getOutlinedStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
};
