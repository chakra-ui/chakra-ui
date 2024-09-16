"use client"

import { createListCollection } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  PopoverBody,
  PopoverContent,
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
              {frameworks.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
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
