"use client"

import {
  Avatar,
  Badge,
  Box,
  Button,
  Command,
  DataList,
  HStack,
  Kbd,
  Stack,
  Status,
  Text,
  useCommandCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import {
  LuCheck,
  LuCircleDashed,
  LuCopy,
  LuLink,
  LuSearch,
  LuSignal,
  LuSignalHigh,
  LuSignalLow,
  LuSignalMedium,
  LuTag,
  LuTrash2,
  LuTriangleAlert,
  LuUserRound,
} from "react-icons/lu"

type PageKey = "status" | "priority" | "assignee" | "labels"

interface Issue {
  status: string
  priority: string
  assignee: string
  labels: string[]
}

interface CommandItem extends Command.Item {
  label: string
  value: string
  icon?: React.ReactNode
  shortcut?: string[]
  group?: string
}

interface Page {
  label: string
  placeholder: string
  items: CommandItem[]
}

export const CommandNested = () => {
  const [issue, setIssue] = useState<Issue>({
    status: "in-progress",
    priority: "high",
    assignee: "olivia",
    labels: ["bug"],
  })
  const [page, setPage] = useState<PageKey | null>(null)

  const command = useCommandCollection<CommandItem>({
    initialItems: usePageItems(page, setIssue),
    groupBy: (item) => item.group ?? "",
  })

  const openPage = (next: PageKey | null) => {
    command.search("")
    setPage(next)
  }

  const current = page ? pages[page] : null
  const isSelected = (value: string) =>
    page === "labels"
      ? issue.labels.includes(value)
      : page
        ? issue[page] === value
        : false

  return (
    <Stack gap="6" align="flex-start">
      <Command.Dialog
        onEscapeKeyDown={(e) => {
          if (!page) return
          e.preventDefault()
          openPage(null)
        }}
        onExitComplete={() => openPage(null)}
      >
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="flex-start"
            color="fg.muted"
          >
            <LuSearch /> Search actions...
          </Button>
        </Command.DialogTrigger>
        <Command.Root
          key={page ?? "root"}
          autoFocus
          collection={command.collection}
          onInputValueChange={(e) => command.search(e.inputValue)}
          onSelect={(e) => {
            if (!page && isPageKey(e.itemValue)) openPage(e.itemValue)
          }}
        >
          <HStack px="4" pt="3" gap="2" textStyle="xs" color="fg.muted">
            <Badge size="sm" variant="surface" fontFamily="mono">
              ENG-142
            </Badge>
            <Text truncate>Fix login redirect loop on Safari</Text>
          </HStack>
          <Command.Control>
            <Command.Indicator />
            {current && (
              <Badge size="sm" variant="subtle" flexShrink="0">
                {current.label}
              </Badge>
            )}
            <Command.Input
              placeholder={
                current?.placeholder ?? "Type a command or search..."
              }
              onKeyDown={(e) => {
                if (e.key !== "Backspace" || e.currentTarget.value || !page)
                  return
                e.preventDefault()
                openPage(null)
              }}
            />
          </Command.Control>
          <Command.List>
            {command.collection.group().map(([group, items]) => (
              <Command.ItemGroup key={group}>
                {group && (
                  <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
                )}
                {items.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    {item.icon}
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    {isSelected(item.value) && (
                      <Box color="fg" ms="auto">
                        <LuCheck />
                      </Box>
                    )}
                    {item.shortcut?.map((key) => (
                      <Command.ItemCommand key={key}>{key}</Command.ItemCommand>
                    ))}
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
              {page === "labels" ? "Toggle" : "Select"}
            </HStack>
            <HStack gap="1.5">
              <Kbd size="sm" variant="subtle">
                {page ? "⌫" : "esc"}
              </Kbd>
              {page ? "Back" : "Close"}
            </HStack>
          </Command.Footer>
        </Command.Root>
      </Command.Dialog>

      <IssueSummary issue={issue} />
    </Stack>
  )
}

const isPageKey = (value: string): value is PageKey => value in pages

function usePageItems(
  page: PageKey | null,
  setIssue: React.Dispatch<React.SetStateAction<Issue>>,
) {
  const items = useMemo(() => {
    const update = (key: "status" | "priority" | "assignee", value: string) =>
      setIssue((prev) => ({ ...prev, [key]: value }))

    const root: CommandItem[] = [
      ...(["status", "priority", "assignee", "labels"] as const).map((key) => ({
        ...pages[key].entry,
        group: "Change",
        closeOnSelect: false,
      })),
      {
        label: "Copy issue ID",
        value: "copy-id",
        group: "Issue",
        icon: <LuCopy />,
        shortcut: ["⌘", "."],
      },
      {
        label: "Copy issue URL",
        value: "copy-url",
        group: "Issue",
        icon: <LuLink />,
        shortcut: ["⇧", "⌘", ","],
      },
      {
        label: "Delete issue",
        value: "delete",
        group: "Issue",
        icon: <LuTrash2 />,
        shortcut: ["⌘", "⌫"],
      },
    ]

    return {
      root,
      status: pages.status.items.map((item) => ({
        ...item,
        onSelect: () => update("status", item.value),
      })),
      priority: pages.priority.items.map((item) => ({
        ...item,
        onSelect: () => update("priority", item.value),
      })),
      assignee: pages.assignee.items.map((item) => ({
        ...item,
        onSelect: () => update("assignee", item.value),
      })),
      labels: pages.labels.items.map((item) => ({
        ...item,
        closeOnSelect: false,
        onSelect: () =>
          setIssue((prev) => ({
            ...prev,
            labels: prev.labels.includes(item.value)
              ? prev.labels.filter((label) => label !== item.value)
              : [...prev.labels, item.value],
          })),
      })),
    }
  }, [setIssue])

  return items[page ?? "root"]
}

const IssueSummary = (props: { issue: Issue }) => {
  const { issue } = props
  const find = (key: PageKey, value: string) =>
    pages[key].items.find((item) => item.value === value)

  const rows = (["status", "priority", "assignee"] as const).map((key) => ({
    label: pages[key].label,
    item: find(key, issue[key]),
  }))

  return (
    <DataList.Root orientation="horizontal" size="sm">
      {rows.map(({ label, item }) => (
        <DataList.Item key={label}>
          <DataList.ItemLabel>{label}</DataList.ItemLabel>
          <DataList.ItemValue>
            <HStack gap="1.5">
              {item?.icon}
              {item?.label}
            </HStack>
          </DataList.ItemValue>
        </DataList.Item>
      ))}
      <DataList.Item>
        <DataList.ItemLabel>{pages.labels.label}</DataList.ItemLabel>
        <DataList.ItemValue>
          <HStack gap="1.5" wrap="wrap">
            {issue.labels.length === 0 && <Text color="fg.muted">None</Text>}
            {issue.labels.map((value) => {
              const label = find("labels", value)
              return (
                <Badge key={value} variant="outline" size="sm">
                  {label?.icon}
                  {label?.label}
                </Badge>
              )
            })}
          </HStack>
        </DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  )
}

const dot = (color: string) => (
  <Status.Root colorPalette={color} size="sm">
    <Status.Indicator />
  </Status.Root>
)

const person = (name: string) => (
  <Avatar.Root size="2xs">
    <Avatar.Fallback name={name} />
  </Avatar.Root>
)

const pages: Record<PageKey, Page & { entry: CommandItem }> = {
  status: {
    label: "Status",
    placeholder: "Change status...",
    entry: {
      label: "Change status...",
      value: "status",
      icon: <LuCircleDashed />,
      shortcut: ["S"],
    },
    items: [
      { label: "Backlog", value: "backlog", icon: dot("gray") },
      { label: "Todo", value: "todo", icon: dot("blue") },
      { label: "In progress", value: "in-progress", icon: dot("orange") },
      { label: "In review", value: "in-review", icon: dot("purple") },
      { label: "Done", value: "done", icon: dot("green") },
      { label: "Canceled", value: "canceled", icon: dot("red") },
    ],
  },
  priority: {
    label: "Priority",
    placeholder: "Change priority...",
    entry: {
      label: "Change priority...",
      value: "priority",
      icon: <LuSignalHigh />,
      shortcut: ["P"],
    },
    items: [
      { label: "No priority", value: "none", icon: <LuSignal /> },
      { label: "Urgent", value: "urgent", icon: <LuTriangleAlert /> },
      { label: "High", value: "high", icon: <LuSignalHigh /> },
      { label: "Medium", value: "medium", icon: <LuSignalMedium /> },
      { label: "Low", value: "low", icon: <LuSignalLow /> },
    ],
  },
  assignee: {
    label: "Assignee",
    placeholder: "Assign to...",
    entry: {
      label: "Assign to...",
      value: "assignee",
      icon: <LuUserRound />,
      shortcut: ["A"],
    },
    items: [
      { label: "Unassigned", value: "unassigned", icon: <LuUserRound /> },
      {
        label: "Olivia Martin",
        value: "olivia",
        icon: person("Olivia Martin"),
      },
      { label: "Jackson Lee", value: "jackson", icon: person("Jackson Lee") },
      {
        label: "Isabella Nguyen",
        value: "isabella",
        icon: person("Isabella Nguyen"),
      },
      { label: "William Kim", value: "william", icon: person("William Kim") },
    ],
  },
  labels: {
    label: "Labels",
    placeholder: "Add labels...",
    entry: {
      label: "Add labels...",
      value: "labels",
      icon: <LuTag />,
      shortcut: ["L"],
    },
    items: [
      { label: "Bug", value: "bug", icon: dot("red") },
      { label: "Feature", value: "feature", icon: dot("purple") },
      { label: "Improvement", value: "improvement", icon: dot("blue") },
      { label: "Design", value: "design", icon: dot("pink") },
      { label: "Documentation", value: "docs", icon: dot("teal") },
    ],
  },
}
