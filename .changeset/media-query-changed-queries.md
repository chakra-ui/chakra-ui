---
"@chakra-ui/react": patch
---

Fix `useMediaQuery` ignoring a change to the queries it is given. The effect
that evaluated and subscribed to the queries only ran on mount, so a query
derived from state kept reporting the first render's result, and
`useBreakpointValue` returned the wrong entry once its value object gained or
lost a breakpoint.
