import { describe, expect, test } from "vitest"
import transform from "../src/transforms/props/as-props"
import { applyTransform } from "./test-utils"

describe("as-props transform", () => {
  describe("simple DOM elements", () => {
    test("keeps as='div' without asChild", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="div" color="red">Content</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box as="div" color="red">
              Content
            </Box>
          )
        }
        "
      `)
    })

    test("keeps as='span' without asChild", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="span" fontSize="xl">Text</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box as="span" fontSize="xl">
              Text
            </Box>
          )
        }
        "
      `)
    })

    test("keeps as='h1' without asChild", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="h1" fontSize="2xl">Heading</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box as="h1" fontSize="2xl">
              Heading
            </Box>
          )
        }
        "
      `)
    })

    test("keeps as='section' without asChild", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="section" padding="4">Content</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box as="section" padding="4">
              Content
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("interactive/semantic DOM elements that need asChild", () => {
    test("transforms as='a' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="a" href="#" color="blue">Link</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <a href="#">Link</a>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='button' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="button" onClick={() => {}} color="blue">Click me</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <button onClick={() => {}}>Click me</button>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='time' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="time" datetime="2024-01-01" color="gray">Jan 1, 2024</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="gray" asChild>
              <time datetime="2024-01-01">Jan 1, 2024</time>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='input' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="input" type="text" placeholder="Enter text" color="blue" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <input type="text" placeholder="Enter text" />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='iframe' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="iframe" src="https://example.com" width="100%" height="400px" color="blue" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <iframe src="https://example.com" width="100%" height="400px" />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='dialog' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="dialog" open color="gray">Dialog content</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="gray" asChild>
              <dialog open>Dialog content</dialog>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("React components", () => {
    test("transforms as={Button} to asChild pattern", async () => {
      const input = `
import { Box, Button } from '@chakra-ui/react'

