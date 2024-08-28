import { blogs } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import { formatBlogDate, getBlogAuthor } from "@/lib/blog"
import {
  Badge,
  Container,
  HStack,
  Heading,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { notFound } from "next/navigation"

export const generateStaticParams = async () => {
  return blogs.map((blog) => ({ slug: blog.slug.replace("blog/", "") }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find((blog) => blog.slug === `blog/${params.slug}`)
  if (!blog) return notFound()

  return (
    <Container pb="20" maxW="5xl">
      <Stack py="8" gap="6">
        <HStack>
          <Badge
            variant="subtle"
            textTransform="capitalize"
            size="lg"
            colorPalette="teal"
          >
            {blog.type}
          </Badge>
          <Span color="fg.muted">·</Span>
          {formatBlogDate(blog.publishedAt)}
        </HStack>
        <Heading size="4xl">{blog.title}</Heading>
        <Text color="fg.muted">{blog.description}</Text>
        <Stack mt="4" gap="3">
          <Text color="fg.muted" fontSize="sm">
            Posted by
          </Text>
          <HStack>
            {blog.authors.map((authorId) => {
              const author = getBlogAuthor(authorId)
              return (
                <HStack key={author.name} gap="4">
                  <Avatar src={author.image} name={author.name} />
                  <Stack gap="0" fontSize="sm">
                    <Text>{author.name}</Text>
                    <Text color="fg.muted">{author.x.username}</Text>
                  </Stack>
                </HStack>
              )
            })}
          </HStack>
        </Stack>
      </Stack>
      <Separator my="10" />
      <MDXContent code={blog.content} />
    </Container>
  )
}
