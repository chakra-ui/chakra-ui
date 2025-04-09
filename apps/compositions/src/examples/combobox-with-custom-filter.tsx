"use client"

import {
  Combobox,
  Portal,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

export const ComboboxCustomFilter = () => {
  const [items, setItems] = useState(people)
  const [value, setValue] = useState<string[]>([])

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id.toString(),
      }),
    [items],
  )

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    const filteredItems = people.filter((item) => {
      const searchLower = details.inputValue.toLowerCase()
      const nameParts = item.name.toLowerCase().split(" ")
      const emailParts = item.email.toLowerCase().split("@")[0].split(".")

      return (
        item.name.toLowerCase().includes(searchLower) ||
        nameParts.some((part) => part.includes(searchLower)) ||
        emailParts.some((part) => part.includes(searchLower)) ||
        item.role.toLowerCase().includes(searchLower)
      )
    })
    setItems(filteredItems)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const value = details.value

    setValue(value)

    setTimeout(() => {
      setItems(people.filter((p) => p.id.toString() !== value[0]))
    }, 100)
  }

  return (
    <Combobox.Root
      width="320px"
      value={value}
      collection={collection}
      inputBehavior="autocomplete"
      placeholder="Search by name, email, or role..."
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
    >
      <Combobox.Label>Select Person</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger />
        <Combobox.ClearTrigger />
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              {collection.items.map((person) => (
                <Combobox.Item item={person} key={person.id}>
                  <Stack gap={0}>
                    <Text textStyle="sm" fontWeight="medium">
                      {person.name}
                    </Text>
                    <Text textStyle="xs" color="gray.500">
                      {person.email}
                    </Text>
                  </Stack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
              {collection.items.length === 0 && (
                <Text p={2} textStyle="sm" color="gray.500">
                  No matches found
                </Text>
              )}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const people = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Developer" },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Designer",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Manager",
  },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Developer" },
  { id: 5, name: "James Wilson", email: "james@example.com", role: "Designer" },
]
