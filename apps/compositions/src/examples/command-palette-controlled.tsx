"use client"

import {
  Button,
  CommandPalette,
  HStack,
  Kbd,
  Portal,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteControlled = () => {
  const [value, setValue] = useState<string[]>(["notion"])

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: apps,
    filter: contains,
  })

  return (
    <>
      <CommandPalette.Root
        collection={collection}
        selectionMode="single"
        value={value}
        onValueChange={(e) => setValue(e.value)}
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
                <CommandPalette.Input placeholder="Search applications..." />
              </CommandPalette.Control>
              <CommandPalette.List>
                {collection.items.map((item) => (
                  <CommandPalette.Item
                    item={item}
                    key={item.value}
                    _selected={{ bg: "blue.subtle", color: "blue.fg" }}
                  >
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                    <CommandPalette.ItemIndicator />
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No results found</CommandPalette.Empty>
              </CommandPalette.List>
            </CommandPalette.Panel>
          </CommandPalette.Positioner>
        </Portal>
      </CommandPalette.Root>

      <HStack mt="3">
        <Text textStyle="sm">Selected: {value.join(", ") || "none"}</Text>
        <Button size="xs" variant="outline" onClick={() => setValue([])}>
          Clear
        </Button>
      </HStack>
    </>
  )
}

const apps = [
  { label: "Linear", value: "linear" },
  { label: "Notion", value: "notion" },
  { label: "Figma", value: "figma" },
  { label: "Slack", value: "slack" },
  { label: "Cursor", value: "cursor" },
  { label: "Raycast", value: "raycast" },
]
