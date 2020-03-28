import React from "react"
import { Box, Flex, Spacer, Wrap } from ".."

export default {
  title: "Box",
}

export const basic = () => (
  <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
    Welcome to Box
  </Box>
)

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

export const wrap = () => (
  <Wrap spacing="32px" maxWidth="200px">
    <Box color="tomato">Box 1</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
  </Wrap>
)
