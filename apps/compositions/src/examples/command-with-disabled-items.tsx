"use client"

import {
  Badge,
  Button,
  Command,
  HStack,
  Kbd,
  useCommandCollection,
} from "@chakra-ui/react"
import {
  LuFileDown,
  LuFolderPlus,
  LuGlobe,
  LuHistory,
  LuSearch,
  LuSettings,
  LuShieldCheck,
  LuUserPlus,
} from "react-icons/lu"

export const CommandWithDisabledItems = () => {
  const command = useCommandCollection({
    initialItems: commands,
  })

  return (
    <Command.Dialog onExitComplete={() => command.search("")}>
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
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Type a command or search..." />
        </Command.Control>
        <Command.List>
          {command.collection.items.map((item) => (
            <Command.Item item={item} key={item.value}>
              {item.icon}
              <Command.ItemText highlight>{item.label}</Command.ItemText>
              {item.disabled ? (
                <Badge size="xs" variant="subtle" colorPalette="purple">
                  Pro
                </Badge>
              ) : (
                item.shortcut?.map((key) => (
                  <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                ))
              )}
            </Command.Item>
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
  )
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  icon: React.ReactNode
  shortcut?: string[]
}

const commands: CommandItem[] = [
  {
    label: "Create project",
    value: "create-project",
    icon: <LuFolderPlus />,
    shortcut: ["⌘", "N"],
  },
  {
    label: "Invite teammate",
    value: "invite",
    icon: <LuUserPlus />,
    shortcut: ["⌘", "I"],
  },
  {
    label: "Export as PDF",
    value: "export-pdf",
    icon: <LuFileDown />,
    disabled: true,
  },
  {
    label: "Add custom domain",
    value: "domains",
    icon: <LuGlobe />,
    disabled: true,
  },
  {
    label: "View audit log",
    value: "audit-log",
    icon: <LuHistory />,
    disabled: true,
  },
  {
    label: "Configure SSO",
    value: "sso",
    icon: <LuShieldCheck />,
    disabled: true,
  },
  {
    label: "Open settings",
    value: "settings",
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
]
