import * as React from "react"
import { Box, Flex, Spacer, Stack, Kbd, Square, Circle } from "../src"

export default {
  title: "Box",
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

export const kbd = () => <Kbd>Ctrl + L</Kbd>

export const spacer = () => (
  <Flex color="white" direction={{ base: "column", md: "row" }}>
    <Box bg="pink.500" boxSize="100px">
      Box 1
    </Box>
    <Spacer />
    <Box bg="green.500" boxSize="100px">
      Box 2
    </Box>
  </Flex>
)

export const square = () => (
  <Square bg="red.300" size={["40px", "60px", "100px"]}>
    <Circle size="60px" bg="tomato" color="white">
      Bee
    </Circle>
  </Square>
)
