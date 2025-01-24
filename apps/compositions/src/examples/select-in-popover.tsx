"use client"

import { Button, createListCollection } from "@chakra-ui/react"
import {
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectInPopover = () => {
  return (
    <PopoverRoot size="xs">
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Select in Popover
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader>Select in Popover</PopoverHeader>
        <PopoverBody>
          <SelectRoot
            collection={frameworks}
            size="sm"
            positioning={{ sameWidth: true, placement: "bottom" }}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select" />
            </SelectTrigger>
            <SelectContent portalled={false} width="full">
              {frameworks.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
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
