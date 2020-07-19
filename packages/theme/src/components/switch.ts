import { mode, styleConfig } from "@chakra-ui/theme-tools"

const _switch = styleConfig({
  parts: {
    track: "the switch outer track",
    thumb: "the switch inner circle",
  },

  baseStyle: function (props) {
    const { colorScheme: c } = props
    return {
      track: {
        borderRadius: "full",
        padding: "2px",
        transition: "all 120ms",
        bg: mode("gray.300", "whiteAlpha.400")(props),
        _focus: { boxShadow: "outline" },
        _disabled: { opacity: 0.4, cursor: "not-allowed" },
        _checked: {
          bg: mode(`${c}.500`, `${c}.200`)(props),
        },
      },
      thumb: {
        bg: "white",
        transition: "transform 250ms",
        borderRadius: "full",
        transform: "translateX(0)",
      },
    }
  },

  sizes: {
    sm: {
      track: {
        width: "1.375rem",
        height: "0.75rem",
      },
      thumb: {
        width: "0.75rem",
        height: "0.75rem",
        _checked: { transform: "translateX(0.625rem)" },
      },
    },
    md: {
      track: {
        width: "1.875rem",
        height: "1rem",
      },
      thumb: {
        width: "1rem",
        height: "1rem",
        _checked: { transform: "translateX(0.875rem)" },
      },
    },
    lg: {
      track: {
        width: "2.875rem",
        height: "1.5rem",
      },
      thumb: {
        width: "1.5rem",
        height: "1.5rem",
        _checked: { transform: "translateX(1.375rem)" },
      },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})

export default _switch
