---
"@chakra-ui/react": patch
---

- **System**: Fix an exclamation mark anywhere inside a style value being read
  as the `!important` marker. `content: '"!"'` rendered as an empty string,
  `url(/a!b.png)` lost its `!`, and every such value was emitted with
  `!important`. The marker is now only recognised at the end of the value, so
  `color: "red!"` and `color: "red !important"` behave as before.
