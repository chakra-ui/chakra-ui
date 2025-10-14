import {
  Box,
  Heading,
  SkipNavContent,
  SkipNavLink,
  Text,
  VStack,
} from "@chakra-ui/react"

export const SkipNavWithContent = () => {
  return (
    <Box>
      <SkipNavLink>Skip to Content</SkipNavLink>

      {/* Simulated header with multiple navigation items */}
      <Box p="4" bg="gray.100" borderRadius="md" mb="4">
        <Text fontWeight="medium" mb="2">
          Site Header
        </Text>
        <VStack align="start" gap="1">
          <Text fontSize="sm" color="gray.600">
            • Home
          </Text>
          <Text fontSize="sm" color="gray.600">
            • About
          </Text>
          <Text fontSize="sm" color="gray.600">
            • Services
          </Text>
          <Text fontSize="sm" color="gray.600">
            • Contact
          </Text>
        </VStack>
      </Box>

      {/* SkipNavContent wrapping main content */}
      <SkipNavContent>
        <Box p="6" bg="purple.50" borderRadius="md">
          <Heading size="lg" mb="4">
            Welcome to Our Site
          </Heading>

          <VStack align="start" gap="4">
            <Text>
              This is the main content area. The SkipNavContent component wraps
              this entire section, making it the target for the skip navigation
              link.
            </Text>

            <Text>
              When keyboard users press Tab to focus the "Skip to Content" link
              and then press Enter, focus will jump directly to this content
              area, bypassing all the navigation items above.
            </Text>

            <Text fontSize="sm" color="purple.600">
              This is especially helpful for users with screen readers or those
              who navigate primarily with keyboards.
            </Text>
          </VStack>
        </Box>
      </SkipNavContent>
    </Box>
  )
}
