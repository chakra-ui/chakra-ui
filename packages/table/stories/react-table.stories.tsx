/* eslint-disable react/jsx-key */
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table"
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button"
import { StarIcon } from "@chakra-ui/icons"
import { Table, Tbody, Td, Th, Thead, Tr } from "../src"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    isNumeric: boolean
  }
}

export default {
  title: "Components / Data Display / Table / React Table",
}

type Data = {
  col1: string
  col2: number
}

const data: Data[] = [
  { col1: "Hello", col2: 1.23 },
  { col1: "react-table", col2: 3.14 },
  { col1: "whatever", col2: 100 },
]

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "col1",
    header: "Column 1",
  },
  {
    accessorKey: "col2",
    header: "Column 2",
    meta: { isNumeric: true },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ButtonGroup size="sm" isAttached>
        <Button minW="15ch" justifyContent="flex-start">
          Open {row.original["col1"]}
        </Button>
        <IconButton
          icon={<StarIcon color="yellow.500" />}
          aria-label="Add to favorites"
          variant="outline"
        />
      </ButtonGroup>
    ),
  },
]

export const ReactTable = () => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <Thead>
        {getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody>
        {getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td
                key={cell.id}
                isNumeric={cell.column.columnDef.meta?.isNumeric}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
