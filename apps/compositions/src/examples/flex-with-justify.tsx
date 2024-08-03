import { Flex } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const FlexWithJustify = () => {
  return (
    <Flex direction="column" gap="8">
      <Flex gap="4" justify="flex-start">
        <DecorativeBox height="10" width="120px" />
        <DecorativeBox height="10" width="120px">
          flex-start
        </DecorativeBox>
        <DecorativeBox height="10" width="120px" />
      </Flex>

      <Flex gap="4" justify="center">
        <DecorativeBox height="10" width="120px" />
        <DecorativeBox height="10" width="120px">
          center
        </DecorativeBox>
        <DecorativeBox height="10" width="120px" />
      </Flex>

      <Flex gap="4" justify="flex-end">
        <DecorativeBox height="10" width="120px" />
        <DecorativeBox height="10" width="120px">
          flex-end
        </DecorativeBox>
        <DecorativeBox height="10" width="120px" />
      </Flex>

      <Flex gap="4" justify="space-between">
        <DecorativeBox height="10" width="120px" />
        <DecorativeBox height="10" width="120px">
          space-between
        </DecorativeBox>
        <DecorativeBox height="10" width="120px" />
      </Flex>
    </Flex>
  )
}
