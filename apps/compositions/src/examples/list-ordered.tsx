import { List } from "@chakra-ui/react"

export const ListOrdered = () => {
  return (
    <List.Root as="ol">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  )
}
