"use client"

import { Table } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"
import { useState } from "react"

export const TableWithSelection = () => {
  const [selection, setSelection] = useState<string[]>([])

  const indeterminate = selection.length > 0 && selection.length < items.length

  const rows = items.map((item) => (
    <Table.Row
      key={item.name}
      data-selected={selection.includes(item.name) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox
          mt="0.5"
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name),
            )
          }}
        />
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell>${item.price}</Table.Cell>
    </Table.Row>
  ))

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Checkbox
              mt="0.5"
              aria-label="Select all rows"
              checked={indeterminate ? "indeterminate" : selection.length > 0}
              onCheckedChange={(changes) => {
                setSelection(
                  changes.checked ? items.map((item) => item.name) : [],
                )
              }}
            />
          </Table.ColumnHeader>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table.Root>
  )
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
