import { Table } from "@chakra-ui/react"

export const TableWithStickyColumn = () => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root
        size="sm"
        css={{
          "& :where(th):first-of-type": {
            zIndex: 2,
          },

          "& :where(thead tr)": {
            position: "sticky",
            top: 0,
            zIndex: 1,
            shadow: "0 0 6px rgba(0, 0 ,0 , 0.16)",
          },
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader data-sticky minW="400px" left="0">
              Product
            </Table.ColumnHeader>
            <Table.ColumnHeader data-sticky="end" minW="400px" left="400px">
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end">
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell data-sticky left="0">
                {item.name}
              </Table.Cell>
              <Table.Cell data-sticky="end" left="400px">
                {item.category}
              </Table.Cell>
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
