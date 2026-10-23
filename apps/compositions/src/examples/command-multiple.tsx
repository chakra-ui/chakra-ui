"use client"

import {
  Badge,
  Box,
  Button,
  Command,
  HStack,
  Kbd,
  KbdGroup,
  Portal,
  Text,
  Wrap,
  useCommandCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuAccessibility,
  LuBookOpen,
  LuBug,
  LuCheck,
  LuGauge,
  LuPalette,
  LuSparkles,
  LuSprout,
  LuTag,
  LuTriangleAlert,
} from "react-icons/lu"

export const CommandMultiple = () => {
  const [value, setValue] = useState<string[]>(["bug", "a11y"])

  const command = useCommandCollection({
    initialItems: labels,
  })

  const selected = labels.filter((item) => value.includes(item.value))

  return (
    <>
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
              <LuTag /> Add labels...
            </Button>
          </Command.DialogTrigger>
          <Portal>
            <Command.DialogBackdrop />
            <Command.DialogContent>
              <Command.Root
                closeOnSelect={false}
                onSelect={(e) =>
                  setValue((prev) =>
                    prev.includes(e.itemValue)
                      ? prev.filter((v) => v !== e.itemValue)
                      : [...prev, e.itemValue],
                  )
                }
              >
                <Command.Control>
                  <Command.Indicator />
                  <Command.Input placeholder="Search labels..." />
                </Command.Control>
                <Command.List>
                  {command.collection.items.map((item) => (
                    <Command.Item item={item} key={item.value}>
                      {item.icon}
                      <Command.ItemText highlight>
                        {item.label}
                      </Command.ItemText>
                      {value.includes(item.value) && (
                        <Box color="fg" ms="auto">
                          <LuCheck />
                        </Box>
                      )}
                    </Command.Item>
                  ))}
                  <Command.Empty>No labels found</Command.Empty>
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
                    Toggle
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

      {selected.length > 0 ? (
        <Wrap mt="4" gap="1.5">
          {selected.map((item) => (
            <Badge key={item.value} variant="surface" size="md">
              {item.icon}
              {item.label}
            </Badge>
          ))}
        </Wrap>
      ) : (
        <Text mt="4" textStyle="sm" color="fg.muted">
          No labels selected
        </Text>
      )}
    </>
  )
}

interface LabelItem extends Command.Item {
  label: string
  value: string
  icon: React.ReactNode
}

const labels: LabelItem[] = [
  { label: "Bug", value: "bug", icon: <LuBug /> },
  { label: "Feature", value: "feature", icon: <LuSparkles /> },
  { label: "Documentation", value: "docs", icon: <LuBookOpen /> },
  { label: "Design", value: "design", icon: <LuPalette /> },
  { label: "Performance", value: "performance", icon: <LuGauge /> },
  { label: "Accessibility", value: "a11y", icon: <LuAccessibility /> },
  { label: "Breaking change", value: "breaking", icon: <LuTriangleAlert /> },
  { label: "Good first issue", value: "good-first-issue", icon: <LuSprout /> },
]
