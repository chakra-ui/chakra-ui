"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Stack,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuFilePlus,
  LuFolderOpen,
  LuSave,
  LuSearch,
  LuSettings,
} from "react-icons/lu"

export const CommandWithSizes = () => {
  return (
    <Stack gap="3" align="flex-start">
      <CommandDemo size="sm" />
      <CommandDemo size="md" />
      <CommandDemo size="lg" />
    </Stack>
  )
}

const CommandDemo = (props: { size: "sm" | "md" | "lg" }) => {
  const command = useCommandCollection({ initialItems: commands })

  return (
    <Command.Provider value={command}>
      <Command.Dialog size={props.size}>
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="flex-start"
            color="fg.muted"
          >
            <LuSearch /> Search... (size={props.size})
          </Button>
        </Command.DialogTrigger>
        <Command.DialogContent>
          <Command.Root size={props.size}>
            <Command.Label>Command palette</Command.Label>
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
          </Command.Root>
        </Command.DialogContent>
      </Command.Dialog>
    </Command.Provider>
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
  { label: "Save", value: "save", icon: <LuSave />, shortcut: ["⌘", "S"] },
  {
    label: "Open settings",
    value: "settings",
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
]
