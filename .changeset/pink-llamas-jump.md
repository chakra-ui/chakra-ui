---
"@chakra-ui/system": patch
"@chakra-ui/object-utils": patch
---

Fixed issue where style overrides does not respect order of precedence due to
the use of `Object.assign`.

To illustrate the issue, consider the following example:

```js
const stylesFromTheme = {
  px: 8,
  padding: 0,
}

const stylesFromProps = {
  px: 4,
}

const style = Object.assign({}, stylesFromTheme, stylesFromProps)
// Result: { px: 4, padding: 0 }
// Expected: { padding: 0, px: 4 }
```

The issue is that `Object.assign` will replace properties in place with values
from the override objects. This is not the desired behavior for style overrides
hence a custom `assignAfter` function is used instead
