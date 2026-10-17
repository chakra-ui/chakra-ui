"use client"

import {
  Box,
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Status,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuCheck } from "react-icons/lu"

export const CommandControlled = () => {
  const [status, setStatus] = useState("in-progress")

  const command = useCommandCollection({
    initialItems: statuses,
  })

  const current = statuses.find((item) => item.value === status)

  return (
    <Command.Provider value={command}>
      <Command.Dialog>
        <Command.DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            minW="64"
            justifyContent="flex-start"
          >
            <Status.Root colorPalette={current?.color}>
              <Status.Indicator />
            </Status.Root>
            {current?.label}
          </Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root onSelect={(e) => setStatus(e.itemValue)}>
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Change status..." />
              </Command.Control>
              <Command.List>
                {command.collection.items.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    <Status.Root colorPalette={item.color}>
                      <Status.Indicator />
                    </Status.Root>
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                    {item.value === status && (
                      <Box color="fg" ms="auto">
                        <LuCheck />
                      </Box>
                    )}
                    <Command.ItemCommand>{item.shortcut}</Command.ItemCommand>
                  </Command.Item>
                ))}
                <Command.Empty>No statuses found</Command.Empty>
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
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}

interface StatusItem extends Command.Item {
  label: string
  value: string
  color: string
  shortcut: string
}

const statuses: StatusItem[] = [
  { label: "Backlog", value: "backlog", color: "gray", shortcut: "1" },
  { label: "Todo", value: "todo", color: "blue", shortcut: "2" },
  {
    label: "In progress",
    value: "in-progress",
    color: "orange",
    shortcut: "3",
  },
  { label: "In review", value: "in-review", color: "purple", shortcut: "4" },
  { label: "Done", value: "done", color: "green", shortcut: "5" },
  { label: "Canceled", value: "canceled", color: "red", shortcut: "6" },
]
