"use client"

import {
  Badge,
  Box,
  Combobox,
  Heading,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

const companies = ["Apple", "Amazon", "Meta", "Netflix", "Google"]

export const ComboboxSelectionBehavior = () => {
  return (
    <Stack gap={8} p={4}>
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

function ComboboxDemo(props: Partial<Combobox.RootProps>) {
  const { selectionBehavior = "replace" } = props
  const [value, setValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const collection = createListCollection({ items: companies })

  return (
    <Box>
      <Stack mb={4}>
        <Heading as="h3">{selectionBehavior} Selection</Heading>
        <Text textStyle="sm" color="gray.600">
          {descriptions[selectionBehavior]}
        </Text>
      </Stack>

      <Combobox.Root
        multiple
        value={value}
        inputValue={inputValue}
        collection={collection}
        selectionBehavior={selectionBehavior}
        onValueChange={(details) => setValue(details.value)}
        onInputValueChange={(details) => setInputValue(details.inputValue)}
      >
        <Combobox.Label>Select Companies</Combobox.Label>

        {selectionBehavior !== "replace" && (
          <Stack direction="row">
            {value.map((company) => (
              <Badge key={company}>{company}</Badge>
            ))}
          </Stack>
        )}

        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger />
          <Combobox.ClearTrigger />
        </Combobox.Control>

        <Combobox.Content>
          {collection.items.map((item) => (
            <Combobox.Item key={item} item={item}>
              {item}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Root>

      <Box mt={2} p={2} bg="gray.50" rounded="sm">
        <Box textStyle="sm">
          <Box>Selected: {value.join(", ") || "none"}</Box>
          <Box>Input Value: {inputValue || "empty"}</Box>
        </Box>
      </Box>
    </Box>
  )
}
