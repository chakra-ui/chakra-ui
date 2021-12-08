---
"@chakra-ui/popover": minor
---

Add `PopoverAnchor` component which allows you to set the `Popover` reference
point without acting as a trigger.

```jsx live=false
<Popover>
  {/* triggers the popover to open/close */}
  <PopoverTrigger>
    <button>Trigger</button>
  </PopoverTrigger>
  {/* popover will be positioned relative to this */}
  <PopoverAnchor>
    <Box width="40px" height="40px" />
  </PopoverAnchor>
  <PopoverContent>Hello World</PopoverContent>
</Popover>
```
