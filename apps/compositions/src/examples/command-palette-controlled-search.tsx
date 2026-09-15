"use client"

import {
  Button,
  CommandPalette,
  HStack,
  Kbd,
  Portal,
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
      <CommandPalette.Root
        collection={collection}
        onInputValueChange={(e) => setSearch(e.inputValue)}
      >
        <CommandPalette.Trigger asChild>
          <Button variant="outline">
            Open palette <Kbd size="sm">⌘K</Kbd>
          </Button>
        </CommandPalette.Trigger>
        <Portal>
          <CommandPalette.Backdrop />
          <CommandPalette.Positioner>
            <CommandPalette.Panel>
              <CommandPalette.Control>
                <CommandPalette.Indicator />
                <CommandPalette.Input
                  placeholder="Type a command or search..."
                  value={searchTerm}
                />
              </CommandPalette.Control>
              <CommandPalette.List>
                {collection.items.map((item) => (
                  <CommandPalette.Item item={item} key={item.value}>
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No results found</CommandPalette.Empty>
              </CommandPalette.List>
            </CommandPalette.Panel>
          </CommandPalette.Positioner>
        </Portal>
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
