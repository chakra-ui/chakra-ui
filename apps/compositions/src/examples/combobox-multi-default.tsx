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
import { useState } from "react"

const frameworks = ["React", "Solid", "Vue"]

export const ComboboxMultiDefault = () => {
  const collection = createListCollection({ items: frameworks })

  const [value, setValue] = useState<string[]>([])

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    setValue(details.value)
  }

  return (
    <>
      <ComboboxRoot
        multiple
        width="320px"
        value={value}
        collection={collection}
        onValueChange={handleValueChange}
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
      {!!value.length && <p>{JSON.stringify(value, undefined, 2)}</p>}
    </>
  )
}
