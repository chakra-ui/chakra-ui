---
"@chakra-ui/utils": minor
---

Add helper function `flatten`

```ts
import { flatten } from "@chakra-ui/utils"

flatten({ space: [0, 1, 2, 4, 8, 16, 32] })
/** =>
{
  "space.0": 0,
  "space.1": 1,
  "space.2": 2,
  "space.3": 4,
  "space.4": 8,
  "space.5": 16,
  "space.6": 32,
}
*/
```
