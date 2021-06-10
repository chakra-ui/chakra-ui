import { Center, chakra, Flex, Text } from "@chakra-ui/react"
import { getUrl } from "./get-url"

export const AdBanner = () => {
  return (
    <Center
      py="2"
      px="3"
      bgGradient="linear(to-r,cyan.700, purple.500)"
      color="white"
      textAlign="center"
    >
      <Flex align="center" fontSize="sm">
        <Text fontWeight="medium" maxW={{ base: "32ch", md: "unset" }}>
          Build faster with Premium Chakra UI Components{" "}
          <span role="img" aria-label="diamond">
            💎
          </span>
        </Text>
        <chakra.a
          flexShrink={0}
          href={getUrl("ad-banner")}
          ms="6"
          bg="blackAlpha.300"
          color="whiteAlpha.900"
          fontWeight="semibold"
          px="3"
          py="1"
          rounded="base"
        >
          Learn more{" "}
        </chakra.a>
      </Flex>
    </Center>
  )
}
