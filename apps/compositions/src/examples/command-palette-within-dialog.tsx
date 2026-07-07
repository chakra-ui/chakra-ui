"use client"

import {
  Button,
  CommandPalette,
  Dialog,
  Kbd,
  Portal,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const CommandPaletteWithinDialog = () => {
  const [open, setOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", listener)
    return () => document.removeEventListener("keydown", listener)
  }, [])

  return (
    <Dialog.Root
      open={open}
      placement="top"
      onOpenChange={(e) => {
        setOpen(e.open)
        if (!e.open) filter("")
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Search <Kbd>⌘K</Kbd>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content overflow="hidden">
            <CommandPalette.Root
              collection={collection}
              borderWidth="0"
              onSelect={() => setOpen(false)}
            >
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
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No results found</CommandPalette.Empty>
              </CommandPalette.List>
              <CommandPalette.Footer>
                <Span>
                  <Kbd size="sm">⏎</Kbd> to select
                </Span>
                <Span>
                  <Kbd size="sm">Esc</Kbd> to close
                </Span>
              </CommandPalette.Footer>
            </CommandPalette.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
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
