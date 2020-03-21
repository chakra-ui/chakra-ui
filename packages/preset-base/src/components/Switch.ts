import { ComponentTheme, getModeColor } from "./utils"

const variantSize: ComponentTheme["variantSize"] = {
  __default: "md",
  sm: {
    Track: {
      width: "1.375rem",
      height: "0.75rem",
    },
    Thumb: {
      size: "0.75rem",
      _checked: { transform: `translateX(0.625rem)` },
    },
  },
  md: {
    Track: {
      width: "1.875rem",
      height: "1rem",
    },
    Thumb: {
      size: "1rem",
      _checked: { transform: `translateX(0.875rem)` },
    },
  },
  lg: {
    Track: {
      width: "2.875rem",
      height: "1.5rem",
    },
    Thumb: {
      size: "1.5rem",
      _checked: { transform: `translateX(1.375rem)` },
    },
  },
}

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
      bg: "white",
      transition: "transform 250ms",
      borderRadius: "full",
      transform: `translateX(0)`,
    },
  }),
  variantSize,
}

export default Switch
