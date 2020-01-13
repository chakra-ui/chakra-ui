import { VariantStyleFunction, getModeValue } from "./utils";
import { getColor } from "@chakra-ui/color";

type InputVariant = VariantStyleFunction & {
  focusBorderColor: string;
  errorBorderColor: string;
};

function getOutlinedStyle(props: InputVariant) {
  const { focusBorderColor, errorBorderColor } = props;
  const bg = getModeValue(props, "white", "whiteAlpha.100");
  const borderColor = getModeValue(props, "inherit", "whiteAlpha.50");
  const hoverBorderColor = getModeValue(props, "gray.300", "whiteAlpha.200");

  const _focusBorderColor = getColor(props.theme, focusBorderColor);
  const _errorBorderColor = getColor(props.theme, errorBorderColor);

  return {
    border: "1px",
    borderColor: borderColor,
    bg: bg,
    _hover: {
      borderColor: hoverBorderColor,
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: _focusBorderColor,
      boxShadow: `0 0 0 1px ${_focusBorderColor}`,
    },
    _invalid: {
      borderColor: _errorBorderColor,
      boxShadow: `0 0 0 1px ${_errorBorderColor}`,
    },
  };
}

function getFilledStyle(props: InputVariant) {
  const { theme, focusBorderColor, errorBorderColor } = props;
  const bg = getModeValue(props.theme, "gray.100", "whiteAlpha.50");
  const hoverBg = getModeValue(props.theme, "gray.200", "whiteAlpha.100");

  const _focusBorderColor = getColor(theme.colors, focusBorderColor);
  const _errorBorderColor = getColor(theme.colors, errorBorderColor);

  return {
    border: "2px",
    borderColor: "transparent",
    bg: bg,
    _hover: {
      bg: hoverBg,
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: _focusBorderColor,
    },
    _invalid: {
      borderColor: _errorBorderColor,
    },
  };
}

function getFlushedStyle(props: InputVariant) {
  const { focusBorderColor, errorBorderColor } = props;

  const _focusBorderColor = getColor(props.theme, focusBorderColor);
  const _errorBorderColor = getColor(props.theme, errorBorderColor);

  return {
    borderBottom: "2px",
    borderColor: "inherit",
    rounded: 0,
    paddingX: undefined,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: _focusBorderColor,
    },
    _invalid: {
      borderColor: _errorBorderColor,
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
