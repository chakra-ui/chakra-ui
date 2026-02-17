---
"@chakra-ui/react": patch
---

Fix `globalCss` silently ignoring element selectors that match utility
shorthands (e.g. `p`, `m`, `h`, `w`).

Previously, `p: { margin: '0 0 1em' }` in `globalCss` was treated as the
`padding` utility instead of a `<p>` element selector, causing the styles to be
silently dropped.
