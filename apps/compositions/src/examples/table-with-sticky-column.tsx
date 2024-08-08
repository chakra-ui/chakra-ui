import { Table } from "@chakra-ui/react"

export const TableWithStickyColumn = () => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" maxW="2xl">
      <Table.Root
        size="sm"
        css={{
          "& [data-sticky]": {
            position: "sticky",
            zIndex: 1,
            bg: "bg",

            _after: {
              content: '""',
              position: "absolute",
              pointerEvents: "none",
              top: "0",
              bottom: "-1px",
              width: "32px",
            },
          },

          "& [data-sticky=end]": {
            _after: {
              insetInlineEnd: "0",
              translate: "100% 0",
              shadow: "inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },

          "& [data-sticky=start]": {
            _after: {
              insetInlineStart: "0",
              translate: "-100% 0",
              shadow: "inset -8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader data-sticky="end" minW="160px" left="0">
              Product
            </Table.ColumnHeader>
            <Table.ColumnHeader minW="400px">Category</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end">
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell data-sticky="end" left="0">
                {item.name}
              </Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
