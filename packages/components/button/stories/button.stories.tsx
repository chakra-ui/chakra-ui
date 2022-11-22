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
import { Meta, StoryFn } from "@storybook/react"
import { ThemingProps } from "@chakra-ui/system"
import { theme } from "@chakra-ui/theme"
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { pick } from "@chakra-ui/utils"
import { Button, ButtonGroup, IconButton } from "../src"

export default {
  title: "Components / Forms / Button",
  decorators: [
    (Story: any) => (
      <Container mt="40px" display="flex" flexWrap="wrap" gap="4">
        <Story />
      </Container>
    ),
  ],
} as Meta

interface StoryProps extends ThemingProps<"Button"> {
  children?: React.ReactNode
}

export const basic: StoryFn<StoryProps> = (props) => <Button {...props} />
basic.argTypes = {
  ...getThemingArgTypes(theme, "Button"),
  children: { type: "string" },
}
basic.args = {
  children: "Button",
}

export const outlines: StoryFn<StoryProps> = (props) => (
  <>
    <Button {...props} variant="outline" colorScheme="red" />
    <Button {...props} variant="outline" colorScheme="green" />
    <Button {...props} variant="outline" colorScheme="blue" />
    <Button {...props} variant="outline" colorScheme="teal" />
    <Button {...props} variant="outline" colorScheme="pink" />
    <Button {...props} variant="outline" colorScheme="purple" />
    <Button {...props} variant="outline" colorScheme="cyan" />
    <Button {...props} variant="outline" colorScheme="orange" />
    <Button {...props} variant="outline" colorScheme="yellow" />
  </>
)
outlines.argTypes = {
  ...pick(getThemingArgTypes(theme, "Button") ?? {}, ["size"]),
  children: { type: "string" },
}
outlines.args = {
  children: "Button",
}

export const WithVariants = () => (
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

export const WithSizes = () => (
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

export const WithReactIcons = () => (
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
      spinnerPlacement="start"
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

export const WithDisabled = () => (
  <HStack spacing="24px">
    <Button as="div" isDisabled colorScheme="teal" variant="solid">
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

export const CustomComposition = () => (
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

export const WithHorizontalAttachedButtons = () => (
  <ButtonGroup size="sm" isAttached variant="outline">
    <Button>Save</Button>
    <Button>Cancel</Button>
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<ChevronDownIcon />}
    />
  </ButtonGroup>
)

export const WithVerticalAttachedButtons = () => (
  <ButtonGroup size="lg" orientation="vertical" isAttached variant="outline">
    <IconButton fontSize="2xl" aria-label="Email Santa" icon={<EmailIcon />} />
    <IconButton
      fontSize="2xl"
      aria-label="Call the Grinch"
      icon={<PhoneIcon />}
    />
    <IconButton
      fontSize="2xl"
      aria-label="Add to friends"
      icon={<ChevronDownIcon />}
    />
  </ButtonGroup>
)

export const WithSocialButton = () => (
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
