import Badge from "./Badge"
import { ComponentTheme } from "./utils"

const Code: ComponentTheme = {
  baseStyle: {
    display: "inline-block",
    fontFamily: "mono",
    fontSize: "sm",
    paddingX: "0.2em",
    radius: "sm",
  },
  variants: Badge.variants,
} as any
export default Code
