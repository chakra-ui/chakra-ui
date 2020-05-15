import Badge, { BadgeTokens } from "./Badge"
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
  variants: BadgeTokens,
}

export default Code
