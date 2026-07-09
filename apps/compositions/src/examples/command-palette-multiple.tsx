"use client"

import {
  Checkmark,
  CommandPalette,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteMultiple = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: labels,
    filter: contains,
  })

  return (
    <>
      <CommandPalette.Root
        collection={collection}
        selectionMode="multiple"
        value={selectedLabels}
        onValueChange={(e) => setSelectedLabels(e.value)}
        maxW="md"
      >
        <CommandPalette.Control>
          <CommandPalette.Indicator />
          <CommandPalette.Input
            placeholder="Search labels..."
            onChange={(e) => filter(e.currentTarget.value)}
          />
        </CommandPalette.Control>
        <CommandPalette.List>
          {collection.items.map((item) => (
            <CommandPalette.Item item={item} key={item.value}>
              <Checkmark
                size="sm"
                checked={selectedLabels.includes(item.value)}
              />
              <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
            </CommandPalette.Item>
          ))}
          <CommandPalette.Empty>No labels found</CommandPalette.Empty>
        </CommandPalette.List>
      </CommandPalette.Root>

      {selectedLabels.length > 0 && (
        <Text mt="3" textStyle="sm">
          Selected: {selectedLabels.join(", ")}
        </Text>
      )}
    </>
  )
}

const labels = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Documentation", value: "docs" },
  { label: "Design", value: "design" },
  { label: "Performance", value: "performance" },
  { label: "Accessibility", value: "a11y" },
  { label: "Breaking Change", value: "breaking" },
  { label: "Good First Issue", value: "good-first-issue" },
]
