import { Combobox, Stack, Text, createListCollection } from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"
import { useMemo, useState } from "react"

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

export const ComboboxCustomFilter = () => {
  const [items, setItems] = useState(people)
  const [value, setValue] = useState<string[]>([])

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToString(item) {
          return item.name
        },
        itemToValue(item) {
          return item.id.toString()
        },
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
    <ComboboxRoot
      value={value}
      collection={collection}
      inputBehavior="autocomplete"
      placeholder="Search by name, email, or role..."
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
    >
      <ComboboxLabel>Select Person</ComboboxLabel>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxItemGroup label="People">
          {collection.items.map((person) => (
            <ComboboxItem item={person} key={person.id}>
              <Stack>
                <Text fontWeight="medium">{person.name}</Text>
                <Stack
                  textStyle="sm"
                  direction="row"
                  color="gray.500"
                  justify="space-between"
                >
                  <span>{person.email}</span>
                  <span>{person.role}</span>
                </Stack>
              </Stack>
            </ComboboxItem>
          ))}
          {collection.items.length === 0 && (
            <Text p={2} textStyle="sm" color="gray.500">
              No matches found
            </Text>
          )}
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxRoot>
  )
}
