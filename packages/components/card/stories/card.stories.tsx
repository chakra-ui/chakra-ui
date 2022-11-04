import { chakra } from "@chakra-ui/system"
import { Divider, Heading, Stack, Text } from "@chakra-ui/layout"
import { Card, CardHeader, CardBody, CardFooter } from "../src"
import { Button, ButtonGroup } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"

// https://designsystem.digital.gov/components/card/

export default {
  title: "Components / Data Display / Card",
  decorators: [
    (Story: any) => (
      <chakra.div mx="auto" maxW="500px" mt="40px">
        <Story />
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Play relaxing songs</Heading>
    </CardHeader>
    <CardBody>From your recent favs</CardBody>
    <CardFooter>
      <Button colorScheme="blue">Get started</Button>
    </CardFooter>
  </Card>
)

export const WithDivider = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Card Header</Heading>
    </CardHeader>
    <CardBody>Card Body</CardBody>
    <Divider />
    <CardFooter>Card Footer</CardFooter>
  </Card>
)

export const WithImage = () => (
  <Card overflow="hidden">
    <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
    <CardBody>
      <Stack>
        <Heading size="md">Card Title</Heading>
        <Text>Secondary text</Text>
        <Text>
          To have a nice and clear card separate from the background you need to
          have a border around the tag
        </Text>
      </Stack>
    </CardBody>

    <Divider />

    <CardFooter display="flex" justifyContent="flex-end">
      <ButtonGroup spacing="5">
        <Button variant="link" colorScheme="blue">
          Action 1
        </Button>
        <Button variant="link" colorScheme="blue">
          Action 2
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
)