export default function App() {
  return <Box as={Button} color="blue">Click</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box, Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <Button>Click</Button>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as={CustomComponent} to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'
import { CustomLink } from './CustomLink'

export default function App() {
  return <Box as={CustomLink} to="/home" color="blue">Home</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'
        import { CustomLink } from './CustomLink'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <CustomLink to="/home">Home</CustomLink>
            </Box>
          )
        }
        "
      `)
    })

    test("keeps Chakra component props on parent", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function App() {
  return <Button as={Link} to="/home" variant="outline" colorScheme="blue">Home</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Link } from 'react-router-dom'

        export default function App() {
          return (
            <Button variant="outline" colorScheme="blue" asChild>
              <Link to="/home">Home</Link>
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("keeps as={as} pattern unchanged (dynamic expression)", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App({ as }) {
  return <Box as={as} color="blue">Content</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App({ as }) {
          return (
            <Box as={as} color="blue">
              Content
            </Box>
          )
        }
        "
      `)
    })

    test("preserves children when transforming", async () => {
      const input = `
import { IconButton } from '@chakra-ui/react'
import { LuIcon } from 'lucide-react'

export default function App() {
  return <IconButton as="a" href="#"><LuIcon /></IconButton>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { IconButton } from '@chakra-ui/react'
        import { LuIcon } from 'lucide-react'

        export default function App() {
          return (
            <IconButton asChild>
              <a href="#">
                <LuIcon />
              </a>
            </IconButton>
          )
        }
        "
      `)
    })

    test("no transformation for non-Chakra components", async () => {
      const input = `
import { CustomBox } from './CustomBox'

export default function App() {
  return <CustomBox as="a" href="#">Link</CustomBox>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { CustomBox } from './CustomBox'

        export default function App() {
          return (
            <CustomBox as="a" href="#">
              Link
            </CustomBox>
          )
        }
        "
      `)
    })
  })

  describe("Heading component with simple DOM elements", () => {
    test("keeps Heading as='h1' without asChild", async () => {
      const input = `
import { Heading } from '@chakra-ui/react'

export default function App() {
  return <Heading as='h1' size='4xl' noOfLines={1}>In love with React & Next</Heading>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Heading } from '@chakra-ui/react'

        export default function App() {
          return (
            <Heading as="h1" size="4xl" noOfLines={1}>
              In love with React & Next
            </Heading>
          )
        }
        "
      `)
    })

    test("keeps multiple Heading elements with h1-h6", async () => {
      const input = `
import { Stack, Heading } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack spacing={6}>
      <Heading as='h1' size='4xl'>Heading 1</Heading>
      <Heading as='h2' size='3xl'>Heading 2</Heading>
      <Heading as='h3' size='2xl'>Heading 3</Heading>
      <Heading as='h4' size='xl'>Heading 4</Heading>
      <Heading as='h5' size='lg'>Heading 5</Heading>
      <Heading as='h6' size='md'>Heading 6</Heading>
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Stack, Heading } from '@chakra-ui/react'

        export default function App() {
          return (
            <Stack spacing={6}>
              <Heading as="h1" size="4xl">
                Heading 1
              </Heading>
              <Heading as="h2" size="3xl">
                Heading 2
              </Heading>
              <Heading as="h3" size="2xl">
                Heading 3
              </Heading>
              <Heading as="h4" size="xl">
                Heading 4
              </Heading>
              <Heading as="h5" size="lg">
                Heading 5
              </Heading>
              <Heading as="h6" size="md">
                Heading 6
              </Heading>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("Text component with simple DOM elements", () => {
    test("keeps Text as='span' without asChild", async () => {
      const input = `
import { Text } from '@chakra-ui/react'

export default function App() {
  return <Text as='span' fontSize='lg' color='blue.500'>Hello World</Text>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Text } from '@chakra-ui/react'

        export default function App() {
          return (
            <Text as="span" fontSize="lg" color="blue.500">
              Hello World
            </Text>
          )
        }
        "
      `)
    })

    test("keeps Text as='p' without asChild", async () => {
      const input = `
import { Text } from '@chakra-ui/react'

export default function App() {
  return <Text as='p' fontSize='md'>Paragraph text</Text>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Text } from '@chakra-ui/react'

        export default function App() {
          return (
            <Text as="p" fontSize="md">
              Paragraph text
            </Text>
          )
        }
        "
      `)
    })
  })

  describe("additional native elements", () => {
    test("transforms as='video' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="video" src="/video.mp4" controls width="640" height="360" color="blue" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue" asChild>
              <video src="/video.mp4" controls width="640" height="360" />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='audio' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="audio" src="/audio.mp3" controls autoplay padding="4" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box padding="4" asChild>
              <audio src="/audio.mp3" controls autoplay />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='select' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="select" name="country" required color="gray">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="gray" asChild>
              <select name="country" required>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
              </select>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='textarea' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="textarea" rows={4} placeholder="Enter text" bg="white" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box bg="white" asChild>
              <textarea rows={4} placeholder="Enter text" />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='form' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="form" action="/submit" method="post" padding="6">
    <input type="text" name="username" />
  </Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box padding="6" asChild>
              <form action="/submit" method="post">
                <input type="text" name="username" />
              </form>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='label' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="label" htmlFor="email" fontWeight="bold">Email Address</Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box fontWeight="bold" asChild>
              <label htmlFor="email">Email Address</label>
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='meter' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="meter" value={0.7} min={0} max={1} low={0.3} high={0.8} color="green" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="green" asChild>
              <meter value={0.7} min={0} max={1} low={0.3} high={0.8} />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='progress' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="progress" value={75} max={100} width="full" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box width="full" asChild>
              <progress value={75} max={100} />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='canvas' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="canvas" width={800} height={600} bg="gray.100" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box bg="gray.100" asChild>
              <canvas width={800} height={600} />
            </Box>
          )
        }
        "
      `)
    })

    test("transforms as='img' to asChild pattern", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="img" src="/logo.png" alt="Logo" width={200} loading="lazy" borderRadius="md" />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box borderRadius="md" asChild>
              <img src="/logo.png" alt="Logo" width={200} loading="lazy" />
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("multiple children and complex structures", () => {
    test("preserves multiple children when transforming", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { LuIcon, LuCheck } from 'lucide-react'

export default function App() {
  return <Button as="a" href="#" variant="solid">
    <LuIcon />
    <span>Click me</span>
    <LuCheck />
  </Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { LuIcon, LuCheck } from 'lucide-react'

        export default function App() {
          return (
            <Button variant="solid" asChild>
              <a href="#">
                <LuIcon />
                <span>Click me</span>
                <LuCheck />
              </a>
            </Button>
          )
        }
        "
      `)
    })

    test("handles nested JSX elements correctly", async () => {
      const input = `
import { Box } from '@chakra-ui/react'

export default function App() {
  return <Box as="a" href="/profile" color="blue.500">
    <Box as="div" fontSize="lg">User Name</Box>
    <Box as="span" fontSize="sm">@username</Box>
  </Box>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Box } from '@chakra-ui/react'

        export default function App() {
          return (
            <Box color="blue.500" asChild>
              <a href="/profile">
                <Box as="div" fontSize="lg">
                  User Name
                </Box>
                <Box as="span" fontSize="sm">
                  @username
                </Box>
              </a>
            </Box>
          )
        }
        "
      `)
    })
  })

  describe("spread attributes", () => {
    test("keeps spread attributes on parent", async () => {
      const input = `
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function App({ linkProps }) {
  return <Button as={Link} {...linkProps} variant="outline">Home</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'
        import { Link } from 'react-router-dom'

        export default function App({ linkProps }) {
          return (
            <Button {...linkProps} variant="outline" asChild>
              <Link>Home</Link>
            </Button>
          )
        }
        "
      `)
    })
  })

  describe("data and aria attributes", () => {
    test("keeps data-* attributes on parent", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

export default function App() {
  return <Button as="a" href="#" data-testid="my-link" data-track="click" variant="solid">Link</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Button data-testid="my-link" data-track="click" variant="solid" asChild>
              <a href="#">Link</a>
            </Button>
          )
        }
        "
      `)
    })

    test("keeps aria-* attributes on parent", async () => {
      const input = `
import { Button } from '@chakra-ui/react'

export default function App() {
  return <Button as="a" href="#" aria-label="Home page" aria-current="page" colorScheme="blue">Home</Button>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Button } from '@chakra-ui/react'

        export default function App() {
          return (
            <Button
              aria-label="Home page"
              aria-current="page"
              colorScheme="blue"
              asChild
            >
              <a href="#">Home</a>
            </Button>
          )
        }
        "
      `)
    })
  })
})
