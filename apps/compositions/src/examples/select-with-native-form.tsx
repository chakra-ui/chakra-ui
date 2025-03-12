"use client"

import { Button, Stack, createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithNativeForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData.get("framework"))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <SelectRoot collection={frameworks} size="sm" name="framework">
          <SelectLabel>Select framework</SelectLabel>
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
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
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
