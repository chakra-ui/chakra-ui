"use client"

import {
  Center,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import { Blob } from "./blob"
import {
  Ethereum,
  Lattice,
  LeonardoAI,
  Lysnna,
  TrustPage,
  Udacity,
  Xata,
} from "./logos"

const Description = () => (
  <Stack
    fontWeight="medium"
    textAlign="center"
    textStyle={{ base: "lg", md: "2xl" }}
  >
    <Heading>Built for modern product teams.</Heading>
    <Text color="gray.400">
      From next-gen startups to established enterprises.
    </Text>
  </Stack>
)

const PartnerGridRoot = chakra(Grid, {
  base: {
    pos: "relative",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gridRowGap: { base: "0", md: "8" },
    "& > *": {
      "--border-width": "0.5px",
      border: "solid var(--border-width)",
      borderColor: "#001B18",
      mr: "calc(var(--border-width) * -1)",
      mb: "calc(var(--border-width) * -1)",
      px: "4",
      py: "8",
    },
    mdDown: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
})

const NewPartner = () => (
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
)

const PartnerGridRow = () => (
  <PartnerGridRoot>
    <Blob bottom="-50%" left="0" top="0" right="0" opacity="0.1" zIndex="1" />
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
    <Center borderInlineStartWidth="var(--border-width)">
      <Udacity />
    </Center>
    <Center>
      <Ethereum />
    </Center>
    <Center>
      <LeonardoAI />
    </Center>
    <NewPartner />
  </PartnerGridRoot>
)

export const Partners = () => (
  <Container>
    <Stack gap="8" pos="relative">
      <Blob size="489px" bottom="0" left="-365px" />
      <Description />
      <PartnerGridRow />
    </Stack>
  </Container>
)
