import { blogs } from "@/.velite"
import { BlogCard } from "@/components/blog-card"
import { HighlightHeading, Subheading } from "@/components/site/typography"
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react"

export default function BlogPage() {
  return (
    <Box py="20">
      <Container>
        <Stack gap={{ base: "5", md: "10" }} mb="20">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <HighlightHeading as="h1" query="Updates">
              Chakra UI News and Updates
            </HighlightHeading>
            <Subheading>
              Catch up on the latest Chakra news, covering releases, framework
              developments, and other essential information.
            </Subheading>
          </Stack>
        </Stack>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap="6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
