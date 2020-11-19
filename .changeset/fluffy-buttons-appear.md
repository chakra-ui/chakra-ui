---
"@chakra-ui/layout": patch
---

## Stack

- Fix Stack divider keys issue
- Fix issue where stack with divider doesn't respond to both responsive spacing
  and responsive direction

This wasn't working in v1 but now works 🎉

```jsx
<Stack
  spacing={["10px", "60px"]}
  divider={<StackDivider borderColor="gray.200" />}
  direction={["column", "row"]}
>
  <Box bgColor="red.500">First</Box>
  <Box bgColor="blue.500">Second</Box>
  <Box bgColor="yellow.500">Third</Box>
</Stack>
```

- Make it possible the regular `Divider` component within `Stack` by extending
  the `__css` internal style prop
