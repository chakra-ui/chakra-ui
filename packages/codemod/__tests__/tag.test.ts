import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/tag"
import { applyTransform } from "./test-utils"

describe("tag transform", () => {
  describe("basic component transformations", () => {
    test("transforms Tag to Tag.Root", async () => {
      const input = `
import { Tag } from '@chakra-ui/react'

export default function App() {
  return <Tag>Label</Tag>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag } from '@chakra-ui/react'

        export default function App() {
          return <Tag.Root>Label</Tag.Root>
        }
        "
      `)
    })

    test("transforms TagLabel to Tag.Label", async () => {
      const input = `
import { Tag, TagLabel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tag>
      <TagLabel>Sample Tag</TagLabel>
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.Label>Sample Tag</Tag.Label>
            </Tag.Root>
          )
        }
        "
      `)
    })

    test("transforms TagLeftIcon to Tag.StartElement", async () => {
      const input = `
import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'

export default function App() {
  return (
    <Tag>
      <TagLeftIcon as={LuPlus} />
      <TagLabel>Add</TagLabel>
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
        import { LuPlus } from 'react-icons/lu'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.StartElement as={LuPlus} />
              <Tag.Label>Add</Tag.Label>
            </Tag.Root>
          )
        }
        "
      `)
    })

    test("transforms TagRightIcon to Tag.EndElement", async () => {
      const input = `
import { Tag, TagRightIcon, TagLabel } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'

export default function App() {
  return (
    <Tag>
      <TagLabel>Remove</TagLabel>
      <TagRightIcon as={LuX} />
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagRightIcon, TagLabel } from '@chakra-ui/react'
        import { LuX } from 'react-icons/lu'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.Label>Remove</Tag.Label>
              <Tag.EndElement as={LuX} />
            </Tag.Root>
          )
        }
        "
      `)
    })

    test("transforms TagCloseButton to Tag.CloseTrigger", async () => {
      const input = `
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

export default function App() {
  return (
    <Tag>
      <TagLabel>Removable</TagLabel>
      <TagCloseButton />
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.Label>Removable</Tag.Label>
              <Tag.CloseTrigger />
            </Tag.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    test("transforms complete tag with all components", async () => {
      const input = `
import { Tag, TagLeftIcon, TagLabel, TagCloseButton } from '@chakra-ui/react'
import { LuTag } from 'react-icons/lu'

export default function App() {
  return (
    <Tag size='md' variant='solid' colorScheme='blue'>
      <TagLeftIcon as={LuTag} />
      <TagLabel>Sample Tag</TagLabel>
      <TagCloseButton />
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLeftIcon, TagLabel, TagCloseButton } from '@chakra-ui/react'
        import { LuTag } from 'react-icons/lu'

        export default function App() {
          return (
            <Tag.Root size="md" variant="solid" colorScheme="blue">
              <Tag.StartElement as={LuTag} />
              <Tag.Label>Sample Tag</Tag.Label>
              <Tag.CloseTrigger />
            </Tag.Root>
          )
        }
        "
      `)
    })

    test("transforms multiple tags", async () => {
      const input = `
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Tag>
        <TagLabel>Tag 1</TagLabel>
        <TagCloseButton />
      </Tag>
      <Tag>
        <TagLabel>Tag 2</TagLabel>
        <TagCloseButton />
      </Tag>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Tag.Root>
                <Tag.Label>Tag 1</Tag.Label>
                <Tag.CloseTrigger />
              </Tag.Root>
              <Tag.Root>
                <Tag.Label>Tag 2</Tag.Label>
                <Tag.CloseTrigger />
              </Tag.Root>
            </>
          )
        }
        "
      `)
    })
  })

  describe("props preservation", () => {
    test("preserves props on Tag", async () => {
      const input = `
import { Tag, TagLabel } from '@chakra-ui/react'

export default function App() {
  return (
    <Tag size='lg' colorScheme='green' borderRadius='full'>
      <TagLabel>Label</TagLabel>
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tag.Root size="lg" colorScheme="green" borderRadius="full">
              <Tag.Label>Label</Tag.Label>
            </Tag.Root>
          )
        }
        "
      `)
    })

    test("preserves props on TagCloseButton", async () => {
      const input = `
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

export default function App() {
  return (
    <Tag>
      <TagLabel>Label</TagLabel>
      <TagCloseButton onClick={() => console.log('closed')} />
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.Label>Label</Tag.Label>
              <Tag.CloseTrigger onClick={() => console.log('closed')} />
            </Tag.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Tag components", async () => {
      const input = `
import { Tag, TagLabel } from './custom-tag'

export default function App() {
  return (
    <Tag>
      <TagLabel>Custom</TagLabel>
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagLabel } from './custom-tag'

        export default function App() {
          return (
            <Tag>
              <TagLabel>Custom</TagLabel>
            </Tag>
          )
        }
        "
      `)
    })

    test("handles self-closing tags", async () => {
      const input = `
import { Tag, TagCloseButton } from '@chakra-ui/react'

export default function App() {
  return (
    <Tag>
      <TagCloseButton />
    </Tag>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Tag, TagCloseButton } from '@chakra-ui/react'

        export default function App() {
          return (
            <Tag.Root>
              <Tag.CloseTrigger />
            </Tag.Root>
          )
        }
        "
      `)
    })
  })
})
