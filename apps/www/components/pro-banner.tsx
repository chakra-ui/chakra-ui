"use client"

import { docsConfig } from "@/docs.config"
import { Center, Flex, Text, chakra } from "@chakra-ui/react"

export const ProAdBanner = () => {
  return (
    <Center
      py="2"
      px="3"
      bgGradient="to-r"
      gradientFrom="teal.700"
      gradientTo="purple.500"
      color="white"
      textAlign="center"
    >
      <Flex align="center" textStyle="sm">
        <Text fontWeight="medium" maxW={{ base: "32ch", md: "unset" }}>
          Build faster with Premium Chakra UI Components 💎
        </Text>
        <chakra.a
          flexShrink={0}
          href={docsConfig.proUrl}
          ms="6"
          bg="blackAlpha.300"
          color="whiteAlpha.900"
          fontWeight="semibold"
          px="3"
          py="1"
          rounded="l2"
        >
          Learn more
        </chakra.a>
      </Flex>
    </Center>
  )
}
