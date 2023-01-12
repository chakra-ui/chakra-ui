---
"@chakra-ui/system": minor
---

Fixed issue where TS throws an error when using the `translate` style prop due
to clash with the native DOM translate attribute.

This was fixed by omitting the native `translate` attribute and introducing a
new `htmlTranslate` attribute for user who need this.
