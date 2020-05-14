# Migration Notes

This is a new package that forms the foundation of all chakra components.

## Custom styled implementation

You can create chakra's enhanced components in 2 ways:

1.  Use the chakra element syntax (It's the easy to avoid naming components.
    Lol). Components create this way:
    - Provides a simple syntax that reduces the need to use the `as` prop.
    - Allow you map styles defined in `theme.styles.[element]` to
      `chakra.[element]` components

```jsx
<chakra.button bg="red.200" _hover={{ bg: "red.300" }}>
  Click me
</chakra.button>
```

2. Use the chakra factory method. This approach is more powerful and can be used
   to create custom themed components on the fly. Components created this way
   can:
   - Have base or default styles applied automatically
   - Link to styles in theme object (following our component theming convention)
   - Create variants, sizes, and color schemes right away

```jsx
const Button = chakra.button("button", {
  // define base styles
  baseStyle: {
    display: "flex",
    border: "0",
  },
  // define button sizes
  sizes: {
    small: {
      padding: "8px",
      fontSize: "12px",
    },
    medium: {
      padding: "24px",
      fontSize: "16px",
    },
    large: {
      padding: "40px",
      fontSize: "32px",
    },
  },
})

// this will have baseStyle + sizes.small styles
<Button size="small">Click me</Button>
```

## Theme Configurations

```jsx
const theme = {
  config: {
    // if not using system color mode, what mode should app start with
    initialColorMode: "light", // "light" | "dark"
    // whether to use the system color mode by default
    useSystemColorMode: false, // true | false
    // whether to automatically map styles defined in theme.styles.[element] to chakra.[element]
    shouldMapStylesToElement: false, // true | false
  },
}
```

## Caveats

- When using framer motion's primitives and chakra. You can't use the `as` prop
  afterwards. Here's what I mean

```jsx
const Motion = chakra(motion.div)

// you can't use the `as` prop in the `Motion` component.
// If you do, it won't work.
export const WithFramerMotion = () => (
  <Motion
    boxSize="40px"
    bg="red.300"
    drag
    whileTap={{ scale: 1.3 }}
    dragConstraints={{
      top: 0,
      left: 0,
      right: 50,
      bottom: 50,
    }}
  />
)
```
