---
"@chakra-ui/react": patch
---

**System**: Fix issue where render times feels slower compared to v2 due to the
global style computation in the provider component. Now, it is much faster.
[See Discussion](https://github.com/chakra-ui/chakra-ui/discussions/9488#discussioncomment-11868684)
