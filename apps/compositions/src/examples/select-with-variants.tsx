"use client"

import { For, Stack, createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithVariants = () => {
  return (
    <Stack gap="5" width="320px">
      <For each={["outline", "subtle"]}>
        {(variant) => (
          <SelectRoot key={variant} variant={variant} collection={frameworks}>
            <SelectLabel>Select framework - {variant}</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      </For>
    </Stack>
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
