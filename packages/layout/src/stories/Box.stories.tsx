import React from "react"
import { Box, Flex, Spacer, Inline } from ".."

export default {
  title: "Box",
}

export const Basic = () => (
  <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
    Welcome to Box
  </Box>
)

export const FlexSpacer = () => (
  <Flex size="500px" direction={{ base: "column", md: "row" }}>
    <Box color="tomato">Box 1</Box>
    <Spacer />
    <Box color="yellow.200">Box 2</Box>
  </Flex>
)

export const Cluster = () => (
  <Inline spacing="32px" maxWidth="200px">
    <Box color="tomato">Box 1</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
    <Box color="yellow.200">Box 2</Box>
  </Inline>
)
