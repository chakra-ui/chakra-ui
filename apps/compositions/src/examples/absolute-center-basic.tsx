import { AbsoluteCenter, Box } from "@chakra-ui/react"

export const AbsoluteCenterBasic = () => {
  return (
    <Box position="relative" h="100px" bg="bg.muted" borderRadius="md">
      <AbsoluteCenter>
        <Box bg="bg.emphasized" px="4" py="2" borderRadius="md" color="fg">
          Centered Content
        </Box>
      </AbsoluteCenter>
    </Box>
  )
}
