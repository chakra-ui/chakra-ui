import * as React from "react"
import PageContainer from "components/page-container"
import dynamic from "next/dynamic"

const MDXLayout = dynamic(() => import("layouts/mdx"))

export default function DefaultLayout({ children, frontMatter }) {
  const { slug } = frontMatter

  if (slug.startsWith("/guides") || slug.startsWith("/docs")) {
    return <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>
  }

  return <PageContainer frontmatter={frontMatter}>{children}</PageContainer>
}
