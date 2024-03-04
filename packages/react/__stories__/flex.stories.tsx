import { Box, Flex } from "../src"

export default {
  title: "Layout / Flex",
}

export const Vertical = () => (
  <Flex gap={4} direction="column">
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Flex>
)

export const Horizontal = () => (
  <Flex gap={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Flex>
)

export const VerticalWithMargin = () => (
  <Flex gap={4} direction="column">
    <Box boxSize="40px" bg="red" borderRadius="full" />
    <Box boxSize="40px" bg="red" borderRadius="full" />
    <Box boxSize="40px" bg="red" borderRadius="full" mt={4} />
  </Flex>
)
