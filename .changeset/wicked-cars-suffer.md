---
"@chakra-ui/media-query": minor
---

Multiple changes to reduce unecessary re-renders of components that uses
`useMediaQuery`, `useBreakpoint` or `useBreakpointValue`.

- `useMediaQuery` no longer first initializes with the default value, and
  instead checks the media query directly.
- `useMediaQuery` no longer triggers a double render.
- `useBreakpoint` now accepts an array of which breakpoints to check for.
- `useBreakpointValue` now only checks breakpoints which it has values for.
