---
"@chakra-ui/react": patch
---

Fix `DateInput` control focus ring: the `control` slot isn't natively focusable
(real DOM focus lands on the child `segment` elements, reflected back via the
`data-focus` attribute), so it now uses plain `focusRing`/`_focus` styling
instead of the `:focus-visible`-based styles inherited from the input recipe,
which never applied.
