# @chakra-ui/system

Styled API for creating atomic, theme-aware component styling.

## Installation

```sh
yarn add @chakra-ui/system

# or

npm i @chakra-ui/system
```

## Problem

In modern web development, we have lots of solutions and architectures that have
tried to unify how components are styled. We've seen CSS architectures like BEM,
SMACSS, etc, and frameworks like theme-ui, and Tailwind CSS.

While these solutions work great, we think there still a sheer amount of work
required to create a fully customizable, theme-aware component.

## Solutions

### Chakra Elements

Chakra provides enhanced JSX elements that can be styled directly via props, or
can accept the common `sx` prop for custom styles.

We'll provide a chakra function, just like styled-component. Users can create
any component using the `chakra.[element]`. The resulting component will be a
styled component and have all system props.

```jsx
<chakra.button bg="green.200" _hover={{ bg: "green.300" }}>
  Click me
</chakra.button>

<chakra.h1 fontSize="lg"> Heading </chakra.h1>

// create your own box
const Box = chakra.div

// you can still use the `as` prop
<Box as="h1">This is my box</Box>

// for custom components
const ChakraPowered = chakra(YourComponent)

// TS: chakra will infer the types of Link and
// make it available in props
<chakra.a as={Link} to="/home"> Click me</chakra.a>
```

### Chakra Component API

A way to define themable components in chakra. We believe most re-usable, atomic
components have the following modifiers:

- Size: It has different size variations (small, medium, large)
- Variant: It has different visual style (outline, solid, ghost)
- Color scheme (Optional): For a given variant, it can have several color
  scheme. For example, an outline button with a red color scheme.
- Color mode (Optional): Components also change their visual styles based on the
  user preferred color mode (light or dark)

Our goal with this component API to design a common interface to style any
component give these characteristics. Here's how it works:

```jsx
// 1. create a component schema in your theme
const theme = {
	colors: {
    green: {
      light: "#dfdfdf",
      normal: "#dfdfdf",
      dark: "#d566Df",
      darker: "#dfd56f"
    },
		blue: {}
  },
  components: {
    Button: {
      defaultProps: {
        variant: "solid",
        size: "md",
				colorScheme: "blue"
      },
      variants: {
				// props has colorScheme, colorMode (light mode or dark mode)
        solid: props => ({
          bg: `${props.colorScheme}.normal`,
          color: "white",
        }),
        outline: {
          border: "2px",
          borderColor: "green.normal"
        }
      },
      sizes: {
        sm: {
          padding: 20,
          fontSize: 12
        },
        md: {
          padding: 40,
          fontSize: 15
        }
      }
    }
  }
};

// 2. create or import Button from chakra-ui
import { Button } from "@chakra-ui/react"

// or your own button
const Button = chakra("button", { themeKey: "Button" })

// 3. use the button. It'll have the visual props defined in defaultProps
<Button>Click me</Button>

// 4. override the defaultProps
<Button variant="outline" colorScheme="green">Click me</Button>
```
