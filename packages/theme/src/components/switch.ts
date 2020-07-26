import { mode, multiStyleConfig } from "@chakra-ui/theme-tools"

const Switch = multiStyleConfig({
  parts: {
    track: "the switch outer track",
    thumb: "the switch inner circle",
  },
  baseStyle: function (props) {
    const { colorScheme: c } = props
    return {
      track: {
        borderRadius: "full",
        p: "2px",
        transition: "all 120ms",
        bg: mode("gray.300", "whiteAlpha.400")(props),
        _focus: {
          boxShadow: "outline",
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
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
        w: "1.375rem",
        h: "0.75rem",
      },
      thumb: {
        w: "0.75rem",
        h: "0.75rem",
        _checked: {
          transform: "translateX(0.625rem)",
        },
      },
    },

    md: {
      track: {
        w: "1.875rem",
        h: "1rem",
      },
      thumb: {
        w: "1rem",
        h: "1rem",
        _checked: {
          transform: "translateX(0.875rem)",
        },
      },
    },

    lg: {
      track: {
        w: "2.875rem",
        h: "1.5rem",
      },
      thumb: {
        w: "1.5rem",
        h: "1.5rem",
        _checked: {
          transform: "translateX(1.375rem)",
        },
      },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})

export default Switch
