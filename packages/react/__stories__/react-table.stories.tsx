/* eslint-disable react/jsx-key */
import {
  type ColumnDef,
  type RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { HiStar } from "react-icons/hi"
import { Group } from "../src"
import { Button, IconButton } from "../src/components/button"
import { Icon } from "../src/components/icon"
import { Table } from "../src/components/table"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    numeric: boolean
  }
}

export default {
  title: "Data Display / Table",
}

interface Data {
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
    meta: { numeric: true },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Group attached>
        <Button size="sm" minW="15ch" justifyContent="flex-start">
          Open {row.original["col1"]}
        </Button>
        <IconButton
          size="sm"
          icon={<Icon as={HiStar} color="yellow.500" />}
          aria-label="Add to favorites"
          variant="outline"
        />
      </Group>
    ),
  },
]

export const WithReactTable = () => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table.Root>
      <Table.Header>
        {getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeader key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                numeric={cell.column.columnDef.meta?.numeric}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
