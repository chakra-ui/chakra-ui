import { shipped } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import {
  Avatar,
  Blockquote,
  Box,
  type BoxProps,
  Button,
  Circle,
  Container,
  Float,
  HStack,
  Heading,
  type HeadingProps,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LuQuote } from "react-icons/lu"
import { ProductGallery } from "../shipped-client"

const mono = "var(--font-geist-mono)"

interface PageContext {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return shipped.map((story) => ({ slug: story.slug }))
}

export const generateMetadata = async (ctx: PageContext): Promise<Metadata> => {
  const { slug } = await ctx.params
  const story = shipped.find((item) => item.slug === slug)
  return {
    title: story ? `${story.product} shipped with Chakra` : "Shipped",
    description: story?.quote,
    openGraph: {
      images: `/og?title=${story?.product ?? "Shipped"}`,
    },
  }
}

// Story-specific renderers passed to MDXContent, so the prose is styled for a
// story rather than inheriting the docs heading/quote behavior.
const storyComponents = {
  h2: (props: HeadingProps) => (
    <Heading
      as="h2"
      textStyle={{ base: "2xl", md: "3xl" }}
      fontWeight="semibold"
      color="fg"
      letterSpacing="tight"
      lineHeight="1.2"
      mt={{ base: "12", md: "16" }}
      mb="4"
      css={{
        "& a": {
          color: "inherit",
          textDecoration: "none",
          fontWeight: "inherit",
        },
      }}
      {...props}
    />
  ),
  blockquote: (props: BoxProps) => (
    <Box
      as="blockquote"
      my="10"
      ps="6"
      borderStartWidth="3px"
      borderColor="teal.solid"
      css={{
        "& p": {
          fontSize: { base: "2xl", md: "3xl" },
          color: "fg",
          fontWeight: "semibold",
          lineHeight: "1.3",
          letterSpacing: "-0.02em",
        },
      }}
      {...props}
    />
  ),
  a: (props: BoxProps) => (
    <Box
      as="a"
      color="teal.fg"
      textDecoration="underline"
      textUnderlineOffset="3px"
      textDecorationColor="teal.emphasized"
      fontWeight="medium"
      _hover={{ textDecorationThickness: "2px" }}
      {...props}
    />
  ),
  strong: (props: BoxProps) => (
    <Box as="strong" fontWeight="bold" color="fg" {...props} />
  ),
  em: (props: BoxProps) => (
    <Box as="em" fontStyle="italic" color="fg" {...props} />
  ),
}

function SpecItem(props: { label: string; children: React.ReactNode }) {
  return (
    <Stack gap="1.5">
      <Text
        fontFamily={mono}
        fontSize="2xs"
        textTransform="uppercase"
        letterSpacing="wider"
        color="fg.subtle"
      >
        {props.label}
      </Text>
      <Box fontWeight="medium" fontSize="sm">
        {props.children}
      </Box>
    </Stack>
  )
}

