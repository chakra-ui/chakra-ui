import { useMemo, useState } from "react"
import { HiCheck } from "react-icons/hi"
import { Button, Menu, chakra } from "../src"

export * from "./menu.stories"

export default {
  title: "Components / Menu",
  decorators: [
    (Story: any) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        <Story />
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorPalette="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content minWidth="240px">
        <Menu.Item value="share">Share...</Menu.Item>
        <Menu.Item value="move">Move...</Menu.Item>
        <Menu.Item value="rename" disabled>
          Rename...
        </Menu.Item>
        <Menu.Item value="dismiss">Delete...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithRadioItems = () => {
  const [value, setValue] = useState("val-1")
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="solid" colorPalette="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.RadioItemGroup
            value={value}
            onValueChange={(e) => setValue(e.value)}
          >
            <Menu.ItemGroupLabel>Order</Menu.ItemGroupLabel>
            <Menu.Separator />
            <Menu.RadioItem value="val-1">
              <Menu.ItemText>Option 1</Menu.ItemText>
              <Menu.ItemIndicator>
                <HiCheck />
              </Menu.ItemIndicator>
            </Menu.RadioItem>
            <Menu.RadioItem value="val-2">
              <Menu.ItemText>Option 2</Menu.ItemText>
              <Menu.ItemIndicator>
                <HiCheck />
              </Menu.ItemIndicator>
            </Menu.RadioItem>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const WithOverflow = () => {
  const items = useMemo(
    () => Array.from({ length: 30 }).map((_, i) => `Option ${i}`),
    [],
  )
  return (
    <Menu.Root>
      <Menu.Trigger>Choose an option</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content maxHeight="15rem" overflowY="auto">
          {items.map((value, i) => (
            <Menu.Item key={i} value={value}>
              {value}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const WithLinkItem = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid">Actions</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        {/* <Menu.Item value="download">Download</Menu.Item>
        <Menu.Item value="copy">Create a Copy</Menu.Item> */}
        <Menu.Item value="link" asChild>
          <a href="#">Attend a Workshop</a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
