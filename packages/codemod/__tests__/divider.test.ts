import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/divider"
import { applyTransform } from "./test-utils"

describe("divider codemod", () => {
  describe("basic transformations", () => {
    it("should rename Divider to Separator", async () => {
      const input = `
import { Divider } from '@chakra-ui/react'

function App() {
  return <Divider />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        function App() {
          return <Separator />
        }
        "
      `)
    })

    it("should transform Divider with props", async () => {
      const input = `
import { Divider } from '@chakra-ui/react'

function App() {
  return <Divider orientation='vertical' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        function App() {
          return <Separator orientation="vertical" />
        }
        "
      `)
    })

    it("should transform Divider with closing tag", async () => {
      const input = `
import { Divider } from '@chakra-ui/react'

function App() {
  return <Divider></Divider>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        function App() {
          return <Separator></Separator>
        }
        "
      `)
    })

    it("should transform multiple Dividers", async () => {
      const input = `
import { Divider, Box } from '@chakra-ui/react'

function App() {
  return (
    <Box>
      <Divider />
      <div>Content</div>
      <Divider />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Separator } from '@chakra-ui/react'

        function App() {
          return (
            <Box>
              <Separator />
              <div>Content</div>
              <Separator />
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform horizontal divider", async () => {
      const input = `
import { Divider, Stack } from '@chakra-ui/react'

<Stack>
  <div>Section 1</div>
  <Divider />
  <div>Section 2</div>
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, Separator } from '@chakra-ui/react'

        ;<Stack>
          <div>Section 1</div>
          <Separator />
          <div>Section 2</div>
        </Stack>
        "
      `)
    })

    it("should transform vertical divider", async () => {
      const input = `
import { Divider, HStack } from '@chakra-ui/react'

<HStack>
  <div>Left</div>
  <Divider orientation='vertical' height='20px' />
  <div>Right</div>
</HStack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { HStack, Separator } from '@chakra-ui/react'

        ;<HStack>
          <div>Left</div>
          <Separator orientation="vertical" height="20px" />
          <div>Right</div>
        </HStack>
        "
      `)
    })

    it("should transform divider with styling props", async () => {
      const input = `
import { Divider } from '@chakra-ui/react'

<Divider borderColor='gray.300' borderWidth='2px' my={4} />
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        ;<Separator borderColor="gray.300" borderWidth="2px" my={4} />
        "
      `)
    })

    it("should transform divider with variant", async () => {
      const input = `
import { Divider, Stack } from '@chakra-ui/react'

<Stack spacing={4}>
  <Divider variant='solid' />
  <Divider variant='dashed' />
  <Divider variant='dotted' />
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, Separator } from '@chakra-ui/react'

        ;<Stack spacing={4}>
          <Separator variant="solid" />
          <Separator variant="dashed" />
          <Separator variant="dotted" />
        </Stack>
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra Divider", async () => {
      const input = `
function App() {
  return <Divider />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return <Divider />
        }
        "
      `)
    })

    it("should preserve other imports", async () => {
      const input = `
import { Divider, Box, Text } from '@chakra-ui/react'

function App() {
  return (
    <Box>
      <Text>Content</Text>
      <Divider />
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Text, Separator } from '@chakra-ui/react'

        function App() {
          return (
            <Box>
              <Text>Content</Text>
              <Separator />
            </Box>
          )
        }
        "
      `)
    })

    it("should handle Divider with className and id", async () => {
      const input = `
import { Divider } from '@chakra-ui/react'

function App() {
  return <Divider className='my-divider' id='divider-1' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        function App() {
          return <Separator className="my-divider" id="divider-1" />
        }
        "
      `)
    })

    it("should not add Separator import if already present", async () => {
      const input = `
import { Divider, Separator } from '@chakra-ui/react'

function App() {
  return (
    <>
      <Divider />
      <Separator />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Separator } from '@chakra-ui/react'

        function App() {
          return (
            <>
              <Separator />
              <Separator />
            </>
          )
        }
        "
      `)
    })
  })
})
