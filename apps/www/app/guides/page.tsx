import { CollectionIcon } from "@/components/collection-icon"
import { getGuideCollections } from "@/lib/guide"
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Square,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Metadata } from "next"
import NextLink from "next/link"
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
  const collections = getGuideCollections().sort(
    (a, b) => b.guides.length - a.guides.length,
  )
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
        <Stack gap="8">
          {collections.map((collection) => (
            <Card.Root variant="elevated" key={collection.id}>
              <Card.Header gap="1">
                <Flex gap="3">
                  <Square size="10" layerStyle="fill.solid" rounded="l2">
                    <CollectionIcon value={collection.id} />
                  </Square>
                  <Stack gap="0" mt="-1">
                    <HStack>
                      <Card.Title>{collection.title}</Card.Title>
                      <Badge size="sm" variant="subtle" colorPalette="gray">
                        {collection.guides.length} articles
                      </Badge>
                    </HStack>
                    <Text color="fg.muted" textStyle="sm" minH="2lh">
                      {collection.description}
                    </Text>
                  </Stack>
                </Flex>
              </Card.Header>

              <Card.Body gap="1">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                  {collection.guides.map((guide) => (
                    <Link
                      borderWidth="1px"
                      key={guide.collection}
                      textStyle="sm"
                      padding="4"
                      rounded="md"
                      asChild
                    >
                      <NextLink href={guide.slug}>
                        {guide.title} <LuChevronRight />
                      </NextLink>
                    </Link>
                  ))}
                </SimpleGrid>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
