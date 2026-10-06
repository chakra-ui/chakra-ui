---
"@chakra-ui/react": minor
---

Migrate `useMediaQuery` from `useState` + `useEffect` to `useSyncExternalStore`.

This fixes `useMediaQuery` (and `useBreakpointValue`/`useBreakpoint` built on
it) ignoring changes to the query list after mount. Previously the effect only
ran on mount, so passing a different set of queries kept reporting the first
result — and through `useBreakpointValue` a value object that gained a
breakpoint could return the wrong breakpoint's value rather than a stale one.

It also removes the hydration flicker and avoids tearing in concurrent mode. The
`ssr` option is now a no-op and is kept only for backward compatibility.
