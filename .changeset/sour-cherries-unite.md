---
"@chakra-ui/theme": patch
---

Focus outline now takes precedence over "isInvalid" outline. This change affects
all components that extend from `Input`'s theme, such as `Select`, `PinInput`,
`Textarea` or `NumberInput`.
