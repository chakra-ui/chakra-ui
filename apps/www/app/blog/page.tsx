import { blogs } from "@/.velite"
import { BlogCard } from "@/components/blog-card"
import { HighlightHeading, Subheading } from "@/components/site/typography"
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Catch up on the latest updates and releases",
  openGraph: {
    images: `/og?title=Blog and Updates`,
  },
}

export default function BlogPage() {
  const activeBlogs = blogs
    .filter((blog) => !blog.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  return (
    <Box py="20" flex="1">
      <Container>
        <Stack gap={{ base: "5", md: "10" }} mb="20">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <HighlightHeading as="h1" query="Updates">
              Blog and Updates
            </HighlightHeading>
            <Subheading>Catch up on the latest updates and releases</Subheading>
          </Stack>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="6">
          {activeBlogs.map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
