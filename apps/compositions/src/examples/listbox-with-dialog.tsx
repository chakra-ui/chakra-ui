"use client"

import {
  Button,
  Dialog,
  HStack,
  Kbd,
  Listbox,
  Portal,
  Span,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ListboxWithDialog = () => {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "Linear.app", value: "linear", type: "applications" },
      { label: "Notion", value: "notion", type: "applications" },
      { label: "Figma", value: "figma", type: "applications" },
      { label: "Slack", value: "slack", type: "applications" },
      { label: "Cursor", value: "cursor", type: "applications" },

      { label: "Open Terminal", value: "terminal", type: "commands" },
      { label: "Search Files", value: "search", type: "commands" },
      { label: "Git Status", value: "git-status", type: "commands" },
      { label: "Run Tests", value: "run-tests", type: "commands" },
      { label: "Deploy App", value: "deploy", type: "commands" },
    ],
    filter: contains,
    groupBy: (item) => item.type,
    groupSort: ["applications", "commands"],
  })

  const handleSelectionChange = (details: any) => {
    setSelectedFrameworks(details.value)
    setIsOpen(false)
    filter("")
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Dialog.Trigger asChild>
          <Button variant="outline">Open Search</Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Listbox.Root
                collection={collection}
                value={selectedFrameworks}
                onValueChange={handleSelectionChange}
                variant="plain"
              >
                <Dialog.Header>
                  <Listbox.Input
                    placeholder="Search for apps or command..."
                    minH="6"
                    outline="0"
                    width="full"
                    onChange={(e) => filter(e.currentTarget.value)}
                    autoHighlight
                  />
                </Dialog.Header>

                <Listbox.Content px="3" maxH="300px">
                  {collection.group().map(([group, items]) => (
                    <Listbox.ItemGroup key={group}>
                      <Listbox.ItemGroupLabel textTransform="capitalize">
                        {group}
                      </Listbox.ItemGroupLabel>
                      {items.map((item) => (
                        <Listbox.Item
                          item={item}
                          key={item.value}
                          justifyContent="space-between"
                        >
                          <Listbox.ItemText>{item.label}</Listbox.ItemText>
                          <Span fontSize="xs" color="fg.muted">
                            {item.type}
                          </Span>
                        </Listbox.Item>
                      ))}
                    </Listbox.ItemGroup>
                  ))}
                </Listbox.Content>

                <Dialog.Footer textStyle="xs" borderTopWidth="1px">
                  <CommandItem label="Press Esc to close" keys={["Esc"]} />
                  <CommandItem label="Open Application" keys={["⏎"]} />
                  <CommandItem label="Actions" keys={["⌘", "K"]} />
                </Dialog.Footer>
              </Listbox.Root>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {selectedFrameworks.length > 0 && (
        <Text mt="3" textStyle="sm">
          Selected: {JSON.stringify(selectedFrameworks, null, 2)}
        </Text>
      )}
    </>
  )
}

const CommandItem = (props: { label: string; keys: string[] }) => {
  return (
    <HStack>
      {props.label} <Kbd size="sm">{props.keys.join(" ")}</Kbd>
    </HStack>
  )
}
