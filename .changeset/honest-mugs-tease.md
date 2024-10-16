---
"@chakra-ui/react": patch
"@chakra-ui/styled-system": minor
---

- Fix issue where Next.js dev server enters infinite loop when passing a react
  element to a styled component

- Fix regression where wrapping `CheckboxGroup` with `FormControl` no longer
  works.

- Fix runtime performance degradation by pre-computing the `isStyleProp`
  function
