---
"@chakra-ui/react": minor
---

**[New] CommandPalette**: Add a searchable command menu built on `Combobox` and
`Dialog`. It manages its own overlay, keyboard navigation, and the `mod+k`
shortcut.

```tsx
<CommandPalette.Root collection={collection}>
  <CommandPalette.Trigger>Open commands</CommandPalette.Trigger>
  <Portal>
    <CommandPalette.Backdrop />
    <CommandPalette.Positioner>
      <CommandPalette.Panel>
        <CommandPalette.Control>
          <CommandPalette.Indicator />
          <CommandPalette.Input placeholder="Search commands" />
        </CommandPalette.Control>
        <CommandPalette.List>
          {collection.items.map((item) => (
            <CommandPalette.Item
              key={item.value}
              item={item}
              onSelect={() => runCommand(item.value)}
            >
              <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
            </CommandPalette.Item>
          ))}
          <CommandPalette.Empty>No commands found</CommandPalette.Empty>
        </CommandPalette.List>
      </CommandPalette.Panel>
    </CommandPalette.Positioner>
  </Portal>
</CommandPalette.Root>
```

- Items run their `onSelect` action and close the palette by default. Use
  `closeOnSelect={false}` for nested pages or actions that keep it open.
- Use `selectionMode="single"` or `selectionMode="multiple"` to build a picker
  with persistent selection.
- Configure shortcuts with `hotkeys` and `hotkeyOptions`. When shortcuts
  overlap, the most recently mounted palette handles the event.
- Use `Loading`, `Empty`, and `Separator` to represent asynchronous results and
  organize command groups.
