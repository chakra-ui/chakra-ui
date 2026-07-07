"use client"

import {
  Button,
  CommandPalette,
  HStack,
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
        value={value}
        onValueChange={(e) => setValue(e.value)}
        maxW="md"
      >
        <CommandPalette.Control>
          <CommandPalette.Indicator />
          <CommandPalette.Input
            placeholder="Search applications..."
            onChange={(e) => filter(e.currentTarget.value)}
          />
        </CommandPalette.Control>
        <CommandPalette.List>
          {collection.items.map((item) => (
            <CommandPalette.Item item={item} key={item.value}>
              <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
              <CommandPalette.ItemIndicator />
            </CommandPalette.Item>
          ))}
          <CommandPalette.Empty>No results found</CommandPalette.Empty>
        </CommandPalette.List>
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
