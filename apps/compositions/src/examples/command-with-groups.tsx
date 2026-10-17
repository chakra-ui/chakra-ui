"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuArchive,
  LuCircleDot,
  LuCopy,
  LuFilePlus,
  LuFolderKanban,
  LuInbox,
  LuLayoutList,
  LuLink,
  LuMoon,
  LuPanelLeft,
  LuSearch,
  LuUserPlus,
} from "react-icons/lu"

export const CommandWithGroups = () => {
  const command = useCommandCollection({
    initialItems: commands,
    groupBy: (item) => item.group,
  })

  return (
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
            <LuSearch /> Search...
          </Button>
        </Command.DialogTrigger>
        <Command.DialogContent>
          <Command.Root>
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
                      {item.shortcut?.map((key) => (
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
      </Command.Dialog>
    </Command.Provider>
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
  shortcut?: string[]
}

const commands: CommandItem[] = [
  {
    label: "Create issue",
    value: "create-issue",
    group: "Issues",
    icon: <LuFilePlus />,
    shortcut: ["C"],
  },
  {
    label: "Change status",
    value: "change-status",
    group: "Issues",
    icon: <LuCircleDot />,
    shortcut: ["S"],
  },
  {
    label: "Assign to...",
    value: "assign",
    group: "Issues",
    icon: <LuUserPlus />,
    shortcut: ["A"],
  },
  {
    label: "Copy issue link",
    value: "copy-link",
    group: "Issues",
    icon: <LuLink />,
    shortcut: ["⌘", "⇧", ","],
  },
  {
    label: "Archive issue",
    value: "archive",
    group: "Issues",
    icon: <LuArchive />,
  },
  {
    label: "Go to inbox",
    value: "inbox",
    group: "Navigation",
    icon: <LuInbox />,
    shortcut: ["G", "I"],
  },
  {
    label: "Go to my issues",
    value: "my-issues",
    group: "Navigation",
    icon: <LuLayoutList />,
    shortcut: ["G", "M"],
  },
  {
    label: "Go to projects",
    value: "projects",
    group: "Navigation",
    icon: <LuFolderKanban />,
    shortcut: ["G", "P"],
  },
  {
    label: "Toggle sidebar",
    value: "sidebar",
    group: "View",
    icon: <LuPanelLeft />,
    shortcut: ["⌘", "B"],
  },
  {
    label: "Duplicate view",
    value: "duplicate-view",
    group: "View",
    icon: <LuCopy />,
  },
  {
    label: "Switch theme",
    value: "theme",
    group: "View",
    icon: <LuMoon />,
    shortcut: ["⌘", "⇧", "L"],
  },
]
