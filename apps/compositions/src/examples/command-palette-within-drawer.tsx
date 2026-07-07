"use client"

import {
  Button,
  CommandPalette,
  Drawer,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteWithinDrawer = () => {
  const [open, setOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open)
        if (!e.open) filter("")
      }}
    >
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Command Drawer
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <CommandPalette.Root
              collection={collection}
              borderWidth="0"
              height="full"
              onSelect={() => setOpen(false)}
            >
              <CommandPalette.Control>
                <CommandPalette.Indicator />
                <CommandPalette.Input
                  placeholder="Type a command or search..."
                  onChange={(e) => filter(e.currentTarget.value)}
                />
              </CommandPalette.Control>
              <CommandPalette.List maxH="none" flex="1">
                {collection.items.map((item) => (
                  <CommandPalette.Item item={item} key={item.value}>
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No results found</CommandPalette.Empty>
              </CommandPalette.List>
            </CommandPalette.Root>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

const commands = [
  { label: "Go to Dashboard", value: "dashboard" },
  { label: "Go to Projects", value: "projects" },
  { label: "Go to Settings", value: "settings" },
  { label: "Create New Project", value: "new-project" },
  { label: "Invite Teammate", value: "invite" },
  { label: "Switch Theme", value: "theme" },
  { label: "Sign Out", value: "sign-out" },
]
