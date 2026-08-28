---
"@chakra-ui/react": patch
---

Fix the style cache returning another call site's result when the same
properties are passed in a different order.

The cache key was built from sorted object keys, so `{ fontSize, color }` and
`{ color, fontSize }` shared one entry. Whichever order ran first won for the
rest of the process. That caused two problems:

- Emotion hashes declaration order into the class name, so a long-lived SSR
  server and a fresh browser could compute different class names for the same
  styles. React then reported a hydration mismatch on `className` with no visual
  difference between the two rules.

- Recipe variants resolved to the wrong values, not just the wrong order. Given
  a recipe where `size="md"` sets `padding: 8px` and `variant="solid"` sets
  `padding: 16px`, both of these rendered `16px`:

  ```tsx
  <Button size="md" variant="solid" />
  <Button variant="solid" size="md" />
  ```

Property order is now part of the cache key. Style objects that differ only in
order get their own entry and keep the order you wrote.
