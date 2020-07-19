import { mode, styleConfig, transparentize } from "@chakra-ui/theme-tools"

const button = styleConfig({
  baseStyle: {
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
  variants: {
    ghost: function (props) {
      const { colorScheme: c, theme } = props

      if (c === "gray") {
        return {
          color: mode(`inherit`, `whiteAlpha.900`)(props),
          _hover: { bg: mode(`gray.100`, `whiteAlpha.200`)(props) },
          _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
        }
      }

      const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
      const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

      return {
        color: mode(`${c}.500`, `${c}.200`)(props),
        bg: "transparent",
        _hover: {
          bg: mode(`${c}.50`, darkHoverBg)(props),
        },
        _active: {
          bg: mode(`${c}.100`, darkActiveBg)(props),
        },
      }
    },

    outline: function (props) {
      const { colorScheme: c, theme } = props
      const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)
      const hoverBg = transparentize(`${c}.200`, 0.12)(theme)
      const activeBg = transparentize(`${c}.200`, 0.24)(theme)

      return {
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
      }
    },

    solid: function (props) {
      const { colorScheme: c } = props

      if (c === "gray")
        return {
          bg: mode(`gray.100`, `whiteAlpha.200`)(props),
          _hover: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
          _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
        }

      return {
        bg: mode(`${c}.500`, `${c}.200`)(props),
        color: mode(`white`, `gray.800`)(props),
        _hover: { bg: mode(`${c}.600`, `${c}.300`)(props) },
        _active: { bg: mode(`${c}.700`, `${c}.400`)(props) },
      }
    },

    link: function (props) {
      const { colorScheme: c } = props
      return {
        padding: 0,
        height: "auto",
        lineHeight: "normal",
        color: mode(`${c}.500`, `${c}.200`)(props),
        _hover: { textDecoration: "underline" },
        _active: {
          color: mode(`${c}.700`, `${c}.500`)(props),
        },
      }
    },

    unstyled: {
      bg: "none",
      color: "inherit",
      display: "inline",
      lineHeight: "inherit",
      m: 0,
      p: 0,
    },
  },

  sizes: {
    lg: {
      h: 12,
      minW: 12,
      fontSize: "lg",
      px: 6,
    },
    md: {
      h: 10,
      minW: 10,
      fontSize: "md",
      px: 4,
    },
    sm: {
      h: 8,
      minW: 8,
      fontSize: "sm",
      px: 3,
    },
    xs: {
      h: 6,
      minW: 6,
      fontSize: "xs",
      px: 2,
    },
  },

  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
})

export default button
