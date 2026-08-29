import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  chakra,
} from "@chakra-ui/react"

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
        <Flex justify="space-between" bg="gray.100" p="3" borderRadius="md">
          <chakra.span>left</chakra.span>
          <chakra.span>right</chakra.span>
        </Flex>
        <Center bg="purple.500" color="white" h="16" borderRadius="md">
          centered
        </Center>
        <Card.Root>
          <Card.Header>
            <Card.Title>Slot recipe</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description>
              Card is a slot recipe via Panda's generated
              createSlotRecipeContext
            </Card.Description>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  )
}
