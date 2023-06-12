---
"@chakra-ui/input": patch
---

Fix `InputElement` and `InputAddon` sizing when using a responsive `size` value
for `InputGroup`.

_Note: this requires changes in the latest **@chakra-ui/theme** or, for custom
themes, sizes to be driven with CSS variables. See the
[default theme](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/input.ts)
for an example._
