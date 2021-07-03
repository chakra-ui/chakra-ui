import { Badge, Box, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import Container from "components/container"
import NextImage from "next/image"
import * as React from "react"
import { FiArrowRight } from "react-icons/fi"
import { getUrl } from "./get-url"

export const ChakraProAd = () => (
  <Box as="section" bg="gray.900" color="white" overflow="hidden">
    <Container pt="24" pb="0">
      <Flex align="center" direction="column" textAlign="center" mb="10">
        <Text casing="uppercase" letterSpacing="wide" fontWeight="bold">
          Premium components{" "}
          <Badge
            colorScheme="yellow"
            variant="solid"
            color="gray.800"
            mt="-1"
            ml="2"
          >
            New
          </Badge>
        </Text>
        <Heading
          mt="4"
          fontWeight="extrabold"
          size="3xl"
          maxW="14ch"
          mx="auto"
          letterSpacing="tighter"
        >
          <Box
            as="span"
            bgGradient="linear(to-r, blue.400, teal.400)"
            bgClip="text"
          >
            Build faster
          </Box>{" "}
          with Chakra UI Pro 💎
        </Heading>
        <Text maxW="48ch" mx="auto" fontSize="lg" mt="6" opacity={0.8}>
          Beautiful and responsive React components to build your application or
          marketing pages quicker.
        </Text>
        <HStack
          mt="6"
          as="a"
          bg="whiteAlpha.300"
          rounded="md"
          px="8"
          py="3"
          href={getUrl("homepage-ad")}
          color="white"
          fontSize="lg"
          fontWeight="semibold"
          transition="all 0.2s"
          _hover={{ bg: "whiteAlpha.400" }}
        >
          <Text>Learn more</Text>
          <Box as={FiArrowRight} display="inline-block" ml="2" />
        </HStack>
      </Flex>
      <Box position="relative" top="3">
        <NextImage
          src="/chakra-ui-ad.png"
          alt="Chakra UI Pro Image"
          layout="responsive"
          width="1200"
          height="320"
        />
      </Box>
    </Container>
  </Box>
)
