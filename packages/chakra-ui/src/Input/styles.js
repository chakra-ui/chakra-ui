/** @jsx jsx */
import { useTheme, useUIMode } from "../ThemeProvider";

const outlinedStyle = ({
  _focusBorderColor = "blue",
  theme: { colors },
  mode
}) => {
  const bg = { light: "white", dark: "whiteAlpha.100" };
  const borderColor = { light: "inherit", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.300", dark: "whiteAlpha.200" };

  const boxShadow = colors[_focusBorderColor][500];

  const invalidColor = { light: "red.500", dark: "red.300" };
  const invalidBoxShadow = { light: colors.red[500], dark: colors.red[300] };

  return {
    ...readOnly,
    border: "1px",
    borderColor: borderColor[mode],
    bg: bg[mode],
    _hover: {
      borderColor: hoverColor[mode]
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed"
    },
    _focus: {
      borderColor: `${_focusBorderColor}.500`,
      boxShadow: `0 0 0 1px ${boxShadow}`
    },
    _invalid: {
      borderColor: invalidColor[mode],
      boxShadow: `0 0 0 1px ${invalidBoxShadow[mode]}`
    }
  };
};

const readOnly = {
  _readOnly: {
    bg: "transparent",
    boxShadow: "none !important",
    userSelect: "all"
  }
};

const filledStyle = ({ _focusBorderColor, mode }) => {
  const bg = { light: "gray.100", dark: "whiteAlpha.50" };
  const hoverColor = { light: "gray.200", dark: "whiteAlpha.100" };
  const invalidColor = { light: "red.500", dark: "red.300" };
  const focusColor = {
    light: `${_focusBorderColor}.500`,
    dark: `${_focusBorderColor}.300`
  };

  return {
    ...readOnly,
    border: "2px",
    borderColor: "transparent",
    bg: bg[mode],
    _hover: {
      bg: hoverColor[mode]
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed"
    },
    _focus: {
      bg: "transparent",
      borderColor: focusColor[mode]
    },
    _invalid: {
      borderColor: invalidColor[mode]
    }
  };
};

const flushedStyle = ({ mode }) => {
  const focusColor = { light: "blue.500", dark: "blue.300" };
  const errorColor = { light: "red.500", dark: "red.300" };

  return {
    ...readOnly,
    borderBottom: "2px",
    borderColor: "inherit",
    rounded: 0,
    px: undefined,
    bg: "transparent",
    _focus: {
      borderColor: focusColor[mode]
    },
    _invalid: {
      borderColor: errorColor[mode]
    }
  };
};

const unstyledStyle = {
  bg: "transparent",
  px: undefined,
  height: undefined
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
  transition: "all 0.2s"
};

export const inputSizes = {
  lg: {
    fontSize: "lg",
    px: 4,
    height: "12",
    lineHeight: "24px",
    rounded: "md"
  },
  md: {
    fontSize: "md",
    px: 3,
    height: "10",
    lineHeight: "20px",
    rounded: "md"
  },
  sm: {
    fontSize: "sm",
    px: 2,
    height: "8",
    lineHeight: "16px",
    rounded: "sm"
  }
};

const sizeProps = props => inputSizes[props.size];

const useInputStyle = props => {
  const theme = useTheme();
  const { mode } = useUIMode();

  const _props = { ...props, theme, mode };

  return {
    width: props.isFullWidth ? "100%" : undefined,
    ...baseProps,
    ...sizeProps(_props),
    ...variantProps(_props)
    // pb: "1px"
  };
};

export default useInputStyle;
