"use client"

import {
  Button,
  CommandPalette,
  Kbd,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const CommandPaletteWithDisabledItems = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <CommandPalette.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
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
              <CommandPalette.Input placeholder="Type a command or search..." />
            </CommandPalette.Control>
            <CommandPalette.List>
              {collection.items.map((item) => (
                <CommandPalette.Item item={item} key={item.value}>
                  <CommandPalette.ItemText>
                    {item.label}
                  </CommandPalette.ItemText>
                  {item.disabled && (
                    <CommandPalette.ItemCommand>
                      Upgrade required
                    </CommandPalette.ItemCommand>
                  )}
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
  { label: "Create Project", value: "create-project" },
  { label: "Invite Teammate", value: "invite" },
  { label: "Export as PDF", value: "export-pdf", disabled: true },
  { label: "Custom Domains", value: "domains", disabled: true },
  { label: "Open Settings", value: "settings" },
]
