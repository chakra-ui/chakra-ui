"use client"

import {
  Box,
  Combobox,
  Heading,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithSelectionBehavior = () => {
  return (
    <Stack gap="8" p="4">
      <ComboboxDemo selectionBehavior="replace" />
      <ComboboxDemo selectionBehavior="clear" />
      <ComboboxDemo selectionBehavior="preserve" />
    </Stack>
  )
}

const descriptions = {
  replace: "Selected item replaces the input value",
  clear: "Input value is cleared after selection",
  preserve: "Input value is preserved after selection",
}

const ComboboxDemo = (props: Partial<Combobox.RootProps>) => {
  const { selectionBehavior = "replace" } = props

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: companies,
    filter: contains,
  })

  return (
    <Box>
      <Stack mb={4}>
        <Heading as="h3">{selectionBehavior} Selection</Heading>
        <Text textStyle="sm" color="gray.600">
          {descriptions[selectionBehavior]}
        </Text>
      </Stack>

      <Combobox.Root
        collection={collection}
        selectionBehavior={selectionBehavior}
        onInputValueChange={(details) => filter(details.inputValue)}
      >
        <Combobox.Label>Select Companies</Combobox.Label>

        <Combobox.Control>
          <Combobox.Input />
        </Combobox.Control>

        <Combobox.Content>
          {collection.items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Root>
    </Box>
  )
}

const companies = [
  { label: "Apple", value: "apple" },
  { label: "Amazon", value: "amazon" },
  { label: "Meta", value: "meta" },
  { label: "Netflix", value: "netflix" },
  { label: "Google", value: "google" },
]
