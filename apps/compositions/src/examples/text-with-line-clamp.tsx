import { Flex, Text } from "@chakra-ui/react"

export const TextWithLineClamp = () => {
  return (
    <Flex maxW="300px">
      <Text lineClamp="2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </Flex>
  )
}
