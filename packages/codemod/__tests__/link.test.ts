import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/link"
import { applyTransform } from "./test-utils"

describe("Link Transform", () => {
  describe("isExternal transformation", () => {
    test("transforms isExternal to target and rel", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="https://chakra-ui.com" isExternal>Chakra UI</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link
              href="https://chakra-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("transforms isExternal with boolean value", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="https://chakra-ui.com" isExternal={true}>Chakra UI</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link
              href="https://chakra-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("preserves existing target when isExternal is present", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="https://chakra-ui.com" isExternal target="_self">Chakra UI</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link href="https://chakra-ui.com" target="_self" rel="noopener noreferrer">
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("preserves existing rel when isExternal is present", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="https://chakra-ui.com" isExternal rel="nofollow">Chakra UI</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link href="https://chakra-ui.com" rel="nofollow" target="_blank">
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("preserves both target and rel when both exist", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return (
    <Link
      href="https://chakra-ui.com"
      isExternal
      target="_self"
      rel="nofollow"
    >
      Chakra UI
    </Link>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link href="https://chakra-ui.com" target="_self" rel="nofollow">
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("transforms multiple Links with isExternal", async () => {
      const input = `
import { Link, Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack>
      <Link href="https://chakra-ui.com" isExternal>Chakra UI</Link>
      <Link href="https://github.com" isExternal>GitHub</Link>
      <Link href="/internal">Internal</Link>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link, Stack } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack>
              <Link
                href="https://chakra-ui.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chakra UI
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
              <Link href="/internal">Internal</Link>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("LinkOverlay transformation", () => {
    test("transforms LinkOverlay with isExternal", async () => {
      const input = `
import { LinkOverlay, LinkBox } from '@chakra-ui/react'

export default function App() {
  return (
    <LinkBox>
      <LinkOverlay href="https://chakra-ui.com" isExternal>
        Chakra UI
      </LinkOverlay>
    </LinkBox>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { LinkOverlay, LinkBox } from '@chakra-ui/react'

        export default function App() {
          return (
            <LinkBox>
              <LinkOverlay
                href="https://chakra-ui.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chakra UI
              </LinkOverlay>
            </LinkBox>
          )
        }
        "
      `)
    })

    test("transforms both Link and LinkOverlay", async () => {
      const input = `
import { Link, LinkOverlay, LinkBox } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Link href="https://chakra-ui.com" isExternal>Regular Link</Link>
      <LinkBox>
        <LinkOverlay href="https://github.com" isExternal>
          Link Overlay
        </LinkOverlay>
      </LinkBox>
    </>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link, LinkOverlay, LinkBox } from '@chakra-ui/react'

        export default function App() {
          return (
            <>
              <Link
                href="https://chakra-ui.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Regular Link
              </Link>
              <LinkBox>
                <LinkOverlay
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link Overlay
                </LinkOverlay>
              </LinkBox>
            </>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation without isExternal", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="/about">About</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return <Link href="/about">About</Link>
        }
        "
      `)
    })

    test("no transformation for non-Chakra Link", async () => {
      const input = `
import { Link } from 'react-router-dom'

export default function App() {
  return <Link to="/about" isExternal>About</Link>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from 'react-router-dom'

        export default function App() {
          return (
            <Link to="/about" isExternal>
              About
            </Link>
          )
        }
        "
      `)
    })

    test("no transformation when no Chakra imports", async () => {
      const input = `
import React from 'react'

export default function App() {
  return <a href="https://chakra-ui.com" target="_blank">Chakra UI</a>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import React from 'react'

        export default function App() {
          return (
            <a href="https://chakra-ui.com" target="_blank">
              Chakra UI
            </a>
          )
        }
        "
      `)
    })

    test("handles Link with alias", async () => {
      const input = `
import { Link as ChakraLink } from '@chakra-ui/react'

export default function App() {
  return <ChakraLink href="https://chakra-ui.com" isExternal>Chakra UI</ChakraLink>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link as ChakraLink } from '@chakra-ui/react'

        export default function App() {
          return (
            <ChakraLink
              href="https://chakra-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </ChakraLink>
          )
        }
        "
      `)
    })

    test("transforms self-closing Link", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return <Link href="https://chakra-ui.com" isExternal />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link
              href="https://chakra-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            />
          )
        }
        "
      `)
    })
  })

  describe("with other props", () => {
    test("preserves all other props", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App() {
  return (
    <Link
      href="https://chakra-ui.com"
      isExternal
      color="blue.500"
      fontSize="lg"
      fontWeight="bold"
      textDecoration="underline"
      _hover={{ color: 'blue.700' }}
    >
      Chakra UI
    </Link>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App() {
          return (
            <Link
              href="https://chakra-ui.com"
              color="blue.500"
              fontSize="lg"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ color: 'blue.700' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("transforms Link within other components", async () => {
      const input = `
import { Box, Link, Text } from '@chakra-ui/react'

export default function App() {
  return (
    <Box>
      <Text>
        Visit <Link href="https://chakra-ui.com" isExternal>Chakra UI</Link> for more info.
      </Text>
    </Box>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Link, Text } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box>
              <Text>
                Visit{' '}
                <Link
                  href="https://chakra-ui.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chakra UI
                </Link>{' '}
                for more info.
              </Text>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("conditional and dynamic usage", () => {
    test("transforms with conditional isExternal", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App({ external }) {
  return (
    <Link href="https://chakra-ui.com" isExternal={external}>
      Chakra UI
    </Link>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App({ external }) {
          return (
            <Link
              href="https://chakra-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })

    test("transforms Link with spread props", async () => {
      const input = `
import { Link } from '@chakra-ui/react'

export default function App(props) {
  return (
    <Link href="https://chakra-ui.com" isExternal {...props}>
      Chakra UI
    </Link>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Link } from '@chakra-ui/react'

        export default function App(props) {
          return (
            <Link
              href="https://chakra-ui.com"
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chakra UI
            </Link>
          )
        }
        "
      `)
    })
  })
})
