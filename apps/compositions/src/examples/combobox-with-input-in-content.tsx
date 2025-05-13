"use client"

import {
  Button,
  Combobox,
  Portal,
  Show,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuChevronsUpDown } from "react-icons/lu"

export const ComboboxWithInputInContent = () => {
  const [selected, setSelected] = useState<SelectedState>({
    value: [],
    items: [],
  })

  const { contains } = useFilter({ sensitivity: "base" })

  const { filter, collection } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails<Item>) => {
    setSelected(details)
  }

  return (
    <Combobox.Root
      width="200px"
      collection={collection}
      selectionBehavior="clear"
      inputBehavior="autohighlight"
      onValueChange={handleValueChange}
      onInputValueChange={handleInputChange}
    >
      <Combobox.Control>
        <Combobox.Trigger focusable asChild>
          <Button variant="outline" size="sm" w="full">
            <Span flex="1" textAlign="start">
              <Show when={selected.items.length > 0} fallback="Select status">
                {selected.items.map((item) => item.label).join(", ")}
              </Show>
            </Span>
            <LuChevronsUpDown />
          </Button>
        </Combobox.Trigger>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content px="0">
            <Combobox.Input
              mt="-1"
              minH="8"
              px="3"
              border="none"
              outline="none"
              placeholder="Search status"
            />
            <Combobox.ItemGroup borderTopWidth="1px" pt="1" px="1">
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
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

interface SelectedState {
  value: string[]
  items: Item[]
}

interface Item {
  label: string
  value: string
}

const frameworks = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "Blocked", value: "blocked" },
  { label: "Review", value: "review" },
]
