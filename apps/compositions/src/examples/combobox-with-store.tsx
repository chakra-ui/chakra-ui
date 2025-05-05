"use client"

import {
  Combobox,
  Portal,
  createListCollection,
  useCombobox,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

const frameworks = ["React", "Solid", "Vue"]

export const ComboboxWithStore = () => {
  const [items, setItems] = useState(frameworks)

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(
      frameworks.filter((item) =>
        item.toLowerCase().includes(details.inputValue.toLowerCase()),
      ),
    )
  }

  const combobox = useCombobox({
    collection,
    onInputValueChange: handleInputChange,
  })

  return (
    <Combobox.RootProvider value={combobox}>
      <Combobox.Label>Select framework</Combobox.Label>
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
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item}>
                  {item}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.RootProvider>
  )
}
