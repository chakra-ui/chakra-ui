"use client"

import {
  Button,
  CommandPalette,
  Kbd,
  Portal,
  Span,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuCopy,
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuScissors,
  LuSearch,
  LuSettings,
  LuTerminal,
} from "react-icons/lu"

export const CommandPaletteBasic = () => {
  const [lastCommand, setLastCommand] = useState<string>()
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: commands,
    filter: contains,
  })

  return (
    <>
      <CommandPalette.Root
        collection={collection}
        onInputValueChange={(e) => filter(e.inputValue)}
      >
        <CommandPalette.Trigger asChild>
          <Button variant="outline">
            Open palette <Kbd size="sm">⌘K</Kbd>
          </Button>
        </CommandPalette.Trigger>
        <Portal>
          <CommandPalette.Backdrop />
          <CommandPalette.Positioner>
            <CommandPalette.Panel>
              <CommandPalette.Label>Command palette</CommandPalette.Label>
              <CommandPalette.Control>
                <CommandPalette.Indicator />
                <CommandPalette.Input placeholder="Type a command or search..." />
              </CommandPalette.Control>
              <CommandPalette.List>
                {collection.items.map((item) => (
                  <CommandPalette.Item
                    item={item}
                    key={item.value}
                    onSelect={() => setLastCommand(item.label)}
                  >
                    {item.icon}
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                    <CommandPalette.ItemCommand>
                      {item.shortcut}
                    </CommandPalette.ItemCommand>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No results found</CommandPalette.Empty>
              </CommandPalette.List>
              <CommandPalette.Footer>
                <Span>
                  <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate
                </Span>
                <Span>
                  <Kbd size="sm">⏎</Kbd> to run
                </Span>
                <Span ms="auto">
                  <Kbd size="sm">Esc</Kbd> to close
                </Span>
              </CommandPalette.Footer>
            </CommandPalette.Panel>
          </CommandPalette.Positioner>
        </Portal>
      </CommandPalette.Root>
      {lastCommand && (
        <Text mt="4" color="fg.muted" textStyle="sm">
          Ran command: <Span color="fg">{lastCommand}</Span>
        </Text>
      )}
    </>
  )
}

const commands = [
  { label: "New File", value: "new-file", icon: <LuFilePlus />, shortcut: "N" },
  {
    label: "Open File",
    value: "open-file",
    icon: <LuFolderOpen />,
    shortcut: "O",
  },
  { label: "Save File", value: "save-file", icon: <LuSave />, shortcut: "S" },
  { label: "Copy Selection", value: "copy", icon: <LuCopy />, shortcut: "⌘C" },
  {
    label: "Cut Selection",
    value: "cut",
    icon: <LuScissors />,
    shortcut: "⌘X",
  },
  {
    label: "Search in Files",
    value: "search",
    icon: <LuSearch />,
    shortcut: "⇧⌘F",
  },
  {
    label: "Open Terminal",
    value: "terminal",
    icon: <LuTerminal />,
    shortcut: "⌃`",
  },
  {
    label: "Open Settings",
    value: "settings",
    icon: <LuSettings />,
    shortcut: "⌘,",
  },
]
