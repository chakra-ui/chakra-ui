---
"@chakra-ui/react": patch
---

- **Flex, Square**: Fix the array form of the `css` prop being silently dropped.
  Both components merged the incoming `css` into their base styles with an
  object spread, which turns an array into index keys instead of merging its
  entries. They now pass `css={[baseStyles, props.css]}`, matching
  `AspectRatio`, `Bleed` and `Float`. `Circle` renders through `Square`, so it
  is fixed too
