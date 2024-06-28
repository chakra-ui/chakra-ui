---
"@chakra-ui/react": minor
---

### Motion Styles

Add support for `motionStyle` props.

The idea is to pair them with text styles and layer styles to create this
three-part mixin that can make your styles a lot cleaner.

Motion styles focus solely on animations, allowing you to orchestrate animation
properties.

```jsx
import { defineMotionStyles } from "@chakra-ui/react"

export const motionStyles = defineMotionStyles({
  "slide-fade-in": {
    value: {
      transformOrigin: "var(--transform-origin)",
      animationDuration: "fast",
      "&[data-placement^=top]": {
        animationName: "slide-from-top, fade-in",
      },
      "&[data-placement^=bottom]": {
        animationName: "slide-from-bottom, fade-in",
      },
      "&[data-placement^=left]": {
        animationName: "slide-from-left, fade-in",
      },
      "&[data-placement^=right]": {
        animationName: "slide-from-right, fade-in",
      },
    },
  },
})
```

### Built-in Keyframe Animations

Chakra new provides built-in keyframe animations that you can use to create your
own motion styles.

**Slide:** `slide-from-top`, `slide-from-bottom`, `slide-from-left`,
`slide-from-right`, `slide-to-top`, `slide-to-bottom`, `slide-to-left`,
`slide-to-right`

**Slide Full:** `slide-from-top-full`, `slide-from-bottom-full`,
`slide-from-left-full`, `slide-from-right-full`, `slide-to-top-full`,
`slide-to-bottom-full`, `slide-to-left-full`, `slide-to-right-full`

**Fade:** `fade-in`, `fade-out`

**Scale:** `scale-in`, `scale-out`

You can compose these animations using the `animationName` property in your
motion styles to create really cool animations. No JS required.

```jsx
<Box animationName="slide-from-top, fade-in" animationDuration="fast">
  Slide from top and fade in
</Box>
```
