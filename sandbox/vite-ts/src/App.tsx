import { Box, Button, HStack, Heading, Stack, chakra } from "@chakra-ui/react"

export default function Page() {
  return (
    <Box p="8">
      <Stack gap="4">
        <Heading size="2xl">Chakra v4 · Panda engine (zero Emotion)</Heading>
        <chakra.div mt="4" bg="red.500" color="white" p="4" borderRadius="lg">
          styled via panda
        </chakra.div>
        <HStack gap="3">
          <Button variant="solid" colorPalette="teal">
            solid teal
          </Button>
          <Button variant="outline" colorPalette="red">
            outline red
          </Button>
          <Button variant="subtle" size="sm">
            subtle sm
          </Button>
        </HStack>
        <HStack gap="3">
          <chakra.span
            px="3"
            py="1"
            bg="teal.500"
            color="white"
            borderRadius="md"
          >
            a
          </chakra.span>
          <chakra.span
            px="3"
            py="1"
            bg="blue.500"
            color="white"
            borderRadius="md"
          >
            b
          </chakra.span>
        </HStack>
      </Stack>
    </Box>
  )
}
