import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/show-hide"
import { applyTransform } from "./test-utils"

describe("show-hide transform", () => {
  describe("Show component", () => {
    test("transforms Show with below prop to Box with hideFrom", async () => {
      const input = `
import { Show } from '@chakra-ui/react'

export default function App() {
  return (
    <Show below='md'>
      <div>Visible below md</div>
    </Show>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box hideFrom="md">
              <div>Visible below md</div>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms Show with expression value", async () => {
      const input = `
import { Show } from '@chakra-ui/react'

export default function App() {
  const breakpoint = 'lg'
  return (
    <Show below={breakpoint}>
      <div>Content</div>
    </Show>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show } from '@chakra-ui/react'

        export default function App() {
          const breakpoint = 'lg'
          return (
            <Box hideFrom={breakpoint}>
              <div>Content</div>
            </Box>
          )
        }
        "
      `)
    })

    test("preserves other props on Show", async () => {
      const input = `
import { Show } from '@chakra-ui/react'

export default function App() {
  return (
    <Show below='md' className='custom'>
      <div>Content</div>
    </Show>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box className="custom" hideFrom="md">
              <div>Content</div>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("Hide component", () => {
    test("transforms Hide with below prop to Box with hideBelow", async () => {
      const input = `
import { Hide } from '@chakra-ui/react'

export default function App() {
  return (
    <Hide below='md'>
      <div>Hidden below md</div>
    </Hide>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Hide } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box hideBelow="md">
              <div>Hidden below md</div>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms Hide with expression value", async () => {
      const input = `
import { Hide } from '@chakra-ui/react'

export default function App() {
  const breakpoint = 'sm'
  return (
    <Hide below={breakpoint}>
      <div>Content</div>
    </Hide>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Hide } from '@chakra-ui/react'

        export default function App() {
          const breakpoint = 'sm'
          return (
            <Box hideBelow={breakpoint}>
              <div>Content</div>
            </Box>
          )
        }
        "
      `)
    })

    test("preserves other props on Hide", async () => {
      const input = `
import { Hide } from '@chakra-ui/react'

export default function App() {
  return (
    <Hide below='lg' id='hideSection'>
      <div>Content</div>
    </Hide>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Hide } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box id="hideSection" hideBelow="lg">
              <div>Content</div>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("multiple components", () => {
    test("transforms both Show and Hide in same file", async () => {
      const input = `
import { Show, Hide } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Show below='md'>
        <div>Mobile only</div>
      </Show>
      <Hide below='md'>
        <div>Desktop only</div>
      </Hide>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show, Hide } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Box hideFrom="md">
                <div>Mobile only</div>
              </Box>
              <Box hideBelow="md">
                <div>Desktop only</div>
              </Box>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Show/Hide", async () => {
      const input = `
import { Show, Hide } from './custom'

export default function App() {
  return (
    <>
      <Show below='md'>Content</Show>
      <Hide below='md'>Content</Hide>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show, Hide } from './custom'

        export default function App() {
          return (
            <>
              <Show below="md">Content</Show>
              <Hide below="md">Content</Hide>
            </>
          )
        }
        "
      `)
    })

    test("handles Show/Hide with no below prop", async () => {
      const input = `
import { Show } from '@chakra-ui/react'

export default function App() {
  return (
    <Show>
      <div>Content</div>
    </Show>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Show } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box hideFrom>
              <div>Content</div>
            </Box>
          )
        }
        "
      `)
    })
  })
})
