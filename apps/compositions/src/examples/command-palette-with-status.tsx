"use client"

import {
  Circle,
  CommandPalette,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const CommandPaletteWithStatus = () => {
  const [status, setStatus] = useState("in-progress")

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: statuses,
    filter: contains,
  })

  return (
    <CommandPalette.Root
      collection={collection}
      selectionMode="single"
      value={[status]}
      onValueChange={(e) => setStatus(e.value[0] ?? status)}
      maxW="md"
    >
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Change status..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <Circle size="2.5" bg={item.color} />
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
            <CommandPalette.ItemCommand>
              {item.command}
            </CommandPalette.ItemCommand>
            <CommandPalette.ItemIndicator />
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No statuses found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const statuses = [
  { label: "Backlog", value: "backlog", color: "gray.400", command: "1" },
  { label: "Todo", value: "todo", color: "blue.400", command: "2" },
  {
    label: "In Progress",
    value: "in-progress",
    color: "yellow.400",
    command: "3",
  },
  { label: "In Review", value: "in-review", color: "purple.400", command: "4" },
  { label: "Done", value: "done", color: "green.400", command: "5" },
  { label: "Canceled", value: "canceled", color: "red.400", command: "6" },
]
