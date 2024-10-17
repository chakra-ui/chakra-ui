import { guides } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import { formatBlogDate } from "@/lib/blog"
import { Container, HStack, Heading, Span, Stack, Text } from "@chakra-ui/react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string[] }
}

export const generateStaticParams = async () => {
  return guides.map((guide) => ({ slug: guide.slug.replace("guides/", "") }))
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const guide = guides.find((guide) => guide.slug === `guides/${params.slug}`)

  return {
    title: guide?.title,
    description: guide?.description,
    openGraph: {
      images: `/og?title=${guide?.title}`,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const guide = guides.find((guide) => guide.slug === `guides/${params.slug}`)
  if (!guide) return notFound()

  return (
    <Container flex="1" pb="20" maxW="5xl">
      <Stack py="8" gap="4" mb="6">
        <Heading size="4xl">{guide.title}</Heading>
        <Text fontSize="sm" color="fg.subtle">
          {formatBlogDate(guide.publishedAt)}
        </Text>
      </Stack>
      <MDXContent code={guide.content} />
    </Container>
  )
}
