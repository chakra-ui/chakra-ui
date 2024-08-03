import { Box, Circle, Float } from "@chakra-ui/react"

export const FloatWithOffsetX = () => (
  <Box position="relative" w="80px" h="80px" bg="bg.emphasized">
    <Float offsetX="-4">
      <Circle size="5" bg="red" color="white">
        3
      </Circle>
    </Float>
  </Box>
)
