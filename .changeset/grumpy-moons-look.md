---
"@chakra-ui/styled-system": minor
---

Modify theme types to make it possible to customize token types via TypeScript
module augmentation and declaration merging in addition to allowing
customization via the Chakra CLI.

This makes it possible to do the following:

- Distribute custom types with a component library based on Chakra
- Customize theme types by hand
- Version control your theme types

To customize themes using the new mechanism, augment the `CustomThemeTypings`
type in a definitions file such as `types/chakra.d.ts`:

> ⚠️ NOTE: your `CustomThemeTypings` _must_ implement/extend `BaseThemeTypings`,
> otherwise the types will fall back to the default Chakra types (or custom
> output from **@chakra-ui/cli**)

```ts
import { BaseThemeTypings } from "@chakra-ui/styled-system";

type DefaultSizes = 'small' | 'medium' | 'large';

declare module "@chakra-ui/styled-system" {
  export interface CustomThemeTypings extends BaseThemeTypings {
    // Example custom `borders` tokens
    borders: 'none' | 'thin' | 'thick';
    // ...
    // Other custom tokens
    // ...
    components: {
      Button: {
        // Example custom component sizes and variants
        sizes: DefaultSizes;
        variants: 'solid' | 'outline' | 'wacky' | 'chill';
      };
      // ...
     }
  }
```
