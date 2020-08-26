import * as React from "react"
import PageContainer from "components/page-container"
import dynamic from "next/dynamic"

const MDXLayout = dynamic(() => import("layouts/mdx"))

const defaultLayout = (frontmatter) => ({ children }) => {
  const { slug } = frontmatter

  if (slug.startsWith("/guides") || slug.startsWith("/docs")) {
    return <MDXLayout frontmatter={frontmatter}>{children}</MDXLayout>
  }

  return <PageContainer frontmatter={frontmatter}>{children}</PageContainer>
}

export default defaultLayout
