import { Table } from "@chakra-ui/react"

export const TableBasicExplorer = () => {
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <Table.Root size="sm">
      <Table.Caption>Product inventory and pricing information</Table.Caption>

      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Stock</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell textAlign="end">${item.price.toFixed(2)}</Table.Cell>
            <Table.Cell textAlign="end">{item.stock}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2} textAlign="end" fontWeight="bold">
            Total
          </Table.Cell>
          <Table.Cell textAlign="end" fontWeight="bold">
            ${total.toFixed(2)}
          </Table.Cell>
          <Table.Cell textAlign="end" fontWeight="bold">
            {items.reduce((sum, item) => sum + item.stock, 0)}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 12 },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49.99,
    stock: 35,
  },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0, stock: 8 },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    price: 799.99,
    stock: 20,
  },
  {
    id: 5,
    name: "Headphones",
    category: "Accessories",
    price: 199.99,
    stock: 50,
  },
]
