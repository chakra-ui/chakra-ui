import { AbsoluteCenter, Box, HStack, Spinner, Text } from "@chakra-ui/react"

const Overlay = () => (
  <AbsoluteCenter bg="bg/80" backdropFilter="blur(2px)" rounded="md" p="4">
    <HStack gap="3">
      <Spinner size="sm" colorPalette="blue" />
      <Text fontSize="sm" color="fg.muted">
        Loading...
      </Text>
    </HStack>
  </AbsoluteCenter>
)

export const AbsoluteCenterWithOverlay = () => {
  return (
    <Box position="relative" h="120px" bg="bg.muted" rounded="md" p="10">
      <Box opacity="0.5" aria-busy="true">
        Some content that is being loaded...
      </Box>
      <Overlay />
    </Box>
  )
}
