"use client"

import { Button, useCheckboxGroup } from "@chakra-ui/react"
import {
  MenuCheckboxItem,
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { HiCog } from "react-icons/hi"

export const MenuWithCheckboxItems = () => {
  const group = useCheckboxGroup({ defaultValue: ["bar"] })
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          <HiCog /> Features
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup title="Features">
          {items.map(({ title, value }) => (
            <MenuCheckboxItem
              key={value}
              value={value}
              checked={group.isChecked(value)}
              onCheckedChange={() => group.toggleValue(value)}
            >
              {title}
            </MenuCheckboxItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}

const items = [
  { title: "Autosave", value: "autosave" },
  { title: "Detect Language", value: "detect-language" },
  { title: "Spellcheck", value: "spellcheck" },
]
