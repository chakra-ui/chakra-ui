import { mode, styleConfig } from "@chakra-ui/theme-tools"

const kbd = styleConfig({
  parts: {
    kbd: "the keyboard key",
  },
  baseStyle: function (props) {
    return {
      kbd: {
        bg: mode("gray.100", "whiteAlpha")(props),
        borderRadius: "md",
        borderWidth: "1px",
        borderBottomWidth: "3px",
        fontSize: "0.8em",
        fontWeight: "bold",
        lineHeight: "normal",
        px: "0.4em",
        whiteSpace: "nowrap",
      },
    }
  },
})

export default kbd
