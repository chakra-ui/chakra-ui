import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";

const outlinedStyle = ({
  theme: { colors },
  colorMode,
  focusBorderColor,
  errorBorderColor,
}) => {
  const bg = { light: "white", dark: "whiteAlpha.100" };
  const borderColor = { light: "inherit", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.300", dark: "whiteAlpha.200" };

  const boxShadow = colors[focusBorderColor] && colors[focusBorderColor][500];

  const invalidColor = { light: "red.500", dark: "red.300" };
  const invalidBoxShadow = { light: errorBorderColor, dark: errorBorderColor };

  return {
    ...readOnly,
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
      borderColor: focusBorderColor,
      boxShadow: `0 0 0 1px ${boxShadow}`,
    },
    _invalid: {
      borderColor: invalidColor[colorMode],
      boxShadow: `0 0 0 1px ${invalidBoxShadow[colorMode]}`,
    },
  };
};

const readOnly = {
  _readOnly: {
    bg: "transparent",
    boxShadow: "none !important",
    userSelect: "all",
  },
};

const filledStyle = ({ focusBorderColor, errorBorderColor, colorMode }) => {
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.200", dark: "whiteAlpha.100" };
  const invalidColor = { light: errorBorderColor, dark: errorBorderColor };
  const focusColor = {
    light: focusBorderColor,
    dark: focusBorderColor,
  };

  return {
    ...readOnly,
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
      bg: "transparent",
      borderColor: focusColor[colorMode],
    },
    _invalid: {
      borderColor: invalidColor[colorMode],
    },
  };
};

const flushedStyle = ({ colorMode, focusBorderColor, errorBorderColor }) => {
  const focusColor = { light: focusBorderColor, dark: focusBorderColor };
  const errorColor = { light: errorBorderColor, dark: errorBorderColor };

  return {
    ...readOnly,
    borderBottom: "2px",
    borderColor: "inherit",
    rounded: 0,
    px: undefined,
    bg: "transparent",
    _focus: {
      borderColor: focusColor[colorMode],
    },
    _invalid: {
      borderColor: errorColor[colorMode],
    },
  };
};

const unstyledStyle = {
  bg: "transparent",
  px: undefined,
  height: undefined,
};

const variantProps = props => {
  switch (props.variant) {
    case "flushed":
      return flushedStyle(props);
    case "unstyled":
      return unstyledStyle;
    case "filled":
      return filledStyle(props);
    case "outline":
      return outlinedStyle(props);
    default:
      return {};
  }
};

const baseProps = {
  display: "flex",
  alignItems: "center",
  position: "relative",
  transition: "all 0.2s",
  outline: "none",
};

export const inputSizes = {
  lg: {
    fontSize: "lg",
    px: 4,
    height: 12,
    lineHeight: "3rem",
    rounded: "md",
  },
  md: {
    fontSize: "md",
    px: 4,
    height: 10,
    lineHeight: "2.5rem",
    rounded: "md",
  },
  sm: {
    fontSize: "sm",
    px: 3,
    height: 8,
    lineHeight: "2rem",
    rounded: "sm",
  },
};

const sizeProps = props => inputSizes[props.size];

const useInputStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const _props = { ...props, theme, colorMode };

  return {
    width: props.isFullWidth ? "100%" : undefined,
    ...baseProps,
    ...sizeProps(_props),
    ...variantProps(_props),
    // pb: "1px"
  };
};

export default useInputStyle;
