import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/progress"
import { applyTransform } from "./test-utils"

describe("progress transform", () => {
  describe("basic transformation", () => {
    test("transforms Progress to compound component structure", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={60} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={60}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("transforms hasStripe to striped", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={60} hasStripe />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={60} striped>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })

    test("transforms isAnimated to animated", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={60} isAnimated />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={60} animated>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })

    test("transforms colorScheme to colorPalette", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={60} colorScheme='green' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={60} colorPalette="green">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })

    test("transforms all props together", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={75} hasStripe isAnimated colorScheme='blue' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={75} striped animated colorPalette="blue">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })
  })

  describe("props preservation", () => {
    test("preserves other props", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress value={60} size='lg' min={0} max={100} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root value={60} size="lg" min={0} max={100}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })

    test("preserves expression values", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  const value = 60
  const isLoading = true
  return <Progress value={value} isAnimated={isLoading} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          const value = 60
          const isLoading = true
          return (
            <Progress.Root value={value} animated={isLoading}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })
  })

  describe("multiple Progress components", () => {
    test("transforms multiple Progress components", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Progress value={30} colorScheme='green' />
      <Progress value={60} hasStripe />
      <Progress value={80} isAnimated />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Progress.Root value={30} colorPalette="green">
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <Progress.Root value={60} striped>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
              <Progress.Root value={80} animated>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Progress", async () => {
      const input = `
import { Progress } from './custom-progress'

export default function App() {
  return <Progress value={60} hasStripe />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from './custom-progress'

        export default function App() {
          return <Progress value={60} hasStripe />
        }
        "
      `)
    })

    test("handles indeterminate progress", async () => {
      const input = `
import { Progress } from '@chakra-ui/react'

export default function App() {
  return <Progress isIndeterminate />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Progress } from '@chakra-ui/react'

        export default function App() {
          return (
            <Progress.Root isIndeterminate>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )
        }
        "
      `)
    })
  })
})
