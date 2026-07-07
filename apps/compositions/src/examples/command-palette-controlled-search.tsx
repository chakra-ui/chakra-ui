"use client"

import {
  Button,
  CommandPalette,
  HStack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteControlledSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  const setSearch = (value: string) => {
    setSearchTerm(value)
    filter(value)
  }

  return (
    <>
      <CommandPalette.Root collection={collection} maxW="md">
        <CommandPalette.Control>
          <CommandPalette.Indicator />
          <CommandPalette.Input
            placeholder="Type a command or search..."
            value={searchTerm}
            onChange={(e) => setSearch(e.currentTarget.value)}
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

      <HStack mt="3">
        {["theme", "project", "settings"].map((term) => (
          <Button
            key={term}
            size="xs"
            variant="outline"
            onClick={() => setSearch(term)}
          >
            Try: {term}
          </Button>
        ))}
      </HStack>
    </>
  )
}

const commands = [
  { label: "Switch Theme", value: "theme" },
  { label: "Create New Project", value: "new-project" },
  { label: "Delete Project", value: "delete-project" },
  { label: "Open Settings", value: "settings" },
  { label: "Sync Settings", value: "sync-settings" },
  { label: "Invite Teammate", value: "invite" },
]
