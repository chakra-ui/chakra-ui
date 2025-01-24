"use client"

import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "compositions/ui/menu"

const Item = (props: { item: Item }) => {
  const { item } = props

  if (item.children) {
    return (
      <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
        <MenuTriggerItem value={item.value}>{item.label}</MenuTriggerItem>
        <MenuContent>
          {item.children.map((item) => (
            <Item key={item.value} item={item} />
          ))}
        </MenuContent>
      </MenuRoot>
    )
  }

  return <MenuItem value={item.value}>{item.label}</MenuItem>
}

export const MenuWithSubmenuDynamic = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">Nested</Button>
      </MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <Item key={item.value} item={item} />
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

interface Item {
  value: string
  label: string
  children?: Item[]
}

const items: Item[] = [
  { value: "new-txt", label: "New Text File" },
  { value: "new-file", label: "New File..." },
  {
    value: "open-recent",
    label: "Open Recent",
    children: [
      { value: "panda", label: "Panda" },
      { value: "ark", label: "Ark UI" },
      {
        value: "chakra",
        label: "Chakra v3",
        children: [
          { value: "chakra-1", label: "Chakra v3.1" },
          { value: "chakra-2", label: "Chakra v3.2" },
        ],
      },
    ],
  },
  { value: "open-file", label: "Open File..." },
  { value: "export", label: "Export" },
]
