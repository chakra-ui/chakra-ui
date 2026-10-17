"use client"

import { Command, useCommandCollection } from "@chakra-ui/react"
import {
  LuCalculator,
  LuCalendar,
  LuCreditCard,
  LuSettings,
  LuSmile,
  LuUser,
} from "react-icons/lu"

export const CommandInline = () => {
  const command = useCommandCollection({
    initialItems: commands,
    groupBy: (item) => item.group,
  })

  return (
    <Command.Root
      command={command}
      maxW="sm"
      borderWidth="1px"
      rounded="l3"
      bg="bg.panel"
      shadow="xs"
    >
      <Command.Label srOnly>Search commands</Command.Label>
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
                {item.shortcut?.map((key) => (
                  <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                ))}
              </Command.Item>
            ))}
          </Command.ItemGroup>
        ))}
        <Command.Empty>No results found</Command.Empty>
      </Command.List>
    </Command.Root>
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
    label: "Calendar",
    value: "calendar",
    group: "Suggestions",
    icon: <LuCalendar />,
  },
  {
    label: "Search emoji",
    value: "emoji",
    group: "Suggestions",
    icon: <LuSmile />,
  },
  {
    label: "Calculator",
    value: "calculator",
    group: "Suggestions",
    icon: <LuCalculator />,
  },
  {
    label: "Profile",
    value: "profile",
    group: "Settings",
    icon: <LuUser />,
    shortcut: ["⌘", "P"],
  },
  {
    label: "Billing",
    value: "billing",
    group: "Settings",
    icon: <LuCreditCard />,
    shortcut: ["⌘", "B"],
  },
  {
    label: "Settings",
    value: "settings",
    group: "Settings",
    icon: <LuSettings />,
    shortcut: ["⌘", ","],
  },
]
