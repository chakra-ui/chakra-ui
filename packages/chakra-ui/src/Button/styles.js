import { addOpacity } from "../theme/colors-utils";
import { useColorMode } from "../ColorModeProvider";
import { useTheme } from "../ThemeProvider";

const grayGhostStyle = {
  light: {
    color: "inherit",
    _hover: {
      bg: "gray.100",
    },
    _active: {
      bg: "gray.200",
    },
  },
  dark: {
    color: "whiteAlpha.900",
    _hover: {
      bg: "whiteAlpha.200",
    },
    _active: {
      bg: "whiteAlpha.300",
    },
  },
};

const ghostVariantProps = ({ color, colorMode, theme }) => {
  const _color = theme.colors[color] && theme.colors[color][200];
  let result;
  if (color === "gray") {
    result = grayGhostStyle;
  } else {
    result = {
      light: {
        color: `${color}.500`,
        bg: "transparent",
        _hover: {
          bg: `${color}.50`,
        },
        _active: {
          bg: `${color}.100`,
        },
      },
      dark: {
        color: `${color}.200`,
        bg: "transparent",
        _hover: {
          bg: addOpacity(_color, 0.12),
        },
        _active: {
          bg: addOpacity(_color, 0.24),
        },
      },
    };
  }

  return result[colorMode];
};

////////////////////////////////////////////////////////////

const outlineVariantProps = props => {
  const { color, colorMode} = props;
  const borderColor = { light: "gray.200", dark: "whiteAlpha.300" };

  return {
    border: "1px",
    borderColor: color === "gray" ? borderColor[colorMode] : "current",
    ...ghostVariantProps(props),
  };
};

////////////////////////////////////////////////////////////

const graySolidStyle = {
  light: {
    bg: "gray.100",
    _hover: {
      bg: "gray.200",
    },
    _active: {
      bg: "gray.300",
    },
  },
  dark: {
    bg: "whiteAlpha.200",
    _hover: {
      bg: "whiteAlpha.300",
    },
    _active: {
      bg: "whiteAlpha.400",
    },
  },
};

const solidVariantProps = ({ color, colorMode}) => {
  let style = {
    light: {
      bg: `${color}.500`,
      color: "white",
      _hover: {
        bg: `${color}.600`,
      },
      _active: {
        bg: `${color}.700`,
      },
    },
    dark: {
      bg: `${color}.200`,
      color: "gray.800",
      _hover: {
        bg: `${color}.300`,
      },
      _active: {
        bg: `${color}.400`,
      },
    },
  };

  if (color === "gray") {
    style = graySolidStyle;
  }

  return style[colorMode];
};

////////////////////////////////////////////////////////////

const linkVariantProps = ({ color, colorMode}) => {
  const _color = { light: `${color}.500`, dark: `${color}.200` };
  const _activeColor = { light: `${color}.700`, dark: `${color}.500` };
  return {
    p: 0,
    height: "auto",
    lineHeight: "normal",
    color: _color[colorMode],
    _hover: {
      textDecoration: "underline",
    },
    _active: {
      color: _activeColor[colorMode],
    },
  };
};

////////////////////////////////////////////////////////////

const disabledProps = {
  _disabled: {
    opacity: "40%",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

////////////////////////////////////////////////////////////

const sizes = {
  lg: {
    height: 9,
    minWidth: 9,
    fontSize: "lg",
    px: 6,
  },
  md: {
    height: 8,
    minWidth: 8,
    fontSize: "md",
    px: 4,
  },
  sm: {
    height: 7,
    minWidth: 7,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: "sm",
    px: 2,
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const focusProps = {
  _focus: {
    boxShadow: "outline",
  },
};

////////////////////////////////////////////////////////////

const unstyledStyle = {
  userSelect: "inherit",
  bg: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  m: 0,
  p: 0,
  textAlign: "inherit",
};

////////////////////////////////////////////////////////////

const variantProps = props => {
  switch (props.variant) {
    case "solid":
      return solidVariantProps(props);
    case "ghost":
      return ghostVariantProps(props);
    case "link":
      return linkVariantProps(props);
    case "outline":
      return outlineVariantProps(props);
    case "unstyled":
      return unstyledStyle;
    default:
      return {};
  }
};

////////////////////////////////////////////////////////////

const baseProps = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "1.2",
};

////////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...sizeProps(_props),
    ...focusProps,
    ...disabledProps,
    ...variantProps(_props),
  };
};

export default useButtonStyle;
