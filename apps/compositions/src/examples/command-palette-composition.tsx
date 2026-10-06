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
import type { ReactNode } from "react"
import {
  LuArrowUpRight,
  LuBell,
  LuCircleDot,
  LuGitPullRequest,
  LuInbox,
  LuLayoutDashboard,
  LuPlus,
  LuSettings,
  LuUserPlus,
} from "react-icons/lu"

export const CommandPaletteComposition = () => {
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection<Command>({
    initialItems: commands,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
    groupBy: (item) => item.group,
    filter: (itemText, query, item) =>
      [itemText, ...item.keywords].some((term) => contains(term, query)),
  })

  return (
    <CommandPalette.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline" size="sm">
          <LuCircleDot />
          Command menu
          <Kbd size="sm" ms="2">
            ⌘K
          </Kbd>
        </Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel>
            <CommandPalette.Control>
              <CommandPalette.Indicator />
              <CommandPalette.Input placeholder="Search issues, actions, and settings..." />
            </CommandPalette.Control>
            <CommandPalette.List>
              {collection.group().map(([group, items], index) => (
                <CommandPalette.ItemGroup key={group}>
                  {index > 0 && <CommandPalette.Separator />}
                  <CommandPalette.ItemGroupLabel>
                    {group}
                  </CommandPalette.ItemGroupLabel>
                  {items.map((item) => (
                    <CommandPalette.Item item={item} key={item.value}>
                      <Span color="fg.muted" fontSize="md">
                        {item.icon}
                      </Span>
                      <CommandPalette.ItemText>
                        {item.label}
                      </CommandPalette.ItemText>
                      {item.shortcut && (
                        <CommandPalette.ItemCommand>
                          {item.shortcut}
                        </CommandPalette.ItemCommand>
                      )}
                    </CommandPalette.Item>
                  ))}
                </CommandPalette.ItemGroup>
              ))}
              <CommandPalette.Empty>No results found</CommandPalette.Empty>
            </CommandPalette.List>
            <CommandPalette.Footer>
              <Text color="fg.muted" textStyle="xs">
                <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to navigate
              </Text>
              <Text color="fg.muted" textStyle="xs">
                <Kbd size="sm">⏎</Kbd> to select
              </Text>
              <Text color="fg.muted" textStyle="xs" ms="auto">
                <Kbd size="sm">Esc</Kbd> to close
              </Text>
            </CommandPalette.Footer>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

interface Command {
  label: string
  value: string
  group: string
  icon: ReactNode
  keywords: string[]
  shortcut?: string
}

const commands: Command[] = [
  {
    label: "Go to Inbox",
    value: "inbox",
    group: "Navigation",
    icon: <LuInbox />,
    keywords: ["notifications", "unread"],
    shortcut: "G I",
  },
  {
    label: "Go to Dashboard",
    value: "dashboard",
    group: "Navigation",
    icon: <LuLayoutDashboard />,
    keywords: ["home", "overview"],
    shortcut: "G D",
  },
  {
    label: "View pull requests",
    value: "pull-requests",
    group: "Navigation",
    icon: <LuGitPullRequest />,
    keywords: ["pr", "reviews", "merge"],
    shortcut: "G P",
  },
  {
    label: "Create new issue",
    value: "new-issue",
    group: "Actions",
    icon: <LuPlus />,
    keywords: ["add", "ticket", "task"],
    shortcut: "C",
  },
  {
    label: "Assign to me",
    value: "assign-me",
    group: "Actions",
    icon: <LuUserPlus />,
    keywords: ["owner", "self"],
    shortcut: "I",
  },
  {
    label: "Open in new tab",
    value: "open-tab",
    group: "Actions",
    icon: <LuArrowUpRight />,
    keywords: ["external", "window"],
  },
  {
    label: "Notification preferences",
    value: "notifications",
    group: "Settings",
    icon: <LuBell />,
    keywords: ["alerts", "email"],
  },
  {
    label: "Workspace settings",
    value: "settings",
    group: "Settings",
    icon: <LuSettings />,
    keywords: ["preferences", "config", "account"],
    shortcut: "⌘,",
  },
]
