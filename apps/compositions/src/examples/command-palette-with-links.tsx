"use client"

import { CommandPalette, useFilter, useListCollection } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"

export const CommandPaletteWithLinks = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: links,
    filter: contains,
  })

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Search documentation..."
          onChange={(e) => filter(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value} asChild>
            <a href={item.href} target="_blank" rel="noreferrer">
              <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
              <LuArrowUpRight />
            </a>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const links = [
  {
    label: "Getting Started",
    value: "getting-started",
    href: "https://chakra-ui.com/docs/get-started/installation",
  },
  {
    label: "Components",
    value: "components",
    href: "https://chakra-ui.com/docs/components/concepts/overview",
  },
  {
    label: "Theming",
    value: "theming",
    href: "https://chakra-ui.com/docs/theming/overview",
  },
  {
    label: "Showcase",
    value: "showcase",
    href: "https://chakra-ui.com/showcase",
  },
]
