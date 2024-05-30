import { Box, Circle, Flex, HStack, Square, Stack } from "../src"
import { DecorativeBox } from "./shared/decorative-box"

export default {
  title: "Layout / Box",
}

export const basic = () => (
  <Box>
    <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
      Welcome to Box
    </Box>
    <Box
      position="relative"
      bg="red.400"
      _before={{
        height: 0,
        content: `""`,
        display: "block",
        paddingBottom: ["40px", "100px"],
      }}
    />
  </Box>
)

export const stacked = () => (
  <Stack align="flex-start">
    <Flex display="inline-flex" direction="row" spaceX="-2">
      <Circle size="10" bg="red">
        1
      </Circle>
      <Circle size="10" bg="pink">
        2
      </Circle>
      <Circle size="10" bg="green">
        3
      </Circle>
    </Flex>
    <Flex
      display="inline-flex"
      direction="row-reverse"
      spaceX="-2"
      spaceXReverse
    >
      <Circle size="10" bg="red">
        1
      </Circle>
      <Circle size="10" bg="pink">
        2
      </Circle>
      <Circle size="10" bg="green">
        3
      </Circle>
    </Flex>
  </Stack>
)

export const square = () => (
  <Square bg="red.300" size={["40px", "60px", "100px"]}>
    <Circle size="60px" bg="tomato" color="white">
      Bee
    </Circle>
  </Square>
)

export const HideBelow = () => (
  <HStack>
    <DecorativeBox bg="green.300" hideBelow="md" height="40px" flex="1" />
    <DecorativeBox height="40px" flex="1" />
  </HStack>
)

export const HideFrom = () => (
  <HStack>
    <DecorativeBox bg="green.300" hideFrom="md" height="40px" flex="1" />
    <DecorativeBox height="40px" flex="1" />
  </HStack>
)
