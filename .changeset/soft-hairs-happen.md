---
"@chakra-ui/cli": minor
---

The `tokens` command now supports generating theme token type definitions from a Chakra UI theme published as a package:

```sh
npx @chakra-ui/cli tokens <@your-org/chakra-theme-package>
```

A published theme package should export a theme object as either the `default` export or an export named `theme`.

```jsx
// chakra-theme-package/src/index.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({})

// as default export
export default theme
// as named export
export { theme }
```
