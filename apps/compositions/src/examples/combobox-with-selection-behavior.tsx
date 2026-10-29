"use client"

import {
  Combobox,
  Portal,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithSelectionBehavior = () => {
  return (
    <Stack gap="8" maxW="sm">
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
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({
    initialItems: companies,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      selectionBehavior={value}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Stack gap="1" mb="2">
        <Combobox.Label>{label}</Combobox.Label>
        <Text textStyle="sm" color="fg.muted">
          {description}
        </Text>
      </Stack>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to filter" />
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
    </Combobox.Root>
  )
}

const behaviors: ComboboxDemoProps[] = [
  {
    value: "replace",
    label: "Replace (default)",
    description: "The selected item's label replaces the input value.",
  },
  {
    value: "clear",
    label: "Clear",
    description: "The input value is cleared after an item is selected.",
  },
  {
    value: "preserve",
    label: "Preserve",
    description: "The current input value is kept after an item is selected.",
  },
]

const companies = [
  { label: "Apple", value: "apple" },
  { label: "Amazon", value: "amazon" },
  { label: "Meta", value: "meta" },
  { label: "Netflix", value: "netflix" },
  { label: "Google", value: "google" },
]
