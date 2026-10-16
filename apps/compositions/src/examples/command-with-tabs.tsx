"use client"

import {
  Box,
  Button,
  Command,
  HStack,
  Kbd,
  Span,
  Tabs,
  useCommandCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import {
  LuCalendar,
  LuFigma,
  LuGitPullRequest,
  LuMessageSquare,
  LuRocket,
  LuSearch,
  LuUserPlus,
  LuUserRound,
} from "react-icons/lu"

export const CommandWithTabs = () => {
  const [tab, setTab] = useState("all")

  const scopedItems = useMemo(
    () =>
      tab === "all" ? items : items.filter((item) => item.category === tab),
    [tab],
  )

  const command = useCommandCollection({ initialItems: scopedItems })

  return (
    <Command.Dialog
      onExitComplete={() => {
        command.search("")
        setTab("all")
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
          <LuSearch /> Search apps, actions and people...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Search apps, actions and people..." />
        </Command.Control>
        <Box px="3" py="2" borderBottomWidth="1px">
          <Tabs.Root
            value={tab}
            onValueChange={(e) => setTab(e.value ?? "all")}
            size="sm"
            variant="subtle"
          >
            <Tabs.List gap="1">
              {tabs.map((item) => (
                <Tabs.Trigger key={item.value} value={item.value}>
                  {item.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </Box>
        <Command.List>
          {command.collection.items.map((item) => (
            <Command.Item item={item} key={item.value}>
              {item.icon}
              <Command.ItemText highlight>{item.label}</Command.ItemText>
              <Span textStyle="xs" color="fg.subtle" truncate>
                {item.description}
              </Span>
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

const tabs = [
  { label: "All", value: "all" },
  { label: "Apps", value: "apps" },
  { label: "Actions", value: "actions" },
  { label: "People", value: "people" },
]

interface SearchItem extends Command.Item {
  label: string
  value: string
  description: string
  category: string
  icon: React.ReactNode
}

const items: SearchItem[] = [
  {
    label: "Figma",
    value: "figma",
    description: "Design workspace",
    category: "apps",
    icon: <LuFigma />,
  },
  {
    label: "Slack",
    value: "slack",
    description: "Team chat",
    category: "apps",
    icon: <LuMessageSquare />,
  },
  {
    label: "Calendar",
    value: "calendar",
    description: "Today's schedule",
    category: "apps",
    icon: <LuCalendar />,
  },
  {
    label: "Create pull request",
    value: "create-pr",
    description: "From current branch",
    category: "actions",
    icon: <LuGitPullRequest />,
    keywords: ["github", "review"],
  },
  {
    label: "Deploy to production",
    value: "deploy",
    description: "Ship the latest build",
    category: "actions",
    icon: <LuRocket />,
    keywords: ["release", "ship"],
  },
  {
    label: "Invite teammate",
    value: "invite",
    description: "Send a workspace invite",
    category: "actions",
    icon: <LuUserPlus />,
    keywords: ["member", "add"],
  },
  {
    label: "Segun Adebayo",
    value: "segun",
    description: "Design engineer",
    category: "people",
    icon: <LuUserRound />,
  },
  {
    label: "Esther Adebayo",
    value: "esther",
    description: "Product designer",
    category: "people",
    icon: <LuUserRound />,
  },
]
