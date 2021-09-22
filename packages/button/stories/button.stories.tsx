import {
  ArrowForwardIcon,
  ChevronDownIcon,
  EmailIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons"
import { Container, HStack, Stack } from "@chakra-ui/layout"
import * as React from "react"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { MdBuild, MdCall } from "react-icons/md"
import { BeatLoader } from "react-spinners"
import { motion } from "framer-motion"
import { Button, ButtonGroup, IconButton } from "../src"

export default {
  title: "Button",
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

export const basic = () => (
  <>
    <Button colorScheme="gray">Button</Button>
    <Button colorScheme="red">Button</Button>
    <Button colorScheme="green">Button</Button>
    <Button colorScheme="blue">Button</Button>
    <Button colorScheme="teal">Button</Button>
    <Button colorScheme="pink">Button</Button>
    <Button colorScheme="purple">Button</Button>
    <Button colorScheme="cyan">Button</Button>
    <Button colorScheme="orange">Button</Button>
    <Button colorScheme="yellow">Button</Button>
  </>
)

export const outlines = () => (
  <>
    <Button variant="outline">
      Button
    </Button>
  </>
)

export const withVariants = () => (
  <HStack spacing="24px">
    <Button variant="solid">
      Button
    </Button>
    <Button variant="outline">
      Button
    </Button>
    <Button variant="ghost">
      Button
    </Button>
    <Button variant="link">
      Button
    </Button>
    <Button variant="unstyled">
      Button
    </Button>
  </HStack>
)

export const withSizes = () => (
  <HStack>
    <Button size="xs">
      Button
    </Button>
    <Button size="sm">
      Button
    </Button>
    <Button size="md">
      Button
    </Button>
    <Button size="lg">
      Button
    </Button>
  </HStack>
)

export const WithIcon = () => (
  <Stack direction="row" spacing={4}>
    <Button leftIcon={<EmailIcon />} variant="solid">
      Email
    </Button>
    <Button
      rightIcon={<ArrowForwardIcon />}
      variant="outline"
    >
      Call us
    </Button>
  </Stack>
)

export const withReactIcons = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button leftIcon={<MdBuild />} variant="solid">
      Settings
    </Button>
    <Button rightIcon={<MdCall />} variant="outline">
      Call us
    </Button>
  </Stack>
)

export const WithLoading = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button size="lg" isLoading>
      Email
    </Button>

    <Button
      isLoading
      colorScheme="blue"
      spinner={<BeatLoader size={8} />}
    >
      Click me
    </Button>

    <Button
      isLoading
      loadingText="Submitting..."
      variant="outline"
    >
      Submit
    </Button>
  </Stack>
)

export const WithLoadingSpinnerPlacement = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button
      isLoading
      loadingText="Loading"
      variant="outline"
      spinnerPosition="start"
    >
      Submit
    </Button>
    <Button
      isLoading
      loadingText="Loading"
      variant="outline"
      spinnerPlacement="end"
    >
      Continue
    </Button>
  </Stack>
)

export const withDisabled = () => (
  <HStack spacing="24px">
    <Button isDisabled variant="solid">
      Button
    </Button>
    <Button isDisabled variant="outline">
      Button
    </Button>
    <Button isDisabled variant="ghost">
      Button
    </Button>
    <Button isDisabled variant="link">
      Button
    </Button>
  </HStack>
)

export const customComposition = () => (
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

export const iconButton = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database" icon={<SearchIcon />} />

    <IconButton
      aria-label="Search database"
      icon={<SearchIcon />}
    />

    <IconButton aria-label="Call Segun" size="lg">
      <PhoneIcon />
    </IconButton>
  </Stack>
)

export const WithButtonGroup = () => (
  <ButtonGroup variant="outline">
    <Button>Save</Button>
    <Button colorScheme="gray">Cancel</Button>
  </ButtonGroup>
)

export const attachedButtons = () => (
  <ButtonGroup size="sm" isAttached variant="outline">
    <Button marginEnd="-px">Save</Button>
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<ChevronDownIcon />}
    />
  </ButtonGroup>
)

export const socialButton = () => (
  <Stack direction="row">
    <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
      Facebook
    </Button>
    <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
      Twitter
    </Button>
  </Stack>
)

const motionConfig = {
  initial: false,
  transition: {
    type: "spring",
    duration: 2,
    bounce: 0,
  },
}

const MotionButton = motion(Button)
const BG_GRADIENT_SOFT = `linear-gradient(to right, #fa8080, #F40000)`
const BG_GRADIENT_SOFT_REVERSED = `linear-gradient(to right, #F40000, #fa8080)`

export const WithMotion = () => {
  const [binary, setBinary] = React.useState(false)
  return (
    <>
      <Button onClick={() => setBinary((binary) => !binary)}>
        Toggle binary state: {String(binary)}
      </Button>
      <MotionButton
        {...motionConfig}
        animate={{
          scale: binary ? 1.2 : 1,
          backgroundImage: binary
            ? BG_GRADIENT_SOFT
            : BG_GRADIENT_SOFT_REVERSED,
        }}
      >
        ({String(binary)}) Doesn't work
      </MotionButton>
    </>
  )
}
