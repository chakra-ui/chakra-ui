---
"@chakra-ui/media-query": patch
---

- Fixed an issue that undefined is returned when calling the hook
  `useBreakpoint` with `defaultValue` specified in SSR

- Fixed an issue where the value of `useBreakpointValue` in CSR did not match
  SSR.
