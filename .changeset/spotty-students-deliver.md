---
"@chakra-ui/react": minor
---

- **CheckboxCard [New]**

  Add support for a new `CheckboxCard` component that can be used to render a
  card with a checkbox.

```jsx
<CheckboxCard.Root>
  <CheckboxCard.Control>
    <Stack gap="0" flex="1">
      <CheckboxCard.Label>Checkbox</CheckboxCard.Label>
      <Text>Some description</Text>
    </Stack>

    <CheckboxCard.HiddenInput />
    <CheckboxCard.Indicator />
  </CheckboxCard.Control>
</CheckboxCard.Root>
```

- **Checkmark [New]**

  Add new checkmark component for rendering a static checkmark icon with the
  `checked`, `disabled`, and `indeterminate` state baked in.

```jsx
<Stack>
  <Checkmark />
  <Checkmark checked />
  <Checkmark indeterminate />
  <Checkmark disabled />
  <Checkmark checked disabled />
  <Checkmark indeterminate disabled />
</Stack>
```

- **EmptyState [New]**

  Add new `EmptyState` component for rendering an empty state message with a
  title, description, and optional action button.

```jsx
<EmptyState.Root>
  <EmptyState.Content>
    <EmptyState.Indicator>
      <HiTemplate />
    </EmptyState.Indicator>

    <VStack textAlign="center">
      <Text fontWeight="medium">No template found</Text>
      <Text fontSize="sm" color="fg.muted">
        Try creating a new template with the button below
      </Text>
    </VStack>

    <Button variant="outline">
      <HiPlus /> Create Template
    </Button>
  </EmptyState.Content>
</EmptyState.Root>
```
