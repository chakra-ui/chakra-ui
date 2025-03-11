"use client"

import { Button, Menu, Portal } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

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

const MenuItem = ({ item }: { item: Item }) => {
  if (!item.children) {
    return <Menu.Item value={item.value}>{item.label}</Menu.Item>
  }

  return (
    <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
      <Menu.TriggerItem>
        {item.label} <LuChevronRight />
      </Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {item.children.map((child) => (
              <MenuItem key={child.value} item={child} />
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export const MenuWithSubmenuDynamic = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Nested</Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {items.map((item) => (
              <MenuItem key={item.value} item={item} />
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
