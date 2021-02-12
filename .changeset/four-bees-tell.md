---
"@chakra-ui/checkbox": patch
"@chakra-ui/radio": patch
---

- Improve the semantic HTML structure of checkbox. `label` is a phrasing content
  element and should not contain block element `div`.
- Replaced `div` with `span` which is an inline element.
