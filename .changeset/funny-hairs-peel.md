---
"@chakra-ui/react": minor
---

- Ensure components show focus outline only when interacting with the keyboard.
- Migrate components to use `_focusVisible` instead of `_focus` selectors to
  indicate focus.

🚨 NOTE: This might be a potential breaking change for consumers who use the
`extendTheme` with the `_focus` styles. Kindly migrate to `_focusVisible`.
