# Chakra Styled

```tsx
type Props = {
  colorMode: "light" | "dark"
  theme: Object
  colorScheme: string
}

type ObjectOrFunction = Object | ((props: Props) => Object)

type Component = {
  name: string
  baseStyle: ObjectOrFunction
  variants: ObjectOrFunction
  sizes: ObjectOrFunction
  defaultProps: {
    size: string
    variant: string
    colorScheme: string
  }
}

type Theme = {
  dir: "ltr" | "rtl"
  breakpoints: Object
  colors: Object
  spacing: Object
  sizes: Object
  shadows: Object
  borders: Object
  radii: Object
  fontWeights: Object
  lineHeights: Object
  fontSizes: Object
  letterSpacings: Object
  fonts: Object
  components: { [name: string]: Component }
  styles: {
    root: { light: Object; dark: Object }
    [element: string]: Object
  }
  config: {
    useColorSchemeMediaQuery: boolean
    autoApplyStylesToElement: boolean
    autoConvertToRtl: boolean
  }
}
```

## Ideal API for next release

```tsx
// import the chakra system
import { chakra, ChakraProps, merge } from "@chakra-ui/system"

// invoke system with your custom theme, get strongly typed providers
const { styled, ThemeProvider, useTheme, useComponentStyle } = chakra(theme)

// create components using styled
const Button = styled('button', {
  baseStyle: {},
  themeKey: 'Button',
  attrs: {},
  shouldForwardProps: () => {},
});


// if themekey was passed, then the component will have colorScheme, size, and variant Props
<Button colorScheme="red" variant="outline" size="md"> Click me </Button>

//NB: remove support for size prop, preserve it for components only

// consume styled directly
<styled.h1 apply="styles.h4"> This is a heading </styled.h1>

// create color-mode package
import { useColorMode, ColorModeProvider, InitializeColorMode } from "@chakra-ui/color-mode"

// create css-reset component
import CSSReset from "@chakra-ui/css-reset"

// users can use their custom styled functions with other components
import { styled } from "./system"
import { Link } from "@reach/router"

// common link as button scenario
const LinkButton = styled(Link, { themeKey: "Button" })
```
