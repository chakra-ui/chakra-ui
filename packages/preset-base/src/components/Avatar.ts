import sizes from "../foundations/sizes"
import { ComponentTheme } from "./utils"

const compute = (size: keyof typeof sizes) => ({
  width: size,
  height: size,
  fontSize: `calc(${sizes[size] || size} / 2.5)`,
  lineHeight: sizes[size] || size,
})

const Avatar: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  baseStyle: {
    display: "inline-flex",
    borderRadius: "full",
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
    position: "relative",
  },
  sizes: {
    "2xs": compute("4"),
    xs: compute("6"),
    sm: compute("8"),
    md: compute("12"),
    lg: compute("16"),
    xl: compute("24"),
    "2xl": compute("32"),
    full: { width: "100%", height: "100%", fontSize: `calc(100% / 2.5)` },
  },
}
export default Avatar
