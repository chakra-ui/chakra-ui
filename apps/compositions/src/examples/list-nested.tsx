import { List } from "@chakra-ui/react"

export const ListNested = () => {
  return (
    <List.Root>
      <List.Item>First order item</List.Item>
      <List.Item>First order item</List.Item>
      <List.Item>
        First order item with list
        <List.Root ps="5">
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
        </List.Root>
      </List.Item>
      <List.Item>First order item</List.Item>
    </List.Root>
  )
}
