import { Flex, Text } from "@chakra-ui/react"

export const TextWithTruncate = () => {
  return (
    <Flex maxW="300px">
      <Text truncate>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    </Flex>
  )
}
