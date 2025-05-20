---
"@chakra-ui/styled-system": patch
"@chakra-ui/react": patch
---

Fix issue in React 19 where SSR rendered components freeze in dev mode when
non-memoized react components are passed to `useStyleConfig`
