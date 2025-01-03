import { EditPageButton } from "@/components/edit-page-button"
// import { EventBadge } from "@/components/event-badge"
import { MDXContent } from "@/components/mdx-content"
import { MDXPagination } from "@/components/mdx-pagination"
import { PageHeader } from "@/components/page-header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toc } from "@/components/toc"
import { docsConfig } from "@/docs.config"
import { flattenToc } from "@/lib/flatten-toc"
import { Box, Show, Stack } from "@chakra-ui/react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SidebarEnd } from "../sidebar"
import { docs } from ".velite"

interface PageContext {
  params: Promise<{ slug: string[] }>
}

export default async function Page(props: PageContext) {
  const params = await props.params

  const page = docs.find(
    (doc) => doc.slug === ["docs", ...params.slug].join("/"),
  )

  if (!page) {
    return notFound()
  }

  return (
    <>
      <Stack
        flex="1"
        width="full"
        px={{ md: "12" }}
        pt="10"
        pb="16"
        overflow="auto"
        minHeight="var(--content-height)"
      >
        <PageHeader
          title={page.title}
          description={page.description}
          links={page.links}
        />
        <Box>
          <MDXContent code={page.code} />
          <MDXPagination />
        </Box>
      </Stack>

      <Show when={!page.hideToc}>
        <SidebarEnd
          id="toc"
          visibility={page.toc.length === 0 ? "hidden" : undefined}
        >
          <Toc items={flattenToc(page.toc)} />
          <Stack borderTopWidth="1px" pt="4" align="start">
            <EditPageButton href={`${docsConfig.editUrl}/${page.slug}.mdx`} />
            <ScrollToTop />
            {/* <EventBadge /> */}
          </Stack>
        </SidebarEnd>
      </Show>
    </>
  )
}

export const generateMetadata = async (ctx: PageContext): Promise<Metadata> => {
  const params = await ctx.params
  const page = getPageBySlug(params.slug)

  const category = page?.slug
    .replace("docs/", "")
    .split("/")
    .slice(0, -1)
    .join(" > ")
    ?.replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: page?.title,
    description: page?.description,
    openGraph: {
      images: `/og?title=${page?.title}&category=${category}`,
    },
  }
}

export function generateStaticParams() {
  return docs.map((item) => ({
    slug: item.slug.split("/").slice(1),
  }))
}

function getPageBySlug(slug: string[]) {
  return docs.find((doc) => doc.slug === ["docs", ...slug].join("/"))
}
