import { styleConfig } from "@chakra-ui/theme-tools"
import { badgeStyles } from "./badge"

const {
  defaultProps,
  variantSolid,
  variantSubtle,
  variantOutline,
} = badgeStyles

const baseStyle = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm",
}

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline,
}

const code = styleConfig({
  baseStyle,
  variants,
  // @ts-ignore
  defaultProps,
})

export const codeStyles = {
  baseStyle,
  variantSolid,
  variantSubtle,
  variantOutline,
  defaultProps,
}

export default code
