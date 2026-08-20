"use client"

import { Button, Table } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu"

type Product = {
  id: number
  name: string
  category: string
  price: number
}

type SortKey = "name" | "category" | "price"
type SortDirection = "asc" | "desc"

type SortState = {
  key: SortKey
  direction: SortDirection
} | null

type SortableColumnHeaderProps = {
  label: string
  sortKey: SortKey
  sort: SortState
  onSort: (key: SortKey) => void
  textAlign?: "start" | "end"
}

const SortIndicator = ({ direction }: { direction?: SortDirection }) => {
  if (direction === "asc") {
    return <LuArrowUp aria-hidden="true" />
  }

  if (direction === "desc") {
    return <LuArrowDown aria-hidden="true" />
  }

  return <LuArrowUpDown aria-hidden="true" />
}

const SortableColumnHeader = ({
  label,
  sortKey,
  sort,
  onSort,
  textAlign = "start",
}: SortableColumnHeaderProps) => {
  const direction = sort?.key === sortKey ? sort.direction : undefined

  const ariaSort: "ascending" | "descending" | undefined =
    direction === "asc"
      ? "ascending"
      : direction === "desc"
        ? "descending"
        : undefined

  return (
    <Table.ColumnHeader textAlign={textAlign} aria-sort={ariaSort}>
      <Button
        variant="plain"
        size="sm"
        p="0"
        minW="0"
        h="auto"
        w="full"
        justifyContent={textAlign === "end" ? "flex-end" : "flex-start"}
        fontWeight="medium"
        onClick={() => onSort(sortKey)}
      >
        {label}
        <SortIndicator direction={direction} />
      </Button>
    </Table.ColumnHeader>
  )
}

export const TableWithSorting = () => {
  const [sort, setSort] = useState<SortState>(null)

  const handleSort = (key: SortKey) => {
    setSort((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" }
      }

      if (current.direction === "asc") {
        return { key, direction: "desc" }
      }

      return null
    })
  }

  const sortedItems = useMemo(() => {
    if (!sort) return items

    return [...items].sort((a, b) => {
      const aValue = a[sort.key]
      const bValue = b[sort.key]

      const comparison =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue))

      return sort.direction === "asc" ? comparison : -comparison
    })
  }, [sort])

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <SortableColumnHeader
            label="Product"
            sortKey="name"
            sort={sort}
            onSort={handleSort}
          />
          <SortableColumnHeader
            label="Category"
            sortKey="category"
            sort={sort}
            onSort={handleSort}
          />
          <SortableColumnHeader
            label="Price"
            sortKey="price"
            sort={sort}
            onSort={handleSort}
            textAlign="end"
          />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sortedItems.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell textAlign="end">${item.price.toFixed(2)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const items: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
