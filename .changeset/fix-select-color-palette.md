---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

Fix `Select` component not reflecting `colorPalette` prop

- Add `colorPalette.focusRing` support for focus ring styling
- Add `colorPalette.border` for expanded state border color
- Add `colorPalette.subtle` for subtle variant trigger background
- Add `colorPalette.muted/60` for highlighted item background
- Update error state to use CSS variables for consistency
