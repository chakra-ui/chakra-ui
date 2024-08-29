import { Box, Center, Heading, Spinner, Text } from "@chakra-ui/react"

export const SpinnerWithOverlay = () => {
  return (
    <Box position="relative" aria-busy="true" userSelect="none">
      <Heading>Some heading text</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
        consectetur libero, id ultricies urna. Sed ac consectetur libero, id
        fames ac ante ipsum primis in faucibus.
      </Text>
      <Box pos="absolute" inset="0" bg="bg/80">
        <Center h="full">
          <Spinner color="teal.500" />
        </Center>
      </Box>
    </Box>
  )
}
