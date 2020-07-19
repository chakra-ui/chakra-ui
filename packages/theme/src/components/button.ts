import { mode, styleConfig, transparentize } from "@chakra-ui/theme-tools"

const button = styleConfig({
  parts: {
    container: "the button container",
    icon: "the button left and right icon",
    spinner: "button spinner when its button",
  },

  baseStyle: {
    container: {
      lineHeight: "1.2",
      borderRadius: "md",
      fontWeight: "semibold",
      _focus: {
        boxShadow: "outline",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none",
      },
    },
    spinner: {
      fontSize: "1em",
      lineHeight: "normal",
    },
  },

  variants: {
    ghost: function (props) {
      const { colorScheme: c, theme } = props

      if (c === "gray") {
        return {
          container: {
            color: mode(`inherit`, `whiteAlpha.900`)(props),
            _hover: { bg: mode(`gray.100`, `whiteAlpha.200`)(props) },
            _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
          },
        }
      }

      const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
      const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

      return {
        container: {
          color: mode(`${c}.500`, `${c}.200`)(props),
          bg: "transparent",
          _hover: {
            bg: mode(`${c}.50`, darkHoverBg)(props),
          },
          _active: {
            bg: mode(`${c}.100`, darkActiveBg)(props),
          },
        },
      }
    },

    outline: function (props) {
      const { colorScheme: c, theme } = props
      const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)
      const hoverBg = transparentize(`${c}.200`, 0.12)(theme)
      const activeBg = transparentize(`${c}.200`, 0.24)(theme)

      return {
        container: {
          border: "1px solid",
          borderColor: c === "gray" ? borderColor : "currentColor",
          color: mode(`${c}.500`, `${c}.200`)(props),
          bg: "transparent",
          _hover: {
            bg: mode(`${c}.50`, hoverBg)(props),
          },
          _active: {
            bg: mode(`${c}.100`, activeBg)(props),
          },
        },
      }
    },

    solid: function (props) {
      const { colorScheme: c } = props

      if (c === "gray")
        return {
          container: {
            bg: mode(`gray.100`, `whiteAlpha.200`)(props),
            _hover: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
            _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
          },
        }

      return {
        container: {
          bg: mode(`${c}.500`, `${c}.200`)(props),
          color: mode(`white`, `gray.800`)(props),
          _hover: { bg: mode(`${c}.600`, `${c}.300`)(props) },
          _active: { bg: mode(`${c}.700`, `${c}.400`)(props) },
        },
      }
    },

    link: function (props) {
      const { colorScheme: c } = props
      return {
        container: {
          padding: 0,
          height: "auto",
          lineHeight: "normal",
          color: mode(`${c}.500`, `${c}.200`)(props),
          _hover: { textDecoration: "underline" },
          _active: {
            color: mode(`${c}.700`, `${c}.500`)(props),
          },
        },
      }
    },

    unstyled: {
      container: {
        bg: "none",
        border: 0,
        color: "inherit",
        display: "inline",
        font: "inherit",
        lineHeight: "inherit",
        margin: 0,
        padding: 0,
      },
    },
  },

  sizes: {
    lg: {
      container: {
        height: 12,
        minWidth: 12,
        fontSize: "lg",
        paddingX: 6,
      },
    },
    md: {
      container: {
        height: 10,
        minWidth: 10,
        fontSize: "md",
        paddingX: 4,
      },
    },
    sm: {
      container: {
        height: 8,
        minWidth: 8,
        fontSize: "sm",
        paddingX: 3,
      },
    },
    xs: {
      container: {
        height: 6,
        minWidth: 6,
        fontSize: "xs",
        paddingX: 2,
      },
    },
  },

  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
})

export default button
