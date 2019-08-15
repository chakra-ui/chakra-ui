import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";

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

const underlineProps = ({ variantColor: color, mode }) => {
  return {
    color: color ? `${color}.500` : "inherit",
    borderBottom: "1px",
    borderColor: color ? `${color}.200` : "gray.200",
    _hover: {
      borderColor: color ? `${color}.400` : "gray.400",
    },
  };
};

const bgUnderlineProps = ({ variantColor: color, mode }) => {
  return {
    bg: color ? `${color}.50` : "gray.100",
    borderBottom: "1px",
    borderColor: `blackAlpha.200`,
    _hover: {
      bg: color ? `${color}.100` : "gray.200",
      borderColor: "gray.300",
    },
  };
};

const basicProps = ({ variantColor: color, mode }) => {
  return {
    color: color ? `${color}.500` : "gray.500",
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
    case "underline":
      return underlineProps(props);
    case "bg-underline":
      return bgUnderlineProps(props);
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
