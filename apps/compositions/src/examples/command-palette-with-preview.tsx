"use client"

import {
  Badge,
  Button,
  Center,
  CommandPalette,
  HStack,
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
    <HStack
      gap="0"
      align="stretch"
      maxW="2xl"
      borderWidth="1px"
      borderRadius="l3"
      overflow="hidden"
    >
      <CommandPalette.Root
        collection={collection}
        defaultHighlightedValue={components[0].value}
        onHighlightChange={(e) => setHighlighted(e.highlightedItem)}
        onInputValueChange={(e) => filter(e.inputValue)}
      >
        <CommandPalette.Trigger asChild>
          <Button variant="outline">
            Open palette <Kbd size="sm">⌘K</Kbd>
          </Button>
        </CommandPalette.Trigger>
        <Portal>
          <CommandPalette.Backdrop />
          <CommandPalette.Positioner>
            <CommandPalette.Panel>
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
            </CommandPalette.Panel>
          </CommandPalette.Positioner>
        </Portal>
      </CommandPalette.Root>
      <Center flex="1" borderStartWidth="1px" bg="bg.subtle" minH="72">
        {highlighted ? (
          highlighted.preview
        ) : (
          <Span textStyle="sm" color="fg.muted">
            No component selected
          </Span>
        )}
      </Center>
    </HStack>
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
