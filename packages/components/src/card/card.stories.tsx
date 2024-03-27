import { BiChat, BiLike, BiShare } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  StackDivider,
  Text,
  chakra,
} from ".."

export default {
  title: "Data Display / Card",
  decorators: [
    (Story: any) => (
      <chakra.div mx="auto" maxW="2xl" mt="40px">
        <Story />
      </chakra.div>
    ),
  ],
}

export const Variants = () => (
  <Stack spacing="4">
    {["elevated", "outline", "filled", "unstyled"].map((variant) => (
      <Card.Root key={variant} variant={variant}>
        <Card.Header>
          <Heading size="md"> {variant}</Heading>
        </Card.Header>
        <Card.Body>
          <Text>variant = {variant}</Text>
        </Card.Body>
      </Card.Root>
    ))}
  </Stack>
)

export const Sizes = () => (
  <Stack spacing="4">
    {["sm", "md", "lg"].map((size) => (
      <Card.Root key={size} size={size}>
        <Card.Header>
          <Heading size="md"> {size}</Heading>
        </Card.Header>
        <Card.Body>
          <Text>size = {size}</Text>
        </Card.Body>
      </Card.Root>
    ))}
  </Stack>
)

export const Basic = () => (
  <Card.Root>
    <Card.Header>
      <Heading size="md"> Customer dashboard</Heading>
    </Card.Header>
    <Card.Body>
      <Text>View a summary of all your customers over the last month.</Text>
    </Card.Body>
  </Card.Root>
)

export const WithDivider = () => (
  <Card.Root>
    <Card.Header>
      <Heading size="md">Client Report</Heading>
    </Card.Header>

    <Card.Body>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Summary
          </Heading>
          <Text pt="2" fontSize="sm">
            View a summary of all your clients over the last month.
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Overview
          </Heading>
          <Text pt="2" fontSize="sm">
            Check out the overview of your clients.
          </Text>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Analysis
          </Heading>
          <Text pt="2" fontSize="sm">
            See a detailed analysis of all your business clients.
          </Text>
        </Box>
      </Stack>
    </Card.Body>
  </Card.Root>
)

export const WithImage = () => (
  <Card.Root maxW="sm">
    <Card.Body>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Stack mt="6" spacing="3">
        <Heading size="md">Living room Sofa</Heading>
        <Text>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces, earthy toned spaces and for people who love a chic design with
          a sprinkle of vintage design.
        </Text>
        <Text color="blue.600" fontSize="2xl">
          $450
        </Text>
      </Stack>
    </Card.Body>
    <Divider />
    <Card.Footer>
      <ButtonGroup spacing="2">
        <Button variant="solid" colorScheme="blue">
          Buy now
        </Button>
        <Button variant="ghost" colorScheme="blue">
          Add to cart
        </Button>
      </ButtonGroup>
    </Card.Footer>
  </Card.Root>
)

export const HorizontalCard = () => (
  <Card.Root direction="row" overflow="hidden" variant="outline">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Stack>
      <Card.Body>
        <Heading size="md">The perfect latte</Heading>
        <Text py="2">
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" colorScheme="blue">
          Buy Latte
        </Button>
      </Card.Footer>
    </Stack>
  </Card.Root>
)

export const Advanced = () => (
  <Card.Root maxW="md">
    <Card.Header>
      <HStack spacing="4">
        <Avatar.Root name="Segun Adebayo" src="https://bit.ly/sage-adebayo">
          <Avatar.Image />
          <Avatar.Fallback />
        </Avatar.Root>

        <Box flex="1">
          <Heading size="sm">Segun Adebayo</Heading>
          <Text>Creator, Chakra UI</Text>
        </Box>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<BsThreeDotsVertical />}
        />
      </HStack>
    </Card.Header>
    <Card.Body>
      <Text>
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>
    </Card.Body>
    <Image
      objectFit="cover"
      src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      alt="Chakra UI"
    />

    <Card.Footer justify="space-between">
      <Button flex="1" variant="ghost">
        <BiLike /> Like
      </Button>
      <Button flex="1" variant="ghost">
        <BiChat /> Comment
      </Button>
      <Button flex="1" variant="ghost">
        <BiShare /> Share
      </Button>
    </Card.Footer>
  </Card.Root>
)
