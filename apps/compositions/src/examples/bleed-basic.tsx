import { Bleed, Box, Heading, Stack, Text } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const BleedBasic = () => {
  return (
    <Box padding="10" rounded="sm" borderWidth="1px">
      <Bleed inline="10">
        <DecorativeBox height="20">Bleed</DecorativeBox>
      </Bleed>

      <Stack mt="6">
        <Heading size="md">Some Heading</Heading>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </Stack>
    </Box>
  )
}
