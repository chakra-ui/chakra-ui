import { Flex } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const FlexWithOrder = () => {
  return (
    <Flex gap="4">
      <DecorativeBox height="10" order="1">
        1
      </DecorativeBox>
      <DecorativeBox height="10" order="3">
        2
      </DecorativeBox>
      <DecorativeBox height="10" order="2">
        3
      </DecorativeBox>
    </Flex>
  )
}
