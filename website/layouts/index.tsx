import PageContainer from "components/docs-container"
import docs from "configs/docs-sidebar"
import guides from "configs/docs-sidebar"
import React from "react"

const defaultLayout = (frontmatter) => ({ children }) => {
  const routes = frontmatter.layout === "guides" ? guides.routes : docs.routes
  return (
    <PageContainer sidebarRoutes={routes} frontmatter={frontmatter}>
      {children}
    </PageContainer>
  )
}

export default defaultLayout
