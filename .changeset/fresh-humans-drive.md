---
"@chakra-ui/theme-tools": minor
---

Add new helpers to the `theme-tools` package to make the process of creating
component themes less cumbersome.

- `cssVar` - function to create css vars
- `calc` - function that makes it easy to create the css calc string
- `anatomy`- function to define and extend component parts

Creating a CSS variable in the theme

```jsx
import { cssVar, calc } from "@chakra-ui/theme-tools"

const $width = cssVar("slider-width")
const $height = cssVar("slider-height")

const $diff = calc($width).subtract($height).toString()

$width.variable // => '--slider-width'
$width.reference // => 'var(--slider-width)'
```

Create a component anatomy

```jsx
import { anatomy }  from "@chakra-ui/theme-tools"
import type { PartsStyle } from "@chakra-ui/theme-tools"

const btn = anatomy("button").parts("label", "container")

const newBtn = btn.extend("icon") //  extend button to include icon part

// Using the anatomy in component theme
const baseStyle: PartsStyle<typeof newBtn> = {
  // auto-complete for the component parts
  icon: {...},
  label: {...}
}
```

Added `PartsStyleObject` and `PartStyleFunction` types for easy creation of
type-safe, multipart component styles.
