"use client"

import {
  Avatar,
  Badge,
  type BadgeProps,
  Box,
  Button,
  Command,
  DataList,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Stack,
  Status,
  Text,
  useCommandPages,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import {
  LuCheck,
  LuChevronRight,
  LuCircleDashed,
  LuCopy,
  LuFolder,
  LuFolderInput,
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
  LuUsers,
} from "react-icons/lu"

interface Issue {
  status: string
  priority: string
  assignee: string
  labels: string[]
  project: string
}

type Field = keyof Issue

interface IssueCommand extends Command.Item {
  label: string
  value: string
  title?: string
  placeholder?: string
  icon?: React.ReactNode
  shortcut?: string[]
  group?: string
  field?: Field
  option?: string
}

export const CommandNested = () => {
  const [issue, setIssue] = useState<Issue>({
    status: "in-progress",
    priority: "high",
    assignee: "olivia",
    labels: ["bug"],
    project: "auth",
  })

  const command = useCommandPages({
    initialItems: items,
    groupBy: (item) => item.group ?? "",
    deepSearch: true,
  })

  const isSelected = (item: IssueCommand) => {
    if (!item.field || !item.option) return false
    const current = issue[item.field]
    return Array.isArray(current)
      ? current.includes(item.option)
      : current === item.option
  }

  const page = command.page
  const titleOf = (item: IssueCommand) => item.title ?? item.label

  return (
    <Stack gap="6" align="flex-start">
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
              <LuSearch /> Search actions...
            </Button>
          </Command.DialogTrigger>
          <Portal>
            <Command.DialogBackdrop />
            <Command.DialogContent>
              <Command.Root
                onSelect={(e) => {
                  const item = command.collection.find(e.itemValue)
                  if (!item?.field || !item.option) return
                  const { field, option } = item
                  setIssue((prev) => applyOption(prev, field, option))
                }}
              >
                <HStack px="4" pt="3" gap="1" textStyle="xs" color="fg.muted">
                  <Crumb
                    variant="surface"
                    fontFamily="mono"
                    onClick={() => command.setPage(null)}
                  >
                    ENG-142
                  </Crumb>
                  {command.pages.length === 0 && (
                    <Text truncate ms="1">
                      Fix login redirect loop on Safari
                    </Text>
                  )}
                  {command.pages.map((item, index) => {
                    const last = index === command.pages.length - 1
                    return (
                      <Fragment key={item.value}>
                        <LuChevronRight />
                        <Crumb
                          variant={last ? "subtle" : "plain"}
                          onClick={() => command.setPage(item.value)}
                        >
                          {titleOf(item)}
                        </Crumb>
                      </Fragment>
                    )
                  })}
                </HStack>
                <Command.Control>
                  <Command.Indicator />
                  <Command.Input
                    placeholder={
                      page?.placeholder ?? "Type a command or search..."
                    }
                    onKeyDown={command.onInputKeyDown}
                  />
                </Command.Control>
                <Command.List>
                  {command.collection.group().map(([group, groupItems]) => (
                    <Command.ItemGroup key={group}>
                      {group && (
                        <Command.ItemGroupLabel>{group}</Command.ItemGroupLabel>
                      )}
                      {groupItems.map((item) => {
                        const path = command.getPath(item)
                        return (
                          <Command.Item item={item} key={item.value}>
                            {item.icon}
                            {path.length > 0 && (
                              <HStack gap="1" color="fg.muted" flexShrink="0">
                                {path.map((parent) => (
                                  <Fragment key={parent.value}>
                                    {titleOf(parent)}
                                    <LuChevronRight />
                                  </Fragment>
                                ))}
                              </HStack>
                            )}
                            <Command.ItemText highlight>
                              {item.label}
                            </Command.ItemText>
                            {isSelected(item) && (
                              <Box color="fg" ms="auto">
                                <LuCheck />
                              </Box>
                            )}
                            {command.isPage(item) && !item.shortcut && (
                              <Box color="fg.subtle" ms="auto">
                                <LuChevronRight />
                              </Box>
                            )}
                            {item.shortcut?.map((key) => (
                              <Command.ItemCommand key={key}>
                                {key}
                              </Command.ItemCommand>
                            ))}
                          </Command.Item>
                        )
                      })}
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
                    {page?.value === "labels" ? "Toggle" : "Select"}
                  </HStack>
                  <HStack gap="1.5">
                    <Kbd size="sm" variant="subtle">
                      {page ? "⌫" : "esc"}
                    </Kbd>
                    {page ? "Back" : "Close"}
                  </HStack>
                </Command.Footer>
              </Command.Root>
            </Command.DialogContent>
          </Portal>
        </Command.Dialog>
      </Command.Provider>

      <IssueSummary issue={issue} />
    </Stack>
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

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

const applyOption = (issue: Issue, field: Field, option: string): Issue => ({
  ...issue,
  [field]: field === "labels" ? toggle(issue.labels, option) : option,
})

const options = (
  field: Field,
  parent: string,
  list: { label: string; option: string; icon: React.ReactNode }[],
): IssueCommand[] =>
  list.map((item) => ({
    ...item,
    value: `${field}:${item.option}`,
    parent,
    field,
    closeOnSelect: field !== "labels",
  }))

const teams = [
  {
    label: "Engineering",
    value: "eng",
    projects: [
      { label: "Auth revamp", value: "auth" },
      { label: "Billing v2", value: "billing" },
      { label: "Mobile app", value: "mobile" },
    ],
  },
  {
    label: "Design",
    value: "design",
    projects: [
      { label: "Design system", value: "design-system" },
      { label: "Marketing site", value: "marketing" },
    ],
  },
]

const items: IssueCommand[] = [
  {
    label: "Change status...",
    value: "status",
    title: "Status",
    placeholder: "Change status...",
    group: "Change",
    icon: <LuCircleDashed />,
    shortcut: ["S"],
  },
  {
    label: "Change priority...",
    value: "priority",
    title: "Priority",
    placeholder: "Change priority...",
    group: "Change",
    icon: <LuSignalHigh />,
    shortcut: ["P"],
  },
  {
    label: "Assign to...",
    value: "assignee",
    title: "Assignee",
    placeholder: "Assign to...",
    group: "Change",
    icon: <LuUserRound />,
    shortcut: ["A"],
  },
  {
    label: "Add labels...",
    value: "labels",
    title: "Labels",
    placeholder: "Add labels...",
    group: "Change",
    icon: <LuTag />,
    shortcut: ["L"],
  },
  {
    label: "Move to project...",
    value: "project",
    title: "Project",
    placeholder: "Pick a team...",
    group: "Change",
    icon: <LuFolderInput />,
    shortcut: ["⇧", "P"],
  },
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
  ...options("status", "status", [
    { label: "Backlog", option: "backlog", icon: dot("gray") },
    { label: "Todo", option: "todo", icon: dot("blue") },
    { label: "In progress", option: "in-progress", icon: dot("orange") },
    { label: "In review", option: "in-review", icon: dot("purple") },
    { label: "Done", option: "done", icon: dot("green") },
    { label: "Canceled", option: "canceled", icon: dot("red") },
  ]),
  ...options("priority", "priority", [
    { label: "No priority", option: "none", icon: <LuSignal /> },
    { label: "Urgent", option: "urgent", icon: <LuTriangleAlert /> },
    { label: "High", option: "high", icon: <LuSignalHigh /> },
    { label: "Medium", option: "medium", icon: <LuSignalMedium /> },
    { label: "Low", option: "low", icon: <LuSignalLow /> },
  ]),
  ...options("assignee", "assignee", [
    { label: "Unassigned", option: "unassigned", icon: <LuUserRound /> },
    {
      label: "Olivia Martin",
      option: "olivia",
      icon: person("Olivia Martin"),
    },
    { label: "Jackson Lee", option: "jackson", icon: person("Jackson Lee") },
    {
      label: "Isabella Nguyen",
      option: "isabella",
      icon: person("Isabella Nguyen"),
    },
  ]),
  ...options("labels", "labels", [
    { label: "Bug", option: "bug", icon: dot("red") },
    { label: "Feature", option: "feature", icon: dot("purple") },
    { label: "Improvement", option: "improvement", icon: dot("blue") },
    { label: "Design", option: "design", icon: dot("pink") },
    { label: "Documentation", option: "docs", icon: dot("teal") },
  ]),
  ...teams.map((team) => ({
    label: team.label,
    value: `team:${team.value}`,
    parent: "project",
    placeholder: `Move to ${team.label}...`,
    icon: <LuUsers />,
  })),
  ...teams.flatMap((team) =>
    options(
      "project",
      `team:${team.value}`,
      team.projects.map((project) => ({
        label: project.label,
        option: project.value,
        icon: <LuFolder />,
      })),
    ),
  ),
]

const Crumb = (props: BadgeProps & { onClick: VoidFunction }) => {
  const { onClick, children, ...rest } = props
  return (
    <Badge asChild size="sm" cursor="button" {...rest}>
      <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {children}
      </button>
    </Badge>
  )
}

const IssueSummary = (props: { issue: Issue }) => {
  const { issue } = props
  const find = (field: Field, option: string) =>
    items.find((item) => item.field === field && item.option === option)

  const rows = (["status", "priority", "assignee", "project"] as const).map(
    (field) => ({
      field,
      label: items.find((item) => item.value === field)?.title,
      item: find(field, issue[field]),
    }),
  )

  return (
    <DataList.Root orientation="horizontal" size="sm">
      {rows.map(({ field, label, item }) => (
        <DataList.Item key={field}>
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
        <DataList.ItemLabel>Labels</DataList.ItemLabel>
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
