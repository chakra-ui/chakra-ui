import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons"
import { MdBuild, MdCall } from "react-icons/md"
import { Stack, Container } from "@chakra-ui/layout"
import * as React from "react"
import "focus-visible/dist/focus-visible"
import { BeatLoader } from "react-spinners"
import { Button } from "."

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

export const basic = () => <Button colorScheme="green">Button</Button>

export const withVariants = () => (
  <Stack direction="row" spacing="24px" align="center">
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
  </Stack>
)

export const withSizes = () => (
  <Stack direction="row" align="center">
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
  </Stack>
)

export const WithIcon = () => (
  <Stack direction="row" spacing={4} align="center">
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
    <Button isLoading colorScheme="teal">
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

// export const WithButtonGroup = () => (
//   <ButtonGroup variant="solid">
//     <Button colorScheme="green">Save</Button>
//     <Button variant="outline">Cancel</Button>
//   </ButtonGroup>
// )

// export const iconButton = () => (
//   <ButtonGroup>
//     <IconButton fontSize="24px" aria-label="Add to friends" icon={AddIcon} />
//     <IconButton aria-label="Call us now" isRound icon={PhoneIcon} />
//   </ButtonGroup>
// )
