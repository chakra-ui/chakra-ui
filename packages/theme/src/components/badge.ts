import {
  getColor,
  mode,
  styleConfig,
  transparentize,
} from "@chakra-ui/theme-tools"

const badge = styleConfig({
  parts: {
    container: "the badge container",
  },

  baseStyle: {
    container: {
      paddingX: 1,
      textTransform: "uppercase",
      fontSize: "xs",
      borderRadius: "sm",
      fontWeight: "bold",
    },
  },

  variants: {
    solid: function (props) {
      const { colorScheme: c, theme } = props
      const dark = transparentize(`${c}.500`, 0.6)(theme)
      return {
        container: {
          bg: mode(`${c}.500`, dark)(props),
          color: mode(`white`, `whiteAlpha.800`)(props),
        },
      }
    },

    subtle: function (props) {
      const { colorScheme: c, theme } = props
      const darkBg = transparentize(`${c}.200`, 0.16)(theme)
      return {
        container: {
          bg: mode(`${c}.100`, darkBg)(props),
          color: mode(`${c}.800`, `${c}.200`)(props),
        },
      }
    },

    outline: function (props) {
      const { colorScheme: c, theme } = props
      const darkColor = transparentize(`${c}.200`, 0.8)(theme)
      const lightColor = getColor(theme, `${c}.500`)
      const color = mode(lightColor, darkColor)(props)

      return {
        container: {
          color,
          boxShadow: `inset 0 0 0px 1px ${color}`,
        },
      }
    },
  },

  defaultProps: {
    variant: "subtle",
    colorScheme: "gray",
  },
})

export default badge
