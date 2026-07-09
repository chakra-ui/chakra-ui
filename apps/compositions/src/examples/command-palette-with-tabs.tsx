"use client"

import {
  CommandPalette,
  Span,
  Square,
  Tabs,
  createListCollection,
  useFilter,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import {
  LuCalendar,
  LuFigma,
  LuGitPullRequest,
  LuMessageSquare,
  LuRocket,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu"

export const CommandPaletteWithTabs = () => {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("all")

  const { contains } = useFilter(filterOptions)

  const collection = useMemo(() => {
    const scoped =
      tab === "all" ? items : items.filter((item) => item.category === tab)
    return createListCollection({
      items: scoped.filter((item) => contains(item.label, query)),
    })
  }, [tab, query, contains])

  return (
    <CommandPalette.Root collection={collection} maxW="md">
      <CommandPalette.Control>
        <CommandPalette.Indicator />
        <CommandPalette.Input
          placeholder="Search apps, actions and people..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </CommandPalette.Control>
      <Tabs.Root
        value={tab}
        onValueChange={(e) => setTab(e.value ?? "all")}
        size="sm"
        variant="line"
      >
        <Tabs.List px="3">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="apps">Apps</Tabs.Trigger>
          <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
          <Tabs.Trigger value="people">People</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <CommandPalette.List>
        {collection.items.map((item) => (
          <CommandPalette.Item item={item} key={item.value}>
            <Square size="8" bg="bg.muted" borderRadius="l1">
              {item.icon}
            </Square>
            <CommandPalette.ItemText>
              {item.label}
              <Span display="block" textStyle="xs" color="fg.muted">
                {item.description}
              </Span>
            </CommandPalette.ItemText>
          </CommandPalette.Item>
        ))}
        <CommandPalette.Empty>No results found</CommandPalette.Empty>
      </CommandPalette.List>
    </CommandPalette.Root>
  )
}

const filterOptions = { sensitivity: "base" } as const

const items = [
  {
    label: "Figma",
    value: "figma",
    description: "Open the design workspace",
    category: "apps",
    icon: <LuFigma />,
  },
  {
    label: "Slack",
    value: "slack",
    description: "Jump to the team chat",
    category: "apps",
    icon: <LuMessageSquare />,
  },
  {
    label: "Calendar",
    value: "calendar",
    description: "See today's schedule",
    category: "apps",
    icon: <LuCalendar />,
  },
  {
    label: "Create Pull Request",
    value: "create-pr",
    description: "Open a pull request from the current branch",
    category: "actions",
    icon: <LuGitPullRequest />,
  },
  {
    label: "Deploy to Production",
    value: "deploy",
    description: "Ship the latest build to production",
    category: "actions",
    icon: <LuRocket />,
  },
  {
    label: "Invite Teammate",
    value: "invite",
    description: "Send an invite to join the workspace",
    category: "actions",
    icon: <LuUserPlus />,
  },
  {
    label: "Segun Adebayo",
    value: "segun",
    description: "Design Engineer",
    category: "people",
    icon: <LuUsers />,
  },
  {
    label: "Esther Adebayo",
    value: "esther",
    description: "Product Designer",
    category: "people",
    icon: <LuUsers />,
  },
]
