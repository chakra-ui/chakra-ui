"use client"

import { createListCollection } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithInvalid = () => {
  return (
    <Field invalid errorText="This is an error">
      <SelectRoot collection={frameworks} size="sm" width="320px">
        <SelectLabel>Select framework</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select movie" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((movie) => (
            <SelectItem item={movie} key={movie.value}>
              {movie.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
