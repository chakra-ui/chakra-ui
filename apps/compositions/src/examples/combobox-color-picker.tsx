import {
  Box,
  Combobox,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"
import { useMemo, useState } from "react"

interface ColorOption {
  id: string
  name: string
  value: string
}

const colors: ColorOption[] = [
  {
    id: "red",
    name: "Red",
    value: "#EF4444",
  },
  {
    id: "blue",
    name: "Blue",
    value: "#3B82F6",
  },
  {
    id: "green",
    name: "Green",
    value: "#10B981",
  },
  {
    id: "purple",
    name: "Purple",
    value: "#8B5CF6",
  },
  {
    id: "yellow",
    name: "Yellow",
    value: "#F59E0B",
  },
  {
    id: "pink",
    name: "Pink",
    value: "#EC4899",
  },
]

export const ColorPickerCombobox = () => {
  const [items, setItems] = useState(colors)
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)

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
    const color = colors.find((c) => c.id === details.value[0])
    setSelectedColor(color || null)
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
    <Stack gap={6} maxW="320px">
      <ComboboxRoot
        collection={collection}
        placeholder="Choose a color..."
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
      >
        <ComboboxLabel>Select Color</ComboboxLabel>
        <Stack direction="row" align="center" gap={3}>
          {selectedColor && (
            <Box
              boxSize={8}
              rounded="md"
              borderWidth={1}
              backgroundColor={selectedColor.value}
            />
          )}
          <ComboboxInput />
        </Stack>

        <ComboboxContent>
          <ComboboxItemGroup label="Color">
            {collection.items.map((color) => (
              <ComboboxItem item={color} key={color.id}>
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
              </ComboboxItem>
            ))}
          </ComboboxItemGroup>
        </ComboboxContent>
      </ComboboxRoot>
    </Stack>
  )
}
