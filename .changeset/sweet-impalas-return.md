---
"@chakra-ui/react": patch
---

- **Drawer**: Fix drawer close animation in RTL

- **Button**
  - Fix layout issue when in loading state with icons by using
    `display: contents` and `visibility: hidden`
  - Add `data-loading` attribute when `loading` is `true` so allow styling
    loading state with `_loading` pseudo prop
