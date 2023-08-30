---
"@chakra-ui/visually-hidden": minor
"@chakra-ui/css-reset": minor
"@chakra-ui/icon": minor
"@chakra-ui/theme": minor
---

**[POTENTIAL BREAKING CHANGE]** Remove export defaults and favor of named
exports.

```diff
- import theme from "@chakra-ui/theme"
+ import { theme } from "@chakra-ui/theme"
```

```diff
- import Icon from "@chakra-ui/icon"
+ import { Icon } from "@chakra-ui/icon"
```

```diff
- import CSSReset from "@chakra-ui/css-reset"
+ import { CSSReset } from "@chakra-ui/css-reset"
```

```diff
- import VisuallyHidden from "@chakra-ui/visually-hidden"
+ import { VisuallyHidden } from "@chakra-ui/visually-hidden"
```
