import * as chakraComponents from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "components/mdx-components"
import PageContainer from "components/page-container"
import Pagination from "components/pagination"
import Sidebar from "components/sidebar/sidebar"
import docsSidebar from "configs/docs-sidebar"
import guidesSidebar from "configs/guides-sidebar"
import * as React from "react"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"

export function getRoutes(slug: string) {
  const config = slug.startsWith("/guides") ? guidesSidebar : docsSidebar
  return config.routes
}

function MDXLayout({ frontmatter, children }) {
  const routes = getRoutes(frontmatter.slug)

  const route = findRouteByPath(removeFromLast(frontmatter.slug, "#"), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer
        frontmatter={frontmatter}
        sidebar={<Sidebar routes={routes} />}
        pagination={
          <Pagination
            next={routeContext.nextRoute}
            previous={routeContext.prevRoute}
          />
        }
      >
        {children}
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
