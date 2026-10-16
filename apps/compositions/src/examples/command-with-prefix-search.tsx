"use client"

import {
  Badge,
  Button,
  Command,
  HStack,
  Kbd,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuBookOpen,
  LuFolder,
  LuMoon,
  LuPlus,
  LuSearch,
  LuUserRound,
} from "react-icons/lu"

type Prefix = keyof typeof scopes

const isPrefix = (value: string): value is Prefix => value in scopes

export const CommandWithPrefixSearch = () => {
  const [prefix, setPrefix] = useState<Prefix | null>(null)

  const scope = prefix ? scopes[prefix] : null

  const command = useCommandCollection({
    initialItems: scope ? scope.items : allItems,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Dialog
      onExitComplete={() => {
        command.search("")
        setPrefix(null)
      }}
    >
      <Command.DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          minW="64"
          justifyContent="flex-start"
          color="fg.muted"
        >
          <LuSearch /> Search everything...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => {
          const value = e.inputValue
          if (!prefix && isPrefix(value[0])) {
            setPrefix(value[0] as Prefix)
            command.search(value.slice(1).trimStart())
            return
          }
          command.search(value)
        }}
      >
        <Command.Control>
          <Command.Indicator />
          {scope && (
            <Badge size="sm" variant="surface" flexShrink="0">
              {scope.icon}
              {scope.label}
            </Badge>
          )}
          <Command.Input
            placeholder={
              scope
                ? `Search ${scope.label.toLowerCase()}...`
                : "Search or type > @ # to filter..."
            }
            value={command.query}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !command.query && prefix) {
                e.preventDefault()
                setPrefix(null)
              }
            }}
          />
        </Command.Control>
        <Command.List>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group}>
              <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item item={item} key={item.value}>
                  {item.icon}
                  <Command.ItemText highlight>{item.label}</Command.ItemText>
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
          <Command.Empty>No results found</Command.Empty>
        </Command.List>
        <Command.Footer>
          {Object.entries(scopes).map(([key, value]) => (
            <HStack gap="1.5" key={key}>
              <Kbd size="sm" variant="subtle">
                {key}
              </Kbd>
              {value.label}
            </HStack>
          ))}
        </Command.Footer>
      </Command.Root>
    </Command.Dialog>
  )
}

interface SearchItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
}

const commandItems: SearchItem[] = [
  {
    label: "Create new issue",
    value: "command-new-issue",
    group: "Commands",
    icon: <LuPlus />,
  },
  {
    label: "Search documentation",
    value: "command-search-docs",
    group: "Commands",
    icon: <LuBookOpen />,
  },
  {
    label: "Toggle dark mode",
    value: "command-toggle-theme",
    group: "Commands",
    icon: <LuMoon />,
    keywords: ["theme"],
  },
]

const peopleItems: SearchItem[] = [
  {
    label: "Segun Adebayo",
    value: "person-segun",
    group: "People",
    icon: <LuUserRound />,
  },
  {
    label: "Esther Adebayo",
    value: "person-esther",
    group: "People",
    icon: <LuUserRound />,
  },
  {
    label: "Christian Schröter",
    value: "person-christian",
    group: "People",
    icon: <LuUserRound />,
  },
]

const projectItems: SearchItem[] = [
  {
    label: "Design system",
    value: "project-design-system",
    group: "Projects",
    icon: <LuFolder />,
  },
  {
    label: "Marketing site",
    value: "project-marketing",
    group: "Projects",
    icon: <LuFolder />,
  },
  {
    label: "Mobile app",
    value: "project-mobile",
    group: "Projects",
    icon: <LuFolder />,
  },
]

const allItems = [...commandItems, ...peopleItems, ...projectItems]

const scopes = {
  ">": { label: "Commands", icon: <LuPlus />, items: commandItems },
  "@": { label: "People", icon: <LuUserRound />, items: peopleItems },
  "#": { label: "Projects", icon: <LuFolder />, items: projectItems },
}
