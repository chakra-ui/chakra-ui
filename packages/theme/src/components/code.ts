import { styleConfig } from "@chakra-ui/theme-tools"
import { badgeStyles } from "./badge"

const { variants, defaultProps } = badgeStyles

const baseStyle = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm",
}

const code = styleConfig({
  baseStyle,
  variants,
  defaultProps,
})

export const codeStyles = {
  baseStyle,
  variants,
  defaultProps,
}

export default code
