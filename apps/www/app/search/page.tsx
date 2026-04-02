import { data } from "@/lib/search"
import {
  Badge,
  Box,
  Container,
  HStack,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import Fuse, { type IFuseOptions } from "fuse.js"
import { Metadata } from "next"
import Link from "next/link"
import { SearchInput } from "./search-input"

interface InternalSearchItem {
  label: string
  value: string
  description: string
  category: string
}

interface SearchResult {
  label: string
  slug: string
  description: string
  category: string
}

const fuseOptions: IFuseOptions<InternalSearchItem> = {
  keys: [
    { name: "label", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.3,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  ignoreLocation: false,
  findAllMatches: true,
  useExtendedSearch: true,
}

function searchDocs(query: string): SearchResult[] {
  const allItems = Object.values(data).flat()
  const fuse = new Fuse(allItems, fuseOptions)
  return fuse
    .search(query)
    .sort((a, b) => (a.score || 1) - (b.score || 1))
    .map(({ item }) => ({
      label: item.label,
      slug: `/${item.value}`,
      description: item.description,
      category: item.category,
    }))
}

function groupByCategory(
  results: SearchResult[],
): Record<string, SearchResult[]> {
  return results.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, SearchResult[]>,
  )
}

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams
  const q = params.q ?? ""
  return {
    title: q ? `Search results for "${q}"` : "Search",
    description: "Search the Chakra UI documentation",
    openGraph: {
      images: `/og?title=Search`,
    },
  }
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q ?? ""
  const results = query ? searchDocs(query) : []
  const grouped = groupByCategory(results)
  const categories = Object.keys(grouped)

  return (
    <Box py="20" flex="1">
      <Container maxW="3xl">
        <Stack gap="10">
          <Stack gap="2">
            <Text textStyle="3xl" fontWeight="bold">
              Search Documentation
            </Text>
            <Text color="fg.muted">
              Search across components, guides, and styling references
            </Text>
          </Stack>

          <SearchInput defaultValue={query} />

          {query && (
            <Text textStyle="sm" color="fg.muted">
              {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
              <Text as="strong" color="fg">
                &ldquo;{query}&rdquo;
              </Text>
            </Text>
          )}

          {query && results.length === 0 && (
            <Stack gap="2" py="10" align="center" textAlign="center">
              <Text fontWeight="medium">No results found</Text>
              <Text color="fg.muted" textStyle="sm">
                Try a different term, like &ldquo;Button&rdquo; or
                &ldquo;theming&rdquo;
              </Text>
            </Stack>
          )}

          {categories.map((category, i) => (
            <Stack key={category} gap="4">
              {i > 0 && <Separator />}
              <HStack gap="2">
                <Text
                  fontWeight="semibold"
                  textStyle="xs"
                  color="fg.muted"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {category}
                </Text>
                <Badge variant="subtle" colorPalette="gray" size="sm">
                  {grouped[category].length}
                </Badge>
              </HStack>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                {grouped[category].map((item) => (
                  <Box
                    key={item.slug}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    _hover={{
                      bg: "gray.subtle",
                      borderColor: "border.emphasized",
                    }}
                    transition="all 0.15s"
                  >
                    <Link href={item.slug} style={{ display: "block" }}>
                      <Stack gap="1" px="4" py="3">
                        <Text fontWeight="medium" textStyle="sm">
                          {item.label}
                        </Text>
                        {item.description && (
                          <Text color="fg.muted" textStyle="xs" lineClamp={2}>
                            {item.description}
                          </Text>
                        )}
                      </Stack>
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          ))}

          {!query && (
            <Stack py="10" align="center" textAlign="center">
              <Text color="fg.muted" textStyle="sm">
                Start typing to search across all documentation
              </Text>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
