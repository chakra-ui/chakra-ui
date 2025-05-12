"use client"

import {
  Badge,
  Combobox,
  For,
  HStack,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ComboboxControlled = () => {
  const [value, setValue] = useState<string[]>([])

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={value}
      onValueChange={(e) => setValue(e.value)}
      width="320px"
    >
      <HStack textStyle="sm" mb="6">
        Selected:
        <HStack>
          <For each={value} fallback="N/A">
            {(v) => <Badge key={v}>{v}</Badge>}
          </For>
        </HStack>
      </HStack>
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]
