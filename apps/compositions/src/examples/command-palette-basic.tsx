"use client"

import {
  CommandPalette,
  Kbd,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import {
  LuCopy,
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuScissors,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

export const CommandPaletteBasic = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
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
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            {item.icon}
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
      <CommandPalette.Footer>
        <Span>
          <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate
        </Span>
        <Span>
          <Kbd size="sm">⏎</Kbd> to select
        </Span>
        <Span ms="auto">
          <Kbd size="sm">Esc</Kbd> to go back
        </Span>
      </CommandPalette.Footer>
    </CommandPalette.Root>
  )
}

const commands = [
  { label: "New File", value: "new-file", icon: <LuFilePlus /> },
  { label: "Open File", value: "open-file", icon: <LuFolderOpen /> },
  { label: "Save File", value: "save-file", icon: <LuSave /> },
  { label: "Copy Selection", value: "copy", icon: <LuCopy /> },
  { label: "Cut Selection", value: "cut", icon: <LuScissors /> },
  { label: "Search in Files", value: "search", icon: <LuSearch /> },
  { label: "Open Terminal", value: "terminal", icon: <LuTerminal /> },
  { label: "Open Settings", value: "settings", icon: <LuSettings /> },
]
