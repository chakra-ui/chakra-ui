"use client"

import {
  Badge,
  Box,
  Combobox,
  Portal,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5"

const frameworks = ["Todo", "In Progress", "Done", "Blocked", "Review"]

export const ComboboxWithInputInContent = () => {
  const [items, setItems] = useState(frameworks)
  const [value, setValue] = useState<string[]>([])

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(
      frameworks.filter((item) =>
        item.toLowerCase().includes(details.inputValue.toLowerCase()),
      ),
    )
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setValue(details.value)
  }

  const selectedStatus = collection.find(value[0])

  return (
    <Combobox.Root
      width="200px"
      value={value}
      collection={collection}
      selectionBehavior="clear"
      onValueChange={handleValueChange}
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Select status</Combobox.Label>

      <Combobox.Control>
        <Combobox.Trigger
          h="8"
          px="2"
          rounded="md"
          display="flex"
          borderWidth="1px"
          width="fit-content"
          alignItems="center"
          position="relative"
          borderStyle="dashed"
        >
          <IoAddCircleOutline /> Status{" "}
          {selectedStatus && (
            <>
              <Box color="border">|</Box> <Badge>{selectedStatus}</Badge>
            </>
          )}
        </Combobox.Trigger>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content px={0} _closed={{ animationDuration: "0s" }}>
            <Combobox.Input
              mt="-1"
              px="2"
              border="none"
              outline="none"
              placeholder="Status"
            />
            <Combobox.ItemGroup borderTopWidth="1px">
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
