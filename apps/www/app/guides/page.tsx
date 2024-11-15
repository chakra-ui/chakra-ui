import { CollectionIcon } from "@/components/collection-icon"
import { getGuideCollections } from "@/lib/guide"
import {
  Box,
  Card,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Metadata } from "next"
import { Suspense } from "react"
import { LuChevronRight } from "react-icons/lu"
import { GuideSearchInput } from "./search-input"

export const metadata: Metadata = {
  title: "Guides",
  description: "Get answers to common questions about Chakra UI v3.0",
  openGraph: {
    images: `/og?title=Guides`,
  },
}

export default function GuidePage() {
  const collections = getGuideCollections()
  return (
    <Box flex="1" colorPalette="teal">
      <Container maxW="2xl" py="20">
        <VStack gap="8">
          <VStack textAlign="center">
            <Heading as="h1" size={{ base: "4xl", md: "5xl" }}>
              How can we help?
            </Heading>
            <Text color="fg.muted" textStyle="lg">
              Find answers to common questions related to Chakra UI v3.0
            </Text>
          </VStack>

          <Box flex="1" alignSelf="stretch">
            <Suspense fallback={<Skeleton width="full" height="12" />}>
              <GuideSearchInput />
            </Suspense>
          </Box>
        </VStack>
      </Container>

      <Container pt="8" pb="16">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="8">
          {collections.map((collection) => (
            <Card.Root variant="elevated" key={collection.id}>
              <Card.Header gap="1">
                <Square size="8" layerStyle="fill.solid" rounded="l2">
                  <CollectionIcon value={collection.id} />
                </Square>
                <Card.Title mt="3">{collection.title}</Card.Title>
                <Text color="fg.muted" textStyle="sm" minH="2lh">
                  {collection.description}
                </Text>
              </Card.Header>

              <Card.Body gap="1" divideY="1px">
                {collection.guides.slice(0, 4).map((guide) => (
                  <Link
                    href={guide.slug}
                    key={guide.collection}
                    textStyle="sm"
                    py="2"
                  >
                    {guide.title} <LuChevronRight />
                  </Link>
                ))}
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
