import { addOpacity } from "../theme/colors-utils";
import { useColorMode } from "../ColorModeProvider";
import { useTheme } from "../ThemeProvider";
import { ButtonOptions } from "./Button";
import { SystemProps } from "../Box";
import { Theme } from "../theme";

// TODO: Move all these to theme object
// Under theme.components.Button = {root: "", variants: "", sizes: ""}

const grayGhostStyle: { [k in "light" | "dark"]: SystemProps } = {
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

const ghostVariantProps = ({
  color,
  colorMode,
  theme,
}: VariantStyleProps): SystemProps => {
  const _color = theme.colors[color] && theme.colors[color][200];
  let result: { [k: string]: SystemProps };
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

const outlineVariantProps = (props: VariantStyleProps): SystemProps => {
  const { color, colorMode } = props;
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

const solidVariantProps = ({
  color,
  colorMode,
}: VariantStyleProps): SystemProps => {
  let style: { [k: string]: SystemProps } = {
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

const linkVariantProps = ({
  color,
  colorMode,
}: VariantStyleProps): SystemProps => {
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

const disabledProps: SystemProps = {
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

////////////////////////////////////////////////////////////

const sizes = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: "lg",
    px: 6,
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: "md",
    px: 4,
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: "xs",
    px: 2,
  },
};

const sizeProps = ({
  size,
}: {
  size: keyof typeof sizes;
}): {
  height: number;
  minWidth: number;
  fontSize: string;
  px: number;
} => sizes[size];

////////////////////////////////////////////////////////////

const focusProps: SystemProps = {
  _focus: {
    boxShadow: "outline",
  },
};

////////////////////////////////////////////////////////////

const unstyledStyle: SystemProps = {
  userSelect: "inherit",
  bg: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  fontFamily: "inherit",
  lineHeight: "inherit",
  m: 0,
  p: 0,
  textAlign: "inherit",
};

////////////////////////////////////////////////////////////

const variantProps = (props: VariantStyleProps) => {
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

const baseProps: SystemProps = {
  display: "inline-flex",
  appearance: "none",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "1.2",
  outline: "none",
};

////////////////////////////////////////////////////////////

interface VariantStyleProps extends useButtonStyleProps {
  colorMode: "light" | "dark";
  theme: Theme;
}

type RequiredButtonOptions = Required<ButtonOptions>;

interface useButtonStyleProps {
  color: RequiredButtonOptions["variantColor"];
  variant: RequiredButtonOptions["variant"];
  size: RequiredButtonOptions["size"];
}
const useButtonStyle = (props: useButtonStyleProps): SystemProps => {
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
