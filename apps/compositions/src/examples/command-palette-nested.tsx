"use client"

import {
  CommandPalette,
  Kbd,
  Span,
  createListCollection,
  useFilter,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { LuMonitor, LuMoon, LuPalette, LuSearch, LuSun } from "react-icons/lu"

interface Command {
  label: string
  value: string
  icon?: React.ReactNode
  page?: string
}

const rootCommands: Command[] = [
  {
    label: "Change Theme...",
    value: "theme",
    icon: <LuPalette />,
    page: "theme",
  },
  { label: "Search Projects...", value: "projects", icon: <LuSearch /> },
]

const themeCommands: Command[] = [
  { label: "Light Theme", value: "light", icon: <LuSun /> },
  { label: "Dark Theme", value: "dark", icon: <LuMoon /> },
  { label: "System Theme", value: "system", icon: <LuMonitor /> },
]

export const CommandPaletteNested = () => {
  const [query, setQuery] = useState("")
  const [pages, setPages] = useState<string[]>([])
  const [theme, setTheme] = useState("system")

  const page = pages[pages.length - 1]

  const { contains } = useFilter({ sensitivity: "base" })

  const collection = useMemo(() => {
    const source = page === "theme" ? themeCommands : rootCommands
    return createListCollection({
      items: source.filter((item) => contains(item.label, query)),
    })
  }, [page, query, contains])

  return (
    <CommandPalette.Root
      collection={collection}
      value={[]}
      maxW="md"
      onSelect={({ value }) => {
        const item = collection.find(value)
        if (!item) return
        setQuery("")
        if (item.page) {
          setPages((prev) => [...prev, item.page!])
        } else if (page === "theme") {
          setTheme(item.value)
          setPages([])
        }
      }}
    >
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        {page && <Kbd size="sm">{page}</Kbd>}
        <CommandPalette.Input
          placeholder={page ? "Pick a theme..." : "Type a command..."}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !query && pages.length) {
              e.preventDefault()
              setPages((prev) => prev.slice(0, -1))
            }
          }}
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
        <Span>Theme: {theme}</Span>
        <Span ms="auto">
          <Kbd size="sm">⌫</Kbd> to go back
        </Span>
      </CommandPalette.Footer>
    </CommandPalette.Root>
  )
}
