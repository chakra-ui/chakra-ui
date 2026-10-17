"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  useCommandCollection,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import {
  LuClipboard,
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

const STORAGE_KEY = "chakra-command-recent"
const MAX_RECENT = 3

const readRecent = (): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

const writeRecent = (values: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch {}
}

export const CommandWithRecentItems = () => {
  const [recent, setRecent] = useState<string[]>([])

  useEffect(() => {
    setRecent(readRecent())
  }, [])

  const [searching, setSearching] = useState(false)

  const items = useMemo(() => {
    if (searching) return commands
    const recentItems = recent
      .map((value) => commands.find((item) => item.value === value))
      .filter((item): item is CommandItem => item != null)
      .map((item) => ({
        ...item,
        value: `recent:${item.value}`,
        group: "Recent",
      }))
    return [...recentItems, ...commands]
  }, [searching, recent])

  const command = useCommandCollection({
    initialItems: items,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Provider value={command}>
      <Command.Dialog
        onExitComplete={() => {
          setSearching(false)
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
            <LuSearch /> Search commands...
          </Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root
              onInputValueChange={(e) => setSearching(e.inputValue !== "")}
              onSelect={(e) => {
                const value = e.itemValue.replace(/^recent:/, "")
                const next = [
                  value,
                  ...recent.filter((v) => v !== value),
                ].slice(0, MAX_RECENT)
                setRecent(next)
                writeRecent(next)
              }}
            >
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Type a command or search..." />
              </Command.Control>
              <Command.List>
                {command.collection.group().map(([group, items]) => (
                  <Command.ItemGroup key={group}>
                    <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
                    {items.map((item) => (
                      <Command.Item item={item} key={item.value}>
                        {item.icon}
                        <Command.ItemText highlight>
                          {item.label}
                        </Command.ItemText>
                        {item.shortcut.map((key) => (
                          <Command.ItemCommand key={key}>
                            {key}
                          </Command.ItemCommand>
                        ))}
                      </Command.Item>
                    ))}
                  </Command.ItemGroup>
                ))}
                <Command.Empty>No results found</Command.Empty>
              </Command.List>
              <Command.Footer>
                <HStack gap="1.5">
                  <KbdGroup size="sm" variant="subtle">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                  </KbdGroup>
                  Navigate
                </HStack>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    ↵
                  </Kbd>
                  Select
                </HStack>
                <HStack gap="1.5">
                  <Kbd size="sm" variant="subtle">
                    esc
                  </Kbd>
                  Close
                </HStack>
              </Command.Footer>
            </Command.Root>
          </Command.DialogContent>
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
  shortcut: string[]
}

const commands: CommandItem[] = [
  {
    label: "New file",
    value: "new-file",
    group: "Commands",
    icon: <LuFilePlus />,
    shortcut: ["⌘", "N"],
  },
  {
    label: "Open file",
    value: "open-file",
    group: "Commands",
    icon: <LuFolderOpen />,
    shortcut: ["⌘", "O"],
  },
  {
    label: "Save file",
    value: "save-file",
    group: "Commands",
    icon: <LuSave />,
    shortcut: ["⌘", "S"],
  },
  {
    label: "Copy selection",
    value: "copy",
    group: "Commands",
    icon: <LuClipboard />,
    shortcut: ["⌘", "C"],
  },
  {
    label: "Search in files",
    value: "search",
    group: "Commands",
    icon: <LuSearch />,
    shortcut: ["⇧", "⌘", "F"],
  },
  {
    label: "Open terminal",
    value: "terminal",
    group: "Commands",
    icon: <LuTerminal />,
    shortcut: ["⌃", "`"],
  },
  {
    label: "Open settings",
    value: "settings",
    group: "Commands",
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
]
