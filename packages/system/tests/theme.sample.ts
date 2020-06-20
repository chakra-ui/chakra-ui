import defaultTheme from "@chakra-ui/theme"

const theme = {
  ...defaultTheme,
  components: {
    Badge: {
      baseStyle: {
        padding: "5px",
        textTransform: "uppercase",
      },
    },
    Code: {
      baseStyle: {
        apply: "components.Badge.baseStyle",
      },
    },
    Button: {
      defaultProps: {
        variant: "solid",
        size: "lg",
      },
      variants: {
        solid: {
          bg: "green.400",
          color: "white",
          _active: {
            bg: "green.500",
          },
        },
      },
      sizes: {
        lg: {
          padding: "12px 24px",
          fontSize: 17,
        },
        sm: {
          padding: "8px 16px",
          fontSize: "sm",
        },
      },
    },
  },
  styles: {
    ...defaultTheme.styles,
    h1: {
      fontSize: "40px",
      color: "pink.400",
      _hover: {
        color: "pink.700",
      },
    },
  },
}

export default theme
