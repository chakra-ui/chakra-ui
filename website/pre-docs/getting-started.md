# Getting Started

- Documentation
- Components
- Tutorial
- Showcase
- Contributing

- Basics

  - Style props
    - create a card component
    - style a button and its interactions
    - parent based styling
  - Responsive design
    - the syntax
    - array vs object notation
    - let's make the card responsive
  - Using chakra's components
    - button example
  - Creating custom components
    - `chakra` function
    - Adding theme key and base styles
  - Layouts
    - stacking components
    - creating a grid
    - make it wrap!
    - handing bullets
  - Component theming
    - `chakra` function
    - Create component variations
    - Adapting based on props
  - Handling light/dark mode
    - Reading from the OS color preference
    - Set initial color mode
    - Add button to switch mode

- Advanced

  - Style props
    - parent based styling
  - Component theming
    - edit component styles
    - bind compound components with `ThemingProvider`
  - Typescript support
  - Using the `as` prop

- API Reference

  - Style props
    - layout
    - color
    - typography
    - flex
    - grid
    - truncate
    - pseudo styles
  - Chakra
    - chakra elements
    - chakra factory

- Recipes

  - with `framer-motion`
  - with `react-hook-form`
  - with `reach-ui`
  - with `reakit`
  - with `formik`

- Migration Guides

  - From v0 to v1
  - From theme-ui
  - From tailwind css

- Customization
  - Changing color
  - Custom fonts
  - Using custom icons
  - Changing component styles
  - Update any theme token

## Installation

```bash
npm install @chakra-ui/core

# or

yarn add @chakra-ui/core
```

Chakra UI is made up of lots of components which can be installed independently
together using `@chakra-ui/core`. Don't worry too much about this for now, we'll
explain this step shortly!

## Setting up the providers

Chakra UI comes with a number of context providers needed for it to work
properly

```jsx
import {
  ChakraProvider
  CSSReset,
} from "@chakra-ui/core"
```

Wrap your entire app with the `ChakraProvider` and `CSSReset`

```jsx
function App(){
  return (
    <ChakraProvider>
      <CSSReset>
      {children}
    </ChakraProvider>
    )
}
```
