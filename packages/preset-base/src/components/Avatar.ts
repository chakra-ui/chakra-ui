import sizes from "../foundations/sizes"
import { ComponentTheme } from "./utils"

const calc = (size: keyof typeof sizes) => ({
  boxSize: size,
  fontSize: `calc(${sizes[size] || size} / 2.5)`,
  lineHeight: sizes[size] || size,
})

const Avatar: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  sizes: {
    "2xs": calc("4"),
    xs: calc("6"),
    sm: calc("8"),
    md: calc("12"),
    lg: calc("16"),
    xl: calc("24"),
    "2xl": calc("32"),
    full: { boxSize: "100%", fontSize: `calc(100% / 2.5)` },
  },
}

export default Avatar
