import { PageContainer } from "components/page-container"
import dynamic from "next/dynamic"
import type { ReactNode } from "react"

const MDXLayout = dynamic(
  () => import(/* webpackChunkName: "layouts-mdx" */ "layouts/mdx"),
)

type DefaultLayoutProps = {
  children: ReactNode
  frontMatter: {
    slug: string
    title: string
    description: string
    editUrl: string
  }
}

// eslint-disable-next-line import/no-default-export
export default function DefaultLayout({
  children,
  frontMatter,
}: DefaultLayoutProps): JSX.Element {
  const { slug } = frontMatter

  if (slug.startsWith("/guides") || slug.startsWith("/docs")) {
    return <MDXLayout frontMatter={frontMatter}>{children}</MDXLayout>
  }

  return <PageContainer frontmatter={frontMatter}>{children}</PageContainer>
}
