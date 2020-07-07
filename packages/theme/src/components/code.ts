import Badge, { BadgeVariants } from "./badge"
import { ComponentTheme } from "@chakra-ui/theme-tools/src"

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

export const CodeVariants = BadgeVariants

export default Code
