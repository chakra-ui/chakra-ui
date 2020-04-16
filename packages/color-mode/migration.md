# Migration Notes

We've updated the color mode to support the following scenatios

1. Ability to start with dark mode by default, but also want users to toggle it.
   To support this, add `theme.config.initialColorMode` to the theme.

```jsx
const theme = {
  config: {
    initialColorMode: "dark", // "light" | "dark"
  },
}
```

> NB: For this to work correctly, ensure you don't have `chakra-ui-color-mode`
> set in the your `localStorage`.
>
> We use `localStorage` as the source of truth and use the `initialColorMode`
> value when the value doesn't exist in `localStorage`

2. Ability to lock color mode in certain aspects of UI, this doesn't change

```jsx
import { DarkMode, LightMode } from "@chakra-ui/color-mode"

// Here, the button is locked to dark mode and can't be changed
function Example() {
  return (
    <DarkMode>
      <Button>Click me</Button>
    </DarkMode>
  )
}
```

3. Ability to use system color mode preference. To support this, add
   `theme.config.useSystemColorMode`. This also updates the color mode whenever
   user changes this preference from their OS.

```jsx
const theme = {
  config: {
    useSystemColorMode: true,
  },
}
```

## Fixes

- Color mode now persists correctly when you refresh the page. All you need to
  do is to add `InitialColorMode` script as the first child in of `body`.

Here's an example with Next.js

```jsx
// pages/_app.js
export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Here's the script 👇  */}
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```
