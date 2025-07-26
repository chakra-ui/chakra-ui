---
"@chakra-ui/react": minor
---

- **System**: Add `unstyled` prop support to compound component children to
  opt-out of recipe styles per component.

  ```tsx
  <Accordion.Root defaultValue={["a"]}>
    <Accordion.Item value="a">
      {/* Opt-out of recipe styles */}
      <Accordion.ItemTrigger unstyled bg="red.500" />
      <Accordion.ItemContent>
        <Accordion.ItemBody />
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
  ```

- **Group**: Add support changing group gap globally via `--group-gap` CSS
  variable
