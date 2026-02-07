import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/select"
import { applyTransform } from "./test-utils"

describe("select transform", () => {
  describe("basic transformation", () => {
    test("transforms Select to NativeSelect.Root > NativeSelect.Field + NativeSelect.Indicator", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <Select placeholder="Select option">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field placeholder=\"Select option\">
                <option value=\"1\">Option 1</option>
                <option value=\"2\">Option 2</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })

    test("transforms simple Select", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <Select>
      <option>Option 1</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field>
                <option>Option 1</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("removes icon prop", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <Select icon={<ChevronDownIcon />}>
      <option>Option 1</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field>
                <option>Option 1</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })

    test("preserves other props on Field", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <Select placeholder="Choose" size="lg" variant="outline">
      <option>Option 1</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field placeholder=\"Choose\" size=\"lg\" variant=\"outline\">
                <option>Option 1</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })
  })

  describe("existing indicator handling", () => {
    test("does not add Indicator if one already exists in children", async () => {
      const input = `
import { Select, NativeSelect } from '@chakra-ui/react'

export default function App() {
  return (
    <Select>
      <option>Option 1</option>
      <NativeSelect.Indicator />
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect, NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field>
                <option>Option 1</option>
                <NativeSelect.Indicator />
              </NativeSelect.Field>
            </NativeSelect.Root>
          )
        }
        "
      `)
    })
  })

  describe("multiple Select components", () => {
    test("transforms multiple Select components", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Select placeholder="First">
        <option>1</option>
      </Select>
      <Select placeholder="Second">
        <option>2</option>
      </Select>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <NativeSelect.Root>
                <NativeSelect.Field placeholder=\"First\">
                  <option>1</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <NativeSelect.Root>
                <NativeSelect.Field placeholder=\"Second\">
                  <option>2</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </>
          )
        }
        "
      `)
    })
  })

  describe("import updates", () => {
    test("updates Select import to NativeSelect", async () => {
      const input = `
import { Select, Box } from '@chakra-ui/react'

export default function App() {
          return (
    <Select>
      <option>Option</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect, Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field>
                <option>Option</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Select", async () => {
      const input = `
import { Select } from './custom'

export default function App() {
  return (
    <Select>
      <option>Option</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Select } from './custom'

        export default function App() {
          return (
            <Select>
              <option>Option</option>
            </Select>
          )
        }
        "
      `)
    })

    test("handles Select with no children", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return <Select />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field></NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })

    test("handles Select with event handlers", async () => {
      const input = `
import { Select } from '@chakra-ui/react'

export default function App() {
  return (
    <Select onChange={(e) => console.log(e.target.value)}>
      <option>Option 1</option>
    </Select>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { NativeSelect } from '@chakra-ui/react'

        export default function App() {
          return (
            <NativeSelect.Root>
              <NativeSelect.Field onChange={(e) => console.log(e.target.value)}>
                <option>Option 1</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          )
        }
        "
      `)
    })
  })
})
