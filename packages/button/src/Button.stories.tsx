import { AddIcon } from "@chakra-ui/icons"
import { Stack } from "@chakra-ui/layout"
import * as React from "react"
import { Button } from "."

export default {
  title: "Button",
}

export const Variants = () => (
  <Stack direction="row" spacing="24px">
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

export const Sizes = () => (
  <Stack direction="row">
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

export const WithCustomIcon = () => <Button leftIcon={AddIcon}>Call Us</Button>

export const WithLoading = () => (
  <Button colorScheme="pink" isLoading loadingText="Loading...">
    Pink Button
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
