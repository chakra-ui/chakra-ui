import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <Box textAlign="center" pt="20vh">
      <VStack gap="4">
        <Heading size="2xl" letterSpacing="tight">
          About
        </Heading>
        <Text fontSize="lg" color="fg.muted">
          This is a sandbox for testing Chakra UI v3 with TanStack Router.
        </Text>
      </VStack>
    </Box>
  )
}
