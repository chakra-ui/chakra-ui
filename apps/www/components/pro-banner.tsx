"use client"

import { docsConfig } from "@/docs.config"
import { Center, Flex, Text, chakra } from "@chakra-ui/react"

export const BlackFridaySaleBanner = () => {
  return (
    <Center
      py="2"
      px="3"
      bgGradient="to-r"
      gradientVia="gray.900"
      gradientFrom="gray.700"
      gradientTo="gray.700"
      color="white"
      textAlign={{ base: "start", md: "center" }}
    >
      <Flex align="center" textStyle="sm">
        <Text fontWeight="medium" maxW={{ base: "32ch", md: "unset" }}>
          🎉 Black Friday Sale: Over 30% off Premium Chakra UI Components
        </Text>
        <chakra.a
          flexShrink={0}
          href={docsConfig.proUrl}
          ms="6"
          bg="purple.500"
          color="white"
          fontWeight="medium"
          px="3"
          py="1"
          rounded="l2"
          _hover={{ bg: "purple.600" }}
        >
          Shop Now
        </chakra.a>
      </Flex>
    </Center>
  )
}

export const ProAdBanner = () => {
  return (
    <Center
      py="2"
      px="3"
      bgGradient="to-r"
      gradientFrom="teal.700"
      gradientTo="purple.500"
      color="white"
      textAlign={{ base: "start", md: "center" }}
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
          fontWeight="medium"
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
