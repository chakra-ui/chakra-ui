"use client"

import {
  Center,
  Circle,
  Grid,
  Heading,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import {
  Ethereum,
  Lattice,
  LeonardoAI,
  Lysnna,
  TrustPage,
  Udacity,
  Xata,
} from "./logos"

const PartnerGrid = chakra(Grid, {
  base: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    "& > *": {
      "--border-width": "0.5px",
      border: "solid var(--border-width)",
      borderColor: "#001B18",
      mr: "calc(var(--border-width) * -1)",
      mb: "calc(var(--border-width) * -1)",
      py: "8",
    },
  },
})

export const Partners = () => (
  <Stack gap="8" pos="relative">
    <Circle
      size="489px"
      pos="absolute"
      bottom="0"
      left="-365px"
      opacity="0.25"
      filter="blur(250px)"
      bg="teal.500"
    />

    <Stack fontWeight="medium" textAlign="center">
      <Heading size="2xl">Built for modern product teams.</Heading>
      <Text fontSize="2xl" color="gray.400">
        From next-gen startups to established enterprises.
      </Text>
    </Stack>
    <Stack gap="8" pos="relative">
      <Circle
        pos="absolute"
        bottom="-50%"
        left="0"
        top="0"
        right="0"
        opacity="0.18"
        filter="blur(250px)"
        bg="teal.500"
        rounded="100%"
        zIndex="1"
      />
      <PartnerGrid columns={4}>
        <Center borderInlineStartWidth="var(--border-width)">
          <Lattice />
        </Center>
        <Center>
          <TrustPage />
        </Center>
        <Center>
          <Xata />
        </Center>
        <Center borderInlineEndWidth="var(--border-width)!">
          <Lysnna />
        </Center>
      </PartnerGrid>

      <PartnerGrid columns={4} zIndex="5">
        <Center borderInlineStartWidth="var(--border-width)">
          <Udacity />
        </Center>
        <Center>
          <Ethereum />
        </Center>
        <Center>
          <LeonardoAI />
        </Center>
        <Center
          borderInlineEndWidth="var(--border-width)!"
          bg={{ base: "#061416/30", _hover: "#061416/100" }}
          transition="background-color 0.2s"
          cursor="pointer"
        >
          <Text fontWeight="medium" fontSize="2xl">
            Your Logo
          </Text>
        </Center>
      </PartnerGrid>
    </Stack>
  </Stack>
)
