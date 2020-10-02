import {
  Box,
  chakra,
  Container,
  useColorModeValue,
  Wrap,
  Img,
} from "@chakra-ui/core"
import React from "react"

export default function TrustedBy({ users }) {
  return (
    <Box as="section" pt="48px" pb="32px">
      <Container textAlign="center">
        <chakra.p
          fontWeight="500"
          textStyle="caps"
          color={useColorModeValue("teal.600", "teal.300")}
          mb="48px"
        >
          Trusted in Production By
        </chakra.p>
        <Wrap
          maxW="800px"
          mx="auto"
          justify="center"
          align="center"
          spacing="24px"
        >
          {users
            .filter((user) => user.image.includes("."))
            .map((user) => {
              return (
                <Box key={user.name} bg="white" p="5" rounded="md">
                  <Img
                    key={user.image}
                    alt={user.name}
                    h="24px"
                    w="auto"
                    src={user.image}
                    loading="lazy"
                  />
                </Box>
              )
            })}
          <Box
            p="4"
            border="1px dashed"
            borderColor={useColorModeValue("teal.200", "teal.500")}
            bg={useColorModeValue("teal.50", "whiteAlpha.200")}
            rounded="md"
          >
            <Box as="span" mr="1" role="img">
              💖
            </Box>{" "}
            Your company
          </Box>
        </Wrap>
      </Container>
    </Box>
  )
}