export default async function ShippedStoryPage(props: PageContext) {
  const { slug } = await props.params
  const index = shipped.findIndex((item) => item.slug === slug)
  if (index === -1) return notFound()
  const story = shipped[index]
  const next = shipped[(index + 1) % shipped.length]
  const hasNext = next && next.slug !== story.slug

  return (
    <Box width="full">
      <Container maxW="4xl" pt={{ base: "10", md: "16" }}>
        <Stack gap={{ base: "10", md: "14" }}>
          <Link href="/shipped">
            <Text
              fontFamily={mono}
              fontSize="sm"
              color="fg.muted"
              _hover={{ color: "teal.fg" }}
            >
              &larr; All stories
            </Text>
          </Link>

          {/* Header: lead with the quote, attribution below */}
          <Stack gap={{ base: "6", md: "8" }}>
            <Heading as="h1" srOnly>
              {story.product}
            </Heading>
            <HStack
              gap="2.5"
              fontFamily={mono}
              fontSize="sm"
              color="fg.subtle"
              textTransform="uppercase"
              letterSpacing="wider"
              flexWrap="wrap"
            >
              <Span color="teal.fg">
                Shipped{story.shippedAt ? ` ${story.shippedAt}` : ""}
              </Span>
              <Span>·</Span>
              <Span>{story.category}</Span>
            </HStack>

            {/* Pull-quote callout */}
            <Blockquote.Root colorPalette="teal" ps="8">
              <Float placement="middle-start">
                <Circle bg="teal.solid" size="8" color="teal.contrast">
                  <LuQuote />
                </Circle>
              </Float>
              <Blockquote.Content
                textStyle={{ base: "3xl", md: "4xl" }}
                fontWeight="semibold"
                lineHeight="1.3"
                letterSpacing="tight"
              >
                {story.quote}
              </Blockquote.Content>
            </Blockquote.Root>

            {/* Byline */}
            <HStack gap="3.5">
              <Avatar.Root size="lg">
                <Avatar.Image src={story.avatar} />
                <Avatar.Fallback name={story.person} />
              </Avatar.Root>
              <Stack gap="0.5">
                <Text fontSize="md">
                  <Span fontWeight="medium" color="fg">
                    {story.person}
                  </Span>
                  <Span color="fg.muted">
                    , {story.role} of {story.product}
                  </Span>
                </Text>
                {story.x && (
                  <Link href={`https://x.com/${story.x}`}>
                    <Span
                      fontFamily={mono}
                      fontSize="sm"
                      color="teal.fg"
                      _hover={{ textDecoration: "underline" }}
                    >
                      @{story.x}
                    </Span>
                  </Link>
                )}
              </Stack>
            </HStack>
          </Stack>
        </Stack>
      </Container>

      {/* Full-bleed product gallery */}
      <Box py={{ base: "12", md: "16" }}>
        <ProductGallery images={story.images} url={story.url} />
      </Box>

      <Container maxW="4xl" pb="24">
        <Stack gap={{ base: "12", md: "16" }}>
          {/* Spec strip */}
          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            gap="6"
            borderYWidth="1px"
            borderColor="border"
            py="6"
          >
            <SpecItem label="Product">{story.product}</SpecItem>
            <SpecItem label="Built by">{story.person}</SpecItem>
            <SpecItem label="Category">{story.category}</SpecItem>
            <SpecItem label="Live at">
              <Link href={story.url}>
                <Span color="teal.fg" _hover={{ textDecoration: "underline" }}>
                  {story.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </Span>
              </Link>
            </SpecItem>
          </SimpleGrid>

          {/* Body, broken into clear sections */}
          <Box
            maxW="3xl"
            css={{ "& > p:first-of-type": { fontSize: "xl", color: "fg" } }}
          >
            <MDXContent code={story.content} components={storyComponents} />
          </Box>

          {/* CTA */}
          <HStack gap="3" flexWrap="wrap">
            <Button colorPalette="teal" size="xl" asChild>
              <Link href={story.url}>Visit {story.product}</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/shipped">More stories</Link>
            </Button>
          </HStack>
        </Stack>
      </Container>

      {/* Next story */}
      {hasNext && (
        <Box borderTopWidth="1px" borderColor="border" bg="bg.subtle">
          <Container maxW="4xl">
            <Link href={`/shipped/${next.slug}`}>
              <HStack
                justify="space-between"
                align="center"
                py={{ base: "10", md: "14" }}
                gap="6"
                role="group"
              >
                <Stack gap="2">
                  <Text
                    fontFamily={mono}
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color="teal.fg"
                  >
                    Next story
                  </Text>
                  <Heading
                    textStyle={{ base: "2xl", md: "3xl" }}
                    fontWeight="semibold"
                    _groupHover={{ color: "teal.fg" }}
                    transition="color 0.2s ease"
                  >
                    {next.product}
                  </Heading>
                  <Text fontSize="sm" color="fg.muted">
                    {next.person}, {next.role}
                  </Text>
                </Stack>
                <Span
                  fontFamily={mono}
                  fontSize="2xl"
                  color="teal.fg"
                  aria-hidden
                >
                  &rarr;
                </Span>
              </HStack>
            </Link>
          </Container>
        </Box>
      )}
    </Box>
  )
}
