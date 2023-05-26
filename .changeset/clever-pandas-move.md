---
"@chakra-ui/tabs": minor
---

Updates the `UseTabOptions` interface, potentially affecting code using
`useTab()` or `<Tab />` components:

- Removes the following unused fields: `id`, `panelId`, and `isSelected`.
- Adds the field `isFocusable` which was being directly accessed and used, but
  was not explicitly typed or documented.
- Adds the default value of `false` for `isDisabled` and `isFocusable`. The
  former was documented as defaulting to `false`, but both were defaulting to
  `undefined`.

Please review your codebase to ensure compatibility with these changes.
