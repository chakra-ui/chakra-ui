import * as chakraComponents from "@chakra-ui/core"
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

function MDXLayout({ frontmatter, children }) {
  const { slug } = frontmatter

  const config = slug.startsWith("/guides") ? guidesSidebar : docsSidebar
  const { routes } = config

  const route = findRouteByPath(removeFromLast(slug, "#"), routes)
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
