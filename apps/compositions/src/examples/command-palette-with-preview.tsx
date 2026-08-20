"use client"

import {
  Badge,
  Box,
  Button,
  Center,
  CommandPalette,
  Kbd,
  Portal,
  Progress,
  Span,
  Spinner,
  Switch,
  Tag,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

interface ComponentItem {
  label: string
  value: string
  preview: React.ReactNode
}

export const CommandPaletteWithPreview = () => {
  const [highlighted, setHighlighted] = useState<ComponentItem | null>(
    components[0],
  )

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: components,
    filter: contains,
  })

  return (
    <CommandPalette.Root
      collection={collection}
      hotkeys={[]}
      defaultHighlightedValue={components[0].value}
      onHighlightChange={(e) => setHighlighted(e.highlightedItem)}
      onInputValueChange={(e) => filter(e.inputValue)}
    >
      <CommandPalette.Trigger asChild>
        <Button variant="outline">
          Browse components <Kbd size="sm">⌘K</Kbd>
        </Button>
      </CommandPalette.Trigger>
      <Portal>
        <CommandPalette.Backdrop />
        <CommandPalette.Positioner>
          <CommandPalette.Panel
            maxW="3xl"
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "minmax(0, 1fr) 18rem" }}
          >
            <Box minW="0">
              <CommandPalette.Control>
                <CommandPalette.Indicator />
                <CommandPalette.Input placeholder="Search components..." />
              </CommandPalette.Control>
              <CommandPalette.List>
                {collection.items.map((item) => (
                  <CommandPalette.Item item={item} key={item.value}>
                    <CommandPalette.ItemText>
                      {item.label}
                    </CommandPalette.ItemText>
                  </CommandPalette.Item>
                ))}
                <CommandPalette.Empty>No components found</CommandPalette.Empty>
              </CommandPalette.List>
            </Box>
            <Center
              borderTopWidth={{ base: "1px", md: "0" }}
              borderStartWidth={{ base: "0", md: "1px" }}
              bg="bg.subtle"
              minH={{ base: "36", md: "full" }}
              p="6"
            >
              {highlighted ? (
                highlighted.preview
              ) : (
                <Span textStyle="sm" color="fg.muted">
                  No component selected
                </Span>
              )}
            </Center>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

const components: ComponentItem[] = [
  {
    label: "Button",
    value: "button",
    preview: <Button colorPalette="teal">Click me</Button>,
  },
  {
    label: "Badge",
    value: "badge",
    preview: <Badge colorPalette="green">New feature</Badge>,
  },
  {
    label: "Switch",
    value: "switch",
    preview: (
      <Switch.Root defaultChecked>
        <Switch.HiddenInput />
        <Switch.Control />
      </Switch.Root>
    ),
  },
  {
    label: "Spinner",
    value: "spinner",
    preview: <Spinner color="teal.500" />,
  },
  {
    label: "Tag",
    value: "tag",
    preview: (
      <Tag.Root colorPalette="purple">
        <Tag.Label>Chakra UI</Tag.Label>
      </Tag.Root>
    ),
  },
  {
    label: "Progress",
    value: "progress",
    preview: (
      <Progress.Root value={64} width="40">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    ),
  },
]
