"use client"

import {
  Box,
  ColorSwatch,
  Combobox,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

export const ComboboxColorPicker = () => {
  const [items, setItems] = useState(colors)
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null)

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToValue: (item) => item.id,
        itemToString: (item) => item.name,
      }),
    [items],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setSelectedColor(details.items[0] || null)
  }

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails,
  ) => {
    setItems(
      colors.filter((item) =>
        item.name.toLowerCase().includes(details.inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <Combobox.Root
      maxW="320px"
      collection={collection}
      placeholder="Color"
      onValueChange={handleValueChange}
      onInputValueChange={handleInputValueChange}
    >
      <Combobox.Label>Select Color</Combobox.Label>
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
              <Stack direction="row" gap={3} align="center">
                <Box
                  boxSize={6}
                  shadow="sm"
                  rounded="md"
                  borderWidth={1}
                  backgroundColor={color.value}
                />
                <Stack gap={1} flex={1} direction="row">
                  <Text fontWeight="medium">{color.name}</Text>
                  <Text color="gray.500" fontSize="sm">
                    {color.value}
                  </Text>
                </Stack>
              </Stack>
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
