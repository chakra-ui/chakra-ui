/// <reference types="vite/client" />
import { describe, expect, test } from "vitest"
import { upgradeTransforms } from "../src/transforms"
import { applyTransform } from "./test-utils"

type TransformFn = (file: any, api: any, options: any) => string

// Load all transforms via glob - automatically includes new transforms
const transformModules = import.meta.glob<{ default: TransformFn }>(
  "../src/transforms/**/*.ts",
  { eager: true },
)

// Map transform name (e.g. "steps") to module
const transformMap = Object.fromEntries(
  Object.entries(transformModules).map(([path, mod]) => {
    const name = path.split("/").pop()?.replace(/\.ts$/, "") ?? ""
    return [name, (mod as { default?: TransformFn }).default]
  }),
)

function getTransform(name: string): TransformFn | undefined {
  return transformMap[name]
}

async function runAllTransforms(source: string): Promise<string> {
  let result = source
  for (const name of upgradeTransforms) {
    const transform = getTransform(name)
    if (transform) {
      result = (await applyTransform(transform, result)) ?? result
    }
  }
  return result
}

describe("codemod integration", () => {
  test("all transforms load from glob", () => {
    expect(upgradeTransforms.length).toBeGreaterThan(0)
    for (const name of upgradeTransforms) {
      expect(
        getTransform(name),
        `Transform "${name}" should be loadable`,
      ).toBeDefined()
    }
  })

  test("running full upgrade sequence on fixture produces valid output", async () => {
    const input = `
import { Stepper, Step, StepTitle, Box, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Box p={4}>
      <Stepper index={0}>
        <Step>
          <StepTitle>Step 1</StepTitle>
        </Step>
      </Stepper>
      <Button colorScheme="blue">Submit</Button>
    </Box>
  )
}
    `

    const result = await runAllTransforms(input)
    expect(result).toMatchInlineSnapshot(`
      "import { Steps, Box, Button } from '@chakra-ui/react'

      export default function App() {
        return (
          <Box p={4}>
            <Steps.Root step={0}>
              <Steps.List>
                <Steps.Item>
                  <Steps.Title>Step 1</Steps.Title>
                </Steps.Item>
              </Steps.List>
            </Steps.Root>
            <Button colorPalette="blue">Submit</Button>
          </Box>
        )
      }
      "
    `)
  })

  test("ChakraProvider value is never wrapped in String() - system is the engine", async () => {
    const input = `
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div>App</div>
    </ChakraProvider>
  )
}
    `

    const result = await runAllTransforms(input)
    expect(result).toMatchInlineSnapshot(`
      "import { Steps, ChakraProvider, defaultSystem } from '@chakra-ui/react'

      export default function App() {
        return (
          <ChakraProvider value={defaultSystem}>
            <div>App</div>
          </ChakraProvider>
        )
      }
      "
    `)
  })

  test("full upgrade sequence is idempotent", async () => {
    const input = `
import { Stepper, Step, Box, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Stepper index={0}>
        <Step>First</Step>
      </Stepper>
      <Button>Click</Button>
    </Box>
  )
}
    `

    const firstRun = await runAllTransforms(input)
    const secondRun = await runAllTransforms(firstRun)

    expect(secondRun).toBe(firstRun)
  })
})
