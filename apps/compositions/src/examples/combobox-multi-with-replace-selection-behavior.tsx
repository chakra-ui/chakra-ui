"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxLabel,
  ComboboxRoot,
} from "compositions/ui/combobox"

const frameworks = ["React", "Solid", "Vue"]

export const ComboboxMultiWithReplaceSelectionBehavior = () => {
  const collection = createListCollection({ items: frameworks })

  return (
    <ComboboxRoot
      multiple
      width="320px"
      collection={collection}
      selectionBehavior="replace"
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
