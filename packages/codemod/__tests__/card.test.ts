import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/card"
import { applyTransform } from "./test-utils"

describe("card codemod", () => {
  describe("basic transformations", () => {
    it("should rename Card to Card.Root", async () => {
      const input = `
import { Card } from '@chakra-ui/react'

function App() {
  return <Card>Content</Card>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return <Card.Root>Content</Card.Root>
        }
        "
      `)
    })

    it("should rename CardBody to Card.Body", async () => {
      const input = `
import { Card, CardBody } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardBody>Body content</CardBody>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Body>Body content</Card.Body>
            </Card.Root>
          )
        }
        "
      `)
    })

    it("should rename CardHeader to Card.Header", async () => {
      const input = `
import { Card, CardHeader } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardHeader>Header content</CardHeader>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Header>Header content</Card.Header>
            </Card.Root>
          )
        }
        "
      `)
    })

    it("should rename CardFooter to Card.Footer", async () => {
      const input = `
import { Card, CardFooter } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardFooter>Footer content</CardFooter>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Footer>Footer content</Card.Footer>
            </Card.Root>
          )
        }
        "
      `)
    })

    it("should transform all card components together", async () => {
      const input = `
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardHeader>Header</CardHeader>
      <CardBody>Body</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Header>Header</Card.Header>
              <Card.Body>Body</Card.Body>
              <Card.Footer>Footer</Card.Footer>
            </Card.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    it("should transform simple card with body", async () => {
      const input = `
import { Card, CardBody, Text } from '@chakra-ui/react'

<Card>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Text } from '@chakra-ui/react'

        ;<Card.Root>
          <Card.Body>
            <Text>View a summary of all your customers over the last month.</Text>
          </Card.Body>
        </Card.Root>
        "
      `)
    })

    it("should transform card with header and body", async () => {
      const input = `
import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react'

<Card>
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your clients over the last month.</Text>
  </CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Heading, Text } from '@chakra-ui/react'

        ;<Card.Root>
          <Card.Header>
            <Heading size="md">Client Report</Heading>
          </Card.Header>
          <Card.Body>
            <Text>View a summary of all your clients over the last month.</Text>
          </Card.Body>
        </Card.Root>
        "
      `)
    })

    it("should transform card with all sections and props", async () => {
      const input = `
import { Card, CardHeader, CardBody, CardFooter, Heading, Button } from '@chakra-ui/react'

<Card maxW='sm'>
  <CardHeader>
    <Heading size='md'>Living room Sofa</Heading>
  </CardHeader>
  <CardBody>
    <Text>This sofa is perfect for modern tropical spaces.</Text>
    <Text color='blue.600' fontSize='2xl'>$450</Text>
  </CardBody>
  <CardFooter>
    <Button variant='solid' colorScheme='blue'>Buy now</Button>
  </CardFooter>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Heading, Button } from '@chakra-ui/react'

        ;<Card.Root maxW="sm">
          <Card.Header>
            <Heading size="md">Living room Sofa</Heading>
          </Card.Header>
          <Card.Body>
            <Text>This sofa is perfect for modern tropical spaces.</Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
          </Card.Footer>
        </Card.Root>
        "
      `)
    })

    it("should transform card with direction and variant props", async () => {
      const input = `
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://example.com/image.jpg'
    alt='Caffe Latte'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>
      <Text py='2'>Caffè latte is a coffee beverage of Italian origin.</Text>
    </CardBody>
    <CardFooter>
      <Button variant='solid' colorScheme='blue'>Buy Latte</Button>
    </CardFooter>
  </Stack>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Image, Stack, Heading, Text, Button } from '@chakra-ui/react'

        ;<Card.Root
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://example.com/image.jpg"
            alt="Caffe Latte"
          />
          <Stack>
            <Card.Body>
              <Heading size="md">The perfect latte</Heading>
              <Text py="2">Caffè latte is a coffee beverage of Italian origin.</Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </Card.Footer>
          </Stack>
        </Card.Root>
        "
      `)
    })

    it("should transform card with align prop", async () => {
      const input = `
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'

<Card align='center'>
  <CardHeader>
    <Heading size='md'>Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Heading, Text, Button } from '@chakra-ui/react'

        ;<Card.Root align="center">
          <Card.Header>
            <Heading size="md">Customer dashboard</Heading>
          </Card.Header>
          <Card.Body>
            <Text>View a summary of all your customers over the last month.</Text>
          </Card.Body>
          <Card.Footer>
            <Button colorScheme="blue">View here</Button>
          </Card.Footer>
        </Card.Root>
        "
      `)
    })

    it("should transform multiple cards with variants", async () => {
      const input = `
import { Card, CardHeader, CardBody, Stack, Heading, Text } from '@chakra-ui/react'

