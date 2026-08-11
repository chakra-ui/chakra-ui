"use client"

import {
  Button,
  Checkmark,
  CommandPalette,
  Kbd,
  Portal,
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
                <CommandPalette.Input placeholder="Search labels..." />
              </CommandPalette.Control>
              <CommandPalette.List>
                {collection.items.map((item) => (
                  <CommandPalette.Item item={item} key={item.value}>
                    <Checkmark
                      size="sm"
                      checked={selectedLabels.includes(item.value)}
                    />
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No labels found</CommandPalette.Empty>
              </CommandPalette.List>
            </CommandPalette.Panel>
          </CommandPalette.Positioner>
        </Portal>
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
