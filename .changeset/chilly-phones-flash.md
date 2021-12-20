---
"@chakra-ui/styled-system": minor
---

### Add support peer pseudo style props

You can now style an element based on the state of its general sibling (marked
with `.peer` or `data-peer`) attribute.

```jsx live=false
<>
  <input type="checkbox" data-peer />
  <Box bg="white" _peerFocus={{ bg: "green.400" }} />
</>
```

The peer properties you can apply are `_peerHover`, `_peerFocus`,
`_peerFocusVisible`, `_peerActive`, `_peerInvalid`,
`_peerChecked`,`_peerFocusWithin`, `_peerPlaceholderShown`, `_peerDisabled`

### New style props

Added `_placeholderShown` pseudo props for styling elements when sibling inputs
have placeholder shown.

Added `_ltr` pseudo props for styling elements in LTR writing mode. This is
useful for products with RTL first approach.

Added `_mediaReduceMotion` pseudo props to apply reduce motion styles to
elements. This is useful when you need to remove CSS animations/transitions.
