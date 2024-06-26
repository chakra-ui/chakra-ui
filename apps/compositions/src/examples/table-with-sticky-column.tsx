import { Table } from "@chakra-ui/react"

export const TableWithStickyColumn = () => {
  return (
    <Table.ScrollArea>
      <Table.Root
        size="sm"
        css={{
          "& :where(thead tr)": {
            position: "sticky",
            top: 0,
            zIndex: 1,
            shadow: "0 0 6px rgba(0,0,0,0.25)",
          },
          "& :where(thead th, td):first-of-type": {
            position: "sticky",
            left: 0,
            zIndex: 1,
            shadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            "&::after": {
              content: '""',
              position: "absolute",
              right: "-6px",
              top: "0",
              bottom: "-1px",
              width: "5px",
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 100%)",
            },
          },
          "& :where(th):first-of-type": {
            zIndex: 2,
          },
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader minW="400px">Product</Table.ColumnHeader>
            <Table.ColumnHeader minW="400px">Category</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end">
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
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
