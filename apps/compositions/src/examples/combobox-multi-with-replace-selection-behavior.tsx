"use client"

import { Combobox, Portal, createListCollection } from "@chakra-ui/react"

const frameworks = ["React", "Solid", "Vue"]

export const ComboboxMultiWithReplaceSelectionBehavior = () => {
  const collection = createListCollection({ items: frameworks })

  return (
    <Combobox.Root
      multiple
      width="320px"
      collection={collection}
      selectionBehavior="replace"
    >
      <Combobox.Label>Select framework</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger />
        <Combobox.ClearTrigger />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item}>
                  {item}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
