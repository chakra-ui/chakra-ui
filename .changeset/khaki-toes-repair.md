---
"@chakra-ui/color-mode": minor
---

Added possibility to use the system preferred color scheme as value for
`initialColorMode`, while still respecting a user's previous choice.

As long as the user does not manually select a color mode through a website
interaction, the theme will change when the system preference changes.

This would easily allow for an implementation where the user can choose between
`light`, `dark` and `system` by simply setting the `initialColorMode` setting to
`system` and presenting the user with the three options.
