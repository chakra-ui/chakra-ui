import { mode, styleConfig } from "@chakra-ui/theme-tools"

const skipLink = styleConfig({
  baseStyle: function (props) {
    return {
      borderRadius: "md",
      fontWeight: "semibold",
      _focus: {
        boxShadow: "outline",
        padding: "1rem",
        position: "fixed",
        top: "1.5rem",
        left: "1.5rem",
        bg: mode("white", "gray.700")(props),
      },
    }
  },
})

export default skipLink
