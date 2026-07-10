"use client"

import {
  CommandPalette,
  createListCollection,
  useFilter,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import {
  LuClipboard,
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

interface Command {
  label: string
  value: string
  icon: React.ReactNode
}

export const CommandPaletteWithRecentItems = () => {
  const [query, setQuery] = useState("")
  const [recentValues, setRecentValues] = useState(["terminal", "settings"])

  const { contains } = useFilter(filterOptions)

  const collection = useMemo(() => {
    if (query) {
      return createListCollection({
        items: commands.filter((command) => contains(command.label, query)),
      })
    }
    const recent = recentValues
      .map((value) => commands.find((command) => command.value === value))
      .filter((command) => command != null)
    const rest = commands.filter(
      (command) => !recentValues.includes(command.value),
    )
    return createListCollection({ items: [...recent, ...rest] })
  }, [query, recentValues, contains])

  return (
    <CommandPalette.Root
      collection={collection}
      onSelect={(e) => {
        setRecentValues((prev) =>
          [e.value, ...prev.filter((v) => v !== e.value)].slice(0, 3),
        )
      }}
      maxW="md"
    >
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Type a command or search..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <CommandPalette.List>
        {query === "" ? (
          <>
            <CommandPalette.ItemGroup>
              <CommandPalette.ItemGroupLabel>
                Recent
              </CommandPalette.ItemGroupLabel>
              {collection.items
                .filter((item) => recentValues.includes(item.value))
                .map((item) => (
                  <CommandItem key={item.value} item={item} />
                ))}
            </CommandPalette.ItemGroup>
            <CommandPalette.ItemGroup>
              <CommandPalette.ItemGroupLabel>
                Commands
              </CommandPalette.ItemGroupLabel>
              {collection.items
                .filter((item) => !recentValues.includes(item.value))
                .map((item) => (
                  <CommandItem key={item.value} item={item} />
                ))}
            </CommandPalette.ItemGroup>
          </>
        ) : (
          collection.items.map((item) => (
            <CommandItem key={item.value} item={item} />
          ))
        )}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const CommandItem = (props: { item: Command }) => {
  const { item } = props
  return (
    <CommandPalette.Item item={item}>
      {item.icon}
      <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
    </CommandPalette.Item>
  )
}

const filterOptions = { sensitivity: "base" } as const

const commands: Command[] = [
  { label: "New File", value: "new-file", icon: <LuFilePlus /> },
  { label: "Open File", value: "open-file", icon: <LuFolderOpen /> },
  { label: "Save File", value: "save-file", icon: <LuSave /> },
  { label: "Copy Selection", value: "copy", icon: <LuClipboard /> },
  { label: "Search in Files", value: "search", icon: <LuSearch /> },
  { label: "Open Terminal", value: "terminal", icon: <LuTerminal /> },
  { label: "Open Settings", value: "settings", icon: <LuSettings /> },
]
