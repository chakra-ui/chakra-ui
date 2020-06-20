import { ComponentTheme } from "@chakra-ui/theme-tools"

const Icon: ComponentTheme = {
  defaultProps: {
    size: "md",
  },
  sizes: {
    xl: { boxSize: "48px" },
    lg: { boxSize: "40px" },
    md: { boxSize: "32px" },
    sm: { boxSize: "24px" },
    xs: { boxSize: "16px" },
  },
}

export const IconSize = {
  xl: "xl",
  lg: "lg",
  md: "md",
  sm: "sm",
  xs: "xs",
}

export default Icon
