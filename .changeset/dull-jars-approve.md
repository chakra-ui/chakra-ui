---
"@chakra-ui/hooks": minor
"@chakra-ui/utils": minor
---

### Pointer Events

Add unified pointer event management utils and hook for interal use only.

The hook is called `usePointerEvent`, it works pretty similar to
`useEventListener` except that does two things:

- Unifies the pointer event system and ensure that only one of `onMouse*`,
  `onTouch*`, or `onPointer*` handler runs
- Provide event information about the pointer event like `x` and `y` position
  depending on the pointer type.

> Credits to `framer-motion` for doing the hard work for this utilities

### Focus Management

Set `preventScroll` option to be `true` by default, setting focus on an element
should happen without scrolling the page (in most cases).

Set `nextTick` to `undefined` by default and update all components that use next
tick to use `{ nextTick: true }`.
