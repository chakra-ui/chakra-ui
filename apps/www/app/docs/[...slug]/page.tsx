import { EditPageButton } from "@/components/edit-page-button"
import { MDXContent } from "@/components/mdx-content"
import { PageHeader } from "@/components/page-header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toc } from "@/components/toc"
import { flattenToc } from "@/lib/flatten-toc"
import { Stack } from "@chakra-ui/react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SidebarEnd } from "../sidebar"
import { docs } from ".velite"

interface Props {
  params: { slug: string[] }
}

export default function Page(props: Props) {
  const { params } = props

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
        minHeight="var(--content-height)"
      >
        <span id="scroll-to-top" />
        <PageHeader
          title={page.title}
          description={page.description}
          links={page.links}
        />
        <MDXContent code={page.code} />
      </Stack>

      <SidebarEnd>
        <Toc items={flattenToc(page.toc)} />
        <Stack borderTopWidth="1px" pt="4" align="start">
          <EditPageButton href="" />
          <ScrollToTop />
        </Stack>
      </SidebarEnd>
    </>
  )
}

export const generateMetadata = (props: Props): Metadata => {
  const page = getPageBySlug(props.params.slug)
  return {
    title: page?.title,
    description: page?.description,
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
