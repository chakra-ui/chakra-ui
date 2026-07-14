"use client"

import {
  CommandPalette,
  Stack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const CommandPaletteWithSizes = () => {
  return (
    <Stack gap="8">
      <CommandPaletteDemo size="sm" />
      <CommandPaletteDemo size="md" />
      <CommandPaletteDemo size="lg" />
    </Stack>
  )
}

const CommandPaletteDemo = (
  props: Omit<CommandPalette.RootProps, "collection">,
) => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <CommandPalette.Root {...props} collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder={`Type a command or search... (${props.size})`}
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
            <CommandPalette.ItemCommand>
              {item.command}
            </CommandPalette.ItemCommand>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const commands = [
  { label: "New File", value: "new-file", command: "⌘N" },
  { label: "Open File", value: "open-file", command: "⌘O" },
  { label: "Save File", value: "save-file", command: "⌘S" },
  { label: "Open Settings", value: "settings", command: "⌘," },
]
