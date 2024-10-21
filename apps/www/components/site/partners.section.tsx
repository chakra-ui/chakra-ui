"use client"

import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Span,
  Stack,
} from "@chakra-ui/react"
import {
  Ethereum,
  Lattice,
  LeonardoAI,
  Lysnna,
  Stately,
  TrustPage,
  Udacity,
  Xata,
} from "./logos"

const partners = [
  { Logo: Lattice },
  { Logo: TrustPage },
  { Logo: Xata },
  { Logo: Lysnna },
  { Logo: Udacity },
  { Logo: Ethereum },
  { Logo: LeonardoAI },
  { Logo: Stately },
]

const PartnerGridRow = () => (
  <SimpleGrid columns={{ base: 2, lg: 4 }}>
    {partners.map(({ Logo }, index) => (
      <Center
        key={index}
        height="88px"
        borderWidth="0.5px"
        borderColor={{ _light: "border", _dark: "#001B18" }}
        _icon={{
          scale: "0.8",
        }}
      >
        <Logo />
      </Center>
    ))}
  </SimpleGrid>
)

export const PartnersSection = () => (
  <Box py="20" pos="relative">
    <Container>
      <Stack gap="12">
        <Heading textAlign="center" fontWeight="medium">
          Built for modern product teams.
          <br />
          <Span color="fg.muted">
            From next-gen startups to established enterprises.
          </Span>
        </Heading>
        <PartnerGridRow />
      </Stack>
    </Container>
  </Box>
)
