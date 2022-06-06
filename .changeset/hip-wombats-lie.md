---
"@chakra-ui/media-query": minor
---

Add support for client-side rendered (CSR) apps to get the correct value on
first render.

> Affected hooks: `useMediaQuery`, `useBreakpoint`, `useBreakpointValue`.

These hooks are built work in server-side rendering (SSR) applications by
default. You might notice a quick flash of incorrect media query value when you
use them.

If you're creating a CSR-only app, you can now leverage the `ssr` argument to
get the correct value on first render.

```jsx live=false
const [isMobile] = useMediaQuery("(max-width: 768px)", {
  // you can now pass `ssr: false`
  ssr: false,
})

const buttonSize = useBreakpointValue(
  { base: "sm", lg: "md" },
  // you can now pass `ssr: false`
  { ssr: false },
)

// you can now pass `ssr: false`
const breakpoint = useBreakpoint({ ssr: false })
```
