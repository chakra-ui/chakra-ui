"use client"

import { CommandPalette, useFilter, useListCollection } from "@chakra-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"

export const CommandPaletteVirtualized = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 10,
  })

  return (
    <CommandPalette.Root
      collection={collection}
      maxW="md"
      scrollToIndexFn={(details) => {
        virtualizer.scrollToIndex(details.index, { align: "auto" })
      }}
    >
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder={`Search ${commands.length.toLocaleString()} commands...`}
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List ref={scrollRef}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = collection.items[virtualItem.index]
            return (
              <CommandPalette.Item
                key={item.value}
                item={item}
                aria-posinset={virtualItem.index + 1}
                aria-setsize={collection.size}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
              </CommandPalette.Item>
            )
          })}
        </div>
        <CommandPalette.Empty>No commands found</CommandPalette.Empty>
      </CommandPalette.List>
      <CommandPalette.Footer>
        {collection.size.toLocaleString()} commands
      </CommandPalette.Footer>
    </CommandPalette.Root>
  )
}

const actions = ["Open", "Close", "Rename", "Duplicate", "Delete", "Share"]

const commands = Array.from({ length: 5000 }, (_, index) => {
  const action = actions[index % actions.length]
  const file = `document-${String(Math.floor(index / actions.length) + 1).padStart(3, "0")}`
  return {
    label: `${action} ${file}`,
    value: `${action.toLowerCase()}-${file}`,
  }
})
