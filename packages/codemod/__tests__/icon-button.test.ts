import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/icon-button"
import { applyTransform } from "./test-utils"

describe("IconButton Transform", () => {
  describe("icon prop transformation", () => {
    test("transforms icon prop to children", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton icon={<SearchIcon />} aria-label="Search" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { SearchIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton aria-label="Search">
              <SearchIcon />
            </IconButton>
          )
        }
        "
      `)
    })

    test("transforms icon with variable", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'

export default function App({ icon }) {
  return <IconButton icon={icon} aria-label="Action" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'

        export default function App({ icon }) {
          return <IconButton aria-label="Action">{icon}</IconButton>
        }
        "
      `)
    })

    test("transforms icon with component reference", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

export default function App() {
  return <IconButton icon={<LuSearch />} aria-label="Search" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { LuSearch } from 'react-icons/lu'

        export default function App() {
          return (
            <IconButton aria-label="Search">
              <LuSearch />
            </IconButton>
          )
        }
        "
      `)
    })

    test("handles multiple IconButtons", async () => {
      const input = `
import { IconButton, Stack } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Stack>
      <IconButton icon={<AddIcon />} aria-label="Add" />
      <IconButton icon={<EditIcon />} aria-label="Edit" />
      <IconButton icon={<DeleteIcon />} aria-label="Delete" />
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton, Stack } from '@chakra-ui/react'
        import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Stack>
              <IconButton aria-label="Add">
                <AddIcon />
              </IconButton>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("isRounded transformation", () => {
    test("transforms isRounded to borderRadius='full'", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton icon={<SearchIcon />} isRounded aria-label="Search" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { SearchIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton borderRadius="full" aria-label="Search">
              <SearchIcon />
            </IconButton>
          )
        }
        "
      `)
    })

    test("transforms isRounded with value", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton icon={<SearchIcon />} isRounded={true} aria-label="Search" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { SearchIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton borderRadius="full" aria-label="Search">
              <SearchIcon />
            </IconButton>
          )
        }
        "
      `)
    })
  })

  describe("combined transformations", () => {
    test("transforms both icon and isRounded", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton icon={<CloseIcon />} isRounded aria-label="Close" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { CloseIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton borderRadius="full" aria-label="Close">
              <CloseIcon />
            </IconButton>
          )
        }
        "
      `)
    })

    test("transforms with additional props preserved", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <IconButton
      icon={<SearchIcon />}
      isRounded
      aria-label="Search"
      colorScheme="blue"
      size="lg"
      variant="ghost"
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { SearchIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton
              borderRadius="full"
              aria-label="Search"
              colorScheme="blue"
              size="lg"
              variant="ghost"
            >
              <SearchIcon />
            </IconButton>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation when no relevant props", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'

export default function App() {
  return <IconButton aria-label="Action">Custom</IconButton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'

        export default function App() {
          return <IconButton aria-label="Action">Custom</IconButton>
        }
        "
      `)
    })

    test("no transformation when IconButton is not from Chakra", async () => {
      const input = `
import { IconButton } from 'some-other-library'

export default function App() {
  return <IconButton icon="test" aria-label="Action" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from 'some-other-library'

        export default function App() {
          return <IconButton icon="test" aria-label="Action" />
        }
        "
      `)
    })

    test("handles IconButton with existing children", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <IconButton icon={<SearchIcon />} aria-label="Search">
      Existing content
    </IconButton>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { SearchIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton aria-label="Search">
              <SearchIcon />
            </IconButton>
          )
        }
        "
      `)
    })

    test("handles self-closing IconButton", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return <IconButton icon={<AddIcon />} aria-label="Add" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { AddIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <IconButton aria-label="Add">
              <AddIcon />
            </IconButton>
          )
        }
        "
      `)
    })
  })

  describe("with other Chakra components", () => {
    test("transforms IconButton within other components", async () => {
      const input = `
import { Box, IconButton, Stack } from '@chakra-ui/react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Box>
      <Stack direction="row">
        <IconButton icon={<EditIcon />} aria-label="Edit" isRounded />
        <IconButton icon={<CloseIcon />} aria-label="Close" />
      </Stack>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, IconButton, Stack } from '@chakra-ui/react'
        import { CloseIcon, EditIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Box>
              <Stack direction="row">
                <IconButton aria-label="Edit" borderRadius="full">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Box>
          )
        }
        "
      `)
    })

    test("preserves non-IconButton components", async () => {
      const input = `
import { Button, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <>
      <Button leftIcon={<AddIcon />}>Add</Button>
      <IconButton icon={<AddIcon />} aria-label="Add" />
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button, IconButton } from '@chakra-ui/react'
        import { AddIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <>
              <Button leftIcon={<AddIcon />}>Add</Button>
              <IconButton aria-label="Add">
                <AddIcon />
              </IconButton>
            </>
          )
        }
        "
      `)
    })
  })
})
