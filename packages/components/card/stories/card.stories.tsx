import { Avatar } from "@chakra-ui/avatar"
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import {
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { BiChat, BiLike, BiShare } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Card, CardBody, CardFooter, CardHeader } from "../src"

export default {
  title: "Components / Data Display / Card",
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
      <Card key={variant} variant={variant}>
        <CardHeader>
          <Heading size="md"> {variant}</Heading>
        </CardHeader>
        <CardBody>
          <Text>variant = {variant}</Text>
        </CardBody>
      </Card>
    ))}
  </Stack>
)

export const Sizes = () => (
  <Stack spacing="4">
    {["sm", "md", "lg"].map((size) => (
      <Card key={size} size={size}>
        <CardHeader>
          <Heading size="md"> {size}</Heading>
        </CardHeader>
        <CardBody>
          <Text>size = {size}</Text>
        </CardBody>
      </Card>
    ))}
  </Stack>
)

export const Basic = () => (
  <Card>
    <CardHeader>
      <Heading size="md"> Customer dashboard</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
  </Card>
)

export const WithDivider = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Client Report</Heading>
    </CardHeader>

    <CardBody>
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
    </CardBody>
  </Card>
)

export const WithImage = () => (
  <Card maxW="sm">
    <CardBody>
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
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing="2">
        <Button variant="solid" colorScheme="blue">
          Buy now
        </Button>
        <Button variant="ghost" colorScheme="blue">
          Add to cart
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
)

export const HorizontalCard = () => (
  <Card direction="row" overflow="hidden" variant="outline">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Stack>
      <CardBody>
        <Heading size="md">The perfect latte</Heading>
        <Text py="2">
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="solid" colorScheme="blue">
          Buy Latte
        </Button>
      </CardFooter>
    </Stack>
  </Card>
)

export const Advanced = () => (
  <Card maxW="md">
    <CardHeader>
      <HStack spacing="4">
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

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
    </CardHeader>
    <CardBody>
      <Text>
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>
    </CardBody>
    <Image
      objectFit="cover"
      src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      alt="Chakra UI"
    />

    <CardFooter justify="space-between">
      <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
        Like
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
        Comment
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
        Share
      </Button>
    </CardFooter>
  </Card>
)
