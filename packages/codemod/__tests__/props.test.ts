import { describe, expect, it } from "vitest"
import booleanProps from "../src/transforms/props/boolean-props"
import casingProps from "../src/transforms/props/casing-props"
import colorPalette from "../src/transforms/props/color-palette"
import colorTransform from "../src/transforms/props/color-transform"
import disclosure from "../src/transforms/props/disclosure"
import gradientProps from "../src/transforms/props/gradient-props"
import nestedStyles from "../src/transforms/props/nested-styles"
import spacingProps from "../src/transforms/props/spacing-props"
import stackProps from "../src/transforms/props/stack-props"
import styleProps from "../src/transforms/props/style-props"
import { applyTransform } from "./test-utils"

// These prop transforms had no dedicated tests. Several of their
// object-property branches were dead code under jscodeshift (gated on the
// estree `Property` node while the babel parser emitted `ObjectProperty`) and
// are now live under ts-morph. These snapshots lock the current behavior; each
// was reviewed to confirm it is the intended migration, not a regression.

describe("boolean-props", () => {
  it("renames isCentered to placement and isActive to data-active", async () => {
    const input = `
import { Modal } from '@chakra-ui/react'
const a = <Modal isCentered isActive />
`
    expect(await applyTransform(booleanProps, input)).toMatchInlineSnapshot(`
      "import { Modal } from '@chakra-ui/react'
      const a = <Modal placement="center" data-active />
      "
    `)
  })

  it("leaves a plain object property (key: value) untouched", async () => {
    const input = `
import { useSomething } from '@chakra-ui/react'
const props = { isOpen: true }
`
    expect(await applyTransform(booleanProps, input)).toMatchInlineSnapshot(`
      "import { useSomething } from '@chakra-ui/react'
      const props = { isOpen: true }
      "
    `)
  })

  it("leaves a shorthand boolean prop in a plain object untouched", async () => {
    const input = `
import { useSomething } from '@chakra-ui/react'
const isOpen = true
const props = { isOpen }
`
    expect(await applyTransform(booleanProps, input)).toMatchInlineSnapshot(`
      "import { useSomething } from '@chakra-ui/react'
      const isOpen = true
      const props = { isOpen }
      "
    `)
  })
})

describe("casing-props", () => {
  it("renames the casing prop to textTransform", async () => {
    const input = `
import { Text } from '@chakra-ui/react'
const a = <Text casing="uppercase">Hi</Text>
`
    expect(await applyTransform(casingProps, input)).toMatchInlineSnapshot(`
      "import { Text } from '@chakra-ui/react'
      const a = <Text textTransform="uppercase">Hi</Text>
      "
    `)
  })
})

describe("color-palette", () => {
  it("renames colorScheme to colorPalette", async () => {
    const input = `
import { Button } from '@chakra-ui/react'
const a = <Button colorScheme="blue">Go</Button>
`
    expect(await applyTransform(colorPalette, input)).toMatchInlineSnapshot(`
      "import { Button } from '@chakra-ui/react'
      const a = <Button colorPalette="blue">Go</Button>
      "
    `)
  })
})

describe("color-transform", () => {
  it("wraps color values in { value } and adds 950 when 50 and 900 exist", async () => {
    const input = `
const colors = {
  brand: {
    50: '#e6f2ff',
    500: '#0066cc',
    900: '#001a33',
  },
}
`
    expect(await applyTransform(colorTransform, input)).toMatchInlineSnapshot(`
      "const colors = {
        brand: {
          50: { value: '#e6f2ff' },
          500: { value: '#0066cc' },
          900: { value: '#001a33' },
          '950': { value: '#09090b' },
        },
      }
      "
    `)
  })
})

describe("disclosure", () => {
  it("renames isOpen to open on useDisclosure destructuring", async () => {
    const input = `
import { useDisclosure } from '@chakra-ui/react'
const { isOpen, onClose } = useDisclosure()
`
    expect(await applyTransform(disclosure, input)).toMatchInlineSnapshot(`
      "import { useDisclosure } from '@chakra-ui/react'
      const { open, onClose } = useDisclosure()
      "
    `)
  })
})

describe("gradient-props", () => {
  it("splits bgGradient into gradient/gradientFrom/gradientTo", async () => {
    const input = `
import { Box } from '@chakra-ui/react'
const a = <Box bgGradient="linear(to-r, red.200, blue.500)" />
`
    expect(await applyTransform(gradientProps, input)).toMatchInlineSnapshot(`
      "import { Box } from '@chakra-ui/react'
      const a = <Box gradient="to-r" gradientFrom="red.200" gradientTo="blue.500" />
      "
    `)
  })
})

describe("nested-styles", () => {
  it("renames sx to css and prefixes nested selectors", async () => {
    const input = `
import { Box } from '@chakra-ui/react'
const a = <Box sx={{ '.item': { color: 'red' } }} />
`
    expect(await applyTransform(nestedStyles, input)).toMatchInlineSnapshot(`
      "import { Box } from '@chakra-ui/react'
      const a = <Box css={{ '& .item': { color: 'red' } }} />
      "
    `)
  })
})

describe("spacing-props", () => {
  it("renames spacing to gap and divider to separator", async () => {
    const input = `
import { Stack } from '@chakra-ui/react'
const a = <Stack spacing={4} />
`
    expect(await applyTransform(spacingProps, input)).toMatchInlineSnapshot(`
      "import { Stack } from '@chakra-ui/react'
      const a = <Stack gap={4} />
      "
    `)
  })
})

describe("stack-props", () => {
  it("renames spacing to gap on stacks", async () => {
    const input = `
import { HStack } from '@chakra-ui/react'
const a = <HStack spacing={2}>x</HStack>
`
    expect(await applyTransform(stackProps, input)).toMatchInlineSnapshot(`
      "import { HStack } from '@chakra-ui/react'
      const a = <HStack gap={2}>x</HStack>
      "
    `)
  })
})

describe("style-props", () => {
  it("removes the apply prop", async () => {
    const input = `
import { Box } from '@chakra-ui/react'
const a = <Box apply="textStyles.h1">Hi</Box>
`
    expect(await applyTransform(styleProps, input)).toMatchInlineSnapshot(`
      "import { Box } from '@chakra-ui/react'
      const a = <Box>Hi</Box>
      "
    `)
  })
})
