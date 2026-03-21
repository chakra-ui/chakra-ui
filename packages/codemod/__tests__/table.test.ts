import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/table"
import { applyTransform } from "./test-utils"

describe("table transform", () => {
  describe("component transformations", () => {
    test("transforms Table to Table.Root", async () => {
      const input = `
import { Table } from '@chakra-ui/react'

export default function App() {
  return <Table>Content</Table>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Table } from '@chakra-ui/react'

        export default function App() {
          return <Table.Root>Content</Table.Root>
        }
        "
      `)
    })

    test("transforms Thead to Table.Header", async () => {
      const input = `
import { Thead } from '@chakra-ui/react'

export default function App() {
  return <Thead>Content</Thead>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Thead } from '@chakra-ui/react'

        export default function App() {
          return <Table.Header>Content</Table.Header>
        }
        "
      `)
    })

    test("transforms Tbody to Table.Body", async () => {
      const input = `
import { Tbody } from '@chakra-ui/react'

export default function App() {
  return <Tbody>Content</Tbody>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tbody } from '@chakra-ui/react'

        export default function App() {
          return <Table.Body>Content</Table.Body>
        }
        "
      `)
    })

    test("transforms Tfoot to Table.Footer", async () => {
      const input = `
import { Tfoot } from '@chakra-ui/react'

export default function App() {
  return <Tfoot>Content</Tfoot>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tfoot } from '@chakra-ui/react'

        export default function App() {
          return <Table.Footer>Content</Table.Footer>
        }
        "
      `)
    })

    test("transforms Tr to Table.Row", async () => {
      const input = `
import { Tr } from '@chakra-ui/react'

export default function App() {
  return <Tr>Content</Tr>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tr } from '@chakra-ui/react'

        export default function App() {
          return <Table.Row>Content</Table.Row>
        }
        "
      `)
    })

    test("transforms Th to Table.ColumnHeader", async () => {
      const input = `
import { Th } from '@chakra-ui/react'

export default function App() {
  return <Th>Header</Th>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Th } from '@chakra-ui/react'

        export default function App() {
          return <Table.ColumnHeader>Header</Table.ColumnHeader>
        }
        "
      `)
    })

    test("transforms Td to Table.Cell", async () => {
      const input = `
import { Td } from '@chakra-ui/react'

export default function App() {
  return <Td>Data</Td>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Td } from '@chakra-ui/react'

        export default function App() {
          return <Table.Cell>Data</Table.Cell>
        }
        "
      `)
    })

    test("transforms TableCaption to Table.Caption", async () => {
      const input = `
import { TableCaption } from '@chakra-ui/react'

export default function App() {
  return <TableCaption>Caption</TableCaption>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { TableCaption } from '@chakra-ui/react'

        export default function App() {
          return <Table.Caption>Caption</Table.Caption>
        }
        "
      `)
    })

    test("transforms TableContainer to Table.ScrollArea", async () => {
      const input = `
import { TableContainer } from '@chakra-ui/react'

export default function App() {
  return <TableContainer>Content</TableContainer>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { TableContainer } from '@chakra-ui/react'

        export default function App() {
          return <Table.ScrollArea>Content</Table.ScrollArea>
        }
        "
      `)
    })
  })

  describe("isNumeric prop transformation", () => {
    test("transforms isNumeric to textAlign='end' on Th", async () => {
      const input = `
import { Th } from '@chakra-ui/react'

export default function App() {
  return <Th isNumeric>Price</Th>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Th } from '@chakra-ui/react'

        export default function App() {
          return <Table.ColumnHeader isNumeric>Price</Table.ColumnHeader>
        }
        "
      `)
    })

    test("transforms isNumeric to textAlign='end' on Td", async () => {
      const input = `
import { Td } from '@chakra-ui/react'

export default function App() {
  return <Td isNumeric>100</Td>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Td } from '@chakra-ui/react'

        export default function App() {
          return <Table.Cell isNumeric>100</Table.Cell>
        }
        "
      `)
    })

    test("transforms isNumeric with boolean value", async () => {
      const input = `
import { Th } from '@chakra-ui/react'

export default function App() {
  return <Th isNumeric={true}>Price</Th>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Th } from '@chakra-ui/react'

        export default function App() {
          return <Table.ColumnHeader isNumeric={true}>Price</Table.ColumnHeader>
        }
        "
      `)
    })

    test("preserves other props with isNumeric", async () => {
      const input = `
import { Td } from '@chakra-ui/react'

export default function App() {
  return <Td isNumeric color="blue.500">100</Td>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Td } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.Cell isNumeric color="blue.500">
              100
            </Table.Cell>
          )
        }
        "
      `)
    })
  })

  describe("complete table transformation", () => {
    test("transforms full table structure", async () => {
      const input = `
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

export default function App() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Item</Td>
          <Td isNumeric>100</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign=\"end\">Price</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Item</Table.Cell>
                  <Table.Cell textAlign=\"end\">100</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          )
        }
        "
      `)
    })

    test("transforms table with caption and footer", async () => {
      const input = `
import { Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'

export default function App() {
  return (
    <Table>
      <TableCaption>Sales Report</TableCaption>
      <Thead>
        <Tr>
          <Th>Product</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Widget</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          Table,
          TableCaption,
          Thead,
          Tbody,
          Tfoot,
          Tr,
          Th,
          Td,
        } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.Root>
              <Table.Caption>Sales Report</Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Widget</Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.ColumnHeader>Total</Table.ColumnHeader>
                </Table.Row>
              </Table.Footer>
            </Table.Root>
          )
        }
        "
      `)
    })

    test("transforms table in TableContainer", async () => {
      const input = `
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

export default function App() {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Header</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Data</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import {
          TableContainer,
          Table,
          Thead,
          Tbody,
          Tr,
          Th,
          Td,
        } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.ScrollArea>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Header</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Data</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          )
        }
        "
      `)
    })
  })

  describe("props preservation", () => {
    test("preserves props on Table.Root", async () => {
      const input = `
import { Table } from '@chakra-ui/react'

export default function App() {
  return <Table variant="striped" colorScheme="teal">Content</Table>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Table } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.Root variant=\"striped\" colorScheme=\"teal\">
              Content
            </Table.Root>
          )
        }
        "
      `)
    })

    test("preserves props on all table components", async () => {
      const input = `
import { Th, Td } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Th color="blue.500" fontSize="lg">Header</Th>
      <Td bg="gray.100" p={4}>Data</Td>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Th, Td } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Table.ColumnHeader color=\"blue.500\" fontSize=\"lg\">
                Header
              </Table.ColumnHeader>
              <Table.Cell bg=\"gray.100\" p={4}>
                Data
              </Table.Cell>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Table", async () => {
      const input = `
import { Table } from './custom'

export default function App() {
  return <Table>Content</Table>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Table } from './custom'

        export default function App() {
          return <Table>Content</Table>
        }
        "
      `)
    })

    test("handles empty table components", async () => {
      const input = `
import { Table, Thead, Tbody } from '@chakra-ui/react'

export default function App() {
  return (
    <Table>
      <Thead />
      <Tbody />
    </Table>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Table, Thead, Tbody } from '@chakra-ui/react'

        export default function App() {
          return (
            <Table.Root>
              <Table.Header />
              <Table.Body />
            </Table.Root>
          )
        }
        "
      `)
    })
  })
})
