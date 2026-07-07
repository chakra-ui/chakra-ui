"use client"

import { CommandPalette, useFilter, useListCollection } from "@chakra-ui/react"

export const CommandPaletteWithDisabledItems = () => {
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
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
            {item.disabled && (
              <CommandPalette.ItemCommand>
                Upgrade required
              </CommandPalette.ItemCommand>
            )}
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
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
