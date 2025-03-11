"use client"

import { Button, Menu, Portal } from "@chakra-ui/react"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"

export const MenuWithRadioItems = () => {
  const [value, setValue] = useState("asc")
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiSortAscending /> Sort
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={value}
              onValueChange={(e) => setValue(e.value)}
            >
              {items.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const items = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
]
