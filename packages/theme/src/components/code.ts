import { styleConfig } from "@chakra-ui/theme-tools"
import badge from "./badge"

const code = styleConfig({
  parts: {
    container: "the code container",
  },
  baseStyle: {
    container: {
      fontFamily: "mono",
      fontSize: "sm",
      px: "0.2em",
      borderRadius: "sm",
    },
  },
  variants: badge.variants,
  sizes: badge.sizes,
  defaultProps: badge.defaultProps,
})

export default code
