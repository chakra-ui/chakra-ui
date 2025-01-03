import { guides } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import { formatBlogDate } from "@/lib/blog"
import {
  BreadcrumbCurrentLink,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import { BreadcrumbLink, BreadcrumbRoot } from "compositions/ui/breadcrumb"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageContext {
  params: Promise<{ slug: string[] }>
}

export const generateStaticParams = async () => {
  return guides.map((guide) => ({ slug: guide.slug.replace("guides/", "") }))
}

export const generateMetadata = async (ctx: PageContext): Promise<Metadata> => {
  const params = await ctx.params
  const guide = guides.find((guide) => guide.slug === `guides/${params.slug}`)

  return {
    title: guide?.title,
    description: guide?.description,
    openGraph: {
      images: `/og?title=${guide?.title}`,
    },
  }
}

export default async function BlogPostPage(props: PageContext) {
  const params = await props.params
  const guide = guides.find((guide) => guide.slug === `guides/${params.slug}`)
  if (!guide) return notFound()

  return (
    <Container flex="1" pb="20" maxW="5xl">
      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link href="/guides">Guides</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink textTransform="capitalize">
          {guide.collection}
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Stack py="8" gap="4" mb="6">
        <Heading size="4xl">{guide.title}</Heading>
        <Text fontSize="sm" color="fg.muted">
          {formatBlogDate(guide.publishedAt)}
        </Text>
      </Stack>
      <MDXContent code={guide.content} />
    </Container>
  )
}
