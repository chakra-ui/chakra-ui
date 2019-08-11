import React from "react";
import { useTheme } from "src/ThemeProvider";
import { useColorMode } from "src/ColorModeProvider";

const baseProps = {
  transition: `all 0.15s ease-out`,
  cursor: "pointer",
  textDecoration: "none",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: "40%",
    cursor: "not-allowed",
    textDecoration: "none",
  },
};

const unstyledProps = {
  color: "inherit",
};

const niceBorderProps = ({ color, mode }) => {
  return {
    color: `${color}.500`,
    borderBottom: "1px",
    borderColor: `${color}.200`,
    _hover: {
      borderColor: `${color}.700`,
    },
  };
};

const niceBgProps = ({ color, mode }) => {
  return {
    bg: `${color}.50`,
    borderBottom: "1px",
    borderColor: `blackAlpha.200`,
    _hover: { bg: `${color}.100`, borderColor: "gray.300" },
  };
};

const basicProps = ({ color, mode }) => {
  return {
    color: `${color}.500`,
    _hover: {
      textDecoration: "underline",
    },
    _active: {
      opacity: "80%",
    },
  };
};

const variantProps = props => {
  switch (props.variant) {
    case "unstyled":
      return unstyledProps;
    case "nice-border":
      return niceBorderProps(props);
    case "nice-bg":
      return niceBgProps(props);
    case "basic":
      return basicProps(props);
    default:
      return {};
  }
};

const useLinkStyle = props => {
  const theme = useTheme();
  const { mode } = useColorMode();

  return {
    ...baseProps,
    ...variantProps({ theme, mode, ...props }),
  };
};

export default useLinkStyle;
