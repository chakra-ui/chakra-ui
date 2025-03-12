"use client"

import { Button, Popover, Portal, createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectInPopover = () => {
  return (
    <Popover.Root size="xs">
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          Select in Popover
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>Select in Popover</Popover.Header>
            <Popover.Body>
              <SelectRoot
                collection={frameworks}
                size="sm"
                positioning={{ sameWidth: true, placement: "bottom" }}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent portalled={false} width="full">
                  {frameworks.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
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
