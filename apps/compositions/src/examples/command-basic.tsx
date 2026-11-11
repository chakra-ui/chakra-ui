"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Span,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuCopy,
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

export const CommandBasic = () => {
  const [lastCommand, setLastCommand] = useState<string>()

  const command = useCommandCollection({
    initialItems: commands,
  })

  return (
    <>
      <Command.Provider value={command}>
        <Command.Dialog>
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
                onSelect={(e) =>
                  setLastCommand(command.collection.find(e.itemValue)?.label)
                }
              >
                <Command.Control>
                  <Command.Indicator />
                  <Command.Input placeholder="Type a command or search..." />
                </Command.Control>
                <Command.List>
                  {command.collection.items.map((item) => (
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
                  <Command.Empty>No commands found</Command.Empty>
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
                    Run
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
      {lastCommand && (
        <Text mt="4" color="fg.muted" textStyle="sm">
          Ran <Span color="fg">{lastCommand}</Span>
        </Text>
      )}
    </>
  )
}

const commands = [
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
  { label: "Save", value: "save", icon: <LuSave />, shortcut: ["⌘", "S"] },
  {
    label: "Copy path",
    value: "copy-path",
    icon: <LuCopy />,
    shortcut: ["⌥", "⌘", "C"],
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
