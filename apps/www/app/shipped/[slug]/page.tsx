import { MDXContent } from "@/components/mdx-content"
import {
  Box,
  Container,
  HStack,
  Heading,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { QuoteCard } from "../quote-card"
import { ProductGallery } from "../shipped-client"
import { StoryMeta } from "../story-meta"
import { getPublishedShipped } from "../utils"

interface PageContext {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  return getPublishedShipped().map((story) => ({ slug: story.slug }))
}

export const generateMetadata = async (ctx: PageContext): Promise<Metadata> => {
  const { slug } = await ctx.params
  const story = getPublishedShipped().find((item) => item.slug === slug)
  return {
    title: story ? `${story.product} shipped with Chakra` : "Shipped",
    description: story?.quote,
    openGraph: {
      images: `/og?title=${story?.product ?? "Shipped"}`,
    },
  }
}

const storyComponents = {
  QuoteCard,
}

export default async function ShippedStoryPage(props: PageContext) {
  const { slug } = await props.params
  const publishedStories = getPublishedShipped()
  const index = publishedStories.findIndex((item) => item.slug === slug)
  if (index === -1) return notFound()
  const story = publishedStories[index]
  const next = publishedStories[(index + 1) % publishedStories.length]
  const hasNext = next && next.slug !== story.slug

  return (
    <Box width="full">
      <Container maxW="4xl" pt={{ base: "10", md: "16" }}>
        <Stack gap={{ base: "10", md: "14" }}>
          <Link href="/shipped">&larr; All stories</Link>

          <QuoteCard quote={story.quote} description={story.description} />
          <StoryMeta
            data={{
              company: story.product,
              logo: story.logo,
              url: story.url,
              authorName: story.person,
              authorTitle: story.role,
              authorAvatar: story.avatar,
              authorUrl: story.x ? `https://x.com/${story.x}` : undefined,
              category: story.category,
              publishedAt: story.shippedAt
                ? new Date(story.shippedAt)
                : new Date(),
            }}
          />
        </Stack>
      </Container>

      {/* Full-bleed product gallery */}
      <Box py={{ base: "12", md: "16" }}>
        <ProductGallery images={story.images} url={story.url} />
      </Box>

      <Container maxW="3xl" pb="24">
        <MDXContent code={story.content} components={storyComponents} />
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
                <Span fontSize="2xl" color="teal.fg" aria-hidden>
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
