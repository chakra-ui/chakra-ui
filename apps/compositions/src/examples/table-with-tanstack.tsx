"use client"

import { Table } from "@chakra-ui/react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => info.getValue(),
  }),
]

export const TableWithTanstack = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Table.Root size="sm" variant="outline" native>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table.Root>
  )
}

const data: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 50 },
  {
    id: 2,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49.99,
    stock: 120,
  },
  {
    id: 3,
    name: "Desk Chair",
    category: "Furniture",
    price: 150.0,
    stock: 30,
  },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    price: 799.99,
    stock: 75,
  },
  {
    id: 5,
    name: "Headphones",
    category: "Accessories",
    price: 199.99,
    stock: 200,
  },
]
