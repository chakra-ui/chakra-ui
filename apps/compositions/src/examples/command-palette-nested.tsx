"use client"

import {
  CommandPalette,
  Icon,
  Kbd,
  Span,
  VisuallyHidden,
  createListCollection,
  useFilter,
} from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"
import { useMemo, useState } from "react"
import {
  LuArrowLeft,
  LuDelete,
  LuMonitor,
  LuMoon,
  LuPalette,
  LuSearch,
  LuSun,
} from "react-icons/lu"

interface Command {
  label: string
  value: string
  icon?: React.ReactNode
  page?: string
  back?: boolean
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
  { label: "Go Back", value: "back", icon: <LuArrowLeft />, back: true },
]

const filterOptions = { sensitivity: "base" } as const

export const CommandPaletteNested = () => {
  const [query, setQuery] = useState("")
  const [pages, setPages] = useState<string[]>([])
  const [theme, setTheme] = useState("system")

  const page = pages[pages.length - 1]

  const { contains } = useFilter(filterOptions)

  const collection = useMemo(() => {
    const source = page === "theme" ? themeCommands : rootCommands
    return createListCollection({
      items: source.filter((item) => contains(item.label, query)),
    })
  }, [page, query, contains])

  return (
    <CommandPalette.Root
      collection={collection}
      maxW="md"
      onSelect={({ value }) => {
        const item = collection.find(value)
        if (!item) return
        setQuery("")
        if (item.back) {
          setPages((prev) => prev.slice(0, -1))
        } else if (item.page) {
          setPages((prev) => [...prev, item.page!])
        } else if (page === "theme") {
          setTheme(item.value)
          setPages([])
          toaster.create({
            description: `${item.label} enabled`,
            type: "success",
          })
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
        <Span ms="auto" display="inline-flex" alignItems="center" gap="1">
          <Kbd>
            <Icon boxSize="3.5">
              <LuDelete />
            </Icon>
            <VisuallyHidden>Backspace</VisuallyHidden>
          </Kbd>
          to go back
        </Span>
      </CommandPalette.Footer>
    </CommandPalette.Root>
  )
}
