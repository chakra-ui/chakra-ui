"use client"

import { Combobox, createListCollection } from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"
import { useMemo, useState } from "react"

const frameworks = ["React", "Solid", "Vue"]

export const ComboboxBasic = () => {
  const [items, setItems] = useState(frameworks)

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    setItems(
      frameworks.filter((item) =>
        item.toLowerCase().includes(details.inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <ComboboxRoot
      collection={collection}
      onInputValueChange={handleInputChange}
      width="320px"
    >
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
    </ComboboxRoot>
  )
}
