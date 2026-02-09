import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/spinner"
import { applyTransform } from "./test-utils"

describe("spinner transform", () => {
  describe("prop transformations", () => {
    test("transforms thickness to borderWidth", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return <Spinner thickness='4px' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Spinner borderWidth="4px" />
        }
        "
      `)
    })

    test("transforms speed to animationDuration", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return <Spinner speed='0.65s' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Spinner animationDuration="0.65s" />
        }
        "
      `)
    })

    test("transforms both thickness and speed", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return <Spinner thickness='4px' speed='0.65s' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Spinner borderWidth="4px" animationDuration="0.65s" />
        }
        "
      `)
    })

    test("preserves other props", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return <Spinner thickness='4px' size='xl' color='blue.500' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Spinner borderWidth="4px" size="xl" color="blue.500" />
        }
        "
      `)
    })
  })

  describe("multiple spinners", () => {
    test("transforms multiple Spinner components", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Spinner thickness='2px' speed='0.5s' />
      <Spinner thickness='4px' speed='0.8s' />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Spinner borderWidth="2px" animationDuration="0.5s" />
              <Spinner borderWidth="4px" animationDuration="0.8s" />
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Spinner", async () => {
      const input = `
import { Spinner } from './custom-spinner'

export default function App() {
  return <Spinner thickness='4px' speed='0.65s' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from './custom-spinner'

        export default function App() {
          return <Spinner thickness="4px" speed="0.65s" />
        }
        "
      `)
    })

    test("handles Spinner with no props", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  return <Spinner />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          return <Spinner />
        }
        "
      `)
    })

    test("handles expression values", async () => {
      const input = `
import { Spinner } from '@chakra-ui/react'

export default function App() {
  const thickness = '4px'
  const speed = '0.65s'
  return <Spinner thickness={thickness} speed={speed} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Spinner } from '@chakra-ui/react'

        export default function App() {
          const thickness = '4px'
          const speed = '0.65s'
          return <Spinner borderWidth={thickness} animationDuration={speed} />
        }
        "
      `)
    })
  })
})
