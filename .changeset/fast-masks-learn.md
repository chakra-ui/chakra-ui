---
"@chakra-ui/layout": minor
---

Add `AbsoluteCenter` component to help manage centering of an element relative
to its parent dimensions.

It requires a parent that has `position: relative` to work correctly.

Here's how it works:

```jsx
<Box position="relative" w="600px" h="400px">
  <img src="some-image.png" />
  {/** This will be centered relative to `Box` */}
  <AbsoluteCenter>
    <PlayButton />
  </AbsoluteCenter>
</Box>
```
