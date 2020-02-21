import { ComponentTheme } from "./utils"
import Badge from "./Badge"

const Tag: ComponentTheme = {
  baseStyle: {
    outline: 0,
    _focus: {
      boxShadow: "outline",
    },
  },
  variantSize: {
    __default: "md",
    sm: {
      minHeight: "1.25rem",
      minWidth: "1.25rem",
      fontSize: "xs",
      paddingX: 1,
      borderRadius: "sm",
    },
    md: {
      minHeight: "1.5rem",
      minWidth: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      paddingX: 2,
    },
    lg: {
      minHeight: 8,
      minWidth: 8,
      fontSize: "md",
      borderRadius: "md",
      paddingX: 3,
    },
  },
  variant: Badge.variant,
}

export default Tag
