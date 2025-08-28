---
"@chakra-ui/react": minor
---

- **Listbox [New]**: Add new component with support for single/multi-select,
  grouping, virtualization, controlled state, icons, descriptions, and
  accessibility features.

  This component can be used to build command palettes, dropdowns with search,
  and much more.

```tsx
<Listbox.Root collection={frameworks} width="320px">
  <Listbox.Label>Select framework</Listbox.Label>
  <Listbox.Content>
    {frameworks.items.map((framework) => (
      <Listbox.Item item={framework} key={framework.value}>
        <Listbox.ItemText>{framework.label}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    ))}
  </Listbox.Content>
</Listbox.Root>
```

- **Hover Card**: Add support for `disabled` prop

- **Select, Menu**: Fix issue where disabled items could be reached via
  typeahead

- **Color Picker**: Fix issue where color picker was not working correctly in
  RTL mode

- **Number Input**
  - Omit the input `pattern` when `formatOptions` is provided. This prevents
    native pattern validation from conflicting with formatted values (e.g.,
    currency or percent).
  - Handle empty values consistently across all format options.
  - Add `data-scrubbing` attribute to the number input parts.
