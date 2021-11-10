import * as React from "react"
import { Column, useTable } from "react-table"
import { useMemo } from "react"
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button"
import { StarIcon } from "@chakra-ui/icons"
import { Table, TableCellProps, Tbody, Td, Th, Thead, Tr } from "../src"

export default {
  title: "Table / React Table",
}

export const ReactTable = () => {
  const data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: 1.23,
      },
      {
        col1: "react-table",
        col2: 3.14,
      },
      {
        col1: "whatever",
        col2: 100,
      },
    ],
    [],
  )

  type ChakraColumn = Column & TableCellProps
  const columns: ChakraColumn[] = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
        isNumeric: true,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
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
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  isNumeric={(cell.column as ChakraColumn).isNumeric}
                >
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
