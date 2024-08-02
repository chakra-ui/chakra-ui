"use client"

import {
  HStack,
  Heading,
  SimpleGrid,
  Span,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"

const Testimonial = chakra("a", {
  base: {
    "--border-width": "1px",
    "--border-color": "#001B18",
    display: "flex",
    flexDir: "column",
    gap: "10",
    px: "14",
    py: "20",
    border: "var(--border-width) solid",
    borderColor: "var(--border-color)",
    ml: "calc(var(--border-width) * -1)",
    mt: "calc(var(--border-width) * -1)",
    pos: "relative",

    "&:before, &:after": {
      pos: "absolute",
      w: "full",
      minH: "full",
      top: "calc(var(--border-width) * -1)",
      bottom: "calc(var(--border-width) * -1)",
      border: "var(--border-width) solid",
      borderColor: "var(--border-color)",
      pointerEvents: "none",
    },
    "&[data-pos=left]:before": {
      content: "''",
      left: "-100%",
    },
    "&[data-pos=right]:after": {
      content: "''",
      right: "-100%",
    },
  },
})

export const Testimonials = () => {
  return (
    <Stack gap="14" align="center" overflowX="hidden">
      <Heading size="3xl" fontWeight="bold" textAlign="center">
        Top-tier teams use and{" "}
        <Span
          color="teal.500"
          pos="relative"
          px="2"
          display="inline-block"
          _before={{
            pos: "absolute",
            content: "''",
            w: "full",
            h: "full",
            bg: "teal.500/10",
            bottom: "-3px",
            left: "0",
            borderRight: "solid 1.5px",
            borderColor: "currentColor",
          }}
        >
          love Chakra
        </Span>
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} maxW="6xl">
        {TESTIMONIALS.map((testimonial, index) => (
          <Testimonial
            key={index}
            data-pos={(index + 1) % 2 ? "left" : "right"}
            gap="10"
            href={testimonial.url}
            target="_blank"
            rel="noopener"
          >
            <Text color="gray.400" fontWeight="medium" whiteSpace="pre-wrap">
              {testimonial.content}
            </Text>
            <HStack justify="space-between" w="full">
              <Stack fontSize="sm" fontWeight="medium">
                <Text>{testimonial.name}</Text>
                <Text color="gray.500">{testimonial.role}</Text>
              </Stack>

              <chakra.img
                src={`/avatars/${testimonial.handle}.jpg`}
                alt={testimonial.name}
                w="12"
                h="12"
                rounded="md"
              />
            </HStack>
          </Testimonial>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

const TESTIMONIALS = [
  {
    name: "Guillermo Rauch",
    role: "CEO / Vercel",
    handle: "@rauchg",
    url: "https://twitter.com/rauchg/status/1169632334389248000",
    content:
      "“Chakra UI is glorious. Dark mode support looks amazing and it is 100% built-in. I love the consistent use of focus styling and the subtle animation. Great care for accessibility throughout. It is a guiding principle of the design system.”",
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
