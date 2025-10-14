import { Box, SkipNavContent, SkipNavLink, Text } from "@chakra-ui/react"

export const SkipNavBasic = () => {
  return (
    <Box>
      <SkipNavLink>Skip to Content</SkipNavLink>

      {/* Simulated navigation */}
      <Box p="4" bg="gray.100" borderRadius="md" mb="4">
        <Text fontWeight="medium" mb="2">
          Navigation
        </Text>
        <Text fontSize="sm" color="gray.600">
          This represents a navigation area that users might want to skip over.
        </Text>
      </Box>

      {/* Main content area */}
      <SkipNavContent>
        <Box p="4" bg="blue.50" borderRadius="md">
          <Text fontWeight="medium" mb="2">
            Main Content
          </Text>
          <Text fontSize="sm">
            This is the main content area. When users press Tab and then Enter
            on the "Skip to Content" link, focus will jump directly here,
            bypassing the navigation.
          </Text>
        </Box>
      </SkipNavContent>
    </Box>
  )
}
