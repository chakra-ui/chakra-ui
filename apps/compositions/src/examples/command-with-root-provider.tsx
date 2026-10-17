"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Span,
  Text,
  useCommand,
  useCommandCollection,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

export const CommandWithRootProvider = () => {
  const [open, setOpen] = useState(false)

  const command = useCommandCollection({
    initialItems: commands,
  })

  const store = useCommand({
    command,
    onClose: () => setOpen(false),
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return
      if (!(event.metaKey || event.ctrlKey)) return
      event.preventDefault()
      setOpen((prev) => !prev)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <HStack gap="4" wrap="wrap">
      <Button
        variant="outline"
        size="sm"
        minW="64"
        justifyContent="flex-start"
        color="fg.muted"
        onClick={() => setOpen(true)}
      >
        <LuSearch /> Search commands...
        <HStack gap="1" ms="auto">
          <KbdGroup size="sm" variant="subtle">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </HStack>
      </Button>
      <Text textStyle="sm" color="fg.muted">
        Last search:{" "}
        <Span color="fg">{store.combobox.inputValue || "None"}</Span>
      </Text>

      <Command.Provider value={command}>
        <Command.Dialog open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Command.DialogContent>
            <Command.RootProvider value={store}>
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Type a command or search..." />
              </Command.Control>
              <Command.List>
                {command.collection.items.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    {item.icon}
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    {item.shortcut.map((key) => (
                      <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                    ))}
                  </Command.Item>
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
            </Command.RootProvider>
          </Command.DialogContent>
        </Command.Dialog>
      </Command.Provider>
    </HStack>
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  icon: React.ReactNode
  shortcut: string[]
}

const commands: CommandItem[] = [
  {
    label: "New file",
    value: "new-file",
    icon: <LuFilePlus />,
    shortcut: ["⌘", "N"],
  },
  {
    label: "Open file",
    value: "open-file",
    icon: <LuFolderOpen />,
    shortcut: ["⌘", "O"],
  },
  {
    label: "Save file",
    value: "save-file",
    icon: <LuSave />,
    shortcut: ["⌘", "S"],
  },
  {
    label: "Search in files",
    value: "search",
    icon: <LuSearch />,
    shortcut: ["⇧", "⌘", "F"],
  },
  {
    label: "Toggle terminal",
    value: "terminal",
    icon: <LuTerminal />,
    shortcut: ["⌃", "`"],
  },
  {
    label: "Open settings",
    value: "settings",
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
]
