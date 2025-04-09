"use client"

import {
  Badge,
  Box,
  Combobox,
  Icon,
  Portal,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5"

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
          h={8}
          px={2}
          rounded="md"
          display="flex"
          borderWidth={1}
          width="fit-content"
          alignItems="center"
          position="relative"
          borderStyle="dashed"
        >
          <IoAddCircleOutline /> Status{" "}
          {selectedStatus && (
            <>
              <Text color="gray.100">|</Text> <Badge>{selectedStatus}</Badge>
            </>
          )}
        </Combobox.Trigger>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content px={0} _closed={{ animationDuration: "0s" }}>
            <Box position="relative" borderBottomWidth={1}>
              <Icon
                top="50%"
                left="8px"
                fontSize="20px"
                color="gray.400"
                position="absolute"
                transform="translateY(-50%)"
              >
                <IoSearchOutline />
              </Icon>
              <Combobox.Input
                pl={8}
                border="none"
                outline="none"
                placeholder="Status"
              />
            </Box>
            <Combobox.ItemGroup>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item}>
                  {item}
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
