import { StyleFunctionProps, getModeColor as get } from "./utils";
import { getColor } from "@chakra-ui/color";

type InputOptions = StyleFunctionProps & {
  focusBorderColor: string;
  errorBorderColor: string;
  isFullWidth?: boolean;
};

function getOutlinedStyle(props: InputOptions) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props;
  return {
    border: "1px solid",
    borderColor: get(props, "inherit", "whiteAlpha.50"),
    bg: get(props, "white", "whiteAlpha.100"),
    _hover: {
      borderColor: get(props, "gray.300", "whiteAlpha.200"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
      boxShadow: `0 0 0 1px ${getColor(t, fc)}`,
    },
    _invalid: {
      borderColor: getColor(t, ec),
      boxShadow: `0 0 0 1px ${getColor(t, ec)}`,
    },
  };
}

function getFilledStyle(props: InputOptions) {
  const { theme: t, focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: get(props, "gray.100", "whiteAlpha.50"),
    _hover: {
      bg: get(props, "gray.200", "whiteAlpha.100"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  };
}

function getFlushedStyle(props: InputOptions) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props;

  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    radius: 0,
    px: 0,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  };
}

const unstyled = {
  bg: "transparent",
  px: 0,
  height: "auto",
};

const variantSize = {
  __default: "md",
  lg: {
    fontSize: "lg",
    px: 4,
    height: 12,
    // lineHeight: "3rem",
    radius: "md",
  },
  md: {
    fontSize: "md",
    px: 4,
    height: 10,
    // lineHeight: "2.5rem",
    radius: "md",
  },
  sm: {
    fontSize: "sm",
    px: 3,
    height: 8,
    // lineHeight: "2rem",
    radius: "sm",
  },
};

export default {
  baseStyle: (props: InputOptions) => ({
    width: props.isFullWidth ? "100%" : "auto",
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "all 0.2s",
    outline: "none",
  }),
  variantSize,
  variant: {
    __default: "outline",
    outline: getOutlinedStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
};
