---
"@chakra-ui/button": patch
"@chakra-ui/theme": patch
---

Added support for `orientation` prop in the ButtonGroup component.

This makes it possible to now have vertical button groups when `isAttached` is
set to `true`.

```jsx live=false
<ButtonGroup isAttached orientation="vertical">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
</ButtonGroup>
```
