---
"@chakra-ui/react": minor
---

**[New] Command**: Add a searchable command menu built on `Combobox` and
`Dialog`. It manages its own overlay, keyboard navigation, and the `mod+k`
shortcut.

```tsx
<Command.Root collection={collection}>
  <Command.Trigger>Open commands</Command.Trigger>
  <Portal>
    <Command.Backdrop />
    <Command.Positioner>
      <Command.Panel>
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Search commands" />
        </Command.Control>
        <Command.List>
          {collection.items.map((item) => (
            <Command.Item
              key={item.value}
              item={item}
              onSelect={() => runCommand(item.value)}
            >
              <Command.ItemText>{item.label}</Command.ItemText>
            </Command.Item>
          ))}
          <Command.Empty>No commands found</Command.Empty>
        </Command.List>
      </Command.Panel>
    </Command.Positioner>
  </Portal>
</Command.Root>
```

- Items run their `onSelect` action and close the palette by default. Use
  `closeOnSelect={false}` for nested pages or actions that keep it open.
- Command runs actions. For a picker with a persistent selection, use Combobox
  or Listbox.
- Use `useCommand` with `Command.RootProvider` to control the palette from
  anywhere, such as binding a `⌘K` shortcut.
- Use `Loading`, `Empty`, and `Separator` to represent asynchronous results and
  organize command groups.
