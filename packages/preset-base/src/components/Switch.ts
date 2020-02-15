import { ComponentTheme, getModeColor } from "./utils";

const variantSize = {
  __default: "md",
  sm: {
    Track: {
      width: "1.375rem",
      height: "0.75rem",
    },
    Thumb: {
      _checked: {
        transform: `translateX(calc(1.375rem - 0.75rem))`,
      },
    },
  },
  md: {
    Track: {
      width: "1.875rem",
      height: "1rem",
    },
    Thumb: {
      _checked: {
        transform: `translateX(calc(1.875rem - 1rem))`,
      },
    },
  },
  lg: {
    Track: {
      width: "2.875rem",
      height: "1.5rem",
    },
    Thumb: {
      _checked: {
        transform: `translateX(calc(1.875rem - 1rem))`,
      },
    },
  },
};

const Switch: ComponentTheme = {
  baseStyle: props => ({
    Track: {
      borderRadius: "full",
      justifyContent: "flex-start",
      boxSizing: "content-box",
      padding: "2px",
      cursor: "pointer",
      bg: getModeColor(props, "gray.300", "whiteAlpha.400"),
      _focus: { boxShadow: "outline" },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _checked: { bg: `${props.variantColor}.500` },
    },
    Thumb: {
      transform: `translateX(0)`,
    },
  }),
  variantSize,
};

export default Switch;
