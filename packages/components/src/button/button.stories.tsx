import { ThemingProps } from "@chakra-ui/styled-system"
import { Meta, StoryFn } from "@storybook/react"
import * as React from "react"
import {
  FaArrowRight,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaSearch,
} from "react-icons/fa"
import { MdBuild, MdCall } from "react-icons/md"
import { BeatLoader } from "react-spinners"
import { Button, ButtonGroup } from "."
import {
  AbsoluteCenter,
  Container,
  For,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Span,
} from ".."

export default {
  title: "Form / Button",
  decorators: [
    (Story: any) => (
      <Container mt="40px" display="flex" flexWrap="wrap" gap="4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    children: { type: "string" },
  },
  args: {
    children: "Button",
  },
} satisfies Meta

interface StoryProps extends ThemingProps<"Button"> {
  children?: React.ReactNode
}

export const Basic: StoryFn<StoryProps> = (props) => <Button {...props} />

const colorSchemes = [
  "red",
  "green",
  "blue",
  "teal",
  "pink",
  "purple",
  "cyan",
  "orange",
  "yellow",
] as const

const buttonVariants = [
  "solid",
  "outline",
  "ghost",
  "link",
  "unstyled",
] as const

const buttonSizes = ["xs", "sm", "md", "lg"] as const

export const OutlineVariants: StoryFn<StoryProps> = (props) => (
  <For each={colorSchemes}>
    {(colorScheme) => (
      <Button {...props} variant="outline" colorScheme={colorScheme} />
    )}
  </For>
)

export const WithVariants = () => (
  <HStack spacing="24px">
    <For each={buttonVariants}>
      {(variant) => (
        <Button colorScheme="teal" variant={variant}>
          Button
        </Button>
      )}
    </For>
  </HStack>
)

export const WithSizes = () => (
  <HStack>
    <For each={buttonSizes}>
      {(size) => (
        <Button colorScheme="blue" size={size}>
          Button
        </Button>
      )}
    </For>
  </HStack>
)

export const WithIcon = () => (
  <Stack direction="row" spacing={4}>
    <Button colorScheme="teal" variant="solid">
      <FaEnvelope />
      Email
    </Button>
    <Button colorScheme="teal" variant="outline">
      Call us
      <FaArrowRight />
    </Button>
  </Stack>
)

export const WithReactIcons = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button colorScheme="pink" variant="solid">
      <MdBuild /> Settings
    </Button>
    <Button colorScheme="blue" variant="outline">
      <MdCall /> Call us
    </Button>
  </Stack>
)

export const WithLoading = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button isDisabled colorScheme="teal">
      <Spinner boxSize="1em" />
    </Button>

    <Button isDisabled colorScheme="blue">
      <AbsoluteCenter>
        <BeatLoader size={8} color="white" />
      </AbsoluteCenter>
      <Span opacity="0">Click me</Span>
    </Button>
  </Stack>
)

export const WithSpinnerPlacements = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button isDisabled colorScheme="teal" variant="outline">
      <Spinner boxSize="1em" /> Loading
    </Button>
    <Button isDisabled colorScheme="teal" variant="outline">
      Loading <Spinner boxSize="1em" />
    </Button>
  </Stack>
)

export const WithDisabled = () => (
  <HStack spacing="24px">
    <For each={buttonVariants}>
      {(variant) => (
        <Button isDisabled colorScheme="teal" variant={variant}>
          Button
        </Button>
      )}
    </For>
  </HStack>
)

export const WithStyleOverrides = () => (
  <Button
    size="md"
    height="48px"
    width="200px"
    border="2px solid"
    borderColor="green.500"
  >
    Button
  </Button>
)

export const WithButtonGroup = () => (
  <ButtonGroup variant="outline">
    <Button colorScheme="blue">Save</Button>
    <Button>Cancel</Button>
  </ButtonGroup>
)

export const WithHorizontalAttachedButtons = () => (
  <ButtonGroup size="sm" isAttached variant="outline">
    <Button>Save</Button>
    <Button>Cancel</Button>
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<FaChevronDown />}
    />
  </ButtonGroup>
)

export const iconButton = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database" icon={<FaSearch />} />

    <IconButton
      colorScheme="blue"
      aria-label="Search database"
      icon={<FaSearch />}
    />

    <IconButton colorScheme="teal" aria-label="Call Segun" size="lg">
      <FaPhone />
    </IconButton>
  </Stack>
)

export const WithVerticalAttachedButtons = () => (
  <ButtonGroup size="lg" orientation="vertical" isAttached variant="outline">
    <IconButton fontSize="2xl" aria-label="Email Santa" icon={<FaEnvelope />} />
    <IconButton
      fontSize="2xl"
      aria-label="Call the Grinch"
      icon={<FaPhone />}
    />
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<FaChevronDown />}
    />
  </ButtonGroup>
)
