import { getPublishedShipped } from "@/app/shipped/utils"
import { Subheading } from "@/components/site/typography"
import {
  Box,
  Card,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { showcases } from ".velite"

export const metadata: Metadata = {
  title: "Showcase",
  description: "A collection of beautiful websites that are built in Chakra UI",
  openGraph: {
    images: `/og?title=Showcase`,
  },
}

const mono = "var(--font-geist-mono)"

function ShippedCallout() {
  const [story] = getPublishedShipped()
  if (!story) return null

  return (
    <Box
      asChild
      borderWidth="1px"
      borderColor="border"
      rounded="l3"
      bg="teal.subtle"
      px={{ base: "5", md: "8" }}
      py={{ base: "5", md: "6" }}
      focusVisibleRing="outside"
      transition="border-color 0.2s ease"
      _hover={{ borderColor: "teal.emphasized" }}
    >
      <Link href="/shipped">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap="4"
        >
          <Stack gap="1.5">
            <Span
              fontFamily={mono}
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
              color="teal.fg"
            >
              Chakra Shipped is live
            </Span>
            <Text textStyle={{ base: "md", md: "lg" }} fontWeight="medium">
              &ldquo;{story.quote}&rdquo;
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {story.person}, {story.role} at {story.product}
            </Text>
          </Stack>
          <HStack
            gap="2"
            fontFamily={mono}
            fontSize="sm"
            color="teal.fg"
            flexShrink="0"
          >
            <Span>Read the stories</Span>
            <Span aria-hidden>&rarr;</Span>
          </HStack>
        </Stack>
      </Link>
    </Box>
  )
}

export default function ShowcasePage() {
  return (
    <Box py="20" width="full">
      <Container>
        <Stack gap={{ base: "5", md: "10" }} mb="12">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
              Showcase
            </Heading>
            <Subheading>Beautiful websites built with Chakra UI</Subheading>
          </Stack>

          <ShippedCallout />
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {showcases.map(({ title, description, url, image }) => (
            <Card.Root
              size="sm"
              key={url}
              asChild
              cursor="pointer"
              overflow="hidden"
              focusVisibleRing="inside"
              width="100%"
            >
              <Link href={url}>
                <Image
                  src={`/${image}`}
                  alt={title}
                  width={420}
                  height={236}
                  objectFit="cover"
                />

                <Card.Body gap="1">
                  <Card.Title textStyle="sm">{title}</Card.Title>
                  <Card.Description textStyle="xs">
                    {description}
                  </Card.Description>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
