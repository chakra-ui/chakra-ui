import {
  Box,
  BoxProps,
  chakra,
  Circle,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/core"
import * as React from "react"
import { FaDiscord } from "react-icons/fa"

function DiscordStrip(props: BoxProps) {
  return (
    <Box bg="#7289DA" {...props}>
      <Container maxW="1280px" py="40px">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          <Flex color="white">
            <Box fontSize="64px" mr={{ base: "24px", md: "40px" }}>
              <FaDiscord />
            </Box>
            <Box>
              <Heading size="lg" lineHeight="1.2" mb="1">
                Connect with the community
              </Heading>
              <Text fontSize="lg" opacity={0.7}>
                Feel free to ask questions, report issues, and meet new people.
              </Text>
            </Box>
          </Flex>
          <chakra.button
            width={{ base: "100%", md: "auto" }}
            mt={{ base: "6", md: 0 }}
            as="a"
            justifyContent="center"
            display="inline-flex"
            alignItems="center"
            href="https://discord.gg/dQHfcWF"
            target="_blank"
            fontWeight="bold"
            shadow="md"
            bg="white"
            px="24px"
            h="56px"
            rounded="lg"
            fontSize="lg"
          >
            Join the #Chakra Discord!
          </chakra.button>
        </Flex>
      </Container>
    </Box>
  )
}

export default DiscordStrip
