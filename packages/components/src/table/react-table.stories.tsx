/* eslint-disable react/jsx-key */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table"
import { HiStar } from "react-icons/hi"
import { Table } from "."
import { Button, ButtonGroup, IconButton } from "../button"
import { Icon } from "../icon"

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
      <ButtonGroup size="sm" isAttached>
        <Button minW="15ch" justifyContent="flex-start">
          Open {row.original["col1"]}
        </Button>
        <IconButton
          icon={<Icon as={HiStar} color="yellow.500" />}
          aria-label="Add to favorites"
          variant="outline"
        />
      </ButtonGroup>
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
