"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

export const SelectWithDisabledOption = () => {
  return (
    <Select.Root collection={animals} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select animal</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Animal" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {animals.items.map((animal) => (
              <Select.Item item={animal} key={animal.value}>
                {animal.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const animals = createListCollection({
  items: [
    { label: "Red Panda", value: "red panda" },
    { label: "Cat", value: "cat", disabled: true },
    { label: "Dog", value: "dog" },
    { label: "Aardvark", value: "aardvark", disabled: true },
    { label: "Kangaroo", value: "kangaroo" },
    { label: "Snake", value: "snake" },
  ],
})
