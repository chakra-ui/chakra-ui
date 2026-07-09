import { shipped, showcases } from "@/.velite"
import { HighlightHeading, Subheading } from "@/components/site/typography"
import {
  Box,
  Button,
  Circle,
  Container,
  Float,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Metadata } from "next"
import Link from "next/link"
import { ProductGallery, StoryPreview } from "./shipped-client"
import { getPublishedShipped } from "./utils"

const mono = "var(--font-geist-mono)"

export const metadata: Metadata = {
  title: "Shipped",
  description: "The products people build and ship with Chakra UI.",
  openGraph: {
    images: `/og?title=Shipped`,
  },
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

interface StorySpreadProps {
  story: (typeof shipped)[number]
  index: number
}

function StorySpread({ story, index }: StorySpreadProps) {
  const flip = index % 2 === 1
  return (
    <Box
      asChild
      position="relative"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border"
      rounded="l3"
      bg="bg.panel"
      p={{ base: "6", md: "10" }}
      transition="transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
      focusVisibleRing="outside"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "teal.emphasized",
        boxShadow: "md",
        "& [data-arrow]": { transform: "translateX(4px)" },
        "& [data-preview]": { transform: "translateY(-2px)" },
      }}
    >
      <Link href={`/shipped/${story.slug}`}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "8", lg: "14" }}
          alignItems="center"
        >
          <GridItem
            order={{ base: 1, lg: flip ? 1 : 0 }}
            data-preview
            transition="transform 0.3s ease"
          >
            <StoryPreview images={story.images} url={story.url} seed={index} />
          </GridItem>

          <GridItem order={{ base: 0, lg: flip ? 0 : 1 }}>
            <Stack gap={{ base: "6", md: "8" }} position="relative">
              <HStack
                justify="space-between"
                fontFamily={mono}
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                <Span color="teal.fg">Shipped · {story.category}</Span>
                {story.featured && (
                  <Span
                    color="teal.fg"
                    borderWidth="1px"
                    borderColor="teal.emphasized"
                    rounded="full"
                    px="2.5"
                    py="0.5"
                  >
                    Featured
                  </Span>
                )}
              </HStack>

              <Box position="relative">
                <Float placement="top-start" offsetX="2" offsetY="6">
                  <Span
                    fontSize="6rem"
                    lineHeight="1"
                    fontWeight="bold"
                    color="teal.subtle"
                    userSelect="none"
                    aria-hidden
                  >
                    &ldquo;
                  </Span>
                </Float>
                <Text
                  textStyle={{ base: "2xl", md: "4xl" }}
                  fontWeight="semibold"
                  lineHeight="1.25"
                  letterSpacing="tight"
                  position="relative"
                >
                  {story.quote}
                </Text>
              </Box>

              <HStack justify="space-between" align="center" pt="1">
                <HStack gap="3">
                  {story.avatar ? (
                    <Image
                      src={story.avatar}
                      alt={story.person}
                      boxSize="11"
                      rounded="full"
                      borderWidth="1px"
                      borderColor="teal.emphasized"
                    />
                  ) : (
                    <Circle
                      size="11"
                      bg="teal.subtle"
                      color="teal.fg"
                      fontWeight="bold"
                      fontSize="sm"
                      borderWidth="1px"
                      borderColor="teal.emphasized"
                    >
                      {initials(story.person)}
                    </Circle>
                  )}
                  <Stack gap="0.5">
                    <Text fontWeight="semibold">{story.person}</Text>
                    <Text fontSize="sm" color="fg.muted">
                      {story.role}, {story.product}
                    </Text>
                    {story.x && (
                      <Text fontFamily={mono} fontSize="xs" color="teal.fg">
                        @{story.x}
                      </Text>
                    )}
                  </Stack>
                </HStack>
                <HStack
                  gap="2"
                  fontFamily={mono}
                  fontSize="sm"
                  color="teal.fg"
                  display={{ base: "none", sm: "flex" }}
                >
                  <Span>Read story</Span>
                  <Span data-arrow transition="transform 0.2s ease" aria-hidden>
                    &rarr;
                  </Span>
                </HStack>
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
      </Link>
    </Box>
  )
}

export default function ShippedPage() {
  const stories = getPublishedShipped()

  return (
    <Box width="full">
      {/* Hero */}
      <Container maxW="7xl" pt="20" pb={{ base: "12", md: "16" }}>
        <Stack gap="8" maxW="4xl">
          <HighlightHeading as="h1" query="Shipped" whiteSpace="pre-line">
            {"Built by the community\nShipped to the world!"}
          </HighlightHeading>
          <Subheading textStyle="xl">
            Meet the founders and engineers building products with Chakra UI and
            hear the stories behind what they shipped
          </Subheading>
          <HStack gap="3" pt="2">
            <Button colorPalette="teal" size="xl" asChild>
              <Link href="#stories">Read the stories</Link>
            </Button>
          </HStack>
        </Stack>
      </Container>

      {/* Stories */}
      <Container
        maxW="7xl"
        id="stories"
        scrollMarginTop="24"
        pt={{ base: "12", md: "16" }}
      >
        <Stack gap="10">
          <Stack gap="3">
            <Heading
              textStyle={{ base: "3xl", md: "4xl" }}
              fontWeight="semibold"
            >
              The stories
            </Heading>
            <Subheading>
              Products people built and shipped with Chakra UI
            </Subheading>
          </Stack>

          <Stack gap={{ base: "6", md: "8" }}>
            {stories.map((story, index) => (
              <StorySpread key={story.slug} story={story} index={index} />
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Preview gallery */}
      <Container maxW="7xl" pt={{ base: "20", md: "28" }}>
        <Stack gap="3" maxW="2xl">
          <Heading textStyle={{ base: "2xl", md: "3xl" }} fontWeight="semibold">
            Built in the open
          </Heading>
          <Subheading>
            A look at the interfaces people ship with Chakra UI
          </Subheading>
        </Stack>
      </Container>

      <Box pt={{ base: "8", md: "10" }} pb={{ base: "20", md: "28" }}>
        <ProductGallery
          items={showcases.map((item) => ({
            src: `/${item.image}`,
            url: item.url,
            alt: item.title,
          }))}
        />
      </Box>
    </Box>
  )
}
