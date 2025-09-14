---
"@chakra-ui/react": patch
---

- **CodeBlock**: Fix issue where Line numbers display incorrectly when
  `meta.wordWrap` is true in code blocks

- **Hover Card**: Change default delay values for hover card to improve
  accessibility.
  - `openDelay`: from `700ms` to `600ms`

- **Tooltip**: Change default delay values for tooltip to improve accessibility.
  [Learn more](https://www.nngroup.com/articles/timing-exposing-content)
  - `openDelay`: from `1000ms` to `400ms`
  - `closeDelay`: from `500ms` to `150ms`

- **Menu**
  - Fix issue where keyboard activation of menu items with `target="_blank"`
    would open two tabs
  - Fix issue where hovering a partially visible item with pointer causes it to
    scroll into view

- **Combobox**: Add `alwaysSubmitOnEnter` prop to allow forcing the form to be
  submitted immediately on Enter press.
