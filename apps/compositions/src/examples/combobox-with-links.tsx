"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

export const ComboboxWithLinks = () => {
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
      selectionBehavior="clear"
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
              <Combobox.Item asChild item={item} key={item.value}>
                <a href={item.docs}>
                  {item.label} <LuExternalLink size={10} />
                </a>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react", docs: "https://react.dev" },
  { label: "Solid", value: "solid", docs: "https://solidjs.com" },
  { label: "Vue", value: "vue", docs: "https://vuejs.org" },
  { label: "Angular", value: "angular", docs: "https://angular.io" },
  { label: "Svelte", value: "svelte", docs: "https://svelte.dev" },
  { label: "Preact", value: "preact", docs: "https://preactjs.com" },
  { label: "Qwik", value: "qwik", docs: "https://qwik.builder.io" },
  { label: "Lit", value: "lit", docs: "https://lit.dev" },
  { label: "Alpine.js", value: "alpinejs", docs: "https://alpinejs.dev" },
  { label: "Ember", value: "ember", docs: "https://emberjs.com" },
  { label: "Next.js", value: "nextjs", docs: "https://nextjs.org" },
]
