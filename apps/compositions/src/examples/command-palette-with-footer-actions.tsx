"use client"

import {
  Button,
  CommandPalette,
  HStack,
  Kbd,
  Portal,
  Separator,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuCommand } from "react-icons/lu"

export const CommandPaletteWithFooterActions = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: apps,
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
              <CommandPalette.Input placeholder="Search for apps and commands..." />
            </CommandPalette.Control>
            <CommandPalette.List>
              {collection.items.map((item) => (
                <CommandPalette.Item item={item} key={item.value}>
                  <CommandPalette.ItemText>
                    {item.label}
                  </CommandPalette.ItemText>
                  <CommandPalette.ItemCommand>
                    {item.type}
                  </CommandPalette.ItemCommand>
                </CommandPalette.Item>
              ))}
              <CommandPalette.Empty>No results found</CommandPalette.Empty>
            </CommandPalette.List>
            <CommandPalette.Footer>
              <Span color="fg.muted" display="inline-flex">
                <LuCommand />
              </Span>
              <HStack gap="2" ms="auto">
                <Span>Open Application</Span>
                <Kbd size="sm">⏎</Kbd>
              </HStack>
              <Separator orientation="vertical" height="4" />
              <HStack gap="2">
                <Span>Actions</Span>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </HStack>
            </CommandPalette.Footer>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

const apps = [
  { label: "Linear", value: "linear", type: "Application" },
  { label: "Figma", value: "figma", type: "Application" },
  { label: "Slack", value: "slack", type: "Application" },
  { label: "Clipboard History", value: "clipboard", type: "Command" },
  { label: "Search Snippets", value: "snippets", type: "Command" },
  { label: "Calculator", value: "calculator", type: "Command" },
]
