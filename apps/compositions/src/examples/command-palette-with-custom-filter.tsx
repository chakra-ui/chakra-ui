"use client"

import { CommandPalette, useListCollection } from "@chakra-ui/react"

const fuzzyMatch = (itemText: string, filterText: string) => {
  if (!filterText) return true
  let index = 0
  const text = itemText.toLowerCase()
  for (const char of filterText.toLowerCase()) {
    index = text.indexOf(char, index)
    if (index === -1) return false
    index += 1
  }
  return true
}

export const CommandPaletteWithCustomFilter = () => {
  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: fuzzyMatch,
  })

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Fuzzy search, try 'nf' or 'ost'..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const commands = [
  { label: "New File", value: "new-file" },
  { label: "Open File", value: "open-file" },
  { label: "Save All Files", value: "save-all" },
  { label: "Open Settings", value: "settings" },
  { label: "Toggle Sidebar", value: "sidebar" },
  { label: "Open Terminal", value: "terminal" },
]
