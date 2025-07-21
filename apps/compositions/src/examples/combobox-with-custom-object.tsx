"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithCustomObject = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: countries,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Search Countries</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. United States" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>

            {collection.items.map((item) => (
              <Combobox.Item key={item.code} item={item}>
                {item.country}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const countries = [
  { country: "United States", code: "US", flag: "🇺🇸" },
  { country: "Canada", code: "CA", flag: "🇨🇦" },
  { country: "Australia", code: "AU", flag: "🇦🇺" },
  { country: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { country: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { country: "South Africa", code: "ZA", flag: "🇿🇦" },
  { country: "India", code: "IN", flag: "🇮🇳" },
  { country: "China", code: "CN", flag: "🇨🇳" },
  { country: "Japan", code: "JP", flag: "🇯🇵" },
  { country: "Korea", code: "KR", flag: "🇰🇷" },
  { country: "Vietnam", code: "VN", flag: "🇻🇳" },
  { country: "Thailand", code: "TH", flag: "🇹🇭" },
  { country: "Malaysia", code: "MY", flag: "🇲🇾" },
  { country: "Indonesia", code: "ID", flag: "🇮🇩" },
  { country: "Philippines", code: "PH", flag: "🇵🇭" },
  { country: "Singapore", code: "SG", flag: "🇸🇬" },
  { country: "Hong Kong", code: "HK", flag: "🇭🇰" },
  { country: "Macau", code: "MO", flag: "🇲🇴" },
  { country: "Taiwan", code: "TW", flag: "🇹🇼" },
]
