"use client"

import {
  Button,
  CommandPalette,
  Portal,
  Stack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const CommandPaletteWithSizes = () => {
  return (
    <Stack gap="4" align="flex-start">
      <CommandPaletteDemo size="sm" />
      <CommandPaletteDemo size="md" />
      <CommandPaletteDemo size="lg" />
    </Stack>
  )
}

const CommandPaletteDemo = (props: { size: "sm" | "md" | "lg" }) => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <CommandPalette.Root
      {...props}
      hotkey={null}
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline">Open palette ({props.size})</Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel>
            <CommandPalette.Label>Command palette</CommandPalette.Label>
            <CommandPalette.Control>
              <CommandPalette.Indicator />
              <CommandPalette.Input
                placeholder={`Type a command or search... (${props.size})`}
              />
            </CommandPalette.Control>
            <CommandPalette.List>
              {collection.items.map((item) => (
                <CommandPalette.Item item={item} key={item.value}>
                  <CommandPalette.ItemText>
                    {item.label}
                  </CommandPalette.ItemText>
                  <CommandPalette.ItemCommand>
                    {item.command}
                  </CommandPalette.ItemCommand>
                </CommandPalette.Item>
              ))}
              <CommandPalette.Empty>No results found</CommandPalette.Empty>
            </CommandPalette.List>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

const commands = [
  { label: "New File", value: "new-file", command: "⌘N" },
  { label: "Open File", value: "open-file", command: "⌘O" },
  { label: "Save File", value: "save-file", command: "⌘S" },
  { label: "Open Settings", value: "settings", command: "⌘," },
]
