import { styleConfig } from "@chakra-ui/theme-tools"
import badge from "./badge"

const code = styleConfig({
  baseStyle: {
    fontFamily: "mono",
    fontSize: "sm",
    px: "0.2em",
    borderRadius: "sm",
  },
  variants: badge.variants,
  sizes: badge.sizes,
  defaultProps: badge.defaultProps,
})

export default code
