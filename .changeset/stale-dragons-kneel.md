---
"@chakra-ui/react": patch
---

Loosen types of `extendTheme` to allow recent TS compiler to work and avoid
`Type instantiation is excessively deep and possibly infinite` errors.

This might lead to a slightly degraded autocomplete experience when extended the
theme but we promise to revisit the typings and API very soon.

> In the meantime, please use `ThemeOverrides` type to provide
