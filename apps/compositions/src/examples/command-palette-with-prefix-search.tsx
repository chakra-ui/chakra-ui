"use client"

import {
  CommandPalette,
  HStack,
  Kbd,
  Span,
  createListCollection,
  useFilter,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { LuBookOpen, LuFolder, LuMoon, LuPlus, LuUser } from "react-icons/lu"

export const CommandPaletteWithPrefixSearch = () => {
  const [query, setQuery] = useState("")

  const { contains } = useFilter(filterOptions)

  const scope = scopes[query[0] as keyof typeof scopes]
  const searchText = scope ? query.slice(1).trim() : query

  const collection = useMemo(() => {
    const items = scope ? scope.items : allItems
    return createListCollection({
      items: items.filter((item) => contains(item.label, searchText)),
    })
  }, [scope, searchText, contains])

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        {scope && <Kbd size="sm">{scope.label}</Kbd>}
        <CommandPalette.Input
          placeholder="Search everything..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            {item.icon}
            <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
      <CommandPalette.Footer>
        <HStack gap="4">
          <Span>
            <Kbd size="sm">{">"}</Kbd> Commands
          </Span>
          <Span>
            <Kbd size="sm">@</Kbd> People
          </Span>
          <Span>
            <Kbd size="sm">#</Kbd> Projects
          </Span>
        </HStack>
      </CommandPalette.Footer>
    </CommandPalette.Root>
  )
}

const commandItems = [
  { label: "New Issue", value: "command-new-issue", icon: <LuPlus /> },
  { label: "Search Docs", value: "command-search-docs", icon: <LuBookOpen /> },
  { label: "Toggle Theme", value: "command-toggle-theme", icon: <LuMoon /> },
]

const peopleItems = [
  { label: "Segun Adebayo", value: "person-segun", icon: <LuUser /> },
  { label: "Esther Adebayo", value: "person-esther", icon: <LuUser /> },
  { label: "Christian Schröter", value: "person-christian", icon: <LuUser /> },
]

const projectItems = [
  {
    label: "Design System",
    value: "project-design-system",
    icon: <LuFolder />,
  },
  { label: "Marketing Site", value: "project-marketing", icon: <LuFolder /> },
  { label: "Mobile App", value: "project-mobile", icon: <LuFolder /> },
]

const allItems = [...commandItems, ...peopleItems, ...projectItems]

const filterOptions = { sensitivity: "base" } as const

const scopes = {
  ">": { label: "Commands", items: commandItems },
  "@": { label: "People", items: peopleItems },
  "#": { label: "Projects", items: projectItems },
}
