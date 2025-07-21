"use client"

import {
  ColorSwatch,
  Combobox,
  HStack,
  Stack,
  Text,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ComboboxColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null)

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: colors,
    filter: contains,
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
  })

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedColor(details.items[0] || null)
  }

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails,
  ) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      maxW="320px"
      collection={collection}
      placeholder="Color"
      onValueChange={handleValueChange}
      onInputValueChange={handleInputValueChange}
    >
      <Combobox.Label srOnly>Select Color</Combobox.Label>
      <Stack direction="row" align="center" gap={3}>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        {selectedColor && <ColorSwatch value={selectedColor.value} />}
      </Stack>

      <Combobox.Content>
        <Combobox.ItemGroup>
          <Combobox.ItemGroupLabel>Color</Combobox.ItemGroupLabel>
          {collection.items.map((color) => (
            <Combobox.Item item={color} key={color.id}>
              <HStack direction="row" gap={3} align="center">
                <ColorSwatch value={color.value} boxSize="6" />
                <HStack gap="1" flex="1">
                  <Text fontWeight="medium">{color.name}</Text>
                  <Text color="fg.muted" textStyle="sm">
                    {color.value}
                  </Text>
                </HStack>
              </HStack>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Root>
  )
}

interface ColorItem {
  id: string
  name: string
  value: string
}

const colors: ColorItem[] = [
  { id: "red", name: "Red", value: "#EF4444" },
  { id: "blue", name: "Blue", value: "#3B82F6" },
  { id: "green", name: "Green", value: "#10B981" },
  { id: "purple", name: "Purple", value: "#8B5CF6" },
  { id: "yellow", name: "Yellow", value: "#F59E0B" },
  { id: "pink", name: "Pink", value: "#EC4899" },
]
