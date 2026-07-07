"use client"

import { CommandPalette, useFilter, useListCollection } from "@chakra-ui/react"

export const CommandPaletteWithGroups = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
    groupBy: (item) => item.group,
    groupSort: ["File", "Edit", "View"],
  })

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Type a command or search..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.group().map(([group, items]) => (
          <CommandPalette.ItemGroup key={group}>
            <CommandPalette.ItemGroupLabel>
              {group}
            </CommandPalette.ItemGroupLabel>
            {items.map((item) => (
              <CommandPalette.Item item={item} key={item.value}>
                <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
                <CommandPalette.ItemCommand>
                  {item.command}
                </CommandPalette.ItemCommand>
              </CommandPalette.Item>
            ))}
          </CommandPalette.ItemGroup>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const commands = [
  { label: "New File", value: "new-file", group: "File", command: "⌘N" },
  { label: "Open File", value: "open-file", group: "File", command: "⌘O" },
  { label: "Save File", value: "save-file", group: "File", command: "⌘S" },
  { label: "Undo", value: "undo", group: "Edit", command: "⌘Z" },
  { label: "Redo", value: "redo", group: "Edit", command: "⇧⌘Z" },
  { label: "Find", value: "find", group: "Edit", command: "⌘F" },
  { label: "Zoom In", value: "zoom-in", group: "View", command: "⌘+" },
  { label: "Zoom Out", value: "zoom-out", group: "View", command: "⌘-" },
  { label: "Toggle Sidebar", value: "sidebar", group: "View", command: "⌘B" },
]
