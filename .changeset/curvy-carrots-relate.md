---
"@chakra-ui/menu": patch
"@chakra-ui/popover": patch
---

Fix issue where `enabled` TS type was exposed to popover and menu from
`UsePopperProps`. This was resolved by omitting `enabled` from the type
