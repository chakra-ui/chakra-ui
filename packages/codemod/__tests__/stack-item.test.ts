import { describe, expect, it } from "vitest"
import transform from "../src/transforms/removed/stack-item"
import { applyTransform } from "./test-utils"

describe("stack-item codemod", () => {
  it("renames StackItem to Box and updates the import", async () => {
    const input = `
import { Stack, StackItem } from '@chakra-ui/react'

function App() {
  return (
    <Stack>
      <StackItem>One</StackItem>
      <StackItem>Two</StackItem>
    </Stack>
  )
}
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Stack, Box } from '@chakra-ui/react'

      function App() {
        return (
          <Stack>
            <Box>One</Box>
            <Box>Two</Box>
          </Stack>
        )
      }
      "
    `)
  })

  it("handles a self-closing StackItem and reuses an existing Box import", async () => {
    const input = `
import { Box, StackItem } from '@chakra-ui/react'

const a = <StackItem />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Box } from '@chakra-ui/react'

      const a = <Box />
      "
    `)
  })

  it("does not touch a non-Chakra StackItem", async () => {
    const input = `
function App() {
  return <StackItem />
}
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "function App() {
        return <StackItem />
      }
      "
    `)
  })
})
