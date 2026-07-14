"use client"

import {
  Button,
  CommandPalette,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus, LuTag } from "react-icons/lu"

export const CommandPaletteWithEmptyState = () => {
  const [query, setQuery] = useState("")

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter, append } = useListCollection({
    initialItems: labels,
    filter: contains,
  })

  const createLabel = () => {
    append({ label: query, value: query.toLowerCase().replace(/\s+/g, "-") })
    setQuery("")
  }

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Search labels..."
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value)
            filter(e.currentTarget.value)
          }}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <LuTag />
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>
          <Stack gap="3" align="center">
            <Text>{`No labels found for "${query}"`}</Text>
            <Button size="xs" variant="outline" onClick={createLabel}>
              <LuPlus /> {`Create "${query}"`}
            </Button>
          </Stack>
        </CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const labels = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Documentation", value: "docs" },
  { label: "Design", value: "design" },
  { label: "Performance", value: "performance" },
]
