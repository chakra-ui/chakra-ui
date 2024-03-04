import { Box, Divider, Heading, Stack, StackDivider, Text } from "../src"

export default {
  title: "Layout / Stack",
}

export const Vertical = () => (
  <Stack spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Stack>
)

export const Horizontal = () => (
  <Stack w="100%" bg="blue.500" direction="row">
    <Box boxSize="40px" bg="white" borderRadius="full" />
    <Box boxSize="40px" bg="white" borderRadius="full" />
    <Box boxSize="40px" bg="white" borderRadius="full" />
  </Stack>
)

export const WithCustomDivider = () => (
  <Stack spacing="40px" divider={<Divider css={{ borderColor: "red.200" }} />}>
    <Box>1</Box>
    <Box>2</Box>
    <Box>3</Box>
  </Stack>
)

export const WithResponsiveDirection = () => (
  <Stack direction={["column", "row"]} spacing="40px" w="100%">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </Stack>
)

export const WithResponsiveDivider = () => (
  <Stack
    mt={10}
    direction={["column", "row"]}
    divider={
      <StackDivider borderColor={{ base: "green.500", md: "red.200" }} />
    }
    spacing={4}
  >
    <Box flex="1" w={["100%", "40px"]} h="40px" bg="yellow.200">
      1
    </Box>
    <Box flex="1" w={["100%", "40px"]} h="40px" bg="tomato">
      2
    </Box>
    <Box flex="1" w={["100%", "40px"]} h="40px" bg="pink.100">
      3
    </Box>
  </Stack>
)

export const WithDivider = () => (
  <>
    <Stack divider={<StackDivider />} spacing={4}>
      <Box boxSize="40px" bg="yellow.200">
        1
      </Box>
      <Box boxSize="40px" bg="tomato">
        2
      </Box>
      <Box boxSize="40px" bg="pink.100">
        3
      </Box>
    </Stack>

    <Stack mt={10} direction="row" divider={<StackDivider />} spacing={4}>
      <Box boxSize="40px" bg="yellow.200">
        1
      </Box>
      <Box boxSize="40px" bg="tomato">
        2
      </Box>
      <Box boxSize="40px" bg="pink.100">
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

export const WrappingChildren = () => (
  <Stack shouldWrapChildren>
    <Box>foo</Box>
    <Box>bar</Box>
    <Box>baz</Box>
  </Stack>
)

export const WithFullResponsive = () => (
  <Stack
    spacing={["10px", "60px"]}
    divider={<StackDivider borderColor="gray.200" />}
    direction={["column", "row"]}
  >
    <Box bgColor="red.500">First</Box>
    <Box bgColor="blue.500">Second</Box>
    <Box bgColor="yellow.500">Third</Box>
  </Stack>
)
