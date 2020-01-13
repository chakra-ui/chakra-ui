import { VariantStyleFunction } from "./utils";

type InputVariant = VariantStyleFunction & {
  focusBorderColor: string;
  errorBorderColor: string;
};

function getOutlinedStyle({
  theme,
  get,
  colorMode,
  focusBorderColor,
  errorBorderColor,
}: InputVariant) {
  const bg = { light: "white", dark: "whiteAlpha.100" };
  const borderColor = { light: "inherit", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.300", dark: "whiteAlpha.200" };

  const _focusBorderColor = get(
    theme.colors,
    focusBorderColor,
    focusBorderColor,
  );
  const _errorBorderColor = get(
    theme.colors,
    errorBorderColor,
    errorBorderColor,
  );

  return {
    border: "1px",
    borderColor: borderColor[colorMode],
    bg: bg[colorMode],
    _hover: {
      borderColor: hoverColor[colorMode],
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

function getFilledStyle({
  theme,
  get,
  focusBorderColor,
  errorBorderColor,
  colorMode,
}: InputVariant) {
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.200", dark: "whiteAlpha.100" };

  const _focusBorderColor = get(
    theme.colors,
    focusBorderColor,
    focusBorderColor,
  );
  const _errorBorderColor = get(
    theme.colors,
    errorBorderColor,
    errorBorderColor,
  );

  return {
    border: "2px",
    borderColor: "transparent",
    bg: bg[colorMode],
    _hover: {
      bg: hoverColor[colorMode],
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

function getFlushedStyle({
  get,
  theme,
  focusBorderColor,
  errorBorderColor,
}: InputVariant) {
  const _focusBorderColor = get(
    theme.colors,
    focusBorderColor,
    focusBorderColor,
  );
  const _errorBorderColor = get(
    theme.colors,
    errorBorderColor,
    errorBorderColor,
  );

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
  baseStyles: {
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
