---
"@chakra-ui/color-mode": patch
---

- Improve SSR for color mode by adding `manager.get()` in the default state
- Add support `disableTransitionOnChange` option in `ColorModeProvider` and
  `theme.config` to control whether the transition of all elements should be
  temporarily disabled while the color mode changes.
