import { addOpacity } from "@chakra-ui/color";
import { VariantStyleFunction, getModeColor as get } from "./utils";

const grayGhostStyle = (props: VariantStyleFunction) => ({
  color: get(props, `inherit`, `whiteAlpha.900`),
  _hover: {
    bg: get(props, `gray.100`, `whiteAlpha.200`),
  },
  _active: {
    bg: get(props, `gray.200`, `whiteAlpha.300`),
  },
});

////////////////////////////////////////////////////////////

function getGhostStyle(props: VariantStyleFunction) {
  const { variantColor: c, theme: t } = props;
  if (c === "gray") return grayGhostStyle(props);

  const darkHoverBg = addOpacity(`${c}.200`, 0.12)(t);
  const darkActiveBg = addOpacity(`${c}.200`, 0.24)(t);

  return {
    color: get(props, `${c}.500`, `${c}.200`),
    bg: "transparent",
    _hover: {
      bg: get(props, `${c}.50`, darkHoverBg),
    },
    _active: {
      bg: get(props, `${c}.100`, darkActiveBg),
    },
  };
}

////////////////////////////////////////////////////////////

function getOutlineStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  const borderColor = get(props, `gray.200`, `whiteAlpha.300`);

  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "current",
    ...getGhostStyle(props),
  };
}

////////////////////////////////////////////////////////////

const graySolidStyle = (props: VariantStyleFunction) => ({
  bg: get(props, `gray.100`, `whiteAlpha.200`),
  _hover: {
    bg: get(props, `gray.200`, `whiteAlpha.300`),
  },
  _active: {
    bg: get(props, `gray.300`, `whiteAlpha.400`),
  },
});

function getSolidStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  if (c === "gray") return graySolidStyle(props);

  return {
    bg: get(props, `${c}.500`, `${c}.200`),
    color: get(props, `${c}.600`, `gray.800`),
    _hover: { bg: get(props, `${c}.600`, `${c}.300`) },
    _active: { bg: get(props, `${c}.700`, `${c}.400`) },
  };
}

////////////////////////////////////////////////////////////

function getLinkStyle(props: VariantStyleFunction) {
  const { variantColor: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    color: get(props, `${c}.500`, `${c}.200`),
    _hover: {
      textDecoration: "underline",
    },
    _active: {
      color: get(props, `${c}.700`, `${c}.500`),
    },
  };
}

////////////////////////////////////////////////////////////

const variantSize = {
  lg: {
    height: 12,
    minWidth: 12,
    fontSize: "lg",
    paddingX: 6,
  },
  md: {
    height: 10,
    minWidth: 10,
    fontSize: "md",
    paddingX: 4,
  },
  sm: {
    height: 8,
    minWidth: 8,
    fontSize: "sm",
    paddingX: 3,
  },
  xs: {
    height: 6,
    minWidth: 6,
    fontSize: "xs",
    paddingX: 2,
  },
};

////////////////////////////////////////////////////////////

const unstyled = {
  userSelect: "inherit",
  bg: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  margin: 0,
  padding: 0,
  textAlign: "inherit",
};

const baseStyle = {
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
  borderRadius: "md",
  fontWeight: "semibold",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

////////////////////////////////////////////////////////////
const Button = {
  baseStyle,
  variantSize: {
    __default: "md",
    ...variantSize,
  },
  variant: {
    __default: "solid",
    unstyled,
    solid: getSolidStyle,
    ghost: getGhostStyle,
    link: getLinkStyle,
    outline: getOutlineStyle,
  },
};

export default Button;
