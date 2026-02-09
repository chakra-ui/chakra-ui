import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/collapsible"
import { applyTransform } from "./test-utils"

describe("collapsible transform", () => {
  describe("basic transformation", () => {
    test("transforms Collapse to Collapsible.Root > Collapsible.Content", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return <Collapse>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })

    test("transforms Collapse with children", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return (
    <Collapse>
      <div>Line 1</div>
      <div>Line 2</div>
    </Collapse>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root>
              <Collapsible.Content>
                <div>Line 1</div>
                <div>Line 2</div>
              </Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("transforms in prop to open", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return <Collapse in={true}>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root open={true}>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })

    test("transforms in prop with expression", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  const isOpen = true
  return <Collapse in={isOpen}>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          const isOpen = true
          return (
            <Collapsible.Root open={isOpen}>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })

    test("removes animateOpacity prop", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return <Collapse animateOpacity>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })

    test("removes animateOpacity prop with value", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return <Collapse animateOpacity={true}>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("transforms multiple props together", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  const isOpen = true
  return (
    <Collapse in={isOpen} animateOpacity startingHeight={0} endingHeight='auto'>
      <div>Content</div>
    </Collapse>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          const isOpen = true
          return (
            <Collapsible.Root open={isOpen} startingHeight={0} endingHeight=\"auto\">
              <Collapsible.Content>
                <div>Content</div>
              </Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })

    test("preserves other props", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return (
    <Collapse in={true} startingHeight={20} unmountOnExit>
      Content
    </Collapse>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root open={true} startingHeight={20} unmountOnExit>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })
  })

  describe("multiple Collapse components", () => {
    test("transforms multiple Collapse components", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Collapse in={true}>Section 1</Collapse>
      <Collapse in={false}>Section 2</Collapse>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Collapsible.Root open={true}>
                <Collapsible.Content>Section 1</Collapsible.Content>
              </Collapsible.Root>
              <Collapsible.Root open={false}>
                <Collapsible.Content>Section 2</Collapsible.Content>
              </Collapsible.Root>
            </>
          )
        }
        "
      `)
    })
  })

  describe("import updates", () => {
    test("updates Collapse import to Collapsible", async () => {
      const input = `
import { Collapse, Box } from '@chakra-ui/react'

export default function App() {
  return <Collapse>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Collapse", async () => {
      const input = `
import { Collapse } from './custom'

export default function App() {
  return <Collapse in={true}>Content</Collapse>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapse } from './custom'

        export default function App() {
          return <Collapse in={true}>Content</Collapse>
        }
        "
      `)
    })

    test("handles self-closing Collapse", async () => {
      const input = `
import { Collapse } from '@chakra-ui/react'

export default function App() {
  return <Collapse in={false} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Collapsible } from '@chakra-ui/react'

        export default function App() {
          return (
            <Collapsible.Root open={false}>
              <Collapsible.Content></Collapsible.Content>
            </Collapsible.Root>
          )
        }
        "
      `)
    })
  })
})
