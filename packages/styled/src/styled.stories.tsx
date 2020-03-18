/**@jsx jsx */
import { jsx } from "./jsx"
import { chakra } from "./styled"
import { createTheming } from "./create-theming"
import theme from "@chakra-ui/preset-base"

export default {
  title: "styled",
}

const customTheme = {
  ...theme,
  components: {
    Button: {
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
          padding: 20,
          fontSize: 17,
        },
        sm: {
          padding: 10,
          fontSize: "sm",
        },
      },
    },
  },
}

const [ThemeProvider, useTheme] = createTheming(customTheme)

const Button = chakra("button", { themeKey: "Button" })

export const Sample = () => {
  return (
    <ThemeProvider>
      <chakra.h1
        as="a"
        href="www.google.com"
        color="green.200"
        margin="20px"
        fontWeight="bold"
        _hover={{ color: "red.200" }}
        marginLeft="30px"
      >
        Welcome home buddy
      </chakra.h1>
      <Button variant="solid" size="sm">
        Click me
      </Button>
      <chakra.button as="label" htmlFor="dfdf">
        Click me
      </chakra.button>
    </ThemeProvider>
  )
}
