"use client"

import {
  Combobox,
  ComboboxRootProvider,
  createListCollection,
  useCombobox,
} from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
} from "compositions/ui/combobox"
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

  combobox.multiple = true

  return (
    <ComboboxRootProvider value={combobox}>
      <ComboboxLabel>Select framework</ComboboxLabel>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxItemGroup label={"frameworks"}>
          {collection.items.map((item) => (
            <ComboboxItem item={item} key={item}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxRootProvider>
  )
}
