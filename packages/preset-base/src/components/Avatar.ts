import sizes from "../foundations/sizes"

const compute = (size: keyof typeof sizes) => ({
  size,
  fontSize: `calc(${sizes[size] || size} / 2.5)`,
  lineHeight: sizes[size] || size,
})

export default {
  baseStyle: {
    display: "inline-flex",
    borderRadius: "full",
    alignItems: "center",
    flexShrink: "0",
    justifyContent: "center",
    position: "relative",
  },
  variantSize: {
    "2xs": compute("4"),
    xs: compute("6"),
    sm: compute("8"),
    md: compute("12"),
    lg: compute("16"),
    xl: compute("24"),
    "2xl": compute("32"),
    full: { size: "full", fontSize: `calc(100% / 2.5)` },
  },
}
