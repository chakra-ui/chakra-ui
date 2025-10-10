import { Table } from "@chakra-ui/react"

export const TableWithNative = () => {
  return (
    <Table.Root size="sm" native>
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: "$999.00" },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: "$49.99" },
  { id: 3, name: "Desk Chair", category: "Furniture", price: "$150.00" },
  { id: 4, name: "Smartphone", category: "Electronics", price: "$799.99" },
  { id: 5, name: "Headphones", category: "Accessories", price: "$199.99" },
]
