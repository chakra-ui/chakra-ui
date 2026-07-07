"use client"

import {
  Button,
  CommandPalette,
  Popover,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const CommandPaletteWithinPopover = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: members,
    filter: contains,
  })

  return (
    <Popover.Root
      onOpenChange={(e) => {
        if (!e.open) filter("")
      }}
    >
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          Assign Member
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="xs">
            <CommandPalette.Root collection={collection} borderWidth="0">
              <CommandPalette.Control>
                <CommandPalette.Indicator />
                <CommandPalette.Input
                  placeholder="Search members..."
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
                <CommandPalette.Empty>No members found</CommandPalette.Empty>
              </CommandPalette.List>
            </CommandPalette.Root>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

const members = [
  { label: "Segun Adebayo", value: "segun" },
  { label: "Kevin Kalisa", value: "kevin" },
  { label: "Esther Adebayo", value: "esther" },
  { label: "Abraham Aremu", value: "abraham" },
  { label: "Ivan Dalmet", value: "ivan" },
]
