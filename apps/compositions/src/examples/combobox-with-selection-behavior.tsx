"use client"

import {
  Code,
  Combobox,
  HStack,
  Portal,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const ComboboxWithSelectionBehavior = () => {
  return (
    <Stack gap="8" maxW="sm">
      <Text textStyle="sm" color="fg.muted">
        Each input starts with <Code>a</Code>. Select an item and compare the
        input and selected values.
      </Text>
      {behaviors.map((behavior) => (
        <ComboboxDemo key={behavior.value} {...behavior} />
      ))}
    </Stack>
  )
}

type SelectionBehavior = NonNullable<
  Combobox.RootProps["selectionBehavior"]
>

interface ComboboxDemoProps {
  value: SelectionBehavior
  label: string
  description: string
}

const ComboboxDemo = (props: ComboboxDemoProps) => {
  const { value, label, description } = props
  const [inputValue, setInputValue] = useState(initialInputValue)
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({
    initialItems: companies,
    filter: contains,
  })

  useEffect(() => {
    filter(initialInputValue)
  }, [filter])

  return (
    <Combobox.Root
      collection={collection}
      selectionBehavior={value}
      inputValue={inputValue}
      onInputValueChange={(details) => {
        setInputValue(details.inputValue)
        filter(details.inputValue)
      }}
      value={selectedValue}
      onValueChange={(details) => setSelectedValue(details.value)}
    >
      <Stack gap="1" mb="2">
        <Combobox.Label>{label}</Combobox.Label>
        <Text textStyle="sm" color="fg.muted">
          {description}
        </Text>
      </Stack>
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
            <Combobox.Empty>No companies found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
      <HStack gap="4" mt="2" textStyle="sm" color="fg.muted">
        <Text>
          Input: <Code>{inputValue || "(empty)"}</Code>
        </Text>
        <Text>
          Selected: <Code>{selectedValue[0] || "(none)"}</Code>
        </Text>
      </HStack>
    </Combobox.Root>
  )
}

const behaviors: ComboboxDemoProps[] = [
  {
    value: "replace",
    label: "Replace (default)",
    description: 'Selecting "Apple" replaces the input value "a" with "Apple".',
  },
  {
    value: "clear",
    label: "Clear",
    description: 'Selecting an item clears the input value "a".',
  },
  {
    value: "preserve",
    label: "Preserve",
    description: 'Selecting an item keeps the input value "a" unchanged.',
  },
]

const initialInputValue = "a"

const companies = [
  { label: "Apple", value: "apple" },
  { label: "Amazon", value: "amazon" },
  { label: "Meta", value: "meta" },
  { label: "Netflix", value: "netflix" },
  { label: "Google", value: "google" },
]
