import {
  Box,
  Button,
  Container,
  Group,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"

export default function Page() {
  return (
    <Container py="20">
      <Box maxW="2xl">
        <Stack gap="5">
          <Heading size="4xl">
            Chakra UI is a component system for building products with speed
          </Heading>
          <Text>
            Beautiful, accessible, React components for high-quality web apps
            and design systems.
          </Text>
        </Stack>
        <Group mt="8">
          <Button asChild colorPalette="teal">
            <Link href="/docs/get-started/overview/installation">
              Start Building
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/get-started/overview/installation">
              Get Started
            </Link>
          </Button>
        </Group>
      </Box>
    </Container>
  )
}
