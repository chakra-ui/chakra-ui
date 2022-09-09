---
"@chakra-ui/styled-system": patch
"@chakra-ui/system": patch
---

Improve style resolution when components are wrapped within forced color mode
elements (`DarkMode`, `LightMode`).

We now dynamically attach the `data-theme` attribute to chakra elements when in
forced color mode.

```jsx live=false
<DarkMode>
  <chakra.div bg="gray.800" padding="40px">
    {/* Forced: Badge will now have `data-theme='dark' attached` */}
    <Badge>Total</Badge>
  </chakra.div>
</DarkMode>
```
