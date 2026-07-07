"use client"

import {
  CommandPalette,
  Highlight,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteWithHighlight = () => {
  const [query, setQuery] = useState("")

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
          onChange={(e) => {
            setQuery(e.currentTarget.value)
            filter(e.currentTarget.value)
          }}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <CommandPalette.ItemText>
              <Highlight
                query={query}
                styles={{ fontWeight: "semibold", color: "fg" }}
              >
                {item.label}
              </Highlight>
            </CommandPalette.ItemText>
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
  { label: "Save File", value: "save-file" },
  { label: "Open Settings", value: "settings" },
  { label: "Toggle Sidebar", value: "sidebar" },
  { label: "Open Terminal", value: "terminal" },
]
