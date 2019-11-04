## Theming Framework for Chakra UI

### Colors

```js

// Define colors like this
const colors = {
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
const variants = {
  // A function that auto generates variants, as opposed to manually doing this.
  create: (prop, theme, get, mode) => ({
    bg: get(`${prop}.500`, `#fd5`),
    color: "white",
    _hover: {
      bg: `${prop}.600`,
    },
    _active: {
      bg: `${prop}.700`,
    },
  }),
  // Can be overriden by invidual keys. This blue variant will not use the `create` function
  blue: {
    bg: `blue.900`,
    color: `papayawhip`,
  },
};
```
