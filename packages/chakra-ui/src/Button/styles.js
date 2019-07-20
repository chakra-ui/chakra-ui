import { addOpacity, get } from "../theme/colors.utils";

const grayGhostStyle = {
  light: {
    color: "inherit",
    _hover: {
      bg: "gray.100"
    },
    _active: {
      bg: "gray.200"
    }
  },
  dark: {
    color: "alpha.900",
    _hover: {
      bg: "alpha.200"
    },
    _active: {
      bg: "alpha.300"
    }
  }
};

const ghostVariantProps = ({ color, mode, theme }) => {
  const _color = theme.colors[color][200];
  let result;
  if (color === "gray") {
    result = grayGhostStyle;
  } else {
    result = {
      light: {
        color: get(color, 500),
        bg: "transparent",
        _hover: {
          bg: get(color, 50)
        },
        _active: {
          bg: get(color, 100)
        }
      },
      dark: {
        color: get(color, 200),
        bg: "transparent",
        _hover: {
          bg: addOpacity(_color, 0.12)
        },
        _active: {
          bg: addOpacity(_color, 0.24)
        }
      }
    };
  }

  return result[mode];
};

////////////////////////////////////////////////////////////

const outlineVariantProps = props => {
  const { color, mode } = props;
  const borderColor = get(color, 500);
  const _borderColor = { light: "gray.200", dark: "alpha.300" };

  return {
    border: "1px",
    borderColor: color === "gray" ? _borderColor[mode] : borderColor,
    ...ghostVariantProps(props)
  };
};

////////////////////////////////////////////////////////////

const graySolidStyle = {
  light: {
    bg: "gray.100",
    _hover: {
      bg: "gray.200"
    },
    _active: {
      bg: "gray.300"
    }
  },
  dark: {
    bg: "alpha.300",
    _hover: {
      bg: "alpha.400"
    },
    _active: {
      bg: "alpha.500"
    }
  }
};

const solidVariantProps = ({ color, mode }) => {
  let result;
  if (color === "gray") {
    result = graySolidStyle;
  }

  result = {
    light: {
      bg: get(color, 500),
      color: "white",
      _hover: {
        bg: get(color, 600)
      },
      _active: {
        bg: get(color, 700)
      }
    },
    dark: {
      bg: get(color, 200),
      color: "gray.800",
      _hover: {
        bg: get(color, 300)
      },
      _active: {
        bg: get(color, 300)
      }
    }
  };

  return result[mode];
};

////////////////////////////////////////////////////////////

const linkVariantProps = ({ color }) => ({
  p: 0,
  height: "auto",
  lineHeight: "normal",
  color: get(color, 600),
  _hover: {
    textDecoration: "underline"
  },
  _active: {
    color: get(color, 700)
  }
});

////////////////////////////////////////////////////////////

const disabledProps = {
  _disabled: {
    opacity: "40%",
    cursor: "not-allowed",
    boxShadow: "none"
  }
};

////////////////////////////////////////////////////////////

const sizes = {
  xl: {
    height: "16",
    fontSize: "lg",
    px: 6,
    minWidth: "16"
  },
  lg: {
    height: "12",
    fontSize: "lg",
    px: 4,
    minWidth: "12"
  },
  md: {
    height: "10",
    fontSize: "md",
    px: 3,
    minWidth: "10"
  },
  sm: {
    height: "8",
    fontSize: "md",
    px: 2,
    minWidth: "8"
  }
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const focusProps = {
  _focus: {
    boxShadow: "outline"
  }
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
  textAlign: "inherit"
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
  verticalAlign: "middle"
};

////////////////////////////////////////////////////////////

const buttonStyle = props => {
  return {
    ...baseProps,
    ...sizeProps(props),
    ...focusProps,
    ...disabledProps,
    ...variantProps(props)
  };
};

export default buttonStyle;
