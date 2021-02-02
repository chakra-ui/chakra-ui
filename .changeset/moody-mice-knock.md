---
"@chakra-ui/utils": patch
---

Removed `objectAssign` function in favor of using native `Object.assign` method.
It is
[now supported in most browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#browser_compatibility)

This function is only used once in the `system` package as well. This PR simply
removes it to cut bundle size of utils. Less is more 😃.
