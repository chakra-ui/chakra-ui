---
"@chakra-ui/layout": minor
"@chakra-ui/react": minor
---

- Add new `Indicator` layout component. Useful for positioning an element in the
  corners of another element.

  For example, let's say you want to position a notification badge in the top
  end corner of a box. You can use the `Indicator` component to achieve this.

  ```jsx live=false
  <Box position="relative" width="80px" height="80px" bg="gray.50">
    <Indicator placement="top-end">
      <Circle size="5" bg="red.100">
        3
      </Circle>
    </Indicator>
  </Box>
  ```

- Refactored the `Stack` and `Wrap` components to use the flex gap instead of
  the owl selector `& > * ~ *` for spacing.

  This fixes an issue where you can't use raw text nodes as a child of the
  `Stack` or `Wrap` component.
