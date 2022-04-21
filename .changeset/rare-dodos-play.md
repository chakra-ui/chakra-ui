---
"@chakra-ui/color-mode": major
---

Ensure the transition between light/dark modes happens instantly without
transition. This helps to avoid a weird UX when switch modes for elements with
different `transition` definition on the page.

Allow user configure the storage key for the provider and script. We now export
a `createLocalStorageManager` and `createCookieStorageManager` functions.

```jsx
const manager = createLocalStorageManager("{storageKey}")

function App({ Component, pageProps }) {
  return (
    <ChakraProvider colorModeManager={manager}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
```

Add better support for cookie storage to provide better SSG experience. To use
cookie script, you can set `type=cookie`.

> Pro tip: You can also configure the `storageKey` from script as well

```jsx
import { ColorModeScript } from "@chakra-ui/react"
function Document() {
  return (
    <Html>
      <Head>
        <title>App</title>
      </Head>
      <Body>
        <ColorModeScript type="cookie" />
        <Main />
      </Body>
    </Html>
  )
}
```

Refactored color mode to behave consistently between provider and script. The
new precedence is as follows:

- Get the color mode value in the specified localStorage or cookie manager
- If value doesn't exist, use the `initialColorMode` value specified.
  - If the initial value is `system`, then we'll compute the color mode using
    `matchMedia`
  - Else, we use the initial value as is.
- If user specifies `useSystemColorMode: true`, then we'll subscribe to color
  mode changes from the Operating system

Removed `--chakra-ui-color-mode` CSS variable and use `data-theme` attribute on
the `html` element.

Added `color-scheme` to the `html` element to ensure native form-elements render
in the correct mode.
