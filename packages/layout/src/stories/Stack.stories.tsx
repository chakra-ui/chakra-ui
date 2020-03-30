import React from "react"
import { Box, Stack, StackDivider, Heading, Text } from ".."

export default {
  title: "Stack",
}

export const Vertical = () => (
  <Stack spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
)

export const Inline = () => (
  <Stack w="100%" bg="blue.500" direction="row">
    <Box boxSize="40px" bg={"#fff"} borderRadius="full" />
    <Box boxSize="40px" bg={"#fff"} borderRadius="full" />
    <Box boxSize="40px" bg={"#fff"} borderRadius="full" />
  </Stack>
)

export const Responsive = () => (
  <Stack direction={["column", "row"]} spacing="40px" w="100%">
    <Box w="100%" h="40px" bg="yellow.200">
      1
    </Box>
    <Box w="100%" h="40px" bg="tomato">
      2
    </Box>
    <Box w="100%" h="40px" bg="pink.100">
      3
    </Box>
  </Stack>
)

export const WithResponsiveDivider = () => (
  <Stack
    mt={10}
    direction={["column", "row"]}
    divider={<StackDivider borderColor="red.200" />}
    spacing={4}
  >
    <Box w="100%" h="40px" bg="yellow.200">
      1
    </Box>
    <Box w="100%" h="40px" bg="tomato">
      2
    </Box>
    <Box w="100%" h="40px" bg="pink.100">
      3
    </Box>
  </Stack>
)

export const WithDivider = () => (
  <>
    <Stack divider={<StackDivider />} spacing={4}>
      <Box w="100%" h="40px" bg="yellow.200">
        1
      </Box>
      <Box w="100%" h="40px" bg="tomato">
        2
      </Box>
      <Box w="100%" h="40px" bg="pink.100">
        3
      </Box>
    </Stack>

    <Stack mt={10} direction="row" divider={<StackDivider />} spacing={4}>
      <Box w="100%" h="40px" bg="yellow.200">
        1
      </Box>
      <Box w="100%" h="40px" bg="tomato">
        2
      </Box>
      <Box w="100%" h="40px" bg="pink.100">
        3
      </Box>
    </Stack>
  </>
)

function Feature({ title, children, ...rest }: any) {
  return (
    <Box
      padding={5}
      boxShadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      {...rest}
    >
      <Heading size="md">{title}</Heading>
      <Text mt={2}>{children}</Text>
    </Box>
  )
}

export const WithContent = () => (
  <Stack direction="row" spacing={8}>
    <Feature
      title="Plan Money"
      children="The future can be even brighter but a goal without a plan is just a wish"
    />
    <Feature
      title="Save Money"
      children="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
    />
  </Stack>
)
