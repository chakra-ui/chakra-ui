import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  Text,
} from "@chakra-ui/core"
import LogoMark from "components/logo-mark"
import { FaArrowRight } from "react-icons/fa"
import NextLink from "next/link"

export default function GetStarted() {
  return (
    <Box>
      <Container py="120px" maxW="800px" mx="auto" textAlign="center">
        <Flex direction="column" align="center">
          <Center rounded="full" w="100px" h="100px" bg="teal.400">
            <LogoMark w="80%" color="white" />
          </Center>
          <Box maxW="600px" mx="auto">
            <chakra.h2 textStyle="heading-2" mt="6" mb="6">
              Get started with Chakra today.
            </chakra.h2>
            <Text mb="40px" fontSize="lg" opacity={0.7}>
              Chakra keeps everyone aligned and working without friction.
              Engineers and designers using the same language.
            </Text>
          </Box>
          <NextLink href="/docs/getting-started" passHref>
            <Button
              h="4rem"
              px="40px"
              fontSize="1.2rem"
              as="a"
              size="lg"
              colorScheme="teal"
              rightIcon={<FaArrowRight fontSize="0.8em" />}
            >
              Get Started
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </Box>
  )
}
