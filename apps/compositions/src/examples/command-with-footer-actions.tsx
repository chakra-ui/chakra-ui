"use client"

import {
  Box,
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Separator,
  Span,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuCalculator,
  LuClipboardList,
  LuCommand,
  LuFigma,
  LuMessageSquare,
  LuSearch,
  LuSquareCheck,
  LuTextQuote,
} from "react-icons/lu"

export const CommandWithFooterActions = () => {
  const command = useCommandCollection({
    initialItems: apps,
    groupBy: (item) => item.group,
  })

  const [highlighted, setHighlighted] = useState<AppItem | null>(null)

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
            <LuSearch /> Search apps and commands...
          </Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root
              onHighlightChange={(e) =>
                setHighlighted(command.collection.find(e.highlightedValue))
              }
            >
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Search for apps and commands..." />
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
                        <Span textStyle="xs" color="fg.subtle">
                          {item.type}
                        </Span>
                      </Command.Item>
                    ))}
                  </Command.ItemGroup>
                ))}
                <Command.Empty>No results found</Command.Empty>
              </Command.List>
              <Command.Footer>
                <Box color="fg.muted" display="inline-flex">
                  <LuCommand />
                </Box>
                <HStack gap="2" ms="auto" color="fg">
                  <Span fontWeight="medium">
                    {highlighted?.action ?? "Open"}
                  </Span>
                  <Kbd size="sm" variant="subtle">
                    ↵
                  </Kbd>
                </HStack>
                <Separator orientation="vertical" height="4" />
                <HStack gap="2">
                  <Span>Actions</Span>
                  <HStack gap="1">
                    <KbdGroup size="sm" variant="subtle">
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </KbdGroup>
                  </HStack>
                </HStack>
              </Command.Footer>
            </Command.Root>
          </Command.DialogContent>
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}

interface AppItem extends Command.Item {
  label: string
  value: string
  group: string
  type: string
  action: string
  icon: React.ReactNode
}

const apps: AppItem[] = [
  {
    label: "Linear",
    value: "linear",
    group: "Applications",
    type: "Application",
    action: "Open application",
    icon: <LuSquareCheck />,
    keywords: ["issues", "tasks"],
  },
  {
    label: "Figma",
    value: "figma",
    group: "Applications",
    type: "Application",
    action: "Open application",
    icon: <LuFigma />,
    keywords: ["design"],
  },
  {
    label: "Slack",
    value: "slack",
    group: "Applications",
    type: "Application",
    action: "Open application",
    icon: <LuMessageSquare />,
    keywords: ["chat", "messages"],
  },
  {
    label: "Clipboard history",
    value: "clipboard",
    group: "Commands",
    type: "Command",
    action: "Run command",
    icon: <LuClipboardList />,
    keywords: ["paste", "copy"],
  },
  {
    label: "Search snippets",
    value: "snippets",
    group: "Commands",
    type: "Command",
    action: "Run command",
    icon: <LuTextQuote />,
    keywords: ["text", "templates"],
  },
  {
    label: "Calculator",
    value: "calculator",
    group: "Commands",
    type: "Command",
    action: "Run command",
    icon: <LuCalculator />,
    keywords: ["math", "convert"],
  },
]
