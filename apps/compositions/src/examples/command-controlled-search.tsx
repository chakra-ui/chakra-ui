"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  Span,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuFolderPlus,
  LuRefreshCw,
  LuSearch,
  LuSettings,
  LuSunMoon,
  LuTrash2,
  LuUserPlus,
} from "react-icons/lu"

export const CommandControlledSearch = () => {
  const [inputValue, setInputValue] = useState("")

  const command = useCommandCollection({
    initialItems: commands,
    groupBy: (item) => item.group,
  })

  const setSearch = (value: string) => {
    setInputValue(value)
    command.search(value)
  }

  return (
    <>
      <Command.Dialog onExitComplete={() => setSearch("")}>
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="flex-start"
            color="fg.muted"
          >
            <LuSearch /> {inputValue || "Search commands..."}
          </Button>
        </Command.DialogTrigger>
        <Command.Root
          collection={command.collection}
          inputValue={inputValue}
          onInputValueChange={(e) => setSearch(e.inputValue)}
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
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                  </Command.Item>
                ))}
              </Command.ItemGroup>
            ))}
            <Command.Empty>No results found</Command.Empty>
          </Command.List>
          <Command.Footer>
            <HStack gap="1.5">
              <Kbd size="sm" variant="subtle">
                ↑
              </Kbd>
              <Kbd size="sm" variant="subtle">
                ↓
              </Kbd>
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
      </Command.Dialog>

      <HStack mt="4" gap="2" wrap="wrap">
        <Text textStyle="sm" color="fg.muted">
          Try
        </Text>
        {["theme", "project", "settings"].map((term) => (
          <Button
            key={term}
            size="xs"
            variant="subtle"
            onClick={() => setSearch(term)}
          >
            {term}
          </Button>
        ))}
      </HStack>
      <Text mt="2" textStyle="sm" color="fg.muted">
        Query: <Span color="fg">{inputValue || "empty"}</Span>
      </Text>
    </>
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
}

const commands: CommandItem[] = [
  {
    label: "Create new project",
    value: "new-project",
    group: "Projects",
    icon: <LuFolderPlus />,
  },
  {
    label: "Delete project",
    value: "delete-project",
    group: "Projects",
    icon: <LuTrash2 />,
  },
  {
    label: "Invite teammate",
    value: "invite",
    group: "Projects",
    icon: <LuUserPlus />,
  },
  {
    label: "Switch theme",
    value: "theme",
    group: "Preferences",
    icon: <LuSunMoon />,
  },
  {
    label: "Open settings",
    value: "settings",
    group: "Preferences",
    icon: <LuSettings />,
  },
  {
    label: "Sync settings",
    value: "sync-settings",
    group: "Preferences",
    icon: <LuRefreshCw />,
  },
]
