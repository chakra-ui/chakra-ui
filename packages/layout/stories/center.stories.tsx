import * as React from "react"
import { Box, Center } from "../src"
import { FaPhone } from "react-icons/fa"

export default {
  title: "Center",
}

export const basic = () => (
  <Center bg="#da3d6929" w="400px" h="400px">
    <Box p="40px" bg="green.600">
      Box
    </Box>
  </Center>
)

export const iconWithFrame = () => (
  <Center bg="green.500" color="white" boxSize="40px" borderRadius="full">
    <FaPhone />
  </Center>
)
