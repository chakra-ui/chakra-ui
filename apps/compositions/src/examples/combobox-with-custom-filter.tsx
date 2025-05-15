"use client"

import {
  Combobox,
  Portal,
  Span,
  Stack,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithCustomFilter = () => {
  const { collection, set } = useListCollection({
    initialItems: people,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  })

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
    set(filteredItems)
  }

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      inputBehavior="autocomplete"
      placeholder="Search by name, email, or role..."
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Select Person</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No matches found</Combobox.Empty>
            {collection.items.map((person) => (
              <Combobox.Item item={person} key={person.id}>
                <Stack gap={0}>
                  <Span textStyle="sm" fontWeight="medium">
                    {person.name}
                  </Span>
                  <Span textStyle="xs" color="fg.muted">
                    {person.email}
                  </Span>
                </Stack>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const people = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Sales Manager",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "UI Designer",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Software Engineer",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "AI Engineer",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james@example.com",
    role: "Chief Executive Officer",
  },
]
