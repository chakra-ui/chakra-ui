import { Box, Flex, Spacer } from "@chakra-ui/react"

export const FlexWithSpacer = () => {
  return (
    <Flex>
      <Box p="4" bg="red.400" color="white">
        Box 1
      </Box>
      <Spacer />
      <Box p="4" bg="green.400" color="white">
        Box 2
      </Box>
    </Flex>
  )
}
