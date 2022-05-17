---
"@chakra-ui/color-mode": patch
---

- Improve SSR for color mode by adding `manager.get()` in the default state

- Add support `disableTransitionOnChange` option in `ColorModeProvider` and
  `theme.config` to control whether the transition of all elements should be
  temporarily disabled while the color mode changes.

- Expose `cookieStorageManagerSSR` for users who prefer to manage color mode
  server-side. If you use this, there's no need for the `ColorModeScript`

```jsx live=false
function App({ Component, pageProps }) {
  // get the `cookie` from each page `getServerSideProps` return value
  // Note: the implementation is up to you
  const manager = cookieStorageManagerSSR(pageProps.cookie)
  return (
    <ChakraProvider manager={manager}>
      <Component />
    </ChakraProvider>
  )
}
```
