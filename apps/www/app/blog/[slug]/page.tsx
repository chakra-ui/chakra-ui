import { blogs } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import { formatBlogDate, getBlogAuthor } from "@/lib/blog"
import {
  Badge,
  Container,
  HStack,
  Heading,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageContext {
  params: Promise<{ slug: string[] }>
}

export const generateStaticParams = async () => {
  return blogs.map((blog) => ({ slug: blog.slug.replace("blog/", "") }))
}

export const generateMetadata = async (ctx: PageContext): Promise<Metadata> => {
  const params = await ctx.params
  const blog = blogs.find((blog) => blog.slug === `blog/${params.slug}`)
  return {
    title: blog?.title,
    description: blog?.description,
    openGraph: {
      images: `/og?title=${blog?.title}&category=${blog?.type}`,
    },
  }
}

export default async function BlogPostPage(props: PageContext) {
  const params = await props.params
  const blog = blogs.find((blog) => blog.slug === `blog/${params.slug}`)
  if (!blog) return notFound()

  return (
    <Container flex="1" pb="20" maxW="5xl">
      <Stack py="8" gap="6" mb="6">
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
          <Text fontSize="sm" color="fg.muted">
            {formatBlogDate(blog.publishedAt)}
          </Text>
        </HStack>
        <Heading size="4xl">{blog.title}</Heading>
        <Stack mt="4" gap="3">
          <HStack>
            {blog.authors.map((authorId) => {
              const author = getBlogAuthor(authorId)
              return (
                <HStack key={author.name} gap="4">
                  <Avatar src={author.image} name={author.name} />
                  <Stack gap="0" fontSize="sm">
                    <Text fontWeight="medium">{author.name}</Text>
                    <Text color="fg.muted">{author.x.username}</Text>
                  </Stack>
                </HStack>
              )
            })}
          </HStack>
        </Stack>
      </Stack>
      <MDXContent code={blog.content} />
    </Container>
  )
}
