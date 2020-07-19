import { mode, styleConfig } from "@chakra-ui/theme-tools"

const closeButton = styleConfig({
  parts: {
    icon: "the close icon",
    container: "the button container",
  },

  baseStyle: function (props) {
    const hoverBg = mode(`blackAlpha.100`, `whiteAlpha.100`)(props)
    const activeBg = mode(`blackAlpha.200`, `whiteAlpha.200`)(props)

    return {
      container: {
        borderRadius: "md",
        transition: "all 0.2s",
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
          boxShadow: "none",
        },
        _hover: { bg: hoverBg },
        _active: { bg: activeBg },
        _focus: {
          boxShadow: "outline",
        },
      },
    }
  },

  sizes: {
    lg: {
      container: { w: "40px", h: "40px" },
      icon: { fontSize: "16px" },
    },
    md: {
      container: { w: "32px", h: "32px" },
      icon: { fontSize: "12px" },
    },
    sm: {
      container: { w: "24px", h: "24px" },
      icon: { fontSize: "10px" },
    },
  },

  defaultProps: {
    size: "md",
  },
})

export default closeButton
