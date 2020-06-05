import Badge, { BadgeTokens } from "./_badge"
import { ComponentTheme } from "./utils"

const Code: ComponentTheme = {
  defaultProps: Badge.defaultProps,
  baseStyle: {
    fontFamily: "mono",
    fontSize: "sm",
    paddingX: "0.2em",
    borderRadius: "sm",
  },
  variants: Badge.variants,
}

export const CodeTokens = {
  variants: BadgeTokens.variants,
}

export default Code
