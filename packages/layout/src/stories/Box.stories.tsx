import { PropsOf } from "@chakra-ui/system"
import React from "react"
import Box from "../Box"
import Flex from "../Flex"
import Spacer from "../Spacer"
import Inline from "../Inline"

export default {
  title: "Box",
}

export const Basic = () => (
  <Box color="tomato" _hover={{ bg: "red.500", color: "white" }}>
    Welcome to Box
  </Box>
)

export const PropAndGeneric = () => (
  <Box<PropsOf<"img">>
    borderRadius="sm"
    as="img"
    _hover={{ borderRadius: "md" }}
    margin={[3, 4]}
    src="https://avatars3.githubusercontent.com/u/14854048?s=180&v=4"
  />
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
