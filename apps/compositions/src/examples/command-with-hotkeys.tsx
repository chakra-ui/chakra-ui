"use client"

import {
  Button,
  Command,
  HStack,
  Kbd,
  SegmentGroup,
  Stack,
  Text,
  useCommandCollection,
  useFormatHotkey,
  useHotkeyStore,
  useHotkeys,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import {
  LuArchive,
  LuCircleDashed,
  LuClock,
  LuCopy,
  LuInbox,
  LuListTodo,
  LuSearch,
  LuSquarePen,
  LuUserRoundPlus,
} from "react-icons/lu"

type Scope = "inbox" | "issue"

interface HotkeyItem extends Command.Item {
  label: string
  value: string
  group: string
  icon: React.ReactNode
  hotkey: string
  scope?: Scope
}

export const CommandWithHotkeys = () => {
  const [open, setOpen] = useState(false)
  const [scope, setScope] = useState<Scope>("inbox")
  const [lastRun, setLastRun] = useState<string>()

  const store = useHotkeyStore()
  useEffect(() => {
    store.setScope(scope)
  }, [store, scope])

  const run = (item: HotkeyItem, via: string) => {
    setLastRun(`${item.label} (${via})`)
    setOpen(false)
  }

  useHotkeys({
    commands: [
      {
        hotkey: "mod+k",
        label: "Open command menu",
        action: () => setOpen((prev) => !prev),
        options: { enableOnFormTags: true, preventDefault: true },
      },
      ...items.map((item) => ({
        id: item.value,
        hotkey: item.hotkey,
        label: item.label,
        scopes: item.scope ?? "*",
        action: () => run(item, "shortcut"),
        options: { preventDefault: true },
      })),
    ],
  })

  const available = useMemo(
    () => items.filter((item) => !item.scope || item.scope === scope),
    [scope],
  )

  const command = useCommandCollection({
    initialItems: available,
    groupBy: (item) => item.group,
  })

  const formatHotkey = useFormatHotkey()
  const keysOf = (hotkey: string) =>
    hotkey.split(">").flatMap((step) => formatHotkey(step).split(" "))

  return (
    <Stack gap="4" align="flex-start">
      <SegmentGroup.Root
        size="sm"
        value={scope}
        onValueChange={(e) => setScope(e.value as Scope)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={[
            { label: "Inbox view", value: "inbox" },
            { label: "Issue view", value: "issue" },
          ]}
        />
      </SegmentGroup.Root>

      <Command.Dialog
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        onExitComplete={() => command.search("")}
      >
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="space-between"
            color="fg.muted"
          >
            <HStack gap="2">
              <LuSearch /> Search actions...
            </HStack>
            <HStack gap="1">
              {keysOf("mod+k").map((key) => (
                <Kbd key={key} size="sm" variant="subtle">
                  {key}
                </Kbd>
              ))}
            </HStack>
          </Button>
        </Command.DialogTrigger>
        <Command.Root
          collection={command.collection}
          onInputValueChange={(e) => command.search(e.inputValue)}
          onSelect={(e) => {
            const item = command.collection.find(e.itemValue)
            if (item) run(item, "menu")
          }}
        >
          <Command.Control>
            <Command.Indicator />
            <Command.Input placeholder="Type a command or search..." />
          </Command.Control>
          <Command.List>
            {command.collection.group().map(([group, groupItems]) => (
              <Command.ItemGroup key={group}>
                <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
                {groupItems.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    {item.icon}
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    {keysOf(item.hotkey).map((key, index) => (
                      <Command.ItemCommand key={index}>
                        {key}
                      </Command.ItemCommand>
                    ))}
                  </Command.Item>
                ))}
              </Command.ItemGroup>
            ))}
            <Command.Empty>No commands found</Command.Empty>
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
              Run
            </HStack>
            <Text ms="auto">Shortcuts also work with the menu closed</Text>
          </Command.Footer>
        </Command.Root>
      </Command.Dialog>

      <Text textStyle="sm" color="fg.muted">
        {lastRun
          ? `Ran ${lastRun}`
          : "Try G then I, or C, with the menu closed"}
      </Text>
    </Stack>
  )
}

const items: HotkeyItem[] = [
  {
    label: "Create issue",
    value: "create-issue",
    group: "General",
    icon: <LuSquarePen />,
    hotkey: "c",
  },
  {
    label: "Go to inbox",
    value: "go-inbox",
    group: "General",
    icon: <LuInbox />,
    hotkey: "g>i",
  },
  {
    label: "Go to my issues",
    value: "go-my-issues",
    group: "General",
    icon: <LuListTodo />,
    hotkey: "g>m",
  },
  {
    label: "Archive notification",
    value: "archive",
    group: "Inbox",
    icon: <LuArchive />,
    hotkey: "e",
    scope: "inbox",
  },
  {
    label: "Snooze notification",
    value: "snooze",
    group: "Inbox",
    icon: <LuClock />,
    hotkey: "h",
    scope: "inbox",
  },
  {
    label: "Assign to me",
    value: "assign-me",
    group: "Issue",
    icon: <LuUserRoundPlus />,
    hotkey: "i",
    scope: "issue",
  },
  {
    label: "Change status",
    value: "change-status",
    group: "Issue",
    icon: <LuCircleDashed />,
    hotkey: "s",
    scope: "issue",
  },
  {
    label: "Copy issue ID",
    value: "copy-id",
    group: "Issue",
    icon: <LuCopy />,
    hotkey: "mod+.",
    scope: "issue",
  },
]
