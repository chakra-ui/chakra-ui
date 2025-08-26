---
"@chakra-ui/react": minor
---

**Listbox [New]**: Add new component with support for single/multi-select,
grouping, virtualization, controlled state, icons, descriptions, and
accessibility features.

This component can be used to build command palettes, dropdowns with search, and
much more.

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
