import { ComponentTheme, mode } from "./utils"

const sizes: ComponentTheme["sizes"] = {
  sm: {
    Track: {
      width: "1.375rem",
      height: "0.75rem",
    },
    Thumb: {
      width: "0.75rem",
      height: "0.75rem",
      _checked: { transform: `translateX(0.625rem)` },
    },
  },
  md: {
    Track: {
      width: "1.875rem",
      height: "1rem",
    },
    Thumb: {
      width: "1rem",
      height: "1rem",
      _checked: { transform: `translateX(0.875rem)` },
    },
  },
  lg: {
    Track: {
      width: "2.875rem",
      height: "1.5rem",
    },
    Thumb: {
      width: "1.5rem",
      height: "1.5rem",
      _checked: { transform: `translateX(1.375rem)` },
    },
  },
}

const Switch: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: props => ({
    Track: {
      borderRadius: "full",
      justifyContent: "flex-start",
      boxSizing: "content-box",
      padding: "2px",
      cursor: "pointer",
      bg: mode("gray.300", "whiteAlpha.400")(props),
      _focus: { boxShadow: "outline" },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _checked: { bg: `${props.colorScheme}.500` },
    },
    Thumb: {
      bg: "white",
      transition: "transform 250ms",
      borderRadius: "full",
      transform: `translateX(0)`,
    },
  }),
  sizes,
}

export default Switch
