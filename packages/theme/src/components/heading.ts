const baseStyle = {
  fontFamily: "heading",
  fontWeight: "bold",
}

const sizes = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1,
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1,
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: ["2.5rem", null, "1"],
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: ["2.25rem", null, "2.5rem"],
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: ["2rem", null, "2.25rem"],
  },
  md: { fontSize: "xl", lineHeight: "1.75rem" },
  sm: { fontSize: "md", lineHeight: "1.5rem" },
  xs: { fontSize: "sm", lineHeight: "1.25rem" },
}

const defaultProps = {
  size: "xl",
}

export default {
  baseStyle,
  sizes,
  defaultProps,
}
