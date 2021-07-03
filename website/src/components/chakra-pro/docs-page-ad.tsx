import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import NextImage from "next/image"
import * as React from "react"
import { getUrl } from "./get-url"

const DocsPageChakraProAd = () => (
  <Flex
    p="4"
    bg={useColorModeValue("gray.50", "rgba(36, 70, 93, 0.32)")}
    as="a"
    href={getUrl("docs-ad")}
    rel="noopener sponsored"
    target="_blank"
    maxW="xl"
    my="8"
    rounded="md"
  >
    <Box w="xs" h="100px" bg="gray.300" mr="4">
      <NextImage
        alt="chakra ui pro"
        src="/chakra-pro-ad.png"
        layout="fixed"
        width="150"
        height="100"
      />
    </Box>
    <Flex direction="column">
      <Box flex="1" fontSize="sm">
        <b>Chakra UI Pro:</b> Start your application or marketing site with a
        growing collection of beautiful and responsive UI components.
      </Box>
      <Box fontWeight="medium" fontSize="xs" opacity={0.7}>
        Ads via Chakra UI
      </Box>
    </Flex>
  </Flex>
)

export default DocsPageChakraProAd
