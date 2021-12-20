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
  title: "Components / Forms / Button",
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
    <Button variant="outline" colorScheme="red">
      Button
    </Button>
    <Button variant="outline" colorScheme="green">
      Button
    </Button>
    <Button variant="outline" colorScheme="blue">
      Button
    </Button>
    <Button variant="outline" colorScheme="teal">
      Button
    </Button>
    <Button variant="outline" colorScheme="pink">
      Button
    </Button>
    <Button variant="outline" colorScheme="purple">
      Button
    </Button>
    <Button variant="outline" colorScheme="cyan">
      Button
    </Button>
    <Button variant="outline" colorScheme="orange">
      Button
    </Button>
    <Button variant="outline" colorScheme="yellow">
      Button
    </Button>
  </>
)

export const withVariants = () => (
  <HStack spacing="24px">
    <Button colorScheme="teal" variant="solid">
      Button
    </Button>
    <Button colorScheme="teal" variant="outline">
      Button
    </Button>
    <Button colorScheme="teal" variant="ghost">
      Button
    </Button>
    <Button colorScheme="teal" variant="link">
      Button
    </Button>
    <Button colorScheme="teal" variant="unstyled">
      Button
    </Button>
  </HStack>
)

export const withSizes = () => (
  <HStack>
    <Button colorScheme="blue" size="xs">
      Button
    </Button>
    <Button colorScheme="blue" size="sm">
      Button
    </Button>
    <Button colorScheme="blue" size="md">
      Button
    </Button>
    <Button colorScheme="blue" size="lg">
      Button
    </Button>
  </HStack>
)

export const WithIcon = () => (
  <Stack direction="row" spacing={4}>
    <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
      Email
    </Button>
    <Button
      rightIcon={<ArrowForwardIcon />}
      colorScheme="teal"
      variant="outline"
    >
      Call us
    </Button>
  </Stack>
)

export const withReactIcons = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button leftIcon={<MdBuild />} colorScheme="pink" variant="solid">
      Settings
    </Button>
    <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
      Call us
    </Button>
  </Stack>
)

export const WithLoading = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button size="lg" isLoading colorScheme="teal">
      Email
    </Button>

    <Button
      isLoading
      colorScheme="blue"
      spinner={<BeatLoader size={8} color="white" />}
    >
      Click me
    </Button>

    <Button
      isLoading
      loadingText="Submitting..."
      colorScheme="teal"
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
      colorScheme="teal"
      variant="outline"
      spinnerPosition="start"
    >
      Submit
    </Button>
    <Button
      isLoading
      loadingText="Loading"
      colorScheme="teal"
      variant="outline"
      spinnerPlacement="end"
    >
      Continue
    </Button>
  </Stack>
)

export const withDisabled = () => (
  <HStack spacing="24px">
    <Button isDisabled colorScheme="teal" variant="solid">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="outline">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="ghost">
      Button
    </Button>
    <Button isDisabled colorScheme="teal" variant="link">
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
      colorScheme="blue"
      aria-label="Search database"
      icon={<SearchIcon />}
    />

    <IconButton colorScheme="teal" aria-label="Call Segun" size="lg">
      <PhoneIcon />
    </IconButton>
  </Stack>
)

export const WithButtonGroup = () => (
  <ButtonGroup variant="outline">
    <Button colorScheme="blue">Save</Button>
    <Button>Cancel</Button>
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
