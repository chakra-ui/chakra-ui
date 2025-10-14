import { Box, SkipNavContent, SkipNavLink, Text } from "@chakra-ui/react"

export const SkipNavCustomId = () => {
  return (
    <Box>
      <SkipNavLink id="main-content">Skip to Main Content</SkipNavLink>

      {/* Simulated header and navigation */}
      <Box p="4" bg="gray.100" borderRadius="md" mb="4">
        <Text fontWeight="medium" mb="2">
          Header & Navigation
        </Text>
        <Text fontSize="sm" color="gray.600">
          This example uses a custom ID "main-content" for both components to
          ensure they match.
        </Text>
      </Box>

      {/* Main content area with custom ID */}
      <SkipNavContent id="main-content">
        <Box p="4" bg="green.50" borderRadius="md">
          <Text fontWeight="medium" mb="2">
            Main Content (Custom ID)
          </Text>
          <Text fontSize="sm">
            Both the SkipNavLink and SkipNavContent use the same custom ID
            "main-content" to ensure proper linking and focus management.
          </Text>
        </Box>
      </SkipNavContent>
    </Box>
  )
}
