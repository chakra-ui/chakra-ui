"use client"

import {
  Box,
  Button,
  Command,
  EmptyState,
  HStack,
  Kbd,
  VStack,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus, LuSearch, LuTag } from "react-icons/lu"

export const CommandWithEmptyState = () => {
  const [labels, setLabels] = useState<LabelItem[]>(initialLabels)

  const command = useCommandCollection({
    initialItems: labels,
  })

  const createLabel = () => {
    const label = command.query.trim()
    if (!label) return
    setLabels((prev) => [
      ...prev,
      {
        label,
        value: label.toLowerCase().replace(/\s+/g, "-"),
        color: "gray.solid",
      },
    ])
    command.search("")
  }

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
          <LuSearch /> Search labels...
        </Button>
      </Command.DialogTrigger>
      <Command.Root
        collection={command.collection}
        inputValue={command.query}
        onInputValueChange={(e) => command.search(e.inputValue)}
      >
        <Command.Control>
          <Command.Indicator />
          <Command.Input placeholder="Search or create a label..." />
        </Command.Control>
        <Command.List>
          {command.collection.items.map((item) => (
            <Command.Item item={item} key={item.value}>
              <Box boxSize="2.5" rounded="full" bg={item.color} />
              <Command.ItemText highlight>{item.label}</Command.ItemText>
            </Command.Item>
          ))}
          <Command.Empty>
            <EmptyState.Root size="sm">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuTag />
                </EmptyState.Indicator>
                <VStack textAlign="center" gap="1">
                  <EmptyState.Title>No labels found</EmptyState.Title>
                  <EmptyState.Description>
                    {`There's no label matching "${command.query}" yet`}
                  </EmptyState.Description>
                </VStack>
                <Button size="xs" variant="outline" onClick={createLabel}>
                  <LuPlus /> {`Create "${command.query}"`}
                </Button>
              </EmptyState.Content>
            </EmptyState.Root>
          </Command.Empty>
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

interface LabelItem extends Command.Item {
  label: string
  value: string
  color: string
}

const initialLabels: LabelItem[] = [
  { label: "Bug", value: "bug", color: "red.solid" },
  { label: "Feature", value: "feature", color: "purple.solid" },
  { label: "Improvement", value: "improvement", color: "blue.solid" },
  { label: "Documentation", value: "docs", color: "teal.solid" },
  { label: "Design", value: "design", color: "pink.solid" },
  { label: "Performance", value: "performance", color: "orange.solid" },
]
