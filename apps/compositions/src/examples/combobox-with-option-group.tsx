"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithOptionGroup = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
    groupBy: (item) => item.type,
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
            {collection.group().map(([group, items]) => (
              <Combobox.ItemGroup key={group}>
                <Combobox.ItemGroupLabel>{group}</Combobox.ItemGroupLabel>
                <Combobox.ItemGroup>
                  {items.map((item) => (
                    <Combobox.Item item={item} key={item.value}>
                      {item.label}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.ItemGroup>
              </Combobox.ItemGroup>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const frameworks = [
  { label: "React", value: "react", type: "Frontend" },
  { label: "Node.js", value: "nodejs", type: "Backend" },
  { label: "Django", value: "django", type: "Backend" },
  { label: "Vue", value: "vue", type: "Frontend" },
  { label: "Svelte", value: "svelte", type: "Frontend" },
  { label: "Next.js", value: "nextjs", type: "Frontend" },
  { label: "Express", value: "express", type: "Backend" },
  { label: "Ruby on Rails", value: "rails", type: "Backend" },
]
