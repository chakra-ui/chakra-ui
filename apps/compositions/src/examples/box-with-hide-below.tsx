import { HStack } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const BoxWithHideBelow = () => (
  <HStack>
    <DecorativeBox bg="green.300" hideBelow="md" height="40px" flex="1" />
    <DecorativeBox height="40px" flex="1" />
  </HStack>
)