<Stack spacing='4'>
  {['elevated', 'outline', 'filled', 'unstyled'].map((variant) => (
    <Card key={variant} variant={variant}>
      <CardHeader>
        <Heading size='md'>{variant}</Heading>
      </CardHeader>
      <CardBody>
        <Text>variant = {variant}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Stack, Heading, Text } from '@chakra-ui/react'

        ;<Stack spacing="4">
          {['elevated', 'outline', 'filled', 'unstyled'].map((variant) => (
            <Card.Root key={variant} variant={variant}>
              <Card.Header>
                <Heading size="md">{variant}</Heading>
              </Card.Header>
              <Card.Body>
                <Text>variant = {variant}</Text>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
        "
      `)
    })

    it("should transform multiple cards with sizes", async () => {
      const input = `
import { Card, CardHeader, CardBody, Stack, Heading, Text } from '@chakra-ui/react'

<Stack spacing='4'>
  {['sm', 'md', 'lg'].map((size) => (
    <Card key={size} size={size}>
      <CardHeader>
        <Heading size='md'>{size}</Heading>
      </CardHeader>
      <CardBody>
        <Text>size = {size}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Stack, Heading, Text } from '@chakra-ui/react'

        ;<Stack spacing="4">
          {['sm', 'md', 'lg'].map((size) => (
            <Card.Root key={size} size={size}>
              <Card.Header>
                <Heading size="md">{size}</Heading>
              </Card.Header>
              <Card.Body>
                <Text>size = {size}</Text>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
        "
      `)
    })
  })

  describe("variant transformations", () => {
    it("should transform filled variant to subtle", async () => {
      const input = `
import { Card, CardBody, Text } from '@chakra-ui/react'

<Card variant='filled'>
  <CardBody>
    <Text>Filled card</Text>
  </CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Text } from '@chakra-ui/react'

        ;<Card.Root variant="subtle">
          <Card.Body>
            <Text>Filled card</Text>
          </Card.Body>
        </Card.Root>
        "
      `)
    })

    it("should transform unstyled variant to unstyled prop", async () => {
      const input = `
import { Card, CardBody, Text } from '@chakra-ui/react'

<Card variant='unstyled'>
  <CardBody>
    <Text>Unstyled card</Text>
  </CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Text } from '@chakra-ui/react'

        ;<Card.Root unstyled>
          <Card.Body>
            <Text>Unstyled card</Text>
          </Card.Body>
        </Card.Root>
        "
      `)
    })

    it("should preserve elevated and outline variants", async () => {
      const input = `
import { Card, CardBody, Text } from '@chakra-ui/react'

<>
  <Card variant='elevated'>
    <CardBody>
      <Text>Elevated card</Text>
    </CardBody>
  </Card>
  <Card variant='outline'>
    <CardBody>
      <Text>Outline card</Text>
    </CardBody>
  </Card>
</>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Text } from '@chakra-ui/react'

        ;<>
          <Card.Root variant="elevated">
            <Card.Body>
              <Text>Elevated card</Text>
            </Card.Body>
          </Card.Root>
          <Card.Root variant="outline">
            <Card.Body>
              <Text>Outline card</Text>
            </Card.Body>
          </Card.Root>
        </>
        "
      `)
    })

    it("should transform all variants in mapped cards", async () => {
      const input = `
import { Card, CardHeader, CardBody, Stack, Heading, Text } from '@chakra-ui/react'

<Stack spacing='4'>
  {['elevated', 'outline', 'filled', 'unstyled'].map((variant) => (
    <Card key={variant} variant={variant}>
      <CardHeader>
        <Heading size='md'>{variant}</Heading>
      </CardHeader>
      <CardBody>
        <Text>variant = {variant}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Stack, Heading, Text } from '@chakra-ui/react'

        ;<Stack spacing="4">
          {['elevated', 'outline', 'filled', 'unstyled'].map((variant) => (
            <Card.Root key={variant} variant={variant}>
              <Card.Header>
                <Heading size="md">{variant}</Heading>
              </Card.Header>
              <Card.Body>
                <Text>variant = {variant}</Text>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
        "
      `)
    })

    it("should handle filled variant with other props", async () => {
      const input = `
import { Card, CardBody } from '@chakra-ui/react'

<Card variant='filled' size='lg' p={4}>
  <CardBody>Content</CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        ;<Card.Root variant="subtle" size="lg" p={4}>
          <Card.Body>Content</Card.Body>
        </Card.Root>
        "
      `)
    })

    it("should handle unstyled variant with other props", async () => {
      const input = `
import { Card, CardBody } from '@chakra-ui/react'

<Card variant='unstyled' size='md' bg='red.100'>
  <CardBody>Content</CardBody>
</Card>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        ;<Card.Root size="md" bg="red.100" unstyled>
          <Card.Body>Content</Card.Body>
        </Card.Root>
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra components", async () => {
      const input = `
function App() {
  return (
    <Card>
      <CardBody>Content</CardBody>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return (
            <Card>
              <CardBody>Content</CardBody>
            </Card>
          )
        }
        "
      `)
    })

    it("should handle empty card", async () => {
      const input = `
import { Card } from '@chakra-ui/react'

function App() {
  return <Card />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return <Card.Root />
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Card, CardBody } from '@chakra-ui/react'

function App() {
  return (
    <Card className="my-card" id="card-1" p={4} bg="gray.50">
      <CardBody>Content</CardBody>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root className="my-card" id="card-1" p={4} bg="gray.50">
              <Card.Body>Content</Card.Body>
            </Card.Root>
          )
        }
        "
      `)
    })

    it("should handle nested cards", async () => {
      const input = `
import { Card, CardBody } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardBody>
        <Card>
          <CardBody>Nested card</CardBody>
        </Card>
      </CardBody>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Body>
                <Card.Root>
                  <Card.Body>Nested card</Card.Body>
                </Card.Root>
              </Card.Body>
            </Card.Root>
          )
        }
        "
      `)
    })

    it("should handle only body without header or footer", async () => {
      const input = `
import { Card, CardBody, Text } from '@chakra-ui/react'

function App() {
  return (
    <Card>
      <CardBody>
        <Text>Just a body</Text>
      </CardBody>
    </Card>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Card, Text } from '@chakra-ui/react'

        function App() {
          return (
            <Card.Root>
              <Card.Body>
                <Text>Just a body</Text>
              </Card.Body>
            </Card.Root>
          )
        }
        "
      `)
    })
  })
})
