import * as React from "react"
import { testA11y } from "@chakra-ui/test-utils"
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "../src"

describe("<Table />", () => {
  it("should pass a11y test", async () => {
    const simpleTable = (
      <Table>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    )

    await testA11y(simpleTable)
  })
})
