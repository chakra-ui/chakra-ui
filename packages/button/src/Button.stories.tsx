import { AddIcon } from "@chakra-ui/icons"
import { Stack } from "@chakra-ui/layout"
import * as React from "react"
import { Button } from "."

export default {
  title: "Button",
}

export const Variants = () => (
  <Stack direction="row" spacing="24px">
    <Button variantColor="teal" variant="solid">
      Button
    </Button>
    <Button variantColor="teal" variant="outline">
      Button
    </Button>
    <Button variantColor="teal" variant="ghost">
      Button
    </Button>
    <Button variantColor="teal" variant="link">
      Button
    </Button>
  </Stack>
)

export const Sizes = () => (
  <Stack direction="row">
    <Button variantColor="blue" variantSize="xs">
      Button
    </Button>
    <Button variantColor="blue" variantSize="sm">
      Button
    </Button>
    <Button variantColor="blue" variantSize="md">
      Button
    </Button>
    <Button variantColor="blue" variantSize="lg">
      Button
    </Button>
  </Stack>
)

export const WithCustomIcon = () => <Button leftIcon={AddIcon}>Call Us</Button>

export const WithLoading = () => (
  <Button variantColor="pink" isLoading loadingText="Loading...">
    Pink Button
  </Button>
)

// export const WithButtonGroup = () => (
//   <ButtonGroup variant="solid">
//     <Button variantColor="green">Save</Button>
//     <Button variant="outline">Cancel</Button>
//   </ButtonGroup>
// )

// export const iconButton = () => (
//   <ButtonGroup>
//     <IconButton fontSize="24px" aria-label="Add to friends" icon={AddIcon} />
//     <IconButton aria-label="Call us now" isRound icon={PhoneIcon} />
//   </ButtonGroup>
// )
