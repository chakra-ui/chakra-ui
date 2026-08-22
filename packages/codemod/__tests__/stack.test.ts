import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/stack"
import { applyTransform } from "./test-utils"

describe("stack transform", () => {
  describe("spacing prop transformation", () => {
    test("transforms spacing to gap on Stack", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack spacing={4}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack gap={4}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("transforms spacing to gap on VStack", async () => {
      const input = `
import { VStack } from '@chakra-ui/react'

export default function App() {
  return (
    <VStack spacing="20px">
      <div>Item 1</div>
      <div>Item 2</div>
    </VStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { VStack } from '@chakra-ui/react'

        export default function App() {
          return (
            <VStack gap=\"20px\">
              <div>Item 1</div>
              <div>Item 2</div>
            </VStack>
          )
        }
        "
      `)
    })

    test("transforms spacing to gap on HStack", async () => {
      const input = `
import { HStack } from '@chakra-ui/react'

export default function App() {
  return (
    <HStack spacing={8}>
      <div>Item 1</div>
      <div>Item 2</div>
    </HStack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { HStack } from '@chakra-ui/react'

        export default function App() {
          return (
            <HStack gap={8}>
              <div>Item 1</div>
              <div>Item 2</div>
            </HStack>
          )
        }
        "
      `)
    })
  })

  describe("divider/separator transformation", () => {
    test("transforms divider prop to separator on Stack", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack divider={<div />}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack separator={<div />}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("transforms StackDivider to StackSeparator in divider prop", async () => {
      const input = `
import { Stack, StackDivider } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack divider={<StackDivider />}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack separator={<StackSeparator />}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("transforms StackDivider with props to StackSeparator", async () => {
      const input = `
import { Stack, StackDivider } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack divider={<StackDivider borderColor="gray.200" />}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack separator={<StackSeparator borderColor=\"gray.200\" />}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("transforms standalone StackDivider to StackSeparator", async () => {
      const input = `
import { Stack, StackDivider } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack>
      <div>Item 1</div>
      <StackDivider />
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack>
              <div>Item 1</div>
              <StackSeparator />
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("transforms member expression StackDivider", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack>
      <div>Item 1</div>
      <Stack.StackDivider />
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack>
              <div>Item 1</div>
              <StackSeparator />
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("transforms both spacing and divider", async () => {
      const input = `
import { Stack, StackDivider } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack spacing={4} divider={<StackDivider />}>
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack gap={4} separator={<StackSeparator />}>
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("preserves other props", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack spacing={4} direction="column" align="center">
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack gap={4} direction=\"column\" align=\"center\">
              <div>Item 1</div>
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("multiple Stack components", () => {
    test("transforms multiple Stack types", async () => {
      const input = `
import { Stack, VStack, HStack } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Stack spacing={4}>
        <div>Stack Item</div>
      </Stack>
      <VStack spacing={2}>
        <div>VStack Item</div>
      </VStack>
      <HStack spacing={6}>
        <div>HStack Item</div>
      </HStack>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, VStack, HStack } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Stack gap={4}>
                <div>Stack Item</div>
              </Stack>
              <VStack gap={2}>
                <div>VStack Item</div>
              </VStack>
              <HStack gap={6}>
                <div>HStack Item</div>
              </HStack>
            </>
          )
        }
        "
      `)
    })
  })

  describe("import handling", () => {
    test("replaces StackDivider import with StackSeparator", async () => {
      const input = `
import { Stack, StackDivider, Box } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack divider={<StackDivider />}>
      <div>Item</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, Box, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack separator={<StackSeparator />}>
              <div>Item</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("adds StackSeparator import if not present", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack>
      <div>Item 1</div>
      <Stack.StackDivider />
      <div>Item 2</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, StackSeparator } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack>
              <div>Item 1</div>
              <StackSeparator />
              <div>Item 2</div>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Stack", async () => {
      const input = `
import { Stack } from './custom'

export default function App() {
  return (
    <Stack spacing={4}>
      <div>Item</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack } from './custom'

        export default function App() {
          return (
            <Stack spacing={4}>
              <div>Item</div>
            </Stack>
          )
        }
        "
      `)
    })

    test("handles Stack with no props", async () => {
      const input = `
import { Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack>
      <div>Item</div>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack>
              <div>Item</div>
            </Stack>
          )
        }
        "
      `)
    })
  })
})
