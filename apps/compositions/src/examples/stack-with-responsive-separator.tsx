import { Stack, StackSeparator } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const StackWithResponsiveSeparator = () => (
  <Stack
    mt={10}
    direction={["column", "row"]}
    separator={
      <StackSeparator borderColor={{ base: "green.500", md: "red.200" }} />
    }
    gap={4}
  >
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      1
    </DecorativeBox>
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      2
    </DecorativeBox>
    <DecorativeBox flex="1" w={["100%", "40px"]} h="40px">
      3
    </DecorativeBox>
  </Stack>
)
