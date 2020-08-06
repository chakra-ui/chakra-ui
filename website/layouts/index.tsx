import PageContainer from "components/docs-container"
import docs from "configs/docs-sidebar"
import guides from "configs/guides-sidebar"
import React from "react"

const defaultLayout = (frontmatter) => ({ children }) => {
  const routes = frontmatter.slug.startsWith("/guides")
    ? guides.routes
    : docs.routes

  return (
    <PageContainer sidebarRoutes={routes} frontmatter={frontmatter}>
      {children}
    </PageContainer>
  )
}

export default defaultLayout
