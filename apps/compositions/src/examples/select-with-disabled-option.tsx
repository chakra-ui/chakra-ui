"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithDisabledOption = () => {
  return (
    <SelectRoot collection={animals} size="sm" width="320px">
      <SelectLabel>Select animal</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Animal" />
      </SelectTrigger>
      <SelectContent>
        {animals.items.map((animal) => (
          <SelectItem item={animal} key={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
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
