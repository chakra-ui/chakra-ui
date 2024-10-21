"use client"

import {
  Box,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import Image from "next/image"
import { HighlightHeading } from "./typography"

const TESTIMONIALS = [
  {
    name: "Guillermo Rauch",
    role: "CEO / Vercel",
    handle: "@rauchg",
    url: "https://twitter.com/rauchg/status/1169632334389248000",
    content:
      "Chakra UI is glorious. Dark mode support looks amazing and it is 100% built-in. I love the consistent use of focus styling and the subtle animation. Great care for accessibility throughout. It is a guiding principle of the design system.",
  },
  {
    name: "Aayush Iyer",
    role: "Engineer / Twillio",
    handle: "@aayush",
    url: "https://twitter.com/aayush/status/1264251538735632384",
    content: `Chakra is a fantastic component library that helps shape and accelerate the work we're doing with Twilio Paste. \n\nThank you @thesegunadebayo!`,
  },
  {
    name: "Colm Tuite",
    role: "CEO / Modulz",
    handle: "@colmtuite",
    url: "https://twitter.com/colmtuite/status/1169622886052782081",
    content:
      "Awesome new open-source component library from @thesegunadebayo.\n\nReally impressive stuff!",
  },
  {
    name: "Echobind Engineering",
    role: "Echobind",
    handle: "@echobind",
    url: "https://twitter.com/echobind/status/1272895730299154438",
    content:
      "Chakra UI has become part of our default stack for React apps, Chakra saves our team tons of time, is well designed and documented, has solid accessibility defaults, and looks great out of the box.",
  },
]

const Testimonial = chakra("a", {
  base: {
    display: "flex",
    flexDir: "column",
    gap: { base: "4", md: "10" },
    padding: "12",
    borderWidth: "1px",
    borderColor: { _light: "border", _dark: "#001B18" },
    pos: "relative",
    focusRing: "inside",
  },
})

const TestimonialsList = () => (
  <SimpleGrid gap="5" columns={{ base: 1, md: 2 }}>
    {TESTIMONIALS.map((testimonial, index) => (
      <Testimonial
        key={index}
        href={testimonial.url}
        target="_blank"
        rel="noopener"
      >
        <Text color="fg.muted" whiteSpace="pre-wrap">
          {testimonial.content}
        </Text>
        <HStack justify="space-between" w="full">
          <Stack fontSize="sm" gap="1">
            <Text>{testimonial.name}</Text>
            <Text color="fg.muted">{testimonial.role}</Text>
          </Stack>

          <Image
            src={`/avatars/${testimonial.handle}.jpg`}
            alt={testimonial.name}
            width="48"
            height="48"
            style={{ borderRadius: "10px" }}
          />
        </HStack>
      </Testimonial>
    ))}
  </SimpleGrid>
)

export const TestimonialSection = () => {
  return (
    <Box as="section" py="20">
      <Container>
        <Stack gap="14" align="center" overflowX="hidden">
          <HighlightHeading as="h2" textStyle="3xl" query="love Chakra">
            Top-tier teams use and love Chakra
          </HighlightHeading>
          <TestimonialsList />
        </Stack>
      </Container>
    </Box>
  )
}
