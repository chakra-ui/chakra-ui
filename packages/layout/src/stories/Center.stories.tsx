import React from "react"
import { Box, Center } from ".."

export default {
  title: "Center",
}

// Container (marginX: auto, max-width: 800px, paddingX: 20px)

export const flex = () => (
  <Center bg="#da3d6929" w="400px" h="400px">
    <Box p="40px" bg="green.600">
      Box
    </Box>
  </Center>
)
