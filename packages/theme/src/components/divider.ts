import { ComponentTheme } from "@chakra-ui/theme-tools/src"

const Divider: ComponentTheme = {
  defaultProps: {
    variant: "horizontal",
  },
  variants: {
    vertical: {
      borderLeftWidth: "1px",
      height: "100%",
    },
    horizontal: {
      borderBottomWidth: "1px",
      width: "100%",
    },
  },
}

export default Divider
