## Theming Framework for Chakra UI

### Colors

```js

// Define colors like this
const colors = {
  text: "",
  background: "",
  primary: "",
  blue: {
    base: "400"
    100: "",
    900: "",
  }
}

// Then when you do say `bg="blue"`, we'll pick the `base`
```

### Variants

```js
// All components that have variants can take a `variant="unstyled"` to disabled the variants
const variants = {
  // A function that auto generates variants, as opposed to manually doing this.
  // get takes 2 arguments, color string and a fallback
  create: (props, get) => ({
    bg: get(`${props.variantColor}.500`, `#fd5`),
    color: "white",
    // We'll convert this shorthand to "&:hover" and "&[data-hover=true]" or allow the user type it out themselves
    _hover: {
      bg: `${props.variantColor}.600`,
    },
    // We'll convert this shorthand to "&:active" and "&[data-active=true]" or allow the user type it out themselves
    _active: {
      bg: `${props.variantColor}.700`,
    },
    // We'll convert this shorthand to "&:disabled", "&[aria-disabled=true]", "&[data-disabled=true]" or allow the user type it out themselves
    _disabled: {},
    // We'll convert this shorthand to "&[aria-selected=true]", "&[data-selected=true]" or allow the user type it out themselves
    // Basically all state related styles in aria will have their data-* equivalent for convenience
    _selected: {},
  }),
  // In this case, the create function will be overriden, so passing blue will not use the `create` function
  blue: {
    bg: `blue.900`,
    color: `papayawhip`,
  },
};
```

## Color Modes

We look at the component level color modes, then go to the color level color
modes.

```jsx
const theme = {
  colors: {
    blue: {
      100: "",
      900: "",
    },
    modes: {
      dark: {
        blue: {
          100: "",
          900: "",
        },
      },
    },
  },
  // The root styles of most html elements
  styles: {
    // global styles
    root: {},
    h1: {
      apply: "fonts.heading.3xl",
      textTransform: "uppercase",
    },
    h2: {
      apply: ["styles.h1"],
      marginY: 4,
    },
    button: {},
  },
  components: {
    Button: {
      root: { apply: "styles.button" },
      variants: {
        create: () => {},
        solid: {
          bg: "",
          colors: "",
        },
        modes: {
          dark: {
            create: () => {},
            solid: {
              bg: "",
              colors: "",
            },
          },
          mistic: {
            create: () => {},
          },
        },
      },
    },
  },
};
```

## Component Level Theming

```jsx
// Using the `css` from Chakra UI
function css(style){
  return function(theme){
    // process the styles
  }
}

<h1 css={css({ apply: "styles.h2" })}>This is a heading</h1>

// Within styled components
<Heading variant="sm">This is a heading</Heading>

// apply styles from theme
<Box as="h1" apply="styles.h1">This is a heading</Box>
```
