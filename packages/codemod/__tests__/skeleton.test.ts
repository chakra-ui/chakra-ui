import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/skeleton"
import { applyTransform } from "./test-utils"

describe("skeleton transform", () => {
  describe("isLoaded transformation", () => {
    test("transforms isLoaded to loading with inverted boolean", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton isLoaded={true}>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return <Skeleton loading={!true}>Content</Skeleton>
        }
        "
      `)
    })

    test("inverts isLoaded expression", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  const loaded = true
  return <Skeleton isLoaded={loaded}>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          const loaded = true
          return <Skeleton loading={!loaded}>Content</Skeleton>
        }
        "
      `)
    })

    test("handles isLoaded without value (implicit true)", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton isLoaded>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return <Skeleton loading={false}>Content</Skeleton>
        }
        "
      `)
    })
  })

  describe("startColor transformation", () => {
    test("transforms startColor to CSS var", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton startColor='gray.100'>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              css={{
                '--start-color': 'gray.100',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })

    test("merges startColor into existing css prop", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton css={{ padding: '10px' }} startColor='gray.100'>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              css={{
                padding: '10px',
                '--start-color': 'gray.100',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })

    test("handles startColor with expression value", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  const color = 'gray.100'
  return <Skeleton startColor={color}>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          const color = 'gray.100'
          return (
            <Skeleton
              css={{
                '--start-color': color,
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })
  })

  describe("endColor transformation", () => {
    test("transforms endColor to CSS var", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton endColor='gray.300'>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              css={{
                '--end-color': 'gray.300',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })

    test("merges endColor into existing css prop", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton css={{ margin: '5px' }} endColor='gray.300'>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              css={{
                margin: '5px',
                '--end-color': 'gray.300',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("transforms all Skeleton props together", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return (
    <Skeleton isLoaded={false} startColor='gray.100' endColor='gray.300'>
      Content
    </Skeleton>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              loading={!false}
              css={{
                '--start-color': 'gray.100',
                '--end-color': 'gray.300',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })

    test("preserves other props", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return (
    <Skeleton
      isLoaded={false}
      startColor='gray.100'
      height='20px'
      fadeDuration={0.4}
    >
      Content
    </Skeleton>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Skeleton
              loading={!false}
              height="20px"
              fadeDuration={0.4}
              css={{
                '--start-color': 'gray.100',
              }}
            >
              Content
            </Skeleton>
          )
        }
        "
      `)
    })
  })

  describe("multiple Skeleton components", () => {
    test("transforms multiple Skeleton components", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Skeleton isLoaded={false} startColor='gray.100'>Line 1</Skeleton>
      <Skeleton isLoaded={true} endColor='gray.300'>Line 2</Skeleton>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Skeleton
                loading={!false}
                css={{
                  '--start-color': 'gray.100',
                }}
              >
                Line 1
              </Skeleton>
              <Skeleton
                loading={!true}
                css={{
                  '--end-color': 'gray.300',
                }}
              >
                Line 2
              </Skeleton>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Skeleton", async () => {
      const input = `
import { Skeleton } from './custom-skeleton'

export default function App() {
  return <Skeleton isLoaded={false} startColor='gray.100'>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from './custom-skeleton'

        export default function App() {
          return (
            <Skeleton isLoaded={false} startColor="gray.100">
              Content
            </Skeleton>
          )
        }
        "
      `)
    })

    test("handles Skeleton with no props", async () => {
      const input = `
import { Skeleton } from '@chakra-ui/react'

export default function App() {
  return <Skeleton>Content</Skeleton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Skeleton } from '@chakra-ui/react'

        export default function App() {
          return <Skeleton>Content</Skeleton>
        }
        "
      `)
    })
  })
})
