"use client"

import {
  Combobox,
  Highlight,
  Portal,
  useComboboxContext,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithHighlight = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
    >
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
              <ComboboxItem item={item} key={item.value} />
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

function ComboboxItem(props: { item: { label: string; value: string } }) {
  const { item } = props
  const combobox = useComboboxContext()
  return (
    <Combobox.Item item={item} key={item.value}>
      <Combobox.ItemText>
        <Highlight
          ignoreCase
          query={combobox.inputValue}
          styles={{ bg: "yellow.emphasized", fontWeight: "medium" }}
        >
          {item.label}
        </Highlight>
      </Combobox.ItemText>
    </Combobox.Item>
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
